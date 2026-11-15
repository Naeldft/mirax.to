import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import Mannequin, { TETE_Y } from './Mannequin';

/* ------------------------------------------------------------------
   Intro 3D d'Atelier Mèche (pilotée par le défilement, progres 0 → 1).
   Un vrai salon : porte d'entrée vitrée, parquet en point de Hongrie, murs poudre, miroirs à cadre laiton,
   consoles en marbre, suspensions. Les fauteuils sont un vrai modèle 3D scanné (Poly Haven, CC0).
   Les clients sont des mannequins construits en code (three/Mannequin.jsx), chacun avec la coupe sculptée de sa
   prestation ; les miroirs reflètent le salon. La caméra s'arrête près de chaque client, à droite puis à gauche,
   et tourne un peu autour pour montrer le volume de la coupe.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const IMAGE_PAR_IMAGE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('image-par-image');
const horloge = { t: 0, maintenant: () => (IMAGE_PAR_IMAGE ? horloge.t : performance.now() / 1000) };
const doux = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

const L = 3.2; // demi-largeur du salon
const FOND = -9.5;
const HAUT = 3.1;
const LAITON = '#c79a52';
const POUDRE = '#efd8cf';

/** Les postes de coiffure : côté (1 droite, -1 gauche) et position le long du salon. */
export const POSTES = [
  { cote: 1, z: -2.5 },
  { cote: -1, z: -4.3 },
  { cote: 1, z: -6.1 },
  { cote: -1, z: -7.9 },
];
const MIROIR = { l: 1.0, h: 1.35, y: 1.6 };
const FAUTEUIL_DU_MUR = 1.05;

function useMatiere(nom, { taille, couleur, repeat = [1, 1], uni = false, relief = 1, env = 0.5 } = {}) {
  const t = useTexture({
    ...(uni ? {} : { map: `${BASE}scene/textures/${nom}-diffuse-${taille}.webp` }),
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
    return new THREE.MeshStandardMaterial({ ...t, color: couleur ?? '#ffffff', roughness: 1, envMapIntensity: env, normalScale: new THREE.Vector2(relief, relief) });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- une fois
  }, [t]);
}

