import { Environment, Lightformer, PerformanceMonitor, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { pointer, usePointer } from '@demos/shared/hooks/usePointer.js';

/* ------------------------------------------------------------------
   Un appareil photo construit en code. Au défilement :
   1) l'objectif zoome (il s'allonge) et l'appareil se tourne vers vous ;
   2) on plonge dans l'objectif, le diaphragme se ferme puis se rouvre
      (le « clic » de l'obturateur, accompagné d'un flash côté interface).
   L'appareil suit la souris (ou l'inclinaison du téléphone).
------------------------------------------------------------------- */

const clamp01 = (t) => Math.min(1, Math.max(0, t));
const smooth = (t) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};
const AMBRE = '#e0a95f';
const LAMES = 9;

/** Diaphragme dessiné sur une texture : 9 lames et une ouverture polygonale. */
function useDiaphragme() {
  return useMemo(() => {
    const S = 256;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const x = c.getContext('2d');
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    let last = -1;
    const dessine = (ouverture) => {
      if (Math.abs(ouverture - last) < 0.003) return;
      last = ouverture;
      const C = S / 2;
      const R = (0.08 + ouverture * 0.84) * C; // rayon de l'ouverture
      const rot = ouverture * 1.2; // les lames tournent en s'ouvrant
      x.clearRect(0, 0, S, S);
      x.save();
      x.beginPath();
      x.arc(C, C, C, 0, Math.PI * 2);
      x.clip();
      x.fillStyle = '#161616';
      x.fillRect(0, 0, S, S);
      const pts = Array.from({ length: LAMES }, (_, i) => {
        const a = rot + (i / LAMES) * Math.PI * 2;
        return [C + Math.cos(a) * R, C + Math.sin(a) * R, a];
      });
      // chaque lame : du sommet de l'ouverture vers le bord, en spirale
      pts.forEach(([px, py, a], i) => {
        const [nx, ny] = pts[(i + 1) % LAMES];
        const b = a + 2.2;
        x.beginPath();
        x.moveTo(px, py);
        x.lineTo(nx, ny);
        x.lineTo(C + Math.cos(b) * C * 1.6, C + Math.sin(b) * C * 1.6);
        x.lineTo(C + Math.cos(a + 1.5) * C * 1.6, C + Math.sin(a + 1.5) * C * 1.6);
        x.closePath();
        const g = 22 + (i % 3) * 7;
        x.fillStyle = `rgb(${g},${g},${g})`;
        x.fill();
        x.strokeStyle = 'rgba(255,255,255,0.08)';
        x.lineWidth = 1.5;
        x.stroke();
      });
      // l'ouverture laisse voir le fond (transparent)
      x.globalCompositeOperation = 'destination-out';
      x.beginPath();
      pts.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py)));
      x.closePath();
      x.fill();
      x.globalCompositeOperation = 'source-over';
      x.restore();
      tex.needsUpdate = true;
    };
    return { tex, dessine };
  }, []);
}

