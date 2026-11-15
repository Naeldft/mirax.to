import * as THREE from 'three';

/* ------------------------------------------------------------------
   Mannequins des démos (outils communs) : tête sculptée d'un seul tenant, relief « mèches » des coiffures.
   Style : mannequin de vitrine haut de gamme, lisse et mat, sans détail réaliste.
------------------------------------------------------------------- */

/** Carte de relief « mèches » : stries verticales irrégulières, converties en carte de normales. */
let _meches;
export function carteMeches() {
  if (_meches) return _meches;
  const L = 512;
  const H = 128;
  const haut = new Float32Array(L * H);
  // stries : somme de sinus de fréquences différentes, légèrement ondulées sur la hauteur
  for (let y = 0; y < H; y++)
    for (let x = 0; x < L; x++) {
      const u = (x / L) * Math.PI * 2;
      const o = Math.sin(y / 9) * 0.6;
      haut[y * L + x] = 0.35 * Math.sin(u * 90 + o) + 0.3 * Math.sin(u * 151 + o * 2.1 + 1.3) + 0.2 * Math.sin(u * 233 + 2.7) + 0.15 * Math.sin(u * 37 + o * 0.5);
    }
  const c = document.createElement('canvas');
  c.width = L;
  c.height = H;
  const g = c.getContext('2d');
  const img = g.createImageData(L, H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < L; x++) {
      const dx = haut[y * L + ((x + 1) % L)] - haut[y * L + ((x - 1 + L) % L)];
      const dy = haut[((y + 1) % H) * L + x] - haut[((y - 1 + H) % H) * L + x];
      const n = new THREE.Vector3(-dx * 1.6, -dy * 0.4, 1).normalize();
      const i = (y * L + x) * 4;
      img.data[i] = (n.x * 0.5 + 0.5) * 255;
      img.data[i + 1] = (n.y * 0.5 + 0.5) * 255;
      img.data[i + 2] = (n.z * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  g.putImageData(img, 0, 0);
  _meches = new THREE.CanvasTexture(c);
  _meches.wrapS = _meches.wrapT = THREE.RepeatWrapping;
  return _meches;
}

/**
 * Tête de mannequin sculptée d'un seul tenant : une sphère déformée (mâchoire affinée, menton, arête du nez,
 * arcades, orbites à peine creusées, pommettes, lèvres). Aucun détail réaliste : un buste lisse et élégant.
 */
export function teteSculptee(homme) {
  const geo = new THREE.SphereGeometry(0.1, 128, 96);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  const bosse = (x, y, z, cx, cy, sx, sy) => Math.exp(-((x - cx) ** 2) / (2 * sx * sx) - ((y - cy) ** 2) / (2 * sy * sy)) * Math.max(0, z);
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).divideScalar(0.1); // sphère unité
    const { x, y, z } = v;
    let r = 1;
    // forme générale : un ovoïde, plus étroit en bas (mâchoire), crâne un peu allongé vers l'arrière
    const bas = Math.max(0, -y);
    let sx = (homme ? 0.93 : 0.86) * (1 - bas * (homme ? 0.16 : 0.24));
    let sz = 0.98 * (1 - bas * 0.12) + Math.max(0, -z) * 0.04;
    const sy = 1.14;
    // le visage, à l'avant (z > 0)
    r += 0.06 * bosse(x, y, z, 0, -0.03, 0.07, 0.24); // arête du nez
    r += 0.035 * bosse(x, y, z, 0, -0.22, 0.09, 0.06); // bout du nez
    r -= 0.025 * bosse(x, y, z, 0.32, 0.12, 0.14, 0.09) + 0.025 * bosse(x, y, z, -0.32, 0.12, 0.14, 0.09); // orbites
    r += 0.02 * bosse(x, y, z, 0, 0.3, 0.45, 0.07); // arcades
    r += 0.03 * bosse(x, y, z, 0.48, -0.12, 0.16, 0.12) + 0.03 * bosse(x, y, z, -0.48, -0.12, 0.16, 0.12); // pommettes
    r += 0.018 * bosse(x, y, z, 0, -0.45, 0.18, 0.05); // lèvres
    r += (homme ? 0.05 : 0.035) * bosse(x, y, z, 0, -0.78, 0.22, 0.1); // menton
    v.set(x * sx * r, y * sy * r, z * sz * r).multiplyScalar(0.1);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

