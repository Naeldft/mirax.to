import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshReflectorMaterial, useGLTF, useTexture } from '@react-three/drei';
import { DepthOfField, EffectComposer, N8AO, Noise, ToneMapping, Vignette } from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import Athlete, { Kettlebell } from './Athlete';
import { brosse, coutures, marquage, moletage, trousRack, usePBR } from './materiaux';

/* ------------------------------------------------------------------
   Intro 3D de Pulse Coaching (pilotée par le défilement, progres 0 → 1).
   Une salle de sport premium, rendue de façon photoréaliste :
   - matières PBR Poly Haven (CC0) partout : dalles de caoutchouc, béton banché, parquet de chêne, cuir, caoutchouc
     granuleux des disques, métal brossé et chromé (cartes de relief, de rugosité et d'occlusion) ;
   - lumière d'une vraie salle (HDRI Poly Haven « crossfit gym », neutralisée et réchauffée), soleil rasant par la verrière
     avec ombres douces, occlusion ambiante (N8AO), reflets au sol, rendu filmique AgX, légère profondeur de champ,
     grain et vignettage de caméra. Vert acide réservé au néon « PULSE » et à quelques liserés ;
   - matériel construit en code, à l'échelle et détaillé (barre olympique moletée, disques à moyeu d'acier et marquage
     du poids, rack percé et boulonné, banc en cuir surpiqué, haltères hexagonaux) ;
   - athlètes : mannequins aux proportions réelles, figés au plus beau moment du mouvement.
   Sur téléphone : textures plus légères, moins d'effets (ni reflets ni profondeur de champ), toujours fluide.
   La caméra s'arrête devant chaque offre, à droite puis à gauche, et tourne un peu autour.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const IMAGE_PAR_IMAGE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('image-par-image');
const horloge = { t: 0, maintenant: () => (IMAGE_PAR_IMAGE ? horloge.t : performance.now() / 1000) };
const doux = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

const L = 4.2;
const FOND = -13;
const HAUT = 4.2;
const ACIDE = '#c6ff3d';

/** Les postes (une offre chacun) : côté, position le long de la salle, point regardé. */
export const POSTES = [
  { id: 'decouverte', cote: 1, z: -2.6 },
  { id: 'solo', cote: -1, z: -4.9 },
  { id: 'duo', cote: 1, z: -7.2 },
  { id: 'groupe', cote: -1, z: -9.5 },
  { id: 'enligne', cote: 1, z: -11.6 },
];
const X_POSTE = 2.3; // distance du centre de l'allée

function Plante(props) {
  const { scene } = useGLTF(`${BASE}scene/modeles/potted_plant_04.glb`);
  const c = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={c} {...props} />;
}

