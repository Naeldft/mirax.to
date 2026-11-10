import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap.js';
import { useReducedMotion } from './useReducedMotion.js';

/**
 * Fait apparaître en douceur les éléments [data-reveal] d'une section quand ils entrent à l'écran.
 * Avec "réduire les animations", tout est affiché directement.
 */
export function useReveal(scope, deps = []) {
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (reduced || !scope.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('[data-reveal]');
      gsap.set(items, { opacity: 0, y: 36 });
      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', overwrite: true }),
        // élément dépassé d'un coup (lien d'ancre, retour en arrière) : on l'affiche aussi
        onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0 }),
        onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, overwrite: true }),
      });
    }, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);
}
