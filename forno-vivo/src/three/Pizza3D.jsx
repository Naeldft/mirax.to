import { useFrame } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { crustTopTexture, doughTexture, rand, sauceTexture, woodTexture } from './textures';
import { TOPPINGS, placements } from './toppings';

export const PIZZA_R = 1.5;
const SAUCE_R = 1.24;
const BASE_TOP = 0.055;
const CALZONE_R = 1.12;
const CALZONE_TOP = 0.56;

const OUT = 0.32; // durée de la sortie des garnitures (s)
const IN = 0.75; // durée de l'arrivée (s)

const easeOutBack = (t) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);
const easeIn = (t) => t * t * t;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t) => Math.min(1, Math.max(0, t));

/** Pâte ronde : profil tourné (bordure gonflée = "cornicione"). */
const useRoundBase = (quality) =>
  useMemo(() => {
    const pts = [
      [0, 0],
      [1.2, 0],
      [1.33, 0.015],
      [1.43, 0.055],
      [1.5, 0.12],
      [1.49, 0.19],
      [1.43, 0.235],
      [1.34, 0.225],
      [1.27, 0.17],
      [1.235, 0.1],
      [1.2, 0.06],
      [1.05, BASE_TOP],
      [0, BASE_TOP],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const geo = new THREE.LatheGeometry(pts, quality === 'low' ? 40 : 72);
    // petites irrégularités de la bordure (pâte façonnée à la main)
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      const r = Math.hypot(x, z);
      if (r > 1.22) {
        const a = Math.atan2(z, x);
        const k = 1 + 0.018 * Math.sin(a * 5 + 1.3) + 0.012 * Math.sin(a * 11);
        p.setX(i, x * k);
        p.setZ(i, z * k);
        p.setY(i, p.getY(i) * (1 + 0.08 * Math.sin(a * 7 + 0.5)));
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, [quality]);

/** Calzone : demi-lune gonflée, posée à plat. */
const useCalzoneBase = () =>
  useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-CALZONE_R, 0);
    s.absarc(0, 0, CALZONE_R, Math.PI, 0, true);
    s.lineTo(-CALZONE_R, 0);
    const bevel = 0.26;
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: 0.3,
      bevelSegments: 8,
      curveSegments: 40,
    });
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, bevel, CALZONE_R * 0.42);
    // UV recalculées à partir de la position : texture sans étirement sur les côtés bombés
    const p = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) * 0.45 + p.getY(i) * 0.25, p.getZ(i) * 0.45 + p.getY(i) * 0.25);
    geo.computeVertexNormals();
    return geo;
  }, []);

/** Positions des garnitures pour une pizza. */
const buildLayout = (pizza) => {
  const chausson = pizza.forme === 'chausson';
  return pizza.garnitures.map((gar, gi) => {
    const def = TOPPINGS[gar.type];
    const seed = 11 + gi * 37 + pizza.id.length * 5;
    let pts;
    if (def.center) pts = [{ x: 0, z: 0, rot: 0, s: 0.5, t1: 0, t2: 0 }];
    else if (chausson) {
      // répartis sur le dessus du chausson (ellipse intérieure à la demi-lune)
      pts = placements(gar.n, seed, [0.05, 1]).map((p) => ({ ...p, x: p.x * 0.8, z: CALZONE_R * 0.42 - (0.55 + p.z * 0.32) }));
    } else pts = placements(gar.n, seed, def.r);
    const baseY = chausson ? CALZONE_TOP : BASE_TOP + 0.02;
    return { type: gar.type, def, pts, baseY, layer: gi };
  });
};

const m4 = new THREE.Matrix4();
const q = new THREE.Quaternion();
const e = new THREE.Euler();
const v = new THREE.Vector3();
const sc = new THREE.Vector3();

