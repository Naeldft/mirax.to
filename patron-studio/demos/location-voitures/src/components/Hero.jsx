import { lazy, useCallback, useLayoutEffect, useRef } from 'react';
import ScrollStory from '@demos/shared/components/ScrollStory.jsx';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { couleurs, entreprise, modeles, specsHero } from '../data/site';
import { Check } from './Icons';

const CarScene = lazy(() => import('../three/CarScene'));

// une ambiance (fond) et une couleur de carrosserie par étape : accueil, puis un modèle par étape
const AMBIANCES = {
  accueil: { fond: ['#30333a', '#0a0a0b'], couleur: 'rouge' },
  citadine: { fond: ['#6a0f0b', '#0a0a0b'], couleur: 'rouge' },
  suv: { fond: ['#454b55', '#0a0a0b'], couleur: 'titane' },
  utilitaire: { fond: ['#1d3150', '#08090b'], couleur: 'blanc' },
  premium: { fond: ['#4a3d26', '#070707'], couleur: 'noir' },
};

/** Pastilles de couleur (partagées avec la flotte et la réservation). */
function Couleurs({ color, onColor }) {
  const nom = couleurs.find((c) => c.id === color)?.nom;
  return (
    <div className="mt-5 flex items-center gap-3">
      <div role="radiogroup" aria-label="Choisir une couleur" className="flex gap-1">
        {couleurs.map((c) => (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={c.id === color}
            aria-label={c.nom}
            title={c.nom}
            onClick={() => onColor(c.id)}
            className="flex h-11 w-11 items-center justify-center rounded-full"
          >
            <span
              className={`block h-8 w-8 rounded-full border-2 transition-transform duration-300 ${c.id === color ? 'scale-110 border-ivoire' : 'border-ivoire/25'}`}
              style={{ background: c.hex }}
            />
          </button>
        ))}
      </div>
      <p className="text-base text-ivoire/70" aria-live="polite">
        {nom}
      </p>
    </div>
  );
}

/**
 * Accueil « showroom à faire défiler » : à chaque étape, un autre modèle apparaît en 3D,
 * dans une autre couleur et une autre ambiance. On peut aussi faire tourner la voiture au doigt.
 * model / color / onModel / onColor sont partagés avec la flotte et le formulaire de réservation.
 */
export default function Hero({ model, color, onModel, onColor, onReady }) {
  const scope = useRef(null);
  const drag = useRef({ active: false, delta: 0, lastX: 0 });
  const reduced = useReducedMotion();
  const currentColor = couleurs.find((c) => c.id === color);

  const onStep = useCallback(
    (i) => {
      const m = i === 0 ? null : modeles[i - 1];
      if (m) onModel(m.id);
      onColor(AMBIANCES[m ? m.id : 'accueil'].couleur);
    },
    [onModel, onColor],
  );

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-word]', { yPercent: 110, duration: 1, stagger: 0.08, ease: 'power4.out', delay: 0.2 });
      gsap.from('[data-hero-in]', { y: 26, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.6 });
    }, scope);
    return () => ctx.revert();
  }, [reduced]);

  // glisser pour faire tourner la voiture (sans bloquer le défilement vertical)
  const glisser = {
    onPointerDown: (e) => {
      drag.current.active = true;
      drag.current.lastX = e.clientX;
    },
    onPointerMove: (e) => {
      if (!drag.current.active) return;
      drag.current.delta = (e.clientX - drag.current.lastX) * 0.01;
      drag.current.lastX = e.clientX;
    },
    onPointerUp: () => (drag.current.active = false),
    onPointerCancel: () => (drag.current.active = false),
  };

  const steps = [
    {
      fond: AMBIANCES.accueil.fond,
      mot: 'Velocità',
      encre: '#f4f2ee',
      contenu: (
        <div ref={scope} className="max-w-xl md:max-w-[42%]">
          <p data-hero-in className="surtitre">
            {entreprise.accroche}
          </p>
          <h1 className="mt-3 font-display text-[clamp(3rem,13vw,7rem)] font-bold uppercase leading-[0.92]">
            {['Prenez', 'la route.'].map((w) => (
              <span key={w} className="block overflow-hidden">
                <span data-word className="block">
                  {w}
                </span>
              </span>
            ))}
          </h1>
          <ul data-hero-in className="mt-4 hidden space-y-1 md:block">
            {specsHero.map((s) => (
              <li key={s} className="flex items-center gap-2 text-base text-ivoire/80">
                <span className="text-course-vif">
                  <Check />
                </span>
                {s}
              </li>
            ))}
          </ul>
          <div data-hero-in className="mt-6 flex gap-3">
            <a href="#reserver" className="btn btn-course flex-1 md:flex-none">
              Réserver
            </a>
            <a href="#flotte" className="btn btn-ligne flex-1 md:flex-none">
              La flotte
            </a>
          </div>
        </div>
      ),
    },
    ...modeles.map((m) => ({
      fond: AMBIANCES[m.id]?.fond ?? AMBIANCES.accueil.fond,
      mot: m.categorie,
      encre: '#f4f2ee',
      contenu: (
        <div className="max-w-xl md:max-w-[40%]">
          <p className="surtitre">{m.categorie}</p>
          <h2 className="mt-2 font-display text-[clamp(2.4rem,10vw,5.5rem)] font-bold uppercase leading-[0.92]">{m.nom}</h2>
          <p className="mt-2 text-base text-ivoire/65">{m.exemple}</p>
          <p className="mt-3 font-display text-3xl font-bold">
            dès {m.prix} €<span className="text-base font-normal text-ivoire/60"> / jour</span>
          </p>
          <Couleurs color={color} onColor={onColor} />
          <a href="#reserver" className="btn btn-course mt-4">
            Réserver ce modèle
          </a>
        </div>
      ),
    })),
  ];

  return (
    <ScrollStory
      id="accueil"
      label="Accueil : Velocità, location de voitures"
      steps={steps}
      onStep={onStep}
      onReady={onReady}
      className="vitesse"
      boiteObjet="top-14 h-[40svh] inset-x-0 md:inset-y-0 md:left-[38%] md:right-0 md:top-0 md:h-auto"
      motClass="font-display font-bold uppercase text-[clamp(5rem,22vw,20rem)] leading-none"
      scene={(api) => (
        <>
          <CarScene modelId={model} color={currentColor.hex} drag={drag} {...api} />
          <div className="absolute inset-[15%] cursor-grab touch-pan-y active:cursor-grabbing" aria-hidden="true" {...glisser} />
        </>
      )}
    />
  );
}
