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

Statický vícestránkový web pro Tomáše Kestnera, maséra v Mladé Boleslavi — hlavní landing
page (index.html) doplněná podstránkami jednotlivých služeb (viz Tech stack níže).
Nahrazuje starý web na Webnode (zastaralý, neresponzivní, nulové SEO).
Cíl: moderní, rychlý, heslovitý web se špičkovým SEO a maximálním organickým dosahem.

Klient není spa/wellness v klasickém slova smyslu. Je to bývalý masér profesionálního
fotbalového klubu (FK Mladá Boleslav) s vlastní klinickou technikou na triggerpointy
("najdi a povol"). Web má působit živě, energicky, pohybově — synergie těla, pohybu
a regenerace. Ne uspávající spa klišé (svíčky, kamínky, pastelová levandule).

Fakta o klientovi (zdroj pravdy — nevymýšlet jiná fakta)





Tomáš Kestner, v oboru od 2004 (20+ let praxe) — soukromé klienty vedl souběžně
s prací u FK Mladá Boleslav, ne až po ní (časy se překrývají, nejde o dvě fáze
kariéry za sebou)



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

Upřesnění klienta (2026-07-21) — doplňuje/opravuje fakta výše, má přednost před
starší formulací kdekoliv v kódu:

- Technika "najdi a povol" není jedna fixní hmatová technika. Je to kombinace
  mnohaletých zkušeností a výběru z různých hmatů (trakce, tlak, měkké techniky)
  podle toho, co konkrétní bolístka potřebuje.
- Tělo se přirozeně vychyluje z rovnováhy — některé svaly se zkracují, jiné
  ochabují. Tomáš najde a povolí blok, ale udržet tělo v rovnováze (cvičení,
  kompenzace) je hlavně úkol klienta, ne jen maséra. Tohle je důležitá součást
  poselství, ne detail — nastavuje realistické očekávání a odlišuje od "zázračné"
  jednorázové opravy.
- Lymfatická masáž = ruční lymfodrenáž. Ověřené benefity: úleva od otoků
  končetin různého původu a pocitu těžkých nohou, zlepšuje výkonnost sportovců
  až o 10 %, prospěšná při celulitidě. NIKDY neuvádět úlevu od otoků kotníků
  jako benefit — klient toto tvrzení výslovně označil za nepravdivé.
- Reflexní terapie — princip: tlak na reflexní bod (např. na chodidle) ovlivní
  jiné místo/orgán v těle; vychází ze starobylé čínské nauky o akupunkturních
  bodech.
- Ceník: potvrzený paušál **1000 Kč / 35 minut** platí napříč typy terapie
  (klasické masáže, lymfatické masáže, reflexní terapie, měkké a trakční
  techniky, baňkování) — nezáleží na konkrétní technice. Aktualizováno
  klientem 2026-08-06 (dříve 1000 Kč / 25 minut; starší orientační sazba
  "35-40 Kč/minutu" tím pozbývá platnosti — neuvádět). Taping/kineziotaping/
  crosstaping a partnerské masáže mají jiný ceníkový model (u tapingu cena
  zatím nepotvrzena, u partnerských masáží platí 1900 Kč/60 minut beze změny).

Tech stack — pevně dané





Čistý HTML5 / CSS3 / Vanilla JS. Žádné frameworky (React, Vue...), žádný bundler,
žádný build krok, žádné npm závislosti pro běh webu.



Statický web, nasaditelný kamkoliv (Netlify, GitHub Pages, Forpsi apod.) prostým nahráním.



Statický vícestránkový web bez frameworku a bez buildu (čisté HTML5/CSS3/vanilla JS, žádné
npm závislosti pro běh webu). index.html zůstává hlavní landing page se sekcemi jako
<section id="..."> a kotvami pro navigaci — funguje jako samostatný konverzní tok. Doplňkové
podstránky služeb žijí v /sluzby/[slug].html (např. /sluzby/bankovani.html), sdílejí
styles.css a script.js s hlavní stránkou, mají vlastní <title>/meta description/H1, ale bez
duplicitního JSON-LD LocalBusiness (ten zůstává jen na index.html).



CSS ve vlastním souboru styles.css (ne inline, kromě kritického above-the-fold CSS
pokud to bude potřeba pro výkon).



JS ve script.js, moduly dělit podle funkce (nav.js, gallery.js...) pokud naroste.



Sémantické HTML5 elementy vždy (<nav>, <section>, <article>, <figure>, <address>).



Souborová struktura

