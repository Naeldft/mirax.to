import { useMemo } from 'react';
import * as THREE from 'three';

/* ------------------------------------------------------------------
   Client du salon : un mannequin de vitrine haut de gamme, construit en code.
   Silhouette lisse et mate (sable), visage stylisé sans détail (nez, menton, pommettes à peine marqués),
   une cape de coiffure qui couvre le corps. Les coupes sont sculptées : volumes doux, fines stries de mèches
   (carte de relief calculée), couleurs naturelles uniquement.
   Repère : le mannequin regarde vers +z, origine au sol au centre de l'assise ; centre de la tête en (0, TETE_Y, 0).
------------------------------------------------------------------- */

export const TETE_Y = 1.39;
const PEAU = '#a58a70';
const CAPE = '#2f2a28';

/** Carte de relief « mèches » : stries verticales irrégulières, converties en carte de normales. */
let _meches;
function carteMeches() {
  if (_meches) return _meches;
  const L = 512;
  const H = 128;
  const haut = new Float32Array(L * H);
  // stries : somme de sinus de fréquences différentes, légèrement ondulées sur la hauteur
  for (let y = 0; y < H; y++)
    for (let x = 0; x < L; x++) {
      const u = (x / L) * Math.PI * 2;
      const o = Math.sin(y / 9) * 0.6;
      haut[y * L + x] = 0.35 * Math.sin(u * 90 + o) + 0.3 * Math.sin(u * 151 + o * 2.1 + 1.3) + 0.2 * Math.sin(u * 233 + 2.7) + 0.15 * Math.sin(u * 37 + o * 0.5);
    }
  const c = document.createElement('canvas');
  c.width = L;
  c.height = H;
  const g = c.getContext('2d');
  const img = g.createImageData(L, H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < L; x++) {
      const dx = haut[y * L + ((x + 1) % L)] - haut[y * L + ((x - 1 + L) % L)];
      const dy = haut[((y + 1) % H) * L + x] - haut[((y - 1 + H) % H) * L + x];
      const n = new THREE.Vector3(-dx * 1.6, -dy * 0.4, 1).normalize();
      const i = (y * L + x) * 4;
      img.data[i] = (n.x * 0.5 + 0.5) * 255;
      img.data[i + 1] = (n.y * 0.5 + 0.5) * 255;
      img.data[i + 2] = (n.z * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  g.putImageData(img, 0, 0);
  _meches = new THREE.CanvasTexture(c);
  _meches.wrapS = _meches.wrapT = THREE.RepeatWrapping;
  return _meches;
}

function matiereCheveux(couleur, { degrade } = {}) {
  // reflet soyeux de cheveux soignés : brillance anisotrope (étirée le long des mèches), sans effet plastique
  return new THREE.MeshPhysicalMaterial({
    color: couleur,
    roughness: 0.4,
    metalness: 0,
    anisotropy: 0.6,
    anisotropyRotation: Math.PI / 2,
    sheen: 0.12,
    sheenRoughness: 0.45,
    sheenColor: new THREE.Color('#e9c39a'),
    clearcoat: 0.06,
    clearcoatRoughness: 0.4,
    normalMap: carteMeches(),
    normalScale: new THREE.Vector2(0.32, 0.32),
    vertexColors: !!degrade,
    side: THREE.DoubleSide,
  });
}

/** Volume de cheveux tourné autour de la tête (profil [rayon, hauteur]), ouvert devant pour le visage. */
function volume(profil, { ouverture = 1.0, segments = 72, ondes = 0, degrade } = {}) {
  const pts = profil.map(([r, y]) => new THREE.Vector2(r, y));
  const geo = new THREE.LatheGeometry(pts, segments, ouverture, Math.PI * 2 - 2 * ouverture);
  const pos = geo.attributes.position;
  if (ondes) {
    // ondulations des longueurs : le rayon varie avec la hauteur et l'angle
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      if (y > -0.05) continue;
      const a = Math.atan2(x, z);
      const k = 1 + Math.sin(y * 38 + a * 3) * ondes * Math.min(1, (-0.05 - y) * 6);
      pos.setX(i, x * k);
      pos.setZ(i, z * k);
    }
  }
  if (degrade) {
    // balayage : la couleur s'éclaircit vers les pointes
    const couleurs = [];
    const c0 = new THREE.Color(degrade[0]);
    const c1 = new THREE.Color(degrade[1]);
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const t = THREE.MathUtils.clamp((0.06 - y) / 0.36, 0, 1);
      const c = c0.clone().lerp(c1, Math.pow(t, 1.4));
      couleurs.push(c.r, c.g, c.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(couleurs, 3));
  }
  geo.computeVertexNormals();
  return geo;
}

/**
 * Tête de mannequin sculptée d'un seul tenant : une sphère déformée (mâchoire affinée, menton, arête du nez,
 * arcades, orbites à peine creusées, pommettes, lèvres). Aucun détail réaliste : un buste lisse et élégant.
 */
function teteSculptee(homme) {
  const geo = new THREE.SphereGeometry(0.1, 128, 96);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  const bosse = (x, y, z, cx, cy, sx, sy) => Math.exp(-((x - cx) ** 2) / (2 * sx * sx) - ((y - cy) ** 2) / (2 * sy * sy)) * Math.max(0, z);
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).divideScalar(0.1); // sphère unité
    const { x, y, z } = v;
    let r = 1;
    // forme générale : un ovoïde, plus étroit en bas (mâchoire), crâne un peu allongé vers l'arrière
    const bas = Math.max(0, -y);
    let sx = (homme ? 0.93 : 0.86) * (1 - bas * (homme ? 0.16 : 0.24));
    let sz = 0.98 * (1 - bas * 0.12) + Math.max(0, -z) * 0.04;
    const sy = 1.14;
    // le visage, à l'avant (z > 0)
    r += 0.06 * bosse(x, y, z, 0, -0.03, 0.07, 0.24); // arête du nez
    r += 0.035 * bosse(x, y, z, 0, -0.22, 0.09, 0.06); // bout du nez
    r -= 0.025 * bosse(x, y, z, 0.32, 0.12, 0.14, 0.09) + 0.025 * bosse(x, y, z, -0.32, 0.12, 0.14, 0.09); // orbites
    r += 0.02 * bosse(x, y, z, 0, 0.3, 0.45, 0.07); // arcades
    r += 0.03 * bosse(x, y, z, 0.48, -0.12, 0.16, 0.12) + 0.03 * bosse(x, y, z, -0.48, -0.12, 0.16, 0.12); // pommettes
    r += 0.018 * bosse(x, y, z, 0, -0.45, 0.18, 0.05); // lèvres
    r += (homme ? 0.05 : 0.035) * bosse(x, y, z, 0, -0.78, 0.22, 0.1); // menton
    v.set(x * sx * r, y * sy * r, z * sz * r).multiplyScalar(0.1);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

/* ---------- les coupes ---------- */
function Carre({ couleur }) {
  // carré lisse au niveau de la mâchoire, raie sur le côté, frange balayée
  const m = useMemo(() => matiereCheveux(couleur), [couleur]);
  const coque = useMemo(
    () =>
      volume(
        [
          [0.001, 0.128],
          [0.058, 0.122],
          [0.097, 0.095],
          [0.114, 0.05],
          [0.119, -0.005],
          [0.121, -0.055],
          [0.118, -0.095],
          [0.108, -0.118],
          [0.094, -0.122],
          [0.084, -0.106],
        ],
        { ouverture: 0.82, segments: 96 },
      ),
    [],
  );
  const dessus = useMemo(() => new THREE.SphereGeometry(0.108, 64, 24, 0, Math.PI * 2, 0, Math.PI * 0.36), []);
  return (
    <group>
      <mesh geometry={coque} material={m} />
      {/* le dessus et la frange, qui couvrent le front en biais */}
      <mesh geometry={dessus} material={m} rotation={[0.42, 0, -0.2]} position={[0, 0.008, 0.006]} scale={[0.98, 1.06, 1.06]} />
    </group>
  );
}

function Degrade({ couleur }) {
  // coupe homme : côtés très courts (dégradé vers la peau), dessus plus long, coiffé vers l'arrière
  const m = useMemo(() => matiereCheveux(couleur), [couleur]);
  const cotes = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.104, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.6);
    // dégradé : la couleur des cheveux se fond vers la peau en bas
    const pos = geo.attributes.position;
    const c0 = new THREE.Color(couleur);
    const c1 = new THREE.Color(PEAU).lerp(c0, 0.35);
    const cols = [];
    for (let i = 0; i < pos.count; i++) {
      const t = THREE.MathUtils.clamp((0.045 - pos.getY(i)) / 0.07, 0, 1);
      const c = c0.clone().lerp(c1, t);
      cols.push(c.r, c.g, c.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    return geo;
  }, [couleur]);
  const mCotes = useMemo(
    () => new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.62, sheen: 0.08, sheenColor: new THREE.Color('#d9b48c'), normalMap: carteMeches(), normalScale: new THREE.Vector2(0.25, 0.25) }),
    [],
  );
  return (
    <group>
      <mesh geometry={cotes} material={mCotes} rotation-x={-0.12} />
      {/* le dessus : une calotte un peu plus épaisse, au ras du crâne, avec une petite houppe vers l'avant */}
      <mesh material={m} rotation-x={-0.18} scale={[1.0, 1.0, 1.03]}>
        <sphereGeometry args={[0.112, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.33]} />
      </mesh>
      <mesh material={m} position={[0, 0.098, 0.05]} rotation-x={-0.6} scale={[0.75, 0.28, 0.7]}>
        <sphereGeometry args={[0.07, 32, 16]} />
      </mesh>
    </group>
  );
}

