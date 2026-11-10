import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { emailOk, isoLocal, parseIso, telOk } from '@demos/shared/lib/validation.js';
import { agences, modeles, options } from '../data/site';
import { Check } from './Icons';
import SectionTitle from './SectionTitle';

const jours = (a, b) => Math.max(1, Math.round((parseIso(b) - parseIso(a)) / 864e5));

function valider(v) {
  const e = {};
  const today = isoLocal(new Date());
  if (!v.depart) e.depart = 'Choisissez la date de départ.';
  else if (v.depart < today) e.depart = 'Cette date est passée.';
  if (!v.retour) e.retour = 'Choisissez la date de retour.';
  else if (v.depart && v.retour <= v.depart) e.retour = 'Le retour doit être après le départ.';
  if (v.nom.trim().length < 2) e.nom = 'Indiquez votre nom.';
  if (!telOk(v.telephone)) e.telephone = 'Numéro invalide (ex. : 06 12 34 56 78).';
  if (!emailOk(v.email)) e.email = 'Adresse e-mail invalide.';
  if (!v.age) e.age = 'Cette condition est obligatoire pour louer.';
  return e;
}

/** Prix animé (le total "défile" quand il change). */
function Prix({ value }) {
  const el = useRef(null);
  const last = useRef(value);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (!el.current) return;
    if (reduced) {
      el.current.textContent = value + ' €';
      return;
    }
    const s = { v: last.current };
    const t = gsap.to(s, {
      v: value,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => el.current && (el.current.textContent = Math.round(s.v) + ' €'),
    });
    last.current = value;
    return () => t.kill();
  }, [value, reduced]);
  return <span ref={el}>{value} €</span>;
}

