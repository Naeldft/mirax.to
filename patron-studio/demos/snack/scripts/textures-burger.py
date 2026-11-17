"""
Textures des burgers 3D de Crunch!, calculées (pas de photo, pas d'IA) : bruit fractal, dégradés, motifs.
Pour chaque ingrédient : <nom>-couleur-<def>.webp et <nom>-rm-<def>.webp (R = relief, G = rugosité),
en « hd » (ordinateur) et « sd » (téléphone). À relancer seulement si on change une recette de texture :
    python3 scripts/textures-burger.py
"""
import os

import numpy as np
from PIL import Image
from scipy.ndimage import zoom

ICI = os.path.dirname(os.path.abspath(__file__))
SORTIE = os.path.join(ICI, '..', 'public', 'scene3d', 'tex')
os.makedirs(SORTIE, exist_ok=True)
T = 1024  # tout est calculé en 1 024, puis réduit


def grille(n, graine, taille=T):
    r = np.random.default_rng(graine).random((n, n))
    return zoom(r, taille / n, order=3, mode='grid-wrap')[:taille, :taille]


def fbm(base, octaves, graine, taille=T, gain=0.5):
    t = np.zeros((taille, taille))
    a, somme = 1.0, 0.0
    for o in range(octaves):
        n = min(taille, base * 2 ** o)
        t += a * grille(n, graine * 31 + o, taille)
        somme += a
        a *= gain
    t /= somme
    return (t - t.min()) / (t.max() - t.min())


