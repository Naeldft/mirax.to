// Génère les visuels du site à partir de la 3D (studio de rendu render.html).
// Usage : npm run images            → toutes les images
//         npm run images -- margherita galerie:four   → seulement certaines
// Les fichiers produits (public/images/…) peuvent ensuite être remplacés par de vraies photos.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import sharp from 'sharp';
import { createRequire } from 'node:module';
import { pizzas } from '../src/data/pizzas.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const jobs = [
  ...pizzas.map((p) => ({ name: p.id, query: `shot=pizza&pizza=${p.id}`, out: `public/images/pizzas/${p.id}.webp`, transparent: true })),
  { name: 'galerie:four', query: 'shot=four', out: 'public/images/galerie/four.webp' },
  { name: 'galerie:margherita', query: 'shot=angle&pizza=margherita', out: 'public/images/galerie/margherita.webp' },
  { name: 'galerie:diavola', query: 'shot=top&pizza=diavola', out: 'public/images/galerie/diavola.webp' },
  { name: 'galerie:ingredients', query: 'shot=ingredients', out: 'public/images/galerie/ingredients.webp' },
  { name: 'galerie:tartufo', query: 'shot=angle&pizza=tartufo', out: 'public/images/galerie/tartufo.webp' },
  { name: 'galerie:vivo', query: 'shot=angle&pizza=vivo', out: 'public/images/galerie/vivo.webp' },
];
const wanted = process.argv.slice(2);
const todo = wanted.length ? jobs.filter((j) => wanted.includes(j.name)) : jobs;

// Playwright : installé dans le projet (npm i -D playwright) ou globalement.
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const browserPath = process.env.CHROME_PATH || undefined;

const server = await createServer({ root: ROOT, server: { port: 5199, strictPort: true }, logLevel: 'error' });
await server.listen();
const browser = await chromium.launch({ executablePath: browserPath, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1300, height: 1000 } });
page.on('pageerror', (e) => console.error('Erreur page :', e.message));
for (const j of todo) {
  await page.goto(`http://localhost:5199/render.html?${j.query}`);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
  const png = await page.locator('#shot').screenshot({ omitBackground: !!j.transparent });
  await sharp(png).webp({ quality: 84, alphaQuality: 90 }).toFile(path.join(ROOT, j.out));
  console.log('✔', j.out);
}
await browser.close();
await server.close();
