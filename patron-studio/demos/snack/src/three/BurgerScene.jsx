import { ContactShadows, PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { pointer, usePointer } from '@demos/shared/hooks/usePointer.js';

/* ------------------------------------------------------------------
   Un smash burger construit en code. Au chargement il est « éclaté »
   (chaque couche flotte séparément) ; au défilement, les couches
   tombent une à une et s'empilent, le fromage fond, puis le pain du
   dessus vient fermer le tout avec un petit rebond. Des frites
   tournent autour. Le burger suit la souris (ou l'inclinaison).
------------------------------------------------------------------- */

const clamp01 = (t) => Math.min(1, Math.max(0, t));
const smooth = (t) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};
/** Arrivée avec léger rebond (dépasse puis revient). */
const rebond = (t) => {
  const x = clamp01(t);
  const c = 1.9;
  return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
};
const rnd = (i) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Pain : profil tourné (lathe). dome = pain du dessus. */
function usePain(dome) {
  return useMemo(() => {
    // profil parcouru de haut en bas (centre → bord → dessous)
    const pts = [];
    if (dome) {
      for (let i = 0; i <= 16; i++) {
        const a = Math.PI / 2 - (i / 16) * (Math.PI / 2);
        pts.push(new THREE.Vector2(Math.max(0.0001, Math.cos(a) * 1.5), Math.sin(a) * 0.95));
      }
      pts.push(new THREE.Vector2(1.42, -0.04), new THREE.Vector2(0.0001, -0.04));
    } else {
      pts.push(
        new THREE.Vector2(0.0001, 0.42),
        new THREE.Vector2(1.44, 0.42),
        new THREE.Vector2(1.52, 0.3),
        new THREE.Vector2(1.5, 0.12),
        new THREE.Vector2(1.38, 0),
        new THREE.Vector2(0.0001, 0),
      );
    }
    return new THREE.LatheGeometry(pts, 48);
  }, [dome]);
}

/** Steak écrasé : cylindre aux bords irréguliers et dessus bosselé (bords croustillants). */
function useSteak() {
  return useMemo(() => {
    const g = new THREE.CylinderGeometry(1.62, 1.6, 0.34, 64, 3);
    const p = g.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const a = Math.atan2(v.z, v.x);
      const r = Math.hypot(v.x, v.z);
      if (r > 0.5) {
        const k = 1 + 0.06 * Math.sin(a * 7) + 0.04 * Math.sin(a * 13 + 1) + 0.03 * (rnd(i) - 0.5);
        v.x *= k;
        v.z *= k;
      }
      v.y += 0.03 * (rnd(i + 9) - 0.5);
      p.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);
}

/** Tranche de cheddar carrée dont les coins coulent (fonte réglable). */
function useFromage() {
  return useMemo(() => {
    const g = new THREE.PlaneGeometry(2.6, 2.6, 24, 24);
    g.rotateX(-Math.PI / 2);
    const base = g.attributes.position.array.slice();
    return { g, base };
  }, []);
}

/** Salade : disque au bord ondulé. */
function useSalade() {
  return useMemo(() => {
    const g = new THREE.CircleGeometry(1.78, 96, 0, Math.PI * 2);
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      const r = Math.hypot(x, z);
      const a = Math.atan2(z, x);
      const bord = clamp01((r - 1.2) / 0.6);
      p.setY(i, bord * (0.1 * Math.sin(a * 14) - 0.08) + 0.02 * Math.sin(a * 31));
      const k = 1 + bord * 0.05 * Math.sin(a * 9);
      p.setX(i, x * k);
      p.setZ(i, z * k);
    }
    g.computeVertexNormals();
    return g;
  }, []);
}

/** Graines de sésame sur le pain du dessus. */
function Sesame({ mat, n }) {
  const ref = useRef();
  const set = (el) => {
    if (!el || el.userData.ok) return;
    const o = new THREE.Object3D();
    for (let i = 0; i < n; i++) {
      const a = rnd(i) * Math.PI * 2;
      const r = Math.sqrt(rnd(i + 50)) * 1.2;
      const y = Math.sqrt(Math.max(0, 1 - Math.pow(r / 1.5, 2))) * 0.95;
      o.position.set(Math.cos(a) * r, y + 0.01, Math.sin(a) * r);
      o.lookAt(o.position.x * 2, o.position.y * 3 + 1, o.position.z * 2);
      o.rotateZ(rnd(i + 3) * 3);
      o.scale.set(0.045, 0.02, 0.075);
      o.updateMatrix();
      el.setMatrixAt(i, o.matrix);
    }
    el.instanceMatrix.needsUpdate = true;
    el.userData.ok = true;
  };
  return (
    <instancedMesh
      ref={(el) => {
        ref.current = el;
        set(el);
      }}
      args={[undefined, mat, n]}
    >
      <sphereGeometry args={[1, 8, 6]} />
    </instancedMesh>
  );
}