def lisse(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def mel(c1, c2, t):
    t = np.asarray(t)[..., None]
    return np.array(c1, float) * (1 - t) + np.array(c2, float) * t


# coordonnées : V = ligne (0 → 1 de haut en bas de l'image, retournée à l'enregistrement), U = colonne
V, U = np.mgrid[0:T, 0:T] / (T - 1)
X, Y = U * 2 - 1, V * 2 - 1
R = np.hypot(X, Y)
A = np.arctan2(Y, X)


def enregistrer(nom, couleur, relief, rugosite, defs=(('hd', 1024), ('sd', 512)), retourner=True):
    c = np.clip(couleur, 0, 255).astype(np.uint8)
    rm = np.zeros((T, T, 3), np.uint8)
    rm[..., 0] = np.clip(relief * 255, 0, 255)
    rm[..., 1] = np.clip(rugosite * 255, 0, 255)
    rm[..., 2] = 0
    for im, q, suffixe in ((c, 80, 'couleur'), (rm, 82, 'rm')):
        if retourner:
            im = np.flipud(im)
        for d, w in defs:
            Image.fromarray(im).resize((w, w), Image.LANCZOS).save(os.path.join(SORTIE, f'{nom}-{suffixe}-{d}.webp'), quality=q, method=6)
    print(nom)


# ---------- pain du dessus (profil tourné : V = 0 au sommet, 1 au bord du dessous ; U = tour) ----------
def pain_dessus(nom, dore=(128, 56, 16), clair=(226, 170, 98), graine=1):
    taches = fbm(4, 5, graine)
    fin = fbm(32, 4, graine + 1)
    pores = fbm(96, 2, graine + 2)
    jupe = lisse(0.8, 0.93, V + (taches - 0.5) * 0.08)  # la « jupe » claire du pain, irrégulière
    col = mel(dore, (172, 84, 24), lisse(0.1, 0.8, V))
    col = mel(col, clair, jupe)
    col = mel(col, (196, 128, 58), lisse(0.93, 1.0, V))  # léger bord doré au contact de la plaque
    col *= (0.86 + 0.26 * taches)[..., None]
    col *= (0.95 + 0.1 * fin)[..., None]
    relief = 0.55 * fin + 0.3 * pores + 0.15 * taches
    rug = 0.3 + 0.36 * jupe + 0.12 * fin
    enregistrer(nom, col, relief, rug)


# ---------- mie grillée (disque à plat) ----------
def mie(nom, graine=3, grillage=1.0):
    cell = fbm(64, 3, graine)
    pores = (cell < 0.33).astype(float) * (1 - cell * 2)
    t = fbm(6, 4, graine + 1)
    dore = lisse(0.95, 0.25, R + (t - 0.5) * 0.35) * grillage
    col = mel((242, 220, 172), (196, 128, 52), dore * 0.9)
    col = mel(col, (166, 96, 34), lisse(0.6, 0.95, t) * dore * 0.6)
    col *= (1 - 0.35 * pores)[..., None]
    col = mel(col, (176, 104, 40), lisse(0.93, 0.99, R))  # croûte au bord de la coupe
    relief = 0.6 - 0.5 * pores + 0.2 * fbm(128, 2, graine + 4)
    enregistrer(nom, col, relief, 0.82 - 0.1 * dore)


# ---------- talon (pain du dessous, V = 0 au bord du haut, 1 au centre du dessous) ----------
def talon(nom, base=(204, 136, 64), graine=5):
    t = fbm(4, 5, graine)
    fin = fbm(32, 4, graine + 1)
    col = mel(base, (168, 98, 40), lisse(0.25, 0.7, V))
    col *= (0.88 + 0.22 * t)[..., None]
    col *= (0.95 + 0.1 * fin)[..., None]
    enregistrer(nom, col, 0.6 * fin + 0.4 * t, 0.62 + 0.15 * fin)


# ---------- steak smashé (profil tourné : V 0 = centre du dessus, ~0,5 = bord, 1 = centre du dessous) ----------
def steak(nom, graine=7, cru=(72, 38, 20)):
    croute = fbm(10, 6, graine)
    bulles = fbm(48, 3, graine + 1)
    fin = fbm(160, 2, graine + 2)
    bord = np.exp(-((V - 0.5) / 0.1) ** 2)
    col = mel(cru, (128, 72, 34), lisse(0.5, 0.78, croute))  # caramélisé
    col = mel(col, (40, 22, 13), lisse(0.55, 0.2, croute) * 0.8)  # creux sombres
    col = mel(col, (32, 18, 10), bord * lisse(0.3, 0.8, bulles) * 0.85)  # dentelle croustillante sombre
    col = mel(col, (158, 98, 44), bord * lisse(0.72, 0.9, fin) * 0.7)  # pointes grillées claires
    col *= (0.9 + 0.2 * fin)[..., None]
    gras = lisse(0.62, 0.85, bulles) * (1 - bord)
    relief = 0.45 * croute + 0.35 * bulles + 0.2 * fin
    enregistrer(nom, col, relief, 0.62 - 0.32 * gras + 0.1 * fin)


# ---------- cheddar fondu (à plat) ----------
def cheddar(nom, c=(244, 146, 8), graine=9):
    t = fbm(6, 4, graine)
    f = fbm(64, 2, graine + 1)
    col = mel(c, (236, 128, 10), t * 0.5)
    col *= (0.96 + 0.06 * f)[..., None]
    enregistrer(nom, col, 0.3 * t + 0.1 * f, 0.26 + 0.12 * t)


# ---------- salade (disque à plat : nervures depuis le centre) ----------
def salade(nom, graine=11):
    t = fbm(5, 5, graine)
    n = 26
    ang = A + (fbm(8, 3, graine + 1) - 0.5) * 0.5
    nerv = np.exp(-((((ang / (2 * np.pi) * n) % 1) - 0.5) / 0.06) ** 2) * lisse(0.15, 0.4, R)
    centre = np.exp(-((Y - 0) / 0.035) ** 2) * 0  # (pas de côte centrale sur un disque mélangé)
    col = mel((150, 196, 78), (88, 146, 40), lisse(0.1, 0.65, R))
    col = mel(col, (52, 108, 30), lisse(0.65, 1.0, R + (t - 0.5) * 0.3))
    col = mel(col, (210, 232, 150), nerv * 0.6 + centre)
    col *= (0.9 + 0.2 * t)[..., None]
    enregistrer(nom, col, 0.5 + 0.4 * nerv - 0.2 * t, 0.42 + 0.1 * t)


# ---------- tranche de tomate (disque à plat) ----------
def tomate(nom, graine=13):
    t = fbm(8, 4, graine)
    loges = 4
    secteur = (((A + (t - 0.5) * 0.5) / (2 * np.pi) * loges) % 1)
    cloison = np.exp(-((secteur) / 0.09) ** 2) + np.exp(-((secteur - 1) / 0.09) ** 2)
    loge = lisse(0.24, 0.3, R) * lisse(0.74, 0.68, R) * (1 - np.clip(cloison, 0, 1))
    col = np.zeros((T, T, 3)) + np.array([222, 52, 34])
    col = mel(col, (236, 110, 70), lisse(0.25, 0.0, R))  # cœur plus clair
    col = mel(col, (242, 140, 74), loge * 0.85)  # gelée
    # pépins
    rng = np.random.default_rng(graine)
    pep = np.zeros((T, T))
    for _ in range(46):
        a = rng.random() * 2 * np.pi
        rr = 0.35 + rng.random() * 0.3
        s = int(loges * ((a / (2 * np.pi)) % 1))
        a = (s + 0.2 + rng.random() * 0.6) * 2 * np.pi / loges
        cx, cy = np.cos(a) * rr, np.sin(a) * rr
        d = ((X - cx) * np.cos(a) + (Y - cy) * np.sin(a)) ** 2 / 0.022 ** 2 + ((-(X - cx) * np.sin(a) + (Y - cy) * np.cos(a)) ** 2) / 0.013 ** 2
        pep = np.maximum(pep, np.clip(1.3 - d, 0, 1))
    col = mel(col, (240, 214, 130), pep * loge)
    col = mel(col, (176, 22, 14), lisse(0.92, 0.98, R))  # peau
    col *= (0.93 + 0.12 * t)[..., None]
    enregistrer(nom, col, 0.5 - 0.3 * loge + 0.3 * pep, 0.16 + 0.1 * t, defs=(('hd', 512), ('sd', 256)))


# ---------- rondelle de cornichon (disque à plat) ----------
def cornichon(nom, graine=15):
    t = fbm(8, 4, graine)
    col = mel((176, 178, 82), (138, 150, 56), lisse(0.0, 0.8, R))
    graines = lisse(0.4, 0.46, R) * lisse(0.64, 0.58, R) * lisse(0.5, 0.75, fbm(40, 2, graine + 1))
    col = mel(col, (214, 210, 150), graines * 0.8)
    col = mel(col, (58, 80, 26), lisse(0.88, 0.95, R))
    col *= (0.9 + 0.2 * t)[..., None]
    enregistrer(nom, col, 0.5 + 0.3 * graines, 0.2 + 0.1 * t, defs=(('hd', 512), ('sd', 256)))


# ---------- bacon (bande : U le long, V en travers) ----------
def bacon(nom, graine=17):
    t = fbm(6, 5, graine)
    f = fbm(64, 3, graine + 1)
    vague = V + 0.08 * np.sin(U * np.pi * 6 + t * 3)
    bandes = lisse(0.35, 0.5, (np.sin(vague * np.pi * 5) * 0.5 + 0.5) + (t - 0.5) * 0.5)
    col = mel((122, 40, 24), (226, 178, 132), bandes * 0.8)
    col = mel(col, (70, 26, 14), lisse(0.6, 0.85, f) * 0.6)  # bords grillés
    col *= (0.88 + 0.24 * t)[..., None]
    enregistrer(nom, col, 0.5 * f + 0.3 * t, 0.4 - 0.15 * bandes + 0.1 * f, defs=(('hd', 512), ('sd', 256)))


pain_dessus('pain')
pain_dessus('pain-paprika', dore=(120, 30, 18), clair=(196, 72, 40), graine=21)
mie('mie')
talon('talon')
talon('talon-paprika', base=(190, 70, 42), graine=23)
steak('steak')
cheddar('cheddar')
salade('salade')
tomate('tomate')
cornichon('cornichon')
bacon('bacon')
