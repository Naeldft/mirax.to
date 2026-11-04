// Génère les sous-titres .srt (optionnels, pour les plateformes qui les acceptent).
import fs from 'node:fs';
import { allLines } from '../src/captions';
import { FPS } from '../src/timeline';

const ts = (f: number) => {
  const ms = Math.round((f / FPS) * 1000);
  const p = (n: number, l = 2) => String(n).padStart(l, '0');
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};
const [out, mode] = process.argv.slice(2);
const srt = allLines(mode !== 'sans-contact')
  .map((l, i) => `${i + 1}\n${ts(l.from)} --> ${ts(l.to)}\n${l.text}\n`)
  .join('\n');
fs.writeFileSync(out, srt);
console.log(out);