export default function Reservation({ model, onModel }) {
  const scope = useRef(null);
  const form = useRef(null);
  const [v, setV] = useState({ depart: '', retour: '', agence: agences[0].id, options: [], nom: '', telephone: '', email: '', age: false });
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const [ok, setOk] = useState(null);
  useReveal(scope);
  const m = modeles.find((x) => x.id === model);
  const errors = useMemo(() => valider(v), [v]);
  const show = (k) => (touched[k] || sent) && errors[k];
  const n = v.depart && v.retour && v.retour > v.depart ? jours(v.depart, v.retour) : 1;
  const opts = options.filter((o) => v.options.includes(o.id));
  const total = m.prix * n + opts.reduce((s, o) => s + o.prixJour * n, 0);
  const set = (k) => (e) => setV((o) => ({ ...o, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const aria = (k) => ({ 'aria-invalid': show(k) ? 'true' : 'false', 'aria-describedby': show(k) ? `${k}-err` : undefined });
  const err = (k) =>
    show(k) && (
      <p id={`${k}-err`} role="alert" className="mt-1.5 text-sm text-course-vif">
        {errors[k]}
      </p>
    );
  const toggleOpt = (id) =>
    setV((o) => ({ ...o, options: o.options.includes(id) ? o.options.filter((x) => x !== id) : [...o.options, id] }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    const first = Object.keys(errors)[0];
    if (first) return form.current.querySelector(`[name="${first}"]`)?.focus();
    // Démo : aucune réservation n'est transmise. Brancher ici un vrai service.
    setOk({ ...v, n, total, modele: m.nom, ref: 'VEL-' + String(Date.now()).slice(-6) });
  };

  const today = isoLocal(new Date());
  const label = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-ivoire/70';

  return (
    <section id="reserver" ref={scope} className="section vitesse bg-laque" aria-labelledby="resa-titre">
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="resa-titre" surtitre="Réservation" title="Votre voiture, en deux minutes." />
        <div data-reveal className="mt-12 grid border border-ivoire/10 lg:grid-cols-[1.4fr_1fr]">
          {ok ? (
            <div className="p-8 text-center lg:col-span-2" role="status">
              <span className="mx-auto flex h-16 w-16 items-center justify-center bg-course text-3xl">
                <Check />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold uppercase">C’est réservé, {ok.nom.trim().split(' ')[0]} !</h3>
              <p className="mt-3 text-ivoire/75">
                {ok.modele}, {ok.n} jour{ok.n > 1 ? 's' : ''}, du {parseIso(ok.depart).toLocaleDateString('fr-FR')} au{' '}
                {parseIso(ok.retour).toLocaleDateString('fr-FR')}. Total : <strong>{ok.total} €</strong>.
              </p>
              <p className="mt-2 text-sm text-ivoire/55">
                Référence {ok.ref} · confirmation envoyée à {ok.email}
              </p>
              <p className="mx-auto mt-6 max-w-md bg-ivoire/5 px-4 py-3 text-xs text-ivoire/50">
                Site de démonstration : aucune réservation n’est réellement transmise.
              </p>
              <button type="button" className="btn btn-ligne mt-6" onClick={() => (setOk(null), setSent(false), setTouched({}))}>
                Nouvelle réservation
              </button>
            </div>
          ) : (
            <>
              <form ref={form} noValidate onSubmit={submit} className="grid gap-5 p-5 sm:grid-cols-2 md:p-8">
                <div className="sm:col-span-2">
                  <label htmlFor="modele" className={label}>
                    Modèle
                  </label>
                  <select id="modele" className="field" value={model} onChange={(e) => onModel(e.target.value)}>
                    {modeles.map((x) => (
                      <option key={x.id} value={x.id}>
                        {x.categorie} — {x.nom} ({x.prix} € / jour)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="depart" className={label}>
                    Départ
                  </label>
                  <input
                    id="depart"
                    name="depart"
                    type="date"
                    min={today}
                    className="field"
                    value={v.depart}
                    onChange={set('depart')}
                    onBlur={blur('depart')}
                    {...aria('depart')}
                  />
                  {err('depart')}
                </div>
                <div>
                  <label htmlFor="retour" className={label}>
                    Retour
                  </label>
                  <input
                    id="retour"
                    name="retour"
                    type="date"
                    min={v.depart || today}
                    className="field"
                    value={v.retour}
                    onChange={set('retour')}
                    onBlur={blur('retour')}
                    {...aria('retour')}
                  />
                  {err('retour')}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="agence" className={label}>
                    Agence de départ
                  </label>
                  <select id="agence" className="field" value={v.agence} onChange={set('agence')}>
                    {agences.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.nom} — {a.adresse}
                      </option>
                    ))}
                    <option value="livraison">Livraison à domicile (+29 €)</option>
                  </select>
                </div>
                <fieldset className="sm:col-span-2">
                  <legend className={label}>Options</legend>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {options.map((o) => {
                      const on = v.options.includes(o.id);
                      return (
                        <label
                          key={o.id}
                          className={`flex cursor-pointer items-center gap-3 border px-3 py-3 text-sm transition-colors ${on ? 'border-course bg-course/10' : 'border-ivoire/15 hover:border-ivoire/35'}`}
                        >
                          <input type="checkbox" checked={on} onChange={() => toggleOpt(o.id)} className="h-4 w-4 accent-[#e10600]" />
                          <span>
                            {o.label}
                            <span className="block text-xs text-ivoire/50">+{o.prixJour} € / jour</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                <div className="sm:col-span-2">
                  <label htmlFor="nom" className={label}>
                    Nom complet
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
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-ivoire/80">
                    <input
                      type="checkbox"
                      name="age"
                      checked={v.age}
                      onChange={set('age')}
                      onBlur={blur('age')}
                      className="mt-0.5 h-4 w-4 accent-[#e10600]"
                      {...aria('age')}
                    />
                    J’ai 21 ans ou plus et mon permis depuis au moins deux ans.
                  </label>
                  {err('age')}
                </div>
                <button type="submit" className="btn btn-course sm:col-span-2">
                  Confirmer la réservation
                </button>
              </form>
              <aside
                className="flex flex-col justify-between gap-6 border-t border-ivoire/10 bg-carbone p-5 md:p-8 lg:border-l lg:border-t-0"
                aria-live="polite"
              >
                <div>
                  <p className="surtitre">Récapitulatif</p>
                  <p className="mt-3 font-display text-xl font-bold uppercase">{m.nom}</p>
                  <ul className="mt-5 space-y-2 text-sm text-ivoire/70">
                    <li className="flex justify-between">
                      <span>
                        {m.prix} € × {n} jour{n > 1 ? 's' : ''}
                      </span>
                      <span>{m.prix * n} €</span>
                    </li>
                    {opts.map((o) => (
                      <li key={o.id} className="flex justify-between">
                        <span>{o.label}</span>
                        <span>{o.prixJour * n} €</span>
                      </li>
                    ))}
                    <li className="flex justify-between text-ivoire/50">
                      <span>Assurance & assistance</span>
                      <span>incluses</span>
                    </li>
                    <li className="flex justify-between text-ivoire/50">
                      <span>Kilométrage</span>
                      <span>{200 * n} km inclus</span>
                    </li>
                  </ul>
                </div>
                <p className="flex items-end justify-between border-t border-ivoire/10 pt-5">
                  <span className="text-sm uppercase tracking-wider text-ivoire/60">Total TTC</span>
                  <span className="font-display text-4xl font-bold text-course-vif">
                    <Prix value={total + (v.agence === 'livraison' ? 29 : 0)} />
                  </span>
                </p>
              </aside>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
