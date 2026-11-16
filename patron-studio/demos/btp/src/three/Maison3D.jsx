import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, useGLTF, useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import Differe, { signalerScenePrete } from '@demos/shared/three/Differe.jsx';

/* ------------------------------------------------------------------
   Intro 3D de Bâti Nord (pilotée par le défilement, progres 0 → 1).
   Une maison claire construite en code : on pousse la porte d'entrée, la caméra descend aux fondations
   (béton armé, ferraillage), remonte au rez-de-chaussée (séjour, cuisine), prend l'escalier jusqu'à l'étage
   (chambre sous la charpente, puits de lumière). Les phrases du site sont peintes sur les murs au fil du parcours.
   Matières, meubles et lumière : Poly Haven (CC0). Photos encadrées : vraies réalisations. Voir IMAGES.md.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const IMAGE_PAR_IMAGE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('image-par-image');
const horloge = { t: 0, maintenant: () => (IMAGE_PAR_IMAGE ? horloge.t : performance.now() / 1000) };
const doux = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const JAUNE = '#f2b705';
const ANTHRACITE = '#1d1d1b';

/* ---------- dimensions de la maison (mètres) ---------- */
const X = 5; // demi-largeur (x de -5 à 5)
const Z = -8; // fond de la maison (façade à z = 0)
const E = 0.25; // épaisseur des murs
const H1 = 2.7; // plafond du rez-de-chaussée
const F2 = 2.95; // sol de l'étage
const GENOU = 4.3; // haut des murs de côté de l'étage
const FAITAGE = 6.6; // haut du toit (au centre)
const PENTE = (FAITAGE - GENOU) / X;
const FOND_FOUILLE = -1.8;
const plafondEtage = (x) => GENOU + (X - Math.abs(x)) * PENTE;

/* ---------- matières ---------- */
function useMatiere(nom, { taille, couleur, rough = true, env = 0.6, uni = false, relief = 1, repeat } = {}) {
  // uni : couleur unie (sans la photo de la matière), seul le relief est gardé, pour des murs blancs nets
  // chargement en deux temps : 256 px pour le premier affichage, puis la définition visée (512 ou 1 024 px)
  const chemins = (def) => ({
    ...(uni ? {} : { map: `${BASE}scene/textures/${nom}-diffuse-${def}.webp` }),
    normalMap: `${BASE}scene/textures/${nom}-normal-${def}.webp`,
    ...(rough ? { roughnessMap: `${BASE}scene/textures/${nom}-rough-${def}.webp` } : {}),
  });
  const regler = (tex, k) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 8;
    if (repeat) tex.repeat.set(repeat, repeat);
    if (k === 'map') tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  };
  const t = useTexture(chemins(256));
  const mat = useMemo(() => {
    const cartes = {};
    Object.entries(t).forEach(([k, tex]) => (cartes[k] = regler(tex.clone(), k)));
    return new THREE.MeshStandardMaterial({
      ...cartes,
      color: couleur ?? '#ffffff',
      roughness: 1,
      envMapIntensity: env,
      normalScale: new THREE.Vector2(relief, relief),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- une fois
  }, [t]);
  useEffect(() => {
    let fini = false;
    const loader = new THREE.TextureLoader();
    Promise.all(Object.entries(chemins(taille)).map(([k, u]) => loader.loadAsync(u).then((tex) => [k, tex])))
      .then((liste) => {
        if (fini) return;
        liste.forEach(([k, tex]) => {
          mat[k]?.dispose();
          mat[k] = regler(tex, k);
        });
        mat.needsUpdate = true;
      })
      .catch(() => {});
    return () => {
      fini = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- une fois par matière
  }, [mat, taille]);
  return mat;
}

/** Boîte dont les coordonnées de texture suivent les mètres réels (une texture = `tuile` mètres). */
function boite(l, h, p, tuile = 1.5) {
  const g = new THREE.BoxGeometry(l, h, p);
  const uv = g.attributes.uv;
  // ordre des faces : +x, -x, +y, -y, +z, -z (4 sommets chacune)
  const tailles = [
    [p, h],
    [p, h],
    [l, p],
    [l, p],
    [l, h],
    [l, h],
  ];
  for (let f = 0; f < 6; f++)
    for (let k = 0; k < 4; k++) {
      const i = f * 4 + k;
      uv.setXY(i, (uv.getX(i) * tailles[f][0]) / tuile, (uv.getY(i) * tailles[f][1]) / tuile);
    }
  return g;
}

/** Un pavé posé entre deux coins (x0, y0, z0) → (x1, y1, z1). */
function Bloc({ de, a, mat, tuile, ...props }) {
  const [x0, y0, z0] = de;
  const [x1, y1, z1] = a;
  const geo = useMemo(() => boite(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0), tuile), [x0, y0, z0, x1, y1, z1, tuile]);
  return <mesh geometry={geo} material={mat} position={[(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2]} {...props} />;
}

/**
 * Un mur percé d'ouvertures : découpé en bandes verticales, sans les trous.
 * axe 'x' : le mur court le long de x (épaisseur en z, de z0 à z1) ; axe 'z' : le long de z (épaisseur en x).
 */
function Mur({ axe, de, a, bas, haut, ep: [e0, e1], trous = [], mat }) {
  const morceaux = useMemo(() => {
    const coupes = [...new Set([de, a, ...trous.flatMap((t) => [t[0], t[1]])])].filter((c) => c >= de && c <= a).sort((m, n) => m - n);
    const res = [];
    for (let i = 0; i < coupes.length - 1; i++) {
      const [u0, u1] = [coupes[i], coupes[i + 1]];
      const milieu = (u0 + u1) / 2;
      const ici = trous.filter((t) => milieu > t[0] && milieu < t[1]).sort((m, n) => m[2] - n[2]);
      let v = bas;
      for (const t of ici) {
        if (t[2] > v) res.push([u0, u1, v, t[2]]);
        v = Math.max(v, t[3]);
      }
      if (haut > v) res.push([u0, u1, v, haut]);
    }
    return res;
  }, [de, a, bas, haut, trous]);
  return morceaux.map(([u0, u1, v0, v1], i) =>
    axe === 'x' ? (
      <Bloc key={i} de={[u0, v0, e0]} a={[u1, v1, e1]} mat={mat} />
    ) : (
      <Bloc key={i} de={[e0, v0, u0]} a={[e1, v1, u1]} mat={mat} />
    ),
  );
}

/** Pignon (triangle au-dessus des murs de côté), à la profondeur z0 → z1. */
function Pignon({ z0, z1, mat }) {
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-X, GENOU);
    s.lineTo(X, GENOU);
    s.lineTo(0, FAITAGE);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: Math.abs(z1 - z0), bevelEnabled: false });
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / 1.5, uv.getY(i) / 1.5);
    return g;
  }, [z0, z1]);
  return <mesh geometry={geo} material={mat} position={[0, 0, Math.min(z0, z1)]} />;
}

