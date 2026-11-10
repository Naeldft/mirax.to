import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { pointer, usePointer } from '@demos/shared/hooks/usePointer.js';

/* ------------------------------------------------------------------
   Ciseaux chromés et mèches ondulantes, construits en code.
   - les mèches ondulent et se penchent vers la souris (ou l'inclinaison)
   - les ciseaux coupent régulièrement ; au défilement, ils descendent
     et raccourcissent les mèches, les bouts coupés tombent.
------------------------------------------------------------------- */

const clamp01 = (t) => Math.min(1, Math.max(0, t));
const smooth = (t) => t * t * (3 - 2 * clamp01(t));
const rnd = (i) => {
  const x = Math.sin(i * 45.17 + 3.3) * 43758.5453;
  return x - Math.floor(x);
};

const COLORS = ['#7a4b3a', '#a8693a', '#c98f5a', '#d9a5a0', '#5a3a30', '#e3b98f'];

/** Lame : forme effilée extrudée avec un léger biseau. */
function bladeGeometry() {
  const s = new THREE.Shape();
  s.moveTo(0, -0.07);
  s.lineTo(2.3, -0.015);
  s.quadraticCurveTo(2.42, 0, 2.3, 0.02);
  s.lineTo(0, 0.12);
  s.quadraticCurveTo(-0.12, 0.03, 0, -0.07);
  const g = new THREE.ExtrudeGeometry(s, {
    depth: 0.035,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
    curveSegments: 12,
  });
  g.translate(0, 0, -0.017);
  return g;
}

function Scissors({ open, groupRef }) {
  const blade = useMemo(() => bladeGeometry(), []);
  const chrome = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e9ecef', metalness: 0.65, roughness: 0.18, envMapIntensity: 1.6 }), []);
  const handle = useMemo(() => new THREE.MeshStandardMaterial({ color: '#b9746e', metalness: 0.3, roughness: 0.35 }), []);
  const gold = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d4a85a', metalness: 1, roughness: 0.25 }), []);
  const a = useRef();
  const b = useRef();
  useFrame(() => {
    const o = open.current;
    if (a.current) a.current.rotation.z = o * 0.42;
    if (b.current) b.current.rotation.z = -o * 0.42;
  });
  return (
    <group ref={groupRef}>
      {[
        [a, 1],
        [b, -1],
      ].map(([ref, sd]) => (
        <group key={sd} ref={ref}>
          <group scale={[1, sd, 1]} position={[0, 0, sd * 0.03]}>
            <mesh geometry={blade} material={chrome} castShadow />
            {/* branche et anneau */}
            <mesh material={chrome} position={[-0.45, -0.12, 0]} rotation={[0, 0, 0.28]}>
              <boxGeometry args={[0.9, 0.09, 0.05]} />
            </mesh>
            <mesh material={handle} position={[-1.05, -0.38, 0]}>
              <torusGeometry args={[0.28, 0.06, 14, 40]} />
            </mesh>
          </group>
        </group>
      ))}
      <mesh material={gold} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.16, 20]} />
      </mesh>
    </group>
  );
}

/** Une mèche : ruban souple déformé à chaque image (aucun fichier externe). */
function useStrands(count, segs) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const len = 3.2 + rnd(i) * 1.6;
        const w = 0.07 + rnd(i + 3) * 0.06;
        const g = new THREE.PlaneGeometry(w, len, 1, segs);
        g.translate(0, -len / 2, 0);
        return {
          g,
          base: g.attributes.position.array.slice(),
          len,
          x: (i / (count - 1) - 0.5) * 3.4 + (rnd(i + 7) - 0.5) * 0.25,
          z: (rnd(i + 9) - 0.5) * 0.9,
          phase: rnd(i + 11) * Math.PI * 2,
          color: COLORS[i % COLORS.length],
        };
      }),
    [count, segs],
  );
}

function Hair({ progress, reduced, quality }) {
  const count = quality === 'low' ? 14 : 26;
  const strands = useStrands(count, quality === 'low' ? 16 : 30);
  const meshes = useRef([]);
  const bend = useRef({ x: 0 });
  const mats = useMemo(
    () =>
      COLORS.map(
        (c) =>
          new THREE.MeshPhysicalMaterial({
            color: c,
            roughness: 0.45,
            sheen: 1,
            sheenColor: new THREE.Color('#fff1e6'),
            side: THREE.DoubleSide,
          }),
      ),
    [],
  );
  useFrame(({ clock }) => {
    const t = reduced ? 0 : clock.elapsedTime;
    const p = reduced ? 0.4 : progress.current;
    bend.current.x += ((reduced ? 0 : pointer.x) - bend.current.x) * 0.04;
    const cut = 1 - smooth(clamp01((p - 0.15) / 0.7)) * 0.45; // les mèches raccourcissent
    strands.forEach((s, i) => {
      const m = meshes.current[i];
      if (!m) return;
      const pos = s.g.attributes.position;
      const arr = pos.array;
      for (let k = 0; k < arr.length; k += 3) {
        const y0 = s.base[k + 1];
        const u = -y0 / s.len; // 0 en haut → 1 en bas
        const y = y0 * cut;
        const wave = Math.sin(t * 1.4 + s.phase + u * 5) * 0.18 * u + Math.sin(t * 0.7 + s.phase) * 0.05 * u;
        arr[k] = s.base[k] + wave + bend.current.x * 0.9 * u * u;
        arr[k + 1] = y;
        arr[k + 2] = Math.cos(t * 1.1 + s.phase + u * 4) * 0.15 * u;
      }
      pos.needsUpdate = true;
      s.g.computeVertexNormals();
    });
  });
  return (
    <group position={[0, 2.4, -0.4]}>
      {strands.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => (meshes.current[i] = el)}
          geometry={s.g}
          material={mats[i % mats.length]}
          position={[s.x, 0, s.z]}
          castShadow
        />
      ))}
    </group>
  );
}