/** Texte lumineux (néon) sur canevas. */
function neon(texte, couleur, taille = 200) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 256;
  const g = c.getContext('2d');
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = `${taille}px "Anton", Impact, sans-serif`;
  for (const [flou, a] of [
    [40, 0.9],
    [14, 1],
    [0, 1],
  ]) {
    g.shadowColor = couleur;
    g.shadowBlur = flou;
    g.globalAlpha = a;
    g.fillStyle = flou ? couleur : '#f6ffe0';
    g.fillText(texte, 512, 136);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function degradeCiel() {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 256;
  const g = c.getContext('2d');
  const d = g.createLinearGradient(0, 0, 0, 256);
  d.addColorStop(0, '#fbf8f2');
  d.addColorStop(0.6, '#e9e4da');
  d.addColorStop(1, '#cfc8bb');
  g.fillStyle = d;
  g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ---------- la salle ---------- */
function Sol({ def, reflets }) {
  // dalles de caoutchouc 1 m × 1 m, joints fins ; sur ordinateur, un reflet très diffus (caoutchouc satiné)
  const mat = usePBR('rubber_tiles', { def, repeat: [2 * L, -FOND], couleur: '#d6d3cf', relief: 0.8, env: 0.35 });
  const long = -FOND;
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, FOND / 2]} receiveShadow userData={{ coque: true }} material={reflets ? undefined : mat}>
      <planeGeometry args={[2 * L, long]} />
      {reflets && (
        <MeshReflectorMaterial
          map={mat.map}
          normalMap={mat.normalMap}
          normalScale={mat.normalScale}
          roughnessMap={mat.roughnessMap}
          aoMap={mat.aoMap}
          color="#d6d3cf"
          roughness={1}
          envMapIntensity={0.35}
          resolution={1024}
          blur={[500, 180]}
          mixBlur={1}
          mixStrength={0.9}
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

function Salle({ def, reflets }) {
  const long = -FOND;
  const beton = usePBR('concrete_wall_008', { def, repeat: [long / 3, HAUT / 3], couleur: '#b4aca2', env: 0.5 });
  const plafond = usePBR('concrete_wall_008', { def, repeat: [2, 4], couleur: '#3c3a38', env: 0.3 });
  const bois = usePBR('oak_wood_planks', { def, repeat: [long / 2.2, 0.6], couleur: '#e2cdb5', env: 0.6 });
  const boisFond = usePBR('oak_wood_planks', { def, repeat: [3.5, 2], couleur: '#e2cdb5', env: 0.6 });
  const b = brosse();
  const m = useMemo(
    () => ({
      led: new THREE.MeshBasicMaterial({ color: '#fff6ea', toneMapped: false }),
      // verrière : un ciel clair, plus lumineux en haut (dégradé), légèrement chaud
      jour: new THREE.MeshBasicMaterial({ map: degradeCiel(), toneMapped: false }),
      // menuiseries de la verrière : acier thermolaqué noir, légèrement brossé
      acier: new THREE.MeshStandardMaterial({ color: '#1d1d1f', roughness: 0.45, metalness: 0.75, normalMap: b.normal, roughnessMap: b.rugosite }),
      acide: new THREE.MeshBasicMaterial({ color: ACIDE, toneMapped: false }),
    }),
    [b],
  );
  const pulse = useMemo(() => neon('PULSE', ACIDE, 230), []);
  return (
    <group>
      <Sol def={def} reflets={reflets} />
      <mesh rotation-x={Math.PI / 2} position={[0, HAUT, FOND / 2]} material={plafond} userData={{ coque: true }}>
        <planeGeometry args={[2 * L, long]} />
      </mesh>
      {/* rampes LED au plafond, dans des profilés d'acier */}
      {[-1.6, 0, 1.6].map((x) => (
        <group key={x} position={[x, HAUT - 0.03, FOND / 2]}>
          <mesh material={m.acier} userData={{ coque: true }}>
            <boxGeometry args={[0.09, 0.05, long - 1]} />
          </mesh>
          <mesh position={[0, -0.026, 0]} rotation-x={Math.PI / 2} material={m.led}>
            <planeGeometry args={[0.05, long - 1.1]} />
          </mesh>
        </group>
      ))}
      {/* mur de droite : béton banché */}
      <mesh position={[L, HAUT / 2, FOND / 2]} rotation-y={-Math.PI / 2} material={beton} userData={{ coque: true }}>
        <planeGeometry args={[long, HAUT]} />
      </mesh>
      {/* mur de gauche : verrière (lumière du jour) au-dessus d'un soubassement en chêne */}
      <mesh position={[-L, 0.6, FOND / 2]} rotation-y={Math.PI / 2} material={bois} userData={{ coque: true }}>
        <planeGeometry args={[long, 1.2]} />
      </mesh>
      <mesh position={[-L - 0.05, 2.65, FOND / 2]} rotation-y={Math.PI / 2} material={m.jour}>
        <planeGeometry args={[long, 2.9]} />
      </mesh>
      {Array.from({ length: 14 }, (_, i) => (
        <mesh key={i} position={[-L + 0.02, 2.65, -i]} material={m.acier}>
          <boxGeometry args={[0.06, 2.9, 0.06]} />
        </mesh>
      ))}
      {[1.2, 2.65, 4.1].map((y) => (
        <mesh key={y} position={[-L + 0.02, y, FOND / 2]} material={m.acier}>
          <boxGeometry args={[0.07, 0.06, long]} />
        </mesh>
      ))}
      {/* mur du fond : chêne, néon PULSE */}
      <mesh position={[0, HAUT / 2, FOND]} material={boisFond} userData={{ coque: true }}>
        <planeGeometry args={[2 * L, HAUT]} />
      </mesh>
      <mesh position={[0, 2.9, FOND + 0.02]}>
        <planeGeometry args={[3.2, 0.8]} />
        <meshBasicMaterial map={pulse} transparent toneMapped={false} depthWrite={false} />
      </mesh>
      <pointLight position={[0, 2.9, FOND + 0.8]} color={ACIDE} intensity={2.2} distance={5} decay={1.8} />
      {/* liseré vert acide au pied des murs */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (L - 0.01), 0.04, FOND / 2]} material={m.acide}>
          <boxGeometry args={[0.01, 0.012, long]} />
        </mesh>
      ))}
      <Plante position={[-L + 0.5, 0, -0.9]} scale={4} />
      <Plante position={[L - 0.5, 0, -12.3]} scale={4} rotation-y={1} />
    </group>
  );
}

