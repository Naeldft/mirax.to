import { useEffect, useMemo, useRef, useState } from 'react';
import Counter from '@demos/shared/components/Counter.jsx';
import Faq from '@demos/shared/components/Faq.jsx';
import { useForm } from '@demos/shared/hooks/useForm.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { formatEuros, telOk } from '@demos/shared/lib/validation.js';
import { allergenes, avis, categories, chiffres, faq, formule, horaires, photos, produits, snack } from '../data/site';

/* ----------------------------------------------------------------
   Photo optimisée : WebP en plusieurs tailles (le navigateur choisit),
   chargement différé, apparition en fondu une fois l'image reçue.
   Les fichiers sont générés par scripts/optimiser-photos.mjs.
---------------------------------------------------------------- */
const LARGEURS = { accueil: [800, 1200, 1800, 2400], ambiance: [800, 1400], defaut: [480, 800, 1200] };
const largeurs = (nom) => LARGEURS[nom.split('-')[0]] ?? LARGEURS.defaut;
const url = (nom, w) => `${import.meta.env.BASE_URL}images/${nom}-${w}.webp`;

export function Photo({ nom, alt, sizes, className = '', prioritaire = false, onLoad, imgRef, ...props }) {
  const ref = useRef(null);
  const [charge, setCharge] = useState(false);
  const ws = largeurs(nom);
  // image déjà en cache : l'événement load a pu passer avant le rendu
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) {
      setCharge(true);
      onLoad?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- au montage uniquement
  }, []);
  return (
    <img
      ref={(el) => {
        ref.current = el;
        if (imgRef) imgRef.current = el;
      }}
      src={url(nom, ws.includes(800) ? 800 : ws[0])}
      srcSet={ws.map((w) => `${url(nom, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      loading={prioritaire ? 'eager' : 'lazy'}
      fetchPriority={prioritaire ? 'high' : 'auto'}
      decoding="async"
      onLoad={() => {
        setCharge(true);
        onLoad?.();
      }}
      className={`photo ${charge ? 'chargee' : ''} ${className}`}
      {...props}
    />
  );
}

function Titre({ tag, children, intro, id, centre }) {
  return (
    <div className={`max-w-3xl ${centre ? 'mx-auto text-center' : ''}`}>
      <p className="surtitre" data-reveal>
        {tag}
      </p>
      <h2 id={id} className="mt-4 text-[clamp(2.4rem,7vw,4.6rem)]" data-reveal>
        {children}
      </h2>
      {intro && (
        <p className="mt-5 text-lg leading-relaxed text-sable" data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}

const TAGS = { veggie: 'Végétarien', piment: 'Épicé', star: 'Le plus commandé' };

/* ---------------------------------------------------------------- */

export function Bandeau() {
  const mots = ['Bœuf du Nord', 'Frites maison', 'Pain brioché local', 'Sauces maison', 'Cuit à la minute'];
  return (
    <div className="overflow-hidden border-y border-trait bg-charbon py-4" aria-hidden="true">
      <div className="defile">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {mots.map((m) => (
              <span key={m} className="titre flex items-center gap-8 pr-8 text-lg text-creme/60">
                {m} <span className="h-1.5 w-1.5 rounded-full bg-braise" />
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
  useReveal(scope, [cat, veggie, sansGluten]);
  const filtres = veggie || sansGluten;
  const liste = produits.filter(
    (p) => (filtres || p.cat === cat) && (!veggie || p.tags.includes('veggie')) && (!sansGluten || !p.allergenes.includes('gluten')),
  );
  return (
    <section id="carte" ref={scope} className="section bg-nuit" aria-labelledby="carte-titre">
      <div className="mx-auto max-w-7xl">
        <Titre
          tag="La carte"
          id="carte-titre"
          intro="Tout est préparé à la minute, à la commande. Ajoutez vos envies : votre commande se remplit plus bas."
        >
          Faites-vous plaisir
        </Titre>
        <div className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0" data-reveal>
          <div role="tablist" aria-label="Catégories" className="flex shrink-0 gap-2">
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
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${!filtres && cat === c.id ? 'bg-creme text-nuit' : 'border border-trait text-creme/75 hover:border-creme/40 hover:text-creme'}`}
              >
                {c.nom}
              </button>
            ))}
          </div>
          <span className="mx-1 w-px shrink-0 bg-trait" aria-hidden="true" />
          {[
            [veggie, setVeggie, 'Végétarien'],
            [sansGluten, setSansGluten, 'Sans gluten'],
          ].map(([v, set, l]) => (
            <button
              key={l}
              type="button"
              aria-pressed={v}
              onClick={() => set(!v)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${v ? 'bg-braise text-nuit' : 'border border-dashed border-trait text-creme/75 hover:text-creme'}`}
            >
              {v ? '✓ ' : ''}
              {l}
            </button>
          ))}
        </div>
        {filtres && (
          <p className="mt-3 text-sm text-sable" aria-live="polite">
            {liste.length} produit{liste.length > 1 ? 's' : ''} sur toute la carte
          </p>
        )}
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((p) => (
            <li key={p.id} data-reveal className="min-w-0">
              <article className="carte group flex h-full flex-col overflow-hidden transition-[box-shadow,border-color] duration-500 hover:border-braise/40 hover:shadow-[0_30px_60px_-30px_rgb(255_107_26/0.35)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-ardoise">
                  {/* emplacement photo : produit.photo (voir photos/LISEZ-MOI.md) */}
                  <Photo
                    nom={p.photo}
                    alt={`${p.nom} : ${p.desc}`}
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
                    width="800"
                    height="600"
                    className="h-full w-full object-cover duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charbon/80 to-transparent" />
                  {p.tags.length > 0 && (
                    <p className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full bg-nuit/70 px-2.5 py-1 text-[0.7rem] font-semibold backdrop-blur-md">
                          {t === 'piment' ? '🌶 ' : t === 'veggie' ? '🌱 ' : '★ '}
                          {TAGS[t]}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-xl">{p.nom}</h3>
                    <p className="shrink-0 text-lg font-bold text-flamme tabular-nums">{formatEuros(p.prix)}</p>
                  </div>
                  <p className="mt-2 flex-1 leading-relaxed text-sable">{p.desc}</p>
                  <p className="mt-3 text-xs text-sable/70">
                    Allergènes : {p.allergenes.length ? p.allergenes.map((a) => allergenes[a]).join(', ') : 'aucun des 14 majeurs'}
                  </p>
                  <button
                    type="button"
                    onClick={() => ajouter(p.id)}
                    className={`btn mt-4 w-full !min-h-12 text-sm ${quantites[p.id] ? 'bg-creme text-nuit' : 'btn-ligne'}`}
                    aria-label={`Ajouter ${p.nom} à la commande`}
                  >
                    {quantites[p.id] ? `Dans la commande · ${quantites[p.id]}  ＋` : 'Ajouter  ＋'}
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
        {liste.length === 0 && <p className="mt-8 text-lg text-sable">Aucun produit ne correspond à ces filtres.</p>}
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

const Stepper = ({ moins, plus, valeur, nom }) => (
  <div className="flex items-center gap-1">
    <button
      type="button"
      onClick={moins}
      className="h-9 w-9 rounded-full border border-trait text-lg transition-colors hover:border-creme/50"
      aria-label={`Un ${nom} de moins`}
    >
      −
    </button>
    <span className="w-7 text-center font-semibold tabular-nums" aria-live="polite">
      {valeur}
    </span>
    <button
      type="button"
      onClick={plus}
      className="h-9 w-9 rounded-full bg-creme text-lg text-nuit transition-colors hover:bg-white"
      aria-label={`Un ${nom} de plus`}
    >
      +
    </button>
  </div>
);

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
    <section id="commande" ref={scope} className="section relative bg-charbon" aria-labelledby="cmd-titre">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="min-w-0">
          <Titre
            tag="Click & collect"
            id="cmd-titre"
            intro={`Commandez maintenant, récupérez en ${snack.retraitMinutes} minutes. Ou faites-vous livrer dans tout Lille.`}
          >
            Votre commande
          </Titre>
          <div className="relative mt-8 hidden aspect-[16/10] overflow-hidden rounded-2xl lg:block" data-reveal>
            {/* emplacement photo : photos.commande */}
            <Photo
              nom={photos.commande}
              alt="Smash burger et frites maison sur une planche"
              sizes="40vw"
              width="1400"
              height="875"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="carte mt-6 p-5" data-reveal>
            {lignes.length === 0 ? (
              <p className="py-6 text-center text-sable">
                Votre commande est vide.{' '}
                <a href="#carte" className="font-semibold text-flamme underline underline-offset-4">
                  Choisir dans la carte
                </a>
              </p>
            ) : (
              <ul className="divide-y divide-trait">
                {lignes.map(({ p, q }) => (
                  <li key={p.id} className="flex items-center gap-3 py-3">
                    <Photo
                      nom={p.photo}
                      alt=""
                      sizes="56px"
                      width="56"
                      height="42"
                      className="h-11 w-14 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{p.nom}</p>
                      <p className="text-sm text-sable">{formatEuros(p.prix)}</p>
                    </div>
                    <Stepper moins={() => setQte(p.id, q - 1)} plus={() => setQte(p.id, q + 1)} valeur={q} nom={p.nom} />
                  </li>
                ))}
              </ul>
            )}
            {burgers.length > 0 && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-braise/30 bg-braise/10 p-3">
                <p className="text-sm">
                  <span className="font-semibold">{formule.texte}</span>{' '}
                  <span className="text-sable">(+{formatEuros(formule.supplement)})</span>
                </p>
                <Stepper
                  moins={() => setMenus(Math.max(0, menus - 1))}
                  plus={() =>
                    setMenus(
                      Math.min(
                        burgers.reduce((s, l) => s + l.q, 0),
                        menus + 1,
                      ),
                    )
                  }
                  valeur={menus}
                  nom="menu"
                />
              </div>
            )}
          </div>
        </div>
        <div data-reveal className="carte min-w-0 self-start p-5 md:p-7">
          {ok ? (
            <div role="status" className="py-8 text-center">
              <p className="surtitre">Commande n° {ok.numero}</p>
              <p className="titre mt-4 text-4xl">Merci {ok.prenom} !</p>
              <p className="mx-auto mt-4 max-w-sm leading-relaxed text-sable">
                {ok.mode === 'retrait'
                  ? `Votre commande (${formatEuros(ok.total)}) sera prête ${ok.jour.toLowerCase()} à ${ok.creneau}, au ${snack.adresse}. Paiement sur place.`
                  : `Livraison ${ok.jour.toLowerCase()} vers ${ok.creneau} au ${ok.adresse} (${formatEuros(ok.total)}). Paiement à la livraison.`}
              </p>
              <p className="mt-4 text-xs text-sable/70">(Démonstration : aucune commande n’a été transmise.)</p>
              <button
                type="button"
                className="btn btn-ligne mt-6"
                onClick={() => {
                  f.reset();
                  setOk(null);
                }}
              >
                Nouvelle commande
              </button>
            </div>
          ) : (
            <form ref={f.form} noValidate onSubmit={f.submit} className="grid grid-cols-1 gap-6">
              <div role="radiogroup" aria-label="Mode" className="grid grid-cols-2 gap-2 rounded-2xl bg-nuit p-1">
                {[
                  ['retrait', 'À emporter', `Prêt en ${snack.retraitMinutes} min`],
                  ['livraison', 'Livraison', `Dès ${liv.minimum} €`],
                ].map(([id, l, s]) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={v.mode === id}
                    onClick={() => f.setValue('mode', id)}
                    className={`rounded-xl p-3 text-left transition-colors duration-300 ${v.mode === id ? 'bg-ardoise' : 'text-creme/60 hover:text-creme'}`}
                  >
                    <span className="block font-semibold">{l}</span>
                    <span className="text-sm text-sable">{s}</span>
                  </button>
                ))}
              </div>
              <fieldset className="min-w-0">
                <legend className="mb-3 font-semibold">
                  Heure de {v.mode === 'retrait' ? 'retrait' : 'livraison'}{' '}
                  <span className="font-normal text-sable">· {creneaux.jour}</span>
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
                      <span className="block rounded-xl border border-trait px-3.5 py-2.5 text-sm font-semibold tabular-nums transition-colors peer-checked:border-braise peer-checked:bg-braise peer-checked:text-nuit peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-flamme">
                        {c.label}
                      </span>
                    </label>
                  ))}
                </div>
                {f.show('creneau') && (
                  <p id="creneau-err" className="text-sm text-[#ff7a6b]">
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
                    <label htmlFor={k} className="mb-1.5 block text-sm text-sable">
                      {l}
                    </label>
                    <input className="field" value={v[k]} onChange={f.set(k)} {...f.field(k)} {...props} />
                    {f.show(k) && (
                      <p id={`${k}-err`} className="mt-1 text-sm text-[#ff7a6b]">
                        {f.errors[k]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {v.mode === 'livraison' && (
                <div>
                  <label htmlFor="adresse" className="mb-1.5 block text-sm text-sable">
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
                    <p id="adresse-err" className="mt-1 text-sm text-[#ff7a6b]">
                      {f.errors.adresse}
                    </p>
                  )}
                </div>
              )}
              <div className="border-t border-trait pt-5">
                <p className="flex justify-between text-sable">
                  <span>Sous-total</span>
                  <span className="tabular-nums">{formatEuros(sousTotal)}</span>
                </p>
                {v.mode === 'livraison' && (
                  <p className="mt-1 flex justify-between text-sm text-sable">
                    <span>Livraison {sousTotal >= liv.offerteDes ? '(offerte)' : `(offerte dès ${liv.offerteDes} €)`}</span>
                    <span className="tabular-nums">{formatEuros(frais)}</span>
                  </p>
                )}
                <p className="titre mt-3 flex justify-between text-3xl">
                  <span>Total</span>
                  <span className="tabular-nums">{formatEuros(total)}</span>
                </p>
              </div>
              {tropPeu && sousTotal > 0 && <p className="text-sm text-flamme">Minimum de {liv.minimum} € pour la livraison.</p>}
              <button
                type="submit"
                disabled={lignes.length === 0 || tropPeu}
                className="btn btn-braise text-base disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                {lignes.length === 0 ? 'Ajoutez d’abord un produit' : `Valider la commande · ${formatEuros(total)}`}
              </button>
              <p className="-mt-2 text-center text-xs text-sable/70">
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
    <section id="allergenes" ref={scope} className="section bg-nuit" aria-labelledby="al-titre">
      <div className="mx-auto max-w-7xl">
        <Titre
          tag="Informations allergènes"
          id="al-titre"
          intro="Les 14 allergènes à déclaration obligatoire. Les colonnes absentes ne concernent aucun de nos produits."
        >
          On vous dit tout
        </Titre>
        <div className="carte mt-10 overflow-x-auto" data-reveal tabIndex={0} role="region" aria-label="Tableau des allergènes (défilable)">
          <table className="w-full min-w-[42rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-trait text-left text-sable">
                <th scope="col" className="sticky left-0 bg-charbon p-4 font-semibold">
                  Produit
                </th>
                {utilises.map((a) => (
                  <th key={a} scope="col" className="p-3 text-center text-xs font-semibold">
                    {allergenes[a]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {produits.map((p) => (
                <tr key={p.id} className="border-b border-trait/60 last:border-0">
                  <th scope="row" className="sticky left-0 bg-charbon p-4 text-left font-semibold">
                    {p.nom}
                  </th>
                  {utilises.map((a) => (
                    <td key={a} className="p-3 text-center">
                      {p.allergenes.includes(a) ? (
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-braise" role="img" aria-label="Contient" />
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
        <p className="mt-3 text-sm text-sable">● = contient. Traces possibles de tous les allergènes (cuisine commune).</p>
      </div>
    </section>
  );
}

export function Avis() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section ref={scope} className="section relative overflow-hidden bg-nuit" aria-labelledby="av-titre">
      {/* emplacement photo : photos.avis (fond assombri) */}
      <div aria-hidden="true" className="absolute inset-0">
        <Photo
          nom={photos.avis}
          alt=""
          sizes="100vw"
          width="1400"
          height="1400"
          className="h-full w-full object-cover object-[70%_50%] opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nuit via-nuit/85 to-nuit/40" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <Titre tag="Ils en parlent" id="av-titre">
          Mieux que nous
        </Titre>
        <ul className="mt-12 grid max-w-3xl grid-cols-3 gap-6">
          {chiffres.map((c) => (
            <li key={c.label} data-reveal className="min-w-0">
              <Counter
                value={c.valeur}
                decimals={c.decimales || 0}
                suffix={c.suffixe}
                className="titre block text-4xl text-flamme md:text-6xl"
              />
              <p className="mt-2 text-sm text-sable">{c.label}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {avis.map((a) => (
            <li key={a.nom} data-reveal>
              <figure className="h-full rounded-2xl border border-white/10 bg-nuit/60 p-6 backdrop-blur-md">
                <p className="text-flamme" aria-label="5 étoiles sur 5">
                  ★★★★★
                </p>
                <blockquote className="mt-4 text-lg leading-relaxed">« {a.texte} »</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-sable">{a.nom}</figcaption>
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
    <section id="infos" ref={scope} className="section relative overflow-hidden bg-charbon" aria-labelledby="inf-titre">
      {/* emplacement photo : photos.infos (fond assombri) */}
      <div aria-hidden="true" className="absolute inset-0">
        <Photo nom={photos.infos} alt="" sizes="100vw" width="1400" height="930" className="h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-charbon via-charbon/70 to-charbon/40" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
        <div>
          <Titre tag="Horaires & accès" id="inf-titre">
            On vous attend
          </Titre>
          <p className="mt-8 text-xl font-semibold" data-reveal>
            {snack.adresse}
          </p>
          <ul className="mt-3 space-y-1 text-sable" data-reveal>
            <li>{snack.acces}</li>
            <li>Livraison : {snack.livraison.zone}</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3" data-reveal>
            <a href={`tel:${snack.telephoneLien}`} className="btn btn-braise">
              Appeler · {snack.telephone}
            </a>
            <a href={`mailto:${snack.email}`} className="btn btn-ligne">
              {snack.email}
            </a>
          </div>
        </div>
        <dl className="carte self-end bg-nuit/70 p-6 backdrop-blur-md" data-reveal>
          {horaires.map(([j, h]) => (
            <div key={j} className="flex flex-wrap justify-between gap-x-4 border-b border-trait py-3.5 last:border-0">
              <dt className="font-semibold">{j}</dt>
              <dd className={h === 'Fermé' ? 'text-sable/70' : 'text-sable'}>{h}</dd>
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
    <section id="faq" ref={scope} className="section bg-nuit" aria-labelledby="faq-titre">
      <div className="mx-auto max-w-3xl">
        <Titre tag="Questions fréquentes" id="faq-titre">
          Bon à savoir
        </Titre>
        <div className="mt-10 border-t border-trait">
          <Faq
            items={faq}
            classes={{
              item: 'border-b border-trait',
              button:
                'flex w-full items-center justify-between gap-4 py-6 text-left text-lg font-semibold transition-colors hover:text-flamme',
              icon: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-trait text-xl text-flamme',
              answer: 'pb-6 leading-relaxed text-sable',
            }}
          />
        </div>
      </div>
    </section>
  );
}
