import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { pointer, usePointer } from '@demos/shared/hooks/usePointer.js';

/* ------------------------------------------------------------------
   « Prenez le bon cap » en 3D, construit en code :
   - un graphique en barres posé sur une grille : au départ les chiffres
     stagnent et zigzaguent ; au défilement, ils se redressent en une
     croissance régulière, et une courbe se dessine au sommet des barres ;
   - une boussole flotte au-dessus : son aiguille hésite (et suit la
     souris), puis se stabilise sur le cap quand la croissance est là.
------------------------------------------------------------------- */

const clamp01 = (t) => Math.min(1, Math.max(0, t));
const smooth = (t) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};
const N = 12;
const ECART = 0.6;
const X0 = -((N - 1) * ECART) / 2;
const AVANT = [1.1, 1.3, 0.9, 1.25, 0.8, 1.05, 0.7, 1.0, 0.75, 0.95, 0.65, 0.8]; // stagnation
const APRES = Array.from({ length: N }, (_, i) => 0.55 + 3.0 * Math.pow(i / (N - 1), 1.35)); // croissance
const CIEL = new THREE.Color('#c9d6ff');
const COBALT = new THREE.Color('#3d6bff');

/** Cadran de la boussole (graduations et points cardinaux) dessiné sur une texture. */
function useCadran() {
  return useMemo(() => {
    const S = 512;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const x = c.getContext('2d');
    x.fillStyle = '#fbfaf7';
    x.beginPath();
    x.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
    x.fill();
    x.translate(S / 2, S / 2);
    for (let i = 0; i < 72; i++) {
      x.save();
      x.rotate((i / 72) * Math.PI * 2);
      x.fillStyle = i % 9 === 0 ? '#0f1b2d' : '#9aa0aa';
      const long = i % 9 === 0 ? 34 : 16;
      x.fillRect(-1.5, -S / 2 + 18, 3, long);
      x.restore();
    }
    x.fillStyle = '#0f1b2d';
    x.font = '600 54px Georgia, serif';
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    [
      ['N', 0],
      ['E', 1],
      ['S', 2],
      ['O', 3],
    ].forEach(([l, k]) => {
      const a = (k * Math.PI) / 2;
      x.fillStyle = l === 'N' ? '#3d6bff' : '#0f1b2d';
      x.fillText(l, Math.sin(a) * 160, -Math.cos(a) * 160);
    });
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function Boussole({ progress, reduced }) {
  const aiguille = useRef();
  const groupe = useRef();
  const etat = useRef({ a: 0.8, v: 0 });
  const cadran = useCadran();
  const metal = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c9ccd2', metalness: 1, roughness: 0.22 }), []);
  useFrame(({ clock }, dtRaw) => {
    const dt = Math.min(dtRaw, 1 / 30);
    const t = clock.elapsedTime;
    const p = reduced ? 1 : progress.current;
    const calme = smooth((p - 0.35) / 0.45);
    // cible : hésitation + souris au début, cap fixe (nord-est) à la fin
    const hesite = Math.sin(t * 1.7) * 1.1 + Math.sin(t * 0.63 + 2) * 0.8 + pointer.x * 1.4;
    const cible = THREE.MathUtils.lerp(reduced ? -0.6 : hesite, -0.6, calme);
    // ressort amorti : l'aiguille dépasse un peu puis se stabilise, comme une vraie boussole
    const e = etat.current;
    e.v += (cible - e.a) * 18 * dt;
    e.v *= Math.pow(0.04, dt);
    e.a += e.v * dt * 6;
    if (aiguille.current) aiguille.current.rotation.z = e.a;
    if (groupe.current) {
      groupe.current.position.y = 4.1 + (reduced ? 0 : Math.sin(t * 0.9) * 0.08);
      groupe.current.rotation.x = -0.35 + pointer.y * 0.15 * (reduced ? 0 : 1);
      groupe.current.rotation.y = 0.25 + pointer.x * 0.2 * (reduced ? 0 : 1);
    }
  });
  return (
    <group ref={groupe} position={[-2.2, 4.1, 0.6]}>
      <mesh material={metal}>
        <torusGeometry args={[0.92, 0.07, 20, 72]} />
      </mesh>
      <mesh material={metal} position={[0, 0, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 0.08, 64]} />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <circleGeometry args={[0.88, 64]} />
        <meshStandardMaterial map={cadran} roughness={0.6} />
      </mesh>
      <group ref={aiguille} position={[0, 0, 0.04]}>
        <mesh position={[0, 0.34, 0]}>
          <coneGeometry args={[0.08, 0.68, 4]} />
          <meshStandardMaterial color="#3d6bff" metalness={0.3} roughness={0.3} emissive="#3d6bff" emissiveIntensity={0.25} />
        </mesh>
        <mesh position={[0, -0.34, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.08, 0.68, 4]} />
          <meshStandardMaterial color="#0f1b2d" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh material={metal} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.06, 20]} />
        </mesh>
      </group>
      {/* verre bombé */}
      <mesh position={[0, 0, 0.08]} scale={[1, 1, 0.18]}>
        <sphereGeometry args={[0.88, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.12} roughness={0.02} clearcoat={1} envMapIntensity={2} />
      </mesh>
    </group>
  );
}

function Graphique({ progress, reduced, quality }) {
  const barres = useRef();
  const courbe = useRef();
  const point = useRef();
  const dernier = useRef(-1);
  const o = useMemo(() => new THREE.Object3D(), []);
  const c = useMemo(() => new THREE.Color(), []);
  const hauteurs = useMemo(() => new Float32Array(N), []);
  const grille = useMemo(() => {
    const pts = [];
    for (let i = -5; i <= 5; i++) {
      pts.push(i * 0.8, 0, -3, i * 0.8, 0, 3);
      pts.push(-4, 0, i * 0.6, 4, 0, i * 0.6);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = reduced ? 1 : progress.current;
    for (let i = 0; i < N; i++) {
      const k = smooth(p * 1.6 - i * 0.05);
      const h = THREE.MathUtils.lerp(AVANT[i], APRES[i], k) + (reduced ? 0 : Math.sin(t * 1.3 + i) * 0.03 * (1 - k));
      hauteurs[i] = h;
      o.position.set(X0 + i * ECART, h / 2, 0);
      o.scale.set(0.38, h, 0.38);
      o.updateMatrix();
      barres.current.setMatrixAt(i, o.matrix);
      barres.current.setColorAt(i, c.copy(CIEL).lerp(COBALT, clamp01((h - 0.5) / 3) * k + 0.15));
    }
    barres.current.instanceMatrix.needsUpdate = true;
    if (barres.current.instanceColor) barres.current.instanceColor.needsUpdate = true;
    // courbe au sommet des barres : reconstruite seulement si les barres ont bougé
    const cle = Math.round(p * 400);
    if (cle !== dernier.current || dernier.current < 0) {
      dernier.current = cle;
      const pts = Array.from({ length: N }, (_, i) => new THREE.Vector3(X0 + i * ECART, hauteurs[i] + 0.12, 0));
      const tube = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), quality === 'low' ? 60 : 120, 0.035, 8, false);
      courbe.current.geometry.dispose();
      courbe.current.geometry = tube;
      point.current.position.copy(pts[N - 1]);
    }
    const s = 1 + Math.sin(t * 3) * 0.15;
    point.current.scale.setScalar(s * (0.6 + 0.4 * smooth(p * 1.5)));
  });

  return (
    <group>
      <lineSegments geometry={grille}>
        <lineBasicMaterial color="#0f1b2d" transparent opacity={0.12} />
      </lineSegments>
      <instancedMesh ref={barres} args={[undefined, undefined, N]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.35} metalness={0.1} envMapIntensity={0.8} />
      </instancedMesh>
      <mesh ref={courbe}>
        <bufferGeometry />
        <meshStandardMaterial color="#0f1b2d" roughness={0.4} />
      </mesh>
      <mesh ref={point}>
        <sphereGeometry args={[0.13, 24, 16]} />
        <meshStandardMaterial color="#3d6bff" emissive="#3d6bff" emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Rig({ progress, reduced, quality }) {
  const scene = useRef();
  const tilt = useRef({ x: 0, y: 0 });
  const { viewport, camera } = useThree();
  usePointer();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const tl = tilt.current;
    tl.x += ((reduced ? 0 : pointer.x) - tl.x) * 0.05;
    tl.y += ((reduced ? 0 : pointer.y) - tl.y) * 0.05;
    const p = reduced ? 1 : progress.current;
    if (scene.current) scene.current.rotation.y = -0.45 + tl.x * 0.25 + (reduced ? 0 : Math.sin(t * 0.2) * 0.05) + smooth(p) * 0.25;
    const mobile = viewport.aspect < 1;
    camera.position.set(tl.x * 0.6, 2.8 + tl.y * 0.4, mobile ? 15 : 10.5);
    camera.lookAt(0, mobile ? -0.6 : 2.1, 0);
  });
  const large = viewport.aspect > 1.2;
  return (
    <group position={[large ? 3.1 : 0, large ? 0 : 0.3, 0]} scale={large ? 0.82 : viewport.aspect < 1 ? 0.5 : 0.78}>
      <group ref={scene}>
        <Graphique progress={progress} reduced={reduced} quality={quality} />
      </group>
      <Boussole progress={progress} reduced={reduced} />
    </group>
  );
}

export default function HorizonScene({ progress, reduced, tier, active, onReady }) {
  const [low, setLow] = useState(tier === 'low');
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={low ? 1 : tier === 'high' ? 1.75 : 1.5}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      camera={{ position: [0, 2.8, 10.5], fov: 35 }}
      gl={{ antialias: !low, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setLow(true)} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 8, 6]} intensity={1.8} />
      <pointLight position={[-4, 3, 4]} color="#3d6bff" intensity={8} distance={14} />
      <Environment resolution={low ? 32 : 64} frames={1}>
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 6, 3]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#c9d6ff" position={[-6, 1, 2]} scale={[2, 6, 1]} />
      </Environment>
      <Rig progress={progress} reduced={reduced} quality={low ? 'low' : 'high'} />
    </Canvas>
  );
}
