import { ContactShadows, Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { pointer, usePointer } from '@demos/shared/hooks/usePointer.js';
import { PROFILS, bodyShape, cabinShape } from './carGeometry';

/* ------------------------------------------------------------------
   Showroom 3D : voiture construite en code sur un plateau tournant.
   - changement de modèle : la voiture sort à gauche, la nouvelle entre à droite
   - changement de couleur : la peinture change en douceur
   - glisser pour faire tourner ; la scène suit la souris / l'inclinaison
   - défilement : la caméra se rapproche, les phares s'allument
------------------------------------------------------------------- */

const clamp01 = (t) => Math.min(1, Math.max(0, t));
const smooth = (t) => t * t * (3 - 2 * t);

function useCarParts(profilId, quality) {
  return useMemo(() => {
    const p = PROFILS[profilId];
    const curve = quality === 'low' ? 8 : 18;
    const body = new THREE.ExtrudeGeometry(bodyShape(p), {
      depth: p.W - 0.16,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.07,
      bevelSegments: quality === 'low' ? 2 : 5,
      curveSegments: curve,
    });
    body.translate(0, 0, -(p.W - 0.16) / 2);
    body.computeVertexNormals();
    const cabin = new THREE.ExtrudeGeometry(cabinShape(p), {
      depth: p.W * 0.8,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelSegments: quality === 'low' ? 2 : 4,
      curveSegments: curve,
    });
    cabin.translate(0, 0, -(p.W * 0.8) / 2);
    return { p, body, cabin };
  }, [profilId, quality]);
}

/** Une roue : pneu, jante chromée et rayons. */
function Wheel({ R, side, spin, mats, quality }) {
  const seg = quality === 'low' ? 16 : 32;
  return (
    <group rotation={[Math.PI / 2, 0, 0]} scale={[1, side, 1]}>
      <group ref={spin}>
        <mesh material={mats.tire} castShadow>
          <cylinderGeometry args={[R, R, 0.26, seg]} />
        </mesh>
        <mesh material={mats.rim} position={[0, -0.135, 0]}>
          <cylinderGeometry args={[R * 0.64, R * 0.64, 0.02, seg]} />
        </mesh>
        {[0, 1, 2, 3, 4].map((k) => (
          <mesh key={k} material={mats.chrome} position={[0, -0.15, 0]} rotation={[0, (k * Math.PI * 2) / 5, 0]}>
            <boxGeometry args={[0.06, 0.03, R * 1.2]} />
          </mesh>
        ))}
        <mesh material={mats.chrome} position={[0, -0.16, 0]}>
          <cylinderGeometry args={[R * 0.16, R * 0.16, 0.03, 16]} />
        </mesh>
      </group>
    </group>
  );
}

/** Une voiture complète. */
function Car({ profilId, color, lightsOn, quality, slide, spinRefs }) {
  const { p, body, cabin } = useCarParts(profilId, quality);
  // peinture créée une seule fois avec la couleur de départ, puis animée vers la couleur choisie
  const [paint] = useState(
    () => new THREE.MeshPhysicalMaterial({ color, metalness: 0.55, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.08 }),
  );
  const mats = useMemo(
    () => ({
      glass: new THREE.MeshPhysicalMaterial({ color: '#0d1117', metalness: 0.6, roughness: 0.05, clearcoat: 1 }),
      tire: new THREE.MeshStandardMaterial({ color: '#141414', roughness: 0.9 }),
      rim: new THREE.MeshStandardMaterial({ color: '#2a2d33', metalness: 0.8, roughness: 0.35 }),
      chrome: new THREE.MeshStandardMaterial({ color: '#dfe3e8', metalness: 1, roughness: 0.12 }),
      head: new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#fff6e0', emissiveIntensity: 0 }),
      tail: new THREE.MeshStandardMaterial({ color: '#5a0000', emissive: '#ff1a1a', emissiveIntensity: 0.4 }),
      trim: new THREE.MeshStandardMaterial({ color: '#0b0b0c', roughness: 0.6 }),
    }),
    [],
  );
  const target = useMemo(() => new THREE.Color(color), [color]);
  const beams = useRef([]);
  useFrame((_, dt) => {
    paint.color.lerp(target, Math.min(1, dt * 4));
    const on = lightsOn.current;
    mats.head.emissiveIntensity += ((on ? 3 : 0.15) - mats.head.emissiveIntensity) * Math.min(1, dt * 5);
    mats.tail.emissiveIntensity += ((on ? 1.6 : 0.4) - mats.tail.emissiveIntensity) * Math.min(1, dt * 5);
    beams.current.forEach((b) => b && (b.material.opacity = Math.max(0, mats.head.emissiveIntensity - 0.15) * 0.03));
  });
  const half = p.L / 2;
  const zw = p.W / 2 - 0.12;
  return (
    <group ref={slide}>
      <mesh geometry={body} material={paint} castShadow receiveShadow />
      <mesh geometry={cabin} material={mats.glass} castShadow />
      {/* bas de caisse et boucliers */}
      <mesh material={mats.trim} position={[0, p.sill + 0.02, 0]}>
        <boxGeometry args={[p.L * 0.55, 0.08, p.W + 0.02]} />
      </mesh>
      {/* phares et feux */}
      {[-1, 1].map((sd) => (
        <group key={sd}>
          <mesh material={mats.head} position={[half - 0.02, p.hood - 0.13, sd * (zw - 0.12)]}>
            <boxGeometry args={[0.12, 0.09, 0.34]} />
          </mesh>
          {/* faisceau lumineux des phares */}
          <mesh
            ref={(el) => (beams.current[sd > 0 ? 0 : 1] = el)}
            position={[half + 1.6, p.hood - 0.3, sd * (zw - 0.12)]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <coneGeometry args={[0.7, 3.2, 24, 1, true]} />
            <meshBasicMaterial
              color="#fff1d6"
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh material={mats.tail} position={[p.body ? -half - 0.06 : -half - 0.03, p.belt - 0.12, sd * (zw - 0.08)]}>
            <boxGeometry args={[0.08, 0.1, 0.36]} />
          </mesh>
        </group>
      ))}
      {/* rétroviseurs */}
      {[-1, 1].map((sd) => (
        <mesh key={'m' + sd} material={paint} position={[p.cabin[3][0] - 0.12, p.belt + 0.08, sd * (p.W / 2 + 0.05)]}>
          <boxGeometry args={[0.16, 0.1, 0.12]} />
        </mesh>
      ))}
      {/* roues */}
      {p.wheels.map((x, i) =>
        [-1, 1].map((sd) => (
          <group key={`${i}${sd}`} position={[x, p.R, sd * (p.W / 2 - 0.08)]}>
            <Wheel R={p.R} side={-sd} spin={(el) => (spinRefs.current[i * 2 + (sd > 0 ? 1 : 0)] = el)} mats={mats} quality={quality} />
          </group>
        )),
      )}
    </group>
  );
}

/** Plateau tournant + voiture + logique de changement de modèle. */
function Showroom({ modelId, color, progress, reduced, quality, drag }) {
  const turntable = useRef();
  const slide = useRef();
  const spinRefs = useRef([]);
  const lightsOn = useRef(false);
  const [shown, setShown] = useState(modelId);
  const anim = useRef({ phase: 'idle', t: 0 });
  const tilt = useRef({ x: 0, y: 0 });
  const angle = useRef(-0.6);
  const { camera, viewport } = useThree();
  usePointer();
  const fondu = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(64, 64, 10, 64, 64, 64);
    grad.addColorStop(0, '#fff');
    grad.addColorStop(0.5, '#999');
    grad.addColorStop(0.85, '#000');
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);

  useEffect(() => {
    if (modelId === shown) return;
    if (reduced) setShown(modelId);
    else anim.current = { phase: 'out', t: 0 };
  }, [modelId, shown, reduced]);

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 1 / 20);
    const p = reduced ? 0 : progress.current;
    const a = anim.current;
    let x = 0;
    let wheelSpeed = 0;
    if (a.phase === 'out') {
      a.t += dt / 0.55;
      x = -Math.pow(clamp01(a.t), 2) * 9;
      wheelSpeed = 14 * a.t;
      if (a.t >= 1) {
        setShown(modelId);
        anim.current = { phase: 'in', t: 0 };
      }
    } else if (a.phase === 'in') {
      a.t += dt / 0.8;
      const e = 1 - Math.pow(1 - clamp01(a.t), 3);
      x = (1 - e) * 9;
      wheelSpeed = 14 * (1 - e);
      if (a.t >= 1) anim.current = { phase: 'idle', t: 0 };
    }
    if (slide.current) slide.current.position.x = x;
    spinRefs.current.forEach((w) => w && (w.rotation.y -= wheelSpeed * dt));

    // rotation : automatique, ou au doigt / à la souris
    if (!reduced && !drag.current.active && a.phase === 'idle') angle.current += dt * (0.25 - smooth(clamp01(p * 1.6)) * 0.2);
    angle.current += drag.current.delta;
    drag.current.delta *= 0.85;
    if (turntable.current) turntable.current.rotation.y = angle.current;

    // phares allumés au défilement
    lightsOn.current = p > 0.35 || reduced;

    // caméra : suit la souris, se rapproche au défilement
    const t = tilt.current;
    t.x += ((reduced ? 0 : pointer.x) - t.x) * 0.05;
    t.y += ((reduced ? 0 : pointer.y) - t.y) * 0.05;
    // recul adapté à l'écran : la voiture tient en largeur sur téléphone
    const mobile = viewport.aspect < 0.8;
    const dist = mobile ? 19 : viewport.aspect < 1.3 ? 13 : 11.5;
    const e = smooth(clamp01(p * 1.4));
    camera.position.set(t.x * 1.4, 2.6 - e * 0.9 + t.y * 0.5, dist - e * (mobile ? 1 : 2.2));
    camera.lookAt(0, mobile ? 1.1 : 0.9, 0);
  });

  const R = 2.9;
  return (
    <group>
      <group ref={turntable}>
        <mesh position={[0, -0.04, 0]} receiveShadow>
          <cylinderGeometry args={[R, R, 0.08, quality === 'low' ? 48 : 96]} />
          <meshStandardMaterial color="#141416" metalness={0.6} roughness={0.25} />
        </mesh>
        <Car profilId={shown} color={color} lightsOn={lightsOn} quality={quality} slide={slide} spinRefs={spinRefs} />
      </group>
      {/* anneau lumineux */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[R + 0.02, R + 0.08, 96]} />
        <meshBasicMaterial color="#e10600" toneMapped={false} />
      </mesh>
      {/* sol du showroom : s'efface en dégradé pour se fondre dans le fond de chaque étape */}
      <mesh position={[0, -0.09, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5.2, 64]} />
        <meshStandardMaterial color="#0b0b0c" roughness={0.5} metalness={0.3} transparent alphaMap={fondu} depthWrite={false} />
      </mesh>
      {quality !== 'low' && (
        <ContactShadows position={[0, 0.002, 0]} scale={9} blur={2.2} opacity={0.75} far={2.5} frames={Infinity} resolution={256} />
      )}
    </group>
  );
}