/** Une famille de garnitures (InstancedMesh). */
function Toppings({ group, quality, anim, index, total }) {
  const ref = useRef();
  const { def, pts, baseY } = group;
  const geo = useMemo(() => def.geo(quality), [def, quality]);
  const mat = useMemo(() => def.mat(), [def]);

  const write = (outT, inT) => {
    const mesh = ref.current;
    if (!mesh) return;
    pts.forEach((p, i) => {
      const size = def.size[0] + (def.size[1] - def.size[0]) * p.s;
      // arrivée : chute avec léger rebond, décalée par garniture
      const delay = ((index / Math.max(1, total)) * 0.35 + (i / pts.length) * 0.25) * IN;
      const tin = clamp01((inT - delay) / (IN * 0.55));
      const drop = (1 - easeOut(tin)) * 0.9;
      const grow = inT >= 1 ? 1 : Math.max(0.001, easeOutBack(tin));
      // sortie : elles se soulèvent et rétrécissent
      const to = easeIn(clamp01(outT));
      const lift = to * 0.6;
      const shrink = 1 - to;
      const k = size * grow * Math.max(0.001, shrink);
      v.set(p.x, baseY + def.y + drop + lift + group.layer * 0.004, p.z);
      e.set(def.flat ? Math.PI / 2 + p.t1 * 0.3 : (def.tilt ?? 0) * p.t1, p.rot, def.flat ? 0 : (def.tilt ?? 0) * p.t2);
      q.setFromEuler(e);
      sc.set(k * def.scale[0], k * def.scale[1], k * def.scale[2]);
      m4.compose(v, q, sc);
      mesh.setMatrixAt(i, m4);
    });
    mesh.instanceMatrix.needsUpdate = true;
  };

  useLayoutEffect(() => {
    write(anim.current.phase === 'out' ? 0 : 0, anim.current.phase === 'in' ? 0 : 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pts]);

  useFrame(() => {
    const a = anim.current;
    if (a.phase === 'idle' && a.written === group) return;
    write(a.phase === 'out' ? a.t / OUT : 0, a.phase === 'in' ? a.t / IN : 1);
    if (a.phase === 'idle') a.written = group;
  });

  return <instancedMesh ref={ref} args={[geo, mat, pts.length]} castShadow={quality === 'high'} />;
}

/**
 * Pizza 3D animée.
 *  pizza   : objet de src/data/pizzas.js
 *  spin    : vitesse de rotation (radians/s), 0 pour une pizza fixe
 *  reduced : animations réduites (prefers-reduced-motion) → changements instantanés
 */
export function Pizza3D({ pizza, quality = 'high', spin = 0.22, reduced = false, board = true, onSettled }) {
  const [shown, setShown] = useState(pizza);
  const group = useRef();
  const baseRound = useRef();
  const baseCalzone = useRef();
  const sauce = useRef();
  const anim = useRef({ phase: 'idle', t: 0, from: pizza, to: pizza });
  const roundGeo = useRoundBase(quality);
  const calzoneGeo = useCalzoneBase();
  const dough = useMemo(() => doughTexture(quality === 'low' ? 256 : 512), [quality]);
  const crust = useMemo(() => crustTopTexture(), []);
  const wood = useMemo(() => woodTexture(), []);
  const layout = useMemo(() => buildLayout(shown), [shown]);
  const sauceMap = useMemo(() => sauceTexture(shown.sauce), [shown.sauce]);

  // Changement de pizza demandé
  useEffect(() => {
    if (pizza.id === anim.current.to.id) return;
    if (reduced) {
      anim.current = { phase: 'idle', t: 0, from: pizza, to: pizza };
      setShown(pizza);
      return;
    }
    anim.current = { phase: 'out', t: 0, from: shown, to: pizza };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pizza, reduced]);

  useFrame((_, dt) => {
    const d = Math.min(dt, 1 / 20);
    const a = anim.current;
    if (group.current && spin) group.current.rotation.y += d * spin;
    let roundS = shown.forme === 'chausson' ? 0 : 1;
    let calzS = shown.forme === 'chausson' ? 1 : 0;
    let sauceS = 1;
    if (a.phase === 'out') {
      a.t += d;
      const t = easeIn(clamp01(a.t / OUT));
      const changes = (a.from.forme === 'chausson') !== (a.to.forme === 'chausson');
      if (changes) {
        if (a.from.forme === 'chausson') calzS = 1 - t;
        else roundS = 1 - t;
      }
      sauceS = 1 - t * 0.7;
      if (a.t >= OUT) {
        a.phase = 'in';
        a.t = 0;
        setShown(a.to);
      }
    } else if (a.phase === 'in') {
      a.t += d;
      const t = clamp01(a.t / (IN * 0.6));
      const back = easeOutBack(t);
      if (a.to.forme === 'chausson') calzS = back;
      else roundS = a.from.forme === 'chausson' ? back : 1;
      sauceS = 0.3 + 0.7 * easeOut(t);
      if (group.current) group.current.rotation.y += d * 2.2 * (1 - clamp01(a.t / IN)); // petit tour de présentation
      if (a.t >= IN) {
        a.phase = 'idle';
        a.from = a.to;
        onSettled?.();
      }
    }
    if (baseRound.current) baseRound.current.scale.setScalar(Math.max(0.001, roundS));
    if (baseCalzone.current) baseCalzone.current.scale.setScalar(Math.max(0.001, calzS));
    if (sauce.current) sauce.current.scale.set(sauceS, 1, sauceS);
  });

  const chausson = shown.forme === 'chausson';
  // crans de fermeture du calzone
  const crimps = useMemo(() => {
    const out = [];
    for (let i = 0; i <= 20; i++) {
      const a = Math.PI * (i / 20);
      out.push([Math.cos(a) * (CALZONE_R + 0.27), 0.2, CALZONE_R * 0.42 - Math.sin(a) * (CALZONE_R + 0.27), rand(i)]);
    }
    return out;
  }, []);

  return (
    <group>
      {board && (
        <group position={[0, -0.06, 0]}>
          <mesh receiveShadow>
            <cylinderGeometry args={[1.82, 1.82, 0.08, quality === 'low' ? 40 : 72]} />
            <meshStandardMaterial map={wood} roughness={0.8} color="#c79a6b" />
          </mesh>
        </group>
      )}
      <group ref={group}>
        <mesh ref={baseRound} geometry={roundGeo} castShadow receiveShadow visible={!chausson || anim.current.phase !== 'idle'}>
          <meshStandardMaterial map={dough} roughness={0.78} />
        </mesh>
        <mesh ref={sauce} position={[0, BASE_TOP + 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]} visible={!chausson}>
          <circleGeometry args={[SAUCE_R, quality === 'low' ? 32 : 64]} />
          <meshStandardMaterial map={sauceMap} transparent alphaTest={0.5} roughness={0.42} />
        </mesh>
        <group ref={baseCalzone} scale={chausson ? 1 : 0.001}>
          <mesh geometry={calzoneGeo} castShadow receiveShadow>
            <meshStandardMaterial map={crust} roughness={0.75} />
          </mesh>
          {crimps.map(([x, y, z, r], i) => (
            <mesh key={i} position={[x, y, z]} scale={[0.13, 0.1 + r * 0.03, 0.13]}>
              <sphereGeometry args={[1, 10, 8]} />
              <meshStandardMaterial color="#c88c47" roughness={0.8} />
            </mesh>
          ))}
          {/* touche de sauce sur le dessus */}
          <mesh position={[0, CALZONE_TOP + 0.005, CALZONE_R * 0.42 - 0.6]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.55, 0.32, 1]}>
            <circleGeometry args={[1, 32]} />
            <meshStandardMaterial map={sauceTexture('tomate')} transparent alphaTest={0.5} roughness={0.4} />
          </mesh>
        </group>
        {layout.map((g, i) => (
          <Toppings key={shown.id + g.type} group={g} quality={quality} anim={anim} index={i} total={layout.length} />
        ))}
      </group>
    </group>
  );
}
