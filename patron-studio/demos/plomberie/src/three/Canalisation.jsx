import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { signalerScenePrete } from '@demos/shared/three/Differe.jsx';
import { etapesHero } from '../data/site';

/* ------------------------------------------------------------------
   Intro 3D d'Ondine Plomberie (tout est construit en code).
   1. Une salle de bain : carrelage blanc, plan en pierre, vasque en céramique, robinet chromé
      (bec courbe, mousseur, une goutte qui tombe). La caméra s'approche et remonte DANS le bec.
   2. Une canalisation en cuivre : la caméra voyage à l'intérieur (bagues en laiton, raccords, eau qui
      coule au fond avec des reflets, gouttes qui tombent). Elle pivote à droite (1 Diagnostic), à gauche
      (2 Préparation), à droite (3 Intervention) vers des plaques gravées sur les parois.
   3. Au bout, une ouverture lumineuse : on arrive sur le site.
   Le défilement pilote tout (progres 0 → 1). Textures et photos 360° : Poly Haven (CC0), voir IMAGES.md.
   Les mesures sont en mètres.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const IMAGE_PAR_IMAGE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('image-par-image');
const horloge = { t: 0, maintenant: () => (IMAGE_PAR_IMAGE ? horloge.t : performance.now() / 1000) };

/** Découpage du défilement. */
export const PHASES = { plongee: 0.2, noir: [0.18, 0.25], sortie: 0.93 };
const BAS = -50; // la canalisation est construite plus bas, hors de vue de la salle de bain
const RAYON = 0.62;
/** Étapes sur les parois : position le long du tuyau (0 → 1) et côté (1 droite, -1 gauche). */
const ETAPES = etapesHero.map((e, i) => ({ ...e, u: [0.24, 0.52, 0.8][i], cote: i === 1 ? -1 : 1 }));

const doux = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const V = (x, y, z) => new THREE.Vector3(x, y, z);

/** Le tracé de la canalisation : lignes droites et coudes. */
function traceTuyau() {
  const p = [
    [0, 0],
    [0, -7],
    [0.4, -11],
    [2.6, -14.5],
    [6, -16.5],
    [10, -17.2],
    [13.5, -19],
    [15.2, -22.5],
    [15.4, -27],
    [14.2, -31],
    [11.2, -33.6],
    [7.5, -35],
    [5.4, -38.4],
    [5.2, -45],
  ];
  return new THREE.CatmullRomCurve3(
    p.map(([x, z]) => V(x, BAS, z)),
    false,
    'centripetal',
  );
}

/** Repère local en un point du tuyau : tangente, côté droit, haut. */
function repere(courbe, u) {
  const t = courbe.getTangentAt(Math.min(0.9999, Math.max(0, u))).normalize();
  const cote = new THREE.Vector3().crossVectors(t, V(0, 1, 0)).normalize();
  const haut = new THREE.Vector3().crossVectors(cote, t).normalize();
  return { p: courbe.getPointAt(Math.min(1, Math.max(0, u))), t, cote, haut };
}

/* ---------- textures générées ---------- */
function textureBrossee() {
  // métal brossé : fines stries le long du tuyau (carte de relief)
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = 'rgb(128,128,255)';
  g.fillRect(0, 0, 64, 512);
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * 64;
    g.fillStyle = `rgba(${110 + Math.random() * 40},128,255,0.5)`;
    g.fillRect(x, Math.random() * 512, 1, 20 + Math.random() * 120);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}
function textureVaguelettes() {
  // relief de l'eau : petites vagues (carte de relief qui défile)
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = 'rgb(128,128,255)';
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 220; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const r = 6 + Math.random() * 26;
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    const a = Math.random() * 0.35;
    gr.addColorStop(0, `rgba(${128 + 60 * Math.random()},${128 + 60 * Math.random()},255,${a})`);
    gr.addColorStop(1, 'rgba(128,128,255,0)');
    g.fillStyle = gr;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}
