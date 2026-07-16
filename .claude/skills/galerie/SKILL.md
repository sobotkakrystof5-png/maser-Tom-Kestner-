---
name: galerie
description: Použij při stavbě nebo úpravě galerie fotek — provozovna, technika v akci, prostředí.
---

# Sekce Galerie

## Účel

Ukázat reálné prostředí a práci, snížit nejistotu klienta před první návštěvou
(jak to tam vypadá, jak masáž probíhá). Nahrazuje generické stock fotky, které
web dělaly nedůvěryhodným na starém Webnode webu.

## Obsah

- Reálné fotky provozovny (Na Radouči 1042, Mladá Boleslav), Tomáše při práci
  (technika "najdi a povol", taping/kineziotaping, baňkování), případně detaily
  vybavení.
- Žádné stock fotky spa klišé (svíčky, kamínky, cizí lidé) — v souladu s
  pozicováním proti wellness klišé z `.claude/skills/filozofie/SKILL.md`.
- Dokud reálné fotky nejsou dodané: `<!-- TODO: nahradit reálným obsahem -->`
  a placeholder musí být vizuálně zjevný jako zástupný (ne finální stock fotka
  vydávaná za hotovou galerii).

## Technika a výkon

- Formát: WebP primárně, JPG fallback (`<picture>` element), dle souborové
  struktury `/assets/img` v CLAUDE.md.
- Všechny galerie obrázky mimo hero mají `loading="lazy"`.
- Popisný `alt` text v češtině pro každou fotku (co je na fotce, ne
  "obrazek1.jpg", "IMG_2034").
- Pokud je galerie lightbox/carousel: ovládání klávesnicí funkční, viditelný
  focus stav, `prefers-reduced-motion` respektováno u přechodů/animací.
- Responzivní srcset/velikosti podle breakpointů (480/768/1024/1280px) — needit
  jeden velký obrázek na mobil zbytečně.

## Doplňky — technické detaily implementace

- CSS grid s `aspect-ratio` pro konzistentní dlaždice, `object-fit: cover` —
  zabraňuje layout shiftu a nerovnoměrným dlaždicím při různých poměrech stran zdrojových fotek.
- Vlastní lightbox (žádná knihovna typu lightbox.js — drží vanilla stack z
  CLAUDE.md): klik na dlaždici → fullscreen overlay, `<dialog>` element nebo
  vlastní modal s `position: fixed`.
- Klávesnicová navigace v lightboxu konkrétně: šipky pro posun mezi fotkami, Esc
  na zavření.
- Lazy loading platí na všech dlaždicích mimo první 2–3 viditelné (ne jen "mimo hero").
- Placeholder dokud nejsou reálné fotky: dlaždice s energy-flow gradientem +
  jednoduchou abstraktní SVG ikonou (ruce/masáž/pohyb), ne klipart.
- V kódu jasně okomentovat očekávané rozlišení/poměr stran reálných fotek:
  min. 1200px šířka, formát 4:3 nebo 1:1.

## Checklist před dokončením sekce

- [ ] Žádná stock/placeholder fotka není vydávaná za finální obsah bez TODO značky
- [ ] Všechny obrázky mimo hero jsou lazy-loaded
- [ ] Každý obrázek má popisný český `alt`
- [ ] WebP + fallback formát dodržen
- [ ] Lightbox/carousel ovladatelný klávesnicí, pokud existuje
- [ ] Lightbox reaguje na šipky i Esc, dlaždice používají `aspect-ratio`/`object-fit: cover`
- [ ] Placeholder dlaždice jasně komentují očekávané rozlišení/poměr stran budoucí fotky
