import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshReflectorMaterial, useGLTF, useTexture } from '@react-three/drei';
import { DepthOfField, EffectComposer, N8AO, Noise, ToneMapping, Vignette } from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import Personnage from '@demos/shared/three/Personnage.jsx';
import { brosse, grain, usePBR } from '@demos/shared/three/materiaux.js';

/* ------------------------------------------------------------------
   Intro 3D de Lumen Studio (pilotée par le défilement, progres 0 → 1).
   Un vrai studio photo dans un loft : parquet, mur de briques blanchies, grande verrière, poutres d'acier.
   Un plateau par prestation (portrait, famille, mariage, entreprise) : fond papier sur ses pieds, boîte à lumière
   octogonale, réflecteur, appareil photo sur trépied (modèle Poly Haven), et l'écran de contrôle du photographe
   qui affiche la vraie photo de la séance (photo Pexels). Les modèles sont des mannequins habillés, en pose.
   Rendu photoréaliste comme Pulse : matières PBR Poly Haven (CC0), lumière HDRI d'un vrai studio photo,
   soleil par la verrière avec ombres douces, occlusion ambiante, reflets au sol, rendu filmique AgX,
   profondeur de champ, grain et vignettage. Téléphone : textures plus légères, moins d'effets.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const IMAGE_PAR_IMAGE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('image-par-image');
const horloge = { t: 0, maintenant: () => (IMAGE_PAR_IMAGE ? horloge.t : performance.now() / 1000) };
const doux = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

const L = 4.5;
const FOND = -13.6;
const HAUT = 4.6;
const AMBRE = '#e0a95f';

/** Les plateaux (un par prestation), à gauche puis à droite. */
export const POSTES = [
  { id: 'portrait', cote: -1, z: -2.9, papier: '#7d766e' },
  { id: 'famille', cote: 1, z: -5.6, papier: '#d9cfc0' },
  { id: 'mariage', cote: -1, z: -8.3, papier: '#ece6dc' },
  { id: 'entreprise', cote: 1, z: -11.0, papier: '#8e9297' },
];
const X_POSTE = 2.35;
/** Format des vraies photos (largeur / hauteur). */
const FORMATS = { portrait: 2 / 3, famille: 3 / 2, mariage: 2 / 3, entreprise: 2 / 3 };

/* ---------- la pièce ---------- */
function Sol({ def, reflets }) {
  const mat = usePBR('rectangular_parquet', { def, repeat: [2 * L / 1.6, -FOND / 1.6], couleur: '#e9dccb', relief: 0.8, env: 0.5 });
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, FOND / 2]} receiveShadow userData={{ coque: true }} material={reflets ? undefined : mat}>
      <planeGeometry args={[2 * L, -FOND]} />
      {reflets && (
        <MeshReflectorMaterial
          map={mat.map}
          normalMap={mat.normalMap}
          normalScale={mat.normalScale}
          roughnessMap={mat.roughnessMap}
          aoMap={mat.aoMap}
          color="#e9dccb"
          roughness={1}
          envMapIntensity={0.5}
          resolution={1024}
          blur={[400, 140]}
          mixBlur={1}
          mixStrength={1.4}
          mixContrast={1}
          depthScale={0.6}
          minDepthThreshold={0.3}
          maxDepthThreshold={1.3}
          mirror={0}
        />
      )}
    </mesh>
  );
}

