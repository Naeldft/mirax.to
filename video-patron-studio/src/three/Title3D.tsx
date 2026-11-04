import { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { easeIn, ramp, rand, sp } from '../anim';
import { useAssets } from '../assets';
import { config } from '../config';

const G = config.marque.vert;

type Letter = { geo: THREE.BufferGeometry; x: number; y: number; line: number; idx: number };

/** Scène 2 : "Patrôn Studio" en lettres 3D extrudées qui se forment. */
export const Title3D: React.FC<{ z: number }> = ({ z }) => {
  const frame = useCurrentFrame();
  const { font3d } = useAssets();

  const letters = useMemo(() => {
    const out: Letter[] = [];
    const words = [config.marque.nom1, config.marque.nom2];
    const res = font3d.data.resolution;
    const size = 1;
    const maxWidth = 3.7; // largeur visible ≈ 4.4 unités à cette distance
    const lineGap = 1.35;
    // mesure des lignes
    const adv = (ch: string) => ((font3d.data.glyphs[ch]?.ha ?? 600) / res) * size;
    const widths = words.map((w) => [...w].reduce((s, ch) => s + adv(ch), 0));
    const scale = Math.min(1, maxWidth / Math.max(...widths));
    let idx = 0;
    words.forEach((w, line) => {
      let x = -widths[line] / 2;
      for (const ch of w) {
        const geo = new TextGeometry(ch, {
          font: font3d,
          size,
          depth: 0.32,
          curveSegments: 10,
          bevelEnabled: true,
          bevelThickness: 0.035,
          bevelSize: 0.022,
          bevelSegments: 3,
        });
        geo.computeBoundingBox();
        const bb = geo.boundingBox!;
        const cx = (bb.min.x + bb.max.x) / 2;
        geo.translate(-cx, 0, -0.16);
        out.push({ geo, x: (x + cx) * scale, y: (line === 0 ? lineGap / 2 : -lineGap / 2) * scale, line, idx: idx++ });
        x += adv(ch);
      }
    });
    return { list: out, scale };
  }, [font3d]);

  const start = 116;
  const exitT = easeIn(ramp(frame, 264, 300, (t) => t));
  const sweep = ramp(frame, 150, 240);

  return (
    <group position={[0, 0.25, z]}>
      {letters.list.map((l) => {
        const s = sp(frame, start + l.idx * 3, 13, 0.9, 100);
        // arrivée depuis l'arrière, dans l'axe de sa place finale (projection fixe → aucun croisement)
        const from = new THREE.Vector3(l.x * 1.96, l.y * 1.96, -12);
        // départ radial (écartement proportionnel à la position → les lettres s'éloignent sans se croiser)
        const away = new THREE.Vector3(l.x * 2.2, (l.y + 0.1) * 2.2, 8);
        const px = THREE.MathUtils.lerp(from.x, l.x, s) + away.x * exitT;
        const py = THREE.MathUtils.lerp(from.y, l.y, s) + away.y * exitT;
        const pz = THREE.MathUtils.lerp(from.z, 0, s) + away.z * exitT;
        return (
          <mesh
            key={l.idx}
            geometry={l.geo}
            position={[px, py, pz]}
            rotation={[0, (1 - s) * 2.4 + exitT * 0.6 * Math.sign(l.x || 1), 0]}
            scale={letters.scale * Math.max(0.001, 0.4 + s * 0.6)}
          >
            <meshPhysicalMaterial
              color={l.line === 0 ? '#ffffff' : G}
              metalness={l.line === 0 ? 0.25 : 0.35}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.15}
              emissive={l.line === 0 ? '#ffffff' : G}
              emissiveIntensity={l.line === 0 ? 0.04 : 0.18}
            />
          </mesh>
        );
      })}
      {/* lumière qui balaie les lettres (reflets doux) */}
      <pointLight position={[-4 + sweep * 8, 1.5, 2.5]} intensity={18} distance={9} color="#ffffff" />
    </group>
  );
};
