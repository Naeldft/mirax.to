import { useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { filtres, realisations } from '../data/site';
import SectionTitle from './SectionTitle';

/** Illustration de maison (vue de face) générée à partir des données : remplaçable par une photo. */
function Maison({ d }) {
  const e = d.etages;
  const hNiveau = 70;
  const base = 230;
  const w = 220;
  const x0 = 90;
  const top = base - e * hNiveau;
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-hidden="true">
      <rect width="400" height="300" fill="#dfe6f2" />
      <circle cx="330" cy="60" r="26" fill="#f2b705" opacity="0.8" />
      <rect y={base} width="400" height="70" fill="#9bb58a" />
      {/* niveaux */}
      {Array.from({ length: e }, (_, i) => (
        <rect
          key={i}
          x={x0}
          y={base - (i + 1) * hNiveau}
          width={w}
          height={hNiveau}
          fill={i === e - 1 && e > 1 ? d.bardage : d.couleur}
          stroke="#1d1d1b"
          strokeWidth="3"
        />
      ))}
      {d.extension && (
        <rect x={x0 + w} y={base - hNiveau * 0.8} width="70" height={hNiveau * 0.8} fill={d.bardage} stroke="#1d1d1b" strokeWidth="3" />
      )}
      {d.extension && (
        <rect
          x={x0 + w + 10}
          y={base - hNiveau * 0.65}
          width="50"
          height={hNiveau * 0.55}
          fill="#8fb4c8"
          stroke="#1d1d1b"
          strokeWidth="2"
        />
      )}
      {d.toit === 'pente' ? (
        <polygon
          points={`${x0 - 14},${top} ${x0 + w / 2},${top - 60} ${x0 + w + 14},${top}`}
          fill="#34383d"
          stroke="#1d1d1b"
          strokeWidth="3"
        />
      ) : (
        <rect x={x0 - 8} y={top - 10} width={w + 16} height="12" fill="#34383d" stroke="#1d1d1b" strokeWidth="3" />
      )}
      {/* ouvertures */}
      {Array.from({ length: e }, (_, i) => {
        const y = base - (i + 1) * hNiveau + 18;
        return (
          <g key={i}>
            {i === 0 ? (
              <rect x={x0 + 24} y={base - 52} width="32" height="52" fill="#1d1d1b" />
            ) : (
              <rect x={x0 + 24} y={y} width="44" height="34" fill="#8fb4c8" stroke="#1d1d1b" strokeWidth="2" />
            )}
            <rect x={x0 + w - 110} y={y} width={i === 0 ? 86 : 44} height="34" fill="#8fb4c8" stroke="#1d1d1b" strokeWidth="2" />
            {i > 0 && <rect x={x0 + w - 56} y={y} width="36" height="34" fill="#8fb4c8" stroke="#1d1d1b" strokeWidth="2" />}
          </g>
        );
      })}
      {d.surelevation && (
        <text x={x0 + w + 12} y={base - hNiveau - 30} fontFamily="Barlow Condensed" fontWeight="700" fontSize="18" fill="#2b59c3">
          +1 niveau
        </text>
      )}
    </svg>
  );
}

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
                  <div className="h-full transition-transform duration-700 group-hover:scale-105">
                    <Maison d={r.dessin} />
                  </div>
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
