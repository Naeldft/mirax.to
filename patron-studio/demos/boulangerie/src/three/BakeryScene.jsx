import { ContactShadows, PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { pointer, usePointer } from '@demos/shared/hooks/usePointer.js';

/* ------------------------------------------------------------------
   Le fournil en 3D : un pain de campagne entaillé et un croissant,
   construits en code. Au défilement, la pâte lève et dore (couleur
   et volume), la vapeur monte ; la farine tombe en permanence.
------------------------------------------------------------------- */

const clamp01 = (t) => Math.min(1, Math.max(0, t));
const smooth = (t) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};
const rnd = (i) => {
  const x = Math.sin(i * 71.3 + 9.1) * 43758.5453;
  return x - Math.floor(x);
};

const PATE = new THREE.Color('#f1e2c6');
const DORE = new THREE.Color('#c98a3e');
const CROUTE = new THREE.Color('#7a4a24');
const GRIGNE = new THREE.Color('#e9c58a');

/** Pain de campagne : ellipsoïde déformé, dessous aplati, trois grignes. */
function useLoaf(quality) {
  return useMemo(() => {
    const d = quality === 'low' ? 32 : 64;
    let g = new THREE.SphereGeometry(1, d, Math.round(d * 0.6));
    g.deleteAttribute('normal');
    g = mergeVertices(g);
    const p = g.attributes.position;
    const cutAmount = new Float32Array(p.count);
    const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      // dessous aplati, irrégularités
      if (v.y < -0.2) v.y = -0.2 - (v.y + 0.2) * 0.25;
      v.multiplyScalar(1 + 0.03 * Math.sin(v.x * 6 + v.z * 4));
      // grignes : lignes diagonales sur le dessus
      let cut = 0;
      if (v.y > 0.35) {
        for (const off of [-0.55, 0, 0.55]) {
          const dist = Math.abs(v.x * 0.8 - v.z * 0.6 - off);
          cut = Math.max(cut, Math.max(0, 1 - dist / 0.09));
        }
      }
      v.y -= cut * 0.07;
      cutAmount[i] = cut;
      p.setXYZ(i, v.x * 1.55, v.y * 0.72, v.z * 0.92);
    }
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(p.count * 3), 3));
    g.computeVertexNormals();
    return { g, cutAmount };
  }, [quality]);
}

/** Croissant : chapelet d'ellipsoïdes le long d'un arc, de plus en plus fins. */
function Croissant({ mat }) {
  const parts = useMemo(() => {
    const out = [];
    const n = 7;
    for (let i = 0; i < n; i++) {
      const u = i / (n - 1);
      const a = -1.1 + u * 2.2;
      const r = 0.38 * (1 - Math.abs(u - 0.5) * 1.35) + 0.07;
      out.push({
        pos: [Math.sin(a) * 0.95, r * 0.55, Math.cos(a) * 0.95 - 0.7],
        rot: [0, a, 0.25 * (u - 0.5)],
        s: [r * 1.15, r * 0.85, r * 0.9],
      });
    }
    return out;
  }, []);
  return (
    <group>
      {parts.map((p, i) => (
        <mesh key={i} material={mat} position={p.pos} rotation={p.rot} scale={p.s} castShadow>
          <sphereGeometry args={[1, 24, 16]} />
        </mesh>
      ))}
    </group>
  );
}

/** Épi de blé décoratif. */
function Epi({ position, rotation }) {
  const grains = useMemo(() => Array.from({ length: 14 }, (_, i) => [(i % 2 ? 1 : -1) * 0.05, 0.9 + i * 0.07, i % 2 ? 0.4 : -0.4]), []);
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.012, 0.016, 1.2, 6]} />
        <meshStandardMaterial color="#c9a25a" roughness={0.8} />
      </mesh>
      {grains.map(([x, y, r], i) => (
        <mesh key={i} position={[x, y, 0]} rotation={[0, 0, r]} scale={[0.045, 0.09, 0.045]}>
          <sphereGeometry args={[1, 10, 8]} />
          <meshStandardMaterial color="#d9a441" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/** Farine qui tombe et vapeur qui monte (particules). */
function Particles({ progress, reduced }) {
  const flour = useRef();
  const steam = useRef();
  const n = 220;
  const m = 26;
  const flourGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) a.set([(rnd(i) - 0.5) * 8, rnd(i + 1) * 6, (rnd(i + 2) - 0.5) * 4], i * 3);
    g.setAttribute('position', new THREE.BufferAttribute(a, 3));
    return g;
  }, []);
  const steamTex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const x = c.getContext('2d');
    const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,0.8)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = gr;
    x.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);
  const steamGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(m * 3), 3));
    return g;
  }, []);
  useFrame(({ clock }, dt) => {
    if (reduced) return;
    const t = clock.elapsedTime;
    const a = flourGeo.attributes.position.array;
    for (let i = 0; i < n; i++) {
      a[i * 3 + 1] -= dt * (0.15 + rnd(i + 3) * 0.2);
      a[i * 3] += Math.sin(t + i) * dt * 0.05;
      if (a[i * 3 + 1] < -0.5) a[i * 3 + 1] = 5.5;
    }
    flourGeo.attributes.position.needsUpdate = true;
    const s = steamGeo.attributes.position.array;
    for (let i = 0; i < m; i++) {
      const life = (t * 0.25 + rnd(i)) % 1;
      s.set([(rnd(i + 5) - 0.5) * 1.6 + Math.sin(t + i) * 0.15 * life, 0.6 + life * 2.4, (rnd(i + 6) - 0.5) * 0.8], i * 3);
    }
    steamGeo.attributes.position.needsUpdate = true;
    if (steam.current) steam.current.material.opacity = smooth((progress.current - 0.55) / 0.3) * 0.55;
  });
  return (
    <>
      <points ref={flour} geometry={flourGeo}>
        <pointsMaterial color="#ffffff" size={0.035} transparent opacity={0.8} depthWrite={false} />
      </points>
      <points ref={steam} geometry={steamGeo}>
        <pointsMaterial map={steamTex} size={0.9} transparent opacity={0} depthWrite={false} />
      </points>
    </>
  );
}

