import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useGLTF, useTexture } from '@react-three/drei';
import { DepthOfField, EffectComposer, N8AO, Noise, ToneMapping, Vignette } from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import Differe, { signalerScenePrete } from '@demos/shared/three/Differe.jsx';
import Personnage from '@demos/shared/three/Personnage.jsx';
import { grain, usePBR } from '@demos/shared/three/materiaux.js';

/* ------------------------------------------------------------------
   Intro 3D des Racines (pilotée par le défilement, progres 0 → 1).
   La cour de la Maison des Racines, un samedi matin : allée de terre battue, pelouse, murs de briques, la façade
   de la maison au fond avec son enseigne peinte. Un coin par action de l'association, à gauche puis à droite :
   le jardin partagé (bacs potagers), l'aide aux devoirs (table sous la pergola), le repair café (établi),
   l'épicerie solidaire (étal de cagettes). Bénévoles et habitants : mannequins habillés, en pleine action.
   Rendu : matières PBR Poly Haven (CC0), lumière d'un vrai jardin (HDRI Poly Haven « garden nook »), soleil
   et ombres douces, occlusion ambiante, rendu filmique AgX, profondeur de champ, grain et vignettage.
   Poids : textures 256 px pour le premier affichage puis 512 px (téléphone) ou 1 024 px (ordinateur),
   décor (plantes, caisses) chargé après la scène.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const IMAGE_PAR_IMAGE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('image-par-image');
const horloge = { t: 0, maintenant: () => (IMAGE_PAR_IMAGE ? horloge.t : performance.now() / 1000) };
const doux = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

const L = 5;
const FOND = -13.6;
const MUR = 2.6;

/** Les coins de la cour (une action chacun), à gauche puis à droite. */
export const POSTES = [
  { id: 'jardin', cote: -1, z: -2.8 },
  { id: 'devoirs', cote: 1, z: -5.5 },
  { id: 'repair', cote: -1, z: -8.2 },
  { id: 'epicerie', cote: 1, z: -10.9 },
];
const X_POSTE = 2.55;

/* ---------- la cour ---------- */
function Sol({ def }) {
  const allee = usePBR('stony_dirt_path', { def, repeat: [1.2, -FOND / 2], couleur: '#d8cbb8', env: 0.4 });
  const herbe = usePBR('grass_ground', { def, repeat: [2, -FOND / 2.5], couleur: '#c9d4b4', env: 0.35 });
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.002, FOND / 2]} material={allee} receiveShadow userData={{ coque: true }}>
        <planeGeometry args={[2.4, -FOND]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} rotation-x={-Math.PI / 2} position={[s * (1.2 + (L - 1.2) / 2), 0, FOND / 2]} material={herbe} receiveShadow userData={{ coque: true }}>
          <planeGeometry args={[L - 1.2, -FOND]} />
        </mesh>
      ))}
    </group>
  );
}

function Cour({ def }) {
  const long = -FOND;
  const brique = usePBR('red_brick_03', { def, repeat: [long / 2.2, MUR / 2.2], couleur: '#e6d4c6', env: 0.45 });
  const facade = usePBR('red_brick_03', { def, repeat: [2 * L / 2.2, 6 / 2.2], couleur: '#e6d4c6', env: 0.45 });
  const bois = usePBR('weathered_planks', { def, repeat: [1, 1], couleur: '#d8c9b0', env: 0.5 });
  const m = useMemo(
    () => ({
      menuiserie: new THREE.MeshStandardMaterial({ color: '#2f5446', roughness: 0.55 }),
      vitre: new THREE.MeshStandardMaterial({ color: '#c9d6d8', roughness: 0.08, metalness: 0.2, envMapIntensity: 1.2 }),
      couvertine: new THREE.MeshStandardMaterial({ color: '#9b9186', roughness: 0.8, normalMap: grain(), normalScale: new THREE.Vector2(0.4, 0.4) }),
    }),
    [],
  );
  const enseigne = useMemo(() => panneau('Maison des Racines', 'Association de quartier · depuis 2014'), []);
  return (
    <group>
      <Sol def={def} />
      {/* murs de la cour, briques, avec leur couvertine */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * L, MUR / 2, FOND / 2]} rotation-y={(-s * Math.PI) / 2} material={brique} userData={{ coque: true }}>
            <planeGeometry args={[long, MUR]} />
          </mesh>
          <mesh position={[s * (L - 0.05), MUR + 0.04, FOND / 2]} material={m.couvertine}>
            <boxGeometry args={[0.3, 0.08, long]} />
          </mesh>
        </group>
      ))}
      {/* la façade de la Maison des Racines, au fond : briques, fenêtres vert sapin, porte, enseigne peinte */}
      <group position={[0, 0, FOND]}>
        <mesh position={[0, 3, 0]} material={facade} userData={{ coque: true }}>
          <planeGeometry args={[2 * L, 6]} />
        </mesh>
        {[-3, -1.1, 1.1, 3].map((x) =>
          [1.5, 4.3].map((y) => (
            <group key={`${x}${y}`} position={[x, y, 0.03]}>
              <mesh material={m.menuiserie}>
                <boxGeometry args={[1.0, 1.4, 0.06]} />
              </mesh>
              <mesh material={m.vitre} position={[0, 0, 0.035]}>
                <planeGeometry args={[0.86, 1.26]} />
              </mesh>
              <mesh material={m.menuiserie} position={[0, 0, 0.05]}>
                <boxGeometry args={[0.04, 1.26, 0.02]} />
              </mesh>
            </group>
          )),
        )}
        <mesh material={m.menuiserie} position={[0, 1.1, 0.04]}>
          <boxGeometry args={[1.1, 2.2, 0.08]} />
        </mesh>
        <mesh position={[0, 2.85, 0.05]}>
          <planeGeometry args={[3.4, 0.85]} />
          <meshStandardMaterial map={enseigne} roughness={0.7} />
        </mesh>
      </group>
      {/* bancs de planches le long des murs */}
      {[-6.8, -12.3].map((z, i) => (
        <mesh key={z} material={bois} position={[(i ? 1 : -1) * (L - 0.35), 0.45, z]}>
          <boxGeometry args={[0.45, 0.06, 1.6]} />
        </mesh>
      ))}
      <Differe>
        <Modele nom="shrub_01" position={[-L + 0.6, 0, -0.6]} scale={1.1} />
        <Modele nom="shrub_01" position={[L - 0.6, 0, -13]} scale={1.1} rotation-y={2} />
        <Modele nom="potted_plant_02" position={[-1.5, 0, FOND + 0.4]} scale={1.2} />
        <Modele nom="potted_plant_02" position={[1.5, 0, FOND + 0.4]} scale={1.2} rotation-y={1} />
      </Differe>
    </group>
  );
}