/* ---------- le matériel, construit en code, à l'échelle ---------- */
function useMateriel(def) {
  const b = brosse();
  const cuir = usePBR('brown_leather', { def, repeat: [2, 1], couleur: '#5a524c', env: 0.6, relief: 1.2 });
  // caoutchouc granuleux (disques, têtes d'haltères) : relief et rugosité du revêtement de piste, teinté noir
  const gomme = usePBR('rubberized_track', { def, repeat: [1.5, 1.5], couleur: '#1c1c1e', sansCouleur: true, env: 0.45, relief: 0.9 });
  const tole = usePBR('metal_plate', { def, repeat: [1, 1], couleur: '#2a2a2c', sansCouleur: true, metal: 0.85, rugosite: 0.8, env: 0.7 });
  const plateau = usePBR('oak_wood_planks', { def, repeat: [0.7, 1], couleur: '#d9c3a8', env: 0.6 });
  const box = usePBR('oak_wood_planks', { def, repeat: [0.4, 0.4], couleur: '#ead7bf', env: 0.5 });
  return useMemo(() => {
    const mol = moletage();
    return {
      // acier thermolaqué noir mat (rack, banc), grain fin de la peinture
      acier: new THREE.MeshStandardMaterial({ color: '#202023', roughness: 0.55, metalness: 0.55, normalMap: b.normal, normalScale: new THREE.Vector2(0.3, 0.3), envMapIntensity: 0.8 }),
      montant: new THREE.MeshStandardMaterial({ color: '#202023', map: trousRack(), roughness: 0.55, metalness: 0.55, envMapIntensity: 0.8 }),
      // chrome dur (manchons, poignées), un peu brossé
      chrome: new THREE.MeshStandardMaterial({ color: '#d8d8da', roughness: 0.16, metalness: 1, normalMap: b.normal, normalScale: new THREE.Vector2(0.15, 0.15), roughnessMap: b.rugosite, envMapIntensity: 1.2 }),
      // barre moletée : losanges en relief, acier satiné
      molette: new THREE.MeshStandardMaterial({ color: '#bdbdc0', roughness: 0.32, metalness: 1, normalMap: mol, normalScale: new THREE.Vector2(1.2, 1.2), envMapIntensity: 1.1 }),
      zinc: new THREE.MeshStandardMaterial({ color: '#a9a9a6', roughness: 0.35, metalness: 1, envMapIntensity: 1 }),
      gomme,
      tole,
      plateau,
      box,
      cuir,
      coutures: new THREE.MeshBasicMaterial({ map: coutures(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, toneMapped: true }),
      acide: new THREE.MeshStandardMaterial({ color: ACIDE, roughness: 0.5, emissive: ACIDE, emissiveIntensity: 0.12 }),
      nylon: new THREE.MeshStandardMaterial({ color: '#111113', roughness: 0.75 }),
      ecran: new THREE.MeshBasicMaterial({ color: '#0e1a05', toneMapped: false }),
      verre: new THREE.MeshStandardMaterial({ color: '#050506', roughness: 0.08, metalness: 0.2, envMapIntensity: 1.3 }),
    };
  }, [b, cuir, gomme, tole, plateau, box]);
}

/** Disque olympique « bumper » : caoutchouc granuleux, rebord arrondi, face creusée, moyeu d'acier vissé, poids marqué. */
const DISQUES = { 20: { r: 0.225, e: 0.068 }, 10: { r: 0.225, e: 0.04 }, 5: { r: 0.115, e: 0.03 } };
function Disque({ m, kg = 20, face = 1 }) {
  const { r, e } = DISQUES[kg];
  const geo = useMemo(() => {
    // profil tourné autour de l'axe (x ici après rotation) : rayon, demi-épaisseur
    const h = e / 2;
    const pts = [
      [0.026, -h * 0.7],
      [0.08, -h * 0.7],
      [0.09, -h * 0.85],
      [r - 0.02, -h * 0.85],
      [r - 0.006, -h],
      [r, -h + 0.006],
      [r, h - 0.006],
      [r - 0.006, h],
      [r - 0.02, h * 0.85],
      [0.09, h * 0.85],
      [0.08, h * 0.7],
      [0.026, h * 0.7],
    ].map(([a, y]) => new THREE.Vector2(a, y));
    const g = new THREE.LatheGeometry(pts, 72);
    g.rotateZ(Math.PI / 2);
    return g;
  }, [r, e]);
  const etiquette = useMemo(() => marquage(`${kg} KG`, { taille: 74 }), [kg]);
  const vis = useMemo(() => Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2), []);
  return (
    <group>
      <mesh geometry={geo} material={m.gomme} />
      {/* moyeu : bague d'acier inox, six vis de serrage */}
      <mesh material={m.chrome} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.065, 0.065, e * 0.72, 48, 1, true]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} material={m.chrome} position={[(s * e * 0.72) / 2, 0, 0]} rotation-y={(s * Math.PI) / 2}>
          <ringGeometry args={[0.026, 0.065, 48]} />
        </mesh>
      ))}
      {[-1, 1].flatMap((s) =>
        vis.map((a) => (
          <mesh key={`${s}${a}`} material={m.zinc} position={[(s * e * 0.72) / 2 + s * 0.002, Math.cos(a) * 0.05, Math.sin(a) * 0.05]} rotation-z={Math.PI / 2}>
            <cylinderGeometry args={[0.0055, 0.0055, 0.004, 6]} />
          </mesh>
        )),
      )}
      {/* poids, en relief blanc sur la face visible */}
      {[0.6, Math.PI + 0.6].map((a) => (
        <mesh key={a} position={[face * (e * 0.425 + 0.001), Math.sin(a) * (r - 0.06), Math.cos(a) * (r - 0.06)]} rotation={[-a + Math.PI / 2, (face * Math.PI) / 2, 0]}>
          <planeGeometry args={[0.1, 0.05]} />
          <meshStandardMaterial map={etiquette} transparent roughness={0.6} depthWrite={false} polygonOffset polygonOffsetFactor={-2} />
        </mesh>
      ))}
    </group>
  );
}