/** Fenêtre : cadre aluminium anthracite et vitre légère. axe 'x' (dans un mur de façade) ou 'z' (mur de côté). */
function Fenetre({ axe = 'x', u0, u1, v0, v1, plan, meneau = true }) {
  const cadre = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2a2b2d', roughness: 0.45, metalness: 0.6 }), []);
  const verre = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#cfe0ee', transparent: true, opacity: 0.14, roughness: 0.05, metalness: 0.2, depthWrite: false }),
    [],
  );
  const l = u1 - u0;
  const h = v1 - v0;
  const c = 0.06;
  const pieces = [
    [u0 + l / 2, v0 + c / 2, l, c],
    [u0 + l / 2, v1 - c / 2, l, c],
    [u0 + c / 2, v0 + h / 2, c, h],
    [u1 - c / 2, v0 + h / 2, c, h],
    ...(meneau && l > 1.4 ? [[u0 + l / 2, v0 + h / 2, c * 0.8, h]] : []),
  ];
  const rot = axe === 'x' ? [0, 0, 0] : [0, Math.PI / 2, 0];
  const pos = (u, v) => (axe === 'x' ? [u, v, plan] : [plan, v, u]);
  return (
    <group>
      {pieces.map(([u, v, w, hh], i) => (
        <mesh key={i} position={pos(u, v)} rotation={rot} material={cadre}>
          <boxGeometry args={[w, hh, 0.09]} />
        </mesh>
      ))}
      <mesh position={pos(u0 + l / 2, v0 + h / 2)} rotation={rot} material={verre} renderOrder={4}>
        <planeGeometry args={[l, h]} />
      </mesh>
    </group>
  );
}