export default function CarScene({ modelId, color, progress, reduced, tier, active, onReady, onSlow, drag }) {
  // téléphone : version allégée (résolution réduite, pas d'ombres)
  const petit = typeof window !== 'undefined' && window.innerWidth < 768;
  const [low, setLow] = useState(tier === 'low' || petit);
  const quality = low ? 'low' : 'high';
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={petit ? 1.25 : low ? 1 : tier === 'high' ? 1.75 : 1.5}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      shadows={!low}
      camera={{ position: [0, 2.1, 8.6], fov: 32 }}
      gl={{ antialias: !low, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setLow(true)} flipflops={3} onFallback={() => onSlow?.()} />
      <hemisphereLight args={['#ffffff', '#111111', 0.5]} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} castShadow={!low} shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-6, 5, -4]} angle={0.5} penumbra={1} intensity={60} color="#ff2a1a" distance={20} />
      <Environment resolution={low ? 32 : 128} frames={1}>
        <Lightformer form="rect" intensity={4} color="#ffffff" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[-6, 2, 3]} scale={[3, 6, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#ff3b2e" position={[6, 1.5, -2]} scale={[2, 5, 1]} />
      </Environment>
      <Showroom modelId={modelId} color={color} progress={progress} reduced={reduced} quality={quality} drag={drag} />
    </Canvas>
  );
}
