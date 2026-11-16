import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { photoSrcSet, photoUrl } from '@demos/shared/components/Photo.jsx';
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { useInView } from '@demos/shared/hooks/useInView.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { formatEuros } from '@demos/shared/lib/validation.js';
import { boutique, produits } from '../data/site';

// La scène 3D (three.js) est chargée à part, après l'affichage du texte.
const Boutique3D = lazy(() => import('../three/Boutique3D'));

const RAYONS = { hauts: 'Chemises & hauts', autres: 'Autres styles', table: 'Sur la table' };
// arrêts de la caméra devant chaque pièce (mêmes repères que three/Boutique3D.jsx, TRAJET)
const ARRETS = [
  ['chemise', 0.27, 0.34],
  ['tshirt', 0.36, 0.45],
  ['combishort', 0.48, 0.58],
  ['poncho', 0.6, 0.68],
  ['veste', 0.71, 0.8],
  ['cabas', 0.83, 0.91],
];
const FIN = [0.93, 0.99]; // fondu sur le catalogue
const ENTREE = 0.2;

/**
 * Accueil Atelier Lin : une vraie scène 3D pilotée par le défilement.
 * La devanture, la porte qui s'ouvre, puis la caméra longe le rayon « chemises & hauts » (à gauche),
 * pivote vers « autres styles » (à droite) et la table du fond ; fondu sur le catalogue.
 * Les vêtements sont de vraies photos détourées, suspendues aux portants.
 * Sans 3D ou avec « réduire les animations » : une vraie photo et le lien vers la collection.
 */
