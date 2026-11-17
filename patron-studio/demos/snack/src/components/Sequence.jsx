import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { snack } from '../data/site';

/* ------------------------------------------------------------------
   Intro « vidéo au défilement » (technique des pages produit Apple) : la visite filmée de Crunch!
   (la façade, la salle, la cuisine, le burger) est découpée en images ; le défilement choisit l'image,
   dans un canvas. On avance quand on descend, on recule quand on remonte, avec un léger lissage.
   - 579 images : toutes les images des 3 clips (24 par seconde, 24 s de film, vitesse d'origine), raccords en
     fondu ; image légèrement recadrée et zoomée (×1,15) pour sortir le filigrane Kling du cadre.
     1 280 × 720 sur ordinateur, recadrage vertical au centre en 540 × 960 sur téléphone.
   - Chargement en plusieurs passes : 1 image sur 8 d'abord (le film est déjà parcourable : 2 Mo sur téléphone),
     puis les autres en arrière-plan ; on affiche toujours l'image chargée la plus proche.
   - Le défilement total tient en environ 2,5 hauteurs d'écran.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const N = 579;
const HAUTEUR = 350; // svh : 100 d'écran fixe + 250 de défilement
const LISSAGE = 0.16;

/** Les textes du parcours : [début, fin] en part du défilement. */
const ETAPES = [
  { de: 0.0, a: 0.12, sur: 'La façade', titre: 'Smash. Crunch. Miam.', texte: `${snack.accroche}` },
  { de: 0.22, a: 0.52, sur: 'La salle', titre: 'On s’installe.', texte: 'Banquettes, lumière chaude, et la cuisine en ligne de mire.' },
  { de: 0.62, a: 0.78, sur: 'La cuisine', titre: 'Smashé à la plancha.', texte: 'Devant vous, minute par minute.' },
  { de: 0.84, a: 1.01, sur: 'Le burger', titre: 'Et voilà.', texte: snack.intro },
];

const nom = (i, dossier) => `${BASE}sequence/${dossier}/${String(i + 1).padStart(3, '0')}.webp`;
/** Ordre de chargement : 1 image sur 8 (premier affichage), puis 1 sur 4, 1 sur 2, puis toutes. */
const PASSES = [8, 4, 2, 1];
const ordre = () => {
  const vu = new Set();
  const o = [];
  for (const pas of PASSES) for (let i = 0; i < N; i += pas) if (!vu.has(i)) vu.add(i), o.push([i, pas]);
  return o;
};

