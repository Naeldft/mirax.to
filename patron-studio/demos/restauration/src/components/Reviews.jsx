import { useCallback, useEffect, useRef, useState } from 'react';
import { avis } from '../data/site';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useReveal } from '../hooks/useReveal';
import { Arrow, Star } from './Icons';
import SectionTitle from './SectionTitle';

export default function Reviews() {
  const scope = useRef(null);
  const track = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  useReveal(scope);

  const goTo = useCallback(
    (i) => {
      const el = track.current;
      if (!el) return;
      const n = (i + avis.length) % avis.length;
      const slide = el.children[n];
      el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
    },
    [reduced],
  );

  // met à jour l'avis actif quand on fait glisser au doigt
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.children[0]?.getBoundingClientRect().width ?? 1;
      setIndex(Math.round(el.scrollLeft / (w + 16)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // défilement automatique (désactivé si "réduire les animations", ou au survol / focus)
  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => goTo(index + 1), 6000);
    return () => clearInterval(id);
  }, [index, paused, reduced, goTo]);

  return (
    <section id="avis" ref={scope} className="section grain relative overflow-hidden bg-braise" aria-labelledby="avis-titre">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="avis-titre" eyebrow="Avis clients" title="Ils en parlent mieux que nous" />
        <div
          className="mt-12"
          role="region"
          aria-roledescription="carrousel"
          aria-label="Avis clients"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          data-reveal
        >
          <ul ref={track} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
            {avis.map((a, i) => (
              <li
                key={a.nom}
                aria-roledescription="avis"
                aria-label={`${i + 1} sur ${avis.length}`}
                className="w-[86%] shrink-0 snap-center sm:w-[70%] md:w-[calc((100%-2rem)/3)]"
              >
                <blockquote className="flex h-full flex-col rounded-3xl border border-creme/10 bg-charbon/60 p-6 md:p-8">
                  <div className="flex gap-1 text-or-clair" aria-label={`Note : ${a.note} sur 5`} role="img">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} filled={s <= a.note} />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 font-serif text-lg italic leading-relaxed text-creme/90">« {a.texte} »</p>
                  <footer className="mt-6 flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-tomate/20 font-serif font-semibold text-tomate-vif"
                      aria-hidden="true"
                    >
                      {a.nom[0]}
                    </span>
                    <span>
                      <cite className="block font-semibold not-italic">{a.nom}</cite>
                      <span className="text-sm text-creme/50">{a.date}</span>
                    </span>
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {avis.map((a, i) => (
                <button
                  key={a.nom}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Afficher l’avis ${i + 1}`}
                  aria-current={index === i}
                  className="flex h-11 w-8 items-center justify-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${index === i ? 'w-7 bg-or-clair' : 'w-3 bg-creme/25'}`}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Avis précédent"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-creme/20 text-xl transition-colors hover:border-or-clair hover:text-or-clair"
              >
                <Arrow dir="left" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Avis suivant"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-creme/20 text-xl transition-colors hover:border-or-clair hover:text-or-clair"
              >
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