/** Frites qui tournent autour du burger. */
function Frites({ progress, reduced, n }) {
  const ref = useRef();
  const o = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        a: (i / n) * Math.PI * 2,
        r: 2.6 + rnd(i) * 0.8,
        y: rnd(i + 7) * 3 - 0.3,
        s: 0.7 + rnd(i + 2) * 0.6,
        rx: rnd(i + 4) * 6,
        rz: rnd(i + 5) * 6,
      })),
    [n],
  );
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = reduced ? 0 : clock.elapsedTime;
    const p = reduced ? 1 : progress.current;
    data.forEach((d, i) => {
      const a = d.a + t * 0.25;
      o.position.set(Math.cos(a) * d.r, d.y + Math.sin(t + i) * 0.15, Math.sin(a) * d.r);
      o.rotation.set(d.rx + t * 0.6, a, d.rz + t * 0.4);
      o.scale.set(0.11 * d.s, 0.85 * d.s, 0.11 * d.s).multiplyScalar(0.4 + 0.6 * smooth(p * 1.5));
      o.updateMatrix();
      ref.current.setMatrixAt(i, o.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, n]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffc23a" roughness={0.55} />
    </instancedMesh>
  );
}

/*
  Couches de bas en haut : [nom, hauteur d'empilement, hauteur au repos]
  L'ordre d'arrivée suit l'ordre de la liste.
*/
const COUCHES = ['painBas', 'steak', 'fromage', 'steak2', 'fromage2', 'salade', 'tomate', 'oignon', 'painHaut'];
const POS = {
  painBas: 0,
  steak: 0.42,
  fromage: 0.78,
  steak2: 0.8,
  fromage2: 1.15,
  salade: 1.18,
  tomate: 1.22,
  oignon: 1.38,
  painHaut: 1.44,
};

