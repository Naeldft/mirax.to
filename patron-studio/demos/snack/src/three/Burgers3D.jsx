import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import BurgerPhoto from './burger/BurgerPhoto.jsx';
import Vapeur from './burger/Vapeur.jsx';
import { bornes } from './burger/bornes.js';

/* ------------------------------------------------------------------
   Les burgers en 3D, chacun sur sa planche, posés sur le comptoir de la cuisine (le dernier plan du film,
   flouté derrière, est une image : Hero.jsx). Toile transparente.
   - etat.current.v : position du carrousel (0 = 1er burger au centre ; -1 = la 1re planche attend à droite).
     Les planches glissent de droite à gauche.
   - etat.current.a[k] : assemblage du burger k (0 → 1, les couches tombent une à une).
   - etat.current.pivot : rotation du burger au centre, donnée par le doigt ou la souris (±20°, butée à 25°),
     avec élan au lâcher ; sinon un léger balancement.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const ESPACE = 0.62; // m entre deux planches
const PLANCHE = 0.62; // la planche Poly Haven (45 cm) ramenée à 28 cm
const HAUT_PLANCHE = 0.0413 * PLANCHE;

function Planche() {
  const { scene } = useGLTF(`${BASE}scene3d/planche.glb`);
  const s = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      if (o.isMesh) {
        o.material = o.material.clone();
        o.material.color.set('#7a5c46');
        o.material.envMapIntensity = 0;
      }
    });
    return c;
  }, [scene]);
  return <primitive object={s} scale={PLANCHE} />;
}

/** Ombre douce (dessinée une fois) : sous la planche, et sous le burger sur la planche. */
function useOmbre() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const d = g.createRadialGradient(64, 64, 4, 64, 64, 64);
    d.addColorStop(0, 'rgba(0,0,0,0.75)');
    d.addColorStop(0.55, 'rgba(0,0,0,0.35)');
    d.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = d;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
}

