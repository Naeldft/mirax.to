import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { getDeviceTier } from '../hooks/useDeviceTier.js';
import { useInView } from '../hooks/useInView.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { photoSrcSet, photoUrl } from './Photo.jsx';

// La galerie 3D (three.js) est chargée à part, après l'affichage du texte.
const Galerie3D = lazy(() => import('../three/Galerie3D.jsx'));

/** Mêmes repères que three/Galerie3D.jsx (reperes) : copiés pour ne pas charger three.js d'avance. */
const DEBUT = 0.1;
const FIN_GALERIE = 0.9;
const arretDe = (p, n) => {
  if (p < DEBUT || p >= FIN_GALERIE) return -1;
  const s = (p - DEBUT) / ((FIN_GALERIE - DEBUT) / n);
  const i = Math.floor(s);
  const f = s - i;
  return f > 0.08 && f < 0.62 ? i : -1;
};

/**
 * Accueil commun des démos « galerie » : une vraie scène 3D (allée aux couleurs de la marque, vraies photos
 * encadrées) pilotée par le défilement ; le texte de chaque photo s'affiche à côté.
 *  intro    : le contenu d'accueil (titre, boutons), affiché au départ
 *  photos   : [{ nom, alt, surtitre, titre, texte, lien? }]
 *  theme    : couleurs de la scène (voir three/Galerie3D.jsx)
 *  classes  : { section, carte, surtitre, titre, texte, voile } (classes Tailwind de la démo)
 *  fin      : contenu affiché au moment du fondu vers le site (facultatif)
 * Sans 3D ou avec « réduire les animations » : la première photo en fond, puis les photos et textes en liste.
 */
export default function HeroGalerie({ id = 'accueil', label, intro, photos, theme, classes = {}, fin, onReady }) {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const voileFin = useRef(null);
  const progres = useRef(0);
  const enVue = useInView(section, '0px');
  const [tier] = useState(getDeviceTier);
  const [charger3d, setCharger3d] = useState(false);
  const [pret3d, setPret3d] = useState(false);
  const [debut, setDebut] = useState(true);
  const [arret, setArret] = useState(-1);
  const [finVisible, setFinVisible] = useState(false);
  const avec3d = tier !== 'none' && !reduit;
  const leger = tier === 'low';
  const n = photos.length;

  useEffect(() => {
    if (!avec3d) return;
    const maj = () => {
      const s = section.current;
      if (!s) return;
      const r = s.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      progres.current = p;
      setDebut(p < 0.03);
      setArret(arretDe(p, n));
      setFinVisible(p > 0.92);
      if (voileFin.current) voileFin.current.style.opacity = String(Math.min(1, Math.max(0, (p - 0.92) / 0.06)));
    };
    maj();
    addEventListener('scroll', maj, { passive: true });
    addEventListener('resize', maj);
    return () => {
      removeEventListener('scroll', maj);
      removeEventListener('resize', maj);
    };
  }, [avec3d, n]);

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

  const fond = (
    <img
      src={photoUrl(photos[0].nom, 800)}
      srcSet={photoSrcSet(photos[0].nom)}
      sizes="100vw"
      alt={photos[0].alt}
      fetchPriority="high"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );

  const Texte = ({ p }) => (
    <>
      {p.surtitre && <p className={classes.surtitre}>{p.surtitre}</p>}
      <h2 className={classes.titre}>{p.titre}</h2>
      {p.texte && <p className={classes.texte}>{p.texte}</p>}
      {p.lien}
    </>
  );

  if (!avec3d) {
    return (
      <section id={id} ref={section} aria-label={label} className={classes.section}>
        <div className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center">
          {fond}
          <div className={`absolute inset-0 ${classes.voile}`} />
          <div className="relative z-10 w-full">{intro}</div>
        </div>
        <ul className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:px-12">
          {photos.map((p) => (
            <li key={p.nom}>
              <img src={photoUrl(p.nom, 800)} srcSet={photoSrcSet(p.nom)} sizes="(min-width: 768px) 45vw, 100vw" alt={p.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="mt-4">
                <Texte p={p} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section id={id} ref={section} aria-label={label} className={`relative ${classes.section}`} style={{ height: `${260 + n * 110}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-700 ${pret3d ? 'opacity-0' : 'opacity-100'}`}>{fond}</div>
        {charger3d && (
          <Suspense fallback={null}>
            <Galerie3D progres={progres} photos={photos} theme={theme} leger={leger} actif={enVue} onReady={pret} />
          </Suspense>
        )}
        <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${classes.voile} ${debut ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`relative flex h-full items-end transition-opacity duration-500 md:items-center ${debut ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          <div className="w-full">{intro}</div>
        </div>
        {/* le texte de la photo regardée : à gauche (ordinateur), en bas (téléphone) */}
        {photos.map((p, i) => (
          <div
            key={p.nom}
            aria-hidden={arret !== i}
            className={`absolute inset-x-0 bottom-0 px-5 pb-[calc(6.2rem+env(safe-area-inset-bottom))] transition-all duration-500 md:inset-y-0 md:flex md:max-w-[42%] md:flex-col md:justify-center md:px-12 md:pb-0 ${
              arret === i ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
            }`}
          >
            <div className={classes.carte}>
              <Texte p={p} />
            </div>
          </div>
        ))}
        {/* sortie vers le site */}
        <div ref={voileFin} className={`absolute inset-0 flex items-center justify-center opacity-0 ${classes.fin ?? ''} ${finVisible ? '' : 'pointer-events-none'}`}>
          {fin}
        </div>
        <ul className="sr-only">
          {photos.map((p) => (
            <li key={p.nom}>
              {p.alt}. {p.titre}. {p.texte}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
