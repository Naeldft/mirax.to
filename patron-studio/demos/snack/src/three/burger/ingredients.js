import * as THREE from 'three';
import { alea, bruit, doux, fbm } from './bruit.js';

/* ------------------------------------------------------------------
   Géométries des ingrédients, sculptées en code (unités : mètres ; un pain fait 11 cm de diamètre).
   Chaque fonction rend une géométrie prête à poser, base à y = 0, et sa hauteur d'empilement.
------------------------------------------------------------------- */

export const RP = 0.056; // rayon du pain

/** Profil tourné, du bas vers le haut, avec UV le long du profil à l'abscisse curviligne (v = 0 en haut). */
function tour(points, segments = 128) {
  const pts = points.map(([x, y]) => new THREE.Vector2(Math.max(0.0001, x), y));
  const g = new THREE.LatheGeometry(pts, segments);
  const long = [0];
  for (let j = 1; j < pts.length; j++) long.push(long[j - 1] + pts[j].distanceTo(pts[j - 1]));
  const total = long[long.length - 1];
  const uv = g.attributes.uv;
  for (let i = 0; i <= segments; i++) for (let j = 0; j < pts.length; j++) uv.setY(i * pts.length + j, 1 - long[j] / total);
  return g;
}

/** Couture d'un profil tourné : la première et la dernière colonne de sommets reçoivent la même normale. */
export function souder(g) {
  const seg = g.parameters?.segments;
  const n = g.parameters?.points?.length;
  if (!seg || !n) return g;
  const nr = g.attributes.normal;
  const v = new THREE.Vector3();
  for (let j = 0; j < n; j++) {
    const a = j;
    const b = seg * n + j;
    v.set(nr.getX(a) + nr.getX(b), nr.getY(a) + nr.getY(b), nr.getZ(a) + nr.getZ(b)).normalize();
    nr.setXYZ(a, v.x, v.y, v.z);
    nr.setXYZ(b, v.x, v.y, v.z);
  }
  return g;
}

/** Déplace chaque sommet le long de sa normale (bosses), en gardant les coutures fermées. */
function bosseler(g, f) {
  g.computeVertexNormals();
  souder(g);
  const p = g.attributes.position;
  const n = g.attributes.normal;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const d = f(v);
    p.setXYZ(i, v.x + n.getX(i) * d, v.y + n.getY(i) * d, v.z + n.getZ(i) * d);
  }
  g.computeVertexNormals();
  return souder(g);
}

/** Courbe (bas → haut) échantillonnée. */
const courbe = (n, f) => Array.from({ length: n + 1 }, (_, i) => f(i / n));

// ---------- pains ----------
export function painDessus({ haut = 0.04, graine = 0 } = {}) {
  // dôme brioché : bord arrondi au ras de la coupe, flancs pleins, sommet légèrement aplati
  const pts = [
    [RP * 0.93, 0],
    [RP * 0.985, 0.0018],
    ...courbe(30, (t) => {
      const th = (1 - t) * (Math.PI / 2);
      return [RP * Math.pow(Math.sin(th), 0.62), 0.005 + (haut - 0.005) * Math.pow(Math.cos(th), 0.9)];
    }),
  ];
  const g = tour(pts);
  bosseler(g, (v) => 0.0024 * (fbm(v.x * 22, v.y * 22, v.z * 22, 3, graine) - 0.5) + 0.0008 * (bruit(v.x * 160, v.y * 160, v.z * 160, graine + 3) - 0.5));
  g.scale(1, 1, 0.975);
  return g;
}

export function talon({ haut = 0.021, graine = 1 } = {}) {
  const pts = [
    [0, 0],
    [RP * 0.9, 0],
    [RP * 0.975, 0.0025],
    [RP * 0.998, 0.008],
    [RP * 0.99, haut - 0.004],
    [RP * 0.965, haut - 0.0008],
    [RP * 0.94, haut],
  ];
  const g = tour(pts);
  bosseler(g, (v) => 0.0016 * (fbm(v.x * 24, v.y * 24, v.z * 24, 3, graine) - 0.5));
  g.scale(1, 1, 0.975);
  return g;
}

