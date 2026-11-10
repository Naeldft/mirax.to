import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { emailOk, telOk } from '@demos/shared/lib/validation.js';
import { delais, entreprise, services, zone } from '../data/site';
import { Check, Telephone } from './Icons';
import SectionTitle from './SectionTitle';

const estimables = services.filter((s) => s.estimable);
const fmt = (n) => Math.round(n / 100) * 100;

/** Montant qui défile quand l'estimation change. */
function Montant({ value }) {
  const el = useRef(null);
  const last = useRef(value);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (!el.current) return;
    if (reduced) {
      el.current.textContent = value.toLocaleString('fr-FR') + ' €';
      return;
    }
    const s = { v: last.current };
    const t = gsap.to(s, {
      v: value,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => el.current && (el.current.textContent = fmt(s.v).toLocaleString('fr-FR') + ' €'),
    });
    last.current = value;
    return () => t.kill();
  }, [value, reduced]);
  return <span ref={el}>{value.toLocaleString('fr-FR')} €</span>;
}

function valider(v) {
  const e = {};
  if (v.nom.trim().length < 2) e.nom = 'Indiquez votre nom.';
  if (!telOk(v.telephone)) e.telephone = 'Numéro invalide (ex. : 06 12 34 56 78).';
  if (!emailOk(v.email)) e.email = 'Adresse e-mail invalide.';
  if (!v.commune) e.commune = 'Choisissez la commune du projet.';
  return e;
}

