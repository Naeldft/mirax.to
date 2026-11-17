import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { alea } from './bruit.js';
import * as G from './ingredients.js';

/* ------------------------------------------------------------------
   Un burger 3D construit couche par couche d'après sa recette (du bas vers le haut).
   Textures calculées (scripts/textures-burger.py) : couleur + relief/rugosité, en 1 024 (ordinateur) ou 512 (téléphone).
   - assemblage (ref 0 → 1) : les couches tombent une à une et s'empilent, petit rebond, le fromage est déjà fondu.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const NOMS = ['pain', 'pain-paprika', 'mie', 'talon', 'talon-paprika', 'steak', 'cheddar', 'salade', 'tomate', 'cornichon', 'bacon'];

/** Hauteur de chaque couche (m), pour l'empilement. */
const HAUTEUR = { talon: 0.021, sauce: 0.0004, salade: 0.0035, tomate: 0.0058, steak: 0.0078, cheddar: 0.0006, oignon: 0.0026, cornichons: 0.0026, bacon: 0.004, pain: 0 };

function useTextures(def) {
  const urls = useMemo(() => {
    const u = {};
    NOMS.forEach((n) => {
      u[`${n}:c`] = `${BASE}scene3d/tex/${n}-couleur-${def}.webp`;
      u[`${n}:rm`] = `${BASE}scene3d/tex/${n}-rm-${def}.webp`;
    });
    return u;
  }, [def]);
  const t = useTexture(urls);
  return useMemo(() => {
    const o = {};
    Object.entries(t).forEach(([k, tex]) => {
      const [n, type] = k.split(':');
      tex.wrapS = THREE.RepeatWrapping;
      tex.anisotropy = 8;
      if (type === 'c') tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      (o[n] ||= {})[type] = tex;
    });
    return o;
  }, [t]);
}

const phys = (o) => new THREE.MeshPhysicalMaterial(o);
const BRUT = typeof location !== 'undefined' && location.search.includes('brut');
const texMat = (t, o) => (BRUT ? new THREE.MeshBasicMaterial({ map: t.c, side: o.side }) : phys({ map: t.c, roughnessMap: t.rm, bumpMap: t.rm, roughness: 1, ...o }));

function useMateriaux(def) {
  const t = useTextures(def);
  return useMemo(
    () => ({
      pain: texMat(t.pain, { bumpScale: 1.6, clearcoat: 0.6, clearcoatRoughness: 0.25, envMapIntensity: 0.9 }),
      painPaprika: texMat(t['pain-paprika'], { bumpScale: 1.6, clearcoat: 0.45, clearcoatRoughness: 0.32, sheen: 0.3, sheenColor: new THREE.Color('#ffb090') }),
      mie: texMat(t.mie, { bumpScale: 2.5, envMapIntensity: 0.5 }),
      talon: texMat(t.talon, { bumpScale: 1.4 }),
      talonPaprika: texMat(t['talon-paprika'], { bumpScale: 1.4 }),
      steak: texMat(t.steak, { bumpScale: 5, clearcoat: 0.35, clearcoatRoughness: 0.45, envMapIntensity: 0.8 }),
      cheddar: texMat(t.cheddar, { bumpScale: 0.6, clearcoat: 0.5, clearcoatRoughness: 0.25, sheen: 0.5, sheenColor: new THREE.Color('#ffd27a'), emissive: new THREE.Color('#5a2400'), emissiveIntensity: 0.25, side: THREE.DoubleSide }),
      salade: texMat(t.salade, { bumpScale: 1.5, clearcoat: 0.35, clearcoatRoughness: 0.3, sheen: 0.6, sheenColor: new THREE.Color('#e4ffb0'), emissive: new THREE.Color('#1c3a08'), emissiveIntensity: 0.35, side: THREE.DoubleSide }),
      tomate: [
        phys({ color: '#b41c10', roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.12 }),
        texMat(t.tomate, { bumpScale: 1.2, clearcoat: 1, clearcoatRoughness: 0.08, emissive: new THREE.Color('#4a0800'), emissiveIntensity: 0.25 }),
        texMat(t.tomate, { bumpScale: 1.2 }),
      ],
      cornichon: [
        phys({ color: '#4d5f1e', roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1 }),
        texMat(t.cornichon, { bumpScale: 1, clearcoat: 1, clearcoatRoughness: 0.08, emissive: new THREE.Color('#1a2205'), emissiveIntensity: 0.3 }),
        texMat(t.cornichon, { bumpScale: 1 }),
      ],
      bacon: texMat(t.bacon, { bumpScale: 2, clearcoat: 0.6, clearcoatRoughness: 0.25, side: THREE.DoubleSide }),
      oignon: phys({ color: '#efdce9', roughness: 0.3, clearcoat: 0.9, clearcoatRoughness: 0.15, sheen: 0.6, sheenColor: new THREE.Color('#ffffff'), emissive: new THREE.Color('#3a1030'), emissiveIntensity: 0.2 }),
      oignonPeau: phys({ color: '#7a1f55', roughness: 0.3, clearcoat: 0.9, clearcoatRoughness: 0.15 }),
      sesame: phys({ color: '#f1dfb4', roughness: 0.45, clearcoat: 0.4, clearcoatRoughness: 0.3 }),
    }),
    [t],
  );
}

