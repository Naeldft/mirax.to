import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { formatEuros } from '@demos/shared/lib/validation.js';
import { allergenes, produits } from '../data/site';
import { Photo } from './Sections';

const BURGERS = produits.filter((p) => p.cat === 'burgers');
const N = BURGERS.length;
// chaque burger occupe une part égale du défilement, puis fondu vers la carte
const CHOIX = [0.02, 0.9];
const FIN = [0.93, 0.99];
const MAX_PIVOT = 0.35;
const TAG = { veggie: 'Végétarien', piment: 'Ça pique', star: 'Le best-seller' };

const Fleche = ({ sens }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d={sens < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

/**
 * Le choix du burger, juste après la visite filmée (Sequence.jsx) qui se termine sur la plancha :
 * la vraie photo du burger plein écran ; le défilement passe d'un burger au suivant, comme les flèches
 * et le glissé du doigt (glisser lentement fait pivoter légèrement la photo). Puis la carte et les allergènes.
 * Avec « réduire les animations » : pas d'épinglage, les flèches seules.
 */
export default function Hero({ ajouter }) {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const fin = useRef(null);
  const geste = useRef({ spin: 0 });
  const glisse = useRef(null);
  const photo = useRef(null);
  const [index, setIndex] = useState(0);
  const [ajoute, setAjoute] = useState(false);
  const avec3d = !reduit; // nom gardé : « le défilement pilote le choix »
  const surBurger = true;
  const b = BURGERS[index];

  useEffect(() => {
    if (!avec3d) return;
    const maj = () => {
      const s = section.current;
      if (!s) return;
      const r = s.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
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

  // le glissé fait légèrement pivoter la photo (retour élastique)
  useEffect(() => {
    let raf;
    const boucle = () => {
      raf = requestAnimationFrame(boucle);
      if (photo.current) photo.current.style.transform = `perspective(1200px) rotateY(${geste.current.spin * 30}deg) scale(1.04)`;
    };
    boucle();
    return () => cancelAnimationFrame(raf);
  }, []);

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

  return (
    <section
      id="burgers"
      ref={section}
      aria-label="Nos burgers"
      className="relative bg-nuit text-creme"
      style={{ height: avec3d ? `${N * 55 + 45}svh` : 'auto' }}
    >
      <div className={avec3d ? 'sticky top-0 h-[100svh] overflow-hidden' : 'relative min-h-[100svh] overflow-hidden'}>
        {reduit && <h1 className="sr-only">Crunch!, smash burgers à Lille</h1>}
        {/* la vraie photo de chaque burger, en fondu de l'un à l'autre */}
        <div ref={photo} className="absolute inset-0 will-change-transform">
          {BURGERS.map((x, i) => (
            <div key={x.id} className={`absolute inset-0 transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'}`}>
              <Photo nom={x.photo} alt={i === index ? x.nom : ''} sizes="100vw" prioritaire={i === 0} className="h-full w-full object-cover md:object-[70%_50%]" />
            </div>
          ))}
        </div>
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
