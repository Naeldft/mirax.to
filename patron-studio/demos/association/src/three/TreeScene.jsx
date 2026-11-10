import { PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { pointer, usePointer } from '@demos/shared/hooks/usePointer.js';

/* ------------------------------------------------------------------
   Un arbre qui pousse au défilement, généré en code :
   1) les racines s'étendent dans la terre (visible en coupe) ;
   2) le tronc puis les branches poussent, niveau par niveau ;
   3) les feuilles éclosent, de toutes les couleurs (une par membre),
      et quelques-unes s'envolent. L'arbre ondule avec la souris.
------------------------------------------------------------------- */

const clamp01 = (t) => Math.min(1, Math.max(0, t));
const smooth = (t) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};
const UP = new THREE.Vector3(0, 1, 0);
const PALETTE = ['#7fb069', '#5e9a4a', '#9cc77f', '#3f7d4f', '#7fb069', '#5e9a4a', '#e5533d', '#f2b84b', '#4a7bd0', '#f08aa0'];

/** Générateur pseudo-aléatoire reproductible (même arbre à chaque visite). */
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Décale une direction d'un angle aléatoire, avec une tendance (vers le haut ou le bas). */
function devie(dir, r, angle, tendance) {
  const axe = new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).cross(dir).normalize();
  const d = dir.clone().applyAxisAngle(axe, angle);
  return d.lerp(tendance, 0.18).normalize();
}

function useArbre(maxDepth, feuillesParPointe) {
  return useMemo(() => {
    const r = rng(7);
    const branches = [];
    const feuilles = [];
    const pousse = (start, dir, len, rad, depth) => {
      branches.push({ start, dir, len, rad, depth, racine: false });
      const end = start.clone().addScaledVector(dir, len);
      if (depth >= maxDepth) {
        for (let i = 0; i < feuillesParPointe; i++) {
          feuilles.push({
            pos: end.clone().add(new THREE.Vector3((r() - 0.5) * 1.1, (r() - 0.3) * 0.8, (r() - 0.5) * 1.1)),
            rot: new THREE.Euler(r() * 6, r() * 6, r() * 6),
            taille: 0.13 + r() * 0.13,
            couleur: PALETTE[Math.floor(r() * PALETTE.length)],
            retard: r(),
          });
        }
        return;
      }
      const n = depth === 0 ? 3 : r() < 0.45 ? 3 : 2;
      for (let i = 0; i < n; i++) {
        const nd = devie(dir, r, 0.4 + r() * 0.45, UP);
        const from = depth === 0 ? end : start.clone().addScaledVector(dir, len * (0.75 + r() * 0.25));
        pousse(from, nd, len * (0.72 + r() * 0.1), rad * 0.64, depth + 1);
      }
    };
    pousse(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), 1.7, 0.2, 0);
    // racines : vers le bas, plus courtes et plus tordues
    const DOWN = new THREE.Vector3(0, -1, 0);
    const racine = (start, dir, len, rad, depth) => {
      branches.push({ start, dir, len, rad, depth, racine: true });
      if (depth >= 3) return;
      const end = start.clone().addScaledVector(dir, len);
      for (let i = 0; i < 2; i++) racine(end, devie(dir, r, 0.5 + r() * 0.5, DOWN), len * 0.75, rad * 0.6, depth + 1);
    };
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + r();
      racine(new THREE.Vector3(0, 0.05, 0), new THREE.Vector3(Math.cos(a), -0.9, Math.sin(a)).normalize(), 0.55, 0.12, 1);
    }
    return { branches, feuilles };
  }, [maxDepth, feuillesParPointe]);
}