/** Sauce : nappe brillante qui coule sur les bords. */
function Sauce({ couleur, graine }) {
  const geo = useMemo(() => G.sauce({ graine }), [graine]);
  const mat = useMemo(() => phys({ color: couleur, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.04, side: THREE.DoubleSide, emissive: new THREE.Color(couleur).multiplyScalar(0.08) }), [couleur]);
  return <mesh geometry={geo} material={mat} castShadow receiveShadow />;
}

function Sesame({ geo, mat, n }) {
  const ref = useRef();
  const points = useMemo(() => G.semis(geo, n, 3), [geo, n]);
  useLayoutEffect(() => {
    const o = new THREE.Object3D();
    points.forEach(([p, nrm], i) => {
      o.position.copy(p).addScaledVector(nrm, 0.0005);
      o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), nrm);
      o.rotateY(alea(i, 9) * Math.PI * 2);
      o.scale.set(0.0012, 0.0006, 0.0021);
      o.updateMatrix();
      ref.current.setMatrixAt(i, o.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [points]);
  return (
    <instancedMesh ref={ref} args={[undefined, mat, points.length]} castShadow>
      <sphereGeometry args={[1, 10, 6]} />
    </instancedMesh>
  );
}

function Oignons({ m, graine }) {
  const tranches = useMemo(
    () =>
      [0, 1].map((k) => ({
        x: (k ? 1 : -1) * (0.012 + alea(k, graine) * 0.012),
        z: (alea(k + 4, graine) - 0.5) * 0.03,
        anneaux: [0.013, 0.019, 0.025, 0.031].map((r, i) => ({ r, arc: Math.PI * (1.2 + alea(i + k * 7, graine) * 0.8), rot: alea(i + 11, graine) * 6.3 })),
      })),
    [graine],
  );
  return tranches.map((t, k) => (
    <group key={k} position={[t.x, 0.0012, t.z]} rotation={[0, alea(k, 3) * 6, 0]}>
      {t.anneaux.map((a, i) => (
        <group key={i} rotation={[Math.PI / 2, 0, a.rot]} scale={[1, 1, 0.55]}>
          <mesh material={m.oignon} castShadow>
            <torusGeometry args={[a.r, 0.0019, 8, 72, a.arc]} />
          </mesh>
          <mesh material={m.oignonPeau}>
            <torusGeometry args={[a.r + 0.0017, 0.0005, 6, 72, a.arc]} />
          </mesh>
        </group>
      ))}
    </group>
  ));
}

function Cornichons({ m, graine, n = 5 }) {
  const geo = useMemo(() => G.cornichon(), []);
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + alea(i, graine);
    const r = 0.02 + alea(i + 3, graine) * 0.028;
    return <mesh key={i} geometry={geo} material={m.cornichon} position={[Math.cos(a) * r, i * 0.0003, Math.sin(a) * r]} rotation={[(alea(i + 5, graine) - 0.5) * 0.15, alea(i, 2) * 6, (alea(i + 6, graine) - 0.5) * 0.15]} castShadow receiveShadow />;
  });
}