let _ombre;
function ombre() {
  if (_ombre) return _ombre;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(64, 64, 2, 64, 64, 64);
  r.addColorStop(0, 'rgba(40,20,10,0.6)');
  r.addColorStop(1, 'rgba(40,20,10,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  _ombre = new THREE.CanvasTexture(c);
  return _ombre;
}

function texte(lignes, { couleur = '#1c1a1a', largeur = 1024, hauteur = 256 } = {}) {
  const c = document.createElement('canvas');
  c.width = largeur;
  c.height = hauteur;
  const g = c.getContext('2d');
  g.textAlign = 'center';
  g.fillStyle = couleur;
  const total = lignes.reduce((s, [, px]) => s + px * 1.15, 0);
  let y = (hauteur - total) / 2;
  for (const [txt, px, police] of lignes) {
    y += px;
    g.font = police || `italic ${px}px "Fraunces Variable", Georgia, serif`;
    g.fillText(txt, largeur / 2, y);
    y += px * 0.15;
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/* ---------- le salon ---------- */
function Salle({ taille }) {
  const parquet = useMatiere('herringbone_parquet', { taille, couleur: '#e6cdb3', repeat: [4, 6], env: 0.5 });
  const mur = useMatiere('white_plaster_02', { taille, couleur: POUDRE, uni: true, relief: 0.3, env: 0.4 });
  const m = useMemo(
    () => ({
      plafond: new THREE.MeshStandardMaterial({ color: '#f7efe9', roughness: 0.95 }),
      soubassement: new THREE.MeshStandardMaterial({ color: '#d9b8ab', roughness: 0.8 }),
      laiton: new THREE.MeshStandardMaterial({ color: LAITON, roughness: 0.3, metalness: 1 }),
      facade: new THREE.MeshStandardMaterial({ color: '#1c1a1a', roughness: 0.5 }),
      verre: new THREE.MeshStandardMaterial({ color: '#f3e4dc', transparent: true, opacity: 0.14, roughness: 0.05, metalness: 0.3, depthWrite: false }),
      trottoir: new THREE.MeshStandardMaterial({ color: '#4a4440', roughness: 0.9 }),
      lumiere: new THREE.MeshBasicMaterial({ color: '#fff1dc', toneMapped: false }),
    }),
    [],
  );
  const enseigne = useMemo(() => texte([['Atelier Mèche', 150]], { couleur: '#e9c98f' }), []);
  return (
    <group>
      {/* dehors */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.005, 6]} material={m.trottoir}>
        <planeGeometry args={[30, 12]} />
      </mesh>
      {/* façade noire, porte vitrée au centre, enseigne dorée */}
      <mesh position={[-1.95, 1.75, 0.05]} material={m.facade}>
        <boxGeometry args={[2.5, 3.5, 0.1]} />
      </mesh>
      <mesh position={[1.95, 1.75, 0.05]} material={m.facade}>
        <boxGeometry args={[2.5, 3.5, 0.1]} />
      </mesh>
      <mesh position={[0, 3.05, 0.05]} material={m.facade}>
        <boxGeometry args={[1.4, 0.9, 0.1]} />
      </mesh>
      <mesh position={[0, 2.95, 0.11]}>
        <planeGeometry args={[2.4, 0.6]} />
        <meshBasicMaterial map={enseigne} transparent toneMapped={false} />
      </mesh>
      {[-1.95, 1.95].map((x) => (
        <mesh key={x} position={[x, 1.5, 0.11]} material={m.verre}>
          <planeGeometry args={[1.9, 2.2]} />
        </mesh>
      ))}
      {/* intérieur */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.002, FOND / 2]} material={parquet}>
        <planeGeometry args={[2 * L, -FOND]} />
      </mesh>
      <mesh rotation-x={Math.PI / 2} position={[0, HAUT, FOND / 2]} material={m.plafond}>
        <planeGeometry args={[2 * L, -FOND]} />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * L, HAUT / 2, FOND / 2]} rotation-y={-s * (Math.PI / 2)} material={mur}>
            <planeGeometry args={[-FOND, HAUT]} />
          </mesh>
          {/* soubassement plus foncé, avec un jonc laiton */}
          <mesh position={[s * (L - 0.005), 0.45, FOND / 2]} rotation-y={-s * (Math.PI / 2)} material={m.soubassement}>
            <planeGeometry args={[-FOND, 0.9]} />
          </mesh>
          <mesh position={[s * (L - 0.012), 0.905, FOND / 2]} rotation-y={-s * (Math.PI / 2)} material={m.laiton}>
            <boxGeometry args={[-FOND, 0.02, 0.01]} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, HAUT / 2, FOND]} material={mur}>
        <planeGeometry args={[2 * L, HAUT]} />
      </mesh>
      {/* suspensions en laiton le long du salon */}
      {[-1.8, -4.1, -6.4, -8.4].map((z) => (
        <group key={z} position={[0, HAUT - 0.65, z]}>
          <mesh position={[0, 0.33, 0]}>
            <cylinderGeometry args={[0.004, 0.004, 0.66, 4]} />
            <meshBasicMaterial color="#222" />
          </mesh>
          <mesh material={m.laiton}>
            <sphereGeometry args={[0.13, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          <mesh position={[0, -0.01, 0]} rotation-x={Math.PI / 2} material={m.lumiere}>
            <circleGeometry args={[0.11, 24]} />
          </mesh>
          <pointLight position={[0, -0.2, 0]} color="#ffd9b0" intensity={3.2} distance={5.5} decay={1.5} />
        </group>
      ))}
    </group>
  );
}

