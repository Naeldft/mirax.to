import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { photoUrl } from '../components/Photo.jsx';

/* ------------------------------------------------------------------
   Galerie 3D commune (Atelier Mèche, Pulse Coaching, Lumen Studio, Les Racines, Cap Horizon).
   Une allée aux couleurs de la marque : les VRAIES photos de la démo sont encadrées (cadre, passe-partout,
   ombre portée, halo de lumière au mur), alternées à droite et à gauche. Le défilement fait avancer la caméra,
   qui pivote vers chaque cadre ; la photo s'incline légèrement et zoome doucement (relief).
   Construit en code, aucune texture externe : seules les photos de la démo sont des images.
------------------------------------------------------------------- */

const IMAGE_PAR_IMAGE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('image-par-image');
const horloge = { t: 0, maintenant: () => (IMAGE_PAR_IMAGE ? horloge.t : performance.now() / 1000) };
const doux = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

const PAS = 3.2; // distance entre deux cadres le long de l'allée
const ECART = 1.55; // distance de l'allée aux murs
const HAUTEUR = 1.5; // centre des cadres
const TAILLE = 1.25; // hauteur d'une photo

/** Position et orientation du cadre n° i (alterné droite / gauche). */
export function placeCadre(i) {
  const cote = i % 2 === 0 ? 1 : -1;
  return { cote, x: cote * ECART, z: -2.6 - i * PAS, ry: -cote * 0.55 };
}

/** Repères du défilement : intro, un arrêt par photo, sortie. */
export function reperes(n) {
  const debut = 0.1;
  const fin = 0.9;
  const part = (fin - debut) / n;
  return { debut, fin, part, arret: (i) => [debut + i * part + part * 0.25, debut + i * part + part * 0.9] };
}

let _halo;
function halo() {
  if (_halo) return _halo;
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(128, 96, 4, 128, 128, 128);
  r.addColorStop(0, 'rgba(255,248,236,0.9)');
  r.addColorStop(1, 'rgba(255,248,236,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 256, 256);
  _halo = new THREE.CanvasTexture(c);
  return _halo;
}
let _ombre;
function ombre() {
  if (_ombre) return _ombre;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.filter = 'blur(10px)';
  g.fillStyle = 'rgba(0,0,0,0.55)';
  g.fillRect(24, 24, 80, 80);
  _ombre = new THREE.CanvasTexture(c);
  return _ombre;
}

function Cadre({ tex, i, theme, progres, n }) {
  const { x, z, ry } = placeCadre(i);
  const h = TAILLE;
  const l = (h * tex.image.width) / tex.image.height;
  const marge = 0.09;
  const bord = 0.05;
  const groupe = useRef();
  const { arret } = reperes(n);
  useFrame(() => {
    const [a, b] = arret(i);
    const k = doux((progres.lisse - a + 0.1) / (b - a + 0.1));
    // la photo zoome doucement pendant qu'on la regarde (relief), et le cadre se tourne un peu vers nous
    tex.repeat.setScalar(1 - 0.06 * k);
    tex.offset.setScalar(0.03 * k);
    if (groupe.current) groupe.current.rotation.y = ry * (1 - 0.35 * k);
  });
  return (
    <group position={[x, HAUTEUR, z]}>
      {/* halo de lumière au mur, derrière */}
      <mesh position={[x > 0 ? 0.25 : -0.25, 0.25, -0.02]} rotation-y={ry}>
        <planeGeometry args={[l * 2.4, h * 2.2]} />
        <meshBasicMaterial map={halo()} transparent opacity={0.55} depthWrite={false} toneMapped={false} color={theme.halo} />
      </mesh>
      <group ref={groupe} rotation-y={ry}>
        <mesh position={[0.06, -0.08, -0.06]}>
          <planeGeometry args={[l + 2 * (marge + bord) + 0.25, h + 2 * (marge + bord) + 0.25]} />
          <meshBasicMaterial map={ombre()} transparent depthWrite={false} />
        </mesh>
        {/* cadre */}
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[l + 2 * (marge + bord), h + 2 * (marge + bord), 0.06]} />
          <meshStandardMaterial color={theme.cadre} roughness={0.45} metalness={theme.metal ?? 0.2} />
        </mesh>
        {/* passe-partout */}
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[l + 2 * marge, h + 2 * marge]} />
          <meshStandardMaterial color={theme.passe} roughness={0.95} />
        </mesh>
        {/* la vraie photo, légèrement en retrait (relief du passe-partout) */}
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[l, h]} />
          <meshStandardMaterial map={tex} roughness={0.55} envMapIntensity={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function Allee({ theme, n }) {
  const long = n * PAS + 6;
  const sol = useMemo(() => new THREE.MeshStandardMaterial({ color: theme.sol, roughness: 0.32, metalness: 0.15 }), [theme]);
  const mur = useMemo(() => new THREE.MeshStandardMaterial({ color: theme.mur, roughness: 0.92 }), [theme]);
  const ligne = useMemo(() => new THREE.MeshBasicMaterial({ color: theme.accent, toneMapped: false }), [theme]);
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -long / 2 + 3]} material={sol}>
        <planeGeometry args={[ECART * 2 + 6, long]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (ECART + 0.35), 2, -long / 2 + 3]} rotation-y={-s * (Math.PI / 2)} material={mur}>
          <planeGeometry args={[long, 4]} />
        </mesh>
      ))}
      {/* fine ligne de couleur de la marque au sol, qui file vers le fond */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.002, -long / 2 + 3]} material={ligne}>
        <planeGeometry args={[0.025, long]} />
      </mesh>
      <mesh position={[0, 2, -long + 3]} material={mur}>
        <planeGeometry args={[ECART * 2 + 1, 4]} />
      </mesh>
    </group>
  );
}

