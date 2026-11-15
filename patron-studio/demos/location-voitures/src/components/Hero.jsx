import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { photoSrcSet, photoUrl } from '@demos/shared/components/Photo.jsx';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { entreprise, modeles, specsHero } from '../data/site';
import { Check } from './Icons';

// La scène 3D (three.js) est chargée à part, après l'affichage du texte.
const Velocita3D = lazy(() => import('../three/Velocita3D'));

// mêmes repères que la scène (three/Velocita3D.jsx, REPERES) : copiés ici pour ne pas charger three.js d'avance
const NOIR = [0.12, 0.17]; // la voiture nous percute : bref fondu au noir, on est dans l'habitacle
const PARE_BRISE = [0.58, 0.66]; // on ressort par le pare-brise
const FIN = [0.88, 0.96]; // l'appel à l'action, puis le site
const HABITACLE = 0.175; // où mène « Démarrer »

const pic = (p, [a, b]) => (p < a || p > b ? 0 : 1 - Math.abs(p - (a + b) / 2) / ((b - a) / 2));

/**
 * Accueil Velocità : une vraie scène 3D pilotée par le défilement (et le doigt).
 * Le coupé fonce vers nous, on entre dans l'habitacle (vraie photo mise en relief) : compteur, écran, portière
 * portent les 3 engagements. On ressort par le pare-brise devant les 4 catégories, puis modèles et réservation.
 * Sans 3D ou avec « réduire les animations » : la vraie photo du coupé, les engagements et les catégories en texte.
 */
