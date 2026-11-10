// Silhouettes des véhicules (vue de profil, en mètres) : utilisées pour la 3D ET pour les dessins du catalogue.
import * as THREE from 'three';

/**
 * Paramètres par modèle.
 *  L : longueur, W : largeur, R : rayon des roues, wheels : position des essieux (x)
 *  sill : hauteur du bas de caisse, belt : ligne de caisse, hood : hauteur du capot à l'avant
 *  cabin : vitrage (polygone), body : contour personnalisé (utilitaire)
 */
export const PROFILS = {
  citadine: {
    L: 3.8,
    W: 1.72,
    R: 0.32,
    wheels: [-1.22, 1.2],
    sill: 0.3,
    belt: 0.95,
    hood: 0.8,
    cabin: [
      [-1.72, 0.95],
      [-1.52, 1.45],
      [0.2, 1.5],
      [0.98, 0.97],
    ],
  },
  suv: {
    L: 4.5,
    W: 1.9,
    R: 0.4,
    wheels: [-1.45, 1.42],
    sill: 0.42,
    belt: 1.15,
    hood: 1.0,
    cabin: [
      [-2.1, 1.15],
      [-1.98, 1.74],
      [0.55, 1.77],
      [1.28, 1.18],
    ],
  },
  utilitaire: {
    L: 4.9,
    W: 1.95,
    R: 0.36,
    wheels: [-1.55, 1.55],
    sill: 0.36,
    belt: 1.15,
    hood: 0.98,
    body: [
      [-2.45, 0.36],
      [-2.45, 2.0],
      [0.85, 2.0],
      [1.75, 1.18],
      [2.38, 1.0],
      [2.45, 0.42],
    ],
    cabin: [
      [0.25, 1.2],
      [0.25, 1.88],
      [0.86, 1.94],
      [1.72, 1.2],
    ],
  },
  premium: {
    L: 4.6,
    W: 1.9,
    R: 0.36,
    wheels: [-1.42, 1.48],
    sill: 0.27,
    belt: 0.86,
    hood: 0.7,
    cabin: [
      [-1.95, 0.86],
      [-1.15, 1.24],
      [0.3, 1.27],
      [1.1, 0.87],
    ],
  },
};

/** Contour latéral de la carrosserie, avec passages de roues. */
export function bodyShape(p) {
  const s = new THREE.Shape();
  const half = p.L / 2;
  const arch = p.R + 0.07;
  const [rx, fx] = p.wheels;
  if (p.body) {
    // utilitaire : contour complet donné, passages de roues découpés en bas
    const pts = p.body;
    s.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
  } else {
    s.moveTo(-half, p.sill + 0.05);
    s.quadraticCurveTo(-half - 0.02, p.belt - 0.05, -half + 0.12, p.belt);
    s.lineTo(p.cabin[p.cabin.length - 1][0], p.belt);
    s.lineTo(half - 0.45, p.hood);
    s.quadraticCurveTo(half, p.hood - 0.04, half, p.hood - 0.25);
    s.lineTo(half - 0.02, p.sill + 0.05);
  }
  // bas de caisse et passages de roues (de l'avant vers l'arrière)
  s.lineTo(fx + arch, p.sill);
  s.absarc(fx, p.R, arch, 0, Math.PI, false);
  s.lineTo(rx + arch, p.sill);
  s.absarc(rx, p.R, arch, 0, Math.PI, false);
  s.lineTo(p.body ? p.body[0][0] : -half + 0.04, p.sill);
  s.closePath();
  return s;
}

export function cabinShape(p) {
  const s = new THREE.Shape();
  const c = p.cabin;
  s.moveTo(c[0][0], c[0][1]);
  // vitrage arrondi : courbes entre les points
  s.quadraticCurveTo(c[0][0] + 0.02, (c[0][1] + c[1][1]) / 2 + 0.05, c[1][0], c[1][1]);
  s.lineTo(c[2][0], c[2][1]);
  s.quadraticCurveTo(c[3][0] - 0.25, c[2][1] - 0.05, c[3][0], c[3][1]);
  s.closePath();
  return s;
}

/** Chemin SVG de la silhouette (pour le catalogue), coordonnées retournées verticalement. */
export function silhouettePath(id) {
  const p = PROFILS[id];
  const toPath = (shape) =>
    shape
      .getPoints(16)
      .map((pt, i) => `${i ? 'L' : 'M'}${(pt.x * 100).toFixed(1)} ${(-pt.y * 100).toFixed(1)}`)
      .join(' ') + ' Z';
  return { body: toPath(bodyShape(p)), cabin: toPath(cabinShape(p)), p };
}