/** Enseigne peinte à la main sur une planche (texte sur canevas). */
function panneau(titre, sous) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#efe6cf';
  g.fillRect(0, 0, 1024, 256);
  g.strokeStyle = '#1f4d3a';
  g.lineWidth = 10;
  g.strokeRect(14, 14, 996, 228);
  g.fillStyle = '#1f4d3a';
  g.textAlign = 'center';
  g.font = '700 92px "Bricolage Grotesque Variable", Georgia, serif';
  g.fillText(titre, 512, 128);
  g.fillStyle = '#e5533d';
  g.font = '700 38px "Nunito Variable", sans-serif';
  g.fillText(sous, 512, 200);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function ModeleCharge({ nom, ...props }) {
  const { scene } = useGLTF(`${BASE}scene/modeles/${nom}.glb`);
  const c = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={c} {...props} />;
}
/** Chargé après le premier affichage de la scène (détail). */
function Modele(props) {
  return (
    <Differe>
      <ModeleCharge {...props} />
    </Differe>
  );
}

/* ---------- le potager ---------- */
function useVerdure() {
  return useMemo(
    () => ({
      feuille: new THREE.MeshStandardMaterial({ color: '#5f8a3a', roughness: 0.75, side: THREE.DoubleSide }),
      salade: new THREE.MeshStandardMaterial({ color: '#8dbb4f', roughness: 0.7, side: THREE.DoubleSide }),
      tomate: new THREE.MeshPhysicalMaterial({ color: '#c8361f', roughness: 0.35, clearcoat: 0.6 }),
      tomateVerte: new THREE.MeshPhysicalMaterial({ color: '#8fae3c', roughness: 0.4, clearcoat: 0.4 }),
      tuteur: new THREE.MeshStandardMaterial({ color: '#a9895f', roughness: 0.9 }),
      courgette: new THREE.MeshStandardMaterial({ color: '#3f6b2a', roughness: 0.55 }),
      carotte: new THREE.MeshStandardMaterial({ color: '#e07a2a', roughness: 0.6 }),
      pomme: new THREE.MeshPhysicalMaterial({ color: '#b8342c', roughness: 0.4, clearcoat: 0.5 }),
      zinc: new THREE.MeshStandardMaterial({ color: '#9aa3a6', roughness: 0.35, metalness: 0.9 }),
    }),
    [],
  );
}

/** Une salade : une rosette de feuilles bombées. */
function Salade({ v, position, s = 1 }) {
  const feuilles = useMemo(() => Array.from({ length: 9 }, (_, i) => ({ a: i * 2.4, r: 0.04 + (i % 3) * 0.025, inc: 0.5 + (i % 3) * 0.25 })), []);
  return (
    <group position={position} scale={s}>
      {feuilles.map((f, i) => (
        <mesh key={i} material={i < 3 ? v.salade : v.feuille} position={[Math.cos(f.a) * f.r, 0.05, Math.sin(f.a) * f.r]} rotation={[f.inc * Math.sin(f.a), f.a, f.inc * Math.cos(f.a)]} scale={[1, 0.35, 0.7]} castShadow>
          <sphereGeometry args={[0.07, 12, 8]} />
        </mesh>
      ))}
    </group>
  );
}

