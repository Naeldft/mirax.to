import { PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { StrictMode, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import { defilement } from './defilement.js';

/* ------------------------------------------------------------------
   « L'espace » Patrôn Studio : un couloir sombre et infini, sol brillant,
   brume, faisceaux de lumière et poussière en suspension.
   La caméra avance avec le défilement de la page (defilement.progres, 0 → 1).
   Les phases suivantes y ajoutent le tunnel d'intro et les portails.
------------------------------------------------------------------- */

const LONGUEUR = 120; // profondeur de l'espace parcourue du haut au bas de la page
const VERT = new THREE.Color('#dfdfdf');

/** Sol sombre et brillant : reflets doux de la lumière (texture de rugosité légère). */
function Sol({ qualite }) {
  const mat = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d');
    g.fillStyle = '#0e0e0e';
    g.fillRect(0, 0, 256, 256);
    // lignes de dalles très discrètes
    g.strokeStyle = 'rgba(223,223,223,0.06)';
    g.lineWidth = 2;
    g.strokeRect(1, 1, 254, 254);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, LONGUEUR / 4);
    t.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({ map: t, color: '#ffffff', metalness: 0.85, roughness: qualite === 'haute' ? 0.32 : 0.5 });
  }, [qualite]);
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -1.6, -LONGUEUR / 2 + 10]} material={mat}>
      <planeGeometry args={[24, LONGUEUR + 40]} />
    </mesh>
  );
}

/** Faisceaux de lumière verticaux (plans additifs) qui jalonnent le couloir. */
function Faisceaux() {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 256;
    const g = c.getContext('2d');
    const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, 'rgba(255,255,255,0.0)');
    grad.addColorStop(0.15, 'rgba(255,255,255,0.55)');
    grad.addColorStop(1, 'rgba(255,255,255,0.0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 256);
    const h = g.createLinearGradient(0, 0, 64, 0);
    h.addColorStop(0, 'rgba(0,0,0,1)');
    h.addColorStop(0.5, 'rgba(0,0,0,0)');
    h.addColorStop(1, 'rgba(0,0,0,1)');
    g.globalCompositeOperation = 'destination-out';
    g.fillStyle = h;
    g.fillRect(0, 0, 64, 256);
    return new THREE.CanvasTexture(c);
  }, []);
  const pos = useMemo(() => Array.from({ length: 14 }, (_, i) => [(i % 2 ? 1 : -1) * (3.2 + (i % 3) * 0.9), -LONGUEUR * (i / 14) - 4]), []);
  return (
    <group>
      {pos.map(([x, z], i) => (
        <mesh key={i} position={[x, 2.4, z]} rotation={[0, 0, (i % 2 ? -1 : 1) * 0.12]}>
          <planeGeometry args={[1.6, 9]} />
          <meshBasicMaterial
            map={tex}
            color={i % 4 === 0 ? VERT : '#dfe8ff'}
            transparent
            opacity={0.16}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Poussière lumineuse en suspension. */
function Poussiere({ n, reduit }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) a.set([(Math.random() - 0.5) * 18, Math.random() * 7 - 1.4, -Math.random() * (LONGUEUR + 20) + 10], i * 3);
    g.setAttribute('position', new THREE.BufferAttribute(a, 3));
    return g;
  }, [n]);
  useFrame((_, dt) => {
    if (reduit || !ref.current) return;
    ref.current.rotation.z += dt * 0.004;
    ref.current.position.y = Math.sin(performance.now() / 4000) * 0.15;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#ffffff" size={0.035} transparent opacity={0.55} depthWrite={false} sizeAttenuation />
    </points>
  );
}

/** Caméra : avance dans le couloir avec le défilement, suit légèrement la souris ou l'inclinaison. */
function Camera({ reduit }) {
  const { camera } = useThree();
  const cible = useRef({ x: 0, y: 0 });
  const lisse = useRef(0);
  useEffect(() => {
    if (reduit) return;
    const bouge = (e) => {
      cible.current.x = e.clientX / innerWidth - 0.5;
      cible.current.y = e.clientY / innerHeight - 0.5;
    };
    addEventListener('pointermove', bouge, { passive: true });
    return () => removeEventListener('pointermove', bouge);
  }, [reduit]);
  useFrame(() => {
    lisse.current += (defilement.progres - lisse.current) * (reduit ? 1 : 0.08);
    const z = 6 - lisse.current * LONGUEUR;
    camera.position.set(cible.current.x * 0.6, 0.2 - cible.current.y * 0.3, z);
    camera.lookAt(cible.current.x * 0.3, 0.1, z - 10);
  });
  return null;
}

function Scene({ tier, reduit, actif }) {
  const [qualite, setQualite] = useState(tier === 'high' ? 'haute' : 'normale');
  const petit = innerWidth < 768;
  return (
    <Canvas
      dpr={petit ? [1, 1.25] : qualite === 'haute' ? [1, 1.75] : [1, 1.4]}
      frameloop={!actif ? 'never' : reduit ? 'demand' : 'always'}
      camera={{ position: [0, 0.2, 6], fov: 55, near: 0.1, far: 80 }}
      gl={{ antialias: !petit, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor('#090909');
        scene.fog = new THREE.FogExp2('#090909', 0.055);
      }}
    >
      <PerformanceMonitor onDecline={() => setQualite('normale')} />
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 4, 0]} intensity={30} distance={30} color="#dfe8ff" />
      <pointLight position={[-4, 1, -20]} intensity={40} distance={30} color={VERT} />
      <pointLight position={[4, 2, -50]} intensity={40} distance={30} color="#9fb3ff" />
      <Sol qualite={qualite} />
      <Faisceaux />
      <Poussiere n={petit ? 220 : 520} reduit={reduit} />
      <Camera reduit={reduit} />
    </Canvas>
  );
}

function Racine({ tier, reduit }) {
  const [actif, setActif] = useState(true);
  useEffect(() => {
    const vis = () => setActif(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', vis);
    return () => document.removeEventListener('visibilitychange', vis);
  }, []);
  return <Scene tier={tier} reduit={reduit} actif={actif} />;
}

export function monter(hote, options) {
  createRoot(hote).render(
    <StrictMode>
      <Racine {...options} />
    </StrictMode>,
  );
  requestAnimationFrame(() => hote.classList.add('pret'));
}
