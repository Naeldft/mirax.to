import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

/* ------------------------------------------------------------------
   Intro 3D de Velocità (pilotée par le défilement, progres 0 → 1).
   1. Showroom noir, sol laqué, lignes rouges : le coupé (vraie photo détourée, avec son reflet au sol).
      Au clic (« Démarrer ») ou au défilement, il fonce vers nous.
   2. L'habitacle : une VRAIE photo d'intérieur mise en relief grâce à sa carte de profondeur (estimée par
      Depth Anything V2) : la caméra la traverse en profondeur et s'arrête devant les « compartiments »
      (compteur, écran, portière) où s'affichent kilométrage, assistance et annulation gratuite.
   3. On ressort par le pare-brise : 4 places de parking éclairées, une vraie voiture détourée dans chacune
      (les catégories), et la caméra passe de l'une à l'autre.
   Photos : Unsplash ; photo 360° des reflets : Poly Haven (CC0). Voir IMAGES.md.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const IMAGE_PAR_IMAGE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('image-par-image');
const horloge = { t: 0, maintenant: () => (IMAGE_PAR_IMAGE ? horloge.t : performance.now() / 1000) };

/** Repères du défilement. */
export const REPERES = { fonce: [0.02, 0.13], noir: [0.12, 0.17], habitacle: [0.17, 0.6], sortie: [0.58, 0.66], allees: [0.66, 0.87] };
const ROUGE = '#e10600';
const doux = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const entre = (p, [a, b]) => Math.min(1, Math.max(0, (p - a) / (b - a)));