/** Un pied de tomates sur son tuteur : tige, bouquets de feuilles dentelées, grappes de tomates. */
function PiedTomate({ v, position, graine = 1 }) {
  const feuilles = useMemo(() => {
    const r = (i) => {
      const x = Math.sin(i * 12.9898 + graine * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: 26 }, (_, i) => {
      const y = 0.12 + (i / 26) * 0.8;
      const a = i * 2.39 + r(i) * 0.8;
      const d = 0.05 + r(i + 40) * 0.11 * (1 - y * 0.4);
      return { p: [Math.cos(a) * d, y, Math.sin(a) * d], rot: [r(i + 7) * 1.2, a, r(i + 9) * 1.1], s: 0.6 + r(i + 3) * 0.6 };
    });
  }, [graine]);
  return (
    <group position={position}>
      <mesh material={v.tuteur} position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.008, 0.01, 1.1, 6]} />
      </mesh>
      <mesh material={v.feuille} position={[0.02, 0.45, 0]}>
        <cylinderGeometry args={[0.006, 0.009, 0.9, 6]} />
      </mesh>
      {feuilles.map((f, i) => (
        <mesh key={i} material={i % 4 ? v.feuille : v.salade} position={f.p} rotation={f.rot} scale={[f.s, f.s * 0.18, f.s * 0.55]} castShadow>
          <sphereGeometry args={[0.07, 8, 6]} />
        </mesh>
      ))}
      {[
        [0.06, 0.32, 0.05],
        [-0.05, 0.38, 0.07],
        [0.0, 0.34, 0.09],
        [0.05, 0.58, -0.06],
        [-0.06, 0.62, -0.03],
      ].map((p, i) => (
        <mesh key={i} material={i === 2 ? v.tomateVerte : v.tomate} position={p} castShadow>
          <sphereGeometry args={[0.032 + (i % 2) * 0.006, 14, 10]} />
        </mesh>
      ))}
    </group>
  );
}

/** Bac potager surélevé : cadre de planches, terre, cultures. */
function Bac({ m, terre, v, largeur = 1.6, profondeur = 0.8, h = 0.4, cultures = 'salades' }) {
  const ep = 0.04;
  return (
    <group>
      {[
        [0, profondeur / 2, largeur, 0],
        [0, -profondeur / 2, largeur, 0],
        [largeur / 2, 0, profondeur, Math.PI / 2],
        [-largeur / 2, 0, profondeur, Math.PI / 2],
      ].map(([x, z, l, r], i) => (
        <mesh key={i} material={m.planches} position={[x, h / 2, z]} rotation-y={r} castShadow receiveShadow>
          <boxGeometry args={[l + ep, h, ep]} />
        </mesh>
      ))}
      <mesh material={terre} rotation-x={-Math.PI / 2} position={[0, h - 0.03, 0]} receiveShadow>
        <planeGeometry args={[largeur - ep, profondeur - ep]} />
      </mesh>
      {cultures === 'salades' &&
        [-0.55, -0.18, 0.19, 0.56].flatMap((x) =>
          [-0.18, 0.18].map((z) => <Salade key={`${x}${z}`} v={v} position={[x, h - 0.03, z]} s={0.9 + ((x * 7 + z * 3) % 0.2)} />),
        )}
      {cultures === 'tomates' && [-0.5, 0, 0.5].map((x, i) => <PiedTomate key={x} v={v} graine={i + 1} position={[x, h - 0.03, 0]} />)}
    </group>
  );
}

/** Arrosoir en zinc. */
function Arrosoir({ v }) {
  return (
    <group rotation-z={-0.5}>
      <mesh material={v.zinc} position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.07, 0.08, 0.18, 24]} />
      </mesh>
      <mesh material={v.zinc} position={[0.12, -0.07, 0]} rotation-z={-1.0}>
        <cylinderGeometry args={[0.008, 0.014, 0.22, 10]} />
      </mesh>
      <mesh material={v.zinc} position={[0, -0.02, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.05, 0.007, 8, 24, Math.PI]} />
      </mesh>
    </group>
  );
}

/* ---------- les coins de la cour ---------- */
// Poses calculées par cinématique inverse (mains posées là où elles agissent : dans la terre, sur l'outil…).
const POSES = {
  // à genoux devant le bac, les deux mains dans la terre
  aGenoux: { bassinY: 0.5, bassinX: 0.55, hanches: [1.45, 0.12], genoux: [1.45, 1.6], ecart: [0.12, 0.06], tete: 0.35, rotBras: [0.009, 0.061], epaules: [0.364, 0.34], ouverture: [0.001, -0.023], coudes: [1.056, 1.071] },
  // l'enfant arrose : bras droit tendu vers l'avant avec l'arrosoir, l'autre détendu
  arrose: { epaules: [0.08, 0.95], ouverture: [0.14, 0.08], coudes: [0.2, 0.25], tete: 0.3, teteY: -0.2 },
  // aide aux devoirs : élèves assis, les deux mains posées sur le cahier
  eleve: { bassinY: 0.62, bassinX: 0.15, hanches: [1.5, 1.5], genoux: [1.45, 1.45], ecart: [0.1, 0.1], tete: 0.45, rotBras: [-0.169, -0.188], epaules: [0.558, 0.572], ouverture: [-0.031, -0.042], coudes: [1.752, 1.705] },
  // la bénévole, assise en bout de table, une main posée, l'autre montre le cahier
  benevoleDevoirs: { bassinY: 0.66, bassinX: 0.12, hanches: [1.5, 1.5], genoux: [1.5, 1.5], ecart: [0.1, 0.1], tete: 0.3, teteY: 0.35, rotBras: [-0.458, -0.116], epaules: [0.567, 0.576], ouverture: [-0.031, 0.316], coudes: [0.912, 0.902] },
  // repair café : debout derrière l'établi, les deux mains sur le grille-pain ouvert
  repare: { bassinX: 0.2, tete: 0.4, rotBras: [-0.376, -0.166], epaules: [0.448, 0.428], ouverture: [0.087, -0.064], coudes: [0.987, 1.017] },
  // le visiteur regarde, les mains jointes devant lui
  regarde: { tete: 0.15, teteY: -0.3, rotBras: [-0.816, -0.72], epaules: [0.216, 0.218], ouverture: [-0.123, -0.132], coudes: [0.775, 0.75] },
  // épicerie : la bénévole pose une main sur la cagette et tend le sac de l'autre
  tend: { tete: 0.1, teteY: 0.25, rotBras: [-0.016, -0.018], epaules: [0.643, 0.67], ouverture: [0.059, 0.043], coudes: [0.114, 1.008] },
  // la cliente porte son panier, l'autre bras détendu
  panier: { teteY: -0.25, rotBras: [-0.188, 0], epaules: [0.283, 0.08], ouverture: [-0.046, 0.1], coudes: [0.719, 0.15] },
};

