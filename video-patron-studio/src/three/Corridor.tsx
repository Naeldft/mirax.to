import { RoundedBox } from '@react-three/drei';
import { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { clamp01, easeInOut, ramp } from '../anim';
import { cameraAt } from './CameraRig';
import { config } from '../config';
import { PALETTES, siteCardTexture } from '../textures';

export const CARD_W = 1.7;
export const CARD_H = (CARD_W * 780) / 600;

/** Scène 3 : couloir de cartes de sites (concepts fictifs) en profondeur. */
export const Corridor: React.FC = () => {
  const frame = useCurrentFrame();
  const cards = useMemo(
    () =>
      config.textes.cartes.map(([name, tag], i) => {
        const p = PALETTES[i % PALETTES.length];
        // ellipse autour de l'axe de caméra (format vertical : plus de place en hauteur)
        const angle = [2.5, -0.5, 3.6, 0.4, 2.2, -0.9, 3.9, 0.9][i % 8];
        const x = Math.cos(angle) * 1.25;
        const y = Math.sin(angle) * 1.55 + 0.75;
        const z = -40 - i * 8.6;
        return { tex: siteCardTexture(name, tag, p, i + 1), x, y, z, bg: p.bg, i };
      }),
    [],
  );
  if (frame < 250 || frame > 640) return null;
  const camZ = cameraAt(frame).pos[2];
  return (
    <group>
      {cards.map((c) => {
        const appear = ramp(frame, 262 + c.i * 14, 300 + c.i * 14);
        const sway = Math.sin((frame + c.i * 20) / 40) * 0.08;
        // à l'approche de la caméra, la carte s'écarte (effet de passage)
        const dist = camZ - c.z;
        const push = easeInOut(clamp01((9 - dist) / 6));
        const sx = Math.sign(c.x) || 1;
        const sy = Math.sign(c.y - 0.75) || 1;
        return (
          <group
            key={c.i}
            position={[c.x + sx * push * 2.6, c.y + sy * push * 1.6, c.z]}
            rotation={[-c.y * 0.07 + sway * 0.4 + sy * push * 0.5, -c.x * 0.16 + sway - sx * push * 0.9, sway * 0.3]}
            scale={0.6 + appear * 0.4}
          >
            <RoundedBox args={[CARD_W + 0.06, CARD_H + 0.06, 0.08]} radius={0.06} smoothness={3} position={[0, 0, -0.05]}>
              <meshPhysicalMaterial color={c.bg} roughness={0.35} metalness={0.1} clearcoat={0.6} />
            </RoundedBox>
            <mesh>
              <planeGeometry args={[CARD_W, CARD_H]} />
              <meshBasicMaterial map={c.tex} transparent toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
