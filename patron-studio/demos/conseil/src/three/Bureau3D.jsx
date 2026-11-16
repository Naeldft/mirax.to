import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { DepthOfField, EffectComposer, N8AO, Noise, ToneMapping, Vignette } from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import Differe, { signalerScenePrete } from '@demos/shared/three/Differe.jsx';
import Personnage from '@demos/shared/three/Personnage.jsx';
import { grain, usePBR } from '@demos/shared/three/materiaux.js';

/* ------------------------------------------------------------------
   Intro 3D de Cap Horizon (pilotée par le défilement, progres 0 → 1).
   Les bureaux du cabinet, place du Théâtre à Lille : parquet en point de Hongrie, murs blancs à moulures,
   hautes fenêtres. Un espace par offre : le diagnostic flash (table ronde, rapport et ordinateur), l'accompagnement
   Cap (point mensuel devant le tableau de bord), la mission sur mesure (atelier au mur de post-it).
   Consultants et dirigeants : mannequins habillés, poses calculées (mains sur le rapport, sur l'écran, sur le mur).
   Rendu photoréaliste et poids maîtrisé, comme les autres démos (textures 256 px puis 512/1 024 px, détails différés).
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const IMAGE_PAR_IMAGE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('image-par-image');
const horloge = { t: 0, maintenant: () => (IMAGE_PAR_IMAGE ? horloge.t : performance.now() / 1000) };
const doux = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

const L = 4.6;
const FOND = -12;
const HAUT = 3.4;
const COBALT = '#3d6bff';

/** Les espaces (une offre chacun), à gauche puis à droite. */
export const POSTES = [
  { id: 'flash', cote: -1, z: -2.8 },
  { id: 'cap', cote: 1, z: -6.2 },
  { id: 'mission', cote: -1, z: -9.4 },
];
const X_POSTE = 2.35;