/* ---------- l'aide aux devoirs : une table sous la pergola ---------- */
function papier(lignes = true, couleur = '#fbfaf5') {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 192;
  const g = c.getContext('2d');
  g.fillStyle = couleur;
  g.fillRect(0, 0, 256, 192);
  if (lignes) {
    g.strokeStyle = '#a9c4de';
    g.lineWidth = 1.5;
    for (let y = 22; y < 192; y += 14) {
      g.beginPath();
      g.moveTo(8, y);
      g.lineTo(248, y);
      g.stroke();
    }
    g.strokeStyle = '#e5533d';
    g.beginPath();
    g.moveTo(34, 0);
    g.lineTo(34, 192);
    g.stroke();
    // quelques lignes d'écriture
    g.strokeStyle = '#33415c';
    g.lineWidth = 2;
    for (let y = 36; y < 120; y += 14) {
      g.beginPath();
      let x = 40;
      g.moveTo(x, y - 2);
      while (x < 200 + ((y * 7) % 40)) {
        x += 6;
        g.lineTo(x, y - 2 - Math.abs(Math.sin(x * 0.7)) * 5);
      }
      g.stroke();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Cahier({ position, rotation }) {
  const m = useMemo(() => ({ page: new THREE.MeshStandardMaterial({ map: papier(), roughness: 0.9 }), couv: new THREE.MeshStandardMaterial({ color: '#4a7bd0', roughness: 0.7 }) }), []);
  return (
    <group position={position} rotation={rotation}>
      <mesh material={m.couv} position={[0, 0.002, 0]}>
        <boxGeometry args={[0.36, 0.004, 0.25]} />
      </mesh>
      <mesh material={m.page} rotation-x={-Math.PI / 2} position={[0, 0.0045, 0]}>
        <planeGeometry args={[0.34, 0.23]} />
      </mesh>
    </group>
  );
}

function Devoirs({ m }) {
  const mat = useMemo(
    () => ({
      crayon: new THREE.MeshStandardMaterial({ color: '#f2b84b', roughness: 0.6 }),
      livres: ['#e5533d', '#1f4d3a', '#f2b84b', '#4a7bd0'].map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.75 })),
      sac: new THREE.MeshStandardMaterial({ color: '#7fb069', roughness: 0.85, normalMap: grain(), normalScale: new THREE.Vector2(0.5, 0.5) }),
    }),
    [],
  );
  const H = 0.74;
  return (
    <group>
      {/* pergola de bois : quatre poteaux, deux poutres, des chevrons */}
      {[-1.15, 1.15].flatMap((x) =>
        [-1.1, 0.75].map((z) => (
          <mesh key={`${x}${z}`} material={m.planches} position={[x, 1.2, z]} castShadow>
            <boxGeometry args={[0.1, 2.4, 0.1]} />
          </mesh>
        )),
      )}
      {[-1.1, 0.75].map((z) => (
        <mesh key={z} material={m.planches} position={[0, 2.42, z]} castShadow>
          <boxGeometry args={[2.6, 0.12, 0.1]} />
        </mesh>
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <mesh key={i} material={m.planches} position={[-1.2 + i * 0.4, 2.52, -0.18]} castShadow>
          <boxGeometry args={[0.07, 0.08, 2.2]} />
        </mesh>
      ))}
      {/* la table et ses bancs */}
      <mesh material={m.planches} position={[0, H - 0.02, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.04, 0.8]} />
      </mesh>
      {[-0.7, 0.7].flatMap((x) =>
        [-0.5, 0.1].map((z) => (
          <mesh key={`${x}${z}`} material={m.planches} position={[x, (H - 0.04) / 2, z]} castShadow>
            <boxGeometry args={[0.06, H - 0.04, 0.06]} />
          </mesh>
        )),
      )}
      <mesh material={m.planches} position={[0, 0.44, -0.84]} castShadow>
        <boxGeometry args={[1.5, 0.04, 0.3]} />
      </mesh>
      {[-0.65, 0.65].map((x) => (
        <mesh key={x} material={m.planches} position={[x, 0.21, -0.84]}>
          <boxGeometry args={[0.05, 0.42, 0.26]} />
        </mesh>
      ))}
      {/* deux élèves assis de l'autre côté de la table, face à nous, les mains sur leur cahier */}
      {[-0.38, 0.32].map((x, i) => (
        <group key={x} position={[x, 0, -0.8]} scale={0.78}>
          <Personnage pose={POSES.eleve} haut={i ? '#4a7bd0' : '#f2b84b'} bas="#2f3a4a" peau={i ? '#a5876c' : '#c9ac8f'} />
        </group>
      ))}
      <Cahier position={[-0.38, H, -0.48]} rotation={[0, 0.05, 0]} />
      <Cahier position={[0.32, H, -0.44]} rotation={[0, -0.08, 0]} />
      <mesh material={mat.crayon} position={[-0.2, H + 0.008, -0.4]} rotation={[0, 0.6, Math.PI / 2]}>
        <cylinderGeometry args={[0.004, 0.004, 0.16, 6]} />
      </mesh>
      {/* pile de livres et cartable */}
      {mat.livres.map((l, i) => (
        <mesh key={i} material={l} position={[0.62, H + 0.02 + i * 0.035, -0.32]} rotation-y={i * 0.25}>
          <boxGeometry args={[0.22, 0.032, 0.16]} />
        </mesh>
      ))}
      <mesh material={mat.sac} position={[-0.95, 0.18, -0.55]} rotation-y={0.4} castShadow>
        <boxGeometry args={[0.32, 0.36, 0.14]} />
      </mesh>
      {/* la bénévole, en bout de table, montre le cahier */}
      <mesh material={m.planches} position={[1.05, 0.44, -0.22]} castShadow>
        <boxGeometry args={[0.36, 0.04, 0.36]} />
      </mesh>
      <group position={[1.05, 0, -0.22]} rotation-y={-Math.PI / 2 - 0.25}>
        <Personnage pose={POSES.benevoleDevoirs} haut="#1f4d3a" bas="#c9bfae" />
      </group>
    </group>
  );
}