export default function Devis() {
  const scope = useRef(null);
  const form = useRef(null);
  const [v, setV] = useState({
    type: 'extension',
    surface: 30,
    commune: '',
    delai: delais[1],
    nom: '',
    telephone: '',
    email: '',
    message: '',
  });
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const [ok, setOk] = useState(null);
  useReveal(scope);

  const s = estimables.find((x) => x.id === v.type);
  const min = fmt(s.tarif * v.surface);
  const max = fmt((s.tarifMax ?? s.tarif) * v.surface);
  const errors = useMemo(() => valider(v), [v]);
  const show = (k) => (touched[k] || sent) && errors[k];
  const set = (k) => (e) => setV((o) => ({ ...o, [k]: k === 'surface' ? Number(e.target.value) : e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const aria = (k) => ({ 'aria-invalid': show(k) ? 'true' : 'false', 'aria-describedby': show(k) ? `${k}-err` : undefined });
  const err = (k) =>
    show(k) && (
      <p id={`${k}-err`} role="alert" className="mt-1.5 font-semibold text-[#c0392b]">
        {errors[k]}
      </p>
    );
  const label = 'mb-1.5 block font-cond text-lg font-bold uppercase tracking-wide';

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    const first = Object.keys(errors)[0];
    if (first) return form.current.querySelector(`[name="${first}"]`)?.focus();
    // Démo : rien n'est envoyé. Brancher ici l'envoi réel (e-mail, CRM…).
    setOk({ ...v, titre: s.titre, min, max });
  };

  return (
    <section id="devis" ref={scope} className="section quadrillage bg-chantier" aria-labelledby="devis-titre">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionTitle
            id="devis-titre"
            etiquette="Devis gratuit"
            title="Estimez, puis parlons-en."
            intro="Faites glisser la surface : une première fourchette s’affiche. Nous vous rappelons sous 48 heures pour une visite gratuite."
          />
          <a href={`tel:${entreprise.telephoneLien}`} className="btn btn-noir mt-8" data-reveal>
            <Telephone /> {entreprise.telephone}
          </a>
        </div>
        <div data-reveal className="border-2 border-anthracite bg-papier p-5 shadow-[10px_10px_0_#1d1d1b] md:p-8">
          {ok ? (
            <div className="py-6 text-center" role="status">
              <span className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-anthracite bg-chantier text-3xl">
                <Check />
              </span>
              <h3 className="mt-5 text-2xl">Demande enregistrée !</h3>
              <p className="mt-3 text-graphite">
                {ok.titre}, {ok.surface} m² à {ok.commune} : fourchette indicative de {ok.min.toLocaleString('fr-FR')} € à{' '}
                {ok.max.toLocaleString('fr-FR')} €. Un conducteur de travaux vous rappelle au {ok.telephone} sous 48 heures.
              </p>
              <p className="mt-6 bg-beton px-4 py-3 text-sm text-graphite">
                Site de démonstration : aucune demande n’est réellement transmise.
              </p>
              <button type="button" className="btn btn-jaune mt-6" onClick={() => (setOk(null), setSent(false), setTouched({}))}>
                Nouvelle estimation
              </button>
            </div>
          ) : (
            <form ref={form} noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <fieldset className="sm:col-span-2">
                <legend className={label}>Votre projet</legend>
                <div className="grid grid-cols-2 gap-2">
                  {estimables.map((x) => (
                    <label
                      key={x.id}
                      className={`cursor-pointer border-2 border-anthracite px-3 py-3 text-center font-cond text-lg font-bold uppercase transition-colors ${v.type === x.id ? 'bg-anthracite text-papier' : 'hover:bg-chantier'}`}
                    >
                      <input type="radio" name="type" value={x.id} checked={v.type === x.id} onChange={set('type')} className="sr-only" />
                      {x.titre}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="sm:col-span-2">
                <label htmlFor="surface" className={label}>
                  Surface : <span className="text-plan">{v.surface} m²</span>
                </label>
                <input
                  id="surface"
                  name="surface"
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={v.surface}
                  onChange={set('surface')}
                  className="h-3 w-full cursor-pointer accent-[#1d1d1b]"
                />
                <p
                  className="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-2 border-anthracite bg-beton px-4 py-3"
                  aria-live="polite"
                >
                  <span className="font-cond text-lg font-bold uppercase">Budget indicatif</span>
                  <span className="font-display text-xl md:text-2xl">
                    <Montant value={min} /> – <Montant value={max} />
                  </span>
                </p>
              </div>
              <div>
                <label htmlFor="commune" className={label}>
                  Commune
                </label>
                <select
                  id="commune"
                  name="commune"
                  className="field"
                  value={v.commune}
                  onChange={set('commune')}
                  onBlur={blur('commune')}
                  {...aria('commune')}
                >
                  <option value="">Choisir…</option>
                  {zone.map((z) => (
                    <option key={z}>{z}</option>
                  ))}
                  <option>Autre commune</option>
                </select>
                {err('commune')}
              </div>
              <div>
                <label htmlFor="delai" className={label}>
                  Démarrage
                </label>
                <select id="delai" className="field" value={v.delai} onChange={set('delai')}>
                  {delais.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="nom" className={label}>
                  Nom
                </label>
                <input
                  id="nom"
                  name="nom"
                  autoComplete="name"
                  className="field"
                  value={v.nom}
                  onChange={set('nom')}
                  onBlur={blur('nom')}
                  {...aria('nom')}
                />
                {err('nom')}
              </div>
              <div>
                <label htmlFor="telephone" className={label}>
                  Téléphone
                </label>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className="field"
                  value={v.telephone}
                  onChange={set('telephone')}
                  onBlur={blur('telephone')}
                  {...aria('telephone')}
                />
                {err('telephone')}
              </div>
              <div>
                <label htmlFor="email" className={label}>
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="field"
                  value={v.email}
                  onChange={set('email')}
                  onBlur={blur('email')}
                  {...aria('email')}
                />
                {err('email')}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className={label}>
                  Précisions <span className="font-sans text-base font-normal normal-case text-graphite">(facultatif)</span>
                </label>
                <textarea
                  id="message"
                  rows="3"
                  className="field"
                  value={v.message}
                  onChange={set('message')}
                  placeholder="Terrain, existant, envies particulières…"
                />
              </div>
              <button type="submit" className="btn btn-noir sm:col-span-2">
                Demander ma visite gratuite
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
