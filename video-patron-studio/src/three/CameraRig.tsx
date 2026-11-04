import { useThree } from '@react-three/fiber';
import { useLayoutEffect } from 'react';
import { useCurrentFrame } from 'remotion';
import * as THREE from 'three';
import { easeInOut, lerp } from '../anim';
import { H, W } from '../timeline';

type V3 = [number, number, number];
type Key = { f: number; pos: V3; tgt: V3; shift: number; ease?: (t: number) => number };

const smoothLinear = (t: number) => {
  // presque linéaire, avec départ et arrivée adoucis (travelling continu)
  const a = 0.18;
  if (t < a) return (t * t) / (2 * a * (1 - a));
  if (t > 1 - a) return 1 - ((1 - t) * (1 - t)) / (2 * a * (1 - a));
  return (t - a / 2) / (1 - a);
};

/** Le "plan de tournage" : positions de caméra clés. */
export const KEYS: Key[] = [
  { f: 0, pos: [0, 0, 13], tgt: [0, 0, 0], shift: 90 },
  { f: 104, pos: [0, 0, 10.8], tgt: [0, 0, 0], shift: 90 },
  { f: 150, pos: [0, 0.3, -11.5], tgt: [0, 0.3, -24], shift: 170 },
  { f: 258, pos: [0.9, 0.6, -12.6], tgt: [0, 0.3, -24], shift: 170 },
  { f: 300, pos: [0, 0, -27], tgt: [0, 0, -45], shift: 230 },
  { f: 552, pos: [0, 0, -101], tgt: [0, 0, -119], shift: 230, ease: smoothLinear },
  { f: 600, pos: [0.2, 0.5, -112.6], tgt: [0, 0.25, -125], shift: 230 },
  { f: 878, pos: [-0.7, 0.75, -113.2], tgt: [0, 0.25, -125], shift: 230 },
  { f: 914, pos: [-0.25, 0.85, -124.45], tgt: [-0.25, 0.85, -140], shift: 0 },
  { f: 958, pos: [0, 0, -138.5], tgt: [0, 0, -150], shift: 210 },
  { f: 1162, pos: [0.45, 0.25, -139.2], tgt: [0, 0, -150], shift: 210 },
  { f: 1192, pos: [0, -16, -140], tgt: [0, -16, -150], shift: 230 },
  { f: 1300, pos: [0.7, -15.8, -140.6], tgt: [0, -16, -150], shift: 230 },
  { f: 1346, pos: [0, -16, -162.5], tgt: [0, -16, -175], shift: 0 },
  { f: 1500, pos: [0, -16, -164.2], tgt: [0, -16, -175], shift: 0 },
];

export const cameraAt = (frame: number) => {
  let i = 0;
  while (i < KEYS.length - 2 && frame >= KEYS[i + 1].f) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const raw = Math.min(1, Math.max(0, (frame - a.f) / (b.f - a.f)));
  const t = (b.ease ?? easeInOut)(raw);
  const pos = a.pos.map((v, k) => lerp(v, b.pos[k], t)) as V3;
  const tgt = a.tgt.map((v, k) => lerp(v, b.tgt[k], t)) as V3;
  const shift = lerp(a.shift, b.shift, t);
  return { pos, tgt, shift };
};

export const CameraRig: React.FC = () => {
  const frame = useCurrentFrame();
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  useLayoutEffect(() => {
    const { pos, tgt, shift } = cameraAt(frame);
    // légère respiration et roulis pendant le couloir
    const roll = frame > 280 && frame < 570 ? Math.sin((frame - 280) / 60) * 0.06 : 0;
    camera.position.set(pos[0], pos[1], pos[2]);
    camera.up.set(Math.sin(roll), Math.cos(roll), 0);
    camera.lookAt(tgt[0], tgt[1], tgt[2]);
    camera.fov = 40;
    camera.near = 0.05;
    camera.far = 300;
    // décale le centre optique vers le haut pour libérer la zone des sous-titres
    camera.setViewOffset(W, H, 0, shift, W, H);
    camera.updateProjectionMatrix();
  }, [frame, camera]);
  return null;
};
