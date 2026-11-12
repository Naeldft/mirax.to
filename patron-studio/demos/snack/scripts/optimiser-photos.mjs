/**
 * ============================================================
 *  PHOTOS DE CRUNCH! — conversion automatique en WebP
 * ============================================================
 *  Les photos d'origine sont dans  snack/photos/<nom>.jpg  (ou .jpeg, .png, .webp).
 *  Ce script crée les versions optimisées dans  snack/public/images/  :
 *    <nom>-480.webp, <nom>-800.webp, <nom>-1200.webp (+ 1800 et 2400 pour l'accueil)
 *
 *  POUR REMPLACER UNE PHOTO : déposez votre fichier dans snack/photos/ avec
 *  EXACTEMENT le même nom (ex. burger-classic.jpg), puis relancez la compilation
 *  (npm run build, ou ./construire-dossier-ovh.sh). Ce script tourne tout seul avant.
 *
 *  Liste des emplacements : voir snack/photos/LISEZ-MOI.md
 */
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ici = dirname(fileURLToPath(import.meta.url));
const SOURCES = join(ici, '..', 'photos');
const SORTIE = join(ici, '..', 'public', 'images');
mkdirSync(SORTIE, { recursive: true });

// largeurs générées, et format (rapport largeur/hauteur) de recadrage
const REGLES = {
  'accueil-': { largeurs: [800, 1200, 1800, 2400], ratio: null, qualite: 74 },
  'ambiance-': { largeurs: [800, 1400], ratio: null, qualite: 68 },
  defaut: { largeurs: [480, 800, 1200], ratio: 4 / 3, qualite: 72 },
};
const regle = (nom) => Object.entries(REGLES).find(([k]) => k !== 'defaut' && nom.startsWith(k))?.[1] ?? REGLES.defaut;

const fichiers = readdirSync(SOURCES).filter((f) => ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()));
let faits = 0;
for (const f of fichiers) {
  const nom = basename(f, extname(f));
  const src = join(SOURCES, f);
  const { largeurs, ratio, qualite } = regle(nom);
  for (const w of largeurs) {
    const out = join(SORTIE, `${nom}-${w}.webp`);
    // déjà à jour : on ne refait pas le travail
    if (existsSync(out) && statSync(out).mtimeMs > statSync(src).mtimeMs) continue;
    let img = sharp(src).rotate();
    img = ratio
      ? img.resize(w, Math.round(w / ratio), { fit: 'cover', position: sharp.strategy.attention })
      : img.resize({ width: w, withoutEnlargement: true });
    await img.webp({ quality: qualite, effort: 5 }).toFile(out);
    faits++;
  }
}
console.log(`Photos : ${fichiers.length} sources, ${faits} fichier(s) WebP mis à jour dans public/images/`);
