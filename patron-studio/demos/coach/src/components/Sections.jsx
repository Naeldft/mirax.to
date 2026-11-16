import { Suspense, useCallback, useLayoutEffect, useRef, useState } from 'react';
import Counter from '@demos/shared/components/Counter.jsx';
import Faq from '@demos/shared/components/Faq.jsx';
import { useForm } from '@demos/shared/hooks/useForm.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { emailOk, telOk } from '@demos/shared/lib/validation.js';
import { avis, chiffres, coach, faq, jours, objectifs, piliers, planning, programmes, typesSeance } from '../data/site';


function Titre({ tag, children, intro, id }) {
  return (
    <div className="max-w-3xl">
      <p className="tag" data-reveal>
        {tag}
      </p>
      <h2 id={id} className="mt-3 text-5xl leading-[0.95] md:text-8xl" data-reveal>
        {children}
      </h2>
      {intro && (
        <p className="mt-5 text-lg text-gris" data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}

export function Programmes() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="programmes" ref={scope} className="section bg-noir" aria-labelledby="prog-titre">
      <div className="mx-auto max-w-7xl">
        <Titre tag="Programmes & tarifs" id="prog-titre">
          Choisissez <span className="text-acide">votre rythme</span>
        </Titre>
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {programmes.map((p) => (
            <li key={p.id} data-reveal>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-2 ${p.vedette ? 'border-acide bg-acide text-noir' : 'border-acier bg-graphite hover:border-acide'}`}
              >
                {p.vedette && (
                  <span className="mb-3 self-start rounded bg-noir px-2 py-1 text-[0.65rem] font-black uppercase tracking-widest text-acide">
                    Le plus choisi
                  </span>
                )}
                <h3 className="text-3xl leading-none">{p.nom}</h3>
                <p className="mt-4">
                  <span className="font-display text-5xl">{p.prix}</span>{' '}
                  <span className={`text-sm ${p.vedette ? 'text-noir/70' : 'text-gris'}`}>{p.unite}</span>
                </p>
                <ul className={`mt-5 space-y-2 text-base ${p.vedette ? 'text-noir/80' : 'text-gris'}`}>
                  {p.points.map((x) => (
                    <li key={x}>→ {x}</li>
                  ))}
                </ul>
                <span
                  className={`absolute -bottom-10 -right-10 h-28 w-28 rounded-full transition-transform duration-500 group-hover:scale-150 ${p.vedette ? 'bg-noir/10' : 'bg-acide/10'}`}
                  aria-hidden="true"
                />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Methode() {
  const scope = useRef(null);
  const reduced = useReducedMotion();
  useReveal(scope);
  // texte géant qui défile à l'horizontale (parallaxe)
  useLayoutEffect(() => {
    if (reduced) return;
    const t = gsap.to('[data-geant]', {
      xPercent: -35,
      ease: 'none',
      scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    return () => t.kill();
  }, [reduced]);
  return (
    <section id="methode" ref={scope} className="overflow-hidden bg-graphite py-20 md:py-32" aria-labelledby="methode-titre">
      <p data-geant className="contour whitespace-nowrap font-display text-[22vw] uppercase leading-none opacity-30" aria-hidden="true">
        Force · Mobilité · Nutrition ·
      </p>
      <div className="mx-auto -mt-[6vw] max-w-7xl px-5 md:px-8">
        <Titre tag="La méthode" id="methode-titre">
          Trois piliers.
        </Titre>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {piliers.map((p, i) => (
            <li key={p.titre} data-reveal className="rounded-xl border border-acier bg-noir p-6">
              <span className="font-display text-6xl text-acide">0{i + 1}</span>
              <h3 className="mt-2 text-4xl">{p.titre}</h3>
              <p className="mt-2 text-gris">{p.texte}</p>
            </li>
          ))}
        </ol>
        <dl className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {chiffres.map((c) => (
            <div key={c.label} data-reveal>
              <dt className="sr-only">{c.label}</dt>
              <dd>
                <Counter
                  value={c.valeur}
                  decimals={c.decimals ?? 0}
                  suffix={c.suffixe}
                  className="block font-display text-5xl text-acide md:text-7xl"
                />
                <span className="text-sm uppercase tracking-wider text-gris">{c.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Planning() {
  const scope = useRef(null);
  const [type, setType] = useState('tout');
  useReveal(scope);
  const heures = [...new Set(planning.map((s) => s.heure))].sort((a, b) => a.padStart(5, '0').localeCompare(b.padStart(5, '0')));
  return (
    <section id="planning" ref={scope} className="section bg-noir" aria-labelledby="planning-titre">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Titre tag="Planning de la semaine" id="planning-titre">
            Quand <span className="text-acide">on bouge</span>
          </Titre>
          <div role="group" aria-label="Filtrer les séances" className="flex flex-wrap gap-2" data-reveal>
            {typesSeance.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={type === t.id}
                onClick={() => setType(t.id)}
                className={`min-h-11 rounded-md px-4 text-xs font-black uppercase tracking-wider transition-colors ${type === t.id ? 'bg-acide text-noir' : 'bg-graphite text-gris hover:text-blanc'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        {/* téléphone : une liste par jour (le tableau de la semaine ne tient pas sur un petit écran) */}
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:hidden" aria-label="Séances par jour">
          {jours.map((j) => {
            const seances = planning.filter((x) => x.jour === j).sort((a, b) => a.heure.padStart(5, '0').localeCompare(b.heure.padStart(5, '0')));
            if (!seances.length) return null;
            return (
              <li key={j} className="rounded-xl border border-acier bg-graphite/40 p-4">
                <p className="font-display text-2xl uppercase">{j}</p>
                <ul className="mt-2 space-y-2">
                  {seances.map((s) => {
                    const visible = type === 'tout' || s.type === type;
                    return (
                      <li key={s.heure} className={`flex items-center gap-3 transition-opacity duration-300 ${visible ? '' : 'opacity-25'}`}>
                        <span className="w-16 shrink-0 text-base font-semibold text-gris">{s.heure.replace(':', ' h ')}</span>
                        <span
                          className={`min-w-0 flex-1 rounded-md px-3 py-2 text-base font-bold uppercase break-words ${s.type === 'groupe' ? 'bg-acide text-noir' : s.type === 'duo' ? 'bg-blanc text-noir' : 'border border-acide text-acide'}`}
                        >
                          {s.titre}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        <div className="mt-10 hidden overflow-x-auto rounded-xl border border-acier md:block" data-reveal>
          <table className="w-full table-fixed border-collapse text-sm">
            <caption className="sr-only">Séances par jour et par heure</caption>
            <thead>
              <tr>
                <th scope="col" className="w-20 bg-graphite p-3 text-left text-gris">
                  Heure
                </th>
                {jours.map((j) => (
                  <th key={j} scope="col" className="bg-graphite p-3 font-display text-lg uppercase">
                    {j}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heures.map((h) => (
                <tr key={h} className="border-t border-acier">
                  <th scope="row" className="p-3 text-left font-semibold text-gris">
                    {h.replace(':', ' h ')}
                  </th>
                  {jours.map((j) => {
                    const s = planning.find((x) => x.jour === j && x.heure === h);
                    const visible = s && (type === 'tout' || s.type === type);
                    return (
                      <td key={j} className="p-1.5">
                        {s && (
                          <span
                            className={`block rounded-md px-2 py-2 text-center text-xs font-bold uppercase break-words hyphens-auto transition-all duration-300 ${visible ? (s.type === 'groupe' ? 'bg-acide text-noir' : s.type === 'duo' ? 'bg-blanc text-noir' : 'border border-acide text-acide') : 'opacity-15'}`}
                          >
                            {s.titre}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function LeCoach() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="coach" ref={scope} className="section bg-graphite" aria-labelledby="coach-titre">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-noir" data-reveal>
          {/* portrait dessiné, remplaçable par une photo */}
          <svg viewBox="0 0 400 500" className="h-full w-full" aria-hidden="true">
            <rect width="400" height="500" fill="#0b0b0c" />
            <circle cx="200" cy="230" r="170" fill="#c6ff3d" opacity="0.12" />
            <path d="M70 500c10-120 60-180 130-180s120 60 130 180Z" fill="#232327" />
            <path d="M120 360c20-30 50-40 80-40s60 10 80 40l-20 30H140Z" fill="#c6ff3d" opacity="0.8" />
            <rect x="178" y="270" width="44" height="60" rx="16" fill="#8a5a3c" />
            <ellipse cx="200" cy="215" rx="62" ry="74" fill="#9b6a48" />
            <path d="M140 200c0-60 120-70 122 0-20-30-90-34-122 0Z" fill="#141414" />
          </svg>
          <p className="absolute bottom-4 left-4 font-display text-6xl uppercase text-acide">{coach.prenom}</p>
        </div>
        <div>
          <Titre tag="Le coach" id="coach-titre">
            Salut, moi c’est <span className="text-acide">{coach.prenom}.</span>
          </Titre>
          <p className="mt-6 text-lg text-gris" data-reveal>
            Ancien joueur de rugby, diplômé d’État des métiers de la forme, je coache depuis huit ans à Lille. Ma conviction : la régularité
            bat l’intensité. On construit ensemble des habitudes qui tiennent, à votre rythme.
          </p>
          <ul className="mt-8 space-y-4">
            {avis.map((a) => (
              <li key={a.nom} data-reveal className="rounded-xl border-l-4 border-acide bg-noir p-5">
                <blockquote>« {a.texte} »</blockquote>
                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-acide">{a.nom}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Formulaire de séance découverte. */
export function Essai() {
  const scope = useRef(null);
  const [ok, setOk] = useState(null);
  useReveal(scope);
  const valider = useCallback((v) => {
    const e = {};
    if (!v.objectif) e.objectif = 'Choisissez votre objectif.';
    if (!v.jours.length) e.jours = 'Indiquez au moins un jour.';
    if (v.nom.trim().length < 2) e.nom = 'Indiquez votre prénom.';
    if (!telOk(v.telephone)) e.telephone = 'Numéro invalide (ex. : 06 12 34 56 78).';
    if (!emailOk(v.email)) e.email = 'Adresse e-mail invalide.';
    return e;
  }, []);
  const f = useForm({ objectif: '', niveau: 2, jours: [], nom: '', telephone: '', email: '' }, valider, (v) => setOk(v));
  const v = f.values;
  const niveaux = ['Débutant complet', 'Je reprends', 'Régulier', 'Sportif', 'Compétiteur'];
  const err = (k) =>
    f.show(k) && (
      <p id={`${k}-err`} role="alert" className="mt-1.5 text-sm text-[#ff5a4a]">
        {f.errors[k]}
      </p>
    );
  const toggleJour = (j) => f.setValue('jours', v.jours.includes(j) ? v.jours.filter((x) => x !== j) : [...v.jours, j]);
  const label = 'mb-2 block text-xs font-black uppercase tracking-[0.2em] text-gris';
  return (
    <section id="essai" ref={scope} className="section bg-noir" aria-labelledby="essai-titre">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Titre
            tag="Séance découverte offerte"
            id="essai-titre"
            intro="45 minutes pour faire le point, sans engagement. Je vous rappelle sous 24 heures pour fixer le créneau."
          >
            On commence <span className="text-acide">quand ?</span>
          </Titre>
          <a href={`tel:${coach.telephoneLien}`} className="btn btn-ligne mt-8" data-reveal>
            Appeler · {coach.telephone}
          </a>
        </div>
        <div data-reveal className="rounded-2xl border border-acier bg-graphite p-5 md:p-8">
          {ok ? (
            <div className="py-6 text-center" role="status">
              <p className="font-display text-6xl uppercase text-acide">C’est parti !</p>
              <p className="mt-4 text-lg">
                {ok.nom.trim().split(' ')[0]}, objectif « {ok.objectif.toLowerCase()} » noté. Je vous rappelle au {ok.telephone} sous 24
                heures.
              </p>
              <p className="mt-6 rounded-md bg-noir px-4 py-3 text-base text-gris">
                Site de démonstration : aucune demande n’est réellement transmise.
              </p>
              <button type="button" className="btn btn-ligne mt-6" onClick={() => (setOk(null), f.reset())}>
                Nouvelle demande
              </button>
            </div>
          ) : (
            <form ref={f.form} noValidate onSubmit={f.submit} className="grid gap-6 sm:grid-cols-2">
              <fieldset className="sm:col-span-2">
                <legend className={label}>Votre objectif</legend>
                <div className="flex flex-wrap gap-2">
                  {objectifs.map((o) => (
                    <label
                      key={o}
                      className={`cursor-pointer rounded-md border px-3 py-2.5 text-sm font-semibold transition-colors ${v.objectif === o ? 'border-acide bg-acide text-noir' : 'border-acier hover:border-acide'}`}
                    >
                      <input
                        type="radio"
                        name="objectif"
                        value={o}
                        checked={v.objectif === o}
                        onChange={f.set('objectif')}
                        className="sr-only"
                      />
                      {o}
                    </label>
                  ))}
                </div>
                {err('objectif')}
              </fieldset>
              <div className="sm:col-span-2">
                <label htmlFor="niveau" className={label}>
                  Votre niveau : <span className="text-acide">{niveaux[v.niveau - 1]}</span>
                </label>
                <input
                  id="niveau"
                  name="niveau"
                  type="range"
                  min="1"
                  max="5"
                  value={v.niveau}
                  onChange={f.set('niveau')}
                  className="h-11 w-full cursor-pointer accent-[#c6ff3d]"
                  aria-valuetext={niveaux[v.niveau - 1]}
                />
              </div>
              <fieldset className="sm:col-span-2">
                <legend className={label}>Vos jours possibles</legend>
                <div className="flex flex-wrap gap-2">
                  {jours.map((j) => (
                    <label
                      key={j}
                      className={`flex h-12 w-14 cursor-pointer items-center justify-center rounded-md border font-display text-lg uppercase transition-colors ${v.jours.includes(j) ? 'border-acide bg-acide text-noir' : 'border-acier hover:border-acide'}`}
                    >
                      <input
                        type="checkbox"
                        name="jours"
                        checked={v.jours.includes(j)}
                        onChange={() => toggleJour(j)}
                        className="sr-only"
                      />
                      {j}
                    </label>
                  ))}
                </div>
                {err('jours')}
              </fieldset>
              <div className="sm:col-span-2">
                <label htmlFor="nom" className={label}>
                  Prénom et nom
                </label>
                <input autoComplete="name" className="field" value={v.nom} onChange={f.set('nom')} {...f.field('nom')} />
                {err('nom')}
              </div>
              <div>
                <label htmlFor="telephone" className={label}>
                  Téléphone
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className="field"
                  value={v.telephone}
                  onChange={f.set('telephone')}
                  {...f.field('telephone')}
                />
                {err('telephone')}
              </div>
              <div>
                <label htmlFor="email" className={label}>
                  E-mail
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  className="field"
                  value={v.email}
                  onChange={f.set('email')}
                  {...f.field('email')}
                />
                {err('email')}
              </div>
              <button type="submit" className="btn btn-acide sm:col-span-2">
                Réserver ma séance offerte
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section ref={scope} className="section bg-graphite" aria-labelledby="faq-titre">
      <div className="mx-auto max-w-3xl">
        <Titre tag="Questions fréquentes" id="faq-titre">
          Avant de commencer
        </Titre>
        <div className="mt-10">
          <Faq
            items={faq}
            classes={{
              item: 'mb-2 rounded-xl border border-acier bg-noir px-5',
              button:
                'flex w-full items-center justify-between gap-6 py-5 text-left font-display text-2xl uppercase transition-colors hover:text-acide',
              icon: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-acide text-2xl text-noir',
              answer: 'pb-5 leading-relaxed text-gris',
            }}
          />
        </div>
      </div>
    </section>
  );
}
