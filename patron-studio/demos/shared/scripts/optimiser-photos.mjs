/**
 * Conversion des photos d'une démo : node ../shared/scripts/optimiser-photos.mjs <dossier de la démo>
 *  Sources : <démo>/photos/<nom>.jpg|jpeg|png|webp
 *  Sortie  : <démo>/public/images/<nom>-800.webp (mobile) et <nom>-1600.webp (ordinateur)
 *  Pour remplacer une photo : déposer un fichier du même nom dans photos/ et recompiler.
 */
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import sharp from 'sharp';

const demo = resolve(process.argv[2] ?? '.');
const SOURCES = join(demo, 'photos');
const SORTIE = join(demo, 'public', 'images');
if (!existsSync(SOURCES)) process.exit(0);
mkdirSync(SORTIE, { recursive: true });
const fichiers = readdirSync(SOURCES).filter((f) => ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()));
let faits = 0;
for (const f of fichiers) {
  const nom = basename(f, extname(f));
  const src = join(SOURCES, f);
  for (const w of [800, 1600]) {
    const out = join(SORTIE, `${nom}-${w}.webp`);
    if (existsSync(out) && statSync(out).mtimeMs > statSync(src).mtimeMs) continue;
    await sharp(src).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: w === 800 ? 70 : 74, effort: 5 }).toFile(out);
    faits++;
  }
}
console.log(`Photos (${basename(demo)}) : ${fichiers.length} sources, ${faits} WebP créés ou mis à jour`);
