import { useLayoutEffect, useRef } from 'react';
import { ScrollTrigger } from '../lib/gsap.js';

/**
 * Avancement du défilement (0 → 1) sur un élément, lu dans useFrame sans re-rendu.
 * start / end : syntaxe ScrollTrigger ("top top", "bottom top"…).
 */
export function useScrollProgress(target, { start = 'top top', end = 'bottom top' } = {}) {
  const progress = useRef(0);
  useLayoutEffect(() => {
    if (!target.current) return;
    const st = ScrollTrigger.create({
      trigger: target.current,
      start,
      end,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });
    progress.current = st.progress;
    return () => st.kill();
  }, [target, start, end]);
  return progress;
}
