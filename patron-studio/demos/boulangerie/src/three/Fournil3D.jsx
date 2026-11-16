import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import Differe, { signalerScenePrete } from '@demos/shared/three/Differe.jsx';

/* ------------------------------------------------------------------
   Intro 3D de Maison Levain (pilotée par le défilement, progres 0 → 1).
   Une boutique au petit matin : comptoir en bois et pierre, fournil (four à sole) au fond, soleil par la fenêtre.
   La caméra entre, pivote vers l'ardoise du jour (à droite), vers le fournil (à gauche), puis s'arrête devant
   les planches posées sur le comptoir. Chaque pain est une VRAIE photo détourée, debout sur sa planche ;
   les planches glissent sur le côté pour changer de pain. Au doigt : on incline le pain ; la loupe rapproche
   la caméra de la croûte, ou de la tranche (la mie) quand la photo la montre.
   Matières, meubles et lumière : Poly Haven (CC0). Voir IMAGES.md.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const IMAGE_PAR_IMAGE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('image-par-image');
const horloge = { t: 0, maintenant: () => (IMAGE_PAR_IMAGE ? horloge.t : performance.now() / 1000) };
const doux = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

const COMPTOIR = 0.92; // hauteur du plan de travail
const PAS = 0.62; // écart entre deux planches
const PLANCHE_Z = 0.04;

/** Trajet de la caméra : [progression, position, point visé]. */
const TRAJET = {
  paysage: [
    [0.0, [0, 1.55, 4.6], [0, 1.25, -3]],
    [0.3, [0.35, 1.5, 2.5], [2.05, 1.05, 1.15]], // à droite : l'ardoise du jour
    [0.58, [-0.25, 1.5, 1.7], [-1.95, 1.0, -1.45]], // à gauche : le fournil et son ardoise
    [0.86, [-0.24, 1.2, 0.98], [-0.24, 1.04, 0]], // sur les planches (le pain à droite du texte)
    [1.0, [-0.24, 1.2, 0.98], [-0.24, 1.04, 0]],
  ],
  portrait: [
    [0.0, [0, 1.55, 5.8], [0, 1.25, -3]],
    [0.3, [0.2, 1.5, 3.1], [2.05, 1.05, 1.15]],
    [0.58, [-0.1, 1.5, 2.3], [-1.95, 1.0, -1.45]],
    [0.86, [0, 1.28, 1.25], [0, 0.8, 0.02]],
    [1.0, [0, 1.28, 1.25], [0, 0.8, 0.02]],
  ],
};

