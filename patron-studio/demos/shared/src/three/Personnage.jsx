import { useMemo } from 'react';
import * as THREE from 'three';
import { teteSculptee } from './mannequin.js';
import { grain } from './materiaux.js';

/* ------------------------------------------------------------------
   Personnage-mannequin en pied, habillé (démos photographe, conseil…).
   Même sculpture que les athlètes de Pulse : proportions réelles, musculature à peine marquée, peau mate à grain fin,
   tête lisse sans détail de visage. Les vêtements sont des volumes simples en tissu mat (pull, chemise, costume,
   pantalon, robe longue) ; la pose est donnée articulation par articulation, en radians.
   Repère : regarde vers +z, origine au sol entre les pieds.
------------------------------------------------------------------- */

const DEBOUT = {
  bassinY: 0.92,
  bassinX: 0,
  bassinZ: 0,
  torsion: 0, // rotation du buste autour de la verticale
  tete: 0,
  teteY: 0,
  hanches: [0, 0],
  ecart: [0.05, 0.05],
  genoux: [0, 0],
  epaules: [0.08, 0.08],
  ouverture: [0.1, 0.1],
  coudes: [0.15, 0.15],
  rotBras: [0, 0], // rotation du bras sur lui-même (bras croisés, main sur la hanche)
};

