import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { pointer, usePointer } from '@demos/shared/hooks/usePointer.js';

/* ------------------------------------------------------------------
   Plomberie en 3D, construite en code : tuyaux en cuivre qui s'assemblent
   au défilement, vanne, manomètre, robinet chromé et eau qui coule.
   progress (0 → 1) : avancement du défilement dans l'accueil.
------------------------------------------------------------------- */

const R = 0.11; // rayon des tuyaux
const BEND = 0.28; // rayon des coudes
const ROUTE = [
  [-2.7, -1.15, 0],
  [-1.45, -1.15, 0],
  [-1.45, 0.25, 0],
  [0.15, 0.25, 0],
  [0.15, 1.15, 0],
].map((p) => new THREE.Vector3(...p));
const TIP = new THREE.Vector3(1.05, 1.18, 0.32); // sortie du bec
const BASIN = new THREE.Vector3(1.05, -0.62, 0.32); // centre de la vasque
const WATER_Y = -0.42; // surface de l'eau dans la vasque

const clamp01 = (t) => Math.min(1, Math.max(0, t));
const easeOutBack = (t) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2);
const smooth = (t) => t * t * (3 - 2 * t);
const rnd = (i) => {
  const x = Math.sin(i * 91.7 + 13.1) * 43758.5453;
  return x - Math.floor(x);
};

const useMaterials = () =>
  useMemo(
    () => ({
      copper: new THREE.MeshStandardMaterial({ color: '#c97a45', metalness: 1, roughness: 0.28 }),
      brass: new THREE.MeshStandardMaterial({ color: '#d6a24c', metalness: 1, roughness: 0.32 }),
      chrome: new THREE.MeshStandardMaterial({ color: '#e9eff4', metalness: 1, roughness: 0.07 }),
      red: new THREE.MeshStandardMaterial({ color: '#d33a2c', metalness: 0.2, roughness: 0.35 }),
      ceramic: new THREE.MeshStandardMaterial({ color: '#f4f7f8', metalness: 0, roughness: 0.18 }),
      dark: new THREE.MeshStandardMaterial({ color: '#1b2a38', metalness: 0.4, roughness: 0.6 }),
      water: new THREE.MeshStandardMaterial({
        color: '#7fe3f2',
        emissive: '#1f7f95',
        emissiveIntensity: 0.35,
        roughness: 0.05,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
      }),
    }),
    [],
  );

/** Cadran du manomètre (texture dessinée). */
const useGaugeTexture = () =>
  useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#f7fafb';
    ctx.beginPath();
    ctx.arc(128, 128, 124, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0a1724';
    ctx.lineWidth = 4;
    for (let i = 0; i <= 10; i++) {
      const a = Math.PI * 0.75 + (i / 10) * Math.PI * 1.5;
      const r1 = i % 5 === 0 ? 86 : 96;
      ctx.beginPath();
      ctx.moveTo(128 + Math.cos(a) * r1, 128 + Math.sin(a) * r1);
      ctx.lineTo(128 + Math.cos(a) * 108, 128 + Math.sin(a) * 108);
      ctx.stroke();
    }
    ctx.strokeStyle = '#d33a2c';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(128, 128, 102, Math.PI * 1.95, Math.PI * 2.25);
    ctx.stroke();
    ctx.fillStyle = '#0a1724';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('bar', 128, 196);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

/** Construit les pièces (droites, coudes, accessoires) avec leur ordre d'assemblage. */
function usePieces(quality) {
  return useMemo(() => {
    const seg = quality === 'low' ? 12 : 20;
    const pieces = [];
    const up = new THREE.Vector3(0, 1, 0);
    const add = (kind, center, build, extra = {}) => pieces.push({ kind, center, build, ...extra });

    // collerette murale
    add('flange', ROUTE[0].clone(), () => ({
      geo: new THREE.CylinderGeometry(0.24, 0.24, 0.08, seg),
      rot: new THREE.Euler(0, 0, Math.PI / 2),
      mat: 'brass',
    }));

    for (let i = 0; i < ROUTE.length - 1; i++) {
      const a = ROUTE[i];
      const b = ROUTE[i + 1];
      const dir = b.clone().sub(a).normalize();
      const start = i === 0 ? a.clone() : a.clone().addScaledVector(dir, BEND);
      const end = i === ROUTE.length - 2 ? b.clone() : b.clone().addScaledVector(dir, -BEND);
      const len = start.distanceTo(end);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const q = new THREE.Quaternion().setFromUnitVectors(up, dir);
      add('pipe', mid, () => ({ geo: new THREE.CylinderGeometry(R, R, len, seg), quat: q, mat: 'copper' }));
      // coude au point b
      if (i < ROUTE.length - 2) {
        const c = ROUTE[i + 2];
        const dir2 = c.clone().sub(b).normalize();
        const p0 = b.clone().addScaledVector(dir, -BEND);
        const p2 = b.clone().addScaledVector(dir2, BEND);
        const curve = new THREE.QuadraticBezierCurve3(p0, b.clone(), p2);
        const center = curve.getPoint(0.5);
        add('elbow', center, () => {
          const g = new THREE.TubeGeometry(curve, 12, R, seg, false);
          g.translate(-center.x, -center.y, -center.z);
          return { geo: g, mat: 'copper', local: true };
        });
        // bagues de raccord
        [p0, p2].forEach((p, k) => {
          const d = k === 0 ? dir : dir2;
          add('ring', p.clone(), () => ({
            geo: new THREE.CylinderGeometry(R * 1.35, R * 1.35, 0.07, seg),
            quat: new THREE.Quaternion().setFromUnitVectors(up, d),
            mat: 'brass',
          }));
        });
      }
    }
    return pieces;
  }, [quality]);
}

function Piece({ piece, index, total, progress, materials, reduced }) {
  const group = useRef();
  const data = useMemo(() => piece.build(), [piece]);
  const from = useMemo(
    () => ({
      x: (rnd(index) - 0.5) * 4,
      y: 1.5 + rnd(index + 7) * 2.5,
      z: 2 + rnd(index + 3) * 3,
      r: (rnd(index + 11) - 0.5) * Math.PI * 2,
    }),
    [index],
  );
  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const delay = (index / total) * 0.42;
    const t = reduced ? 1 : clamp01((progress.current - delay) / 0.14);
    const e = t <= 0 ? 0 : easeOutBack(t);
    g.visible = t > 0;
    g.position.set(piece.center.x + from.x * (1 - e), piece.center.y + from.y * (1 - e), piece.center.z + from.z * (1 - e));
    g.rotation.set(from.r * (1 - e), from.r * 0.6 * (1 - e), 0);
    g.scale.setScalar(Math.max(0.001, 0.5 + 0.5 * Math.min(1, e)));
  });
  return (
    <group ref={group}>
      <mesh
        geometry={data.geo}
        material={materials[data.mat]}
        quaternion={data.quat}
        rotation={data.quat ? undefined : data.rot}
        castShadow
      />
    </group>
  );
}

