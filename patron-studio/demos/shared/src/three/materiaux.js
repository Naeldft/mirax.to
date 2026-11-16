import { useTexture } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';

/* ------------------------------------------------------------------
   Matières PBR (Poly Haven, CC0) : couleur, relief (normal), rugosité ; 1 024 px sur ordinateur, 512 px sur téléphone,
   précédées d'une version 256 px pour un premier affichage rapide.
   Et quelques cartes calculées : moletage des barres, grain mat des mannequins, coutures, marquages.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;

// Définitions : « hd » 1 024 px (ordinateur), « sd » 512 px (téléphone), « xs » 256 px (premier affichage).
const urlsPBR = (nom, def, sansCouleur) => ({
  ...(sansCouleur ? {} : { map: `${BASE}scene/pbr/${nom}-diffuse-${def}.webp` }),
  normalMap: `${BASE}scene/pbr/${nom}-normal-${def}.webp`,
  roughnessMap: `${BASE}scene/pbr/${nom}-rough-${def}.webp`,
});
const enCours = new Map();
const charge = (url) => {
  if (!enCours.has(url)) enCours.set(url, new THREE.TextureLoader().loadAsync(url));
  return enCours.get(url);
};
function regler(tex, cle, repeat) {
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(...repeat);
  tex.anisotropy = 8;
  if (cle === 'map') tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Matière PBR à chargement progressif : la scène s'affiche tout de suite avec les textures 256 px
 * (quelques dizaines de Ko), puis la définition visée (1 024 px ou 512 px) arrive en arrière-plan et remplace les premières.
 * Pas de carte d'occlusion : l'occlusion ambiante est calculée à l'écran (N8AO).
 */
