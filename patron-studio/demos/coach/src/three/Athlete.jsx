import { useMemo } from 'react';
import * as THREE from 'three';
import { teteSculptee } from '@demos/shared/three/mannequin.js';

/* ------------------------------------------------------------------
   Athlète de la salle : un mannequin de vitrine haut de gamme en pied, articulé, construit en code.
   Peau lisse et mate (sable), tenue de sport unie (débardeur et legging graphite, liseré vert acide de la marque).
   La pose est donnée en angles (radians) : on la décrit articulation par articulation.
   Repère : regarde vers +z, origine au sol entre les pieds.
------------------------------------------------------------------- */

const PEAU = '#bba185';
const TENUE = '#26262a';
const ACIDE = '#c6ff3d';

/** Pose debout par défaut ; chaque pose ne précise que ce qui change. */
const DEBOUT = {
  bassinY: 0.92,
  bassinX: 0, // inclinaison du buste vers l'avant (autour de x)
  buste: 0,
  tete: 0,
  hanches: [0, 0], // flexion de la cuisse vers l'avant (gauche, droite)
  ecart: [0.06, 0.06], // ouverture des jambes sur le côté
  genoux: [0, 0],
  epaules: [0.1, 0.1], // bras vers l'avant
  ouverture: [0.12, 0.12], // bras sur le côté
  coudes: [0.15, 0.15],
};

function Membre({ long, rayon, rayonBas, material }) {
  // un segment de membre : capsule légèrement fuselée, accroché en haut, pendant vers le bas
  const geo = useMemo(() => {
    const g = new THREE.CapsuleGeometry(rayon, long, 8, 20);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const t = THREE.MathUtils.clamp((long / 2 - y) / long, 0, 1);
      const k = 1 + ((rayonBas ?? rayon) / rayon - 1) * t;
      pos.setX(i, pos.getX(i) * k);
      pos.setZ(i, pos.getZ(i) * k);
    }
    g.computeVertexNormals();
    g.translate(0, -long / 2, 0);
    return g;
  }, [long, rayon, rayonBas]);
  return <mesh geometry={geo} material={material} castShadow />;
}