function Longs({ couleurs }) {
  // longueurs ondulées sous les omoplates, balayage caramel vers les pointes
  const m = useMemo(() => matiereCheveux('#ffffff', { degrade: true }), []);
  const coque = useMemo(
    () =>
      volume(
        [
          [0.001, 0.134],
          [0.064, 0.127],
          [0.106, 0.096],
          [0.125, 0.04],
          [0.13, -0.04],
          [0.14, -0.13],
          [0.16, -0.22],
          [0.17, -0.31],
          [0.165, -0.37],
          [0.15, -0.39],
          [0.135, -0.36],
        ],
        { ouverture: 0.9, ondes: 0.05, degrade: couleurs },
      ),
    [couleurs],
  );
  const dessus = useMemo(() => new THREE.SphereGeometry(0.115, 64, 24, 0, Math.PI * 2, 0, Math.PI * 0.3), []);
  const mDessus = useMemo(() => matiereCheveux(couleurs[0]), [couleurs]);
  return (
    <group>
      <mesh geometry={coque} material={m} />
      <mesh geometry={dessus} material={mDessus} rotation-x={0.3} scale={[1.04, 1, 1.06]} />
    </group>
  );
}

function Chignon({ couleur }) {
  // cheveux tirés en arrière, chignon bas sur la nuque
  const m = useMemo(() => matiereCheveux(couleur), [couleur]);
  const calotte = useMemo(() => new THREE.SphereGeometry(0.106, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.52), []);
  return (
    <group>
      <mesh geometry={calotte} material={m} rotation-x={-0.42} />
      {/* le chignon : un gros tore torsadé, bas sur la nuque */}
      <mesh material={m} position={[0, -0.035, -0.125]} rotation-x={0.25}>
        <torusGeometry args={[0.05, 0.034, 24, 64]} />
      </mesh>
      <mesh material={m} position={[0, -0.035, -0.135]} scale={[1, 0.85, 0.75]}>
        <sphereGeometry args={[0.052, 32, 16]} />
      </mesh>
    </group>
  );
}

