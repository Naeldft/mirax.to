import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { disqueImage, formatPrix, pizzasPlateau } from '../data/pizzas';
import { restaurant } from '../data/site';

// La 3D (three.js) est chargée à part, après l'affichage du texte et de la photo : la page reste rapide.
const Plateau3D = lazy(() => import('../three/Plateau3D'));

const CATEGORIE = { classique: 'Classique', epicee: 'Épicée', vegetarienne: 'Végétarienne' };
const N = pizzasPlateau.length;

/**
 * Accueil Forno Vivo : une vraie photo de pizza, vue de dessus, posée sur un plateau qui tourne.
 *  - flèches, pastilles, ou glisser vite vers la gauche / la droite (téléphone) : pizza suivante / précédente ;
 *    le plateau roule alors hors de l'écran comme une roue et le suivant arrive en roulant ;
 *  - glisser lentement (doigt ou souris) : on fait pivoter la pizza pour voir les ingrédients ;
 *  - « Voir la carte » : va directement à la carte.
 * Sans WebGL : la même photo, en image fixe qui tourne doucement (CSS).
 */
export default function Hero({ onReady }) {
  const reduit = useReducedMotion();
  const scope = useRef(null);
  const scene = useRef(null);
  const enVue = useInView(scene, '0px');
  const [tier] = useState(getDeviceTier);
  const [charger3d, setCharger3d] = useState(false);
  const [pret3d, setPret3d] = useState(false);
  const [etat, setEtat] = useState({ index: 0, direction: 1 });
  const geste = useRef({ spin: 0, tilt: 0 });
  const glisse = useRef(null);
  const pizza = pizzasPlateau[etat.index];
  const avec3d = tier !== 'none';

  const changer = useCallback((pas) => setEtat((e) => ({ index: (e.index + pas + N) % N, direction: pas })), []);
  const aller = useCallback((i) => setEtat((e) => (i === e.index ? e : { index: i, direction: i > e.index ? 1 : -1 })), []);

  // la 3D se charge quand le navigateur est libre ; l'écran de chargement n'attend jamais plus de 1,6 s
  useEffect(() => {
    if (!avec3d) {
      onReady?.();
      return;
    }
    const go = () => setCharger3d(true);
    const t = 'requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 700 }) : setTimeout(go, 200);
    const garde = setTimeout(() => onReady?.(), 1600);
    return () => {
      'cancelIdleCallback' in window ? cancelIdleCallback(t) : clearTimeout(t);
      clearTimeout(garde);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- au montage
  }, []);
  const pret = useCallback(() => {
    setPret3d(true);
    onReady?.();
  }, [onReady]);

  // entrée du texte
  useLayoutEffect(() => {
    if (reduit) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-in]', { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.15 });
    }, scope);
    return () => ctx.revert();
  }, [reduit]);

  /* ----- gestes : glisser lentement = pivoter ; glisser vite = changer de pizza ----- */
  const down = (e) => {
    if (e.button > 0) return;
    glisse.current = {
      x0: e.clientX,
      y0: e.clientY,
      t0: performance.now(),
      spin0: geste.current.spin,
      tilt0: geste.current.tilt,
      souris: e.pointerType === 'mouse',
      vx: 0,
      xp: e.clientX,
      tp: performance.now(),
    };
    gsap.killTweensOf(geste.current);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const move = (e) => {
    const g = glisse.current;
    if (!g) return;
    const dx = e.clientX - g.x0;
    const dy = e.clientY - g.y0;
    geste.current.spin = g.spin0 + dx * 0.012;
    if (g.souris) geste.current.tilt = Math.max(-0.35, Math.min(0.5, g.tilt0 + dy * 0.004));
    const t = performance.now();
    if (t > g.tp) g.vx = (e.clientX - g.xp) / (t - g.tp);
    g.xp = e.clientX;
    g.tp = t;
  };
  const up = (e) => {
    const g = glisse.current;
    glisse.current = null;
    if (!g) return;
    const dx = e.clientX - g.x0;
    const dy = e.clientY - g.y0;
    const duree = performance.now() - g.t0;
    // geste vif et horizontal : on change de pizza (vers la gauche = la suivante)
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.2 && duree < 420) {
      changer(dx < 0 ? 1 : -1);
      return;
    }
    // sinon : élan, puis l'inclinaison revient doucement
    if (!reduit) gsap.to(geste.current, { spin: geste.current.spin + g.vx * 0.32, duration: 1.1, ease: 'power3.out' });
    gsap.to(geste.current, { tilt: 0, duration: 0.9, ease: 'elastic.out(1, 0.6)' });
  };
  const touche = (e) => {
    if (e.key === 'ArrowRight') changer(1);
    else if (e.key === 'ArrowLeft') changer(-1);
    else return;
    e.preventDefault();
  };

  return (
    <section id="accueil" aria-label="Accueil : Forno Vivo et nos pizzas" className="relative overflow-hidden bg-charbon text-creme">
      {/* fonds : un par pizza, en fondu enchaîné */}
      {pizzasPlateau.map((p, i) => (
        <div
          key={p.id}
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse 75% 65% at 66% 42%, ${p.fond[0]}, ${p.fond[1]} 78%)`,
            opacity: i === etat.index ? 1 : 0,
          }}
        />
      ))}
      {/* nom géant derrière le plateau */}
      <p
        key={`mot-${pizza.id}`}
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-[24%] w-max select-none whitespace-nowrap px-4 font-serif text-[clamp(7rem,34vw,26rem)] italic leading-none text-creme/[0.07] md:top-1/2 md:-translate-y-1/2 ${reduit ? '' : etat.direction > 0 ? 'fv-mot-g' : 'fv-mot-d'}`}
      >
        {pizza.nom}
      </p>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-16 md:grid md:grid-cols-[minmax(0,44%)_1fr] md:items-center md:gap-6 md:px-12 md:pb-16 md:pt-24">
        {/* plateau tournant */}
        <div className="relative order-first h-[36svh] min-h-[230px] md:order-last md:h-[80svh]">
          <div
            ref={scene}
            role="group"
            aria-roledescription="carrousel"
            aria-label={`Nos pizzas : ${pizza.nom}. Flèches gauche et droite pour changer.`}
            tabIndex={0}
            onKeyDown={touche}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={() => (glisse.current = null)}
            className="absolute inset-0 cursor-grab touch-pan-y select-none rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-or-clair active:cursor-grabbing"
          >
            {/* photo fixe : avant la 3D, ou à la place de la 3D */}
            <img
              key={`poster-${pizza.id}`}
              src={disqueImage(pizza.disque, 512)}
              srcSet={`${disqueImage(pizza.disque, 512)} 512w, ${disqueImage(pizza.disque, 1024)} 1024w`}
              sizes="(min-width: 768px) 40vw, 80vw"
              alt=""
              draggable="false"
              fetchPriority="high"
              className={`pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(78%,52svh)] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_30px_40px_rgb(0_0_0/0.55)] transition-opacity duration-500 md:w-[min(76%,62svh)] ${
                pret3d ? 'opacity-0' : 'opacity-100'
              } ${reduit ? '' : etat.direction > 0 ? 'fv-roule-g' : 'fv-roule-d'}`}
            />
            {charger3d && (
              <Suspense fallback={null}>
                <Plateau3D
                  pizzas={pizzasPlateau}
                  index={etat.index}
                  direction={etat.direction}
                  geste={geste}
                  reduit={reduit}
                  actif={enVue}
                  onReady={pret}
                />
              </Suspense>
            )}
          </div>
          {/* flèches */}
          <div className="pointer-events-none absolute inset-x-0 bottom-1 flex items-center justify-between md:bottom-[10%] md:justify-center md:gap-28">
            <button type="button" onClick={() => changer(-1)} className="fv-fleche pointer-events-auto" aria-label="Pizza précédente">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <p className="hidden text-xs uppercase tracking-[0.25em] text-creme/55 md:block" aria-hidden="true">
              Glissez pour tourner
            </p>
            <button type="button" onClick={() => changer(1)} className="fv-fleche pointer-events-auto" aria-label="Pizza suivante">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* texte */}
        <div ref={scope} className="relative mt-4 md:mt-0">
          <p data-hero-in className="eyebrow">
            {restaurant.accroche}
          </p>
          <h1 data-hero-in className="mt-1 text-[clamp(2.6rem,11vw,7.5rem)] font-semibold leading-[0.9] md:mt-2">
            Forno <em className="font-medium text-or-clair">Vivo</em>
          </h1>
          <p data-hero-in className="mt-2 hidden font-serif text-lg italic text-creme/80 md:block md:text-2xl">
            {restaurant.slogan}
          </p>

          <div data-hero-in className="mt-3 border-t border-creme/15 pt-3 md:mt-8 md:pt-6" aria-live="polite">
            <div key={pizza.id} className={reduit ? '' : 'fv-texte'}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-or-clair">
                N° {String(etat.index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')} ·{' '}
                {pizza.categories.map((c) => CATEGORIE[c]).join(' · ')}
              </p>
              <div className="mt-1 flex items-baseline justify-between gap-4">
                <h2 className="text-3xl font-semibold md:text-6xl">{pizza.nom}</h2>
                <span className="font-serif text-2xl text-or-clair md:text-4xl">{formatPrix(pizza.prix)}</span>
              </div>
              <p className="mt-1 font-serif text-base italic text-creme/85 md:mt-2 md:text-xl">{pizza.description}</p>
              <p className="mt-1 hidden text-sm leading-relaxed text-creme/65 md:block md:text-base">{pizza.ingredients.join(' · ')}</p>
            </div>
            {/* pastilles */}
            <div className="mt-4 hidden flex-wrap gap-2 md:flex" role="group" aria-label="Choisir une pizza">
              {pizzasPlateau.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => aller(i)}
                  aria-pressed={i === etat.index}
                  className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                    i === etat.index ? 'border-or-clair bg-or-clair text-charbon' : 'border-creme/25 text-creme/80 hover:border-creme/60'
                  }`}
                >
                  {p.nom}
                </button>
              ))}
            </div>
          </div>

          <div data-hero-in className="mt-4 flex gap-3 md:mt-6">
            <a href="#menu" className="btn btn-primary flex-1 md:flex-none">
              Voir la carte
            </a>
            <a href="#reservation" className="btn btn-ghost flex-1 md:flex-none">
              Réserver
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