export default function Athlete({ pose = {}, homme = false, tenue = TENUE, objets }) {
  const p = { ...DEBOUT, ...pose };
  const m = useMemo(
    () => ({
      peau: new THREE.MeshStandardMaterial({ color: PEAU, roughness: 0.82, envMapIntensity: 0.25 }),
      tenue: new THREE.MeshStandardMaterial({ color: tenue, roughness: 0.7, envMapIntensity: 0.3 }),
      acide: new THREE.MeshBasicMaterial({ color: ACIDE, toneMapped: false }),
    }),
    [tenue],
  );
  const geoTete = useMemo(() => teteSculptee(homme), [homme]);
  const k = homme ? 1.06 : 1;
  const torse = useMemo(() => {
    // le buste : profil tourné (taille fine, poitrine, épaules), aplati d'avant en arrière
    const prof = [
      [0.001, 0],
      [0.13, 0.0],
      [0.125, 0.08],
      [0.118, 0.18],
      [0.14, 0.3],
      [0.16, 0.4],
      [0.15, 0.47],
      [0.07, 0.52],
      [0.001, 0.53],
    ].map(([r, y]) => new THREE.Vector2(r * k, y * k));
    const g = new THREE.LatheGeometry(prof, 48);
    g.scale(homme ? 1.32 : 1.22, 1, 0.72);
    return g;
  }, [homme, k]);
  const bassin = useMemo(() => {
    const g = new THREE.SphereGeometry(0.15 * k, 32, 16);
    g.scale(homme ? 1.15 : 1.22, 0.75, 0.85);
    return g;
  }, [homme, k]);

  const jambe = (i, s) => (
    <group key={`j${s}`} position={[s * 0.095 * k, 0, 0]} rotation={[-p.hanches[i], 0, s * p.ecart[i]]}>
      <mesh material={m.tenue}>
        <sphereGeometry args={[0.075 * k, 20, 12]} />
      </mesh>
      <Membre long={0.4 * k} rayon={0.07 * k} rayonBas={0.05 * k} material={m.tenue} />
      <group position={[0, -0.42 * k, 0]} rotation-x={p.genoux[i]}>
        {/* genou : une rotule douce qui lie cuisse et tibia */}
        <mesh material={m.tenue}>
          <sphereGeometry args={[0.053 * k, 20, 12]} />
        </mesh>
        <Membre long={0.4 * k} rayon={0.05 * k} rayonBas={0.035 * k} material={m.tenue} />
        {/* pied, en chaussure de sport */}
        <group position={[0, -0.43 * k, 0.04]} rotation-x={-p.genoux[i] + p.hanches[i]}>
          <mesh material={m.tenue} scale={[0.85, 0.55, 2.0]}>
            <sphereGeometry args={[0.05 * k, 20, 12]} />
          </mesh>
          <mesh material={m.acide} position={[0, -0.02, 0]} scale={[0.9, 0.12, 2.05]}>
            <sphereGeometry args={[0.05 * k, 20, 8]} />
          </mesh>
        </group>
      </group>
    </group>
  );
  const bras = (i, s) => (
    <group key={`b${s}`} position={[s * (homme ? 0.2 : 0.18) * k, 0.45 * k, 0]} rotation={[-p.epaules[i], 0, s * p.ouverture[i]]}>
      <mesh material={m.peau}>
        <sphereGeometry args={[0.055 * k, 20, 12]} />
      </mesh>
      <Membre long={0.27 * k} rayon={0.045 * k} rayonBas={0.036 * k} material={m.peau} />
      <group position={[0, -0.29 * k, 0]} rotation-x={-p.coudes[i]}>
        <mesh material={m.peau}>
          <sphereGeometry args={[0.037 * k, 16, 10]} />
        </mesh>
        <Membre long={0.24 * k} rayon={0.035 * k} rayonBas={0.028 * k} material={m.peau} />
        <mesh material={m.peau} position={[0, -0.28 * k, 0]} scale={[0.75, 1.2, 0.5]}>
          <sphereGeometry args={[0.045 * k, 16, 10]} />
        </mesh>
        {objets?.[i] && <group position={[0, -0.3 * k, 0]}>{objets[i]}</group>}
      </group>
    </group>
  );

  return (
    <group>
      <group position={[0, p.bassinY * k, 0]}>
        <mesh geometry={bassin} material={m.tenue} />
        {[0, 1].map((i) => jambe(i, i === 0 ? -1 : 1))}
        {/* le haut du corps s'incline depuis le bassin */}
        <group rotation-x={p.bassinX}>
          <mesh geometry={torse} material={m.tenue} position={[0, 0.02, 0]} />
          {/* liseré vert acide de la tenue */}
          <mesh material={m.acide} position={[0, 0.06 * k, 0]} scale={[homme ? 1.33 : 1.23, 1, 0.73]}>
            <torusGeometry args={[0.126 * k, 0.004, 6, 48]} />
          </mesh>
          {[0, 1].map((i) => bras(i, i === 0 ? -1 : 1))}
          <mesh material={m.peau} position={[0, 0.57 * k, 0]}>
            <cylinderGeometry args={[0.045 * k, 0.052 * k, 0.11 * k, 24]} />
          </mesh>
          <group position={[0, 0.72 * k, 0.01]} rotation-x={p.tete} scale={1.05 * k}>
            <mesh geometry={geoTete} material={m.peau} />
          </group>
        </group>
      </group>
    </group>
  );
}

/* ---------- le matériel tenu en main ---------- */
export function Kettlebell({ poids = 1 }) {
  const fonte = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1b1b1e', roughness: 0.55, metalness: 0.6 }), []);
  return (
    <group scale={poids}>
      <mesh material={fonte} position={[0, -0.13, 0]}>
        <sphereGeometry args={[0.09, 32, 24]} />
      </mesh>
      <mesh material={fonte} position={[0, -0.03, 0]}>
        <torusGeometry args={[0.055, 0.013, 12, 32, Math.PI]} />
      </mesh>
    </group>
  );
}