function useMatiere(nom, { repeat = [1, 1], taille = 1024, couleur, env = 0.5 } = {}) {
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

function ModeleCharge({ nom, ...props }) {
  const { scene } = useGLTF(`${BASE}scene/modeles/${nom}.glb`);
  const copie = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={copie} {...props} />;
}
/** Chargé après le premier affichage de la scène (détail). */
function Modele(props) {
  return (
    <Differe>
      <ModeleCharge {...props} />
    </Differe>
  );
}

/* ---------- la boutique ---------- */
function Boutique({ taille }) {
  const sol = useMatiere('brick_floor_02', { repeat: [4, 5], taille, couleur: '#f0dcc6' });
  const mur = useMatiere('clay_plaster', { repeat: [3, 1.5], taille, couleur: '#fff6ea' });
  const brique = useMatiere('brown_brick_02', { repeat: [3, 1.6], taille, couleur: '#d9c4b2' });
  const bois = useMatiere('wood_table_001', { repeat: [1, 3], taille, couleur: '#c89a68' });
  const pierre = useMatiere('clay_plaster', { repeat: [2, 0.6], taille, couleur: '#efe6d6' });
  const jour = useMemo(() => new THREE.MeshBasicMaterial({ color: '#fff3d6', toneMapped: false }), []);
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0.5]} material={sol}>
        <planeGeometry args={[6.4, 8]} />
      </mesh>
      <mesh rotation-x={Math.PI / 2} position={[0, 3.3, 0.5]} material={mur}>
        <planeGeometry args={[6.4, 8]} />
      </mesh>
      {/* mur du fournil, en brique */}
      <mesh position={[0, 1.65, -3.4]} material={brique}>
        <planeGeometry args={[6.4, 3.3]} />
      </mesh>
      {/* mur de droite */}
      <mesh position={[3.2, 1.65, 0.5]} rotation-y={-Math.PI / 2} material={mur}>
        <planeGeometry args={[8, 3.3]} />
      </mesh>
      {/* mur de gauche, avec la fenêtre (le soleil du matin entre par là) */}
      {[
        [-3.4, 0.4, 1.0],
        [2.6, 4.5, 3.3],
      ].map(([z0, z1, h], i) => (
        <mesh key={i} position={[-3.2, i ? 1.65 : 1.65, (z0 + z1) / 2]} rotation-y={Math.PI / 2} material={mur}>
          <planeGeometry args={[z1 - z0, h === 1.0 ? 3.3 : 3.3]} />
        </mesh>
      ))}
      <mesh position={[-3.2, 0.5, 1.5]} rotation-y={Math.PI / 2} material={mur}>
        <planeGeometry args={[2.2, 1.0]} />
      </mesh>
      <mesh position={[-3.2, 2.95, 1.5]} rotation-y={Math.PI / 2} material={mur}>
        <planeGeometry args={[2.2, 0.7]} />
      </mesh>
      <mesh position={[-3.3, 1.8, 1.5]} rotation-y={Math.PI / 2} material={jour}>
        <planeGeometry args={[2.2, 1.6]} />
      </mesh>
      {/* croisillons de la fenêtre */}
      {[
        [0, 1.8, 0.05, 1.6],
        [0, 1.8, 2.2, 0.05],
      ].map(([dz, y, w, h], i) => (
        <mesh key={i} position={[-3.18, y, 1.5 + dz]} rotation-y={Math.PI / 2}>
          <boxGeometry args={[w, h, 0.04]} />
          <meshStandardMaterial color="#5a3a22" roughness={0.6} />
        </mesh>
      ))}

      {/* le comptoir : plan en bois, façade en pierre */}
      <mesh position={[0, COMPTOIR / 2 - 0.02, 0]} material={pierre}>
        <boxGeometry args={[3.4, COMPTOIR - 0.04, 0.66]} />
      </mesh>
      <mesh position={[0, COMPTOIR - 0.02, 0]} material={bois}>
        <boxGeometry args={[3.5, 0.05, 0.76]} />
      </mesh>
      {/* étagères du fond */}
      {[1.0, 1.55, 2.1].map((y) => (
        <mesh key={y} position={[2.15, y, -3.22]} material={bois}>
          <boxGeometry args={[1.7, 0.04, 0.34]} />
        </mesh>
      ))}
      {[1.0, 1.55, 2.1].flatMap((y, i) =>
        [1.65, 2.6].map((x) => (
          <Modele key={`${x}${y}`} nom="wicker_basket_01" position={[x + (i % 2) * 0.12, y + 0.02, -3.2]} scale={0.8} rotation-y={i + x} />
        )),
      )}
    </group>
  );
}

/** Lueur du four derrière la vitre : orangé au centre, sombre sur les bords. */
let _lueur;
function lueur() {
  if (_lueur) return _lueur;
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 48;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(128, 30, 4, 128, 30, 140);
  r.addColorStop(0, '#ffb35a');
  r.addColorStop(0.45, '#d2611c');
  r.addColorStop(1, '#3a1606');
  g.fillStyle = r;
  g.fillRect(0, 0, 256, 48);
  _lueur = new THREE.CanvasTexture(c);
  _lueur.colorSpace = THREE.SRGBColorSpace;
  return _lueur;
}

