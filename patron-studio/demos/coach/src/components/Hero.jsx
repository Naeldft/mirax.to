import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { coach, programmes } from '../data/site';

// La scène 3D (three.js) est chargée à part, après l'affichage du texte.
const Salle3D = lazy(() => import('../three/Salle3D'));

// mêmes repères que la scène (three/Salle3D.jsx, ARRETS) : un arrêt par offre
const ARRETS = programmes.map((_, i) => [0.17 + i * 0.145, 0.17 + i * 0.145 + 0.095]);
const FIN = [0.93, 0.985];

/**
 * Accueil Pulse Coaching : une salle de sport premium en 3D, pilotée par le défilement. La caméra avance et
 * s'arrête devant chaque offre (bilan, coaching individuel, duo, small group, en ligne), où des athlètes-mannequins
 * sont en pleine séance ; l'offre s'affiche à côté (prix, points clés, « Réserver »). Fondu vers les programmes.
 * Sans 3D ou avec « réduire les animations » : le titre, puis les offres en liste.
 */
export default function Hero({ onReady }) {
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
      gsap.from('[data-mot]', { yPercent: 100, skewY: 8, duration: 0.9, stagger: 0.08, ease: 'power4.out', delay: 0.25 });
      gsap.from('[data-in]', { opacity: 0, y: 20, stagger: 0.08, duration: 0.7, delay: 0.7 });
    }, intro);
    return () => ctx.revert();
  }, [reduit]);

  const Intro = (
    <div ref={intro} className="max-w-xl px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:max-w-[48%] md:px-16 md:pb-0">
      <p data-in className="tag">
        {coach.accroche}
      </p>
      <h1 className="mt-3 text-[clamp(3.4rem,min(15vw,12svh),9rem)] leading-[0.88]">
        <span className="block overflow-hidden">
          <span data-mot className="block">
            Plus fort.
          </span>
        </span>
        <span className="block overflow-hidden">
          <span data-mot className="contour block">
            Chaque
          </span>
        </span>
        <span className="block overflow-hidden">
          <span data-mot className="block text-acide">
            semaine.
          </span>
        </span>
      </h1>
      <p data-in className="mt-4 hidden max-w-md text-blanc/75 md:block">
        {coach.intro}
      </p>
      <div data-in className="mt-6 flex gap-3">
        <a href="#essai" className="btn btn-acide">
          Séance offerte
        </a>
        <a href="#programmes" className="btn btn-ligne">
          Programmes
        </a>
      </div>
    </div>
  );

  const Offres = ({ visible }) => (
    <ul className={visible ? 'mx-auto grid max-w-7xl gap-4 px-5 py-14 md:grid-cols-3 md:px-12' : 'sr-only'}>
      {programmes.map((o) => (
        <li key={o.id} className={visible ? 'border border-blanc/10 bg-graphite p-5' : ''}>
          <p className="font-display text-2xl uppercase">{o.nom}</p>
          <p className="mt-1 text-acide">
            {o.prix} · {o.unite}
          </p>
          <p className="mt-2 text-sm text-blanc/70">{o.points.join(' · ')}</p>
        </li>
      ))}
    </ul>
  );

  if (!avec3d) {
    return (
      <section id="accueil" ref={section} aria-label="Accueil : Pulse Coaching" className="bg-noir">
        <div className="relative flex min-h-[100svh] items-end md:items-center">{Intro}</div>
        <Offres visible />
      </section>
    );
  }

  return (
    <section id="accueil" ref={section} aria-label="Accueil : Pulse Coaching" className="relative bg-noir" style={{ height: '760svh' }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className={`absolute inset-0 bg-noir transition-opacity duration-700 ${pret3d ? 'opacity-0' : 'opacity-100'}`} />
        {charger3d && (
          <Suspense fallback={null}>
            <Salle3D progres={progres} leger={leger} actif={enVue} onReady={pret} />
          </Suspense>
        )}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/40 to-transparent transition-opacity duration-500 md:bg-gradient-to-r md:from-noir/85 md:via-noir/30 md:to-transparent ${
            debut ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className={`relative flex h-full items-end transition-opacity duration-500 md:items-center md:pt-16 ${debut ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          {Intro}
        </div>
        {/* devant chaque offre : nom, prix, points clés, « Réserver » */}
        {programmes.map((o, i) => (
          <div
            key={o.id}
            aria-hidden={arret !== i}
            className={`absolute inset-x-0 bottom-0 px-4 pb-[calc(5.6rem+env(safe-area-inset-bottom))] transition-all duration-500 md:inset-y-0 md:left-10 md:right-auto md:flex md:w-[26rem] md:flex-col md:justify-center md:px-0 md:pb-0 ${
              arret === i ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
            }`}
          >
            <div className="border border-blanc/10 bg-noir/85 p-5 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.8)] backdrop-blur md:p-7">
              <p className="tag">
                Offre {i + 1} / {programmes.length}
                {o.vedette ? ' · la plus choisie' : ''}
              </p>
              <h2 className="mt-1 text-[clamp(2rem,7vw,3.4rem)] leading-[0.95]">{o.nom}</h2>
              <ul className="mt-3 hidden space-y-1 text-blanc/75 md:block">
                {o.points.map((pt) => (
                  <li key={pt}>— {pt}</li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p>
                  <span className="font-display text-4xl text-acide">{o.prix}</span>
                  <span className="ml-2 text-sm text-blanc/60">{o.unite}</span>
                </p>
                <a href="#essai" className="btn btn-acide !min-h-11 !py-2" tabIndex={arret === i ? 0 : -1}>
                  Réserver
                </a>
              </div>
            </div>
          </div>
        ))}
        <div ref={voile} className="pointer-events-none absolute inset-0 flex items-center justify-center bg-noir opacity-0">
          <p className="font-display text-[clamp(3rem,10vw,6rem)] uppercase leading-none">Programmes</p>
        </div>
        <Offres visible={false} />
      </div>
    </section>
  );
}
