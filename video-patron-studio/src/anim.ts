import { Easing, interpolate, spring } from 'remotion';
import { FPS } from './timeline';

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** 0→1 entre deux images, avec easing doux. */
export const ramp = (f: number, a: number, b: number, ease = Easing.bezier(0.45, 0, 0.2, 1)) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeIn = Easing.bezier(0.55, 0, 0.9, 0.4);

/** Ressort amorti, 0→1 à partir de l'image `start`. */
export const sp = (f: number, start: number, damping = 14, mass = 0.8, stiffness = 120) =>
  spring({ frame: f - start, fps: FPS, config: { damping, mass, stiffness } });

/** Pseudo-aléatoire déterministe. */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Découpe "texte *accent*" en segments. */
export const parseAccent = (s: string) =>
  s.split(/(\*[^*]+\*)/g).filter(Boolean).map((p) =>
    p.startsWith('*') ? { t: p.slice(1, -1), accent: true } : { t: p, accent: false },
  );
export const stripAccent = (s: string) => s.replace(/\*/g, '');
