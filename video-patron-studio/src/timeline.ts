// Découpage temporel (images, 30 i/s). Durée totale : 50 s.
export const FPS = 30;
export const W = 1080;
export const H = 1920;

export const T = {
  hook: { from: 0, to: 120 }, // 0 – 4 s
  title: { from: 120, to: 270 }, // 4 – 9 s
  corridor: { from: 270, to: 570 }, // 9 – 19 s
  steps: { from: 570, to: 900 }, // 19 – 30 s
  prices: { from: 900, to: 1170 }, // 30 – 39 s
  reassure: { from: 1170, to: 1320 }, // 39 – 44 s
  cta: { from: 1320, to: 1500 }, // 44 – 50 s
};
export const STEP_STARTS = [570, 680, 790];
export const DURATION = 1500;

// Zones de sécurité TikTok / Instagram
export const SAFE_TOP = 160;
export const SAFE_BOTTOM = 280;
