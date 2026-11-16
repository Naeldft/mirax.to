import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { prestations, studio } from '../data/site';

// La scène 3D (three.js) est chargée à part, après l'affichage du texte.
const Studio3D = lazy(() => import('../three/Studio3D'));

// mêmes repères que la scène (three/Studio3D.jsx, ARRETS) : un arrêt par prestation
const ARRETS = prestations.map((_, i) => [0.18 + i * 0.18, 0.18 + i * 0.18 + 0.11]);
const FIN = [0.93, 0.985];

/**
 * Accueil Lumen Studio : un vrai studio photo en 3D (loft, fonds papier, boîtes à lumière, appareil sur trépied),
 * piloté par le défilement. La caméra s'arrête devant chaque plateau (portrait, famille, mariage, entreprise) :
 * l'écran de contrôle du photographe montre la vraie photo de la séance, la prestation s'affiche à côté
 * (prix, points clés, « Réserver »). Fondu vers le portfolio.
 * Sans 3D ou avec « réduire les animations » : le titre, puis les prestations en liste.
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
      <p data-in className="mono !text-ambre">
        {studio.accroche}
      </p>
      <h1 className="mt-4 text-[clamp(3.2rem,min(11vw,11svh),7.5rem)] leading-[0.98]">
        <span className="block overflow-hidden pb-2">
          <span data-mot className="block">
            Gardez la
          </span>
        </span>
        <span className="block overflow-hidden pb-2">
          <span data-mot className="block italic text-ambre">
            lumière
          </span>
        </span>
        <span className="block overflow-hidden pb-2">
          <span data-mot className="block">
            du moment.
          </span>
        </span>
      </h1>
      <p data-in className="mt-4 hidden max-w-md leading-relaxed text-papier/75 md:block">
        {studio.intro}
      </p>
      <div data-in className="mt-6 flex flex-wrap gap-3">
        <a href="#reservation" className="btn btn-ambre">
          Réserver une séance
        </a>
        <a href="#portfolio" className="btn btn-ligne">
          Portfolio
        </a>
      </div>
    </div>
  );

  const Offres = ({ visible }) => (
    <ul className={visible ? 'mx-auto grid max-w-7xl gap-4 px-5 py-14 md:grid-cols-4 md:px-12' : 'sr-only'}>
      {prestations.map((o) => (
        <li key={o.id} className={visible ? 'border border-papier/10 bg-nuit p-5' : ''}>
          <p className="font-display text-3xl italic">{o.nom}</p>
          <p className="mt-1 text-ambre">
            {o.prix} · {o.duree}
          </p>
          <p className="mt-2 text-base text-papier/70">{o.points.join(' · ')}</p>
        </li>
      ))}
    </ul>
  );

  if (!avec3d) {
    return (
      <section id="accueil" ref={section} aria-label="Accueil : Lumen Studio" className="bg-nuit">
        <div className="relative flex min-h-[100svh] items-end md:items-center">{Intro}</div>
        <Offres visible />
      </section>
    );
  }

  return (
    <section id="accueil" ref={section} aria-label="Accueil : Lumen Studio" className="relative bg-nuit" style={{ height: '680svh' }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className={`absolute inset-0 bg-nuit transition-opacity duration-700 ${pret3d ? 'opacity-0' : 'opacity-100'}`} />
        {charger3d && (
          <Suspense fallback={null}>
            <Studio3D progres={progres} leger={leger} actif={enVue} onReady={pret} />
          </Suspense>
        )}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-nuit/90 via-nuit/40 to-transparent transition-opacity duration-500 md:bg-gradient-to-r md:from-nuit/85 md:via-nuit/30 md:to-transparent ${
            debut ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className={`relative flex h-full items-end transition-opacity duration-500 md:items-center md:pt-16 ${debut ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          {Intro}
        </div>
        {/* devant chaque plateau : la prestation, son prix, ses points clés, « Réserver » */}
        {prestations.map((o, i) => (
          <div
            key={o.id}
            aria-hidden={arret !== i}
            className={`absolute inset-x-0 bottom-0 px-4 pb-[calc(5.6rem+env(safe-area-inset-bottom))] transition-all duration-500 md:inset-y-0 md:left-10 md:right-auto md:flex md:w-[26rem] md:flex-col md:justify-center md:px-0 md:pb-0 ${
              arret === i ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
            }`}
          >
            <div className="rounded-sm border border-papier/10 bg-nuit/85 p-5 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.8)] backdrop-blur md:p-7">
              <p className="mono !text-ambre">
                Séance {i + 1} / {prestations.length}
                {o.vedette ? ' · la plus demandée' : ''}
              </p>
              <h2 className="mt-1 text-[clamp(2.2rem,7vw,3.6rem)] italic leading-[0.95]">{o.nom}</h2>
              <p className="mt-1 text-base text-papier/60">{o.duree}</p>
              <ul className="mt-3 hidden space-y-1 text-papier/75 md:block">
                {o.points.map((pt) => (
                  <li key={pt}>— {pt}</li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="font-display text-3xl text-ambre">{o.prix}</p>
                <a href="#reservation" className="btn btn-ambre !min-h-11 !py-2" tabIndex={arret === i ? 0 : -1}>
                  Réserver
                </a>
              </div>
            </div>
          </div>
        ))}
        <div ref={voile} className="pointer-events-none absolute inset-0 flex items-center justify-center bg-nuit opacity-0">
          <p className="font-display text-[clamp(3rem,10vw,6rem)] italic leading-none">Portfolio</p>
        </div>
        <Offres visible={false} />
      </div>
    </section>
  );
}