/** Vanne (volant rouge), manomètre, robinet, vasque : accessoires animés. */
function Fixtures({ progress, materials, reduced, quality }) {
  const valve = useRef();
  const lever = useRef();
  const needle = useRef();
  const fixtures = useRef();
  const basin = useRef();
  const gaugeTex = useGaugeTexture();
  const seg = quality === 'low' ? 16 : 32;

  const spout = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.15, 1.35, 0),
      new THREE.Vector3(0.18, 1.75, 0.05),
      new THREE.Vector3(0.6, 1.85, 0.18),
      new THREE.Vector3(0.98, 1.55, 0.3),
      new THREE.Vector3(TIP.x, TIP.y + 0.04, TIP.z),
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.075, seg, false);
  }, [seg]);

  const bowl = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 12; i++) {
      const a = (i / 12) * (Math.PI / 2);
      pts.push(new THREE.Vector2(0.05 + Math.sin(a) * 0.72, -Math.cos(a) * 0.32));
    }
    pts.push(new THREE.Vector2(0.86, 0.02), new THREE.Vector2(0.86, 0.06), new THREE.Vector2(0.74, 0.04));
    const g = new THREE.LatheGeometry(pts, quality === 'low' ? 32 : 64);
    return g;
  }, [quality]);

  useFrame((_, dt) => {
    const p = reduced ? 1 : progress.current;
    const appear = smooth(clamp01((p - 0.38) / 0.16));
    const open = reduced ? 1 : smooth(clamp01((p - 0.58) / 0.12));
    if (fixtures.current) {
      fixtures.current.scale.setScalar(Math.max(0.001, appear));
      fixtures.current.visible = appear > 0.001;
    }
    if (basin.current) {
      const b = smooth(clamp01((p - 0.3) / 0.15));
      basin.current.scale.setScalar(Math.max(0.001, b));
      basin.current.visible = b > 0.001;
    }
    if (lever.current) lever.current.rotation.z = -open * 1.1;
    if (valve.current && !reduced) valve.current.rotation.x += dt * (0.4 + open * 2.5) * (p > 0.2 ? 1 : 0);
    if (needle.current)
      needle.current.rotation.z = Math.PI * 0.75 - open * Math.PI * 1.1 - (reduced ? 0 : Math.sin(performance.now() / 300) * 0.03 * open);
  });

  return (
    <>
      {/* vanne sur le premier tronçon */}
      <group position={[-2.05, -1.15, 0]}>
        <mesh material={materials.brass} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.17, 0.17, 0.32, seg]} />
        </mesh>
        <mesh material={materials.brass} position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.3, 12]} />
        </mesh>
        <group ref={valve} position={[0, 0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.red}>
            <torusGeometry args={[0.22, 0.04, 10, seg]} />
          </mesh>
          {[0, 1, 2].map((k) => (
            <mesh key={k} material={materials.red} rotation={[0, 0, (k * Math.PI) / 3]}>
              <boxGeometry args={[0.44, 0.04, 0.04]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* manomètre sur le tronçon horizontal */}
      <group position={[-0.65, 0.25, 0]}>
        <mesh material={materials.copper} position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.3, 12]} />
        </mesh>
        <group position={[0, 0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.chrome}>
            <cylinderGeometry args={[0.24, 0.24, 0.1, seg]} />
          </mesh>
          <mesh position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.21, seg]} />
            <meshBasicMaterial map={gaugeTex} toneMapped={false} />
          </mesh>
          <mesh ref={needle} position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.02, 0.17, 0.01]} />
            <meshBasicMaterial color="#d33a2c" />
          </mesh>
        </group>
      </group>

      {/* robinet chromé */}
      <group ref={fixtures}>
        <mesh material={materials.chrome} position={[0.15, 1.27, 0]}>
          <cylinderGeometry args={[0.13, 0.15, 0.28, seg]} />
        </mesh>
        <mesh geometry={spout} material={materials.chrome} castShadow />
        <mesh material={materials.chrome} position={[TIP.x, TIP.y + 0.03, TIP.z]}>
          <cylinderGeometry args={[0.085, 0.085, 0.06, seg]} />
        </mesh>
        <group ref={lever} position={[0.15, 1.45, 0]}>
          <mesh material={materials.chrome} position={[-0.22, 0.06, 0]} rotation={[0, 0, 0.25]}>
            <boxGeometry args={[0.46, 0.06, 0.09]} />
          </mesh>
          <mesh material={materials.chrome}>
            <sphereGeometry args={[0.11, seg, 16]} />
          </mesh>
        </group>
      </group>

      {/* vasque */}
      <group ref={basin} position={[BASIN.x, BASIN.y, BASIN.z]}>
        <mesh geometry={bowl} material={materials.ceramic} receiveShadow castShadow />
        <mesh material={materials.dark} position={[0, -0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.07, 20]} />
        </mesh>
      </group>
    </>
  );
}

