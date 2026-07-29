---
name: filozofie
description: Použij při stavbě nebo úpravě sekce filozofie/přístupu — vysvětlení techniky "najdi a povol" a pozicování proti spa/wellness klišé.
---

# Sekce Filozofie

## Účel

Vysvětlit, čím se Tomášův přístup liší od běžné masáže/spa procedury, a proč to
znamená lepší výsledek pro klienta. Tohle je sekce, která prodává metodu, ne jen
"příjemný zážitek" — čtenář má pochopit, že jde o cílenou, klinicky podloženou
práci s tělem, ne relaxační doplněk.

## Povinný obsah

- **Technika "najdi a povol"** — vlastní originální trakční tlaková uvolňovací
  technika na spazmy, triggerpointy a zkrácené svaly. Popsat srozumitelně laikovi
  (co to dělá s tělem, proč to funguje), ale bez marketingového zjednodušení do
  prázdné fráze.
- **Pozicování: synergie těla, pohybu a regenerace** — ne spa/wellness v klasickém
  slova smyslu. Explicitně se vyhnout obrazům/slovům spojeným se spa klišé (svíčky,
  kamínky, pastelová levandule, "dopřejte si chvilku pro sebe").
- **Profesní kontext jako důkaz metody** — 7 let u FK Mladá Boleslav a masáže pro
  firmy (Linet) patří sem nebo do sekce O mně jako podpora věrohodnosti přístupu
  (profesionální sportovci potřebují funkční, ne relaxační výsledek — to je důkaz,
  že technika funguje).

## Copywriting a tón

- Energický, věcný jazyk — žádné "uspávající" slovní spojení typické pro spa weby.
- Konkrétnost: popisovat mechaniku techniky (tlak, trakce, uvolnění) místo pocitů
  ("relaxace", "harmonie").
- Nadpis sekce max 4–6 slov, jasné jedno sdělení — nemíchat s nabídkou služeb
  (ta patří do `.claude/skills/sluzby-cenik/SKILL.md`).

## Design

- Flow-line (jemný přechod akcent → tmavší akcent) se sem hodí jako vizuální metafora
  pohybu — např. jako vedoucí linka mezi kroky vysvětlení techniky, nikdy jako plošné
  pozadí.
- Respektovat `prefers-reduced-motion`, pokud je zde animovaný prvek znázorňující
  "flow"/pohyb.

## Doplňky

- **Doporučená struktura ve 3 krocích procesu** (čitelná i bez čtení odstavců,
  jen z nadpisů kroků), max 1–2 věty na krok:
  1. Najdu blokádu — diagnostika, palpace triggerpointů
  2. Uvolním trakcí — kombinace trakčně-tlakové techniky a měkkých technik dle potřeby
  3. Ušiju na míru — personalizace intenzity a přístupu
- Numerování kroků (`01/02/03`, mono-font labely) je zde na místě — skutečný
  sekvenční proces, ne dekorace.
- Vyhýbat se anatomickým/lékařským ilustracím u kroků — působí klinicky/chladně,
  tón zůstává lidský a energický, ne nemocniční.
- Konkrétní slova k vyloučení nad rámec obecných spa klišé: "harmonie",
  "energetické pole", "čakry" — Tomáš je fyzioterapeuticky/sportovně orientovaný,
  ne ezoterický.
- Volitelně: krátká citace/filozofie klienta o přístupu k tělu a regeneraci —
  pouze pokud Tomáš dodá vlastní text, jinak nevymýšlet citaci za něj.
- Sekce má vlastní CTA na konci — "Vyzkoušet na vlastní kůži" → `#kontakt`
  (viz `.claude/skills/cta-globalni/SKILL.md` pro umístění a vzhled).

## Checklist před dokončením sekce

- [ ] Text nikde neobsahuje spa/wellness klišé slova ani jejich vizuální ekvivalent
- [ ] Technika "najdi a povol" je vysvětlena věcně, ne jen pojmenována
- [ ] Sekce má jedno jasné sdělení, neopakuje fakta ze sekce O mně/Služby doslovně
- [ ] Žádná animace flow gradientu bez respektování `prefers-reduced-motion`
- [ ] Proces (pokud použit) je čitelný i jen z nadpisů kroků, žádný krok nepřesahuje 2 věty
- [ ] Sekce končí vlastním CTA směřujícím na `#kontakt`
