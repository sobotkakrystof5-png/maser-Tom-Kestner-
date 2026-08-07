// Serverless endpoint (Vercel, Node runtime) pro odeslání kontaktního formuláře
// přes Resend. Záměrně bez npm závislostí — volá se Resend REST API přes globální
// fetch, takže web zůstává bez build kroku a bez node_modules (viz CLAUDE.md).
//
// API klíč žije VÝHRADNĚ tady na serveru (process.env.RESEND_API_KEY). Nikdy
// nesmí skončit v script.js ani v žádném souboru, který se posílá do prohlížeče.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// Fallbacky odpovídají .env.local — kdyby proměnná chyběla, endpoint stále funguje.
const MAIL_FROM = process.env.MAIL_FROM || "Web Masáže Kestner <onboarding@resend.dev>";
// Jediný příjemce, natvrdo ze serverového prostředí. Z požadavku se příjemce
// nebere nikdy — jinak by šlo endpoint zneužít jako otevřenou odesílací bránu.
const MAIL_TO = process.env.MAIL_TO || "tomas.kestner@seznam.cz";

const LIMITS = { name: 100, email: 150, phone: 40, message: 3000 };

// Musí odpovídat hodnotám checkboxů v index.html (.contact-form__services-grid).
// Whitelist, ne jen escapování — z requestu se do e-mailu nikdy nedostane
// hodnota, kterou návštěvník do formuláře reálně neposlal.
const VALID_SERVICES = [
  "Klasické masáže",
  "Lymfatické masáže",
  "Reflexní terapie",
  "Měkké a trakční techniky",
  "Taping, kineziotaping, crosstaping",
  "Baňkování",
];

// Sdílená testovací adresa Resendu. Doručí jen na e-mail vlastníka Resend účtu,
// na cizí adresy (tomas.kestner@seznam.cz) selže — viz guard v handleru.
const RESEND_TEST_SENDER = "onboarding@resend.dev";

// Jednoduchá brzda proti spamu: víc než RATE_MAX odeslání z jedné IP za
// RATE_WINDOW_MS vrátí 429. Paměť je per-instance (serverless), takže to není
// tvrdá ochrana — zastaví triviální smyčku a ochrání měsíční kvótu Resendu,
// ne distribuovaný útok. Na to by byl potřeba sdílený store (KV/Redis), a tím
// i závislost navíc, kterou tenhle web nemá proč nést.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const recentHits = new Map();

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded) return forwarded.split(",")[0].trim();
  return (req.socket && req.socket.remoteAddress) || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  // Pojistka proti růstu Mapy v dlouho žijící instanci.
  if (recentHits.size > 500) recentHits.clear();

  const hits = (recentHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    recentHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  recentHits.set(ip, hits);
  return false;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Zabrání hlavičkové injekci přes Reply-To (CR/LF v e-mailu od návštěvníka).
function isSafeEmail(value) {
  return /^[^\s@<>,;:"'\\]+@[^\s@<>,;:"'\\]+\.[a-z]{2,}$/i.test(value);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Použijte POST." });
  }

  // Vercel parsuje JSON body sám, ale při jiném content-type přijde string.
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Neplatný formát dat." });
    }
  }
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Neplatný formát dat." });
  }

  // Honeypot: pole skryté v CSS, které vyplní jen bot. Vracíme 200, aby bot
  // nedostal signál, že byl odhalen — e-mail se ale neodešle.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const message = String(body.message || "").trim();
  const services = Array.isArray(body.services)
    ? body.services.filter((s) => VALID_SERVICES.includes(s))
    : [];

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Vyplňte prosím jméno, e-mail a zprávu." });
  }
  if (!isSafeEmail(email)) {
    return res.status(400).json({ error: "Zkontrolujte prosím e-mailovou adresu." });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    phone.length > LIMITS.phone ||
    message.length > LIMITS.message
  ) {
    return res.status(400).json({ error: "Zpráva je příliš dlouhá." });
  }

  // Brzda se počítá až tady, u zpráv, které by reálně odešly. Překlep ve
  // formuláři tak návštěvníkovi limit neujídá — chráníme kvótu Resendu
  // a Tomášovu schránku, ne validaci.
  if (isRateLimited(clientIp(req))) {
    return res
      .status(429)
      .json({ error: "Příliš mnoho zpráv za sebou. Zkuste to prosím za chvíli." });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY není nastavený v prostředí.");
    return res.status(500).json({ error: "Formulář není momentálně dostupný." });
  }

  // POJISTKA PROTI TICHÉ ZTRÁTĚ POPTÁVKY.
  // Sdílená adresa onboarding@resend.dev doručuje jen na e-mail vlastníka Resend
  // účtu — na tomas.kestner@seznam.cz Resend vrátí 200 a doručení selže až
  // asynchronně (ověřeno 2026-08-06: last_event "failed"). Návštěvník by viděl
  // „odesláno“ a zpráva by nikdy nedorazila; falešné potvrzení je horší než
  // poctivá chyba, u které se návštěvník ozve telefonem.
  //
  // Odblokuje se samo, jakmile je v Resendu ověřená doména a MAIL_FROM ukazuje
  // na ni (např. web@masazekestner.cz) — žádná změna kódu.
  // RESEND_ALLOW_TEST_SENDER=1 povolí odesílání i z testovací adresy, ale jen
  // pro ověření průchodu na vlastní e-mail vlastníka Resend účtu. Do produkce
  // tuhle proměnnou nestavět.
  if (MAIL_FROM.includes(RESEND_TEST_SENDER) && process.env.RESEND_ALLOW_TEST_SENDER !== "1") {
    console.warn(
      "Resend nemá ověřenou doménu — MAIL_FROM je stále " +
        RESEND_TEST_SENDER +
        ". Odeslání přeskočeno, aby se poptávka neztratila potichu."
    );
    return res.status(503).json({ error: "Odeslání dočasně nedostupné." });
  }

  const plain = [
    `Jméno: ${name}`,
    `E-mail: ${email}`,
    `Telefon: ${phone || "neuvedeno"}`,
    `Typ služby: ${services.length ? services.join(", ") : "neuvedeno"}`,
    "",
    message,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;color:#16241F;line-height:1.6">
      <h2 style="margin:0 0 16px;font-size:18px">Nová zpráva z webu</h2>
      <p style="margin:0 0 4px"><strong>Jméno:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 4px"><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 4px"><strong>Telefon:</strong> ${escapeHtml(phone || "neuvedeno")}</p>
      <p style="margin:0 0 16px"><strong>Typ služby:</strong> ${escapeHtml(services.length ? services.join(", ") : "neuvedeno")}</p>
      <div style="padding:16px;background:#F4F6F2;border-left:3px solid #C9662E;white-space:pre-wrap">${escapeHtml(message)}</div>
    </div>
  `;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [MAIL_TO],
        reply_to: email,
        subject: `Zpráva z webu — ${name}`,
        text: plain,
        html,
      }),
    });

    if (!response.ok) {
      // Detail loguje server, klient dostane obecnou hlášku (žádný únik konfigurace).
      console.error("Resend selhal:", response.status, await response.text());
      return res.status(502).json({ error: "Zprávu se nepodařilo odeslat." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Chyba při volání Resend:", error);
    return res.status(502).json({ error: "Zprávu se nepodařilo odeslat." });
  }
};
