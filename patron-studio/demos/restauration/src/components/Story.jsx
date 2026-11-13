import { useLayoutEffect, useRef } from 'react';
import Counter from '@demos/shared/components/Counter.jsx';
import { histoire } from '../data/site';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';

/** Texte découpé en mots : chaque mot s'éclaire au fil du défilement. */
function ScrollText({ text }) {
  return (
    <p className="font-serif text-[1.45rem] leading-snug md:text-4xl md:leading-snug">
      {text.split(' ').map((w, i) => (
        <span key={i} data-word className="inline-block">
          {w}&nbsp;
        </span>
      ))}
    </p>
  );
}

export default function Story() {
  const scope = useRef(null);
  const reduced = useReducedMotion();
  useReveal(scope);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-para]').forEach((para) => {
        gsap.fromTo(
          para.querySelectorAll('[data-word]'),
          { opacity: 0.15 },
          { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: para, start: 'top 82%', end: 'bottom 55%', scrub: true } },
        );
      });
      gsap.to('[data-ember]', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, scope);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="histoire" ref={scope} className="section grain relative overflow-hidden bg-braise" aria-labelledby="histoire-titre">
      <div
        data-ember
        className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-tomate/20 blur-[100px]"
      />
      <div className="relative mx-auto max-w-4xl">
        <p className="eyebrow" data-reveal>
          Notre histoire
        </p>
        <h2 id="histoire-titre" className="mt-3 text-4xl font-semibold leading-tight md:text-6xl" data-reveal>
          {histoire.titre}
        </h2>
        <div className="mt-10 space-y-8 text-creme">
          {histoire.paragraphes.map((t, i) => (
            <div key={i} data-para>
              <ScrollText text={t} />
            </div>
          ))}
        </div>
        <dl className="mt-14 grid grid-cols-3 gap-3 border-t border-creme/10 pt-10">
          {histoire.chiffres.map((c) => (
            <div key={c.label} data-reveal className="text-center md:text-left">
              <dt className="sr-only">{c.label}</dt>
              <dd>
                <Counter
                  value={c.valeur}
                  suffix={c.suffixe}
                  className="block font-serif text-3xl font-semibold text-or-clair md:text-5xl"
                />
                <span className="mt-1 block text-xs leading-snug text-creme/60 md:text-sm">{c.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