/* ---------- le repair café : un établi, des outils, un grille-pain ouvert, un vélo ---------- */
function Repair({ m }) {
  const mat = useMemo(
    () => ({
      inox: new THREE.MeshStandardMaterial({ color: '#c9c9cb', roughness: 0.25, metalness: 1 }),
      noir: new THREE.MeshStandardMaterial({ color: '#1b1b1d', roughness: 0.55 }),
      rouge: new THREE.MeshStandardMaterial({ color: '#c7352a', roughness: 0.45, metalness: 0.3 }),
      liege: new THREE.MeshStandardMaterial({ color: '#b98d5f', roughness: 0.9, normalMap: grain(), normalScale: new THREE.Vector2(0.8, 0.8) }),
      pneu: new THREE.MeshStandardMaterial({ color: '#202022', roughness: 0.8 }),
      cadre: new THREE.MeshStandardMaterial({ color: '#2f6f8f', roughness: 0.4, metalness: 0.5 }),
      etiquette: new THREE.MeshStandardMaterial({ map: panneau('Repair café', 'On répare ensemble · gratuit'), roughness: 0.7 }),
    }),
    [],
  );
  const H = 0.92;
  return (
    <group>
      {/* établi */}
      <mesh material={m.planches} position={[0, H - 0.03, -0.25]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.06, 0.65]} />
      </mesh>
      {[-0.78, 0.78].flatMap((x) =>
        [-0.5, 0.0].map((z) => (
          <mesh key={`${x}${z}`} material={m.planches} position={[x, (H - 0.06) / 2, z]} castShadow>
            <boxGeometry args={[0.07, H - 0.06, 0.07]} />
          </mesh>
        )),
      )}
      <mesh material={m.planches} position={[0, 0.2, -0.25]}>
        <boxGeometry args={[1.6, 0.03, 0.55]} />
      </mesh>
      {/* panneau à outils et panonceau */}
      <mesh material={mat.liege} position={[0, 1.55, -0.62]} castShadow>
        <boxGeometry args={[1.5, 0.9, 0.03]} />
      </mesh>
      <mesh material={mat.etiquette} position={[0, 2.12, -0.62]}>
        <boxGeometry args={[1.2, 0.3, 0.02]} />
      </mesh>
      <Modele nom="cross_pein_hammer" position={[-0.45, 1.6, -0.59]} rotation={[Math.PI / 2, 0, 0.3]} />
      <Modele nom="adjustable_wrench" position={[0.1, 1.55, -0.59]} rotation={[Math.PI / 2, 0, -0.4]} />
      {/* le grille-pain ouvert, entre ses mains, et son capot posé à côté */}
      <group position={[-0.02, H, -0.06]}>
        <mesh material={mat.inox} position={[0, 0.09, 0]} castShadow>
          <boxGeometry args={[0.26, 0.18, 0.15]} />
        </mesh>
        <mesh material={mat.noir} position={[0, 0.181, 0]}>
          <boxGeometry args={[0.18, 0.004, 0.06]} />
        </mesh>
      </group>
      <mesh material={mat.inox} position={[0.42, H + 0.01, -0.12]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[0.24, 0.02, 0.13]} />
      </mesh>
      <mesh material={mat.rouge} position={[-0.5, H + 0.06, -0.3]}>
        <boxGeometry args={[0.36, 0.12, 0.18]} />
      </mesh>
      {/* le réparateur, derrière l'établi, face à nous ; un habitant regarde */}
      <group position={[0, 0, -0.48]}>
        <Personnage pose={POSES.repare} homme haut="#7a5b3a" bas="#2f3a4a" />
      </group>
      <group position={[1.05, 0, 0.35]} rotation-y={-1.0}>
        <Personnage pose={POSES.regarde} homme haut="#c9bfae" bas="#3e4146" />
      </group>
      {/* un vélo à réparer, roue avant démontée */}
      <group position={[-1.25, 0, 0.35]} rotation-y={0.9}>
        <mesh material={mat.pneu} position={[-0.52, 0.34, 0]}>
          <torusGeometry args={[0.32, 0.025, 10, 48]} />
        </mesh>
        <mesh material={mat.pneu} position={[0.62, 0.34, 0.18]} rotation-y={0.6}>
          <torusGeometry args={[0.32, 0.025, 10, 48]} />
        </mesh>
        {[
          [[-0.52, 0.34, 0], [-0.1, 0.62, 0]],
          [[-0.1, 0.62, 0], [0.42, 0.66, 0]],
          [[-0.52, 0.34, 0], [0.0, 0.3, 0]],
          [[0.0, 0.3, 0], [-0.1, 0.62, 0]],
          [[0.0, 0.3, 0], [0.42, 0.66, 0]],
          [[0.42, 0.66, 0], [0.48, 0.9, 0]],
          [[-0.1, 0.62, 0], [-0.14, 0.82, 0]],
        ].map(([a, b], i) => {
          const va = new THREE.Vector3(...a);
          const vb = new THREE.Vector3(...b);
          const mil = va.clone().add(vb).multiplyScalar(0.5);
          const d = vb.clone().sub(va);
          const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
          return (
            <mesh key={i} material={mat.cadre} position={mil} quaternion={q} castShadow>
              <cylinderGeometry args={[0.018, 0.018, d.length(), 10]} />
            </mesh>
          );
        })}
        <mesh material={mat.noir} position={[-0.14, 0.84, 0]} scale={[1.6, 0.4, 0.8]}>
          <sphereGeometry args={[0.06, 12, 8]} />
        </mesh>
        <mesh material={mat.noir} position={[0.48, 0.9, 0]} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.012, 0.012, 0.46, 8]} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- l'épicerie solidaire : un étal de cagettes ---------- */