export default function Hero({ onModel, onReady }) {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const intro = useRef(null);
  const noir = useRef(null);
  const fin = useRef(null);
  const progres = useRef(0);
  const enVue = useInView(section, '0px');
  const [tier] = useState(getDeviceTier);
  const [charger3d, setCharger3d] = useState(false);
  const [pret3d, setPret3d] = useState(false);
  const [debut, setDebut] = useState(true);
  const [finVisible, setFinVisible] = useState(false);
  const avec3d = tier !== 'none' && !reduit;
  const leger = tier === 'low';

  useEffect(() => {
    if (!avec3d) return;
    const maj = () => {
      const s = section.current;
      if (!s) return;
      const r = s.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      progres.current = p;
      setDebut(p < 0.025);
      setFinVisible(p > FIN[0]);
      const n = Math.max(pic(p, NOIR), pic(p, PARE_BRISE));
      if (noir.current) noir.current.style.opacity = String(Math.min(1, n * 1.7));
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
      gsap.from('[data-word]', { yPercent: 110, duration: 1, stagger: 0.08, ease: 'power4.out', delay: 0.2 });
      gsap.from('[data-hero-in]', { y: 26, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.6 });
    }, intro);
    return () => ctx.revert();
  }, [reduit]);

  /** « Démarrer » : la voiture fonce vers nous (défilement doux jusqu'à l'habitacle). */
  const demarrer = () => {
    const s = section.current;
    const y = s.getBoundingClientRect().top + scrollY + HABITACLE * (s.offsetHeight - innerHeight);
    if (window.lenis) window.lenis.scrollTo(y, { duration: 2.2 });
    else scrollTo({ top: y, behavior: 'smooth' });
  };

  const Engagements = ({ className }) => (
    <ul className={className}>
      {specsHero.map((s) => (
        <li key={s} className="flex items-center gap-2 text-base text-ivoire/80">
          <span className="text-course-vif">
            <Check />
          </span>
          {s}
        </li>
      ))}
    </ul>
  );

  const Intro = (
    <div ref={intro} className="relative z-10 max-w-xl px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:max-w-[46%] md:px-16 md:pb-0">
      <p data-hero-in className="surtitre">
        {entreprise.accroche}
      </p>
      <h1 className="mt-3 font-display text-[clamp(3rem,min(13vw,12svh),7rem)] md:text-[clamp(3rem,min(6.4vw,12svh),7rem)] font-bold uppercase leading-[0.92]">
        {['Prenez', 'la route.'].map((w) => (
          <span key={w} className="block overflow-hidden">
            <span data-word className="block">
              {w}
            </span>
          </span>
        ))}
      </h1>
      <Engagements className={avec3d ? 'sr-only' : 'mt-4 space-y-1'} />
      <div data-hero-in className="mt-6 flex gap-3">
        {avec3d ? (
          <button type="button" onClick={demarrer} className="btn btn-course flex-1 md:flex-none">
            Démarrer
          </button>
        ) : (
          <a href="#reserver" className="btn btn-course flex-1 md:flex-none">
            Réserver
          </a>
        )}
        <a href="#flotte" className="btn btn-ligne flex-1 md:flex-none">
          La flotte
        </a>
      </div>
      {avec3d && (
        <p data-hero-in className="mt-8 hidden text-sm uppercase tracking-[0.25em] text-ivoire/60 md:block" aria-hidden="true">
          Démarrez, ou faites défiler · on monte à bord ↓
        </p>
      )}
    </div>
  );

  const Categories = ({ visible }) => (
    <ul className={visible ? 'mx-auto grid max-w-7xl gap-4 px-5 py-14 sm:grid-cols-2 md:px-16 lg:grid-cols-4' : 'sr-only'}>
      {modeles.map((m) => (
        <li key={m.id} className={visible ? 'border border-ivoire/10 bg-laque p-5' : ''}>
          <p className="surtitre !text-[0.65rem]">{m.categorie}</p>
          <p className="mt-1 font-display text-xl font-bold uppercase">{m.nom}</p>
          <p className="mt-1 text-ivoire/70">
            dès {m.prix} € / jour · {m.places} places
          </p>
        </li>
      ))}
    </ul>
  );

  const PhotoCoupe = (
    <img
      src={photoUrl('flotte-premium', 800)}
      srcSet={photoSrcSet('flotte-premium')}
      sizes="100vw"
      alt="Mercedes-AMG GT gris mat vu de trois quarts avant"
      fetchPriority="high"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: '60% 55%' }}
    />
  );

  /* ----- sans 3D, ou animations réduites ----- */
  if (!avec3d) {
    return (
      <section id="accueil" ref={section} aria-label="Accueil : Velocità, location de voitures" className="vitesse bg-laque text-ivoire">
        <div className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center">
          {PhotoCoupe}
          <div className="absolute inset-0 bg-gradient-to-t from-laque via-laque/70 to-laque/10 md:bg-gradient-to-r md:from-laque md:via-laque/75 md:to-transparent" />
          {Intro}
        </div>
        <Categories visible />
      </section>
    );
  }

  return (
    <section
      id="accueil"
      ref={section}
      aria-label="Accueil : Velocità, location de voitures"
      className="vitesse relative bg-laque text-ivoire"
      style={{ height: '600svh' }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* la vraie photo le temps que la 3D se charge */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${pret3d ? 'opacity-0' : 'opacity-100'}`}>{PhotoCoupe}</div>
        {charger3d && (
          <Suspense fallback={null}>
            <Velocita3D progres={progres} modeles={modeles} leger={leger} actif={enVue} onReady={pret} />
          </Suspense>
        )}
        {/* lisibilité du texte d'accueil */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-laque/90 via-laque/30 to-transparent transition-opacity duration-500 md:bg-gradient-to-r md:from-laque/85 md:via-laque/20 md:to-transparent ${
            debut ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`relative flex h-full items-end transition-opacity duration-500 md:items-center md:pt-20 ${debut ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          {Intro}
        </div>
        {/* impact de la voiture, puis passage par le pare-brise */}
        <div ref={noir} className="pointer-events-none absolute inset-0 bg-black opacity-0" aria-hidden="true" />
        {/* fin : les modèles et la réservation, puis le reste du site */}
        <div
          ref={fin}
          className={`absolute inset-0 flex items-center justify-center bg-laque/85 px-5 opacity-0 ${finVisible ? '' : 'pointer-events-none'}`}
        >
          <div className="max-w-xl text-center">
            <p className="surtitre">4 catégories · {modeles.length} modèles disponibles</p>
            <p className="mt-3 font-display text-[clamp(2.4rem,9vw,5rem)] font-bold uppercase leading-[0.92]">Choisissez, roulez.</p>
            <Engagements className="mx-auto mt-5 inline-block space-y-1 text-left" />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href="#flotte" className="btn btn-ligne" tabIndex={finVisible ? 0 : -1}>
                Voir les modèles
              </a>
              <a href="#reserver" className="btn btn-course" tabIndex={finVisible ? 0 : -1} onClick={() => onModel?.('suv')}>
                Réserver
              </a>
            </div>
          </div>
        </div>
        <Categories visible={false} />
      </div>
    </section>
  );
}
