import { useRef } from 'react';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { avis } from '../data/site';
import { Etoile } from './Icons';
import SectionTitle from './SectionTitle';

export default function Reviews() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="avis" ref={scope} className="section blueprint bg-nuit" aria-labelledby="avis-titre">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="avis-titre" tag="Avis clients" title="Ils nous ont appelés. Ils nous rappellent." />
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {avis.map((a, i) => (
            <li key={a.nom} data-reveal className={i % 2 ? 'md:translate-y-10' : ''}>
              <figure className="h-full rounded-2xl border border-ecume/10 bg-nuit-2 p-6 md:p-8">
                <div className="flex gap-1 text-cuivre-clair" role="img" aria-label={`Note : ${a.note} sur 5`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Etoile key={n} plein={n <= a.note} />
                  ))}
                </div>
                <blockquote className="mt-4 text-lg leading-relaxed">« {a.texte} »</blockquote>
                <figcaption className="mt-5 text-sm text-ecume/60">
                  <strong className="text-ecume">{a.nom}</strong> · {a.ville}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
