import { PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { StrictMode, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import { defilement } from './defilement.js';

/* ------------------------------------------------------------------
   « L'espace » Patrôn Studio, derrière la page d'accueil.
   Une grande galerie noire, sol laqué, faisceaux de lumière blanche et poussière.
   Chaque section de la page est une « station » ; on entre dans chacune par un
   portail en verre dépoli, cerclé de néon blanc (même style que l'intro).
   La caméra avance d'une station à l'autre avec le défilement (defilement.station).
   Menu « Vue d'ensemble » : la caméra prend de la hauteur et montre tous les portails.
------------------------------------------------------------------- */

const ESPACE = 14; // distance entre deux stations
const Z0 = 6; // position de la caméra sur la 1re station
const PORTAIL = [6.4, 4]; // largeur, hauteur
const Y_PORTAIL = 0.55;
const zStation = (i) => Z0 - i * ESPACE;
const zPortail = (i) => zStation(i) + 1.3; // juste derrière la caméra quand elle arrive à la station

/** Sol sombre et laqué : la lumière blanche s'y reflète. */
function Sol({ qualite, longueur }) {
  const mat = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d');
    g.fillStyle = '#0d0d0e';
    g.fillRect(0, 0, 256, 256);
    g.strokeStyle = 'rgba(255,255,255,0.06)'; // joints de dalles très discrets
    g.lineWidth = 2;
    g.strokeRect(1, 1, 254, 254);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, longueur / 4);
    t.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({ map: t, color: '#ffffff', metalness: 0.8, roughness: qualite === 'haute' ? 0.28 : 0.45 });
  }, [qualite, longueur]);
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -1.6, Z0 + 10 - longueur / 2]} material={mat}>
      <planeGeometry args={[30, longueur]} />
    </mesh>
  );
}

