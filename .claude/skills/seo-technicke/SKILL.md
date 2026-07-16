---
name: seo-technicke
description: Použij při práci na technickém SEO — meta tagy, JSON-LD, sitemap.xml, robots.txt, Open Graph, nadpisová hierarchie, výkon a přístupnost napříč celým webem.
---

# Technické SEO — globální

Stejně jako CTA pravidla, tenhle skill se neváže na jednu sekci — platí pro
`<head>`, root soubory (`sitemap.xml`, `robots.txt`) a strukturální pravidla
napříč celým `index.html`. Cíl: maximální organický dosah, náhrada za nulové
SEO starého Webnode webu.

## `<head>` — povinné

- `<title>` obsahuje klíčové slovo + lokaci, např. vzor "Masáže Mladá Boleslav
  — Tomáš Kestner | [diferenciace]". Ne obecné "Domů" nebo jen jméno firmy.
- `<meta name="description">` obsahuje klíčové slovo + lokaci, heslovité, do
  ~155 znaků, žádná generická marketingová fráze.
- JSON-LD `LocalBusiness`/`HealthAndBeautyBusiness` — jméno, adresa, telefon,
  otevírací doba (jen potvrzená, viz `.claude/skills/lokace-kontakt/SKILL.md`),
  typ služby. Fakta přesně podle CLAUDE.md, žádná domyšlená pole.
- Open Graph + Twitter Card meta tagy s `og-image.jpg` (musí existovat v rootu
  dle souborové struktury z CLAUDE.md).
- `favicon` + `apple-touch-icon` v rootu.

## Nadpisová hierarchie

- Přesně jeden `<h1>` na stránce (v hero sekci).
- Striktně `H1 → H2 → H3`, žádné přeskakování úrovní kvůli vizuálnímu stylu —
  vizuální velikost nadpisu se řeší CSS, ne výběrem jiné úrovně tagu.
- Každá sekce (`<section id="...">`) má typicky jeden `H2` jako svůj nadpis.

## Obrázky a alt texty

- Každý `<img>` má popisný `alt` v češtině vystihující obsah (ne "obrazek1.jpg",
  ne prázdný `alt=""` kromě čistě dekorativních prvků).
- Lazy-loading (`loading="lazy"`) na všem mimo hero/LCP obrázek.

## Root soubory a struktura

- `sitemap.xml` a `robots.txt` v rootu, odkazující na skutečné URL/kotvy webu.
- Interní kotvy (`#sluzby`, `#kontakt` apod.) konzistentní mezi navigací,
  sitemap referencemi a externími odkazy.

## Výkon a přístupnost — práh před dokončením jakékoli sekce

- Lighthouse Performance, SEO, Accessibility ≥ 95 (mobil i desktop).
- Žádný render-blocking JS v `<head>`.
- Kontrast textu na `--paper` i tmavších plochách splňuje WCAG AA.
- Viditelný focus stav na všech interaktivních prvcích.
- `prefers-reduced-motion` respektováno u všech animací (energy-flow gradient
  včetně).

## Doplňky — konkrétní šablony

`<head>` kostra (doplnit reálnou doménu a finální texty):

```html
<title>Masáž Mladá Boleslav — Tomáš Kestner | Metoda najdi a povol</title>
<meta name="description" content="[max 155 znaků, obsahuje 'masáž Mladá Boleslav', konkrétní hodnota]">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="canonical" href="[finální doména]">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="[cesta k og-image.jpg, 1200x630]">
<meta property="og:type" content="website">
<meta property="og:locale" content="cs_CZ">
<meta name="twitter:card" content="summary_large_image">
```

JSON-LD `LocalBusiness` — kostra s fakty z CLAUDE.md (`priceRange` je jen
ilustrativní placeholder, ne potvrzený fakt — buď vynechat, nebo doplnit až
po odsouhlasení s Tomášem):

```json
{
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "Tomáš Kestner — Masáže",
  "telephone": "+420603486737",
  "email": "tomas.kestner@seznam.cz",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Na Radouči 1042",
    "addressLocality": "Mladá Boleslav",
    "postalCode": "293 01",
    "addressCountry": "CZ"
  }
}
```

`robots.txt`:

```
User-agent: *
Allow: /
Sitemap: [finální doména]/sitemap.xml
```

Performance doplňky: preconnect na Google Fonts nebo self-host fontů pro
rychlost; kritický CSS above-the-fold, zbytek lze načíst asynchronně.

Kontrolní nástroje před odevzdáním (kromě Lighthouse): Google Rich Results Test
na validitu JSON-LD, Mobile-Friendly Test.

## Checklist při každé změně `<head>`/root souborů

- [ ] `<title>`/`<meta description>` obsahují klíčové slovo + lokaci
- [ ] JSON-LD odpovídá přesně faktům z CLAUDE.md, žádná vymyšlená pole
- [ ] Přesně jeden H1, hierarchie H1→H2→H3 bez přeskoků
- [ ] `sitemap.xml`/`robots.txt` aktuální vůči skutečné struktuře sekcí
- [ ] Lighthouse práh ≥ 95 ve všech čtyřech kategoriích ověřen po změně
- [ ] JSON-LD prošlo Google Rich Results Test bez chyb
- [ ] Stránka prošla Mobile-Friendly Test