function texturePlaque({ numero, titre, texte }) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 640;
  const g = c.getContext('2d');
  // plaque en laiton sombre, bord biseauté
  const fond = g.createLinearGradient(0, 0, 1024, 640);
  fond.addColorStop(0, '#2b1d12');
  fond.addColorStop(1, '#120c08');
  g.fillStyle = fond;
  g.beginPath();
  g.roundRect(8, 8, 1008, 624, 40);
  g.fill();
  g.lineWidth = 10;
  g.strokeStyle = '#c99a5b';
  g.stroke();
  g.fillStyle = '#5fd4e8';
  g.font = '700 190px "Space Grotesk", system-ui, sans-serif';
  g.fillText(numero, 70, 230);
  g.fillStyle = '#f3e6d6';
  g.font = '700 112px "Space Grotesk", system-ui, sans-serif';
  g.fillText(titre, 200, 210);
  g.fillStyle = '#d9c7b2';
  g.font = '500 54px "Space Grotesk", system-ui, sans-serif';
  texte.forEach((l, i) => g.fillText(l, 76, 380 + i * 76));
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/* ---------- 1. la salle de bain ---------- */
const BEC = V(0, 1.142, 0.035); // sortie du bec (ouverture vers le bas)

function SalleDeBain({ taille }) {
  const carrelage = useTexture({
    map: `${BASE}scene/textures/long_white_tiles-diffuse-${taille}.webp`,
    normalMap: `${BASE}scene/textures/long_white_tiles-normal-${taille}.webp`,
    roughnessMap: `${BASE}scene/textures/long_white_tiles-rough-${taille}.webp`,
  });
  useMemo(() => {
    Object.entries(carrelage).forEach(([k, t]) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(2.4, 1.8);
      if (k === 'map') t.colorSpace = THREE.SRGBColorSpace;
    });
  }, [carrelage]);
  const chrome = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f2f4f6', metalness: 1, roughness: 0.07 }), []);
  const ceramique = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({ color: '#f7f7f5', roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.06, side: THREE.DoubleSide }),
    [],
  );
  // le corps du robinet : un tube qui monte puis se courbe vers la vasque
  const corps = useMemo(() => {
    const c = new THREE.CatmullRomCurve3([
      V(0, 0.88, -0.2),
      V(0, 1.12, -0.2),
      V(0, 1.215, -0.165),
      V(0, 1.245, -0.09),
      V(0, 1.215, -0.005),
      BEC.clone().add(V(0, 0.012, 0)),
    ]);
    return new THREE.TubeGeometry(c, 96, 0.017, 32, false);
  }, []);
  const goutte = useRef();
  useFrame(() => {
    // une goutte se forme au bec, grossit, tombe dans la vasque (boucle de 2,4 s)
    const t = (horloge.maintenant() % 2.4) / 2.4;
    const g = goutte.current;
    if (!g) return;
    if (t < 0.7) {
      const k = t / 0.7;
      g.position.set(BEC.x, BEC.y - 0.006 - k * 0.006, BEC.z);
      g.scale.set(0.6 + k * 0.4, 0.6 + k * 0.7, 0.6 + k * 0.4);
    } else {
      const k = (t - 0.7) / 0.3;
      g.position.set(BEC.x, BEC.y - 0.012 - k * k * 0.18, BEC.z);
      g.scale.set(1, 1.5, 1);
    }
  });
  return (
    <group>
      {/* mur carrelé */}
      <mesh position={[0, 1.2, -0.32]}>
        <planeGeometry args={[3.2, 2.4]} />
        <meshStandardMaterial {...carrelage} envMapIntensity={0.8} />
      </mesh>
      {/* plan en pierre sombre */}
      <mesh position={[0, 0.855, 0]}>
        <boxGeometry args={[1.6, 0.05, 0.64]} />
        <meshStandardMaterial color="#34363a" roughness={0.32} metalness={0.05} />
      </mesh>
      {/* vasque à poser */}
      <mesh position={[0, 0.985, 0.06]} scale={[1, 0.55, 1]} material={ceramique}>
        <sphereGeometry args={[0.2, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
      </mesh>
      <mesh position={[0, 0.985, 0.06]} rotation-x={Math.PI / 2} material={ceramique}>
        <torusGeometry args={[0.2, 0.008, 16, 96]} />
      </mesh>
      <mesh position={[0, 0.875, 0.06]}>
        <cylinderGeometry args={[0.022, 0.022, 0.004, 32]} />
        <meshStandardMaterial color="#c9ccd0" metalness={1} roughness={0.15} />
      </mesh>
      {/* robinet chromé */}
      <mesh position={[0, 0.893, -0.2]} material={chrome}>
        <cylinderGeometry args={[0.03, 0.034, 0.03, 48]} />
      </mesh>
      <mesh geometry={corps} material={chrome} />
      {/* mousseur au bout du bec (ouvert vers le bas : on va plonger dedans) */}
      <mesh position={[BEC.x, BEC.y + 0.006, BEC.z]} material={chrome}>
        <cylinderGeometry args={[0.019, 0.019, 0.016, 40, 1, true]} />
      </mesh>
      <mesh position={[BEC.x, BEC.y + 0.012, BEC.z]} rotation-x={Math.PI / 2}>
        <circleGeometry args={[0.0185, 40]} />
        <meshStandardMaterial color="#0b0f12" roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* manette */}
      <mesh position={[0.045, 1.05, -0.2]} rotation-z={-0.35} material={chrome}>
        <cylinderGeometry args={[0.009, 0.012, 0.09, 24]} />
      </mesh>
      {/* la goutte */}
      <mesh ref={goutte} position={[BEC.x, BEC.y - 0.006, BEC.z]}>
        <sphereGeometry args={[0.006, 24, 16]} />
        <meshPhysicalMaterial color="#e8f6fa" roughness={0.02} metalness={0} transmission={0.85} thickness={0.01} ior={1.33} />
      </mesh>
      {/* lumière douce de salle de bain */}
      <directionalLight position={[1.2, 2.6, 1.6]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-0.6, 1.6, 0.8]} intensity={1.2} distance={4} color="#dff4ff" />
    </group>
  );
}

