import { Suspense, useLayoutEffect, useRef, useState } from 'react';
import Counter from '@demos/shared/components/Counter.jsx';
import Faq from '@demos/shared/components/Faq.jsx';
import { useForm } from '@demos/shared/hooks/useForm.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { emailOk, formatEuros, parseIso, telOk } from '@demos/shared/lib/validation.js';
import { actions, adhesions, agenda, asso, disponibilites, faq, impact, missions, montantsDon, reductionImpot } from '../data/site';


function Titre({ tag, children, intro, id, couleur = 'text-coquelicot' }) {
  return (
    <div className="max-w-3xl">
      <p className={`font-display text-sm font-extrabold uppercase tracking-[0.15em] ${couleur}`} data-reveal>
        {tag}
      </p>
      <h2 id={id} className="mt-3 text-4xl leading-[1.05] text-foret md:text-6xl" data-reveal>
        {children}
      </h2>
      {intro && (
        <p className="mt-5 text-lg leading-relaxed text-gris" data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}

function Erreur({ f, k }) {
  return f.show(k) ? (
    <p id={`${k}-err`} className="mt-1.5 text-sm font-bold text-coquelicot">
      {f.errors[k]}
    </p>
  ) : null;
}

/* ---------------------------------------------------------------- */

/* ---------------------------------------------------------------- */

export function Actions() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="actions" ref={scope} className="section bg-creme" aria-labelledby="ac-titre">
      <div className="mx-auto max-w-7xl">
        <Titre
          tag="Nos actions"
          id="ac-titre"
          intro="Quatre activités portées par des bénévoles, ouvertes à tous les habitants. Gratuites ou presque."
        >
          Ce qu’on fait <span className="feutre">ensemble</span>
        </Titre>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((a, i) => (
            <li key={a.id} data-reveal className="min-w-0">
              <article
                className="group h-full rounded-[2rem] border-2 border-foret/10 bg-white p-6 transition-transform duration-300 hover:-translate-y-2"
                style={{ rotate: `${i % 2 ? 1 : -1}deg` }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-12"
                  style={{ background: a.couleur }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={a.icone} />
                  </svg>
                </span>
                <h3 className="mt-5 text-2xl text-foret">{a.titre}</h3>
                <p className="mt-2 leading-relaxed text-gris">{a.texte}</p>
                <p className="pastille mt-4 bg-sable text-foret">{a.quand}</p>
              </article>
            </li>
          ))}
        </ul>
        <ul className="mt-16 grid grid-cols-2 gap-6 rounded-[2rem] bg-foret p-8 text-creme md:grid-cols-4 md:p-10">
          {impact.map((x) => (
            <li key={x.label} data-reveal className="min-w-0">
              <Counter
                value={x.valeur}
                decimals={x.decimales || 0}
                suffix={x.suffixe}
                className="block font-display text-5xl font-extrabold text-soleil"
              />
              <p className="mt-1 text-sm text-creme/80">{x.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

const FILTRES = [
  ['tous', 'Tout'],
  ['jardin', 'Jardin'],
  ['repair', 'Repair café'],
  ['fete', 'Fêtes & repas'],
];
const COULEUR_TYPE = { jardin: '#7fb069', repair: '#f2b84b', epicerie: '#e5533d', fete: '#f08aa0', asso: '#4a7bd0' };

export function Agenda() {
  const scope = useRef(null);
  const [filtre, setFiltre] = useState('tous');
  const [inscrit, setInscrit] = useState({});
  useReveal(scope, [filtre]);
  const liste = agenda.filter((e) => filtre === 'tous' || e.type === filtre || (filtre === 'fete' && e.type === 'asso'));
  return (
    <section id="agenda" ref={scope} className="section bg-sable" aria-labelledby="ag-titre">
      <div className="mx-auto max-w-5xl">
        <Titre tag="Agenda" id="ag-titre" couleur="text-ciel" intro="Inscrivez-vous en un clic : on vous garde une place.">
          Les prochains rendez-vous
        </Titre>
        <div role="group" aria-label="Filtrer les événements" className="mt-8 flex flex-wrap gap-2" data-reveal>
          {FILTRES.map(([id, l]) => (
            <button
              key={id}
              type="button"
              aria-pressed={filtre === id}
              onClick={() => setFiltre(id)}
              className={`rounded-full px-4 py-2 font-bold transition-colors ${filtre === id ? 'bg-foret text-creme' : 'bg-white text-foret hover:bg-mousse/30'}`}
            >
              {l}
            </button>
          ))}
        </div>
        <ul className="mt-8 space-y-4">
          {liste.map((e) => {
            const d = parseIso(e.date);
            const ok = !!inscrit[e.id];
            const n = e.inscrits + (ok ? 1 : 0);
            const reste = e.places - n;
            return (
              <li key={e.id} data-reveal>
                <article className="flex flex-col gap-4 rounded-3xl bg-white p-5 sm:flex-row sm:items-center">
                  <div className="flex shrink-0 items-center gap-4">
                    <p
                      className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl text-white"
                      style={{ background: COULEUR_TYPE[e.type] }}
                    >
                      <span className="font-display text-3xl font-extrabold leading-none">{d.getDate()}</span>
                      <span className="text-sm font-bold uppercase">{d.toLocaleDateString('fr-FR', { month: 'short' })}</span>
                    </p>
                    <div className="min-w-0 sm:hidden">
                      <p className="text-sm font-bold capitalize text-gris">{d.toLocaleDateString('fr-FR', { weekday: 'long' })}</p>
                      <p className="text-sm text-gris">{e.heure}</p>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl text-foret">{e.titre}</h3>
                    <p className="text-gris">
                      <span className="capitalize max-sm:hidden">
                        {d.toLocaleDateString('fr-FR', { weekday: 'long' })} · {e.heure} ·{' '}
                      </span>
                      {e.lieu}
                    </p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-sable" aria-hidden="true">
                      <div
                        className="h-full rounded-full bg-mousse transition-[width] duration-500"
                        style={{ width: `${(n / e.places) * 100}%` }}
                      />
                    </div>
                    <p className="mt-1 text-sm text-gris">
                      {reste > 0 ? `${reste} place${reste > 1 ? 's' : ''} restante${reste > 1 ? 's' : ''}` : 'Complet'}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={!ok && reste <= 0}
                    aria-pressed={ok}
                    onClick={() => setInscrit((o) => ({ ...o, [e.id]: !o[e.id] }))}
                    className={`btn shrink-0 ${ok ? 'btn-ligne' : 'btn-foret'} disabled:opacity-40`}
                  >
                    {ok ? '✓ Inscrit·e' : 'Je participe'}
                  </button>
                </article>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm text-gris" aria-live="polite">
          {Object.values(inscrit).filter(Boolean).length > 0 && 'Inscription notée (démonstration : rien n’est envoyé).'}
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

const validerBenevole = (v) => {
  const e = {};
  if (v.missions.length === 0) e.missions = 'Choisissez au moins une mission.';
  if (!v.dispo) e.dispo = 'Indiquez vos disponibilités.';
  if (v.nom.trim().length < 2) e.nom = 'Indiquez votre prénom et nom.';
  if (!emailOk(v.email)) e.email = 'Adresse e-mail invalide.';
  if (v.telephone && !telOk(v.telephone)) e.telephone = 'Numéro invalide (ex. 06 12 34 56 78).';
  return e;
};

export function Benevole() {
  const scope = useRef(null);
  const [ok, setOk] = useState(null);
  const f = useForm({ missions: [], dispo: '', nom: '', email: '', telephone: '', message: '' }, validerBenevole, (v) => setOk(v));
  const v = f.values;
  useReveal(scope);
  const toggle = (m) => f.setValue('missions', v.missions.includes(m) ? v.missions.filter((x) => x !== m) : [...v.missions, m]);
  return (
    <section id="benevole" ref={scope} className="section bg-creme" aria-labelledby="bn-titre">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Titre
            tag="Bénévolat"
            id="bn-titre"
            couleur="text-mousse"
            intro="Une heure par mois ou tous les mardis : chaque coup de main compte. On vous rappelle pour faire connaissance."
          >
            Donnez un peu de <span className="feutre">votre temps</span>
          </Titre>
          <ul className="mt-8 space-y-3 text-lg" data-reveal>
            {['Aucune compétence requise', 'Formation et binôme au démarrage', 'Assurance prise en charge par l’association'].map((x) => (
              <li key={x} className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mousse text-sm text-white">✓</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="min-w-0 rounded-[2rem] bg-white p-5 shadow-[0_6px_0_#e4dccb] md:p-8">
          {ok ? (
            <div role="status" className="py-8 text-center">
              <p className="mt-4 font-display text-3xl font-extrabold text-foret">Bienvenue {ok.nom.split(' ')[0]} !</p>
              <p className="mx-auto mt-3 max-w-sm leading-relaxed text-gris">
                Merci pour votre envie de rejoindre {ok.missions.join(', ').toLowerCase()}. Un membre de l’équipe vous écrit cette semaine à{' '}
                {ok.email}.
              </p>
              <p className="mt-4 text-sm text-gris">(Démonstration : aucun message n’a été envoyé.)</p>
              <button
                type="button"
                className="btn btn-ligne mt-6"
                onClick={() => {
                  f.reset();
                  setOk(null);
                }}
              >
                Nouvelle inscription
              </button>
            </div>
          ) : (
            <form ref={f.form} noValidate onSubmit={f.submit} className="grid gap-5 sm:grid-cols-2">
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 font-bold">Ce qui vous tente</legend>
                <div className="flex flex-wrap gap-2">
                  {missions.map((m, i) => (
                    <label key={m} className="cursor-pointer">
                      <input
                        type="checkbox"
                        name={i === 0 ? 'missions' : undefined}
                        checked={v.missions.includes(m)}
                        onChange={() => toggle(m)}
                        className="peer sr-only"
                        aria-invalid={f.show('missions') ? 'true' : 'false'}
                      />
                      <span className="block rounded-full border-2 border-[#e4dccb] px-4 py-2 font-bold transition-colors peer-checked:border-mousse peer-checked:bg-mousse peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-ciel">
                        {m}
                      </span>
                    </label>
                  ))}
                </div>
                <Erreur f={f} k="missions" />
              </fieldset>
              <div className="sm:col-span-2">
                <label htmlFor="dispo" className="mb-1.5 block font-bold">
                  Disponibilités
                </label>
                <select className="field" value={v.dispo} onChange={f.set('dispo')} {...f.field('dispo')}>
                  <option value="">Choisir…</option>
                  {disponibilites.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <Erreur f={f} k="dispo" />
              </div>
              <div>
                <label htmlFor="nom" className="mb-1.5 block font-bold">
                  Prénom et nom
                </label>
                <input autoComplete="name" className="field" value={v.nom} onChange={f.set('nom')} {...f.field('nom')} />
                <Erreur f={f} k="nom" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block font-bold">
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
                <label htmlFor="telephone" className="mb-1.5 block font-bold">
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
                <label htmlFor="message" className="mb-1.5 block font-bold">
                  Un mot sur vous (facultatif)
                </label>
                <textarea rows={3} className="field" value={v.message} onChange={f.set('message')} {...f.field('message')} />
              </div>
              <button type="submit" className="btn btn-foret sm:col-span-2">
                Je deviens bénévole
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

/** Ce que permet un don (équivalences concrètes). */
const equivalence = (m) => {
  if (m >= 200) return 'un an de semences pour tout le jardin partagé';
  if (m >= 100) return 'un mois de produits frais pour 4 familles';
  if (m >= 50) return 'les fournitures de l’aide aux devoirs pour 10 élèves';
  if (m >= 20) return 'les pièces détachées d’un repair café';
  return 'un vrai coup de pouce à nos actions';
};

const validerDon = (v) => {
  const e = {};
  if (!(v.montant >= 5)) e.montant = 'Montant minimum : 5 €.';
  if (v.nom.trim().length < 2) e.nom = 'Indiquez votre nom (pour le reçu fiscal).';
  if (!emailOk(v.email)) e.email = 'Adresse e-mail invalide.';
  return e;
};
const validerAdhesion = (v) => {
  const e = {};
  if (v.nom.trim().length < 2) e.nom = 'Indiquez votre nom.';
  if (!emailOk(v.email)) e.email = 'Adresse e-mail invalide.';
  return e;
};

function Don() {
  const [ok, setOk] = useState(null);
  const f = useForm({ montant: 50, rythme: 'unique', nom: '', email: '' }, validerDon, (v) => setOk(v));
  const v = f.values;
  const net = Math.max(0, v.montant || 0) * (1 - reductionImpot);
  const cout = useRef(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (reduced || !cout.current) return;
    gsap.fromTo(cout.current, { scale: 1.15 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
  }, [v.montant, reduced]);
  if (ok)
    return (
      <div role="status" className="py-8 text-center">
        <p className="mt-4 font-display text-3xl font-extrabold text-foret">Merci {ok.nom.split(' ')[0]} !</p>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-gris">
          Votre don {ok.rythme === 'mensuel' ? 'mensuel ' : ''}de {formatEuros(ok.montant)} finance {equivalence(ok.montant)}. Le reçu
          fiscal serait envoyé à {ok.email}.
        </p>
        <p className="mt-4 text-sm text-gris">(Démonstration : aucun paiement n’a été effectué.)</p>
        <button
          type="button"
          className="btn btn-ligne mt-6"
          onClick={() => {
            f.reset();
            setOk(null);
          }}
        >
          Retour
        </button>
      </div>
    );
  return (
    <form ref={f.form} noValidate onSubmit={f.submit} className="grid gap-5">
      <div role="radiogroup" aria-label="Fréquence du don" className="grid grid-cols-2 gap-2 rounded-full bg-sable p-1">
        {[
          ['unique', 'Une fois'],
          ['mensuel', 'Chaque mois'],
        ].map(([id, l]) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={v.rythme === id}
            onClick={() => f.setValue('rythme', id)}
            className={`rounded-full py-2.5 font-bold transition-colors ${v.rythme === id ? 'bg-white text-foret shadow' : 'text-gris'}`}
          >
            {l}
          </button>
        ))}
      </div>
      <fieldset>
        <legend className="mb-2 font-bold">Montant</legend>
        <div className="grid grid-cols-4 gap-2">
          {montantsDon.map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={v.montant === m}
              onClick={() => f.setValue('montant', m)}
              className={`rounded-2xl border-2 py-3 font-display text-xl font-extrabold transition-colors ${v.montant === m ? 'border-coquelicot bg-coquelicot text-white' : 'border-[#e4dccb] text-foret hover:border-coquelicot'}`}
            >
              {m} €
            </button>
          ))}
        </div>
        <label htmlFor="montant" className="mt-3 block text-sm text-gris">
          Autre montant (€)
        </label>
        <input
          type="number"
          min={5}
          step={1}
          inputMode="numeric"
          className="field mt-1"
          value={v.montant || ''}
          onChange={f.set('montant')}
          {...f.field('montant')}
        />
        <Erreur f={f} k="montant" />
      </fieldset>
      <p className="rounded-2xl bg-mousse/15 p-4 leading-relaxed text-foret">
        Après réduction d’impôt (66 %), votre don ne vous coûte que{' '}
        <strong ref={cout} className="inline-block font-display text-2xl">
          {formatEuros(Math.round(net * 100) / 100)}
        </strong>
        {v.rythme === 'mensuel' ? ' par mois' : ''}. Il finance {equivalence(v.montant || 0)}.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="don-nom" className="mb-1.5 block font-bold">
            Nom
          </label>
          <input autoComplete="name" className="field" value={v.nom} onChange={f.set('nom')} {...f.field('nom')} id="don-nom" />
          <Erreur f={f} k="nom" />
        </div>
        <div>
          <label htmlFor="don-email" className="mb-1.5 block font-bold">
            E-mail
          </label>
          <input
            type="email"
            autoComplete="email"
            className="field"
            value={v.email}
            onChange={f.set('email')}
            {...f.field('email')}
            id="don-email"
          />
          <Erreur f={f} k="email" />
        </div>
      </div>
      <button type="submit" className="btn btn-coquelicot">
        Donner {v.montant ? formatEuros(v.montant) : ''}
        {v.rythme === 'mensuel' ? ' / mois' : ''}
      </button>
    </form>
  );
}

function Adhesion() {
  const [formule, setFormule] = useState('individuel');
  const [ok, setOk] = useState(null);
  const choix = adhesions.find((a) => a.id === formule);
  const f = useForm({ nom: '', email: '' }, validerAdhesion, (v) => setOk({ ...v, choix }));
  if (ok)
    return (
      <div role="status" className="py-8 text-center">
        <p className="mt-4 font-display text-3xl font-extrabold text-foret">Bienvenue chez Les Racines !</p>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-gris">
          Adhésion « {ok.choix.nom} » ({formatEuros(ok.choix.prix)}) notée pour {ok.nom}. Votre carte d’adhérent serait envoyée à {ok.email}
          .
        </p>
        <p className="mt-4 text-sm text-gris">(Démonstration : aucun paiement n’a été effectué.)</p>
        <button
          type="button"
          className="btn btn-ligne mt-6"
          onClick={() => {
            f.reset();
            setOk(null);
          }}
        >
          Retour
        </button>
      </div>
    );
  return (
    <form ref={f.form} noValidate onSubmit={f.submit} className="grid gap-5">
      <fieldset>
        <legend className="mb-2 font-bold">Formule (valable un an)</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {adhesions.map((a) => (
            <label key={a.id} className="cursor-pointer">
              <input
                type="radio"
                name="formule"
                value={a.id}
                checked={formule === a.id}
                onChange={() => setFormule(a.id)}
                className="peer sr-only"
              />
              <span className="flex h-full flex-col rounded-2xl border-2 border-[#e4dccb] p-4 transition-colors peer-checked:border-foret peer-checked:bg-foret/5 peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-ciel">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-foret">{a.nom}</span>
                  <span className="font-display text-2xl font-extrabold text-foret">{a.prix} €</span>
                </span>
                <span className="mt-1 text-sm text-gris">{a.texte}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ad-nom" className="mb-1.5 block font-bold">
            Nom
          </label>
          <input autoComplete="name" className="field" value={f.values.nom} onChange={f.set('nom')} {...f.field('nom')} id="ad-nom" />
          <Erreur f={f} k="nom" />
        </div>
        <div>
          <label htmlFor="ad-email" className="mb-1.5 block font-bold">
            E-mail
          </label>
          <input
            type="email"
            autoComplete="email"
            className="field"
            value={f.values.email}
            onChange={f.set('email')}
            {...f.field('email')}
            id="ad-email"
          />
          <Erreur f={f} k="email" />
        </div>
      </div>
      <button type="submit" className="btn btn-foret">
        Adhérer pour {formatEuros(choix.prix)}
      </button>
    </form>
  );
}

export function Soutenir() {
  const scope = useRef(null);
  const [onglet, setOnglet] = useState('don');
  useReveal(scope);
  return (
    <section id="soutenir" ref={scope} className="section bg-sable" aria-labelledby="so-titre">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Titre
            tag="Nous soutenir"
            id="so-titre"
            intro="L’association vit grâce à ses adhérents et à ses donateurs. Chaque euro reste dans le quartier."
          >
            Faites grandir <span className="feutre">l’arbre</span>
          </Titre>
          <p className="mt-6 leading-relaxed text-gris" data-reveal>
            Association loi 1901 d’intérêt général · RNA {asso.rna}. Reçu fiscal envoyé pour tout don.
          </p>
        </div>
        <div data-reveal className="min-w-0 rounded-[2rem] bg-white p-5 shadow-[0_6px_0_#e4dccb] md:p-8">
          <div role="tablist" aria-label="Choisir comment soutenir" className="mb-6 flex gap-2">
            {[
              ['don', 'Faire un don'],
              ['adhesion', 'Adhérer'],
            ].map(([id, l]) => (
              <button
                key={id}
                id={`tab-${id}`}
                type="button"
                role="tab"
                aria-selected={onglet === id}
                aria-controls={`panel-${id}`}
                onClick={() => setOnglet(id)}
                className={`flex-1 rounded-full py-3 font-display text-lg font-extrabold transition-colors ${onglet === id ? 'bg-foret text-creme' : 'bg-sable text-foret'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <div id={`panel-${onglet}`} role="tabpanel" aria-labelledby={`tab-${onglet}`}>
            {onglet === 'don' ? <Don /> : <Adhesion />}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="faq" ref={scope} className="section bg-creme" aria-labelledby="faq-titre">
      <div className="mx-auto max-w-3xl">
        <Titre tag="Questions fréquentes" id="faq-titre" couleur="text-ciel">
          Vous vous demandez…
        </Titre>
        <div className="mt-10 space-y-3">
          <Faq
            items={faq}
            classes={{
              item: 'rounded-3xl bg-white px-5',
              button: 'flex w-full items-center justify-between gap-6 py-5 text-left font-display text-xl font-bold text-foret',
              icon: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soleil text-xl text-foret',
              answer: 'pb-5 leading-relaxed text-gris',
            }}
          />
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="contact" ref={scope} className="section bg-foret text-creme" aria-labelledby="ct-titre">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
        <div>
          <h2 id="ct-titre" className="text-4xl md:text-6xl" data-reveal>
            Passez nous voir !
          </h2>
          <p className="mt-4 text-lg text-creme/80" data-reveal>
            {asso.adresse}
          </p>
          <div className="mt-6 flex flex-wrap gap-3" data-reveal>
            <a href={`tel:${asso.telephoneLien}`} className="btn bg-soleil text-foret shadow-[0_4px_0_#b9822a]">
              Appeler · {asso.telephone}
            </a>
            <a href={`mailto:${asso.email}`} className="btn shadow-[inset_0_0_0_2px_#fbf6ea]">
              {asso.email}
            </a>
          </div>
        </div>
        <dl className="grid gap-3 self-end" data-reveal>
          {asso.horaires.map(([j, h]) => (
            <div key={j} className="flex justify-between border-b-2 border-dashed border-creme/20 pb-3 text-lg">
              <dt className="font-bold">{j}</dt>
              <dd className="text-creme/80">{h}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