/** Poste de coiffure : miroir (reflet du salon), console en marbre, fauteuil ; la cliente, ou la photo au miroir. */
function Poste({ poste, envMiroir, marbre, laiton, client }) {
  const { cote, z } = poste;
  const xMur = cote * L;
  const rot = -cote * (Math.PI / 2); // face à l'allée
  const { scene } = useGLTF(`${BASE}scene/modeles/fauteuil.glb`);
  const fauteuil = useMemo(() => scene.clone(true), [scene]);
  const xFauteuil = xMur - cote * FAUTEUIL_DU_MUR;
  return (
    <group>
      {/* miroir au mur, avec une marge : rien ne traverse le mur */}
      <group position={[xMur - cote * 0.03, MIROIR.y, z]} rotation-y={rot}>
        <mesh position={[0, 0, -0.005]} material={laiton}>
          <boxGeometry args={[MIROIR.l + 0.1, MIROIR.h + 0.1, 0.03]} />
        </mesh>
        <mesh position={[0, 0, 0.012]} userData={{ miroir: true }}>
          <planeGeometry args={[MIROIR.l, MIROIR.h]} />
          <meshStandardMaterial envMap={envMiroir} metalness={1} roughness={0.03} color="#e4e8e6" envMapIntensity={1.15} />
        </mesh>
        {/* reflet du verre : un trait de lumière en biais */}
        <mesh position={[0.18, 0.1, 0.014]} rotation-z={-0.5}>
          <planeGeometry args={[0.12, 1.5]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.07} depthWrite={false} />
        </mesh>
      </group>
      {/* console en marbre sous le miroir */}
      <group position={[xMur - cote * 0.2, 0.86, z]} rotation-y={rot}>
        <mesh material={marbre}>
          <boxGeometry args={[1.3, 0.04, 0.4]} />
        </mesh>
        <mesh position={[0, -0.03, 0.18]} material={laiton}>
          <boxGeometry args={[1.3, 0.02, 0.02]} />
        </mesh>
      </group>
      {/* le fauteuil, tourné vers le miroir */}
      <group position={[xFauteuil, 0, z]} rotation-y={cote * (Math.PI / 2)}>
        <primitive object={fauteuil} />
        {/* lumière du poste : douce, côté miroir, elle modèle le visage */}
        <pointLight position={[0.75, 1.85, 0.35]} color="#ffe2c4" intensity={0.8} distance={2.4} decay={1.6} />
        {/* le client, assis, tourné vers le miroir */}
        {client && (
          <group position={[0, 0.0, -0.13]}>
            <Mannequin coupe={client.coupe} cheveux={client.cheveux} homme={client.homme} />
          </group>
        )}
      </group>
      <mesh rotation-x={-Math.PI / 2} position={[xFauteuil, 0.006, z]}>
        <planeGeometry args={[1.3, 1.3]} />
        <meshBasicMaterial map={ombre()} transparent depthWrite={false} />
      </mesh>
      <Etagere x={-xMur} z={z} cote={-cote} laiton={laiton} />
    </group>
  );
}

/** Sur le mur d'en face (ce que reflète le miroir) : étagère en laiton, flacons de soins, plante. */
const FLACONS = ['#f3e6d8', '#d9a5a0', '#1c1a1a', '#c79a52', '#f7efe9', '#b9746e', '#e9d3c3'];
function Etagere({ x, z, cote, laiton }) {
  const rot = -cote * (Math.PI / 2);
  return (
    <group position={[x - cote * 0.16, 0, z]} rotation-y={rot}>
      {[1.15, 1.6, 2.05].map((y, r) => (
        <group key={y} position={[0, y, 0]}>
          <mesh material={laiton}>
            <boxGeometry args={[1.5, 0.025, 0.26]} />
          </mesh>
          {FLACONS.map((c, i) => (
            <mesh key={i} position={[-0.6 + i * 0.2, 0.1 + ((i + r) % 3) * 0.015, 0]}>
              <cylinderGeometry args={[0.035 + ((i + r) % 2) * 0.012, 0.04, 0.17 + ((i * 7 + r) % 3) * 0.04, 16]} />
              <meshStandardMaterial color={FLACONS[(i + r * 2) % FLACONS.length]} roughness={0.35} />
            </mesh>
          ))}
        </group>
      ))}
      <Plante position={[0.95, 0, 0.05]} />
    </group>
  );
}
function Plante(props) {
  const { scene } = useGLTF(`${BASE}scene/modeles/potted_plant_04.glb`);
  const copie = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={copie} scale={3.4} {...props} />;
}

