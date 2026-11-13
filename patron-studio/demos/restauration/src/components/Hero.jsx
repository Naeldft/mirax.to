import { lazy, useCallback, useLayoutEffect, useRef, useState } from 'react';
import ScrollStory from '@demos/shared/components/ScrollStory.jsx';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { formatPrix, histoirePizzas, pizzaImage, pizzas } from '../data/pizzas';
import { restaurant } from '../data/site';

// La 3D (three.js) est chargée à part, après l'affichage du texte : la page reste rapide.
const HeroScene = lazy(() => import('../three/HeroScene'));

const etapesPizzas = histoirePizzas.map((h) => ({ ...h, pizza: pizzas.find((p) => p.id === h.id) }));
const CATEGORIE = { classique: 'Classique', epicee: 'Épicée', vegetarienne: 'Végétarienne' };

/**
 * Accueil « à faire défiler » : étape 0 = Forno Vivo, puis une pizza par étape.
 * La pizza 3D change, tourne et se transforme ; le fond et le texte changent avec elle.
 */
export default function Hero({ onReady }) {
  const scope = useRef(null);
  const reduced = useReducedMotion();
  // pizza affichée en 3D : celle de l'étape courante (l'accueil montre la margherita)
  const [pizza, setPizza] = useState(etapesPizzas[0].pizza);
  const onStep = useCallback((i) => setPizza(etapesPizzas[Math.max(0, i - 1)].pizza), []);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-in]', { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.15 });
    }, scope);
    return () => ctx.revert();
  }, [reduced]);

  const steps = [
    {
      fond: ['#6b2412', '#14110f'],
      mot: 'Napoli',
      encre: '#f5ecd9',
      contenu: (
        <div ref={scope} className="max-w-xl md:max-w-[44%]">
          <p data-hero-in className="eyebrow">
            {restaurant.accroche}
          </p>
          <h1 data-hero-in className="mt-3 text-[clamp(3.6rem,17vw,9rem)] font-semibold leading-[0.88]">
            Forno <em className="font-medium text-or-clair">Vivo</em>
          </h1>
          <p data-hero-in className="mt-4 font-serif text-xl italic text-creme/85 md:text-3xl">
            {restaurant.slogan}
          </p>
          <div data-hero-in className="mt-6 flex gap-3">
            <a href="#menu" className="btn btn-primary flex-1 md:flex-none">
              Voir le menu
            </a>
            <a href="#reservation" className="btn btn-ghost flex-1 md:flex-none">
              Réserver
            </a>
          </div>
          <p data-hero-in className="mt-6 hidden text-sm uppercase tracking-[0.25em] text-creme/50 md:block" aria-hidden="true">
            Faites défiler · nos pizzas ↓
          </p>
        </div>
      ),
    },
    ...etapesPizzas.map((e, i) => ({
      fond: e.fond,
      mot: e.mot,
      encre: '#f5ecd9',
      contenu: (
        <div className="max-w-xl md:max-w-[42%]">
          <p className="eyebrow">
            N° {String(i + 1).padStart(2, '0')} · {e.pizza.categories.map((c) => CATEGORIE[c]).join(' · ') || 'Signature du chef'}
          </p>
          <h2 className="mt-2 text-[clamp(3rem,14vw,7.5rem)] font-semibold leading-[0.9]">{e.pizza.nom}</h2>
          <p className="mt-3 font-serif text-xl italic text-creme/85 md:text-2xl">{e.pizza.description}</p>
          <p className="mt-2 hidden text-base leading-relaxed text-creme/70 md:block">{e.pizza.ingredients.join(' · ')}</p>
          <div className="mt-5 flex items-center gap-4">
            <span className="font-serif text-3xl text-or-clair md:text-4xl">{formatPrix(e.pizza.prix)}</span>
            <a href="#menu" className="btn btn-ghost">
              Toute la carte
            </a>
          </div>
        </div>
      ),
    })),
  ];

  return (
    <ScrollStory
      id="accueil"
      label="Accueil : Forno Vivo et nos pizzas"
      steps={steps}
      onStep={onStep}
      onReady={onReady}
      motClass="font-serif italic text-[clamp(7rem,34vw,28rem)] leading-none"
      poster={{ src: pizzaImage('margherita'), alt: 'Pizza margherita de Forno Vivo', width: 800, height: 800 }}
      scene={(api) => <HeroScene pizza={pizza} {...api} />}
    />
  );
}