/
├── index.html
├── styles.css
├── script.js
├── /sluzby
│   ├── klasicke-masaze.html
│   ├── lymfaticke-masaze.html
│   ├── reflexni-terapie.html
│   ├── mekke-trakcni-techniky.html
│   ├── taping-kineziotaping-crosstaping.html
│   ├── bankovani.html
│   └── partnerske-masaze.html
├── /assets
│   ├── /img       (WebP primárně, JPG fallback)
│   └── /icons     (SVG)
├── sitemap.xml
├── robots.txt
└── favicon + apple-touch-icon + og-image.jpg

Obecné design skilly — jak se aplikují v tomto projektu

V .claude/skills/ jsou kromě sekčních skillů i dva obecné: frontend-design
(anthropics/skills) a taste-skill (leonxlnx/taste-skill). Oba popisují návrhové
principy pro "anti-slop" weby, ale taste-skill je psaný pro React/Next.js/Tailwind/
Framer Motion/GSAP/shadcn stack. Pravidlo, jak se čtou v kontextu tohoto projektu:

- Přebírá se jejich designové myšlení — barevná kázeň (jeden akcent, žádné
  nechtěné míchání palety), diverzifikace layoutu (ne 3x stejný pattern po sobě),
  pravidlo "motion má důvod" (žádná animace bez funkce), audit copy před odevzdáním,
  kontrola kontrastu tlačítek, disciplína v hero sekci (max 2 řádky nadpisu, CTA
  viditelné bez scrollu) — to vše platí a překládá se do vanilla HTML/CSS/JS.
- Nepřebírají se jejich stack-specifické instrukce. React/Next.js, Tailwind,
  Framer Motion / GSAP, shadcn/Radix, npm ikonové balíčky, Server Components a
  podobné pokyny se pro tento projekt ignorují — "Tech stack — pevně dané" výše
  má vždy přednost. Ekvivalent v praxi: místo Framer Motion použij CSS
  transitions/keyframes nebo IntersectionObserver ve vanilla JS; místo Tailwind
  utility třídy v styles.css; místo npm ikon SVG v /assets/icons.
- Jejich doporučené barevné palety / fonty se nepoužívají — design tokeny
  a typografie jsou definované níže v "Design systém — závazné tokeny" a mají
  přednost i před "banned palette" pravidly z taste-skill. Změna tokenů vyžaduje
  pořád výslovné schválení (viz Pracovní postup níže), skill sám o sobě
  schválení nenahrazuje.



Design systém — závazné tokeny

Klinická preciznost bývalého maséra profesionálního fotbalového klubu, ne spa/wellness a ne
startupová SaaS estetika. Redesign 2026-07-28 (schváleno uživatelem, varianta "Klinický les"):
--paper původně skoro identické s hexem, který je v taste-skill explicitně označený jako
"AI slop cream" — nahrazeno chladnějším odstínem. Dvojice komplementárních akcentů
(lime+coral) nahrazena jedním tlumeným akcentem — taste-skill pravidlo "max 1 accent color".

:root {
  /* Podklad */
  --paper: #F4F6F2;
  --ink: #16241F;          /* hluboká lesní, ne čistě černá — beze změny, už distinktivní */
  --ink-soft: #4B5A50;

  /* Akcent — jeden, tlumený rezavý (tejpovací páska / klinická preciznost) */
  --accent: #C9662E;
  --accent-deep: #A34F1F;

  /* Flow-line — jemný jednobarevný přechod akcent → accent-deep, jen jako linka/podtržení,
     nikdy plošné pozadí */
  --flow-line: linear-gradient(115deg, var(--accent) 0%, var(--accent-deep) 100%);

  /* Funkční stavové barvy formuláře — nezávislé na brand akcentu (běžná UX konvence
     zelená=OK/červená=chyba, ne součást brand identity) */
  --success: #3F7D3A;
  --error: #B3261E;
}

Kontrast (WCAG, vypočteno): --ink na --paper 14.8:1. --accent na --paper 3.6:1 — accent proto
jen pro UI prvky/hranice/velký text, nikdy jako barva odstavcového textu.

Typografie:





Display: Archivo (700–800) — robustnější, méně "geometricky hravé" tvary než dřívější Space
Grotesk (jeden z nejběžnějších display fontů indie-SaaS/Linear-stylu). Čte se sebevědomě/
klinicky, ne startupově hravě, a zůstává ve stejné neo-grotesque rodině jako Inter, takže
párování nepůsobí nesourodě. Plná podpora české diakritiky.



Body: Inter (400–600) — čitelnost, dobrá CZ diakritika. Beze změny: výměna body fontu je
nejdražší/nejméně přínosná páka, čitelnost drobného textu na mobilu je důležitější než
distinktivnost na úrovni odstavce.



Žádný třetí font bez konzultace

Signaturní prvek — "flow-line": jemná jednobarevná gradientová linka (akcent → tmavší
akcent), která propojuje sekce jako vizuální nit. Použití:





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