/* ---------- 2. la canalisation ---------- */
function Tuyau({ courbe, leger }) {
  const brosse = useMemo(() => textureBrossee(), []);
  const vagues = useMemo(() => textureVaguelettes(), []);
  const plaques = useMemo(() => ETAPES.map((e) => texturePlaque(e)), []);
  const long = courbe.getLength();
  const geoTube = useMemo(() => new THREE.TubeGeometry(courbe, leger ? 420 : 760, RAYON, leger ? 28 : 44, false), [courbe, leger]);
  useMemo(() => brosse.repeat.set(6, long / 2), [brosse, long]);
  const cuivre = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c98656',
        metalness: 1,
        roughness: 0.3,
        normalMap: brosse,
        normalScale: new THREE.Vector2(0.35, 0.35),
        side: THREE.BackSide,
      }),
    [brosse],
  );
  const laiton = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c9a24f', metalness: 1, roughness: 0.25 }), []);
  // bagues tous les 2,4 m, raccords plus épais dans les coudes
  const bagues = useMemo(() => {
    const l = [];
    const n = Math.floor(long / 2.4);
    for (let i = 1; i < n; i++) {
      const u = i / n;
      const { p, t } = repere(courbe, u);
      const q = new THREE.Quaternion().setFromUnitVectors(V(0, 0, 1), t);
      const courbure = courbe.getTangentAt(Math.max(0, u - 0.01)).angleTo(courbe.getTangentAt(Math.min(1, u + 0.01)));
      l.push({ p, q, epais: courbure > 0.02 });
    }
    return l;
  }, [courbe, long]);
  // l'eau : un ruban au fond du tuyau
  const geoEau = useMemo(() => {
    const n = leger ? 300 : 600;
    const pos = [];
    const uv = [];
    const idx = [];
    const niveau = 0.43;
    const demi = Math.sqrt(RAYON * RAYON - niveau * niveau) * 0.98;
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      const { p, cote, haut } = repere(courbe, u);
      const c = p.clone().addScaledVector(haut, -niveau);
      const a = c.clone().addScaledVector(cote, -demi);
      const b = c.clone().addScaledVector(cote, demi);
      pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
      uv.push(0, u * long, 1, u * long);
      if (i < n) idx.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }, [courbe, long, leger]);
  const eau = useRef();
  useMemo(() => vagues.repeat.set(1.5, 0.5), [vagues]);
  // plaques des étapes, contre la paroi
  const panneaux = useMemo(
    () =>
      ETAPES.map((e) => {
        const { p, cote, haut } = repere(courbe, e.u);
        const pos = p
          .clone()
          .addScaledVector(cote, e.cote * (RAYON - 0.07))
          .addScaledVector(haut, 0.06);
        // la face avant de la plaque regarde l'intérieur du tuyau
        const m = new THREE.Matrix4().lookAt(p.clone().addScaledVector(haut, 0.06), pos, haut);
        return { pos, q: new THREE.Quaternion().setFromRotationMatrix(m) };
      }),
    [courbe],
  );
  // gouttes qui tombent du haut du tuyau
  const gouttes = useMemo(
    () => [0.08, 0.17, 0.33, 0.45, 0.6, 0.7, 0.88].map((u, i) => ({ ...repere(courbe, u), decal: i * 0.37 })),
    [courbe],
  );
  const refsGouttes = useRef([]);
  const refsRonds = useRef([]);
  useFrame((_, dt) => {
    const d = Math.min(dt, 0.1);
    vagues.offset.y -= d * 0.45;
    const t = horloge.maintenant();
    gouttes.forEach((g, i) => {
      const k = (((t * 0.55 + g.decal) % 1) + 1) % 1;
      const goutte = refsGouttes.current[i];
      const rond = refsRonds.current[i];
      if (!goutte || !rond) return;
      const chute = Math.min(1, k / 0.55);
      goutte.position.copy(g.p).addScaledVector(g.haut, RAYON * 0.92 - chute * chute * (RAYON * 0.92 + 0.43));
      goutte.visible = k < 0.55;
      const r = k < 0.55 ? 0 : (k - 0.55) / 0.45;
      rond.scale.setScalar(0.02 + r * 0.25);
      rond.material.opacity = k < 0.55 ? 0 : 0.6 * (1 - r);
    });
  });
  return (
    <group>
      <mesh geometry={geoTube} material={cuivre} />
      {bagues.map((b, i) => (
        <mesh key={i} position={b.p} quaternion={b.q} material={laiton}>
          <torusGeometry args={[RAYON - 0.01, b.epais ? 0.05 : 0.025, 12, 64]} />
        </mesh>
      ))}
      <mesh ref={eau} geometry={geoEau}>
        <meshPhysicalMaterial
          color="#1f8fa8"
          roughness={0.06}
          metalness={0.1}
          normalMap={vagues}
          normalScale={new THREE.Vector2(0.9, 0.9)}
          transparent
          opacity={0.88}
          emissive="#0d4f5f"
          emissiveIntensity={0.6}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
      {panneaux.map((pn, i) => (
        <mesh key={i} position={pn.pos} quaternion={pn.q}>
          <planeGeometry args={[0.62, 0.39]} />
          <meshStandardMaterial
            map={plaques[i]}
            metalness={0.5}
            roughness={0.35}
            emissiveMap={plaques[i]}
            emissive="#ffffff"
            emissiveIntensity={0.55}
          />
        </mesh>
      ))}
      {gouttes.map((g, i) => (
        <group key={i}>
          <mesh ref={(el) => (refsGouttes.current[i] = el)} scale={[1, 1.5, 1]}>
            <sphereGeometry args={[0.018, 16, 12]} />
            <meshPhysicalMaterial
              color="#cdeff6"
              roughness={0.05}
              transmission={leger ? 0 : 0.8}
              transparent
              opacity={leger ? 0.75 : 1}
              thickness={0.02}
            />
          </mesh>
          <mesh
            ref={(el) => (refsRonds.current[i] = el)}
            position={g.p.clone().addScaledVector(g.haut, -0.425)}
            quaternion={new THREE.Quaternion().setFromUnitVectors(V(0, 0, 1), g.haut)}
          >
            <ringGeometry args={[0.8, 1, 48]} />
            <meshBasicMaterial color="#bfefff" transparent opacity={0} depthWrite={false} />
          </mesh>
        </group>
      ))}
      {/* la sortie lumineuse au bout */}
      <SortieLumineuse courbe={courbe} />
    </group>
  );
}

