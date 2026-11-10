import { ContactShadows, PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { pointer, usePointer } from '@demos/shared/hooks/usePointer.js';

/* ------------------------------------------------------------------
   Une chemise en lin sur un cintre, construite en code :
   - le tissu est une surface souple (sa forme vient d'une découpe dessinée)
   - il ondule au vent, et le vent suit la souris (ou l'inclinaison)
   - la couleur change en douceur ; au défilement, le cintre pivote.
------------------------------------------------------------------- */

const clamp01 = (t) => Math.min(1, Math.max(0, t));
const smooth = (t) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};
const W = 2.6;
const H = 3.0;

/** Découpe et texture de la chemise (trame de lin, col, boutons, coutures). */
function useShirtTextures() {
  return useMemo(() => {
    const s = 512;
    const mk = () => {
      const c = document.createElement('canvas');
      c.width = c.height = s;
      return [c, c.getContext('2d')];
    };
    // silhouette (masque alpha)
    const [ca, a] = mk();
    a.fillStyle = '#000';
    a.fillRect(0, 0, s, s);
    a.fillStyle = '#fff';
    a.beginPath();
    a.moveTo(200, 18); // col
    a.quadraticCurveTo(256, 60, 312, 18);
    a.lineTo(400, 40); // épaule droite
    a.lineTo(500, 200); // manche droite
    a.lineTo(430, 236);
    a.lineTo(388, 160);
    a.lineTo(392, 500); // bas droit
    a.quadraticCurveTo(256, 470, 120, 500);
    a.lineTo(124, 160);
    a.lineTo(82, 236);
    a.lineTo(12, 200);
    a.lineTo(112, 40);
    a.closePath();
    a.fill();
    const alpha = new THREE.CanvasTexture(ca);
    // détails : trame, patte de boutonnage, boutons, coutures (en niveaux de gris, teintés par la couleur)
    const [cd, d] = mk();
    d.fillStyle = '#ffffff';
    d.fillRect(0, 0, s, s);
    for (let y = 0; y < s; y += 3) {
      d.fillStyle = `rgba(0,0,0,${0.025 + Math.random() * 0.03})`;
      d.fillRect(0, y, s, 1);
    }
    for (let x = 0; x < s; x += 3) {
      d.fillStyle = `rgba(0,0,0,${0.02 + Math.random() * 0.025})`;
      d.fillRect(x, 0, 1, s);
    }
    for (let i = 0; i < 260; i++) {
      d.fillStyle = 'rgba(0,0,0,0.06)';
      d.fillRect(Math.random() * s, Math.random() * s, 8 + Math.random() * 30, 1.5); // flammes du lin
    }
    d.strokeStyle = 'rgba(0,0,0,0.22)';
    d.lineWidth = 3;
    d.beginPath();
    d.moveTo(256, 50);
    d.lineTo(256, 480);
    d.stroke();
    d.beginPath();
    d.moveTo(200, 18);
    d.quadraticCurveTo(256, 70, 312, 18);
    d.stroke();
    d.setLineDash([6, 6]);
    [
      [124, 160, 112, 40],
      [388, 160, 400, 40],
    ].forEach(([x1, y1, x2, y2]) => {
      d.beginPath();
      d.moveTo(x1, y1);
      d.lineTo(x2, y2);
      d.stroke();
    });
    d.setLineDash([]);
    for (let y = 100; y < 470; y += 70) {
      d.fillStyle = 'rgba(255,255,255,0.9)';
      d.beginPath();
      d.arc(268, y, 7, 0, Math.PI * 2);
      d.fill();
      d.strokeStyle = 'rgba(0,0,0,0.3)';
      d.lineWidth = 1.5;
      d.stroke();
    }
    // poche poitrine
    d.strokeStyle = 'rgba(0,0,0,0.18)';
    d.lineWidth = 2;
    d.strokeRect(160, 120, 60, 66);
    const detail = new THREE.CanvasTexture(cd);
    detail.colorSpace = THREE.SRGBColorSpace;
    return { alpha, detail };
  }, []);
}

