import { Suspense, lazy, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Counter from '@demos/shared/components/Counter.jsx';
import Faq from '@demos/shared/components/Faq.jsx';
import { useForm } from '@demos/shared/hooks/useForm.js';
import { useHero3D } from '@demos/shared/hooks/useHero3D.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { emailOk, isoLocal, telOk } from '@demos/shared/lib/validation.js';
import { avis, cabinet, cas, chiffres, expertises, faq, methode, offres, sujets } from '../data/site';

const HorizonScene = lazy(() => import('../three/HorizonScene'));

const Fleche = () => (
  <svg className="fleche h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M2 8h11M9 4l4 4-4 4" />
  </svg>
);

function Titre({ tag, children, intro, id, clair }) {
  return (
    <div className="max-w-3xl">
      <p className={`etiquette ${clair ? '!text-ciel' : ''}`} data-reveal>
        {tag}
      </p>
      <h2 id={id} className="mt-4 text-5xl leading-[1.02] md:text-7xl" data-reveal>
        {children}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed ${clair ? 'text-papier/70' : 'text-gris'}`} data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function Hero({ onReady }) {
  const section = useRef(null);
  const { progress, reduced, inView, tier, load3d } = useHero3D(section, { onReady });
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-mot]', { yPercent: 105, duration: 1.1, stagger: 0.08, ease: 'expo.out', delay: 0.3 });
      gsap.from('[data-in]', { opacity: 0, y: 12, stagger: 0.08, duration: 0.8, delay: 0.8 });
    }, section);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section id="accueil" ref={section} className={`relative ${reduced ? '' : 'h-[210svh]'}`} aria-label="Accueil">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_60%_55%_at_70%_45%,#e7ecfb,#f4f2ec_70%)]">
        {load3d && (
          <Suspense fallback={null}>
            <HorizonScene progress={progress} reduced={reduced} tier={tier} active={inView} onReady={onReady} />
          </Suspense>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-papier via-papier/90 to-transparent md:hidden" />
        <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-8 md:justify-center md:px-8 md:pb-0">
          <p data-in className="etiquette">
            {cabinet.accroche}
          </p>
          <h1 className="mt-4 text-[clamp(3.3rem,11vw,7.5rem)] leading-[0.95]">
            <span className="block overflow-hidden">
              <span data-mot className="block">
                Prenez le
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span data-mot className="block italic text-cobalt">
                bon cap.
              </span>
            </span>
          </h1>
          <p data-in className="mt-4 max-w-md text-lg leading-relaxed text-gris">
            {cabinet.intro}
          </p>
          <div data-in className="pointer-events-auto mt-6 flex flex-wrap gap-3">
            <a href="#diagnostic" className="btn btn-cobalt">
              Faire mon diagnostic express <Fleche />
            </a>
            <a href="#rendez-vous" className="btn btn-ligne max-sm:hidden">
              Premier rendez-vous offert
            </a>
          </div>
          <ul data-in className="mt-8 flex gap-8 max-md:hidden">
            {chiffres.map((c) => (
              <li key={c.label}>
                <Counter value={c.valeur} suffix={c.suffixe} className="block font-display text-4xl" />
                <span className="text-sm text-gris">{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function Expertises() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="expertises" ref={scope} className="section bg-papier" aria-labelledby="ex-titre">
      <div className="mx-auto max-w-7xl">
        <Titre
          tag="Expertises"
          id="ex-titre"
          intro="Un interlocuteur unique, quatre domaines. On intervient là où ça compte pour vous, pas sur un catalogue."
        >
          Ce qu’on fait <span className="italic text-cobalt">avec vous</span>
        </Titre>
        <ol className="mt-14 border-t border-trait">
          {expertises.map((e, i) => (
            <li
              key={e.id}
              data-reveal
              className="group grid gap-4 border-b border-trait py-8 transition-colors hover:bg-blanc md:grid-cols-[5rem_1fr_1fr] md:px-4"
            >
              <span className="font-display text-3xl text-cobalt">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-3xl md:text-4xl">{e.titre}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-gris">{e.texte}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-2 md:justify-end">
                {e.livrables.map((l) => (
                  <li
                    key={l}
                    className="rounded-full border border-trait bg-blanc px-3 py-1 text-sm transition-colors group-hover:border-cobalt"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Diagnostic express : 5 curseurs → score sur 100 et 3 priorités.
   Calcul indicatif, entièrement dans le navigateur.
---------------------------------------------------------------- */

const CURSEURS = [
  {
    k: 'marge',
    label: 'Marge brute',
    min: 5,
    max: 80,
    pas: 1,
    fmt: (v) => `${v} %`,
    aide: 'Ventes moins achats consommés, en % du chiffre d’affaires.',
  },
  {
    k: 'resultat',
    label: 'Résultat net',
    min: -15,
    max: 25,
    pas: 1,
    fmt: (v) => `${v > 0 ? '+' : ''}${v} %`,
    aide: 'Bénéfice ou perte, en % du chiffre d’affaires.',
  },
  {
    k: 'tresorerie',
    label: 'Trésorerie disponible',
    min: 0,
    max: 6,
    pas: 0.5,
    fmt: (v) => `${String(v).replace('.', ',')} mois`,
    aide: 'Combien de mois de charges vous pourriez payer sans rien encaisser.',
  },
  {
    k: 'delai',
    label: 'Délai de paiement clients',
    min: 0,
    max: 120,
    pas: 5,
    fmt: (v) => `${v} jours`,
    aide: 'Temps moyen entre la facture et l’encaissement.',
  },
  {
    k: 'heures',
    label: 'Vos heures par semaine',
    min: 35,
    max: 80,
    pas: 1,
    fmt: (v) => `${v} h`,
    aide: 'Le temps que vous, dirigeant, passez dans l’entreprise.',
  },
];

function evaluer(v) {
  // chaque indicateur est noté sur 20, puis le tout ramené sur 100
  const notes = {
    marge: Math.min(20, Math.max(0, ((v.marge - 15) / 40) * 20)),
    resultat: Math.min(20, Math.max(0, ((v.resultat + 5) / 15) * 20)),
    tresorerie: Math.min(20, (v.tresorerie / 3) * 20),
    delai: Math.min(20, Math.max(0, ((90 - v.delai) / 60) * 20)),
    heures: Math.min(20, Math.max(0, ((70 - v.heures) / 25) * 20)),
  };
  const score = Math.round(Object.values(notes).reduce((a, b) => a + b, 0));
  const conseils = {
    marge: [
      'Revoir vos prix et vos coûts',
      'Calculer un prix de revient par produit ou chantier, et ajuster les tarifs qui ne couvrent pas vos coûts.',
    ],
    resultat: [
      'Retrouver de la rentabilité',
      'Identifier les activités qui perdent de l’argent et les charges qui peuvent baisser sans toucher à la qualité.',
    ],
    tresorerie: [
      'Sécuriser la trésorerie',
      'Construire un prévisionnel à 6 mois et négocier en amont avec votre banque plutôt qu’en urgence.',
    ],
    delai: [
      'Être payé plus vite',
      'Acomptes, relances automatiques, conditions de paiement claires sur vos devis : chaque jour gagné compte.',
    ],
    heures: ['Libérer du temps au dirigeant', 'Déléguer, structurer l’équipe et automatiser les tâches répétitives.'],
  };
  const priorites = Object.entries(notes)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([k, n]) => ({ k, n, titre: conseils[k][0], texte: conseils[k][1] }));
  return { score, notes, priorites };
}

function Jauge({ score }) {
  const arc = useRef(null);
  const nombre = useRef(null);
  const precedent = useRef(0);
  const reduced = useReducedMotion();
  const L = 2 * Math.PI * 54 * 0.75; // trois quarts de cercle
  useEffect(() => {
    const etat = { v: precedent.current };
    const maj = () => {
      if (arc.current) arc.current.style.strokeDashoffset = String(L * (1 - etat.v / 100));
      if (nombre.current) nombre.current.textContent = Math.round(etat.v);
    };
    if (reduced) {
      etat.v = score;
      maj();
    } else gsap.to(etat, { v: score, duration: 0.8, ease: 'power3.out', onUpdate: maj });
    precedent.current = score;
  }, [score, reduced, L]);
  const couleur = score >= 70 ? '#1f9d6b' : score >= 45 ? '#3d6bff' : '#c2412d';
  return (
    <div className="relative mx-auto h-52 w-52">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-[135deg]" aria-hidden="true">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#dcd8ce" strokeWidth="8" strokeDasharray={`${L} 400`} strokeLinecap="round" />
        <circle
          ref={arc}
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={couleur}
          strokeWidth="8"
          strokeDasharray={`${L} 400`}
          strokeDashoffset={L}
          strokeLinecap="round"
          style={{ transition: 'stroke 0.4s' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-7xl leading-none tabular-nums" ref={nombre}>
          0
        </span>
        <span className="text-sm text-gris">sur 100</span>
      </div>
    </div>
  );
}

export function Diagnostic({ onRendezVous }) {
  const scope = useRef(null);
  const [v, setV] = useState({ marge: 35, resultat: 3, tresorerie: 1.5, delai: 55, heures: 58 });
  const { score, priorites } = useMemo(() => evaluer(v), [v]);
  useReveal(scope);
  const verdict =
    score >= 70
      ? 'Entreprise solide : de quoi viser plus haut.'
      : score >= 45
        ? 'Des bases correctes, et de vraies marges de progrès.'
        : 'Plusieurs signaux d’alerte : à traiter rapidement.';
  return (
    <section id="diagnostic" ref={scope} className="section bg-blanc" aria-labelledby="dg-titre">
      <div className="mx-auto max-w-7xl">
        <Titre
          tag="Diagnostic express · 2 minutes"
          id="dg-titre"
          intro="Déplacez les curseurs selon vos derniers chiffres (ou une estimation). Rien n’est enregistré ni envoyé."
        >
          Où en est <span className="italic text-cobalt">votre entreprise ?</span>
        </Titre>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-8" data-reveal>
            {CURSEURS.map((c) => {
              const pc = ((v[c.k] - c.min) / (c.max - c.min)) * 100;
              return (
                <div key={c.k}>
                  <div className="flex items-baseline justify-between gap-4">
                    <label htmlFor={`c-${c.k}`} className="font-medium">
                      {c.label}
                    </label>
                    <output htmlFor={`c-${c.k}`} className="font-display text-3xl tabular-nums">
                      {c.fmt(v[c.k])}
                    </output>
                  </div>
                  <input
                    id={`c-${c.k}`}
                    type="range"
                    min={c.min}
                    max={c.max}
                    step={c.pas}
                    value={v[c.k]}
                    onChange={(e) => setV((o) => ({ ...o, [c.k]: Number(e.target.value) }))}
                    className="curseur mt-3"
                    style={{ '--p': `${pc}%` }}
                    aria-describedby={`aide-${c.k}`}
                  />
                  <p id={`aide-${c.k}`} className="mt-2 text-sm text-gris">
                    {c.aide}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="min-w-0 rounded-2xl border border-trait bg-papier p-6 md:p-8 lg:sticky lg:top-24 lg:self-start" data-reveal>
            <Jauge score={score} />
            <p className="mt-2 text-center font-display text-2xl" aria-live="polite">
              {verdict}
            </p>
            <h3 className="etiquette mt-8">Vos 3 priorités</h3>
            <ol className="mt-3 space-y-4">
              {priorites.map((p, i) => (
                <li key={p.k} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nuit text-sm text-papier">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{p.titre}</p>
                    <p className="text-sm leading-relaxed text-gris">{p.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() =>
                onRendezVous(`Diagnostic express : ${score}/100. Priorités : ${priorites.map((p) => p.titre.toLowerCase()).join(', ')}.`)
              }
              className="btn btn-nuit mt-8 w-full"
            >
              En parler lors du rendez-vous offert <Fleche />
            </button>
            <p className="mt-3 text-center text-xs text-gris">Résultat indicatif, qui ne remplace pas une analyse de vos comptes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function Methode() {
  const scope = useRef(null);
  const ligne = useRef(null);
  const reduced = useReducedMotion();
  useReveal(scope);
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ligne.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-etapes]', start: 'top 70%', end: 'bottom 60%', scrub: true } },
      );
    }, scope);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section id="methode" ref={scope} className="section bg-nuit text-papier" aria-labelledby="me-titre">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
        <Titre tag="Méthode" id="me-titre" clair intro="Six mois pour changer de trajectoire, avec des résultats mesurés à chaque étape.">
          Un cap, <span className="italic text-ciel">puis des étapes</span>
        </Titre>
        <ol data-etapes className="relative space-y-12 pl-10">
          <span ref={ligne} aria-hidden="true" className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-cobalt" />
          {methode.map((m) => (
            <li key={m.titre} data-reveal className="relative">
              <span className="absolute -left-10 top-1.5 h-6 w-6 rounded-full border-2 border-cobalt bg-nuit" aria-hidden="true" />
              <p className="etiquette !text-ciel">{m.duree}</p>
              <h3 className="mt-1 text-4xl">{m.titre}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-papier/70">{m.texte}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Cas() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="cas" ref={scope} className="section bg-papier" aria-labelledby="cas-titre">
      <div className="mx-auto max-w-7xl">
        <Titre tag="Études de cas" id="cas-titre" intro="Des entreprises comme la vôtre (noms modifiés).">
          Ce que ça <span className="italic text-cobalt">change</span>
        </Titre>
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {cas.map((c) => (
            <li key={c.client} data-reveal className="min-w-0">
              <article className="flex h-full flex-col rounded-2xl border border-trait bg-blanc p-6 transition-shadow hover:shadow-[0_20px_50px_-30px_rgb(15_27_45/0.4)]">
                <p className="etiquette">{c.client}</p>
                <p className="mt-4 font-display text-2xl leading-snug">{c.defi}</p>
                <p className="mt-3 flex-1 text-gris">{c.action}</p>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-trait pt-5">
                  {c.resultats.map(([val, l]) => (
                    <div key={l}>
                      <dt className="sr-only">{l}</dt>
                      <dd className="font-display text-4xl text-cobalt">{val}</dd>
                      <dd className="text-sm text-gris">{l}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </li>
          ))}
        </ul>
        <ul className="mt-14 grid gap-8 md:grid-cols-2">
          {avis.map((a) => (
            <li key={a.nom} data-reveal>
              <figure>
                <blockquote className="font-display text-3xl leading-snug md:text-4xl">« {a.texte} »</blockquote>
                <figcaption className="mt-4 text-gris">
                  {a.nom} · {a.role}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-xs text-gris">
          * Moyenne constatée sur les accompagnements de 6 mois terminés (données fictives de démonstration).
        </p>
      </div>
    </section>
  );
}

export function Offres() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="offres" ref={scope} className="section bg-blanc" aria-labelledby="of-titre">
      <div className="mx-auto max-w-7xl">
        <Titre tag="Offres & tarifs" id="of-titre" intro="Des prix annoncés à l’avance. Pas de jours facturés en plus, pas de surprise.">
          Simple et <span className="italic text-cobalt">transparent</span>
        </Titre>
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {offres.map((o) => (
            <li key={o.id} data-reveal className="min-w-0">
              <article
                className={`flex h-full flex-col rounded-2xl p-7 ${o.vedette ? 'bg-nuit text-papier' : 'border border-trait bg-papier'}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-3xl">{o.nom}</h3>
                  {o.vedette && <span className="rounded-full bg-cobalt px-3 py-1 text-xs font-medium text-white">Le plus choisi</span>}
                </div>
                <p className="mt-6 font-display text-6xl">{o.prix}</p>
                <p className={`text-sm ${o.vedette ? 'text-papier/60' : 'text-gris'}`}>{o.unite}</p>
                <ul className={`mt-6 flex-1 space-y-3 ${o.vedette ? 'text-papier/85' : ''}`}>
                  {o.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <svg
                        className="mt-1 h-4 w-4 shrink-0 text-cobalt"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M3 8.5l3 3 7-7" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
                <a href="#rendez-vous" className={`btn mt-8 ${o.vedette ? 'btn-cobalt' : 'btn-ligne'}`}>
                  En discuter <Fleche />
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

const HEURES = ['9 h 00', '10 h 30', '14 h 00', '15 h 30', '17 h 00'];

/** Les 10 prochains jours ouvrés (à partir de demain). */
function useJours() {
  return useMemo(() => {
    const out = [];
    const d = new Date();
    while (out.length < 10) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d));
    }
    return out;
  }, []);
}

/** Créneaux déjà pris (fictifs, mais stables pour un jour donné). */
const pris = (iso, h) => (iso.charCodeAt(9) + h.charCodeAt(0) + h.length) % 4 === 0;

const valider = (v) => {
  const e = {};
  if (!v.jour) e.jour = 'Choisissez un jour.';
  else if (!v.heure) e.heure = 'Choisissez un horaire.';
  if (v.nom.trim().length < 2) e.nom = 'Indiquez votre nom.';
  if (!emailOk(v.email)) e.email = 'Adresse e-mail invalide.';
  if (v.telephone && !telOk(v.telephone)) e.telephone = 'Numéro invalide (ex. 06 12 34 56 78).';
  return e;
};

export function RendezVous({ message }) {
  const scope = useRef(null);
  const jours = useJours();
  const [ok, setOk] = useState(null);
  const f = useForm(
    { jour: '', heure: '', mode: 'visio', sujet: sujets[0], nom: '', entreprise: '', email: '', telephone: '', message: '' },
    valider,
    (v) => setOk(v),
  );
  const v = f.values;
  useReveal(scope);
  useEffect(() => {
    if (message) f.setValue('message', message);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ne réagit qu'au message venu du diagnostic
  }, [message]);
  const jourChoisi = jours.find((d) => isoLocal(d) === v.jour);
  const fmtJour = (d) => d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  return (
    <section id="rendez-vous" ref={scope} className="section bg-papier" aria-labelledby="rv-titre">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Titre
            tag="Premier rendez-vous offert"
            id="rv-titre"
            intro="45 minutes pour faire connaissance et comprendre votre situation. En visio ou au cabinet, sans engagement."
          >
            Parlons de <span className="italic text-cobalt">votre cap</span>
          </Titre>
          <dl className="mt-10 space-y-4" data-reveal>
            <div>
              <dt className="etiquette">Cabinet</dt>
              <dd>{cabinet.adresse}</dd>
            </div>
            <div>
              <dt className="etiquette">Zone</dt>
              <dd>{cabinet.zone}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3" data-reveal>
            <a href={`tel:${cabinet.telephoneLien}`} className="btn btn-ligne">
              Appeler · {cabinet.telephone}
            </a>
            <a href={`mailto:${cabinet.email}`} className="btn text-cobalt underline-offset-4 hover:underline">
              {cabinet.email}
            </a>
          </div>
        </div>
        <div data-reveal className="min-w-0 rounded-2xl border border-trait bg-blanc p-5 md:p-8">
          {ok ? (
            <div role="status" className="py-10 text-center">
              <p className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-vert/15 text-3xl text-vert">✓</p>
              <p className="mt-5 font-display text-4xl">C’est noté, {ok.nom.split(' ')[0]}.</p>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-gris">
                Rendez-vous {ok.mode === 'visio' ? 'en visio' : 'au cabinet'} le {fmtJour(jours.find((d) => isoLocal(d) === ok.jour))} à{' '}
                {ok.heure}. Une invitation serait envoyée à {ok.email}.
              </p>
              <p className="mt-4 text-xs text-gris">(Démonstration : aucun rendez-vous n’a été pris.)</p>
              <button
                type="button"
                className="btn btn-ligne mt-6"
                onClick={() => {
                  f.reset();
                  setOk(null);
                }}
              >
                Choisir un autre créneau
              </button>
            </div>
          ) : (
            <form ref={f.form} noValidate onSubmit={f.submit} className="grid grid-cols-1 gap-6">
              <fieldset className="min-w-0">
                <legend className="mb-3 font-medium">1. Le jour</legend>
                <div className="relative -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
                  {jours.map((d, i) => {
                    const iso = isoLocal(d);
                    return (
                      <label key={iso} className="shrink-0 cursor-pointer">
                        <input
                          type="radio"
                          name="jour"
                          value={iso}
                          checked={v.jour === iso}
                          onChange={(e) => {
                            f.setValue('jour', e.target.value);
                            f.setValue('heure', '');
                          }}
                          className="peer sr-only"
                          {...(i === 0 ? { id: 'jour' } : {})}
                        />
                        <span className="flex w-16 flex-col items-center rounded-xl border border-trait py-2.5 transition-colors peer-checked:border-nuit peer-checked:bg-nuit peer-checked:text-papier peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-cobalt">
                          <span className="text-xs capitalize opacity-70">{d.toLocaleDateString('fr-FR', { weekday: 'short' })}</span>
                          <span className="font-display text-3xl leading-none">{d.getDate()}</span>
                          <span className="text-xs opacity-70">{d.toLocaleDateString('fr-FR', { month: 'short' })}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                {f.show('jour') && (
                  <p id="jour-err" className="mt-1 text-sm text-[#c2412d]">
                    {f.errors.jour}
                  </p>
                )}
              </fieldset>
              <fieldset className="min-w-0" disabled={!v.jour}>
                <legend className="mb-3 font-medium">
                  2. L’horaire {jourChoisi && <span className="text-gris">· {fmtJour(jourChoisi)}</span>}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {HEURES.map((h, i) => {
                    const indispo = v.jour && pris(v.jour, h);
                    return (
                      <label key={h} className={indispo ? 'cursor-not-allowed' : 'cursor-pointer'}>
                        <input
                          type="radio"
                          name="heure"
                          value={h}
                          disabled={!v.jour || indispo}
                          checked={v.heure === h}
                          onChange={f.set('heure')}
                          className="peer sr-only"
                          {...(i === 0 ? { id: 'heure' } : {})}
                        />
                        <span className="block rounded-lg border border-trait px-4 py-2.5 tabular-nums transition-colors peer-checked:border-cobalt peer-checked:bg-cobalt peer-checked:text-white peer-disabled:opacity-35 peer-disabled:line-through peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-cobalt">
                          {h}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {!v.jour && <p className="mt-2 text-sm text-gris">Choisissez d’abord un jour.</p>}
                {f.show('heure') && (
                  <p id="heure-err" className="mt-1 text-sm text-[#c2412d]">
                    {f.errors.heure}
                  </p>
                )}
              </fieldset>
              <fieldset className="min-w-0">
                <legend className="mb-3 font-medium">3. Vous</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div role="radiogroup" aria-label="Format" className="grid grid-cols-2 gap-2 sm:col-span-2">
                    {[
                      ['visio', 'En visio'],
                      ['cabinet', 'Au cabinet (Lille)'],
                    ].map(([id, l]) => (
                      <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={v.mode === id}
                        onClick={() => f.setValue('mode', id)}
                        className={`rounded-lg border px-3 py-2.5 transition-colors ${v.mode === id ? 'border-nuit bg-nuit text-papier' : 'border-trait'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="sujet" className="mb-1.5 block text-sm">
                      Sujet principal
                    </label>
                    <select className="field" value={v.sujet} onChange={f.set('sujet')} {...f.field('sujet')}>
                      {sujets.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  {[
                    ['nom', 'Nom', { autoComplete: 'name' }],
                    ['entreprise', 'Entreprise (facultatif)', { autoComplete: 'organization' }],
                    ['email', 'E-mail', { type: 'email', autoComplete: 'email', inputMode: 'email' }],
                    ['telephone', 'Téléphone (facultatif)', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' }],
                  ].map(([k, l, props]) => (
                    <div key={k}>
                      <label htmlFor={k} className="mb-1.5 block text-sm">
                        {l}
                      </label>
                      <input className="field" value={v[k]} onChange={f.set(k)} {...f.field(k)} {...props} />
                      {f.show(k) && (
                        <p id={`${k}-err`} className="mt-1 text-sm text-[#c2412d]">
                          {f.errors[k]}
                        </p>
                      )}
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-1.5 block text-sm">
                      Votre situation en quelques mots (facultatif)
                    </label>
                    <textarea rows={3} className="field" value={v.message} onChange={f.set('message')} {...f.field('message')} />
                  </div>
                </div>
              </fieldset>
              <button type="submit" className="btn btn-cobalt">
                Réserver ce rendez-vous <Fleche />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="faq" ref={scope} className="section bg-blanc" aria-labelledby="faq-titre">
      <div className="mx-auto max-w-3xl">
        <Titre tag="Questions fréquentes" id="faq-titre">
          Avant de se lancer
        </Titre>
        <div className="mt-10 border-t border-trait">
          <Faq
            items={faq}
            classes={{
              item: 'border-b border-trait',
              button:
                'flex w-full items-center justify-between gap-6 py-6 text-left font-display text-2xl transition-colors hover:text-cobalt',
              icon: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-trait text-xl text-cobalt',
              answer: 'pb-6 leading-relaxed text-gris',
            }}
          />
        </div>
      </div>
    </section>
  );
}
