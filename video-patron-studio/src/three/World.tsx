import { useThree } from '@react-three/fiber';
import { useLayoutEffect, useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ramp, rand, sp } from '../anim';
import { config } from '../config';
import { dotTexture } from '../textures';
import { CameraRig } from './CameraRig';
import { Corridor } from './Corridor';
import { Devices } from './Devices';
import { Hook } from './Hook';
import { Monogram } from './Monogram';
import { Prices } from './Prices';
import { Reassure } from './Reassure';
import { Title3D } from './Title3D';

const G = config.marque.vert;

/** Environnement de reflets doux (procédural, sans fichier externe). */
const Env: React.FC = () => {
  const { gl, scene } = useThree();
  useLayoutEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.55;
    scene.background = new THREE.Color(config.marque.fond);
    scene.fog = new THREE.Fog(config.marque.fond, 15, 46);
    return () => {
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
};

/** Particules discrètes réparties le long du trajet de la caméra. */
const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const { geo, tex } = useMemo(() => {
    const n = 1400;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (rand(i * 3 + 1) - 0.5) * 22;
      pos[i * 3 + 1] = (rand(i * 3 + 2) - 0.5) * 34 - 6;
      pos[i * 3 + 2] = 12 - rand(i * 3 + 3) * 200;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { geo: g, tex: dotTexture() };
  }, []);
  return (
    <points geometry={geo} position={[0, Math.sin(frame / 90) * 0.15, 0]} rotation={[0, 0, frame * 0.0004]}>
      <pointsMaterial map={tex} size={0.06} sizeAttenuation transparent opacity={0.55} depthWrite={false} color="#cfe9da" />
    </points>
  );
};

/** Grille subtile au sol (scènes 1 à 4). */
const Floor: React.FC = () => {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(220, 110, G, '#ffffff');
    const m = g.material as THREE.LineBasicMaterial;
    m.transparent = true;
    m.opacity = 0.09;
    m.depthWrite = false;
    return g;
  }, []);
  return <primitive object={grid} position={[0, -5.5, -60]} />;
};

/** Monogramme final (scène 7). */
const FinalMark: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < 1290) return null;
  const s = sp(frame, 1300, 14, 1, 70);
  const glow = ramp(frame, 1330, 1370);
  const idle = Math.sin((frame - 1300) / 40) * 0.12;
  return (
    <group position={[0, -13.5, -175 - (1 - s) * 30]} rotation={[0, (1 - s) * Math.PI * 2 + idle, 0]} scale={0.85}>
      <Monogram glow={glow} />
      <pointLight position={[-3 + glow * 6, 1, 3]} intensity={14} distance={8} />
    </group>
  );
};

export const World: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <Env />
      <CameraRig />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 6]} intensity={2.2} />
      <directionalLight position={[-5, -2, 2]} intensity={0.6} color={G} />
      <Particles />
      {frame < 930 && <Floor />}
      {frame < 160 && <Hook />}
      {frame >= 110 && frame < 305 && <Title3D z={-24} />}
      <Corridor />
      <Devices />
      <Prices />
      <Reassure />
      <FinalMark />
    </>
  );
};