function SortieLumineuse({ courbe }) {
  const { p, t } = repere(courbe, 0.999);
  const q = new THREE.Quaternion().setFromUnitVectors(V(0, 0, 1), t.clone().negate());
  return (
    <group>
      <mesh position={p} quaternion={q}>
        <circleGeometry args={[RAYON, 48]} />
        <meshBasicMaterial color="#e9fbff" toneMapped={false} />
      </mesh>
      <pointLight position={p.clone().addScaledVector(t, -1)} color="#bff3ff" intensity={30} distance={12} decay={1.6} />
    </group>
  );
}

/* ---------- caméra et lumières qui la suivent ---------- */
const CAM_SALLE = [
  [0.0, [0.42, 1.32, 1.25], [0, 1.08, -0.12]],
  [0.09, [0.2, 1.2, 0.55], [0, 1.13, -0.02]],
  [0.15, [0.04, 1.04, 0.09], [BEC.x, BEC.y, BEC.z]],
  [0.2, [BEC.x, BEC.y - 0.01, BEC.z + 0.0005], [BEC.x, BEC.y + 1, BEC.z]],
];
/** Dans le tuyau : [progression, position le long du tuyau, regard (-1 gauche, 0 devant, 1 droite)]. */
const CAM_TUYAU = [
  [0.22, 0.0, 0],
  [0.3, ETAPES[0].u - 0.03, 0.0],
  [0.36, ETAPES[0].u - 0.014, 1],
  [0.43, ETAPES[0].u - 0.011, 1],
  [0.5, ETAPES[1].u - 0.03, 0],
  [0.56, ETAPES[1].u - 0.014, -1],
  [0.63, ETAPES[1].u - 0.011, -1],
  [0.7, ETAPES[2].u - 0.03, 0],
  [0.76, ETAPES[2].u - 0.014, 1],
  [0.83, ETAPES[2].u - 0.011, 1],
  [0.96, 0.975, 0],
  [1.0, 0.99, 0],
];

