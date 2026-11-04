"""Analyse des calques rendus par check-layout.mjs."""
import os
import re
import sys

import numpy as np
from PIL import Image

d = sys.argv[1]
S = 0.25  # échelle de rendu
TOP, BOTTOM, SIDE = 160, 1920 - 280, 60  # zone de sécurité et marge latérale (px pleine résolution)
MARGIN = 16  # marge texte ↔ 3D (px pleine résolution)


def frames(layer):
    out = {}
    for f in os.listdir(os.path.join(d, layer)):
        m = re.search(r'(\d+)\.png$', f)
        if m:
            out[int(m.group(1))] = os.path.join(d, layer, f)
    return out


def lum(p):
    a = np.asarray(Image.open(p).convert('RGB')).astype(np.float32)
    return a.max(axis=2)


def dilate(m, r):
    out = m.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            out |= np.roll(np.roll(m, dy, 0), dx, 1)
    return out


f3, ft = frames('3d'), frames('text')
problems = 0
for k in sorted(set(f3) & set(ft)):
    t = lum(ft[k]) > 60
    if not t.any():
        continue
    ys, xs = np.nonzero(t)
    y0, y1, x0, x1 = ys.min() / S, ys.max() / S, xs.min() / S, xs.max() / S
    msg = []
    if y0 < TOP or y1 > BOTTOM:
        msg.append(f'texte hors zone verticale ({y0:.0f}–{y1:.0f})')
    if x0 < SIDE or x1 > 1080 - SIDE:
        msg.append(f'texte trop près du bord ({x0:.0f}–{x1:.0f})')
    g = lum(f3[k]) > 45
    ov = dilate(t, max(1, int(MARGIN * S))) & g
    n = int(ov.sum())
    if n > 3:
        oy, ox = np.nonzero(ov)
        msg.append(f'3D sur texte : {n} px vers y≈{oy.mean() / S:.0f}')
    if msg:
        problems += 1
        print(f'image {k * 3}: ' + ' ; '.join(msg))
print(f'{problems} image(s) avec problème sur {len(set(f3) & set(ft))} contrôlées')