/** Barre olympique 20 kg : 2,20 m, fût Ø 28 mm moleté, manchons chromés Ø 50 mm, deux disques et colliers par côté. */
function Barre({ m, disques = [20, 10] }) {
  return (
    <group>
      {/* fût moleté (zone centrale lisse, puis moletage) */}
      <mesh material={m.zinc} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.014, 0.014, 0.42, 24]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} material={m.molette} position={[s * 0.43, 0, 0]} rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.0142, 0.0142, 0.44, 24]} />
        </mesh>
      ))}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.655, 0, 0]}>
          {/* bague d'arrêt, puis manchon */}
          <mesh material={m.chrome} rotation-z={Math.PI / 2}>
            <cylinderGeometry args={[0.035, 0.035, 0.03, 40]} />
          </mesh>
          <mesh material={m.chrome} position={[s * 0.23, 0, 0]} rotation-z={Math.PI / 2}>
            <cylinderGeometry args={[0.025, 0.025, 0.43, 40]} />
          </mesh>
          {disques.map((kg, j) => {
            const x = disques.slice(0, j).reduce((t, d) => t + DISQUES[d].e + 0.003, 0.03) + DISQUES[kg].e / 2;
            return (
              <group key={j} position={[s * x, 0, 0]}>
                <Disque m={m} kg={kg} face={s} />
              </group>
            );
          })}
          {/* collier à ressort */}
          <mesh material={m.zinc} position={[s * (disques.reduce((t, d) => t + DISQUES[d].e + 0.003, 0.03) + 0.012), 0, 0]} rotation-y={Math.PI / 2}>
            <torusGeometry args={[0.03, 0.006, 10, 32]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Cage à squat : montants 7,5 cm percés et numérotés, traverses boulonnées, crochets, bras de sécurité, barre de traction. */
function Rack({ m }) {
  const H = 2.3;
  const marque = useMemo(() => marquage('PULSE', { taille: 92, couleur: ACIDE }), []);
  const montant = (x, z) => (
    <group key={`${x}${z}`} position={[x, H / 2, z]}>
      <mesh material={m.montant}>
        <boxGeometry args={[0.075, H, 0.075]} />
      </mesh>
      {/* platine au sol, deux boulons */}
      <mesh material={m.tole} position={[0, -H / 2 + 0.006, 0]}>
        <boxGeometry args={[0.16, 0.012, 0.16]} />
      </mesh>
    </group>
  );
  const boulons = (x, y, z, axe) =>
    [-0.02, 0.02].map((d) => (
      <mesh key={`${x}${y}${z}${d}`} material={m.zinc} position={axe === 'x' ? [x, y + d, z] : [x, y + d, z]} rotation={axe === 'x' ? [0, 0, Math.PI / 2] : [Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.0085, 0.0085, 0.012, 6]} />
      </mesh>
    ));
  return (
    <group>
      {[-0.6, 0.6].flatMap((x) => [montant(x, -0.6), montant(x, 0.6)])}
      {[-0.6, 0.6].map((z) => (
        <mesh key={z} position={[0, H - 0.02, z]} material={m.acier}>
          <boxGeometry args={[1.28, 0.075, 0.075]} />
        </mesh>
      ))}
      {[-0.6, 0.6].map((x) => (
        <mesh key={`h${x}`} position={[x, H - 0.02, 0]} material={m.acier}>
          <boxGeometry args={[0.075, 0.075, 1.28]} />
        </mesh>
      ))}
      {/* traverses basses */}
      {[-0.6, 0.6].map((x) => (
        <mesh key={`b${x}`} position={[x, 0.06, 0]} material={m.acier}>
          <boxGeometry args={[0.075, 0.075, 1.28]} />
        </mesh>
      ))}
      {/* boulons aux assemblages (faces avant) */}
      {[-0.6, 0.6].flatMap((x) => [...boulons(x, H - 0.02, 0.6 + 0.04, 'z'), ...boulons(x, 0.06, 0.6 + 0.04, 'z'), ...boulons(x, H - 0.02, -0.6 - 0.04, 'z')])}
      {/* barre de traction moletée, à l'avant */}
      <mesh material={m.molette} position={[0, H + 0.06, 0.6]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.016, 0.016, 1.36, 24]} />
      </mesh>
      {/* crochets (J-hooks) gainés de nylon, à hauteur d'épaule, sur les montants arrière */}
      {[-0.6, 0.6].map((x) => (
        <group key={`j${x}`} position={[x, 1.43, -0.6 + 0.06]}>
          <mesh material={m.acier}>
            <boxGeometry args={[0.08, 0.12, 0.05]} />
          </mesh>
          <mesh material={m.nylon} position={[0, -0.03, 0.05]}>
            <boxGeometry args={[0.07, 0.035, 0.06]} />
          </mesh>
          <mesh material={m.nylon} position={[0, 0.0, 0.085]}>
            <boxGeometry args={[0.07, 0.07, 0.014]} />
          </mesh>
        </group>
      ))}
      {/* bras de sécurité, à hauteur de hanche */}
      {[-0.6, 0.6].map((x) => (
        <mesh key={`s${x}`} material={m.acier} position={[x, 0.82, 0]}>
          <boxGeometry args={[0.05, 0.05, 1.32]} />
        </mesh>
      ))}
      {/* plaque de marque */}
      <mesh position={[0, H - 0.02, 0.6 + 0.039]}>
        <planeGeometry args={[0.36, 0.06]} />
        <meshStandardMaterial map={marque} transparent depthWrite={false} roughness={0.5} />
      </mesh>
      {/* plateforme d'haltérophilie : chêne au centre, caoutchouc de part et d'autre */}
      <mesh position={[0, 0.012, 0]} material={m.plateau}>
        <boxGeometry args={[1.0, 0.024, 2.2]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={`p${s}`} position={[s * 0.75, 0.012, 0]} material={m.gomme}>
          <boxGeometry args={[0.5, 0.024, 2.2]} />
        </mesh>
      ))}
    </group>
  );
}

