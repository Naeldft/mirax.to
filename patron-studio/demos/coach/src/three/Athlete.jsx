import { useMemo } from 'react';
import * as THREE from 'three';
import { teteSculptee } from '@demos/shared/three/mannequin.js';
import { grain, marquage } from '@demos/shared/three/materiaux.js';

/* ------------------------------------------------------------------
   Athlète de la salle : un mannequin de vitrine haut de gamme en pied, articulé, construit en code.
   Proportions humaines (7,5 têtes), musculature légèrement marquée (deltoïdes, pectoraux, quadriceps, mollets),
   matière mate à grain très fin (comme un plâtre poncé), tenue de sport en maille (débardeur et legging graphite,
   liseré vert acide de la marque). Pose figée comme une sculpture, au moment le plus beau du mouvement.
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

function Membre({ long, rayon, rayonBas, material, bombe = 0, pic = 0.35, arriere = 0 }) {
  // un segment de membre : capsule fuselée, accrochée en haut, pendant vers le bas,
  // avec le galbe d'un muscle (bombe : ampleur, pic : où il est le plus large, arriere : décalé vers l'arrière, mollet)
  const geo = useMemo(() => {
    const g = new THREE.CapsuleGeometry(rayon, long, 12, 28);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const t = THREE.MathUtils.clamp((long / 2 - y) / long, 0, 1);
      const galbe = bombe * Math.exp(-(((t - pic) / 0.26) ** 2));
      const z = pos.getZ(i);
      const k = (1 + ((rayonBas ?? rayon) / rayon - 1) * t) * (1 + galbe * (arriere ? 0.45 : 1));
      const kz = arriere && z < 0 ? k * (1 + galbe * arriere) : k;
      pos.setX(i, pos.getX(i) * k);
      pos.setZ(i, z * kz * 0.94);
    }
    g.computeVertexNormals();
    g.translate(0, -long / 2, 0);
    return g;
  }, [long, rayon, rayonBas, bombe, pic, arriere]);
  return <mesh geometry={geo} material={material} castShadow receiveShadow />;
}

export default function Athlete({ pose = {}, homme = false, tenue = TENUE, objets }) {
  const p = { ...DEBOUT, ...pose };
  const m = useMemo(
    () => ({
      // matière mate à grain fin, un très léger satiné (sheen) dans les contre-jours
      peau: new THREE.MeshPhysicalMaterial({ color: PEAU, roughness: 0.78, normalMap: grain(), normalScale: new THREE.Vector2(0.35, 0.35), sheen: 0.25, sheenRoughness: 0.8, sheenColor: '#fff1e0', envMapIntensity: 0.45 }),
      // maille technique : grain plus serré, reflets de tissu
      tenue: new THREE.MeshPhysicalMaterial({ color: tenue, roughness: 0.86, normalMap: grain(), normalScale: new THREE.Vector2(0.6, 0.6), sheen: 0.6, sheenRoughness: 0.5, sheenColor: '#77777e', envMapIntensity: 0.4 }),
      acide: new THREE.MeshBasicMaterial({ color: ACIDE, toneMapped: false }),
      chaussure: new THREE.MeshPhysicalMaterial({ color: '#1d1d20', roughness: 0.7, normalMap: grain(), sheen: 0.4, sheenColor: '#55555a' }),
      semelle: new THREE.MeshStandardMaterial({ color: '#e7e4dc', roughness: 0.6 }),
    }),
    [tenue],
  );
  const geoTete = useMemo(() => teteSculptee(homme), [homme]);
  const k = homme ? 1.06 : 1;
  const torse = useMemo(() => {
    // le buste : profil tourné (taille marquée, cage thoracique, poitrine, épaules), aplati d'avant en arrière
    const prof = (homme
      ? [[0.001, 0], [0.128, 0], [0.122, 0.07], [0.118, 0.15], [0.132, 0.24], [0.152, 0.33], [0.168, 0.41], [0.165, 0.47], [0.13, 0.515], [0.06, 0.535], [0.001, 0.54]]
      : [[0.001, 0], [0.132, 0], [0.12, 0.07], [0.108, 0.15], [0.12, 0.24], [0.14, 0.33], [0.152, 0.4], [0.148, 0.46], [0.11, 0.51], [0.05, 0.53], [0.001, 0.535]]
    ).map(([r, y]) => new THREE.Vector2(r * k, y * k));
    const g = new THREE.LatheGeometry(prof, 64);
    g.scale(homme ? 1.3 : 1.2, 1, 0.68);
    return g;
  }, [homme, k]);
  const bassin = useMemo(() => {
    const g = new THREE.SphereGeometry(0.15 * k, 40, 24);
    g.scale(homme ? 1.12 : 1.22, 0.72, 0.82);
    return g;
  }, [homme, k]);

  const jambe = (i, s) => (
    <group key={`j${s}`} position={[s * 0.092 * k, 0, 0]} rotation={[-p.hanches[i], 0, s * p.ecart[i]]}>
      <mesh material={m.tenue} castShadow>
        <sphereGeometry args={[0.078 * k, 24, 16]} />
      </mesh>
      {/* cuisse : quadriceps galbé, plus large au premier tiers */}
      <Membre long={0.41 * k} rayon={0.072 * k} rayonBas={0.046 * k} bombe={0.1} pic={0.3} material={m.tenue} />
      <group position={[0, -0.43 * k, 0]} rotation-x={p.genoux[i]}>
        {/* genou : une rotule douce qui lie cuisse et tibia */}
        <mesh material={m.tenue} castShadow>
          <sphereGeometry args={[0.049 * k, 20, 12]} />
        </mesh>
        {/* tibia : le mollet bombe vers l'arrière, la cheville s'affine */}
        <Membre long={0.4 * k} rayon={0.047 * k} rayonBas={0.027 * k} bombe={0.2} pic={0.25} arriere={0.6} material={m.tenue} />
        {/* pied, en chaussure de sport : tige, semelle claire, liseré */}
        <group position={[0, -0.44 * k, 0.035]} rotation-x={-p.genoux[i] + p.hanches[i]}>
          <mesh material={m.chaussure} scale={[0.82, 0.55, 2.1]} castShadow>
            <sphereGeometry args={[0.05 * k, 24, 14]} />
          </mesh>
          <mesh material={m.semelle} position={[0, -0.021, 0.004]} scale={[0.88, 0.16, 2.15]} castShadow>
            <sphereGeometry args={[0.05 * k, 24, 10]} />
          </mesh>
          <mesh material={m.acide} position={[0, -0.012, 0.004]} scale={[0.885, 0.03, 2.16]}>
            <sphereGeometry args={[0.05 * k, 24, 6]} />
          </mesh>
        </group>
      </group>
    </group>
  );
  const bras = (i, s) => (
    <group key={`b${s}`} position={[s * (homme ? 0.2 : 0.178) * k, 0.45 * k, 0]} rotation={[-p.epaules[i], 0, s * p.ouverture[i]]}>
      {/* deltoïde : une épaule pleine, un peu tombante */}
      <mesh material={m.peau} position={[s * 0.004, -0.012, 0]} scale={[0.95, 1.15, 0.92]} castShadow>
        <sphereGeometry args={[0.052 * k, 28, 18]} />
      </mesh>
      {/* bras : biceps et triceps légèrement marqués */}
      <Membre long={0.27 * k} rayon={0.046 * k} rayonBas={0.033 * k} bombe={0.12} pic={0.45} material={m.peau} />
      <group position={[0, -0.29 * k, 0]} rotation-x={-p.coudes[i]}>
        <mesh material={m.peau} castShadow>
          <sphereGeometry args={[0.034 * k, 18, 12]} />
        </mesh>
        {/* avant-bras : plus épais vers le coude, poignet fin */}
        <Membre long={0.235 * k} rayon={0.036 * k} rayonBas={0.023 * k} bombe={0.12} pic={0.18} material={m.peau} />
        {/* main : paume et pouce, doigts serrés */}
        <group position={[0, -0.27 * k, 0]}>
          <mesh material={m.peau} scale={[0.72, 1.25, 0.42]} castShadow>
            <sphereGeometry args={[0.042 * k, 20, 14]} />
          </mesh>
          <mesh material={m.peau} position={[-s * 0.025 * k, 0.01, 0.012]} rotation-z={s * 0.5} scale={[0.4, 1, 0.4]} castShadow>
            <sphereGeometry args={[0.03 * k, 12, 8]} />
          </mesh>
        </group>
        {objets?.[i] && <group position={[0, -0.3 * k, 0]}>{objets[i]}</group>}
      </group>
    </group>
  );

  return (
    <group>
      <group position={[0, p.bassinY * k, 0]}>
        <mesh geometry={bassin} material={m.tenue} castShadow />
        {/* fessiers */}
        {[-1, 1].map((s) => (
          <mesh key={s} material={m.tenue} position={[s * 0.068 * k, -0.02 * k, -0.06 * k]} scale={[1, 1.05, 0.85]} castShadow>
            <sphereGeometry args={[0.085 * k, 24, 16]} />
          </mesh>
        ))}
        {[0, 1].map((i) => jambe(i, i === 0 ? -1 : 1))}
        {/* le haut du corps s'incline depuis le bassin */}
        <group rotation-x={p.bassinX}>
          <mesh geometry={torse} material={m.tenue} position={[0, 0.02, 0]} castShadow receiveShadow />
          {/* pectoraux sous le débardeur, à peine marqués */}
          {[-1, 1].map((s) => (
            <mesh key={s} material={m.tenue} position={[s * 0.068 * k, 0.405 * k, 0.062 * k]} scale={[1.3, 0.75, homme ? 0.38 : 0.45]} castShadow>
              <sphereGeometry args={[0.075 * k, 24, 16]} />
            </mesh>
          ))}
          {/* trapèzes et base du cou, en peau (encolure du débardeur) */}
          <mesh material={m.peau} position={[0, 0.535 * k, -0.005]} scale={[homme ? 2.1 : 1.8, 0.55, 1.05]} castShadow>
            <sphereGeometry args={[0.06 * k, 28, 16]} />
          </mesh>
          {/* liseré vert acide de la tenue */}
          <mesh material={m.acide} position={[0, 0.06 * k, 0]} scale={[homme ? 1.31 : 1.21, 1, 0.69]}>
            <torusGeometry args={[0.121 * k, 0.0035, 6, 64]} />
          </mesh>
          {[0, 1].map((i) => bras(i, i === 0 ? -1 : 1))}
          <mesh material={m.peau} position={[0, 0.585 * k, 0.005]} castShadow>
            <cylinderGeometry args={[0.043 * k, 0.05 * k, 0.12 * k, 28]} />
          </mesh>
          <group position={[0, 0.735 * k, 0.012]} rotation-x={p.tete} scale={1.02 * k}>
            <mesh geometry={geoTete} material={m.peau} castShadow />
          </group>
        </group>
      </group>
    </group>
  );
}

