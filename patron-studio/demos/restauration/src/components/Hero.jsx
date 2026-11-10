import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { formatPrix, heroPizzas, pizzaImage, pizzas } from '../data/pizzas';
import { restaurant } from '../data/site';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap, ScrollTrigger } from '@demos/shared/lib/gsap.js';

// La 3D (three.js) est chargée à part, après l'affichage du texte : la page reste rapide.
const HeroScene = lazy(() => import('../three/HeroScene'));

const choix = heroPizzas.map((id) => pizzas.find((p) => p.id === id));

export default function Hero({ onReady }) {
  const section = useRef(null);
  const stage = useRef(null);
  const progress = useRef(0);
  const reduced = useReducedMotion();
  const inView = useInView(section, '100px');
  const [tier] = useState(getDeviceTier);
  const [current, setCurrent] = useState(choix[0]);
  const [load3d, setLoad3d] = useState(false);
  const [ready, setReady] = useState(false);

  // Chargement progressif : la 3D démarre quand le navigateur est disponible.
  useEffect(() => {
    if (tier === 'none') {
      onReady?.();
      return;
    }
    const start = () => setLoad3d(true);
    const id = 'requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 1200 }) : setTimeout(start, 400);
    return () => ('cancelIdleCallback' in window ? window.cancelIdleCallback(id) : clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- au montage uniquement
  }, [tier]);

  // Défilement : la pizza accompagne la suite de la page
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: 'bottom top',
        scrub: reduced ? false : 0.6,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
      if (!reduced) {
        gsap.to(stage.current, {
          yPercent: 18,
          scale: 1.08,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
        });
        gsap.from('[data-hero-in]', { y: 28, opacity: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out', delay: 0.1 });
      }
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  const select = (p) => setCurrent(p);
  const onKey = (e, i) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + choix.length) % choix.length;
    select(choix[next]);
    e.currentTarget.parentElement.children[next]?.focus();
  };

  return (
    <section id="accueil" ref={section} className="grain relative overflow-hidden pt-20 md:pt-24" aria-label="Accueil">
      {/* lueur du four */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_58%,rgb(216_67_47/0.28),transparent_70%),radial-gradient(ellipse_60%_40%_at_50%_100%,rgb(201_162_74/0.18),transparent_70%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-2 px-5 pb-12 md:px-8 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <div className="min-w-0 text-center lg:text-left">
          <p data-hero-in className="eyebrow">
            {restaurant.accroche}
          </p>
          <h1 data-hero-in className="mt-3 text-[clamp(3.4rem,15vw,7.5rem)] font-semibold leading-[0.95]">
            Forno <em className="font-medium text-or-clair">Vivo</em>
          </h1>
          <p data-hero-in className="mx-auto mt-4 max-w-md font-serif text-xl italic text-creme/85 md:text-2xl lg:mx-0">
            {restaurant.slogan}
          </p>
          <div data-hero-in className="mt-7 hidden gap-3 lg:flex">
            <a href="#menu" className="btn btn-primary">
              Voir le menu
            </a>
            <a href="#reservation" className="btn btn-ghost">
              Réserver
            </a>
          </div>
        </div>

        <div className="flex min-w-0 flex-col items-center">
          {/* Scène 3D (ou image si la 3D n'est pas disponible) */}
          <div ref={stage} className="relative aspect-square w-full max-w-[min(92vw,42svh,560px)] lg:max-w-[560px]" data-hero-in>
            <img
              src={pizzaImage(current.id)}
              alt={`Pizza ${current.nom}`}
              width="800"
              height="800"
              fetchPriority="high"
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
            />
            {load3d && (
              <Suspense fallback={null}>
                <HeroScene
                  pizza={current}
                  tier={tier}
                  reduced={reduced}
                  active={inView}
                  progress={progress}
                  onReady={() => {
                    setReady(true);
                    onReady?.();
                  }}
                />
              </Suspense>
            )}
            <p className="sr-only" aria-live="polite">
              Pizza affichée : {current.nom}
            </p>
          </div>

          {/* Sélecteur de pizzas */}
          <div
            role="radiogroup"
            aria-label="Choisir une pizza à afficher"
            className="-mx-5 mt-3 flex w-[calc(100%+2.5rem)] snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:w-full md:flex-wrap md:justify-center md:overflow-visible md:px-0"
          >
            {choix.map((p, i) => {
              const active = p.id === current.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => select(p)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`flex shrink-0 snap-start items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 text-left transition-all duration-300 ${
                    active
                      ? 'border-or-clair bg-creme/10 shadow-[0_0_24px_-6px_rgb(226_194_122/0.6)]'
                      : 'border-creme/15 hover:border-creme/40'
                  }`}
                >
                  <img
                    src={pizzaImage(p.id)}
                    alt=""
                    width="40"
                    height="40"
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold">{p.nom}</span>
                    <span className="block text-xs text-creme/60">{formatPrix(p.prix)}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-2 max-w-sm text-center text-sm text-creme/65" aria-hidden="true">
            {current.ingredients.join(' · ')}
          </p>

          <div className="mt-6 flex w-full gap-3 sm:w-auto lg:hidden">
            <a href="#menu" className="btn btn-primary flex-1 sm:flex-none">
              Voir le menu
            </a>
            <a href="#reservation" className="btn btn-ghost flex-1 sm:flex-none">
              Réserver
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
