import { useRef } from 'react';
import Faq from '@demos/shared/components/Faq.jsx';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { avis, entreprise, faq, horaires, zone } from '../data/site';
import { Etoile, Telephone } from './Icons';
import SectionTitle from './SectionTitle';

export function Zone() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="zone" ref={scope} className="section bg-papier" aria-labelledby="zone-titre">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle
            id="zone-titre"
            etiquette="Zone d’intervention & horaires"
            title="Métropole lilloise et Flandres."
            intro="Nos équipes interviennent dans un rayon de 40 km autour de Villeneuve-d’Ascq."
          />
          <ul className="mt-8 flex flex-wrap gap-2" data-reveal>
            {zone.map((z) => (
              <li key={z} className="border-2 border-anthracite px-3 py-1 font-cond text-lg font-bold uppercase">
                {z}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="self-end border-2 border-anthracite bg-beton p-6 shadow-[8px_8px_0_#f2b705] md:p-8">
          <p className="font-display text-xl uppercase">Bureau & dépôt</p>
          <p className="mt-2 text-graphite">{entreprise.adresse}</p>
          <dl className="mt-6 divide-y-2 divide-anthracite/10">
            {horaires.map(([j, h]) => (
              <div key={j} className="flex justify-between gap-4 py-3">
                <dt className="font-cond text-lg font-bold uppercase">{j}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
          <a href={`tel:${entreprise.telephoneLien}`} className="btn btn-noir mt-6 w-full">
            <Telephone /> {entreprise.telephone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Avis() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="avis" ref={scope} className="section quadrillage bg-beton" aria-labelledby="avis-titre">
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="avis-titre" etiquette="Avis clients" title="Parole de propriétaires." />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {avis.map((a, i) => (
            <li key={a.nom} data-reveal>
              <figure className={`h-full border-2 border-anthracite bg-papier p-6 ${i === 1 ? 'md:translate-y-8' : ''}`}>
                <div className="flex gap-1 text-chantier" role="img" aria-label={`Note : ${a.note} sur 5`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Etoile key={n} plein={n <= a.note} className="drop-shadow-[1px_1px_0_#1d1d1b]" />
                  ))}
                </div>
                <blockquote className="mt-4 text-lg leading-relaxed">« {a.texte} »</blockquote>
                <figcaption className="mt-5">
                  <p className="font-display uppercase">{a.nom}</p>
                  <p className="font-cond text-base font-bold uppercase tracking-wider text-plan">{a.projet}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FaqSection() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="faq" ref={scope} className="section bg-papier" aria-labelledby="faq-titre">
      <div className="mx-auto max-w-3xl">
        <SectionTitle id="faq-titre" etiquette="Questions fréquentes" title="Avant de signer." />
        <div className="mt-10 border-2 border-anthracite">
          <Faq
            items={faq}
            classes={{
              item: 'border-b-2 border-anthracite last:border-b-0',
              button:
                'flex w-full items-center justify-between gap-6 bg-papier px-5 py-5 text-left font-display text-base uppercase transition-colors hover:bg-chantier md:text-lg',
              icon: 'flex h-9 w-9 shrink-0 items-center justify-center border-2 border-anthracite bg-chantier text-2xl',
              answer: 'px-5 pb-6 pt-2 text-lg leading-relaxed text-graphite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
