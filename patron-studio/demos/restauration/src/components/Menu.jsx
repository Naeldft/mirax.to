import { useLayoutEffect, useRef, useState } from 'react';
import { categories, formatPrix, pizzaImage, pizzas } from '../data/pizzas';
import { carte } from '../data/site';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { Chili, Leaf } from './Icons';
import SectionTitle from './SectionTitle';

function PizzaCard({ p }) {
  const veg = p.categories.includes('vegetarienne');
  const hot = p.categories.includes('epicee');
  return (
    <article
      data-card
      className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-braise transition-[transform,border-color] duration-500 hover:-translate-y-1 ${
        p.signature ? 'border-or/60 shadow-[0_20px_60px_-30px_rgb(201_162_74/0.6)]' : 'border-creme/10 hover:border-creme/25'
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(circle_at_50%_60%,rgb(216_67_47/0.25),transparent_65%)]">
        <img
          src={pizzaImage(p.id)}
          alt={`Pizza ${p.nom}`}
          width="800"
          height="800"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 m-auto h-[115%] w-[115%] max-w-none -translate-x-[6.5%] -translate-y-[2%] object-contain transition-transform duration-700 ease-out group-hover:rotate-12 group-hover:scale-105"
        />
        {p.signature && (
          <span className="absolute left-4 top-4 rounded-full bg-or px-3 py-1 text-xs font-bold uppercase tracking-wider text-charbon">
            Signature du chef
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-2xl font-semibold">{p.nom}</h3>
          <p
            className="shrink-0 rounded-full bg-tomate/15 px-3 py-1 font-semibold text-tomate-vif"
            aria-label={`Prix : ${formatPrix(p.prix)}`}
          >
            {formatPrix(p.prix)}
          </p>
        </div>
        <p className="mt-1 font-serif italic text-creme/75">{p.description}</p>
        <p className="mt-3 text-sm leading-relaxed text-creme/60">{p.ingredients.join(', ')}</p>
        {(veg || hot) && (
          <ul className="mt-auto flex gap-2 pt-4 text-xs font-semibold">
            {veg && (
              <li className="flex items-center gap-1 rounded-full bg-basilic/15 px-2.5 py-1 text-basilic-clair">
                <Leaf /> Végétarienne
              </li>
            )}
            {hot && (
              <li className="flex items-center gap-1 rounded-full bg-tomate/15 px-2.5 py-1 text-tomate-vif">
                <Chili /> Épicée
              </li>
            )}
          </ul>
        )}
      </div>
    </article>
  );
}

function CarteBloc({ titre, items }) {
  return (
    <div data-reveal>
      <h3 className="border-b border-or/40 pb-3 text-2xl font-semibold text-or-clair">{titre}</h3>
      <ul className="mt-4 space-y-4">
        {items.map((it) => (
          <li key={it.nom}>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold">{it.nom}</span>
              <span className="flex-1 translate-y-[-3px] border-b border-dotted border-creme/25" aria-hidden="true" />
              <span className="font-semibold text-creme/90">{formatPrix(it.prix)}</span>
            </div>
            <p className="mt-0.5 text-sm text-creme/55">{it.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Menu() {
  const [filtre, setFiltre] = useState('toutes');
  const scope = useRef(null);
  const grid = useRef(null);
  const reduced = useReducedMotion();
  useReveal(scope);

  const liste = filtre === 'toutes' ? pizzas : pizzas.filter((p) => p.categories.includes(filtre));

  // animation des cartes à chaque changement de filtre
  useLayoutEffect(() => {
    if (reduced || !grid.current) return;
    const cards = grid.current.querySelectorAll('[data-card]');
    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' },
    );
    return () => tween.kill();
  }, [filtre, reduced]);

  return (
    <section id="menu" ref={scope} className="section grain relative bg-charbon" aria-labelledby="menu-titre">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          id="menu-titre"
          eyebrow="La carte"
          title="Nos pizzas"
          intro="Pâte maturée 48 heures, farine italienne, tomates San Marzano et fior di latte livrés chaque semaine depuis la Campanie."
        />

        <div className="mt-10 flex justify-center" data-reveal>
          <div role="group" aria-label="Filtrer les pizzas" className="flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={filtre === c.id}
                onClick={() => setFiltre(c.id)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                  filtre === c.id
                    ? 'border-creme bg-creme text-charbon'
                    : 'border-creme/15 bg-braise text-creme/75 hover:border-creme/40 hover:text-creme'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {liste.length} pizzas affichées
        </p>

        <div ref={grid} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((p) => (
            <PizzaCard key={p.id} p={p} />
          ))}
        </div>

        <div className="mt-20 rounded-[2rem] border border-creme/10 bg-braise/70 p-6 md:p-10">
          <p className="eyebrow text-center" data-reveal>
            Pour commencer et finir en beauté
          </p>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            <CarteBloc titre="Entrées" items={carte.entrees} />
            <CarteBloc titre="Desserts" items={carte.desserts} />
            <CarteBloc titre="Boissons" items={carte.boissons} />
          </div>
        </div>
      </div>
    </section>
  );
}
