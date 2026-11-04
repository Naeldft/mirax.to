// Convertit les polices libres (OFL) en polices "typeface" JSON pour three.js (texte 3D extrudé).
// À relancer seulement si vous changez de police : node scripts/build-fonts.mjs
import fs from 'node:fs';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

const jobs = [
  ['@fontsource/syne/files/syne-latin-800-normal.woff', 'syne-800.typeface.json'],
  ['@fontsource/inter/files/inter-latin-800-normal.woff', 'inter-800.typeface.json'],
];
for (const [src, out] of jobs) {
  const buf = fs.readFileSync(new URL(`../node_modules/${src}`, import.meta.url));
  const json = new TTFLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  fs.writeFileSync(new URL(`../public/fonts/${out}`, import.meta.url), JSON.stringify(json));
  console.log(out, 'glyphs:', Object.keys(json.glyphs).length, 'ô:', 'ô' in json.glyphs);
}
