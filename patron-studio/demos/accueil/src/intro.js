/**
 * ============================================================
 *  Intro « tunnel » de l'accueil Patrôn Studio (three.js seul, sans React : démarrage rapide).
 * ============================================================
 *  La caméra file dans un couloir lumineux. Elle se tourne vers la droite : un domaine
 *  s'affiche sur la paroi ; puis vers la gauche : un autre… puis elle traverse le dernier
 *  mur et l'on entre dans le site.
 *
 *  Modes (choisis par le petit script en tête de index.html, attribut data-tunnel) :
 *   - « complet » : 1re visite, 3,8 s ;
 *   - « court »   : visiteur qui revient, 0,9 s (seulement la traversée du mur) ;
 *   - pas d'intro si « réduire les animations » est activé ou si l'on arrive sur une ancre.
 *  Bouton « Passer » (et touche Échap). Le bouton « Demander mon site » reste au-dessus.
 *  Le minutage suit l'horloge (pas les images) : la durée est tenue même sur un téléphone lent.
 */
import * as THREE from 'three';
// vraies photos détourées (fond transparent), voir IMAGES.md
import imgPizza from './images/tunnel-pizza.webp';
import ombrePizza from './images/tunnel-pizza-ombre.webp';
import imgMaison from './images/tunnel-maison.webp';
import ombreMaison from './images/tunnel-maison-ombre.webp';
import imgVetement from './images/tunnel-vetement.webp';
import ombreVetement from './images/tunnel-vetement-ombre.webp';
import imgOrdinateur from './images/tunnel-ordinateur.webp';
import ombreOrdinateur from './images/tunnel-ordinateur-ombre.webp';

const DOMAINES = [
  // photo : [image, ombre, hauteur (unités 3D)] — le sujet dépasse au-dessus du panneau
  { mot: 'Restaurants', cote: 1, photo: [imgPizza, ombrePizza, 1.55] },
  { mot: 'Artisans', cote: -1, photo: [imgMaison, ombreMaison, 1.28] },
  { mot: 'Commerces', cote: 1, photo: [imgVetement, ombreVetement, 2.05] },
  { mot: 'Agences', cote: -1, photo: [imgOrdinateur, ombreOrdinateur, 1.5] },
];
const ARGENT = '#d4d7dd';
const LARGEUR = 6;
const HAUTEUR = 4;
const ESPACE = 9; // distance entre deux domaines
const Z_MUR = -(DOMAINES.length * ESPACE + 6); // mur final
const DUREE = { complet: 3.9, court: 0.95 };
const CLE = 'ps-tunnel-vu';

const racine = document.documentElement;
const mode = racine.dataset.tunnel;

