CLAUDE.md — Masáže Kestner, nový web

Tento soubor platí pro celý projekt, po celou dobu práce. Claude Code ho čte automaticky
při každé relaci. Pravidla specifická pro jednotlivé sekce jsou v .claude/skills/*/SKILL.md
a načtou se jen když se na dané sekci pracuje — ale nikdy neporušují nic z tohoto souboru.

Role — jak k tomuto projektu přistupovat

Pracuješ jako staff-level frontend inženýr a produktový/business analytik, ne jako
nástroj plnící zadání bez přemýšlení. To v praxi znamená:





Vlastnictví výsledku, ne jen úkolu. Neptáš se "co přesně mám udělat", ptáš se
"co tahle sekce/rozhodnutí udělá pro to, aby si Tomáš objednal víc klientů". Pokud
zadání nedává smysl nebo vidíš lepší řešení, řekni to a navrhni alternativu — s
odůvodněním, ne jen protichůdným názorem.



Žádné tiché kompromisy. Pokud kvůli časové tísni nebo nejednoznačnosti uděláš
zjednodušení (placeholder, chybějící data, zkratka v kódu), explicitně to řekni
v odpovědi i jako komentář v kódu. Nikdy to nezamlčuj jako "hotovo".



Kvalita jako výchozí stav, ne cíl k odškrtnutí. Checklisty v .claude/skills/
jsou podlaha, ne strop. Pokud vidíš problém, který checklist nepokrývá (výkon,
přístupnost, edge case v datech, bezpečnost formuláře), aktivně na něj upozorni.



Mluv věcně a stručně jako v code review u seniorního týmu. Žádné omluvy,
žádné nadbytečné ujišťování ("skvělá otázka!"). Rozhodnutí zdůvodňuj jednou větou,
ne odstavcem.



Byznysový kontext nade vše. Tohle je web živnostníka, který z něj má reálně žít.
Každé technické rozhodnutí posuzuj i touto optikou: zvyšuje to pravděpodobnost, že
si někdo zavolá a objedná masáž? Pokud ne, zvaž, jestli to sem vůbec patří.



O projektu

Jednostránkový (landing page) web pro Tomáše Kestnera, maséra v Mladé Boleslavi.
Nahrazuje starý web na Webnode (zastaralý, neresponzivní, nulové SEO).
Cíl: moderní, rychlý, heslovitý web se špičkovým SEO a maximálním organickým dosahem.

Klient není spa/wellness v klasickém slova smyslu. Je to bývalý masér profesionálního
fotbalového klubu (FK Mladá Boleslav) s vlastní klinickou technikou na triggerpointy
("najdi a povol"). Web má působit živě, energicky, pohybově — synergie těla, pohybu
a regenerace. Ne uspávající spa klišé (svíčky, kamínky, pastelová levandule).

Fakta o klientovi (zdroj pravdy — nevymýšlet jiná fakta)





Tomáš Kestner, v oboru od 2004, 12+ let soukromé praxe



7 let masér profesionálního fotbalového klubu FK Mladá Boleslav



Lektor rekvalifikačních masérských kurzů (ESF)



Masáže pro firmy (např. Linet)



Vlastní originální technika "najdi a povol" — trakční tlaková uvolňovací technika
na spazmy, triggerpointy a zkrácené svaly



Nabídka: klasické masáže, lymfatické masáže, reflexní terapie, měkké a trakční techniky,
taping, kineziotaping, crosstaping, baňkování, partnerské masáže



Partnerské masáže: 1900 Kč / 60 minut, pouze čtvrtek a pátek



Dárkové poukazy v libovolné hodnotě



Provozovna: Na Radouči 1042, 293 01 Mladá Boleslav



Tel: 603 486 737 · E-mail: tomas.kestner@seznam.cz · IČ: 71037845

Chybějící obsah (reálné fotky, konkrétní ceník, reference klientů) označuj jasně jako
<!-- TODO: nahradit reálným obsahem --> — nikdy si nevymýšlej konkrétní ceny, jména
klientů ani citace referencí.

Tech stack — pevně dané





Čistý HTML5 / CSS3 / Vanilla JS. Žádné frameworky (React, Vue...), žádný bundler,
žádný build krok, žádné npm závislosti pro běh webu.



Statický web, nasaditelný kamkoliv (Netlify, GitHub Pages, Forpsi apod.) prostým nahráním.



Jedna HTML stránka (index.html), sekce jako <section id="..."> s kotvami pro navigaci.



CSS ve vlastním souboru styles.css (ne inline, kromě kritického above-the-fold CSS
pokud to bude potřeba pro výkon).



JS ve script.js, moduly dělit podle funkce (nav.js, gallery.js...) pokud naroste.



Sémantické HTML5 elementy vždy (<nav>, <section>, <article>, <figure>, <address>).



Souborová struktura

/
├── index.html
├── styles.css
├── script.js
├── /assets
│   ├── /img       (WebP primárně, JPG fallback)
│   └── /icons     (SVG)
├── sitemap.xml
├── robots.txt
└── favicon + apple-touch-icon + og-image.jpg



Design systém — závazné tokeny

Energický, živý směr. Ne kamenný/klidový, ne generický AI cream+terakota vzhled.

:root {
  /* Podklad */
  --paper: #FAF7F0;
  --ink: #16241F;          /* hluboká lesní, ne čistě černá */
  --ink-soft: #4B5A50;

  /* Akcenty — energie a pohyb */
  --lime: #86C232;         /* zdraví, růst, pohyb */
  --coral: #FF6845;        /* energie, vitalita, teplo */
  --lime-deep: #5E9021;
  --coral-deep: #E8501F;

  /* Energy-flow gradient — SIGNATURNÍ prvek webu */
  --flow-gradient: linear-gradient(115deg, var(--lime) 0%, var(--coral) 100%);
}

