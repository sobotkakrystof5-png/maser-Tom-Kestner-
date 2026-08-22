# Masáže Kestner — web

Statický vícestránkový web pro Tomáše Kestnera (masér, Mladá Boleslav) —
hlavní landing page (`index.html`) doplněná podstránkami jednotlivých
služeb v `/sluzby/`. Čisté HTML5/CSS3/vanilla JS — žádný build krok, žádné
závislosti pro běh webu.

## Nasazení

Web je čistě statický (`index.html`, `styles.css`, `script.js`, `/sluzby`,
`/assets`, `sitemap.xml`, `robots.txt`) — stačí nahrát celý obsah složky na
libovolný statický hosting:

- **Netlify / Vercel**: přetáhnout složku do dashboardu, nebo připojit git
  repozitář a nastavit build command na prázdno (žádný build krok).
- **GitHub Pages**: povolit Pages pro branch/root ve Settings repozitáře.
- **Forpsi / klasický FTP hosting**: nahrát obsah složky do webroot (`www`
  nebo `public_html`) přes FTP/SFTP.

Finální doména `https://www.masazekestner.cz/` je dosazená (2026-08-22) na
všech místech, kde dřív byl placeholder `https://www.example.com/`:
`index.html` (`<link rel="canonical">`, `og:url`, `og:image`, JSON-LD
`url`/`image`), `sluzby/*.html` (7 souborů, canonical + og:url + og:image),
`sitemap.xml` (všechny `<loc>`) a `robots.txt` (`Sitemap:`).

## Kontaktní formulář (Resend)

Formulář v `#kontakt` posílá JSON POST na `/api/kontakt` (serverless funkce
ve `api/kontakt.js`, Node runtime na Vercelu), ta volá REST API Resendu.
Žádné npm závislosti — volá se přes globální `fetch`, takže web zůstává bez
build kroku. Příjemce je natvrdo ze serverového prostředí (`MAIL_TO`),
z prohlížeče nikdy nechodí; `reply_to` je e-mail návštěvníka, takže se dá
odpovědět přímo z pošty.

Proměnné prostředí (lokálně v `.env.local`, na Vercelu v Project Settings →
Environment Variables — `.env.local` je v `.gitignore` a nikdy se necommituje):

| Proměnná | Význam |
|---|---|
| `RESEND_API_KEY` | API klíč z Resendu. Žije jen na serveru, nikdy v `script.js`. |
| `MAIL_FROM` | Odesílatel, musí být na doméně ověřené v Resendu (např. `Web Masáže Kestner <web@masazekestner.cz>`). |
| `MAIL_TO` | Kam chodí poptávky — `tomas.kestner@seznam.cz`. |
| `RESEND_ALLOW_TEST_SENDER` | Volitelné, jen pro test. `1` povolí odesílání i z `onboarding@resend.dev`. Do produkce nenastavovat. |

Doména `masazekestner.cz` je v Resendu ověřená (DKIM/SPF/MX, ověřeno
2026-08-22) a `MAIL_FROM` na ni ukazuje (`web@masazekestner.cz`) — formulář
je plně funkční, e-maily se doručují (potvrzeno end-to-end testem,
`last_event: delivered`). Sdílená adresa `onboarding@resend.dev` by doručila
jen na e-mail vlastníka Resend účtu — na `tomas.kestner@seznam.cz` by Resend
vrátil 200, ale doručení by selhalo asynchronně (takhle to fungovalo do
2026-08-22, viz `last_event: failed` v historii). Proto endpoint dokud by
`MAIL_FROM` byl na testovací adrese, vrací 503 a formulář to přizná místo
falešného "odesláno" — tahle pojistka zůstává v kódu jako evergreen ochrana,
kdyby se doména v budoucnu znovu rozpojila.

Ověření průchodu bez ověřené domény: nastavit `MAIL_TO` na e-mail vlastníka
Resend účtu a dočasně `RESEND_ALLOW_TEST_SENDER=1`.

Lokální běh se serverless funkcí (samotný `python3 -m http.server` funkce
neumí):

```bash
npx vercel dev
```

## Kde doplnit reálný obsah (TODO značky v kódu)

Všechna místa jsou označená `<!-- TODO: ... -->` přímo v `index.html`,
zde je jejich přehled:

| Co | Kde v kódu | Formát |
|---|---|---|
| Fotka hero (Tomáš při masáži) | `#hero` → `.hero__media` (`.photo-placeholder`) | min. šířka 1200px, poměr 4:3, WebP + JPG fallback |
| ~~Portrét Tomáše~~ **hotovo** — doplněn, ale zdroj má jen 778px šířky (pod poptávanými 900px) | `#o-mne` → `.o-mne__media` | pokud klient dodá větší originál, přegenerovat; poměr 3:4 |
| Fotka u služeb — **zbývá taping/kineziotaping/crosstaping a partnerské masáže** (klient je zatím nemá) | `#sluzby-cenik` → `.service-card__media`, a `sluzby/[slug].html` → `.sluzba-detail__media-grid` | min. šířka 1200px, poměr 4:3, WebP + JPG fallback |
| Galerie — **zbývá 1 z 6 dlaždic: kineziotaping** (5 reálných fotek doplněno) | `#galerie` → `.gallery-grid` (poslední `<li>` s `.photo-placeholder`) | min. šířka 1200px, ořez na 1:1, výstup 480w + 1000w, WebP + JPG fallback |
| Cena tapingu/kineziotapingu/crosstapingu | `#sluzby-cenik` a `sluzby/taping-kineziotaping-crosstaping.html` | nahradit text "Cena na dotaz" (jediná nepotvrzená cena — ostatní služby mají potvrzený paušál 1000 Kč/35 min, partnerské masáže 1900 Kč/60 min) |
| Reálné reference klientů | `#reference` (aktuálně sekce "Zkušenosti" na faktech) | přesné znění citace + jméno/iniciála příjmení dle GDPR souhlasu — viz `.claude/skills/reference/SKILL.md` |
| Otevírací doba | `#kontakt` a JSON-LD v `<head>` | zatím záměrně vynechána (nepotvrzená), nevkládat bez potvrzení od klienta |
| Formulářový backend | `#kontakt` → `<form id="contact-form">` | hotovo — POST na `/api/kontakt` → Resend, doména ověřená, e-maily se doručují (viz "Kontaktní formulář (Resend)" výše) |
| Google Maps embed | `#kontakt` → `.kontakt__map iframe` | aktuálně bez API klíče (`?q=...&output=embed`) — funkční, ale bez analytiky/oficiální podpory Google |

Chybějící fotky jsou označené komponentou `.photo-placeholder` (výrazný
přerušovaný rámeček + ikona fotoaparátu + popisek "FOTO K DOPLNĚNÍ: ...") —
ne tichý `<img>` s jemnou zástupnou grafikou jako dřív. Až dorazí reálná
fotka: nahradit `<div class="photo-placeholder">...</div>` za
`<picture>`/`<img class="img-cover">` (WebP + JPG fallback) uvnitř stejného
wrapperu (`.hero__media`, `.o-mne__media`, `.service-card__media`,
`.gallery-item`) — wrapper si drží `aspect-ratio`, není potřeba měnit
layout. U galerie navíc obalit zpět do `<button class="gallery-item">`
s `aria-label`, ať se zapojí do lightboxu (viz `script.js`
`galleryLightbox()` — dlaždice bez `<img>` lightbox automaticky
přeskakuje). Favicon/apple-touch-icon/og-image (`assets/icons/`,
`apple-touch-icon.png`, `og-image.jpg`) zůstávají beze změny.

### Práce s fotkami od klienta

Originály chodí do `assets/fotky/<sluzba>/` — **tahle složka se nenasazuje**,
je to jen zdroj. Web sahá výhradně do `assets/img/` na odvozené varianty
(`<slug>-800.webp` + `<slug>-800.jpg`; poukazy a portrét bez `-800`, jedou
v nativním rozlišení; galerie má dvě šířky `<slug>-480` a `<slug>-1000` kvůli
`srcset`). Ořezy jsou ruční, ne center-crop — u karet na homepage 16:10
(`.service-card__media`), na podstránkách 4:3 (`.sluzba-detail__media-grid`),
v galerii 1:1 (`.gallery-item`).
Převod dělá Pillow (`Image.crop` + `resize(LANCZOS)`, JPEG q78 / WebP q74);
`cwebp` ani ImageMagick v tomhle prostředí nejsou.

## Známá zjednodušení (transparentně, ne skrytě)

- V galerii zbývá jedna neklikatelná placeholder dlaždice (kineziotaping) —
  lightbox (`script.js`) ji ignoruje, protože nemá `<img>`. Zbylých 5 dlaždic
  je `<button>` s reálnou fotkou a je plně v lightboxu.
- Lightbox bere zvětšeninu z `data-full` na dlaždici (největší WebP varianta),
  ne z toho, co `srcset` vybral pro malou dlaždici — jinak by na mobilu
  zvětšoval 480px zdroj přes celou obrazovku. Popisek pod fotkou jde
  z `data-caption` (krátký titulek, stejný jaký nesly zástupné dlaždice);
  bez `data-caption` se `figcaption` schová.
- Kontaktní formulář odesílá výhradně přes Resend (`/api/kontakt`). Doména
  je ověřená a e-maily se doručují (viz sekce o Resendu výše). Guard, který
  by endpoint zablokoval, kdyby `MAIL_FROM` znovu skončil na testovací
  adrese, zůstává v kódu jako evergreen pojistka — falešné "odesláno" by
  bylo horší než chyba, u které návštěvník zavolá.
- Brzda proti spamu na endpointu drží počty v paměti běžící serverless
  instance (5 odeslání / 10 min / IP). Zastaví triviální smyčku a chrání
  kvótu Resendu, ne distribuovaný útok — na to by byl potřeba sdílený
  store (KV/Redis) a s ním závislost, kterou tenhle web nemá proč nést.
- Google Fonts se načítají z CDN (ne self-hosted) — zmírněno
  `preconnect` + neblokujícím `preload`/`onload` vzorem; self-hosting by
  byl další krok, pokud bude potřeba vyždímat poslední ms výkonu.

## Ověření kvality

Skóre níže je ze stavu **před** redesignem 2026-07-28 (nová paleta/font,
7 podstránek, scroll-reveal JS, nová sekce) — po redesignu nebylo možné
Lighthouse v tomto prostředí spustit znovu (lokální statický server na
cestě s diakritikou selhával kvůli encoding chybě, mimo kontrolu editoru),
takže čísla níže **je potřeba přeměřit** před spuštěním, ne brát jako
platná pro aktuální kód:

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
