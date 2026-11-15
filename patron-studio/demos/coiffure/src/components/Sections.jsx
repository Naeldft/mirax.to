import { useLayoutEffect, useRef, useState } from 'react';
import Photo from '@demos/shared/components/Photo.jsx';
import Counter from '@demos/shared/components/Counter.jsx';
import Faq from '@demos/shared/components/Faq.jsx';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { avis, chiffres, equipe, faq, horaires, looks, prestations, salon } from '../data/site';

function Titre({ numero, children, intro, id }) {
  return (
    <div className="max-w-2xl">
      <p className="numero text-lg" data-reveal>
        {numero}
      </p>
      <h2 id={id} className="mt-2 text-5xl leading-[1] md:text-7xl" data-reveal>
        {children}
      </h2>
      {intro && (
        <p className="mt-5 text-lg leading-relaxed text-taupe" data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}

/** Prestations & tarifs, par onglets. */
export function Prestations() {
  const scope = useRef(null);
  const list = useRef(null);
  const [cat, setCat] = useState(0);
  const reduced = useReducedMotion();
  useReveal(scope);
  useLayoutEffect(() => {
    if (reduced || !list.current) return;
    const t = gsap.fromTo(
      list.current.children,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out' },
    );
    return () => t.kill();
  }, [cat, reduced]);
  return (
    <section id="prestations" ref={scope} className="section bg-creme" aria-labelledby="prest-titre">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Titre
          numero="i."
          id="prest-titre"
          intro="Tarifs pour cheveux courts à mi-longs ; un supplément peut s’appliquer aux cheveux très longs, annoncé avant de commencer."
        >
          Prestations <em className="text-poudre-fonce">&amp;</em> tarifs
        </Titre>
        <div data-reveal>
          <div role="tablist" aria-label="Catégories de prestations" className="flex flex-wrap gap-2">
            {prestations.map((p, i) => (
              <button
                key={p.categorie}
                role="tab"
                type="button"
                aria-selected={cat === i}
                aria-controls="prest-panel"
                onClick={() => setCat(i)}
                className={`min-h-11 rounded-full px-5 text-sm transition-colors ${cat === i ? 'bg-encre text-creme' : 'bg-lin hover:bg-poudre/50'}`}
              >
                {p.categorie}
              </button>
            ))}
          </div>
          <ul id="prest-panel" role="tabpanel" ref={list} className="mt-8 divide-y divide-encre/10 border-y border-encre/10">
            {prestations[cat].items.map((it) => (
              <li key={it.id} className="group flex items-baseline justify-between gap-6 py-5">
                <span>
                  <span className="block font-serif text-2xl transition-transform duration-500 group-hover:translate-x-2">{it.nom}</span>
                  <span className="text-sm text-taupe">{it.duree} min</span>
                </span>
                <span className="whitespace-nowrap font-serif text-3xl italic text-poudre-fonce">{it.prix} €</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Portraits dessinés : remplaçables par de vraies photos. */
const CHEVEUX = ['#7a4b3a', '#2a2522', '#c98f5a'];
function Portrait({ teinte, i }) {
  const h = CHEVEUX[i % 3];
  return (
    <svg viewBox="0 0 300 380" className="h-full w-full" aria-hidden="true">
      <rect width="300" height="380" fill={['#efe3da', '#e6dad3', '#f1e6dc'][i % 3]} />
      <circle cx="232" cy="72" r="38" fill="#f7efe9" />
      {i !== 1 && (
        <path
          d={i === 0 ? 'M92 150c0-62 116-62 116 0v120c-20 14-96 14-116 0Z' : 'M100 150c0-56 100-56 100 0v40c-30 10-70 10-100 0Z'}
          fill={h}
        />
      )}
      <path d="M38 380c6-74 48-108 112-108s106 34 112 108Z" fill={teinte} />
      <rect x="134" y="226" width="32" height="50" rx="12" fill="#e2bfa9" />
      <ellipse cx="150" cy="182" rx="44" ry="54" fill="#e9c9b5" />
      <path
        d={
          i === 1
            ? 'M106 168c2-48 86-52 88 0-14-18-72-20-88 0Z'
            : i === 0
              ? 'M104 172c-4-58 96-66 94-4-22-24-54-30-94 4Z'
              : 'M106 160c6-44 84-46 90 2-30-14-60-14-90-2Z'
        }
        fill={h}
      />
      {i === 1 && <path d="M120 214c10 22 50 22 60 0 0 22-12 34-30 34s-30-12-30-34Z" fill={h} opacity="0.85" />}
    </svg>
  );
}

export function Equipe() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="equipe" ref={scope} className="section bg-lin" aria-labelledby="equipe-titre">
      <div className="mx-auto max-w-6xl">
        <Titre numero="ii." id="equipe-titre">
          L’équipe
        </Titre>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {equipe.map((p, i) => (
            <li key={p.id} data-reveal className={i === 1 ? 'md:mt-16' : ''}>
              <figure className="group">
                <div className="aspect-[3/4] overflow-hidden rounded-t-[999px]">
                  <div className="h-full transition-transform duration-[1.2s] ease-out group-hover:scale-105">
                    <Portrait teinte={p.teinte} i={i} />
                  </div>
                </div>
                <figcaption className="mt-5">
                  <p className="font-serif text-3xl">
                    {p.nom} <span className="text-base italic text-poudre-fonce">— {p.role}</span>
                  </p>
                  <p className="mt-2 text-taupe">{p.bio}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <dl className="mt-20 grid gap-8 border-t border-encre/15 pt-10 sm:grid-cols-3">
          {chiffres.map((c) => (
            <div key={c.label} data-reveal>
              <dt className="sr-only">{c.label}</dt>
              <dd>
                <Counter value={c.valeur} suffix={c.suffixe} className="block font-serif text-5xl italic md:text-6xl" />
                <span className="text-taupe">{c.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Inspirations : défilement horizontal de "looks" dessinés, avec parallaxe. */
export function Looks() {
  const scope = useRef(null);
  const track = useRef(null);
  const reduced = useReducedMotion();
  useReveal(scope);
  useLayoutEffect(() => {
    if (reduced) return;
    const t = gsap.to(track.current, {
      xPercent: -18,
      ease: 'none',
      scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    return () => t.kill();
  }, [reduced]);
  return (
    <section id="looks" ref={scope} className="section overflow-hidden bg-encre text-creme" aria-labelledby="looks-titre">
      <div className="mx-auto max-w-6xl">
        <p className="numero text-lg" data-reveal>
          iii.
        </p>
        <h2 id="looks-titre" className="mt-2 text-5xl md:text-7xl" data-reveal>
          Inspirations <em className="text-poudre">de saison</em>
        </h2>
      </div>
      <ul ref={track} className="mt-12 flex w-max gap-5 pl-5 md:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
        {looks.map((l) => (
          <li key={l.titre} className="w-64 shrink-0 md:w-80" data-reveal>
            <figure className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-lin">
                <Photo
                  nom={l.photo}
                  alt={l.alt}
                  sizes="(min-width: 768px) 20rem, 16rem"
                  width="640"
                  height="800"
                  className="h-full w-full object-cover duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-3 flex justify-between">
                <span className="font-serif text-xl">{l.titre}</span>
                <span className="text-sm text-creme/60">{l.note}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Avis() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section ref={scope} className="section bg-creme" aria-labelledby="avis-titre">
      <div className="mx-auto max-w-6xl">
        <Titre numero="iv." id="avis-titre">
          Elles <em className="text-poudre-fonce">&amp;</em> ils en parlent
        </Titre>
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {avis.map((a) => (
            <li key={a.nom} data-reveal>
              <blockquote className="font-serif text-2xl italic leading-snug">« {a.texte} »</blockquote>
              <p className="mt-4 text-sm uppercase tracking-[0.25em] text-taupe">
                {a.nom} · <span aria-label={`Note : ${a.note} sur 5`}>{'★'.repeat(a.note)}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Infos() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="infos" ref={scope} className="section bg-lin" aria-labelledby="infos-titre">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <Titre numero="v." id="infos-titre">
            Infos pratiques
          </Titre>
          <address className="mt-8 font-serif text-2xl not-italic" data-reveal>
            {salon.adresse}
          </address>
          <dl className="mt-6 divide-y divide-encre/10" data-reveal>
            {horaires.map(([j, h]) => (
              <div key={j} className="flex justify-between py-3">
                <dt className="text-taupe">{j}</dt>
                <dd className={h === 'Fermé' ? 'text-taupe/60' : ''}>{h}</dd>
              </div>
            ))}
          </dl>
          <a href={`tel:${salon.telephoneLien}`} className="btn btn-encre mt-8" data-reveal>
            Appeler le salon · {salon.telephone}
          </a>
        </div>
        <div>
          <h3 className="font-serif text-3xl" data-reveal>
            Questions fréquentes
          </h3>
          <div className="mt-6 border-t border-encre/15">
            <Faq
              items={faq}
              classes={{
                item: 'border-b border-encre/15',
                button:
                  'flex w-full items-center justify-between gap-6 py-5 text-left font-serif text-xl transition-colors hover:text-poudre-fonce',
                icon: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-encre/30 text-xl',
                answer: 'pb-5 leading-relaxed text-taupe',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
