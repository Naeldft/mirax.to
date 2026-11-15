import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

/* ------------------------------------------------------------------
   Intro 3D d'Atelier Lin (pilotée par le défilement, progres 0 → 1).
   La devanture (vitrine, porte, enseigne), puis on entre : murs clairs, parquet, portants en bois.
   La caméra longe le rayon « chemises & hauts » à gauche, pivote vers « autres styles » à droite,
   puis vers la table du fond. Les vêtements sont de VRAIES photos détourées, suspendues à des crochets 3D.
   Matières, meubles et lumière : Poly Haven (CC0). Voir IMAGES.md.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const IMAGE_PAR_IMAGE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('image-par-image');
const horloge = { t: 0, maintenant: () => (IMAGE_PAR_IMAGE ? horloge.t : performance.now() / 1000) };
const doux = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

const L = 2.5; // demi-largeur de la boutique
const FOND = -8;
const HAUT = 3.2;
const TRINGLE = 1.78; // hauteur des portants
const VERT = '#2f3d34'; // devanture peinte

/** Où chaque vêtement est accroché (z le long du portant). */
export const PLACES = { hauts: [-2.5, -3.9], autres: [-2.3, -3.55, -4.8], table: [-6.2] };

function useMatiere(nom, { taille, couleur, uni = false, relief = 1, env = 0.5 } = {}) {
  const t = useTexture({
    ...(uni ? {} : { map: `${BASE}scene/textures/${nom}-diffuse-${taille}.webp` }),
    normalMap: `${BASE}scene/textures/${nom}-normal-${taille}.webp`,
    roughnessMap: `${BASE}scene/textures/${nom}-rough-${taille}.webp`,
  });
  return useMemo(() => {
    Object.entries(t).forEach(([k, tex]) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.anisotropy = 8;
      if (k === 'map') tex.colorSpace = THREE.SRGBColorSpace;
    });
    return new THREE.MeshStandardMaterial({ ...t, color: couleur ?? '#ffffff', roughness: 1, envMapIntensity: env, normalScale: new THREE.Vector2(relief, relief) });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- une fois
  }, [t]);
}

/** Boîte dont les coordonnées de texture suivent les mètres réels. */
function boite(l, h, p, tuile = 1.5) {
  const g = new THREE.BoxGeometry(l, h, p);
  const uv = g.attributes.uv;
  const tailles = [
    [p, h],
    [p, h],
    [l, p],
    [l, p],
    [l, h],
    [l, h],
  ];
  for (let f = 0; f < 6; f++)
    for (let k = 0; k < 4; k++) {
      const i = f * 4 + k;
      uv.setXY(i, (uv.getX(i) * tailles[f][0]) / tuile, (uv.getY(i) * tailles[f][1]) / tuile);
    }
  return g;
}
function Bloc({ de, a, mat, tuile, ...props }) {
  const [x0, y0, z0] = de;
  const [x1, y1, z1] = a;
  const geo = useMemo(() => boite(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0), tuile), [x0, y0, z0, x1, y1, z1, tuile]);
  return <mesh geometry={geo} material={mat} position={[(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2]} {...props} />;
}

function Modele({ nom, ...props }) {
  const { scene } = useGLTF(`${BASE}scene/modeles/${nom}.glb`);
  const copie = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={copie} {...props} />;
}

function texte(lignes, { couleur = '#f4f1ec', fond = null, largeur = 1024, hauteur = 256 } = {}) {
  const c = document.createElement('canvas');
  c.width = largeur;
  c.height = hauteur;
  const g = c.getContext('2d');
  if (fond) {
    g.fillStyle = fond;
    g.fillRect(0, 0, largeur, hauteur);
  }
  g.textAlign = 'center';
  g.fillStyle = couleur;
  let y = 0;
  const total = lignes.reduce((s, [, px]) => s + px * 1.15, 0);
  y = (hauteur - total) / 2;
  for (const [txt, px, police] of lignes) {
    y += px;
    g.font = police || `${px}px "Italiana", Georgia, serif`;
    g.fillText(txt, largeur / 2, y);
    y += px * 0.15;
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function Panneau({ lignes, options, largeur, position, rotation }) {
  const tex = useMemo(() => texte(lignes, options), [lignes, options]);
  const h = (largeur * tex.image.height) / tex.image.width;
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[largeur, h]} />
      <meshStandardMaterial map={tex} transparent roughness={0.8} />
    </mesh>
  );
}

