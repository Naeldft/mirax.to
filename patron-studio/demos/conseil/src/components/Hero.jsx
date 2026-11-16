import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import Counter from '@demos/shared/components/Counter.jsx';
import { cabinet, chiffres, offres } from '../data/site';

// La scène 3D (three.js) est chargée à part, après l'affichage du texte.
const Bureau3D = lazy(() => import('../three/Bureau3D'));

// mêmes repères que la scène (three/Bureau3D.jsx, ARRETS) : un arrêt par offre
const ARRETS = offres.map((_, i) => [0.2 + i * 0.24, 0.2 + i * 0.24 + 0.14]);
const FIN = [0.93, 0.985];

/**
 * Accueil Cap Horizon : les bureaux du cabinet en 3D, pilotés par le défilement. La caméra s'arrête devant chaque
 * offre (diagnostic flash, accompagnement Cap, mission sur mesure), où consultants et dirigeants sont au travail ;
 * l'offre s'affiche à côté (prix, points clés, « Prendre rendez-vous »). Fondu vers les offres.
 * Sans 3D ou avec « réduire les animations » : le titre, puis les offres en liste.
 */
export function Hero({ onReady }) {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const intro = useRef(null);
  const voile = useRef(null);
  const progres = useRef(0);
  const enVue = useInView(section, '0px');
  const [tier] = useState(getDeviceTier);
  const [charger3d, setCharger3d] = useState(false);
  const [pret3d, setPret3d] = useState(false);
  const [debut, setDebut] = useState(true);
  const [arret, setArret] = useState(-1);
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
      setArret(ARRETS.findIndex(([a, b]) => p >= a && p <= b));
      if (voile.current) voile.current.style.opacity = String(Math.min(1, Math.max(0, (p - FIN[0]) / (FIN[1] - FIN[0]))));
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
      gsap.from('[data-mot]', { yPercent: 110, duration: 1.2, stagger: 0.1, ease: 'expo.out', delay: 0.3 });
      gsap.from('[data-in]', { opacity: 0, y: 14, stagger: 0.08, duration: 0.8, delay: 0.8 });
    }, intro);
    return () => ctx.revert();
  }, [reduit]);

  const Intro = (
    <div ref={intro} className="max-w-xl px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:max-w-[50%] md:px-16 md:pb-0">
      <p data-in className="etiquette">
        {cabinet.accroche}
      </p>
      <h1 className="mt-4 text-[clamp(3.3rem,min(11vw,12svh),7.5rem)] leading-[0.95]">
        <span className="block overflow-hidden">
          <span data-mot className="block">
            Prenez le
          </span>
        </span>
        <span className="block overflow-hidden pb-2">
          <span data-mot className="block italic text-cobalt">
            bon cap.
          </span>
        </span>
      </h1>
      <p data-in className="mt-4 hidden max-w-md text-lg leading-relaxed text-nuit/75 md:block">
        {cabinet.intro}
      </p>
      <div data-in className="mt-6 flex flex-wrap gap-3">
        <a href="#diagnostic" className="btn btn-cobalt">
          Faire mon diagnostic express
        </a>
        <a href="#rendez-vous" className="btn btn-ligne max-sm:hidden">
          Premier rendez-vous offert
        </a>
      </div>
      <ul data-in className="mt-8 hidden gap-8 md:flex">
        {chiffres.map((c) => (
          <li key={c.label}>
            <Counter value={c.valeur} suffix={c.suffixe} className="block font-display text-4xl" />
            <span className="text-base text-gris">{c.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const Offres = ({ visible }) => (
    <ul className={visible ? 'mx-auto grid max-w-7xl gap-4 px-5 py-14 md:grid-cols-3 md:px-12' : 'sr-only'}>
      {offres.map((o) => (
        <li key={o.id} className={visible ? 'border border-trait bg-blanc p-5' : ''}>
          <p className="font-display text-2xl">{o.nom}</p>
          <p className="mt-1 text-cobalt">
            {o.prix} · {o.unite}
          </p>
          <p className="mt-2 text-base text-gris">{o.points.join(' · ')}</p>
        </li>
      ))}
    </ul>
  );

  if (!avec3d) {
    return (
      <section id="accueil" ref={section} aria-label="Accueil : Cap Horizon" className="bg-papier">
        <div className="relative flex min-h-[100svh] items-end md:items-center">{Intro}</div>
        <Offres visible />
      </section>
    );
  }

  return (
    <section id="accueil" ref={section} aria-label="Accueil : Cap Horizon" className="relative bg-papier" style={{ height: '560svh' }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className={`absolute inset-0 bg-papier transition-opacity duration-700 ${pret3d ? 'opacity-0' : 'opacity-100'}`} />
        {charger3d && (
          <Suspense fallback={null}>
            <Bureau3D progres={progres} leger={leger} actif={enVue} onReady={pret} />
          </Suspense>
        )}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-papier/95 via-papier/60 to-transparent transition-opacity duration-500 md:bg-gradient-to-r md:from-papier/90 md:via-papier/50 md:to-transparent ${
            debut ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className={`relative flex h-full items-end transition-opacity duration-500 md:items-center md:pt-16 ${debut ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          {Intro}
        </div>
        {/* devant chaque espace : l'offre, son prix, ses points clés, « Prendre rendez-vous » */}
        {offres.map((o, i) => (
          <div
            key={o.id}
            aria-hidden={arret !== i}
            className={`absolute inset-x-0 bottom-0 px-4 pb-[calc(5.6rem+env(safe-area-inset-bottom))] transition-all duration-500 md:inset-y-0 md:left-10 md:right-auto md:flex md:w-[26rem] md:flex-col md:justify-center md:px-0 md:pb-0 ${
              arret === i ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
            }`}
          >
            <div className="border border-trait bg-blanc/95 p-5 shadow-[0_20px_50px_-25px_rgb(15_27_45/0.45)] backdrop-blur md:p-7">
              <p className="etiquette">
                Offre {i + 1} / {offres.length}
                {o.vedette ? ' · la plus choisie' : ''}
              </p>
              <h2 className="mt-2 text-[clamp(2rem,6.5vw,3rem)] leading-[1.02]">{o.nom}</h2>
              <ul className="mt-3 hidden space-y-1 text-base text-gris md:block">
                {o.points.map((pt) => (
                  <li key={pt}>— {pt}</li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p>
                  <span className="font-display text-3xl text-cobalt">{o.prix}</span>
                  <span className="ml-2 text-base text-gris">{o.unite}</span>
                </p>
                <a href="#rendez-vous" className="btn btn-cobalt !min-h-11 !py-2" tabIndex={arret === i ? 0 : -1}>
                  Rendez-vous
                </a>
              </div>
            </div>
          </div>
        ))}
        <div ref={voile} className="pointer-events-none absolute inset-0 flex items-center justify-center bg-papier opacity-0">
          <p className="font-display text-[clamp(3rem,10vw,6rem)] italic leading-none">Nos expertises</p>
        </div>
        <Offres visible={false} />
      </div>
    </section>
  );
}
