import { ContactShadows, PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { pointer, usePointer } from '@demos/shared/hooks/usePointer.js';

/* ------------------------------------------------------------------
   Chantier 3D construit en code : la maison se bâtit étage par étage
   au fil du défilement (dalle, murs, plancher, étage, toiture, finitions),
   à côté d'une grue qui pivote. progress : 0 → 1.
------------------------------------------------------------------- */

const W = 4.2; // largeur (x)
const D = 3.2; // profondeur (z)
const H = 1.35; // hauteur d'un niveau
const T = 0.16; // épaisseur des murs
const SLAB = 0.18;

const clamp01 = (t) => Math.min(1, Math.max(0, t));
const ease = (t) => 1 - Math.pow(1 - clamp01(t), 3);
const back = (t) => {
  const x = clamp01(t);
  return 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2);
};
const range = (p, a, b) => clamp01((p - a) / (b - a));

/* ---------- textures dessinées ---------- */
const canvasTex = (w, h, draw, repeat = [1, 1]) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(...repeat);
  return t;
};
const rnd = (i) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function useMaterials() {
  return useMemo(() => {
    const enduit = canvasTex(
      256,
      256,
      (g, w, h) => {
        g.fillStyle = '#f2efe8';
        g.fillRect(0, 0, w, h);
        for (let i = 0; i < 1800; i++) {
          g.fillStyle = `rgba(0,0,0,${rnd(i) * 0.05})`;
          g.fillRect(rnd(i + 1) * w, rnd(i + 2) * h, 2, 2);
        }
      },
      [2, 1],
    );
    const bardage = canvasTex(
      256,
      256,
      (g, w, h) => {
        for (let i = 0; i < 16; i++) {
          const v = 0.85 + rnd(i) * 0.25;
          g.fillStyle = `rgb(${Math.round(168 * v)},${Math.round(122 * v)},${Math.round(82 * v)})`;
          g.fillRect(i * 16, 0, 16, h);
          g.fillStyle = 'rgba(40,25,10,0.5)';
          g.fillRect(i * 16, 0, 1.5, h);
        }
      },
      [3, 1],
    );
    const toit = canvasTex(
      256,
      64,
      (g, w, h) => {
        g.fillStyle = '#34383d';
        g.fillRect(0, 0, w, h);
        for (let i = 0; i < 16; i++) {
          g.fillStyle = '#4a4f55';
          g.fillRect(i * 16, 0, 2, h);
        }
      },
      [2, 1],
    );
    const beton = canvasTex(128, 128, (g, w, h) => {
      g.fillStyle = '#bdb9b0';
      g.fillRect(0, 0, w, h);
      for (let i = 0; i < 600; i++) {
        g.fillStyle = `rgba(${rnd(i) > 0.5 ? 255 : 0},${rnd(i) > 0.5 ? 255 : 0},${rnd(i) > 0.5 ? 255 : 0},0.08)`;
        g.fillRect(rnd(i + 3) * w, rnd(i + 4) * h, 2, 2);
      }
    });
    const treillis = canvasTex(
      64,
      64,
      (g, w, h) => {
        g.clearRect(0, 0, w, h);
        g.strokeStyle = '#f2b705';
        g.lineWidth = 6;
        g.strokeRect(3, 3, w - 6, h - 6);
        g.beginPath();
        g.moveTo(0, 0);
        g.lineTo(w, h);
        g.stroke();
      },
      [1, 16],
    );
    return {
      enduit: new THREE.MeshStandardMaterial({ map: enduit, roughness: 0.9 }),
      bardage: new THREE.MeshStandardMaterial({ map: bardage, roughness: 0.8 }),
      toit: new THREE.MeshStandardMaterial({ map: toit, roughness: 0.6, metalness: 0.3 }),
      beton: new THREE.MeshStandardMaterial({ map: beton, roughness: 0.95 }),
      verre: new THREE.MeshStandardMaterial({
        color: '#8fb4c8',
        roughness: 0.1,
        metalness: 0.3,
        emissive: '#ffb45c',
        emissiveIntensity: 0,
      }),
      cadre: new THREE.MeshStandardMaterial({ color: '#2b2e33', roughness: 0.5 }),
      porte: new THREE.MeshStandardMaterial({ color: '#1d1d1b', roughness: 0.4 }),
      jaune: new THREE.MeshStandardMaterial({ color: '#f2b705', roughness: 0.45, metalness: 0.2 }),
      treillis: new THREE.MeshStandardMaterial({ map: treillis, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.5 }),
      sombre: new THREE.MeshStandardMaterial({ color: '#2a2a28', roughness: 0.7 }),
      sol: new THREE.MeshStandardMaterial({ color: '#dcd8ce', roughness: 1 }),
      vert: new THREE.MeshStandardMaterial({ color: '#5f8a4a', roughness: 0.9 }),
      vertFonce: new THREE.MeshStandardMaterial({ color: '#41683a', roughness: 0.9 }),
      bois: new THREE.MeshStandardMaterial({ color: '#7b5a3c', roughness: 0.9 }),
    };
  }, []);
}