/* ---------- la devanture ---------- */
function Devanture({ refPorte, trottoir }) {
  const peinture = useMemo(() => new THREE.MeshStandardMaterial({ color: VERT, roughness: 0.45, metalness: 0.1 }), []);
  const laiton = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c2a15a', roughness: 0.3, metalness: 1 }), []);
  const verre = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#dfe8ea', transparent: true, opacity: 0.12, roughness: 0.05, metalness: 0.3, depthWrite: false }),
    [],
  );
  const optEnseigne = useMemo(() => ({ couleur: '#e9d7a8' }), []);
  const lignesEnseigne = useMemo(() => [['Atelier Lin', 150]], []);
  const optSous = useMemo(() => ({ couleur: '#e9d7a8', hauteur: 128 }), []);
  const lignesSous = useMemo(() => [['VÊTEMENTS · LILLE', 56, '500 56px "Jost Variable", Arial, sans-serif']], []);
  // façade : bandeau en haut, piliers, soubassement sous la vitrine ; porte à droite
  return (
    <group>
      <Bloc de={[-L - 0.6, 2.55, -0.15]} a={[L + 0.6, 3.5, 0.15]} mat={peinture} />
      <Bloc de={[-L - 0.6, 0, -0.15]} a={[-L + 0.1, 2.55, 0.15]} mat={peinture} />
      <Bloc de={[L - 0.1, 0, -0.15]} a={[L + 0.6, 2.55, 0.15]} mat={peinture} />
      <Bloc de={[0.65, 0, -0.15]} a={[0.85, 2.55, 0.15]} mat={peinture} />
      <Bloc de={[-L + 0.1, 0, -0.12]} a={[0.65, 0.55, 0.12]} mat={peinture} />
      {/* vitrine */}
      <mesh position={[(-L + 0.1 + 0.65) / 2, 1.55, 0]} material={verre} renderOrder={5}>
        <planeGeometry args={[0.65 + L - 0.1, 2.0]} />
      </mesh>
      <Panneau lignes={lignesEnseigne} options={optEnseigne} largeur={2.6} position={[-0.3, 3.1, 0.16]} />
      <Panneau lignes={lignesSous} options={optSous} largeur={1.9} position={[-0.3, 2.72, 0.16]} />
      {/* porte vitrée (pivote vers l'intérieur) */}
      <group ref={refPorte} position={[0.85, 0, 0]}>
        <Bloc de={[0, 0, -0.04]} a={[1.55, 0.1, 0.04]} mat={peinture} />
        <Bloc de={[0, 2.45, -0.04]} a={[1.55, 2.55, 0.04]} mat={peinture} />
        <Bloc de={[0, 0.1, -0.04]} a={[0.1, 2.45, 0.04]} mat={peinture} />
        <Bloc de={[1.45, 0.1, -0.04]} a={[1.55, 2.45, 0.04]} mat={peinture} />
        <mesh position={[0.775, 1.28, 0]} material={verre} renderOrder={5}>
          <planeGeometry args={[1.35, 2.35]} />
        </mesh>
        <mesh position={[1.32, 1.1, 0.07]} material={laiton}>
          <boxGeometry args={[0.03, 0.5, 0.03]} />
        </mesh>
      </group>
      {/* le trottoir */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.005, 6]} material={trottoir}>
        <planeGeometry args={[30, 12]} />
      </mesh>
    </group>
  );
}

