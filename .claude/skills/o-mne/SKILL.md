---
name: o-mne
description: Použij při stavbě nebo úpravě sekce O mně — životopis, kvalifikace a důvěryhodnost Tomáše Kestnera.
---

# Sekce O mně

## Účel

Vybudovat důvěru konkrétními fakty, ne obecným "vášeň pro obor" příběhem. Klient
si má po přečtení myslet: "tenhle člověk ví, co dělá, a dělal to pro profesionály".

## Fakta (zdroj pravdy — nevymýšlet nic navíc, viz CLAUDE.md)

- Tomáš Kestner, v oboru od 2004, 12+ let soukromé praxe
- 7 let masér profesionálního fotbalového klubu FK Mladá Boleslav
- Lektor rekvalifikačních masérských kurzů (ESF)
- Masáže pro firmy (např. Linet)
- Vlastní originální technika "najdi a povol" (detailní vysvětlení patří do
  `.claude/skills/filozofie/SKILL.md`, tady stačí zmínka v kontextu kvalifikace)

Pokud chybí reálná fotka Tomáše nebo doplňující biografický detail, který není
v seznamu výše, označit `<!-- TODO: nahradit reálným obsahem -->` — nikdy si
nedomýšlet další životopisná fakta, certifikace nebo jména klientů/firem nad
rámec výše uvedeného.

## Struktura a copywriting

- Fakta prezentovat jako konkrétní čísla/tvrzení, ne jako odstavec prózy:
  "20 let praxe, 7 u profi fotbalistů" je správný vzor, ne "dlouholetá zkušenost
  v oboru".
- Chronologie nebo hierarchie faktů podle síly důkazu důvěryhodnosti (profesionální
  sport a lektorská činnost váží víc než obecné roky praxe).
- Jeden H2 pro sekci, žádné vedlejší téma (ceník, kontakt) zde nemíchat.
- Fotka Tomáše (portrét nebo v akci) doporučená — `loading="lazy"` pokud není
  v hero/above the fold.

## Doplňky

- Doporučená otevírací kompozice: krátký osobní odstavec (3–4 věty, 1. osoba) —
  cesta k masérství, co Tomáše na oboru baví — před samotnou timeline faktů.
- Fakta lze prezentovat jako mini-timeline s roky, ne jen plochý seznam, např.:
  2004 — první certifikát/začátek praxe · 7 let — masér FK Mladá Boleslav ·
  lektor rekvalifikačních kurzů (ESF) · masáže pro firmy · 12+ let soukromé praxe.
  Timeline může použít energy-flow linku jako spojnici mezi milníky (vizuální
  echo filozofie sekce napříč webem).
- 1. osoba jednotného čísla důsledně v celém odstavci — starý web chyboval
  mixem jednotného a množného čísla, tomu se vyhnout.

## Checklist před dokončením sekce

- [ ] Všechna uvedená fakta odpovídají seznamu výše, žádné vymyšlené doplnění
- [ ] Chybějící reálný obsah (fotka, doplňkové info) je označen TODO komentářem
- [ ] Text je heslovitý a konkrétní, ne obecná marketingová próza
- [ ] `alt` text fotky popisuje obsah česky, ne generický název souboru
- [ ] Text důsledně v 1. osobě jednotného čísla, bez mixu s množným
- [ ] Pokud je použita timeline, je čitelná i na mobilu (vertikální layout pod 768px)
