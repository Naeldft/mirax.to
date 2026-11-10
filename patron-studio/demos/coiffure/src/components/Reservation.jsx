import { useCallback, useRef, useState } from 'react';
import { useForm } from '@demos/shared/hooks/useForm.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { emailOk, isoLocal, parseIso, telOk } from '@demos/shared/lib/validation.js';
import { creneaux, equipe, prestations } from '../data/site';

const toutes = prestations.flatMap((c) => c.items.map((i) => ({ ...i, categorie: c.categorie })));

function valider(v) {
  const e = {};
  if (!v.prestation) e.prestation = 'Choisissez une prestation.';
  if (!v.date) e.date = 'Choisissez une date.';
  else {
    const d = parseIso(v.date);
    if (v.date < isoLocal(new Date())) e.date = 'Cette date est passée.';
    else if (d.getDay() === 0 || d.getDay() === 1) e.date = 'Le salon est fermé le dimanche et le lundi.';
  }
  if (!v.heure) e.heure = 'Choisissez un horaire.';
  if (v.nom.trim().length < 2) e.nom = 'Indiquez votre prénom et votre nom.';
  if (!telOk(v.telephone)) e.telephone = 'Numéro invalide (ex. : 06 12 34 56 78).';
  if (v.email.trim() && !emailOk(v.email)) e.email = 'Adresse e-mail invalide.';
  return e;
}

export default function Reservation() {
  const scope = useRef(null);
  const [ok, setOk] = useState(null);
  useReveal(scope);
  const f = useForm(
    { prestation: '', coiffeur: 'peu-importe', date: '', heure: '', nom: '', telephone: '', email: '' },
    useCallback(valider, []),
    (v) => setOk(v),
  );
  const v = f.values;
  const p = toutes.find((x) => x.id === v.prestation);
  // créneaux : on masque ceux du samedi après 17 h (fermeture à 18 h)
  const jour = v.date ? parseIso(v.date).getDay() : null;
  const dispo = creneaux.filter((c) => !(jour === 6 && c >= '17:00'));
  const err = (k) =>
    f.show(k) && (
      <p id={`${k}-err`} role="alert" className="mt-1.5 text-sm text-[#b3261e]">
        {f.errors[k]}
      </p>
    );
  const label = 'block text-xs uppercase tracking-[0.25em] text-taupe';

  return (
    <section id="reserver" ref={scope} className="section bg-poudre/40" aria-labelledby="resa-titre">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="numero text-lg" data-reveal>
            vi.
          </p>
          <h2 id="resa-titre" className="mt-2 text-5xl leading-[1] md:text-7xl" data-reveal>
            Prendre <em className="text-poudre-fonce">rendez-vous</em>
          </h2>
          <p className="mt-5 text-lg text-taupe" data-reveal>
            Choisissez votre prestation et votre créneau : nous confirmons par SMS dans l’heure.
          </p>
          {p && (
            <p className="mt-8 rounded-2xl bg-creme p-5" aria-live="polite" data-reveal>
              <span className="block font-serif text-2xl">{p.nom}</span>
              <span className="text-taupe">
                {p.duree} min · <strong className="font-serif text-xl italic text-poudre-fonce">{p.prix} €</strong>
              </span>
            </p>
          )}
        </div>
        <div data-reveal className="rounded-[2rem] bg-creme p-6 shadow-[0_30px_60px_-40px_rgb(28_26_26/0.5)] md:p-10">
          {ok ? (
            <div className="py-6 text-center" role="status">
              <p className="font-serif text-5xl italic text-poudre-fonce">Merci&nbsp;!</p>
              <p className="mt-4 text-lg">
                {toutes.find((x) => x.id === ok.prestation).nom}, le{' '}
                {parseIso(ok.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à{' '}
                {ok.heure.replace(':', ' h ')}
                {ok.coiffeur !== 'peu-importe' ? ` avec ${equipe.find((e) => e.id === ok.coiffeur).nom}` : ''}.
              </p>
              <p className="mt-2 text-taupe">Confirmation par SMS au {ok.telephone}.</p>
              <p className="mt-6 rounded-xl bg-lin px-4 py-3 text-xs text-taupe">
                Site de démonstration : aucun rendez-vous n’est réellement transmis.
              </p>
              <button type="button" className="btn btn-ligne mt-6" onClick={() => (setOk(null), f.reset())}>
                Nouveau rendez-vous
              </button>
            </div>
          ) : (
            <form ref={f.form} noValidate onSubmit={f.submit} className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="prestation" className={label}>
                  Prestation
                </label>
                <select className="field" value={v.prestation} onChange={f.set('prestation')} {...f.field('prestation')}>
                  <option value="">Choisir…</option>
                  {prestations.map((c) => (
                    <optgroup key={c.categorie} label={c.categorie}>
                      {c.items.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.nom} — {i.prix} €
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {err('prestation')}
              </div>
              <fieldset className="sm:col-span-2">
                <legend className={label}>Avec</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[{ id: 'peu-importe', nom: 'Peu importe' }, ...equipe].map((e) => (
                    <label
                      key={e.id}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${v.coiffeur === e.id ? 'border-encre bg-encre text-creme' : 'border-encre/25 hover:border-encre'}`}
                    >
                      <input
                        type="radio"
                        name="coiffeur"
                        value={e.id}
                        checked={v.coiffeur === e.id}
                        onChange={f.set('coiffeur')}
                        className="sr-only"
                      />
                      {e.nom}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="sm:col-span-2">
                <label htmlFor="date" className={label}>
                  Date
                </label>
                <input
                  type="date"
                  min={isoLocal(new Date())}
                  className="field"
                  value={v.date}
                  onChange={(e) => (f.setValue('heure', ''), f.set('date')(e))}
                  {...f.field('date')}
                />
                {err('date')}
              </div>
              <fieldset className="sm:col-span-2" aria-describedby={f.show('heure') ? 'heure-err' : undefined}>
                <legend className={label}>Horaire</legend>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {dispo.map((c) => (
                    <label
                      key={c}
                      className={`flex min-h-11 cursor-pointer items-center justify-center rounded-xl border text-sm transition-colors ${v.heure === c ? 'border-poudre-fonce bg-poudre-fonce text-creme' : 'border-encre/15 hover:border-poudre-fonce'}`}
                    >
                      <input type="radio" name="heure" value={c} checked={v.heure === c} onChange={f.set('heure')} className="sr-only" />
                      {c.replace(':', ' h ')}
                    </label>
                  ))}
                </div>
                {err('heure')}
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
                  E-mail (facultatif)
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
              <button type="submit" className="btn btn-encre sm:col-span-2">
                Confirmer mon rendez-vous
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