function Tomates({ m }) {
  return [
    [-0.02, 0.012, 0.02],
    [0.021, 0.006, -0.03],
    [0.0, -0.024, 0.015],
  ].map(([x, z, tilt], i) => (
    <mesh key={i} material={m.tomate} position={[x, 0.003 + i * 0.0005, z]} rotation={[tilt, i * 2, -tilt]} castShadow receiveShadow>
      <cylinderGeometry args={[0.034, 0.034, 0.0058, 64, 1]} />
    </mesh>
  ));
}

function Bacon({ m, graine }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.11, 0.026, 60, 6);
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      p.setY(i, 0.0025 * Math.sin(x * 120) + 0.001 * Math.sin(x * 260 + p.getZ(i) * 200));
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return [0, 1].map((i) => <mesh key={i} geometry={geo} material={m.bacon} position={[0, 0.002 + i * 0.002, (i - 0.5) * 0.024]} rotation={[0, (i - 0.5) * 0.4 + alea(i, graine) * 0.3, 0]} castShadow receiveShadow />);
}

/** Couches de la recette → éléments 3D, avec leur hauteur d'empilement. */
function useCouches(recette, m) {
  const geos = useMemo(
    () => ({
      pain: G.painDessus(),
      coupeHaut: G.coupe(G.RP * 0.93, false),
      talon: G.talon(),
      coupeBas: G.coupe(G.RP * 0.93, true),
      steak: [G.steak({ graine: 4 }), G.steak({ graine: 14 })],
      salade: [G.salade({ graine: 10 }), G.salade({ graine: 20, r: 0.062 })],
      fromage: [G.fromage({ graine: 6, angle: 0.3, steakGraine: 4 }), G.fromage({ graine: 16, angle: 1.1, steakGraine: 14 })],
    }),
    [],
  );
  return useMemo(() => {
    let y = 0;
    let nSteak = 0;
    let nFromage = 0;
    return recette.map((c, i) => {
      const paprika = c.paprika;
      let el = null;
      let h = HAUTEUR[c.t] ?? 0.003;
      switch (c.t) {
        case 'talon':
          el = (
            <>
              <mesh geometry={geos.talon} material={paprika ? m.talonPaprika : m.talon} castShadow receiveShadow />
              <mesh geometry={geos.coupeBas} material={m.mie} position-y={0.021} receiveShadow />
            </>
          );
          break;
        case 'sauce':
          el = <Sauce couleur={c.couleur} graine={i * 3 + 1} />;
          break;
        case 'salade':
          el = <mesh geometry={geos.salade[i % 2]} material={m.salade} castShadow receiveShadow />;
          break;
        case 'tomate':
          el = <Tomates m={m} />;
          break;
        case 'steak': {
          const g = geos.steak[nSteak++ % 2];
          el = <mesh geometry={g} material={m.steak} castShadow receiveShadow rotation-y={nSteak * 1.7} />;
          break;
        }
        case 'cheddar': {
          const k = nFromage++ % 2;
          // le fromage suit le contour du steak juste en dessous (même rotation)
          el = <mesh geometry={geos.fromage[k]} material={m.cheddar} castShadow receiveShadow rotation-y={(k + 1) * 1.7} />;
          y -= 0.0002;
          break;
        }
        case 'oignon':
          el = <Oignons m={m} graine={i} />;
          break;
        case 'cornichons':
          el = <Cornichons m={m} graine={i} />;
          break;
        case 'bacon':
          el = <Bacon m={m} graine={i} />;
          break;
        case 'pain':
          el = (
            <>
              <mesh geometry={geos.pain} material={paprika ? m.painPaprika : m.pain} castShadow receiveShadow />
              <mesh geometry={geos.coupeHaut} material={m.mie} position-y={0.0004} />
              {!paprika && <Sesame geo={geos.pain} mat={m.sesame} n={c.sesame ?? 90} />}
            </>
          );
          break;
        default:
      }
      const couche = { el, y, h, t: c.t };
      y += h;
      return couche;
    });
  }, [recette, m, geos]);
}

