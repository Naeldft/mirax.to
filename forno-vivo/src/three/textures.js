// Textures procédurales (Canvas 2D) : aucune image externe.
import * as THREE from 'three';

export const rand = (seed) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const canvas = (w, h) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')];
};

const tex = (c, { repeat = false } = {}) => {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
};

const cache = new Map();
const memo = (key, fn) => {
  if (!cache.has(key)) cache.set(key, fn());
  return cache.get(key);
};

/**
 * Pâte : la coordonnée v suit le profil (0 = centre, 1 = bord extérieur).
 * Bordure dorée avec les taches "léopard" typiques de la cuisson au feu de bois.
 */
export const doughTexture = (size = 512) =>
  memo('dough' + size, () => {
    const [c, ctx] = canvas(size, size / 2);
    const h = size / 2;
    // v = 0 (dessous, centre) → v = 1 (dessus, centre) ; la bordure se trouve vers v ≈ 0,35–0,75
    const g = ctx.createLinearGradient(0, h, 0, 0);
    g.addColorStop(0, '#c99a5a');
    g.addColorStop(0.3, '#d9a35e');
    g.addColorStop(0.47, '#c98840');
    g.addColorStop(0.56, '#b77836');
    g.addColorStop(0.7, '#d9a65e');
    g.addColorStop(0.85, '#ead0a0');
    g.addColorStop(1, '#efd8a8');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, h);
    // taches "léopard" sur le haut de la bordure
    for (let i = 0; i < 260; i++) {
      const x = rand(i) * size;
      const y = h * (0.28 + rand(i + 99) * 0.38);
      const r = 1.5 + rand(i + 7) * 6;
      ctx.fillStyle = `rgba(${40 + rand(i + 3) * 30},${22 + rand(i + 4) * 14},10,${0.35 + rand(i + 5) * 0.5})`;
      // dessinée aussi de l'autre côté pour que la texture se raccorde sans couture
      for (const dx of [0, -size, size]) {
        ctx.beginPath();
        ctx.ellipse(x + dx, y, r * 1.6, r, rand(i + 6) * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // farine
    for (let i = 0; i < 500; i++) {
      ctx.fillStyle = `rgba(255,248,230,${0.15 + rand(i + 900) * 0.2})`;
      ctx.fillRect(rand(i + 300) * size, rand(i + 600) * h, 1.5, 1.5);
    }
    const t = tex(c);
    t.wrapS = THREE.RepeatWrapping;
    return t;
  });

/** Calzone : pâte dorée vue de dessus (UV planaires). */
export const crustTopTexture = () =>
  memo('crust-top', () => {
    const s = 512;
    const [c, ctx] = canvas(s, s);
    ctx.fillStyle = '#dcaa62';
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 380; i++) {
      const r = 2 + rand(i + 11) * 9;
      ctx.fillStyle = `rgba(${50 + rand(i) * 40},${28 + rand(i + 1) * 20},12,${0.25 + rand(i + 2) * 0.45})`;
      ctx.beginPath();
      ctx.ellipse(rand(i + 21) * s, rand(i + 31) * s, r * 1.5, r, rand(i + 41) * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    const t = tex(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1, 1);
    return t;
  });

const SAUCES = {
  tomate: { base: '#a8231a', light: '#c9402c', dark: '#7e160f', speck: null },
  creme: { base: '#f1dcb0', light: '#fbefd2', dark: '#d9b980', speck: '#c08440' },
  truffe: { base: '#e3d3ae', light: '#f2e6c8', dark: '#cdb88b', speck: '#2e2219' },
  pistache: { base: '#8fa24e', light: '#a9bb63', dark: '#6f8136', speck: '#4e5c22' },
};

/** Sauce : disque à bord irrégulier (canal alpha) avec nuances. */
export const sauceTexture = (kind) =>
  memo('sauce-' + kind, () => {
    const s = 512;
    const k = SAUCES[kind] ?? SAUCES.tomate;
    const [c, ctx] = canvas(s, s);
    ctx.translate(s / 2, s / 2);
    ctx.beginPath();
    const pts = 90;
    for (let i = 0; i <= pts; i++) {
      const a = (i / pts) * Math.PI * 2;
      const r = s * 0.47 * (0.96 + 0.04 * Math.sin(a * 7 + 1) + 0.02 * Math.sin(a * 17));
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = k.base;
    ctx.fill();
    ctx.save();
    ctx.clip();
    for (let i = 0; i < 70; i++) {
      const r = 10 + rand(i + 50) * 46;
      ctx.fillStyle = (rand(i) > 0.5 ? k.light : k.dark) + '55';
      ctx.beginPath();
      ctx.ellipse((rand(i + 1) - 0.5) * s * 0.9, (rand(i + 2) - 0.5) * s * 0.9, r * 1.8, r, rand(i + 3) * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    if (k.speck) {
      for (let i = 0; i < 900; i++) {
        ctx.fillStyle = k.speck;
        ctx.globalAlpha = 0.4 + rand(i + 7) * 0.5;
        ctx.fillRect((rand(i + 70) - 0.5) * s, (rand(i + 80) - 0.5) * s, 2 + rand(i) * 2, 2 + rand(i + 1) * 2);
      }
      ctx.globalAlpha = 1;
    }
    ctx.restore();
    return tex(c);
  });

/** Planche en bois (pelle à pizza). */
export const woodTexture = () =>
  memo('wood', () => {
    const s = 512;
    const [c, ctx] = canvas(s, s);
    ctx.fillStyle = '#5a3a22';
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 120; i++) {
      const y = rand(i) * s;
      ctx.strokeStyle = `rgba(${30 + rand(i + 1) * 40},${18 + rand(i + 2) * 20},8,${0.25 + rand(i + 3) * 0.35})`;
      ctx.lineWidth = 1 + rand(i + 4) * 3;
      ctx.beginPath();
      for (let x = 0; x <= s; x += 16) ctx.lineTo(x, y + Math.sin(x / 60 + i) * 4);
      ctx.stroke();
    }
    const t = tex(c);
    return t;
  });

/** Tranche de salami : rouge avec points de gras. */
export const salamiTexture = () =>
  memo('salami', () => {
    const s = 128;
    const [c, ctx] = canvas(s, s);
    ctx.fillStyle = '#8e1f1a';
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(240,200,180,${0.5 + rand(i) * 0.4})`;
      ctx.beginPath();
      ctx.arc(rand(i + 1) * s, rand(i + 2) * s, 2 + rand(i + 3) * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = '#5c120e';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(s / 2, s / 2, s / 2 - 4, 0, Math.PI * 2);
    ctx.stroke();
    return tex(c);
  });

/** Mortadelle : rose pâle avec éclats de pistache et de gras. */
export const mortadellaTexture = () =>
  memo('mortadella', () => {
    const s = 128;
    const [c, ctx] = canvas(s, s);
    ctx.fillStyle = '#e8a6a0';
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 26; i++) {
      ctx.fillStyle = rand(i) > 0.6 ? '#7d9a3c' : '#f7e3dc';
      ctx.beginPath();
      ctx.arc(rand(i + 1) * s, rand(i + 2) * s, 2 + rand(i + 3) * 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
    return tex(c);
  });
