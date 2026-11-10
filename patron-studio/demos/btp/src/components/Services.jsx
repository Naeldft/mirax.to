import { useRef } from 'react';
import Counter from '@demos/shared/components/Counter.jsx';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { chiffres, services } from '../data/site';
import SectionTitle from './SectionTitle';

const prix = (s) => (s.tarif == null ? 'Sur devis' : `dès ${s.tarif.toLocaleString('fr-FR')} ${s.unite}`);

export default function Services() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <>
      <div className="hachures h-4" aria-hidden="true" />
      <section id="services" ref={scope} className="section bg-papier" aria-labelledby="services-titre">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            id="services-titre"
            etiquette="Services & tarifs indicatifs"
            title="Du terrassement aux finitions."
            intro="Prix moyens constatés sur nos chantiers récents, hors terrain. Chaque projet fait l’objet d’un devis détaillé et gratuit."
          />
          <ul className="mt-12 grid gap-[2px] border-2 border-anthracite bg-anthracite sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.id} data-reveal className="group relative bg-papier p-6 transition-colors duration-300 hover:bg-chantier">
                <span className="font-cond text-sm font-bold text-plan group-hover:text-anthracite">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-xl md:text-2xl">{s.titre}</h3>
                <p className="mt-3 text-graphite group-hover:text-anthracite">{s.texte}</p>
                <p className="mt-6 inline-block border-2 border-anthracite bg-papier px-3 py-1 font-cond text-lg font-bold uppercase transition-transform duration-300 group-hover:-rotate-2">
                  {prix(s)}
                </p>
              </li>
            ))}
          </ul>
          <dl className="mt-16 grid grid-cols-2 gap-px border-2 border-anthracite bg-anthracite md:grid-cols-4">
            {chiffres.map((c) => (
              <div key={c.label} data-reveal className="bg-chantier p-5 md:p-7">
                <dt className="sr-only">{c.label}</dt>
                <dd>
                  <Counter value={c.valeur} suffix={c.suffixe} className="block font-display text-4xl md:text-6xl" />
                  <span className="mt-1 block font-cond text-base font-bold uppercase leading-tight tracking-wide">{c.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