export function usePBR(nom, { def = 'hd', repeat = [1, 1], couleur = '#ffffff', rugosite = 1, metal = 0, env = 0.8, relief = 1, sansCouleur = false } = {}) {
  const t = useTexture(urlsPBR(nom, 'xs', sansCouleur));
  const [, setVersion] = useState(0);
  const mat = useMemo(() => {
    const cartes = {};
    // une même texture peut servir à plusieurs matières avec des répétitions différentes : une copie par matière
    Object.entries(t).forEach(([k, tex]) => (cartes[k] = regler(tex.clone(), k, repeat)));
    return new THREE.MeshStandardMaterial({
      ...cartes,
      color: couleur,
      roughness: rugosite,
      metalness: metal,
      envMapIntensity: env,
      normalScale: new THREE.Vector2(relief, relief),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- une fois
  }, [t]);
  useEffect(() => {
    if (def === 'xs') return;
    let fini = false;
    const urls = urlsPBR(nom, def, sansCouleur);
    Promise.all(Object.entries(urls).map(([k, u]) => charge(u).then((tex) => [k, tex])))
      .then((liste) => {
        if (fini) return;
        liste.forEach(([k, tex]) => {
          mat[k]?.dispose();
          mat[k] = regler(tex.clone(), k, repeat);
        });
        mat.needsUpdate = true;
        setVersion((v) => v + 1);
      })
      .catch(() => {});
    return () => {
      fini = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- une fois par matière
  }, [mat, def]);
  return mat;
}

function canevas(l, h, dessin) {
  const c = document.createElement('canvas');
  c.width = l;
  c.height = h;
  dessin(c.getContext('2d'), l, h);
  return c;
}

/** Hauteurs → carte de normales. */
function versNormales(c, force = 2) {
  const g = c.getContext('2d');
  const { width: L, height: H } = c;
  const src = g.getImageData(0, 0, L, H).data;
  const h = (x, y) => src[(((y + H) % H) * L + ((x + L) % L)) * 4] / 255;
  const out = g.createImageData(L, H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < L; x++) {
      const nx = (h(x - 1, y) - h(x + 1, y)) * force;
      const ny = (h(x, y - 1) - h(x, y + 1)) * force;
      const n = Math.hypot(nx, ny, 1);
      const i = (y * L + x) * 4;
      out.data[i] = ((nx / n) * 0.5 + 0.5) * 255;
      out.data[i + 1] = ((ny / n) * 0.5 + 0.5) * 255;
      out.data[i + 2] = (1 / n) * 0.5 * 255 + 127;
      out.data[i + 3] = 255;
    }
  g.putImageData(out, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

let _molette;
/** Moletage en losanges des barres et poignées. */
export function moletage() {
  if (_molette) return _molette;
  const c = canevas(256, 256, (g, L, H) => {
    g.fillStyle = '#000';
    g.fillRect(0, 0, L, H);
    g.strokeStyle = '#fff';
    g.lineWidth = 6;
    for (let i = -L; i < L * 2; i += 32) {
      g.beginPath();
      g.moveTo(i, 0);
      g.lineTo(i + H, H);
      g.stroke();
      g.beginPath();
      g.moveTo(i, H);
      g.lineTo(i + H, 0);
      g.stroke();
    }
  });
  _molette = versNormales(c, 3);
  _molette.repeat.set(10, 2);
  return _molette;
}

let _grain;
/** Grain très fin et mat de la peau des mannequins (comme un plâtre poncé). */
export function grain() {
  if (_grain) return _grain;
  const c = canevas(256, 256, (g, L, H) => {
    const img = g.createImageData(L, H);
    for (let i = 0; i < L * H; i++) {
      const v = 110 + Math.random() * 40;
      img.data.set([v, v, v, 255], i * 4);
    }
    g.putImageData(img, 0, 0);
    g.filter = 'blur(1px)';
    g.drawImage(g.canvas, 0, 0);
  });
  _grain = versNormales(c, 1.2);
  _grain.repeat.set(6, 6);
  return _grain;
}

/** Marquage blanc sur fond transparent (poids des disques, des kettlebells…). */
export function marquage(texte, { taille = 90, police = '"Anton", Impact, sans-serif', couleur = '#f2f2ee' } = {}) {
  const c = canevas(256, 128, (g, L, H) => {
    g.fillStyle = couleur;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = `${taille}px ${police}`;
    g.fillText(texte, L / 2, H / 2 + 4);
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

let _coutures;
/** Coutures en pointillés, le long des bords d'une sellerie. */
export function coutures() {
  if (_coutures) return _coutures;
  const c = canevas(512, 128, (g, L, H) => {
    g.clearRect(0, 0, L, H);
    g.strokeStyle = 'rgba(210,200,185,0.85)';
    g.lineWidth = 3;
    g.setLineDash([10, 7]);
    g.strokeRect(10, 10, L - 20, H - 20);
  });
  _coutures = new THREE.CanvasTexture(c);
  _coutures.colorSpace = THREE.SRGBColorSpace;
  return _coutures;
}

let _brosse;
/** Métal brossé : stries fines dans un seul sens (relief et rugosité). */
export function brosse() {
  if (_brosse) return _brosse;
  const c = canevas(512, 512, (g, L, H) => {
    g.fillStyle = '#808080';
    g.fillRect(0, 0, L, H);
    for (let i = 0; i < 2600; i++) {
      const y = Math.random() * H;
      const v = 90 + Math.random() * 80;
      g.fillStyle = `rgb(${v},${v},${v})`;
      g.globalAlpha = 0.5;
      g.fillRect(0, y, L, 0.6 + Math.random() * 1.2);
    }
  });
  _brosse = { normal: versNormales(c, 1.2), rugosite: new THREE.CanvasTexture(c) };
  _brosse.rugosite.wrapS = _brosse.rugosite.wrapT = THREE.RepeatWrapping;
  return _brosse;
}

let _trous;
/** Montant de rack : rangée de trous percés tous les 5 cm, numérotés (carte de couleur, fond blanc = peinture). */
export function trousRack() {
  if (_trous) return _trous;
  const c = canevas(64, 1024, (g, L, H) => {
    g.fillStyle = '#fff';
    g.fillRect(0, 0, L, H);
    for (let i = 0; i < 46; i++) {
      const y = 70 + i * 20;
      g.fillStyle = '#050505';
      g.beginPath();
      g.arc(L / 2, y, 5, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = 'rgba(255,255,255,0.0)';
      if (i % 2 === 0) {
        g.fillStyle = '#9a9a9a';
        g.font = 'bold 9px sans-serif';
        g.textAlign = 'left';
        g.fillText(String(46 - i), L / 2 + 9, y + 3);
      }
    }
  });
  _trous = new THREE.CanvasTexture(c);
  _trous.colorSpace = THREE.SRGBColorSpace;
  _trous.anisotropy = 8;
  return _trous;
}