/** Faisceaux de lumière blanche (plans additifs) qui jalonnent la galerie. */
function Faisceaux({ longueur }) {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 256;
    const g = c.getContext('2d');
    const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, 'rgba(255,255,255,0.0)');
    grad.addColorStop(0.15, 'rgba(255,255,255,0.6)');
    grad.addColorStop(1, 'rgba(255,255,255,0.0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 256);
    const h = g.createLinearGradient(0, 0, 64, 0);
    h.addColorStop(0, 'rgba(0,0,0,1)');
    h.addColorStop(0.5, 'rgba(0,0,0,0)');
    h.addColorStop(1, 'rgba(0,0,0,1)');
    g.globalCompositeOperation = 'destination-out';
    g.fillStyle = h;
    g.fillRect(0, 0, 64, 256);
    return new THREE.CanvasTexture(c);
  }, []);
  const n = Math.round(longueur / 8);
  const pos = useMemo(() => Array.from({ length: n }, (_, i) => [(i % 2 ? 1 : -1) * (4.4 + (i % 3) * 0.9), Z0 - 4 - i * 8]), [n]);
  return (
    <group>
      {pos.map(([x, z], i) => (
        <mesh key={i} position={[x, 2.4, z]} rotation={[0, 0, (i % 2 ? -1 : 1) * 0.12]}>
          <planeGeometry args={[1.6, 9]} />
          <meshBasicMaterial map={tex} color="#ffffff" transparent opacity={0.14} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

/** Poussière lumineuse en suspension. */
function Poussiere({ n, reduit, longueur }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) a.set([(Math.random() - 0.5) * 18, Math.random() * 7 - 1.4, Z0 + 8 - Math.random() * longueur], i * 3);
    g.setAttribute('position', new THREE.BufferAttribute(a, 3));
    return g;
  }, [n, longueur]);
  useFrame((_, dt) => {
    if (reduit || !ref.current) return;
    ref.current.rotation.z += dt * 0.004;
    ref.current.position.y = Math.sin(performance.now() / 4000) * 0.15;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#ffffff" size={0.035} transparent opacity={0.5} depthWrite={false} sizeAttenuation />
    </points>
  );
}

/* ---------- portails en verre dépoli ---------- */

const police = () => (document.fonts?.check?.('600 40px Studio') ? '"Studio", system-ui, sans-serif' : 'system-ui, sans-serif');

/** Vitre dépolie : voile blanc granuleux, plus givré sur les bords, et le nom de la section gravé. */
function textureVitre(numero, nom) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 640;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(512, 320, 120, 512, 320, 620);
  r.addColorStop(0, 'rgba(255,255,255,0.035)');
  r.addColorStop(1, 'rgba(255,255,255,0.16)');
  g.fillStyle = r;
  g.fillRect(0, 0, 1024, 640);
  // grain du verre dépoli
  for (let i = 0; i < 9000; i++) {
    g.fillStyle = `rgba(255,255,255,${(Math.random() * 0.07).toFixed(3)})`;
    g.fillRect(Math.random() * 1024, Math.random() * 640, 2, 2);
  }
  const f = police();
  g.fillStyle = 'rgba(255,255,255,0.7)';
  g.font = `500 34px ${f}`;
  g.fillText(String(numero).padStart(2, '0'), 72, 104);
  g.fillStyle = 'rgba(255,255,255,0.92)';
  let taille = 92;
  g.font = `600 ${taille}px ${f}`;
  while (g.measureText(nom).width > 860 && taille > 48) g.font = `600 ${(taille -= 6)}px ${f}`;
  g.shadowColor = 'rgba(255,255,255,0.45)';
  g.shadowBlur = 18;
  g.fillText(nom, 72, 560);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Cadre en néon blanc (même recette que les icônes de l'intro : halo large, halo serré, tube). */
function textureCadre() {
  const c = document.createElement('canvas');
  c.width = 1024 + 128;
  c.height = 640 + 128;
  const g = c.getContext('2d');
  g.translate(64, 64);
  g.lineJoin = 'round';
  const cadre = new Path2D();
  cadre.roundRect(6, 6, 1012, 628, 34);
  const passe = (largeur, couleur, flou) => {
    g.lineWidth = largeur;
    g.strokeStyle = couleur;
    g.shadowBlur = flou;
    g.shadowColor = '#ffffff';
    g.stroke(cadre);
  };
  passe(18, 'rgba(255,255,255,0.14)', 46);
  passe(8, 'rgba(240,244,255,0.7)', 16);
  passe(3, '#ffffff', 4);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Place du portail dans la vue d'ensemble : une rangée face à la caméra (deux rangées sur écran vertical). */
function placeEnsemble(index, n, zBase) {
  const portrait = innerWidth / innerHeight < 1;
  if (portrait) {
    const parLigne = Math.ceil(n / 2);
    const ligne = Math.floor(index / parLigne);
    const col = index % parLigne;
    const nb = ligne === 0 ? parLigne : n - parLigne;
    return { x: (col - (nb - 1) / 2) * 1.2, y: 4.05 - ligne * 0.95, z: zBase - 6, echelle: 0.17 };
  }
  return { x: (index - (n - 1) / 2) * 2.1, y: 1.55, z: zBase - 6, echelle: 0.28 };
}

function Portail({ index, n, nom, cadre }) {
  const vitre = useRef();
  const neon = useRef();
  const groupe = useRef();
  const tex = useMemo(() => textureVitre(index + 1, nom), [index, nom]);
  const zCouloir = zPortail(index);
  useFrame(() => {
    const m = defilement.melange; // 0 : dans la galerie, 1 : vue d'ensemble
    const cam = defilement.zCamera;
    // dans la galerie : visible seulement pendant l'approche, puis il s'efface avant qu'on le traverse
    const devant = cam - zCouloir;
    // écran vertical : portails plus petits et effacés plus tôt (sinon plus larges que l'écran)
    const portrait = innerWidth / innerHeight < 1;
    const base = portrait ? 0.5 : 1;
    const approche = THREE.MathUtils.clamp((devant - (portrait ? 5 : 3.4)) / 3, 0, 1) * THREE.MathUtils.clamp((13.5 - devant) / 4, 0, 1);
    const visible = index === 0 ? 0 : approche * 0.8;
    const survole = m > 0.5 && defilement.survol === index;
    const k = visible + (1 - visible) * m;
    // dans la galerie : cadre néon bien visible, vitre plus discrète (le texte de la page reste lisible)
    vitre.current.opacity = k * (0.22 + 0.78 * m); // nom gravé discret dans la galerie, lisible dans la vue d'ensemble
    neon.current.opacity = Math.min(1, (visible * 1.25 + (1 - visible) * m) * (survole || m < 0.5 ? 1 : 0.75));
    // trajet entre la galerie et la rangée de la vue d'ensemble
    const e = placeEnsemble(index, n, cam);
    const g = groupe.current;
    g.position.set(e.x * m, Y_PORTAIL + (e.y - Y_PORTAIL) * m, zCouloir + (e.z - zCouloir) * m);
    const echelle = base + (e.echelle * (survole ? 1.18 : 1) - base) * m;
    g.scale.setScalar(g.scale.x + (echelle - g.scale.x) * 0.25);
    g.rotation.y = -e.x * 0.04 * m;
    g.visible = k > 0.003;
  });
  return (
    <group ref={groupe} position={[0, Y_PORTAIL, zCouloir]}>
      <mesh renderOrder={2}>
        <planeGeometry args={PORTAIL} />
        <meshBasicMaterial ref={vitre} map={tex} transparent depthWrite={false} fog={false} />
      </mesh>
      <mesh renderOrder={3} position={[0, 0, 0.01]}>
        <planeGeometry args={[PORTAIL[0] * (1152 / 1024), PORTAIL[1] * (768 / 640)]} />
        <meshBasicMaterial ref={neon} map={cadre} transparent depthWrite={false} fog={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

/* ---------- caméra ---------- */

const melange = (a, b, k) => a + (b - a) * k;
const doux = (x) => x * x * (3 - 2 * x);

/** Caméra : avance de station en station avec le défilement ; prend de la hauteur pour la vue d'ensemble. */
function Camera({ reduit }) {
  const { camera } = useThree();
  const cible = useRef({ x: 0, y: 0 });
  const station = useRef(defilement.station);
  const haut = useRef(0);
  useEffect(() => {
    if (reduit) return;
    const bouge = (e) => {
      cible.current.x = e.clientX / innerWidth - 0.5;
      cible.current.y = e.clientY / innerHeight - 0.5;
    };
    addEventListener('pointermove', bouge, { passive: true });
    return () => removeEventListener('pointermove', bouge);
  }, [reduit]);
  useFrame(() => {
    const vitesse = reduit ? 1 : 0.075;
    station.current += (defilement.station - station.current) * vitesse;
    haut.current += ((defilement.ensemble ? 1 : 0) - haut.current) * (reduit ? 1 : 0.06);
    const z = zStation(station.current);
    defilement.zCamera = z;
    const { x: px, y: py } = cible.current;
    // vue normale : dans la galerie, à hauteur d'homme
    const a = [px * 0.6, 0.2 - py * 0.3, z];
    const va = [px * 0.3, 0.3, z - 10];
    // vue d'ensemble : en hauteur, de biais, toute l'enfilade de portails
    const b = [px * 0.8, 1.6 - py * 0.4, z + 4];
    const vb = [0, 1.5, z - 8];
    const k = doux(haut.current);
    defilement.melange = k;
    camera.position.set(melange(a[0], b[0], k), melange(a[1], b[1], k), melange(a[2], b[2], k));
    camera.lookAt(melange(va[0], vb[0], k), melange(va[1], vb[1], k), melange(va[2], vb[2], k));
  });
  return null;
}

/** Lumière qui accompagne la caméra (le sol et les portails proches brillent). */
function Torche() {
  const ref = useRef();
  useFrame(({ camera }) => ref.current.position.set(camera.position.x, 3.5, camera.position.z - 4));
  return <pointLight ref={ref} intensity={28} distance={22} color="#ffffff" />;
}

function Scene({ tier, reduit, actif }) {
  const [qualite, setQualite] = useState(tier === 'high' ? 'haute' : 'normale');
  const petit = innerWidth < 768;
  const noms = defilement.stations.length ? defilement.stations : ['Accueil'];
  const n = noms.length;
  const longueur = n * ESPACE + 30;
  const cadre = useMemo(() => textureCadre(), []);
  return (
    <Canvas
      dpr={petit ? [1, 1.25] : qualite === 'haute' ? [1, 1.75] : [1, 1.4]}
      frameloop={!actif ? 'never' : reduit ? 'demand' : 'always'}
      camera={{ position: [0, 0.2, Z0], fov: 55, near: 0.1, far: 90 }}
      gl={{ antialias: !petit, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor('#050505');
        scene.fog = new THREE.FogExp2('#050505', 0.045);
      }}
    >
      <PerformanceMonitor onDecline={() => setQualite('normale')} />
      <ambientLight intensity={0.3} />
      <hemisphereLight args={['#ffffff', '#0a0a0a', 0.35]} />
      <Torche />
      <Sol qualite={qualite} longueur={longueur} />
      <Faisceaux longueur={longueur} />
      {tier !== 'low' && <Poussiere n={petit ? 220 : 520} reduit={reduit} longueur={longueur} />}
      {noms.map((nom, i) => (
        <Portail key={i} index={i} n={n} nom={nom} cadre={cadre} />
      ))}
      <Camera reduit={reduit} />
    </Canvas>
  );
}

function Racine({ tier, reduit }) {
  const [actif, setActif] = useState(true);
  useEffect(() => {
    const vis = () => setActif(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', vis);
    return () => document.removeEventListener('visibilitychange', vis);
  }, []);
  return <Scene tier={tier} reduit={reduit} actif={actif} />;
}

export function monter(hote, options) {
  createRoot(hote).render(
    <StrictMode>
      <Racine {...options} />
    </StrictMode>,
  );
  requestAnimationFrame(() => hote.classList.add('pret'));
}
