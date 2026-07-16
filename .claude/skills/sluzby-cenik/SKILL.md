---
name: sluzby-cenik
description: Použij při stavbě nebo úpravě sekce Služby a ceník — výčet nabízených masáží/technik, ceny, dárkové poukazy.
---

# Sekce Služby & ceník

## Účel

Umožnit klientovi rychle pochopit nabídku a najít cenu bez telefonování — chybějící
nebo nejasný ceník je nejčastější důvod, proč potenciální klient web opustí bez
objednání.

## Fakta (zdroj pravdy — nevymýšlet ceny, viz CLAUDE.md)

Nabídka:
- Klasické masáže
- Lymfatické masáže
- Reflexní terapie
- Měkké a trakční techniky
- Taping, kineziotaping, crosstaping
- Baňkování
- Partnerské masáže

Ceny — **jediná potvrzená cena**:
- Partnerské masáže: **1900 Kč / 60 minut**, pouze čtvrtek a pátek (uvést časové
  omezení viditelně u ceny, ne jako drobné písmo)

Dárkové poukazy v libovolné hodnotě (zmínit jako samostatnou položku/CTA, ne
schované v seznamu služeb).

Pro všechny ostatní služby **nevymýšlet konkrétní ceny**. Pokud ceník není
kompletně dodaný klientem, každá chybějící cena musí být `<!-- TODO: nahradit
reálným obsahem --><!-- cena k doplnění od klienta -->` a v UI viditelně jako
"cena na dotaz" nebo obdobně — nikdy tichá smyšlená částka.

## Struktura

- Karty nebo řádky služeb: název, krátký popis (1 věta, co to řeší/pro koho),
  cena nebo "na dotaz".
- Partnerské masáže vizuálně odlišit (omezená dostupnost dny v týdnu je důležitá
  informace, ne poznámka pod čarou).
- Dárkový poukaz jako vlastní mini-CTA blok v rámci sekce (odkaz/tlačítko na
  kontakt, viz `.claude/skills/cta-globalni/SKILL.md`).
- Sémantické značení seznamu služeb (`<ul>`/`<article>` per služba), ne jen
  `<div>` polévka.

## Copywriting

- Popis služby = co konkrétně řeší (např. "reflexní terapie — cílená práce na
  konkrétní bod/problém"), ne generický wellness popis.
- Žádné "kvalitní služby za skvělé ceny" a podobné prázdné fráze.

## Doplňky

- Grid layout: 3 sloupce na desktopu, 1 sloupec na mobilu; jemné bordery, hover
  stav s jemným zvýrazněním (lime nebo coral accent linka, ne celoplošná barva karty).
- Partnerská masáž může mít vizuální odlišení formou badge ("Čt + Pá") — funkční
  vzor pro zvýraznění omezené dostupnosti, ne jen text v popisku.
- Vzorový příklad benefit-copy (k čemu služba pomáhá, ne jen definice):
  lymfatická masáž → "úleva od otoklých kotníků a těžkých nohou", ne jen "detoxikace".

## Checklist před dokončením sekce

- [ ] Cena 1900 Kč/60 min u partnerských masáží je uvedená spolu s omezením
      čtvrtek/pátek, ne odděleně
- [ ] Žádná jiná cena není vymyšlená — buď z faktů výše, nebo TODO/"na dotaz"
- [ ] Dárkové poukazy mají vlastní viditelné místo v sekci
- [ ] Každá služba má popis, ne jen název
- [ ] Grid je 3 sloupce desktop / 1 sloupec mobil, hover accent není celoplošná barva
