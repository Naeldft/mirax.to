import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { snack } from '../data/site';

/* ------------------------------------------------------------------
   Intro « vidéo au défilement » (technique des pages produit Apple) : la visite filmée de Crunch!
   (la façade, la porte, la salle, le comptoir, la cuisine, le burger) est découpée en images que l'on dessine
   dans un canvas. On avance quand on descend, on recule quand on remonte, avec un léger lissage.
   - Arrivée depuis la carte de l'accueil : la carte a grandi jusqu'à se poser sur la première image du film ;
     on la reprend telle quelle (pas d'écran de chargement), puis la caméra avance seule et entre dans le snack
     (façade puis porte, 1,6 s). Ensuite le défilement prend le relais : un petit scroll fait avancer beaucoup
     d'images (environ 2 hauteurs d'écran pour tout le reste du film), sans jamais sauter d'image au rendu.
   - Ouverture directe par un lien : un petit écran de chargement, le temps de charger l'entrée.
   - 579 images (toutes les images des 3 clips, 24 par seconde, vitesse d'origine), recadrées pour sortir le
     filigrane du cadre ; 1 280 × 720 sur ordinateur (16:9 plein écran), centre recadré en vertical 540 × 960
     sur téléphone. Chargement : la première image, l'entrée complète, puis le reste en passes (1 sur 8, 4, 2, 1) ;
     on affiche toujours l'image chargée la plus proche.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const N = 579;
const ENTREE = 96; // image où l'on a passé la porte (4 s de film)
const DUREE_ENTREE = 1600; // ms
const HAUTEUR = 300; // svh : 100 d'écran fixe + 200 de défilement
const LISSAGE = 0.2;

/** Les textes du parcours, par images du film [de, a[. */
const ETAPES = [
  { de: 0, a: 78, sur: 'La façade', titre: 'Smash. Crunch. Miam.', texte: snack.accroche, h1: true },
  { de: 130, a: 250, sur: 'La salle', titre: 'On s’installe.', texte: 'Banquettes, lumière chaude, la cuisine en ligne de mire.' },
  { de: 268, a: 336, sur: 'Le comptoir', titre: 'On commande.', texte: 'Au comptoir ou en ligne, prêt en 15 minutes.' },
  { de: 352, a: 448, sur: 'La cuisine', titre: 'Smashé à la plancha.', texte: 'Devant vous, minute par minute.' },
  { de: 462, a: N + 1, sur: 'Le burger', titre: 'Et voilà.', texte: snack.intro },
];

const nom = (i, dossier) => `${BASE}sequence/${dossier}/${String(i + 1).padStart(3, '0')}.webp`;
/** Ordre de chargement : la première image, toute l'entrée, puis le reste en passes de plus en plus fines. */
function ordre() {
  const o = [];
  const vu = new Set();
  const ajout = (i) => !vu.has(i) && (vu.add(i), o.push(i));
  for (let i = 0; i <= ENTREE; i++) ajout(i);
  for (const pas of [8, 4, 2, 1]) for (let i = ENTREE; i < N; i += pas) ajout(i);
  return o;
}
const doux = (x) => 0.5 - Math.cos(Math.PI * Math.min(1, Math.max(0, x))) / 2;

