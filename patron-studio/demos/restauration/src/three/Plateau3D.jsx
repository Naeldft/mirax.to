import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from '@demos/shared/lib/gsap.js';
import { disqueImage } from '../data/pizzas';

/* ------------------------------------------------------------------
   Plateau tournant de l'accueil Forno Vivo.
   Une vraie photo de pizza vue de dessus (détourée en disque) est posée sur un
   plateau en ardoise qui tourne lentement sur lui-même.
   Changement de pizza : le plateau se redresse et roule vers la gauche comme
   une roue ; le suivant arrive en roulant depuis la droite, puis se couche.
   Le doigt ou la souris le font pivoter (geste.spin, geste.tilt).

   Hiérarchie de chaque plateau :
     position (x) → roulis (z, la roue) → inclinaison (x) → rotation propre (y) → ardoise + pizza
------------------------------------------------------------------- */

const R_PIZZA = 1.5;
const R_PLATEAU = 1.64;
const REPOS = 0.62; // inclinaison au repos (on voit le dessus de la pizza)
const DEBOUT = Math.PI / 2; // face à nous, comme une roue
const LOIN = 6.2; // distance de sortie de l'écran

function textureOmbre() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(64, 64, 4, 64, 64, 64);
  r.addColorStop(0, 'rgba(0,0,0,0.55)');
  r.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/** Un plateau (ardoise + pizza). Ses réglages vivent dans pose (modifiés par l'animation). */
