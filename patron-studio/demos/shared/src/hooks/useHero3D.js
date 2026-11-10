import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap.js';
import { getDeviceTier } from './useDeviceTier.js';
import { useInView } from './useInView.js';
import { useReducedMotion } from './useReducedMotion.js';

/**
 * Prépare une scène 3D d'accueil :
 *  - load3d : passe à true quand le navigateur est libre (chargement progressif)
 *  - progress : avancement du défilement dans la section (0 → 1), lu dans useFrame
 *  - tier : puissance de l'appareil ('none' = pas de WebGL → onReady immédiat)
 *  - onStep(p) : appelé à chaque défilement (pour mettre à jour l'interface)
 */
export function useHero3D(section, { onReady, onStep, start = 'top top', end = 'bottom bottom' } = {}) {
  const progress = useRef(0);
  const reduced = useReducedMotion();
  const inView = useInView(section, '100px');
  const [tier] = useState(getDeviceTier);
  const [load3d, setLoad3d] = useState(false);
  const stepRef = useRef(onStep);
  stepRef.current = onStep;

  useEffect(() => {
    if (tier === 'none') {
      onReady?.();
      return;
    }
    const go = () => setLoad3d(true);
    const id = 'requestIdleCallback' in window ? window.requestIdleCallback(go, { timeout: 800 }) : setTimeout(go, 300);
    return () => ('cancelIdleCallback' in window ? window.cancelIdleCallback(id) : clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- au montage uniquement
  }, [tier]);

  useLayoutEffect(() => {
    if (!section.current) return;
    const st = ScrollTrigger.create({
      trigger: section.current,
      start,
      end,
      onUpdate: (self) => {
        progress.current = self.progress;
        stepRef.current?.(self.progress);
      },
    });
    return () => st.kill();
  }, [section, start, end]);

  return { progress, reduced, inView, tier, load3d };
}
