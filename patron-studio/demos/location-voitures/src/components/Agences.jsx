import { useRef } from 'react';
import Faq from '@demos/shared/components/Faq.jsx';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { agences, avis, entreprise, faq } from '../data/site';
import { Etoile, Telephone } from './Icons';
import SectionTitle from './SectionTitle';

export function Agences() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="agences" ref={scope} className="section bg-carbone" aria-labelledby="agences-titre">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          id="agences-titre"
          surtitre="Agences & horaires"
          title="Deux agences, une boîte à clés 7 j / 7."
          intro="Livraison et reprise du véhicule à domicile possibles dans toute la métropole lilloise (29 €)."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {agences.map((a) => (
            <article key={a.id} data-reveal className="border border-ivoire/10 bg-laque p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold uppercase">{a.nom}</h3>
              <p className="mt-2 text-ivoire/65">{a.adresse}</p>
              <dl className="mt-6 divide-y divide-ivoire/10">
                {a.horaires.map(([j, h]) => (
                  <div key={j} className="flex justify-between gap-4 py-2.5 text-sm">
                    <dt className="text-ivoire/60">{j}</dt>
                    <dd className="text-right font-semibold">{h}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <a href={`tel:${entreprise.telephoneLien}`} className="btn btn-ivoire mt-8" data-reveal>
          <Telephone /> {entreprise.telephone}
        </a>
      </div>
    </section>
  );
}

export function Avis() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="avis" ref={scope} className="section overflow-hidden bg-laque" aria-labelledby="avis-titre">
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="avis-titre" surtitre="Avis clients" title="Ils ont pris la route." />
      </div>
      <div className="group mt-12 overflow-hidden" data-reveal>
        <ul className="flex w-max gap-5 px-5 [animation:defile_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap">
          {[...avis, ...avis].map((a, i) => (
            <li key={i} aria-hidden={i >= avis.length} className="w-[20rem] shrink-0 border border-ivoire/10 bg-carbone p-6 md:w-[26rem]">
              <div className="flex gap-1 text-course-vif" role="img" aria-label={`Note : ${a.note} sur 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Etoile key={n} plein={n <= a.note} />
                ))}
              </div>
              <blockquote className="mt-4 leading-relaxed text-ivoire/85">« {a.texte} »</blockquote>
              <p className="mt-4 font-display text-xs font-bold uppercase tracking-wider">{a.nom}</p>
            </li>
          ))}
        </ul>
      </div>
      <style>{'@keyframes defile { to { transform: translateX(-50%); } }'}</style>
    </section>
  );
}

export function FaqSection() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="faq" ref={scope} className="section bg-carbone" aria-labelledby="faq-titre">
      <div className="mx-auto max-w-3xl">
        <SectionTitle id="faq-titre" surtitre="Questions fréquentes" title="Avant de partir." />
        <div className="mt-10 border-t border-ivoire/10">
          <Faq
            items={faq}
            classes={{
              item: 'border-b border-ivoire/10',
              button:
                'flex w-full items-center justify-between gap-6 py-5 text-left font-display text-base font-bold uppercase transition-colors hover:text-course-vif md:text-lg',
              icon: 'flex h-8 w-8 shrink-0 items-center justify-center bg-course text-xl text-ivoire',
              answer: 'pb-6 leading-relaxed text-ivoire/65',
            }}
          />
        </div>
      </div>
    </section>
  );
}
