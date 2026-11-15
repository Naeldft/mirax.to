import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

/* ------------------------------------------------------------------
   Intro 3D de Crunch! (pilotée par le défilement, progres 0 → 1).
   La devanture de nuit et son néon, on passe la porte : briques sombres, néons, menus lumineux, comptoir.
   Puis un zoom rapide par-dessus le comptoir jusqu'à la plancha : les burgers (VRAIES photos détourées)
   attendent sur leurs planches, sur le passe-plat. Le burger change au défilement, aux flèches ou au doigt.
   Matières et lumière : Poly Haven (CC0). Voir IMAGES.md.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const IMAGE_PAR_IMAGE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('image-par-image');
const horloge = { t: 0, maintenant: () => (IMAGE_PAR_IMAGE ? horloge.t : performance.now() / 1000) };
const doux = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

const L = 3; // demi-largeur de la salle
const FOND = -8;
const HAUT = 3.4;
const PASSE = { y: 1.0, z: -4.0 }; // le passe-plat où attendent les burgers
const PAS = 0.62;
const BRAISE = '#ff6b1a';
const FLAMME = '#ffb02e';

/** Trajet de la caméra : [progression, position, point visé]. */
export const TRAJET = [
  [0.0, [0, 1.6, 7], [0, 2.3, 0]],
  [0.05, [0, 1.6, 6.4], [0, 2.2, 0]],
  [0.15, [0, 1.6, 0.9], [0, 1.7, -6]],
  [0.22, [0.2, 1.7, -1.4], [0, 2.45, FOND]],
  [0.27, [0.2, 1.7, -1.5], [0, 2.45, FOND]],
  [0.36, [0, 1.3, -3.05], [0, 1.1, PASSE.z]],
  [0.4, [0, 1.27, -3.2], [0, 1.09, PASSE.z]],
  [1.0, [0, 1.27, -3.2], [0, 1.09, PASSE.z]],
];

function useMatiere(nom, { taille, couleur, env = 0.5, repeat = [1, 1] } = {}) {
  const t = useTexture({
    map: `${BASE}scene/textures/${nom}-diffuse-${taille}.webp`,
    normalMap: `${BASE}scene/textures/${nom}-normal-${taille}.webp`,
    roughnessMap: `${BASE}scene/textures/${nom}-rough-${taille}.webp`,
  });
  return useMemo(() => {
    Object.entries(t).forEach(([k, tex]) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(...repeat);
      tex.anisotropy = 8;
      if (k === 'map') tex.colorSpace = THREE.SRGBColorSpace;
    });
    return new THREE.MeshStandardMaterial({ ...t, color: couleur ?? '#ffffff', roughness: 1, envMapIntensity: env });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- une fois
  }, [t]);
}

/** Texte lumineux (néon ou menu rétroéclairé) dessiné sur un canevas. */
function canevas(dessin, l = 1024, h = 256) {
  const c = document.createElement('canvas');
  c.width = l;
  c.height = h;
  dessin(c.getContext('2d'), l, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
const POLICE = '"Archivo Variable", "Arial Black", sans-serif';

function Neon({ texte, couleur, largeur, position, rotation, taille = 150, lumiere = 3 }) {
  const tex = useMemo(
    () =>
      canevas((g, l, h) => {
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.font = `italic 900 ${taille}px ${POLICE}`;
        for (const [blur, alpha] of [
          [40, 0.9],
          [18, 1],
          [0, 1],
        ]) {
          g.shadowColor = couleur;
          g.shadowBlur = blur;
          g.globalAlpha = alpha;
          g.strokeStyle = blur ? couleur : '#fff4e8';
          g.lineWidth = blur ? 10 : 5;
          g.strokeText(texte, l / 2, h / 2);
        }
      }),
    [texte, couleur, taille],
  );
  const ref = useRef();
  useFrame(() => {
    // un léger scintillement, comme un vrai tube
    const t = horloge.maintenant();
    if (ref.current) ref.current.opacity = 0.92 + Math.sin(t * 13 + largeur) * 0.03 + (Math.sin(t * 2.3) > 0.985 ? -0.3 : 0);
  });
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[largeur, largeur / 4]} />
        <meshBasicMaterial ref={ref} map={tex} transparent toneMapped={false} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight position={[0, 0, 0.5]} color={couleur} intensity={lumiere} distance={5} decay={1.6} />
    </group>
  );
}

