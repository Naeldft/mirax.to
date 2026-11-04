// Toutes les images affichées sur les objets 3D sont dessinées en code (Canvas 2D).
import * as THREE from 'three';
import { BODY, DISPLAY } from './assets';
import { config } from './config';
import { parseAccent } from './anim';

const G = config.marque.vert;

export const makeCanvas = (w: number, h: number) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  return { c, ctx };
};

export const toTexture = (c: HTMLCanvasElement) => {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.needsUpdate = true;
  return t;
};

export const rr = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};

/** Texte avec segments *accent* sur une ligne, centré en x. */
const drawAccentLine = (
  ctx: CanvasRenderingContext2D,
  line: string,
  cx: number,
  y: number,
  color: string,
  accent: string,
) => {
  const segs = parseAccent(line);
  const total = segs.reduce((s, p) => s + ctx.measureText(p.t).width, 0);
  let x = cx - total / 2;
  for (const p of segs) {
    ctx.fillStyle = p.accent ? accent : color;
    ctx.fillText(p.t, x, y);
    x += ctx.measureText(p.t).width;
  }
};

/** Texte de l'accroche (scène 1), ajusté à une largeur max. */
export const hookTexture = (lines: string[], maxWidthPx: number) => {
  const scale = 2; // sur-échantillonnage pour la netteté
  let size = 130;
  const { ctx: m } = makeCanvas(10, 10);
  const plain = lines.map((l) => l.replace(/\*/g, ''));
  for (; size > 40; size -= 2) {
    m.font = `800 ${size}px ${DISPLAY}`;
    if (Math.max(...plain.map((l) => m.measureText(l).width)) <= maxWidthPx) break;
  }
  const lh = size * 1.12;
  const w = Math.ceil(maxWidthPx + 40);
  const h = Math.ceil(lh * lines.length + size * 0.5);
  const { c, ctx } = makeCanvas(w * scale, h * scale);
  ctx.scale(scale, scale);
  ctx.font = `800 ${size}px ${DISPLAY}`;
  ctx.textBaseline = 'alphabetic';
  lines.forEach((l, i) => drawAccentLine(ctx, l, w / 2, size * 1.0 + i * lh, '#fff', G));
  return { tex: toTexture(c), w, h };
};

/** Halo radial (lueur). */
export const haloTexture = (color: string) => {
  const { c, ctx } = makeCanvas(256, 256);
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, color);
  g.addColorStop(0.35, color + '55');
  g.addColorStop(1, color + '00');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return toTexture(c);
};

export const dotTexture = () => {
  const { c, ctx } = makeCanvas(64, 64);
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.5)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return toTexture(c);
};

// ---------------------------------------------------------------------------
// Maquettes de sites (concepts fictifs)
// ---------------------------------------------------------------------------
export type Palette = { bg: string; ink: string; primary: string; accent: string; soft: string };

export const PALETTES: Palette[] = [
  { bg: '#F6EBDD', ink: '#3B2414', primary: '#8B4A1F', accent: '#E7A44B', soft: '#EAD7BF' }, // boulangerie
  { bg: '#141414', ink: '#F7EDEA', primary: '#F2C7C7', accent: '#E58FA0', soft: '#2A2224' }, // coiffeur
  { bg: '#EAF2FB', ink: '#0D2A4F', primary: '#1453A3', accent: '#F2B705', soft: '#D3E2F4' }, // plombier
  { bg: '#F3EEE6', ink: '#2B2118', primary: '#6B4A2E', accent: '#2F7D6D', soft: '#E2D6C4' }, // menuiserie
  { bg: '#0E1A12', ink: '#F2F7EE', primary: '#C6F432', accent: '#8FD14F', soft: '#1D2E22' }, // coach
  { bg: '#FFF4F0', ink: '#1D1D1D', primary: '#1D1D1D', accent: '#E86A4A', soft: '#F6DED5' }, // boutique
  { bg: '#1C0F0B', ink: '#F3E2C7', primary: '#F3E2C7', accent: '#C8502E', soft: '#33201A' }, // restaurant
  { bg: '#F2F7EF', ink: '#173D20', primary: '#2E6B3A', accent: '#F29F05', soft: '#DCEAD6' }, // association
  { bg: '#F4F4F4', ink: '#151515', primary: '#151515', accent: '#7C6CF2', soft: '#E2E2E2' }, // photographe
  { bg: '#FBEFF3', ink: '#3A1626', primary: '#B03A6B', accent: '#5E9E4B', soft: '#F3D6E1' }, // fleuriste
];