function Piece({ def, reflets }) {
  const long = -FOND;
  const brique = usePBR('whitewashed_brick', { def, repeat: [long / 2.4, HAUT / 2.4], couleur: '#f2ece4', env: 0.5 });
  const enduit = usePBR('white_plaster_02', { def, repeat: [3, 2], couleur: '#efe9e1', env: 0.5 });
  const plafond = usePBR('white_plaster_02', { def, repeat: [2, 5], couleur: '#d9d3cb', env: 0.4 });
  const soubassement = usePBR('white_plaster_02', { def, repeat: [long / 3, 0.3], couleur: '#e6dfd6', env: 0.5 });
  const b = brosse();
  const m = useMemo(
    () => ({
      jour: new THREE.MeshBasicMaterial({ map: ciel(), toneMapped: false }),
      acier: new THREE.MeshStandardMaterial({ color: '#1b1b1c', roughness: 0.5, metalness: 0.7, normalMap: b.normal, normalScale: new THREE.Vector2(0.25, 0.25) }),
    }),
    [b],
  );
  const enseigne = useMemo(() => texteNeon('Lumen', AMBRE), []);
  return (
    <group>
      <Sol def={def} reflets={reflets} />
      <mesh rotation-x={Math.PI / 2} position={[0, HAUT, FOND / 2]} material={plafond} userData={{ coque: true }}>
        <planeGeometry args={[2 * L, long]} />
      </mesh>
      {/* poutres d'acier du loft */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[0, HAUT - 0.14, -1 - i * 2.4]} material={m.acier} userData={{ coque: true }}>
          <boxGeometry args={[2 * L, 0.28, 0.16]} />
        </mesh>
      ))}
      {/* mur de gauche : briques blanchies */}
      <mesh position={[-L, HAUT / 2, FOND / 2]} rotation-y={Math.PI / 2} material={brique} userData={{ coque: true }}>
        <planeGeometry args={[long, HAUT]} />
      </mesh>
      {/* mur de droite : grande verrière d'atelier sur un soubassement enduit */}
      <mesh position={[L, 0.45, FOND / 2]} rotation-y={-Math.PI / 2} material={soubassement} userData={{ coque: true }}>
        <planeGeometry args={[long, 0.9]} />
      </mesh>
      <mesh position={[L + 0.05, 0.9 + (HAUT - 0.9) / 2, FOND / 2]} rotation-y={-Math.PI / 2} material={m.jour}>
        <planeGeometry args={[long, HAUT - 0.9]} />
      </mesh>
      {Array.from({ length: 15 }, (_, i) => (
        <mesh key={i} position={[L - 0.02, 0.9 + (HAUT - 0.9) / 2, -i]} material={m.acier}>
          <boxGeometry args={[0.06, HAUT - 0.9, 0.05]} />
        </mesh>
      ))}
      {[0.9, 1.85, 2.8, 3.7].map((y) => (
        <mesh key={y} position={[L - 0.02, y, FOND / 2]} material={m.acier}>
          <boxGeometry args={[0.07, 0.05, long]} />
        </mesh>
      ))}
      {/* mur du fond : enduit, enseigne lumineuse ambrée */}
      <mesh position={[0, HAUT / 2, FOND]} material={enduit} userData={{ coque: true }}>
        <planeGeometry args={[2 * L, HAUT]} />
      </mesh>
      <mesh position={[0, 2.8, FOND + 0.02]}>
        <planeGeometry args={[2.6, 0.8]} />
        <meshBasicMaterial map={enseigne} transparent toneMapped={false} depthWrite={false} />
      </mesh>
      <pointLight position={[0, 2.8, FOND + 0.8]} color={AMBRE} intensity={1.6} distance={5} decay={1.8} />
      <Plante position={[-L + 0.55, 0, -0.8]} scale={1.15} />
      <Plante position={[L - 0.6, 0, -12.6]} scale={1.15} rotation-y={1} />
    </group>
  );
}