/** Menu lumineux au-dessus de la cuisine : les burgers et leurs prix. */
function Menu({ lignes, titre, position }) {
  const tex = useMemo(
    () =>
      canevas(
        (g, l, h) => {
          g.fillStyle = '#16110e';
          g.fillRect(0, 0, l, h);
          g.fillStyle = BRAISE;
          g.fillRect(0, 0, l, 70);
          g.fillStyle = '#170a03';
          g.font = `900 46px ${POLICE}`;
          g.textBaseline = 'middle';
          g.fillText(titre, 28, 36);
          lignes.forEach(([nom, prix], i) => {
            const y = 120 + i * 62;
            g.fillStyle = '#f3ece2';
            g.font = `800 38px ${POLICE}`;
            g.textAlign = 'left';
            g.fillText(nom.toUpperCase(), 28, y);
            g.fillStyle = FLAMME;
            g.textAlign = 'right';
            g.fillText(prix, l - 28, y);
          });
        },
        768,
        440,
      ),
    [lignes, titre],
  );
  return (
    <mesh position={position}>
      <planeGeometry args={[2.3, 1.32]} />
      <meshBasicMaterial map={tex} toneMapped={false} color="#d8d2ca" />
    </mesh>
  );
}

/* ---------- la salle ---------- */
function Salle({ taille, burgers }) {
  const brique = useMatiere('dark_brick_wall', { taille, couleur: '#8a7c72', repeat: [3, 1.6], env: 0.3 });
  const briqueFacade = useMatiere('dark_brick_wall', { taille, couleur: '#6e625a', repeat: [4, 2], env: 0.3 });
  const sol = useMatiere('concrete_floor_02', { taille, couleur: '#5a524c', repeat: [4, 5], env: 0.6 });
  const trottoir = useMatiere('concrete_floor_02', { taille, couleur: '#4a4440', repeat: [10, 4], env: 0.4 });
  const carreaux = useMatiere('long_white_tiles', { taille, couleur: '#e9e4dc', repeat: [4, 1.6], env: 0.8 });
  const bois = useMatiere('wood_table_001', { taille, couleur: '#a8794f', repeat: [3, 1], env: 0.4 });
  const m = useMemo(
    () => ({
      noir: new THREE.MeshStandardMaterial({ color: '#141210', roughness: 0.6 }),
      inox: new THREE.MeshStandardMaterial({ color: '#c7c3bd', roughness: 0.28, metalness: 1 }),
      plancha: new THREE.MeshStandardMaterial({ color: '#2a2725', roughness: 0.35, metalness: 0.9 }),
      verre: new THREE.MeshStandardMaterial({ color: '#2b2522', transparent: true, opacity: 0.18, roughness: 0.05, metalness: 0.4, depthWrite: false }),
      chaud: new THREE.MeshBasicMaterial({ color: '#ff5a14', transparent: true, opacity: 0.55, toneMapped: false }),
      plafond: new THREE.MeshStandardMaterial({ color: '#100e0d', roughness: 0.9 }),
      hotte: new THREE.MeshStandardMaterial({ color: '#3a3836', roughness: 0.45, metalness: 0.8 }),
    }),
    [],
  );
  const lignes1 = useMemo(() => burgers.slice(0, 3).map((b) => [b.nom.replace('Le ', '').replace('L’', ''), `${b.prix.toFixed(2).replace('.', ',')} €`]), [burgers]);
  const lignes2 = useMemo(
    () => [
      ...burgers.slice(3).map((b) => [b.nom.replace('Le ', '').replace('L’', ''), `${b.prix.toFixed(2).replace('.', ',')} €`]),
      ['En menu', '+ 3,50 €'],
    ],
    [burgers],
  );
  return (
    <group>
      {/* dehors : trottoir et façade */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.005, 7]} material={trottoir}>
        <planeGeometry args={[30, 14]} />
      </mesh>
      <mesh position={[-1.95, 1.7, 0.05]} material={briqueFacade}>
        <boxGeometry args={[2.1, 3.4, 0.1]} />
      </mesh>
      <mesh position={[1.95, 1.7, 0.05]} material={briqueFacade}>
        <boxGeometry args={[2.1, 3.4, 0.1]} />
      </mesh>
      <mesh position={[0, 3.0, 0.05]} material={briqueFacade}>
        <boxGeometry args={[1.8, 0.8, 0.1]} />
      </mesh>
      {/* vitrines de part et d'autre de la porte */}
      {[-1.95, 1.95].map((x) => (
        <group key={x}>
          <mesh position={[x, 1.35, 0.11]} material={m.noir}>
            <boxGeometry args={[1.6, 1.7, 0.02]} />
          </mesh>
          <mesh position={[x, 1.35, 0.125]} material={m.verre}>
            <planeGeometry args={[1.5, 1.6]} />
          </mesh>
        </group>
      ))}
      <Neon texte="CRUNCH!" couleur={BRAISE} largeur={2.6} position={[0, 2.95, 0.2]} taille={170} lumiere={6} />
      {/* la salle */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.001, FOND / 2]} material={sol}>
        <planeGeometry args={[2 * L, -FOND]} />
      </mesh>
      <mesh rotation-x={Math.PI / 2} position={[0, HAUT, FOND / 2]} material={m.plafond}>
        <planeGeometry args={[2 * L, -FOND]} />
      </mesh>
      <mesh position={[-L, HAUT / 2, FOND / 2]} rotation-y={Math.PI / 2} material={brique}>
        <planeGeometry args={[-FOND, HAUT]} />
      </mesh>
      <mesh position={[L, HAUT / 2, FOND / 2]} rotation-y={-Math.PI / 2} material={brique}>
        <planeGeometry args={[-FOND, HAUT]} />
      </mesh>
      {/* cuisine : carrelage blanc en bas, brique en haut */}
      <mesh position={[0, 1.1, FOND + 0.01]} material={carreaux}>
        <planeGeometry args={[2 * L, 2.2]} />
      </mesh>
      <mesh position={[0, 2.8, FOND + 0.01]} material={brique}>
        <planeGeometry args={[2 * L, 1.2]} />
      </mesh>
      <Menu titre="BURGERS" lignes={lignes1} position={[-1.25, 2.62, FOND + 0.03]} />
      <Menu titre="BURGERS" lignes={lignes2} position={[1.25, 2.62, FOND + 0.03]} />
      <Neon texte="SMASH BURGERS" couleur="#ff3d7f" largeur={2.8} position={[-L + 0.02, 2.4, -3.2]} rotation={[0, Math.PI / 2, 0]} taille={110} lumiere={3} />
      <Neon texte="FRITES MAISON" couleur={FLAMME} largeur={2.6} position={[L - 0.02, 2.4, -2.6]} rotation={[0, -Math.PI / 2, 0]} taille={110} lumiere={2.5} />
      {/* le comptoir : façade en bois, dessus inox */}
      <mesh position={[0, 0.5, -2.9]} material={bois}>
        <boxGeometry args={[4.8, 1.0, 0.6]} />
      </mesh>
      <mesh position={[0, 1.03, -2.9]} material={m.inox}>
        <boxGeometry args={[4.9, 0.05, 0.7]} />
      </mesh>
      {/* le passe-plat, juste derrière */}
      <mesh position={[0, PASSE.y - 0.03, PASSE.z]} material={m.inox}>
        <boxGeometry args={[3.6, 0.05, 0.5]} />
      </mesh>
      <mesh position={[0, PASSE.y / 2, PASSE.z]} material={m.noir}>
        <boxGeometry args={[3.5, PASSE.y - 0.05, 0.45]} />
      </mesh>
      {/* la plancha, et sa hotte */}
      <mesh position={[0, 0.46, -5.2]} material={m.inox}>
        <boxGeometry args={[2.6, 0.92, 0.8]} />
      </mesh>
      <mesh position={[0, 0.94, -5.2]} material={m.plancha}>
        <boxGeometry args={[2.4, 0.04, 0.7]} />
      </mesh>
      <mesh position={[0, 0.962, -5.2]} rotation-x={-Math.PI / 2} material={m.chaud}>
        <planeGeometry args={[2.2, 0.02]} />
      </mesh>
      <mesh position={[0, 1.95, -5.5]} material={m.hotte}>
        <boxGeometry args={[2.8, 0.4, 0.9]} />
      </mesh>
      <pointLight position={[0, 1.4, -5.1]} color="#ff7a2a" intensity={2.5} distance={3} decay={1.6} />
      {/* lampes au-dessus du passe-plat */}
      {[-0.7, 0.7].map((x) => (
        <group key={x} position={[x, 2.2, PASSE.z]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 1.2, 4]} />
            <meshBasicMaterial color="#111" />
          </mesh>
          <mesh>
            <coneGeometry args={[0.16, 0.18, 24, 1, true]} />
            <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, -0.06, 0]}>
            <sphereGeometry args={[0.05, 12, 8]} />
            <meshBasicMaterial color="#fff1d6" toneMapped={false} />
          </mesh>
          <pointLight position={[0, -0.15, 0]} color="#ffe2b8" intensity={3.5} distance={3.5} decay={1.5} />
        </group>
      ))}
    </group>
  );
}