/** Eau : particules qui tombent du bec, filet continu, ondes dans la vasque. */
function Water({ progress, materials, reduced, count }) {
  const inst = useRef();
  const stream = useRef();
  const pool = useRef();
  const ripples = useRef([]);
  const drip = useRef();
  const m = useMemo(() => new THREE.Matrix4(), []);
  const v = useMemo(() => new THREE.Vector3(), []);
  const s = useMemo(() => new THREE.Vector3(), []);
  const q = useMemo(() => new THREE.Quaternion(), []);
  const wind = useRef(0);
  const fall = TIP.y - WATER_Y;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = reduced ? 1 : progress.current;
    const flow = reduced ? 0.7 : smooth(clamp01((p - 0.64) / 0.12));
    wind.current += ((reduced ? 0 : pointer.x) * 0.12 - wind.current) * 0.05;

    if (inst.current) {
      for (let i = 0; i < count; i++) {
        const visible = !reduced && i < flow * count;
        const life = (t * 1.25 + rnd(i)) % 1;
        const y = TIP.y - life * life * fall;
        const spread = (rnd(i + 5) - 0.5) * 0.06 * (0.4 + life);
        v.set(TIP.x + spread + wind.current * life * life, y, TIP.z + (rnd(i + 9) - 0.5) * 0.05);
        const k = visible ? 0.03 + rnd(i + 2) * 0.025 : 0.0001;
        s.set(k, k * (1.6 + life * 1.4), k);
        m.compose(v, q, s);
        inst.current.setMatrixAt(i, m);
      }
      inst.current.instanceMatrix.needsUpdate = true;
    }
    if (stream.current) {
      stream.current.visible = flow > 0.05;
      stream.current.scale.set(Math.max(0.001, flow), 1, Math.max(0.001, flow));
      stream.current.position.x = TIP.x + wind.current * 0.35;
      stream.current.rotation.z = -wind.current * 0.35;
    }
    if (pool.current) {
      const level = smooth(clamp01((p - 0.7) / 0.3));
      pool.current.visible = flow > 0.05 || level > 0;
      pool.current.position.y = WATER_Y - 0.12 + level * 0.1;
      const r = 0.45 + level * 0.22;
      pool.current.scale.set(r, r, 1);
    }
    ripples.current.forEach((r, i) => {
      if (!r) return;
      const life = (t * 0.8 + i / 3) % 1;
      r.visible = flow > 0.1 && !reduced;
      const k = 0.05 + life * 0.45;
      r.scale.set(k, k, 1);
      r.material.opacity = (1 - life) * 0.6 * flow;
    });
    // goutte qui perle avant l'ouverture du robinet
    if (drip.current) {
      const show = !reduced && flow < 0.05 && p > 0.5;
      drip.current.visible = show;
      const life = (t * 0.5) % 1;
      drip.current.position.y = TIP.y - (life < 0.5 ? 0 : (life - 0.5) * 2 * (life - 0.5) * 2 * fall);
      drip.current.scale.setScalar(0.035 * (life < 0.5 ? life * 2 : 1));
    }
  });

  const streamLen = fall;
  return (
    <group>
      <instancedMesh ref={inst} args={[null, materials.water, count]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 6]} />
      </instancedMesh>
      <mesh ref={stream} position={[TIP.x, TIP.y - streamLen / 2, TIP.z]} material={materials.water}>
        <cylinderGeometry args={[0.035, 0.05, streamLen, 12, 1, true]} />
      </mesh>
      <mesh ref={pool} position={[BASIN.x, WATER_Y, BASIN.z]} rotation={[-Math.PI / 2, 0, 0]} material={materials.water}>
        <circleGeometry args={[1, 40]} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => (ripples.current[i] = el)}
          position={[BASIN.x, WATER_Y - 0.005, BASIN.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.9, 1, 40]} />
          <meshBasicMaterial color="#c9f6ff" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
      <mesh ref={drip} position={[TIP.x, TIP.y, TIP.z]} material={materials.water}>
        <sphereGeometry args={[1, 10, 8]} />
      </mesh>
    </group>
  );
}