/** Vapeur légère qui monte du steak. */
function Vapeur({ n = 7, hauteur = 0.05 }) {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    for (let i = 0; i < 14; i++) {
      const x = 40 + Math.random() * 48;
      const y = 40 + Math.random() * 48;
      const r = 18 + Math.random() * 26;
      const d = g.createRadialGradient(x, y, 0, x, y, r);
      d.addColorStop(0, 'rgba(255,255,255,0.22)');
      d.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = d;
      g.fillRect(0, 0, 128, 128);
    }
    const t = new THREE.CanvasTexture(c);
    return t;
  }, []);
  const refs = useRef([]);
  const brins = useMemo(() => Array.from({ length: n }, (_, i) => ({ x: (alea(i, 4) - 0.5) * 0.08, z: (alea(i, 5) - 0.5) * 0.05, v: 0.5 + alea(i, 6) * 0.5, d: alea(i, 7) })), [n]);
  useFrame(({ clock }) => {
    brins.forEach((b, i) => {
      const s = refs.current[i];
      if (!s) return;
      const t = (clock.elapsedTime * 0.16 * b.v + b.d) % 1;
      s.position.set(b.x + Math.sin(t * 5 + i) * 0.006, hauteur * 0.4 + t * hauteur * 2.2, b.z);
      const k = 0.03 + t * 0.07;
      s.scale.set(k, k * 1.3, 1);
      s.material.opacity = Math.sin(t * Math.PI) * 0.22;
    });
  });
  return brins.map((b, i) => (
    <sprite key={i} ref={(el) => (refs.current[i] = el)} renderOrder={10}>
      <spriteMaterial map={tex} transparent depthWrite={false} opacity={0} color="#fff4e6" />
    </sprite>
  ));
}

/**
 * <Burger recette={...} assemblage={ref} def="hd" />
 * Le burger est centré sur (0, 0, 0), sa base posée à y = 0.
 */
export default function Burger({ recette, assemblage, def = 'hd', vapeur = true }) {
  const m = useMateriaux(def);
  const couches = useCouches(recette, m);
  const refs = useRef([]);
  const haut = couches[couches.length - 1]?.y ?? 0.06;
  useFrame(() => {
    const a = assemblage ? assemblage.current : 1;
    const n = couches.length;
    couches.forEach((c, i) => {
      const el = refs.current[i];
      if (!el) return;
      // chaque couche tombe à son tour (0 → 1), avec un petit rebond à l'arrivée
      const t = Math.min(1, Math.max(0, a * (n + 1.5) - i * 0.92));
      const r = t >= 1 ? 1 : 1 + 2.7 * Math.pow(t - 1, 3) + 1.7 * Math.pow(t - 1, 2);
      el.position.y = c.y + (1 - r) * (0.07 + i * 0.016);
      el.visible = t > 0;
      el.rotation.y = (1 - r) * (i % 2 ? 0.6 : -0.6);
    });
  });
  return (
    <group>
      {couches.map((c, i) => (
        <group key={i} ref={(el) => (refs.current[i] = el)} position-y={c.y}>
          {c.el}
        </group>
      ))}
      {vapeur && <Vapeur hauteur={haut} />}
    </group>
  );
}
