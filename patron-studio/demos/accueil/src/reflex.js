/**
 * Appareil photo reflex en néon blanc (même style que les icônes des panneaux, mais détaillé).
 * Tout est tracé dans le code (aucune image). Le relief vient de plusieurs couches à des
 * profondeurs différentes : viseur (derrière), boîtier, puis les trois bagues de l'objectif
 * qui avancent vers nous ; une silhouette sombre donne du corps à l'ensemble.
 *
 * Repère de dessin : 1000 × 700 unités, vue de face (la poignée est à gauche vue de face).
 */
import * as THREE from 'three';

const U = 0.0034; // 1 unité de dessin = 0,0034 unité 3D (boîtier : 3,4 de large)
const CENTRE = [500, 350];
const OBJ = [520, 425]; // centre de l'objectif

/* ---------- tracés ---------- */
const cercle = (x, y, r) => `M${x + r} ${y}A${r} ${r} 0 1 1 ${x - r} ${y}A${r} ${r} 0 1 1 ${x + r} ${y}Z`;
const stries = (x0, x1, pas, y0, y1) => {
  let d = '';
  for (let x = x0; x <= x1; x += pas) d += `M${x} ${y0}V${y1}`;
  return d;
};
const rayons = (cx, cy, r0, r1, pasDeg) => {
  let d = '';
  for (let a = 0; a < 360; a += pasDeg) {
    const t = (a * Math.PI) / 180;
    d += `M${(cx + r0 * Math.cos(t)).toFixed(1)} ${(cy + r0 * Math.sin(t)).toFixed(1)}L${(cx + r1 * Math.cos(t)).toFixed(1)} ${(cy + r1 * Math.sin(t)).toFixed(1)}`;
  }
  return d;
};
const arc = (cx, cy, r, a0, a1) => {
  const p = (a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)].map((v) => v.toFixed(1));
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${x0} ${y0}A${r} ${r} 0 0 1 ${x1} ${y1}`;
};

// contour du boîtier : épaules, prisme du viseur, poignée arrondie
const CONTOUR = 'M176 232H392L428 126H612L648 232H846Q880 232 880 266V586Q880 620 846 620H164Q118 620 114 574L110 292Q110 232 176 232Z';

const BOITIER = [
  CONTOUR,
  'M250 236C232 330 232 520 250 616', // limite de la poignée
  'M266 380C258 430 258 480 266 530', // gainage de la poignée
  'M452 140H588V182H452Z', // flash intégré
  'M464 152H576M464 161H576M464 170H576', // lentille de Fresnel du flash
  'M468 126V112H572V126M480 112V104H560V112', // griffe porte-accessoire
  'M700 232V212Q700 204 708 204H812Q820 204 820 212V232', // molette de mode
  stries(714, 806, 10, 209, 228),
  'M136 262H226Q234 262 234 270V286Q234 294 226 294H136', // molette avant (sur la poignée)
  stries(146, 222, 9, 266, 290),
  'M110 262H96V302H110M880 262H894V302H880', // attaches de courroie
  cercle(300, 284, 12), // lampe d'assistance AF
  cercle(OBJ[0], OBJ[1], 184), // monture
  cercle(OBJ[0], OBJ[1], 172),
  cercle(OBJ[0], 250, 5), // repère de montage
  cercle(736, 468, 18), // bouton de déverrouillage de l'objectif
  cercle(734, 530, 9), // contrôle de profondeur de champ
  'M800 300V560', // ligne du boîtier côté droit
];
const VISEUR = ['M440 96H600Q614 96 614 110V130H426V110Q426 96 440 96Z', 'M452 106H588'];
const DECLENCHEUR = ['M150 212Q150 196 190 196Q230 196 230 212', 'M146 214H234', 'M160 232V214M220 232V214'];
const BAGUE_1 = [cercle(OBJ[0], OBJ[1], 164), cercle(OBJ[0], OBJ[1], 152)];
const BAGUE_2 = [cercle(OBJ[0], OBJ[1], 148), cercle(OBJ[0], OBJ[1], 128), rayons(OBJ[0], OBJ[1], 131, 145, 7.5)];
const BAGUE_3 = [
  cercle(OBJ[0], OBJ[1], 122),
  cercle(OBJ[0], OBJ[1], 106),
  rayons(OBJ[0], OBJ[1], 110, 118, 30),
  cercle(OBJ[0], OBJ[1], 72),
  cercle(OBJ[0], OBJ[1], 44),
];
// reflet sur le verre : deux arcs et un point brillant en haut à gauche, un arc doux en bas à droite
const REFLET = [arc(OBJ[0], OBJ[1], 88, 198, 258), arc(OBJ[0], OBJ[1], 62, 212, 240), cercle(OBJ[0] - 24, OBJ[1] - 30, 6)];
const REFLET_DOUX = [arc(OBJ[0], OBJ[1], 92, 18, 62)];

/* ---------- rendu néon (même recette que les icônes) ---------- */
function toile(zone, echelle) {
  const [x0, y0, x1, y1] = zone;
  const marge = 40;
  const c = document.createElement('canvas');
  c.width = Math.round((x1 - x0 + 2 * marge) * echelle);
  c.height = Math.round((y1 - y0 + 2 * marge) * echelle);
  const g = c.getContext('2d');
  g.setTransform(echelle, 0, 0, echelle, (marge - x0) * echelle, (marge - y0) * echelle);
  g.lineCap = 'round';
  g.lineJoin = 'round';
  return { c, g, plan: [x0 - marge, y0 - marge, x1 + marge, y1 + marge] };
}
function neon(g, traits, force = 1) {
  const p = traits.map((d) => new Path2D(d));
  const passe = (largeur, couleur, flou, halo) => {
    g.lineWidth = largeur;
    g.strokeStyle = couleur;
    g.shadowBlur = flou;
    g.shadowColor = halo;
    for (const t of p) g.stroke(t);
  };
  passe(10, `rgba(255,255,255,${0.14 * force})`, 34, 'rgba(255,255,255,1)');
  passe(5, `rgba(240,244,255,${0.7 * force})`, 12, 'rgba(255,255,255,1)');
  passe(2.2, `rgba(255,255,255,${force})`, 3, 'rgba(255,255,255,1)');
}
function texture(c) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
/** Plan 3D placé exactement là où la zone de dessin se trouve sur le boîtier. */
function plan({ plan: [x0, y0, x1, y1] }, z, materiau) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry((x1 - x0) * U, (y1 - y0) * U), materiau);
  m.position.set(((x0 + x1) / 2 - CENTRE[0]) * U, -((y0 + y1) / 2 - CENTRE[1]) * U, z);
  return m;
}
const additif = (c) =>
  new THREE.MeshBasicMaterial({
    map: texture(c),
    transparent: true,
    opacity: 0.06,
    fog: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

export function creerReflex() {
  const groupe = new THREE.Group();
  const couches = []; // matériaux néon (pour l'allumage)
  let ordre = 10;
  const ajouter = (m, neonOui = true) => {
    m.renderOrder = ordre++;
    groupe.add(m);
    if (neonOui) couches.push(m.material);
    return m;
  };

  // viseur, derrière le prisme (on le devine quand l'appareil est de trois quarts)
  const v = toile([420, 90, 620, 136], 1.6);
  neon(v.g, VISEUR, 0.8);
  ajouter(plan(v, -0.28, additif(v.c)));

  // silhouette sombre : le boîtier et l'objectif cachent le tunnel derrière eux
  const s = toile([90, 90, 910, 640], 0.5);
  s.g.fillStyle = 'rgba(4,4,5,0.92)';
  s.g.fill(new Path2D(CONTOUR));
  s.g.fill(new Path2D(cercle(OBJ[0], OBJ[1], 186)));
  ajouter(plan(s, -0.04, new THREE.MeshBasicMaterial({ map: texture(s.c), transparent: true, fog: false, depthWrite: false })), false);

  // boîtier
  const b = toile([90, 96, 910, 636], 1.6);
  neon(b.g, BOITIER);
  ajouter(plan(b, 0, additif(b.c)));

  // objectif : trois bagues qui avancent vers nous (relief), le verre et son reflet devant
  const zone = [OBJ[0] - 170, OBJ[1] - 170, OBJ[0] + 170, OBJ[1] + 170];
  const fond = toile(zone, 0.5);
  fond.g.fillStyle = 'rgba(4,4,5,0.95)';
  fond.g.fill(new Path2D(cercle(OBJ[0], OBJ[1], 166)));
  ajouter(plan(fond, 0.1, new THREE.MeshBasicMaterial({ map: texture(fond.c), transparent: true, fog: false, depthWrite: false })), false);
  const b1 = toile(zone, 1.8);
  neon(b1.g, BAGUE_1);
  ajouter(plan(b1, 0.12, additif(b1.c)));
  const b2 = toile(zone, 1.8);
  neon(b2.g, BAGUE_2, 0.9);
  ajouter(plan(b2, 0.26, additif(b2.c)));
  const b3 = toile(zone, 1.8);
  // verre : léger dégradé bleuté, plus clair en haut à gauche
  const verre = b3.g.createRadialGradient(OBJ[0] - 34, OBJ[1] - 38, 6, OBJ[0], OBJ[1], 104);
  verre.addColorStop(0, 'rgba(225,232,255,0.22)');
  verre.addColorStop(0.55, 'rgba(160,170,200,0.07)');
  verre.addColorStop(1, 'rgba(0,0,0,0)');
  b3.g.fillStyle = verre;
  b3.g.fill(new Path2D(cercle(OBJ[0], OBJ[1], 104)));
  neon(b3.g, BAGUE_3, 0.85);
  neon(b3.g, REFLET, 1);
  neon(b3.g, REFLET_DOUX, 0.45);
  ajouter(plan(b3, 0.4, additif(b3.c)));

  // déclencheur (il s'enfonce au moment de la photo)
  const d = toile([140, 190, 240, 236], 1.8);
  neon(d.g, DECLENCHEUR);
  const declencheur = ajouter(plan(d, 0.02, additif(d.c)));

  // éclair du flash
  const f = toile([452, 140, 588, 182], 1.6);
  f.g.shadowColor = '#fff';
  f.g.shadowBlur = 40;
  f.g.fillStyle = '#ffffff';
  f.g.fill(new Path2D('M452 140H588V182H452Z'));
  const flash = ajouter(plan(f, 0.03, additif(f.c)), false);
  flash.material.opacity = 0;

  return { groupe, couches, declencheur, yDeclencheur: declencheur.position.y, flash };
}

/** Petit bruit de déclencheur synthétisé (aucun fichier). Joué seulement si le navigateur autorise déjà le son. */
export function declic() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const a = new Ctx();
    if (a.state !== 'running') {
      a.close();
      return; // son non autorisé (pas encore d'interaction) : en silence
    }
    const coup = (debut, frequence, duree, volume) => {
      const n = Math.round(a.sampleRate * duree);
      const tampon = a.createBuffer(1, n, a.sampleRate);
      const data = tampon.getChannelData(0);
      for (let i = 0; i < n; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
      const src = a.createBufferSource();
      src.buffer = tampon;
      const filtre = a.createBiquadFilter();
      filtre.type = 'bandpass';
      filtre.frequency.value = frequence;
      filtre.Q.value = 1.2;
      const g = a.createGain();
      g.gain.value = volume;
      src.connect(filtre).connect(g).connect(a.destination);
      src.start(a.currentTime + debut);
    };
    coup(0, 2600, 0.05, 0.5); // ouverture du rideau
    coup(0.075, 1500, 0.07, 0.35); // retour du miroir
    setTimeout(() => a.close(), 600);
  } catch {
    /* pas de son : ce n'est pas grave */
  }
}