/* ---------- l'intérieur ---------- */
function Interieur({ taille, platre, parquet }) {
  const bois = useMemo(() => new THREE.MeshStandardMaterial({ color: '#b98a5a', roughness: 0.55 }), []);
  const blanc = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f7f5f0', roughness: 0.9 }), []);
  const spot = useMemo(() => new THREE.MeshBasicMaterial({ color: '#fff6e6', toneMapped: false }), []);
  const optRayon = useMemo(() => ({ couleur: '#1f1f1f' }), []);
  const lignesHauts = useMemo(() => [['Chemises & hauts', 120]], []);
  const lignesAutres = useMemo(() => [['Autres styles', 120]], []);
  const optFond = useMemo(() => ({ couleur: '#1f1f1f', hauteur: 420 }), []);
  const lignesFond = useMemo(
    () => [
      ['Atelier Lin', 190],
      ['L’essentiel, tout simplement.', 72, 'italic 72px "Italiana", Georgia, serif'],
    ],
    [],
  );
  void taille;
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.001, FOND / 2]} material={parquet}>
        <planeGeometry args={[2 * L, -FOND]} />
      </mesh>
      <mesh rotation-x={Math.PI / 2} position={[0, HAUT, FOND / 2]} material={blanc}>
        <planeGeometry args={[2 * L, -FOND]} />
      </mesh>
      <Bloc de={[-L - 0.1, 0, FOND]} a={[-L, HAUT, 0]} mat={platre} />
      <Bloc de={[L, 0, FOND]} a={[L + 0.1, HAUT, 0]} mat={platre} />
      <Bloc de={[-L, 0, FOND - 0.1]} a={[L, HAUT, FOND]} mat={platre} />
      <Bloc de={[-L, 2.55, -0.16]} a={[L, HAUT, -0.15]} mat={platre} />
      {/* plinthes */}
      {[-1, 1].map((s) => (
        <Bloc key={s} de={[s * L - (s > 0 ? 0.02 : -0.02), 0, FOND]} a={[s * L, 0.1, 0]} mat={blanc} />
      ))}
      {/* les portants en bois : tringle + montants */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * (L - 0.45), 0, 0]}>
          <mesh position={[0, TRINGLE, -3.6]} rotation-x={Math.PI / 2} material={bois}>
            <cylinderGeometry args={[0.018, 0.018, 3.4, 12]} />
          </mesh>
          {[-1.95, -5.25].map((z) => (
            <mesh key={z} position={[0, TRINGLE / 2, z]} material={bois}>
              <boxGeometry args={[0.05, TRINGLE, 0.05]} />
            </mesh>
          ))}
        </group>
      ))}
      <Panneau lignes={lignesHauts} options={optRayon} largeur={1.5} position={[-L + 0.01, 2.35, -3.3]} rotation={[0, Math.PI / 2, 0]} />
      <Panneau lignes={lignesAutres} options={optRayon} largeur={1.3} position={[L - 0.01, 2.35, -3.6]} rotation={[0, -Math.PI / 2, 0]} />
      {/* la table du fond et l'enseigne peinte */}
      <Bloc de={[-0.8, 0.72, -6.65]} a={[0.8, 0.77, -5.75]} mat={bois} />
      {[
        [-0.72, -6.57],
        [0.72, -6.57],
        [-0.72, -5.83],
        [0.72, -5.83],
      ].map(([x, z]) => (
        <Bloc key={`${x}${z}`} de={[x - 0.03, 0, z - 0.03]} a={[x + 0.03, 0.72, z + 0.03]} mat={bois} />
      ))}
      <Panneau lignes={lignesFond} options={optFond} largeur={2.6} position={[0, 2.05, FOND + 0.01]} />
      <Modele nom="potted_plant_04" position={[-0.55, 0.77, -6.35]} scale={1.6} />
      {/* plantes au pied des portants */}
      <Modele nom="potted_plant_04" position={[-L + 0.35, 0, -5.75]} scale={3.2} />
      <Modele nom="potted_plant_04" position={[L - 0.35, 0, -1.45]} scale={3.2} rotation-y={1.2} />
      {/* spots au plafond */}
      {[-1.6, -3.2, -4.8, -6.4].flatMap((z) =>
        [-1.2, 1.2].map((x) => (
          <mesh key={`${x}${z}`} position={[x, HAUT - 0.01, z]} rotation-x={Math.PI / 2} material={spot}>
            <circleGeometry args={[0.06, 16]} />
          </mesh>
        )),
      )}
      {[-2.4, -4.6].map((z) => (
        <pointLight key={z} position={[0, HAUT - 0.3, z]} intensity={4} distance={6} decay={1.6} color="#fff1dc" />
      ))}
    </group>
  );
}

