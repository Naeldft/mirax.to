// Génère public/ps-mark.svg (monogramme PS vectoriel) à partir de la police Inter ExtraBold.
import fs from 'node:fs';
import opentype from 'opentype.js';

const buf = fs.readFileSync(new URL('../node_modules/@fontsource/inter/files/inter-latin-800-normal.woff', import.meta.url));
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const green = process.argv[2] ?? '#2CE584';
const size = 300;
// glyphe par glyphe (évite le moteur de mise en forme d'opentype.js)
const pathAt = (x, y) => {
  const out = new opentype.Path();
  let cx = x;
  for (const ch of 'PS') {
    const g = font.charToGlyph(ch);
    out.extend(g.getPath(cx, y, size));
    cx += (g.advanceWidth / font.unitsPerEm) * size;
  }
  return out;
};
const bb = pathAt(0, 0).getBoundingBox();
const w = bb.x2 - bb.x1;
const h = bb.y2 - bb.y1;
const box = 512;
const dx = box / 2 - (bb.x1 + w / 2);
const dy = box / 2 - (bb.y1 + h / 2);
const d = pathAt(dx, dy).toPathData(2);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${box} ${box}" width="${box}" height="${box}">
  <rect x="24" y="24" width="464" height="464" rx="104" fill="#000" stroke="${green}" stroke-width="36"/>
  <path d="${d}" fill="#fff"/>
</svg>
`;
fs.writeFileSync(new URL('../public/ps-mark.svg', import.meta.url), svg);
console.log('public/ps-mark.svg');