/* ---------- les phrases peintes sur les murs ---------- */
function texteMural(lignes, { hauteur = 400, couleur = ANTHRACITE, accent = JAUNE, bande = true } = {}) {
  const c = document.createElement('canvas');
  const police = (px, p) => (p ? p.replace(/\d+px/, `${px}px`) : `${px}px "Archivo Black", "Arial Black", sans-serif`);
  // largeur du canevas : celle de la plus longue ligne (aucun texte coupé)
  const mesure = c.getContext('2d');
  const largeur = Math.ceil(
    Math.max(...lignes.map(([txt, px, , p]) => ((mesure.font = police(px, p)), mesure.measureText(txt).width))) + 24,
  );
  c.width = largeur;
  c.height = hauteur;
  const g = c.getContext('2d');
  let y = 16;
  if (bande) {
    g.fillStyle = accent;
    g.fillRect(0, 10, 120, 16);
    y = 40;
  }
  for (const [txt, px, col, p] of lignes) {
    y += px * 0.95;
    g.font = police(px, p);
    g.fillStyle = col || couleur;
    g.fillText(txt, 0, y);
    y += px * 0.28;
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function Inscription({ lignes, largeur, position, rotation, options }) {
  const tex = useMemo(() => texteMural(lignes, options), [lignes, options]);
  // largeur : taille (en mètres) de 1 024 pixels de texte, pour que tous les textes aient la même échelle
  const l = (largeur * tex.image.width) / 1024;
  const h = (largeur * tex.image.height) / 1024;
  return (
    <mesh position={position} rotation={rotation} renderOrder={3}>
      <planeGeometry args={[l, h]} />
      <meshStandardMaterial map={tex} transparent roughness={0.9} polygonOffset polygonOffsetFactor={-2} depthWrite={false} />
    </mesh>
  );
}

/* ---------- meubles Poly Haven ---------- */
function ModeleCharge({ nom, ...props }) {
  const { scene } = useGLTF(`${BASE}scene/modeles/${nom}.glb`);
  const copie = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={copie} {...props} />;
}
/** Les meubles arrivent après la maison (détail) : ils ne retardent pas le premier affichage. */
function Modele(props) {
  return (
    <Differe>
      <ModeleCharge {...props} />
    </Differe>
  );
}

/** Vraie photo de réalisation dans un cadre noir, accrochée au mur. */
function Cadre({ photo, position, rotation, largeur = 0.95 }) {
  const tex = useTexture(`${BASE}images/${photo}-800.webp`);
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);
  const h = (largeur * tex.image.height) / tex.image.width;
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.012]}>
        <boxGeometry args={[largeur + 0.12, h + 0.12, 0.03]} />
        <meshStandardMaterial color="#141414" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[largeur + 0.07, h + 0.07]} />
        <meshStandardMaterial color="#f4f2ec" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.007]}>
        <planeGeometry args={[largeur, h]} />
        <meshStandardMaterial map={tex} roughness={0.6} />
      </mesh>
    </group>
  );
}

