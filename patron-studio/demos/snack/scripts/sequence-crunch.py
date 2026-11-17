"""
Séquence vidéo de l'intro Crunch! : images WebP étalonnées, à partir du montage des 3 clips Kling
(clips entiers, 24 i/s, fondus enchaînés de 0,5 s aux raccords, filigrane déjà recadré hors du cadre).

    python3 scripts/sequence-crunch.py <montage.mp4>

Traitement de chaque image :
  - harmonisation des clips : la couleur moyenne de chaque image est ramenée doucement vers celle de l'ensemble
    (moyenne glissante sur 2 s), pour que les raccords ne changent pas de teinte ;
  - étalonnage commun : noirs profonds, teinte chaude, légère vignette (le grain est ajouté à l'écran, animé) ;
  - la séquence s'arrête sur la plancha, juste avant le plan du burger (image 458) ;
  - ordinateur : 1 280 × 720 ; téléphone : le centre recadré en vertical, 540 × 960.
"""
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image
from scipy.ndimage import uniform_filter1d

ICI = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ICI, '..', 'public', 'sequence')
N = 458  # dernière image gardée : la plancha

src = sys.argv[1]
tmp = tempfile.mkdtemp()
subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-frames:v', str(N), os.path.join(tmp, '%03d.png')], check=True)
fichiers = sorted(f for f in os.listdir(tmp) if f.endswith('.png'))[:N]

moy = np.array([np.asarray(Image.open(os.path.join(tmp, f)).convert('RGB').resize((208, 117))).reshape(-1, 3).mean(0) for f in fichiers])
lisse = uniform_filter1d(moy, 48, axis=0, mode='nearest')
cible = np.median(moy, axis=0)
gains = (cible / lisse) ** 0.7


def vignette(h, w, force=0.32):
    y, x = np.mgrid[0:h, 0:w]
    r = np.hypot((x - w / 2) / (w / 2), (y - h / 2) / (h / 2)) / np.sqrt(2)
    return (1 - force * r ** 2.2)[..., None]


def etalonner(a, gain):
    a = a / 255.0 * gain
    a = np.clip((a - 0.018) / 0.982, 0, 1) ** 1.08  # noirs plus profonds
    a[..., 0] *= 1.035  # teinte chaude
    a[..., 2] *= 0.93
    return a


for d in ('ordi', 'mobile'):
    os.makedirs(os.path.join(OUT, d), exist_ok=True)
    for f in os.listdir(os.path.join(OUT, d)):
        os.remove(os.path.join(OUT, d, f))
vo = vignette(720, 1280)
vm = vignette(960, 540, 0.28)
for i, f in enumerate(fichiers):
    im = Image.open(os.path.join(tmp, f)).convert('RGB')
    W, H = im.size
    o = np.asarray(im.resize((1280, 720), Image.LANCZOS)).astype(float)
    o = etalonner(o, gains[i]) * vo
    Image.fromarray((np.clip(o, 0, 1) * 255).astype(np.uint8)).save(os.path.join(OUT, 'ordi', f'{i + 1:03d}.webp'), quality=55, method=4)
    cw = round(H * 9 / 16)
    m = np.asarray(im.crop(((W - cw) // 2, 0, (W - cw) // 2 + cw, H)).resize((540, 960), Image.LANCZOS)).astype(float)
    m = etalonner(m, gains[i]) * vm
    Image.fromarray((np.clip(m, 0, 1) * 255).astype(np.uint8)).save(os.path.join(OUT, 'mobile', f'{i + 1:03d}.webp'), quality=50, method=4)
print('images :', len(fichiers))