/* ---------- le fournil : four à sole (trois étages), portes vitrées rougeoyantes ---------- */
function Four() {
  const acier = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3a3b3d', roughness: 0.35, metalness: 0.85 }), []);
  const inox = useMemo(() => new THREE.MeshStandardMaterial({ color: '#b9b6b0', roughness: 0.25, metalness: 1 }), []);
  const laiton = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c9a24a', roughness: 0.3, metalness: 1 }), []);
  const braise = useMemo(() => new THREE.MeshBasicMaterial({ map: lueur(), toneMapped: false }), []);
  const vitre = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a1410', roughness: 0.08, metalness: 0.2, transparent: true, opacity: 0.35 }), []);
  const lumieres = useRef([]);
  useFrame(() => {
    const t = horloge.maintenant();
    lumieres.current.forEach((l, i) => l && (l.intensity = 1.6 + Math.sin(t * 2.1 + i * 1.7) * 0.25 + Math.sin(t * 5.3 + i) * 0.1));
  });
  return (
    <group position={[-0.9, 0, -2.85]}>
      <mesh position={[0, 1.05, 0]} material={acier}>
        <boxGeometry args={[2.0, 2.1, 0.9]} />
      </mesh>
      <mesh position={[0, 2.25, 0.05]} material={inox}>
        <boxGeometry args={[2.1, 0.3, 1.0]} />
      </mesh>
      {[0.45, 1.05, 1.65].map((y, i) => (
        <group key={y} position={[0, y, 0.46]}>
          <mesh material={inox}>
            <boxGeometry args={[1.8, 0.42, 0.04]} />
          </mesh>
          <mesh position={[0, 0.02, 0.025]} material={braise}>
            <planeGeometry args={[1.25, 0.2]} />
          </mesh>
          <mesh position={[0, 0.02, 0.03]} material={vitre}>
            <planeGeometry args={[1.25, 0.2]} />
          </mesh>
          <mesh position={[0, -0.16, 0.06]} rotation-z={Math.PI / 2} material={laiton}>
            <cylinderGeometry args={[0.018, 0.018, 1.4, 10]} />
          </mesh>
          <pointLight ref={(l) => (lumieres.current[i] = l)} position={[0, 0, 0.35]} color="#ff9440" intensity={1.6} distance={2.6} decay={1.8} />
        </group>
      ))}
    </group>
  );
}

/* ---------- les ardoises ---------- */
function texteCraie(lignes) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 640;
  const g = c.getContext('2d');
  g.textAlign = 'center';
  g.fillStyle = 'rgba(245,240,230,0.94)';
  g.shadowColor = 'rgba(255,255,255,0.25)';
  g.shadowBlur = 6;
  let y = 60;
  lignes.forEach(([txt, px], i) => {
    y += px * 1.0;
    g.font = `600 ${px}px "Caveat", "Comic Sans MS", cursive`;
    g.fillText(txt, 256, y, 480);
    if (i < lignes.length - 1) y += px * 0.18;
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function Ardoise({ position, rotation, lignes }) {
  const tex = useMemo(() => texteCraie(lignes), [lignes]);
  return (
    <group position={position} rotation={rotation}>
      <Modele nom="standing_chalkboard_01" />
      <mesh position={[0.012, 0.98, 0.205]} rotation={[-0.255, 0, 0]}>
        <planeGeometry args={[0.66, 0.82]} />
        <meshStandardMaterial map={tex} transparent roughness={1} envMapIntensity={0} />
      </mesh>
    </group>
  );
}

function Suspension({ position }) {
  return (
    <group position={position}>
      <Modele nom="hanging_industrial_lamp" />
      <pointLight position={[0, -1.25, 0]} color="#ffd9a0" intensity={2.4} distance={4} decay={1.6} />
    </group>
  );
}

/* ---------- les pains : vraies photos détourées, debout sur leurs planches ---------- */
let _ombre;
function ombre() {
  if (_ombre) return _ombre;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(64, 64, 2, 64, 64, 64);
  r.addColorStop(0, 'rgba(40,22,10,0.75)');
  r.addColorStop(1, 'rgba(40,22,10,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  _ombre = new THREE.CanvasTexture(c);
  return _ombre;
}

/** Taille d'un pain dans la scène (largeur réelle, hauteur selon la photo). */
const dims = (p, tex) => [p.plateau.largeur, (p.plateau.largeur * tex.image.height) / tex.image.width];

function Pain({ p, tex, refPain }) {
  const [l, h] = dims(p, tex);
  return (
    <group ref={refPain}>
      <mesh position={[0, h / 2, 0]} renderOrder={2}>
        <planeGeometry args={[l, h]} />
        <meshStandardMaterial map={tex} transparent alphaTest={0.04} roughness={0.85} envMapIntensity={0.25} emissiveMap={tex} emissive="#ffffff" emissiveIntensity={0.18} />
      </mesh>
    </group>
  );
}

function Planches({ produits, index, geste, zoom, taillePhoto, bois }) {
  const textures = useTexture(produits.map((p) => `${BASE}scene/pains/${p.id}-${taillePhoto}.webp`));
  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [textures]);
  const rangee = useRef();
  const pains = useRef([]);
  const x = useRef(-index * PAS);
  useFrame(() => {
    // les planches glissent sur le côté jusqu'au pain choisi
    x.current += (-index * PAS - x.current) * 0.09;
    if (rangee.current) rangee.current.position.x = x.current;
    pains.current.forEach((g, i) => {
      if (!g) return;
      const actif = i === index;
      const ry = actif ? geste.current.spin : 0;
      const rx = actif ? geste.current.tilt : 0;
      g.rotation.y += (ry - g.rotation.y) * 0.25;
      g.rotation.x += (rx - g.rotation.x) * 0.25;
    });
    zoom.cible = produits[index];
    zoom.tex = textures[index];
  });
  return (
    <group ref={rangee} position={[0, COMPTOIR + 0.005, PLANCHE_Z]}>
      {produits.map((p, i) => (
        <group key={p.id} position={[i * PAS, 0, 0]}>
          <mesh position={[0, 0.0125, 0]} material={bois}>
            <boxGeometry args={[0.5, 0.025, 0.34]} />
          </mesh>
          <mesh rotation-x={-Math.PI / 2} position={[0, 0.026, 0.02]} renderOrder={1}>
            <planeGeometry args={[p.plateau.largeur * 1.15, 0.2]} />
            <meshBasicMaterial map={ombre()} transparent depthWrite={false} />
          </mesh>
          <group position={[0, 0.026, 0]}>
            <Pain p={p} tex={textures[i]} refPain={(g) => (pains.current[i] = g)} />
          </group>
        </group>
      ))}
    </group>
  );
}

/** Le panier de baguettes (vraie photo détourée, les bouts plantés dans l'osier). */
function Baguettes({ taillePhoto }) {
  const tex = useTexture(`${BASE}scene/pains/tradition-${taillePhoto}.webp`);
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
  }, [tex]);
  const h = 0.62;
  const l = (h * tex.image.width) / tex.image.height;
  return (
    <group position={[1.42, COMPTOIR, -0.14]}>
      <mesh position={[0, h / 2 + 0.06, 0]} rotation-z={0.05}>
        <planeGeometry args={[l, h]} />
        <meshStandardMaterial map={tex} transparent alphaTest={0.04} roughness={0.85} emissiveMap={tex} emissive="#ffffff" emissiveIntensity={0.15} />
      </mesh>
      <Modele nom="wicker_basket_01" position={[0, 0, 0.02]} scale={1.05} />
    </group>
  );
}

