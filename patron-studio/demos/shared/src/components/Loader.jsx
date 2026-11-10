import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { gsap } from '../lib/gsap.js';

/**
 * Écran de chargement à l'image de la marque.
 *  ready   : passe à true quand la page (et la 3D) est prête
 *  mark    : logo ou pictogramme (SVG) animé
 *  colors  : { bg, fg, accent }
 *  minMs   : durée minimale d'affichage (évite un flash)
 *  maxMs   : sécurité : le loader disparaît quoi qu'il arrive
 */
export default function Loader({ ready, name, tagline, mark, colors, minMs = 900, maxMs = 4500, fontClass = '' }) {
  const root = useRef(null);
  const bar = useRef(null);
  const pct = useRef(null);
  const reduced = useReducedMotion();
  const [gone, setGone] = useState(false);
  const [minDone, setMinDone] = useState(false);
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setMinDone(true), reduced ? 150 : minMs);
    const b = setTimeout(() => setForced(true), maxMs);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      document.documentElement.style.overflow = '';
    };
  }, [minMs, maxMs, reduced]);

  // progression : avance vers 90 % puis termine quand tout est prêt
  useEffect(() => {
    if (reduced) return;
    const state = { v: 0 };
    const t = gsap.to(state, {
      v: 90,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: () => {
        if (pct.current) pct.current.textContent = Math.round(state.v);
        if (bar.current) bar.current.style.transform = `scaleX(${state.v / 100})`;
      },
    });
    return () => t.kill();
  }, [reduced]);

  const done = (ready && minDone) || forced;
  useEffect(() => {
    if (!done || !root.current) return;
    document.documentElement.style.overflow = '';
    if (pct.current) pct.current.textContent = '100';
    if (bar.current) bar.current.style.transform = 'scaleX(1)';
    if (reduced) {
      gsap.to(root.current, { opacity: 0, duration: 0.2, onComplete: () => setGone(true) });
      return;
    }
    const tl = gsap.timeline({ onComplete: () => setGone(true) });
    tl.to(root.current.querySelectorAll('[data-l]'), { y: -24, opacity: 0, duration: 0.45, stagger: 0.05, ease: 'power2.in' }, 0.15);
    tl.to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'power4.inOut' }, 0.35);
    return () => tl.kill();
  }, [done, reduced]);

  if (gone) return null;
  return (
    <div
      ref={root}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 ${fontClass}`}
      style={{ background: colors.bg, color: colors.fg, clipPath: 'inset(0 0 0% 0)' }}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Chargement de la page</span>
      <div data-l aria-hidden="true">
        {mark}
      </div>
      <p data-l className="text-center text-2xl font-semibold tracking-wide" aria-hidden="true">
        {name}
      </p>
      {tagline && (
        <p data-l className="max-w-xs text-center text-sm opacity-70" aria-hidden="true">
          {tagline}
        </p>
      )}
      <div data-l className="flex w-48 items-center gap-3" aria-hidden="true">
        <span
          className="relative h-[2px] flex-1 overflow-hidden"
          style={{ background: 'color-mix(in srgb, currentColor 18%, transparent)' }}
        >
          <span ref={bar} className="absolute inset-0 origin-left" style={{ background: colors.accent, transform: 'scaleX(0)' }} />
        </span>
        <span ref={pct} className="w-8 text-right text-xs tabular-nums opacity-70">
          0
        </span>
      </div>
    </div>
  );
}