/* ---------- murs avec ouvertures ---------- */
// ouvertures : [x centre, bas, largeur, hauteur, type]
const MURS = {
  rdc: [
    {
      face: 'avant',
      len: W,
      ouv: [
        [-1.15, 0, 0.9, 1.05, 'porte'],
        [0.75, 0.32, 1.7, 0.78, 'fenetre'],
      ],
    },
    {
      face: 'arriere',
      len: W,
      ouv: [
        [-1, 0.4, 0.9, 0.7, 'fenetre'],
        [0.9, 0.0, 1.5, 1.05, 'fenetre'],
      ],
    },
    { face: 'gauche', len: D - 2 * T, ouv: [[0, 0.45, 0.7, 0.6, 'fenetre']] },
    { face: 'droite', len: D - 2 * T, ouv: [[0.2, 0.45, 0.9, 0.6, 'fenetre']] },
  ],
  etage: [
    {
      face: 'avant',
      len: W,
      ouv: [
        [-1, 0.35, 0.8, 0.75, 'fenetre'],
        [1, 0.35, 0.8, 0.75, 'fenetre'],
      ],
    },
    { face: 'arriere', len: W, ouv: [[0, 0.35, 1.4, 0.75, 'fenetre']] },
    { face: 'gauche', len: D - 2 * T, ouv: [[0, 0.4, 0.6, 0.6, 'fenetre']] },
    { face: 'droite', len: D - 2 * T, ouv: [] },
  ],
};

const faceTransform = (face) => {
  switch (face) {
    case 'avant':
      return { pos: [0, 0, D / 2 - T / 2], rot: 0 };
    case 'arriere':
      return { pos: [0, 0, -D / 2 + T / 2], rot: Math.PI };
    case 'gauche':
      return { pos: [-W / 2 + T / 2, 0, 0], rot: -Math.PI / 2 };
    default:
      return { pos: [W / 2 - T / 2, 0, 0], rot: Math.PI / 2 };
  }
};

function wallGeometry(len, ouv) {
  const s = new THREE.Shape();
  s.moveTo(-len / 2, 0);
  s.lineTo(len / 2, 0);
  s.lineTo(len / 2, H);
  s.lineTo(-len / 2, H);
  s.closePath();
  ouv.forEach(([x, b, w, h]) => {
    const p = new THREE.Path();
    const bottom = Math.max(b, 0.001);
    p.moveTo(x - w / 2, bottom);
    p.lineTo(x - w / 2, b + h);
    p.lineTo(x + w / 2, b + h);
    p.lineTo(x + w / 2, bottom);
    p.closePath();
    s.holes.push(p);
  });
  const g = new THREE.ExtrudeGeometry(s, { depth: T, bevelEnabled: false });
  g.translate(0, 0, -T / 2);
  // UV en mètres pour des textures à la bonne échelle
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + pos.getZ(i)) * 0.5, pos.getY(i) * 0.7);
  return g;
}

