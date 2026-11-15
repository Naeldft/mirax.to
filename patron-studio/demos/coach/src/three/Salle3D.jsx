import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import Athlete, { Kettlebell } from './Athlete';

/* ------------------------------------------------------------------
   Intro 3D de Pulse Coaching (pilotée par le défilement, progres 0 → 1).
   Une salle de sport premium : sol caoutchouc noir, béton, mur à lames de bois, grandes verrières, néon « PULSE »
   vert acide. Le matériel est construit en code (rack, barre et disques, haltères, kettlebells, box, banc, écran) ;
   les plantes viennent de Poly Haven (CC0). Les athlètes sont des mannequins élégants en pleine séance.
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

function useMatiere(nom, { taille, couleur, repeat = [1, 1], env = 0.4 } = {}) {
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

/** Sol en caoutchouc : dalles noires, joints fins. */
function texSol() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = '#1b1b1d';
  g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 6000; i++) {
    g.fillStyle = `rgba(255,255,255,${Math.random() * 0.035})`;
    g.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }
  g.fillStyle = '#0d0d0e';
  g.fillRect(0, 0, 512, 3);
  g.fillRect(0, 0, 3, 512);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(8, 13);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ---------- la salle ---------- */
function Salle({ taille }) {
  const beton = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3a3a3d', roughness: 0.92 }), []);
  const bois = useMatiere('wood_floor', { taille, couleur: '#a77d55', repeat: [3, 2], env: 0.4 });
  const m = useMemo(
    () => ({
      sol: new THREE.MeshStandardMaterial({ map: texSol(), roughness: 0.75, envMapIntensity: 0.3 }),
      plafond: new THREE.MeshStandardMaterial({ color: '#141416', roughness: 0.9 }),
      led: new THREE.MeshBasicMaterial({ color: '#f4f4f1', toneMapped: false }),
      jour: new THREE.MeshBasicMaterial({ color: '#e8eef2', toneMapped: false }),
      acier: new THREE.MeshStandardMaterial({ color: '#202024', roughness: 0.4, metalness: 0.8 }),
      acide: new THREE.MeshBasicMaterial({ color: ACIDE, toneMapped: false }),
    }),
    [],
  );
  const pulse = useMemo(() => neon('PULSE', ACIDE, 230), []);
  const long = -FOND;
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, FOND / 2]} material={m.sol}>
        <planeGeometry args={[2 * L, long]} />
      </mesh>
      <mesh rotation-x={Math.PI / 2} position={[0, HAUT, FOND / 2]} material={m.plafond}>
        <planeGeometry args={[2 * L, long]} />
      </mesh>
      {/* rampes LED au plafond */}
      {[-1.6, 0, 1.6].map((x) => (
        <mesh key={x} position={[x, HAUT - 0.02, FOND / 2]} material={m.led}>
          <boxGeometry args={[0.05, 0.02, long - 1]} />
        </mesh>
      ))}
      {/* mur de droite : béton */}
      <mesh position={[L, HAUT / 2, FOND / 2]} rotation-y={-Math.PI / 2} material={beton}>
        <planeGeometry args={[long, HAUT]} />
      </mesh>
      {/* mur de gauche : verrière (lumière du jour) au-dessus d'un soubassement en lames de bois */}
      <mesh position={[-L, 0.6, FOND / 2]} rotation-y={Math.PI / 2} material={bois}>
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
      <mesh position={[-L + 0.02, 2.65, FOND / 2]} material={m.acier}>
        <boxGeometry args={[0.06, 0.06, long]} />
      </mesh>
      {/* mur du fond : bois, néon PULSE */}
      <mesh position={[0, HAUT / 2, FOND]} material={bois}>
        <planeGeometry args={[2 * L, HAUT]} />
      </mesh>
      <mesh position={[0, 2.9, FOND + 0.02]}>
        <planeGeometry args={[3.2, 0.8]} />
        <meshBasicMaterial map={pulse} transparent toneMapped={false} depthWrite={false} />
      </mesh>
      <pointLight position={[0, 2.9, FOND + 0.8]} color={ACIDE} intensity={3} distance={6} decay={1.6} />
      {/* liseré vert acide au pied des murs */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (L - 0.01), 0.04, FOND / 2]} material={m.acide}>
          <boxGeometry args={[0.01, 0.015, long]} />
        </mesh>
      ))}
      <Plante position={[-L + 0.5, 0, -0.9]} scale={4} />
      <Plante position={[L - 0.5, 0, -12.3]} scale={4} rotation-y={1} />
    </group>
  );
}

