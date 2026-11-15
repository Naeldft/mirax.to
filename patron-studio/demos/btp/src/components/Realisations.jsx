import Photo from '@demos/shared/components/Photo.jsx';
import { useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { filtres, realisations } from '../data/site';
import SectionTitle from './SectionTitle';

export default function Realisations() {
  const scope = useRef(null);
  const grid = useRef(null);
  const [filtre, setFiltre] = useState('tout');
  const reduced = useReducedMotion();
  useReveal(scope);
  const liste = filtre === 'tout' ? realisations : realisations.filter((r) => r.type === filtre);

  useLayoutEffect(() => {
    if (reduced || !grid.current) return;
    const t = gsap.fromTo(
      grid.current.children,
      { y: 30, opacity: 0, rotate: -1 },
      { y: 0, opacity: 1, rotate: 0, stagger: 0.07, duration: 0.6, ease: 'power3.out' },
    );
    return () => t.kill();
  }, [filtre, reduced]);

  return (
    <section id="realisations" ref={scope} className="section quadrillage bg-beton" aria-labelledby="real-titre">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionTitle id="real-titre" etiquette="Réalisations" title="Ils habitent nos maisons." />
          <div role="group" aria-label="Filtrer les réalisations" className="flex flex-wrap gap-2" data-reveal>
            {filtres.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filtre === f.id}
                onClick={() => setFiltre(f.id)}
                className={`min-h-11 border-2 border-anthracite px-4 font-cond text-lg font-bold uppercase transition-colors ${filtre === f.id ? 'bg-anthracite text-papier' : 'bg-papier hover:bg-chantier'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {liste.length} réalisations affichées
        </p>
        <ul ref={grid} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((r) => (
            <li key={r.id}>
              <figure className="group border-2 border-anthracite bg-papier shadow-[6px_6px_0_#1d1d1b] transition-transform duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden border-b-2 border-anthracite">
                  <Photo
                    nom={r.photo}
                    alt={r.alt}
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
                    width="800"
                    height="600"
                    className="h-full w-full object-cover duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <p className="font-cond text-sm font-bold uppercase tracking-[0.2em] text-plan">{r.lieu}</p>
                  <p className="mt-1 font-display text-xl uppercase">{r.titre}</p>
                  <p className="mt-3 flex gap-2 font-cond text-base font-bold uppercase">
                    <span className="bg-chantier px-2">{r.surface}</span>
                    <span className="bg-beton-2 px-2">{r.duree}</span>
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
