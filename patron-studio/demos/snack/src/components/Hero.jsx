import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { formatEuros } from '@demos/shared/lib/validation.js';
import { allergenes, produits, snack } from '../data/site';
import { Photo } from './Sections';

// La scène 3D (three.js) est chargée à part, après l'affichage du texte.
const Snack3D = lazy(() => import('../three/Snack3D'));

const BURGERS = produits.filter((p) => p.cat === 'burgers');
const N = BURGERS.length;
// mêmes repères que la scène (three/Snack3D.jsx, TRAJET) : sur les burgers à partir de 0,38 ;
// chaque burger occupe ensuite une part égale du défilement, jusqu'à la sortie vers le site
const CHOIX = [0.4, 0.9];
const SUR_BURGER = 0.37;
const FIN = [0.92, 0.98];
const MAX_PIVOT = 0.35;
const TAG = { veggie: 'Végétarien', piment: 'Ça pique', star: 'Le best-seller' };

const Fleche = ({ sens }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d={sens < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

/**
 * Accueil Crunch! : une vraie scène 3D pilotée par le défilement (et le doigt).
 * La devanture et son néon, on entre, puis zoom rapide par-dessus le comptoir jusqu'à la plancha :
 * les burgers (vraies photos détourées) attendent sur le passe-plat. Le burger change au défilement,
 * avec les flèches ou d'un geste ; glisser lentement le fait pivoter. Puis la carte et les allergènes.
 * Sans 3D ou avec « réduire les animations » : la vraie photo du burger choisi et les mêmes commandes.
 */
export default function Hero({ onReady, ajouter }) {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const intro = useRef(null);
  const fin = useRef(null);
  const progres = useRef(0);
  const indexRef = useRef(0);
  const geste = useRef({ spin: 0 });
  const glisse = useRef(null);
  const enVue = useInView(section, '0px');
  const [tier] = useState(getDeviceTier);
  const [charger3d, setCharger3d] = useState(false);
  const [pret3d, setPret3d] = useState(false);
  const [etape, setEtape] = useState(0); // 0 dehors, 1 visite, 2 sur les burgers
  const [index, setIndex] = useState(0);
  const [ajoute, setAjoute] = useState(false);
  const avec3d = tier !== 'none' && !reduit;
  const leger = tier === 'low';
  const surBurger = etape === 2 || !avec3d;
  const b = BURGERS[index];

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (!avec3d) return;
    const maj = () => {
      const s = section.current;
      if (!s) return;
      const r = s.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      progres.current = p;
      setEtape(p < 0.03 ? 0 : p < SUR_BURGER ? 1 : 2);
      // le défilement choisit le burger
      const k = Math.min(N - 1, Math.max(0, Math.floor(((p - CHOIX[0]) / (CHOIX[1] - CHOIX[0])) * N)));
      setIndex(k);
      if (fin.current) fin.current.style.opacity = String(Math.min(1, Math.max(0, (p - FIN[0]) / (FIN[1] - FIN[0]))));
    };
    maj();
    addEventListener('scroll', maj, { passive: true });
    addEventListener('resize', maj);
    return () => {
      removeEventListener('scroll', maj);
      removeEventListener('resize', maj);
    };
  }, [avec3d]);

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
      gsap.from('[data-in]', { opacity: 0, y: 26, duration: 1, stagger: 0.09, ease: 'power3.out', delay: 0.35 });
    }, intro);
    return () => ctx.revert();
  }, [reduit]);

  /** Aller à un burger : avec la 3D, on fait défiler jusqu'à sa place (le défilement reste le seul pilote). */
  const aller = useCallback(
    (k) => {
      const i = (k + N) % N;
      geste.current.spin = 0;
      if (!avec3d) {
        setIndex(i);
        return;
      }
      const s = section.current;
      const p = CHOIX[0] + ((i + 0.5) / N) * (CHOIX[1] - CHOIX[0]);
      scrollTo({ top: s.getBoundingClientRect().top + scrollY + p * (s.offsetHeight - innerHeight), behavior: reduit ? 'auto' : 'smooth' });
    },
    [avec3d, reduit],
  );
  const changer = (pas) => aller(index + pas);
  const entrer = () => {
    const s = section.current;
    scrollTo({ top: s.getBoundingClientRect().top + scrollY + 0.38 * (s.offsetHeight - innerHeight), behavior: 'smooth' });
  };

  /* glisser lentement = pivoter le burger ; glisser vite = burger suivant */
  const down = (e) => {
    if (!surBurger || e.button > 0) return;
    glisse.current = { x0: e.clientX, y0: e.clientY, t0: performance.now(), s0: geste.current.spin };
    gsap.killTweensOf(geste.current);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const move = (e) => {
    const g = glisse.current;
    if (!g) return;
    geste.current.spin = Math.max(-MAX_PIVOT, Math.min(MAX_PIVOT, g.s0 + (e.clientX - g.x0) * 0.004));
  };
  const up = (e) => {
    const g = glisse.current;
    glisse.current = null;
    if (!g) return;
    const dx = e.clientX - g.x0;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(e.clientY - g.y0) * 1.2 && performance.now() - g.t0 < 420) {
      changer(dx < 0 ? 1 : -1);
      return;
    }
    gsap.to(geste.current, { spin: 0, duration: 1.2, ease: 'elastic.out(1, 0.6)', delay: 0.5 });
  };
  const touche = (e) => {
    if (e.key === 'ArrowRight') changer(1);
    else if (e.key === 'ArrowLeft') changer(-1);
    else return;
    e.preventDefault();
  };
  const ajouterBurger = () => {
    ajouter?.(b.id);
    setAjoute(true);
    setTimeout(() => setAjoute(false), 1500);
  };

  const Intro = (
    <div ref={intro} className="relative z-10 max-w-xl px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:max-w-[48%] md:px-12 md:pb-0">
      <p data-in className="surtitre">
        {snack.accroche}
      </p>
      <h1 className="mt-3 text-[clamp(3rem,min(12vw,10svh),7.5rem)]">
        <span data-in className="block">
          Smash.
        </span>
        <span data-in className="block bg-gradient-to-r from-braise via-[#ff8a2b] to-flamme bg-clip-text pb-1 text-transparent">
          Crunch.
        </span>
        <span data-in className="block">
          Miam.
        </span>
      </h1>
      <p data-in className="mt-5 hidden max-w-md text-lg leading-relaxed text-creme/80 md:block">
        {snack.intro}
      </p>
      <div data-in className="mt-7 flex flex-wrap gap-3">
        {avec3d ? (
          <button type="button" onClick={entrer} className="btn btn-braise px-8 text-lg">
            Entrer
          </button>
        ) : (
          <a href="#commande" className="btn btn-braise px-8 text-lg">
            Commander
          </a>
        )}
        <a href="#carte" className="btn btn-ligne">
          Voir la carte
        </a>
      </div>
    </div>
  );

  return (
    <section
      id="accueil"
      ref={section}
      aria-label="Accueil : Crunch!, smash burgers"
      className="relative bg-nuit text-creme"
      style={{ height: avec3d ? '820svh' : 'auto' }}
    >
      <div className={avec3d ? 'sticky top-0 h-[100svh] overflow-hidden' : 'relative min-h-[100svh] overflow-hidden'}>
        {/* la vraie photo (le temps que la 3D se charge, ou sans 3D) */}
        {(!avec3d || !pret3d) && (
          <div className={`absolute inset-0 transition-opacity duration-700 ${pret3d ? 'opacity-0' : 'opacity-100'}`}>
            <Photo
              nom={avec3d ? 'accueil-smash-burger' : b.photo}
              alt={avec3d ? '' : b.nom}
              sizes="100vw"
              prioritaire
              className="h-full w-full object-cover md:object-[70%_50%]"
            />
          </div>
        )}
        {avec3d && charger3d && (
          <Suspense fallback={null}>
            <Snack3D progres={progres} burgers={BURGERS} index={indexRef} geste={geste} leger={leger} actif={enVue} onReady={pret} />
          </Suspense>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nuit/90 via-transparent to-nuit/30 md:bg-gradient-to-r md:from-nuit/85 md:via-nuit/10 md:to-transparent" />

        {/* zone de manipulation du burger */}
        <div
          role="group"
          aria-roledescription="carrousel"
          aria-label={`Nos burgers : ${b.nom}. Flèches gauche et droite pour changer.`}
          tabIndex={surBurger ? 0 : -1}
          onKeyDown={touche}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={() => (glisse.current = null)}
          className={`absolute inset-x-0 top-[10%] h-[42%] touch-pan-y select-none outline-none md:left-[40%] md:top-[15%] md:h-[70%] ${
            surBurger ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
          }`}
        />

        {/* dehors : le titre */}
        <div
          className={`absolute inset-0 flex items-end transition-opacity duration-500 md:items-center ${
            etape === 0 || !avec3d ? (surBurger && !avec3d ? 'pointer-events-none opacity-0' : 'opacity-100') : 'pointer-events-none opacity-0'
          }`}
        >
          {Intro}
        </div>

        {/* sur les burgers : nom, prix, recette, allergènes, flèches */}
        <div
          className={`absolute inset-x-0 bottom-0 px-5 pb-[calc(6.2rem+env(safe-area-inset-bottom))] transition-opacity duration-500 md:inset-y-0 md:flex md:max-w-[42%] md:flex-col md:justify-center md:px-12 md:pb-0 ${
            surBurger ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={!surBurger}
        >
          <div aria-live="polite">
            <p className="surtitre">
              Burger {index + 1} / {N}
              {b.tags.length > 0 && ` · ${b.tags.map((t) => TAG[t]).join(' · ')}`}
            </p>
            <div className="mt-1 flex items-baseline justify-between gap-4">
              <h2 className="text-[clamp(1.9rem,7vw,4.4rem)]">{b.nom}</h2>
              <span className="titre whitespace-nowrap text-3xl text-flamme md:text-4xl">{formatEuros(b.prix)}</span>
            </div>
            <p className="mt-2 line-clamp-2 text-base leading-relaxed text-creme/80 md:line-clamp-none md:text-lg">{b.desc}</p>
            <p className="mt-2 text-base text-creme/60">
              <span className="font-semibold text-creme/80">Allergènes :</span> {b.allergenes.map((a) => allergenes[a]).join(', ')}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button type="button" onClick={() => changer(-1)} className="cr-fleche" aria-label="Burger précédent" tabIndex={surBurger ? 0 : -1}>
              <Fleche sens={-1} />
            </button>
            <div className="flex gap-1.5" aria-hidden="true">
              {BURGERS.map((x, i) => (
                <span key={x.id} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-braise' : 'w-1.5 bg-creme/30'}`} />
              ))}
            </div>
            <button type="button" onClick={() => changer(1)} className="cr-fleche" aria-label="Burger suivant" tabIndex={surBurger ? 0 : -1}>
              <Fleche sens={1} />
            </button>
            {avec3d && (
              <span className="ml-2 hidden text-xs uppercase tracking-[0.2em] text-creme/50 md:inline" aria-hidden="true">
                Défilez ou glissez
              </span>
            )}
          </div>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={ajouterBurger} className="btn btn-braise flex-1 md:flex-none" tabIndex={surBurger ? 0 : -1}>
              {ajoute ? 'Ajouté ✓' : 'Ajouter'}
            </button>
            <a href="#carte" className="btn btn-ligne flex-1 md:flex-none" tabIndex={surBurger ? 0 : -1}>
              Toute la carte
            </a>
          </div>
        </div>

        {/* sortie vers le site */}
        <div ref={fin} className="pointer-events-none absolute inset-0 bg-nuit opacity-0" aria-hidden="true" />
      </div>
    </section>
  );
}