/** Face de coupe (mie), disque bosselé tourné vers le haut (ou le bas). */
export function coupe(r = RP * 0.94, versLeHaut = true, graine = 2) {
  const g = new THREE.CircleGeometry(r, 96);
  g.rotateX(versLeHaut ? -Math.PI / 2 : Math.PI / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const z = p.getZ(i);
    const k = 1 - Math.pow(Math.hypot(x, z) / r, 4);
    p.setY(i, (versLeHaut ? 1 : -1) * k * 0.0012 * fbm(x * 60, z * 60, 0, 2, graine));
  }
  g.scale(1, 1, 0.975);
  g.computeVertexNormals();
  return g;
}

// ---------- steak smashé : galette fine, bords en dentelle croustillante ----------
export function steak({ r = 0.061, ep = 0.0085, graine = 4 } = {}) {
  const pts = [
    [0, 0],
    ...courbe(8, (t) => [r * 0.82 * t, 0]),
    [r * 0.9, 0.0008],
    [r * 0.96, 0.0019],
    [r, 0.0034],
    [r * 0.975, 0.0052],
    [r * 0.93, ep * 0.8],
    [r * 0.86, ep * 0.95],
    ...courbe(8, (t) => [r * 0.82 * (1 - t), ep * (0.97 + 0.03 * t)]),
  ];
  const g = tour(pts, 160);
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const rr = Math.hypot(v.x, v.z);
    const a = Math.atan2(v.z, v.x);
    const bord = doux(r * 0.7, r, rr);
    // contour irrégulier (écrasé à la spatule) + dentelle fine au bord
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    const k = 1 + bord * (0.16 * (fbm(ca * 1.6 + 5, sa * 1.6, 0, 3, graine) - 0.5) + 0.07 * (fbm(ca * 9, sa * 9, 0, 3, graine + 1) - 0.5));
    const dessus = v.y > ep * 0.4 ? 1 : -0.4;
    const y = v.y + dessus * (0.0016 * (fbm(v.x * 70, v.z * 70, 0, 4, graine + 2) - 0.5)) + bord * 0.0022 * (bruit(ca * 30, sa * 30, 0, graine + 3) - 0.5);
    p.setXYZ(i, v.x * k, y, v.z * k);
  }
  g.computeVertexNormals();
  return souder(g);
}

/** Profil du contour d'un steak (pour draper le fromage et la sauce dessus). */
export function rayonSteak(a, { r = 0.061, graine = 4 } = {}) {
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  return r * (1 + 0.16 * (fbm(ca * 1.6 + 5, sa * 1.6, 0, 3, graine) - 0.5) + 0.07 * (fbm(ca * 9, sa * 9, 0, 3, graine + 1) - 0.5));
}

// ---------- drapé (fromage, sauce) : une nappe qui suit le dessus et coule au-delà du bord ----------
function draper(g, { bord, chute = 34, coulures = [], graine = 0 }) {
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const z = p.getZ(i);
    const r = Math.hypot(x, z);
    const a = Math.atan2(z, x);
    const rb = bord(a);
    let y = 0.00035 * Math.sin(Math.min(1, r / rb) * Math.PI) * (1 + fbm(x * 90, z * 90, 0, 2, graine));
    let rn = r;
    if (r > rb) {
      const t = r - rb;
      y -= t * t * chute + t * 0.12;
      rn = rb + t * 0.3; // la nappe retombe le long du bord
    }
    for (const c of coulures) {
      let da = Math.abs(a - c.a);
      da = Math.min(da, Math.PI * 2 - da);
      const w = Math.exp(-((da / c.l) ** 2));
      if (r > rb * 0.9 && w > 0.01) {
        y -= w * c.h * doux(rb * 0.9, rb * 1.08, r);
        rn = Math.min(rn, rb + (r - rb) * 0.2 + 0.0004);
      }
    }
    const k = r > 0 ? rn / r : 1;
    p.setXYZ(i, x * k, y, z * k);
  }
  g.computeVertexNormals();
  return g;
}

