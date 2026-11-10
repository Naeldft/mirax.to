import { useLayoutEffect, useRef } from 'react';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { garanties, methode } from '../data/site';
import { Bouclier } from './Icons';
import SectionTitle from './SectionTitle';

export default function Methode() {
  const scope = useRef(null);
  const reduced = useReducedMotion();
  useReveal(scope);

  // jauges qui se remplissent au défilement, étape par étape
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-jauge]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 45%', scrub: true } },
        );
      });
      gsap.to('[data-bandeau]', {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: { trigger: '[data-bandeau]', start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, scope);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="methode" ref={scope} className="overflow-hidden bg-anthracite text-papier" aria-labelledby="methode-titre">
      <div className="section mx-auto max-w-7xl">
        <SectionTitle
          id="methode-titre"
          etiquette="Méthode"
          title="Un chantier, un responsable."
          intro="Un conducteur de travaux unique vous suit de la première visite à la remise des clés."
          light
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-4">
          {methode.map((m, i) => (
            <li key={m.titre} data-reveal className="border-t-4 border-chantier pt-5">
              <p className="flex items-baseline justify-between font-cond font-bold uppercase">
                <span className="text-4xl text-chantier">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm tracking-wider text-papier/60">{m.duree}</span>
              </p>
              <h3 className="mt-3 text-xl">{m.titre}</h3>
              <p className="mt-2 text-papier/70">{m.texte}</p>
              <div className="mt-5 h-1.5 bg-papier/15" aria-hidden="true">
                <div data-jauge className="h-full origin-left bg-chantier" />
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="hachures overflow-hidden py-1" aria-label="Nos garanties">
        <ul data-bandeau className="flex w-max gap-4 bg-anthracite py-5 pl-5">
          {[...garanties, ...garanties, ...garanties].map((g, i) => (
            <li
              key={i}
              aria-hidden={i >= garanties.length}
              className="flex items-center gap-3 whitespace-nowrap font-display text-2xl uppercase md:text-4xl"
            >
              <Bouclier className="text-chantier" /> {g}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
