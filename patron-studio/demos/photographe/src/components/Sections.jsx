import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Counter from '@demos/shared/components/Counter.jsx';
import Faq from '@demos/shared/components/Faq.jsx';
import { useForm } from '@demos/shared/hooks/useForm.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { emailOk, isoLocal, telOk } from '@demos/shared/lib/validation.js';
import { avis, categories, chiffres, deroule, faq, photos, prestations, studio, typesSeance } from '../data/site';
import Photo from './Photo';

function Titre({ tag, children, intro, id }) {
  return (
    <div className="max-w-3xl">
      <p className="mono" data-reveal>
        {tag}
      </p>
      <h2 id={id} className="mt-4 text-5xl leading-[1.02] md:text-7xl" data-reveal>
        {children}
      </h2>
      {intro && (
        <p className="mt-5 text-lg leading-relaxed text-papier/70" data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */



/* ---------------------------------------------------------------- */

const SPAN = { haut: 'row-span-2', large: 'sm:col-span-2', carre: '' };

function Lightbox({ liste, index, setIndex }) {
  const fermer = useRef(null);
  const photo = index === null ? null : liste[index];
  const ouvert = photo !== null;
  useEffect(() => {
    if (!ouvert) return;
    const avant = document.activeElement;
    fermer.current?.focus();
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setIndex(null);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % liste.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + liste.length) % liste.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      avant?.focus?.();
    };
  }, [ouvert, liste.length, setIndex]);
  if (!photo) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo : ${photo.titre}`}
      className="fixed inset-0 z-[90] flex flex-col bg-nuit/95 backdrop-blur"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <p className="mono">
          {index + 1} / {liste.length}
        </p>
        <button
          ref={fermer}
          type="button"
          onClick={() => setIndex(null)}
          className="flex h-11 w-11 items-center justify-center text-3xl"
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4">
        <Photo key={photo.id} photo={photo} className="max-h-full w-full max-w-3xl animate-[fadeIn_0.4s_ease]" />
        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + liste.length) % liste.length)}
          className="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full bg-nuit/70 text-2xl md:left-6"
          aria-label="Photo précédente"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % liste.length)}
          className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full bg-nuit/70 text-2xl md:right-6"
          aria-label="Photo suivante"
        >
          →
        </button>
      </div>
      <div className="px-5 py-5 text-center">
        <p className="font-display text-2xl italic">{photo.titre}</p>
        <p className="mono mt-1">
          {photo.cat} · {photo.exif}
        </p>
      </div>
    </div>
  );
}

export function Portfolio() {
  const scope = useRef(null);
  const grille = useRef(null);
  const [cat, setCat] = useState('Tout');
  const [index, setIndex] = useState(null);
  const reduced = useReducedMotion();
  const liste = cat === 'Tout' ? photos : photos.filter((p) => p.cat === cat);
  useReveal(scope);
  const choisir = (c) => {
    if (c === cat) return;
    if (reduced || !grille.current) return setCat(c);
    gsap.to(grille.current, {
      opacity: 0,
      y: 12,
      duration: 0.2,
      onComplete: () => {
        setCat(c);
        gsap.fromTo(grille.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
      },
    });
  };
  return (
    <section id="portfolio" ref={scope} className="section bg-nuit" aria-labelledby="pf-titre">
      <div className="mx-auto max-w-7xl">
        <Titre tag="Portfolio" id="pf-titre" intro="Une sélection de séances récentes. Touchez une photo pour l’agrandir.">
          Des images <span className="italic text-ambre">sincères</span>
        </Titre>
        <div role="group" aria-label="Filtrer par catégorie" className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2" data-reveal>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => choisir(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${cat === c ? 'bg-papier text-nuit' : 'border border-trait text-papier/70 hover:border-papier/40'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <ul ref={grille} className="mt-8 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] md:grid-cols-3 md:gap-4">
          {liste.map((p, i) => (
            <li key={p.id} className={`${SPAN[p.format]} min-w-0`}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block h-full w-full overflow-hidden rounded-lg"
                aria-label={`Agrandir : ${p.titre}`}
              >
                <Photo photo={p} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                  <span className="block font-display text-lg italic">{p.titre}</span>
                  <span className="mono block !text-papier/60">{p.exif}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox liste={liste} index={index} setIndex={setIndex} />
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function Prestations() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="prestations" ref={scope} className="section bg-carbone" aria-labelledby="pr-titre">
      <div className="mx-auto max-w-7xl">
        <Titre tag="Prestations & tarifs" id="pr-titre" intro="Tarifs TTC, déplacements inclus dans un rayon de 60 km autour de Bordeaux.">
          Choisissez votre séance
        </Titre>
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {prestations.map((p) => (
            <li key={p.id} data-reveal className="min-w-0">
              <article
                className={`flex h-full flex-col rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1.5 ${p.vedette ? 'border-ambre bg-ambre/10' : 'border-trait bg-nuit'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-3xl italic">{p.nom}</h3>
                  {p.vedette && <span className="mono rounded-full border border-ambre px-2 py-0.5 !text-ambre">Coup de cœur</span>}
                </div>
                <p className="mt-4 font-display text-4xl text-ambre">{p.prix}</p>
                <p className="mono mt-1">{p.duree}</p>
                <ul className="mt-5 space-y-2 text-sm text-papier/75">
                  {p.points.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="text-ambre">◦</span>
                      {x}
                    </li>
                  ))}
                </ul>
                <a
                  href={`#reservation`}
                  data-seance={p.nom}
                  className={`btn mt-auto w-full ${p.vedette ? 'btn-ambre' : 'btn-ligne'} !mt-6`}
                >
                  Réserver
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Deroule() {
  const scope = useRef(null);
  const ligne = useRef(null);
  const reduced = useReducedMotion();
  useReveal(scope);
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ligne.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: ligne.current, start: 'top 85%', end: 'top 35%', scrub: true } },
      );
    }, scope);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section id="deroule" ref={scope} className="section bg-nuit" aria-labelledby="dr-titre">
      <div className="mx-auto max-w-7xl">
        <Titre tag="Comment ça se passe" id="dr-titre">
          Quatre étapes, <span className="italic text-ambre">zéro stress</span>
        </Titre>
        <div className="relative mt-14">
          <span ref={ligne} aria-hidden="true" className="absolute left-0 top-3 hidden h-px w-full origin-left bg-ambre md:block" />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {deroule.map((d, i) => (
              <li key={d.titre} data-reveal className="relative">
                <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-ambre font-mono text-xs text-nuit">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-3xl italic">{d.titre}</h3>
                <p className="mt-2 leading-relaxed text-papier/70">{d.texte}</p>
              </li>
            ))}
          </ol>
        </div>
        <ul className="mt-20 grid grid-cols-3 gap-4 border-t border-trait pt-10">
          {chiffres.map((c) => (
            <li key={c.label} data-reveal className="min-w-0">
              <Counter value={c.valeur} suffix={c.suffixe} className="block font-display text-4xl text-ambre md:text-6xl" />
              <p className="mt-2 text-sm text-papier/60">{c.label}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-20 grid gap-6 md:grid-cols-3">
          {avis.map((a) => (
            <li key={a.nom} data-reveal>
              <figure className="h-full rounded-2xl border border-trait p-6">
                <p aria-label="5 étoiles sur 5" className="text-ambre">
                  ★★★★★
                </p>
                <blockquote className="mt-4 font-display text-xl italic leading-snug">« {a.texte} »</blockquote>
                <figcaption className="mono mt-5">
                  {a.nom} · {a.type}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

const valider = (v) => {
  const e = {};
  if (!v.type) e.type = 'Choisissez un type de séance.';
  if (!v.date) e.date = 'Indiquez une date souhaitée.';
  else if (v.date < isoLocal(new Date())) e.date = 'La date doit être à venir.';
  if (v.nom.trim().length < 2) e.nom = 'Indiquez votre nom.';
  if (!emailOk(v.email)) e.email = 'Adresse e-mail invalide.';
  if (v.telephone && !telOk(v.telephone)) e.telephone = 'Numéro invalide (ex. 06 12 34 56 78).';
  return e;
};

function Erreur({ f, k }) {
  return f.show(k) ? (
    <p id={`${k}-err`} className="mt-1.5 text-sm text-[#ff7a6b]">
      {f.errors[k]}
    </p>
  ) : null;
}

export function Reservation() {
  const scope = useRef(null);
  const [ok, setOk] = useState(null);
  const f = useForm({ type: '', date: '', lieu: '', nom: '', email: '', telephone: '', message: '' }, valider, (v) => setOk(v));
  const v = f.values;
  useReveal(scope);
  // un clic sur « Réserver » dans une carte de prestation pré-remplit le type
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('[data-seance]');
      if (a) f.setValue('type', a.dataset.seance);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setValue est stable dans son usage
  }, []);
  return (
    <section id="reservation" ref={scope} className="section bg-carbone" aria-labelledby="rs-titre">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Titre
            tag="Réservation"
            id="rs-titre"
            intro="Dites-m’en un peu plus : je vous réponds sous 24 h avec mes disponibilités et un devis."
          >
            Parlons de votre <span className="italic text-ambre">projet</span>
          </Titre>
          <dl className="mt-10 space-y-4 text-papier/75" data-reveal>
            <div>
              <dt className="mono">Studio</dt>
              <dd>{studio.adresse}</dd>
            </div>
            <div>
              <dt className="mono">Zone</dt>
              <dd>{studio.zone}</dd>
            </div>
            <div>
              <dt className="mono">Horaires</dt>
              <dd>{studio.horaires}</dd>
            </div>
          </dl>
          <a href={`tel:${studio.telephoneLien}`} className="btn btn-ligne mt-8" data-reveal>
            Appeler · {studio.telephone}
          </a>
        </div>
        <div data-reveal className="min-w-0 rounded-2xl border border-trait bg-nuit p-5 md:p-8">
          {ok ? (
            <div role="status" className="py-10 text-center">
              <p className="font-display text-5xl italic text-ambre">Merci {ok.nom.split(' ')[0]} !</p>
              <p className="mx-auto mt-4 max-w-sm leading-relaxed text-papier/75">
                Votre demande de séance « {ok.type} » pour le{' '}
                {new Date(ok.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} est bien notée. Je vous
                réponds sous 24 h à {ok.email}.
              </p>
              <p className="mono mt-4">(Démonstration : aucun message n’a été envoyé.)</p>
              <button
                type="button"
                className="btn btn-ligne mt-6"
                onClick={() => {
                  f.reset();
                  setOk(null);
                }}
              >
                Nouvelle demande
              </button>
            </div>
          ) : (
            <form ref={f.form} noValidate onSubmit={f.submit} className="grid gap-5 sm:grid-cols-2">
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-sm">Type de séance</legend>
                <div className="flex flex-wrap gap-2">
                  {typesSeance.map((t) => (
                    <label key={t} className="cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value={t}
                        checked={v.type === t}
                        onChange={f.set('type')}
                        className="peer sr-only"
                        {...(t === typesSeance[0] ? { id: 'type' } : {})}
                      />
                      <span className="block rounded-full border border-trait px-4 py-2 text-sm transition-colors peer-checked:border-ambre peer-checked:bg-ambre peer-checked:text-nuit peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-ambre">
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
                <Erreur f={f} k="type" />
              </fieldset>
              <div>
                <label htmlFor="date" className="mb-1.5 block text-sm">
                  Date souhaitée
                </label>
                <input
                  type="date"
                  min={isoLocal(new Date())}
                  className="field [color-scheme:dark]"
                  value={v.date}
                  onChange={f.set('date')}
                  {...f.field('date')}
                />
                <Erreur f={f} k="date" />
              </div>
              <div>
                <label htmlFor="lieu" className="mb-1.5 block text-sm">
                  Lieu (facultatif)
                </label>
                <input
                  className="field"
                  placeholder="Studio, plage, domaine…"
                  value={v.lieu}
                  onChange={f.set('lieu')}
                  {...f.field('lieu')}
                />
              </div>
              <div>
                <label htmlFor="nom" className="mb-1.5 block text-sm">
                  Nom
                </label>
                <input autoComplete="name" className="field" value={v.nom} onChange={f.set('nom')} {...f.field('nom')} />
                <Erreur f={f} k="nom" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm">
                  E-mail
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  className="field"
                  value={v.email}
                  onChange={f.set('email')}
                  {...f.field('email')}
                />
                <Erreur f={f} k="email" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="telephone" className="mb-1.5 block text-sm">
                  Téléphone (facultatif)
                </label>
                <input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  className="field"
                  value={v.telephone}
                  onChange={f.set('telephone')}
                  {...f.field('telephone')}
                />
                <Erreur f={f} k="telephone" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block text-sm">
                  Votre projet (facultatif)
                </label>
                <textarea rows={4} className="field" value={v.message} onChange={f.set('message')} {...f.field('message')} />
              </div>
              <button type="submit" className="btn btn-ambre sm:col-span-2">
                Envoyer ma demande
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
    <section id="faq" ref={scope} className="section bg-nuit" aria-labelledby="faq-titre">
      <div className="mx-auto max-w-3xl">
        <Titre tag="Questions fréquentes" id="faq-titre">
          Bon à savoir
        </Titre>
        <div className="mt-10">
          <Faq
            items={faq}
            classes={{
              item: 'border-b border-trait',
              button:
                'flex w-full items-center justify-between gap-6 py-6 text-left font-display text-2xl italic transition-colors hover:text-ambre',
              icon: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-trait text-xl not-italic text-ambre',
              answer: 'pb-6 leading-relaxed text-papier/70',
            }}
          />
        </div>
      </div>
    </section>
  );
}