function Arbre({ progress, reduced, quality }) {
  const maxDepth = quality === 'low' ? 4 : 5;
  const { branches, feuilles } = useArbre(maxDepth, quality === 'low' ? 6 : 9);
  const bois = useRef();
  const feuillage = useRef();
  const volantes = useRef();
  const groupe = useRef();
  const sway = useRef({ x: 0 });
  const tmp = useMemo(
    () => ({ m: new THREE.Matrix4(), q: new THREE.Quaternion(), s: new THREE.Vector3(), c: new THREE.Color(), o: new THREE.Object3D() }),
    [],
  );
  const cyl = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.65, 1, 1, 7, 1);
    g.translate(0, 0.5, 0);
    return g;
  }, []);
  const feuilleGeo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1, 0);
    g.scale(1, 0.45, 0.8);
    return g;
  }, []);
  const quats = useMemo(() => branches.map((b) => new THREE.Quaternion().setFromUnitVectors(UP, b.dir)), [branches]);
  const NV = 26;
  const vol = useMemo(
    () =>
      Array.from({ length: NV }, (_, i) => ({
        x: (Math.sin(i * 12.9) * 0.5 + 0.5) * 5 - 2.5,
        y: 2 + (i % 7) * 0.5,
        z: Math.cos(i * 7.3) * 1.5,
        v: 0.3 + (i % 5) * 0.08,
        ph: i,
      })),
    [],
  );

  // couleurs des feuilles (une fois)
  const initCouleurs = (mesh) => {
    if (!mesh || mesh.userData.ok) return;
    feuilles.forEach((f, i) => mesh.setColorAt(i, tmp.c.set(f.couleur)));
    mesh.instanceColor.needsUpdate = true;
    mesh.userData.ok = true;
  };
  const initVolantes = (mesh) => {
    if (!mesh || mesh.userData.ok) return;
    for (let i = 0; i < NV; i++) mesh.setColorAt(i, tmp.c.set(PALETTE[i % PALETTE.length]));
    mesh.instanceColor.needsUpdate = true;
    mesh.userData.ok = true;
  };

  useFrame(({ clock }, dtRaw) => {
    const dt = Math.min(dtRaw, 1 / 20);
    const t = clock.elapsedTime;
    const p = reduced ? 1 : progress.current;
    // chronologie : racines (0 → 1,5), puis un niveau de branches par unité, puis les feuilles
    const T = p * (maxDepth + 4.2);
    const { m, s, o } = tmp;
    branches.forEach((b, i) => {
      const g = b.racine ? smooth((T * 1.6 - (b.depth - 1)) / 1) : smooth(T - 1.2 - b.depth);
      const ep = b.rad * (0.35 + 0.65 * g);
      s.set(ep, b.len * g + 1e-4, ep);
      m.compose(b.start, quats[i], s);
      bois.current.setMatrixAt(i, m);
    });
    bois.current.instanceMatrix.needsUpdate = true;
    const tf = T - 1.2 - (maxDepth + 0.6);
    feuilles.forEach((f, i) => {
      const g = smooth(tf * 1.6 - f.retard);
      o.position.copy(f.pos);
      o.rotation.copy(f.rot);
      if (!reduced) o.rotation.z += Math.sin(t * 2 + i) * 0.15;
      o.scale.setScalar(f.taille * g + 1e-4);
      o.updateMatrix();
      feuillage.current.setMatrixAt(i, o.matrix);
    });
    feuillage.current.instanceMatrix.needsUpdate = true;
    // feuilles qui s'envolent (quand l'arbre est en feuilles)
    const vis = smooth(tf);
    vol.forEach((v, i) => {
      if (!reduced) {
        v.y -= dt * v.v;
        v.x += Math.sin(t * 1.3 + v.ph) * dt * 0.4 + dt * 0.15;
        if (v.y < -0.2) {
          v.y = 3.6 + (i % 4) * 0.3;
          v.x = (Math.sin(t + i) * 0.5 + 0.5) * 4 - 2;
        }
      }
      o.position.set(v.x, v.y, v.z);
      o.rotation.set(t * 1.5 + i, t + i, 0);
      o.scale.setScalar(0.12 * vis + 1e-4);
      o.updateMatrix();
      volantes.current.setMatrixAt(i, o.matrix);
    });
    volantes.current.instanceMatrix.needsUpdate = true;
    // l'arbre ondule (vent + souris)
    sway.current.x += ((reduced ? 0 : pointer.x) - sway.current.x) * 0.04;
    if (groupe.current) {
      groupe.current.rotation.z = (reduced ? 0 : Math.sin(t * 0.8) * 0.015) - sway.current.x * 0.06;
      groupe.current.rotation.y = (reduced ? 0 : t * 0.05) + sway.current.x * 0.3;
    }
  });

  return (
    <group ref={groupe}>
      <instancedMesh ref={bois} args={[cyl, undefined, branches.length]} castShadow frustumCulled={false}>
        <meshStandardMaterial color="#6b4a32" roughness={0.9} />
      </instancedMesh>
      <instancedMesh
        ref={(el) => {
          feuillage.current = el;
          initCouleurs(el);
        }}
        args={[feuilleGeo, undefined, feuilles.length]}
        frustumCulled={false}
      >
        <meshStandardMaterial roughness={0.6} flatShading />
      </instancedMesh>
      <instancedMesh
        ref={(el) => {
          volantes.current = el;
          initVolantes(el);
        }}
        args={[feuilleGeo, undefined, NV]}
        frustumCulled={false}
      >
        <meshStandardMaterial roughness={0.6} flatShading />
      </instancedMesh>
    </group>
  );
}