/** Banc réglable : sellerie en cuir surpiquée, châssis acier, échelle de réglage, roulettes et poignée. */
function Banc({ m, dossier = 0.35 }) {
  const coussin = (l, key, props) => (
    <group key={key} {...props}>
      <mesh material={m.cuir}>
        <boxGeometry args={[0.28, 0.065, l]} />
      </mesh>
      {/* coutures sur le dessus et le pourtour */}
      <mesh material={m.coutures} position={[0, 0.0334, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.28, l]} />
      </mesh>
      <mesh material={m.acier} position={[0, -0.042, 0]}>
        <boxGeometry args={[0.24, 0.02, l - 0.04]} />
      </mesh>
    </group>
  );
  return (
    <group>
      {/* poutre centrale et pieds */}
      <mesh material={m.acier} position={[0, 0.2, 0]}>
        <boxGeometry args={[0.075, 0.075, 1.2]} />
      </mesh>
      {[-0.6, 0.6].map((z) => (
        <mesh key={z} material={m.acier} position={[0, 0.03, z]}>
          <boxGeometry args={[0.5, 0.06, 0.07]} />
        </mesh>
      ))}
      {[-1, 1].map((s) => (
        <mesh key={s} material={m.nylon} position={[s * 0.22, 0.035, 0.66]} rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.035, 0.035, 0.03, 24]} />
        </mesh>
      ))}
      <mesh material={m.acier} position={[0, 0.25, -0.38]} rotation-x={-0.6}>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
      </mesh>
      {/* échelle de réglage */}
      <mesh material={m.montant} position={[0, 0.3, 0.2]} rotation-x={-0.9}>
        <boxGeometry args={[0.06, 0.45, 0.04]} />
      </mesh>
      {/* poignée de transport chromée */}
      <mesh material={m.chrome} position={[0, 0.06, -0.68]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.014, 0.014, 0.4, 16]} />
      </mesh>
      {coussin(0.42, 'assise', { position: [0, 0.42, -0.36] })}
      {coussin(0.76, 'dossier', { position: [0, 0.42 + Math.sin(dossier) * 0.38, 0.06 + 0.38 - Math.cos(dossier) * 0.38], rotation: [dossier, 0, 0] })}
    </group>
  );
}

