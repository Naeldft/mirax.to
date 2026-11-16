import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import Differe, { signalerScenePrete } from '@demos/shared/three/Differe.jsx';
import { disqueImage } from '../data/pizzas';

/* ------------------------------------------------------------------
   Intro 3D de Forno Vivo : une pizzeria construite en code.
   - Décor : sol en briques, murs enduits, poutres, four à bois voûté (briques réelles, braises, flammes,
     lumière qui vacille), comptoir en bois, ardoises, panier de citrons, caisse, suspensions.
     Textures, modèles et lumière d'ambiance : Poly Haven (CC0), voir IMAGES.md.
   - La caméra suit un trajet piloté par le défilement (progres 0 → 1) : elle entre, pivote à droite
     vers une ardoise, puis à gauche vers l'autre, puis descend sur la pizza posée sur la pelle.
   - La pizza est un objet 3D : la vraie photo dessus, une bordure en relief (texture de sa vraie croûte),
     la pâte dessous. Au changement, elle se redresse et roule vers la gauche comme une roue.
   Les mesures sont en mètres (échelle réelle).
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const R = 0.16; // rayon d'une pizza (32 cm)
const PELLE = [0, 0.962, -1.5]; // centre de la pelle sur le comptoir
const LOIN = 1.15; // distance de sortie de champ quand la pizza roule

/** Trajet de la caméra : [progression, position, point visé]. La caméra ralentit à chaque arrêt. */
const TRAJET = {
  paysage: [
    [0.0, [0, 1.45, 4.3], [0, 1.4, -4]],
    [0.3, [0.35, 1.45, 1.6], [1.75, 1.0, 0.45]], // pivote à droite : ardoise 1
    [0.58, [-0.25, 1.42, 0.35], [-1.75, 1.0, -0.65]], // pivote à gauche : ardoise 2
    [0.86, [-0.05, 1.42, -0.82], [-0.05, 0.94, -1.55]], // descend sur la pizza (à droite du texte)
    [1.0, [-0.05, 1.42, -0.82], [-0.05, 0.94, -1.55]],
  ],
  portrait: [
    [0.0, [0, 1.45, 5.6], [0, 1.4, -4]],
    [0.3, [0.2, 1.45, 2.2], [1.75, 1.0, 0.45]],
    [0.58, [-0.1, 1.42, 0.9], [-1.75, 1.0, -0.65]],
    [0.86, [0, 1.5, -0.8], [0, 0.66, -1.78]],
    [1.0, [0, 1.5, -0.8], [0, 0.66, -1.78]],
  ],
};
/** Horloge de la scène : temps réel, ou avancée image par image en mode test (?image-par-image). */
const IMAGE_PAR_IMAGE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('image-par-image');
const horloge = { t: 0, maintenant: () => (IMAGE_PAR_IMAGE ? horloge.t : performance.now() / 1000) };
const doux = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