/* ---------- la maison ---------- */
function Maison({ taille, petit, refPorte }) {
  const platre = useMatiere('white_plaster_02', { taille, couleur: '#f3f1ec', env: 0.55, uni: true, relief: 0.35 });
  const facade = useMatiere('white_rough_plaster', { taille, couleur: '#f1efe9', env: 0.45, uni: true, relief: 0.6 });
  const parquet = useMatiere('wood_floor', { taille, couleur: '#e8d2b6', env: 0.7 });
  const beton = useMatiere('concrete_floor_02', { taille, env: 0.3 });
  const herbe = useMatiere('leafy_grass', { taille, env: 0.3, couleur: '#c9d6a6', repeat: 48 });
  const terre = useMatiere('excavated_soil_wall', { taille, env: 0.2 });
  const blocs = useMatiere('concrete_block_wall', { taille, env: 0.5, couleur: '#ffffff' });
  const lin = useMatiere('rough_linen', { taille, couleur: '#e7e1d6', env: 0.3 });
  const marbre = useMatiere('marble_01', { taille, env: 1 });
  const bois = useMatiere('wood_floor', { taille, couleur: '#b98d5f', env: 0.5 });

  const m = useMemo(() => {
    const ardoise = new THREE.MeshStandardMaterial({ color: '#33363b', roughness: 0.7 });
    const laque = new THREE.MeshStandardMaterial({ color: '#efede8', roughness: 0.35 });
    const acier = new THREE.MeshStandardMaterial({ color: '#7a4b31', roughness: 0.55, metalness: 0.65 });
    const chrome = new THREE.MeshStandardMaterial({ color: '#d8d8d8', roughness: 0.15, metalness: 1 });
    return {
      ardoise,
      laque,
      acier,
      chrome,
      // dalles : dessus en parquet, dessous en plâtre (plafond) ou en béton (vu des fondations)
      dalleRdc: [beton, beton, parquet, beton, beton, beton],
      dalleEtage: [platre, platre, parquet, platre, platre, platre],
      toit: [platre, platre, ardoise, platre, platre, platre],
    };
  }, [beton, parquet, platre]);

  // façade : porte, 2 fenêtres en bas, 1 à l'étage
  const trousFacade = useMemo(
    () => [
      [-0.55, 0.55, 0, 2.2],
      [-4, -1.6, 0.5, 2.3],
      [1.6, 4, 0.5, 2.3],
      [-1.2, 1.2, 3.3, 4.2],
    ],
    [],
  );
  const trousFond = useMemo(
    () => [
      [-4.2, -0.6, 0, 2.4],
      [0.9, 2.5, 1.15, 2.25],
      [-1.2, 1.2, 3.3, 4.2],
    ],
    [],
  );
  const trou = useMemo(() => [], []);

  // ferraillage : une longrine en attente (4 filants + cadres) et des aciers en attente
  const fers = useMemo(() => {
    const l = [];
    for (const [y, z] of [
      [-1.62, -5.42],
      [-1.62, -5.78],
      [-1.28, -5.42],
      [-1.28, -5.78],
    ])
      l.push({ p: [-1.2, y, z], r: [0, 0, Math.PI / 2], h: 5.6 });
    for (let x = -3.9; x <= 1.5; x += 0.25) {
      l.push({ p: [x, -1.45, -5.42], r: [0, 0, 0], h: 0.36 });
      l.push({ p: [x, -1.45, -5.78], r: [0, 0, 0], h: 0.36 });
      l.push({ p: [x, -1.62, -5.6], r: [Math.PI / 2, 0, 0], h: 0.38 });
      l.push({ p: [x, -1.28, -5.6], r: [Math.PI / 2, 0, 0], h: 0.38 });
    }
    return l;
  }, []);
  const refFers = useRef();
  useEffect(() => {
    const o = new THREE.Object3D();
    fers.forEach((f, i) => {
      o.position.set(...f.p);
      o.rotation.set(...f.r);
      o.scale.set(1, f.h, 1);
      o.updateMatrix();
      refFers.current.setMatrixAt(i, o.matrix);
    });
    refFers.current.instanceMatrix.needsUpdate = true;
  }, [fers]);

  // chevrons de la charpente
  const chevrons = useMemo(() => {
    const l = [];
    const ang = Math.atan(PENTE);
    const long = Math.hypot(X, FAITAGE - GENOU);
    for (let z = -0.6; z > Z + 0.3; z -= 0.6)
      for (const s of [-1, 1]) l.push({ p: [(s * X) / 2, (GENOU + FAITAGE) / 2 - 0.12, z], r: [0, 0, s * -ang], long });
    return l;
  }, []);

  const ang = Math.atan(PENTE);
  const geoDalle = useMemo(() => boite(2 * X, 0.25, -Z, 1.6), []);
  const geoVersant = useMemo(() => boite(Math.hypot(X + 0.35, (X + 0.35) * PENTE), 0.12, -Z + 0.7, 1.6), []);

  return (
    <group>
      {/* ---- dehors : pelouse, allée ---- */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} material={herbe}>
        <circleGeometry args={[70, 48]} />
      </mesh>
      <Bloc de={[-0.9, -0.02, 0]} a={[0.9, 0.0, 12]} mat={beton} />

      {/* ---- fouille et fondations ---- */}
      <Bloc de={[-X - 0.6, FOND_FOUILLE - 0.1, Z - 0.6]} a={[X + 0.6, FOND_FOUILLE, 0.6]} mat={terre} tuile={2.5} />
      {/* murs de soubassement en béton armé, posés sur les semelles */}
      <Bloc de={[-X, -1.4, Z]} a={[X, -0.25, Z + E]} mat={beton} tuile={2} />
      <Bloc de={[-X, -1.4, -E]} a={[X, -0.25, 0]} mat={beton} tuile={2} />
      <Bloc de={[-X, -1.4, Z]} a={[-X + E, -0.25, 0]} mat={beton} tuile={2} />
      <Bloc de={[X - E, -1.4, Z]} a={[X, -0.25, 0]} mat={beton} tuile={2} />
      {/* semelles filantes */}
      <Bloc de={[-X - 0.2, FOND_FOUILLE, Z - 0.2]} a={[X + 0.2, -1.4, Z + 0.5]} mat={beton} />
      <Bloc de={[-X - 0.2, FOND_FOUILLE, -0.5]} a={[X + 0.2, -1.4, 0.2]} mat={beton} />
      <Bloc de={[-X - 0.2, FOND_FOUILLE, Z]} a={[-X + 0.5, -1.4, 0]} mat={beton} />
      <Bloc de={[X - 0.5, FOND_FOUILLE, Z]} a={[X + 0.2, -1.4, 0]} mat={beton} />
      {/* plots qui portent la dalle */}
      {[
        [-2.6, -2.6],
        [2.6, -5.6],
        [2.6, -1.8],
      ].map(([x, z]) => (
        <Bloc key={`${x}${z}`} de={[x - 0.15, FOND_FOUILLE, z - 0.15]} a={[x + 0.15, -0.25, z + 0.15]} mat={beton} />
      ))}
      {/* longrine en cours : coffrage ouvert, ferraillage apparent */}
      <Bloc de={[-4.0, FOND_FOUILLE, -5.95]} a={[1.6, -1.72, -5.25]} mat={beton} />
      <instancedMesh ref={refFers} args={[null, null, fers.length]} material={m.acier}>
        <cylinderGeometry args={[0.008, 0.008, 1, 6]} />
      </instancedMesh>

      {/* ---- dalle du rez-de-chaussée ---- */}
      <mesh geometry={geoDalle} material={m.dalleRdc} position={[0, -0.125, Z / 2]} />

      {/* ---- murs du rez-de-chaussée et de l'étage ---- */}
      <Mur axe="x" de={-X} a={X} bas={0} haut={GENOU} ep={[-E, 0]} trous={trousFacade} mat={facade} />
      <Mur axe="x" de={-X} a={X} bas={0} haut={GENOU} ep={[Z, Z + E]} trous={trousFond} mat={platre} />
      <Mur axe="z" de={Z} a={0} bas={0} haut={GENOU} ep={[-X, -X + E]} trous={trou} mat={platre} />
      <Mur axe="z" de={Z} a={0} bas={0} haut={GENOU} ep={[X - E, X]} trous={trou} mat={platre} />
      <Pignon z0={-E} z1={0} mat={facade} />
      <Pignon z0={Z} z1={Z + E} mat={platre} />
      {trousFacade.slice(1).map(([u0, u1, v0, v1]) => (
        <Fenetre key={`f${u0}${v0}`} u0={u0} u1={u1} v0={v0} v1={v1} plan={-E / 2} />
      ))}
      {trousFond.map(([u0, u1, v0, v1]) => (
        <Fenetre key={`b${u0}${v0}`} u0={u0} u1={u1} v0={v0} v1={v1} plan={Z + E / 2} />
      ))}
      {/* le mur en blocs béton laissé apparent dans le séjour */}
      <Bloc de={[-X + E, 0, -7.6]} a={[-X + E + 0.02, H1, -4.9]} mat={blocs} tuile={1.6} />

      {/* ---- porte d'entrée (pivote sur ses gonds) ---- */}
      <group ref={refPorte} position={[-0.53, 0, -0.12]}>
        <Bloc de={[0, 0, -0.03]} a={[1.06, 2.18, 0.03]} mat={bois} tuile={1.2} />
        <mesh position={[0.92, 1.05, 0.07]} material={m.chrome}>
          <boxGeometry args={[0.04, 0.42, 0.04]} />
        </mesh>
        <mesh position={[0.92, 1.05, -0.07]} material={m.chrome}>
          <boxGeometry args={[0.04, 0.42, 0.04]} />
        </mesh>
      </group>

      {/* ---- dalle de l'étage, avec la trémie de l'escalier ---- */}
      <Bloc de={[-X, H1, Z]} a={[2.1, F2, 0]} mat={m.dalleEtage} tuile={1.6} />
      <Bloc de={[3.4, H1, Z]} a={[X, F2, 0]} mat={m.dalleEtage} tuile={1.6} />
      <Bloc de={[2.1, H1, Z]} a={[3.4, F2, -6.3]} mat={m.dalleEtage} tuile={1.6} />
      <Bloc de={[2.1, H1, -1.8]} a={[3.4, F2, 0]} mat={m.dalleEtage} tuile={1.6} />

      {/* ---- escalier en bois ---- */}
      {Array.from({ length: 16 }, (_, i) => {
        const h = (F2 / 16) * (i + 1);
        const z = -1.85 - i * 0.27;
        return <Bloc key={i} de={[2.2, h - 0.05, z - 0.3]} a={[3.3, h, z]} mat={bois} tuile={1.2} />;
      })}
      <mesh position={[3.33, F2 / 2 + 0.5, -4.0]} rotation-x={Math.atan(F2 / (16 * 0.27))} material={m.ardoise}>
        <boxGeometry args={[0.04, 0.04, Math.hypot(F2, 16 * 0.27)]} />
      </mesh>

      {/* ---- toit : versants (ardoise dessus, plâtre dessous), chevrons, faîtage ---- */}
      {[-1, 1].map((s) => (
        <mesh
          key={s}
          geometry={geoVersant}
          material={m.toit}
          position={[(s * (X + 0.35)) / 2, FAITAGE - ((X + 0.35) / 2) * PENTE + 0.06, Z / 2]}
          rotation-z={-s * ang}
        />
      ))}
      {chevrons.map((c, i) => (
        <mesh key={i} position={c.p} rotation={c.r} material={bois}>
          <boxGeometry args={[c.long, 0.16, 0.07]} />
        </mesh>
      ))}
      <Bloc de={[-0.09, FAITAGE - 0.42, Z]} a={[0.09, FAITAGE - 0.14, 0]} mat={bois} tuile={1.2} />

      {/* ---- séjour ---- */}
      <Modele nom="sofa_02" position={[-1.7, 0, -4.4]} rotation-y={-Math.PI / 2} scale={1.15} />
      <Modele nom="modern_coffee_table_01" position={[-3.1, 0, -4.4]} />
      <mesh rotation-x={-Math.PI / 2} position={[-3, 0.006, -4.4]} material={lin}>
        <planeGeometry args={[2.4, 3]} />
      </mesh>
      <Modele nom="potted_plant_04" position={[-3.1, 0.39, -4.2]} scale={1.3} />
      <Cadre photo="realisation-maison-contemporaine" position={[-X + E + 0.02, 1.62, -3.75]} rotation-y={Math.PI / 2} />
      <Cadre photo="realisation-plain-pied" position={[-X + E + 0.02, 1.62, -2.45]} rotation-y={Math.PI / 2} largeur={0.8} />

      {/* ---- cuisine ---- */}
      <Bloc de={[0.4, 0, Z + E]} a={[4.6, 0.86, Z + E + 0.62]} mat={m.laque} />
      <Bloc de={[0.38, 0.86, Z + E]} a={[4.62, 0.9, Z + E + 0.65]} mat={marbre} tuile={1.2} />
      <Bloc de={[-0.2, 0, -5.8]} a={[1.5, 0.86, -4.9]} mat={m.laque} />
      <Bloc de={[-0.25, 0.86, -5.85]} a={[1.55, 0.9, -4.85]} mat={marbre} tuile={1.2} />
      <mesh position={[1.7, 1.05, Z + E + 0.3]} material={m.chrome}>
        <cylinderGeometry args={[0.015, 0.015, 0.32, 10]} />
      </mesh>
      {!petit && [0.1, 0.65, 1.2].map((x) => <Modele key={x} nom="bar_chair_round_01" position={[x, 0, -4.55]} scale={0.95} />)}
      {[0.25, 1.05].map((x) => (
        <Modele key={x} nom="modern_ceiling_lamp_01" position={[x, H1 - 1.18, -5.35]} />
      ))}

      {/* ---- étage : chambre sous la charpente ---- */}
      <group position={[-2.2, F2, -6.6]}>
        <Bloc de={[-1.0, 0, -1.0]} a={[1.0, 0.32, 1.1]} mat={bois} tuile={1.2} />
        <Bloc de={[-1.05, 0, -1.08]} a={[1.05, 1.05, -1.0]} mat={bois} tuile={1.2} />
        <RoundedBox args={[1.9, 0.22, 2.0]} radius={0.06} position={[0, 0.42, 0.05]} material={m.laque} />
        <RoundedBox args={[1.94, 0.08, 1.45]} radius={0.04} position={[0, 0.56, 0.36]} material={lin} />
        {[-0.45, 0.45].map((x) => (
          <RoundedBox key={x} args={[0.7, 0.16, 0.42]} radius={0.07} position={[x, 0.62, -0.68]} material={m.laque} />
        ))}
        <Modele nom="side_table_01" position={[1.45, 0, -0.6]} scale={0.9} />
        <Modele nom="potted_plant_04" position={[1.45, 0.5, -0.6]} scale={1.2} />
      </group>
      {/* puits de lumière au-dessus du lit */}
      <PuitsDeLumiere />
      {/* cloison à ossature bois : à moitié montée (montants apparents), à moitié finie */}
      <group>
        <Bloc de={[-4.4, F2, -2.47]} a={[-2.6, F2 + 0.06, -2.33]} mat={bois} tuile={1.2} />
        <Bloc de={[-4.4, F2 + 2.34, -2.47]} a={[-2.6, F2 + 2.4, -2.33]} mat={bois} tuile={1.2} />
        {[-4.4, -3.8, -3.2, -2.66].map((x) => (
          <Bloc key={x} de={[x, F2 + 0.06, -2.47]} a={[x + 0.06, F2 + 2.34, -2.33]} mat={bois} tuile={1.2} />
        ))}
        <Bloc de={[-2.6, F2, -2.47]} a={[-0.4, F2 + 2.4, -2.33]} mat={platre} />
      </group>
    </group>
  );
}