function Legumes({ v, sorte, n = 9 }) {
  const items = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        p: [-0.16 + (i % 3) * 0.16 + Math.sin(i * 3) * 0.02, 0.05 + Math.floor(i / 9) * 0.06, -0.1 + Math.floor((i % 9) / 3) * 0.1],
        r: [i, i * 2, 0],
      })),
    [n],
  );
  return items.map((it, i) =>
    sorte === 'carottes' ? (
      <mesh key={i} material={v.carotte} position={it.p} rotation={[Math.PI / 2, 0, it.r[1]]} castShadow>
        <coneGeometry args={[0.022, 0.16, 10]} />
      </mesh>
    ) : sorte === 'courgettes' ? (
      <mesh key={i} material={v.courgette} position={it.p} rotation={[Math.PI / 2, 0, it.r[1]]} castShadow>
        <capsuleGeometry args={[0.025, 0.14, 4, 10]} />
      </mesh>
    ) : (
      <mesh key={i} material={sorte === 'tomates' ? v.tomate : v.pomme} position={it.p} castShadow>
        <sphereGeometry args={[sorte === 'tomates' ? 0.036 : 0.04, 14, 10]} />
      </mesh>
    ),
  );
}

function Epicerie({ m, v }) {
  const mat = useMemo(
    () => ({
      papier: new THREE.MeshStandardMaterial({ color: '#c9a77a', roughness: 0.95, normalMap: grain(), normalScale: new THREE.Vector2(0.6, 0.6) }),
      bocal: new THREE.MeshPhysicalMaterial({ color: '#f2efe6', roughness: 0.1, transmission: 0.6, thickness: 0.02, transparent: true, opacity: 0.85 }),
      confiture: new THREE.MeshStandardMaterial({ color: '#8f2d2a', roughness: 0.4 }),
      couvercle: new THREE.MeshStandardMaterial({ color: '#d8c49a', roughness: 0.5, metalness: 0.4 }),
      ardoise: new THREE.MeshStandardMaterial({ map: panneau('Épicerie solidaire', 'Mercredi · 14 h – 19 h'), roughness: 0.7 }),
    }),
    [],
  );
  const H = 0.86;
  const cagette = (x, z, sorte) => (
    <group key={`${x}${z}`} position={[x, H, z]}>
      <Modele nom="wooden_crate_01" scale={[0.55, 0.3, 0.45]} />
      <group position={[0, 0.02, 0]}>
        <Legumes v={v} sorte={sorte} n={sorte === 'carottes' ? 7 : 9} />
      </group>
    </group>
  );
  return (
    <group>
      {/* le comptoir (tréteaux et plateau), les cagettes dessus */}
      <mesh material={m.planches} position={[0, H - 0.03, -0.15]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.05, 0.7]} />
      </mesh>
      {[-0.8, 0.8].map((x) => (
        <mesh key={x} material={m.planches} position={[x, (H - 0.05) / 2, -0.15]} castShadow>
          <boxGeometry args={[0.06, H - 0.05, 0.6]} />
        </mesh>
      ))}
      {cagette(-0.6, -0.15, 'pommes')}
      {cagette(-0.1, -0.15, 'tomates')}
      {cagette(0.4, -0.18, 'carottes')}
      {/* étagère du fond : bocaux de confiture */}
      <mesh material={m.planches} position={[0, 1.35, -0.8]}>
        <boxGeometry args={[1.8, 0.04, 0.3]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} material={m.planches} position={[s * 0.88, 0.8, -0.8]}>
          <boxGeometry args={[0.04, 1.6, 0.3]} />
        </mesh>
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <group key={i} position={[-0.7 + i * 0.17, 1.43, -0.8]}>
          <mesh material={mat.confiture} position={[0, -0.01, 0]}>
            <cylinderGeometry args={[0.042, 0.042, 0.1, 16]} />
          </mesh>
          <mesh material={mat.bocal}>
            <cylinderGeometry args={[0.046, 0.046, 0.13, 16]} />
          </mesh>
          <mesh material={mat.couvercle} position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.047, 0.047, 0.02, 16]} />
          </mesh>
        </group>
      ))}
      <mesh material={mat.ardoise} position={[0, 1.95, -0.82]}>
        <boxGeometry args={[1.3, 0.32, 0.02]} />
      </mesh>
      {/* la bénévole derrière le comptoir, face à nous : une main sur la cagette, l'autre tend un sac en papier */}
      <group position={[-0.35, 0, -0.62]} rotation-y={0.35}>
        <Personnage pose={POSES.tend} haut="#e5533d" bas="#2f3a4a" objets={[null, <SacPapier key="s" mat={mat} />]} />
      </group>
      {/* la cliente, devant, son panier au bras */}
      <group position={[0.45, 0, 0.55]} rotation-y={-2.4}>
        <Personnage pose={POSES.panier} haut="#7fb069" bas="#5b4636" objets={[<group key="p" position={[0, -0.05, 0]} scale={0.8}><Modele nom="wicker_basket_01" /></group>, null]} />
      </group>
    </group>
  );
}

