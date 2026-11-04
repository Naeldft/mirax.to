// Contrôle automatique : rend séparément le calque 3D et le calque texte (1 image sur 3, au quart
// de la résolution), puis vérifie avec scripts/check_layout.py :
//  - qu'aucun texte n'est hors zone de sécurité ni trop près des bords ;
//  - qu'aucun objet 3D ne recouvre un texte (marge comprise).
// node scripts/check-layout.mjs [début] [fin]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { renderFrames, selectComposition } from '@remotion/renderer';
import { ROOT, browserExecutable, chromiumOptions, makeBundle } from './common.mjs';

const [a = '0', b = '1499'] = process.argv.slice(2);
const dir = path.join(ROOT, 'out/check');
const serveUrl = await makeBundle();
for (const layer of ['3d', 'text']) {
  const outputDir = path.join(dir, layer);
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });
  const inputProps = { showContact: true, layer };
  const composition = await selectComposition({ serveUrl, id: 'PatronStudio', inputProps, browserExecutable, chromiumOptions });
  await renderFrames({
    serveUrl,
    composition,
    inputProps,
    outputDir,
    imageFormat: 'png',
    scale: 0.25,
    everyNthFrame: 3,
    frameRange: [Number(a), Number(b)],
    concurrency: 3,
    browserExecutable,
    chromiumOptions,
    onStart: () => {},
    onFrameUpdate: () => {},
  });
  console.log('calque', layer, 'rendu');
}
execFileSync('python3', [path.join(ROOT, 'scripts/check_layout.py'), dir], { stdio: 'inherit' });
