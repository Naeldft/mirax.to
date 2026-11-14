#!/usr/bin/env bash
# Construit le dossier à envoyer tel quel à la racine (www/) de l'hébergement OVH :
#   dossier-ovh/            ← le site Patrôn Studio (copie de site/)
#   dossier-ovh/demos/<métier>/  ← chaque démo compilée (React/Vite, base /demos/<métier>/)
# Usage : ./construire-dossier-ovh.sh
set -euo pipefail
cd "$(dirname "$0")"

DEMOS=(restauration plomberie location-voitures btp coiffure boulangerie coach boutique photographe association snack conseil)
OUT=site-ovh

echo "→ Installation des dépendances des démos"
(cd demos && npm install --no-audit --no-fund)

echo "→ Compilation des démos"
for d in "${DEMOS[@]}"; do
  (cd "demos/$d" && npm run build --silent -- --logLevel warn)
done

echo "→ Compilation du moteur 3D de l’accueil (site/3d/)"
(cd demos/accueil && npx vite build --logLevel warn)

echo "→ Assemblage de $OUT/"
rm -rf "$OUT"
cp -r site "$OUT"
mkdir -p "$OUT/demos"
for d in "${DEMOS[@]}"; do
  cp -r "demos/$d/dist" "$OUT/demos/$d"
done

echo "→ Archive $OUT.zip"
rm -f "$OUT.zip"
(cd "$OUT" && zip -qr "../$OUT.zip" . -x '.DS_Store')

echo "✔ Prêt : $(du -sh "$OUT" | cut -f1) dans $OUT/ (et $OUT.zip)"
