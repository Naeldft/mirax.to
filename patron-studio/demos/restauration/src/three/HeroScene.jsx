import { ContactShadows, Environment, Lightformer, PerformanceMonitor, Sparkles } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { pointer, usePointer } from '@demos/shared/hooks/usePointer.js';
import { Pizza3D } from './Pizza3D';

/** Lumière du four : légère fluctuation, comme des flammes. */
function FireLight({ reduced }) {
  const light = useRef();
  useFrame(({ clock }) => {
    if (!light.current || reduced) return;
    const t = clock.elapsedTime;
    light.current.intensity = 26 + Math.sin(t * 7.3) * 3 + Math.sin(t * 13.1) * 2 + Math.sin(t * 2.1) * 3;
  });
  return <pointLight ref={light} position={[-2.4, 0.9, -2.2]} color="#ff6a1f" intensity={26} distance={9} decay={1.6} />;
}

/**
 * Mouvement lié au défilement (section fixée) : à chaque étape la pizza fait un quart
 * de tour et se « retourne » (elle rétrécit un instant pendant que les garnitures changent).
 */
function ScrollRig({ progress, step, children, reduced }) {
  const group = useRef();
  const tilt = useRef({ x: 0, y: 0 });
  const { camera, viewport } = useThree();
  usePointer();
  useFrame(() => {
    if (!group.current) return;
    const s = reduced ? 0 : step.current;
    const frac = s - Math.floor(s);
    const pli = Math.sin(frac * Math.PI); // 0 sur une étape, 1 entre deux étapes
    const t = tilt.current;
    t.x += ((reduced ? 0 : pointer.x) - t.x) * 0.06;
    t.y += ((reduced ? 0 : pointer.y) - t.y) * 0.06;
    group.current.rotation.y = s * (Math.PI / 2);
    group.current.rotation.z = -t.x * 0.18 + pli * 0.25;
    group.current.rotation.x = t.y * 0.16 + pli * 0.5;
    group.current.scale.setScalar(1 - pli * 0.18);
    group.current.position.y = pli * 0.25;
    // cadrage : la pizza remplit la zone, sur téléphone comme sur ordinateur
    const recul = viewport.aspect < 1 ? 1.12 : 1;
    camera.position.set(0, 3.15 * recul - (reduced ? 0 : progress.current) * 0.3, 4.25 * recul);
    camera.lookAt(0, 0.05, 0);
  });
  return <group ref={group}>{children}</group>;
}

/**
 * Scène 3D de l'accueil.
 *  tier : 'low' | 'mid' | 'high' (voir useDeviceTier)
 *  active : false quand l'accueil est hors écran → rendu en pause
 */
export default function HeroScene({ pizza, tier, reduced, active, progress, step, onReady, onSlow }) {
  // téléphone : version allégée (résolution réduite, pas d'ombres, moins de particules)
  const petit = typeof window !== 'undefined' && window.innerWidth < 768;
  const [degraded, setDegraded] = useState(tier === 'low' || petit);
  const [dpr, setDpr] = useState(petit ? 1.25 : tier === 'high' ? 1.75 : tier === 'mid' ? 1.5 : 1);
  const quality = degraded ? 'low' : 'high';

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={dpr}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      shadows={!degraded}
      camera={{ position: [0, 3.15, 4.25], fov: 34, near: 0.1, far: 50 }}
      gl={{ antialias: !degraded, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0.05, 0);
        onReady?.();
      }}
      aria-hidden="true"
    >
      {/* baisse automatique de la qualité si l'appareil peine à suivre */}
      <PerformanceMonitor
        onDecline={() => {
          setDpr(1);
          setDegraded(true);
        }}
        flipflops={3}
        onFallback={() => onSlow?.()}
      />
      <hemisphereLight args={['#ffd9a8', '#2a120a', 0.7]} />
      <directionalLight
        position={[2.5, 6, 3.5]}
        intensity={2.4}
        color="#ffc488"
        castShadow={!degraded}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        shadow-bias={-0.0005}
      />
      <spotLight position={[0, 2.5, -4.5]} angle={0.7} penumbra={1} intensity={30} color="#ff9a52" distance={12} />
      <FireLight reduced={reduced} />
      {!degraded && (
        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={2} color="#ffd2a0" position={[0, 4, 2]} scale={[6, 2, 1]} />
          <Lightformer form="ring" intensity={3} color="#ff7a2e" position={[-4, 1, -3]} scale={2} />
        </Environment>
      )}
      <ScrollRig progress={progress} step={step} reduced={reduced}>
        <Pizza3D pizza={pizza} quality={quality} reduced={reduced} spin={reduced ? 0 : 0.22} board={false} />
        {!degraded && <ContactShadows position={[0, -0.11, 0]} opacity={0.55} scale={6} blur={2.4} far={2} frames={1} color="#000000" />}
      </ScrollRig>
      {!reduced && (
        <Sparkles
          count={degraded ? 14 : 36}
          scale={[5, 3, 3]}
          position={[0, 1.4, -0.5]}
          size={degraded ? 2.5 : 3}
          speed={0.35}
          color="#ffae5a"
          opacity={0.8}
        />
      )}
    </Canvas>
  );
}
