import { Suspense, lazy, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Counter from '@demos/shared/components/Counter.jsx';
import Faq from '@demos/shared/components/Faq.jsx';
import { useForm } from '@demos/shared/hooks/useForm.js';
import { useHero3D } from '@demos/shared/hooks/useHero3D.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { formatEuros, telOk } from '@demos/shared/lib/validation.js';
import { allergenes, avis, categories, chiffres, faq, formule, horaires, produits, snack } from '../data/site';

const BurgerScene = lazy(() => import('../three/BurgerScene'));

function Titre({ tag, children, intro, id, couleur = 'bg-ketchup text-white' }) {
  return (
    <div className="max-w-3xl">
      <p className={`sticker -rotate-2 ${couleur}`} data-reveal>
        {tag}
      </p>
      <h2 id={id} className="mt-4 text-5xl leading-[0.95] md:text-7xl" data-reveal>
        {children}
      </h2>
      {intro && (
        <p className="mt-4 text-lg text-gris" data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}

const TAGS = {
  veggie: ['🌱 Veggie', 'bg-cornichon text-white'],
  piment: ['🌶 Piquant', 'bg-ketchup text-white'],
  star: ['★ Best-seller', 'bg-moutarde'],
};

/* ---------------------------------------------------------------- */

export function Hero({ onReady }) {
  const section = useRef(null);
  const { progress, reduced, inView, tier, load3d } = useHero3D(section, { onReady });
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-mot]', { scale: 0.3, rotate: -12, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(2.5)', delay: 0.25 });
      gsap.from('[data-in]', { y: 20, opacity: 0, stagger: 0.08, duration: 0.6, delay: 0.7 });
      gsap.to('[data-badge]', { rotate: 360, duration: 14, repeat: -1, ease: 'none' });
    }, section);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section id="accueil" ref={section} className={`relative ${reduced ? '' : 'h-[220svh]'}`} aria-label="Accueil">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-moutarde">
        {/* points de trame façon affiche */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 [background:radial-gradient(#1a1714_1.2px,transparent_1.3px)_0_0/18px_18px]"
        />
        {load3d && (
          <Suspense fallback={null}>
            <BurgerScene progress={progress} reduced={reduced} tier={tier} active={inView} onReady={onReady} />
          </Suspense>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-moutarde via-moutarde/90 to-transparent md:hidden" />
        <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-8 md:justify-center md:px-8 md:pb-0">
          <p data-in className="sticker self-start -rotate-2 bg-white">
            📍 {snack.accroche}
          </p>
          <h1 className="mt-4 text-[clamp(3.6rem,15vw,9rem)] leading-[0.85]">
            <span data-mot className="block">
              Smash.
            </span>
            <span data-mot className="block text-ketchup [-webkit-text-stroke:3px_#1a1714] [paint-order:stroke_fill]">
              Crunch.
            </span>
            <span data-mot className="block">
              Miam.
            </span>
          </h1>
          <p data-in className="mt-4 max-w-md text-lg font-medium max-md:hidden">
            {snack.intro}
          </p>
          <div data-in className="pointer-events-auto mt-6 flex flex-wrap gap-3">
            <a href="#commande" className="btn btn-ketchup">
              Commander à emporter
            </a>
            <a href="#carte" className="btn btn-blanc">
              Voir la carte
            </a>
          </div>
        </div>
        {/* badge rotatif « prêt en 15 min » */}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-24 right-4 h-24 w-24 md:bottom-auto md:right-10 md:top-28 md:h-32 md:w-32">
          <svg data-badge viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <path id="cercle" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" />
            </defs>
            <circle cx="50" cy="50" r="48" fill="#e63b2e" stroke="#1a1714" strokeWidth="3" />
            <text fontFamily="Lilita One" fontSize="11.5" fill="#fff" letterSpacing="2">
              <textPath href="#cercle">PRÊT EN 15 MIN · CLICK & COLLECT ·</textPath>
            </text>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-3xl text-white md:text-4xl">15′</span>
        </div>
      </div>
    </section>
  );
}

export function Bandeau() {
  const mots = ['Bœuf du Nord', 'Frites maison', 'Pain brioché local', 'Sauces maison', 'Veggie friendly'];
  return (
    <div className="overflow-hidden border-y-[3px] border-encre bg-ketchup py-3 text-white" aria-hidden="true">
      <div className="defile">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {mots.map((m) => (
              <span key={m} className="flex items-center gap-6 pr-6 font-display text-2xl">
                {m} <span className="text-moutarde">✸</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function Carte({ ajouter, quantites }) {
  const scope = useRef(null);
  const [cat, setCat] = useState('burgers');
  const [veggie, setVeggie] = useState(false);
  const [sansGluten, setSansGluten] = useState(false);
  const reduced = useReducedMotion();
  useReveal(scope, [cat, veggie, sansGluten]);
  const filtres = veggie || sansGluten;
  const liste = produits.filter(
    (p) => (filtres || p.cat === cat) && (!veggie || p.tags.includes('veggie')) && (!sansGluten || !p.allergenes.includes('gluten')),
  );
  const ajout = (p, e) => {
    ajouter(p.id);
    if (reduced) return;
    gsap.fromTo(e.currentTarget, { scale: 0.85, rotate: -8 }, { scale: 1, rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  };
  return (
    <section id="carte" ref={scope} className="section bg-creme" aria-labelledby="carte-titre">
      <div className="mx-auto max-w-6xl">
        <Titre tag="La carte" id="carte-titre" intro="Tout est préparé à la minute. Ajoutez vos envies, la commande se remplit en dessous.">
          Qu’est-ce qui te fait envie ?
        </Titre>
        <div className="mt-8 flex flex-wrap items-center gap-2" data-reveal>
          <div role="tablist" aria-label="Catégories" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={!filtres && cat === c.id}
                onClick={() => {
                  setCat(c.id);
                  setVeggie(false);
                  setSansGluten(false);
                }}
                className={`rounded-full border-[3px] border-encre px-4 py-1.5 font-extrabold transition-transform hover:-rotate-2 ${!filtres && cat === c.id ? 'bg-encre text-moutarde' : 'bg-white'}`}
              >
                {c.nom}
              </button>
            ))}
          </div>
          <span className="mx-1 hidden h-8 w-[3px] bg-encre sm:block" aria-hidden="true" />
          {[
            [veggie, setVeggie, '🌱 Veggie'],
            [sansGluten, setSansGluten, 'Sans gluten'],
          ].map(([v, set, l]) => (
            <button
              key={l}
              type="button"
              aria-pressed={v}
              onClick={() => set(!v)}
              className={`rounded-full border-[3px] border-dashed border-encre px-4 py-1.5 font-extrabold ${v ? 'bg-cornichon text-white' : ''}`}
            >
              {l}
            </button>
          ))}
        </div>
        {filtres && (
          <p className="mt-3 text-sm text-gris" aria-live="polite">
            {liste.length} produit{liste.length > 1 ? 's' : ''} sur toute la carte
          </p>
        )}
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((p, i) => (
            <li key={p.id} data-reveal className="min-w-0">
              <article
                className="carte-pop flex h-full flex-col p-5 transition-transform duration-200 hover:-rotate-1"
                style={{ rotate: `${i % 2 ? 0.6 : -0.6}deg` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl leading-tight">{p.nom}</h3>
                  <p className="shrink-0 font-display text-2xl text-ketchup">{formatEuros(p.prix)}</p>
                </div>
                {p.tags.length > 0 && (
                  <p className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className={`sticker ${TAGS[t][1]}`}>
                        {TAGS[t][0]}
                      </span>
                    ))}
                  </p>
                )}
                <p className="mt-3 flex-1 text-gris">{p.desc}</p>
                <p className="mt-3 text-xs text-gris">
                  <span className="font-bold">Allergènes :</span>{' '}
                  {p.allergenes.length ? p.allergenes.map((a) => allergenes[a]).join(', ') : 'aucun des 14 majeurs'}
                </p>
                <button
                  type="button"
                  onClick={(e) => ajout(p, e)}
                  className="btn btn-moutarde mt-4 w-full"
                  aria-label={`Ajouter ${p.nom} à la commande`}
                >
                  {quantites[p.id] ? `Ajouté × ${quantites[p.id]} · encore +1` : '+ Ajouter'}
                </button>
              </article>
            </li>
          ))}
        </ul>
        {liste.length === 0 && <p className="mt-8 text-lg">Aucun produit ne correspond à ces filtres.</p>}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

/** Créneaux de retrait toutes les 15 min pendant les services, à partir de maintenant + 15 min. */
function useCreneaux() {
  return useMemo(() => {
    const services = [
      [11.5, 14.5],
      [18.5, 22.5],
    ];
    const now = new Date();
    const min = now.getHours() + now.getMinutes() / 60 + 0.25;
    const fmt = (h) => `${Math.floor(h)} h ${String(Math.round((h % 1) * 60)).padStart(2, '0')}`;
    const out = [];
    for (const [a, b] of services) for (let h = a + 0.25; h <= b; h += 0.25) out.push({ h, label: fmt(h), passe: h < min });
    const aujourdhui = out.filter((c) => !c.passe);
    return aujourdhui.length
      ? { jour: 'Aujourd’hui', liste: aujourdhui }
      : { jour: 'Demain', liste: out.map((c) => ({ ...c, passe: false })) };
  }, []);
}

const valider = (v) => {
  const e = {};
  if (!v.creneau) e.creneau = 'Choisissez une heure.';
  if (v.prenom.trim().length < 2) e.prenom = 'Indiquez votre prénom.';
  if (!telOk(v.telephone)) e.telephone = 'Numéro invalide (ex. 06 12 34 56 78).';
  if (v.mode === 'livraison' && v.adresse.trim().length < 6) e.adresse = 'Indiquez l’adresse de livraison.';
  return e;
};

export function Commande({ lignes, setQte, menus, setMenus, vider }) {
  const scope = useRef(null);
  const [ok, setOk] = useState(null);
  const creneaux = useCreneaux();
  useReveal(scope);
  const burgers = lignes.filter((l) => l.p.cat === 'burgers' || l.p.cat === 'poulet');
  const sousTotal = lignes.reduce((s, l) => s + l.p.prix * l.q, 0) + menus * formule.supplement;
  const f = useForm({ mode: 'retrait', creneau: '', prenom: '', telephone: '', adresse: '' }, valider, (v) => {
    setOk({ ...v, total, numero: Math.floor(100 + Math.random() * 899), jour: creneaux.jour });
    vider();
  });
  const v = f.values;
  const liv = snack.livraison;
  const frais = v.mode === 'livraison' && sousTotal < liv.offerteDes ? liv.frais : 0;
  const total = sousTotal + frais;
  const tropPeu = v.mode === 'livraison' && sousTotal < liv.minimum;
  return (
    <section id="commande" ref={scope} className="section bg-cornichon/15" aria-labelledby="cmd-titre">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Titre
            tag="Click & collect"
            id="cmd-titre"
            couleur="bg-cornichon text-white"
            intro={`Commandez maintenant, récupérez dans ${snack.retraitMinutes} minutes. Ou faites-vous livrer dans tout Lille.`}
          >
            Ta commande
          </Titre>
          <div className="carte-pop mt-8 p-5" data-reveal>
            {lignes.length === 0 ? (
              <p className="py-6 text-center text-gris">
                Rien pour l’instant…{' '}
                <a href="#carte" className="font-bold text-ketchup underline">
                  Choisis dans la carte
                </a>{' '}
                🍔
              </p>
            ) : (
              <ul className="divide-y-2 divide-dashed divide-encre/20">
                {lignes.map(({ p, q }) => (
                  <li key={p.id} className="flex items-center gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold">{p.nom}</p>
                      <p className="text-sm text-gris">{formatEuros(p.prix)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setQte(p.id, q - 1)}
                        className="h-9 w-9 rounded-full border-[3px] border-encre font-black"
                        aria-label={`Retirer un ${p.nom}`}
                      >
                        −
                      </button>
                      <span className="w-7 text-center font-bold tabular-nums">{q}</span>
                      <button
                        type="button"
                        onClick={() => setQte(p.id, q + 1)}
                        className="h-9 w-9 rounded-full border-[3px] border-encre bg-moutarde font-black"
                        aria-label={`Ajouter un ${p.nom}`}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {burgers.length > 0 && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-moutarde/40 p-3">
                <p className="text-sm">
                  <span className="font-bold">{formule.texte}</span> (+{formatEuros(formule.supplement)})
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setMenus(Math.max(0, menus - 1))}
                    className="h-9 w-9 rounded-full border-[3px] border-encre bg-white font-black"
                    aria-label="Un menu de moins"
                  >
                    −
                  </button>
                  <span className="w-7 text-center font-bold tabular-nums" aria-live="polite">
                    {menus}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setMenus(
                        Math.min(
                          burgers.reduce((s, l) => s + l.q, 0),
                          menus + 1,
                        ),
                      )
                    }
                    className="h-9 w-9 rounded-full border-[3px] border-encre bg-white font-black"
                    aria-label="Un menu de plus"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div data-reveal className="carte-pop min-w-0 p-5 md:p-7">
          {ok ? (
            <div role="status" className="py-8 text-center">
              <p className="inline-block -rotate-3 rounded-2xl border-[3px] border-encre bg-moutarde px-5 py-3 font-display text-5xl">
                n° {ok.numero}
              </p>
              <p className="mt-5 font-display text-3xl">Merci {ok.prenom} !</p>
              <p className="mx-auto mt-3 max-w-sm text-gris">
                {ok.mode === 'retrait'
                  ? `Ta commande (${formatEuros(ok.total)}) sera prête ${ok.jour.toLowerCase()} à ${ok.creneau}, au ${snack.adresse}. Paiement sur place.`
                  : `Livraison ${ok.jour.toLowerCase()} vers ${ok.creneau} au ${ok.adresse} (${formatEuros(ok.total)}). Paiement à la livraison.`}
              </p>
              <p className="mt-4 text-xs text-gris">(Démonstration : aucune commande n’a été transmise.)</p>
              <button
                type="button"
                className="btn btn-blanc mt-6"
                onClick={() => {
                  f.reset();
                  setOk(null);
                }}
              >
                Nouvelle commande
              </button>
            </div>
          ) : (
            <form ref={f.form} noValidate onSubmit={f.submit} className="grid grid-cols-1 gap-5">
              <div role="radiogroup" aria-label="Mode" className="grid grid-cols-2 gap-2">
                {[
                  ['retrait', '🛍 À emporter', `Prêt en ${snack.retraitMinutes} min`],
                  ['livraison', '🛵 Livraison', `Dès ${liv.minimum} €`],
                ].map(([id, l, s]) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={v.mode === id}
                    onClick={() => f.setValue('mode', id)}
                    className={`rounded-2xl border-[3px] border-encre p-3 text-left transition-transform ${v.mode === id ? '-rotate-1 bg-encre text-moutarde' : 'bg-white'}`}
                  >
                    <span className="block font-extrabold">{l}</span>
                    <span className="text-sm opacity-80">{s}</span>
                  </button>
                ))}
              </div>
              <fieldset className="min-w-0">
                <legend className="mb-2 font-bold">
                  Heure de {v.mode === 'retrait' ? 'retrait' : 'livraison'} · {creneaux.jour}
                </legend>
                <div className="relative -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
                  {creneaux.liste.slice(0, 16).map((c, i) => (
                    <label key={c.label} className="shrink-0 cursor-pointer">
                      <input
                        type="radio"
                        name="creneau"
                        value={c.label}
                        checked={v.creneau === c.label}
                        onChange={f.set('creneau')}
                        className="peer sr-only"
                        {...(i === 0 ? { id: 'creneau' } : {})}
                      />
                      <span className="block rounded-xl border-[3px] border-encre bg-white px-3 py-2 font-bold tabular-nums peer-checked:bg-ketchup peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-3">
                        {c.label}
                      </span>
                    </label>
                  ))}
                </div>
                {f.show('creneau') && (
                  <p id="creneau-err" className="text-sm font-bold text-ketchup">
                    {f.errors.creneau}
                  </p>
                )}
              </fieldset>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['prenom', 'Prénom', { autoComplete: 'given-name' }],
                  ['telephone', 'Téléphone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' }],
                ].map(([k, l, props]) => (
                  <div key={k}>
                    <label htmlFor={k} className="mb-1.5 block font-bold">
                      {l}
                    </label>
                    <input className="field" value={v[k]} onChange={f.set(k)} {...f.field(k)} {...props} />
                    {f.show(k) && (
                      <p id={`${k}-err`} className="mt-1 text-sm font-bold text-ketchup">
                        {f.errors[k]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {v.mode === 'livraison' && (
                <div>
                  <label htmlFor="adresse" className="mb-1.5 block font-bold">
                    Adresse de livraison ({liv.zone})
                  </label>
                  <input
                    className="field"
                    autoComplete="street-address"
                    value={v.adresse}
                    onChange={f.set('adresse')}
                    {...f.field('adresse')}
                  />
                  {f.show('adresse') && (
                    <p id="adresse-err" className="mt-1 text-sm font-bold text-ketchup">
                      {f.errors.adresse}
                    </p>
                  )}
                </div>
              )}
              <div className="rounded-2xl bg-creme p-4">
                <p className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="tabular-nums">{formatEuros(sousTotal)}</span>
                </p>
                {v.mode === 'livraison' && (
                  <p className="flex justify-between text-sm text-gris">
                    <span>Livraison {sousTotal >= liv.offerteDes ? '(offerte)' : `(offerte dès ${liv.offerteDes} €)`}</span>
                    <span className="tabular-nums">{formatEuros(frais)}</span>
                  </p>
                )}
                <p className="mt-1 flex justify-between font-display text-3xl">
                  <span>Total</span>
                  <span className="tabular-nums">{formatEuros(total)}</span>
                </p>
              </div>
              {tropPeu && sousTotal > 0 && <p className="text-sm font-bold text-ketchup">Minimum de {liv.minimum} € pour la livraison.</p>}
              <button
                type="submit"
                disabled={lignes.length === 0 || tropPeu}
                className="btn btn-ketchup text-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {lignes.length === 0 ? 'Ajoute d’abord un produit' : `Valider · ${formatEuros(total)}`}
              </button>
              <p className="-mt-2 text-center text-xs text-gris">
                Paiement sur place ou à la livraison · Démonstration : rien n’est envoyé.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function Allergenes() {
  const scope = useRef(null);
  useReveal(scope);
  const utilises = Object.keys(allergenes).filter((a) => produits.some((p) => p.allergenes.includes(a)));
  return (
    <section id="allergenes" ref={scope} className="section bg-creme" aria-labelledby="al-titre">
      <div className="mx-auto max-w-6xl">
        <Titre
          tag="Infos allergènes"
          id="al-titre"
          couleur="bg-moutarde"
          intro="Les 14 allergènes à déclaration obligatoire. Les colonnes absentes ne concernent aucun de nos produits."
        >
          On vous dit tout
        </Titre>
        <div
          className="carte-pop mt-8 overflow-x-auto"
          data-reveal
          tabIndex={0}
          role="region"
          aria-label="Tableau des allergènes (défilable)"
        >
          <table className="w-full min-w-[42rem] border-collapse text-sm">
            <thead>
              <tr className="bg-encre text-moutarde">
                <th scope="col" className="sticky left-0 bg-encre p-3 text-left">
                  Produit
                </th>
                {utilises.map((a) => (
                  <th key={a} scope="col" className="p-2 text-xs font-bold">
                    {allergenes[a]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {produits.map((p) => (
                <tr key={p.id} className="odd:bg-creme/60">
                  <th scope="row" className="sticky left-0 bg-inherit p-3 text-left font-bold [background:inherit]">
                    {p.nom}
                  </th>
                  {utilises.map((a) => (
                    <td key={a} className="p-2 text-center">
                      {p.allergenes.includes(a) ? (
                        <span
                          className="inline-block h-4 w-4 rounded-full border-2 border-encre bg-ketchup"
                          role="img"
                          aria-label="Contient"
                        />
                      ) : (
                        <span className="sr-only">Non</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-gris">● = contient. Traces possibles de tous les allergènes (cuisine commune).</p>
      </div>
    </section>
  );
}

export function Avis() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section ref={scope} className="section bg-ketchup text-white" aria-labelledby="av-titre">
      <div className="mx-auto max-w-6xl">
        <h2 id="av-titre" className="text-5xl md:text-7xl" data-reveal>
          Ils en parlent mieux que nous
        </h2>
        <ul className="mt-10 grid grid-cols-3 gap-4">
          {chiffres.map((c) => (
            <li key={c.label} data-reveal className="min-w-0">
              <Counter
                value={c.valeur}
                decimals={c.decimales || 0}
                suffix={c.suffixe}
                className="block font-display text-4xl text-moutarde md:text-6xl"
              />
              <p className="mt-1 text-sm text-white/85">{c.label}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {avis.map((a, i) => (
            <li key={a.nom} data-reveal>
              <figure className="carte-pop h-full p-5 text-encre" style={{ rotate: `${(i - 1) * 1.5}deg` }}>
                <p className="text-moutarde [-webkit-text-stroke:1px_#1a1714]" aria-label="5 étoiles sur 5">
                  ★★★★★
                </p>
                <blockquote className="mt-3 text-lg">« {a.texte} »</blockquote>
                <figcaption className="mt-3 font-display text-xl">{a.nom}</figcaption>
              </figure>
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
    <section id="infos" ref={scope} className="section bg-moutarde" aria-labelledby="inf-titre">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <div>
          <Titre tag="Horaires & accès" id="inf-titre" couleur="bg-encre text-moutarde">
            On t’attend !
          </Titre>
          <p className="mt-6 text-lg font-bold" data-reveal>
            {snack.adresse}
          </p>
          <p className="text-gris" data-reveal>
            🚇 {snack.acces}
          </p>
          <p className="mt-2 text-gris" data-reveal>
            🛵 Livraison : {snack.livraison.zone}
          </p>
          <div className="mt-6 flex flex-wrap gap-3" data-reveal>
            <a href={`tel:${snack.telephoneLien}`} className="btn btn-ketchup">
              📞 {snack.telephone}
            </a>
            <a href={`mailto:${snack.email}`} className="btn btn-blanc">
              {snack.email}
            </a>
          </div>
        </div>
        <dl className="carte-pop self-start p-5" data-reveal>
          {horaires.map(([j, h]) => (
            <div key={j} className="flex flex-wrap justify-between gap-x-4 border-b-2 border-dashed border-encre/20 py-3 last:border-0">
              <dt className="font-extrabold">{j}</dt>
              <dd className={h === 'Fermé' ? 'text-ketchup font-bold' : ''}>{h}</dd>
            </div>
          ))}
        </dl>
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
        <Titre tag="FAQ" id="faq-titre" couleur="bg-cornichon text-white">
          Questions qu’on nous pose
        </Titre>
        <div className="mt-8 space-y-3">
          <Faq
            items={faq}
            classes={{
              item: 'carte-pop px-5',
              button: 'flex w-full items-center justify-between gap-4 py-4 text-left font-display text-xl',
              icon: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[3px] border-encre bg-moutarde text-xl',
              answer: 'pb-4 text-gris',
            }}
          />
        </div>
      </div>
    </section>
  );
}