function Camera({ progres, reduit, courbe, envSalle, envTuyau }) {
  const { camera, scene, size } = useThree();
  const lisse = useRef(0);
  const torche = useRef();
  const a = useMemo(() => new THREE.Vector3(), []);
  const b = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const portrait = size.width / size.height < 1;
    camera.fov = portrait ? 62 : 50;
    camera.updateProjectionMatrix();
    const cible = reduit ? 0 : progres.current;
    lisse.current += (cible - lisse.current) * (reduit ? 1 : 0.09);
    const t = lisse.current;
    const dansTuyau = t >= PHASES.noir[0] + (PHASES.noir[1] - PHASES.noir[0]) / 2;
    // la lumière d'ambiance change avec le lieu (reflets de la salle de bain ou de la chaufferie)
    const env = dansTuyau ? envTuyau : envSalle;
    if (scene.environment !== env) scene.environment = env;
    scene.fog.density = dansTuyau ? 0.085 : 0.02;
    if (!dansTuyau) {
      let i = 1;
      while (i < CAM_SALLE.length - 1 && t > CAM_SALLE[i][0]) i++;
      const [t0, p0, c0] = CAM_SALLE[i - 1];
      const [t1, p1, c1] = CAM_SALLE[i];
      const k = doux((Math.min(t, t1) - t0) / (t1 - t0));
      camera.position.copy(a.set(...p0)).lerp(b.set(...p1), k);
      camera.lookAt(a.set(...c0).lerp(b.set(...c1), k));
      if (torche.current) torche.current.intensity = 0;
      return;
    }
    let i = 1;
    while (i < CAM_TUYAU.length - 1 && t > CAM_TUYAU[i][0]) i++;
    const [t0, u0, r0] = CAM_TUYAU[i - 1];
    const [t1, u1, r1] = CAM_TUYAU[i];
    const k = doux((Math.min(t, t1) - t0) / (t1 - t0));
    const u = u0 + (u1 - u0) * k;
    const regard = r0 + (r1 - r0) * k;
    const { p, t: tg, haut } = repere(courbe, u);
    camera.position.copy(p).addScaledVector(haut, -0.05);
    // regard : vers l'avant, ou pivoté droit sur la plaque la plus proche (droite ou gauche)
    const devant = a.copy(camera.position).add(tg).addScaledVector(haut, -0.04);
    const etape = ETAPES.reduce((m, e) => (Math.abs(e.u - u) < Math.abs(m.u - u) ? e : m));
    const plaque = repere(courbe, etape.u);
    b.copy(plaque.p)
      .addScaledVector(plaque.cote, etape.cote * (RAYON - 0.07))
      .addScaledVector(plaque.haut, 0.06);
    camera.up.copy(haut);
    camera.lookAt(devant.lerp(b, Math.abs(regard)));
    if (torche.current) {
      torche.current.position.copy(camera.position).addScaledVector(tg, 0.4);
      torche.current.intensity = 6;
    }
  });
  return <pointLight ref={torche} color="#fff1df" intensity={0} distance={7} decay={1.5} />;
}