function PuitsDeLumiere() {
  // ouverture dans le versant gauche : on la figure par un cadre clair et un faisceau doux
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#fff6e0', transparent: true, opacity: 0.1, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }),
    [],
  );
  const x = -2.4;
  const y = plafondEtage(x) - 0.02;
  return (
    <group>
      <group position={[x, y - 0.01, -6.4]} rotation-z={Math.atan(PENTE)}>
        <mesh rotation-x={Math.PI / 2}>
          <planeGeometry args={[1.2, 1.4]} />
          <meshBasicMaterial color="#fffaf0" toneMapped={false} />
        </mesh>
      </group>
      <mesh position={[x + 0.15, (y + F2) / 2, -6.45]} material={mat}>
        <cylinderGeometry args={[0.6, 1.05, y - F2, 4, 1, true]} />
      </mesh>
    </group>
  );
}

/* ---------- inscriptions (les phrases du site) ---------- */
const lignesPhase = (p, clair) => [
  [p.nom.toUpperCase(), 92, clair ? '#f7f6f2' : ANTHRACITE],
  [p.texte, 66, clair ? '#f7f6f2' : '#4a4a46', '600 66px "Barlow", Arial, sans-serif'],
];
function Inscriptions({ phases, slogan }) {
  const [fond, rdc, etage, toit, cles] = phases;
  const opJaune = useMemo(() => ({ couleur: JAUNE, accent: '#f7f6f2', hauteur: 260 }), []);
  const opNormal = useMemo(() => ({ hauteur: 260 }), []);
  const opFin = useMemo(() => ({ hauteur: 330, bande: false }), []);
  const lignesFond = useMemo(
    () => [
      [fond.nom.toUpperCase(), 92, JAUNE],
      [fond.texte, 66, '#f7f6f2', '600 66px "Barlow", Arial, sans-serif'],
    ],
    [fond],
  );
  const lignes = useMemo(() => [rdc, etage, toit, cles].map((ph, i) => lignesPhase(ph, i === 0)), [rdc, etage, toit, cles]);
  const [l1, l2] = slogan.split('. ');
  const lignesFin = useMemo(
    () => [
      [`${l1}.`, 120],
      [l2, 120, '#2b59c3'],
    ],
    [l1, l2],
  );
  return (
    <group>
      <Inscription lignes={lignesFond} largeur={3.2} position={[1.1, -0.75, Z + E + 0.005]} options={opJaune} />
      <Inscription lignes={lignes[0]} largeur={2.3} position={[-X + E + 0.03, 1.9, -6.25]} rotation={[0, Math.PI / 2, 0]} options={opNormal} />
      <Inscription lignes={lignes[1]} largeur={1.9} position={[-1.5, F2 + 1.35, -2.475]} rotation={[0, Math.PI, 0]} options={opNormal} />
      <Inscription lignes={lignes[2]} largeur={2.4} position={[0, 5.1, -E - 0.005]} rotation={[0, Math.PI, 0]} options={opNormal} />
      <Inscription lignes={lignes[3]} largeur={2.0} position={[2.5, 4.1, Z + E + 0.005]} options={opNormal} />
      <Inscription lignes={lignesFin} largeur={2.6} position={[0, 4.85, Z + E + 0.005]} options={opFin} />
    </group>
  );
}

