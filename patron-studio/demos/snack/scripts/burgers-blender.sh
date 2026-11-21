#!/usr/bin/env bash
# Étape 4 dans Blender : modèles des 5 burgers (GLB), leur ombre sur la planche (Cycles) et un aperçu.
# Prérequis : Blender 4 (apt install blender python3-numpy), Node, Python 3 avec Pillow.
#   ./scripts/burgers-blender.sh <planche.gltf Poly Haven « wooden_cutting_board » 1k> [dossier de sortie]
# Les ombres (WebP transparents) sont copiées dans public/scene3d/burgers/ ; les modèles et aperçus restent
# dans le dossier de sortie (le site construit la même géométrie lui-même, sans téléchargement).
set -euo pipefail
cd "$(dirname "$0")/.."
PLANCHE="$1"
SORTIE="${2:-$(mktemp -d)}"
mkdir -p "$SORTIE"
node --input-type=module -e "
import { profils } from './src/three/burger/profils.js';
import { bornes } from './src/three/burger/bornes.js';
import fs from 'node:fs';
fs.writeFileSync('$SORTIE/donnees.json', JSON.stringify({ profils, bornes }));"
blender -b --factory-startup -P scripts/burgers-blender.py -- "$SORTIE/donnees.json" public/scene3d/burgers "$PLANCHE" "$SORTIE" apercus
python3 - "$SORTIE" <<'PY'
import sys
from PIL import Image
s = sys.argv[1]
for k in ['chicken-crispy', 'forestier', 'double-cheese', 'chicken-avocat', 'egg-bacon']:
    o = Image.open(f'{s}/{k}-ombre.png').convert('RGBA').resize((256, 256), Image.LANCZOS)
    noir = Image.new('RGBA', o.size, (0, 0, 0, 0))
    noir.putalpha(o.split()[3])
    noir.save(f'public/scene3d/burgers/{k}-ombre.webp', quality=82, method=6)
print('ombres copiées dans public/scene3d/burgers/ ; modèles et aperçus dans', s)
PY