/* ---------- caméra ---------- */
function Camera({ progres, reduit, zoom }) {
  const { camera, size } = useThree();
  const lisse = useRef(reduit ? 1 : 0);
  const a = useMemo(() => new THREE.Vector3(), []);
  const b = useMemo(() => new THREE.Vector3(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const cible = useMemo(() => new THREE.Vector3(), []);
  const zPos = useMemo(() => new THREE.Vector3(), []);
  const zCible = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const portrait = size.width / size.height < 1;
    const trajet = portrait ? TRAJET.portrait : TRAJET.paysage;
    camera.fov = portrait ? 52 : 40;
    camera.updateProjectionMatrix();
    lisse.current += ((reduit ? 1 : progres.current) - lisse.current) * (reduit ? 1 : 0.08);
    const t = lisse.current;
    let i = 1;
    while (i < trajet.length - 1 && t > trajet[i][0]) i++;
    const [t0, p0, c0] = trajet[i - 1];
    const [t1, p1, c1] = trajet[i];
    const k = doux((t - t0) / (t1 - t0));
    pos.copy(a.set(...p0)).lerp(b.set(...p1), k);
    cible.copy(a.set(...c0)).lerp(b.set(...c1), k);
    // la loupe : la caméra se rapproche de la croûte, ou de la tranche (mie) si la photo la montre
    const fin = doux((t - 0.84) / 0.04);
    zoom.k += ((zoom.actif ? 1 : 0) * fin - zoom.k) * 0.08;
    if (zoom.k > 0.001 && zoom.cible && zoom.tex) {
      const p = zoom.cible;
      const [l, h] = dims(p, zoom.tex);
      const [u, v] = p.plateau.mie ?? [0.5, 0.3];
      zCible.set((u - 0.5) * l, COMPTOIR + 0.03 + (1 - v) * h, PLANCHE_Z);
      zPos.copy(zCible).add(a.set(0, 0.04, portrait ? 0.42 : 0.32));
      if (!portrait) zPos.x -= 0.07;
      // téléphone : le détail se place dans le haut de l'écran, au-dessus du texte
      if (portrait) zCible.y -= 0.09;
      pos.lerp(zPos, zoom.k);
      cible.lerp(zCible, zoom.k);
    }
    camera.position.copy(pos);
    camera.lookAt(cible);
  });
  return null;
}

