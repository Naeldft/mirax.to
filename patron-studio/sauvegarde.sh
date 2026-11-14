#!/usr/bin/env bash
# Sauvegarde du projet (code source, photos, vidéo) en un zip, sans les dossiers régénérables.
# Usage : ./patron-studio/sauvegarde.sh "phase-1"   → sauvegardes/mirax-phase-1-AAAA-MM-JJ.zip
set -euo pipefail
cd "$(dirname "$0")/.."
NOM="mirax-${1:-sauvegarde}-$(date +%Y-%m-%d).zip"
mkdir -p sauvegardes
git log --oneline > HISTORIQUE-GIT.txt
rm -f "sauvegardes/$NOM"
zip -qr "sauvegardes/$NOM" patron-studio video-patron-studio .gitignore HISTORIQUE-GIT.txt \
  -x '*/node_modules/*' '*/dist/*' 'patron-studio/site-ovh/*' 'patron-studio/*.zip' \
     'video-patron-studio/out/*' '*.DS_Store'
rm -f HISTORIQUE-GIT.txt
echo "✔ sauvegardes/$NOM ($(du -h "sauvegardes/$NOM" | cut -f1))"