export default function Hero({ onReady }) {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const intro = useRef(null);
  const fin = useRef(null);
  const finTexte = useRef(null);
  const progres = useRef(0);
  const enVue = useInView(section, '0px');
  const [tier] = useState(getDeviceTier);
  const [charger3d, setCharger3d] = useState(false);
  const [pret3d, setPret3d] = useState(false);
  const [debut, setDebut] = useState(true);
  const [piece, setPiece] = useState(null);
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
      setPiece(ARRETS.find(([, a, b]) => p >= a && p <= b)?.[0] ?? null);
      setFinVisible(p > FIN[0]);
      const f = Math.min(1, Math.max(0, (p - FIN[0]) / (FIN[1] - FIN[0])));
      if (fin.current) fin.current.style.opacity = String(f);
      // le texte n'apparaît qu'une fois le fond presque opaque (pas de superposition avec l'enseigne)
      if (finTexte.current) finTexte.current.style.opacity = String(Math.max(0, (f - 0.6) / 0.4));
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
      gsap.from('[data-ligne]', { yPercent: 110, duration: 1.3, stagger: 0.12, ease: 'expo.out', delay: 0.3 });
      gsap.from('[data-in]', { opacity: 0, y: 16, stagger: 0.1, duration: 0.9, delay: 0.9, ease: 'power2.out' });
    }, intro);
    return () => ctx.revert();
  }, [reduit]);

  const entrer = () => {
    const s = section.current;
    scrollTo({ top: s.getBoundingClientRect().top + scrollY + ENTREE * (s.offsetHeight - innerHeight), behavior: 'smooth' });
  };
  const p = produits.find((x) => x.id === piece);

  const Intro = (
    <div ref={intro} className="relative z-10 max-w-xl px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] md:max-w-[48%] md:px-16 md:pb-0">
      <p data-in className="etiquette !text-encre">
        {boutique.accroche}
      </p>
      <h1 className="mt-4 text-[clamp(3.3rem,min(12vw,11svh),7rem)] leading-[0.95]">
        <span className="block overflow-hidden pb-1">
          <span data-ligne className="block">
            L’essentiel,
          </span>
        </span>
        <span className="block overflow-hidden pb-1">
          <span data-ligne className="block italic text-gris">
            tout simplement.
          </span>
        </span>
      </h1>
      <p data-in className="mt-5 hidden max-w-md leading-relaxed text-encre/80 md:block">
        {boutique.intro}
      </p>
      <div data-in className="mt-6 flex flex-wrap gap-3">
        {avec3d ? (
          <button type="button" onClick={entrer} className="btn btn-encre">
            Entrer
          </button>
        ) : null}
        <a href="#collection" className={avec3d ? 'btn btn-ligne bg-ivoire/70' : 'btn btn-encre'}>
          Voir la collection
        </a>
      </div>
      {avec3d && (
        <p data-in className="mt-8 hidden text-xs uppercase tracking-[0.3em] text-encre/70 md:block" aria-hidden="true">
          Entrez, ou faites défiler · visite de la boutique ↓
        </p>
      )}
    </div>
  );

  const PhotoFond = (
    <img
      src={photoUrl('poncho-alize', 800)}
      srcSet={photoSrcSet('poncho-alize')}
      sizes="100vw"
      alt="Poncho en maille écrue sur un cintre, dans la boutique"
      fetchPriority="high"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: '50% 30%' }}
    />
  );

  if (!avec3d) {
    return (
      <section id="accueil" ref={section} aria-label="Accueil : Atelier Lin" className="bg-ivoire">
        <div className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center">
          {PhotoFond}
          <div className="absolute inset-0 bg-gradient-to-t from-ivoire via-ivoire/70 to-transparent md:bg-gradient-to-r" />
          {Intro}
        </div>
      </section>
    );
  }

  return (
    <section id="accueil" ref={section} aria-label="Accueil : Atelier Lin" className="relative bg-ivoire" style={{ height: '620svh' }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-700 ${pret3d ? 'opacity-0' : 'opacity-100'}`}>{PhotoFond}</div>
        {charger3d && (
          <Suspense fallback={null}>
            <Boutique3D progres={progres} produits={produits} leger={leger} actif={enVue} onReady={pret} />
          </Suspense>
        )}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-ivoire/95 via-ivoire/40 to-transparent transition-opacity duration-500 md:bg-gradient-to-r md:from-ivoire/90 md:via-ivoire/30 md:to-transparent ${
            debut ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className={`relative flex h-full items-end transition-opacity duration-500 md:items-center md:pt-16 ${debut ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          {Intro}
        </div>
        {/* la pièce devant laquelle la caméra s'arrête */}
        <div
          aria-live="polite"
          className={`absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-4 right-4 transition-all duration-500 md:bottom-10 md:left-10 md:right-auto md:w-80 ${
            p ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
        >
          {p && (
            <div className="bg-ivoire/92 p-5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.35)] backdrop-blur">
              <p className="etiquette">{RAYONS[p.rayon]}</p>
              <div className="mt-1 flex items-baseline justify-between gap-3">
                <p className="font-display text-3xl">{p.nom}</p>
                <p className="tabular-nums">{formatEuros(p.prix)}</p>
              </div>
              <p className="mt-1 text-base text-gris">
                {p.couleur} · {p.note}
              </p>
            </div>
          )}
        </div>
        {/* fin : fondu sur le catalogue */}
        <div
          ref={fin}
          className={`absolute inset-0 flex items-center justify-center bg-ivoire px-5 opacity-0 ${finVisible ? '' : 'pointer-events-none'}`}
        >
          <div ref={finTexte} className="text-center">
            <p className="etiquette">Collection</p>
            <p className="mt-3 font-display text-[clamp(3rem,10vw,6rem)] leading-none">Les essentiels</p>
            <a href="#collection" className="btn btn-encre mt-8" tabIndex={finVisible ? 0 : -1}>
              Voir la collection
            </a>
          </div>
        </div>
        <ul className="sr-only">
          {produits
            .filter((x) => x.rayon)
            .map((x) => (
              <li key={x.id}>
                {RAYONS[x.rayon]} : {x.nom}, {x.couleur}, {formatEuros(x.prix)}.
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