function Rig({ progress, reduced, quality }) {
  const loafRef = useRef();
  const group = useRef();
  const tilt = useRef({ x: 0, y: 0 });
  const { g, cutAmount } = useLoaf(quality);
  const loafMat = useMemo(() => new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.75 }), []);
  const croissantMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d9a04e', roughness: 0.5 }), []);
  const tmp = useMemo(() => new THREE.Color(), []);
  const { viewport, camera } = useThree();
  usePointer();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = reduced ? 1 : progress.current;
    const bake = smooth((p - 0.1) / 0.6);
    // couleur : pâte crue → dorée → croûte sombre sur les bords
    const col = g.attributes.color;
    const pos = g.attributes.position;
    for (let i = 0; i < col.count; i++) {
      const y = pos.getY(i);
      const edge = clamp01((0.25 - Math.abs(y - 0.15)) * 2.2);
      tmp
        .copy(PATE)
        .lerp(DORE, bake)
        .lerp(CROUTE, bake * (1 - edge) * 0.45 * clamp01(y + 0.3));
      if (cutAmount[i] > 0) tmp.lerp(GRIGNE, cutAmount[i] * 0.8);
      col.setXYZ(i, tmp.r, tmp.g, tmp.b);
    }
    col.needsUpdate = true;
    croissantMat.color
      .copy(PATE)
      .lerp(DORE, bake)
      .lerp(CROUTE, bake * 0.25);
    if (loafRef.current) {
      const rise = 0.82 + bake * 0.18;
      loafRef.current.scale.set(rise, 0.75 + bake * 0.25, rise);
    }
    const tl = tilt.current;
    tl.x += ((reduced ? 0 : pointer.x) - tl.x) * 0.05;
    tl.y += ((reduced ? 0 : pointer.y) - tl.y) * 0.05;
    if (group.current) {
      group.current.rotation.y = -0.5 + tl.x * 0.6 + (reduced ? 0 : t * 0.08) + p * 0.8;
      group.current.rotation.x = tl.y * 0.12;
    }
    const mobile = viewport.aspect < 0.8;
    camera.position.set(0, 2.6 - p * 0.6, mobile ? 9 : 8.6);
    camera.lookAt(0, 0.3, 0);
  });

  return (
    <group>
      <group ref={group}>
        {/* planche à pain */}
        <mesh position={[0, -0.24, 0]} receiveShadow>
          <cylinderGeometry args={[2.2, 2.2, 0.12, 64]} />
          <meshStandardMaterial color="#9b6b3e" roughness={0.85} />
        </mesh>
        <mesh ref={loafRef} geometry={g} material={loafMat} position={[-0.35, 0.18, 0.35]} castShadow />
        <group position={[0.9, -0.15, -0.2]} scale={0.95}>
          <Croissant mat={croissantMat} />
        </group>
        <Epi position={[-1.5, -0.2, -0.9]} rotation={[0.2, 0, 0.5]} />
        <Epi position={[-1.2, -0.2, -1.1]} rotation={[0.1, 0.4, 0.3]} />
      </group>
      <Particles progress={progress} reduced={reduced} />
    </group>
  );
}

export default function BakeryScene({ progress, reduced, tier, active, onReady, onSlow }) {
  // téléphone : version allégée (résolution réduite, pas d'ombres)
  const petit = typeof window !== 'undefined' && window.innerWidth < 768;
  const [low, setLow] = useState(tier === 'low' || petit);
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={petit ? 1.25 : low ? 1 : tier === 'high' ? 1.75 : 1.5}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      shadows={!low}
      camera={{ position: [0, 2.6, 6.6], fov: 35 }}
      gl={{ antialias: !low, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setLow(true)} flipflops={3} onFallback={() => onSlow?.()} />
      <hemisphereLight args={['#fff4e0', '#8a5a2b', 1]} />
      <directionalLight position={[3, 6, 4]} intensity={2.4} color="#ffe2b8" castShadow={!low} shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 1.5, 2]} color="#ff9a4a" intensity={14} distance={9} />
      <Rig progress={progress} reduced={reduced} quality={low ? 'low' : 'high'} />
      {!low && <ContactShadows position={[0, -0.31, 0]} scale={8} blur={2.4} opacity={0.35} far={2} frames={1} />}
    </Canvas>
  );
}
