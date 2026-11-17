import { ContactShadows, Environment, useGLTF, useTexture } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, N8AO, Noise, ToneMapping, Vignette } from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { brosse } from '@demos/shared/three/materiaux.js';
import Burger from './burger/Burger.jsx';
import BurgerPhoto from './burger/BurgerPhoto.jsx';
import { bornes } from './burger/bornes.js';
import { recettes } from './burger/recettes.js';

const BASE = import.meta.env.BASE_URL;
const PLANCHE = 0.75;
const Q = new URLSearchParams(location.search);
const FIGE = Q.has('fige'); // capture : image fixe, rendue à la demande
const TM = { agx: ToneMappingMode.AGX, aces: ToneMappingMode.ACES_FILMIC, neutre: ToneMappingMode.NEUTRAL }[Q.get('tm') ?? 'aces'];
const PHOTO = Q.get('photo');
const ANGLE = Number(Q.get('angle') ?? (PHOTO ? 0 : 0.5));
const ASSEMBLAGE = { current: Number(Q.get('a') ?? 1) };

function Declencheur() {
  const { invalidate } = useThree();
  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      invalidate();
      if (++n === 4) {
        clearInterval(id);
        setTimeout(() => (document.title = 'pret'), 400);
      }
    }, 500);
    return () => clearInterval(id);
  }, [invalidate]);
  return null;
} // planche Poly Haven (45 cm) ramenée à 34 cm

function Planche() {
  const { scene } = useGLTF(`${BASE}scene3d/planche.glb`);
  const s = useMemo(() => {
    const c = scene.clone();
    c.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = o.receiveShadow = true;
        o.material.envMapIntensity = 0.3;
        o.material.color.set(PHOTO ? '#5e4636' : '#b49a82');
      }
    });
    return c;
  }, [scene]);
  return <primitive object={s} scale={PLANCHE} />;
}

function Comptoir() {
  const mat = useMemo(() => {
    const b = brosse();
    const n = b.normal.clone();
    const r = b.rugosite.clone();
    [n, r].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(3, 3);
      t.needsUpdate = true;
    });
    return new THREE.MeshStandardMaterial({ color: '#1b1511', metalness: 0.2, roughness: 0.8, normalMap: n, normalScale: new THREE.Vector2(0.1, 0.1), envMapIntensity: 0.06 });
  }, []);
  return (
    <mesh rotation-x={-Math.PI / 2} position-z={-0.55} material={mat} receiveShadow>
      <planeGeometry args={[3.6, 1.7]} />
    </mesh>
  );
}

/** Le dernier plan de la vidéo (la plancha), posé loin derrière : le flou de profondeur le fond dans la scène. */
function Fond() {
  const tex = useTexture(`${BASE}scene3d/fond-plancha.webp`);
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh position={[0, 0.95, -1.4]}>
      <planeGeometry args={[3.6, 2.025]} />
      <meshBasicMaterial map={tex} toneMapped={false} color="#d8d0c8" />
    </mesh>
  );
}

function Plateau() {
  const g = useRef();
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = ANGLE + (FIGE ? 0 : PHOTO ? Math.sin(clock.elapsedTime * 0.5) * 0.35 : clock.elapsedTime * 0.25);
  });
  return (
    <group position-y={0.0413 * PLANCHE}>
      <group ref={g}>
        {PHOTO ? <BurgerPhoto id={PHOTO} bornes={bornes[PHOTO]} assemblage={ASSEMBLAGE} /> : <Burger recette={recettes.classic} vapeur={!FIGE} />}
      </group>
    </group>
  );
}

export default function ApercuBurger() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0d0805' }}>
      <Canvas
        shadows="soft"
        frameloop={FIGE ? 'demand' : 'always'}
        dpr={[1, 2]}
        camera={{ position: PHOTO ? [0, 0.085, 0.34] : [0, 0.125, 0.4], fov: 28, near: 0.01, far: 20 }}
        gl={{ alpha: false, antialias: !!PHOTO, toneMapping: PHOTO ? THREE.ACESFilmicToneMapping : THREE.NoToneMapping }}
        onCreated={({ camera }) => camera.lookAt(0, PHOTO ? 0.072 : 0.07, 0)}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <Environment files={`${BASE}scene3d/resto.hdr`} environmentIntensity={0.22} />
          <spotLight position={[-0.3, 0.75, 0.3]} angle={0.3} penumbra={1} intensity={4.5} color="#ffd6a0" castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0002} shadow-normalBias={0.002} shadow-radius={6} />
          <pointLight position={[0.3, 0.22, -0.35]} intensity={1.4} color="#ff8a3a" />
          <spotLight position={[0.15, 0.3, -0.45]} angle={0.4} penumbra={1} intensity={3} color="#ffb070" />
          <pointLight position={[0.05, 0.05, 0.4]} intensity={0.25} color="#ffe2c0" />
          <Fond />
          <pointLight position={[-0.28, 0.12, -0.3]} intensity={0.9} color="#ffb070" />
          <group position={[0, 0, 0]}>
            <group position-y={0}>
              <Planche />
            </group>
            <Plateau />
          </group>
          <group position-y={-0.0005}>
            <Comptoir />
          </group>
          <ContactShadows position={[0, 0.0002, 0]} scale={0.6} blur={2.2} opacity={0.5} far={0.1} resolution={512} />
          {FIGE && <Declencheur />}
          {!PHOTO && <EffectComposer multisampling={4}>
            <N8AO aoRadius={0.012} distanceFalloff={0.6} intensity={2.4} quality="high" color="#120804" />
            <ToneMapping mode={TM} />
            <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.14} />
            <Vignette offset={0.25} darkness={0.7} />
          </EffectComposer>}
        </Suspense>
      </Canvas>
      {PHOTO && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 45%, transparent 45%, rgb(0 0 0 / 0.55))' }} />}
    </div>
  );
}
