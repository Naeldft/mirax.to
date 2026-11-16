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
};

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
