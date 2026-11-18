import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { profils } from './profils.js';

/* ------------------------------------------------------------------
   Burger 3D d'après sa photo de référence (projection de la photo sur un volume).
   Le contour de la photo, ligne par ligne, donne la largeur du burger à chaque hauteur ; on en fait un volume
   (section ovale, aussi profond que large), découpé en couches (pain, garniture, steak…) le long de courbes qui
   suivent les bords des ingrédients. La photo est projetée de face sur chaque couche : de face, c'est exactement
   la photo ; en tournant (±30° au plus) le volume, la lumière et les ombres restent cohérents.
   Les parties transparentes de la photo (entre deux coulures de sauce) sont découpées.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const LARGEUR_PAIN = 0.115; // m : un pain fait 11,5 cm
const SEG = 96;

/** Interpolation du profil (rangs [y, cx, rx], triés par y). */
function lecteur(rangs) {
  return (y) => {
    let i = 1;
    while (i < rangs.length - 1 && rangs[i][0] < y) i++;
    const [y0, c0, r0] = rangs[i - 1];
    const [y1, c1, r1] = rangs[i];
    const t = y1 === y0 ? 0 : Math.min(1, Math.max(0, (y - y0) / (y1 - y0)));
    return [c0 + (c1 - c0) * t, r0 + (r1 - r0) * t];
  };
}

/**
 * Géométrie d'une couche entre deux bornes (fractions de la hauteur de la photo) :
 * borne = [au centre, sur les côtés] — les bords des ingrédients sont des ellipses vues un peu d'en haut.
 */
function couche(p, haut, bas, { lignes = 36, couvercles = true, echelle, cx0, ysol }) {
  const prof = lecteur(p.rangs);
  const pos = [];
  const uv = [];
  const idx = [];
  const yb = (b, s) => p.h * (b[0] + (b[1] - b[0]) * s * s);
  const point = (ypx, s, c) => {
    const [cx, rx] = prof(ypx);
    const xpx = cx + rx * s;
    pos.push((xpx - cx0) * echelle, (ysol - ypx) * echelle, rx * 0.92 * c * echelle);
    uv.push(xpx / p.l, 1 - ypx / p.h);
  };
  for (let i = 0; i <= SEG; i++) {
    const th = -Math.PI + (2 * Math.PI * i) / SEG;
    const s = Math.sin(th);
    const c = Math.cos(th);
    const y0 = yb(haut, s);
    const y1 = yb(bas, s);
    for (let j = 0; j < lignes; j++) point(y0 + ((y1 - y0) * j) / (lignes - 1), s, c);
  }
  for (let i = 0; i < SEG; i++)
    for (let j = 0; j < lignes - 1; j++) {
      const a = i * lignes + j;
      const b = (i + 1) * lignes + j;
      idx.push(a, a + 1, b, b, a + 1, b + 1);
    }
  // couvercles (dessus et dessous de la couche), visibles quand les couches sont séparées
  if (couvercles) {
    // les couvercles ont leurs propres sommets : la couleur vient du centre de la tranche (avec un léger dégradé
    // vers le bord), au lieu d'étirer la photo en stries
    [0, lignes - 1].forEach((j, k) => {
      const yc = yb(k ? bas : haut, 0);
      const [cx] = prof(yc);
      const uc = cx / p.l;
      const vc = 1 - (yc + (k ? -6 : 6)) / p.h; // un peu à l'intérieur de la couche
      const centre = pos.length / 3;
      pos.push((cx - cx0) * echelle, (ysol - yc) * echelle, 0);
      uv.push(uc, vc);
      const premier = pos.length / 3;
      for (let i = 0; i <= SEG; i++) {
        const v = i * lignes + j;
        pos.push(pos[v * 3], pos[v * 3 + 1], pos[v * 3 + 2]);
        uv.push(uc + (uv[v * 2] - uc) * 0.04, vc);
      }
      for (let i = 0; i < SEG; i++) {
        const a = premier + i;
        const b = premier + i + 1;
        if (k) idx.push(centre, a, b);
        else idx.push(centre, b, a);
      }
    });
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Les couches d'un burger : bornes de haut en bas [centre, côtés] en fraction de la hauteur de la photo. */
export function useCouchesPhoto(id, bornes) {
  return useMemo(() => {
    const p = profils[id];
    // échelle : la largeur du pain du dessous (dernier quart de la photo) = 11,5 cm
    const bas = p.rangs.filter(([y]) => y > p.h * 0.8 && y < p.h * 0.95);
    const largeur = Math.max(...bas.map((r) => r[2])) * 2;
    const echelle = LARGEUR_PAIN / largeur;
    const cx0 = bas.reduce((s, r) => s + r[1], 0) / bas.length;
    const ysol = p.h - 6; // marge du recadrage
    const liste = [];
    for (let k = 0; k < bornes.length - 1; k++) {
      const g = couche(p, bornes[k], bornes[k + 1], { echelle, cx0, ysol });
      g.computeBoundingBox();
      liste.push({ g, y: g.boundingBox.min.y });
    }
    return { couches: liste, hauteur: (ysol - p.rangs[0][0]) * echelle };
  }, [id, bornes]);
}

export default function BurgerPhoto({ id, bornes, def = 'hd', assemblage }) {
  const tex = useTexture(`${BASE}scene3d/burgers/${id}-${def}.webp`);
  const mat = useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return new THREE.MeshBasicMaterial({ map: tex, alphaTest: 0.45, side: THREE.DoubleSide, toneMapped: false });
  }, [tex]);
  const { couches } = useCouchesPhoto(id, bornes);
  const refs = useRef([]);
  useFrame(() => {
    const a = assemblage ? assemblage.current : 1;
    const n = couches.length;
    // de bas en haut : la couche du bas arrive en premier
    for (let k = n - 1, ordre = 0; k >= 0; k--, ordre++) {
      const el = refs.current[k];
      if (!el) continue;
      const t = Math.min(1, Math.max(0, a * (n + 1) - ordre));
      const r = t >= 1 ? 1 : 1 + 2.7 * Math.pow(t - 1, 3) + 1.7 * Math.pow(t - 1, 2);
      el.position.y = (1 - r) * (0.08 + ordre * 0.02);
      el.rotation.y = (1 - r) * (ordre % 2 ? 0.5 : -0.5);
      el.visible = t > 0;
    }
  });
  return couches.map((c, k) => (
    <group key={k} ref={(el) => (refs.current[k] = el)}>
      <mesh geometry={c.g} material={mat} castShadow />
    </group>
  ));
}