/* ---------- les vêtements : vraies photos détourées, sur crochets ---------- */
function Vetement({ p, tex, position, rotation, phase }) {
  const ref = useRef();
  const h = p.hauteur;
  const l = (h * tex.image.width) / tex.image.height;
  const cx = (0.5 - p.crochet) * l; // décalage pour que le crochet de la photo soit sous la tringle
  useFrame(() => {
    if (ref.current) ref.current.rotation.y = Math.sin(horloge.maintenant() * 0.6 + phase) * 0.06;
  });
  return (
    <group position={position} rotation={rotation}>
      {/* crochet en laiton qui relie la photo à la tringle */}
      <mesh position={[0, -0.03, 0]}>
        <torusGeometry args={[0.022, 0.004, 8, 16, Math.PI * 1.3]} />
        <meshStandardMaterial color="#b89a5c" metalness={1} roughness={0.3} />
      </mesh>
      <group ref={ref}>
        <mesh position={[cx, -0.05 - h / 2, 0]}>
          <planeGeometry args={[l, h]} />
          <meshStandardMaterial map={tex} transparent alphaTest={0.04} side={THREE.DoubleSide} roughness={0.9} envMapIntensity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

function Objet({ p, tex, position, rotation }) {
  const h = p.hauteur;
  const l = (h * tex.image.width) / tex.image.height;
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, h / 2, 0]}>
        <planeGeometry args={[l, h]} />
        <meshStandardMaterial map={tex} transparent alphaTest={0.04} roughness={0.9} envMapIntensity={0.3} />
      </mesh>
    </group>
  );
}

function Vetements({ produits, taillePhoto }) {
  const liste = useMemo(() => produits.filter((p) => p.rayon), [produits]);
  const textures = useTexture(liste.map((p) => `${BASE}scene/vetements/${p.photo}-${taillePhoto}.webp`));
  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [textures]);
  const rangs = { hauts: 0, autres: 0, table: 0 };
  return liste.map((p, i) => {
    const n = rangs[p.rayon]++;
    const z = PLACES[p.rayon][n];
    if (p.rayon === 'table') return <Objet key={p.id} p={p} tex={textures[i]} position={[0.2, 0.77, z]} rotation={[0, -0.2, 0]} />;
    const s = p.rayon === 'hauts' ? -1 : 1;
    // tournés vers l'allée, et un peu vers l'entrée pour qu'on les voie de face en avançant
    return (
      <Vetement
        key={p.id}
        p={p}
        tex={textures[i]}
        position={[s * (L - 0.45), TRINGLE, z]}
        rotation={[0, -s * (Math.PI / 2 - 0.45), 0]}
        phase={i * 1.7}
      />
    );
  });
}