function useMatiere(nom, { repeat = [1, 1], taille = 1024, couleur, rough = true } = {}) {
  const chemins = {
    map: `${BASE}scene/textures/${nom}-diffuse-${taille}.webp`,
    normalMap: `${BASE}scene/textures/${nom}-normal-${taille}.webp`,
    ...(rough ? { roughnessMap: `${BASE}scene/textures/${nom}-rough-${taille}.webp` } : {}),
  };
  const t = useTexture(chemins);
  return useMemo(() => {
    Object.entries(t).forEach(([k, tex]) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(...repeat);
      tex.anisotropy = 8;
      if (k === 'map') tex.colorSpace = THREE.SRGBColorSpace;
    });
    return new THREE.MeshStandardMaterial({ ...t, color: couleur ?? '#ffffff', roughness: 1, envMapIntensity: 0.5 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- une fois
  }, [t]);
}

/* ---------- la salle ---------- */
function Salle({ taille }) {
  const sol = useMatiere('brick_floor_02', { repeat: [5, 8], taille });
  const mur = useMatiere('clay_plaster', { repeat: [3, 1.5], taille, couleur: '#e8cfae' });
  const bois = useMatiere('wood_table_001', { repeat: [1, 4], taille, couleur: '#6b4a33' });
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} material={sol}>
        <planeGeometry args={[8, 14]} />
      </mesh>
      <mesh position={[0, 2, -5.4]} material={mur}>
        <planeGeometry args={[8, 4]} />
      </mesh>
      <mesh position={[-3.4, 2, 0]} rotation-y={Math.PI / 2} material={mur}>
        <planeGeometry args={[14, 4]} />
      </mesh>
      <mesh position={[3.4, 2, 0]} rotation-y={-Math.PI / 2} material={mur}>
        <planeGeometry args={[14, 4]} />
      </mesh>
      <mesh position={[0, 3.6, 0]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[8, 14]} />
        <meshStandardMaterial color="#1c120c" roughness={0.9} />
      </mesh>
      {/* poutres */}
      {[-4, -2, 0, 2, 4].map((z) => (
        <mesh key={z} position={[0, 3.45, z]} material={bois}>
          <boxGeometry args={[6.8, 0.22, 0.24]} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- le four à bois ---------- */
function textureBraises() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#1a0603';
  g.fillRect(0, 0, 256, 128);
  for (let i = 0; i < 260; i++) {
    const x = Math.random() * 256;
    const y = 50 + Math.random() * 78;
    const r = 2 + Math.random() * 9;
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    const chaud = Math.random();
    gr.addColorStop(0, chaud > 0.6 ? '#fff1b0' : '#ff9a2e');
    gr.addColorStop(0.5, chaud > 0.6 ? '#ff7a1a' : '#c2340c');
    gr.addColorStop(1, 'rgba(60,8,2,0)');
    g.fillStyle = gr;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Flammes : plans additifs animés par un bruit (shader léger). */
const flammeVert = /* glsl */ `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`;
const flammeFrag = /* glsl */ `
uniform float t; uniform float graine; varying vec2 vUv;
float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
void main(){
  vec2 uv=vUv; float y=uv.y;
  float b = n(vec2(uv.x*4.+graine, y*3.-t*2.2))*.6 + n(vec2(uv.x*9.-graine, y*6.-t*3.5))*.4;
  float forme = smoothstep(.5,.0,abs(uv.x-.5)*(1.2+y*1.6)) * smoothstep(1.,.15,y);
  float a = clamp(forme*(b*1.6-.35+ (1.-y)*.5),0.,1.);
  vec3 c = mix(vec3(1.,.28,.04), vec3(1.,.85,.45), clamp(a*1.4-.2,0.,1.));
  gl_FragColor = vec4(c*a*1.6, a);
}`;

function Flamme({ position, scale, graine }) {
  const mat = useRef();
  useFrame((_, dt) => {
    if (mat.current) mat.current.uniforms.t.value += dt;
  });
  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={flammeVert}
        fragmentShader={flammeFrag}
        uniforms={{ t: { value: graine * 10 }, graine: { value: graine } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Four({ taille, leger }) {
  const brique = useMatiere('castle_brick_02_red', { repeat: [3, 1.5], taille });
  const dome = useMatiere('castle_brick_02_red', { repeat: [4, 2], taille, couleur: '#b98f7c' });
  const refractaire = useMatiere('brown_brick_02', { repeat: [1.5, 1], taille });
  const braises = useMemo(() => textureBraises(), []);
  const feu = useRef();
  const lueur = useRef();
  // façade en arche, percée de la bouche du four
  const facade = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.72, 0);
    s.lineTo(0.72, 0);
    s.lineTo(0.72, 0.32);
    s.absarc(0, 0.32, 0.72, 0, Math.PI, false);
    s.lineTo(-0.72, 0);
    const trou = new THREE.Path();
    trou.moveTo(-0.32, 0.06);
    trou.lineTo(0.32, 0.06);
    trou.lineTo(0.32, 0.22);
    trou.absarc(0, 0.22, 0.32, 0, Math.PI, false);
    trou.lineTo(-0.32, 0.06);
    s.holes.push(trou);
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.24, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 });
    g.translate(0, 0, -0.24);
    return g;
  }, []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const v = 1 + Math.sin(t * 7.1) * 0.08 + Math.sin(t * 13.3) * 0.06 + Math.sin(t * 2.3) * 0.1;
    if (feu.current) feu.current.intensity = 5 * v;
    if (lueur.current) lueur.current.intensity = 2.4 * v;
  });
  return (
    <group position={[0, 0, -4.2]}>
      {/* socle */}
      <mesh position={[0, 0.5, 0]} material={brique}>
        <boxGeometry args={[2.8, 1, 2.6]} />
      </mesh>
      {/* voûte en briques */}
      <mesh position={[0, 1, -0.05]} scale={[1, 0.92, 1]} material={dome}>
        <sphereGeometry args={[1.25, 56, 28, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      {/* conduit de fumée */}
      <mesh position={[0, 2.55, 0.75]}>
        <cylinderGeometry args={[0.13, 0.15, 1.9, 24]} />
        <meshStandardMaterial color="#2a201b" metalness={0.6} roughness={0.45} />
      </mesh>
      {/* façade en arche (briques réfractaires) et bouche */}
      <mesh position={[0, 1, 1.32]} material={refractaire} geometry={facade} />
      {/* cavité : braises au fond, intérieur sombre */}
      <mesh position={[0, 1.24, 0.72]}>
        <planeGeometry args={[0.9, 0.5]} />
        <meshBasicMaterial map={braises} toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.065, 0.95]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.64, 0.5]} />
        <meshBasicMaterial map={braises} toneMapped={false} />
      </mesh>
      <Flamme position={[-0.1, 1.27, 0.8]} scale={[0.34, 0.36, 1]} graine={1.3} />
      <Flamme position={[0.1, 1.25, 0.82]} scale={[0.28, 0.32, 1]} graine={4.7} />
      {!leger && <Flamme position={[0.0, 1.22, 0.78]} scale={[0.46, 0.28, 1]} graine={8.1} />}
      {/* lumière du feu */}
      <pointLight ref={feu} position={[0, 1.25, 1.55]} color="#ff8a3a" intensity={9} distance={7} decay={1.6} />
      <pointLight ref={lueur} position={[0, 1.2, 0.95]} color="#ff6a1a" intensity={2.4} distance={2.2} decay={1.5} />
    </group>
  );
}

/* ---------- comptoir, pelle, décor ---------- */
function Comptoir({ taille }) {
  const bois = useMatiere('wood_table_001', { repeat: [3, 1], taille, couleur: '#c79a6e' });
  const brique = useMatiere('castle_brick_02_red', { repeat: [2, 0.8], taille });
  const pelle = useMatiere('wood_table_001', { repeat: [0.6, 0.6], taille, couleur: '#d7ad7c' });
  return (
    <group>
      <mesh position={[0, 0.45, -1.55]} material={brique}>
        <boxGeometry args={[2.6, 0.9, 0.7]} />
      </mesh>
      <mesh position={[0, 0.93, -1.55]} material={bois}>
        <boxGeometry args={[2.75, 0.06, 0.82]} />
      </mesh>
      {/* pelle à pizza ronde, manche vers le four */}
      <group position={[PELLE[0], 0.96, PELLE[2]]}>
        <mesh material={pelle} position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.012, 64]} />
        </mesh>
        <mesh material={pelle} position={[0, 0.0, -0.36]}>
          <boxGeometry args={[0.045, 0.014, 0.36]} />
        </mesh>
      </group>
    </group>
  );
}