/* ---------- les bureaux ---------- */
function Bureaux({ def }) {
  const long = -FOND;
  const sol = usePBR('herringbone_parquet', { def, repeat: [2 * L / 1.5, long / 1.5], couleur: '#efe2cf', env: 0.55 });
  const mur = usePBR('white_plaster_02', { def, repeat: [long / 3, HAUT / 3], couleur: '#f4f1ea', sansCouleur: true, env: 0.5, relief: 0.4 });
  const murFond = usePBR('white_plaster_02', { def, repeat: [3, 1.2], couleur: '#f4f1ea', sansCouleur: true, env: 0.5, relief: 0.4 });
  const m = useMemo(
    () => ({
      plafond: new THREE.MeshStandardMaterial({ color: '#f2efe8', roughness: 0.95 }),
      moulure: new THREE.MeshStandardMaterial({ color: '#f7f4ee', roughness: 0.6 }),
      jour: new THREE.MeshBasicMaterial({ map: ciel(), toneMapped: false }),
      menuiserie: new THREE.MeshStandardMaterial({ color: '#f1eee8', roughness: 0.45 }),
      plinthe: new THREE.MeshStandardMaterial({ color: '#e9e4da', roughness: 0.5 }),
      cobalt: new THREE.MeshStandardMaterial({ color: COBALT, roughness: 0.5 }),
    }),
    [],
  );
  const logo = useMemo(() => enseigne(), []);
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, FOND / 2]} material={sol} receiveShadow userData={{ coque: true }}>
        <planeGeometry args={[2 * L, long]} />
      </mesh>
      <mesh rotation-x={Math.PI / 2} position={[0, HAUT, FOND / 2]} material={m.plafond} userData={{ coque: true }}>
        <planeGeometry args={[2 * L, long]} />
      </mesh>
      {/* corniches */}
      {[-1, 1].map((s) => (
        <mesh key={s} material={m.moulure} position={[s * (L - 0.06), HAUT - 0.08, FOND / 2]}>
          <boxGeometry args={[0.12, 0.16, long]} />
        </mesh>
      ))}
      {/* mur de gauche, enduit blanc, plinthe */}
      <mesh position={[-L, HAUT / 2, FOND / 2]} rotation-y={Math.PI / 2} material={mur} userData={{ coque: true }}>
        <planeGeometry args={[long, HAUT]} />
      </mesh>
      <mesh material={m.plinthe} position={[-L + 0.01, 0.06, FOND / 2]}>
        <boxGeometry args={[0.02, 0.12, long]} />
      </mesh>
      {/* mur de droite : hautes fenêtres à petits bois, lumière du jour */}
      <mesh position={[L, HAUT / 2, FOND / 2]} rotation-y={-Math.PI / 2} material={mur} userData={{ coque: true }}>
        <planeGeometry args={[long, HAUT]} />
      </mesh>
      {[-1.6, -4.6, -7.6, -10.6].map((z) => (
        <group key={z} position={[L - 0.02, 1.7, z]}>
          <mesh material={m.jour} rotation-y={-Math.PI / 2}>
            <planeGeometry args={[1.5, 2.5]} />
          </mesh>
          {[-0.75, 0, 0.75].map((dz) => (
            <mesh key={dz} material={m.menuiserie} position={[-0.02, 0, dz]}>
              <boxGeometry args={[0.06, 2.5, 0.06]} />
            </mesh>
          ))}
          {[-1.25, -0.42, 0.42, 1.25].map((dy) => (
            <mesh key={dy} material={m.menuiserie} position={[-0.02, dy, 0]}>
              <boxGeometry args={[0.06, 0.05, 1.5]} />
            </mesh>
          ))}
        </group>
      ))}
      {/* mur du fond : logo du cabinet */}
      <mesh position={[0, HAUT / 2, FOND]} material={murFond} userData={{ coque: true }}>
        <planeGeometry args={[2 * L, HAUT]} />
      </mesh>
      <mesh position={[0, 1.9, FOND + 0.02]}>
        <planeGeometry args={[2.4, 0.6]} />
        <meshStandardMaterial map={logo} transparent roughness={0.6} />
      </mesh>
      {/* suspensions */}
      <Differe>
        {[-2.8, -6.2, -9.4].map((z) => (
          <Modele key={z} nom="modern_ceiling_lamp_01" position={[0, HAUT - 0.95, z]} />
        ))}
        <Modele nom="potted_plant_04" position={[L - 0.45, 0, -0.5]} scale={4} />
        <Modele nom="potted_plant_04" position={[-L + 0.45, 0, -11.4]} scale={4} rotation-y={1} />
      </Differe>
    </group>
  );
}

