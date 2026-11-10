// Garnitures 3D : formes simples (aucun fichier 3D externe), partagées entre toutes les pizzas.
import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { mortadellaTexture, rand, salamiTexture } from './textures';

const geoCache = new Map();
const g = (key, fn) => {
  if (!geoCache.has(key)) geoCache.set(key, fn());
  return geoCache.get(key);
};

/** Boule irrégulière (fromage fondu, nduja…). */
const blob = (detail) =>
  g('blob' + detail, () => {
    // sommets fusionnés → ombrage lisse (pas de facettes)
    const geo = mergeVertices(new THREE.IcosahedronGeometry(1, detail).deleteAttribute('normal').deleteAttribute('uv'));
    const p = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const n = 1 + 0.12 * Math.sin(v.x * 5.1 + v.z * 3.7) + 0.08 * Math.sin(v.z * 7.3 - v.y * 2);
      v.multiplyScalar(n);
      if (v.y < 0) v.y *= 0.3; // dessous aplati : le fromage "colle" à la pâte
      p.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  });

/** Feuille (basilic, roquette) légèrement bombée. */
const leaf = (narrow) =>
  g('leaf' + narrow, () => {
    const s = new THREE.Shape();
    const w = narrow ? 0.28 : 0.55;
    s.moveTo(0, -1);
    s.quadraticCurveTo(w * 1.5, -0.2, 0, 1);
    s.quadraticCurveTo(-w * 1.5, -0.2, 0, -1);
    const geo = new THREE.ShapeGeometry(s, 8);
    geo.rotateX(-Math.PI / 2);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      p.setY(i, 0.12 - x * x * 0.5 - z * z * 0.04);
    }
    geo.computeVertexNormals();
    return geo;
  });

const disc = (seg) => g('disc' + seg, () => new THREE.CylinderGeometry(1, 1, 0.08, seg));

/** Lamelle de champignon (vue de dessus). */
const mushroom = () =>
  g('mushroom', () => {
    const s = new THREE.Shape();
    s.moveTo(-0.28, -0.9);
    s.lineTo(0.28, -0.9);
    s.lineTo(0.3, -0.1);
    s.absarc(0, 0.05, 0.85, -0.12, Math.PI + 0.12, false);
    s.lineTo(-0.28, -0.9);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.04,
      bevelSegments: 2,
      curveSegments: 10,
    });
    geo.rotateX(-Math.PI / 2);
    geo.center();
    return geo;
  });

/** Tranche ondulée (jambon, mortadelle). */
const slice = () =>
  g('slice', () => {
    const s = new THREE.Shape();
    const n = 20;
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2;
      const r = 1 + 0.12 * Math.sin(a * 3) + 0.06 * Math.sin(a * 7);
      if (i === 0) s.moveTo(Math.cos(a) * r, Math.sin(a) * r * 0.75);
      else s.lineTo(Math.cos(a) * r, Math.sin(a) * r * 0.75);
    }
    const geo = new THREE.ShapeGeometry(s, 4);
    geo.rotateX(-Math.PI / 2);
    const p = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      p.setY(i, 0.12 * Math.sin(x * 2.4) * Math.cos(z * 1.7) + 0.05);
      uv.setXY(i, x * 0.5 + 0.5, z * 0.5 + 0.5);
    }
    geo.computeVertexNormals();
    return geo;
  });

const shaving = () => g('shaving', () => new THREE.BoxGeometry(1, 0.05, 0.38));
const crumb = () => g('crumb', () => new THREE.IcosahedronGeometry(1, 0));
const ring = () => g('ring', () => new THREE.TorusGeometry(1, 0.38, 6, 14));
const strip = () => g('strip', () => new THREE.TorusGeometry(1, 0.2, 6, 12, Math.PI * 0.85));
const sphere = (seg) => g('sphere' + seg, () => new THREE.SphereGeometry(1, seg, Math.round(seg * 0.75)));