function SacPapier({ mat }) {
  return (
    <group position={[0, -0.12, 0.02]}>
      <mesh material={mat.papier} castShadow>
        <boxGeometry args={[0.2, 0.26, 0.12]} />
      </mesh>
    </group>
  );
}

function useMateriaux(def) {
  const planches = usePBR('weathered_planks', { def, repeat: [1, 0.3], couleur: '#d9c7a8', env: 0.5 });
  const terre = usePBR('farm_soil', { def, repeat: [1, 0.5], couleur: '#c9b8a6', env: 0.3 });
  return { planches, terre };
}

function Coin({ poste, def }) {
  const { id, cote, z } = poste;
  const rot = -cote * (Math.PI / 2) + cote * 0.35;
  const m = useMateriaux(def);
  const v = useVerdure();
  return (
    <group position={[cote * X_POSTE, 0, z]} rotation-y={rot}>
      {id === 'jardin' && (
        <>
          {/* bac de salades, la bénévole à genoux devant, les mains dans la terre */}
          <group position={[-0.25, 0, -0.1]} rotation-y={-0.75}>
            <group position={[0, 0, 0.73]}>
              <Bac m={m} terre={m.terre} v={v} />
            </group>
            <group rotation-y={0}>
              <Personnage pose={POSES.aGenoux} haut="#c9a46a" bas="#4b5a3c" chaussure="#3a2e24" />
            </group>
          </group>
          {/* bac de tomates au fond, un enfant les arrose */}
          <group position={[0.75, 0, -1.25]} rotation-y={0.2}>
            <Bac m={m} terre={m.terre} v={v} largeur={1.4} profondeur={0.6} h={0.45} cultures="tomates" />
          </group>
          <group position={[1.05, 0, -0.45]} rotation-y={2.6} scale={0.66}>
            <Personnage pose={POSES.arrose} haut="#e5533d" bas="#2f3a4a" objets={[null, <Arrosoir key="a" v={v} />]} />
          </group>
          <Modele nom="wooden_crate_01" position={[-1.45, 0, 0.55]} rotation-y={0.4} scale={0.9} />
          <Modele nom="planter_box_01" position={[1.6, 0, 0.5]} rotation-y={-0.5} />
          <Modele nom="flower_gazania" position={[-1.6, 0, -0.9]} scale={1.4} />
        </>
      )}
      {id === 'devoirs' && <Devoirs m={m} />}
      {id === 'repair' && <Repair m={m} />}
      {id === 'epicerie' && <Epicerie m={m} v={v} />}
    </group>
  );
}

/* ---------- caméra ---------- */
export const ARRETS = POSTES.map((_, i) => [0.18 + i * 0.18, 0.18 + i * 0.18 + 0.11]);
const ENTREE = [
  [0.0, [0, 1.7, 2.4], [0, 1.6, -8]],
  [0.14, [0, 1.75, 0.4], [-0.6, 1.35, -5]],
];
const SORTIE = [
  [0.93, [0, 1.8, -8.4], [0, 2.4, FOND]],
  [1.0, [0, 1.8, -9], [0, 2.4, FOND]],
];

function vue(i, a, portrait, pos, cible) {
  const { cote, z } = POSTES[i];
  const cx = cote * X_POSTE;
  const r = portrait ? 4.1 : 4.0;
  pos.set(cx - cote * Math.cos(a) * r, portrait ? 1.75 : 1.85, z + Math.sin(a) * r);
  cible.set(cx, portrait ? 0.8 : 1.0, z);
  if (!portrait) {
    const dx = cible.x - pos.x;
    const dz = cible.z - pos.z;
    const n = Math.hypot(dx, dz);
    cible.x += (dz / n) * 0.75;
    cible.z -= (dx / n) * 0.75;
  }
}

function Camera({ progres, foyer }) {
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
    const poses = ENTREE.map(([t, a, b]) => [t, (pp, cc) => (pp.set(...a), cc.set(...b))]);
    ARRETS.forEach(([ta, tb], i) => {
      poses.push([ta, (pp, cc) => vue(i, 0.05, portrait, pp, cc)]);
      poses.push([tb, (pp, cc) => vue(i, 0.45, portrait, pp, cc)]);
    });
    SORTIE.forEach(([t, a, b]) => poses.push([t, (pp, cc) => (pp.set(...a), cc.set(...b))]));
    let i = 1;
    while (i < poses.length - 1 && p > poses[i][0]) i++;
    const [t0, f0] = poses[i - 1];
    const [t1, f1] = poses[i];
    const r = (p - t0) / (t1 - t0);
    const tour = i % 2 === 1 && i >= 3 && i <= 1 + 2 * POSTES.length;
    const k = tour ? Math.min(1, Math.max(0, r)) : doux(r);
    f0(p0, c0);
    f1(p1, c1);
    camera.position.copy(p0.lerp(p1, k));
    c0.lerp(c1, k);
    camera.lookAt(c0);
    foyer?.copy(c0);
    camera.fov = portrait ? 60 : 44;
    camera.updateProjectionMatrix();
  });
  return null;
}