function ciel() {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 256;
  const g = c.getContext('2d');
  const d = g.createLinearGradient(0, 0, 0, 256);
  d.addColorStop(0, '#fdfcf9');
  d.addColorStop(0.7, '#eef0f2');
  d.addColorStop(1, '#dfe3e6');
  g.fillStyle = d;
  g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function enseigne() {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 256;
  const g = c.getContext('2d');
  g.clearRect(0, 0, 1024, 256);
  g.fillStyle = '#0f1b2d';
  g.textAlign = 'center';
  g.font = 'italic 600 130px "Fraunces", Georgia, serif';
  g.fillText('Cap Horizon', 512, 150);
  g.fillStyle = COBALT;
  g.fillRect(352, 190, 320, 6);
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

/* ---------- supports dessinés : rapport, tableau de bord, mur de post-it, tableau blanc ---------- */
function canevas(l, h, dessin) {
  const c = document.createElement('canvas');
  c.width = l;
  c.height = h;
  dessin(c.getContext('2d'), l, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function texRapport() {
  return canevas(256, 362, (g, l, h) => {
    g.fillStyle = '#fbfaf7';
    g.fillRect(0, 0, l, h);
    g.fillStyle = '#0f1b2d';
    g.font = '700 22px sans-serif';
    g.fillText('Diagnostic flash', 22, 40);
    g.fillStyle = COBALT;
    g.fillRect(22, 52, 60, 4);
    g.fillStyle = '#5f6672';
    for (let y = 80; y < 170; y += 14) g.fillRect(22, y, 180 + ((y * 7) % 40), 5);
    // un petit graphique en barres
    [40, 70, 55, 95, 80].forEach((v, i) => {
      g.fillStyle = i === 3 ? COBALT : '#c9d6ff';
      g.fillRect(30 + i * 40, 300 - v, 26, v);
    });
  });
}

function texTableauBord() {
  return canevas(1024, 576, (g, l, h) => {
    g.fillStyle = '#0f1b2d';
    g.fillRect(0, 0, l, h);
    g.fillStyle = '#fbfaf7';
    g.font = '600 34px sans-serif';
    g.fillText('Tableau de bord · mois 4', 48, 70);
    // indicateurs
    [
      ['Marge brute', '+18 %', '#1f9d6b'],
      ['Trésorerie', '62 jours', '#c9d6ff'],
      ['Délai client', '−11 j', '#1f9d6b'],
    ].forEach(([n, v, c], i) => {
      const x = 48 + i * 320;
      g.fillStyle = '#1a2a42';
      g.fillRect(x, 100, 290, 130);
      g.fillStyle = '#9aa6b8';
      g.font = '400 24px sans-serif';
      g.fillText(n, x + 20, 140);
      g.fillStyle = c;
      g.font = '700 52px sans-serif';
      g.fillText(v, x + 20, 205);
    });
    // courbe de marge sur 6 mois
    g.strokeStyle = COBALT;
    g.lineWidth = 8;
    g.beginPath();
    [380, 400, 370, 340, 320, 290].forEach((y, i) => (i ? g.lineTo(80 + i * 170, y + 150) : g.moveTo(80, y + 150)));
    g.stroke();
    g.fillStyle = '#c9d6ff';
    [380, 400, 370, 340, 320, 290].forEach((y, i) => {
      g.beginPath();
      g.arc(80 + i * 170, y + 150, 10, 0, Math.PI * 2);
      g.fill();
    });
  });
}

function texPostIt() {
  return canevas(1024, 560, (g, l, h) => {
    g.fillStyle = '#fbfaf7';
    g.fillRect(0, 0, l, h);
    const cols = ['Aujourd’hui', 'Dans 3 mois', 'Dans 12 mois'];
    const couleurs = ['#ffe27a', '#ffb3a7', '#a8e6cf', '#c9d6ff'];
    cols.forEach((c, i) => {
      const x = 30 + i * 335;
      g.fillStyle = '#0f1b2d';
      g.font = '700 34px sans-serif';
      g.fillText(c, x + 10, 50);
      g.fillStyle = '#dcd8ce';
      g.fillRect(x + 320, 20, 3, 520);
      for (let k = 0; k < 6; k++) {
        const px = x + 10 + (k % 2) * 150 + ((k * 13) % 9);
        const py = 80 + Math.floor(k / 2) * 150 + ((k * 7) % 11);
        g.save();
        g.translate(px + 65, py + 65);
        g.rotate(((k * 37 + i * 11) % 9 - 4) * 0.012);
        g.fillStyle = couleurs[(k + i) % 4];
        g.fillRect(-65, -65, 130, 130);
        g.fillStyle = 'rgba(15,27,45,0.75)';
        for (let ligne = 0; ligne < 3; ligne++) g.fillRect(-48, -30 + ligne * 22, 60 + ((k * 19 + ligne * 23) % 36), 6);
        g.restore();
      }
    });
  });
}

function texTableauBlanc() {
  return canevas(768, 480, (g, l, h) => {
    g.fillStyle = '#fdfdfb';
    g.fillRect(0, 0, l, h);
    g.strokeStyle = '#0f1b2d';
    g.fillStyle = '#0f1b2d';
    g.lineWidth = 5;
    g.font = '600 46px "Comic Sans MS", cursive, sans-serif';
    g.fillText('3 priorités', 40, 70);
    ['Prix de revient', 'Relances clients', 'Trésorerie 13 sem.'].forEach((t, i) => {
      g.fillStyle = i === 0 ? COBALT : '#0f1b2d';
      g.font = '600 38px "Comic Sans MS", cursive, sans-serif';
      g.fillText(`${i + 1}. ${t}`, 60, 150 + i * 80);
    });
    g.strokeStyle = '#1f9d6b';
    g.beginPath();
    g.moveTo(560, 400);
    g.lineTo(690, 260);
    g.lineTo(670, 300);
    g.moveTo(690, 260);
    g.lineTo(650, 270);
    g.stroke();
  });
}

/* ---------- mobilier construit en code ---------- */
function useMobilier() {
  return useMemo(() => {
    const n = grain();
    return {
      chene: new THREE.MeshStandardMaterial({ color: '#b48a5e', roughness: 0.5, normalMap: n, normalScale: new THREE.Vector2(0.2, 0.2) }),
      noir: new THREE.MeshStandardMaterial({ color: '#1c1f24', roughness: 0.45, metalness: 0.6 }),
      alu: new THREE.MeshStandardMaterial({ color: '#c7cacf', roughness: 0.3, metalness: 1 }),
      papier: new THREE.MeshStandardMaterial({ map: texRapport(), roughness: 0.9 }),
      ecranPortable: new THREE.MeshBasicMaterial({ map: texTableauBord(), toneMapped: false }),
      tableauBord: new THREE.MeshStandardMaterial({ color: '#000', emissive: '#ffffff', emissiveMap: texTableauBord(), emissiveIntensity: 1.05, roughness: 0.25 }),
      postIt: new THREE.MeshStandardMaterial({ map: texPostIt(), roughness: 0.85 }),
      blanc: new THREE.MeshStandardMaterial({ map: texTableauBlanc(), roughness: 0.25 }),
      jaune: new THREE.MeshStandardMaterial({ color: '#ffe27a', roughness: 0.8 }),
      gobelet: new THREE.MeshStandardMaterial({ color: '#efe8dc', roughness: 0.6 }),
    };
  }, []);
}

function TableRonde({ mo }) {
  return (
    <group>
      <mesh material={mo.chene} position={[0, 0.735, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.03, 48]} />
      </mesh>
      <mesh material={mo.noir} position={[0, 0.37, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.72, 16]} />
      </mesh>
      <mesh material={mo.noir} position={[0, 0.012, 0]}>
        <cylinderGeometry args={[0.28, 0.3, 0.024, 32]} />
      </mesh>
    </group>
  );
}

function Portable({ mo }) {
  return (
    <group>
      <mesh material={mo.alu} position={[0, 0.006, 0]} castShadow>
        <boxGeometry args={[0.32, 0.012, 0.22]} />
      </mesh>
      <group position={[0, 0.012, -0.11]} rotation-x={-0.25}>
        <mesh material={mo.alu} position={[0, 0.105, -0.004]}>
          <boxGeometry args={[0.32, 0.21, 0.006]} />
        </mesh>
        <mesh material={mo.ecranPortable} position={[0, 0.105, 0.0]}>
          <planeGeometry args={[0.3, 0.17]} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- les espaces ---------- */
// Poses calculées par cinématique inverse : mains sur le rapport, sur la table, sur l'écran, sur le mur.
const POSES = {
  litRapport: { bassinY: 0.55, bassinX: 0.08, hanches: [1.45, 1.4], genoux: [1.45, 1.4], ecart: [0.1, 0.12], tete: 0.25, rotBras: [-0.37, -0.136], epaules: [0.304, 0.382], ouverture: [0.144, -0.052], coudes: [1.588, 1.463] },
  montrePortable: { bassinY: 0.55, bassinX: 0.08, hanches: [1.45, 1.4], genoux: [1.45, 1.4], ecart: [0.1, 0.12], tete: 0.25, teteY: 0.3, rotBras: [-0.315, 0.082], epaules: [0.07, 0.472], ouverture: [0.104, -0.022], coudes: [1.72, 1.536] },
  montreEcran: { teteY: 0.6, tete: 0.05, rotBras: [0, 0.3], epaules: [0.08, 1.057], ouverture: [0.1, 0.63], coudes: [0.15, 1.694] },
  ecoute: { bassinY: 0.55, bassinX: 0.08, hanches: [1.45, 1.4], genoux: [1.45, 1.4], ecart: [0.1, 0.12], tete: 0.05, teteY: -0.3, rotBras: [-0.333, 0.01], epaules: [0.548, 0.544], ouverture: [-0.072, -0.129], coudes: [0.486, 0.491] },
  colle: { tete: -0.15, teteY: 0.1, rotBras: [0, -0.111], epaules: [0.08, 0.67], ouverture: [0.1, -0.047], coudes: [0.15, 1.951] },
  bloc: { tete: 0.25, teteY: -0.2, rotBras: [-0.423, -0.621], epaules: [0.08, 0.217], ouverture: [-0.02, 0.104], coudes: [1.37, 1.322] },
  gobelet: { teteY: 0.35, rotBras: [-0.652, -0.45], epaules: [0.116, 0.095], ouverture: [0.022, -0.005], coudes: [1.191, 1.196] },
};

function Espace({ poste }) {
  const { id, cote, z } = poste;
  const rot = -cote * (Math.PI / 2) + cote * 0.35;
  const mo = useMobilier();
  return (
    <group position={[cote * X_POSTE, 0, z]} rotation-y={rot}>
      {id === 'flash' && (
        <>
          {/* table ronde : la dirigeante lit le rapport, le consultant montre les chiffres sur l'ordinateur */}
          <TableRonde mo={mo} />
          <group position={[-0.62, 0, 0.05]} rotation-y={Math.PI / 2 - 0.3}>
            <Personnage pose={POSES.litRapport} haut="#7a2e3b" bas="#2b2d33" />
            <mesh material={mo.papier} rotation-x={-Math.PI / 2} position={[0, 0.755, 0.37]}>
              <planeGeometry args={[0.21, 0.297]} />
            </mesh>
            <Modele nom="dining_chair_02" position={[0, 0, -0.08]} rotation-y={Math.PI} />
          </group>
          <group position={[0.62, 0, 0.05]} rotation-y={-Math.PI / 2 + 0.3}>
            <Personnage pose={POSES.montrePortable} homme haut="#2a3445" bas="#2a3445" chemise chaussure="#16120e" />
            <group position={[0.1, 0.752, 0.33]} rotation-y={0.3}>
              <Portable mo={mo} />
            </group>
            <Modele nom="dining_chair_02" position={[0, 0, -0.08]} rotation-y={Math.PI} />
          </group>
          <Modele nom="desk_lamp_arm_01" position={[0.05, 0.75, -0.32]} rotation-y={2.5} />
          {/* tableau blanc sur pied, derrière : les 3 priorités */}
          <group position={[0.2, 0, -1.25]}>
            <mesh material={mo.blanc} position={[0, 1.45, 0]} castShadow>
              <boxGeometry args={[1.5, 0.94, 0.03]} />
            </mesh>
            {[-0.7, 0.7].map((x) => (
              <mesh key={x} material={mo.noir} position={[x, 0.95, -0.03]}>
                <boxGeometry args={[0.04, 1.9, 0.04]} />
              </mesh>
            ))}
          </group>
        </>
      )}
      {id === 'cap' && (
        <>
          {/* point mensuel : la consultante montre l'évolution de la marge sur le tableau de bord */}
          <group position={[-0.55, 0, -0.45]} rotation-y={0.15}>
            <Personnage pose={POSES.montreEcran} haut="#e8e2d6" bas="#2b2d33" />
            <group position={[0.42 + 0.62, 1.32, 0.3]}>
              <mesh material={mo.noir} position={[0, 0, -0.03]}>
                <boxGeometry args={[1.28, 0.75, 0.05]} />
              </mesh>
              <mesh material={mo.tableauBord}>
                <planeGeometry args={[1.22, 0.69]} />
              </mesh>
              <mesh material={mo.noir} position={[0, -0.66, -0.05]}>
                <boxGeometry args={[0.06, 0.6, 0.06]} />
              </mesh>
              <mesh material={mo.noir} position={[0, -1.31, -0.05]}>
                <boxGeometry args={[0.7, 0.03, 0.5]} />
              </mesh>
            </group>
          </group>
          {/* le dirigeant écoute, assis, les mains sur les genoux */}
          <group position={[1.15, 0, 0.75]} rotation-y={-2.1}>
            <Personnage pose={POSES.ecoute} homme haut="#5b6b52" bas="#c9bfae" />
            <Modele nom="dining_chair_02" position={[0, 0, -0.08]} rotation-y={Math.PI} />
          </group>
        </>
      )}
      {id === 'mission' && (
        <>
          {/* atelier : mur de post-it (aujourd'hui, 3 mois, 12 mois) ; l'un colle une idée, une autre tient le bloc */}
          <mesh material={mo.postIt} position={[0, 1.4, -0.8]} castShadow>
            <boxGeometry args={[2.4, 1.3, 0.02]} />
          </mesh>
          <group position={[-0.2, 0, -0.47]} rotation-y={Math.PI}>
            <Personnage pose={POSES.colle} homme haut="#0f1b2d" bas="#5f6672" />
            <mesh material={mo.jaune} position={[0.17, 1.46, 0.32]}>
              <boxGeometry args={[0.076, 0.076, 0.004]} />
            </mesh>
          </group>
          <group position={[0.75, 0, -0.05]} rotation-y={-0.5}>
            <Personnage pose={POSES.bloc} haut={COBALT} bas="#2b2d33" />
            <mesh material={mo.jaune} position={[0.005, 1.06, 0.31]} rotation-x={-1.1}>
              <boxGeometry args={[0.076, 0.076, 0.02]} />
            </mesh>
          </group>
          <group position={[1.35, 0, 0.55]} rotation-y={-1.0}>
            <Personnage pose={POSES.gobelet} homme haut="#c9bfae" bas="#2a3445" />
            <mesh material={mo.gobelet} position={[0.01, 1.03, 0.26]}>
              <cylinderGeometry args={[0.035, 0.028, 0.1, 16]} />
            </mesh>
          </group>
        </>
      )}
      <pointLight position={[0, 2.3, 0.9]} color="#fff4e6" intensity={1.4} distance={4} decay={1.6} />
    </group>
  );
}

/* ---------- caméra ---------- */
export const ARRETS = POSTES.map((_, i) => [0.2 + i * 0.24, 0.2 + i * 0.24 + 0.14]);
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
  cible.set(cx, portrait ? 1.0 : 1.2, z);
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
/** Lumière d'une vraie pièce claire à grande fenêtre (HDRI Poly Haven), neutralisée. */
function Ambiance({ def }) {
  return <Environment files={`${BASE}scene/bureau-${def}.hdr`} environmentIntensity={0.65} />;
}

function Soleil({ taille }) {
  const [cible] = useState(() => new THREE.Object3D());
  return (
    <>
      <primitive object={cible} position={[0, 0, -6.5]} />
      <directionalLight
        position={[10, 7, -3]}
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
      <Bureaux def={def} />
      {POSTES.map((p) => (
        <Espace key={p.id} poste={p} />
      ))}
      <Ombres />
    </>
  );
}

export default function Bureau3D({ progres, leger, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  const complet = !petit && !leger;
  const def = complet ? 'hd' : 'sd';
  const foyer = useRef(new THREE.Vector3(-X_POSTE, 1.1, -2.8)).current;
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
        scene.background = new THREE.Color('#e9e6df');
      }}
      aria-hidden="true"
    >
      <Pilote />
      <hemisphereLight args={['#f4f6f8', '#b9a98f', 0.3]} />
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