function Membre({ long, rayon, rayonBas, material, bombe = 0, pic = 0.35, arriere = 0 }) {
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

const tissu = (couleur, { sheen = 0.5, rugosite = 0.88, relief = 0.5, satin = false } = {}) =>
  new THREE.MeshPhysicalMaterial({
    color: couleur,
    roughness: satin ? 0.55 : rugosite,
    normalMap: grain(),
    normalScale: new THREE.Vector2(relief, relief),
    sheen: satin ? 1 : sheen,
    sheenRoughness: satin ? 0.35 : 0.6,
    sheenColor: satin ? '#ffffff' : new THREE.Color(couleur).lerp(new THREE.Color('#ffffff'), 0.35),
    envMapIntensity: 0.45,
  });

export default function Personnage({
  pose = {},
  homme = false,
  haut = '#3a3632',
  bas = '#2a2a2e',
  manches = true,
  robe = null,
  chemise = false,
  chaussure = '#2a211b',
  peau = '#bba185',
  objets,
}) {
  const p = { ...DEBOUT, ...pose };
  const m = useMemo(
    () => ({
      peau: new THREE.MeshPhysicalMaterial({ color: peau, roughness: 0.78, normalMap: grain(), normalScale: new THREE.Vector2(0.35, 0.35), sheen: 0.25, sheenRoughness: 0.8, sheenColor: '#fff1e0', envMapIntensity: 0.45 }),
      haut: tissu(haut),
      bas: tissu(bas),
      robe: robe ? tissu(robe, { satin: true }) : null,
      chemise: new THREE.MeshStandardMaterial({ color: '#f1efe9', roughness: 0.7, side: THREE.DoubleSide }),
      cravate: new THREE.MeshStandardMaterial({ color: '#2b2f3a', roughness: 0.55, side: THREE.DoubleSide }),
      chaussure: new THREE.MeshStandardMaterial({ color: chaussure, roughness: 0.45, envMapIntensity: 0.8 }),
    }),
    [peau, haut, bas, robe, chaussure],
  );
  const geoTete = useMemo(() => teteSculptee(homme), [homme]);
  const k = homme ? 1.06 : 1;
  const vChemise = useMemo(() => {
    const f = new THREE.Shape();
    f.moveTo(-0.06 * k, 0);
    f.lineTo(0.06 * k, 0);
    f.lineTo(0, -0.21 * k);
    f.closePath();
    return new THREE.ShapeGeometry(f);
  }, [k]);
  const torse = useMemo(() => {
    const prof = (homme
      ? [[0.001, 0], [0.13, 0], [0.124, 0.07], [0.12, 0.15], [0.134, 0.24], [0.154, 0.33], [0.17, 0.41], [0.167, 0.47], [0.132, 0.515], [0.06, 0.535], [0.001, 0.54]]
      : [[0.001, 0], [0.134, 0], [0.122, 0.07], [0.11, 0.15], [0.122, 0.24], [0.142, 0.33], [0.152, 0.4], [0.148, 0.46], [0.11, 0.51], [0.05, 0.53], [0.001, 0.535]]
    ).map(([r, y]) => new THREE.Vector2(r * k, y * k));
    const g = new THREE.LatheGeometry(prof, 64);
    g.scale(homme ? 1.3 : 1.2, 1, 0.7);
    return g;
  }, [homme, k]);
  const bassin = useMemo(() => {
    const g = new THREE.SphereGeometry(0.15 * k, 40, 24);
    g.scale(homme ? 1.12 : 1.22, 0.72, 0.82);
    return g;
  }, [homme, k]);
  // robe longue : une corolle qui tombe de la taille jusqu'au sol, légèrement évasée et traînante derrière
  const jupe = useMemo(() => {
    if (!robe) return null;
    const h = p.bassinY * k + 0.06;
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const r = 0.15 + 0.06 * Math.sin(t * Math.PI * 0.5) + 0.26 * t * t;
      pts.push(new THREE.Vector2(r * k, -t * h));
    }
    const g = new THREE.LatheGeometry(pts, 72);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const t = -y / h;
      // aplatie d'avant en arrière, traîne vers l'arrière, plis réguliers
      const a = Math.atan2(pos.getZ(i), pos.getX(i));
      const plis = 1 + 0.035 * t * Math.sin(a * 11);
      pos.setX(i, pos.getX(i) * plis);
      pos.setZ(i, pos.getZ(i) * 0.82 * plis - (pos.getZ(i) < 0 ? 0.12 * t * t : 0));
    }
    g.computeVertexNormals();
    return g;
  }, [robe, p.bassinY, k]);

  const matBras = manches ? m.haut : m.peau;
  const jambe = (i, s) => (
    <group key={`j${s}`} position={[s * 0.092 * k, 0, 0]} rotation={[-p.hanches[i], 0, s * p.ecart[i]]}>
      {!robe && (
        <>
          <mesh material={m.bas} castShadow>
            <sphereGeometry args={[0.08 * k, 24, 16]} />
          </mesh>
          <Membre long={0.41 * k} rayon={0.074 * k} rayonBas={0.052 * k} bombe={0.06} pic={0.3} material={m.bas} />
        </>
      )}
      <group position={[0, -0.43 * k, 0]} rotation-x={p.genoux[i]}>
        {!robe && (
          <>
            <mesh material={m.bas} castShadow>
              <sphereGeometry args={[0.053 * k, 20, 12]} />
            </mesh>
            {/* pantalon : jambe droite qui tombe sur la chaussure */}
            <Membre long={0.39 * k} rayon={0.052 * k} rayonBas={0.046 * k} material={m.bas} />
          </>
        )}
        <group position={[0, -0.44 * k, 0.03]} rotation-x={-p.genoux[i] + p.hanches[i]}>
          <mesh material={m.chaussure} scale={[0.78, 0.5, 2.15]} castShadow>
            <sphereGeometry args={[0.05 * k, 24, 14]} />
          </mesh>
        </group>
      </group>
    </group>
  );
  const bras = (i, s) => (
    <group key={`b${s}`} position={[s * (homme ? 0.2 : 0.178) * k, 0.45 * k, 0]} rotation={[-p.epaules[i], s * p.rotBras[i], s * p.ouverture[i]]}>
      <mesh material={matBras} position={[s * 0.004, -0.012, 0]} scale={[0.95, 1.15, 0.92]} castShadow>
        <sphereGeometry args={[0.054 * k, 28, 18]} />
      </mesh>
      <Membre long={0.27 * k} rayon={(manches ? 0.05 : 0.046) * k} rayonBas={(manches ? 0.042 : 0.033) * k} bombe={manches ? 0 : 0.1} pic={0.45} material={matBras} />
      <group position={[0, -0.29 * k, 0]} rotation-x={-p.coudes[i]}>
        <mesh material={matBras} castShadow>
          <sphereGeometry args={[(manches ? 0.042 : 0.034) * k, 18, 12]} />
        </mesh>
        <Membre long={0.235 * k} rayon={(manches ? 0.041 : 0.036) * k} rayonBas={(manches ? 0.036 : 0.023) * k} bombe={manches ? 0 : 0.1} pic={0.18} material={matBras} />
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
      <group position={[0, p.bassinY * k, 0]} rotation-z={p.bassinZ}>
        <mesh geometry={bassin} material={robe ? m.robe : m.bas} castShadow />
        {jupe && <mesh geometry={jupe} material={m.robe} position={[0, 0.06, 0]} castShadow receiveShadow />}
        {[0, 1].map((i) => jambe(i, i === 0 ? -1 : 1))}
        <group rotation={[p.bassinX, p.torsion, 0]}>
          <mesh geometry={torse} material={robe ? m.robe : m.haut} position={[0, 0.02, 0]} castShadow receiveShadow />
          {/* col de chemise sous la veste */}
          {chemise && (
            // encolure de la veste ouverte : plastron de chemise blanche en V et cravate sombre
            <group position={[0, 0.535 * k, 0.112 * k]} rotation-x={-0.16}>
              <mesh material={m.chemise} geometry={vChemise} />
              <mesh material={m.cravate} position={[0, -0.075 * k, 0.003]}>
                <planeGeometry args={[0.024 * k, 0.15 * k]} />
              </mesh>
            </group>
          )}
          {/* trapèzes et cou */}
          <mesh material={robe || !manches ? m.peau : m.haut} position={[0, 0.535 * k, -0.005]} scale={[homme ? 2.1 : 1.8, 0.55, 1.05]} castShadow>
            <sphereGeometry args={[0.06 * k, 28, 16]} />
          </mesh>
          {[0, 1].map((i) => bras(i, i === 0 ? -1 : 1))}
          <mesh material={m.peau} position={[0, 0.585 * k, 0.005]} castShadow>
            <cylinderGeometry args={[0.043 * k, 0.05 * k, 0.12 * k, 28]} />
          </mesh>
          <group position={[0, 0.735 * k, 0.012]} rotation={[p.tete, p.teteY, 0]} scale={1.02 * k}>
            <mesh geometry={geoTete} material={m.peau} castShadow />
          </group>
        </group>
      </group>
    </group>
  );
}
