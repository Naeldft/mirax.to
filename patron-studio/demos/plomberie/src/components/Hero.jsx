import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap, ScrollTrigger } from '@demos/shared/lib/gsap.js';
import { entreprise, etapesHero } from '../data/site';
import { Telephone } from './Icons';

const PlumbingScene = lazy(() => import('../three/PlumbingScene'));

/**
 * Accueil : section haute avec scène 3D "collante". Le défilement assemble la tuyauterie,
 * ouvre le robinet puis fait couler l'eau ; trois étapes s'affichent en parallèle.
 */
export default function Hero({ onReady }) {
  const section = useRef(null);
  const progress = useRef(0);
  const reduced = useReducedMotion();
  const inView = useInView(section, '100px');
  const [tier] = useState(getDeviceTier);
  const [load3d, setLoad3d] = useState(false);
  const [step, setStep] = useState(0);

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
          progress.current = self.progress;
          const s = self.progress < 0.33 ? 0 : self.progress < 0.62 ? 1 : 2;
          setStep((old) => (old === s ? old : s));
        },
      });
      if (!reduced) {
        gsap.from('[data-hero-in]', { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.2 });
        // le titre glisse et s'efface quand l'assemblage commence
        gsap.to('[data-hero-title]', {
          yPercent: -30,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: section.current, start: 'top top', end: '35% top', scrub: true },
        });
      }
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="accueil" ref={section} className={`relative ${reduced ? '' : 'h-[260svh]'}`} aria-label="Accueil">
      <div className="blueprint sticky top-0 h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_60%_55%,rgb(95_212_232/0.16),transparent_70%),radial-gradient(ellipse_50%_40%_at_20%_80%,rgb(208_138_82/0.14),transparent_70%)]" />

        {load3d && (
          <Suspense fallback={null}>
            <PlumbingScene progress={progress} reduced={reduced} tier={tier} active={inView} onReady={onReady} />
          </Suspense>
        )}

        <div className="pointer-events-none relative mx-auto flex h-full max-w-6xl flex-col justify-between px-5 pb-8 pt-24 md:px-8 md:pb-12 md:pt-32">
          <div data-hero-title className="max-w-xl">
            <p data-hero-in className="tag">
              {entreprise.accroche}
            </p>
            <h1 data-hero-in className="mt-3 text-[clamp(2.8rem,11vw,6.5rem)] font-bold leading-[0.92]">
              L’eau,
              <br />
              <span className="bg-gradient-to-r from-eau to-cuivre-clair bg-clip-text text-transparent">on la maîtrise.</span>
            </h1>
            <p data-hero-in className="mt-5 hidden max-w-md text-lg text-ecume/75 md:block">
              {entreprise.intro}
            </p>
          </div>

          <div className="pointer-events-auto flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <ol className="flex gap-2 md:max-w-md md:flex-col md:gap-3" aria-label="Notre façon de travailler">
              {etapesHero.map((e, i) => (
                <li
                  key={e.titre}
                  className={`flex-1 rounded-xl border px-3 py-2.5 transition-all duration-500 md:px-4 md:py-3 ${
                    step === i ? 'border-eau/60 bg-nuit/80 backdrop-blur' : 'border-ecume/10 bg-nuit/40 opacity-60'
                  }`}
                >
                  <p className="font-display text-xs font-semibold text-eau md:text-sm">0{i + 1}</p>
                  <p className="font-display text-sm font-bold leading-tight md:text-lg">{e.titre}</p>
                  <p className="mt-1 hidden text-sm text-ecume/65 md:block">{e.texte}</p>
                </li>
              ))}
            </ol>
            <div data-hero-in className="flex gap-3">
              <a href="#devis" className="btn btn-eau flex-1 md:flex-none">
                Devis gratuit
              </a>
              <a href={`tel:${entreprise.telephoneLien}`} className="btn btn-ligne flex-1 md:flex-none">
                <Telephone /> Appeler
              </a>
            </div>
          </div>
        </div>

        {!reduced && (
          <p
            className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-ecume/40 md:block"
            aria-hidden="true"
          >
            Faites défiler ↓
          </p>
        )}
      </div>
    </section>
  );
}