/* ---------- lumière, ombres, rendu caméra ---------- */
/** Lumière d'un vrai jardin (HDRI Poly Haven), et le ciel au-dessus des murs (même photo, en JPG léger). */
function Ambiance({ def }) {
  const ciel = useTexture(`${BASE}scene/ciel-${def}.jpg`);
  const { scene } = useThree();
  useEffect(() => {
    ciel.mapping = THREE.EquirectangularReflectionMapping;
    ciel.colorSpace = THREE.SRGBColorSpace;
    scene.background = ciel;
    scene.backgroundIntensity = 1;
  }, [ciel, scene]);
  return <Environment files={`${BASE}scene/jardin-${def}.hdr`} environmentIntensity={0.7} />;
}

function Soleil({ taille }) {
  const [cible] = useState(() => new THREE.Object3D());
  return (
    <>
      <primitive object={cible} position={[0, 0, -6.5]} />
      <directionalLight
        position={[7, 12, 3]}
        target={cible}
        color="#fff1dc"
        intensity={3.2}
        castShadow
        shadow-mapSize={[taille, taille]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.025}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-camera-near={1}
        shadow-camera-far={28}
      />
    </>
  );
}

function Ombres() {
  const { scene } = useThree();
  useEffect(() => {
    scene.traverse((o) => {
      if (!o.isMesh || o.material?.isMeshBasicMaterial || o.material?.transparent) return;
      o.receiveShadow = true;
      o.castShadow = !o.userData.coque;
    });
  }, [scene]);
  return null;
}

function Effets({ niveau, foyer }) {
  const dof = useRef();
  useFrame(() => dof.current?.target?.copy(foyer));
  if (niveau === 'complet')
    return (
      <EffectComposer multisampling={4}>
        <N8AO aoRadius={0.55} distanceFalloff={0.5} intensity={2.2} quality="medium" color="#0d0a07" />
        <DepthOfField ref={dof} target={foyer} worldFocusRange={2.6} bokehScale={2.2} resolutionScale={0.5} />
        <ToneMapping mode={ToneMappingMode.AGX} />
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.16} />
        <Vignette offset={0.28} darkness={0.5} />
      </EffectComposer>
    );
  return (
    <EffectComposer multisampling={0}>
      <N8AO aoRadius={0.5} distanceFalloff={0.5} intensity={2} quality="performance" halfRes depthAwareUpsampling color="#0d0a07" />
      <ToneMapping mode={ToneMappingMode.AGX} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.14} />
      <Vignette offset={0.28} darkness={0.45} />
    </EffectComposer>
  );
}

function Pilote() {
  const { advance, scene, camera } = useThree();
  useEffect(() => {
    if (!IMAGE_PAR_IMAGE) return;
    // outils de contrôle (enregistrement image par image uniquement)
    window.psDebug = () => {
      const r = new THREE.Raycaster();
      r.setFromCamera(new THREE.Vector2(0.3, 0), camera);
      const h = r.intersectObjects(scene.children, true).slice(0, 4);
      return { cam: camera.position.toArray().map((v) => +v.toFixed(2)), hits: h.map((x) => [x.distance.toFixed(2), x.object.geometry?.type, x.object.material?.color?.getHexString?.(), x.object.parent?.type]) };
    };
    let ms = performance.now();
    horloge.t = ms / 1000;
    window.psAvancer = (pas) => {
      ms += pas;
      horloge.t = ms / 1000;
      advance(ms);
    };
  }, [advance, scene, camera]);
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

function Scene({ def }) {
  return (
    <>
      <Ambiance def={def} />
      <Cour def={def} />
      {POSTES.map((p) => (
        <Coin key={p.id} poste={p} def={def} />
      ))}
      <Ombres />
    </>
  );
}

export default function Cour3D({ progres, leger, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  const complet = !petit && !leger;
  const def = complet ? 'hd' : 'sd';
  const foyer = useRef(new THREE.Vector3(-X_POSTE, 0.9, -2.8)).current;
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={leger ? [1, 1.25] : petit ? [1, 1.5] : [1, 1.75]}
      frameloop={IMAGE_PAR_IMAGE || !actif ? 'never' : 'always'}
      camera={{ fov: 44, near: 0.05, far: 50, position: [0, 1.7, 2.4] }}
      shadows={leger ? false : 'soft'}
      gl={{ antialias: false, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.AgXToneMapping;
        scene.background = new THREE.Color('#cfdbe4');
      }}
      aria-hidden="true"
    >
      <Pilote />
      <hemisphereLight args={['#dfe9f2', '#5b5a3c', 0.35]} />
      {!leger && <Soleil taille={complet ? 2048 : 1024} />}
      <Suspense fallback={null}>
        <Scene def={def} />
        <Camera progres={progres} foyer={foyer} />
        {!leger && <Effets niveau={complet ? 'complet' : 'leger'} foyer={foyer} />}
        <Pret onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
