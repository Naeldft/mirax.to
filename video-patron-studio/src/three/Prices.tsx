import { RoundedBox } from '@react-three/drei';
import { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { easeInOut, ramp, sp } from '../anim';
import { config } from '../config';
import { PRICE_TEX_H, PRICE_TEX_W, priceFaceTexture } from '../textures';

const G = config.marque.vert;
export const BLOCK_W = 4.4;
export const BLOCK_H = (BLOCK_W * PRICE_TEX_H) / PRICE_TEX_W;
const DEPTH = 0.7;
const GAP = 0.14;
const CENTER_Y = 0.28;

/** Scène 5 : trois blocs de prix 3D (cubes qui roulent pour entrer et sortir). */
export const Prices: React.FC = () => {
  const frame = useCurrentFrame();
  const faces = useMemo(
    () => config.textes.prix.map((p, i) => priceFaceTexture(p.montant, p.periode, p.lignes, i > 0)),
    [],
  );
  if (frame < 905 || frame > 1200) return null;
  return (
    <group position={[0, 0, -150]}>
      {faces.map((tex, i) => {
        const y = CENTER_Y + (1 - i) * (BLOCK_H + GAP);
        const inS = sp(frame, 918 + i * 12, 13, 0.9, 85);
        const out = ramp(frame, 1146 + i * 5, 1180 + i * 5, easeInOut);
        const idle = Math.sin((frame + i * 25) / 38) * 0.035;
        // rotation de cube : entrée par le bas (−90°), sortie vers le haut (+90°)
        const rx = (1 - inS) * -Math.PI / 2 + out * Math.PI / 2 + idle;
        return (
          <group key={i} position={[(1 - inS) * (i % 2 ? 1.2 : -1.2), y + out * 9, (1 - inS) * -3]} rotation={[rx, idle * 2, 0]}>
            <RoundedBox args={[BLOCK_W, BLOCK_H, DEPTH]} radius={0.08} smoothness={4} position={[0, 0, -DEPTH / 2]}>
              <meshPhysicalMaterial color={i > 0 ? '#0d2a1b' : '#161616'} metalness={0.35} roughness={0.3} clearcoat={1} emissive={i > 0 ? G : '#000'} emissiveIntensity={i > 0 ? 0.05 : 0} />
            </RoundedBox>
            <mesh position={[0, 0, 0.002]}>
              <planeGeometry args={[BLOCK_W - 0.02, BLOCK_H - 0.02]} />
              <meshBasicMaterial map={tex} toneMapped={false} transparent />
            </mesh>
            {/* face inférieure verte révélée pendant la rotation de sortie */}
            <mesh position={[0, -BLOCK_H / 2 - 0.002, -DEPTH / 2]} rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[BLOCK_W - 0.1, DEPTH - 0.1]} />
              <meshBasicMaterial color={G} toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
