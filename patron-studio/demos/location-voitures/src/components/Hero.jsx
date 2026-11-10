import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap, ScrollTrigger } from '@demos/shared/lib/gsap.js';
import { couleurs, entreprise, modeles, specsHero } from '../data/site';
import { Check } from './Icons';

const CarScene = lazy(() => import('../three/CarScene'));

/**
 * Accueil "showroom" : voiture 3D, choix du modèle et de la couleur.
 * model / color / onModel / onColor sont partagés avec le formulaire de réservation.
 */
export default function Hero({ model, color, onModel, onColor, onReady }) {
  const section = useRef(null);
  const progress = useRef(0);
  const drag = useRef({ active: false, delta: 0, lastX: 0 });
  const reduced = useReducedMotion();
  const inView = useInView(section, '100px');
  const [tier] = useState(getDeviceTier);
  const [load3d, setLoad3d] = useState(false);
  const [phase, setPhase] = useState(0);
  const current = modeles.find((m) => m.id === model);
  const currentColor = couleurs.find((c) => c.id === color);

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
          const ph = self.progress > 0.35 ? 1 : 0;
          setPhase((o) => (o === ph ? o : ph));
        },
      });
      if (!reduced) {
        const tl = gsap.timeline({ delay: 0.25 });
        tl.from('[data-word]', { yPercent: 110, duration: 1, stagger: 0.08, ease: 'power4.out' });
        tl.from('[data-hero-in]', { y: 30, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, '-=0.6');
      }
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  // glisser pour faire tourner la voiture
  const onDown = (e) => {
    drag.current.active = true;
    drag.current.lastX = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!drag.current.active) return;
    drag.current.delta = (e.clientX - drag.current.lastX) * 0.01;
    drag.current.lastX = e.clientX;
  };
  const onUp = () => (drag.current.active = false);

  return (
    <section id="accueil" ref={section} className={`relative ${reduced ? '' : 'h-[175svh]'}`} aria-label="Accueil">
      <div className="vitesse sticky top-0 h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_70%_55%_at_50%_70%,#24262b,#0a0a0b_70%)]">
        {load3d && (
          <Suspense fallback={null}>
            <CarScene
              modelId={model}
              color={currentColor.hex}
              progress={progress}
              reduced={reduced}
              tier={tier}
              active={inView}
              onReady={onReady}
              drag={drag}
            />
          </Suspense>
        )}
        {/* zone de glisser (centre de l'écran) */}
        <div
          className="absolute inset-x-0 top-[28%] h-[42%] cursor-grab touch-pan-y active:cursor-grabbing"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          aria-hidden="true"
        />

        <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl flex-col justify-between px-5 pb-6 pt-24 md:px-8 md:pb-10 md:pt-28">
          <div>
            <p data-hero-in className="surtitre">
              {entreprise.accroche}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.3rem,9vw,6.2rem)] font-bold uppercase leading-[0.95]">
              {['Prenez', 'la route.'].map((w) => (
                <span key={w} className="block overflow-hidden">
                  <span data-word className="block">
                    {w}
                  </span>
                </span>
              ))}
            </h1>
            <ul
              className={`absolute right-8 top-32 hidden flex-col items-end gap-2 transition-all duration-700 lg:flex ${phase ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
              aria-hidden={!phase}
            >
              {specsHero.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm font-semibold text-ivoire/85">
                  <span className="text-course-vif">
                    <Check />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="pointer-events-auto grid min-w-0 gap-3 md:grid-cols-[1fr_auto] md:items-end">
            <div data-hero-in className="min-w-0">
              <div
                role="radiogroup"
                aria-label="Choisir un modèle"
                className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:px-0"
              >
                {modeles.map((m) => {
                  const on = m.id === model;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => onModel(m.id)}
                      className={`shrink-0 border px-4 py-2.5 text-left transition-all duration-300 ${on ? 'border-course bg-course text-ivoire' : 'border-ivoire/15 bg-laque/60 backdrop-blur hover:border-ivoire/40'}`}
                    >
                      <span className="block font-display text-xs font-bold uppercase">{m.categorie}</span>
                      <span className={`block text-xs ${on ? 'text-ivoire/85' : 'text-ivoire/55'}`}>dès {m.prix} € / jour</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div role="radiogroup" aria-label="Choisir une couleur" className="flex gap-2">
                  {couleurs.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={c.id === color}
                      aria-label={c.nom}
                      title={c.nom}
                      onClick={() => onColor(c.id)}
                      className={`h-9 w-9 rounded-full border-2 transition-transform duration-300 hover:scale-110 ${c.id === color ? 'scale-110 border-ivoire' : 'border-ivoire/20'}`}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
                <p className="text-xs text-ivoire/60" aria-live="polite">
                  {currentColor.nom}
                </p>
              </div>
            </div>
            <div
              data-hero-in
              className="flex items-center justify-between gap-4 border-t border-ivoire/10 pt-3 md:flex-col md:items-end md:border-0 md:pt-0"
            >
              <p className="md:text-right" aria-live="polite">
                <span className="block text-xs text-ivoire/55">{current.nom}</span>
                <span className="font-display text-2xl font-bold">
                  {current.prix} €<span className="text-sm font-normal text-ivoire/55"> / jour</span>
                </span>
              </p>
              <a href="#reserver" className="btn btn-course">
                Réserver
              </a>
            </div>
          </div>
        </div>
        {!reduced && (
          <p
            className="pointer-events-none absolute left-1/2 top-[66%] -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-ivoire/35"
            aria-hidden="true"
          >
            ← Glissez pour tourner →
          </p>
        )}
      </div>
    </section>
  );
}