/** La porte vitrée (pivote vers l'intérieur). */
function Porte({ refPorte }) {
  return (
    <group ref={refPorte} position={[-0.9, 0, 0.05]}>
      <mesh position={[0.9, 1.25, 0]}>
        <boxGeometry args={[1.8, 2.5, 0.04]} />
        <meshStandardMaterial color="#1c1917" transparent opacity={0.35} roughness={0.08} metalness={0.5} />
      </mesh>
      <mesh position={[1.6, 1.1, 0.05]}>
        <boxGeometry args={[0.04, 0.6, 0.04]} />
        <meshStandardMaterial color={BRAISE} emissive={BRAISE} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

/* ---------- les burgers : vraies photos détourées sur leurs planches ---------- */
let _ombre;
function ombre() {
  if (_ombre) return _ombre;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(64, 64, 2, 64, 64, 64);
  r.addColorStop(0, 'rgba(0,0,0,0.8)');
  r.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  _ombre = new THREE.CanvasTexture(c);
  return _ombre;
}

function Burgers({ burgers, index, geste, taillePhoto, bois }) {
  const textures = useTexture(burgers.map((b) => `${BASE}scene/burgers/${b.photo}-${taillePhoto}.webp`));
  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [textures]);
  const rangee = useRef();
  const pivots = useRef([]);
  const x = useRef(-index.current * PAS);
  useFrame(() => {
    const i = index.current;
    x.current += (-i * PAS - x.current) * 0.1;
    if (rangee.current) rangee.current.position.x = x.current;
    pivots.current.forEach((g, k) => {
      if (!g) return;
      const cible = k === i ? geste.current.spin : 0;
      g.rotation.y += (cible - g.rotation.y) * 0.2;
      // le burger choisi « respire » un peu
      const s = k === i ? 1 + Math.sin(horloge.maintenant() * 2) * 0.006 : 1;
      g.scale.setScalar(s);
    });
  });
  return (
    <group ref={rangee} position={[0, PASSE.y, PASSE.z]}>
      {burgers.map((b, k) => {
        const tex = textures[k];
        const l = 0.24;
        const h = (l * tex.image.height) / tex.image.width;
        return (
          <group key={b.id} position={[k * PAS, 0, 0]}>
            <mesh position={[0, 0.012, 0]} material={bois}>
              <boxGeometry args={[0.42, 0.024, 0.3]} />
            </mesh>
            <mesh rotation-x={-Math.PI / 2} position={[0, 0.025, 0.02]}>
              <planeGeometry args={[0.32, 0.16]} />
              <meshBasicMaterial map={ombre()} transparent depthWrite={false} />
            </mesh>
            <group ref={(g) => (pivots.current[k] = g)} position={[0, 0.024, 0]}>
              <mesh position={[0, h / 2, 0]}>
                <planeGeometry args={[l, h]} />
                <meshStandardMaterial map={tex} transparent alphaTest={0.04} roughness={0.7} envMapIntensity={0.3} emissiveMap={tex} emissive="#ffffff" emissiveIntensity={0.22} />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
}

/** Fumée légère au-dessus de la plancha. */
function Fumee({ n }) {
  const ref = useRef();
  const base = useMemo(() => Array.from({ length: n }, () => [(Math.random() - 0.5) * 2.2, Math.random(), -5.2 + (Math.random() - 0.5) * 0.6]), [n]);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    return g;
  }, [n]);
  useFrame(() => {
    const t = horloge.maintenant();
    const a = geo.attributes.position.array;
    base.forEach(([x, f, z], i) => {
      const k = (f + t * 0.12) % 1;
      a.set([x + Math.sin(t + i) * 0.05, 1.0 + k * 1.1, z], i * 3);
    });
    geo.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#d9d2c8" size={0.05} transparent opacity={0.12} depthWrite={false} />
    </points>
  );
}

/* ---------- caméra ---------- */
function Camera({ progres, refPorte }) {
  const { camera, size } = useThree();
  const a = useMemo(() => new THREE.Vector3(), []);
  const b = useMemo(() => new THREE.Vector3(), []);
  const c = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const portrait = size.width / size.height < 1;
    if (progres.lisse === undefined) progres.lisse = progres.current;
    progres.lisse += (progres.current - progres.lisse) * 0.08;
    const p = progres.lisse;
    let i = 1;
    while (i < TRAJET.length - 1 && p > TRAJET[i][0]) i++;
    const [t0, p0, c0] = TRAJET[i - 1];
    const [t1, p1, c1] = TRAJET[i];
    // le zoom par-dessus le comptoir est rapide : il accélère puis freine fort
    const r = (p - t0) / (t1 - t0);
    const k = i === 6 ? 1 - Math.pow(1 - Math.min(1, Math.max(0, r)), 3) : doux(r);
    a.set(...p0).lerp(b.set(...p1), k);
    c.set(...c0).lerp(b.set(...c1), k);
    // sur les burgers : ordinateur, le burger à droite du texte ; téléphone, dans le haut de l'écran
    const fin = doux((p - 0.34) / 0.06);
    if (portrait) {
      a.y += 0.1 * fin;
      a.z += 0.22 * fin;
      c.y -= 0.36 * fin;
    } else {
      a.x -= 0.2 * fin;
      c.x -= 0.2 * fin;
    }
    // dehors, sur ordinateur : la devanture à droite du titre
    const dehors = portrait ? 0 : 1 - doux(p / 0.1);
    a.x -= 1.6 * dehors;
    c.x -= 1.6 * dehors;
    camera.position.copy(a);
    camera.lookAt(c);
    camera.fov = portrait ? 64 : 48;
    camera.updateProjectionMatrix();
    if (refPorte.current) refPorte.current.rotation.y = 1.45 * doux((p - 0.07) / 0.06);
  });
  return null;
}

function Ambiance({ taille }) {
  const env = useTexture(`${BASE}scene/neon-${taille}.jpg`);
  const { scene } = useThree();
  useEffect(() => {
    env.mapping = THREE.EquirectangularReflectionMapping;
    env.colorSpace = THREE.SRGBColorSpace;
    scene.environment = env;
    scene.environmentIntensity = 0.55;
    return () => {
      scene.environment = null;
    };
  }, [env, scene]);
  return null;
}

function Pilote() {
  const { advance } = useThree();
  useEffect(() => {
    if (!IMAGE_PAR_IMAGE) return;
    let ms = performance.now();
    horloge.t = ms / 1000;
    window.psAvancer = (pas) => {
      ms += pas;
      horloge.t = ms / 1000;
      advance(ms);
    };
  }, [advance]);
  return null;
}

function Pret({ onReady }) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  return null;
}

function Scene({ taille, taillePhoto, burgers, index, geste, refPorte, leger }) {
  const bois = useMatiere('wood_table_001', { taille, couleur: '#c79a6e', env: 0.4 });
  return (
    <>
      <Ambiance taille={taille} />
      <Salle taille={taille} burgers={burgers} />
      <Porte refPorte={refPorte} />
      <Burgers burgers={burgers} index={index} geste={geste} taillePhoto={taillePhoto} bois={bois} />
      {!leger && <Fumee n={90} />}
    </>
  );
}

export default function Snack3D({ progres, burgers, index, geste, leger, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  const taille = petit || leger ? 512 : 1024;
  const refPorte = useRef(null);
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={leger ? [1, 1.25] : petit ? [1, 1.6] : [1, 1.75]}
      frameloop={IMAGE_PAR_IMAGE || !actif ? 'never' : 'always'}
      camera={{ fov: 48, near: 0.02, far: 40, position: [0, 1.6, 7] }}
      gl={{ antialias: !leger, powerPreference: 'high-performance' }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
        scene.background = new THREE.Color('#0d0b0a');
        scene.fog = new THREE.Fog('#0d0b0a', 9, 22);
      }}
      aria-hidden="true"
    >
      <Pilote />
      <hemisphereLight args={['#ffd9b8', '#2a1a10', 0.6]} />
      {/* spots chauds au plafond de la salle */}
      {[-1.4, 1.4].map((x) => (
        <pointLight key={x} position={[x, HAUT - 0.2, -1.6]} color="#ffcf9a" intensity={3} distance={6} decay={1.5} />
      ))}
      <ambientLight intensity={0.15} />
      <Suspense fallback={null}>
        <Scene taille={taille} taillePhoto={petit || leger ? 512 : 1024} burgers={burgers} index={index} geste={geste} refPorte={refPorte} leger={leger} />
        <Camera progres={progres} refPorte={refPorte} />
        <Pret onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