export default function Sequence({ onPret }) {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const canvas = useRef(null);
  const images = useRef([]);
  const cible = useRef(0);
  const courant = useRef(0);
  const [charge, setCharge] = useState(0); // part de la première passe chargée (0 → 1)
  const [pret, setPret] = useState(false);
  const [etape, setEtape] = useState(0);
  const [visible, setVisible] = useState(true);

  // préchargement en passes
  useEffect(() => {
    if (reduit) {
      onPret?.();
      return;
    }
    const mobile = matchMedia('(max-width: 767px), (orientation: portrait)').matches;
    const dossier = mobile ? 'mobile' : 'ordi';
    const liste = ordre();
    const premiers = liste.filter(([, pas]) => pas >= 8).length;
    let fini = 0;
    let annule = false;
    let k = 0;
    const suivant = () => {
      if (annule || k >= liste.length) return;
      const [i] = liste[k++];
      const im = new Image();
      im.decoding = 'async';
      im.onload = im.onerror = () => {
        if (annule) return;
        if (im.naturalWidth) images.current[i] = im;
        fini++;
        if (fini <= premiers) setCharge(fini / premiers);
        if (fini === premiers) {
          setPret(true);
          onPret?.();
        }
        suivant();
      };
      im.src = nom(i, dossier);
    };
    for (let p = 0; p < 6; p++) suivant(); // 6 téléchargements en parallèle
    return () => {
      annule = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- au montage
  }, [reduit]);

  // défilement → image visée ; boucle de rendu lissée
  useEffect(() => {
    if (reduit) return;
    const s = section.current;
    const maj = () => {
      const r = s.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      cible.current = p;
      setEtape(ETAPES.findIndex((e) => p >= e.de && p < e.a));
      setVisible(r.bottom > 0);
    };
    maj();
    addEventListener('scroll', maj, { passive: true });
    addEventListener('resize', maj);
    let dernier = -1;
    let raf;
    const dessiner = () => {
      raf = requestAnimationFrame(dessiner);
      courant.current += (cible.current - courant.current) * LISSAGE;
      if (Math.abs(cible.current - courant.current) < 0.0005) courant.current = cible.current;
      const c = canvas.current;
      if (!c) return;
      const voulu = Math.round(courant.current * (N - 1));
      // l'image chargée la plus proche (pendant que les passes suivantes arrivent)
      let i = voulu;
      for (let d = 0; d < N; d++) {
        if (images.current[voulu - d]) {
          i = voulu - d;
          break;
        }
        if (images.current[voulu + d]) {
          i = voulu + d;
          break;
        }
      }
      const im = images.current[i];
      const w = Math.round(c.clientWidth * Math.min(devicePixelRatio, 2));
      const h = Math.round(c.clientHeight * Math.min(devicePixelRatio, 2));
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
        dernier = -1;
      }
      if (!im || i === dernier) return;
      dernier = i;
      const g = c.getContext('2d');
      // « object-fit: cover » : l'image remplit le canvas, centrée
      const k = Math.max(w / im.naturalWidth, h / im.naturalHeight);
      const dw = im.naturalWidth * k;
      const dh = im.naturalHeight * k;
      g.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nuit/85 via-nuit/10 to-nuit/40 md:bg-gradient-to-r md:from-nuit/80 md:via-nuit/15 md:to-transparent" />

        {/* les textes du parcours */}
        {ETAPES.map((e, i) => (
          <div
            key={e.sur}
            aria-hidden={etape !== i}
            className={`pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] transition-all duration-500 md:inset-y-0 md:flex md:max-w-[46%] md:flex-col md:justify-center md:px-12 md:pb-0 ${
              etape === i ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <p className="surtitre">{e.sur}</p>
            {i === 0 ? (
              <h1 className="mt-2 text-[clamp(2.8rem,min(11vw,10svh),6.5rem)] leading-[0.95]">{e.titre}</h1>
            ) : (
              <h2 className="mt-2 text-[clamp(2.4rem,min(9vw,9svh),5.5rem)] leading-[0.95]">{e.titre}</h2>
            )}
            <p className="mt-3 max-w-md text-lg leading-relaxed text-creme/85">{e.texte}</p>
          </div>
        ))}

        {/* « Passer » : directement à la carte */}
        {visible && (
          <button type="button" onClick={passer} className="btn btn-ligne absolute right-4 top-20 z-20 !min-h-11 !px-5 !py-2 md:right-8 md:top-24">
            Passer
          </button>
        )}

        {/* écran de chargement : le néon s'allume au fil du préchargement */}
        <div
          role="status"
          aria-live="polite"
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-nuit transition-opacity duration-700 ${pret ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        >
          <p
            className="titre text-[clamp(3rem,14vw,7rem)] text-flamme"
            style={{ textShadow: `0 0 ${8 + charge * 40}px rgb(255 107 26 / ${0.25 + charge * 0.6})`, opacity: 0.35 + charge * 0.65 }}
          >
            CRUNCH!
          </p>
          <div className="mt-6 h-1.5 w-56 overflow-hidden rounded-full bg-creme/10">
            <div className="h-full rounded-full bg-gradient-to-r from-braise to-flamme transition-[width] duration-200" style={{ width: `${Math.round(charge * 100)}%` }} />
          </div>
          <p className="mt-4 text-base text-creme/70">La plancha chauffe… {Math.round(charge * 100)} %</p>
          <button type="button" onClick={passer} className="btn btn-ligne mt-8 !min-h-11">
            Passer, voir la carte
          </button>
        </div>
      </div>
    </section>
  );
}