function ciel() {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 256;
  const g = c.getContext('2d');
  const d = g.createLinearGradient(0, 0, 0, 256);
  d.addColorStop(0, '#fbfaf6');
  d.addColorStop(0.65, '#ece8e0');
  d.addColorStop(1, '#d6d0c5');
  g.fillStyle = d;
  g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function texteNeon(texte, couleur) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 320;
  const g = c.getContext('2d');
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = 'italic 220px "Fraunces", Georgia, serif';
  for (const [flou, a] of [
    [36, 0.85],
    [12, 1],
    [0, 1],
  ]) {
    g.shadowColor = couleur;
    g.shadowBlur = flou;
    g.globalAlpha = a;
    g.fillStyle = flou ? couleur : '#fff4e2';
    g.fillText(texte, 512, 170);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Modele({ nom, ...props }) {
  const { scene } = useGLTF(`${BASE}scene/modeles/${nom}.glb`);
  const c = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={c} {...props} />;
}
const Plante = (props) => <Modele nom="potted_plant_01" {...props} />;

/* ---------- le matériel du photographe ---------- */
function useMateriel(def) {
  const velours = usePBR('velour_velvet', { def, repeat: [2, 2], couleur: '#2a2a2c', sansCouleur: true, env: 0.3 });
  return useMemo(() => {
    const b = brosse();
    return {
      pied: new THREE.MeshStandardMaterial({ color: '#202022', roughness: 0.42, metalness: 0.8, normalMap: b.normal, normalScale: new THREE.Vector2(0.2, 0.2) }),
      chrome: new THREE.MeshStandardMaterial({ color: '#cfcfd1', roughness: 0.2, metalness: 1 }),
      noir: new THREE.MeshStandardMaterial({ color: '#141415', roughness: 0.6 }),
      velours,
      diffuseur: new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#fff4e6', emissiveIntensity: 1.6, roughness: 0.9 }),
      reflecteur: new THREE.MeshStandardMaterial({ color: '#e8e8e8', roughness: 0.35, metalness: 0.9, normalMap: grain(), normalScale: new THREE.Vector2(0.6, 0.6) }),
      dosReflecteur: new THREE.MeshStandardMaterial({ color: '#c99a52', roughness: 0.4, metalness: 0.9, normalMap: grain() }),
    };
  }, [velours]);
}

/** Pied d'éclairage : trois jambes repliables, colonne télescopique. */
function PiedLumiere({ m, h }) {
  return (
    <group>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <mesh key={i} material={m.pied} position={[Math.cos(a) * 0.22, 0.22, Math.sin(a) * 0.22]} rotation={[Math.sin(a) * 0.95, 0, -Math.cos(a) * 0.95]}>
            <cylinderGeometry args={[0.011, 0.011, 0.62, 10]} />
          </mesh>
        );
      })}
      <mesh material={m.pied} position={[0, h / 2 + 0.1, 0]}>
        <cylinderGeometry args={[0.016, 0.022, h - 0.2, 12]} />
      </mesh>
      {[0.5, 0.95].map((t) => (
        <mesh key={t} material={m.noir} position={[0, h * t, 0]}>
          <cylinderGeometry args={[0.028, 0.028, 0.05, 12]} />
        </mesh>
      ))}
    </group>
  );
}

/** Fond papier : rouleau sur sa barre, papier qui tombe et s'arrondit au sol (gorge). */
function FondPapier({ m, couleur }) {
  const larg = 2.72;
  const geo = useMemo(() => {
    // profil (z, y) : vertical, puis quart de cercle (gorge), puis à plat jusqu'à l'avant
    const pts = [];
    const R = 0.55;
    for (let i = 0; i <= 12; i++) pts.push([-1.4, 2.62 - (i / 12) * (2.62 - R)]);
    for (let i = 1; i <= 16; i++) {
      const a = (i / 16) * (Math.PI / 2);
      pts.push([-1.4 + R - Math.cos(a) * R, R - Math.sin(a) * R]);
    }
    for (let i = 1; i <= 10; i++) pts.push([-1.4 + R + (i / 10) * 2.1, 0.004]);
    const nx = 24;
    const pos = [];
    const uv = [];
    const idx = [];
    pts.forEach(([z, y], j) => {
      for (let i = 0; i <= nx; i++) {
        pos.push(-larg / 2 + (i / nx) * larg, y + 0.002, z);
        uv.push(i / nx, j / (pts.length - 1));
      }
    });
    for (let j = 0; j < pts.length - 1; j++)
      for (let i = 0; i < nx; i++) {
        const a = j * (nx + 1) + i;
        idx.push(a, a + nx + 1, a + 1, a + 1, a + nx + 1, a + nx + 2);
      }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }, []);
  const papier = useMemo(() => {
    const n = grain();
    return new THREE.MeshStandardMaterial({ color: couleur, roughness: 0.95, normalMap: n, normalScale: new THREE.Vector2(0.15, 0.15), envMapIntensity: 0.35, side: THREE.DoubleSide });
  }, [couleur]);
  return (
    <group>
      <mesh geometry={geo} material={papier} castShadow receiveShadow />
      {/* rouleau, barre et pieds */}
      <mesh material={papier} position={[0, 2.7, -1.43]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.075, 0.075, larg + 0.02, 32]} />
      </mesh>
      <mesh material={m.pied} position={[0, 2.7, -1.43]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.014, 0.014, 3.1, 10]} />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 1.52, 0, -1.43]}>
          <PiedLumiere m={m} h={2.72} />
        </group>
      ))}
    </group>
  );
}