/* ---------- le matériel, construit en code ---------- */
function useMateriel() {
  return useMemo(
    () => ({
      acier: new THREE.MeshStandardMaterial({ color: '#26262a', roughness: 0.35, metalness: 0.85 }),
      chrome: new THREE.MeshStandardMaterial({ color: '#c9c9cc', roughness: 0.2, metalness: 1 }),
      fonte: new THREE.MeshStandardMaterial({ color: '#18181b', roughness: 0.55, metalness: 0.5 }),
      caoutchouc: new THREE.MeshStandardMaterial({ color: '#141416', roughness: 0.85 }),
      acide: new THREE.MeshStandardMaterial({ color: ACIDE, roughness: 0.5, emissive: ACIDE, emissiveIntensity: 0.15 }),
      bois: new THREE.MeshStandardMaterial({ color: '#b48a5e', roughness: 0.6 }),
      cuir: new THREE.MeshStandardMaterial({ color: '#1c1c1f', roughness: 0.6 }),
      ecran: new THREE.MeshBasicMaterial({ color: '#0e1a05', toneMapped: false }),
    }),
    [],
  );
}

function Barre({ m, longueur = 2.0 }) {
  return (
    <group>
      <mesh material={m.chrome} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.014, 0.014, longueur, 16]} />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * (longueur / 2 - 0.25), 0, 0]}>
          <mesh material={m.caoutchouc} rotation-z={Math.PI / 2}>
            <cylinderGeometry args={[0.225, 0.225, 0.06, 40]} />
          </mesh>
          <mesh material={m.acide} rotation-z={Math.PI / 2} position={[s * 0.031, 0, 0]}>
            <ringGeometry args={[0.04, 0.06, 32]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Rack({ m }) {
  const montant = (x, z) => (
    <mesh key={`${x}${z}`} position={[x, 1.15, z]} material={m.acier}>
      <boxGeometry args={[0.075, 2.3, 0.075]} />
    </mesh>
  );
  return (
    <group>
      {[-0.6, 0.6].flatMap((x) => [montant(x, -0.6), montant(x, 0.6)])}
      {[-0.6, 0.6].map((z) => (
        <mesh key={z} position={[0, 2.28, z]} material={m.acier}>
          <boxGeometry args={[1.28, 0.075, 0.075]} />
        </mesh>
      ))}
      {[-0.6, 0.6].map((x) => (
        <mesh key={`h${x}`} position={[x, 2.28, 0]} material={m.acier}>
          <boxGeometry args={[0.075, 0.075, 1.28]} />
        </mesh>
      ))}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.006, 0]} material={m.bois}>
        <planeGeometry args={[1.5, 1.6]} />
      </mesh>
    </group>
  );
}

function Halteres({ m }) {
  // un rack d'haltères hexagonaux, du plus léger au plus lourd
  return (
    <group>
      {[0.45, 0.8].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation-x={-0.2} material={m.acier}>
          <boxGeometry args={[1.6, 0.04, 0.32]} />
        </mesh>
      ))}
      {[0.45, 0.8].flatMap((y, r) =>
        Array.from({ length: 5 }, (_, i) => {
          const s = 0.75 + (i + r * 5) * 0.05;
          return (
            <group key={`${r}${i}`} position={[-0.64 + i * 0.32, y + 0.07 * s, 0]} scale={s}>
              <mesh material={m.chrome} rotation-z={Math.PI / 2}>
                <cylinderGeometry args={[0.014, 0.014, 0.26, 12]} />
              </mesh>
              {[-1, 1].map((k) => (
                <mesh key={k} material={m.fonte} position={[k * 0.1, 0, 0]} rotation-z={Math.PI / 2}>
                  <cylinderGeometry args={[0.05, 0.05, 0.07, 6]} />
                </mesh>
              ))}
            </group>
          );
        }),
      )}
      {[-0.75, 0.75].map((x) => (
        <mesh key={x} position={[x, 0.42, 0]} material={m.acier}>
          <boxGeometry args={[0.05, 0.84, 0.3]} />
        </mesh>
      ))}
    </group>
  );
}