function Plateau({ pose, textures, vitrine, cle, geste, auto }) {
  const pos = useRef();
  const roulis = useRef();
  const incl = useRef();
  const tour = useRef();
  const ombre = useRef();
  const matPizza = useRef();
  useFrame((_, dt) => {
    const p = pose.current;
    if (!pos.current) return;
    p.spin += (auto.current ? 0.16 : 0) * dt;
    pos.current.position.x = p.x;
    pos.current.position.y = p.y;
    roulis.current.rotation.z = p.roulis;
    incl.current.rotation.x = p.incl + (p.actif ? geste.current.tilt : 0);
    tour.current.rotation.y = p.spin + (p.actif ? geste.current.spin : 0);
    pos.current.visible = p.visible;
    // ombre au sol : plus petite et plus légère quand le plateau est debout
    const debout = (p.incl - REPOS) / (DEBOUT - REPOS);
    ombre.current.position.x = p.x;
    ombre.current.scale.set(4.4 - debout * 2.2, 1.6 - debout * 0.9, 1);
    ombre.current.material.opacity = p.visible ? 0.9 - debout * 0.45 : 0;
    const texture = textures[vitrine.current[cle]];
    if (matPizza.current && matPizza.current.map !== texture) {
      matPizza.current.map = texture;
      matPizza.current.emissiveMap = texture;
      matPizza.current.needsUpdate = true;
    }
  });
  const ombreTex = useMemo(() => textureOmbre(), []);
  return (
    <>
      <mesh ref={ombre} rotation-x={-Math.PI / 2} position={[0, -1.72, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={ombreTex} transparent depthWrite={false} />
      </mesh>
      <group ref={pos}>
        <group ref={roulis}>
          <group ref={incl}>
            <group ref={tour}>
              {/* ardoise de service */}
              <mesh position={[0, -0.05, 0]}>
                <cylinderGeometry args={[R_PLATEAU, R_PLATEAU, 0.09, 96]} />
                <meshStandardMaterial color="#1c1917" roughness={0.55} metalness={0.15} />
              </mesh>
              {/* liseré lumineux du bord (reflet) */}
              <mesh position={[0, -0.003, 0]} rotation-x={-Math.PI / 2}>
                <ringGeometry args={[R_PLATEAU - 0.025, R_PLATEAU, 96]} />
                <meshBasicMaterial color="#e2c27a" transparent opacity={0.35} />
              </mesh>
              {/* la vraie photo de pizza, vue de dessus */}
              <mesh position={[0, 0.002, 0]} rotation-x={-Math.PI / 2}>
                <circleGeometry args={[R_PIZZA, 96]} />
                <meshStandardMaterial
                  ref={matPizza}
                  map={textures[vitrine.current[cle]]}
                  emissiveMap={textures[vitrine.current[cle]]}
                  emissive="#ffffff"
                  emissiveIntensity={0.55}
                  roughness={0.85}
                  transparent
                  alphaTest={0.02}
                />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

/** Caméra un peu plus loin sur écran vertical (le plateau tient dans la largeur). */
function Cadrage() {
  const { camera, size } = useThree();
  useEffect(() => {
    const portrait = size.width / size.height < 1;
    camera.position.set(0, 0.55, portrait ? 8.2 : 6.3);
    camera.lookAt(0, -0.15, 0);
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

/**
 * Scène : deux plateaux qui se relaient.
 *  pizzas  : liste [{ id, disque }]
 *  index   : pizza affichée ; direction : +1 (suivante, roule vers la gauche) ou -1
 *  geste   : ref { spin, tilt } réglée par le doigt ou la souris
 */
function Scene({ pizzas, index, direction, geste, reduit, petit, onReady }) {
  const pret = useRef(onReady);
  pret.current = onReady;
  const textures = useMemo(() => {
    const l = new THREE.TextureLoader();
    return pizzas.map((p, i) => {
      // la page est « prête » dès que la pizza affichée est chargée
      const t = l.load(disqueImage(p.disque, petit ? 512 : 1024), i === index ? () => pret.current?.() : undefined);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      return t;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- chargées une seule fois
  }, [pizzas, petit]);
  const poseA = useRef({ x: 0, y: 0, roulis: 0, incl: REPOS, spin: 0, visible: true, actif: true });
  const poseB = useRef({ x: LOIN, y: 0, roulis: 0, incl: DEBOUT, spin: 0, visible: false, actif: false });
  const auto = useRef(!reduit);
  const vitrine = useRef({ a: index, b: index }); // pizza montrée par chaque plateau
  const premier = useRef(true);
  const anim = useRef(null);
  const devant = useRef('a'); // plateau actuellement à l'écran

  useEffect(() => {
    if (premier.current) {
      premier.current = false;
      return;
    }
    const sortant = devant.current === 'a' ? poseA : poseB;
    const entrant = devant.current === 'a' ? poseB : poseA;
    vitrine.current[devant.current === 'a' ? 'b' : 'a'] = index;
    devant.current = devant.current === 'a' ? 'b' : 'a';
    anim.current?.progress(1).kill();
    const s = sortant.current;
    const e = entrant.current;
    // le geste du doigt est « rangé » dans la rotation du plateau qui sort
    s.spin += geste.current.spin;
    geste.current.spin = 0;
    geste.current.tilt = 0;
    s.actif = false;
    e.actif = true;
    if (reduit) {
      Object.assign(s, { visible: false, x: 0, roulis: 0, incl: REPOS });
      Object.assign(e, { visible: true, x: 0, roulis: 0, incl: REPOS, spin: 0 });
      return;
    }
    const d = direction >= 0 ? 1 : -1; // 1 : roule vers la gauche
    Object.assign(e, { visible: true, x: d * LOIN, roulis: (d * LOIN) / R_PLATEAU, incl: DEBOUT, spin: 0 });
    const tl = gsap.timeline();
    // 1. le plateau se redresse comme une roue
    tl.to(s, { incl: DEBOUT, y: 0.05, duration: 0.32, ease: 'power2.inOut' }, 0);
    // 2. il roule hors de l'écran (rotation = distance / rayon : il roule sans glisser)
    tl.to(
      s,
      {
        x: -d * LOIN,
        duration: 0.62,
        ease: 'power2.in',
        onUpdate: () => (s.roulis = -s.x / R_PLATEAU),
      },
      0.26,
    );
    // 3. la suivante arrive en roulant…
    tl.to(
      e,
      {
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        onUpdate: () => (e.roulis = -e.x / R_PLATEAU),
      },
      0.5,
    );
    // 4. … puis se couche, avec un petit rebond
    tl.to(e, { incl: REPOS, y: 0, duration: 0.55, ease: 'back.out(1.6)' }, 1.08);
    tl.add(() => (s.visible = false));
    anim.current = tl;
    return () => tl.progress(1).kill();
  }, [index, direction, reduit, geste]);

  return (
    <>
      <Cadrage />
      <ambientLight intensity={0.55} />
      <directionalLight position={[2.5, 5, 4]} intensity={1.6} color="#fff4e2" />
      <pointLight position={[-4, 1.5, 3]} intensity={18} distance={14} color="#ff8a4a" />
      <Plateau pose={poseA} textures={textures} vitrine={vitrine} cle="a" geste={geste} auto={auto} />
      <Plateau pose={poseB} textures={textures} vitrine={vitrine} cle="b" geste={geste} auto={auto} />
    </>
  );
}

export default function Plateau3D({ actif = true, ...props }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={petit ? [1, 1.6] : [1, 2]}
      frameloop={actif ? 'always' : 'never'}
      camera={{ fov: 34, near: 0.1, far: 40, position: [0, 0.55, 7.2] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <Scene petit={petit} {...props} />
    </Canvas>
  );
}
