#!/usr/bin/env bash
# Construit le dossier à envoyer tel quel sur l'hébergement OVH (offre Starter, statique) :
#   dossier-ovh/            ← le site Patrôn Studio (copie de site/)
#   dossier-ovh/demos/<métier>/  ← chaque démo compilée (React/Vite, base /demos/<métier>/)
# Usage : ./construire-dossier-ovh.sh
set -euo pipefail
cd "$(dirname "$0")"

DEMOS=(restauration plomberie location-voitures btp coiffure boulangerie coach boutique photographe association)
OUT=dossier-ovh

echo "→ Installation des dépendances des démos"
(cd demos && npm install --no-audit --no-fund)

echo "→ Compilation des démos"
for d in "${DEMOS[@]}"; do
  (cd "demos/$d" && npx vite build --logLevel warn)
done

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
