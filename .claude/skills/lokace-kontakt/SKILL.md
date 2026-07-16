---
name: lokace-kontakt
description: Použij při stavbě nebo úpravě sekce Lokace a kontakt — adresa, telefon, e-mail, mapa, otevírací doba, JSON-LD LocalBusiness.
---

# Sekce Lokace & kontakt

## Účel

Poslední krok před objednáním — musí být bezešvý. Jakékoli tření tady (nejasná
adresa, nefunkční tap-to-call, chybějící mapa) přímo stojí klienty. Tahle sekce
má i klíčovou technickou roli: nese lokální SEO strukturovaná data.

## Fakta (zdroj pravdy, viz CLAUDE.md)

- Provozovna: **Na Radouči 1042, 293 01 Mladá Boleslav**
- Tel: **603 486 737**
- E-mail: **tomas.kestner@seznam.cz**
- IČ: **71037845**

Otevírací dobu, pokud není v CLAUDE.md potvrzená, neuvádět vymyšlenou —
`<!-- TODO: nahradit reálným obsahem — otevírací doba od klienta -->` a v
JSON-LD `openingHoursSpecification` vynechat nebo označit placeholder, dokud
není potvrzeno (nesprávná otevírací doba ve strukturovaných datech je hůř než
její absence).

## Struktura a technika

- `<address>` sémantický element pro adresu (součást pravidla "sémantické HTML5
  elementy vždy" z CLAUDE.md).
- Telefon jako `tel:+420603486737` odkaz, e-mail jako `mailto:` odkaz.
- Mapa (Google Maps embed nebo statická s odkazem) — pokud embed, lazy-load
  iframe a zvážit dopad na výkon/Lighthouse skóre.
- **JSON-LD strukturovaná data** typu `LocalBusiness`/`HealthAndBeautyBusiness`
  v `<head>` dokumentu (ne v této sekci samotné) — jméno, adresa, telefon,
  otevírací doba (pokud potvrzená), typ služby. Koordinace s
  `.claude/skills/seo-technicke/SKILL.md` pro přesný formát.
- Interní kotva `#kontakt` musí odpovídat odkazům z navigace a případným
  externím odkazům (Google Business profil apod.).

## Doplňky — kontaktní formulář

Kromě tap-to-call a mailto odkazů sekce může obsahovat jednoduchý kontaktní
formulář (jméno, telefon/e-mail, zpráva):

- Vanilla JS validace, žádný framework. Formulář potřebuje backend/službu pro
  odeslání kompatibilní se statickým hostingem (Formspree, Netlify Forms nebo
  `mailto:` fallback) — vybrat řešení podle skutečné hostingové platformy.
- HTML5 validace (`required`, `type="email"`, `type="tel"`) + JS pro přívětivé
  chybové hlášky v češtině, konkrétní ne obecné: "Zkontrolujte prosím telefonní
  číslo", ne jen "Chyba".
- Po odeslání jasná zpětná vazba (success stav v hlase Tomáše, 1. osoba):
  "Zpráva odeslána, ozvu se co nejdřív" — ne tichý reload stránky.
- Tlačítka "Zavolat" a "Napsat e-mail" zůstávají vedle formuláře jako
  rovnocenná duplicitní cesta, ne nahrazená formulářem.
- Volitelně: 1–2 věty o dostupnosti provozovny (parkování, MHD) pokud Tomáš dodá info.

## Checklist před dokončením sekce

- [ ] Adresa, telefon, e-mail, IČ odpovídají přesně faktům výše
- [ ] Tap-to-call a mailto odkazy funkční na mobilu
- [ ] `<address>` element použit, ne `<div>`/`<p>`
- [ ] JSON-LD LocalBusiness v `<head>` obsahuje jen potvrzená fakta, ne vymyšlenou
      otevírací dobu
- [ ] Kotva `#kontakt` odpovídá navigaci
- [ ] Pokud existuje formulář: má HTML5 fallback validaci i bez JS a jasný success stav
- [ ] Tlačítka "Zavolat"/"Napsat e-mail" jsou viditelná vedle formuláře, ne jen uvnitř něj