/** Formes abstraites "photo" (aucune image réelle). */
const drawPicture = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, p: Palette, seed: number) => {
  ctx.save();
  rr(ctx, x, y, w, h, Math.min(w, h) * 0.06);
  ctx.clip();
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  g.addColorStop(0, p.soft);
  g.addColorStop(1, p.accent + 'AA');
  ctx.fillStyle = g;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = p.primary + 'CC';
  ctx.beginPath();
  ctx.arc(x + w * (0.3 + 0.4 * ((seed * 37) % 10) / 10), y + h * 0.95, h * 0.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = p.accent;
  ctx.beginPath();
  ctx.arc(x + w * 0.8, y + h * 0.28, h * 0.14, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const lines = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, n: number, gap: number, th: number, color: string) => {
  ctx.fillStyle = color;
  for (let i = 0; i < n; i++) {
    rr(ctx, x, y + i * gap, w * (i === n - 1 ? 0.6 : 1), th, th / 2);
    ctx.fill();
  }
};

const fitFont = (ctx: CanvasRenderingContext2D, text: string, weight: string, family: string, max: number, maxW: number) => {
  let s = max;
  for (; s > 10; s -= 2) {
    ctx.font = `${weight} ${s}px ${family}`;
    if (ctx.measureText(text).width <= maxW) break;
  }
  return s;
};

/** Carte de site "mobile" pour le couloir de métiers. */
export const siteCardTexture = (name: string, tagline: string, p: Palette, seed: number) => {
  const w = 600;
  const h = 780;
  const { c, ctx } = makeCanvas(w, h);
  rr(ctx, 0, 0, w, h, 36);
  ctx.fillStyle = p.bg;
  ctx.fill();
  // barre de navigation
  ctx.fillStyle = p.primary;
  ctx.beginPath();
  ctx.arc(54, 52, 18, 0, Math.PI * 2);
  ctx.fill();
  lines(ctx, w - 130, 40, 76, 3, 11, 5, p.ink + '99');
  // titre
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  const s = fitFont(ctx, name, '800', DISPLAY, 82, w - 80);
  ctx.fillStyle = p.ink;
  ctx.fillText(name, 40, 168);
  ctx.font = `600 34px ${BODY}`;
  ctx.fillStyle = p.ink + 'CC';
  fitFont(ctx, tagline, '600', BODY, 34, w - 80);
  ctx.fillText(tagline, 40, 168 + 54);
  void s;
  // image
  drawPicture(ctx, 40, 258, w - 80, 300, p, seed);
  // bouton
  rr(ctx, 40, 588, 250, 70, 35);
  ctx.fillStyle = p.accent;
  ctx.fill();
  rr(ctx, 74, 617, 180, 12, 6);
  ctx.fillStyle = p.bg;
  ctx.fill();
  lines(ctx, 40, 688, w - 80, 3, 24, 10, p.ink + '40');
  return toTexture(c);
};

/** Contenu de site générique pour l'ordinateur / le téléphone. */
const drawSite = (
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  w: number,
  h: number,
  p: Palette,
  name: string,
  tagline: string,
  mobile: boolean,
) => {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x0, y0, w, h);
  ctx.clip();
  ctx.fillStyle = p.bg;
  ctx.fillRect(x0, y0, w, h);
  const u = mobile ? w / 400 : w / 1000;
  // nav
  ctx.fillStyle = p.primary;
  ctx.beginPath();
  ctx.arc(x0 + 34 * u, y0 + 34 * u, 13 * u, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = `800 ${18 * u}px ${DISPLAY}`;
  ctx.fillStyle = p.ink;
  ctx.textAlign = 'left';
  ctx.fillText(name, x0 + 56 * u, y0 + 41 * u);
  if (mobile) lines(ctx, x0 + w - 54 * u, y0 + 26 * u, 30 * u, 3, 8 * u, 3.5 * u, p.ink + '99');
  else for (let i = 0; i < 4; i++) lines(ctx, x0 + w - (330 - i * 70) * u, y0 + 32 * u, 52 * u, 1, 0, 6 * u, p.ink + '88');
  if (mobile) {
    ctx.font = `800 ${44 * u}px ${DISPLAY}`;
    ctx.fillStyle = p.ink;
    fitFont(ctx, name, '800', DISPLAY, 44 * u, w - 50 * u);
    ctx.fillText(name, x0 + 24 * u, y0 + 130 * u);
    ctx.font = `600 ${18 * u}px ${BODY}`;
    ctx.fillStyle = p.ink + 'CC';
    ctx.fillText(tagline, x0 + 24 * u, y0 + 164 * u);
    drawPicture(ctx, x0 + 24 * u, y0 + 190 * u, w - 48 * u, 250 * u, p, 3);
    rr(ctx, x0 + 24 * u, y0 + 465 * u, 170 * u, 48 * u, 24 * u);
    ctx.fillStyle = p.accent;
    ctx.fill();
    lines(ctx, x0 + 24 * u, y0 + 545 * u, w - 48 * u, 4, 22 * u, 9 * u, p.ink + '40');
    drawPicture(ctx, x0 + 24 * u, y0 + 650 * u, (w - 60 * u) / 2, 150 * u, p, 5);
    drawPicture(ctx, x0 + w / 2 + 6 * u, y0 + 650 * u, (w - 60 * u) / 2, 150 * u, p, 7);
  } else {
    ctx.fillStyle = p.ink;
    fitFont(ctx, name, '800', DISPLAY, 76 * u, 480 * u);
    ctx.fillText(name, x0 + 50 * u, y0 + 200 * u);
    ctx.font = `600 ${24 * u}px ${BODY}`;
    ctx.fillStyle = p.ink + 'CC';
    ctx.fillText(tagline, x0 + 50 * u, y0 + 248 * u);
    rr(ctx, x0 + 50 * u, y0 + 290 * u, 200 * u, 56 * u, 28 * u);
    ctx.fillStyle = p.accent;
    ctx.fill();
    drawPicture(ctx, x0 + 560 * u, y0 + 100 * u, 390 * u, 300 * u, p, 2);
    for (let i = 0; i < 3; i++) {
      rr(ctx, x0 + (50 + i * 305) * u, y0 + 450 * u, 285 * u, 150 * u, 14 * u);
      ctx.fillStyle = p.soft;
      ctx.fill();
      lines(ctx, x0 + (72 + i * 305) * u, y0 + 480 * u, 200 * u, 3, 26 * u, 10 * u, p.ink + '55');
    }
  }
  ctx.restore();
};

const PS_PALETTE: Palette = { bg: '#0A0A0A', ink: '#FFFFFF', primary: G, accent: G, soft: '#1A1A1A' };
const CLIENT = PALETTES[0];

/** Site Patrôn Studio (dessiné) avec formulaire "Parlez-nous de votre activité". */
const drawPatronSite = (ctx: CanvasRenderingContext2D, x0: number, y0: number, w: number, h: number, mobile: boolean) => {
  const p = PS_PALETTE;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x0, y0, w, h);
  ctx.clip();
  ctx.fillStyle = p.bg;
  ctx.fillRect(x0, y0, w, h);
  const u = mobile ? w / 400 : w / 1000;
  // monogramme simplifié
  rr(ctx, x0 + 22 * u, y0 + 18 * u, 36 * u, 36 * u, 9 * u);
  ctx.strokeStyle = G;
  ctx.lineWidth = 3 * u;
  ctx.stroke();
  ctx.font = `800 ${15 * u}px ${DISPLAY}`;
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.fillText('PS', x0 + 40 * u, y0 + 42 * u);
  ctx.textAlign = 'left';
  ctx.font = `800 ${17 * u}px ${DISPLAY}`;
  ctx.fillText(`${config.marque.nom1} ${config.marque.nom2}`, x0 + 70 * u, y0 + 42 * u);
  const title = ['Parlez-nous', 'de votre', 'activité.'];
  const fs = mobile ? 40 : 48; // titre court : ne touche jamais le formulaire à droite
  ctx.font = `800 ${fs * u}px ${DISPLAY}`;
  title.forEach((l, i) => {
    ctx.fillStyle = i === title.length - 1 ? G : '#fff';
    ctx.fillText(l, x0 + (mobile ? 24 : 50) * u, y0 + ((mobile ? 120 : 160) + i * fs * 1.1) * u);
  });
  const fields = ['Votre métier', 'Vos couleurs', 'Vos horaires', 'Vos photos'];
  const fx = mobile ? 24 : 600;
  const fy = mobile ? 290 : 110;
  const fw = mobile ? 352 : 360;
  fields.forEach((f, i) => {
    const yy = y0 + (fy + i * 78) * u;
    rr(ctx, x0 + fx * u, yy, fw * u, 60 * u, 12 * u);
    ctx.fillStyle = '#161616';
    ctx.fill();
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 2 * u;
    ctx.stroke();
    ctx.font = `600 ${20 * u}px ${BODY}`;
    ctx.fillStyle = '#d0d0d0';
    ctx.fillText(f, x0 + (fx + 22) * u, yy + 38 * u);
    ctx.fillStyle = G;
    ctx.beginPath();
    ctx.arc(x0 + (fx + fw - 30) * u, yy + 30 * u, 11 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3 * u;
    ctx.beginPath();
    ctx.moveTo(x0 + (fx + fw - 35) * u, yy + 30 * u);
    ctx.lineTo(x0 + (fx + fw - 31) * u, yy + 34 * u);
    ctx.lineTo(x0 + (fx + fw - 24) * u, yy + 26 * u);
    ctx.stroke();
  });
  const by = mobile ? 620 : 440;
  rr(ctx, x0 + fx * u, y0 + by * u, fw * u, 64 * u, 32 * u);
  ctx.fillStyle = G;
  ctx.fill();
  ctx.font = `700 ${22 * u}px ${BODY}`;
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.fillText('Envoyer', x0 + (fx + fw / 2) * u, y0 + (by + 40) * u);
  ctx.restore();
};

const badge = (ctx: CanvasRenderingContext2D, x: number, y: number, text: string, size: number, dot = false) => {
  ctx.font = `800 ${size}px ${BODY}`;
  const tw = ctx.measureText(text).width;
  const pad = size * 0.7;
  const extra = dot ? size * 1.1 : 0;
  const bw = tw + pad * 2 + extra;
  const bh = size * 1.9;
  rr(ctx, x - bw / 2, y, bw, bh, bh / 2);
  ctx.fillStyle = G;
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.textAlign = 'left';
  if (dot) {
    ctx.beginPath();
    ctx.arc(x - bw / 2 + pad + size * 0.35, y + bh / 2, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillText(text, x - bw / 2 + pad + extra, y + bh / 2 + size * 0.36);
};

/** Barre de navigateur (ordinateur). */
const browserBar = (ctx: CanvasRenderingContext2D, w: number, url: string) => {
  ctx.fillStyle = '#1b1b1b';
  ctx.fillRect(0, 0, w, 64);
  ['#ff5f57', '#febc2e', '#28c840'].forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(30 + i * 28, 32, 9, 0, Math.PI * 2);
    ctx.fill();
  });
  rr(ctx, 140, 14, w - 280, 36, 18);
  ctx.fillStyle = '#2b2b2b';
  ctx.fill();
  ctx.font = `600 20px ${BODY}`;
  ctx.fillStyle = '#e6e6e6';
  ctx.textAlign = 'center';
  ctx.fillText(url, w / 2, 39);
  ctx.textAlign = 'left';
};

/** Écran d'ordinateur pour l'étape 1, 2 ou 3. */
export const laptopScreenTexture = (step: 0 | 1 | 2) => {
  const w = 1280;
  const h = 800;
  const { c, ctx } = makeCanvas(w, h);
  const url = step === 0 ? config.coordonnees.site : step === 1 ? 'maquette · aperçu' : 'votre-site.fr';
  browserBar(ctx, w, url);
  // Étapes 2 et 3 : le badge a sa propre bande en bas, il ne recouvre jamais le site.
  const band = step === 0 ? 0 : 130;
  if (step === 0) drawPatronSite(ctx, 0, 64, w, h - 64, false);
  else drawSite(ctx, 0, 64, w, h - 64 - band, CLIENT, 'Boulangerie', 'Pains & viennoiseries', false);
  if (band) {
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, h - band, w, band);
  }
  if (step === 1) badge(ctx, w / 2, h - band + 27, 'MAQUETTE GRATUITE', 40);
  if (step === 2) badge(ctx, w / 2, h - band + 27, 'EN LIGNE', 40, true);
  return toTexture(c);
};

/** Écran de téléphone (étapes et scène "rassurer"). */
export const phoneScreenTexture = (step: 0 | 1 | 2 | 3) => {
  const w = 600;
  const h = 1240;
  const { c, ctx } = makeCanvas(w, h);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  const top = 70;
  const band = step === 0 ? 0 : 180;
  if (step === 0) drawPatronSite(ctx, 0, top, w, h - top, true);
  else drawSite(ctx, 0, top, w, h - top - band, CLIENT, 'Boulangerie', 'Pains & viennoiseries', true);
  if (band) {
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, h - band, w, band);
  }
  const by = h - band + 55;
  // barre d'état
  ctx.fillStyle = step === 0 ? '#fff' : '#fff';
  ctx.font = `700 26px ${BODY}`;
  ctx.textAlign = 'left';
  ctx.fillText('9:41', 40, 46);
  rr(ctx, w / 2 - 70, 16, 140, 38, 19);
  ctx.fillStyle = '#000';
  ctx.fill();
  if (step === 1) badge(ctx, w / 2, by, 'MAQUETTE GRATUITE', 32);
  if (step === 2) badge(ctx, w / 2, by, 'EN LIGNE', 34, true);
  if (step === 3) badge(ctx, w / 2, by, 'MAQUETTE GRATUITE', 32);
  return toTexture(c);
};