/* ---------- caméra : arrêts [progression, position, point visé] ---------- */
export const PARCOURS = [
  [0.0, [0, 1.7, 11], [0, 2.7, 0]],
  [0.03, [0, 1.7, 10.4], [0, 2.5, 0]],
  [0.13, [0, 1.62, 1.5], [0, 1.4, -3]],
  [0.18, [0, 1.62, -1.2], [0, 0.0, -3.6]],
  [0.22, [0, -0.35, -2.1], [0, -1.4, -4]],
  [0.26, [0.2, -0.75, -3.0], [-1.6, -1.45, -5.6]],
  [0.31, [0.6, -0.75, -3.4], [1.1, -0.75, Z]],
  [0.35, [0.6, -0.75, -3.6], [1.1, -0.75, Z]],
  [0.4, [-0.6, 1.6, -2.9], [-3, 1.4, -6]],
  [0.45, [-1.1, 1.6, -3.6], [-X, 1.75, -6.25]],
  [0.48, [-1.1, 1.6, -3.7], [-X, 1.75, -6.25]],
  [0.53, [-0.4, 1.62, -2.3], [1.6, 1.0, -7.4]],
  [0.56, [-0.4, 1.62, -2.4], [1.6, 1.0, -7.4]],
  [0.61, [2.75, 1.65, -0.7], [2.75, 3.3, -6]],
  [0.68, [2.75, F2 + 1.6, -5.9], [2.2, F2 + 1.3, Z]],
  [0.72, [0.6, F2 + 1.55, -5.6], [-1.5, F2 + 1.25, -2.4]],
  [0.75, [0.4, F2 + 1.55, -5.4], [-1.5, F2 + 1.3, -2.4]],
  [0.79, [0.3, F2 + 1.45, -5.2], [0, 5.0, -0.2]],
  [0.82, [0.3, F2 + 1.45, -5.0], [0, 5.0, -0.2]],
  [0.86, [0.6, F2 + 1.5, -4.8], [2.5, 4.1, Z]],
  [0.88, [0.6, F2 + 1.5, -4.9], [2.5, 4.1, Z]],
  [0.93, [0, F2 + 1.4, -1.6], [0, 4.5, Z]],
  [1.0, [0, F2 + 1.4, -1.4], [0, 4.5, Z]],
];