function Modele({ url, ...props }) {
  const { scene } = useGLTF(url);
  const copie = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={copie} {...props} />;
}

/** Texte à la craie sur une ardoise (canvas → texture). */
function texteCraie(lignes) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 640;
  const g = c.getContext('2d');
  g.textAlign = 'center';
  g.fillStyle = 'rgba(245,240,230,0.94)';
  g.shadowColor = 'rgba(255,255,255,0.25)';
  g.shadowBlur = 6;
  let y = 70;
  lignes.forEach(([txt, px, style], i) => {
    y += px * 1.05; // ligne de base : sous la ligne précédente, selon la taille de la ligne
    g.font = `${style || '600'} ${px}px "Playfair Display", Georgia, serif`;
    g.fillText(txt, 256, y);
    if (i < lignes.length - 1) y += px * 0.22;
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function Ardoise({ position, rotation, lignes }) {
  const tex = useMemo(() => texteCraie(lignes), [lignes]);
  return (
    <group position={position} rotation={rotation}>
      <Modele url={`${BASE}scene/modeles/standing_chalkboard_01.glb`} />
      {/* le texte suit l'inclinaison du panneau de l'ardoise */}
      <mesh position={[0.012, 0.98, 0.205]} rotation={[-0.255, 0, 0]}>
        <planeGeometry args={[0.66, 0.82]} />
        <meshStandardMaterial map={tex} transparent roughness={1} envMapIntensity={0} />
      </mesh>
    </group>
  );
}

function Suspension({ position }) {
  return (
    <group position={position}>
      <Modele url={`${BASE}scene/modeles/hanging_industrial_lamp.glb`} />
      <pointLight position={[0, -1.25, 0]} color="#ffc98a" intensity={3.2} distance={5} decay={1.6} />
    </group>
  );
}

/* ---------- la pizza 3D ---------- */
function Pizza({ pose, pizzas, vitrine, cle, geste, petit }) {
  const pos = useRef();
  const roulis = useRef();
  const incl = useRef();
  const tour = useRef();
  const dessus = useRef();
  const bord = useRef();
  const textures = useTexture(
    pizzas.flatMap((p) => [disqueImage(p.disque, petit ? 512 : 1024), `${BASE}images/disques/${p.disque}-bord.webp`]),
  );
  useMemo(() => {
    textures.forEach((t, i) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      if (i % 2 === 1) t.wrapS = THREE.RepeatWrapping;
    });
  }, [textures]);
  useFrame(() => {
    const p = pose.current;
    const k = vitrine.current[cle];
    if (dessus.current && dessus.current.map !== textures[k * 2]) {
      dessus.current.map = textures[k * 2];
      dessus.current.emissiveMap = textures[k * 2];
      dessus.current.needsUpdate = true;
      bord.current.map = textures[k * 2 + 1];
      bord.current.needsUpdate = true;
    }
    pos.current.position.set(PELLE[0] + p.x, PELLE[1] + 0.022 + p.y, PELLE[2]);
    roulis.current.rotation.z = p.roulis;
    incl.current.rotation.x = p.incl + (p.actif ? geste.current.tilt : 0);
    tour.current.rotation.y = p.spin + (p.actif ? geste.current.spin : 0);
    pos.current.visible = p.visible;
  });
  return (
    <group ref={pos}>
      <group ref={roulis}>
        <group ref={incl}>
          <group ref={tour}>
            {/* la vraie photo, vue de dessus */}
            <mesh rotation-x={-Math.PI / 2} position={[0, 0.006, 0]}>
              <circleGeometry args={[R, 96]} />
              <meshStandardMaterial
                ref={dessus}
                map={textures[0]}
                emissiveMap={textures[0]}
                emissive="#ffffff"
                emissiveIntensity={0.35}
                roughness={0.62}
                envMapIntensity={0.35}
                transparent
                alphaTest={0.05}
              />
            </mesh>
            {/* la croûte en relief, texturée avec la vraie croûte de la photo */}
            <mesh rotation-x={Math.PI / 2} position={[0, 0.004, 0]}>
              <torusGeometry args={[R * 0.972, 0.009, 12, 128]} />
              <meshStandardMaterial ref={bord} map={textures[1]} roughness={0.8} envMapIntensity={0.25} />
            </mesh>
            {/* la pâte dessous */}
            <mesh position={[0, -0.004, 0]}>
              <cylinderGeometry args={[R * 0.965, R * 0.95, 0.012, 96]} />
              <meshStandardMaterial color="#d8b07a" roughness={0.85} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

/** Deux pizzas qui se relaient : la sortante roule vers la gauche, l'entrante arrive en roulant. */
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const power2InOut = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const power2In = (x) => x * x;
const power3Out = (x) => 1 - Math.pow(1 - x, 3);
const backOut = (x, c = 1.5) => 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
const DUREE_ROULE = 1.6;

function Carrousel({ pizzas, index, direction, geste, reduit, petit }) {
  const poseA = useRef({ x: 0, y: 0, roulis: 0, incl: 0, spin: 0, visible: true, actif: true });
  const poseB = useRef({ x: LOIN, y: 0, roulis: 0, incl: 0, spin: 0, visible: false, actif: false });
  const vitrine = useRef({ a: index, b: index });
  const devant = useRef('a');
  const premier = useRef(true);
  const roule = useRef(null); // { debut, d, s, e } pendant un changement de pizza

  useFrame((_, dt) => {
    // rotation lente sur elle-même quand elle est posée
    if (!reduit) for (const p of [poseA.current, poseB.current]) if (p.actif && p.incl < 0.01) p.spin += Math.min(dt, 0.1) * 0.22;
    const r = roule.current;
    if (!r) return;
    const t = horloge.maintenant() - r.debut;
    const { s, e, d } = r;
    const debout = Math.PI / 2;
    // 1. la pizza sortante se redresse comme une roue (son centre monte à la hauteur du rayon)
    const k1 = power2InOut(clamp01(t / 0.32));
    s.incl = debout * k1;
    s.y = R * k1;
    // 2. elle roule hors du comptoir : rotation = distance / rayon (elle roule sans glisser)
    s.x = -d * LOIN * power2In(clamp01((t - 0.28) / 0.6));
    s.roulis = -s.x / R + r.roulis0;
    // 3. la suivante arrive en roulant…
    e.x = d * LOIN * (1 - power3Out(clamp01((t - 0.5) / 0.7)));
    e.roulis = -e.x / R;
    // 4. … puis se couche sur la pelle, avec un petit rebond
    const k4 = clamp01((t - 1.1) / 0.5);
    e.incl = debout * (1 - backOut(k4));
    e.y = R * (1 - backOut(k4));
    if (t >= DUREE_ROULE) {
      Object.assign(e, { x: 0, y: 0, roulis: 0, incl: 0 });
      s.visible = false;
      roule.current = null;
    }
  });

  useEffect(() => {
    if (premier.current) {
      premier.current = false;
      return;
    }
    // un changement en cours se termine aussitôt
    if (roule.current) {
      Object.assign(roule.current.e, { x: 0, y: 0, roulis: 0, incl: 0 });
      roule.current.s.visible = false;
      roule.current = null;
    }
    const sortant = devant.current === 'a' ? poseA : poseB;
    const entrant = devant.current === 'a' ? poseB : poseA;
    vitrine.current[devant.current === 'a' ? 'b' : 'a'] = index;
    devant.current = devant.current === 'a' ? 'b' : 'a';
    const s = sortant.current;
    const e = entrant.current;
    s.spin += geste.current.spin;
    geste.current.spin = 0;
    geste.current.tilt = 0;
    s.actif = false;
    e.actif = true;
    if (reduit) {
      s.visible = false;
      Object.assign(e, { visible: true, x: 0, y: 0, roulis: 0, incl: 0, spin: 0 });
      return;
    }
    const d = direction >= 0 ? 1 : -1; // 1 : la pizza part vers la gauche
    Object.assign(e, { visible: true, x: d * LOIN, y: R, roulis: (d * LOIN) / R, incl: Math.PI / 2, spin: 0 });
    roule.current = { debut: horloge.maintenant(), d, s, e, roulis0: s.roulis };
  }, [index, direction, reduit, geste]);

  return (
    <>
      <Pizza pose={poseA} pizzas={pizzas} vitrine={vitrine} cle="a" geste={geste} petit={petit} />
      <Pizza pose={poseB} pizzas={pizzas} vitrine={vitrine} cle="b" geste={geste} petit={petit} />
    </>
  );
}

/* ---------- caméra pilotée par le défilement ---------- */
function Camera({ progres, reduit }) {
  const { camera, size } = useThree();
  const lisse = useRef(reduit ? 1 : 0);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const cible = useMemo(() => new THREE.Vector3(), []);
  const a = useMemo(() => new THREE.Vector3(), []);
  const b = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const portrait = size.width / size.height < 1;
    const trajet = portrait ? TRAJET.portrait : TRAJET.paysage;
    camera.fov = portrait ? 52 : 40;
    camera.updateProjectionMatrix();
    const p = reduit ? 1 : progres.current;
    lisse.current += (p - lisse.current) * (reduit ? 1 : 0.08);
    const t = lisse.current;
    let i = 1;
    while (i < trajet.length - 1 && t > trajet[i][0]) i++;
    const [t0, p0, c0] = trajet[i - 1];
    const [t1, p1, c1] = trajet[i];
    const k = doux((t - t0) / (t1 - t0));
    pos.copy(a.set(...p0)).lerp(b.set(...p1), k);
    cible.copy(a.set(...c0)).lerp(b.set(...c1), k);
    camera.position.copy(pos);
    camera.lookAt(cible);
  });
  return null;
}

/** Poussière de farine dans la lumière. */
function Farine({ n }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) p.set([(Math.random() - 0.5) * 5, Math.random() * 3, -4 + Math.random() * 8], i * 3);
    g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    return g;
  }, [n]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.01;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#ffe7c2" size={0.012} transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

