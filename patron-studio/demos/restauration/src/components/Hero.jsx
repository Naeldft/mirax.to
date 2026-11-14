import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { disqueImage, formatPrix, pizzasPlateau } from '../data/pizzas';
import { restaurant } from '../data/site';

// La scène 3D (three.js, modèles, textures) est chargée à part, après l'affichage du texte.
const Pizzeria = lazy(() => import('../three/Pizzeria'));

const CATEGORIE = { classique: 'Classique', epicee: 'Épicée', vegetarienne: 'Végétarienne' };
const N = pizzasPlateau.length;
const FIN = 0.82; // à partir d'ici, la caméra est sur la pizza : on peut la manipuler

/**
 * Accueil Forno Vivo : une vraie scène 3D (la pizzeria, le four à bois, le comptoir).
 * Le défilement fait avancer la caméra : elle entre, pivote vers les ardoises, puis descend sur la pizza.
 * Là : flèches, pastilles, glisser vite (téléphone) pour changer de pizza ; glisser lentement pour la faire pivoter ;
 * « Voir la carte » mène à la carte. La section est haute (le défilement pilote la caméra), la scène reste fixée.
 * Animations réduites : la caméra est directement sur la pizza, rien ne défile.
 */
export default function Hero({ onReady }) {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const scene = useRef(null);
  const intro = useRef(null);
  const progres = useRef(0);
  const enVue = useInView(section, '0px');
  const [tier] = useState(getDeviceTier);
  const [charger3d, setCharger3d] = useState(false);
  const [pret3d, setPret3d] = useState(false);
  const [etape, setEtape] = useState(reduit ? 2 : 0); // 0 entrée, 1 visite, 2 sur la pizza
  const [etat, setEtat] = useState({ index: 0, direction: 1 });
  const geste = useRef({ spin: 0, tilt: 0 });
  const glisse = useRef(null);
  const pizza = pizzasPlateau[etat.index];
  const avec3d = tier !== 'none';
  const leger = tier === 'low';
  const surPizza = etape === 2 || !avec3d;

  const changer = useCallback((pas) => setEtat((e) => ({ index: (e.index + pas + N) % N, direction: pas })), []);
  const aller = useCallback((i) => setEtat((e) => (i === e.index ? e : { index: i, direction: i > e.index ? 1 : -1 })), []);

  // le défilement dans la section pilote la caméra (progres 0 → 1)
  useEffect(() => {
    if (reduit) {
      progres.current = 1;
      return;
    }
    const maj = () => {
      const s = section.current;
      if (!s) return;
      const r = s.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      progres.current = p;
      setEtape(p < 0.1 ? 0 : p < FIN ? 1 : 2);
    };
    maj();
    addEventListener('scroll', maj, { passive: true });
    addEventListener('resize', maj);
    return () => {
      removeEventListener('scroll', maj);
      removeEventListener('resize', maj);
    };
  }, [reduit]);

  // la 3D se charge quand le navigateur est libre ; l'écran de chargement n'attend jamais plus de 2,5 s
  useEffect(() => {
    if (!avec3d) {
      onReady?.();
      return;
    }
    const go = () => setCharger3d(true);
    const t = 'requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 600 }) : setTimeout(go, 150);
    const garde = setTimeout(() => onReady?.(), 2500);
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

  useLayoutEffect(() => {
    if (reduit) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-in]', { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.2 });
    }, intro);
    return () => ctx.revert();
  }, [reduit]);

  /* ----- gestes sur la pizza : glisser lentement = pivoter ; glisser vite = changer ----- */
  const down = (e) => {
    if (!surPizza || e.button > 0) return;
    glisse.current = {
      x0: e.clientX,
      y0: e.clientY,
      t0: performance.now(),
      spin0: geste.current.spin,
      tilt0: geste.current.tilt,
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
    if (e.pointerType === 'mouse') geste.current.tilt = Math.max(-0.35, Math.min(0.45, g.tilt0 + dy * 0.004));
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
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.2 && performance.now() - g.t0 < 420) {
      changer(dx < 0 ? 1 : -1);
      return;
    }
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
    <section
      id="accueil"
      ref={section}
      aria-label="Accueil : Forno Vivo et nos pizzas"
      className="relative bg-charbon text-creme"
      style={{ height: reduit || !avec3d ? '100svh' : '520svh' }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* la scène 3D (ou, sans 3D, la vraie photo de la pizza) */}
        <div className="absolute inset-0 bg-charbon">
          {(!avec3d || !pret3d) && (
            <img
              src={disqueImage(pizza.disque, 512)}
              alt=""
              className={`absolute left-1/2 top-[34%] aspect-square w-[min(70vw,46svh)] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 md:left-[66%] md:top-1/2 md:w-[min(40vw,60svh)] ${
                pret3d ? 'opacity-0' : 'opacity-100'
              }`}
            />
          )}
          {avec3d && charger3d && (
            <Suspense fallback={null}>
              <Pizzeria
                progres={progres}
                pizzas={pizzasPlateau}
                index={etat.index}
                direction={etat.direction}
                geste={geste}
                reduit={reduit}
                leger={leger}
                actif={enVue}
                onReady={pret}
              />
            </Suspense>
          )}
          {/* voile pour la lisibilité du texte */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charbon/85 via-transparent to-charbon/40 md:bg-gradient-to-r md:from-charbon/80 md:via-charbon/10 md:to-transparent" />
        </div>

        {/* zone de manipulation de la pizza (active quand la caméra est dessus) */}
        <div
          ref={scene}
          role="group"
          aria-roledescription="carrousel"
          aria-label={`Nos pizzas : ${pizza.nom}. Flèches gauche et droite pour changer.`}
          tabIndex={surPizza ? 0 : -1}
          onKeyDown={touche}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={() => (glisse.current = null)}
          className={`absolute inset-x-0 top-[12%] h-[48%] touch-pan-y select-none outline-none md:left-[40%] md:top-[15%] md:h-[70%] ${
            surPizza ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
          }`}
        />

        {/* 1. l'entrée : le nom de la pizzeria */}
        <div
          ref={intro}
          className={`absolute inset-x-0 bottom-0 px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] transition-opacity duration-500 md:inset-y-0 md:flex md:max-w-[52%] md:flex-col md:justify-center md:px-12 md:pb-0 ${
            etape === 0 ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <p data-hero-in className="eyebrow">
            {restaurant.accroche}
          </p>
          <h1 data-hero-in className="mt-2 text-[clamp(3.4rem,15vw,8.5rem)] font-semibold leading-[0.88]">
            Forno <em className="font-medium text-or-clair">Vivo</em>
          </h1>
          <p data-hero-in className="mt-3 font-serif text-xl italic text-creme/85 md:text-3xl">
            {restaurant.slogan}
          </p>
          <p data-hero-in className="mt-6 text-sm uppercase tracking-[0.25em] text-creme/60" aria-hidden="true">
            Faites défiler · on entre ↓
          </p>
        </div>

        {/* ce qu'affichent les ardoises, pour les lecteurs d'écran et Google */}
        <ul className="sr-only">
          <li>Notre pâte maturée 48 heures, farine italienne, tomates San Marzano.</li>
          <li>Cuite au feu de bois à 450 °C en 90 secondes, comme à Naples.</li>
        </ul>

        {/* 3. sur la pizza : nom, prix, flèches, « Voir la carte » */}
        <div
          className={`absolute inset-x-0 bottom-0 px-5 pb-[calc(6.2rem+env(safe-area-inset-bottom))] transition-opacity duration-500 md:inset-y-0 md:flex md:max-w-[40%] md:flex-col md:justify-center md:px-12 md:pb-0 ${
            surPizza ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={!surPizza}
        >
          <div aria-live="polite">
            <div key={pizza.id} className={reduit ? '' : 'fv-texte'}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-or-clair">
                N° {String(etat.index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')} ·{' '}
                {pizza.categories.map((c) => CATEGORIE[c]).join(' · ')}
              </p>
              <div className="mt-1 flex items-baseline justify-between gap-4">
                <h2 className="text-4xl font-semibold md:text-6xl">{pizza.nom}</h2>
                <span className="whitespace-nowrap font-serif text-2xl text-or-clair md:text-4xl">{formatPrix(pizza.prix)}</span>
              </div>
              <p className="mt-1 font-serif text-base italic text-creme/85 md:mt-2 md:text-xl">{pizza.description}</p>
              <p className="mt-1 hidden text-sm leading-relaxed text-creme/65 md:block md:text-base">{pizza.ingredients.join(' · ')}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => changer(-1)}
              className="fv-fleche"
              aria-label="Pizza précédente"
              tabIndex={surPizza ? 0 : -1}
            >
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
            <div className="hidden flex-wrap gap-2 md:flex" role="group" aria-label="Choisir une pizza">
              {pizzasPlateau.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => aller(i)}
                  aria-pressed={i === etat.index}
                  tabIndex={surPizza ? 0 : -1}
                  className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                    i === etat.index ? 'border-or-clair bg-or-clair text-charbon' : 'border-creme/25 text-creme/80 hover:border-creme/60'
                  }`}
                >
                  {p.nom}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => changer(1)} className="fv-fleche" aria-label="Pizza suivante" tabIndex={surPizza ? 0 : -1}>
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
            <span className="ml-2 text-xs uppercase tracking-[0.2em] text-creme/55 md:hidden" aria-hidden="true">
              Glissez pour tourner
            </span>
          </div>
          <div className="mt-4 flex gap-3">
            <a href="#menu" className="btn btn-primary flex-1 md:flex-none" tabIndex={surPizza ? 0 : -1}>
              Voir la carte
            </a>
            <a href="#reservation" className="btn btn-ghost flex-1 md:flex-none" tabIndex={surPizza ? 0 : -1}>
              Réserver
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
