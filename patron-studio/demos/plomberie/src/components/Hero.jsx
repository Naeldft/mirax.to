import { lazy, useLayoutEffect, useRef } from 'react';
import ScrollStory from '@demos/shared/components/ScrollStory.jsx';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { entreprise, etapesHero } from '../data/site';
import { Telephone } from './Icons';

const PlumbingScene = lazy(() => import('../three/PlumbingScene'));

// une couleur d'ambiance par étape : nuit, cuivre, bleu-vert, eau claire
const FONDS = [
  ['#15395a', '#0a1724'],
  ['#6a3a1f', '#0b1520'],
  ['#0f5058', '#081620'],
  ['#1b7390', '#0a1724'],
];
const MOTS = ['Ondine', 'Diagnostic', 'Réparation', 'Eau claire'];

/**
 * Accueil « à faire défiler » : la tuyauterie 3D s'assemble, le robinet s'ouvre puis l'eau coule,
 * pendant que les trois étapes de notre méthode s'affichent une à une.
 */
export default function Hero({ onReady }) {
  const scope = useRef(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-in]', { y: 36, opacity: 0, duration: 1, stagger: 0.09, ease: 'power3.out', delay: 0.15 });
    }, scope);
    return () => ctx.revert();
  }, [reduced]);

  const steps = [
    {
      fond: FONDS[0],
      mot: MOTS[0],
      encre: '#e8f6fa',
      contenu: (
        <div ref={scope} className="max-w-xl md:max-w-[44%]">
          <p data-hero-in className="tag">
            {entreprise.accroche}
          </p>
          <h1 data-hero-in className="mt-3 text-[clamp(3.2rem,14vw,7.5rem)] font-bold leading-[0.9]">
            L’eau,
            <br />
            <span className="bg-gradient-to-r from-eau to-cuivre-clair bg-clip-text text-transparent">on la maîtrise.</span>
          </h1>
          <p data-hero-in className="mt-4 hidden max-w-md text-lg text-ecume/80 md:block">
            {entreprise.intro}
          </p>
          <div data-hero-in className="mt-6 flex gap-3">
            <a href="#devis" className="btn btn-eau flex-1 md:flex-none">
              Devis gratuit
            </a>
            <a href={`tel:${entreprise.telephoneLien}`} className="btn btn-ligne flex-1 md:flex-none">
              <Telephone /> Appeler
            </a>
          </div>
        </div>
      ),
    },
    ...etapesHero.map((e, i) => ({
      fond: FONDS[i + 1],
      mot: MOTS[i + 1],
      encre: '#e8f6fa',
      contenu: (
        <div className="max-w-xl md:max-w-[42%]">
          <p className="font-display text-[clamp(3.5rem,14vw,7rem)] font-bold leading-none text-eau/90">0{i + 1}</p>
          <h2 className="mt-1 text-[clamp(2.6rem,11vw,6rem)] font-bold leading-[0.92]">{e.titre}</h2>
          <p className="mt-4 max-w-md text-lg text-ecume/80 md:text-xl">{e.texte}</p>
          {i === etapesHero.length - 1 && (
            <a href="#services" className="btn btn-eau mt-6">
              Nos services
            </a>
          )}
        </div>
      ),
    })),
  ];

  return (
    <ScrollStory
      id="accueil"
      label="Accueil : Ondine Plomberie"
      steps={steps}
      onReady={onReady}
      className="blueprint"
      motClass="font-display font-bold uppercase text-[clamp(6rem,26vw,22rem)] leading-none tracking-tight"
      scene={(api) => <PlumbingScene {...api} />}
    />
  );
}