/** Petits bouts de mèches qui tombent après chaque coup de ciseaux. */
function Snips({ reduced, cuts }) {
  const n = 40;
  const inst = useRef();
  const m4 = useMemo(() => new THREE.Matrix4(), []);
  const q = useMemo(() => new THREE.Quaternion(), []);
  const e = useMemo(() => new THREE.Euler(), []);
  const v = useMemo(() => new THREE.Vector3(), []);
  const s = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    if (!inst.current) return;
    const t = clock.elapsedTime;
    for (let i = 0; i < n; i++) {
      const born = cuts.current[i % cuts.current.length] ?? -10;
      const age = t - born - (i % 5) * 0.03;
      const alive = !reduced && age > 0 && age < 2.2;
      v.set(-0.6 + rnd(i) * 1.6 + age * (rnd(i + 2) - 0.5) * 0.6, 0.2 - age * age * 1.4, 0.4 + rnd(i + 5) * 0.4);
      e.set(age * 3 * rnd(i + 1), age * 2, age * 4 * rnd(i + 3));
      q.setFromEuler(e);
      const k = alive ? 1 : 0.0001;
      s.set(0.04 * k, (0.12 + rnd(i + 4) * 0.12) * k, 0.01 * k);
      m4.compose(v, q, s);
      inst.current.setMatrixAt(i, m4);
    }
    inst.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={inst} args={[null, null, n]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#a8693a" roughness={0.6} />
    </instancedMesh>
  );
}

function Rig({ progress, reduced, quality }) {
  const scissors = useRef();
  const open = useRef(0.6);
  const cuts = useRef([-10, -10, -10, -10, -10, -10, -10, -10]);
  const lastCut = useRef(0);
  const tilt = useRef({ x: 0, y: 0 });
  const { viewport, camera } = useThree();
  usePointer();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = reduced ? 0.4 : progress.current;
    const tl = tilt.current;
    tl.x += ((reduced ? 0 : pointer.x) - tl.x) * 0.06;
    tl.y += ((reduced ? 0 : pointer.y) - tl.y) * 0.06;
    // coup de ciseaux toutes les 1,6 s : ouverture lente, fermeture sèche
    const cycle = reduced ? 0.2 : (t % 1.6) / 1.6;
    open.current = cycle < 0.75 ? smooth(cycle / 0.75) * 0.9 : 0.9 * (1 - smooth((cycle - 0.75) / 0.08));
    if (!reduced && cycle > 0.8 && t - lastCut.current > 1) {
      lastCut.current = t;
      cuts.current.push(t);
      cuts.current.shift();
    }
    if (scissors.current) {
      const mobile = viewport.aspect < 1;
      scissors.current.scale.setScalar(mobile ? 0.62 : 1);
      scissors.current.position.set((mobile ? 0.5 : -0.2) + tl.x * 0.4, (mobile ? 1.5 : 0.4) - smooth(p) * 1.2 + Math.sin(t * 0.8) * 0.06, 0.6);
      scissors.current.rotation.set(
        0.15 + tl.y * 0.25,
        -0.3 + tl.x * 0.4 + (reduced ? 0 : Math.sin(t * 0.4) * 0.1),
        -0.25 + smooth(p) * 0.2,
      );
    }
    const fit = Math.min(1, viewport.width / 4.6);
    camera.position.set(tl.x * 0.5, 0.2 + tl.y * 0.3, 7 / fit);
    camera.lookAt(0, 0.2, 0);
  });
  return (
    <group position={[viewport.width > 7 ? 1.9 : 0, viewport.width > 7 ? 0 : 0.9, 0]}>
      <Hair progress={progress} reduced={reduced} quality={quality} />
      <Scissors open={open} groupRef={scissors} />
      <Snips reduced={reduced} cuts={cuts} />
    </group>
  );
}

export default function ScissorsScene({ progress, reduced, tier, active, onReady }) {
  const [low, setLow] = useState(tier === 'low');
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={low ? 1 : tier === 'high' ? 1.75 : 1.5}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      camera={{ position: [0, 0.2, 7], fov: 35 }}
      gl={{ antialias: !low, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setLow(true)} />
      <hemisphereLight args={['#fff6f0', '#d9a5a0', 1]} />
      <directionalLight position={[3, 5, 5]} intensity={2.2} />
      <pointLight position={[-3, 1, 3]} color="#ffd1c4" intensity={18} distance={10} />
      <Environment resolution={low ? 32 : 64} frames={1}>
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#f3c6bd" position={[-5, 0, 2]} scale={[2, 6, 1]} />
        <Lightformer form="ring" intensity={2} color="#ffffff" position={[4, 1, 1]} scale={1.5} />
      </Environment>
      <Rig progress={progress} reduced={reduced} quality={low ? 'low' : 'high'} />
    </Canvas>
  );
}
