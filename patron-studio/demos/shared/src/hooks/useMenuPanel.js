import { useEffect } from 'react';
import { gsap } from '../lib/gsap.js';

/**
 * Animation d'ouverture / fermeture d'un menu mobile plein écran (cercle qui s'agrandit),
 * blocage du défilement, touche Échap, focus sur le premier lien.
 */
export function useMenuPanel({ open, setOpen, panel, button, reduced, origin = 'calc(100% - 2.5rem) 2.2rem' }) {
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    document.body.style.overflow = open ? 'hidden' : '';
    const closed = `circle(0% at ${origin})`;
    const full = `circle(150% at ${origin})`;
    if (open) {
      gsap.set(el, { visibility: 'visible' });
      if (reduced) gsap.set(el, { clipPath: full });
      else {
        gsap.fromTo(el, { clipPath: closed }, { clipPath: full, duration: 0.7, ease: 'power3.inOut' });
        gsap.fromTo(el.querySelectorAll('[data-item]'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, delay: 0.25, duration: 0.5, ease: 'power3.out' });
      }
      el.querySelector('a, button')?.focus();
    } else if (reduced) gsap.set(el, { visibility: 'hidden', clipPath: closed });
    else gsap.to(el, { clipPath: closed, duration: 0.5, ease: 'power3.inOut', onComplete: () => gsap.set(el, { visibility: 'hidden' }) });
  }, [open, reduced, panel, origin]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen, button]);

  useEffect(() => () => (document.body.style.overflow = ''), []);
}
