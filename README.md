# Masáže Kestner — web

Jednostránkový web pro Tomáše Kestnera (masér, Mladá Boleslav). Čisté
HTML5/CSS3/vanilla JS — žádný build krok, žádné závislosti pro běh webu.

## Nasazení

Web je čistě statický (`index.html`, `styles.css`, `script.js`, `/assets`,
`sitemap.xml`, `robots.txt`) — stačí nahrát celý obsah složky na libovolný
statický hosting:

- **Netlify / Vercel**: přetáhnout složku do dashboardu, nebo připojit git
  repozitář a nastavit build command na prázdno (žádný build krok).
- **GitHub Pages**: povolit Pages pro branch/root ve Settings repozitáře.
- **Forpsi / klasický FTP hosting**: nahrát obsah složky do webroot (`www`
  nebo `public_html`) přes FTP/SFTP.

Po nasazení na finální doménu je potřeba **najít a nahradit**
`https://www.example.com/` (placeholder doména) reálnou doménou na těchto
místech:

- `index.html` — `<link rel="canonical">`, `og:url`, `og:image`, JSON-LD
  `url`/`image`
- `sitemap.xml` — všechny `<loc>` záznamy
- `robots.txt` — řádek `Sitemap:`

## Kde doplnit reálný obsah (TODO značky v kódu)

Všechna místa jsou označená `<!-- TODO: ... -->` přímo v `index.html`,
zde je jejich přehled:

| Co | Kde v kódu | Formát |
|---|---|---|
| Fotka hero (Tomáš při masáži) | `#hero` → `.hero__media img` | min. šířka 1200px, poměr 4:3, WebP + JPG fallback |
| Portrét Tomáše | `#o-mne` → `.o-mne__media img` | min. šířka 900px, poměr 3:4 |
| 6 fotek galerie (provozovna, technika, taping, baňkování, vybavení, čekárna) | `#galerie` → `.gallery-grid` | min. šířka 1200px, poměr 4:3 nebo 1:1, WebP + JPG fallback |
| Ceny služeb kromě partnerské masáže | `#sluzby-cenik` → každá `.service-card` | nahradit text "Cena na dotaz" |
| Reálné reference klientů | `#reference` (aktuálně sekce "Zkušenosti" na faktech) | přesné znění citace + jméno/iniciála příjmení dle GDPR souhlasu — viz `.claude/skills/reference/SKILL.md` |
| Otevírací doba | `#kontakt` a JSON-LD v `<head>` | zatím záměrně vynechána (nepotvrzená), nevkládat bez potvrzení od klienta |
| Formulářový backend | `#kontakt` → `<form id="contact-form">` | zatím `mailto:` fallback (funkční, ale vyžaduje krok navíc od uživatele) — po výběru hostingu nahradit za Formspree/Netlify Forms (fetch POST), viz komentář v `script.js` |
| Google Maps embed | `#kontakt` → `.kontakt__map iframe` | aktuálně bez API klíče (`?q=...&output=embed`) — funkční, ale bez analytiky/oficiální podpory Google |

Placeholder fotky (`assets/img/placeholder-*.svg`) i favicon/apple-touch-icon/
og-image (`assets/icons/`, `apple-touch-icon.png`, `og-image.jpg`) jsou vlastní
vygenerovaná grafika (flow-gradient + abstraktní ikona), ne stock fotky —
bezpečně smazatelná/nahraditelná, jakmile dorazí reálné podklady.

## Známá zjednodušení (transparentně, ne skrytě)

- Gallery placeholder dlaždice používají `<img src="*.svg">` místo
  `<picture>` WebP/JPG — dává smysl až s reálnými fotkami (viz TODO
  komentář v `index.html` u `#galerie`).
- Kontaktní formulář nemá zvolený hosting-specifický backend, proto zatím
  "odesílá" přes `mailto:` (otevře e-mailový klient s předvyplněnou
  zprávou) — funkční už dnes, ale ne plně automatické.
- Google Fonts se načítají z CDN (ne self-hosted) — zmírněno
  `preconnect` + neblokujícím `preload`/`onload` vzorem; self-hosting by
  byl další krok, pokud bude potřeba vyždímat poslední ms výkonu.

## Ověření kvality

Při buildu ověřeno reálným Lighthouse CLI (headless Chrome, ne jen odhad):
**Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100**,
mobil i desktop. Kontrastní poměry všech textových barev proti pozadí
zkontrolovány výpočtem (WCAG relativní luminance), focus stavy viditelné
na všech interaktivních prvcích, `prefers-reduced-motion` respektováno
globálně.

Pro opakované ověření po dalších změnách:

```bash
python3 -m http.server 8080
npx lighthouse http://localhost:8080/index.html --view
```

(Google Rich Results Test a Mobile-Friendly Test vyžadují veřejně
dostupnou URL — spustit až po nasazení na finální doménu.)

## Doporučení analytika (ne jen "hotovo")

- **A/B test CTA textu**: hero primární CTA teď zní "Objednat masáž ·
  603 486 737". Stálo by za test proti čistě akčnímu "Zavolat teď" —
  kratší text může na mobilu konvertovat lépe, protože jasněji signalizuje
  okamžitou akci bez rozmýšlení.
- **Pořadí sekcí**: Zkušenosti (fakta místo referencí) jsou zařazené před
  Galerii. Až budou reálné reference s citacemi, zvážit přesun blíž k
  Ceníku — sociální důkaz bezprostředně před rozhodnutím o ceně obvykle
  zvyšuje konverzi víc než na konci stránky.
- **Ceník bez cen** je největší riziko konverze na webu v současném stavu
  — "cena na dotaz" u 6 z 7 služeb pořád znamená telefonát navíc, přesně
  to, co CLAUDE.md označuje za nejčastější důvod odchodu bez objednání.
  Získání aspoň orientačního ceníku od klienta by mělo být priorita č. 1
  před spuštěním, ne kosmetika po launchi.
