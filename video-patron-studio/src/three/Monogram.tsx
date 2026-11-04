import { useMemo } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { useAssets } from '../assets';
import { config } from '../config';
import { haloTexture } from '../textures';

const G = config.marque.vert;

const roundedSquare = (s: number, r: number) => {
  const h = s / 2;
  const sh = new THREE.Shape();
  sh.moveTo(-h + r, -h);
  sh.lineTo(h - r, -h);
  sh.quadraticCurveTo(h, -h, h, -h + r);
  sh.lineTo(h, h - r);
  sh.quadraticCurveTo(h, h, h - r, h);
  sh.lineTo(-h + r, h);
  sh.quadraticCurveTo(-h, h, -h, h - r);
  sh.lineTo(-h, -h + r);
  sh.quadraticCurveTo(-h, -h, -h + r, -h);
  return sh;
};

/** Monogramme PS en 3D : cadre arrondi vert + lettres P et S extrudées. */
export const useMonogramGeometry = () => {
  const { fontMono } = useAssets();
  return useMemo(() => {
    const outer = roundedSquare(2.2, 0.5);
    const hole = roundedSquare(1.88, 0.36);
    outer.holes.push(hole as unknown as THREE.Path);
    const frame = new THREE.ExtrudeGeometry(outer, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: 4,
      curveSegments: 16,
    });
    frame.center();
    const mk = (ch: string) => {
      const g = new TextGeometry(ch, {
        font: fontMono,
        size: 1.0,
        depth: 0.24,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.018,
        bevelSegments: 3,
      });
      g.computeBoundingBox();
      return g;
    };
    const P = mk('P');
    const S = mk('S');
    // centrage du couple "PS"
    const pb = P.boundingBox!.clone();
    const sb = S.boundingBox!.clone();
    const gap = 0.05;
    const total = pb.max.x - pb.min.x + gap + (sb.max.x - sb.min.x);
    const capH = pb.max.y - pb.min.y;
    // ajuste le couple PS dans le cadre (largeur intérieure ≈ 1.88)
    const k = Math.min(1, 1.36 / total);
    P.translate(-total / 2 - pb.min.x, -capH / 2 - pb.min.y, -0.12);
    S.translate(-total / 2 + (pb.max.x - pb.min.x) + gap - sb.min.x, -capH / 2 - pb.min.y, -0.12);
    P.scale(k, k, 1);
    S.scale(k, k, 1);
    return { frame, P, S };
  }, [fontMono]);
};

type Props = {
  /** 0→1 : intensité de l'illumination */
  glow: number;
  /** 0→1 : ouverture "porte" (P à gauche, S à droite, cadre agrandi) */
  open?: number;
  opacity?: number;
};

export const Monogram: React.FC<Props> = ({ glow, open = 0, opacity = 1 }) => {
  const { frame, P, S } = useMonogramGeometry();
  const halo = useMemo(() => haloTexture(G), []);
  const transparent = opacity < 1;
  return (
    <group>
      <mesh geometry={frame} scale={1 + open * 2.4}>
        <meshPhysicalMaterial
          color={G}
          emissive={G}
          emissiveIntensity={0.15 + glow * 0.9}
          metalness={0.3}
          roughness={0.28}
          clearcoat={1}
          transparent={transparent}
          opacity={opacity}
        />
      </mesh>
      <mesh geometry={P} position={[-open * 3.2, 0, open * 1.5]} rotation={[0, open * 1.2, 0]}>
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={glow * 0.25}
          metalness={0.15}
          roughness={0.22}
          clearcoat={1}
          transparent={transparent}
          opacity={opacity}
        />
      </mesh>
      <mesh geometry={S} position={[open * 3.2, 0, open * 1.5]} rotation={[0, -open * 1.2, 0]}>
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={glow * 0.25}
          metalness={0.15}
          roughness={0.22}
          clearcoat={1}
          transparent={transparent}
          opacity={opacity}
        />
      </mesh>
      <mesh position={[0, 0, -0.6]} scale={5.2 + glow * 1.5}>
        <planeGeometry />
        <meshBasicMaterial
          map={halo}
          transparent
          opacity={glow * 0.55 * opacity * (1 - open)}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