function Wall({ def, material, mats, grow }) {
  const geo = useMemo(() => wallGeometry(def.len, def.ouv), [def]);
  const tr = faceTransform(def.face);
  return (
    <group position={tr.pos} rotation={[0, tr.rot, 0]}>
      <group ref={grow}>
        <mesh geometry={geo} material={material} castShadow receiveShadow />
        {def.ouv.map(([x, b, w, h, type], i) => (
          <group key={i} position={[x, b + h / 2, 0]}>
            <mesh material={type === 'porte' ? mats.porte : mats.verre} position={[0, 0, 0.02]}>
              <boxGeometry args={[w, h, 0.03]} />
            </mesh>
            {/* encadrement */}
            <mesh material={mats.cadre} position={[0, h / 2 - 0.03, T / 2 + 0.01]}>
              <boxGeometry args={[w + 0.08, 0.06, 0.04]} />
            </mesh>
            <mesh material={mats.cadre} position={[0, -h / 2 + 0.03, T / 2 + 0.01]}>
              <boxGeometry args={[w + 0.08, 0.06, 0.04]} />
            </mesh>
            {type === 'fenetre' && w > 1 && (
              <mesh material={mats.cadre} position={[0, 0, T / 2 + 0.01]}>
                <boxGeometry args={[0.05, h, 0.04]} />
              </mesh>
            )}
          </group>
        ))}
      </group>
    </group>
  );
}

