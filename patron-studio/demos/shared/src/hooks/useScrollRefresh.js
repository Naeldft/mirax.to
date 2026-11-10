import { useEffect } from 'react';
import { ScrollTrigger } from '../lib/gsap.js';

/**
 * Recalcule les positions des animations au défilement quand la hauteur de la page change
 * (filtre du menu, images chargées, polices…), sinon les sections suivantes s'animeraient trop tard.
 */
export function useScrollRefresh() {
  useEffect(() => {
    let timer;
    let last = document.documentElement.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (Math.abs(h - last) < 2) return;
      last = h;
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    ro.observe(document.body);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      ro.disconnect();
      clearTimeout(timer);
    };
  }, []);
}
