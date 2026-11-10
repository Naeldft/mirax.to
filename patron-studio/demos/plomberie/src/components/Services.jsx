import { useRef } from 'react';
import Counter from '@demos/shared/components/Counter.jsx';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { formatEuros } from '@demos/shared/lib/validation.js';
import { chiffres, services } from '../data/site';
import { icones } from './Icons';
import SectionTitle from './SectionTitle';

const bandeau = ['Fuite d’eau', 'Débouchage', 'Chauffe-eau', 'Robinetterie', 'Chaudière', 'Salle de bain', 'Dégât des eaux', 'WC bouché'];

export default function Services() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <>
      {/* bandeau défilant */}
      <div className="overflow-hidden border-y border-ecume/10 bg-cuivre py-4 text-nuit" aria-hidden="true">
        <div className="defile flex w-max gap-10 whitespace-nowrap font-display text-2xl font-bold">
          {[...bandeau, ...bandeau].map((b, i) => (
            <span key={i} className="flex items-center gap-10">
              {b} <span className="text-nuit/40">●</span>
            </span>
          ))}
        </div>
      </div>

      <section id="services" ref={scope} className="section blueprint bg-nuit" aria-labelledby="services-titre">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            id="services-titre"
            tag="Services & tarifs"
            title="Un prix annoncé, un prix tenu."
            intro="Tarifs indicatifs TTC, déplacement inclus dans la métropole lilloise. Le prix exact vous est donné avant toute intervention."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icone = icones[s.icone];
              return (
                <li key={s.id} data-reveal>
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-ecume/10 bg-nuit-2 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-eau/40">
                    {/* reflet d'eau au survol */}
                    <span className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-eau/10 blur-2xl transition-transform duration-700 group-hover:scale-[2.2]" />
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-eau/10 text-2xl text-eau transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                      <Icone />
                    </span>
                    <h3 className="mt-5 text-xl font-bold">{s.titre}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ecume/65">{s.texte}</p>
                    <p className="mt-5 flex items-baseline gap-2">
                      <span className="text-sm text-ecume/55">{s.prefixe}</span>
                      {s.prix != null && <span className="font-display text-3xl font-bold text-cuivre-clair">{formatEuros(s.prix)}</span>}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>

          <dl className="mt-20 grid grid-cols-2 gap-6 border-t border-ecume/10 pt-12 md:grid-cols-4">
            {chiffres.map((c) => (
              <div key={c.label} data-reveal>
                <dt className="sr-only">{c.label}</dt>
                <dd>
                  <Counter value={c.valeur} suffix={c.suffixe} className="block font-display text-4xl font-bold text-eau md:text-6xl" />
                  <span className="mt-1 block text-sm text-ecume/60">{c.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