function Ambiance({ taille }) {
  const env = useTexture(`${BASE}scene/ambiance-${taille}.jpg`);
  const { scene } = useThree();
  useEffect(() => {
    env.mapping = THREE.EquirectangularReflectionMapping;
    env.colorSpace = THREE.SRGBColorSpace;
    scene.environment = env;
    scene.environmentIntensity = 0.8;
    return () => {
      scene.environment = null;
    };
  }, [env, scene]);
  return null;
}

/** Mode test (adresse avec ?image-par-image) : le script de vidéo avance la scène exactement
 *  d'une image à la fois (window.psAvancer). Sans ce paramètre, rien ne change. */
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

const ARDOISE_1 = [
  ['Notre pâte', 46, 'italic 500'],
  ['maturée', 64],
  ['48 heures', 64],
  ['', 30],
  ['Farine italienne', 34, 'italic 400'],
  ['Tomates San Marzano', 34, 'italic 400'],
];
const ARDOISE_2 = [
  ['Au feu de bois', 46, 'italic 500'],
  ['450 °C', 84],
  ['90 secondes', 56],
  ['', 30],
  ['Cuite comme', 34, 'italic 400'],
  ['à Naples', 34, 'italic 400'],
];

export default function Pizzeria({ progres, pizzas, index, direction, geste, reduit, leger, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  const taille = petit || leger ? 512 : 1024;
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={leger ? [1, 1.25] : petit ? [1, 1.6] : [1, 1.75]}
      frameloop={IMAGE_PAR_IMAGE || !actif ? 'never' : 'always'}
      camera={{ fov: 40, near: 0.05, far: 40, position: [0, 1.6, 5.2] }}
      gl={{ antialias: !leger, powerPreference: 'high-performance' }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
        scene.background = new THREE.Color('#120a06');
        scene.fog = new THREE.FogExp2('#120a06', 0.06);
      }}
      aria-hidden="true"
    >
      <Camera progres={progres} reduit={reduit} />
      <Pilote />
      <ambientLight intensity={0.28} color="#ffd9b0" />
      {/* appliques murales chaudes */}
      {[
        [-3.25, 2.4, 1.2],
        [3.25, 2.4, 1.2],
        [-3.25, 2.4, -2.6],
        [3.25, 2.4, -2.6],
      ].map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <sphereGeometry args={[0.07, 16, 12]} />
            <meshBasicMaterial color="#ffd7a0" toneMapped={false} />
          </mesh>
          <pointLight color="#ffc27a" intensity={2.2} distance={4.5} decay={1.6} />
        </group>
      ))}
      <Suspense fallback={null}>
        <Ambiance taille={taille === 1024 ? 1024 : 512} />
        <Salle taille={taille} />
        <Four taille={taille} leger={leger} />
        <Comptoir taille={taille} />
        {/* décor : chargé après le premier affichage de la scène (détail) */}
        <Differe>
          <Ardoise position={[1.75, 0, 0.45]} rotation={[0, -0.75, 0]} lignes={ARDOISE_1} />
          <Ardoise position={[-1.75, 0, -0.65]} rotation={[0, 0.75, 0]} lignes={ARDOISE_2} />
          <Modele url={`${BASE}scene/modeles/wicker_basket_01.glb`} position={[-0.85, 0.96, -1.62]} rotation-y={0.4} />
          {[
            [-0.9, 1.0, -1.6],
            [-0.82, 1.0, -1.66],
            [-0.86, 1.03, -1.58],
          ].map((p, i) => (
            <Modele key={i} url={`${BASE}scene/modeles/lemon.glb`} position={p} rotation={[i, i * 2, 0]} />
          ))}
          <Modele url={`${BASE}scene/modeles/wooden_cutting_board.glb`} position={[0.82, 0.96, -1.6]} rotation-y={-0.3} />
          <Modele url={`${BASE}scene/modeles/wooden_crate_01.glb`} position={[-2.7, 0, -3.2]} rotation-y={0.6} />
          <Suspension position={[-0.65, 3.6, -1.55]} />
          <Suspension position={[0.65, 3.6, -1.55]} />
        </Differe>
        <Carrousel pizzas={pizzas} index={index} direction={direction} geste={geste} reduit={reduit} petit={petit} />
        {!leger && <Farine n={petit ? 160 : 380} />}
        <Pret onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