/** Haltère hexagonal : têtes gainées de caoutchouc, poignée chromée moletée, embout marqué. */
function Haltere({ m, kg }) {
  const s = 0.72 + kg * 0.012;
  const etiquette = useMemo(() => marquage(String(kg), { taille: 110 }), [kg]);
  return (
    <group scale={s}>
      <mesh material={m.molette} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.016, 0.016, 0.135, 20]} />
      </mesh>
      {[-1, 1].map((k) => (
        <group key={k} position={[k * 0.1, 0, 0]}>
          <mesh material={m.gomme} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.058, 0.058, 0.07, 6]} />
          </mesh>
          <mesh material={m.chrome} position={[k * 0.0352, 0, 0]} rotation-y={(k * Math.PI) / 2}>
            <circleGeometry args={[0.03, 32]} />
          </mesh>
          <mesh position={[k * 0.0356, 0, 0]} rotation-y={(k * Math.PI) / 2}>
            <planeGeometry args={[0.04, 0.02]} />
            <meshBasicMaterial map={etiquette} color="#222" transparent depthWrite={false} />
          </mesh>
          <mesh material={m.chrome} position={[-k * 0.04, 0, 0]} rotation-z={Math.PI / 2}>
            <cylinderGeometry args={[0.024, 0.024, 0.012, 24]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Halteres({ m }) {
  // un rack d'haltères sur deux étages, du plus léger au plus lourd
  return (
    <group>
      {[0.45, 0.8].map((y) => (
        <group key={y} position={[0, y, 0]} rotation-x={-0.2}>
          {[-0.08, 0.08].map((z) => (
            <mesh key={z} position={[0, 0, z]} material={m.acier}>
              <boxGeometry args={[1.6, 0.04, 0.04]} />
            </mesh>
          ))}
        </group>
      ))}
      {[0.45, 0.8].flatMap((y, r) =>
        Array.from({ length: 5 }, (_, i) => (
          <group key={`${r}${i}`} position={[-0.64 + i * 0.32, y + 0.07, 0]}>
            <Haltere m={m} kg={(r === 0 ? 12 : 2) + i * 2} />
          </group>
        )),
      )}
      {[-0.78, 0.78].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.43, 0]} material={m.acier}>
            <boxGeometry args={[0.05, 0.86, 0.05]} />
          </mesh>
          <mesh position={[0, 0.02, 0]} material={m.acier}>
            <boxGeometry args={[0.06, 0.04, 0.5]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Box({ m, h = 0.5 }) {
  return (
    <mesh position={[0, h / 2, 0]} material={m.box}>
      <boxGeometry args={[0.6, h, 0.5]} />
    </mesh>
  );
}

function Tapis({ m }) {
  return (
    <mesh position={[0, 0.006, 0]} material={m.gomme}>
      <boxGeometry args={[0.65, 0.012, 1.8]} />
    </mesh>
  );
}

/* ---------- les postes : décor et athlètes en séance ---------- */
const POSES = {
  // squat goblet : hanches basses, buste penché, kettlebell tenue contre la poitrine
  squat: { bassinY: 0.52, bassinX: 0.45, hanches: [1.45, 1.45], genoux: [1.75, 1.75], ecart: [0.22, 0.22], epaules: [1.1, 1.1], ouverture: [0.25, 0.25], coudes: [2.1, 2.1], tete: -0.35 },
  // coach debout, tablette de suivi en main, regard vers l'athlète
  coach: { epaules: [0.3, 0.3], ouverture: [-0.05, -0.05], coudes: [1.35, 1.35], tete: 0.25 },
  // swing : buste incliné, kettlebell à bout de bras, entre les jambes
  swing: { bassinY: 0.8, bassinX: 0.75, hanches: [0.75, 0.75], genoux: [0.55, 0.55], ecart: [0.16, 0.16], epaules: [0.55, 0.55], ouverture: [0.08, 0.08], coudes: [0.05, 0.05], tete: -0.55 },
  // fente avant, face à l'écran
  fente: { bassinY: 0.62, hanches: [1.35, -0.45], genoux: [1.45, 1.35], ecart: [0.04, 0.04], epaules: [0.2, 0.2], ouverture: [0.35, 0.35], coudes: [1.2, 1.2] },
  // étirement : un bras levé, regard vers le haut
  etirement: { epaules: [3.0, 0.1], ouverture: [0.15, 0.4], coudes: [0.1, 0.2], tete: 0.2 },
};

/* ---------- les vraies vidéos de séance (Pexels, licence libre) ----------
   Une vidéo courte par offre, en boucle et sans son, sur un écran de la salle. Elle passe par le même rendu que
   la scène (reflets de la dalle de verre, rendu filmique, grain, vignettage, profondeur de champ), donc s'y fond.
   Seule la vidéo de l'arrêt en cours est lue ; elle n'est chargée qu'à l'approche (version légère sur téléphone). */
const Y_ECRAN = 2.0;
export const VIDEOS = {
  decouverte: { l: 1.5, h: 0.844 },
  solo: { l: 1.5, h: 0.844 },
  duo: { l: 1.5, h: 0.844 },
  groupe: { l: 0.6, h: 1.067 },
};

function Video({ nom, l, h, i, progres, def }) {
  const affiche = useTexture(`${BASE}scene/videos/${nom}-affiche.jpg`);
  const [video] = useState(() => {
    const v = document.createElement('video');
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.preload = 'none';
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    return v;
  });
  const etat = useRef({ charge: false, pret: false });
  const { tex, mat } = useMemo(() => {
    affiche.colorSpace = THREE.SRGBColorSpace;
    const t = new THREE.VideoTexture(video);
    t.colorSpace = THREE.SRGBColorSpace;
    // dalle d'écran : l'image est émise, une vitre légèrement brillante reflète la salle par-dessus
    const m = new THREE.MeshStandardMaterial({ color: '#000000', emissive: '#ffffff', emissiveIntensity: 1.15, emissiveMap: affiche, roughness: 0.14, metalness: 0, envMapIntensity: 0.5 });
    return { tex: t, mat: m };
  }, [video, affiche]);
  useEffect(
    () => () => {
      video.pause();
      video.removeAttribute('src');
      video.load();
      tex.dispose();
    },
    [video, tex],
  );
  useFrame(() => {
    const p = progres.lisse ?? 0;
    const [ta, tb] = ARRETS[i];
    const proche = p > ta - 0.12 && p < tb + 0.08;
    const e = etat.current;
    if (proche && !e.charge) {
      e.charge = true;
      for (const [ext, type] of [
        ['mp4', 'video/mp4'],
        ['webm', 'video/webm'],
      ]) {
        const s = document.createElement('source');
        s.src = `${BASE}scene/videos/${nom}-${def}.${ext}`;
        s.type = type;
        video.appendChild(s);
      }
      video.preload = 'auto';
      video.load();
    }
    if (!e.charge) return;
    if (!e.pret && video.readyState >= 2) {
      e.pret = true;
      mat.emissiveMap = tex;
      mat.needsUpdate = true;
    }
    if (IMAGE_PAR_IMAGE) {
      // enregistrement image par image : la vidéo suit l'horloge de la scène
      if (video.readyState >= 1 && !video.seeking && video.duration) video.currentTime = horloge.t % video.duration;
    } else if (proche && video.paused) video.play().catch(() => {});
    else if (!proche && !video.paused) video.pause();
  });
  return (
    <mesh material={mat}>
      <planeGeometry args={[l, h]} />
    </mesh>
  );
}

/** Écran mural (béton) ou suspendu devant la verrière : cadre noir fin, dalle vidéo. */
function EcranMural({ poste, i, progres, def, m }) {
  const { id, cote, z } = poste;
  const { l, h } = VIDEOS[id];
  const x = cote * (cote > 0 ? L - 0.05 : L - 0.3);
  return (
    <group position={[x, Y_ECRAN, z]} rotation-y={-cote * (Math.PI / 2)}>
      <mesh material={m.nylon} position={[0, 0, -0.025]}>
        <boxGeometry args={[l + 0.05, h + 0.05, 0.04]} />
      </mesh>
      <group position={[0, 0, 0.0]}>
        <Video nom={id} l={l} h={h} i={i} progres={progres} def={def} />
      </group>
      {/* devant la verrière, l'écran est suspendu au plafond par deux câbles */}
      {cote < 0 &&
        [-1, 1].map((s) => (
          <mesh key={s} material={m.zinc} position={[s * l * 0.4, (HAUT - Y_ECRAN + h / 2) / 2, -0.03]}>
            <cylinderGeometry args={[0.004, 0.004, HAUT - Y_ECRAN - h / 2, 6]} />
          </mesh>
        ))}
    </group>
  );
}

function Poste({ poste, m, i, progres, def }) {
  const { id, cote, z } = poste;
  const x = cote * X_POSTE;
  // le poste regarde vers l'allée (vers -x à droite, +x à gauche), légèrement vers l'entrée
  const rot = -cote * (Math.PI / 2) + cote * 0.35;
  const kb = <Kettlebell />;
  return (
    <group position={[x, 0, z]} rotation-y={rot}>
      {id === 'decouverte' && (
        <>
          {/* le bilan de forme : un banc, une tablette sur pied, une athlète qui s'étire */}
          <group position={[-0.8, 0, -0.3]} rotation-y={Math.PI / 2}>
            <Banc m={m} dossier={0} />
          </group>
          <group position={[0.75, 0, 0.1]}>
            <mesh position={[0, 0.6, 0]} material={m.acier}>
              <cylinderGeometry args={[0.015, 0.02, 1.2, 12]} />
            </mesh>
            <mesh position={[0, 1.22, 0.02]} rotation-x={-0.35} material={m.acier}>
              <boxGeometry args={[0.3, 0.22, 0.015]} />
            </mesh>
            <mesh position={[0, 1.222, 0.03]} rotation-x={-0.35} material={m.ecran}>
              <planeGeometry args={[0.27, 0.19]} />
            </mesh>
          </group>
          <Athlete pose={POSES.etirement} />
        </>
      )}
      {id === 'solo' && (
        <>
          <group position={[0, 0, -0.35]}>
            <Rack m={m} />
            <group position={[0, 1.478, -0.465]}>
              <Barre m={m} />
            </group>
          </group>
          <group position={[0, 0, -0.1]}>
            <Athlete pose={POSES.squat} objets={[null, <group key="kb" position={[-0.09, 0.02, 0]}>{kb}</group>]} />
          </group>
          <group position={[0.85, 0, 0.55]} rotation-y={-0.9}>
            <Athlete
              pose={POSES.coach}
              homme
              tenue="#111113"
              objets={[
                null,
                <group key="tablette" position={[-0.11, 0.0, 0.02]} rotation={[1.2, 0, 0]}>
                  <mesh material={m.acier}>
                    <boxGeometry args={[0.24, 0.17, 0.012]} />
                  </mesh>
                  <mesh position={[0, 0, 0.007]} material={m.ecran}>
                    <planeGeometry args={[0.22, 0.15]} />
                  </mesh>
                </group>,
              ]}
            />
          </group>
          <group position={[-1.35, 0, -0.5]} rotation-y={0.3}>
            <Halteres m={m} />
          </group>
          <group position={[1.75, 0, -1.0]} rotation-y={-0.5}>
            <Banc m={m} dossier={0.6} />
          </group>
          {/* une paire d'haltères posée au sol, au pied du banc */}
          <group position={[-0.75, 0.045, 0.85]} rotation-y={0.3}>
            <Haltere m={m} kg={12} />
          </group>
        </>
      )}
      {id === 'duo' && (
        <>
          {[-0.55, 0.55].map((dx, i) => (
            <group key={dx} position={[dx, 0, 0]}>
              <Tapis m={m} />
              <Athlete pose={POSES.swing} homme={i === 1} objets={[kb, null]} />
            </group>
          ))}
        </>
      )}
      {id === 'groupe' && (
        <>
          {[-1.1, 0, 1.1].map((dx, i) => (
            <group key={dx} position={[dx, 0, (i % 2) * 0.25]}>
              <group position={[0, 0, -0.75]}>
                <Box m={m} h={0.45 + i * 0.1} />
              </group>
              <Athlete pose={i === 1 ? POSES.squat : POSES.swing} homme={i === 0} objets={i === 1 ? [null, kb] : [kb, null]} />
            </group>
          ))}
        </>
      )}
      {id === 'enligne' && (
        <>
          {/* un grand écran sur pied : la séance en direct */}
          <group position={[0, 0, -1.1]}>
            <mesh position={[0, 1.3, 0]} material={m.acier}>
              <boxGeometry args={[1.5, 0.88, 0.06]} />
            </mesh>
            <group position={[0, 1.3, 0.032]}>
              <Video nom="enligne" l={1.42} h={0.8} i={i} progres={progres} def={def} />
            </group>
            {[-0.6, 0.6].map((dx) => (
              <mesh key={dx} position={[dx, 0.43, 0]} material={m.acier}>
                <boxGeometry args={[0.05, 0.86, 0.05]} />
              </mesh>
            ))}
          </group>
          <Tapis m={m} />
          <group rotation-y={Math.PI}>
            <Athlete pose={POSES.fente} />
          </group>
        </>
      )}
      {/* une lumière douce sur chaque poste, et un contre-jour chaud */}
      <pointLight position={[0.6, 2.6, 1.3]} color="#ffeedd" intensity={2.4} distance={5} decay={1.6} />
      <pointLight position={[0, 1.9, -1.2]} color="#ffc28a" intensity={1.3} distance={2.6} decay={1.5} />
    </group>
  );
}

/* ---------- caméra ---------- */
export const ARRETS = POSTES.map((_, i) => [0.17 + i * 0.145, 0.17 + i * 0.145 + 0.095]);
const ENTREE = [
  [0.0, [0, 1.7, 2.6], [0, 1.6, -8]],
  [0.13, [0, 1.75, 0.2], [0.6, 1.4, -6]],
];
const SORTIE = [
  [0.93, [0, 1.8, -8], [0, 2.4, FOND]],
  [1.0, [0, 1.8, -8.6], [0, 2.4, FOND]],
];

function vue(i, a, portrait, pos, cible) {
  const { cote, z } = POSTES[i];
  const cx = cote * X_POSTE;
  const r = portrait ? 4.4 : 3.9;
  // a : angle autour du poste (0 : de face depuis l'allée, + : vers l'entrée)
  pos.set(cx - cote * Math.cos(a) * r, 1.95, z + Math.sin(a) * r);
  cible.set(cx, portrait ? 0.95 : 1.42, z);
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
      poses.push([ta, (pp, cc) => vue(i, 0.15, portrait, pp, cc)]);
      poses.push([tb, (pp, cc) => vue(i, 0.75, portrait, pp, cc)]);
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
    // mise au point sur le poste regardé (la profondeur de champ suit la caméra)
    foyer?.copy(c0);
    camera.fov = portrait ? 62 : 46;
    camera.updateProjectionMatrix();
  });
  return null;
}

/** Lumière et reflets d'une vraie salle de sport : HDRI Poly Haven (crossfit gym), neutralisée et réchauffée. */
function Ambiance({ def }) {
  return <Environment files={`${BASE}scene/gym-${def === 'hd' ? '1k' : '512'}.hdr`} environmentIntensity={0.42} />;
}

/** Le soleil rasant entre par la verrière : ombres douces au sol, rais de lumière entre les montants. */
function Soleil({ taille }) {
  const [cible] = useState(() => new THREE.Object3D());
  return (
    <>
      <primitive object={cible} position={[0, 0, -6.5]} />
      <directionalLight
        position={[-10, 9, -3]}
        target={cible}
        color="#ffe2c2"
        intensity={3.2}
        castShadow
        shadow-mapSize={[taille, taille]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.025}
        shadow-radius={4}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-camera-near={1}
        shadow-camera-far={26}
      />
    </>
  );
}

/** Ombres : tout objet opaque en porte et en reçoit, sauf la coque de la salle (murs, plafond), qui ne fait que les recevoir. */
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

/** Rendu « caméra » : occlusion ambiante, profondeur de champ, rendu filmique AgX, grain et vignettage. */
function Effets({ niveau, foyer }) {
  const dof = useRef();
  useFrame(() => dof.current?.target?.copy(foyer));
  if (niveau === 'complet')
    return (
      <EffectComposer multisampling={4}>
        <N8AO aoRadius={0.55} distanceFalloff={0.5} intensity={2.4} quality="medium" color="#0a0806" />
        <DepthOfField ref={dof} target={foyer} worldFocusRange={2.6} bokehScale={2.2} resolutionScale={0.5} />
        <ToneMapping mode={ToneMappingMode.AGX} />
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.16} />
        <Vignette offset={0.28} darkness={0.55} />
      </EffectComposer>
    );
  // téléphone : occlusion à demi-résolution, rendu filmique, grain et vignettage ; ni profondeur de champ ni reflets
  return (
    <EffectComposer multisampling={0}>
      <N8AO aoRadius={0.5} distanceFalloff={0.5} intensity={2.2} quality="performance" halfRes depthAwareUpsampling color="#0a0806" />
      <ToneMapping mode={ToneMappingMode.AGX} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.14} />
      <Vignette offset={0.28} darkness={0.5} />
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

function Scene({ def, reflets, progres }) {
  const m = useMateriel(def);
  return (
    <>
      <Ambiance def={def} />
      <Salle def={def} reflets={reflets} />
      {POSTES.map((p, i) => (
        <Poste key={p.id} poste={p} m={m} i={i} progres={progres} def={def} />
      ))}
      {POSTES.filter((p) => VIDEOS[p.id]).map((p) => (
        <EcranMural key={`e${p.id}`} poste={p} i={POSTES.indexOf(p)} progres={progres} def={def} m={m} />
      ))}
      <Ombres />
    </>
  );
}

export default function Salle3D({ progres, leger, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  // ordinateur : tout (textures 2K, reflets au sol, profondeur de champ) ; téléphone : version allégée automatique
  const complet = !petit && !leger;
  const def = complet ? 'hd' : 'sd';
  const foyer = useRef(new THREE.Vector3(-2.3, 1, -4.9)).current;
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={leger ? [1, 1.25] : petit ? [1, 1.5] : [1, 1.75]}
      frameloop={IMAGE_PAR_IMAGE || !actif ? 'never' : 'always'}
      camera={{ fov: 46, near: 0.05, far: 50, position: [0, 1.7, 2.6] }}
      shadows={leger ? false : 'soft'}
      gl={{ antialias: false, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.AgXToneMapping;
        gl.toneMappingExposure = 1.0;
        scene.background = new THREE.Color('#0d0b09');
        scene.fog = new THREE.Fog('#0d0b09', 14, 28);
      }}
      aria-hidden="true"
    >
      <Pilote />
      <hemisphereLight args={['#f3ece2', '#2a2420', 0.18]} />
      {!leger && <Soleil taille={complet ? 2048 : 1024} />}
      <Suspense fallback={null}>
        <Scene def={def} reflets={complet} progres={progres} />
        <Camera progres={progres} foyer={foyer} />
        {!leger && <Effets niveau={complet ? 'complet' : 'leger'} foyer={foyer} />}
        <Pret onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
