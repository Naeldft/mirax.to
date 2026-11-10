import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Counter from '@demos/shared/components/Counter.jsx';
import Faq from '@demos/shared/components/Faq.jsx';
import { useForm } from '@demos/shared/hooks/useForm.js';
import { useHero3D } from '@demos/shared/hooks/useHero3D.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { emailOk, formatEuros, telOk } from '@demos/shared/lib/validation.js';
import { avis, boutique, coloris, engagements, etapes, faq, livraison, produits, tailles } from '../data/site';

const ClothScene = lazy(() => import('../three/ClothScene'));
const hexDe = (id) => coloris.find((c) => c.id === id)?.hex ?? '#d8ccb6';
const nomDe = (id) => coloris.find((c) => c.id === id)?.nom ?? id;

/** Bouton dont le libellé glisse au survol. */
export function Btn(allProps) {
  const { as: Tag = 'a', variant = 'encre', className = '', children, ...props } = allProps;
  return (
    <Tag className={`btn btn-${variant} ${className}`} {...props}>
      <span data-t={typeof children === 'string' ? children : undefined}>{children}</span>
    </Tag>
  );
}

function Titre({ tag, children, intro, id, centre }) {
  return (
    <div className={`max-w-2xl ${centre ? 'mx-auto text-center' : ''}`}>
      <p className="etiquette" data-reveal>
        {tag}
      </p>
      <h2 id={id} className="mt-4 text-5xl leading-[1.02] md:text-7xl" data-reveal>
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

/** Pastilles de couleur (boutons radio accessibles). */
function Swatches({ ids, value, onChange, name, size = 'h-8 w-8' }) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2.5">
      {ids.map((id) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={value === id}
          aria-label={nomDe(id)}
          title={nomDe(id)}
          onClick={() => onChange(id)}
          className={`${size} rounded-full ring-offset-2 ring-offset-ivoire transition-transform hover:scale-110 ${value === id ? 'ring-1 ring-encre' : 'ring-1 ring-black/10'}`}
          style={{ background: hexDe(id) }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function Hero({ onReady, couleur, setCouleur }) {
  const section = useRef(null);
  const { progress, reduced, inView, tier, load3d } = useHero3D(section, { onReady });
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-ligne]', { yPercent: 110, duration: 1.3, stagger: 0.12, ease: 'expo.out', delay: 0.3 });
      gsap.from('[data-in]', { opacity: 0, y: 16, stagger: 0.1, duration: 0.9, delay: 0.9, ease: 'power2.out' });
      // au défilement, le texte s'efface doucement pendant que la chemise pivote
      gsap.to('[data-fond]', {
        y: -40,
        ease: 'none',
        scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom bottom', scrub: true },
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section id="accueil" ref={section} className={`relative ${reduced ? '' : 'h-[190svh]'}`} aria-label="Accueil">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_60%_55%_at_70%_40%,#fbfaf7,transparent_75%)]">
        {load3d && (
          <Suspense fallback={null}>
            <ClothScene color={hexDe(couleur)} progress={progress} reduced={reduced} tier={tier} active={inView} onReady={onReady} />
          </Suspense>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-ivoire via-ivoire/85 to-transparent md:hidden" />
        <div
          data-fond
          className="pointer-events-none relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-8 md:justify-center md:px-8 md:pb-0"
        >
          <p data-in className="etiquette">
            {boutique.accroche}
          </p>
          <h1 className="mt-4 text-[clamp(3.3rem,12vw,7rem)] leading-[0.95]">
            <span className="block overflow-hidden pb-1">
              <span data-ligne className="block">
                Le lin,
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-ligne className="block italic text-gris">
                tout simplement.
              </span>
            </span>
          </h1>
          <p data-in className="mt-5 max-w-md leading-relaxed text-gris max-md:hidden">
            {boutique.intro}
          </p>
          <div data-in className="pointer-events-auto mt-6 flex items-center gap-4">
            <Swatches ids={coloris.map((c) => c.id)} value={couleur} onChange={setCouleur} name="Couleur de la chemise" />
            <p className="text-sm text-gris" aria-live="polite">
              {nomDe(couleur)}
            </p>
          </div>
          <div data-in className="pointer-events-auto mt-6 flex flex-wrap gap-3">
            <Btn href="#collection">Voir la collection</Btn>
            <Btn href="#atelier" variant="ligne" className="max-sm:hidden">
              Notre atelier
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

/** Silhouettes de vêtements dessinées (une par forme), teintées par le coloris choisi. */
const FORMES = {
  chemise: 'M38 10 Q50 20 62 10 L80 16 L98 46 L84 54 L76 38 L77 108 Q50 103 23 108 L24 38 L16 54 L2 46 L20 16 Z',
  robe: 'M36 8 L44 8 Q50 16 56 8 L64 8 L66 30 L72 44 L92 110 Q50 116 8 110 L28 44 L34 30 Z',
  pantalon: 'M24 8 L76 8 L80 30 L86 110 L60 110 L52 40 L48 40 L40 110 L14 110 L20 30 Z',
  top: 'M34 14 L38 14 L42 28 Q50 32 58 28 L62 14 L66 14 L70 36 L74 92 Q50 96 26 92 L30 36 Z',
  foulard: 'M14 20 L86 14 L80 34 L84 52 L64 50 L70 108 L58 100 L50 108 L46 52 L16 50 L20 34 Z',
  cabas: 'M18 40 L82 40 L88 108 L12 108 Z M34 40 Q34 12 50 12 Q66 12 66 40',
};

function Silhouette({ forme, hex }) {
  const d = FORMES[forme];
  const [corps, anse] = forme === 'cabas' ? d.split(' M') : [d];
  return (
    <svg viewBox="0 0 100 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id={`trame-${forme}`} width="3" height="3" patternUnits="userSpaceOnUse">
          <path d="M0 0h3M0 0v3" stroke="rgba(0,0,0,0.07)" strokeWidth="0.6" />
        </pattern>
      </defs>
      {anse && <path d={`M${anse}`} fill="none" stroke="#7a5536" strokeWidth="3" />}
      <path d={corps} fill={hex} style={{ transition: 'fill 0.5s' }} />
      <path d={corps} fill={`url(#trame-${forme})`} />
      <path d={corps} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.6" />
    </svg>
  );
}

function Produit({ p, onAdd }) {
  const [col, setCol] = useState(p.coloris[0]);
  const [taille, setTaille] = useState(p.forme === 'foulard' || p.forme === 'cabas' ? 'TU' : '');
  const [erreur, setErreur] = useState(false);
  const [ajoute, setAjoute] = useState(false);
  const img = useRef(null);
  const reduced = useReducedMotion();
  const unique = taille === 'TU';
  const ajouter = () => {
    if (!taille) {
      setErreur(true);
      return;
    }
    onAdd({ id: p.id, nom: p.nom, prix: p.prix, forme: p.forme, coloris: col, taille });
    setAjoute(true);
    setTimeout(() => setAjoute(false), 1600);
    if (!reduced && img.current) gsap.fromTo(img.current, { scale: 0.94 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  };
  return (
    <li data-reveal className="min-w-0">
      <article className="group flex h-full flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-blanc">
          <div ref={img} className="absolute inset-[12%] transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2">
            <Silhouette forme={p.forme} hex={hexDe(col)} />
          </div>
          <p className="absolute left-4 top-4 text-xs tracking-[0.2em] text-gris uppercase">{nomDe(col)}</p>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <h3 className="text-2xl">{p.nom}</h3>
          <p className="shrink-0 tabular-nums">{formatEuros(p.prix)}</p>
        </div>
        <p className="mt-1 text-sm text-gris">{p.note}</p>
        <div className="mt-4">
          <Swatches ids={p.coloris} value={col} onChange={setCol} name={`Coloris de ${p.nom}`} size="h-7 w-7" />
        </div>
        {!unique && (
          <fieldset className="mt-4">
            <legend className="sr-only">Taille de {p.nom}</legend>
            <div className="flex flex-wrap gap-1.5">
              {tailles.map((t) => (
                <label key={t} className="cursor-pointer">
                  <input
                    type="radio"
                    name={`taille-${p.id}`}
                    value={t}
                    checked={taille === t}
                    onChange={() => {
                      setTaille(t);
                      setErreur(false);
                    }}
                    className="peer sr-only"
                  />
                  <span className="flex h-10 min-w-10 items-center justify-center border border-lin px-2 text-sm transition-colors peer-checked:border-encre peer-checked:bg-encre peer-checked:text-ivoire peer-focus-visible:outline peer-focus-visible:outline-1 hover:border-encre">
                    {t}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}
        {erreur && (
          <p role="alert" className="mt-2 text-sm text-[#b3261e]">
            Choisissez une taille.
          </p>
        )}
        <button type="button" onClick={ajouter} className="btn btn-ligne mt-4 w-full" aria-live="polite">
          <span data-t={ajoute ? 'Ajouté ✓' : 'Ajouter au panier'}>{ajoute ? 'Ajouté ✓' : 'Ajouter au panier'}</span>
        </button>
      </article>
    </li>
  );
}

export function Collection({ onAdd }) {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="collection" ref={scope} className="section bg-ivoire" aria-labelledby="col-titre">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Titre
            tag="Collection été"
            id="col-titre"
            intro="Six pièces, cinq teintes végétales. Choisissez votre coloris, votre taille, c’est dans le panier."
          >
            Les essentiels
          </Titre>
          <p className="text-sm text-gris" data-reveal>
            Livraison offerte dès {formatEuros(boutique.livraisonOfferte)}
          </p>
        </div>
        <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {produits.map((p) => (
            <Produit key={p.id} p={p} onAdd={onAdd} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function Atelier() {
  const scope = useRef(null);
  const fil = useRef(null);
  const reduced = useReducedMotion();
  useReveal(scope);
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // le fil se déroule le long des étapes
      gsap.fromTo(
        fil.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-etapes]', start: 'top 75%', end: 'bottom 60%', scrub: true } },
      );
      gsap.to('[data-parallaxe]', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, scope);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section id="atelier" ref={scope} className="section relative overflow-hidden bg-lin" aria-labelledby="atelier-titre">
      <p
        data-parallaxe
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-24 select-none font-display text-[14rem] leading-none text-sable/30 md:text-[22rem]"
      >
        Lin
      </p>
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
        <div>
          <Titre
            tag="L’atelier"
            id="atelier-titre"
            intro="Du champ normand à notre atelier lillois, chaque étape se fait en France, à moins de 250 km."
          >
            Du champ à la couture
          </Titre>
          <ul className="mt-12 grid grid-cols-3 gap-4">
            {engagements.map((e) => (
              <li key={e.label} data-reveal className="min-w-0 border-t border-encre/20 pt-4">
                <Counter value={e.valeur} suffix={e.suffixe} className="block font-display text-4xl md:text-5xl" />
                <p className="mt-2 text-xs leading-snug text-gris md:text-sm">{e.label}</p>
              </li>
            ))}
          </ul>
        </div>
        <ol data-etapes className="relative space-y-10 pl-10">
          <span ref={fil} aria-hidden="true" className="absolute left-3 top-2 h-[calc(100%-1rem)] w-px origin-top bg-encre" />
          {etapes.map((e, i) => (
            <li key={e.titre} data-reveal className="relative">
              <span className="absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-encre bg-lin text-[0.65rem]">
                {i + 1}
              </span>
              <h3 className="text-3xl">{e.titre}</h3>
              <p className="mt-2 leading-relaxed text-gris">{e.texte}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Livraison() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="livraison" ref={scope} className="section bg-blanc" aria-labelledby="liv-titre">
      <div className="mx-auto max-w-7xl">
        <Titre tag="Livraison & retours" id="liv-titre">
          Simple, et sans plastique
        </Titre>
        <dl className="mt-12 grid gap-px bg-lin md:grid-cols-3">
          {livraison.map(([t, d]) => (
            <div key={t} data-reveal className="bg-blanc p-6 md:p-8">
              <dt className="font-display text-3xl">{t}</dt>
              <dd className="mt-3 leading-relaxed text-gris">{d}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-20 grid gap-10 md:grid-cols-3">
          {avis.map((a) => (
            <li key={a.nom} data-reveal>
              <figure>
                <p aria-label="5 étoiles sur 5" className="tracking-[0.3em] text-terre">
                  ★★★★★
                </p>
                <blockquote className="mt-4 font-display text-2xl leading-snug">« {a.texte} »</blockquote>
                <figcaption className="etiquette mt-4">{a.nom} · achat vérifié</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FaqSection() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="faq" ref={scope} className="section bg-ivoire" aria-labelledby="faq-titre">
      <div className="mx-auto max-w-3xl">
        <Titre tag="Questions fréquentes" id="faq-titre" centre>
          Prendre soin du lin
        </Titre>
        <div className="mt-12 border-t border-lin">
          <Faq
            items={faq}
            classes={{
              item: 'border-b border-lin',
              button:
                'flex w-full items-center justify-between gap-6 py-6 text-left font-display text-2xl transition-opacity hover:opacity-60',
              icon: 'flex h-8 w-8 shrink-0 items-center justify-center text-2xl font-light',
              answer: 'pb-6 leading-relaxed text-gris',
            }}
          />
        </div>
      </div>
    </section>
  );
}

export function Boutique() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="boutique" ref={scope} className="section bg-encre text-ivoire" aria-labelledby="bq-titre">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-end">
        <div>
          <p className="etiquette !text-sable" data-reveal>
            La boutique
          </p>
          <h2 id="bq-titre" className="mt-4 text-5xl leading-[1.02] md:text-7xl" data-reveal>
            Venez toucher
            <br />
            la matière
          </h2>
        </div>
        <div data-reveal className="space-y-5 text-ivoire/80">
          <p>{boutique.adresse}</p>
          <p>Du mardi au samedi · 10 h – 19 h</p>
          <p>
            <a href={`mailto:${boutique.email}`} className="underline underline-offset-4 hover:text-ivoire">
              {boutique.email}
            </a>
          </p>
          <a href={`tel:${boutique.telephoneLien}`} className="btn mt-2 bg-ivoire text-encre hover:bg-sable">
            <span data-t={`Appeler · ${boutique.telephone}`}>Appeler · {boutique.telephone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Panier (tiroir latéral) + commande (formulaire de démonstration)
---------------------------------------------------------------- */

const validerCommande = (v) => {
  const e = {};
  if (v.nom.trim().length < 2) e.nom = 'Indiquez votre nom.';
  if (!emailOk(v.email)) e.email = 'Adresse e-mail invalide.';
  if (v.telephone && !telOk(v.telephone)) e.telephone = 'Numéro invalide (ex. 06 12 34 56 78).';
  if (v.mode === 'livraison') {
    if (v.adresse.trim().length < 6) e.adresse = 'Indiquez votre adresse.';
    if (!/^\d{5}$/.test(v.cp.trim())) e.cp = 'Code postal à 5 chiffres.';
    if (v.ville.trim().length < 2) e.ville = 'Indiquez la ville.';
  }
  return e;
};

function Champ({ f, k, label, className = '', ...props }) {
  return (
    <div className={className}>
      <label htmlFor={k} className="mb-1.5 block text-sm">
        {label}
      </label>
      <input className="field" value={f.values[k]} onChange={f.set(k)} {...f.field(k)} {...props} />
      {f.show(k) && (
        <p id={`${k}-err`} className="mt-1 text-sm text-[#b3261e]">
          {f.errors[k]}
        </p>
      )}
    </div>
  );
}

export function Panier({ open, onClose, items, setQty, clear }) {
  const panel = useRef(null);
  const closeBtn = useRef(null);
  const reduced = useReducedMotion();
  const [etape, setEtape] = useState('panier'); // panier → commande → merci
  const [commande, setCommande] = useState(null);
  const sousTotal = items.reduce((s, it) => s + it.prix * it.qte, 0);
  const nb = items.reduce((s, it) => s + it.qte, 0);
  const onValide = useCallback(
    (v) => {
      const total = sousTotal + (v.mode === 'livraison' && sousTotal < boutique.livraisonOfferte ? boutique.fraisLivraison : 0);
      setCommande({ ...v, total, numero: 'AL-' + Math.floor(10000 + Math.random() * 89999) });
      setEtape('merci');
      clear();
    },
    [sousTotal, clear],
  );
  const f = useForm({ nom: '', email: '', telephone: '', mode: 'livraison', adresse: '', cp: '', ville: '' }, validerCommande, onValide);
  const frais = f.values.mode === 'livraison' && sousTotal > 0 && sousTotal < boutique.livraisonOfferte ? boutique.fraisLivraison : 0;
  const reste = Math.max(0, boutique.livraisonOfferte - sousTotal);

  // position de départ : hors écran (fixée par GSAP pour qu'il garde la main sur la transformation)
  useLayoutEffect(() => {
    gsap.set(panel.current, { xPercent: 105 });
  }, []);
  // ouverture / fermeture animées, Échap pour fermer, focus sur le bouton fermer
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (open) {
      document.documentElement.style.overflow = 'hidden';
      gsap.to(el, { xPercent: 0, duration: reduced ? 0 : 0.6, ease: 'expo.out' });
      gsap.to('[data-voile]', { autoAlpha: 1, duration: reduced ? 0 : 0.4 });
      setTimeout(() => closeBtn.current?.focus(), 50);
    } else {
      document.documentElement.style.overflow = '';
      gsap.to(el, { xPercent: 105, duration: reduced ? 0 : 0.45, ease: 'power3.in' });
      gsap.to('[data-voile]', { autoAlpha: 0, duration: reduced ? 0 : 0.3 });
    }
    const onKey = (e) => e.key === 'Escape' && open && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, reduced, onClose]);
  // réinitialise l'étape à la fermeture après une commande
  useEffect(() => {
    if (!open && etape === 'merci') {
      const id = setTimeout(() => setEtape('panier'), 500);
      return () => clearTimeout(id);
    }
  }, [open, etape]);
  useEffect(() => {
    if (etape === 'commande' && items.length === 0) setEtape('panier');
  }, [items.length, etape]);

  const v = f.values;
  return (
    <>
      <div data-voile onClick={onClose} className="invisible fixed inset-0 z-[70] bg-encre/40 opacity-0" aria-hidden="true" />
      <aside
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="panier-titre"
        inert={!open}
        className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-ivoire shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-lin px-5 py-4">
          <h2 id="panier-titre" className="text-3xl">
            {etape === 'commande' ? 'Commande' : etape === 'merci' ? 'Merci !' : `Panier (${nb})`}
          </h2>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center text-3xl font-light"
            aria-label="Fermer le panier"
          >
            ×
          </button>
        </div>

        {etape === 'panier' && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="font-display text-2xl">Votre panier est vide.</p>
                  <a href="#collection" onClick={onClose} className="mt-4 inline-block underline underline-offset-4">
                    Découvrir la collection
                  </a>
                </div>
              ) : (
                <ul className="divide-y divide-lin">
                  {items.map((it) => (
                    <li key={it.key} className="flex gap-4 py-4">
                      <div className="h-24 w-20 shrink-0 bg-blanc p-2">
                        <Silhouette forme={it.forme} hex={hexDe(it.coloris)} />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <p className="font-display text-xl">{it.nom}</p>
                          <p className="tabular-nums">{formatEuros(it.prix * it.qte)}</p>
                        </div>
                        <p className="text-sm text-gris">
                          {nomDe(it.coloris)} · {it.taille === 'TU' ? 'Taille unique' : `Taille ${it.taille}`}
                        </p>
                        <div className="mt-auto flex items-center gap-1 pt-2">
                          <button
                            type="button"
                            onClick={() => setQty(it.key, it.qte - 1)}
                            className="h-9 w-9 border border-lin"
                            aria-label={`Retirer un ${it.nom}`}
                          >
                            −
                          </button>
                          <span className="w-8 text-center tabular-nums" aria-live="polite">
                            {it.qte}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(it.key, it.qte + 1)}
                            className="h-9 w-9 border border-lin"
                            aria-label={`Ajouter un ${it.nom}`}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => setQty(it.key, 0)}
                            className="ml-auto text-sm text-gris underline underline-offset-4"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-lin px-5 py-5">
                <p className="text-sm text-gris">
                  {reste > 0 ? `Plus que ${formatEuros(reste)} pour la livraison offerte.` : 'Livraison offerte 🎉'}
                </p>
                <div className="mt-2 h-1 bg-lin" aria-hidden="true">
                  <div
                    className="h-full bg-sauge transition-[width] duration-500"
                    style={{ width: `${Math.min(100, (sousTotal / boutique.livraisonOfferte) * 100)}%` }}
                  />
                </div>
                <p className="mt-4 flex justify-between text-lg">
                  <span>Sous-total</span>
                  <span className="tabular-nums">{formatEuros(sousTotal)}</span>
                </p>
                <Btn as="button" type="button" className="mt-4 w-full" onClick={() => setEtape('commande')}>
                  Commander
                </Btn>
              </div>
            )}
          </>
        )}

        {etape === 'commande' && (
          <form ref={f.form} noValidate onSubmit={f.submit} className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              <button type="button" onClick={() => setEtape('panier')} className="text-sm text-gris underline underline-offset-4">
                ← Retour au panier
              </button>
              <Champ f={f} k="nom" label="Nom et prénom" autoComplete="name" />
              <Champ f={f} k="email" label="E-mail" type="email" autoComplete="email" inputMode="email" />
              <Champ f={f} k="telephone" label="Téléphone (facultatif)" type="tel" autoComplete="tel" inputMode="tel" />
              <fieldset>
                <legend className="mb-1.5 text-sm">Mode de réception</legend>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ['livraison', 'Livraison', reste > 0 ? formatEuros(boutique.fraisLivraison) : 'Offerte'],
                    ['retrait', 'Retrait boutique', 'Gratuit'],
                  ].map(([val, l, prix]) => (
                    <label key={val} className="cursor-pointer">
                      <input
                        type="radio"
                        name="mode"
                        value={val}
                        checked={v.mode === val}
                        onChange={f.set('mode')}
                        className="peer sr-only"
                      />
                      <span className="block border border-lin bg-blanc p-3 text-sm peer-checked:border-encre peer-focus-visible:outline peer-focus-visible:outline-1">
                        {l}
                        <span className="block text-gris">{prix}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {v.mode === 'livraison' ? (
                <>
                  <Champ f={f} k="adresse" label="Adresse" autoComplete="street-address" />
                  <div className="grid grid-cols-[7rem_1fr] gap-3">
                    <Champ f={f} k="cp" label="Code postal" autoComplete="postal-code" inputMode="numeric" maxLength={5} />
                    <Champ f={f} k="ville" label="Ville" autoComplete="address-level2" />
                  </div>
                </>
              ) : (
                <p className="bg-lin p-3 text-sm">Retrait au {boutique.adresse}, prêt le jour même pour toute commande avant midi.</p>
              )}
            </div>
            <div className="border-t border-lin px-5 py-5">
              <p className="flex justify-between text-sm text-gris">
                <span>Sous-total</span>
                <span className="tabular-nums">{formatEuros(sousTotal)}</span>
              </p>
              <p className="flex justify-between text-sm text-gris">
                <span>Livraison</span>
                <span className="tabular-nums">{frais ? formatEuros(frais) : 'Offerte'}</span>
              </p>
              <p className="mt-2 flex justify-between text-lg">
                <span>Total</span>
                <span className="tabular-nums">{formatEuros(sousTotal + frais)}</span>
              </p>
              <Btn as="button" type="submit" className="mt-4 w-full">
                Valider la commande
              </Btn>
              <p className="mt-2 text-center text-xs text-gris">Démonstration : aucun paiement ni envoi réel.</p>
            </div>
          </form>
        )}

        {etape === 'merci' && commande && (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center" role="status">
            <p className="font-display text-6xl">✿</p>
            <p className="mt-4 font-display text-3xl">Commande {commande.numero}</p>
            <p className="mt-3 leading-relaxed text-gris">
              Merci {commande.nom.split(' ')[0]} ! Total : {formatEuros(commande.total)}.{' '}
              {commande.mode === 'livraison' ? `Expédition sous 48 h à ${commande.ville}.` : 'Votre commande vous attend en boutique.'} Un
              récapitulatif serait envoyé à {commande.email}.
            </p>
            <p className="mt-4 text-xs text-gris">(Démonstration : aucune commande n’a été transmise.)</p>
            <Btn as="button" type="button" variant="ligne" className="mt-6" onClick={onClose}>
              Continuer mes achats
            </Btn>
          </div>
        )}
      </aside>
    </>
  );
}
