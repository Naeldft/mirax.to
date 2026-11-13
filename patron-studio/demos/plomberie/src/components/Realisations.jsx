import { useRef, useState } from 'react';
import Photo from '@demos/shared/components/Photo.jsx';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { realisations } from '../data/site';
import SectionTitle from './SectionTitle';

/**
 * Chantier : photo « après » ; si une photo « avant » est fournie (r.avant),
 * un curseur permet de comparer (souris, doigt ou clavier).
 */
function Compare({ r }) {
  const [pos, setPos] = useState(50);
  const sizes = '(min-width: 768px) 33vw, 100vw';
  return (
    <figure data-reveal className="overflow-hidden rounded-2xl border border-ecume/10 bg-nuit-2">
      <div className={`relative aspect-[4/3] select-none overflow-hidden bg-nuit ${r.avant ? 'cursor-ew-resize touch-pan-y' : ''}`}>
        <Photo nom={r.apres} alt={r.alt} sizes={sizes} width="800" height="600" className="absolute inset-0 h-full w-full object-cover" />
        {r.avant ? (
          <>
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Photo
                nom={r.avant}
                alt={`Avant travaux : ${r.titre}`}
                sizes={sizes}
                width="800"
                height="600"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="absolute left-3 top-3 rounded-full bg-nuit/80 px-3 py-1 text-xs font-semibold">Avant</span>
            <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
              <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-ecume" />
              <div className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ecume font-bold text-nuit shadow-lg">
                ⇆
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(pos)}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label={`Comparer avant et après : ${r.titre}`}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </>
        ) : null}
        <span className="absolute right-3 top-3 rounded-full bg-eau px-3 py-1 text-xs font-semibold text-nuit">Après</span>
      </div>
      <figcaption className="p-5">
        <p className="flex items-center justify-between gap-3">
          <span className="font-display text-lg font-bold">{r.titre}</span>
          <span className="shrink-0 rounded-full border border-ecume/15 px-2.5 py-0.5 text-xs text-ecume/70">{r.duree}</span>
        </p>
        <p className="mt-2 text-base text-ecume/70">{r.texte}</p>
      </figcaption>
    </figure>
  );
}

export default function Realisations() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="realisations" ref={scope} className="section bg-nuit-2" aria-labelledby="real-titre">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          id="real-titre"
          tag="Réalisations"
          title={realisations.some((r) => r.avant) ? 'Avant, après. Faites glisser.' : 'Nos derniers chantiers.'}
          intro="Quelques chantiers récents dans la métropole lilloise."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {realisations.map((r) => (
            <Compare key={r.id} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
