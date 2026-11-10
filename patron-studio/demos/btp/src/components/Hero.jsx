import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap, ScrollTrigger } from '@demos/shared/lib/gsap.js';
import { entreprise, phases } from '../data/site';
import { Telephone } from './Icons';

const HouseScene = lazy(() => import('../three/HouseScene'));

/**
 * Accueil : la maison se construit au fil du défilement. Un "carnet de chantier"
 * affiche l'étape en cours et l'avancement en pourcentage.
 */
export default function Hero({ onReady }) {
  const section = useRef(null);
  const progress = useRef(0);
  const pct = useRef(null);
  const bar = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(section, '100px');
  const [tier] = useState(getDeviceTier);
  const [load3d, setLoad3d] = useState(false);
  const [phase, setPhase] = useState(reduced ? phases.length - 1 : 0);

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
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress;
          progress.current = p;
          if (pct.current) pct.current.textContent = Math.round(p * 100) + ' %';
          if (bar.current) bar.current.style.transform = `scaleX(${p})`;
          let ph = 0;
          phases.forEach((x, i) => p >= x.seuil && (ph = i));
          setPhase((o) => (o === ph ? o : ph));
        },
      });
      if (!reduced) {
        gsap.from('[data-line]', { yPercent: 105, duration: 1.1, stagger: 0.1, ease: 'power4.out', delay: 0.2 });
        gsap.from('[data-hero-in]', { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.5 });
        gsap.to('[data-hero-title]', {
          y: -60,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: section.current, start: 'top top', end: '25% top', scrub: true },
        });
      }
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="accueil" ref={section} className={`relative ${reduced ? '' : 'h-[300svh]'}`} aria-label="Accueil">
      <div className="quadrillage sticky top-0 h-[100svh] overflow-hidden bg-beton">
        {load3d && (
          <Suspense fallback={null}>
            <HouseScene progress={progress} reduced={reduced} tier={tier} active={inView} onReady={onReady} />
          </Suspense>
        )}
        <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl flex-col justify-between px-5 pb-6 pt-24 md:px-8 md:pb-10 md:pt-28">
          <div data-hero-title className="max-w-2xl">
            <p data-hero-in className="etiquette">
              {entreprise.accroche}
            </p>
            <h1 className="mt-3 text-[clamp(2.6rem,10vw,6.8rem)] leading-[0.9]">
              {['On bâtit.', 'Vous', 'emménagez.'].map((l, i) => (
                <span key={l} className="block overflow-hidden">
                  <span data-line className={`block ${i === 0 ? '' : i === 1 ? 'text-plan' : 'text-plan'}`}>
                    {l}
                  </span>
                </span>
              ))}
            </h1>
            <p data-hero-in className="mt-4 hidden max-w-md text-lg text-graphite md:block">
              {entreprise.intro}
            </p>
          </div>

          <div className="pointer-events-auto grid min-w-0 gap-4 md:grid-cols-[minmax(0,26rem)_auto] md:items-end md:justify-between">
            {/* carnet de chantier */}
            <div data-hero-in className="min-w-0 border-2 border-anthracite bg-papier/95 p-4 shadow-[6px_6px_0_#1d1d1b]" aria-live="polite">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-cond text-sm font-bold uppercase tracking-[0.2em] text-graphite">Avancement du chantier</p>
                <p ref={pct} className="font-display text-2xl tabular-nums">
                  {reduced ? '100 %' : '0 %'}
                </p>
              </div>
              <div className="hachures mt-2 h-2 overflow-hidden bg-beton-2">
                <div
                  ref={bar}
                  className="h-full origin-left bg-anthracite/0"
                  style={{ transform: reduced ? 'scaleX(1)' : 'scaleX(0)', boxShadow: 'inset 0 0 0 100px #2b59c3' }}
                />
              </div>
              <p className="mt-3 font-display text-lg uppercase">
                {String(phase + 1).padStart(2, '0')} · {phases[phase].nom}
              </p>
              <p className="text-sm text-graphite">{phases[phase].texte}</p>
            </div>
            <div data-hero-in className="flex gap-3">
              <a href="#devis" className="btn btn-jaune flex-1 md:flex-none">
                Devis gratuit
              </a>
              <a href={`tel:${entreprise.telephoneLien}`} className="btn btn-blanc flex-1 md:flex-none">
                <Telephone /> Appeler
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
