"""
Burgers 3D de Crunch! d'après les photos de référence (fournies par le client, détourées dans photos/burgers-3d/).
Pour chaque burger :
  - public/scene3d/burgers/<id>-hd.webp et -sd.webp : la photo détourée (transparence), recadrée ;
  - src/three/burger/profils.js : le contour de la photo ligne par ligne (centre et demi-largeur), qui sert
    à construire le volume 3D sur lequel on projette la photo.
À relancer si on remplace une photo :  python3 scripts/burgers-photo.py
"""
import json
import os

import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import label, maximum_filter1d, uniform_filter1d

ICI = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ICI, '..', 'photos', 'burgers-3d')
OUT = os.path.join(ICI, '..', 'public', 'scene3d', 'burgers')
os.makedirs(OUT, exist_ok=True)
IDS = ['chicken-crispy', 'forestier', 'double-cheese', 'chicken-avocat', 'egg-bacon']
LIGNES = 160  # lignes du profil

profils = {}
for id_ in IDS:
    im = Image.open(os.path.join(SRC, f'{id_}.png')).convert('RGBA')
    a = np.asarray(im)[..., 3] > 110
    # on garde le plus grand morceau (le burger), sans les miettes autour
    lab, n = label(a)
    if n > 1:
        tailles = np.bincount(lab.ravel())
        tailles[0] = 0
        a = lab == tailles.argmax()
    rgba = np.asarray(im).copy()
    rgba[..., 3] = np.where(a, rgba[..., 3], 0)
    ys = np.where(a.any(1))[0]
    xs = np.where(a.any(0))[0]
    m = 6
    y0, y1 = max(0, ys.min() - m), min(a.shape[0], ys.max() + m + 1)
    x0, x1 = max(0, xs.min() - m), min(a.shape[1], xs.max() + m + 1)
    rgba = rgba[y0:y1, x0:x1]
    a = a[y0:y1, x0:x1]
    H, W = a.shape
    # contour : premier et dernier pixel opaques de chaque ligne, lissés (les coulures restent gérées par la transparence)
    xl = np.array([np.argmax(r) if r.any() else W / 2 for r in a], float)
    xr = np.array([W - 1 - np.argmax(r[::-1]) if r.any() else W / 2 for r in a], float)
    larg = maximum_filter1d(xr - xl, 9)
    cx = uniform_filter1d((xl + xr) / 2, 15)
    larg = uniform_filter1d(larg, 7)
    rows = np.linspace(0, H - 1, LIGNES).round().astype(int)
    profils[id_] = {
        'l': W,
        'h': H,
        'rangs': [[int(y), round(float(cx[y]), 1), round(float(larg[y] / 2 + 1.5), 1)] for y in rows],
    }
    # textures : la photo à sa taille (agrandie ×1,6 et légèrement renforcée si elle est petite), et une version téléphone
    img = Image.fromarray(rgba)
    if H < 700:
        k = 1.6
        img = img.resize((round(W * k), round(H * k)), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=1.6, percent=60, threshold=2))
    img.save(os.path.join(OUT, f'{id_}-hd.webp'), quality=88, method=6)
    img.resize((round(img.width * 0.55), round(img.height * 0.55)), Image.LANCZOS).save(os.path.join(OUT, f'{id_}-sd.webp'), quality=82, method=6)
    print(id_, W, H, '→', img.size)

with open(os.path.join(ICI, '..', 'src', 'three', 'burger', 'profils.js'), 'w') as f:
    f.write('/* Contours des photos de référence, générés par scripts/burgers-photo.py (ne pas modifier à la main). */\n')
    f.write('/* rangs : [ligne (px), centre (px), demi-largeur (px)] */\n')
    f.write(f'export const profils = {json.dumps(profils, separators=(",", ":"))};\n')
