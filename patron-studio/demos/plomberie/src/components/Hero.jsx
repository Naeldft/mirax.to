import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { photoSrcSet, photoUrl } from '@demos/shared/components/Photo.jsx';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { entreprise, etapesHero } from '../data/site';
import { Telephone } from './Icons';

// La scène 3D (three.js) est chargée à part, après l'affichage du texte.
const Canalisation = lazy(() => import('../three/Canalisation'));

// mêmes repères que la scène (three/Canalisation.jsx, PHASES) : copiés ici pour ne pas charger three.js d'avance
const NOIR = [0.18, 0.25]; // passage dans le bec : bref fondu au noir
const SORTIE = 0.93; // sortie du tuyau vers le site

/**
 * Accueil Ondine Plomberie : une vraie scène 3D pilotée par le défilement.
 * Un robinet chromé dans une salle de bain ; la caméra plonge dans le bec et voyage dans la canalisation
 * (pivots à droite, à gauche, à droite vers les 3 étapes gravées sur les parois), puis ressort sur le site.
 * Sans 3D ou avec « réduire les animations » : la vraie photo du robinet et les 3 étapes en texte.
 */
export default function Hero({ onReady }) {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const intro = useRef(null);
  const noir = useRef(null);
  const sortie = useRef(null);
  const progres = useRef(0);
  const enVue = useInView(section, '0px');
  const [tier] = useState(getDeviceTier);
  const [charger3d, setCharger3d] = useState(false);
  const [pret3d, setPret3d] = useState(false);
  const [debut, setDebut] = useState(true);
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
      setDebut(p < 0.04);
      // fondu au noir au passage dans le bec, puis fondu vers le site à la sortie
      const milieu = (NOIR[0] + NOIR[1]) / 2;
      const n = p < NOIR[0] || p > NOIR[1] ? 0 : 1 - Math.abs(p - milieu) / ((NOIR[1] - NOIR[0]) / 2);
      if (noir.current) noir.current.style.opacity = String(Math.min(1, n * 1.6));
      if (sortie.current) sortie.current.style.opacity = String(Math.max(0, (p - SORTIE) / (1 - SORTIE)));
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
      gsap.from('[data-hero-in]', { y: 34, opacity: 0, duration: 1, stagger: 0.09, ease: 'power3.out', delay: 0.15 });
    }, intro);
    return () => ctx.revert();
  }, [reduit]);

  const Intro = (
    <div ref={intro} className="relative z-10 max-w-xl px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:max-w-[46%] md:px-16 md:pb-0">
      <p data-hero-in className="tag">
        {entreprise.accroche}
      </p>
      <h1 data-hero-in className="mt-3 text-[clamp(2.6rem,min(14vw,11svh),7.5rem)] font-bold leading-[0.9]">
        L’eau,
        <br />
        <span className="bg-gradient-to-r from-eau to-cuivre-clair bg-clip-text text-transparent">on la maîtrise.</span>
      </h1>
      <p data-hero-in className="mt-4 hidden max-w-md text-lg text-ecume/80 md:block">
        {entreprise.intro}
      </p>
      <div data-hero-in className="mt-6 flex gap-3">
        <a href="#devis" className="btn btn-eau flex-1 md:flex-none">
          Devis gratuit
        </a>
        <a href={`tel:${entreprise.telephoneLien}`} className="btn btn-ligne flex-1 md:flex-none">
          <Telephone /> Appeler
        </a>
      </div>
      {avec3d && (
        <p data-hero-in className="mt-8 hidden text-sm uppercase tracking-[0.25em] text-ecume/60 md:block" aria-hidden="true">
          Faites défiler · on plonge dans le robinet ↓
        </p>
      )}
    </div>
  );

  const Etapes = ({ visible }) => (
    <ol className={visible ? 'mx-auto grid max-w-7xl gap-6 px-5 py-16 md:grid-cols-3 md:px-16' : 'sr-only'}>
      {etapesHero.map((e) => (
        <li key={e.numero} className={visible ? 'rounded-3xl border border-ecume/15 bg-nuit-2 p-6' : ''}>
          <p className="font-display text-5xl font-bold text-eau">{e.numero}</p>
          <h2 className="mt-2 text-3xl font-bold">{e.titre}</h2>
          <p className="mt-2 text-lg text-ecume/80">{e.texte.join(' ')}</p>
        </li>
      ))}
    </ol>
  );

  const PhotoRobinet = (
    <img
      src={photoUrl('hero-robinet', 800)}
      srcSet={photoSrcSet('hero-robinet')}
      sizes="100vw"
      alt="Robinet chromé, une goutte d’eau tombe du bec"
      fetchPriority="high"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: '75% 45%' }}
    />
  );

  /* ----- sans 3D, ou animations réduites ----- */
  if (!avec3d) {
    return (
      <section id="accueil" ref={section} aria-label="Accueil : Ondine Plomberie" className="bg-nuit text-ecume">
        <div className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center">
          {PhotoRobinet}
          <div className="absolute inset-0 bg-gradient-to-t from-nuit via-nuit/70 to-nuit/10 md:bg-gradient-to-r md:from-nuit md:via-nuit/75 md:to-transparent" />
          {Intro}
        </div>
        <Etapes visible />
      </section>
    );
  }

  return (
    <section
      id="accueil"
      ref={section}
      aria-label="Accueil : Ondine Plomberie"
      className="relative bg-nuit text-ecume"
      style={{ height: '640svh' }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* la vraie photo le temps que la 3D se charge */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${pret3d ? 'opacity-0' : 'opacity-100'}`}>{PhotoRobinet}</div>
        {charger3d && (
          <Suspense fallback={null}>
            <Canalisation progres={progres} reduit={reduit} leger={leger} actif={enVue} onReady={pret} />
          </Suspense>
        )}
        {/* lisibilité du texte d'accueil */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-nuit/90 via-nuit/30 to-transparent transition-opacity duration-500 md:bg-gradient-to-r md:from-nuit/85 md:via-nuit/20 md:to-transparent ${
            debut ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`relative flex h-full items-end transition-opacity duration-500 md:items-center md:pt-20 ${debut ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          {Intro}
        </div>
        {/* passage dans le bec, puis sortie vers le site */}
        <div ref={noir} className="pointer-events-none absolute inset-0 bg-[#020608] opacity-0" aria-hidden="true" />
        <div ref={sortie} className="pointer-events-none absolute inset-0 bg-nuit opacity-0" aria-hidden="true" />
        <Etapes visible={false} />
      </div>
    </section>
  );
}
