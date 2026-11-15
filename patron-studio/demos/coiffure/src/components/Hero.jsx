import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { photoSrcSet, photoUrl } from '@demos/shared/components/Photo.jsx';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { clientes, looks, salon } from '../data/site';

// La scène 3D (three.js) est chargée à part, après l'affichage du texte.
const Salon3D = lazy(() => import('../three/Salon3D'));

// mêmes repères que la scène (three/Salon3D.jsx, ARRETS) : un arrêt par client
const ARRETS = clientes.map((_, i) => [0.2 + i * 0.17, 0.2 + i * 0.17 + 0.11]);
const FIN = [0.9, 0.97];

/**
 * Accueil Atelier Mèche : un vrai salon en 3D. On passe la porte, la caméra avance dans le salon et s'arrête
 * près de chaque client (mannequin à la coupe sculptée, assis dans son fauteuil), à droite puis à gauche, en tournant
 * un peu autour ;
 * le nom de la prestation, le prix et « Réserver » s'affichent à côté. Fondu vers les prestations.
 * Sans 3D ou avec « réduire les animations » : une vraie photo et les mêmes informations en liste.
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
      gsap.from('[data-mot]', { yPercent: 120, rotate: 4, duration: 1.2, stagger: 0.08, ease: 'power4.out', delay: 0.3 });
      gsap.from('[data-in]', { opacity: 0, y: 20, duration: 1, stagger: 0.1, delay: 0.8, ease: 'power3.out' });
    }, intro);
    return () => ctx.revert();
  }, [reduit]);

  const Intro = (
    <div ref={intro} className="max-w-xl px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:max-w-[46%] md:px-16 md:pb-0">
      <p data-in className="text-sm uppercase tracking-[0.3em] text-creme/80">
        {salon.accroche}
      </p>
      <h1 className="mt-3 text-[clamp(2.9rem,min(12vw,11svh),7rem)] leading-[0.9] text-creme">
        {['Une coupe', 'qui vous', 'ressemble.'].map((l, i) => (
          <span key={l} className="block overflow-hidden pb-2">
            <span data-mot className={`block ${i === 2 ? 'italic text-poudre' : ''}`}>
              {l}
            </span>
          </span>
        ))}
      </h1>
      <p data-in className="mt-4 hidden max-w-sm text-lg text-creme/80 md:block">
        {salon.intro}
      </p>
      <div data-in className="mt-6 flex gap-3">
        <a href="#reserver" className="btn bg-creme text-encre flex-1 md:flex-none">
          Réserver
        </a>
        <a href="#prestations" className="btn flex-1 text-creme shadow-[inset_0_0_0_1px_rgb(247_239_233/0.7)] md:flex-none">
          Les tarifs
        </a>
      </div>
    </div>
  );

  if (!avec3d) {
    const p0 = looks[0];
    return (
      <section id="accueil" ref={section} aria-label="Accueil : Atelier Mèche, salon de coiffure" className="bg-encre">
        <div className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center">
          <img src={photoUrl(p0.photo, 800)} srcSet={photoSrcSet(p0.photo)} sizes="100vw" alt={p0.alt} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-encre via-encre/60 to-transparent md:bg-gradient-to-r" />
          <div className="relative z-10">{Intro}</div>
        </div>
        <ul className="mx-auto grid max-w-6xl gap-6 bg-creme px-5 py-14 md:grid-cols-4 md:px-12">
          {clientes.map((c) => (
            <li key={c.look}>
              <p className="numero text-lg">{c.look}</p>
              <p className="mt-1 font-display text-2xl">{c.prestation}</p>
              <p className="mt-1">{c.prix} €</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section id="accueil" ref={section} aria-label="Accueil : Atelier Mèche, salon de coiffure" className="relative bg-encre" style={{ height: '720svh' }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className={`absolute inset-0 bg-encre transition-opacity duration-700 ${pret3d ? 'opacity-0' : 'opacity-100'}`} />
        {charger3d && (
          <Suspense fallback={null}>
            <Salon3D progres={progres} clientes={clientes} leger={leger} actif={enVue} onReady={pret} />
          </Suspense>
        )}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-encre/90 via-encre/40 to-transparent transition-opacity duration-500 md:bg-gradient-to-r md:from-encre/85 md:via-encre/30 md:to-transparent ${
            debut ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className={`relative flex h-full items-end transition-opacity duration-500 md:items-center md:pt-16 ${debut ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          {Intro}
        </div>
        {/* devant chaque cliente : la prestation, le prix, « Réserver » */}
        {clientes.map((c, i) => {
          return (
            <div
              key={c.look}
              aria-hidden={arret !== i}
              className={`absolute inset-x-0 bottom-0 px-4 pb-[calc(5.6rem+env(safe-area-inset-bottom))] transition-all duration-500 md:inset-y-0 md:left-10 md:right-auto md:flex md:w-[26rem] md:flex-col md:justify-center md:px-0 md:pb-0 ${
                arret === i ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
              }`}
            >
              <div className="rounded-3xl bg-creme/92 p-5 text-encre shadow-[0_20px_50px_-25px_rgb(0_0_0/0.5)] backdrop-blur md:p-7">
                <p className="numero text-lg">
                  {['i.', 'ii.', 'iii.', 'iv.'][i]} {c.look}
                </p>
                <h2 className="mt-1 text-[clamp(1.7rem,6vw,2.6rem)] leading-[1]">{c.prestation}</h2>
                <p className="mt-2 hidden text-taupe md:block">{c.texte}</p>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="font-display text-3xl">{c.prix} €</span>
                  <a href="#reserver" className="btn btn-encre !min-h-11 !py-2" tabIndex={arret === i ? 0 : -1}>
                    Réserver
                  </a>
                </div>
              </div>
            </div>
          );
        })}
        {/* fondu vers les prestations */}
        <div ref={voile} className="pointer-events-none absolute inset-0 flex items-center justify-center bg-creme opacity-0">
          <div className="text-center">
            <p className="numero text-lg">i.</p>
            <p className="mt-2 font-display text-[clamp(3rem,10vw,6rem)] leading-none">Prestations</p>
          </div>
        </div>
        <ul className="sr-only">
          {clientes.map((c) => (
            <li key={c.look}>
              {c.look} : {c.prestation}, {c.prix} €.
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