function Burger({ progress, reduced, quality }) {
  const refs = useRef({});
  const groupe = useRef();
  const tilt = useRef({ x: 0, y: 0 });
  const painBas = usePain(false);
  const painHaut = usePain(true);
  const steak = useSteak();
  const fromage = useFromage();
  const fromage2 = useFromage();
  const salade = useSalade();
  const m = useMemo(
    () => ({
      pain: new THREE.MeshStandardMaterial({ color: '#e0862f', roughness: 0.55, side: THREE.DoubleSide }),
      painInt: new THREE.MeshStandardMaterial({ color: '#f6d8a2', roughness: 0.9 }),
      steak: new THREE.MeshStandardMaterial({ color: '#5a3220', roughness: 0.85 }),
      fromage: new THREE.MeshStandardMaterial({ color: '#ffb000', roughness: 0.35, side: THREE.DoubleSide }),
      salade: new THREE.MeshStandardMaterial({ color: '#6fbf4a', roughness: 0.6, side: THREE.DoubleSide }),
      tomate: new THREE.MeshStandardMaterial({ color: '#e63b2e', roughness: 0.35 }),
      tomateInt: new THREE.MeshStandardMaterial({ color: '#ff7a5c', roughness: 0.5 }),
      oignon: new THREE.MeshStandardMaterial({ color: '#f2e6f0', roughness: 0.4, emissive: '#a05080', emissiveIntensity: 0.12 }),
      sesame: new THREE.MeshStandardMaterial({ color: '#fff3d6', roughness: 0.6 }),
    }),
    [],
  );
  const { viewport } = useThree();
  usePointer();

  const fondre = (f, k) => {
    // les coins de la tranche coulent sur le steak : plus k est grand, plus ça fond
    const a = f.g.attributes.position.array;
    for (let i = 0; i < a.length; i += 3) {
      const x = f.base[i];
      const z = f.base[i + 2];
      const r = Math.hypot(x, z);
      const hors = Math.max(0, r - 1.45);
      a[i + 1] = -(hors * hors * 1.4 + hors * 0.3) * k;
      const pince = 1 - Math.min(0.12, hors * 0.15) * k;
      a[i] = x * pince;
      a[i + 2] = z * pince;
    }
    f.g.attributes.position.needsUpdate = true;
    f.g.computeVertexNormals();
  };

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = reduced ? 1 : progress.current;
    const N = COUCHES.length;
    const T = smooth(p / 0.85) * (N + 0.2); // une unité de temps par couche
    COUCHES.forEach((nom, i) => {
      const el = refs.current[nom];
      if (!el) return;
      const k = rebond(T - i * 0.92); // 0 = éclaté, 1 = posé
      const eclate = (i * 0.55 + 0.6) * (viewport.aspect < 1 ? 0.75 : 1); // écart vertical en vue éclatée
      el.position.y = POS[nom] + (1 - k) * eclate;
      el.rotation.y = (1 - k) * (i % 2 ? 0.5 : -0.5) + (reduced ? 0 : (1 - k) * Math.sin(t * 0.8 + i) * 0.15);
      el.rotation.z = (1 - k) * (i % 2 ? 0.08 : -0.08);
    });
    fondre(fromage, smooth(T - 2.2));
    fondre(fromage2, smooth(T - 4.2));
    const tl = tilt.current;
    tl.x += ((reduced ? 0 : pointer.x) - tl.x) * 0.05;
    tl.y += ((reduced ? 0 : pointer.y) - tl.y) * 0.05;
    if (groupe.current) {
      groupe.current.rotation.y = (reduced ? 0.4 : t * 0.25) + tl.x * 0.6;
      groupe.current.rotation.x = 0.12 + tl.y * 0.2;
      // petit « squish » quand le pain du haut se pose
      const choc = Math.exp(-Math.pow((T - (N - 1) * 0.92 - 0.7) / 0.18, 2));
      groupe.current.scale.set(1 + choc * 0.04, 1 - choc * 0.06, 1 + choc * 0.04);
    }
  });

  const reg = (nom) => (el) => (refs.current[nom] = el);
  const seg = quality === 'low' ? 32 : 48;
  return (
    <group position={[viewport.aspect > 1.2 ? 2.4 : 0, 0, 0]}>
      <group ref={groupe}>
        <group ref={reg('painBas')}>
          <mesh geometry={painBas} material={m.pain} castShadow />
          <mesh position={[0, 0.425, 0]} rotation={[-Math.PI / 2, 0, 0]} material={m.painInt}>
            <circleGeometry args={[1.44, seg]} />
          </mesh>
        </group>
        <mesh ref={reg('steak')} geometry={steak} material={m.steak} castShadow position-y={POS.steak} />
        <mesh ref={reg('fromage')} geometry={fromage.g} material={m.fromage} />
        <group ref={reg('steak2')}>
          <mesh geometry={steak} material={m.steak} position-y={0.17} castShadow />
        </group>
        <mesh ref={reg('fromage2')} geometry={fromage2.g} material={m.fromage} />
        <mesh ref={reg('salade')} geometry={salade} material={m.salade} />
        <group ref={reg('tomate')}>
          {[
            [-0.55, 0.2],
            [0.6, -0.25],
          ].map(([x, z], i) => (
            <group key={i} position={[x, 0.06, z]}>
              <mesh material={m.tomate}>
                <cylinderGeometry args={[0.72, 0.72, 0.12, seg]} />
              </mesh>
              <mesh position-y={0.062} rotation-x={-Math.PI / 2} material={m.tomateInt}>
                <ringGeometry args={[0.18, 0.6, seg]} />
              </mesh>
            </group>
          ))}
        </group>
        <group ref={reg('oignon')}>
          {[
            [0.1, 0.4, 0.42],
            [-0.6, -0.4, 0.34],
            [0.75, 0.55, 0.3],
          ].map(([x, z, r], i) => (
            <mesh key={i} position={[x, 0.03, z]} rotation-x={Math.PI / 2} material={m.oignon}>
              <torusGeometry args={[r, 0.05, 8, 32]} />
            </mesh>
          ))}
        </group>
        <group ref={reg('painHaut')}>
          <mesh geometry={painHaut} material={m.pain} castShadow />
          <Sesame mat={m.sesame} n={quality === 'low' ? 40 : 80} />
        </group>
        <Frites progress={progress} reduced={reduced} n={quality === 'low' ? 10 : 18} />
      </group>
      {quality !== 'low' && (
        <ContactShadows position={[0, -0.02, 0]} scale={9} blur={2.5} opacity={0.35} far={3} frames={Infinity} resolution={256} />
      )}
    </group>
  );
}

/** La caméra recule tant que le burger est éclaté, puis se rapproche une fois assemblé. */
function Camera({ progress, reduced }) {
  const { viewport, camera } = useThree();
  useFrame(() => {
    const a = reduced ? 1 : smooth(progress.current / 0.85);
    const mobile = viewport.aspect < 1;
    const L = THREE.MathUtils.lerp;
    camera.position.set(0, 3.2, mobile ? L(21, 14, a) : L(12, 8.5, a));
    camera.lookAt(0, mobile ? L(-0.5, -1.2, a) : L(2.6, 1.1, a), 0);
  });
  return null;
}

export default function BurgerScene({ progress, reduced, tier, active, onReady }) {
  const [low, setLow] = useState(tier === 'low');
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={low ? 1 : tier === 'high' ? 1.75 : 1.5}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      shadows={!low}
      camera={{ position: [0, 3.2, 9], fov: 35 }}
      gl={{ antialias: !low, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setLow(true)} />
      <hemisphereLight args={['#fff4e0', '#e0862f', 1.2]} />
      <directionalLight position={[3, 7, 5]} intensity={2.3} castShadow={!low} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0008} shadow-normalBias={0.02} />
      <pointLight position={[-4, 2, 3]} color="#ffc93c" intensity={12} distance={12} />
      <Camera progress={progress} reduced={reduced} />
      <Burger progress={progress} reduced={reduced} quality={low ? 'low' : 'high'} />
    </Canvas>
  );
}