/** Texte d'une paroi (canvas → texture). */
function texturePanneau(mot, numero, police) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 512;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 1024, 512);
  grad.addColorStop(0, 'rgba(255,255,255,0.09)');
  grad.addColorStop(1, 'rgba(255,255,255,0.015)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 1024, 512);
  g.strokeStyle = 'rgba(255,255,255,0.6)';
  g.lineWidth = 3;
  g.strokeRect(6, 6, 1012, 500);
  g.fillStyle = ARGENT;
  g.shadowColor = 'rgba(0,0,0,0.7)';
  g.shadowBlur = 16;
  g.font = `600 44px ${police}`;
  g.fillText(`${String(numero).padStart(2, '0')}  ·  Des sites pour les`, 64, 120);
  g.fillStyle = '#f3f4f5';
  let taille = 190;
  g.font = `600 ${taille}px ${police}`;
  while (g.measureText(mot).width > 900 && taille > 80) {
    taille -= 8;
    g.font = `600 ${taille}px ${police}`;
  }
  // ombre sombre puis léger éclat blanc : le mot reste lisible devant la photo
  g.shadowColor = 'rgba(0,0,0,0.75)';
  g.shadowBlur = 34;
  g.fillText(mot, 60, 330);
  g.shadowColor = 'rgba(255,255,255,0.35)';
  g.shadowBlur = 22;
  g.fillText(mot, 60, 330);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Logotype sur le mur final. */
function textureMur(police) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 512;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(512, 256, 10, 512, 256, 520);
  r.addColorStop(0, '#2c2d30');
  r.addColorStop(1, '#060606');
  g.fillStyle = r;
  g.fillRect(0, 0, 1024, 512);
  g.textAlign = 'center';
  g.fillStyle = '#f3f4f5';
  g.font = `600 150px ${police}`;
  g.shadowColor = 'rgba(255,255,255,0.55)';
  g.shadowBlur = 40;
  g.fillText('patrôn', 512, 280);
  g.shadowBlur = 0;
  g.fillStyle = ARGENT;
  g.font = `500 40px ${police}`;
  g.fillText('STUDIO  ·  LILLE', 512, 360);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const lisse = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const accel = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

async function lancer() {
  // police du site pour les textes du tunnel (repli : police système)
  let police = '"Studio", system-ui, sans-serif';
  // photos détourées : chargées en même temps que la police (1,2 s maximum, sinon elles apparaissent en cours de route)
  const chargeur = new THREE.TextureLoader();
  const photos = DOMAINES.map((d) =>
    d.photo.slice(0, 2).map((url) => {
      const t = { texture: null, pret: null };
      t.pret = new Promise((ok) => {
        t.texture = chargeur.load(url, ok, undefined, () => ok(null));
      });
      t.texture.colorSpace = THREE.SRGBColorSpace;
      return t;
    }),
  );
  const attente = (ms) => new Promise((r) => setTimeout(r, ms));
  const photosPretes = Promise.race([Promise.all(photos.flat().map((t) => t.pret)), attente(1200)]);
  try {
    await Promise.race([document.fonts.load('600 100px Studio'), attente(400)]);
  } catch {
    police = 'system-ui, sans-serif';
  }
  await photosPretes;

  // si le chargement a été trop long (réseau lent), on raccourcit
  const tard = performance.now() > 2600;
  const leMode = tard ? 'court' : mode;
  const duree = DUREE[leMode];

  const voile = document.createElement('div');
  voile.id = 'ps-tunnel';
  voile.innerHTML = '<button type="button" class="ps-tunnel-passer">Passer <span aria-hidden="true">→</span></button>';
  document.body.appendChild(voile);
  racine.classList.add('ps-tunnel-pret');

  const petit = innerWidth < 768;
  const portrait = innerWidth / innerHeight < 1;
  const rendu = new THREE.WebGLRenderer({ antialias: !petit, powerPreference: 'high-performance' });
  rendu.setPixelRatio(Math.min(devicePixelRatio, petit ? 1.25 : 1.75));
  rendu.setSize(innerWidth, innerHeight);
  rendu.setClearColor('#000000');
  voile.prepend(rendu.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#000000', 9, 44);
  const camera = new THREE.PerspectiveCamera(innerWidth / innerHeight < 1 ? 78 : 62, innerWidth / innerHeight, 0.1, 80);

  // --- couloir ---
  const longueur = -Z_MUR + 12;
  // parois gris anthracite satinées et sol laqué : les lumières blanches s'y reflètent (effet argent)
  const paroi = new THREE.MeshStandardMaterial({ color: '#1c1d20', roughness: 0.3, metalness: 0.45 });
  const sol = new THREE.MeshStandardMaterial({ color: '#101113', roughness: 0.12, metalness: 0.6 });
  const plan = (w, h, mat, pos, rot) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.position.set(...pos);
    m.rotation.set(...rot);
    scene.add(m);
    return m;
  };
  const zMilieu = 6 - longueur / 2;
  plan(LARGEUR, longueur, sol, [0, 0, zMilieu], [-Math.PI / 2, 0, 0]);
  plan(LARGEUR, longueur, paroi, [0, HAUTEUR, zMilieu], [Math.PI / 2, 0, 0]);
  plan(longueur, HAUTEUR, paroi, [-LARGEUR / 2, HAUTEUR / 2, zMilieu], [0, Math.PI / 2, 0]);
  plan(longueur, HAUTEUR, paroi, [LARGEUR / 2, HAUTEUR / 2, zMilieu], [0, -Math.PI / 2, 0]);

  // lignes lumineuses au sol et au plafond, et cadres réguliers (sensation de vitesse)
  const lumiere = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  const blanc = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.7 });
  // bandeau lumineux blanc au plafond, et son reflet adouci au sol
  const bandeau = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.02, longueur), lumiere);
  bandeau.position.set(0, HAUTEUR - 0.012, zMilieu);
  scene.add(bandeau);
  const reflet = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, longueur),
    new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.12, depthWrite: false }),
  );
  reflet.rotation.x = -Math.PI / 2;
  reflet.position.set(0, 0.005, zMilieu);
  scene.add(reflet);
  for (const x of [-LARGEUR / 2 + 0.05, LARGEUR / 2 - 0.05]) {
    for (const y of [0.02, HAUTEUR - 0.02]) {
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, longueur), lumiere);
      l.position.set(x, y, zMilieu);
      scene.add(l);
    }
  }
  const cadreGeo = [
    [new THREE.BoxGeometry(LARGEUR, 0.03, 0.03), [0, HAUTEUR - 0.02]],
    [new THREE.BoxGeometry(0.03, HAUTEUR, 0.03), [-LARGEUR / 2 + 0.02, HAUTEUR / 2]],
    [new THREE.BoxGeometry(0.03, HAUTEUR, 0.03), [LARGEUR / 2 - 0.02, HAUTEUR / 2]],
  ];
  for (let z = 2; z > Z_MUR; z -= 3) {
    for (const [geo, [x, y]] of cadreGeo) {
      const m = new THREE.Mesh(geo, blanc);
      m.position.set(x, y, z);
      scene.add(m);
    }
  }

  // --- domaines sur les parois ---
  // chaque panneau : ombre douce (au fond) → photo détourée (milieu) → verre et mot (devant)
  const calques = [];
  DOMAINES.forEach((d, i) => {
    const z = -ESPACE * (i + 1) + 2;
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 1.4),
      new THREE.MeshBasicMaterial({ map: texturePanneau(d.mot, i + 1, police), transparent: true, fog: false }),
    );
    // panneau sur la paroi, légèrement tourné vers le centre pour être lisible
    m.position.set(d.cote * (LARGEUR / 2 - 1.3), HAUTEUR / 2, z);
    m.rotation.y = -d.cote * 0.62; // presque face à la caméra quand elle se tourne vers lui
    if (portrait) m.scale.setScalar(0.74); // écran vertical : panneaux un peu plus petits
    m.renderOrder = 3;
    m.material.depthWrite = false;
    scene.add(m);
    const [photo, ombre] = photos[i];
    if (photo.texture.image) {
      const h = d.photo[2];
      const img = photo.texture.image;
      const w = (h * img.width) / img.height;
      const x = 0.18;
      const y = 0.7 + 0.38 - h / 2; // dépasse au-dessus du panneau, passe derrière le mot
      const sujet = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ map: photo.texture, transparent: true, fog: false, depthWrite: false }),
      );
      sujet.position.set(x, y, -0.3);
      sujet.renderOrder = 2;
      m.add(sujet);
      let portee = null;
      if (ombre.texture.image) {
        portee = new THREE.Mesh(
          new THREE.PlaneGeometry(w * 1.12, h * 1.12),
          new THREE.MeshBasicMaterial({ map: ombre.texture, color: '#000000', transparent: true, opacity: 0.75, depthWrite: false }),
        );
        portee.position.set(x + 0.1, y - 0.12, -0.62);
        portee.renderOrder = 1;
        m.add(portee);
      }
      calques.push({ sujet, portee, y, z, phase: i * 1.7 });
    }
    // lumière devant le panneau (côté couloir) : elle éclaire la photo sans faire de tache sur la paroi
    const halo = new THREE.PointLight('#ffffff', 5, 5, 1.6);
    halo.position.set(d.cote * (LARGEUR / 2 - 2.4), HAUTEUR / 2 + 0.6, z + 1.2);
    scene.add(halo);
  });

  // --- mur final (logotype) ---
  const mur = new THREE.Mesh(
    new THREE.PlaneGeometry(LARGEUR, HAUTEUR),
    new THREE.MeshBasicMaterial({ map: textureMur(police), transparent: true, fog: false }),
  );
  mur.position.set(0, HAUTEUR / 2, Z_MUR);
  scene.add(mur);

  // lumières qui suivent la caméra
  scene.add(new THREE.AmbientLight('#ffffff', 0.45));
  scene.add(new THREE.HemisphereLight('#ffffff', '#0a0a0a', 0.55));
  const torche = new THREE.PointLight('#ffffff', 22, 15, 1.4);
  scene.add(torche);

  // --- trajectoire : un arrêt face à chaque domaine, puis la traversée du mur ---
  // chaque étape : [instant (s), z, décalage x, lacet] ; la caméra ralentit à chaque arrêt (pas de vitesse brusque)
  const etapes =
    leMode === 'complet'
      ? [
          [0, 4, 0, 0],
          ...DOMAINES.map((d, i) => [
            0.72 * (i + 1),
            -ESPACE * (i + 1) + 2 + (portrait ? 3.4 : 3.1),
            -d.cote * (portrait ? 0.55 : 0.35),
            -d.cote * (portrait ? 0.62 : 0.78),
          ]),
          [0.72 * DOMAINES.length + 0.42, Z_MUR + 1.4, 0, 0],
          [duree, Z_MUR - 2.5, 0, 0],
        ]
      : [
          [0, Z_MUR + 7, 0, 0],
          [0.55, Z_MUR + 1.4, 0, 0],
          [duree, Z_MUR - 2.5, 0, 0],
        ];
  const tMur = etapes[etapes.length - 2][0];
  const position = (sec) => {
    let n = 1;
    while (n < etapes.length - 1 && sec > etapes[n][0]) n++;
    const [t0, z0, x0, y0] = etapes[n - 1];
    const [t1, z1, x1, y1] = etapes[n];
    const k = accel((sec - t0) / (t1 - t0));
    return { z: z0 + (z1 - z0) * k, x: x0 + (x1 - x0) * k, lacet: y0 + (y1 - y0) * k };
  };
  // préparation de la carte graphique AVANT de lancer l'horloge : sinon la 1re image (lente) mangerait l'animation
  camera.position.set(0, HAUTEUR / 2 - 0.15, etapes[0][1]);
  rendu.compile(scene, camera);
  rendu.render(scene, camera);
  let debut = performance.now();
  // test : ?tunnel-fige=1.4 fige l'intro à 1,4 s (vérification du cadrage)
  const parametre = new URLSearchParams(location.search).get('tunnel-fige');
  let fige = parametre === null ? null : Number(parametre);
  let fini = false;

  const terminer = (vite) => {
    if (fini) return;
    fini = true;
    try {
      localStorage.setItem(CLE, String(Date.now()));
    } catch {
      /* stockage indisponible : l'intro reviendra, ce n'est pas grave */
    }
    voile.classList.add('ps-tunnel-fin');
    dispatchEvent(new Event('ps-tunnel-fin')); // l'espace 3D de l'accueil peut démarrer
    racine.classList.remove('ps-tunnel');
    setTimeout(
      () => {
        cancelAnimationFrame(boucle);
        rendu.dispose();
        voile.remove();
        racine.classList.remove('ps-tunnel-pret');
        removeEventListener('keydown', touche);
        removeEventListener('resize', taille);
      },
      vite ? 350 : 650,
    );
  };
  const touche = (e) => e.key === 'Escape' && terminer(true);
  addEventListener('keydown', touche);
  voile.querySelector('.ps-tunnel-passer').addEventListener('click', () => terminer(true));
  const taille = () => {
    camera.aspect = innerWidth / innerHeight;
    camera.fov = camera.aspect < 1 ? 78 : 62;
    camera.updateProjectionMatrix();
    rendu.setSize(innerWidth, innerHeight);
  };
  addEventListener('resize', taille);

  let boucle = 0;
  let avant = 0;
  let lentes = 0;
  const image = () => {
    const maintenant = performance.now();
    if (!avant)
      debut = maintenant; // l'horloge part de la 1re image réellement affichée
    // appareil trop lent (3 images de suite à plus d'un quart de seconde) : on n'impose pas une intro saccadée
    else if (fige === null && (lentes = maintenant - avant > 250 ? lentes + 1 : 0) >= 3) return terminer(true);
    avant = maintenant;
    const sec = fige ?? (maintenant - debut) / 1000;
    const { z, x, lacet } = position(Math.min(sec, duree));
    camera.position.set(x, HAUTEUR / 2 - 0.15, z);
    camera.rotation.set(0, lacet, 0);
    torche.position.set(0, HAUTEUR - 0.5, z - 2);
    // la photo se détache du fond quand la caméra arrive à sa hauteur (effet de profondeur)
    for (const c of calques) {
      const proche = Math.max(0, 1 - Math.abs(z - (c.z + 3.2)) / 5);
      const k = lisse(proche);
      c.sujet.position.z = -0.34 + 0.2 * k;
      c.sujet.position.y = c.y + 0.03 * Math.sin(sec * 1.8 + c.phase);
      c.sujet.scale.setScalar(0.96 + 0.06 * k);
      if (c.portee) c.portee.material.opacity = 0.55 + 0.25 * k;
    }
    // traversée du mur : il s'ouvre en lumière
    const passage = lisse((sec - tMur) / (duree - tMur));
    mur.material.opacity = 1 - passage;
    mur.scale.setScalar(1 + passage * 0.6);
    voile.style.setProperty('--eclat', passage.toFixed(3));
    rendu.render(scene, camera);
    if (fige !== null) {
      // test : image par image (vidéo de contrôle)
      window.psTunnelImage = (t) => {
        fige = t;
        image();
      };
      return;
    }
    if (sec >= duree) terminer(false);
    else boucle = requestAnimationFrame(image);
  };
  boucle = requestAnimationFrame(image);
}

if (mode === 'complet' || mode === 'court') {
  const go = () =>
    lancer().catch(() => {
      // en cas de problème (WebGL indisponible…), on montre simplement le site
      racine.classList.remove('ps-tunnel', 'ps-tunnel-pret');
      document.getElementById('ps-tunnel')?.remove();
      dispatchEvent(new Event('ps-tunnel-fin'));
    });
  if (document.body) go();
  else document.addEventListener('DOMContentLoaded', go);
}