function Ambiances({ taille, progres, reduit, courbe }) {
  const [salle, tuyau] = useTexture([`${BASE}scene/salle-de-bain-${taille}.jpg`, `${BASE}scene/chaufferie-${taille}.jpg`]);
  useMemo(() => {
    for (const e of [salle, tuyau]) {
      e.mapping = THREE.EquirectangularReflectionMapping;
      e.colorSpace = THREE.SRGBColorSpace;
    }
  }, [salle, tuyau]);
  const { scene } = useThree();
  useEffect(() => {
    scene.environmentIntensity = 1;
    return () => {
      scene.environment = null;
    };
  }, [scene]);
  return <Camera progres={progres} reduit={reduit} courbe={courbe} envSalle={salle} envTuyau={tuyau} />;
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
    // l'essentiel est prêt : les détails peuvent maintenant se charger (et repère de mesure)
    signalerScenePrete();
    onReady?.();
  }, [onReady]);
  return null;
}

export default function Canalisation({ progres, reduit, leger, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  const taille = petit || leger ? 512 : 1024;
  const courbe = useMemo(() => traceTuyau(), []);
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={leger ? [1, 1.25] : petit ? [1, 1.6] : [1, 1.75]}
      frameloop={IMAGE_PAR_IMAGE || !actif ? 'never' : 'always'}
      camera={{ fov: 50, near: 0.003, far: 60, position: [0.42, 1.32, 1.25] }}
      gl={{ antialias: !leger, powerPreference: 'high-performance' }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        scene.background = new THREE.Color('#06121a');
        scene.fog = new THREE.FogExp2('#06121a', 0.02);
      }}
      aria-hidden="true"
    >
      <Pilote />
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Ambiances taille={taille} progres={progres} reduit={reduit} courbe={courbe} />
        <SalleDeBain taille={taille} />
        <Tuyau courbe={courbe} leger={leger || petit} />
        <Pret onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
