import { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import * as THREE from 'three';
import { easeInOut, ramp, sp } from '../anim';
import { config } from '../config';
import { haloTexture, phoneScreenTexture } from '../textures';
import { Phone } from './Devices';

const G = config.marque.vert;

const checkShape = () => {
  const s = new THREE.Shape();
  // coche épaisse
  s.moveTo(-0.42, 0.02);
  s.lineTo(-0.27, 0.17);
  s.lineTo(-0.1, 0.0);
  s.lineTo(0.3, 0.4);
  s.lineTo(0.45, 0.25);
  s.lineTo(-0.1, -0.3);
  s.lineTo(-0.42, 0.02);
  return s;
};

/** Scène 6 : téléphone avec maquette + coche "validé". */
export const Reassure: React.FC = () => {
  const frame = useCurrentFrame();
  const tex = useMemo(() => phoneScreenTexture(3), []);
  const halo = useMemo(() => haloTexture(G), []);
  const check = useMemo(
    () => new THREE.ExtrudeGeometry(checkShape(), { depth: 0.12, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 }),
    [],
  );
  if (frame < 1135 || frame > 1345) return null;

  const enter = sp(frame, 1160, 14, 1, 70);
  const pop = sp(frame, 1200, 9, 0.7, 140);
  const out = ramp(frame, 1298, 1340, easeInOut);
  const idle = Math.sin((frame - 1170) / 45) * 0.18;

  return (
    <group position={[0, -15.73, -150]}>
      <group
        position={[-out * 6, (1 - enter) * 4, out * -2]}
        rotation={[0.04, (1 - enter) * 2.2 + idle - out * 3.5, (1 - enter) * 0.3]}
        scale={1.65}
      >
        <Phone tex={tex} />
      </group>
      {/* badge coche */}
      <group position={[1.15 - out * 7, 1.15, 0.6]} scale={Math.max(0.001, pop) * 0.85} rotation={[0, (1 - pop) * 2 - idle, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.18, 48]} />
          <meshPhysicalMaterial color={G} emissive={G} emissiveIntensity={0.35} metalness={0.2} roughness={0.25} clearcoat={1} />
        </mesh>
        <mesh geometry={check} position={[0, 0.02, 0.06]}>
          <meshPhysicalMaterial color="#ffffff" roughness={0.2} clearcoat={1} />
        </mesh>
        <mesh position={[0, 0, -0.3]} scale={3}>
          <planeGeometry />
          <meshBasicMaterial map={halo} transparent opacity={0.45} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
};
