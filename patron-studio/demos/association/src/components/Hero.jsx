import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { actions, asso } from '../data/site';

// La scène 3D (three.js) est chargée à part, après l'affichage du texte.
const Cour3D = lazy(() => import('../three/Cour3D'));

// mêmes repères que la scène (three/Cour3D.jsx, ARRETS) : un arrêt par action
const ARRETS = actions.map((_, i) => [0.18 + i * 0.18, 0.18 + i * 0.18 + 0.11]);
const FIN = [0.93, 0.985];

/**
 * Accueil des Racines : la cour de la Maison des Racines en 3D, pilotée par le défilement. La caméra s'arrête
 * devant chaque action (jardin partagé, aide aux devoirs, repair café, épicerie solidaire), où bénévoles et
 * habitants sont à l'œuvre ; l'action s'affiche à côté (quand, en quelques mots, « Je participe »).
 * Fondu vers « Nos actions ». Sans 3D ou avec « réduire les animations » : le titre, puis les actions en liste.
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
      <p data-in className="pastille self-start bg-creme/90 text-foret">
        {asso.accroche}
      </p>
      <h1 className="mt-4 text-[clamp(2.9rem,min(10vw,11svh),6.5rem)] leading-[0.98] text-creme drop-shadow-[0_2px_18px_rgb(0_0_0/0.35)]">
        <span className="block overflow-hidden pb-1">
          <span data-mot className="block">
            Ensemble,
          </span>
        </span>
        <span className="block overflow-hidden pb-1">
          <span data-mot className="block">
            on fait pousser
          </span>
        </span>
        <span className="block overflow-hidden pb-1">
          <span data-mot className="block text-soleil">
            le quartier.
          </span>
        </span>
      </h1>
      <p data-in className="mt-4 hidden max-w-md text-lg leading-relaxed text-creme/90 md:block">
        {asso.intro}
      </p>
      <div data-in className="mt-6 flex flex-wrap gap-3">
        <a href="#benevole" className="btn btn-foret">
          Devenir bénévole
        </a>
        <a href="#soutenir" className="btn btn-coquelicot">
          Faire un don
        </a>
      </div>
    </div>
  );

  const Offres = ({ visible }) => (
    <ul className={visible ? 'mx-auto grid max-w-7xl gap-4 px-5 py-14 md:grid-cols-4 md:px-12' : 'sr-only'}>
      {actions.map((o) => (
        <li key={o.id} className={visible ? 'rounded-2xl bg-sable p-5' : ''}>
          <p className="font-display text-2xl font-bold text-foret">{o.titre}</p>
          <p className="mt-1 font-bold text-coquelicot">{o.quand}</p>
          <p className="mt-2 text-base text-gris">{o.texte}</p>
        </li>
      ))}
    </ul>
  );

  if (!avec3d) {
    return (
      <section id="accueil" ref={section} aria-label="Accueil : Les Racines" className="bg-foret">
        <div className="relative flex min-h-[100svh] items-end md:items-center">{Intro}</div>
        <Offres visible />
      </section>
    );
  }

  return (
    <section id="accueil" ref={section} aria-label="Accueil : Les Racines" className="relative bg-foret" style={{ height: '680svh' }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className={`absolute inset-0 bg-foret transition-opacity duration-700 ${pret3d ? 'opacity-0' : 'opacity-100'}`} />
        {charger3d && (
          <Suspense fallback={null}>
            <Cour3D progres={progres} leger={leger} actif={enVue} onReady={pret} />
          </Suspense>
        )}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-encre/85 via-encre/35 to-transparent transition-opacity duration-500 md:bg-gradient-to-r md:from-encre/75 md:via-encre/25 md:to-transparent ${
            debut ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className={`relative flex h-full items-end transition-opacity duration-500 md:items-center md:pt-16 ${debut ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          {Intro}
        </div>
        {/* devant chaque coin de la cour : l'action, quand, en quelques mots, « Je participe » */}
        {actions.map((o, i) => (
          <div
            key={o.id}
            aria-hidden={arret !== i}
            className={`absolute inset-x-0 bottom-0 px-4 pb-[calc(5.6rem+env(safe-area-inset-bottom))] transition-all duration-500 md:inset-y-0 md:left-10 md:right-auto md:flex md:w-[26rem] md:flex-col md:justify-center md:px-0 md:pb-0 ${
              arret === i ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
            }`}
          >
            <div className="rounded-2xl bg-creme/95 p-5 text-encre shadow-[0_20px_50px_-25px_rgb(0_0_0/0.6)] backdrop-blur md:p-7">
              <p className="pastille bg-mousse/25 text-foret">
                Action {i + 1} / {actions.length}
              </p>
              <h2 className="mt-2 text-[clamp(1.9rem,6.5vw,2.9rem)] leading-[1.02] text-foret">{o.titre}</h2>
              <p className="mt-1 font-bold text-coquelicot">{o.quand}</p>
              <p className="mt-2 hidden text-base leading-relaxed text-gris md:block">{o.texte}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a href="#benevole" className="btn btn-foret !min-h-11 !py-2" tabIndex={arret === i ? 0 : -1}>
                  Je participe
                </a>
                <a href="#actions" className="inline-flex min-h-11 items-center font-bold text-foret underline underline-offset-4" tabIndex={arret === i ? 0 : -1}>
                  En savoir plus
                </a>
              </div>
            </div>
          </div>
        ))}
        <div ref={voile} className="pointer-events-none absolute inset-0 flex items-center justify-center bg-creme opacity-0">
          <p className="font-display text-[clamp(3rem,10vw,6rem)] font-bold leading-none text-foret">Nos actions</p>
        </div>
        <Offres visible={false} />
      </div>
    </section>
  );
}
