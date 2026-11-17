/* Bruit de valeur 3D et fBm, déterministes (graine), pour sculpter et texturer les ingrédients en code. */

const hash = (x, y, z, s) => {
  let h = (x * 374761393 + y * 668265263 + z * 2147483647 + s * 1442695041) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
};
const lisse = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const mix = (a, b, t) => a + (b - a) * t;

/** Bruit de valeur 3D dans [0, 1]. */
export function bruit(x, y, z = 0, s = 0) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const u = lisse(x - xi);
  const v = lisse(y - yi);
  const w = lisse(z - zi);
  const c = (i, j, k) => hash(xi + i, yi + j, zi + k, s);
  return mix(
    mix(mix(c(0, 0, 0), c(1, 0, 0), u), mix(c(0, 1, 0), c(1, 1, 0), u), v),
    mix(mix(c(0, 0, 1), c(1, 0, 1), u), mix(c(0, 1, 1), c(1, 1, 1), u), v),
    w,
  );
}

/** fBm : somme d'octaves, dans [0, 1] environ. */
export function fbm(x, y, z = 0, octaves = 4, s = 0) {
  let a = 0.5;
  let f = 1;
  let t = 0;
  let n = 0;
  for (let o = 0; o < octaves; o++) {
    t += a * bruit(x * f, y * f, z * f, s + o * 17);
    n += a;
    a *= 0.5;
    f *= 2.03;
  }
  return t / n;
}

/** Hasard déterministe dans [0, 1[. */
export const alea = (i, s = 0) => hash(i, 7, 13, s + 101);

export const clamp01 = (t) => Math.min(1, Math.max(0, t));
export const doux = (a, b, x) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
