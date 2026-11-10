import { useMemo, useRef, useState } from 'react';
import { restaurant } from '../data/site';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { creneaux, isoLocal, jourDe, parseIso } from '../lib/horaires';
import { Check, Phone } from './Icons';
import SectionTitle from './SectionTitle';

const MAX_PERSONNES = 10;
const JOURS_MAX = 60;

const vide = { nom: '', telephone: '', date: '', heure: '', personnes: '2' };

const telOk = (t) => /^(?:(?:\+|00)33[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(t.trim());

function valider(v, now = new Date()) {
  const e = {};
  if (v.nom.trim().length < 2) e.nom = 'Indiquez votre nom (2 lettres minimum).';
  if (!v.telephone.trim()) e.telephone = 'Indiquez un numéro pour vous joindre.';
  else if (!telOk(v.telephone)) e.telephone = 'Ce numéro ne semble pas valide (ex. : 06 12 34 56 78).';
  if (!v.date) e.date = 'Choisissez une date.';
  else {
    const d = parseIso(v.date);
    const today = parseIso(isoLocal(now));
    const max = new Date(today);
    max.setDate(max.getDate() + JOURS_MAX);
    if (d < today) e.date = 'Cette date est déjà passée.';
    else if (d > max) e.date = `Les réservations sont ouvertes ${JOURS_MAX} jours à l’avance.`;
    else if (!jourDe(d)?.services.length) e.date = `Nous sommes fermés le ${jourDe(d).nom.toLowerCase()}. Choisissez un autre jour.`;
    else if (creneaux(v.date, now).length === 0) e.date = 'Plus de créneau disponible ce jour-là.';
  }
  if (!e.date && !v.heure) e.heure = 'Choisissez une heure.';
  else if (!e.date && !creneaux(v.date, now).includes(v.heure)) e.heure = 'Cet horaire n’est pas disponible.';
  const n = Number(v.personnes);
  if (!Number.isInteger(n) || n < 1 || n > MAX_PERSONNES) e.personnes = `Entre 1 et ${MAX_PERSONNES} personnes.`;
  return e;
}

function Champ({ id, label, error, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-creme/85">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-aide`} className="mt-1.5 text-xs text-creme/50">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-erreur`} className="mt-1.5 text-sm text-tomate-vif" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Reservation() {
  const scope = useRef(null);
  const form = useRef(null);
  const [v, setV] = useState(vide);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [ok, setOk] = useState(null);
  useReveal(scope);

  const errors = useMemo(() => valider(v), [v]);
  const show = (k) => (touched[k] || submitted) && errors[k];
  const slots = useMemo(() => creneaux(v.date), [v.date]);
  const today = isoLocal(new Date());

  const set = (k) => (e) => {
    const value = e.target.value;
    setV((old) => ({ ...old, [k]: value, ...(k === 'date' ? { heure: '' } : {}) }));
  };
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const aria = (k, hint) => ({
    'aria-invalid': show(k) ? 'true' : 'false',
    'aria-describedby': show(k) ? `${k}-erreur` : hint ? `${k}-aide` : undefined,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = valider(v);
    const first = Object.keys(errs)[0];
    if (first) {
      form.current?.querySelector(`#${first}`)?.focus();
      return;
    }
    // Site démo : rien n'est envoyé. Brancher ici un service (e-mail, Formspree, API…).
    setOk({ ...v });
  };

  const reset = () => {
    setV(vide);
    setTouched({});
    setSubmitted(false);
    setOk(null);
  };

  const dateLongue = (iso) => parseIso(iso).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <section id="reservation" ref={scope} className="section grain relative overflow-hidden bg-charbon" aria-labelledby="resa-titre">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgb(216_67_47/0.18),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionTitle
            id="resa-titre"
            align="left"
            eyebrow="Réservation"
            title="Votre table vous attend"
            intro="Réservez en quelques secondes. Pour un groupe de plus de dix personnes ou une privatisation, appelez-nous directement."
          />
          <a data-reveal href={`tel:${restaurant.telephoneLien}`} className="btn btn-ghost mt-8">
            <Phone /> {restaurant.telephone}
          </a>
        </div>

        <div data-reveal className="rounded-[2rem] border border-creme/10 bg-braise/80 p-5 shadow-2xl shadow-black/40 backdrop-blur md:p-8">
          {ok ? (
            <div className="py-6 text-center" role="status" aria-live="polite">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-basilic/20 text-3xl text-basilic-clair">
                <Check />
              </span>
              <h3 className="mt-5 text-3xl font-semibold">Grazie, {ok.nom.trim().split(' ')[0]} !</h3>
              <p className="mt-3 text-creme/80">
                Votre demande pour{' '}
                <strong>
                  {ok.personnes} {Number(ok.personnes) > 1 ? 'personnes' : 'personne'}
                </strong>{' '}
                le <strong>{dateLongue(ok.date)}</strong> à <strong>{ok.heure.replace(':', ' h ')}</strong> est bien enregistrée.
              </p>
              <p className="mt-2 text-sm text-creme/55">Nous vous confirmerons la réservation par SMS au {ok.telephone}.</p>
              <p className="mt-6 rounded-xl bg-creme/5 px-4 py-3 text-xs text-creme/50">
                Site de démonstration : aucune réservation n’est réellement transmise.
              </p>
              <button type="button" onClick={reset} className="btn btn-ghost mt-6">
                Faire une autre réservation
              </button>
            </div>
          ) : (
            <form ref={form} noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Champ id="nom" label="Nom" error={show('nom')}>
                  <input
                    id="nom"
                    name="nom"
                    className="field"
                    autoComplete="name"
                    value={v.nom}
                    onChange={set('nom')}
                    onBlur={blur('nom')}
                    {...aria('nom')}
                  />
                </Champ>
              </div>
              <div className="sm:col-span-2">
                <Champ id="telephone" label="Téléphone" error={show('telephone')}>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className="field"
                    placeholder="06 12 34 56 78"
                    value={v.telephone}
                    onChange={set('telephone')}
                    onBlur={blur('telephone')}
                    {...aria('telephone')}
                  />
                </Champ>
              </div>
              <Champ id="date" label="Date" error={show('date')} hint="Fermé le lundi">
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={today}
                  className="field"
                  value={v.date}
                  onChange={set('date')}
                  onBlur={blur('date')}
                  {...aria('date', true)}
                />
              </Champ>
              <Champ id="heure" label="Heure" error={show('heure')}>
                <select
                  id="heure"
                  name="heure"
                  className="field"
                  value={v.heure}
                  onChange={set('heure')}
                  onBlur={blur('heure')}
                  disabled={!v.date || errors.date !== undefined}
                  {...aria('heure')}
                >
                  <option value="">{!v.date ? 'Choisissez d’abord une date' : slots.length ? 'Choisir une heure' : 'Aucun créneau'}</option>
                  {slots.map((s) => (
                    <option key={s} value={s}>
                      {s.replace(':', ' h ')}
                    </option>
                  ))}
                </select>
              </Champ>
              <div className="sm:col-span-2">
                <Champ id="personnes" label="Nombre de personnes" error={show('personnes')}>
                  <select
                    id="personnes"
                    name="personnes"
                    className="field"
                    value={v.personnes}
                    onChange={set('personnes')}
                    onBlur={blur('personnes')}
                    {...aria('personnes')}
                  >
                    {Array.from({ length: MAX_PERSONNES }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n > 1 ? 'personnes' : 'personne'}
                      </option>
                    ))}
                  </select>
                </Champ>
              </div>
              <button type="submit" className="btn btn-primary sm:col-span-2">
                Confirmer la réservation
              </button>
              {submitted && Object.keys(errors).length > 0 && (
                <p className="text-center text-sm text-tomate-vif sm:col-span-2" role="alert">
                  Vérifiez les champs signalés en rouge.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