/** Face avant d'un bloc de prix (1200 × 360). */
export const PRICE_TEX_W = 1200;
export const PRICE_TEX_H = 360;
export const priceFaceTexture = (montant: string, periode: string, l: string[], highlight: boolean) => {
  const w = PRICE_TEX_W;
  const h = PRICE_TEX_H;
  const { c, ctx } = makeCanvas(w * 2, h * 2);
  ctx.scale(2, 2);
  ctx.fillStyle = highlight ? '#0E2619' : '#121212';
  rr(ctx, 0, 0, w, h, 40);
  ctx.fill();
  ctx.strokeStyle = highlight ? G : '#3a3a3a';
  ctx.lineWidth = 8;
  rr(ctx, 4, 4, w - 8, h - 8, 36);
  ctx.stroke();
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.font = `800 150px ${BODY}`;
  ctx.fillStyle = G;
  const mw = ctx.measureText(montant).width;
  const py = periode ? 185 : 228;
  ctx.fillText(montant, 54, py);
  if (periode) {
    ctx.font = `700 54px ${BODY}`;
    ctx.fillStyle = '#fff';
    ctx.fillText(periode, 60, py + 78);
  }
  const x = Math.max(440, 54 + mw + 54);
  const maxW = w - x - 40;
  const sizes = l.map((line) => {
    let s = 62;
    for (; s > 30; s -= 1) {
      ctx.font = `700 ${s}px ${BODY}`;
      if (ctx.measureText(line).width <= maxW) break;
    }
    return s;
  });
  const s = Math.min(...sizes);
  ctx.font = `700 ${s}px ${BODY}`;
  ctx.fillStyle = '#fff';
  const lh = s * 1.25;
  const y0 = h / 2 - ((l.length - 1) * lh) / 2 + s * 0.36;
  l.forEach((line, i) => ctx.fillText(line, x, y0 + i * lh));
  return toTexture(c);
};

export const solidTexture = (color: string) => {
  const { c, ctx } = makeCanvas(4, 4);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 4, 4);
  return toTexture(c);
};