const COUPES = { carre: Carre, degrade: Degrade, longs: Longs, chignon: Chignon };

/** Le logo brodé sur la cape : « Atelier Mèche », en blanc, discret. */
let _logo;
function logo() {
  if (_logo) return _logo;
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 160;
  const g = c.getContext('2d');
  g.fillStyle = '#f4eee8';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = 'italic 64px "Fraunces Variable", Georgia, serif';
  g.fillText('Atelier Mèche', 256, 70);
  g.fillRect(196, 118, 120, 2);
  _logo = new THREE.CanvasTexture(c);
  _logo.colorSpace = THREE.SRGBColorSpace;
  _logo.anisotropy = 8;
  return _logo;
}

/* ---------- le mannequin ---------- */
export default function Mannequin({ coupe, cheveux, homme = false }) {
  const peau = useMemo(() => new THREE.MeshStandardMaterial({ color: PEAU, roughness: 0.85, metalness: 0, envMapIntensity: 0.2 }), []);
  const cape = useMemo(() => new THREE.MeshStandardMaterial({ color: CAPE, roughness: 0.55, metalness: 0.05, side: THREE.DoubleSide }), []);
  const geoCape = useMemo(() => {
    // une cape de coiffure : du cou aux genoux, drapée vers l'avant sur les jambes
    const l = homme ? 1.12 : 1;
    const profil = [
      [0.052, 1.215],
      [0.09, 1.19],
      [0.19 * l, 1.135],
      [0.235 * l, 1.07],
      [0.245 * l, 0.92],
      [0.255 * l, 0.75],
      [0.29 * l, 0.56],
      [0.31 * l, 0.5],
    ].map(([r, y]) => new THREE.Vector2(r, y));
    const geo = new THREE.LatheGeometry(profil, 64);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      let z = pos.getZ(i);
      const x = pos.getX(i);
      // épaules un peu plus larges que profondes
      pos.setX(i, x * 1.18);
      // les genoux : le bas de la cape avance sur les cuisses
      const devant = Math.max(0, z / 0.3);
      z = z * 0.86 + Math.max(0, 0.85 - y) * 1.15 * devant;
      // de légers plis verticaux
      const a = Math.atan2(x, z);
      const pli = Math.sin(a * 9) * 0.006 * Math.min(1, (1.0 - y) * 3);
      pos.setZ(i, z + pli * Math.cos(a));
      pos.setX(i, pos.getX(i) + pli * Math.sin(a));
    }
    geo.computeVertexNormals();
    return geo;
  }, [homme]);
  const geoTete = useMemo(() => teteSculptee(homme), [homme]);
  const Coupe = COUPES[coupe];
  return (
    <group>
      <mesh geometry={geoCape} material={cape} />
      <mesh position={[0, 1.02, 0.212]} rotation-x={-0.12}>
        <planeGeometry args={[0.15, 0.047]} />
        <meshStandardMaterial map={logo()} transparent roughness={0.7} polygonOffset polygonOffsetFactor={-2} />
      </mesh>
      {/* jambes sous la cape : tibias et pieds sur le repose-pieds */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.1, 0, 0]}>
          <mesh material={peau} position={[0, 0.36, 0.52]} rotation-x={0.25}>
            <capsuleGeometry args={[0.045, 0.32, 8, 16]} />
          </mesh>
          <mesh material={peau} position={[0, 0.17, 0.59]} scale={[1, 0.6, 1.9]}>
            <sphereGeometry args={[0.048, 20, 12]} />
          </mesh>
        </group>
      ))}
      {/* cou */}
      <mesh material={peau} position={[0, 1.24, 0.004]}>
        <cylinderGeometry args={[homme ? 0.052 : 0.045, homme ? 0.056 : 0.05, 0.13, 32]} />
      </mesh>
      <group position={[0, TETE_Y, 0.012]} scale={1.1}>
        {/* la tête : sculptée d'un seul tenant */}
        <mesh geometry={geoTete} material={peau} />
        {/* oreilles (visibles avec les coupes courtes) */}
        {[-1, 1].map((s) => (
          <mesh key={`o${s}`} material={peau} position={[s * (homme ? 0.094 : 0.087), -0.01, -0.005]} scale={[0.35, 1, 0.65]}>
            <sphereGeometry args={[0.027, 20, 12]} />
          </mesh>
        ))}
        <Coupe couleur={cheveux} couleurs={Array.isArray(cheveux) ? cheveux : undefined} />
      </group>
    </group>
  );
}