function Camera({ progres, refPorte, refSoleil, refCiel }) {
  const { camera, size, scene } = useThree();
  const p0 = useMemo(() => new THREE.Vector3(), []);
  const p1 = useMemo(() => new THREE.Vector3(), []);
  const c0 = useMemo(() => new THREE.Vector3(), []);
  const c1 = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const portrait = size.width / size.height < 1;
    if (progres.lisse === undefined) progres.lisse = progres.current;
    progres.lisse += (progres.current - progres.lisse) * 0.08;
    const p = progres.lisse;
    let i = 1;
    while (i < PARCOURS.length - 1 && p > PARCOURS[i][0]) i++;
    const [t0, a0, b0] = PARCOURS[i - 1];
    const [t1, a1, b1] = PARCOURS[i];
    const k = doux((p - t0) / (t1 - t0));
    camera.position.copy(p0.set(...a0).lerp(p1.set(...a1), k));
    camera.lookAt(c0.set(...b0).lerp(c1.set(...b1), k));
    // champ plus large sur téléphone, et dehors au départ pour voir toute la maison
    const dehors = 1 - doux((p - 0.03) / 0.08);
    camera.fov = (portrait ? 72 : 58) + dehors * (portrait ? 6 : -10);
    camera.updateProjectionMatrix();
    // la porte s'ouvre quand on arrive devant
    if (refPorte.current) refPorte.current.rotation.y = 1.5 * doux((p - 0.07) / 0.06);
    // sous la dalle : la lumière du jour disparaît, seules les baladeuses de chantier éclairent
    const sous = doux((-camera.position.y + 0.05) / 0.4);
    scene.environmentIntensity = 0.95 - 0.85 * sous;
    if (refSoleil.current) refSoleil.current.intensity = 2.2 * (1 - sous);
    if (refCiel.current) refCiel.current.intensity = 0.55 * (1 - sous * 0.8);
  });
  return null;
}