/**
 * Le reflet de chaque miroir : le salon (fauteuils, clientes, étagères d'en face) photographié à 360° devant ce
 * miroir, quelques images après le chargement, sans les miroirs eux-mêmes. Calculé une fois : léger sur téléphone.
 */
function Reflet({ cible, poste }) {
  const { gl, scene } = useThree();
  const cam = useMemo(() => new THREE.CubeCamera(0.1, 30, cible), [cible]);
  const n = useRef(0);
  useFrame(() => {
    // quelques prises après le chargement (le temps que tout soit affiché)
    n.current++;
    if (![6, 20, 45].includes(n.current)) return;
    // pris devant le miroir, à hauteur des yeux : il reflète le fauteuil, l'allée et le mur d'en face
    cam.position.set(poste.cote * (L - 0.6), 1.55, poste.z);
    const miroirs = [];
    scene.traverse((o) => o.userData.miroir && (miroirs.push(o), (o.visible = false)));
    cam.update(gl, scene);
    miroirs.forEach((o) => (o.visible = true));
  });
  return null;
}

/* ---------- caméra : elle avance dans l'allée, puis tourne un peu autour de chaque client ---------- */
export const ARRETS = POSTES.map((_, i) => [0.2 + i * 0.17, 0.2 + i * 0.17 + 0.11]);
const ENTREE = [
  [0.0, [0, 1.6, 6.2], [0, 1.6, 0]],
  [0.04, [0, 1.6, 5.6], [0, 1.6, 0]],
  [0.12, [0, 1.6, 0.9], [0, 1.5, -6]],
  [0.15, [0, 1.6, 0.2], [0.5, 1.4, -4]],
];
const SORTIE = [
  [0.92, [0, 1.6, -5.4], [0, 1.5, FOND]],
  [1.0, [0, 1.6, -6.0], [0, 1.5, FOND]],
];

/** Vue autour du client i, à l'angle a (0 : de dos, depuis l'allée ; π/2 : de profil, côté entrée ; au-delà : trois quarts face). */
function vueAutour(i, a, portrait, pos, cible) {
  const { cote, z } = POSTES[i];
  const hx = cote * (L - FAUTEUIL_DU_MUR) + cote * 0.05;
  const r = portrait ? 1.25 : 1.05;
  pos.set(hx - cote * Math.cos(a) * r, 1.62, z + Math.sin(a) * r);
  cible.set(hx, TETE_Y - (portrait ? 0.22 : 0.08), z);
  if (!portrait) {
    // ordinateur : le client à droite de l'écran (le texte est à gauche)
    const dx = cible.x - pos.x;
    const dz = cible.z - pos.z;
    const n = Math.hypot(dx, dz);
    cible.x += (dz / n) * 0.42;
    cible.z -= (dx / n) * 0.42;
  }
}

function Camera({ progres, refPorte }) {
  const { camera, size } = useThree();
  const p0 = useMemo(() => new THREE.Vector3(), []);
  const c0 = useMemo(() => new THREE.Vector3(), []);
  const p1 = useMemo(() => new THREE.Vector3(), []);
  const c1 = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const portrait = size.width / size.height < 1;
    if (progres.lisse === undefined) progres.lisse = progres.current;
    progres.lisse += (progres.current - progres.lisse) * 0.08;
    const p = progres.lisse;
    // la suite des « poses » : entrée, puis pour chaque client une arrivée et un départ (en tournant), puis la sortie
    const poses = [...ENTREE.map(([t, a, b]) => [t, (pp, cc) => (pp.set(...a), cc.set(...b))])];
    ARRETS.forEach(([ta, tb], i) => {
      poses.push([ta, (pp, cc) => vueAutour(i, 1.25, portrait, pp, cc)]);
      poses.push([tb, (pp, cc) => vueAutour(i, 2.25, portrait, pp, cc)]);
    });
    SORTIE.forEach(([t, a, b]) => poses.push([t, (pp, cc) => (pp.set(...a), cc.set(...b))]));
    let i = 1;
    while (i < poses.length - 1 && p > poses[i][0]) i++;
    const [t0, f0] = poses[i - 1];
    const [t1, f1] = poses[i];
    const r = (p - t0) / (t1 - t0);
    // pendant l'arrêt (tour lent autour du client) : mouvement régulier ; entre deux clients : départ et arrivée en douceur
    const k = i % 2 === 0 && i > 4 && i < poses.length - 2 ? Math.min(1, Math.max(0, r)) : doux(r);
    f0(p0, c0);
    f1(p1, c1);
    camera.position.copy(p0.lerp(p1, k));
    camera.lookAt(c0.lerp(c1, k));
    camera.fov = portrait ? 60 : 46;
    camera.updateProjectionMatrix();
    if (refPorte.current) refPorte.current.rotation.y = 1.4 * doux((p - 0.06) / 0.06);
  });
  return null;
}