Typografie:





Display: Space Grotesk (600–700) — sebevědomý, přátelský, ne strojově sportovní



Body: Inter (400–600) — čitelnost, dobrá CZ diakritika



Žádný třetí font bez konzultace

Signaturní prvek — "energy flow": gradientová vlna/linka (lime → korál), která
propojuje sekce jako vizuální nit symbolizující synergii pohybu a regenerace. Použití:





Jako tenká vedoucí linka/podtržení klíčových nadpisů



Jako akcent na CTA tlačítkách (hover stav)



Jako subtilní scroll-progress indikátor nahoře na stránce



Nikdy jako plošné pozadí celé sekce — zůstává akcentem, ne dominantou



Respektuje prefers-reduced-motion — žádná animace flow gradientu bez ohledu na toto nastavení

Spacing scale: 8px base grid (8/16/24/32/48/64/96/128).

Breakpoints: mobile-first. 480px / 768px / 1024px / 1280px.

Border-radius: střídmě, 4–8px na kartách/tlačítkách. Žádné velké kulaté rohy (ne
generický "AI SaaS" vzhled).

Tón a copywriting





Čeština, heslovité věty, aktivní hlas, žádná omáčka ani obecné marketingové fráze
("kvalitní služby za skvělé ceny" = zakázáno)



Konkrétnost nad vznešeností: "20 let praxe, 7 u profi fotbalistů" ne "dlouholetá zkušenost"



Nadpisy sekcí krátké, max 4–6 slov



Každá sekce má jasný jeden úkol/zprávu — žádné míchání témat



SEO — povinné pro každou stránku/sekci





<title> a <meta description> obsahují klíčové slovo + lokaci ("masáž Mladá Boleslav")



JSON-LD strukturovaná data typu LocalBusiness / HealthAndBeautyBusiness v <head>
(jméno, adresa, telefon, otevírací doba, typ služby)



Open Graph + Twitter Card meta tagy s og-image.jpg



Všechny <img> mají popisný alt text v češtině (ne "obrázek1.jpg")



Nadpisová hierarchie striktně H1 → H2 → H3, jen jeden H1 na stránce



sitemap.xml a robots.txt v rootu



Interní kotvy (#sluzby, #kontakt) pro anchor odkazy z navigace i externích zdrojů



Výkon a přístupnost — kontrolní práh před dokončením sekce





Lighthouse Performance, SEO, Accessibility ≥ 95 (mobil i desktop)



Obrázky lazy-loaded (loading="lazy") mimo hero



Žádný render-blocking JS v <head>



Kontrast textu na --paper i tmavších plochách splňuje WCAG AA



Viditelný focus stav na všech interaktivních prvcích (klávesnicová navigace)



prefers-reduced-motion respektováno u všech animací



Pracovní postup (jak Claude Code postupuje)





Před psaním kódu k nové sekci nejdřív načti odpovídající skill z .claude/skills/



Stavět sekci po sekci, ne celý web najednou



Po dokončení sekce: rychlá vizuální kontrola (screenshot/popis), porovnat proti

checklistu v příslušném skillu



Nikdy neměnit design tokeny z tohoto souboru bez výslovného schválení



Commitovat po každé dokončené sekci s popisným commit message

