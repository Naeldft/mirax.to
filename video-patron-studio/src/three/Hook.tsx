import { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import * as THREE from 'three';
import { easeIn, ramp, rand, sp } from '../anim';
import { config } from '../config';
import { hookTexture } from '../textures';
import { Monogram } from './Monogram';

// 1 px écran ≈ PX unités à 12 unités de la caméra (fov 40°, 1920 px de haut)
const PX = (2 * 12 * Math.tan((20 * Math.PI) / 180)) / 1920;
const SHATTER = 80; // image où le texte se brise

/** Scène 1 : la question, qui se brise en éclats, puis le monogramme PS. */
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { tex, w, h } = useMemo(() => hookTexture(config.textes.accroche, 960), []);
  const W3 = w * PX;
  const H3 = h * PX;

  // Éclats triangulaires (grille irrégulière déterministe)
  const shards = useMemo(() => {
    const cols = 9;
    const rows = 6;
    const pts: THREE.Vector2[][] = [];
    for (let j = 0; j <= rows; j++) {
      pts.push([]);
      for (let i = 0; i <= cols; i++) {
        const edgeX = i === 0 || i === cols;
        const edgeY = j === 0 || j === rows;
        const jx = edgeX ? 0 : (rand(i * 13 + j * 7) - 0.5) * 0.7;
        const jy = edgeY ? 0 : (rand(i * 5 + j * 17 + 3) - 0.5) * 0.7;
        pts[j].push(new THREE.Vector2((i + jx) / cols, (j + jy) / rows));
      }
    }
    const list: { geo: THREE.BufferGeometry; c: THREE.Vector3; seed: number }[] = [];
    let seed = 1;
    for (let j = 0; j < rows; j++)
      for (let i = 0; i < cols; i++) {
        const a = pts[j][i];
        const b = pts[j][i + 1];
        const c = pts[j + 1][i + 1];
        const d = pts[j + 1][i];
        const tris = rand(i + j * 31) > 0.5 ? [[a, b, c], [a, c, d]] : [[a, b, d], [b, c, d]];
        for (const tri of tris) {
          const cx = (tri[0].x + tri[1].x + tri[2].x) / 3;
          const cy = (tri[0].y + tri[1].y + tri[2].y) / 3;
          const center = new THREE.Vector3((cx - 0.5) * W3, (cy - 0.5) * H3, 0);
          const pos: number[] = [];
          const uv: number[] = [];
          for (const p of tri) {
            pos.push((p.x - 0.5) * W3 - center.x, (p.y - 0.5) * H3 - center.y, 0);
            uv.push(p.x, p.y);
          }
          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
          geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
          geo.computeVertexNormals();
          list.push({ geo, c: center, seed: seed++ });
        }
      }
    return list;
  }, [W3, H3]);

  // La texture est dessinée en haut→bas, le plan en bas→haut : on retourne la texture.
  useMemo(() => {
    tex.flipY = true;
  }, [tex]);

  const intro = sp(frame, 0, 16, 0.6, 140); // apparition immédiate (image 0 déjà lisible)
  const crack = frame >= SHATTER - 8 && frame < SHATTER ? Math.sin(frame * 3.1) * 0.02 : 0;
  const t = Math.max(0, frame - SHATTER) / 30; // secondes depuis la brisure
  const explode = easeIn(Math.min(1, t / 1.2));

  const monoIn = sp(frame, SHATTER + 4, 13, 0.9, 90);
  const glow = ramp(frame, SHATTER + 14, SHATTER + 40);
  const open = ramp(frame, 108, 146);

  return (
    <group>
      {frame < SHATTER + 40 && (
        <group position={[crack, 0.15, 0]} scale={0.94 + intro * 0.06}>
          {shards.map(({ geo, c, seed }) => {
            const dir = new THREE.Vector3(c.x * 1.4 + (rand(seed) - 0.5) * 2, c.y * 1.4 + (rand(seed + 9) - 0.5) * 2, 0.5 + rand(seed + 4) * 3);
            const d = explode * (6 + rand(seed + 2) * 6);
            return (
              <mesh
                key={seed}
                geometry={geo}
                position={[c.x + dir.x * d * 0.35, c.y + dir.y * d * 0.35, dir.z * d]}
                rotation={[explode * (rand(seed + 5) - 0.5) * 8, explode * (rand(seed + 6) - 0.5) * 8, explode * (rand(seed + 7) - 0.5) * 6]}
              >
                <meshBasicMaterial map={tex} transparent opacity={1 - explode * 0.9} side={THREE.DoubleSide} depthWrite={false} />
              </mesh>
            );
          })}
        </group>
      )}
      {frame >= SHATTER && (
        <group position={[0, 0.2, -0.5]} scale={0.2 + monoIn * 0.8} rotation={[0, (1 - monoIn) * -1.6, 0]}>
          <Monogram glow={glow} open={open} opacity={1} />
        </group>
      )}
    </group>
  );
};
