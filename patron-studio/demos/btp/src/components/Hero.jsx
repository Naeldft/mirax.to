import { lazy, useLayoutEffect, useMemo, useRef } from 'react';
import ScrollStory from '@demos/shared/components/ScrollStory.jsx';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { entreprise, phases } from '../data/site';
import { Telephone } from './Icons';

const HouseScene = lazy(() => import('../three/HouseScene'));

// avancement du chantier 3D affiché à chaque étape (accueil, puis une phase par étape)
const AVANCEMENT = [0, 0.1, 0.3, 0.56, 0.78, 1];
// ambiance de fond par étape : béton, terre, parpaing, bois, ciel, jaune chantier
const FONDS = [
  ['#f1efe9', '#d9d6ce'],
  ['#efe3cd', '#d2c3a7'],
  ['#ececea', '#c8c8c2'],
  ['#f1e2ca', '#d3bc98'],
  ['#e3ecf8', '#b9cae3'],
  ['#fcefbf', '#f0cf5a'],
];

/** Interpolation de l'avancement entre deux étapes (étape décimale → 0..1). */
const avancementDe = (s) => {
  const i = Math.max(0, Math.min(AVANCEMENT.length - 2, Math.floor(s)));
  const f = Math.min(1, Math.max(0, s - i));
  return AVANCEMENT[i] + (AVANCEMENT[i + 1] - AVANCEMENT[i]) * f;
};

/**
 * Accueil « à faire défiler » : la maison 3D se construit phase par phase
 * (fondations, rez-de-chaussée, étage, toiture, clés en main) pendant que le texte suit.
 */
export default function Hero({ onReady }) {
  const scope = useRef(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-line]', { yPercent: 110, duration: 1, stagger: 0.09, ease: 'power4.out', delay: 0.2 });
      gsap.from('[data-hero-in]', { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.6 });
    }, scope);
    return () => ctx.revert();
  }, [reduced]);

  const steps = useMemo(
    () => [
      {
        fond: FONDS[0],
        mot: 'Bâti Nord',
        encre: '#1d1d1b',
        motOpacite: 0.08,
        contenu: (
          <div ref={scope} className="max-w-2xl md:max-w-[46%]">
            <p data-hero-in className="etiquette">
              {entreprise.accroche}
            </p>
            <h1 className="mt-3 text-[clamp(2.5rem,11.5vw,4.5rem)] leading-[0.9] md:text-[clamp(3rem,5.6vw,6.2rem)]">
              {['On bâtit.', 'Vous', 'emménagez.'].map((l, i) => (
                <span key={l} className="block overflow-hidden">
                  <span data-line className={`block ${i ? 'text-plan' : ''}`}>
                    {l}
                  </span>
                </span>
              ))}
            </h1>
            <p data-hero-in className="mt-4 hidden max-w-md text-lg text-graphite md:block">
              {entreprise.intro}
            </p>
            <div data-hero-in className="mt-6 flex gap-3">
              <a href="#devis" className="btn btn-jaune flex-1 md:flex-none">
                Devis gratuit
              </a>
              <a href={`tel:${entreprise.telephoneLien}`} className="btn btn-blanc flex-1 md:flex-none">
                <Telephone /> Appeler
              </a>
            </div>
          </div>
        ),
      },
      ...phases.map((ph, i) => ({
        fond: FONDS[i + 1],
        mot: ph.nom,
        encre: '#1d1d1b',
        motOpacite: 0.08,
        contenu: (
          <div className="max-w-xl md:max-w-[42%]">
            <p className="etiquette">
              Phase {String(i + 1).padStart(2, '0')} · avancement {Math.round(AVANCEMENT[i + 1] * 100)} %
            </p>
            <h2 className="mt-2 text-[clamp(2.6rem,11vw,4.5rem)] leading-[0.9] md:text-[clamp(3rem,5.6vw,6.2rem)]">{ph.nom}</h2>
            <p className="mt-3 max-w-md text-lg text-graphite md:text-xl">{ph.texte}</p>
            <div className="hachures mt-5 h-2 max-w-sm overflow-hidden bg-beton-2" aria-hidden="true">
              <div className="h-full origin-left bg-plan" style={{ transform: `scaleX(${AVANCEMENT[i + 1]})` }} />
            </div>
            {i === phases.length - 1 && (
              <a href="#realisations" className="btn btn-jaune mt-6">
                Nos réalisations
              </a>
            )}
          </div>
        ),
      })),
    ],
    [],
  );

  return (
    <ScrollStory
      id="accueil"
      label="Accueil : Bâti Nord Construction"
      steps={steps}
      onReady={onReady}
      className="quadrillage"
      indicateur="text-anthracite"
      motClass="font-display uppercase text-[clamp(5rem,22vw,20rem)] leading-none"
      scene={(api) => (
        <HouseScene
          {...api}
          progress={{
            get current() {
              return reduced ? 1 : avancementDe(api.step.current);
            },
          }}
        />
      )}
    />
  );
}
