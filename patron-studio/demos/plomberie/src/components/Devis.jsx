import { useMemo, useRef, useState } from 'react';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { emailOk, telOk } from '@demos/shared/lib/validation.js';
import { creneaux, entreprise, typesIntervention, zone } from '../data/site';
import { Check, Telephone } from './Icons';
import SectionTitle from './SectionTitle';

const vide = { nom: '', telephone: '', email: '', commune: '', type: '', urgent: false, message: '', creneau: creneaux[0] };

function valider(v) {
  const e = {};
  if (v.nom.trim().length < 2) e.nom = 'Indiquez votre nom.';
  if (!telOk(v.telephone)) e.telephone = 'Numéro invalide (ex. : 06 12 34 56 78).';
  if (v.email.trim() && !emailOk(v.email)) e.email = 'Adresse e-mail invalide.';
  if (!v.commune) e.commune = 'Choisissez votre commune.';
  if (!v.type) e.type = 'Choisissez le type d’intervention.';
  if (v.message.trim().length < 10) e.message = 'Décrivez le problème en quelques mots (10 caractères minimum).';
  return e;
}

export default function Devis() {
  const scope = useRef(null);
  const form = useRef(null);
  const [v, setV] = useState(vide);
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const [ok, setOk] = useState(null);
  useReveal(scope);
  const errors = useMemo(() => valider(v), [v]);
  const show = (k) => (touched[k] || sent) && errors[k];
  const set = (k) => (e) => setV((o) => ({ ...o, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const aria = (k) => ({ 'aria-invalid': show(k) ? 'true' : 'false', 'aria-describedby': show(k) ? `${k}-err` : undefined });
  const Err = ({ k }) =>
    show(k) ? (
      <p id={`${k}-err`} role="alert" className="mt-1.5 text-sm text-alerte">
        {errors[k]}
      </p>
    ) : null;

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    const first = Object.keys(errors)[0];
    if (first) {
      form.current.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    // Démo : rien n'est envoyé. Pour un vrai client, brancher ici l'envoi (e-mail, Formspree, API…).
    setOk({ ...v, ref: 'OND-' + String(Date.now()).slice(-5) });
  };

  return (
    <section id="devis" ref={scope} className="section blueprint relative overflow-hidden bg-nuit" aria-labelledby="devis-titre">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-eau/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionTitle
            id="devis-titre"
            tag="Devis gratuit"
            title="Décrivez, on chiffre."
            intro="Réponse sous deux heures en journée. Pour une fuite active ou un dégât des eaux, appelez directement : c’est plus rapide."
          />
          <a href={`tel:${entreprise.telephoneLien}`} className="btn btn-ligne mt-8" data-reveal>
            <Telephone /> Urgence : {entreprise.telephone}
          </a>
        </div>
        <div data-reveal className="rounded-3xl border border-ecume/10 bg-nuit-2/90 p-5 backdrop-blur md:p-8">
          {ok ? (
            <div className="py-6 text-center" role="status">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-eau/15 text-3xl text-eau">
                <Check />
              </span>
              <h3 className="mt-5 text-3xl font-bold">Demande reçue, merci {ok.nom.trim().split(' ')[0]} !</h3>
              <p className="mt-3 text-ecume/75">
                Référence <strong className="text-eau">{ok.ref}</strong>. Un plombier vous rappelle au {ok.telephone}{' '}
                {ok.urgent ? 'dans les minutes qui viennent' : 'dans la journée'}.
              </p>
              <p className="mt-6 rounded-xl bg-ecume/5 px-4 py-3 text-xs text-ecume/50">
                Site de démonstration : aucune demande n’est réellement transmise.
              </p>
              <button
                type="button"
                className="btn btn-ligne mt-6"
                onClick={() => (setV(vide), setTouched({}), setSent(false), setOk(null))}
              >
                Nouvelle demande
              </button>
            </div>
          ) : (
            <form ref={form} noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-sm font-semibold text-ecume/85">Type d’intervention</legend>
                <div className="flex flex-wrap gap-2">
                  {typesIntervention.map((t) => (
                    <label
                      key={t.id}
                      className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${v.type === t.id ? 'border-eau bg-eau text-nuit' : 'border-ecume/15 hover:border-eau/60'}`}
                    >
                      <input type="radio" name="type" value={t.id} checked={v.type === t.id} onChange={set('type')} className="sr-only" />
                      {t.label}
                    </label>
                  ))}
                </div>
                <Err k="type" />
              </fieldset>
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-ecume/15 px-4 py-3 sm:col-span-2">
                <span>
                  <span className="block font-semibold">C’est urgent</span>
                  <span className="text-sm text-ecume/55">Fuite active, plus d’eau, dégât des eaux</span>
                </span>
                <input type="checkbox" name="urgent" checked={v.urgent} onChange={set('urgent')} className="peer sr-only" />
                <span
                  className="relative h-7 w-12 shrink-0 rounded-full bg-ecume/15 transition-colors peer-checked:bg-alerte peer-focus-visible:ring-2 peer-focus-visible:ring-eau after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-ecume after:transition-transform peer-checked:after:translate-x-5"
                  aria-hidden="true"
                />
              </label>
              <div>
                <label htmlFor="nom" className="mb-1.5 block text-sm font-semibold text-ecume/85">
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
                <Err k="nom" />
              </div>
              <div>
                <label htmlFor="telephone" className="mb-1.5 block text-sm font-semibold text-ecume/85">
                  Téléphone
                </label>
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
                <Err k="telephone" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ecume/85">
                  E-mail <span className="font-normal text-ecume/45">(facultatif)</span>
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
                <Err k="email" />
              </div>
              <div>
                <label htmlFor="commune" className="mb-1.5 block text-sm font-semibold text-ecume/85">
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
                  {zone.communes.map((c) => (
                    <option key={c.nom}>{c.nom}</option>
                  ))}
                  <option>Autre commune</option>
                </select>
                <Err k="commune" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ecume/85">
                  Votre problème
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="field"
                  placeholder="Ex. : l’eau coule sous l’évier depuis ce matin…"
                  value={v.message}
                  onChange={set('message')}
                  onBlur={blur('message')}
                  {...aria('message')}
                />
                <Err k="message" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="creneau" className="mb-1.5 block text-sm font-semibold text-ecume/85">
                  Quand passer ?
                </label>
                <select id="creneau" name="creneau" className="field" value={v.creneau} onChange={set('creneau')}>
                  {creneaux.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-eau sm:col-span-2">
                Recevoir mon devis gratuit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
