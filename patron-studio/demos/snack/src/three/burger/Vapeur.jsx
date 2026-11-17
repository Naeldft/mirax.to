import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const alea = (i, s) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Vapeur légère qui monte du steak. */
export default function Vapeur({ n = 7, hauteur = 0.05 }) {
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