function Camera({ progres, n }) {
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
    const { debut, part } = reperes(n);
    // vue de chaque arrêt : en face du cadre, de biais ; le cadre à droite du texte (ordinateur) ou en haut (téléphone)
    const vue = (i, pos, cib) => {
      if (i < 0) {
        pos.set(0, 1.6, 3.2);
        cib.set(0, 1.45, -6);
        return;
      }
      const { cote, x, z } = placeCadre(Math.min(i, n - 1));
      const recul = portrait ? 3.3 : 2.9;
      pos.set(x - cote * recul * 0.75, 1.55, z + recul * 0.62);
      cib.set(x, HAUTEUR - (portrait ? 0.75 : 0), z);
      if (!portrait) {
        // décale la visée pour laisser la place du texte à gauche
        const d = new THREE.Vector3().subVectors(cib, pos).normalize();
        const droite = new THREE.Vector3(-d.z, 0, d.x);
        cib.addScaledVector(droite, -0.75);
      }
      if (i >= n) {
        pos.z -= 1.2;
        cib.set(0, 1.5, z - 6);
      }
    };
    const s = (p - debut) / part; // 0 → n
    const i0 = Math.floor(s);
    const f = s - i0;
    // on reste devant le cadre (60 % de sa part), puis on passe au suivant
    const k = doux((f - 0.6) / 0.4);
    vue(Math.max(-1, Math.min(n, i0)), p0, c0);
    vue(Math.max(-1, Math.min(n, i0 + 1)), p1, c1);
    if (s < 0) {
      vue(-1, p0, c0);
      vue(0, p1, c1);
      const kk = doux((p / debut - 0.35) / 0.65);
      camera.position.copy(p0.lerp(p1, kk));
      camera.lookAt(c0.lerp(c1, kk));
    } else {
      camera.position.copy(p0.lerp(p1, k));
      camera.lookAt(c0.lerp(c1, k));
    }
    // une respiration très douce (on n'est pas sur un trépied)
    camera.position.y += Math.sin(horloge.maintenant() * 0.6) * 0.008;
    camera.fov = portrait ? 62 : 46;
    camera.updateProjectionMatrix();
  });
  return null;
}

function Cadres({ photos, theme, progres, petit }) {
  const textures = useTexture(photos.map((p) => photoUrl(p.nom, petit ? 800 : 1600)));
  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    });
  }, [textures]);
  return photos.map((p, i) => <Cadre key={p.nom} tex={textures[i]} i={i} theme={theme} progres={progres} n={photos.length} />);
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

/**
 * theme : { fond, mur, sol, cadre, passe, accent, halo, lumiere, metal? }
 * photos : [{ nom }] (noms des photos de la démo, servies par public/images/<nom>-800|1600.webp)
 */
export default function Galerie3D({ progres, photos, theme, leger, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={leger ? [1, 1.25] : petit ? [1, 1.6] : [1, 1.75]}
      frameloop={IMAGE_PAR_IMAGE || !actif ? 'never' : 'always'}
      camera={{ fov: 46, near: 0.05, far: 60, position: [0, 1.6, 3.2] }}
      gl={{ antialias: !leger, powerPreference: 'high-performance' }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        scene.background = new THREE.Color(theme.fond);
        scene.fog = new THREE.Fog(theme.fond, 6, 16);
      }}
      aria-hidden="true"
    >
      <Pilote />
      <hemisphereLight args={[theme.lumiere ?? '#ffffff', theme.sol, 1.1]} />
      <directionalLight position={[2, 6, 4]} intensity={1.2} color={theme.lumiere ?? '#ffffff'} />
      <Suspense fallback={null}>
        <Allee theme={theme} n={photos.length} />
        <Cadres photos={photos} theme={theme} progres={progres} petit={petit} />
        <Camera progres={progres} n={photos.length} />
        <Pret onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