function Box({ m, h = 0.5 }) {
  return (
    <mesh position={[0, h / 2, 0]} material={m.bois}>
      <boxGeometry args={[0.6, h, 0.5]} />
    </mesh>
  );
}

function Tapis({ m }) {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.008, 0]} material={m.caoutchouc}>
      <planeGeometry args={[0.65, 1.8]} />
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

function Poste({ poste, m }) {
  const { id, cote, z } = poste;
  const x = cote * X_POSTE;
  // le poste regarde vers l'allée (vers -x à droite, +x à gauche), légèrement vers l'entrée
  const rot = -cote * (Math.PI / 2) + cote * 0.35;
  const kb = <Kettlebell />;
  const ecranTex = useMemo(() => neon('EN DIRECT', ACIDE, 150), []);
  return (
    <group position={[x, 0, z]} rotation-y={rot}>
      {id === 'decouverte' && (
        <>
          {/* le bilan de forme : un banc, une tablette sur pied, une athlète qui s'étire */}
          <group position={[-0.7, 0, -0.3]}>
            <mesh position={[0, 0.42, 0]} material={m.cuir}>
              <boxGeometry args={[1.2, 0.08, 0.32]} />
            </mesh>
            {[-0.5, 0.5].map((dx) => (
              <mesh key={dx} position={[dx, 0.2, 0]} material={m.acier}>
                <boxGeometry args={[0.06, 0.4, 0.28]} />
              </mesh>
            ))}
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
            <group position={[0, 1.45, -0.6]}>
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
            <mesh position={[0, 1.3, 0.032]}>
              <planeGeometry args={[1.42, 0.8]} />
              <meshBasicMaterial map={ecranTex} toneMapped={false} color="#cfe8a8" />
            </mesh>
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
      <pointLight position={[0.6, 2.4, 1.2]} color="#fff2e2" intensity={2.2} distance={4} decay={1.5} />
      <pointLight position={[0, 1.9, -1.1]} color="#ffbe7a" intensity={1.4} distance={2.4} decay={1.4} />
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
  cible.set(cx, portrait ? 0.75 : 1.0, z);
  if (!portrait) {
    const dx = cible.x - pos.x;
    const dz = cible.z - pos.z;
    const n = Math.hypot(dx, dz);
    cible.x += (dz / n) * 0.75;
    cible.z -= (dx / n) * 0.75;
  }
}

function Camera({ progres }) {
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
    camera.lookAt(c0.lerp(c1, k));
    camera.fov = portrait ? 62 : 46;
    camera.updateProjectionMatrix();
  });
  return null;
}

function Ambiance({ taille }) {
  const env = useTexture(`${BASE}scene/loft-${taille}.jpg`);
  const { scene } = useThree();
  useEffect(() => {
    env.mapping = THREE.EquirectangularReflectionMapping;
    env.colorSpace = THREE.SRGBColorSpace;
    scene.environment = env;
    scene.environmentIntensity = 0.5;
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

function Scene({ taille }) {
  const m = useMateriel();
  return (
    <>
      <Ambiance taille={taille} />
      <Salle taille={taille} />
      {POSTES.map((p) => (
        <Poste key={p.id} poste={p} m={m} />
      ))}
    </>
  );
}

export default function Salle3D({ progres, leger, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  const taille = petit || leger ? 512 : 1024;
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={leger ? [1, 1.25] : petit ? [1, 1.6] : [1, 1.75]}
      frameloop={IMAGE_PAR_IMAGE || !actif ? 'never' : 'always'}
      camera={{ fov: 46, near: 0.05, far: 50, position: [0, 1.7, 2.6] }}
      gl={{ antialias: !leger, powerPreference: 'high-performance' }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        scene.background = new THREE.Color('#0b0b0c');
        scene.fog = new THREE.Fog('#0b0b0c', 12, 24);
      }}
      aria-hidden="true"
    >
      <Pilote />
      <hemisphereLight args={['#e9eef2', '#2a2622', 0.45]} />
      <directionalLight position={[-6, 6, 2]} intensity={1.1} color="#eef3f6" />
      <Suspense fallback={null}>
        <Scene taille={taille} />
        <Camera progres={progres} />
        <Pret onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
