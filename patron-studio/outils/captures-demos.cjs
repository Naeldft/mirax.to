/**
 * Refait les captures des 12 démos pour la maquette de l'accueil et les cartes « Votre futur site ».
 *
 * Utilisation (depuis patron-studio/) :
 *   ./construire-dossier-ovh.sh
 *   php -S 127.0.0.1:8098 -t site-ovh &        (ou tout autre petit serveur sur site-ovh/)
 *   node outils/captures-demos.cjs             (toutes les démos)  |  node outils/captures-demos.cjs snack,btp
 * Produit dans site/assets/captures/ : <demo>-ordi-1200.webp, <demo>-ordi-640.webp, <demo>-mobile.webp
 * Besoin : Playwright (navigateur Chromium) et Python 3 avec Pillow.
 */
const { chromium, devices } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BASE = process.env.BASE || 'http://127.0.0.1:8098';
const SORTIE = path.join(__dirname, '..', 'site', 'assets', 'captures');
const DEMOS = (process.argv[2] || 'restauration,plomberie,location-voitures,btp,coiffure,boulangerie,coach,boutique,photographe,association,snack,conseil').split(',');
const brut = fs.mkdtempSync(path.join(os.tmpdir(), 'captures-'));

(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  for (const [n, opt] of [['ordi', { viewport: { width: 1440, height: 900 } }], ['mobile', { ...devices['iPhone 13'], deviceScaleFactor: 2 }]]) {
    const ctx = await b.newContext(opt);
    for (const d of DEMOS) {
      const p = await ctx.newPage();
      await p.goto(`${BASE}/demos/${d}/`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(8000); // la 3D et les animations d'entrée se posent
      await p.screenshot({ path: path.join(brut, `${d}-${n}.png`) });
      await p.close();
      console.log('capturé', d, n);
    }
    await ctx.close();
  }
  await b.close();
  fs.mkdirSync(SORTIE, { recursive: true });
  execFileSync('python3', ['-c', `
import sys
from PIL import Image
brut, sortie = sys.argv[1], sys.argv[2]
for d in sys.argv[3].split(','):
    o = Image.open(f'{brut}/{d}-ordi.png').convert('RGB')
    o.resize((1200, 750), Image.LANCZOS).save(f'{sortie}/{d}-ordi-1200.webp', quality=78, method=6)
    o.resize((640, 400), Image.LANCZOS).save(f'{sortie}/{d}-ordi-640.webp', quality=78, method=6)
    m = Image.open(f'{brut}/{d}-mobile.png').convert('RGB')
    m.resize((360, int(360 * m.height / m.width)), Image.LANCZOS).save(f'{sortie}/{d}-mobile.webp', quality=78, method=6)
`, brut, SORTIE, DEMOS.join(',')], { stdio: 'inherit' });
  console.log('✔ captures dans', SORTIE);
})();