/** Bloc de terre en coupe (on voit les racines à travers) avec de l'herbe sur le dessus. */
function Sol() {
  return (
    <group>
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[2.6, 2.4, 1.5, 48, 1, true]} />
        <meshStandardMaterial color="#8a5a3c" transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.4, 48]} />
        <meshStandardMaterial color="#6e452c" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.6, 48]} />
        <meshStandardMaterial color="#7fb069" roughness={1} transparent opacity={0.92} />
      </mesh>
    </group>
  );
}

function Rig({ progress, reduced, quality }) {
  const { viewport, camera } = useThree();
  const tilt = useRef({ y: 0 });
  usePointer();
  useFrame(() => {
    const p = reduced ? 1 : progress.current;
    const recul = smooth(p / 0.75); // la caméra recule à mesure que l'arbre grandit
    const mobile = viewport.aspect < 1;
    tilt.current.y += ((reduced ? 0 : pointer.y) - tilt.current.y) * 0.04;
    const loin = mobile ? 20 : 9.5;
    const pres = mobile ? 11 : 7.8;
    camera.position.set(0, 1 + recul * 1.5 + tilt.current.y * 0.8, THREE.MathUtils.lerp(pres, loin, recul));
    camera.lookAt(0, mobile ? THREE.MathUtils.lerp(-2.4, -1.4, recul) : THREE.MathUtils.lerp(-0.2, 1.5, recul), 0);
  });
  return (
    <group position={[viewport.aspect > 1.2 ? 3.3 * (viewport.width / 12) : 0, 0, 0]} scale={0.6}>
      <Sol />
      <Arbre progress={progress} reduced={reduced} quality={quality} />
    </group>
  );
}

export default function TreeScene({ progress, reduced, tier, active, onReady }) {
  const [low, setLow] = useState(tier === 'low');
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={low ? 1 : tier === 'high' ? 1.75 : 1.5}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      shadows={!low}
      camera={{ position: [0, 1, 8], fov: 35 }}
      gl={{ antialias: !low, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setLow(true)} />
      <hemisphereLight args={['#fff8e6', '#7fb069', 1.3]} />
      <directionalLight position={[4, 8, 5]} intensity={2.2} color="#fff1d6" castShadow={!low} shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4, 2, 3]} color="#f2b84b" intensity={10} distance={12} />
      <Rig progress={progress} reduced={reduced} quality={low ? 'low' : 'high'} />
    </Canvas>
  );
}
