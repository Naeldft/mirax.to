import { useLayoutEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { gsap } from '../lib/gsap.js';

const fmt = (v, decimals) =>
  v.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Nombre qui défile jusqu'à sa valeur quand il apparaît à l'écran. */
export default function Counter({ value, decimals = 0, prefix = '', suffix = '', duration = 1.8, className = '' }) {
  const el = useRef(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (!el.current) return;
    if (reduced) {
      el.current.textContent = prefix + fmt(value, decimals) + suffix;
      return;
    }
    const state = { v: 0 };
    el.current.textContent = prefix + fmt(0, decimals) + suffix;
    const t = gsap.to(state, {
      v: value,
      duration,
      ease: 'power3.out',
      scrollTrigger: { trigger: el.current, start: 'top 90%', once: true },
      onUpdate: () => {
        if (el.current) el.current.textContent = prefix + fmt(state.v, decimals) + suffix;
      },
    });
    return () => t.kill();
  }, [value, decimals, prefix, suffix, duration, reduced]);
  return (
    <span ref={el} className={`tabular-nums ${className}`} aria-label={prefix + fmt(value, decimals) + suffix}>
      {prefix + fmt(value, decimals) + suffix}
    </span>
  );
}
