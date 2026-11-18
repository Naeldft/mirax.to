import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { formatEuros } from '@demos/shared/lib/validation.js';
import { allergenes, produits } from '../data/site';
import { N as N_FILM } from './Sequence';

// La scène 3D (three.js) est chargée à part, pendant la visite filmée.
const charger3D = () => import('../three/Burgers3D');
const Burgers3D = lazy(charger3D);

const BASE = import.meta.env.BASE_URL;
const BURGERS = produits.filter((p) => p.cat === 'burgers');
const N = BURGERS.length;
const IDS = BURGERS.map((b) => b.id);
const TAG = { star: 'Le best-seller' };
// défilement (svh) : passage à la 3D, puis un temps par burger, puis la sortie vers la carte
const PASSAGE = 80;
const PAR_BURGER = 60;
const SORTIE = 40;
const HAUTEUR = 100 + PASSAGE + N * PAR_BURGER + SORTIE;
const doux = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const Fleche = ({ sens }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d={sens < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

/**
 * Les burgers, en vraie 3D, après la visite filmée qui s'arrête sur la plancha.
 * La section se pose par-dessus la fin du film : elle commence sur la même image (aucun saut), puis l'image se
 * floute et s'assombrit, et la première planche glisse sur le comptoir ; le burger s'y assemble couche par couche.
 * Le défilement passe d'un burger au suivant (la planche sort à gauche, la suivante arrive par la droite), comme
 * les flèches, le clavier et le glissé du doigt ; glisser lentement fait pivoter le burger (±20°).
 * Avec « réduire les animations » (ou sans 3D) : les burgers fixes, de face, et les flèches.
 */
export default function Hero({ ajouter }) {
  const reduit = useReducedMotion();
  const [tier] = useState(getDeviceTier);
  const avec3d = !reduit && tier !== 'none';
  const leger = tier === 'low';
  const section = useRef(null);
  const fond = useRef(null);
  const toile = useRef(null);
  const fin = useRef(null);
  const etat = useRef({ v: -1, a: IDS.map(() => 0), pivot: 0, glisse: false });
  const glisse = useRef(null);
  const [format] = useState(() => (typeof window !== 'undefined' && matchMedia('(max-width: 767px), (orientation: portrait)').matches ? 'mobile' : 'ordi'));
  const [index, setIndex] = useState(0);
  const [surBurgers, setSurBurgers] = useState(!avec3d);
  const [actif, setActif] = useState(false);
  const [charger, setCharger] = useState(false);
  const [ajoute, setAjoute] = useState(false);
  const b = BURGERS[index];

  // la 3D se charge pendant la visite filmée, une fois l'entrée dans le snack terminée (pour ne pas la ralentir)
  useEffect(() => {
    if (!avec3d) return;
    let t;
    const go = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        charger3D();
        setCharger(true);
      }, 700);
    };
    if (window.crEntreeFinie) go();
    addEventListener('cr-entree-finie', go, { once: true });
    const garde = setTimeout(go, 9000);
    return () => {
      clearTimeout(t);
      clearTimeout(garde);
      removeEventListener('cr-entree-finie', go);
    };
  }, [avec3d]);

  useEffect(() => {
    if (!avec3d) return;
    const maj = () => {
      const s = section.current;
      if (!s) return;
      const r = s.getBoundingClientRect();
      const vh = innerHeight / 100;
      const sv = -r.top / vh; // défilement dans la section, en svh
      const t = doux(0, PASSAGE, sv); // passage à la 3D
      const e = etat.current;
      // l'image du film se floute, s'assombrit et recule un peu ; la toile 3D apparaît
      if (fond.current) {
        fond.current.style.filter = `blur(${(t * 9).toFixed(2)}px) brightness(${(1 - t * 0.5).toFixed(3)}) saturate(${(1 - t * 0.15).toFixed(3)})`;
        fond.current.style.transform = `scale(${1 + t * 0.06})`;
      }
      if (toile.current) toile.current.style.opacity = String(doux(0.15, 0.5, t));
      // carrousel : la 1re planche glisse depuis la droite pendant le passage, puis un burger par tranche
      const rr = Math.max(0, (sv - PASSAGE) / PAR_BURGER);
      const k = Math.min(N - 1, Math.floor(rr));
      const f = rr - k;
      e.v = sv < PASSAGE ? -1 + doux(0.35, 1, t) : k + (k < N - 1 ? doux(0.78, 1, f) : 0);
      IDS.forEach((_, i) => (e.a[i] = sv < PASSAGE ? 0 : doux(0, 0.45, rr - i)));
      setIndex(Math.min(N - 1, Math.max(0, Math.round(e.v))));
      setSurBurgers(sv > PASSAGE * 0.55 && sv < PASSAGE + N * PAR_BURGER + SORTIE * 0.5);
      setActif(r.top < innerHeight && r.bottom > 0);
      if (fin.current) fin.current.style.opacity = String(doux(PASSAGE + N * PAR_BURGER, PASSAGE + N * PAR_BURGER + SORTIE, sv));
    };
    maj();
    addEventListener('scroll', maj, { passive: true });
    addEventListener('resize', maj);
    return () => {
      removeEventListener('scroll', maj);
      removeEventListener('resize', maj);
    };
  }, [avec3d]);

  /** Aller à un burger : on fait défiler jusqu'à sa place (le défilement reste le seul pilote). */
  const aller = useCallback(
    (k) => {
      const i = Math.min(N - 1, Math.max(0, k));
      if (!avec3d) {
        setIndex((i + N) % N);
        return;
      }
      const s = section.current;
      const sv = PASSAGE + (i + 0.5) * PAR_BURGER;
      scrollTo({ top: s.getBoundingClientRect().top + scrollY + (sv * innerHeight) / 100, behavior: 'smooth' });
    },
    [avec3d],
  );
  const changer = (pas) => (avec3d ? aller(index + pas) : setIndex((index + pas + N) % N));

  /* glisser lentement = pivoter le burger ; glisser vite = burger suivant */
  const down = (e) => {
    if (e.button > 0) return;
    glisse.current = { x0: e.clientX, y0: e.clientY, t0: performance.now(), p0: etat.current.pivot };
    etat.current.glisse = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const move = (e) => {
    const g = glisse.current;
    if (!g) return;
    etat.current.pivot = g.p0 + (e.clientX - g.x0) * 0.005;
  };
  const up = (e) => {
    const g = glisse.current;
    glisse.current = null;
    etat.current.glisse = false;
    if (!g) return;
    const dx = e.clientX - g.x0;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(e.clientY - g.y0) * 1.2 && performance.now() - g.t0 < 380) changer(dx < 0 ? 1 : -1);
  };
  const touche = (e) => {
    if (e.key === 'ArrowRight') changer(1);
    else if (e.key === 'ArrowLeft') changer(-1);
    else return;
    e.preventDefault();
  };
  const commander = () => {
    ajouter?.(b.id);
    setAjoute(true);
    setTimeout(() => setAjoute(false), 1500);
  };

  const infos = (
    <div key={b.id} className="cr-apparition" aria-live="polite">
      <p className="surtitre">
        Burger {index + 1} / {N}
        {b.tags.filter((t) => TAG[t]).map((t) => ` · ${TAG[t]}`)}
      </p>
      <h2 className="mt-1 text-[clamp(1.8rem,7.5vw,4.2rem)] leading-[0.95]">{b.nom}</h2>
      <p className="titre mt-1 whitespace-nowrap text-2xl text-flamme md:mt-3 md:text-4xl">{formatEuros(b.prix)}</p>
      <p className="mt-1.5 line-clamp-2 text-base leading-snug text-creme/80 md:mt-2 md:line-clamp-none md:text-lg md:leading-relaxed">{b.desc}</p>
      <p className="mt-2 hidden text-base text-creme/60 md:block">
        <span className="font-semibold text-creme/80">Allergènes :</span> {b.allergenes.map((a) => allergenes[a]).join(', ')}
      </p>
    </div>
  );

  const commandes = (
    <>
      <div className="mt-4 flex items-center gap-2">
        <button type="button" onClick={() => changer(-1)} className="cr-fleche" aria-label="Burger précédent" disabled={avec3d && index === 0}>
          <Fleche sens={-1} />
        </button>
        <div className="flex gap-1.5" aria-hidden="true">
          {BURGERS.map((x, i) => (
            <span key={x.id} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-braise' : 'w-1.5 bg-creme/30'}`} />
          ))}
        </div>
        <button type="button" onClick={() => changer(1)} className="cr-fleche" aria-label="Burger suivant" disabled={avec3d && index === N - 1}>
          <Fleche sens={1} />
        </button>
        {avec3d && (
          <span className="ml-2 hidden text-xs uppercase tracking-[0.2em] text-creme/50 lg:inline" aria-hidden="true">
            Défilez · glissez pour tourner
          </span>
        )}
      </div>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={commander} className="btn btn-braise flex-1 md:flex-none">
          {ajoute ? (
            'Ajouté ✓'
          ) : (
            <>
              Commander<span className="hidden sm:inline"> · {formatEuros(b.prix)}</span>
            </>
          )}
        </button>
        <a href="#carte" className="btn btn-ligne flex-1 md:flex-none">
          Voir la carte
        </a>
      </div>
    </>
  );

  // ---------- sans 3D ou « réduire les animations » : les burgers fixes, de face ----------
  if (!avec3d) {
    return (
      <section id="burgers" aria-label="Nos burgers" className="relative overflow-hidden bg-nuit text-creme">
        {reduit && <h1 className="sr-only">Crunch!, smash burgers à Lille</h1>}
        <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-6 px-5 pb-28 pt-24 md:grid-cols-[1fr_1.2fr] md:px-12 md:pb-16">
          <div className="md:order-2">
            <img
              src={`${BASE}scene3d/burgers/${b.id}-hd.webp`}
              alt={b.nom}
              className="mx-auto max-h-[44svh] w-auto drop-shadow-[0_30px_40px_rgb(0_0_0/0.6)] md:max-h-[70svh]"
              width="640"
              height="600"
            />
          </div>
          <div onKeyDown={touche}>
            {infos}
            {commandes}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="burgers"
      ref={section}
      aria-label="Nos burgers"
      className="relative z-10 -mt-[100svh] text-creme"
      style={{ height: `${HAUTEUR}svh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* le dernier plan du film (la plancha), exactement comme à la fin de la visite, puis flouté derrière */}
        <img
          ref={fond}
          src={`${BASE}sequence/${format}/${String(N_FILM).padStart(3, '0')}.webp`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover will-change-[filter,transform]"
        />
        <div ref={toile} className="absolute inset-0 opacity-0">
          {charger && (
            <Suspense fallback={null}>
              <Burgers3D ids={IDS} etat={etat} leger={leger} actif={actif} />
            </Suspense>
          )}
        </div>
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-nuit/90 via-nuit/10 to-transparent transition-opacity duration-700 md:bg-gradient-to-r md:from-nuit/80 md:via-nuit/20 md:to-transparent ${surBurgers ? 'opacity-100' : 'opacity-0'}`} />

        {/* zone de manipulation du burger (glisser pour tourner, glisser vite pour changer) */}
        <div
          role="group"
          aria-roledescription="carrousel"
          aria-label={`Nos burgers : ${b.nom}. Flèches gauche et droite pour changer.`}
          tabIndex={surBurgers ? 0 : -1}
          onKeyDown={touche}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={() => {
            glisse.current = null;
            etat.current.glisse = false;
          }}
          className={`absolute inset-x-0 top-[8%] h-[48%] touch-pan-y select-none outline-none md:left-[38%] md:top-[12%] md:h-[76%] ${
            surBurgers ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
          }`}
        />

        {/* le burger au centre : nom, prix, description, commander, voir la carte */}
        <div
          className={`absolute inset-x-0 bottom-0 px-5 pb-[calc(6.2rem+env(safe-area-inset-bottom))] transition-all duration-700 md:inset-y-0 md:flex md:max-w-[40%] md:flex-col md:justify-center md:px-12 md:pb-0 ${
            surBurgers ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
          }`}
          aria-hidden={!surBurgers}
          inert={!surBurgers}
        >
          {infos}
          {commandes}
        </div>

        {/* sortie vers la carte */}
        <div ref={fin} className="pointer-events-none absolute inset-0 bg-nuit opacity-0" aria-hidden="true" />
      </div>
    </section>
  );
}