function Porte({ refPorte, verre }) {
  return (
    <group ref={refPorte} position={[-0.7, 0, 0.05]}>
      <mesh position={[0.7, 1.15, 0]} material={verre}>
        <boxGeometry args={[1.4, 2.3, 0.03]} />
      </mesh>
      <mesh position={[1.25, 1.1, 0.04]}>
        <boxGeometry args={[0.03, 0.5, 0.03]} />
        <meshStandardMaterial color={LAITON} metalness={1} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Ambiance({ taille }) {
  const env = useTexture(`${BASE}scene/maison-${taille}.jpg`);
  const { scene } = useThree();
  useEffect(() => {
    env.mapping = THREE.EquirectangularReflectionMapping;
    env.colorSpace = THREE.SRGBColorSpace;
    scene.environment = env;
    scene.environmentIntensity = 0.32;
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

/** clientes : [{ coupe, cheveux, homme? }], un par poste (voir data/site.js). */
function Scene({ taille, clientes, refPorte, petit }) {
  const marbre = useMatiere('marble_01', { taille, env: 0.8, repeat: [0.6, 0.6] });
  const laiton = useMemo(() => new THREE.MeshStandardMaterial({ color: LAITON, roughness: 0.3, metalness: 1 }), []);
  const verre = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f3e4dc', transparent: true, opacity: 0.18, roughness: 0.05, metalness: 0.3, depthWrite: false }),
    [],
  );
  const reflets = useMemo(() => POSTES.map(() => new THREE.WebGLCubeRenderTarget(petit ? 256 : 512, { type: THREE.HalfFloatType })), [petit]);
  return (
    <>
      <Ambiance taille={taille} />
      <Salle taille={taille} />
      <Porte refPorte={refPorte} verre={verre} />
      {POSTES.map((poste, i) => (
        <Poste
          key={i}
          poste={poste}
          envMiroir={reflets[i].texture}
          marbre={marbre}
          laiton={laiton}
          client={clientes[i]}
        />
      ))}
      {POSTES.map((poste, i) => (
        <Reflet key={i} cible={reflets[i]} poste={poste} />
      ))}
    </>
  );
}

export default function Salon3D({ progres, clientes, leger, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  const taille = petit || leger ? 512 : 1024;
  const refPorte = useRef(null);
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={leger ? [1, 1.25] : petit ? [1, 1.6] : [1, 1.75]}
      frameloop={IMAGE_PAR_IMAGE || !actif ? 'never' : 'always'}
      camera={{ fov: 50, near: 0.03, far: 40, position: [0, 1.6, 6.2] }}
      gl={{ antialias: !leger, powerPreference: 'high-performance' }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        scene.background = new THREE.Color('#2a211d');
        scene.fog = new THREE.Fog('#2a211d', 12, 26);
      }}
      aria-hidden="true"
    >
      <Pilote />
      <hemisphereLight args={['#fff1e4', '#6a4a3a', 0.35]} />
      <Suspense fallback={null}>
        <Scene taille={taille} clientes={clientes} refPorte={refPorte} petit={petit} />
        <Camera progres={progres} refPorte={refPorte} />
        <Pret onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
