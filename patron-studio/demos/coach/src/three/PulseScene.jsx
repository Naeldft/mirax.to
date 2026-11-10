import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { pointer, usePointer } from '@demos/shared/hooks/usePointer.js';

/* ------------------------------------------------------------------
   Kettlebell 3D (construit en code) entouré d'anneaux d'énergie qui
   battent comme un cœur. Au défilement, le rythme s'accélère et le
   kettlebell se balance (swing) de plus en plus fort.
   stats.current = { bpm, reps } est mis à jour pour l'interface.
------------------------------------------------------------------- */

const clamp01 = (t) => Math.min(1, Math.max(0, t));
const smooth = (t) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};
const ACIDE = '#c6ff3d';

/** Battement "lub-dub" : deux pics rapprochés par cycle. */
const heartbeat = (phase) => {
  const a = Math.exp(-Math.pow((phase - 0.08) / 0.035, 2));
  const b = 0.6 * Math.exp(-Math.pow((phase - 0.28) / 0.04, 2));
  return a + b;
};

function Kettlebell() {
  const handle = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.55, 0.55, 0),
      new THREE.Vector3(-0.55, 1.05, 0),
      new THREE.Vector3(-0.3, 1.35, 0),
      new THREE.Vector3(0.3, 1.35, 0),
      new THREE.Vector3(0.55, 1.05, 0),
      new THREE.Vector3(0.55, 0.55, 0),
    ]);
    return new THREE.TubeGeometry(curve, 48, 0.13, 20, false);
  }, []);
  const fonte = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1b1c1f', metalness: 0.75, roughness: 0.38 }), []);
  return (
    <group>
      <mesh material={fonte} scale={[1, 0.92, 1]} castShadow>
        <sphereGeometry args={[0.95, 48, 32]} />
      </mesh>
      <mesh material={fonte} position={[0, -0.82, 0]}>
        <cylinderGeometry args={[0.55, 0.6, 0.12, 40]} />
      </mesh>
      <mesh geometry={handle} material={fonte} castShadow />
      {/* bande verte avec le poids */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <torusGeometry args={[0.93, 0.045, 12, 64]} />
        <meshStandardMaterial color={ACIDE} emissive={ACIDE} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function Rig({ progress, reduced, quality, stats }) {
  const swing = useRef();
  const rings = useRef([]);
  const sparks = useRef();
  const phase = useRef(0);
  const swingPhase = useRef(0);
  const lastSide = useRef(0);
  const tilt = useRef({ x: 0, y: 0 });
  const { viewport, camera } = useThree();
  usePointer();
  const n = quality === 'low' ? 60 : 160;
  const sparkGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2;
      const r = 1.8 + Math.random() * 1.5;
      a.set([Math.cos(ang) * r, (Math.random() - 0.5) * 4, Math.sin(ang) * r], i * 3);
    }
    g.setAttribute('position', new THREE.BufferAttribute(a, 3));
    return g;
  }, [n]);

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 1 / 20);
    const p = reduced ? 0.3 : progress.current;
    const bpm = 72 + smooth(p) * 88; // 72 → 160 battements par minute
    if (!reduced) phase.current = (phase.current + (dt * bpm) / 60) % 1;
    const beat = reduced ? 0.2 : heartbeat(phase.current);
    // balancement : amplitude qui grandit avec le défilement
    const amp = reduced ? 0 : 0.15 + smooth(p) * 0.85;
    if (!reduced) swingPhase.current += dt * (2.2 + p * 1.6);
    const angle = Math.sin(swingPhase.current) * amp * (viewport.aspect < 1 ? 0.6 : 0.85);
    const side = Math.sign(Math.sin(swingPhase.current));
    if (amp > 0.35 && side > 0 && lastSide.current <= 0) stats.current.reps += 1;
    lastSide.current = side;
    stats.current.bpm = Math.round(bpm);
    if (swing.current) {
      swing.current.rotation.x = angle;
      swing.current.rotation.y += reduced ? 0 : dt * 0.3;
    }
    rings.current.forEach((r, i) => {
      if (!r) return;
      const k = 1 + beat * 0.12 * (1 + i * 0.4);
      r.scale.setScalar((1.55 + i * 0.42) * k);
      r.rotation.z += reduced ? 0 : dt * (0.2 + i * 0.15) * (i % 2 ? -1 : 1);
      r.material.emissiveIntensity = 0.4 + beat * 2.2;
      r.material.opacity = 0.35 + beat * 0.5 - i * 0.08;
    });
    if (sparks.current && !reduced) {
      const a = sparkGeo.attributes.position.array;
      for (let i = 0; i < n; i++) {
        a[i * 3 + 1] += dt * (0.4 + bpm / 120);
        if (a[i * 3 + 1] > 2.2) a[i * 3 + 1] = -2.2;
      }
      sparkGeo.attributes.position.needsUpdate = true;
      sparks.current.material.size = 0.035 + beat * 0.03;
    }
    const tl = tilt.current;
    tl.x += ((reduced ? 0 : pointer.x) - tl.x) * 0.05;
    tl.y += ((reduced ? 0 : pointer.y) - tl.y) * 0.05;
    const mobile = viewport.aspect < 1;
    camera.position.set(tl.x * 1.2, 0.6 + tl.y * 0.6, mobile ? 10 : 7.5);
    camera.lookAt(0, mobile ? -0.9 : 0, 0);
  });

  return (
    <group position={[viewport.width > 7 ? 2.3 : 0, 0, 0]}>
      {/* pivot au-dessus : le kettlebell se balance comme lors d'un swing */}
      <group position={[0, 1.6, 0]}>
        <group ref={swing}>
          <group position={[0, -1.9, 0]}>
            <Kettlebell />
          </group>
        </group>
      </group>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => (rings.current[i] = el)} rotation={[Math.PI / 2 - 0.35 + i * 0.25, i * 0.4, 0]} position={[0, -0.2, 0]}>
          <torusGeometry args={[1, 0.012 + (2 - i) * 0.006, 8, 96]} />
          <meshStandardMaterial color={ACIDE} emissive={ACIDE} emissiveIntensity={1} transparent opacity={0.6} depthWrite={false} />
        </mesh>
      ))}
      <points ref={sparks} geometry={sparkGeo}>
        <pointsMaterial color={ACIDE} size={0.04} transparent opacity={0.8} depthWrite={false} />
      </points>
    </group>
  );
}

export default function PulseScene({ progress, reduced, tier, active, onReady, stats }) {
  const [low, setLow] = useState(tier === 'low');
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={low ? 1 : tier === 'high' ? 1.75 : 1.5}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      shadows={false}
      camera={{ position: [0, 0.6, 7.5], fov: 35 }}
      gl={{ antialias: !low, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setLow(true)} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <pointLight position={[-3, -1, 2]} color={ACIDE} intensity={25} distance={9} />
      <Environment resolution={low ? 32 : 64} frames={1}>
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 5, 2]} scale={[6, 1.5, 1]} />
        <Lightformer form="rect" intensity={2.5} color={ACIDE} position={[-5, 0, 1]} scale={[1.5, 6, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[5, 0, 1]} scale={[1, 6, 1]} />
      </Environment>
      <Rig progress={progress} reduced={reduced} quality={low ? 'low' : 'high'} stats={stats} />
    </Canvas>
  );
}