/** Poussière de farine dans le rayon de soleil. */
function Farine({ n }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) p.set([-3 + Math.random() * 4.2, 0.3 + Math.random() * 2.6, -0.6 + Math.random() * 3.6], i * 3);
    g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    return g;
  }, [n]);
  useFrame(() => {
    if (ref.current) ref.current.rotation.y = Math.sin(horloge.maintenant() * 0.05) * 0.04;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#fff2d8" size={0.011} transparent opacity={0.6} depthWrite={false} />
    </points>
  );
}

/** Le rayon de soleil du matin, qui entre par la fenêtre. */
function Rayon() {
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#ffe2b0',
        transparent: true,
        opacity: 0.09,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    [],
  );
  return (
    <group position={[-3.1, 1.8, 1.5]} rotation={[0, 0, -0.62]}>
      {[0, 0.35, -0.35].map((dz, i) => (
        <mesh key={i} position={[1.6, -0.2, dz]} material={mat}>
          <boxGeometry args={[3.4, 1.4 - i * 0.3, 1.8 - i * 0.4]} />
        </mesh>
      ))}
    </group>
  );
}

function Ambiance({ taille }) {
  const env = useTexture(`${BASE}scene/ambiance-${taille}.jpg`);
  const { scene } = useThree();
  useEffect(() => {
    env.mapping = THREE.EquirectangularReflectionMapping;
    env.colorSpace = THREE.SRGBColorSpace;
    scene.environment = env;
    scene.environmentIntensity = 0.7;
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
    // l'essentiel est prêt : les détails peuvent maintenant se charger (et repère de mesure)
    signalerScenePrete();
    onReady?.();
  }, [onReady]);
  return null;
}

function Scene({ taille, taillePhoto, produits, index, geste, zoom, ardoiseJour, ardoiseFournil, leger, petit }) {
  const bois = useMatiere('wood_table_001', { repeat: [1, 1], taille, couleur: '#d9b48a' });
  return (
    <>
      <Ambiance taille={taille} />
      <Boutique taille={taille} />
      <Four />
      <Ardoise position={[2.05, 0, 1.15]} rotation={[0, -0.9, 0]} lignes={ardoiseJour} />
      <Ardoise position={[-1.95, 0, -1.45]} rotation={[0, 0.75, 0]} lignes={ardoiseFournil} />
      <Suspension position={[-0.7, 3.3, 0]} />
      <Suspension position={[0.7, 3.3, 0]} />
      <Modele nom="wooden_cutting_board" position={[-1.3, COMPTOIR + 0.005, -0.16]} rotation-y={0.4} />
      <Baguettes taillePhoto={taillePhoto} />
      <Planches produits={produits} index={index} geste={geste} zoom={zoom} taillePhoto={taillePhoto} bois={bois} />
      {!leger && <Rayon />}
      {!leger && <Farine n={petit ? 160 : 360} />}
    </>
  );
}

export default function Fournil3D({ progres, produits, index, geste, zoom, reduit, leger, ardoiseJour, ardoiseFournil, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  const taille = petit || leger ? 512 : 1024;
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={leger ? [1, 1.25] : petit ? [1, 1.6] : [1, 1.75]}
      frameloop={IMAGE_PAR_IMAGE || !actif ? 'never' : 'always'}
      camera={{ fov: 40, near: 0.02, far: 30, position: [0, 1.55, 4.6] }}
      gl={{ antialias: !leger, powerPreference: 'high-performance' }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.2;
        scene.background = new THREE.Color('#2a1a10');
        scene.fog = new THREE.Fog('#2a1a10', 7, 16);
      }}
      aria-hidden="true"
    >
      <Pilote />
      <hemisphereLight args={['#fff6e8', '#9a7a5a', 0.95]} />
      {/* soleil du matin par la fenêtre de gauche */}
      <directionalLight position={[-6, 3.6, 1.6]} intensity={2.8} color="#ffe2b8" />
      <Suspense fallback={null}>
        <Scene
          taille={taille}
          taillePhoto={petit || leger ? 512 : 1024}
          produits={produits}
          index={index}
          geste={geste}
          zoom={zoom}
          ardoiseJour={ardoiseJour}
          ardoiseFournil={ardoiseFournil}
          leger={leger}
          petit={petit}
        />
        <Camera progres={progres} reduit={reduit} zoom={zoom} />
        <Pret onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