/* ---------- textes (canvas → texture) ---------- */
function texteEtiquette(lignes, { largeur = 1024, hauteur = 360, fond = 'rgba(10,10,11,0.82)', bord = ROUGE } = {}) {
  const c = document.createElement('canvas');
  c.width = largeur;
  c.height = hauteur;
  const g = c.getContext('2d');
  g.fillStyle = fond;
  g.beginPath();
  g.roundRect(6, 6, largeur - 12, hauteur - 12, 18);
  g.fill();
  g.fillStyle = bord;
  g.fillRect(6, 6, 14, hauteur - 12);
  let y = 30;
  for (const [txt, px, couleur, poids] of lignes) {
    y += px * 1.05;
    g.font = `${poids || 700} ${px}px "Unbounded Variable", "Helvetica Neue", Arial, sans-serif`;
    g.fillStyle = couleur || '#f4f2ee';
    g.fillText(txt, 56, y);
    y += px * 0.25;
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/* ---------- une voiture en vraie photo détourée, posée au sol avec son reflet ---------- */
function Voiture({ fichier, hauteur, position = [0, 0, 0], refVoiture }) {
  const tex = useTexture(fichier);
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);
  const largeur = (hauteur * tex.image.width) / tex.image.height;
  // dégradé du reflet (fort près de la voiture, nul plus loin)
  const fondu = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 4;
    c.height = 128;
    const g = c.getContext('2d');
    const gr = g.createLinearGradient(0, 0, 0, 128);
    gr.addColorStop(0, '#000');
    gr.addColorStop(0.55, '#000');
    gr.addColorStop(1, '#555');
    g.fillStyle = gr;
    g.fillRect(0, 0, 4, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  return (
    <group position={position} ref={refVoiture}>
      <mesh position={[0, hauteur / 2, 0]} renderOrder={3}>
        <planeGeometry args={[largeur, hauteur]} />
        <meshBasicMaterial map={tex} transparent alphaTest={0.02} toneMapped={false} />
      </mesh>
      {/* reflet sur le sol laqué */}
      <mesh position={[0, -hauteur / 2 + 0.002, 0]} scale={[1, -1, 1]} renderOrder={1}>
        <planeGeometry args={[largeur, hauteur]} />
        <meshBasicMaterial map={tex} alphaMap={fondu} transparent opacity={0.22} depthWrite={false} toneMapped={false} />
      </mesh>
      {/* ombre douce sous la voiture */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.004, 0.05]} renderOrder={2}>
        <planeGeometry args={[largeur * 0.95, hauteur * 0.55]} />
        <meshBasicMaterial transparent depthWrite={false} map={ombreRadiale()} opacity={0.85} />
      </mesh>
    </group>
  );
}
let _ombre;
function ombreRadiale() {
  if (_ombre) return _ombre;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(64, 64, 4, 64, 64, 64);
  r.addColorStop(0, 'rgba(0,0,0,0.85)');
  r.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  _ombre = new THREE.CanvasTexture(c);
  return _ombre;
}

/* ---------- 1. le showroom ---------- */
function Sol() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -20]}>
        <planeGeometry args={[60, 120]} />
        <meshStandardMaterial color="#0b0b0d" roughness={0.22} metalness={0.5} />
      </mesh>
      {/* lignes rouges au sol, qui filent vers le fond */}
      {[-2.6, 2.6].map((x) => (
        <mesh key={x} position={[x, 0.003, -20]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[0.05, 120]} />
          <meshBasicMaterial color={ROUGE} toneMapped={false} />
        </mesh>
      ))}
      {/* rampes lumineuses au plafond */}
      {[-5, -9, -13].map((z) => (
        <mesh key={z} position={[0, 4.2, z]}>
          <boxGeometry args={[7, 0.04, 0.12]} />
          <meshBasicMaterial color="#f4f2ee" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Traits de vitesse quand la voiture fonce. */
function TraitsVitesse({ progres }) {
  const ref = useRef();
  const traits = useMemo(
    () => Array.from({ length: 70 }, () => [(Math.random() - 0.5) * 10, 0.2 + Math.random() * 3.6, -Math.random() * 30, 0.6 + Math.random() * 2.4]),
    [],
  );
  useFrame(() => {
    const k = entre(progres.lisse ?? 0, REPERES.fonce);
    if (!ref.current) return;
    ref.current.visible = k > 0.02 && k < 0.999;
    ref.current.children.forEach((m, i) => {
      const [, , z0] = traits[i];
      m.position.z = ((z0 + k * 60) % 30) - 22 + 8;
      m.material.opacity = Math.sin(k * Math.PI) * 0.6;
    });
  });
  return (
    <group ref={ref}>
      {traits.map(([x, y, z, l], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.012, 0.012, l]} />
          <meshBasicMaterial color={i % 5 === 0 ? ROUGE : '#ffffff'} transparent opacity={0} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- 2. l'habitacle en vraie photo, mis en relief ---------- */
const H_FOV = 55; // champ de vision supposé de la photo
const BAS_HABITACLE = -100;
/** Point de la photo (u, v : 0 → 1 depuis le coin haut gauche) projeté à sa profondeur. */
function pointPhoto(u, v, prof, aspect) {
  const t = Math.tan(THREE.MathUtils.degToRad(H_FOV / 2));
  const dist = 1 / (0.24 + 1.4 * prof);
  return new THREE.Vector3((u - 0.5) * 2 * t * aspect * dist, (0.5 - v) * 2 * t * dist + BAS_HABITACLE, -dist);
}

function Habitacle({ petit, refProf }) {
  const tex = useTexture(`${BASE}scene/habitacle-${petit ? 1000 : 1800}.webp`);
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);
  const prof = useTexture(`${BASE}scene/habitacle-profondeur.png`);
  // géométrie : une grille dont chaque point est repoussé le long de son rayon à la profondeur mesurée
  const geo = useMemo(() => {
    const img = prof.image;
    const c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;
    const g = c.getContext('2d');
    g.drawImage(img, 0, 0);
    const data = g.getImageData(0, 0, img.width, img.height).data;
    const lire = (u, v) => data[(Math.min(img.height - 1, Math.floor(v * img.height)) * img.width + Math.min(img.width - 1, Math.floor(u * img.width))) * 4] / 255;
    refProf.current = lire;
    const aspect = tex.image.width / tex.image.height;
    const nx = petit ? 140 : 220;
    const ny = Math.round(nx / aspect);
    const pos = [];
    const uv = [];
    // la grille déborde un peu de la photo (bords étirés) : en pivotant, on ne voit jamais de vide
    const M = 0.16;
    const lim = (x) => Math.min(1, Math.max(0, x));
    for (let j = 0; j <= ny; j++)
      for (let i = 0; i <= nx; i++) {
        const u = -M + (i / nx) * (1 + 2 * M);
        const v = -M * 0.5 + (j / ny) * (1 + 1.5 * M);
        const p = pointPhoto(u, v, lire(lim(u), lim(v)), aspect);
        pos.push(p.x, p.y, p.z);
        uv.push(lim(u), 1 - lim(v));
      }
    const idx = [];
    for (let j = 0; j < ny; j++)
      for (let i = 0; i < nx; i++) {
        const a = j * (nx + 1) + i;
        const b = a + 1;
        const c2 = a + nx + 1;
        const d = c2 + 1;
        idx.push(a, c2, b, b, c2, d);
      }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(idx);
    return geo;
  }, [prof, tex, petit, refProf]);
  return (
    <mesh geometry={geo}>
      <meshBasicMaterial map={tex} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

/** Les compartiments : où ils sont sur la photo (u, v), et ce qui s'y affiche. */
// u, v : le compartiment ; eu, ev : où flotte son étiquette (à la même profondeur, sans le cacher)
const COMPARTIMENTS = [
  { u: 0.47, v: 0.44, eu: 0.47, ev: 0.33, visee: 0.6, lignes: [['KILOMÉTRAGE', 34, ROUGE, 800], ['200 km / jour', 78], ['inclus dans chaque location', 34, '#c9c6c0', 500]] },
  { u: 0.78, v: 0.52, eu: 0.72, ev: 0.33, visee: 0.6, viseePortrait: 0.85, lignes: [['ASSISTANCE', 34, ROUGE, 800], ['24 h / 24', 78], ['7 j / 7, partout en France', 34, '#c9c6c0', 500]] },
  { u: 0.05, v: 0.5, eu: 0.17, ev: 0.38, visee: 0.45, viseePortrait: 0.85, lignes: [['ANNULATION', 34, ROUGE, 800], ['Gratuite', 78], ['jusqu’à 48 h avant le départ', 34, '#c9c6c0', 500]] },
];
// visee : fraction du chemin vers le compartiment (et son étiquette) que la caméra regarde, le reste vers le centre
// de la photo, pour ne pas trop tourner hors de la photo.

/** Une seule étiquette nette à la fois : celle du compartiment que la caméra regarde. */
const actif = { i: -1 };
function Etiquettes({ refProf, aspect }) {
  const refs = useRef([]);
  useFrame(() => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const but = actif.i === -1 ? 0.6 : i === actif.i ? 1 : 0;
      m.material.opacity += (but - m.material.opacity) * 0.12;
    });
  });
  const textures = useMemo(() => COMPARTIMENTS.map((c) => texteEtiquette(c.lignes)), []);
  const places = useMemo(() => {
    const lire = refProf.current || (() => 0.5);
    return COMPARTIMENTS.map((c) => {
      const p = pointPhoto(c.eu, c.ev, lire(c.u, c.v), aspect);
      // l'étiquette flotte un peu devant le compartiment, tournée vers le point de départ de la caméra
      const vers = new THREE.Vector3(0, BAS_HABITACLE, 0).sub(p).normalize();
      const pos = p.clone().addScaledVector(vers, 0.12);
      const m = new THREE.Matrix4().lookAt(new THREE.Vector3(0, BAS_HABITACLE, 0), pos, new THREE.Vector3(0, 1, 0));
      return { pos, q: new THREE.Quaternion().setFromRotationMatrix(m), cible: p };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- la carte de profondeur est lue une fois
  }, [aspect, refProf.current]);
  return places.map((pl, i) => (
    <mesh key={i} ref={(m) => (refs.current[i] = m)} position={pl.pos} quaternion={pl.q} renderOrder={5}>
      <planeGeometry args={[0.4, 0.141]} />
      <meshBasicMaterial map={textures[i]} transparent depthTest={false} toneMapped={false} />
    </mesh>
  ));
}

/* ---------- 3. les allées : une voiture par catégorie ---------- */
const Z_ALLEES = -40;
function Allees({ modeles, petit }) {
  const etiquettes = useMemo(
    () =>
      modeles.map((m) =>
        texteEtiquette([
          [m.categorie.toUpperCase(), 40, ROUGE, 800],
          [m.nom, 60],
          [`dès ${m.prix} € / jour · ${m.places} places`, 40, '#c9c6c0', 500],
        ]),
      ),
    [modeles],
  );
  return (
    <group position={[0, 0, Z_ALLEES]}>
      {modeles.map((m, i) => {
        const x = (i - (modeles.length - 1) / 2) * 5.4;
        return (
          <group key={m.id} position={[x, 0, 0]}>
            {/* la place éclairée */}
            <mesh rotation-x={-Math.PI / 2} position={[0, 0.002, 0]}>
              <planeGeometry args={[4.8, 3.2]} />
              <meshBasicMaterial color="#1a1a1d" toneMapped={false} />
            </mesh>
            <mesh rotation-x={-Math.PI / 2} position={[0, 0.003, 1.6]}>
              <planeGeometry args={[4.8, 0.05]} />
              <meshBasicMaterial color={ROUGE} toneMapped={false} />
            </mesh>
            <mesh position={[0, 4.1, 0]}>
              <boxGeometry args={[3.6, 0.05, 0.3]} />
              <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>
            <Voiture fichier={`${BASE}scene/voiture-${m.id}-${petit ? 720 : 1400}.webp`} hauteur={m.hauteurPhoto} />
            <mesh position={[0, 0.42, 1.75]} rotation-x={-0.5}>
              <planeGeometry args={[2.4, 0.84]} />
              <meshBasicMaterial map={etiquettes[i]} transparent toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ---------- caméra ---------- */
function Camera({ progres, refProf, aspect, nModeles, refVoiture }) {
  const { camera, size } = useThree();
  const a = useMemo(() => new THREE.Vector3(), []);
  const b = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const portrait = size.width / size.height < 1;
    if (progres.lisse === undefined) progres.lisse = progres.current;
    progres.lisse += (progres.current - progres.lisse) * 0.08;
    const p = progres.lisse;
    // 1. showroom : la voiture fonce vers nous
    if (p < REPERES.noir[0] + (REPERES.noir[1] - REPERES.noir[0]) / 2) {
      camera.fov = portrait ? 62 : 42;
      camera.updateProjectionMatrix();
      const k = entre(p, REPERES.fonce);
      if (refVoiture.current) refVoiture.current.position.z = Math.pow(k, 2.2) * 9.5;
      const tremble = k > 0.6 ? (Math.sin(horloge.maintenant() * 60) * 0.006 * (k - 0.6)) / 0.4 : 0;
      // ordinateur : la voiture à droite du titre, puis recentrée quand elle fonce
      const dx = portrait ? 0 : -1.5 * (1 - doux(k * 2.5));
      camera.position.set(dx + tremble, 1.2 + tremble, portrait ? 8.6 : 6.6);
      camera.lookAt(dx, portrait ? -0.35 : 0.75, 0);
      return;
    }
    // 2. dans l'habitacle
    if (p < REPERES.sortie[0] + (REPERES.sortie[1] - REPERES.sortie[0]) / 2) {
      // champ ajusté pour que la photo remplisse toujours l'écran (un peu resserré pour garder de la marge)
      const t = Math.tan(THREE.MathUtils.degToRad(H_FOV / 2)) * Math.min(1, aspect / camera.aspect) * 0.9;
      camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(t));
      camera.updateProjectionMatrix();
      const lire = refProf.current || (() => 0.5);
      const pts = COMPARTIMENTS.map((c) => pointPhoto(c.u, c.v, lire(c.u, c.v), aspect));
      const regards = COMPARTIMENTS.map((c) => pointPhoto((c.u + c.eu) / 2, (c.v + c.ev) / 2, lire(c.u, c.v), aspect));
      const depart = b.set(0, BAS_HABITACLE, 0.15);
      // arrêts : [progression, position (vers le compartiment, en %), compartiment visé (-1 = tout droit)]
      const arrets = [
        [REPERES.habitacle[0], 0, -1],
        [0.24, 0.0, -1],
        [0.3, 0.42, 0],
        [0.36, 0.42, 0],
        [0.42, 0.38, 1],
        [0.47, 0.38, 1],
        [0.53, 0.3, 2],
        [0.58, 0.3, 2],
        [REPERES.sortie[1], 0.95, 3],
      ];
      let i = 1;
      while (i < arrets.length - 1 && p > arrets[i][0]) i++;
      const [t0, f0, c0] = arrets[i - 1];
      const [t1, f1, c1] = arrets[i];
      const k = doux((p - t0) / (t1 - t0));
      const centre = pointPhoto(0.5, 0.48, lire(0.5, 0.48), aspect);
      const vise = (c) =>
        c === -1 ? new THREE.Vector3(0, BAS_HABITACLE, -3) : c === 3 ? pointPhoto(0.5, 0.18, 0.05, aspect) : centre.clone().lerp(regards[c], (portrait && COMPARTIMENTS[c].viseePortrait) || COMPARTIMENTS[c].visee);
      const cible0 = vise(c0);
      const cible1 = vise(c1);
      const cible = cible0.clone().lerp(cible1, k);
      const vers = (c) => (c === -1 || c === 3 ? vise(c) : pts[c]);
      const pos0 = depart.clone().lerp(vers(c0), f0 * (c0 === -1 ? 0 : 1));
      const pos1 = depart.clone().lerp(vers(c1), f1 * (c1 === -1 ? 0 : 1));
      camera.position.copy(pos0.lerp(pos1, k));
      camera.lookAt(cible);
      return;
    }
    // 3. les allées : la caméra passe d'une voiture à l'autre
    camera.fov = portrait ? 64 : 42;
    camera.updateProjectionMatrix();
    const k = entre(p, REPERES.allees);
    const n = nModeles;
    // arrêt doux devant chaque voiture
    const s = k * (n - 1);
    const i0 = Math.floor(Math.min(n - 1.0001, s));
    const f = doux(s - i0);
    const x = ((i0 + f) - (n - 1) / 2) * 5.4;
    const recul = portrait ? 9.5 : 7.4;
    camera.position.set(x + (portrait ? 0 : -1.2), 1.6, Z_ALLEES + recul);
    camera.lookAt(a.set(x, 0.9, Z_ALLEES));
  });
  return null;
}

function Ambiance({ taille }) {
  const env = useTexture(`${BASE}scene/parking-${taille}.jpg`);
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

/** Mode test (?image-par-image) : le script de vidéo avance la scène d'une image à la fois. */
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

export default function Velocita3D({ progres, modeles, leger, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  const refProf = useRef(null);
  const refVoiture = useRef(null);
  const aspect = 2000 / 1600; // proportions de la photo d'habitacle
  const coupe = modeles.find((m) => m.id === 'premium');
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={leger ? [1, 1.25] : petit ? [1, 1.6] : [1, 1.75]}
      frameloop={IMAGE_PAR_IMAGE || !actif ? 'never' : 'always'}
      camera={{ fov: 42, near: 0.02, far: 120, position: [0, 1.25, 8.2] }}
      gl={{ antialias: !leger, powerPreference: 'high-performance' }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        scene.background = new THREE.Color('#060607');
        scene.fog = new THREE.Fog('#060607', 14, 40);
      }}
      aria-hidden="true"
    >
      <Pilote />
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 4, 3]} intensity={30} distance={14} color="#ffffff" />
      <pointLight position={[0, 4, Z_ALLEES + 2]} intensity={60} distance={20} color="#ffffff" />
      <Suspense fallback={null}>
        <Ambiance taille={petit ? 512 : 1024} />
        <Sol />
        <TraitsVitesse progres={progres} />
        <Voiture fichier={`${BASE}scene/voiture-premium-${petit ? 720 : 1400}.webp`} hauteur={coupe.hauteurPhoto} refVoiture={refVoiture} />
        <Habitacle petit={petit} refProf={refProf} />
        <Etiquettes refProf={refProf} aspect={aspect} />
        <Allees modeles={modeles} petit={petit} />
        <Camera progres={progres} refProf={refProf} aspect={aspect} nModeles={modeles.length} refVoiture={refVoiture} />
        <Pret onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
