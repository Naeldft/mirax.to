import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDeviceTier } from '../hooks/useDeviceTier.js';
import { useInView } from '../hooks/useInView.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { ScrollTrigger } from '../lib/gsap.js';

/**
 * ============================================================
 *  ScrollStory — accueil « à la Ciao Energy »
 * ============================================================
 *  Une section qui reste fixée à l'écran pendant le défilement. L'objet 3D
 *  reste au centre ; à chaque étape le fond change de couleur, un mot géant
 *  défile derrière l'objet et le texte change. L'étape 0 est l'accueil.
 *
 *  steps : [{ fond: [couleur centre, couleur bord], mot, encre, contenu (JSX) }]
 *  scene : ({ progress, step, reduced, tier, active, onReady, onSlow }) => <Canvas …/>
 *          progress.current : 0 → 1 sur toute la section ; step.current : 0 → n-1 (décimal)
 *  poster : { src, srcSet, alt } image fixe si pas de 3D (WebGL absent, téléphone lent)
 *  onStep(i) : appelé quand l'étape affichée change
 *
 *  Mobile : objet en haut, texte en bas. Ordinateur : texte à gauche, objet à droite.
 *  « Réduire les animations » : rien n'est fixé, les étapes s'affichent l'une sous l'autre.
 */
const clamp01 = (x) => Math.min(1, Math.max(0, x));

