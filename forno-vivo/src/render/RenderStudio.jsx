import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { pizzas } from '../data/pizzas';
import { Pizza3D } from '../three/Pizza3D';
import { rand, woodTexture } from '../three/textures';
import { TOPPINGS } from '../three/toppings';

const params = new URLSearchParams(location.search);
const shot = params.get('shot') ?? 'pizza';
const id = params.get('pizza') ?? 'margherita';

/** Signale au script que l'image est prête (après quelques images rendues). */
function Ready() {
  const n = useRef(0);
  useFrame(() => {
    n.current++;
    if (n.current === 40) window.__ready = true;
  });
  return null;
}

function Cam({ pos, look = [0, 0, 0], fov }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...pos);
    if (fov) camera.fov = fov;
    camera.lookAt(...look);
    camera.updateProjectionMatrix();
  }, [camera, pos, look, fov]);
  return null;
}

function Lights({ fire = 1 }) {
  return (
    <>
      <hemisphereLight args={['#ffd9a8', '#2a120a', 0.7]} />
      <directionalLight
        position={[2.5, 6, 3.5]}
        intensity={2.4}
        color="#ffc488"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />
      <spotLight position={[0, 2.5, -4.5]} angle={0.7} penumbra={1} intensity={30} color="#ff9a52" distance={12} />
      <pointLight position={[-2.4, 0.9, -2.2]} color="#ff6a1f" intensity={26 * fire} distance={9} decay={1.6} />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2} color="#ffd2a0" position={[0, 4, 2]} scale={[6, 2, 1]} />
        <Lightformer form="ring" intensity={3} color="#ff7a2e" position={[-4, 1, -3]} scale={2} />
      </Environment>
    </>
  );
}