const matCache = new Map();
const m = (key, params) => {
  if (!matCache.has(key)) matCache.set(key, new THREE.MeshStandardMaterial(params));
  return matCache.get(key);
};

/**
 * Définition des garnitures.
 *  size  : [min, max] du rayon / de la taille
 *  scale : facteurs (x, y, z) appliqués à la taille
 *  r     : [rayon min, rayon max] de placement sur la pizza
 *  y     : hauteur au-dessus de la sauce (couche)
 *  tilt  : inclinaison aléatoire max (radians)
 */
export const TOPPINGS = {
  mozzarella: {
    geo: (q) => blob(q === 'low' ? 2 : 3),
    mat: () => m('mozza', { color: '#f6eedb', roughness: 0.45 }),
    size: [0.17, 0.24],
    scale: [1, 0.32, 1],
    r: [0.05, 1.05],
    y: 0.0,
  },
  gorgonzola: {
    geo: (q) => blob(q === 'low' ? 2 : 3),
    mat: () => m('gorgo', { color: '#d5dccd', roughness: 0.6 }),
    size: [0.13, 0.18],
    scale: [1, 0.35, 1],
    r: [0.1, 1.05],
    y: 0.02,
  },
  scamorza: {
    geo: (q) => blob(q === 'low' ? 2 : 3),
    mat: () => m('scamorza', { color: '#d99a4e', roughness: 0.5 }),
    size: [0.14, 0.19],
    scale: [1, 0.3, 1],
    r: [0.1, 1.05],
    y: 0.02,
  },
  stracciatella: {
    geo: (q) => blob(q === 'low' ? 2 : 3),
    mat: () => m('stracc', { color: '#fbf6ea', roughness: 0.25 }),
    size: [0.2, 0.26],
    scale: [1, 0.42, 1],
    r: [0.15, 0.95],
    y: 0.06,
  },
  nduja: {
    geo: (q) => blob(q === 'low' ? 2 : 3),
    mat: () => m('nduja', { color: '#a8301b', roughness: 0.55 }),
    size: [0.11, 0.16],
    scale: [1, 0.35, 1],
    r: [0.45, 1.05],
    y: 0.02,
  },
  burrata: {
    geo: (q) => sphere(q === 'low' ? 16 : 32),
    mat: () => m('burrata', { color: '#fbf7ee', roughness: 0.3 }),
    size: [0.42, 0.42],
    scale: [1, 0.72, 1],
    r: [0, 0],
    y: 0.16,
    center: true,
  },
  basilic: {
    geo: () => leaf(false),
    mat: () => m('basil', { color: '#2f6b22', roughness: 0.65, side: THREE.DoubleSide }),
    size: [0.13, 0.18],
    scale: [1, 1, 1],
    r: [0.15, 1.05],
    y: 0.09,
    tilt: 0.25,
  },
  roquette: {
    geo: () => leaf(true),
    mat: () => m('roquette', { color: '#4c7a2a', roughness: 0.45, side: THREE.DoubleSide }),
    size: [0.16, 0.22],
    scale: [1, 1, 1],
    r: [0.1, 1.0],
    y: 0.11,
    tilt: 0.3,
  },
  jambon: {
    geo: () => slice(),
    mat: () => m('jambon', { color: '#e3958c', roughness: 0.5, side: THREE.DoubleSide }),
    size: [0.2, 0.26],
    scale: [1, 1, 1],
    r: [0.2, 1.0],
    y: 0.04,
  },
  mortadelle: {
    geo: () => slice(),
    mat: () => m('mortadelle', { map: mortadellaTexture(), roughness: 0.45, side: THREE.DoubleSide }),
    size: [0.24, 0.3],
    scale: [1, 1, 1],
    r: [0.25, 1.0],
    y: 0.04,
  },
  champignon: {
    geo: () => mushroom(),
    mat: () => m('champi', { color: '#d9c3a2', roughness: 0.7 }),
    size: [0.11, 0.14],
    scale: [1, 1, 1],
    r: [0.15, 1.05],
    y: 0.06,
  },
  salami: {
    geo: (q) => disc(q === 'low' ? 14 : 24),
    mat: () => [
      m('salami-side', { color: '#5c120e', roughness: 0.5 }),
      m('salami-top', { map: salamiTexture(), roughness: 0.38 }),
      m('salami-bot', { color: '#6e1712' }),
    ],
    size: [0.17, 0.2],
    scale: [1, 0.6, 1],
    r: [0.2, 1.05],
    y: 0.05,
    tilt: 0.12,
  },
  courgette: {
    geo: (q) => disc(q === 'low' ? 14 : 24),
    mat: () => [
      m('courg-side', { color: '#2f5a1f' }),
      m('courg-top', { color: '#d8dc9c', roughness: 0.5 }),
      m('courg-bot', { color: '#cfd38f' }),
    ],
    size: [0.12, 0.15],
    scale: [1, 0.6, 1],
    r: [0.2, 1.05],
    y: 0.05,
    tilt: 0.15,
  },
  aubergine: {
    geo: (q) => disc(q === 'low' ? 14 : 24),
    mat: () => [
      m('aub-side', { color: '#2b1830' }),
      m('aub-top', { color: '#c9a77a', roughness: 0.6 }),
      m('aub-bot', { color: '#b8946a' }),
    ],
    size: [0.16, 0.2],
    scale: [1, 0.55, 1],
    r: [0.25, 1.0],
    y: 0.05,
    tilt: 0.15,
  },
  truffe: {
    geo: (q) => disc(q === 'low' ? 10 : 16),
    mat: () => m('truffe', { color: '#3a2a1f', roughness: 0.75 }),
    size: [0.07, 0.1],
    scale: [1, 0.5, 1],
    r: [0.1, 1.05],
    y: 0.1,
    tilt: 0.3,
  },
  piment: {
    geo: () => ring(),
    mat: () => m('piment', { color: '#c4231a', roughness: 0.35 }),
    size: [0.045, 0.06],
    scale: [1, 1, 1],
    r: [0.1, 1.08],
    y: 0.08,
    flat: true,
  },
  poivron: {
    geo: () => strip(),
    mat: () => m('poivron', { color: '#d9561d', roughness: 0.4 }),
    size: [0.13, 0.17],
    scale: [1, 1, 1],
    r: [0.2, 1.05],
    y: 0.07,
    flat: true,
  },
  parmesan: {
    geo: () => shaving(),
    mat: () => m('parmesan', { color: '#e8c97a', roughness: 0.55 }),
    size: [0.14, 0.2],
    scale: [1, 1, 1],
    r: [0.1, 1.05],
    y: 0.1,
    tilt: 0.25,
  },
  pistache: {
    geo: () => crumb(),
    mat: () => m('pistache', { color: '#7e9a3a', roughness: 0.7 }),
    size: [0.022, 0.035],
    scale: [1, 0.7, 1],
    r: [0.1, 1.08],
    y: 0.1,
  },
};

/**
 * Positions déterministes réparties sur la pizza (spirale de tournesol + léger désordre),
 * pour éviter les paquets et les trous.
 */
export const placements = (n, seed, [rMin, rMax], accept = () => true) => {
  const out = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  let k = 0;
  let tries = 0;
  while (out.length < n && tries < n * 30) {
    tries++;
    const t = (k + 0.5) / n;
    k++;
    const r = rMin + (rMax - rMin) * Math.sqrt(Math.min(1, t)) + (rand(seed + k) - 0.5) * 0.12;
    const a = k * golden + seed * 1.7 + (rand(seed * 3 + k) - 0.5) * 0.5;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    if (!accept(x, z)) {
      if (k > n * 3) k = Math.floor(rand(tries) * n);
      continue;
    }
    out.push({
      x,
      z,
      rot: rand(seed + k * 7) * Math.PI * 2,
      s: rand(seed + k * 13),
      t1: rand(seed + k * 17) - 0.5,
      t2: rand(seed + k * 19) - 0.5,
    });
  }
  return out;
};
