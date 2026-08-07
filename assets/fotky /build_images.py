#!/usr/bin/env python3
"""Převod klientských fotek do webových assetů (WebP + JPG fallback).

Zdroj: assets/fotky/<sluzba>/*.jpeg  (nezveřejňuje se, zůstává mimo web)
Cíl:   assets/img/<slug>-800.{webp,jpg}

Ořezy jsou ruční (nikoliv center-crop) — u každé fotky jde o to, aby v kadru
zůstaly ruce/technika, ne aby se zachoval střed snímku.
"""
from PIL import Image, ImageFile
import os

# klasicka masaz3.jpeg je v posledních bytech useknutá (viz README poznámka)
ImageFile.LOAD_TRUNCATED_IMAGES = True

ROOT = "/Users/krystofsobotka/Desktop/Klienti /Tomáš Ketsner - masér "
SRC = os.path.join(ROOT, "assets/fotky ")
DST = os.path.join(ROOT, "assets/img")

CARD = (800, 500)   # 16:10 — .service-card__media na homepage
GRID = (800, 600)   # 4:3   — .sluzba-detail__media-grid na podstránkách

# (zdroj, výstupní slug, cílový rozměr, crop box (l,t,r,b) nebo None)
JOBS = [
    # ---- homepage karty (16:10) ----
    ("klasicka masaz /tomas kestner klasicka masaz .jpeg",
     "klasicka-masaz-zad", CARD, (0, 120, 1600, 1120)),
    ("lymfaticka masaz /lymfaticke masaze 1.jpeg",
     "lymfaticka-masaz-lymfodrenaz", CARD, (0, 850, 1200, 1600)),
    ("reflexni terapie /reflenxni terapie .jpeg",
     "reflexni-terapie-chodidla", CARD, (0, 100, 1600, 1100)),
    ("mobilizacni trakcni techniky /mobilizacni trakcni techniky 2.jpeg",
     "mekke-trakcni-techniky-sije", CARD, (200, 150, 1600, 1025)),
    ("bankovani /bankovani .jpeg",
     "bankovani-zad", CARD, (0, 120, 1600, 1120)),

    # ---- podstránky (4:3) ----
    ("klasicka masaz /klasicka masaz .jpeg",
     "klasicka-masaz-provozovna", GRID, None),
    ("klasicka masaz /klasicka masaz3.jpeg",
     "klasicka-masaz-uvolneni-zad", GRID, None),

    ("lymfaticka masaz /lymfatikce masaze .jpeg",
     "lymfodrenaz-hrudniku", GRID, (0, 350, 1200, 1250)),
    ("lymfaticka masaz /lymfaticke masaze 2.jpeg",
     "lymfodrenaz-dolnich-koncetin", GRID, (0, 700, 1200, 1600)),

    ("reflexni terapie /reflexni terapie 3.jpeg",
     "reflexni-terapie-tlak-na-chodidlo", GRID, None),
    ("reflexni terapie /reflexni terapie 2.jpeg",
     "reflexni-terapie-v-praxi", GRID, None),

    ("mobilizacni trakcni techniky /mobilizacni trakcni techniky .jpeg",
     "mekke-trakcni-techniky-zada", GRID, None),
    ("mobilizacni trakcni techniky /Mobilizacni trakcni techniky 4.jpeg",
     "mekke-trakcni-techniky-hrudni-patere", GRID, None),

    ("bankovani /bankovani 1.jpeg",
     "bankovani-banky-na-zadech", GRID, None),
    ("bankovani /bankovani 3 .jpeg",
     "bankovani-nasazeni-banky", GRID, None),

    # ---- dárkové poukazy (nativní poměr 902x590, žádný ořez) ----
    ("darkovy poukaz /Poukaz masaz 1ks .png",
     "darkovy-poukaz-na-castku", (902, 590), None),
    ("darkovy poukaz /poukaz masaz 1000Kč .png",
     "darkovy-poukaz-na-pocet-masazi", (902, 590), None),

    # ---- portrét do sekce O mně ----
    # Zdroj je nativně 778x1038 = přesně 3:4 (.o-mne__media), takže se
    # needituje ani neořezává — jen převod do WebP/JPG v nativním rozlišení.
    # Pozn.: 778px je pod doporučenými 900px z TODO v index.html, ale při
    # zobrazené šířce 420px to pořád vychází na ~1.85x — upscale by kvalitu
    # jen zhoršil, takže zůstává nativ.
    ("portret tomase kestnera /portret tomase kestner .png",
     "tomas-kestner-portret", (778, 1038), None),
]

# Galerie na homepage — dlaždice mají aspect-ratio 1/1 (viz .gallery-item).
# Každá fotka jde ven ve dvou šířkách kvůli srcset: 480w pro mobilní 2sloupcový
# grid, 1000w pro desktop (3 sloupce v 1200px containeru = ~384 CSS px) a pro
# lightbox (max-width min(92vw, 1100px)).
SQUARE_SIZES = (480, 1000)

GALLERY_JOBS = [
    # (zdroj, slug, crop box na čtverec)
    # 2048x1536 → čtverec 1536px, vycentrovaný na vchod s cedulí MASÁŽE
    ("galerie /provozovna na radouči 1042.jpeg",
     "provozovna-na-radouci-1042", (256, 0, 1792, 1536)),
    # 1200x1600 na výšku → čtverec 1200px posunutý dolů tak, aby v kadru
    # zůstal obličej i obě ruce na noze klienta
    ("galerie /technika najdi a povol v akci .jpeg",
     "najdi-a-povol-v-akci", (0, 230, 1200, 1430)),
    # 1600x1200 → čtverec 1200px, těžiště na baňkách a pumpičce
    ("galerie /bankovani galerie .jpeg",
     "bankovani-v-akci", (250, 0, 1450, 1200)),
    # 2048x1536 → čtverec posunutý mírně doprava, aby se vešel celý
    # masážní stůl a zároveň zbyl kus masážní židle vlevo
    ("galerie /vybavení provozovny .jpeg",
     "vybaveni-provozovny", (380, 0, 1916, 1536)),
    # 2048x1536 → čtverec doprava na sedačku a stolek (samotná čekárna),
    # z recepčního pultu zůstává jen hrana
    ("galerie /cekarna provozovny .jpeg",
     "cekarna-provozovny", (400, 0, 1936, 1536)),
]


def save_pair(im, stem):
    jpg = os.path.join(DST, f"{stem}.jpg")
    webp = os.path.join(DST, f"{stem}.webp")
    im.save(jpg, "JPEG", quality=78, optimize=True, progressive=True)
    im.save(webp, "WEBP", quality=74, method=6)
    print(f"{stem:42s} {im.size}  jpg={os.path.getsize(jpg)//1024}kB  "
          f"webp={os.path.getsize(webp)//1024}kB")


def build(src_rel, slug, size, box):
    im = Image.open(os.path.join(SRC, src_rel)).convert("RGB")
    if box:
        im = im.crop(box)
    im = im.resize(size, Image.LANCZOS)
    # poukazy a portrét jdou ven v nativním rozlišení, proto bez -800 suffixu
    native = slug.startswith("darkovy-poukaz") or slug == "tomas-kestner-portret"
    save_pair(im, f"{slug}{'' if native else '-800'}")


def build_square(src_rel, slug, box):
    im = Image.open(os.path.join(SRC, src_rel)).convert("RGB").crop(box)
    for px in SQUARE_SIZES:
        save_pair(im.resize((px, px), Image.LANCZOS), f"{slug}-{px}")


for job in JOBS:
    build(*job)

for job in GALLERY_JOBS:
    build_square(*job)