/* ---------- le matériel tenu en main ---------- */
let _kb;
function matKettlebell() {
  if (_kb) return _kb;
  _kb = {
    // corps gainé de caoutchouc (vinyle mat, grain fin), poignée en fonte peinte, plus lisse et usée
    gaine: new THREE.MeshPhysicalMaterial({ color: '#18181a', roughness: 0.62, normalMap: grain(), normalScale: new THREE.Vector2(0.5, 0.5), clearcoat: 0.25, clearcoatRoughness: 0.55, envMapIntensity: 0.6 }),
    poignee: new THREE.MeshStandardMaterial({ color: '#2a2a2d', roughness: 0.38, metalness: 0.7, envMapIntensity: 0.8 }),
    acide: new THREE.MeshStandardMaterial({ color: ACIDE, roughness: 0.55 }),
    poids: new THREE.MeshBasicMaterial({ map: marquage('16', { taille: 104 }), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }),
  };
  return _kb;
}

/** Kettlebell 16 kg (Ø 19 cm) : boule gainée à fond plat, poignée à cornes, anneau de couleur et marquage du poids. */
export function Kettlebell({ poids = 1 }) {
  const m = matKettlebell();
  const corps = useMemo(() => {
    const g = new THREE.SphereGeometry(0.095, 48, 32);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) if (p.getY(i) < -0.078) p.setY(i, -0.078); // fond plat pour tenir au sol
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <group scale={poids}>
      <group position={[0, -0.15, 0]}>
        <mesh geometry={corps} material={m.gaine} castShadow receiveShadow />
        <mesh material={m.acide} position={[0, 0.045, 0]} rotation-x={Math.PI / 2}>
          <torusGeometry args={[0.083, 0.0035, 8, 64]} />
        </mesh>
        <mesh material={m.poids} position={[0, -0.005, 0.0958]}>
          <planeGeometry args={[0.07, 0.035]} />
        </mesh>
      </group>
      {/* poignée : une anse ronde (Ø 3,3 cm) et deux cornes qui plongent dans la boule */}
      <mesh material={m.poignee} position={[0, -0.03, 0]} castShadow>
        <torusGeometry args={[0.058, 0.0165, 20, 48, Math.PI]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} material={m.poignee} position={[s * 0.058, -0.06, 0]} rotation-z={s * 0.18} castShadow>
          <cylinderGeometry args={[0.0165, 0.02, 0.07, 20]} />
        </mesh>
      ))}
    </group>
  );
}
