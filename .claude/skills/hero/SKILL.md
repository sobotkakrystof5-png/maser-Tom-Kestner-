---
name: hero
description: Použij při stavbě nebo úpravě hero sekce (první obrazovka webu, above the fold) — H1, hlavní claim, primární CTA, hero vizuál.
---

# Hero sekce

## Účel

Prvních 3 sekundy rozhodují, jestli návštěvník zůstane. Hero musí okamžitě sdělit
tři věci: kdo Tomáš je, čím se liší od běžného maséra/spa, a co má návštěvník
udělat teď (zavolat/objednat). Žádné rozklikávání pro základní info.

## Povinný obsah

- **H1** (jediný na stránce) — heslovitý, konkrétní claim. Ne "Masáže Mladá Boleslav"
  jako fráze, ale pozicování na technice a zkušenosti: propojit "najdi a povol"
  techniku a 20 let praxe / 7 let u FK Mladá Boleslav do jednoho úderného sdělení.
- **Podnadpis (H2 nebo odstavec)** — 1 věta, konkrétní diferenciace (profesionální
  sport, klinický přístup na triggerpointy, ne wellness klišé).
- **Primární CTA** — telefonní číslo `603 486 737` jako tap-to-call odkaz
  (`tel:+420603486737`) a/nebo CTA scrollující na kontakt/rezervaci. Viz
  `.claude/skills/cta-globalni/SKILL.md` pro přesný vzhled a chování tlačítka.
- **Vizuál** — fotka/video akce (masáž, pohyb, technika), ne stock spa fotky se
  svíčkami. Pokud reálná fotka chybí, `<!-- TODO: nahradit reálným obsahem -->`
  a placeholder musí být vizuálně odlišitelný (ne tichá náhrada).

## Struktura a technika

- `<section id="hero">` jako první sekce v `<body>`, hned po `<nav>`.
- Hero obrázek/video NENÍ `loading="lazy"` — je above the fold, musí se načíst
  ihned (LCP element).
- Žádný render-blocking JS v hero — respektuje globální pravidlo výkonu z CLAUDE.md.
- Scroll-progress indikátor (energy-flow gradient) může začínat vizuálně u hero,
  ale samotný gradient nesmí být plošné pozadí sekce — jen akcent (linka, podtržení
  claimu, CTA hover).

## Copywriting

- Žádné obecné fráze ("kvalitní služby za skvělé ceny", "váš partner pro zdraví").
- Konkrétnost nad vznešeností — pokud je místo pro číslo/fakt, use ho (roky praxe,
  FK Mladá Boleslav) místo abstraktního přídavného jména.
- Jedna zpráva, jeden úkol: hero neprodává celý ceník, jen zaujme a pošle dál.

## Doplňky

- **Eyebrow label nad H1** — "Mladá Boleslav · Od 2004": okamžitá lokální +
  credibility signalizace ještě před přečtením H1.
- **Sekundární CTA** — "Jak metoda funguje" jako kotva na `#filozofie`, vizuálně
  tichá, nekonkuruje primárnímu CTA (viz `.claude/skills/cta-globalni/SKILL.md`).
- H1 používá konkrétní sloveso v akci (najdu, uvolním, rozhýbu), ne stavový popis
  — soulad s pravidlem "aktivní hlas" z CLAUDE.md.
- Sticky nav nad hero nesmí na mobilu zabírat víc než 72px výšky, aby nekradl
  prostor CTA tlačítku ve viewportu.

## Checklist před dokončením sekce

- [ ] H1 obsahuje diferenciaci (technika/zkušenost), ne generickou frázi
- [ ] Tap-to-call funguje na mobilu (`tel:` odkaz)
- [ ] LCP obrázek není lazy-loaded, má popisný `alt`
- [ ] Kontrast textu přes hero vizuál splňuje WCAG AA (i přes fotku/gradient)
- [ ] Žádný layout shift při načtení webfontů (Space Grotesk/Inter)
- [ ] Eyebrow label a sekundární CTA (`#filozofie`) jsou přítomné a nekonkurují primárnímu CTA
- [ ] Sticky nav nad hero ≤ 72px výšky na mobilu