function Shirt({ color, progress, reduced, quality }) {
  const mesh = useRef();
  const wind = useRef({ x: 0, y: 0 });
  const { alpha, detail } = useShirtTextures();
  const geo = useMemo(() => {
    const seg = quality === 'low' ? [20, 24] : [40, 48];
    const g = new THREE.PlaneGeometry(W, H, seg[0], seg[1]);
    g.translate(0, -H / 2, 0);
    return g;
  }, [quality]);
  const base = useMemo(() => geo.attributes.position.array.slice(), [geo]);
  // matière créée une fois (couleur de départ), puis la couleur est animée vers le coloris choisi
  const [mat] = useState(
    () => new THREE.MeshStandardMaterial({ map: detail, alphaMap: alpha, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.95, color }),
  );
  const target = useMemo(() => new THREE.Color(color), [color]);

  useFrame(({ clock }, dt) => {
    mat.color.lerp(target, Math.min(1, dt * 3));
    const t = reduced ? 0 : clock.elapsedTime;
    const p = reduced ? 0 : progress.current;
    const wd = wind.current;
    wd.x += ((reduced ? 0 : pointer.x) - wd.x) * 0.03;
    wd.y += ((reduced ? 0 : pointer.y) - wd.y) * 0.03;
    const gust = 0.25 + 0.15 * Math.sin(t * 0.7) + Math.abs(wd.x) * 0.5 + p * 0.3;
    const pos = geo.attributes.position;
    const a = pos.array;
    for (let i = 0; i < a.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      const hang = clamp01(-y / H); // 0 en haut (fixé au cintre) → 1 en bas
      const k = Math.pow(hang, 1.3);
      a[i] = x + wd.x * 0.35 * k + Math.sin(t * 1.3 + y * 2.2) * 0.04 * k;
      a[i + 1] = y + Math.abs(wd.x) * 0.08 * k;
      a[i + 2] = (Math.sin(t * 2 + x * 2.4 + y * 1.6) * 0.16 + Math.sin(t * 3.3 + x * 5) * 0.05) * gust * k + wd.y * 0.25 * k;
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });
  return <mesh ref={mesh} geometry={geo} material={mat} castShadow />;
}

function Hanger() {
  const wood = useMemo(() => new THREE.MeshStandardMaterial({ color: '#b08a62', roughness: 0.6 }), []);
  const metal = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c9c3b8', metalness: 0.9, roughness: 0.3 }), []);
  const bar = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-1.2, -0.05, 0),
      new THREE.Vector3(0, 0.38, 0),
      new THREE.Vector3(1.2, -0.05, 0),
    );
    return new THREE.TubeGeometry(curve, 32, 0.045, 12, false);
  }, []);
  return (
    <group>
      <mesh geometry={bar} material={wood} castShadow />
      <mesh material={metal} position={[0, 0.48, 0]}>
        <torusGeometry args={[0.16, 0.018, 8, 32, Math.PI * 1.4]} />
      </mesh>
      <mesh material={metal} position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.2, 8]} />
      </mesh>
    </group>
  );
}

function Rig({ color, progress, reduced, quality }) {
  const group = useRef();
  const { viewport, camera } = useThree();
  usePointer();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = reduced ? 0 : progress.current;
    if (group.current) {
      group.current.rotation.y = (reduced ? 0 : Math.sin(t * 0.4) * 0.15) + smooth(p) * Math.PI * 1.15;
      group.current.rotation.z = reduced ? 0 : Math.sin(t * 0.6) * 0.03;
    }
    const mobile = viewport.aspect < 1;
    camera.position.set(0, 0.2, mobile ? 14 : 8);
    camera.lookAt(0, mobile ? -2 : -0.1, 0);
  });
  return (
    <group position={[viewport.width > 7 ? 2.6 : 0, 1.4, 0]}>
      <group ref={group}>
        <Hanger />
        <group position={[0, 0.05, 0]}>
          <Shirt color={color} progress={progress} reduced={reduced} quality={quality} />
        </group>
      </group>
    </group>
  );
}

export default function ClothScene({ color, progress, reduced, tier, active, onReady }) {
  const [low, setLow] = useState(tier === 'low');
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={low ? 1 : tier === 'high' ? 1.75 : 1.5}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      shadows={!low}
      camera={{ position: [0, 0.2, 7], fov: 35 }}
      gl={{ antialias: !low, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setLow(true)} />
      <hemisphereLight args={['#ffffff', '#cbb9a0', 1.1]} />
      <directionalLight position={[-3, 5, 5]} intensity={2.2} castShadow={!low} shadow-mapSize={[1024, 1024]} />
      <pointLight position={[3, 0, 3]} color="#ffe6cc" intensity={10} distance={10} />
      <Rig color={color} progress={progress} reduced={reduced} quality={low ? 'low' : 'high'} />
      {!low && <ContactShadows position={[0, -2.2, 0]} scale={8} blur={3} opacity={0.25} far={4} frames={Infinity} resolution={256} />}
    </Canvas>
  );
}