export default function Sequence() {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const canvas = useRef(null);
  const images = useRef([]);
  const cible = useRef(0);
  const courant = useRef(0);
  const auto = useRef({ debut: 0, fini: false });
  const [arrivee] = useState(() => typeof window !== 'undefined' && !!window.psArrivee);
  const [charge, setCharge] = useState(0); // part de l'entrée chargée (0 → 1)
  const [pret, setPret] = useState(false);
  const [etape, setEtape] = useState(0);
  const [visible, setVisible] = useState(true);

  // préchargement : première image, entrée complète, puis le reste
  useEffect(() => {
    if (reduit) return;
    const mobile = matchMedia('(max-width: 767px), (orientation: portrait)').matches;
    const dossier = mobile ? 'mobile' : 'ordi';
    const liste = ordre();
    let annule = false;
    let k = 0;
    let entreeChargee = 0;
    const demarrer = () => {
      if (annule || auto.current.debut) return;
      auto.current.debut = performance.now();
      setPret(true);
    };
    const suivant = () => {
      if (annule || k >= liste.length) return;
      const i = liste[k++];
      const im = new Image();
      im.decoding = 'async';
      im.onload = im.onerror = () => {
        if (annule) return;
        if (im.naturalWidth) images.current[i] = im;
        if (i <= ENTREE) {
          entreeChargee++;
          setCharge(entreeChargee / (ENTREE + 1));
          // on part dès que la première seconde de l'entrée est là (préchargée au survol de la carte ;
          // la suite arrive pendant le mouvement, dans l'ordre)
          if (entreeChargee >= 24) demarrer();
        }
        suivant();
      };
      im.src = nom(i, dossier);
    };
    for (let p = 0; p < 6; p++) suivant(); // 6 téléchargements en parallèle
    const garde = setTimeout(demarrer, arrivee ? 900 : 8000); // ne jamais rester bloqué
    return () => {
      annule = true;
      clearTimeout(garde);
    };
  }, [reduit, arrivee]);

  // défilement → image visée ; boucle de rendu lissée
  useEffect(() => {
    if (reduit) return;
    const s = section.current;
    let p = 0;
    const maj = () => {
      const r = s.getBoundingClientRect();
      p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      setVisible(r.bottom > 0);
    };
    maj();
    addEventListener('scroll', maj, { passive: true });
    addEventListener('resize', maj);
    let dernier = -1;
    let signale = false;
    let etapeCourante = -2;
    let raf;
    const dessiner = () => {
      raf = requestAnimationFrame(dessiner);
      const a = auto.current;
      if (!a.debut) cible.current = 0;
      else if (!a.fini) {
        const t = (performance.now() - a.debut) / DUREE_ENTREE;
        cible.current = doux(t) * ENTREE;
        if (t >= 1) a.fini = true;
        courant.current = cible.current; // l'entrée est déjà fluide : pas de lissage en plus
      } else cible.current = ENTREE + p * (N - 1 - ENTREE);
      if (a.fini) courant.current += (cible.current - courant.current) * LISSAGE;
      const voulu = Math.round(courant.current);
      const e = ETAPES.findIndex((x) => voulu >= x.de && voulu < x.a);
      if (e !== etapeCourante) setEtape((etapeCourante = e));
      const c = canvas.current;
      if (!c) return;
      // l'image chargée la plus proche (pendant que les passes suivantes arrivent)
      let i = -1;
      for (let d = 0; d < N && i < 0; d++) {
        if (images.current[voulu - d]) i = voulu - d;
        else if (images.current[voulu + d]) i = voulu + d;
      }
      const w = Math.round(c.clientWidth * Math.min(devicePixelRatio, 2));
      const h = Math.round(c.clientHeight * Math.min(devicePixelRatio, 2));
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
        dernier = -1;
      }
      const im = images.current[i];
      if (!im || i === dernier) return;
      dernier = i;
      const g = c.getContext('2d');
      // plein écran, cadrage centré (« object-fit: cover ») : même cadrage que la carte de l'accueil
      const k = Math.max(w / im.naturalWidth, h / im.naturalHeight);
      const dw = im.naturalWidth * k;
      const dh = im.naturalHeight * k;
      g.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
      if (!signale && i === 0) {
        // la première image est à l'écran : l'image d'attente de la transition peut partir
        signale = true;
        requestAnimationFrame(() => dispatchEvent(new Event('ps-demo-prete')));
      }
    };
    dessiner();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', maj);
      removeEventListener('resize', maj);
    };
  }, [reduit]);

  const passer = () => document.getElementById('carte')?.scrollIntoView({ behavior: reduit ? 'auto' : 'smooth' });

  if (reduit) return null;

  return (
    <section id="accueil" ref={section} aria-label="La visite de Crunch!, de la façade au burger" className="relative bg-nuit text-creme" style={{ height: `${HAUTEUR}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nuit/80 via-transparent to-transparent md:bg-gradient-to-r md:from-nuit/75 md:via-nuit/10 md:to-transparent" />

        {/* les textes du parcours */}
        {ETAPES.map((e, i) => {
          const Titre = e.h1 ? 'h1' : 'h2';
          return (
            <div
              key={e.sur}
              aria-hidden={etape !== i}
              className={`pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-[calc(9.5rem+env(safe-area-inset-bottom))] transition-all duration-500 md:inset-y-0 md:flex md:max-w-[46%] md:flex-col md:justify-center md:px-12 md:pb-0 ${
                etape === i ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <p className="surtitre">{e.sur}</p>
              <Titre className="mt-2 text-[clamp(2.6rem,min(10vw,9svh),6rem)] leading-[0.95]">{e.titre}</Titre>
              <p className="mt-3 max-w-md text-lg leading-relaxed text-creme/85">{e.texte}</p>
            </div>
          );
        })}

        {/* « Passer » : directement à la carte, dans le coin bas droit (dégagé, loin de l'enseigne) */}
        {visible && pret && (
          <button
            type="button"
            onClick={passer}
            className="btn btn-ligne absolute bottom-[calc(5.4rem+env(safe-area-inset-bottom))] right-4 z-20 !min-h-11 !px-5 !py-2 backdrop-blur md:bottom-8 md:right-8"
          >
            Passer
          </button>
        )}

        {/* ouverture directe par un lien seulement : un petit écran de chargement */}
        {!arrivee && (
          <div
            role="status"
            aria-live="polite"
            className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-nuit transition-opacity duration-500 ${pret ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
          >
            <p className="titre text-4xl text-flamme" style={{ textShadow: `0 0 ${6 + charge * 26}px rgb(255 107 26 / ${0.3 + charge * 0.6})` }}>
              CRUNCH!
            </p>
            <div className="mt-4 h-1 w-40 overflow-hidden rounded-full bg-creme/10">
              <div className="h-full rounded-full bg-gradient-to-r from-braise to-flamme transition-[width] duration-200" style={{ width: `${Math.round(Math.min(1, (charge * (ENTREE + 1)) / 24) * 100)}%` }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
