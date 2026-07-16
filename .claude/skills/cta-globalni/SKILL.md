---
name: cta-globalni
description: Použij při práci na jakémkoli call-to-action prvku napříč webem — tlačítka, tap-to-call odkazy, sticky/nav CTA, konzistence chování a vzhledu.
---

# Globální CTA pravidla

Na rozdíl od ostatních skillů, které pokrývají jednu sekci, tenhle skill platí
napříč celým webem — kdykoli se přidává nebo upravuje jakékoli tlačítko/odkaz
s akčním úmyslem (zavolat, napsat, objednat, přejít na kontakt).

## Účel

Konzistentní CTA je to, co nakonec převádí návštěvníka na klienta. Nekonzistentní
vzhled nebo chování (jinde tlačítko vede na `#kontakt`, jinde na `tel:`, jinde nikam)
podkopává důvěru a snižuje konverzi — přímo proti byznysovému cíli z CLAUDE.md.

## Typy CTA a jejich cíl

- **Primární CTA (telefon)** — `tel:+420603486737`. Preferovaný typ CTA všude,
  kde má návštěvník nejvyšší záměr (hero, sticky CTA, kontakt). Na mobilu toto
  je nejrychlejší cesta k objednání.
- **Sekundární CTA (scroll/anchor)** — odkaz na `#kontakt`, `#sluzby-cenik` apod.
  pro návštěvníky, kteří ještě potřebují víc info před voláním.
- **E-mail CTA** — `mailto:tomas.kestner@seznam.cz`, doplňkové, ne náhrada
  telefonu jako primární cesty (masér typicky preferuje telefon pro rychlé
  domlouvání termínů).

## Vizuální pravidla

- CTA tlačítko používá design tokeny z CLAUDE.md — barva akcentu `--lime`/`--coral`,
  hover stav využívá `--flow-gradient` (signaturní prvek), ne plošně, jen jako
  akcent/podtržení nebo pozadí samotného tlačítka při hover.
- Border-radius střídmý (4–8px), konzistentní se zbytkem designu — žádné velké
  kulaté "pilulkové" tlačítko, které by působilo genericky.
- Viditelný focus stav (klávesnicová navigace) na každém CTA bez výjimky.
- Stejná vizuální hierarchie napříč sekcemi: jedno primární CTA na sekci,
  sekundární CTA vizuálně podřazené (outline/menší váha).

## Chování

- Telefonní CTA vždy `tel:` odkaz, nikdy jen text čísla bez odkazu.
- Anchor CTA vždy odpovídá skutečnému `id` cílové sekce — kontrolovat po každé
  změně struktury sekcí, že odkazy nejsou rozbité.
- Sticky/nav CTA (pokud existuje) nesmí překrývat obsah na mobilu ani bránit
  čtení posledního řádku sekce.

## Doplňky — povinná umístění CTA napříč webem

Konkrétní mapa, kde musí CTA být (doplňuje obecný princip "max jeden scroll od
objednání"):

1. Hero — primární CTA ("Objednat masáž")
2. Konec sekce Filozofie — sekundární CTA ("Vyzkoušet na vlastní kůži" → `#kontakt`)
3. Každá karta v sekci Služby — mikro-CTA ("Zeptat se" / "Objednat")
4. Sticky mobilní CTA lišta — fixní pruh dole na mobilu s tlačítky "Zavolat" +
   "Napsat", viditelný po scrollu za hero sekcí
5. Finální CTA sekce před kontaktem/footer — velký, výrazný, poslední příležitost

Zakázané CTA texty bez akčního slovesa: "Klikněte zde", "Více info" — vždy
"Objednat", "Zavolat", "Napsat" apod.

### Sticky mobilní CTA lišta — technické nároky

- Zobrazí se až po scrollu přes hero (ne hned od začátku — nepřekrývá hero CTA).
- `z-index` dostatečně vysoký, ale nesmí překrývat obsah/formulář při psaní.
- Respektuje bezpečné zóny (`env(safe-area-inset-bottom)`) na iOS zařízeních
  s notch/gestem.

## Checklist při každé úpravě CTA

- [ ] Odkaz skutečně funguje (tel/mailto/anchor cílí na existující `id`)
- [ ] Vizuál odpovídá design tokenům, ne ad-hoc barvě
- [ ] Focus stav viditelný
- [ ] Hover animace respektuje `prefers-reduced-motion`
- [ ] Na dané obrazovce/sekci je jasné, které CTA je primární
- [ ] Všech 5 povinných umístění CTA je pokryto (hero, filozofie, služby, sticky lišta, finální sekce)
- [ ] Sticky lišta respektuje `safe-area-inset-bottom` a neschovává se za klávesnicí formuláře
