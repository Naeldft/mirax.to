// Rend des images fixes de contrôle : node scripts/stills.mjs 0 60 300 ... [--safe]
import path from 'node:path';
import fs from 'node:fs';
import { renderStill, selectComposition } from '@remotion/renderer';
import { ROOT, browserExecutable, chromiumOptions, makeBundle } from './common.mjs';

const args = process.argv.slice(2);
const safe = args.includes('--safe');
const id = args.includes('--sans-contact') ? 'PatronStudioSansContact' : 'PatronStudio';
const frames = args.filter((a) => !a.startsWith('--')).map(Number);
const outDir = path.join(ROOT, 'out/stills');
fs.mkdirSync(outDir, { recursive: true });
const serveUrl = await makeBundle();
const inputProps = { showContact: id === 'PatronStudio', debugSafe: safe };
const composition = await selectComposition({ serveUrl, id, inputProps, browserExecutable, chromiumOptions });
for (const frame of frames) {
  const output = path.join(outDir, `${id}-${String(frame).padStart(4, '0')}${safe ? '-safe' : ''}.png`);
  await renderStill({ serveUrl, composition, frame, output, inputProps, browserExecutable, chromiumOptions, scale: 0.5 });
  console.log(output);
}