/** Ensemble : ajusté à la largeur de l'écran, suit la souris et le défilement. */
function Rig({ progress, reduced, quality }) {
  const rig = useRef();
  const tilt = useRef({ x: 0, y: 0 });
  const materials = useMaterials();
  const pieces = usePieces(quality);
  const { viewport, camera } = useThree();
  usePointer();

  useFrame(() => {
    const p = reduced ? 1 : progress.current;
    const t = tilt.current;
    t.x += ((reduced ? 0 : pointer.x) - t.x) * 0.06;
    t.y += ((reduced ? 0 : pointer.y) - t.y) * 0.06;
    if (!rig.current) return;
    // largeur utile de la scène ≈ 5,2 unités : on réduit sur mobile
    const fit = Math.min(1, viewport.width / 5.4);
    rig.current.scale.setScalar(fit);
    rig.current.rotation.y = -0.55 + smooth(p) * 0.4 + t.x * 0.35;
    rig.current.rotation.x = 0.12 + t.y * 0.12;
    rig.current.position.y = viewport.width < 5 ? 0.15 : 0;
    // grand écran : la scène se décale à droite pour laisser le texte à gauche
    rig.current.position.x = viewport.width > 7 ? Math.min(2.2, (viewport.width - 7) * 0.5 + 1) : 0;
    camera.position.z = 8 - smooth(p) * 0.8;
    camera.lookAt(0, 0.1, 0);
  });

  return (
    <group ref={rig}>
      <group position={[0.7, -0.1, 0]}>
        {pieces.map((pc, i) => (
          <Piece key={i} piece={pc} index={i} total={pieces.length} progress={progress} materials={materials} reduced={reduced} />
        ))}
        <Fixtures progress={progress} materials={materials} reduced={reduced} quality={quality} />
        <Water progress={progress} materials={materials} reduced={reduced} count={quality === 'low' ? 60 : 160} />
      </group>
    </group>
  );
}

export default function PlumbingScene({ progress, reduced, tier, active, onReady }) {
  const [low, setLow] = useState(tier === 'low');
  const quality = low ? 'low' : 'high';
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={low ? 1 : tier === 'high' ? 1.75 : 1.5}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      shadows={!low}
      camera={{ position: [0, 0.4, 8], fov: 35 }}
      gl={{ antialias: !low, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setLow(true)} />
      <hemisphereLight args={['#bfe6ff', '#08121c', 0.7]} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} castShadow={!low} shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 1, -2]} color="#ff9a5c" intensity={20} distance={10} />
      <pointLight position={[1.5, -1.5, 2]} color="#5fd4e8" intensity={8} distance={6} />
      <Environment resolution={low ? 32 : 64} frames={1}>
        <Lightformer form="rect" intensity={2.5} color="#ffffff" position={[0, 5, 3]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#5fd4e8" position={[-5, 1, 2]} scale={[2, 6, 1]} />
        <Lightformer form="ring" intensity={2} color="#ffb37a" position={[4, 2, -3]} scale={2} />
      </Environment>
      <Rig progress={progress} reduced={reduced} quality={quality} />
    </Canvas>
  );
}