/* ---------- la maison ---------- */
function House({ progress, mats, reduced }) {
  const slab = useRef();
  const floor = useRef();
  const rdc = useRef([]);
  const etage = useRef([]);
  const gables = useRef();
  const roofL = useRef();
  const roofR = useRef();
  const trees = useRef([]);
  const lights = useRef();

  const roofRise = 1.05;
  const half = D / 2 + 0.32;
  const slope = Math.atan2(roofRise, half);
  const panel = Math.hypot(half, roofRise);
  const gableGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-(D / 2), 0);
    s.lineTo(D / 2, 0);
    s.lineTo(0, roofRise * (D / 2 / half));
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: T, bevelEnabled: false });
    g.translate(0, 0, -T / 2);
    return g;
  }, [half]);

  useFrame(() => {
    const p = reduced ? 1 : progress.current;
    const set = (ref, k) => {
      if (!ref) return;
      ref.scale.y = Math.max(0.001, k);
      ref.visible = k > 0.002;
    };
    // dalle
    if (slab.current) {
      const k = ease(range(p, 0.02, 0.16));
      slab.current.scale.set(1, Math.max(0.001, k), 1);
      slab.current.visible = k > 0.002;
    }
    // murs du rez-de-chaussée, l'un après l'autre
    rdc.current.forEach((r, i) => set(r, back(range(p, 0.18 + i * 0.05, 0.3 + i * 0.05))));
    // plancher de l'étage : il descend de la grue
    if (floor.current) {
      const k = ease(range(p, 0.42, 0.5));
      floor.current.position.y = SLAB + H + (1 - k) * 3;
      floor.current.visible = k > 0.002;
    }
    etage.current.forEach((r, i) => set(r, back(range(p, 0.5 + i * 0.04, 0.6 + i * 0.04))));
    if (gables.current) {
      const k = back(range(p, 0.64, 0.7));
      gables.current.scale.y = Math.max(0.001, k);
      gables.current.visible = k > 0.002;
    }
    const kr = ease(range(p, 0.68, 0.82));
    [roofL.current, roofR.current].forEach((r, i) => {
      if (!r) return;
      r.visible = kr > 0.002;
      r.position.y = SLAB + 2 * H + 0.12 + roofRise / 2 + (1 - kr) * 3.5;
      r.position.x = (i ? 1 : -1) * 0 + 0;
    });
    // finitions : lumière aux fenêtres, arbres
    const kf = ease(range(p, 0.86, 1));
    mats.verre.emissiveIntensity = kf * 0.9;
    if (lights.current) lights.current.intensity = kf * 4;
    trees.current.forEach((t, i) => {
      if (!t) return;
      const k = back(range(p, 0.86 + i * 0.03, 0.95 + i * 0.03));
      t.scale.setScalar(Math.max(0.001, k));
      t.visible = k > 0.002;
    });
  });

  const yEtage = SLAB + H + 0.12;
  return (
    <group>
      {/* dalle */}
      <mesh ref={slab} material={mats.beton} position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[W + 0.4, SLAB, D + 0.4]} />
      </mesh>
      {/* rez-de-chaussée */}
      <group position={[0, SLAB / 2, 0]}>
        {MURS.rdc.map((m, i) => (
          <Wall key={m.face} def={m} material={mats.enduit} mats={mats} grow={(el) => (rdc.current[i] = el)} />
        ))}
      </group>
      {/* plancher */}
      <mesh ref={floor} material={mats.beton} castShadow>
        <boxGeometry args={[W + 0.1, 0.12, D + 0.1]} />
      </mesh>
      {/* étage */}
      <group position={[0, yEtage, 0]}>
        {MURS.etage.map((m, i) => (
          <Wall key={m.face} def={m} material={mats.bardage} mats={mats} grow={(el) => (etage.current[i] = el)} />
        ))}
        {/* pignons */}
        <group ref={gables} position={[0, H, 0]}>
          {[-1, 1].map((sd) => (
            <mesh
              key={sd}
              geometry={gableGeo}
              material={mats.bardage}
              position={[sd * (W / 2 - T / 2), 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
              castShadow
            />
          ))}
        </group>
      </group>
      {/* toiture */}
      {[-1, 1].map((sd) => (
        <group key={sd} ref={sd < 0 ? roofL : roofR}>
          <mesh material={mats.toit} position={[0, 0, sd * (half / 2)]} rotation={[sd * slope, 0, 0]} castShadow>
            <boxGeometry args={[W + 0.5, 0.08, panel]} />
          </mesh>
        </group>
      ))}
      <pointLight ref={lights} position={[0, SLAB + 0.8, 0]} color="#ffb45c" intensity={0} distance={6} />
      {/* arbres et haie */}
      {[
        [-3.1, 1.4],
        [-2.7, -1.6],
        [3.2, 2.2],
      ].map(([x, z], i) => (
        <group key={i} ref={(el) => (trees.current[i] = el)} position={[x, 0, z]}>
          <mesh material={mats.bois} position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.7, 8]} />
          </mesh>
          <mesh material={i % 2 ? mats.vertFonce : mats.vert} position={[0, 1.0, 0]} castShadow>
            <icosahedronGeometry args={[0.55, 1]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------- la grue ---------- */
function Crane({ progress, mats, reduced }) {
  const top = useRef();
  const cable = useRef();
  const load = useRef();
  const mastH = 6.4;
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = reduced ? 1 : progress.current;
    if (top.current) top.current.rotation.y = -2.2 + p * 1.1 + (reduced ? 0 : Math.sin(t * 0.35) * 0.18);
    const drop = 1.5 + (reduced ? 0 : Math.sin(t * 0.6) * 0.6) + (1 - Math.abs(Math.sin(p * Math.PI * 3))) * 1.2;
    if (cable.current) {
      cable.current.scale.y = drop;
      cable.current.position.y = -drop / 2;
    }
    if (load.current) load.current.position.y = -drop - 0.15;
  });
  return (
    <group position={[4.2, 0, -2.2]}>
      <mesh material={mats.sombre} position={[0, 0.15, 0]}>
        <boxGeometry args={[1.2, 0.3, 1.2]} />
      </mesh>
      {/* mât en treillis */}
      <mesh material={mats.treillis} position={[0, mastH / 2, 0]}>
        <boxGeometry args={[0.38, mastH, 0.38]} />
      </mesh>
      <group ref={top} position={[0, mastH, 0]}>
        <mesh material={mats.jaune} position={[0, 0.25, 0]}>
          <boxGeometry args={[0.55, 0.5, 0.55]} />
        </mesh>
        {/* flèche */}
        <mesh material={mats.treillis} position={[3, 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.3, 6, 0.3]} />
        </mesh>
        {/* contre-flèche et contrepoids */}
        <mesh material={mats.treillis} position={[-1.1, 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.28, 1.8, 0.28]} />
        </mesh>
        <mesh material={mats.sombre} position={[-1.7, 0.35, 0]}>
          <boxGeometry args={[0.6, 0.55, 0.5]} />
        </mesh>
        {/* cabine */}
        <mesh material={mats.jaune} position={[0.45, 0.05, 0.3]}>
          <boxGeometry args={[0.35, 0.35, 0.3]} />
        </mesh>
        {/* chariot, câble et charge */}
        <group position={[4.4, 0.38, 0]}>
          <mesh material={mats.sombre}>
            <boxGeometry args={[0.3, 0.12, 0.34]} />
          </mesh>
          <mesh ref={cable} material={mats.sombre}>
            <cylinderGeometry args={[0.012, 0.012, 1, 6]} />
          </mesh>
          <group ref={load}>
            <mesh material={mats.sombre} position={[0, 0.12, 0]}>
              <boxGeometry args={[0.08, 0.16, 0.08]} />
            </mesh>
            <mesh material={mats.bois} position={[0, -0.05, 0]}>
              <boxGeometry args={[0.7, 0.08, 0.5]} />
            </mesh>
            <mesh material={mats.beton} position={[0, 0.12, 0]}>
              <boxGeometry args={[0.6, 0.25, 0.4]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

/* ---------- plan au sol (quadrillage bleu qui s'efface) ---------- */
function Blueprint({ progress, reduced }) {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(12, 24, '#2b59c3', '#2b59c3');
    g.material.transparent = true;
    g.material.opacity = 0.5;
    return g;
  }, []);
  const outline = useMemo(() => {
    const pts = [
      [-W / 2 - 0.2, -D / 2 - 0.2],
      [W / 2 + 0.2, -D / 2 - 0.2],
      [W / 2 + 0.2, D / 2 + 0.2],
      [-W / 2 - 0.2, D / 2 + 0.2],
      [-W / 2 - 0.2, -D / 2 - 0.2],
    ].map(([x, z]) => new THREE.Vector3(x, 0.01, z));
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const line = new THREE.Line(geo, new THREE.LineDashedMaterial({ color: '#2b59c3', dashSize: 0.18, gapSize: 0.1 }));
    line.computeLineDistances();
    return line;
  }, []);
  useFrame(() => {
    const p = reduced ? 1 : progress.current;
    grid.material.opacity = 0.5 * (1 - range(p, 0.6, 0.95)) + 0.06;
  });
  return (
    <group>
      <primitive object={grid} position={[0, 0.005, 0]} />
      <primitive object={outline} />
    </group>
  );
}

function Rig({ progress, reduced }) {
  const mats = useMaterials();
  const { camera, viewport } = useThree();
  const tilt = useRef({ x: 0, y: 0 });
  usePointer();
  useFrame(() => {
    const p = reduced ? 1 : progress.current;
    const t = tilt.current;
    t.x += ((reduced ? 0 : pointer.x) - t.x) * 0.05;
    t.y += ((reduced ? 0 : pointer.y) - t.y) * 0.05;
    const mobile = viewport.aspect < 1;
    const az = 0.95 - p * 0.55 + t.x * 0.35;
    const dist = (mobile ? 25 : 13.5) - p * (mobile ? 1 : 1.5);
    const el = 5.2 - p * 1.4 + t.y * 0.8;
    camera.position.set(Math.sin(az) * dist, el, Math.cos(az) * dist);
    // sur téléphone, la maison est remontée dans l'écran (au-dessus du carnet de chantier)
    camera.lookAt(mobile ? 0.8 : -0.6, mobile ? -0.7 : 1.6, 0);
  });
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={mats.sol} receiveShadow>
        <circleGeometry args={[30, 48]} />
      </mesh>
      <Blueprint progress={progress} reduced={reduced} />
      <House progress={progress} mats={mats} reduced={reduced} />
      <Crane progress={progress} mats={mats} reduced={reduced} />
    </group>
  );
}

export default function HouseScene({ progress, reduced, tier, active, onReady }) {
  const [low, setLow] = useState(tier === 'low');
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={low ? 1 : tier === 'high' ? 1.75 : 1.5}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      shadows={!low}
      camera={{ position: [8, 5, 10], fov: 32, near: 0.1, far: 120 }}
      gl={{ antialias: !low, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setLow(true)} />
      <fog attach="fog" args={['#eceae4', 22, 45]} />
      <hemisphereLight args={['#ffffff', '#c9c2b2', 1.1]} />
      <directionalLight
        position={[6, 10, 7]}
        intensity={2.4}
        castShadow={!low}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0004}
      />
      <Rig progress={progress} reduced={reduced} />
      {!low && <ContactShadows position={[0, 0.003, 0]} scale={14} blur={2.5} opacity={0.35} far={6} frames={1} />}
    </Canvas>
  );
}
