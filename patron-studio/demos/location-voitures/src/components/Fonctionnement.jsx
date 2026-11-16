import { useLayoutEffect, useRef } from 'react';
import Counter from '@demos/shared/components/Counter.jsx';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { chiffres, etapes } from '../data/site';
import SectionTitle from './SectionTitle';

export default function Fonctionnement() {
  const scope = useRef(null);
  const road = useRef(null);
  const reduced = useReducedMotion();
  useReveal(scope);

  // la route se trace au fil du défilement
  useLayoutEffect(() => {
    if (reduced || !road.current) return;
    const len = road.current.getTotalLength();
    gsap.set(road.current, { strokeDasharray: len, strokeDashoffset: len });
    const t = gsap.to(road.current, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: { trigger: scope.current, start: 'top 70%', end: 'center 40%', scrub: true },
    });
    return () => t.kill();
  }, [reduced]);

  return (
    <section id="fonctionnement" ref={scope} className="section vitesse relative overflow-hidden bg-laque" aria-labelledby="fonct-titre">
      <svg
        className="pointer-events-none absolute inset-x-0 top-40 h-[60%] w-full opacity-60"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={road}
          d="M-20 320 C 250 320, 300 80, 600 120 S 950 340, 1220 90"
          fill="none"
          stroke="#e10600"
          strokeWidth="3"
          strokeDasharray="1 0"
        />
      </svg>
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle id="fonct-titre" surtitre="Comment ça marche" title="Trois étapes. Zéro paperasse." />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {etapes.map((e, i) => (
            <li key={e.titre} data-reveal className="border border-ivoire/10 bg-carbone/80 p-6 backdrop-blur">
              <span className="font-display text-5xl font-bold text-course">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-display text-lg font-bold uppercase">{e.titre}</h3>
              <p className="mt-2 text-ivoire/65">{e.texte}</p>
            </li>
          ))}
        </ol>
        <dl className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          {chiffres.map((c) => (
            <div key={c.label} data-reveal className="border-l-2 border-course pl-4">
              <dt className="sr-only">{c.label}</dt>
              <dd>
                <Counter
                  value={c.valeur}
                  decimals={c.decimals ?? 0}
                  suffix={c.suffixe}
                  className="block font-display text-3xl font-bold md:text-4xl lg:text-5xl"
                />
                <span className="mt-1 block text-sm uppercase tracking-wider text-ivoire/55">{c.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
