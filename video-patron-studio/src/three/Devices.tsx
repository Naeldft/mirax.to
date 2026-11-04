import { RoundedBox } from '@react-three/drei';
import { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import * as THREE from 'three';
import { easeInOut, ramp, sp } from '../anim';
import { STEP_STARTS } from '../timeline';
import { laptopScreenTexture, phoneScreenTexture } from '../textures';

const LID_W = 3.4;
const LID_H = 2.2;
const SCREEN_W = 3.22;
const SCREEN_H = (SCREEN_W * 800) / 1280;

// Téléphone placé SOUS l'ordinateur, sans contact possible :
// le bas de l'ordinateur est à y = -0,40 ; le haut du téléphone (demi-hauteur 0,98) reste
// à y ≤ -0,85, quelle que soit sa rotation autour de l'axe vertical → marge ≥ 0,45 unité.
const PHONE_HALF_H = (2.06 * 0.95) / 2;
const SAFETY = 0.45;
const PHONE_Y = -0.4 - SAFETY - PHONE_HALF_H;
const PHONE_X = 0.6;
const PHONE_Z = 1.1;

/** Téléphone 3D réutilisable. */
export const Phone: React.FC<{ tex: THREE.Texture; screenDim?: number }> = ({ tex, screenDim = 1 }) => (
  <group>
    <RoundedBox args={[1.0, 2.06, 0.1]} radius={0.045} smoothness={4}>
      <meshPhysicalMaterial color="#1a1a1a" metalness={0.75} roughness={0.25} clearcoat={1} />
    </RoundedBox>
    <mesh position={[0, 0, 0.0505]}>
      <planeGeometry args={[0.93, 0.93 * (1240 / 600)]} />
      <meshBasicMaterial map={tex} toneMapped={false} color={new THREE.Color(screenDim, screenDim, screenDim)} />
    </mesh>
  </group>
);

/** Scène 4 : ordinateur et téléphone qui tournent et montrent les 3 étapes. */
export const Devices: React.FC = () => {
  const frame = useCurrentFrame();
  const laptopTex = useMemo(() => [0, 1, 2].map((s) => laptopScreenTexture(s as 0 | 1 | 2)), []);
  const phoneTex = useMemo(() => [0, 1, 2].map((s) => phoneScreenTexture(s as 0 | 1 | 2)), []);
  if (frame < 556 || frame > 916) return null;

  const step = frame < STEP_STARTS[1] ? 0 : frame < STEP_STARTS[2] ? 1 : 2;
  const stepStart = STEP_STARTS[step];

  // Entrée : rotation dans l'espace avec ressort
  const enter = sp(frame, 558, 15, 1, 70);
  const lidOpen = sp(frame, 572, 14, 1, 80);
  // Sortie : on se met bien face à l'écran pour "plonger" dedans
  const toFront = ramp(frame, 872, 906, easeInOut);
  const idle = Math.sin((frame - 560) / 55) * 0.22;
  const yaw = ((1 - enter) * -1.6 + idle) * (1 - toFront);
  const lidAngle = THREE.MathUtils.lerp(Math.PI / 2 - 0.02, 0.22, lidOpen) * (1 - toFront);
  // l'écran s'assombrit juste avant de le traverser
  const dim = 1 - ramp(frame, 896, 912) * 0.97;

  // Changement d'étape : balayage de l'écran (révélation de haut en bas)
  const wipe = step === 0 ? 1 : ramp(frame, stepStart, stepStart + 14, easeInOut);
  const prev = laptopTex[Math.max(0, step - 1)];
  const cur = laptopTex[step];
  cur.repeat.set(1, wipe);
  cur.offset.set(0, 1 - wipe);
  if (step > 0) {
    prev.repeat.set(1, 1);
    prev.offset.set(0, 0);
  }

  // Téléphone : petit tour sur lui-même à chaque étape, nouveau contenu à mi-rotation
  const spin = step === 0 ? 1 : sp(frame, stepStart, 16, 0.8, 90);
  const phoneShown = spin < 0.5 && step > 0 ? phoneTex[step - 1] : phoneTex[step];
  // sortie par la droite, avant la plongée (jamais vers le texte du bas)
  const phoneOut = ramp(frame, 850, 874, easeInOut);
  const phoneEnter = sp(frame, 584, 20, 0.9, 80); // amorti : pas de rebond vers l'ordinateur

  return (
    <group position={[-0.25, 0.05, -125]} rotation={[0, yaw, 0]} scale={0.85 + enter * 0.15}>
      {/* base de l'ordinateur */}
      <group position={[0, -0.3, 0]}>
        <RoundedBox args={[LID_W, 0.1, 2.2]} radius={0.04} smoothness={3} position={[0, -0.05, 1.1]}>
          <meshPhysicalMaterial color="#2b2b2e" metalness={0.8} roughness={0.32} clearcoat={0.6} />
        </RoundedBox>
        <mesh position={[0, 0.002, 1.25]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[LID_W * 0.82, 1.15]} />
          <meshStandardMaterial color="#141416" roughness={0.8} />
        </mesh>
        {/* écran (charnière à l'arrière) */}
        <group rotation={[-lidAngle, 0, 0]}>
          <RoundedBox args={[LID_W, LID_H, 0.07]} radius={0.04} smoothness={3} position={[0, LID_H / 2, -0.036]}>
            <meshPhysicalMaterial color="#2b2b2e" metalness={0.8} roughness={0.32} clearcoat={0.6} />
          </RoundedBox>
          <mesh position={[0, LID_H / 2, 0.0]}>
            <planeGeometry args={[LID_W - 0.06, LID_H - 0.06]} />
            <meshBasicMaterial color="#000" />
          </mesh>
          {step > 0 && (
            <mesh position={[0, LID_H / 2 + 0.03, 0.001]}>
              <planeGeometry args={[SCREEN_W, SCREEN_H]} />
              <meshBasicMaterial map={prev} toneMapped={false} color={new THREE.Color(dim, dim, dim)} />
            </mesh>
          )}
          <mesh position={[0, LID_H / 2 + 0.03 + (SCREEN_H * (1 - wipe)) / 2, 0.002]} scale={[1, Math.max(0.001, wipe), 1]}>
            <planeGeometry args={[SCREEN_W, SCREEN_H]} />
            <meshBasicMaterial map={cur} toneMapped={false} color={new THREE.Color(dim, dim, dim)} />
          </mesh>
        </group>
      </group>
      {/* téléphone */}
      <group
        position={[PHONE_X + (1 - Math.min(1, phoneEnter)) * 3.5 + phoneOut * 4, PHONE_Y, PHONE_Z]}
        rotation={[0.05, -0.38 + spin * Math.PI * 2 * (step > 0 ? 1 : 0) + idle * 0.6, 0.04]}
        scale={0.95}
      >
        <Phone tex={phoneShown} screenDim={dim} />
      </group>
    </group>
  );
};
