import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { photoSrcSet, photoUrl } from '@demos/shared/components/Photo.jsx';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { formatEuros } from '@demos/shared/lib/validation.js';
import { ardoise, maison, plateau } from '../data/site';

// La scène 3D (three.js) est chargée à part, après l'affichage du texte.
const Fournil3D = lazy(() => import('../three/Fournil3D'));

const N = plateau.length;
const FIN = 0.84; // à partir d'ici, la caméra est devant les planches : on peut changer de pain, l'incliner, zoomer
const MAX_PIVOT = 0.35; // ±20° pour une photo détourée

const ARDOISE_FOURNIL = [
  ['Au fournil', 62],
  ['Levain naturel', 46],
  ['Four à sole', 46],
  ['250 °C', 64],
  ['', 16],
  ['Pétri la nuit,', 44],
  ['doré au matin.', 44],
];

const Fleche = ({ sens }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d={sens < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

/**
 * Accueil Maison Levain : une vraie scène 3D (la boutique, le comptoir, le fournil au fond).
 * Le défilement fait entrer la caméra : elle pivote vers l'ardoise du jour, vers le fournil, puis s'arrête
 * devant les planches. Là : flèches, pastilles ou glisser vite pour faire glisser les planches ;
 * glisser lentement pour incliner le pain ; la loupe (ou un double appui) pour voir la croûte, ou la mie.
 * Sans 3D ou « réduire les animations » : la vraie photo du pain choisi, et les mêmes commandes.
 */
export default function Hero({ onReady }) {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const intro = useRef(null);
  const progres = useRef(0);
  const enVue = useInView(section, '0px');
  const [tier] = useState(getDeviceTier);
  const [charger3d, setCharger3d] = useState(false);
  const [pret3d, setPret3d] = useState(false);
  const [etape, setEtape] = useState(reduit ? 2 : 0);
  const [index, setIndex] = useState(0);
  const [loupe, setLoupe] = useState(false);
  const geste = useRef({ spin: 0, tilt: 0 });
  const zoom = useRef({ actif: false, k: 0 }).current;
  const glisse = useRef(null);
  const dernierAppui = useRef(0);
  const pain = plateau[index];
  const avec3d = tier !== 'none';
  const leger = tier === 'low';
  const surPain = etape === 2 || !avec3d;

  const ardoiseJour = useMemo(() => [['L’ardoise du jour', 58], ...ardoise.flatMap(([, nom, prix]) => [[nom, 36], [prix, 34]])], []);

  const changer = useCallback((pas) => {
    setIndex((i) => (i + pas + N) % N);
    geste.current.spin = 0;
    geste.current.tilt = 0;
  }, []);
  useEffect(() => {
    zoom.actif = loupe;
  }, [loupe, zoom]);
  useEffect(() => setLoupe(false), [index]);

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
      if (p < FIN) setLoupe(false);
    };
    maj();
    addEventListener('scroll', maj, { passive: true });
    addEventListener('resize', maj);
    return () => {
      removeEventListener('scroll', maj);
      removeEventListener('resize', maj);
    };
  }, [reduit]);

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
      gsap.from('[data-mot]', { y: 60, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.3 });
      gsap.from('[data-in]', { y: 20, opacity: 0, duration: 0.9, stagger: 0.1, delay: 0.8 });
    }, intro);
    return () => ctx.revert();
  }, [reduit]);

  /* ----- gestes : glisser lentement = incliner ; glisser vite = planche suivante ; double appui = loupe ----- */
  const down = (e) => {
    if (!surPain || e.button > 0) return;
    const t = performance.now();
    if (t - dernierAppui.current < 320) {
      setLoupe((l) => !l);
      dernierAppui.current = 0;
      return;
    }
    dernierAppui.current = t;
    glisse.current = { x0: e.clientX, y0: e.clientY, t0: t, spin0: geste.current.spin, tilt0: geste.current.tilt };
    gsap.killTweensOf(geste.current);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const move = (e) => {
    const g = glisse.current;
    if (!g) return;
    const borne = (v, m) => Math.max(-m, Math.min(m, v));
    geste.current.spin = borne(g.spin0 + (e.clientX - g.x0) * 0.004, MAX_PIVOT);
    if (e.pointerType === 'mouse') geste.current.tilt = borne(g.tilt0 + (e.clientY - g.y0) * 0.003, 0.25);
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
    gsap.to(geste.current, { spin: 0, tilt: 0, duration: 1.2, ease: 'elastic.out(1, 0.6)', delay: 0.6 });
  };
  const touche = (e) => {
    if (e.key === 'ArrowRight') changer(1);
    else if (e.key === 'ArrowLeft') changer(-1);
    else return;
    e.preventDefault();
  };

  const avecMie = !!pain.plateau.mie;

  return (
    <section
      id="accueil"
      ref={section}
      aria-label="Accueil : Maison Levain, boulangerie"
      className="relative bg-encre text-farine"
      style={{ height: reduit || !avec3d ? '100svh' : '520svh' }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-encre">
          {(!avec3d || !pret3d) && (
            <img
              src={photoUrl(pain.photo, 800)}
              srcSet={photoSrcSet(pain.photo)}
              sizes="100vw"
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${pret3d ? 'opacity-0' : 'opacity-100'}`}
            />
          )}
          {avec3d && charger3d && (
            <Suspense fallback={null}>
              <Fournil3D
                progres={progres}
                produits={plateau}
                index={index}
                geste={geste}
                zoom={zoom}
                reduit={reduit}
                leger={leger}
                ardoiseJour={ardoiseJour}
                ardoiseFournil={ARDOISE_FOURNIL}
                actif={enVue}
                onReady={pret}
              />
            </Suspense>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-encre/85 via-transparent to-encre/30 md:bg-gradient-to-r md:from-encre/80 md:via-encre/10 md:to-transparent" />
        </div>

        {/* zone de manipulation du pain */}
        <div
          role="group"
          aria-roledescription="carrousel"
          aria-label={`Nos pains : ${pain.nom}. Flèches gauche et droite pour changer.`}
          tabIndex={surPain ? 0 : -1}
          onKeyDown={touche}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={() => (glisse.current = null)}
          className={`absolute inset-x-0 top-[12%] h-[46%] touch-pan-y select-none outline-none md:left-[40%] md:top-[15%] md:h-[70%] ${
            surPain ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
          }`}
        />

        {/* 1. l'entrée */}
        <div
          ref={intro}
          className={`absolute inset-x-0 bottom-0 px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] transition-opacity duration-500 md:inset-y-0 md:flex md:max-w-[50%] md:flex-col md:justify-center md:px-12 md:pb-0 ${
            etape === 0 ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <p data-in className="surtitre !text-ble">
            {maison.accroche}
          </p>
          <h1 className="mt-3 text-[clamp(3rem,min(12vw,11svh),7rem)] leading-[0.92]">
            <span data-mot className="block">
              Pétri la nuit,
            </span>
            <span data-mot className="block italic text-ble">
              doré au matin.
            </span>
          </h1>
          <p data-in className="mt-4 hidden max-w-sm text-lg text-farine/85 md:block">
            {maison.intro}
          </p>
          <p data-in className="mt-6 text-sm uppercase tracking-[0.25em] text-farine/60" aria-hidden="true">
            Faites défiler · on entre ↓
          </p>
        </div>

        {/* ce que disent les ardoises, pour les lecteurs d'écran et Google */}
        <ul className="sr-only">
          <li>
            L’ardoise du jour : {ardoise.map(([quoi, nom, prix]) => `${quoi}, ${nom}, ${prix}`).join(' ; ')}.
          </li>
          <li>Au fournil : levain naturel, four à sole à 250 °C. Pétri la nuit, doré au matin.</li>
        </ul>

        {/* 3. devant les planches */}
        <div
          className={`absolute inset-x-0 bottom-0 px-5 pb-[calc(6.2rem+env(safe-area-inset-bottom))] transition-opacity duration-500 md:inset-y-0 md:flex md:max-w-[40%] md:flex-col md:justify-center md:px-12 md:pb-0 ${
            surPain ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={!surPain}
        >
          <div aria-live="polite">
            <p className="surtitre !text-ble">
              {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')} · {pain.categorie === 'pain' ? 'Pain' : 'Viennoiserie'}
            </p>
            <h2 className="mt-1 text-4xl leading-[0.95] md:text-6xl">{pain.nom}</h2>
            <p className="mt-1 font-serif text-3xl font-bold text-ble md:text-4xl">{formatEuros(pain.prix)}</p>
            <p className="mt-1 text-base text-farine/80 md:text-lg">{pain.detail}</p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button type="button" onClick={() => changer(-1)} className="lv-fleche" aria-label="Pain précédent" tabIndex={surPain ? 0 : -1}>
              <Fleche sens={-1} />
            </button>
            <div className="hidden flex-wrap gap-2 lg:flex" role="group" aria-label="Choisir un pain">
              {plateau.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  tabIndex={surPain ? 0 : -1}
                  className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                    i === index ? 'border-ble bg-ble text-encre' : 'border-farine/25 text-farine/80 hover:border-farine/60'
                  }`}
                >
                  {p.nom.replace(' au levain', '').replace(' pur beurre', '')}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => changer(1)} className="lv-fleche" aria-label="Pain suivant" tabIndex={surPain ? 0 : -1}>
              <Fleche sens={1} />
            </button>
            {avec3d && (
              <button
                type="button"
                onClick={() => setLoupe((l) => !l)}
                aria-pressed={loupe}
                tabIndex={surPain ? 0 : -1}
                className={`ml-1 min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                  loupe ? 'border-ble bg-ble text-encre' : 'border-farine/40 text-farine hover:border-farine'
                }`}
              >
                {loupe ? 'Vue d’ensemble' : avecMie ? 'Voir la mie' : 'Voir la croûte'}
              </button>
            )}
          </div>
          {avec3d && (
            <p className="mt-2 hidden text-xs uppercase tracking-[0.2em] text-farine/55 md:block" aria-hidden="true">
              Glissez pour incliner · double appui pour zoomer
            </p>
          )}
          <div className="mt-4 flex gap-3">
            <a href="#commande" className="btn btn-croute flex-1 md:flex-none" tabIndex={surPain ? 0 : -1}>
              Commander
            </a>
            <a href="#pains" className="btn flex-1 text-farine shadow-[inset_0_0_0_1.5px_rgb(251_246_236_/_0.7)] md:flex-none" tabIndex={surPain ? 0 : -1}>
              Tous nos pains
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