export default function ScrollStory({
  id = 'accueil',
  label = 'Accueil',
  steps,
  scene,
  poster,
  onStep,
  onReady,
  vhParEtape = 100,
  boiteObjet = 'top-16 h-[44svh] inset-x-0 md:inset-y-0 md:left-[40%] md:right-0 md:top-0 md:h-auto',
  className = '',
  indicateur = 'text-current',
  motClass = 'font-display text-[clamp(7rem,32vw,26rem)] leading-none',
}) {
  const section = useRef(null);
  const panels = useRef([]);
  const fonds = useRef([]);
  const mots = useRef([]);
  const barre = useRef(null);
  const compteur = useRef(null);
  const progress = useRef(0);
  const step = useRef(0);
  const courant = useRef(0);
  const reduced = useReducedMotion();
  const inView = useInView(section, '120px');
  const [tier] = useState(getDeviceTier);
  const [load3d, setLoad3d] = useState(false);
  const [pret3d, setPret3d] = useState(false);
  const [lent, setLent] = useState(tier === 'none');
  const [annonce, setAnnonce] = useState(0);
  const n = steps.length;

  // la 3D se charge quand le navigateur est libre : le texte et l'image s'affichent d'abord
  useEffect(() => {
    if (tier === 'none') {
      onReady?.();
      return;
    }
    const go = () => setLoad3d(true);
    const t = 'requestIdleCallback' in window ? window.requestIdleCallback(go, { timeout: 900 }) : setTimeout(go, 300);
    // l'écran de chargement ne doit jamais attendre la 3D plus de 1,6 s
    const garde = setTimeout(() => onReady?.(), 1600);
    return () => {
      'cancelIdleCallback' in window ? window.cancelIdleCallback(t) : clearTimeout(t);
      clearTimeout(garde);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- au montage
  }, [tier]);

  // applique l'état d'une étape (décimale) directement au DOM, sans re-rendu React
  const appliquer = useCallback(
    (s) => {
      for (let i = 0; i < n; i++) {
        const d = s - i;
        const a = Math.abs(d);
        const p = panels.current[i];
        if (p) {
          const o = clamp01(1 - a * 2.4);
          p.style.opacity = o;
          p.style.transform = `translate3d(0, ${(-d * 46).toFixed(1)}px, 0)`;
          p.style.visibility = o < 0.02 ? 'hidden' : 'visible';
          p.inert = o < 0.5;
        }
        if (fonds.current[i]) fonds.current[i].style.opacity = clamp01(1 - a);
        const m = mots.current[i];
        if (m) {
          m.style.opacity = clamp01(1 - a * 1.6) * (steps[i].motOpacite ?? 0.12);
          m.style.transform = `translate3d(${(-d * 22).toFixed(2)}%, -50%, 0)`;
        }
      }
      if (barre.current) barre.current.style.transform = `scaleX(${n > 1 ? s / (n - 1) : 1})`;
      const r = Math.round(s);
      if (r !== courant.current) {
        courant.current = r;
        if (compteur.current) compteur.current.textContent = String(r + 1).padStart(2, '0');
        setAnnonce(r);
        onStep?.(r);
      }
    },
    [n, onStep, steps],
  );

  useLayoutEffect(() => {
    if (reduced || !section.current) return;
    appliquer(0);
    const st = ScrollTrigger.create({
      trigger: section.current,
      start: 'top top',
      end: 'bottom bottom',
      // aimantation douce sur l'étape la plus proche (jamais bloqué entre deux textes)
      snap: n > 1 ? { snapTo: 1 / (n - 1), duration: { min: 0.25, max: 0.7 }, delay: 0.1, ease: 'power2.inOut' } : false,
      onUpdate: (self) => {
        progress.current = self.progress;
        step.current = self.progress * (n - 1);
        appliquer(step.current);
      },
    });
    return () => st.kill();
  }, [reduced, n, appliquer]);

  const pret = useCallback(() => {
    setPret3d(true);
    onReady?.();
  }, [onReady]);
  const ralenti = useCallback(() => setLent(true), []);
  const montrer3d = load3d && !lent;

  /* ----- version « animations réduites » : étapes empilées, rien de fixé ----- */
  if (reduced) {
    return (
      <section id={id} ref={section} aria-label={label} className={`relative ${className}`}>
        {steps.map((s, i) => (
          <div
            key={i}
            className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden px-5 pb-28 pt-24 md:justify-center md:px-12 md:pb-16"
            style={{ background: `radial-gradient(ellipse 80% 70% at 65% 45%, ${s.fond[0]}, ${s.fond[1]})`, color: s.encre }}
          >
            {i === 0 && (
              <div className={`absolute ${boiteObjet}`}>
                {poster && <img {...poster} className="h-full w-full object-contain" fetchPriority="high" />}
                {montrer3d && (
                  <Suspense fallback={null}>
                    {scene({ progress, step, reduced, tier, active: inView, onReady: pret, onSlow: ralenti })}
                  </Suspense>
                )}
              </div>
            )}
            <div className="relative mx-auto w-full max-w-7xl">{s.contenu}</div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section id={id} ref={section} aria-label={label} className={`relative ${className}`} style={{ height: `${n * vhParEtape}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* fonds : un calque par étape, en fondu enchaîné */}
        {steps.map((s, i) => (
          <div
            key={i}
            ref={(el) => (fonds.current[i] = el)}
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse 75% 65% at 62% 42%, ${s.fond[0]}, ${s.fond[1]} 78%)`, opacity: i === 0 ? 1 : 0 }}
          />
        ))}
        {/* mots géants derrière l'objet (typographie énorme, en parallaxe) */}
        {steps.map((s, i) =>
          s.mot ? (
            <p
              key={i}
              ref={(el) => (mots.current[i] = el)}
              aria-hidden="true"
              className={`pointer-events-none absolute left-0 top-[30%] w-max select-none whitespace-nowrap px-4 md:top-1/2 ${motClass}`}
              style={{ opacity: i === 0 ? (s.motOpacite ?? 0.12) : 0, transform: 'translate3d(0,-50%,0)', color: s.encre }}
            >
              {s.mot}
            </p>
          ) : null,
        )}
        {/* objet 3D (ou image fixe) */}
        <div className={`absolute ${boiteObjet}`}>
          {poster && (
            <img
              {...poster}
              fetchPriority="high"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${pret3d && !lent ? 'opacity-0' : 'opacity-100'}`}
            />
          )}
          {montrer3d && (
            <Suspense fallback={null}>{scene({ progress, step, reduced, tier, active: inView, onReady: pret, onSlow: ralenti })}</Suspense>
          )}
        </div>
        {/* textes : un panneau par étape */}
        {steps.map((s, i) => (
          <div
            key={i}
            ref={(el) => (panels.current[i] = el)}
            className="absolute inset-x-0 bottom-0 flex justify-center px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:inset-y-0 md:items-center md:px-12 md:pb-0"
            style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'visible' : 'hidden', color: s.encre }}
          >
            <div className="w-full max-w-7xl">{s.contenu}</div>
          </div>
        ))}
        {/* progression : « 01 / 05 » + barre */}
        {n > 1 && (
          <div
            className={`pointer-events-none absolute bottom-[calc(5.2rem+env(safe-area-inset-bottom))] left-5 right-5 flex items-center gap-3 text-xs font-semibold tabular-nums md:bottom-8 md:left-12 md:right-12 ${indicateur}`}
            aria-hidden="true"
          >
            <span ref={compteur}>01</span>
            <span className="relative h-px flex-1 bg-current/25">
              <span ref={barre} className="absolute inset-0 origin-left bg-current" style={{ transform: 'scaleX(0)' }} />
            </span>
            <span>{String(n).padStart(2, '0')}</span>
          </div>
        )}
        <p className="sr-only" aria-live="polite">
          Étape {annonce + 1} sur {n}
        </p>
      </div>
    </section>
  );
}