/** Boîte à lumière octogonale (Ø 1,2 m) sur son pied, tournée vers le sujet : elle éclaire vraiment la scène. */
function Octabox({ m, position, cible = [0, 1.3, 0], intensite = 7 }) {
  const tete = useRef();
  const [cibleObj] = useState(() => new THREE.Object3D());
  useLayoutEffect(() => {
    // la tête de la boîte vise le sujet : cible exprimée dans le repère du plateau
    const t = tete.current;
    const plateau = t?.parent?.parent?.parent;
    if (!plateau) return;
    plateau.updateWorldMatrix(true, true);
    t.lookAt(plateau.localToWorld(new THREE.Vector3(...cible)));
  }, [cible, position]);
  return (
    <group position={[position[0], 0, position[2]]}>
      <PiedLumiere m={m} h={position[1]} />
      <group position={[0, position[1], 0]}>
        <group ref={tete}>
          {/* la boîte : un tronc octogonal en tissu noir, le diffuseur blanc devant (face +z) */}
          <mesh material={m.velours} rotation-x={Math.PI / 2} position={[0, 0, -0.18]}>
            <cylinderGeometry args={[0.6, 0.1, 0.36, 8, 1, true]} />
          </mesh>
          <mesh material={m.diffuseur} position={[0, 0, 0.001]} rotation-z={Math.PI / 8}>
            <circleGeometry args={[0.6, 8]} />
          </mesh>
          <mesh material={m.noir} position={[0, 0, -0.4]}>
            <cylinderGeometry args={[0.07, 0.07, 0.14, 16]} />
          </mesh>
        </group>
        <primitive object={cibleObj} position={[cible[0] - position[0], cible[1] - position[1], cible[2] - position[2]]} />
        <spotLight target={cibleObj} color="#fff1e2" intensity={intensite} distance={7} angle={0.75} penumbra={1} decay={1.4} />
      </group>
    </group>
  );
}

/** Réflecteur rond (argent d'un côté, or de l'autre) sur un bras. */
function Reflecteur({ m, position, rotation }) {
  return (
    <group position={[position[0], 0, position[2]]}>
      <PiedLumiere m={m} h={position[1]} />
      <group position={[0, position[1], 0]} rotation={rotation}>
        <mesh material={m.reflecteur}>
          <circleGeometry args={[0.4, 48]} />
        </mesh>
        <mesh material={m.dosReflecteur} rotation-y={Math.PI}>
          <circleGeometry args={[0.4, 48]} />
        </mesh>
        <mesh material={m.noir}>
          <torusGeometry args={[0.4, 0.008, 6, 64]} />
        </mesh>
      </group>
    </group>
  );
}

/** Appareil photo (modèle Poly Haven) sur un trépied, visant le sujet. */
function AppareilTrepied({ m, position, h = 1.45 }) {
  return (
    <group position={position}>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2 + 0.5;
        return (
          <mesh key={i} material={m.pied} position={[Math.cos(a) * 0.26, h / 2 - 0.05, Math.sin(a) * 0.26]} rotation={[Math.sin(a) * 0.36, 0, -Math.cos(a) * 0.36]}>
            <cylinderGeometry args={[0.012, 0.009, h + 0.02, 10]} />
          </mesh>
        );
      })}
      <mesh material={m.noir} position={[0, h - 0.02, 0]}>
        <cylinderGeometry args={[0.045, 0.05, 0.06, 20]} />
      </mesh>
      <Modele nom="Camera_01" position={[0, h + 0.01, 0]} rotation-y={Math.PI} scale={1.4} />
    </group>
  );
}