/** Four à bois : voûte en briques, bouche en arc, braises. */
function Oven() {
  const bricks = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 512;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#3a1f16';
    ctx.fillRect(0, 0, 512, 512);
    const rows = 16;
    for (let r = 0; r < rows; r++) {
      for (let k = 0; k < 9; k++) {
        const w = 512 / 8;
        const x = k * w - (r % 2 ? w / 2 : 0);
        const shade = 0.75 + rand(r * 13 + k) * 0.35;
        ctx.fillStyle = `rgb(${Math.round(150 * shade)},${Math.round(70 * shade)},${Math.round(48 * shade)})`;
        ctx.fillRect(x + 2, r * (512 / rows) + 2, w - 4, 512 / rows - 4);
      }
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(3, 1.5);
    return t;
  }, []);
  const embers = useMemo(
    () => Array.from({ length: 40 }, (_, i) => [(rand(i) - 0.5) * 1.6, rand(i + 50) * 0.12, -1.2 - rand(i + 90) * 0.7, rand(i + 7)]),
    [],
  );
  // façade en briques percée d'une bouche en arc
  const facade = useMemo(() => {
    const sh = new THREE.Shape();
    sh.moveTo(-2.3, 0);
    sh.lineTo(2.3, 0);
    sh.lineTo(2.3, 2.2);
    sh.quadraticCurveTo(0, 3.4, -2.3, 2.2);
    sh.lineTo(-2.3, 0);
    const hole = new THREE.Path();
    hole.moveTo(-0.95, 0.12);
    hole.lineTo(0.95, 0.12);
    hole.lineTo(0.95, 0.85);
    hole.absarc(0, 0.85, 0.95, 0, Math.PI, false);
    hole.lineTo(-0.95, 0.12);
    sh.holes.push(hole);
    const g = new THREE.ExtrudeGeometry(sh, {
      depth: 0.35,
      bevelEnabled: true,
      bevelSize: 0.03,
      bevelThickness: 0.03,
      bevelSegments: 2,
      curveSegments: 40,
    });
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 0.22, uv.getY(i) * 0.22);
    return g;
  }, []);
  const flames = useMemo(
    () => Array.from({ length: 9 }, (_, i) => [(rand(i + 3) - 0.5) * 1.1, 0.35 + rand(i + 5) * 0.45, rand(i + 8) * 0.3, rand(i)]),
    [],
  );
  return (
    <group>
      {/* voûte */}
      <mesh position={[0, 0, -2.3]} castShadow>
        <sphereGeometry args={[2.4, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial map={bricks} roughness={0.9} />
      </mesh>
      <mesh geometry={facade} position={[0, 0, 1.2]} castShadow>
        <meshStandardMaterial map={bricks} roughness={0.9} />
      </mesh>
      {/* intérieur du four */}
      <mesh position={[0, 1.0, 0.25]}>
        <planeGeometry args={[2.4, 2.2]} />
        <meshBasicMaterial color="#2a0c04" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.121, 0.75]}>
        <planeGeometry args={[2.2, 1.2]} />
        <meshStandardMaterial color="#3b1a10" emissive="#5a1c08" emissiveIntensity={0.6} />
      </mesh>
      {/* bûches */}
      {[
        [-0.45, 0.25, 0.4, 0.4],
        [-0.15, 0.22, 0.45, -0.5],
        [0.35, 0.24, 0.35, 0.3],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0, r, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.1, 0.8, 12]} />
          <meshStandardMaterial color="#2a160c" emissive="#ff4a10" emissiveIntensity={0.25} roughness={1} />
        </mesh>
      ))}
      {/* flammes */}
      {flames.map(([x, h, z, r], i) => (
        <mesh key={i} position={[x * 0.8, 0.28 + h / 2, 0.45 + z]} scale={[0.16 + r * 0.12, h, 0.16 + r * 0.12]}>
          <coneGeometry args={[1, 1, 16]} />
          <meshBasicMaterial
            color={r > 0.5 ? '#ffb347' : '#ff6a1a'}
            transparent
            opacity={0.75}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
      <pointLight position={[0, 0.7, 0.9]} color="#ff7a24" intensity={30} distance={5} decay={1.6} />
      <pointLight position={[0, 0.5, 2.2]} color="#ff8a3a" intensity={12} distance={5} decay={1.6} />
      {embers.map(([x, y, z, r], i) => (
        <mesh key={i} position={[x * 0.6, 0.15 + y, 0.65 + (z + 1.55) * 0.3]} scale={0.03 + r * 0.04}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={r > 0.6 ? '#ffb347' : '#ff5a14'} />
        </mesh>
      ))}
      {/* sol */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#2a1d17" roughness={1} />
      </mesh>
    </group>
  );
}

/** Ingrédients sur le plan de travail. */
function Ingredients() {
  const wood = useMemo(() => woodTexture(), []);
  const basil = TOPPINGS.basilic;
  const tomatoes = [
    [-0.9, 0.3, 0.2],
    [-0.35, 0.28, 0.75],
    [-1.3, 0.26, -0.5],
    [0.95, 0.27, 0.95],
  ];
  return (
    <group>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[5, 0.1, 3.2]} />
        <meshStandardMaterial map={wood} roughness={0.8} color="#c79a6b" />
      </mesh>
      {tomatoes.map((p, i) => (
        <group key={i} position={p}>
          <mesh castShadow scale={[0.3, 0.27, 0.3]}>
            <sphereGeometry args={[1, 40, 30]} />
            <meshPhysicalMaterial color="#c4271a" roughness={0.25} clearcoat={0.8} />
          </mesh>
          <mesh position={[0, 0.27, 0]} scale={0.07}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#3f6b26" />
          </mesh>
        </group>
      ))}
      {/* mozzarella */}
      <mesh position={[0.7, 0.3, -0.25]} castShadow scale={[0.45, 0.38, 0.45]}>
        <sphereGeometry args={[1, 48, 36]} />
        <meshPhysicalMaterial color="#fbf7ee" roughness={0.3} clearcoat={0.4} />
      </mesh>
      {/* basilic */}
      {Array.from({ length: 9 }, (_, i) => (
        <mesh
          key={i}
          geometry={basil.geo('high')}
          material={basil.mat()}
          position={[-0.2 + (rand(i) - 0.5) * 1.4, 0.04 + i * 0.01, -0.6 + (rand(i + 9) - 0.5) * 0.8]}
          rotation={[0, rand(i + 3) * 6, 0]}
          scale={0.32}
          castShadow
        />
      ))}
      {/* farine */}
      <mesh position={[1.7, 0, -0.9]} scale={[0.6, 0.18, 0.6]} castShadow>
        <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f3ecdf" roughness={1} />
      </mesh>
    </group>
  );
}

export default function RenderStudio() {
  const pizza = pizzas.find((p) => p.id === id) ?? pizzas[0];
  const pizzaShot = shot === 'pizza';
  const size = pizzaShot ? { width: 800, height: 800 } : { width: 1200, height: 900 };
  const bg = pizzaShot ? 'transparent' : 'radial-gradient(ellipse 80% 70% at 50% 70%, #5a2215 0%, #2a130d 45%, #120d0b 100%)';

  const views = {
    pizza: { pos: [0, 4.3, 3.9], fov: 36 },
    angle: { pos: [0, 2.0, 3.6], fov: 30, look: [0, 0.1, 0] },
    top: { pos: [0.01, 5.6, 0.01], fov: 30 },
    four: { pos: [0, 1.9, 8.6], fov: 34, look: [0, 1.25, 0] },
    ingredients: { pos: [0, 3.3, 3.6], fov: 38, look: [0, 0.1, 0] },
  };
  const v = views[shot] ?? views.pizza;

  return (
    <div id="shot" style={{ ...size, background: bg, position: 'relative' }}>
      <Canvas
        shadows
        dpr={1}
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
        camera={{ fov: v.fov, near: 0.1, far: 60 }}
        style={{ width: size.width, height: size.height }}
      >
        <Cam pos={v.pos} look={v.look} fov={v.fov} />
        <Lights fire={shot === 'four' ? 0.3 : 1} />
        {shot === 'four' ? (
          <Oven />
        ) : shot === 'ingredients' ? (
          <Ingredients />
        ) : (
          <>
            <Pizza3D pizza={pizza} spin={0} board={!pizzaShot} />
            <ContactShadows position={[0, -0.11, 0]} opacity={0.55} scale={6} blur={2.4} far={2} frames={1} />
          </>
        )}
        <Ready />
      </Canvas>
    </div>
  );
}