/** Bague crantée (texture de stries pour les bagues de zoom et de mise au point). */
function useStries() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 16;
    const x = c.getContext('2d');
    x.fillStyle = '#1a1a1a';
    x.fillRect(0, 0, 256, 16);
    for (let i = 0; i < 256; i += 4) {
      x.fillStyle = '#3a3a3a';
      x.fillRect(i, 0, 2, 16);
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.set(6, 1);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function Boitier({ cuir, metal, noir }) {
  return (
    <group>
      {/* corps */}
      <RoundedBox args={[3.2, 2, 1.2]} radius={0.14} smoothness={4} material={cuir} castShadow />
      {/* poignée */}
      <RoundedBox args={[0.7, 1.9, 1.5]} radius={0.25} smoothness={4} position={[-1.3, -0.02, 0.2]} material={cuir} />
      {/* capot supérieur métallique */}
      <RoundedBox args={[3.1, 0.32, 1.1]} radius={0.08} smoothness={3} position={[0, 1.1, 0]} material={metal} />
      {/* viseur */}
      <mesh position={[0.15, 1.38, 0]} material={metal}>
        <boxGeometry args={[1.1, 0.5, 0.95]} />
      </mesh>
      <mesh position={[0.15, 1.38, -0.5]} material={noir}>
        <boxGeometry args={[0.55, 0.3, 0.06]} />
      </mesh>
      {/* molettes et déclencheur */}
      <mesh position={[1.05, 1.34, 0.1]} material={metal}>
        <cylinderGeometry args={[0.28, 0.28, 0.16, 32]} />
      </mesh>
      <mesh position={[-1.15, 1.3, 0.35]} material={metal}>
        <cylinderGeometry args={[0.15, 0.17, 0.12, 24]} />
      </mesh>
      <mesh position={[-1.15, 1.38, 0.35]}>
        <cylinderGeometry args={[0.09, 0.09, 0.06, 20]} />
        <meshStandardMaterial color={AMBRE} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* petite lampe d'autofocus */}
      <mesh position={[-0.75, 0.6, 0.61]}>
        <circleGeometry args={[0.07, 20]} />
        <meshBasicMaterial color={AMBRE} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Objectif({ zoom, iris, quality, metal, noir }) {
  const stries = useStries();
  const bagueMat = useMemo(() => new THREE.MeshStandardMaterial({ map: stries, roughness: 0.7, metalness: 0.2 }), [stries]);
  const verre = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#0b1220',
        metalness: 0.2,
        roughness: 0.04,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        transparent: true,
        opacity: 0.35,
        envMapIntensity: 2.2,
        iridescence: quality === 'low' ? 0 : 0.6,
        iridescenceIOR: 1.5,
      }),
    [quality],
  );
  const diaph = useDiaphragme();
  const avant = useRef();
  const tube = useRef();
  const seg = quality === 'low' ? 32 : 64;

  useFrame(() => {
    const z = zoom.current; // 0 → 1
    const L = 1.0 + z * 0.9; // longueur du fût
    if (tube.current) {
      tube.current.scale.z = L;
    }
    if (avant.current) avant.current.position.z = 0.6 + L;
    diaph.dessine(iris.current);
  });

  return (
    <group>
      {/* fût (mis à l'échelle en profondeur pour le zoom) */}
      <group position={[0, 0, 0.6]}>
        <group ref={tube}>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.5]} material={noir}>
            <cylinderGeometry args={[0.72, 0.8, 1, seg, 1, true]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.3]} material={bagueMat}>
            <cylinderGeometry args={[0.83, 0.83, 0.36, seg, 1, true]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.75]} material={bagueMat}>
            <cylinderGeometry args={[0.78, 0.78, 0.22, seg, 1, true]} />
          </mesh>
        </group>
        {/* baïonnette */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.02]} material={metal}>
          <cylinderGeometry args={[0.88, 0.88, 0.08, seg]} />
        </mesh>
      </group>
      {/* face avant : bague, diaphragme, lentille */}
      <group ref={avant}>
        <mesh material={metal}>
          <torusGeometry args={[0.74, 0.05, 12, seg]} />
        </mesh>
        <mesh position={[0, 0, -0.12]}>
          <ringGeometry args={[0.66, 0.73, seg]} />
          <meshBasicMaterial color={AMBRE} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, -0.2]}>
          <circleGeometry args={[0.72, seg]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* lueur au fond du capteur */}
        <mesh position={[0, 0, -0.19]}>
          <circleGeometry args={[0.4, seg]} />
          <meshBasicMaterial color="#3a2a14" />
        </mesh>
        <mesh position={[0, 0, -0.15]}>
          <circleGeometry args={[0.72, seg]} />
          <meshStandardMaterial map={diaph.tex} transparent roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0, -0.05]} scale={[1, 1, 0.25]} material={verre}>
          <sphereGeometry args={[0.7, seg, seg / 2, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>
    </group>
  );
}

/** Points de lumière flous (bokeh) en arrière-plan. */
function Bokeh({ quality, reduced }) {
  const ref = useRef();
  const n = quality === 'low' ? 30 : 70;
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(32, 32, 10, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,0.9)');
    g.addColorStop(0.8, 'rgba(255,255,255,0.5)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g;
    x.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) a.set([(Math.random() - 0.5) * 22, (Math.random() - 0.5) * 12, -6 - Math.random() * 8], i * 3);
    g.setAttribute('position', new THREE.BufferAttribute(a, 3));
    return g;
  }, [n]);
  useFrame(({ clock }) => {
    if (!ref.current || reduced) return;
    ref.current.position.x = Math.sin(clock.elapsedTime * 0.1) * 0.6;
    ref.current.position.y = Math.cos(clock.elapsedTime * 0.13) * 0.3;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial map={tex} color={AMBRE} size={0.9} transparent opacity={0.35} depthWrite={false} sizeAttenuation />
    </points>
  );
}