/* ---------- les vraies photos de la séance, sur l'écran de contrôle du photographe ---------- */
function Ecran({ m, id, def, position, rotation }) {
  const photo = useTexture(`${BASE}scene/photos/${id}-${def}.webp`);
  const f = FORMATS[id];
  const [l, h] = f < 1 ? [0.42, 0.42 / f] : [0.66, 0.66 / f];
  const mat = useMemo(() => {
    photo.colorSpace = THREE.SRGBColorSpace;
    photo.anisotropy = 8;
    // dalle mate rétroéclairée : l'image est émise, un voile de reflet très doux par-dessus
    return new THREE.MeshStandardMaterial({ color: '#000000', emissive: '#ffffff', emissiveIntensity: 1.05, emissiveMap: photo, roughness: 0.32, envMapIntensity: 0.35 });
  }, [photo]);
  return (
    <group position={position} rotation={rotation}>
      {/* pied à colonne et plateau */}
      <mesh material={m.pied} position={[0, -position[1] / 2, -0.05]}>
        <cylinderGeometry args={[0.018, 0.022, position[1], 12]} />
      </mesh>
      <mesh material={m.noir} position={[0, -position[1] + 0.015, -0.05]}>
        <cylinderGeometry args={[0.22, 0.24, 0.03, 32]} />
      </mesh>
      <mesh material={m.noir} position={[0, 0, -0.022]}>
        <boxGeometry args={[l + 0.03, h + 0.03, 0.035]} />
      </mesh>
      <mesh material={mat}>
        <planeGeometry args={[l, h]} />
      </mesh>
    </group>
  );
}

/* ---------- les plateaux ---------- */
const POSES = {
  // assise de trois quarts sur le tabouret, mains posées sur la cuisse, tête légèrement inclinée
  assise: { bassinY: 0.66, hanches: [1.5, 1.35], genoux: [1.45, 1.7], ecart: [0.12, 0.02], epaules: [0.55, 0.35], ouverture: [0.05, 0.12], coudes: [0.9, 1.1], tete: 0.08, teteY: 0.25, torsion: 0.2 },
  // debout, détendue, une main sur la hanche
  hanche: { epaules: [0.1, -0.15], ouverture: [0.12, 0.55], coudes: [0.2, 1.9], rotBras: [0, 0.6], teteY: -0.15 },
  // debout, bras le long du corps, un peu tourné
  droit: { epaules: [0.06, 0.06], ouverture: [0.09, 0.09], coudes: [0.12, 0.12], teteY: 0.1 },
  // bras croisés (portrait d'affaires)
  croises: { epaules: [0.75, 0.75], ouverture: [0.15, 0.15], coudes: [1.75, 1.75], rotBras: [0.95, 0.95], tete: 0.04 },
  // la main tendue vers l'autre (mariage)
  mainTendue: { epaules: [0.45, 0.08], ouverture: [-0.25, 0.1], coudes: [0.5, 0.15], teteY: 0.35 },
  enfant: { epaules: [0.25, 0.25], ouverture: [0.35, 0.35], coudes: [0.25, 0.25], tete: -0.12 },
};

