import { Suspense, lazy, useLayoutEffect, useRef, useState } from 'react';
import Counter from '@demos/shared/components/Counter.jsx';
import Faq from '@demos/shared/components/Faq.jsx';
import { useHero3D } from '@demos/shared/hooks/useHero3D.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { avis, chiffres, equipe, faq, horaires, looks, prestations, salon } from '../data/site';

const ScissorsScene = lazy(() => import('../three/ScissorsScene'));

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

/** Accueil : ciseaux et mèches en 3D, titre éditorial. */
export function Hero({ onReady }) {
  const section = useRef(null);
  const { progress, reduced, inView, tier, load3d } = useHero3D(section, { onReady });
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-mot]', { yPercent: 120, rotate: 4, duration: 1.2, stagger: 0.08, ease: 'power4.out', delay: 0.3 });
      gsap.from('[data-in]', { opacity: 0, y: 20, duration: 1, stagger: 0.1, delay: 0.8, ease: 'power3.out' });
      gsap.to('[data-hero-txt]', {
        yPercent: -25,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: section.current, start: 'top top', end: '60% top', scrub: true },
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section id="accueil" ref={section} className={`relative ${reduced ? '' : 'h-[190svh]'}`} aria-label="Accueil">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_60%_60%_at_70%_40%,#f3d9d2,transparent_70%)]">
        {load3d && (
          <Suspense fallback={null}>
            <ScissorsScene progress={progress} reduced={reduced} tier={tier} active={inView} onReady={onReady} />
          </Suspense>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-creme via-creme/85 to-transparent md:hidden" />
        <div
          data-hero-txt
          className="pointer-events-none relative mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-10 md:justify-center md:px-8 md:pb-0"
        >
          <p data-in className="text-sm uppercase tracking-[0.3em] text-taupe">
            {salon.accroche}
          </p>
          <h1 className="mt-4 text-[clamp(3.2rem,12vw,8rem)] leading-[0.9]">
            {['Une coupe', 'qui vous', 'ressemble.'].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-2">
                <span data-mot className={`block ${i === 2 ? 'italic text-poudre-fonce' : ''}`}>
                  {l}
                </span>
              </span>
            ))}
          </h1>
          <p data-in className="mt-5 max-w-sm text-taupe md:text-lg">
            {salon.intro}
          </p>
          <div data-in className="pointer-events-auto mt-7 flex gap-3">
            <a href="#reserver" className="btn btn-encre">
              Réserver
            </a>
            <a href="#prestations" className="btn btn-ligne">
              Les tarifs
            </a>
          </div>
        </div>
      </div>
    </section>
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
      {i !== 1 && <path d={i === 0 ? 'M92 150c0-62 116-62 116 0v120c-20 14-96 14-116 0Z' : 'M100 150c0-56 100-56 100 0v40c-30 10-70 10-100 0Z'} fill={h} />}
      <path d="M38 380c6-74 48-108 112-108s106 34 112 108Z" fill={teinte} />
      <rect x="134" y="226" width="32" height="50" rx="12" fill="#e2bfa9" />
      <ellipse cx="150" cy="182" rx="44" ry="54" fill="#e9c9b5" />
      <path d={i === 1 ? 'M106 168c2-48 86-52 88 0-14-18-72-20-88 0Z' : i === 0 ? 'M104 172c-4-58 96-66 94-4-22-24-54-30-94 4Z' : 'M106 160c6-44 84-46 90 2-30-14-60-14-90-2Z'} fill={h} />
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
        {looks.map((l, i) => (
          <li key={l.titre} className="w-64 shrink-0 md:w-80" data-reveal>
            <figure className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl" style={{ background: `linear-gradient(160deg, ${l.a}, ${l.b})` }}>
                <svg
                  viewBox="0 0 200 250"
                  className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                  aria-hidden="true"
                >
                  <path
                    d={
                      [
                        'M60 250c0-90 10-160 40-180s40 90 40 180',
                        'M40 250c10-110 30-170 60-180 30 10 50 70 60 180',
                        'M70 250c0-70 10-140 30-150s30 80 30 150',
                        'M50 250c5-100 20-150 50-160 30 10 45 60 50 160',
                        'M65 250c0-60 15-130 35-140 20 10 35 80 35 140',
                      ][i]
                    }
                    fill="#1c1a1a"
                    opacity="0.25"
                  />
                  <circle cx="100" cy="95" r="34" fill="#f1d9c8" opacity="0.9" />
                  <path
                    d={
                      [
                        'M62 100c0-50 76-50 76 0 0 30-8 60-8 60l-10-50-50 0-8 50s0-30 0-60Z',
                        'M60 95c0-48 80-48 80 0 4 40 10 70 10 70l-20-60-60 0-20 60s6-30 10-70Z',
                        'M70 80c10-22 50-22 60 0l-2 14H72Z',
                        'M64 92c0-46 72-46 72 0l-6 8c10 0 14 10 6 16-8 8-14-4-10-10l-50-14Z',
                        'M68 84c6-26 58-30 64 4l-30-12-34 8Z',
                      ][i]
                    }
                    fill={l.b}
                  />
                </svg>
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