function Ambiance({ taille }) {
  const [env, ciel] = useTexture([`${BASE}scene/maison-${taille}.jpg`, `${BASE}scene/jardin-${taille}.jpg`]);
  const { scene } = useThree();
  useEffect(() => {
    for (const t of [env, ciel]) {
      t.mapping = THREE.EquirectangularReflectionMapping;
      t.colorSpace = THREE.SRGBColorSpace;
    }
    scene.environment = env;
    scene.background = ciel;
    scene.backgroundIntensity = 1;
    return () => {
      scene.environment = null;
      scene.background = null;
    };
  }, [env, ciel, scene]);
  return null;
}

/** Baladeuses de chantier dans le vide sanitaire. */
function Baladeuses() {
  return [
    [-1.4, -0.55, -4.6],
    [1.6, -0.55, -6.6],
  ].map((p) => (
    <group key={p.join()} position={p}>
      <pointLight intensity={4} distance={7} decay={1.6} color="#ffd9a0" />
      <mesh>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#fff1d0" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.3, 4]} />
        <meshBasicMaterial color="#111" />
      </mesh>
    </group>
  ));
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

export default function Maison3D({ progres, phases, slogan, leger, actif = true, onReady }) {
  const petit = typeof window !== 'undefined' && innerWidth < 768;
  const taille = petit || leger ? 512 : 1024;
  const refPorte = useRef(null);
  const refSoleil = useRef(null);
  const refCiel = useRef(null);
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={leger ? [1, 1.25] : petit ? [1, 1.6] : [1, 1.75]}
      frameloop={IMAGE_PAR_IMAGE || !actif ? 'never' : 'always'}
      camera={{ fov: 48, near: 0.03, far: 220, position: [0, 1.7, 11] }}
      gl={{ antialias: !leger, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      aria-hidden="true"
    >
      <Pilote />
      <hemisphereLight ref={refCiel} args={['#eef4ff', '#b8a68c', 0.55]} />
      <directionalLight ref={refSoleil} position={[-6, 10, 8]} intensity={2.2} color="#fff4e2" />
      <pointLight position={[-2.2, F2 + 2.6, -6.4]} intensity={3} distance={6} color="#fff3dc" />
      <Suspense fallback={null}>
        <Ambiance taille={taille} />
        <Maison taille={taille} petit={petit} refPorte={refPorte} />
        <Inscriptions phases={phases} slogan={slogan} />
        <Baladeuses />
        <Camera progres={progres} refPorte={refPorte} refSoleil={refSoleil} refCiel={refCiel} />
        <Pret onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