function Ombre({ tex, l, p, y, opacite = 1 }) {
  return (
    <mesh rotation-x={-Math.PI / 2} position-y={y} renderOrder={1}>
      <planeGeometry args={[l, p]} />
      <meshBasicMaterial map={tex} transparent opacity={opacite} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

const MAX = THREE.MathUtils.degToRad(20);
const BUTEE = THREE.MathUtils.degToRad(25);
/** Au-delà de ±20°, le pivot résiste (élastique) jusqu'à ±25°. */
const elastique = (x) => {
  const ax = Math.abs(x);
  if (ax <= MAX) return x;
  return Math.sign(x) * (MAX + (BUTEE - MAX) * (1 - Math.exp(-(ax - MAX) / (BUTEE - MAX))));
};

function Plateau({ ids, etat, def, leger }) {
  const ombre = useOmbre();
  const groupes = useRef([]);
  const burgers = useRef([]);
  const assemblages = useMemo(() => ids.map(() => ({ current: 0 })), [ids]);
  const rot = useRef({ ang: 0, vel: 0 });
  const { size } = useThree();
  const portrait = size.width / size.height < 1;
  useFrame(({ clock }, dt) => {
    const e = etat.current;
    const t = clock.elapsedTime;
    // pivot du burger au centre : doigt/souris, élan au lâcher, retour souple vers le balancement
    const r = rot.current;
    const d = Math.min(dt, 0.05);
    if (e.glisse) {
      const voulu = elastique(e.pivot);
      r.vel = (voulu - r.ang) / Math.max(d, 0.001);
      r.ang = voulu;
    } else {
      const repos = Math.sin(t * 0.45) * THREE.MathUtils.degToRad(9);
      r.vel += (repos - r.ang) * 10 * d; // ressort
      r.vel *= Math.exp(-3.2 * d); // amortissement (l'élan s'éteint)
      r.ang = THREE.MathUtils.clamp(r.ang + r.vel * d, -BUTEE, BUTEE);
      e.pivot = r.ang;
    }
    const centre = Math.round(e.v);
    ids.forEach((_, k) => {
      const g = groupes.current[k];
      if (!g) return;
      const x = (k - e.v) * ESPACE;
      g.position.x = x;
      g.visible = Math.abs(k - e.v) < 1.6;
      assemblages[k].current = e.a[k] ?? 0;
      const b = burgers.current[k];
      // le burger au centre suit le doigt ; les autres arrivent légèrement de biais
      if (b) b.rotation.y = k === centre ? r.ang : THREE.MathUtils.clamp((k - e.v) * -0.5, -0.5, 0.5);
    });
  });
  return (
    <group position={portrait ? [0, 0, 0] : [0.115, 0, 0]}>
      {ids.map((id, k) => (
        <group key={id} ref={(el) => (groupes.current[k] = el)}>
          <Ombre tex={ombre} l={0.4} p={0.26} y={0.0005} opacite={0.9} />
          <Planche />
          <group position-y={HAUT_PLANCHE}>
            <Ombre tex={ombre} l={0.15} p={0.12} y={0.0006} opacite={0.85} />
            <group ref={(el) => (burgers.current[k] = el)}>
              <BurgerPhoto id={id} bornes={bornes[id]} def={def} assemblage={assemblages[k]} />
            </group>
            {!leger && <VapeurCentre k={k} etat={etat} />}
          </group>
        </group>
      ))}
    </group>
  );
}

/** La vapeur ne monte que du burger au centre, une fois assemblé. */
function VapeurCentre({ k, etat }) {
  const g = useRef();
  useFrame(() => {
    const e = etat.current;
    if (g.current) g.current.visible = Math.abs(k - e.v) < 0.3 && (e.a[k] ?? 0) > 0.95;
  });
  return (
    <group ref={g} visible={false}>
      <Vapeur n={6} hauteur={0.06} />
    </group>
  );
}

/**
 * Cadrage. Ordinateur : le burger à droite du texte.
 * Téléphone : le burger et sa planche tiennent exactement dans l'espace libre entre l'en-tête et le bloc de texte
 * (quelle que soit la hauteur de l'écran), en reculant la caméra et en décalant l'image vers le haut.
 */
const HAUT_MOBILE = 66; // px : l'en-tête
const BAS_MOBILE = 372; // px : le bloc de texte, les boutons et la barre du bas
function Camera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const portrait = size.width / size.height < 1;
    camera.clearViewOffset();
    if (!portrait) {
      camera.fov = 26;
      camera.position.set(0, 0.13, 0.62);
      camera.lookAt(0, 0.06, 0);
      camera.updateProjectionMatrix();
      return;
    }
    camera.fov = 30;
    const libre = Math.max(160, size.height - HAUT_MOBILE - BAS_MOBILE);
    const vise = HAUT_MOBILE + libre / 2;
    // hauteur du monde visible : la scène (planche + burger, ~0,2 m de haut) occupe 90 % de l'espace libre,
    // et le burger (~0,13 m de large) tient dans la largeur de l'écran
    const hMonde = Math.max((0.2 * size.height) / (0.9 * libre), (0.145 / 0.9) * (size.height / size.width));
    const d = hMonde / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    const a = THREE.MathUtils.degToRad(14);
    camera.position.set(0, 0.085 + d * Math.sin(a), d * Math.cos(a));
    camera.lookAt(0, 0.085, 0);
    camera.setViewOffset(size.width, size.height, 0, size.height / 2 - vise, size.width, size.height);
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

export default function Burgers3D({ ids, etat, leger, actif, onPret }) {
  const def = leger || (typeof window !== 'undefined' && innerWidth < 768) ? 'sd' : 'hd';
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={leger ? 1 : [1, 2]}
      frameloop={actif ? 'always' : 'never'}
      camera={{ fov: 26, near: 0.01, far: 10, position: [0, 0.12, 0.5] }}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, powerPreference: 'high-performance' }}
      onCreated={() => onPret?.()}
      aria-hidden="true"
    >
      <Camera />
      <ambientLight intensity={0.5} color="#ffd9b0" />
      <spotLight position={[-0.4, 0.8, 0.5]} angle={0.5} penumbra={1} intensity={5} color="#ffcf98" />
      <pointLight position={[0.4, 0.25, -0.3]} intensity={1.2} color="#ff8a3a" />
      <Suspense fallback={null}>
        <Plateau ids={ids} etat={etat} def={def} leger={leger} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload?.(`${BASE}scene3d/planche.glb`);
