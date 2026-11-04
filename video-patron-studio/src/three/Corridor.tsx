import { RoundedBox } from '@react-three/drei';
import { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { easeInOut, ramp, sp } from '../anim';
import { config } from '../config';
import { PALETTES, siteCardTexture } from '../textures';
import { cameraAt } from './CameraRig';

export const CARD_W = 1.6;
export const CARD_H = (CARD_W * 780) / 600;
const D = 12; // distance des cartes à la caméra

// Emplacements (en unités, à 12 unités de la caméra) : grille 2 × 2 sans chevauchement.
// Écart horizontal 0,2 et vertical 0,15 entre cartes (marge de sécurité, y compris pendant les rotations).
const COL = CARD_W / 2 + 0.1;
const ROW_TOP = 1.37;
const ROW_BOTTOM = ROW_TOP - CARD_H - 0.15;
const SLOTS_4: [number, number][] = [
  [-COL, ROW_TOP],
  [COL, ROW_TOP],
  [-COL, ROW_BOTTOM],
  [COL, ROW_BOTTOM],
];
const SLOTS_3: [number, number][] = [
  [-COL, ROW_TOP],
  [COL, ROW_TOP],
  [0, ROW_BOTTOM],
];

// Vagues de cartes : [première carte, nombre, image d'arrivée, image de départ]
const WAVES: [number, number, number, number][] = [
  [0, 4, 272, 372],
  [4, 3, 388, 468],
  [7, 3, 484, 556],
];
const FLIP = 14; // durée d'un retournement (images)

/** Scène 3 : cartes de sites (concepts fictifs) qui défilent par vagues, en travelling. */
export const Corridor: React.FC = () => {
  const frame = useCurrentFrame();
  const textures = useMemo(
    () => config.textes.cartes.map(([name, tag], i) => siteCardTexture(name, tag, PALETTES[i % PALETTES.length], i + 1)),
    [],
  );
  if (frame < 268 || frame > 575) return null;
  const cam = cameraAt(frame).pos;

  return (
    <group>
      {WAVES.map(([first, count, tIn, tOut], w) => {
        if (frame < tIn - 2 || frame > tOut + FLIP + 1) return null;
        const slots = count === 4 ? SLOTS_4 : SLOTS_3;
        return slots.map(([sx, sy], k) => {
          const i = first + k;
          if (i >= textures.length) return null;
          const delay = k * 3;
          // 1re vague : la carte grandit sur place ; vagues suivantes : elle se retourne pour entrer
          const inP = w === 0 ? sp(frame, tIn + delay, 15, 0.9, 110) : ramp(frame, tIn + delay, tIn + delay + FLIP, easeInOut);
          const outP = ramp(frame, tOut + delay, tOut + delay + FLIP, easeInOut);
          if (outP >= 1) return null;
          const ry = w === 0 ? 0 : (1 - inP) * -Math.PI / 2;
          const ryOut = outP * Math.PI / 2;
          const scale = w === 0 ? Math.max(0.001, inP) : 1;
          // léger rapprochement pendant la tenue (parallaxe avec les particules)
          const hold = ramp(frame, tIn, tOut + FLIP, (t) => t);
          const dist = D + 0.6 - hold * 1.2;
          const k3 = dist / D; // garde la même taille apparente → l'emplacement reste fixe à l'écran
          return (
            <group
              key={i}
              position={[cam[0] + sx * k3, cam[1] + sy * k3, cam[2] - dist]}
              rotation={[0, ry + ryOut, 0]}
              scale={scale * k3}
            >
              <RoundedBox args={[CARD_W + 0.05, CARD_H + 0.05, 0.06]} radius={0.05} smoothness={3} position={[0, 0, -0.04]}>
                <meshPhysicalMaterial color={PALETTES[i % PALETTES.length].bg} roughness={0.35} metalness={0.1} clearcoat={0.6} />
              </RoundedBox>
              <mesh>
                <planeGeometry args={[CARD_W, CARD_H]} />
                <meshBasicMaterial map={textures[i]} transparent toneMapped={false} />
              </mesh>
            </group>
          );
        });
      })}
    </group>
  );
};