/* ---------- caméra : [progression, position, point visé] ---------- */
export const TRAJET = [
  [0.0, [0, 1.6, 7.2], [0, 1.75, 0]],
  [0.05, [0, 1.6, 6.6], [0, 1.7, 0]],
  [0.17, [1.6, 1.6, 1.4], [1.3, 1.5, -3]],
  [0.24, [1.1, 1.6, -0.7], [-2.05, 1.3, -2.6]],
  [0.3, [0.1, 1.6, -1.2], [-2.05, 1.3, -2.55]],
  [0.37, [0.1, 1.6, -2.5], [-2.05, 1.3, -3.9]],
  [0.42, [0.1, 1.6, -2.6], [-2.05, 1.3, -3.9]],
  [0.5, [-0.1, 1.6, -1.2], [2.05, 1.25, -2.3]],
  [0.55, [-0.1, 1.6, -1.3], [2.05, 1.25, -2.3]],
  [0.62, [-0.1, 1.6, -2.3], [2.05, 1.25, -3.55]],
  [0.66, [-0.1, 1.6, -2.4], [2.05, 1.25, -3.55]],
  [0.73, [-0.1, 1.6, -3.5], [2.05, 1.25, -4.8]],
  [0.77, [-0.1, 1.6, -3.6], [2.05, 1.25, -4.8]],
  [0.85, [0, 1.55, -4.2], [0.1, 0.95, -6.2]],
  [0.89, [0, 1.55, -4.3], [0.1, 0.95, -6.2]],
  [0.96, [0, 1.65, -3.6], [0, 1.85, FOND]],
  [1.0, [0, 1.65, -3.5], [0, 1.85, FOND]],
];

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
    const k = doux((p - t0) / (t1 - t0));
    a.set(...p0).lerp(b.set(...p1), k);
    // téléphone : on se tient un peu plus loin du rayon regardé
    if (portrait && p > 0.2) a.x *= 0.4;
    c.set(...c0).lerp(b.set(...c1), k);
    // ordinateur, au départ : la devanture à droite du titre
    const decale = portrait ? 0 : -1.7 * (1 - doux(p / 0.1));
    a.x += decale;
    c.x += decale;
    camera.position.copy(a);
    camera.lookAt(c);
    camera.fov = portrait ? 66 : 52;
    camera.updateProjectionMatrix();
    if (refPorte.current) refPorte.current.rotation.y = 1.4 * doux((p - 0.08) / 0.07);
  });
  return null;
}

function Ambiance({ taille }) {
  const env = useTexture(`${BASE}scene/maison-${taille}.jpg`);
  const { scene } = useThree();
  useEffect(() => {
    env.mapping = THREE.EquirectangularReflectionMapping;
    env.colorSpace = THREE.SRGBColorSpace;
    scene.environment = env;
    scene.environmentIntensity = 0.8;
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

function Scene({ taille, refPorte, produits, taillePhoto }) {
  const platre = useMatiere('white_plaster_02', { taille, couleur: '#f6f3ee', uni: true, relief: 0.35, env: 0.5 });
  const parquet = useMatiere('wood_floor', { taille, couleur: '#ecdcc6', env: 0.6 });
  const trottoir = useMatiere('concrete_floor_02', { taille, couleur: '#d9d6d0', env: 0.3 });
  useMemo(() => {
    [parquet.map, parquet.normalMap, parquet.roughnessMap].forEach((t) => t?.repeat.set(3, 5));
    [trottoir.map, trottoir.normalMap, trottoir.roughnessMap].forEach((t) => t?.repeat.set(12, 5));
  }, [parquet, trottoir]);
  return (
    <>
      <Ambiance taille={taille} />
      <Devanture refPorte={refPorte} trottoir={trottoir} />
      <Interieur taille={taille} platre={platre} parquet={parquet} />
      <Vetements produits={produits} taillePhoto={taillePhoto} />
    </>
  );
}

export default function Boutique3D({ progres, produits, leger, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  const taille = petit || leger ? 512 : 1024;
  const refPorte = useRef(null);
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={leger ? [1, 1.25] : petit ? [1, 1.6] : [1, 1.75]}
      frameloop={IMAGE_PAR_IMAGE || !actif ? 'never' : 'always'}
      camera={{ fov: 52, near: 0.03, far: 60, position: [0, 1.6, 7.2] }}
      gl={{ antialias: !leger, powerPreference: 'high-performance' }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        scene.background = new THREE.Color('#dfe4e3');
        scene.fog = new THREE.Fog('#dfe4e3', 14, 30);
      }}
      aria-hidden="true"
    >
      <Pilote />
      <hemisphereLight args={['#fbf7f0', '#b9a48a', 0.8]} />
      <directionalLight position={[4, 8, 6]} intensity={1.6} color="#fff3e2" />
      <Suspense fallback={null}>
        <Scene taille={taille} refPorte={refPorte} produits={produits} taillePhoto={petit || leger ? 512 : 1024} />
        <Camera progres={progres} refPorte={refPorte} />
        <Pret onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