function Plateau({ poste, m, def }) {
  const { id, cote, z, papier } = poste;
  const rot = -cote * (Math.PI / 2) + cote * 0.35;
  return (
    <group position={[cote * X_POSTE, 0, z]} rotation-y={rot}>
      <FondPapier m={m} couleur={papier} />
      {id === 'portrait' && (
        <>
          <Modele nom="wooden_stool_01" position={[0, 0, -0.12]} scale={1} />
          <group position={[0.02, 0, -0.06]} rotation-y={-0.45}>
            <Personnage pose={POSES.assise} haut="#5b4636" bas="#2b2a2d" peau="#bfa489" />
          </group>
        </>
      )}
      {id === 'famille' && (
        <>
          <group position={[-0.42, 0, -0.1]} rotation-y={0.18}>
            <Personnage pose={POSES.droit} homme haut="#2f3a45" bas="#c9bfae" />
          </group>
          <group position={[0.46, 0, -0.05]} rotation-y={-0.2}>
            <Personnage pose={POSES.hanche} haut="#d7c6ae" bas="#3d3a37" />
          </group>
          <group position={[0.03, 0, 0.22]} scale={0.62}>
            <Personnage pose={POSES.enfant} haut="#a9562f" bas="#36383d" />
          </group>
        </>
      )}
      {id === 'mariage' && (
        <>
          <group position={[-0.3, 0, -0.05]} rotation-y={0.55}>
            <Personnage pose={POSES.mainTendue} homme haut="#1f2433" bas="#1f2433" chemise chaussure="#111" />
          </group>
          <group position={[0.32, 0, 0.02]} rotation-y={-0.6}>
            <Personnage pose={{ ...POSES.droit, epaules: [0.4, 0.06], coudes: [0.6, 0.12] }} robe="#f3eee4" manches={false} haut="#f3eee4" chaussure="#e9e2d6" />
          </group>
        </>
      )}
      {id === 'entreprise' && (
        <group position={[0, 0, -0.1]} rotation-y={-0.15}>
          <Personnage pose={POSES.croises} homme haut="#5a5e64" bas="#3e4146" chemise chaussure="#1a1512" />
        </group>
      )}
      {/* lumière principale à 45°, réflecteur de l'autre côté, appareil sur trépied, écran de contrôle */}
      <Octabox m={m} position={[1.45, 2.05, 1.15]} cible={[0, 1.25, 0]} />
      <Reflecteur m={m} position={[-1.25, 0.95, 0.75]} rotation={[0, 0.95, 0]} />
      <AppareilTrepied m={m} position={[0.15, 0, 2.55]} />
      <Ecran m={m} id={id} def={def} position={[-1.05, 1.32, 2.05]} rotation={[0, 0.55, 0]} />
      {/* contre-jour chaud qui détache le sujet du fond */}
      <pointLight position={[0, 2.2, -0.9]} color="#ffcf9a" intensity={1.1} distance={2.6} decay={1.5} />
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
  const r = portrait ? 4.6 : 4.0;
  pos.set(cx - cote * Math.cos(a) * r, portrait ? 1.75 : 1.85, z + Math.sin(a) * r);
  cible.set(cx, portrait ? 1.05 : 1.3, z);
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
      poses.push([ta, (pp, cc) => vue(i, 0.12, portrait, pp, cc)]);
      poses.push([tb, (pp, cc) => vue(i, 0.62, portrait, pp, cc)]);
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
function Ambiance({ def }) {
  return <Environment files={`${BASE}scene/studio-${def === 'hd' ? '1k' : '512'}.hdr`} environmentIntensity={0.5} />;
}

function Soleil({ taille }) {
  const [cible] = useState(() => new THREE.Object3D());
  return (
    <>
      <primitive object={cible} position={[0, 0, -6.5]} />
      <directionalLight
        position={[10, 8.5, -2.5]}
        target={cible}
        color="#ffe7cc"
        intensity={2.6}
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

function Scene({ def, reflets }) {
  const m = useMateriel(def);
  return (
    <>
      <Ambiance def={def} />
      <Piece def={def} reflets={reflets} />
      {POSTES.map((p) => (
        <Plateau key={p.id} poste={p} m={m} def={def} />
      ))}
      <Ombres />
    </>
  );
}

export default function Studio3D({ progres, leger, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  const complet = !petit && !leger;
  const def = complet ? 'hd' : 'sd';
  const foyer = useRef(new THREE.Vector3(-X_POSTE, 1.2, -2.9)).current;
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
        scene.background = new THREE.Color('#1a1714');
        scene.fog = new THREE.Fog('#1a1714', 16, 30);
      }}
      aria-hidden="true"
    >
      <Pilote />
      <hemisphereLight args={['#f6efe4', '#3a322a', 0.22]} />
      {!leger && <Soleil taille={complet ? 2048 : 1024} />}
      <Suspense fallback={null}>
        <Scene def={def} reflets={complet} />
        <Camera progres={progres} foyer={foyer} />
        {!leger && <Effets niveau={complet ? 'complet' : 'leger'} foyer={foyer} />}
        <Pret onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
