import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { photoSrcSet, photoUrl } from '@demos/shared/components/Photo.jsx';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { entreprise, phases } from '../data/site';
import { Telephone } from './Icons';

// La scène 3D (three.js) est chargée à part, après l'affichage du texte.
const Maison3D = lazy(() => import('../three/Maison3D'));

// mêmes repères que la scène (three/Maison3D.jsx, PARCOURS) : copiés ici pour ne pas charger three.js d'avance
const DESCENTE = [0.19, 0.235]; // on traverse la dalle vers les fondations : bref fondu
const REMONTEE = [0.36, 0.405]; // on remonte au rez-de-chaussée
const FIN = [0.94, 0.985]; // l'appel à l'action, puis le site
const ENTREE = 0.15; // où mène « Entrer »

const pic = (p, [a, b]) => (p < a || p > b ? 0 : 1 - Math.abs(p - (a + b) / 2) / ((b - a) / 2));

/**
 * Accueil Bâti Nord : une vraie scène 3D pilotée par le défilement (et le doigt).
 * On pousse la porte d'une maison claire, on descend aux fondations, on remonte au rez-de-chaussée,
 * on prend l'escalier jusqu'à l'étage : les phrases du chantier sont peintes sur les murs au fil de la visite.
 * Sans 3D ou avec « réduire les animations » : une vraie photo de maison et les étapes en texte.
 */
export default function Hero({ onReady }) {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const intro = useRef(null);
  const voile = useRef(null);
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
      const n = Math.max(pic(p, DESCENTE), pic(p, REMONTEE));
      if (voile.current) voile.current.style.opacity = String(Math.min(1, n * 1.8));
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
      gsap.from('[data-line]', { yPercent: 110, duration: 1, stagger: 0.09, ease: 'power4.out', delay: 0.2 });
      gsap.from('[data-hero-in]', { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.6 });
    }, intro);
    return () => ctx.revert();
  }, [reduit]);

  /** « Entrer » : on avance jusqu'à la porte, qui s'ouvre (défilement doux). */
  const entrer = () => {
    const s = section.current;
    const y = s.getBoundingClientRect().top + scrollY + ENTREE * (s.offsetHeight - innerHeight);
    scrollTo({ top: y, behavior: 'smooth' });
  };

  const Intro = (
    <div
      ref={intro}
      className="relative z-10 max-w-2xl px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:max-w-[46%] md:px-16 md:pb-0"
    >
      <p data-hero-in className="etiquette">
        {entreprise.accroche}
      </p>
      <h1 className="mt-3 text-[clamp(2.5rem,min(11.5vw,8svh),4.5rem)] leading-[0.9] md:text-[clamp(3rem,min(5.6vw,10svh),6.2rem)]">
        {['On bâtit.', 'Vous', 'emménagez.'].map((l, i) => (
          <span key={l} className="block overflow-hidden">
            <span data-line className={`block ${i ? 'text-plan' : ''}`}>
              {l}
            </span>
          </span>
        ))}
      </h1>
      <p data-hero-in className="mt-4 hidden max-w-md text-lg text-graphite md:block">
        {entreprise.intro}
      </p>
      <div data-hero-in className="mt-6 flex gap-3">
        {avec3d ? (
          <button type="button" onClick={entrer} className="btn btn-jaune flex-1 md:flex-none">
            Entrer
          </button>
        ) : (
          <a href="#devis" className="btn btn-jaune flex-1 md:flex-none">
            Devis gratuit
          </a>
        )}
        <a href={`tel:${entreprise.telephoneLien}`} className="btn btn-blanc flex-1 md:flex-none">
          <Telephone /> Appeler
        </a>
      </div>
      {avec3d && (
        <p data-hero-in className="mt-8 hidden text-sm font-semibold uppercase tracking-[0.25em] text-graphite md:block" aria-hidden="true">
          Entrez, ou faites défiler · visite du chantier ↓
        </p>
      )}
    </div>
  );

  const Phases = ({ visible }) => (
    <ol className={visible ? 'mx-auto grid max-w-7xl gap-4 px-5 py-14 sm:grid-cols-2 md:px-16 lg:grid-cols-5' : 'sr-only'}>
      {phases.map((ph, i) => (
        <li key={ph.nom} className={visible ? 'border-t-4 border-chantier bg-papier p-5' : ''}>
          <p className="font-cond text-sm font-bold uppercase tracking-widest text-graphite">Phase {String(i + 1).padStart(2, '0')}</p>
          <p className="mt-1 font-display text-xl uppercase">{ph.nom}</p>
          <p className="mt-1 text-graphite">{ph.texte}</p>
        </li>
      ))}
    </ol>
  );

  const PhotoMaison = (
    <img
      src={photoUrl('realisation-maison-familiale', 800)}
      srcSet={photoSrcSet('realisation-maison-familiale')}
      sizes="100vw"
      alt="Maison familiale à toit pentu entre les arbres, lumière du soir"
      fetchPriority="high"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );

  /* ----- sans 3D, ou animations réduites ----- */
  if (!avec3d) {
    return (
      <section id="accueil" ref={section} aria-label="Accueil : Bâti Nord Construction" className="bg-beton text-anthracite">
        <div className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center">
          {PhotoMaison}
          <div className="absolute inset-0 bg-gradient-to-t from-beton via-beton/80 to-beton/10 md:bg-gradient-to-r md:from-beton md:via-beton/80 md:to-transparent" />
          {Intro}
        </div>
        <Phases visible />
      </section>
    );
  }

  return (
    <section id="accueil" ref={section} aria-label="Accueil : Bâti Nord Construction" className="relative bg-beton text-anthracite" style={{ height: '640svh' }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* une vraie photo le temps que la 3D se charge */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${pret3d ? 'opacity-0' : 'opacity-100'}`}>{PhotoMaison}</div>
        {charger3d && (
          <Suspense fallback={null}>
            <Maison3D progres={progres} phases={phases} slogan={entreprise.slogan} leger={leger} actif={enVue} onReady={pret} />
          </Suspense>
        )}
        {/* lisibilité du texte d'accueil */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-beton/95 via-beton/50 to-transparent transition-opacity duration-500 md:bg-gradient-to-r md:from-beton/90 md:via-beton/40 md:to-transparent ${
            debut ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`relative flex h-full items-end transition-opacity duration-500 md:items-center md:pt-20 ${debut ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          {Intro}
        </div>
        {/* traversée de la dalle (descente aux fondations, puis remontée) */}
        <div ref={voile} className="pointer-events-none absolute inset-0 bg-anthracite opacity-0" aria-hidden="true" />
        {/* fin : devis et réalisations, puis le reste du site */}
        <div
          ref={fin}
          className={`absolute inset-0 flex items-center justify-center bg-beton/90 px-5 opacity-0 ${finVisible ? '' : 'pointer-events-none'}`}
        >
          <div className="max-w-xl text-center">
            <p className="etiquette">{entreprise.nomComplet}</p>
            <p className="mt-3 font-display text-[clamp(2.4rem,9vw,5rem)] uppercase leading-[0.9]">
              On bâtit.
              <br />
              <span className="text-plan">Vous emménagez.</span>
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href="#devis" className="btn btn-jaune" tabIndex={finVisible ? 0 : -1}>
                Devis gratuit
              </a>
              <a href="#realisations" className="btn btn-blanc" tabIndex={finVisible ? 0 : -1}>
                Nos réalisations
              </a>
            </div>
          </div>
        </div>
        <Phases visible={false} />
      </div>
    </section>
  );
}