function Rig({ progress, reduced, quality }) {
  const group = useRef();
  const zoom = useRef(0);
  const iris = useRef(1);
  const tilt = useRef({ x: 0, y: 0 });
  const { viewport, camera } = useThree();
  usePointer();
  const cuir = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1c1b1a', roughness: 0.85, metalness: 0.05 }), []);
  const metal = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#b9b4ab', roughness: 0.25, metalness: 0.95, envMapIntensity: 1.2 }),
    [],
  );
  const noir = useMemo(() => new THREE.MeshStandardMaterial({ color: '#141414', roughness: 0.4, metalness: 0.6 }), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = reduced ? 0 : progress.current;
    zoom.current = smooth(p / 0.45);
    // déclenchement : le diaphragme se ferme vers 80 % puis se rouvre
    const shut = Math.exp(-Math.pow((p - 0.8) / 0.05, 2));
    iris.current = reduced ? 0.7 : 0.75 - shut * 0.73 + Math.sin(t * 0.8) * 0.04;
    const tl = tilt.current;
    tl.x += ((reduced ? 0 : pointer.x) - tl.x) * 0.05;
    tl.y += ((reduced ? 0 : pointer.y) - tl.y) * 0.05;
    const face = smooth((p - 0.25) / 0.4); // l'appareil se tourne vers vous
    const mobile = viewport.aspect < 1;
    const wide = viewport.aspect > 1.2;
    if (group.current) {
      group.current.rotation.y =
        THREE.MathUtils.lerp(-0.75 + (reduced ? 0 : Math.sin(t * 0.3) * 0.08), 0, face) + tl.x * 0.35 * (1 - face * 0.6);
      group.current.rotation.x = THREE.MathUtils.lerp(0.22, 0, face) - tl.y * 0.2 * (1 - face * 0.6);
      group.current.position.x = THREE.MathUtils.lerp(wide ? 2.3 : 0, 0, face);
      group.current.position.y = THREE.MathUtils.lerp(mobile ? 1.9 : 0, 0, face);
    }
    // plongée dans l'objectif
    const dive = smooth((p - 0.45) / 0.35);
    const lensFront = 0.6 + 1.0 + zoom.current * 0.9;
    const z0 = mobile ? 13 : 9;
    camera.position.set(0, 0, THREE.MathUtils.lerp(z0, lensFront + 1.5, dive));
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <group ref={group} scale={viewport.aspect < 1 ? 0.85 : 1}>
        <Boitier cuir={cuir} metal={metal} noir={noir} />
        <Objectif zoom={zoom} iris={iris} quality={quality} metal={metal} noir={noir} />
      </group>
      <Bokeh quality={quality} reduced={reduced} />
    </>
  );
}

export default function CameraScene({ progress, reduced, tier, active, onReady }) {
  const [low, setLow] = useState(tier === 'low');
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={low ? 1 : tier === 'high' ? 1.75 : 1.5}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      camera={{ position: [0, 0, 9], fov: 35 }}
      gl={{ antialias: !low, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setLow(true)} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[-4, 5, 6]} intensity={2.2} />
      <pointLight position={[3, -1, 3]} color={AMBRE} intensity={18} distance={10} />
      <Environment resolution={low ? 32 : 128} frames={1}>
        <Lightformer form="rect" intensity={4} color="#ffffff" position={[0, 5, 3]} scale={[8, 1.5, 1]} />
        <Lightformer form="rect" intensity={3} color={AMBRE} position={[-5, 0, 2]} scale={[1.5, 6, 1]} />
        <Lightformer form="ring" intensity={2.5} color="#ffffff" position={[4, 1, 4]} scale={2} />
      </Environment>
      <Rig progress={progress} reduced={reduced} quality={low ? 'low' : 'high'} />
    </Canvas>
  );
}
