import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Photo from '@demos/shared/components/Photo.jsx';
import Counter from '@demos/shared/components/Counter.jsx';
import Faq from '@demos/shared/components/Faq.jsx';
import { useForm } from '@demos/shared/hooks/useForm.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { formatEuros, isoLocal, parseIso, telOk } from '@demos/shared/lib/validation.js';
import { ardoise, avis, categories, chiffres, faq, horaires, maison, nuit, produits, retraits } from '../data/site';

function Titre({ surtitre, children, intro, id, center }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className="surtitre" data-reveal>
        {surtitre}
      </p>
      <h2 id={id} className="mt-3 text-5xl leading-[1] md:text-7xl" data-reveal>
        {children}
      </h2>
      {intro && (
        <p className="mt-5 text-lg leading-relaxed text-croute/80" data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}

export function Pains() {
  const scope = useRef(null);
  const grid = useRef(null);
  const [cat, setCat] = useState('pain');
  const reduced = useReducedMotion();
  useReveal(scope);
  useLayoutEffect(() => {
    if (reduced || !grid.current) return;
    const t = gsap.fromTo(
      grid.current.children,
      { y: 30, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.07, duration: 0.6, ease: 'back.out(1.6)' },
    );
    return () => t.kill();
  }, [cat, reduced]);
  const liste = produits.filter((p) => p.categorie === cat);
  return (
    <section id="pains" ref={scope} className="section papier bg-farine" aria-labelledby="pains-titre">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Titre surtitre="Chaque jour au fournil" id="pains-titre">
            Nos <em>pains</em> &amp; gourmandises
          </Titre>
          <div role="tablist" aria-label="Catégories" className="flex flex-wrap gap-2" data-reveal>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={cat === c.id}
                onClick={() => setCat(c.id)}
                className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${cat === c.id ? 'bg-croute text-farine' : 'bg-mie text-croute hover:bg-ble/40'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <ul ref={grid} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" role="tabpanel">
          {liste.map((p) => (
            <li
              key={p.id}
              className="group rounded-3xl bg-papier p-5 transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-0.5deg]"
            >
              <div className="relative -mx-5 -mt-5 mb-1 aspect-[4/3] overflow-hidden rounded-t-3xl transition-transform duration-700">
                <Photo
                  nom={p.photo}
                  alt={p.alt}
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                  width="800"
                  height="600"
                  className="h-full w-full object-cover duration-700 group-hover:scale-105"
                />
                {p.tag && (
                  <span className="craie absolute left-3 top-3 -rotate-6 rounded-full bg-ble/80 px-3 text-xl text-croute">{p.tag}</span>
                )}
              </div>
              <h3 className="mt-3 text-2xl leading-tight">{p.nom}</h3>
              <p className="mt-1 text-base text-croute/80">{p.detail}</p>
              <p className="mt-3 font-serif text-3xl font-bold text-dore">{formatEuros(p.prix)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Ardoise() {
  const scope = useRef(null);
  const reduced = useReducedMotion();
  useReveal(scope);
  // l'écriture à la craie apparaît ligne par ligne
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-craie]', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.1,
        stagger: 0.25,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: scope.current, start: 'top 65%' },
      });
    }, scope);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section id="ardoise" ref={scope} className="section bg-croute" aria-labelledby="ardoise-titre">
      <div
        className="mx-auto max-w-4xl rounded-[2rem] border-[14px] border-[#8f6a45] bg-ardoise p-6 text-farine shadow-[inset_0_0_60px_rgb(0_0_0/0.5)] md:p-12"
        data-reveal
      >
        <h2 id="ardoise-titre" className="craie text-center text-5xl md:text-7xl">
          L’ardoise du jour
        </h2>
        <ul className="mt-8 space-y-5">
          {ardoise.map(([cat, nom, prix]) => (
            <li
              key={nom}
              data-craie
              className="craie flex flex-wrap items-baseline gap-x-4 border-b border-dashed border-farine/25 pb-3 text-2xl md:text-3xl"
            >
              <span className="text-ble">{cat}</span>
              <span className="flex-1">{nom}</span>
              <span className="text-ble">{prix}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Fournil() {
  const scope = useRef(null);
  const line = useRef(null);
  const reduced = useReducedMotion();
  useReveal(scope);
  useLayoutEffect(() => {
    if (reduced) return;
    const t = gsap.fromTo(
      line.current,
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-nuit]', start: 'top 70%', end: 'bottom 60%', scrub: true } },
    );
    return () => t.kill();
  }, [reduced]);
  return (
    <section id="fournil" ref={scope} className="section bg-encre text-farine" aria-labelledby="fournil-titre">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="surtitre" data-reveal>
            Le fournil
          </p>
          <h2 id="fournil-titre" className="mt-3 text-5xl md:text-7xl" data-reveal>
            Une nuit <em className="text-ble">au fournil</em>
          </h2>
          <dl className="mt-12 grid gap-8">
            {chiffres.map((c) => (
              <div key={c.label} data-reveal>
                <dt className="sr-only">{c.label}</dt>
                <dd>
                  <Counter value={c.valeur} suffix={c.suffixe} className="block font-serif text-6xl font-bold text-ble" />
                  <span className="text-farine/70">{c.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <ol data-nuit className="relative space-y-10 pl-20">
          <span className="absolute bottom-0 left-[3.1rem] top-0 w-px bg-farine/15" aria-hidden="true" />
          <span
            ref={line}
            className="absolute bottom-0 left-[3.1rem] top-0 w-px origin-top bg-ble"
            style={{ transform: reduced ? 'none' : 'scaleY(0)' }}
            aria-hidden="true"
          />
          {nuit.map((n) => (
            <li key={n.heure} className="relative" data-reveal>
              <span className="craie absolute -left-20 top-0 w-14 text-right text-2xl text-ble">{n.heure}</span>
              <h3 className="text-3xl">{n.titre}</h3>
              <p className="mt-1 text-farine/70">{n.texte}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Commande à retirer en boutique : quantités, total en direct, créneau. */
export function Commande() {
  const scope = useRef(null);
  const [qte, setQte] = useState({});
  const [ok, setOk] = useState(null);
  useReveal(scope);
  const total = produits.reduce((s, p) => s + (qte[p.id] || 0) * p.prix, 0);
  const valider = useCallback(
    (v) => {
      const e = {};
      if (total === 0) e.panier = 'Ajoutez au moins un produit.';
      if (!v.date) e.date = 'Choisissez le jour du retrait.';
      else if (v.date < isoLocal(new Date())) e.date = 'Cette date est passée.';
      else if (parseIso(v.date).getDay() === 1) e.date = 'Nous sommes fermés le lundi.';
      if (!v.heure) e.heure = 'Choisissez l’heure du retrait.';
      if (v.nom.trim().length < 2) e.nom = 'Indiquez votre nom.';
      if (!telOk(v.telephone)) e.telephone = 'Numéro invalide (ex. : 06 12 34 56 78).';
      return e;
    },
    [total],
  );
  const f = useForm({ date: '', heure: '', nom: '', telephone: '' }, valider, (v) => setOk({ ...v, total, qte: { ...qte } }));
  const v = f.values;
  const dimanche = v.date && parseIso(v.date).getDay() === 0;
  const plage = retraits.filter((r) => !dimanche || r < '13:00');
  const err = (k) =>
    f.show(k) && (
      <p id={`${k}-err`} role="alert" className="mt-1 text-sm text-[#b3261e]">
        {f.errors[k]}
      </p>
    );
  const pas = (id, d) => setQte((q) => ({ ...q, [id]: Math.max(0, Math.min(30, (q[id] || 0) + d)) }));
  return (
    <section id="commande" ref={scope} className="section papier bg-mie" aria-labelledby="cmd-titre">
      <div className="mx-auto max-w-6xl">
        <Titre
          surtitre="Commande à retirer"
          id="cmd-titre"
          intro="Commandez la veille avant 18 heures : votre sac vous attend, au chaud, au comptoir."
        >
          Réservez <em>votre fournée</em>
        </Titre>
        {ok ? (
          <div className="mt-10 rounded-3xl bg-farine p-8 text-center" role="status" data-reveal>
            <p className="craie text-5xl text-dore">Merci {ok.nom.trim().split(' ')[0]} !</p>
            <p className="mt-3 text-lg">
              Votre commande de {formatEuros(ok.total)} sera prête le{' '}
              {parseIso(ok.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à{' '}
              {ok.heure.replace(':', ' h ')}.
            </p>
            <p className="mt-6 text-xs text-croute/70">Site de démonstration : aucune commande n’est réellement transmise.</p>
            <button type="button" className="btn btn-ligne mt-6" onClick={() => (setOk(null), setQte({}), f.reset())}>
              Nouvelle commande
            </button>
          </div>
        ) : (
          <form ref={f.form} noValidate onSubmit={f.submit} className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]" data-reveal>
            <fieldset className="rounded-3xl bg-farine p-4 md:p-6">
              <legend className="sr-only">Produits</legend>
              <ul className="divide-y divide-mie">
                {produits.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                    <span>
                      <span className="block font-semibold">{p.nom}</span>
                      <span className="text-sm text-croute/70">{formatEuros(p.prix)}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => pas(p.id, -1)}
                        disabled={!qte[p.id]}
                        aria-label={`Retirer un ${p.nom}`}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-mie text-xl font-bold text-croute transition-transform active:scale-90 disabled:opacity-40"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-semibold tabular-nums" aria-live="polite">
                        {qte[p.id] || 0}
                      </span>
                      <button
                        type="button"
                        onClick={() => pas(p.id, 1)}
                        aria-label={`Ajouter un ${p.nom}`}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-croute text-xl font-bold text-farine transition-transform active:scale-90"
                      >
                        +
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
              {f.show('panier') && (
                <p role="alert" className="mt-2 text-sm text-[#b3261e]">
                  {f.errors.panier}
                </p>
              )}
            </fieldset>
            <div className="flex flex-col gap-4 rounded-3xl bg-croute p-6 text-farine">
              <p className="flex items-baseline justify-between" aria-live="polite">
                <span className="surtitre !text-ble">Total</span>
                <span className="font-serif text-5xl font-bold">{formatEuros(total)}</span>
              </p>
              <label htmlFor="date" className="text-sm font-semibold">
                Jour du retrait
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
              <label htmlFor="heure" className="text-sm font-semibold">
                Heure
              </label>
              <select className="field" value={v.heure} onChange={f.set('heure')} {...f.field('heure')}>
                <option value="">Choisir…</option>
                {plage.map((r) => (
                  <option key={r} value={r}>
                    {r.replace(':', ' h ')}
                  </option>
                ))}
              </select>
              {err('heure')}
              <label htmlFor="nom" className="text-sm font-semibold">
                Nom
              </label>
              <input autoComplete="name" className="field" value={v.nom} onChange={f.set('nom')} {...f.field('nom')} />
              {err('nom')}
              <label htmlFor="telephone" className="text-sm font-semibold">
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
              <button type="submit" className="btn mt-2 bg-ble text-encre">
                Valider ma commande
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export function Infos() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="infos" ref={scope} className="section papier bg-farine" aria-labelledby="infos-titre">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <Titre surtitre="Nous trouver" id="infos-titre">
            Horaires <em>&amp;</em> adresse
          </Titre>
          <address className="mt-6 font-serif text-3xl not-italic" data-reveal>
            {maison.adresse}
          </address>
          <dl className="mt-4 divide-y divide-mie" data-reveal>
            {horaires.map(([j, h]) => (
              <div key={j} className="flex justify-between py-3">
                <dt className="font-semibold">{j}</dt>
                <dd className={h === 'Fermé' ? 'text-croute/50' : ''}>{h}</dd>
              </div>
            ))}
          </dl>
          <a href={`tel:${maison.telephoneLien}`} className="btn btn-croute mt-6" data-reveal>
            Appeler · {maison.telephone}
          </a>
          <ul className="mt-12 space-y-6">
            {avis.map((a) => (
              <li key={a.nom} data-reveal>
                <blockquote className="font-serif text-2xl italic">« {a.texte} »</blockquote>
                <p className="craie mt-1 text-xl text-dore">— {a.nom}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-4xl" data-reveal>
            Questions fréquentes
          </h3>
          <div className="mt-6">
            <Faq
              items={faq}
              classes={{
                item: 'mb-3 rounded-2xl bg-papier px-5',
                button:
                  'flex w-full items-center justify-between gap-6 py-5 text-left font-serif text-2xl font-semibold transition-colors hover:text-dore',
                icon: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mie text-xl text-croute',
                answer: 'pb-5 leading-relaxed text-croute/80',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