export function fromage({ graine = 6, cote = 0.1, angle = 0.4, steakR = 0.061, steakGraine = 4 } = {}) {
  const g = new THREE.PlaneGeometry(cote, cote, 72, 72);
  g.rotateX(-Math.PI / 2);
  g.rotateY(angle);
  const coulures = Array.from({ length: 3 }, (_, i) => ({ a: angle + Math.PI / 4 + (i * Math.PI) / 2 + (alea(i, graine) - 0.5) * 0.3, l: 0.12 + alea(i + 3, graine) * 0.1, h: 0.006 + alea(i + 5, graine) * 0.008 }));
  return draper(g, { bord: (a) => rayonSteak(a, { r: steakR, graine: steakGraine }) * 0.97, chute: 12, coulures, graine });
}

export function sauce({ graine = 8, r = 0.043, bordR = RP * 0.94 } = {}) {
  // un anneau à trou minuscule : beaucoup de cercles concentriques pour bien draper le bord
  const anneau = new THREE.RingGeometry(0.0004, r * 1.3, 144, 22);
  anneau.rotateX(-Math.PI / 2);
  const p = anneau.attributes.position;
  // contour irrégulier de la sauce étalée
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const z = p.getZ(i);
    const a = Math.atan2(z, x);
    const k = 0.78 + 0.32 * fbm(Math.cos(a) * 2 + 9, Math.sin(a) * 2, 0, 3, graine);
    p.setXYZ(i, x * k, 0, z * k);
  }
  const coulures = Array.from({ length: 2 }, (_, i) => ({ a: alea(i, graine) * Math.PI * 2, l: 0.07 + alea(i + 2, graine) * 0.06, h: 0.004 + alea(i + 4, graine) * 0.006 }));
  return draper(anneau, { bord: () => bordR, chute: 30, coulures, graine });
}

// ---------- salade : feuille froissée, bord ondulé qui dépasse ----------
export function salade({ r = 0.066, graine = 10 } = {}) {
  const g = new THREE.RingGeometry(0.002, r, 192, 18);
  g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const z = p.getZ(i);
    const rr = Math.hypot(x, z);
    const a = Math.atan2(z, x);
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    const e = doux(r * 0.55, r, rr);
    // bord découpé irrégulier, grands plis souples, petites frisures au bord
    const k = 1 + e * (0.3 * (fbm(ca * 1.5 + 3, sa * 1.5, 0, 4, graine) - 0.5) + 0.06 * (fbm(ca * 12, sa * 12, 0, 2, graine + 5) - 0.5));
    const plis = 0.013 * (fbm(ca * 2.2 + 7, sa * 2.2, rr * 30, 3, graine + 1) - 0.5) * 2;
    const frisure = 0.0028 * Math.sin(a * 17 + 9 * fbm(ca * 2, sa * 2, 0, 2, graine + 2)) * doux(0.7, 1, rr / r);
    const y = e * e * (plis + frisure) - e * e * 0.004 + 0.0012 * (fbm(x * 80, z * 80, 0, 2, graine + 3) - 0.5);
    p.setXYZ(i, x * k, y, z * k);
  }
  g.computeVertexNormals();
  return g;
}

// ---------- cornichon : rondelle ondulée (coupe crinkle) ----------
export function cornichon({ r = 0.0125, ep = 0.0028 } = {}) {
  const g = new THREE.CylinderGeometry(r, r, ep, 72, 1);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const z = p.getZ(i);
    const rr = Math.hypot(x, z);
    if (rr < r * 0.8) continue;
    const a = Math.atan2(z, x);
    const k = 1 + 0.06 * Math.sin(a * 14);
    p.setXYZ(i, x * k, p.getY(i) + 0.0004 * Math.sin(a * 14), z * k);
  }
  g.translate(0, ep / 2, 0);
  g.computeVertexNormals();
  return g;
}

/** Points du sommet du pain où poser les graines de sésame : [position, normale]. */
export function semis(geo, n, graine = 0) {
  const p = geo.attributes.position;
  const nn = geo.attributes.normal;
  const uv = geo.attributes.uv;
  const choix = [];
  let essai = 0;
  while (choix.length < n && essai < n * 200) {
    const i = Math.floor(alea(essai++, graine) * p.count);
    if (uv.getY(i) < 0.62 && uv.getY(i) > 0.02) choix.push(i);
  }
  return choix.map((i) => [new THREE.Vector3().fromBufferAttribute(p, i), new THREE.Vector3().fromBufferAttribute(nn, i)]);
}
