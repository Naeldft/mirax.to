import { useLayoutEffect, useRef } from 'react';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { methode } from '../data/site';
import SectionTitle from './SectionTitle';

/** Les étapes sont reliées par un tuyau qui se remplit d'eau au fil du défilement. */
export default function Methode() {
  const scope = useRef(null);
  const fill = useRef(null);
  const reduced = useReducedMotion();
  useReveal(scope);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-steps]', start: 'top 70%', end: 'bottom 60%', scrub: true } },
      );
      gsap.utils.toArray('[data-step]').forEach((el) => {
        gsap.fromTo(
          el.querySelector('[data-node]'),
          { backgroundColor: 'rgb(15 34 53)', scale: 0.8 },
          {
            backgroundColor: 'rgb(95 212 232)',
            scale: 1,
            scrollTrigger: { trigger: el, start: 'top 62%', toggleActions: 'play none none reverse' },
            duration: 0.4,
          },
        );
      });
    }, scope);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="methode" ref={scope} className="section blueprint bg-nuit" aria-labelledby="methode-titre">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr]">
        <SectionTitle
          id="methode-titre"
          tag="Méthode"
          title="Pas de surprise. Jamais."
          intro="Notre façon de travailler tient en quatre étapes, et elle ne change pas, que ce soit pour un joint ou une salle de bain complète."
        />
        <ol data-steps className="relative space-y-10 pl-14">
          {/* le tuyau */}
          <span
            className="absolute bottom-2 left-[18px] top-2 w-3 rounded-full bg-gradient-to-r from-[#8a5a35] via-cuivre-clair to-[#8a5a35]"
            aria-hidden="true"
          />
          <span
            ref={fill}
            className="absolute bottom-2 left-[21px] top-2 w-1.5 origin-top rounded-full bg-eau shadow-[0_0_14px_rgb(95_212_232)]"
            style={{ transform: reduced ? 'none' : 'scaleY(0)' }}
            aria-hidden="true"
          />
          {methode.map((m, i) => (
            <li key={m.titre} data-step className="relative" data-reveal>
              <span
                data-node
                className="absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-eau bg-nuit-2 font-display font-bold text-nuit"
                aria-hidden="true"
              >
                <span className="text-ecume mix-blend-difference">{i + 1}</span>
              </span>
              <h3 className="text-2xl font-bold">{m.titre}</h3>
              <p className="mt-2 text-ecume/65">{m.texte}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
