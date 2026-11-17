import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { snack } from '../data/site';

/* ------------------------------------------------------------------
   Intro Crunch! : on entre dans le snack, puis on le visite au défilement.
   1. L'entrée (automatique, 1,7 s) : la façade et l'intérieur sont deux plans à des profondeurs différentes ;
      la caméra avance vers la porte : la façade grandit vite, l'intérieur plus lentement (vrai relief), la porte
      s'ouvre sur l'intérieur, et l'on se retrouve exactement sur l'image du film juste après la porte.
   2. La visite filmée (technique des pages produit Apple) : les images du film (3 clips Kling étalonnés en
      commun, 24 i/s, vitesse d'origine) dessinées dans un canvas au défilement, avec un léger lissage ;
      un petit défilement fait avancer beaucoup d'images. Par-dessus : textes en parallaxe, vapeur de la plancha,
      reflets des néons, grain animé. Le film s'arrête sur la plancha : la scène 3D des burgers prend le relais
      sur la même image (Hero.jsx, posée par-dessus la fin de cette section).
   - Arrivée depuis la carte de l'accueil : la carte s'est posée sur la façade ; pas d'écran de chargement.
   - Ouverture directe par un lien : un petit écran de chargement, le temps de charger la façade et l'intérieur.
   - Ordinateur : 1 280 × 720 (16:9 plein écran) ; téléphone : le centre recadré en vertical, 540 × 960.
------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
export const N = 458;
const ENTREE = 96; // image du film juste après la porte (fin de l'entrée)
const DUREE_ENTREE = 1700; // ms
const HAUTEUR = 300; // svh : 100 d'écran fixe + 200 de défilement
const LISSAGE = 0.2;

/** Les textes du parcours, par images du film [de, a[. */
const ETAPES = [
  { de: 0, a: 112, sur: 'La façade', titre: 'Smash. Crunch. Miam.', texte: snack.accroche, h1: true },
  { de: 118, a: 250, sur: 'La salle', titre: 'On s’installe.', texte: 'Banquettes, lumière chaude, la cuisine en ligne de mire.' },
  { de: 266, a: 336, sur: 'Le comptoir', titre: 'On commande.', texte: 'Au comptoir ou en ligne, prêt en 15 minutes.' },
  { de: 350, a: N + 1, sur: 'La cuisine', titre: 'Smashé à la plancha.', texte: 'Devant vous, minute par minute.' },
];

/** Cadrage des deux formats (coordonnées de la porte dans l'image 1 280 × 720 du film). */
const PORTE = { x0: 592, y0: 232, x1: 880, y1: 578 };
const ENSEIGNE = { x0: 50, y0: 70, x1: 925, y1: 200 };
const FORMATS = {
  ordi: { l: 1280, h: 720, x: (x) => x, y: (y) => y },
  // téléphone : centre du film recadré en vertical (x de 437,7 à 842,3 dans l'image 1 280), agrandi en 540 × 960
  mobile: { l: 540, h: 960, x: (x) => (x - 437.7) * 1.3346, y: (y) => y * 1.3333 },
};

const nom = (i, dossier) => `${BASE}sequence/${dossier}/${String(i + 1).padStart(3, '0')}.webp`;
/** Ordre de chargement : la façade, l'image d'après la porte, la suite du film en passes, puis le début. */
function ordre() {
  const o = [];
  const vu = new Set();
  const ajout = (i) => !vu.has(i) && (vu.add(i), o.push(i));
  ajout(0);
  ajout(ENTREE);
  for (const pas of [8, 4, 2, 1]) for (let i = ENTREE; i < N; i += pas) ajout(i);
  for (let i = 1; i < ENTREE; i++) ajout(i);
  return o;
}
const doux = (x) => 0.5 - Math.cos(Math.PI * Math.min(1, Math.max(0, x))) / 2;
const borne = (a, b, x) => Math.min(1, Math.max(0, (x - a) / (b - a)));

/** Vapeur au-dessus de la plancha : quelques volutes douces qui montent (canvas 2D, très léger). */
function useVapeur(ref, intensite) {
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const g = c.getContext('2d');
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 128;
    const s = sprite.getContext('2d');
    for (let i = 0; i < 10; i++) {
      const x = 34 + Math.random() * 60;
      const y = 34 + Math.random() * 60;
      const r = 20 + Math.random() * 30;
      const d = s.createRadialGradient(x, y, 0, x, y, r);
      d.addColorStop(0, 'rgba(255,240,225,0.16)');
      d.addColorStop(1, 'rgba(255,240,225,0)');
      s.fillStyle = d;
      s.fillRect(0, 0, 128, 128);
    }
    const mobile = innerWidth < 768;
    const brins = Array.from({ length: mobile ? 10 : 18 }, () => ({ x: 0.3 + Math.random() * 0.6, v: 0.6 + Math.random() * 0.6, d: Math.random(), r: Math.random() }));
    let raf;
    const boucle = (t) => {
      raf = requestAnimationFrame(boucle);
      const k = intensite.current;
      const w = c.clientWidth;
      const h = c.clientHeight;
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
      }
      g.clearRect(0, 0, w, h);
      if (k < 0.02) return;
      brins.forEach((b) => {
        const u = (t * 0.00006 * b.v + b.d) % 1;
        const taille = (0.18 + u * 0.4) * Math.min(w, h);
        const x = b.x * w + Math.sin(u * 6 + b.r * 6) * 0.04 * w - taille / 2;
        const y = h * (0.92 - u * 0.75) - taille / 2;
        g.globalAlpha = Math.sin(u * Math.PI) * k * 0.9;
        g.drawImage(sprite, x, y, taille, taille);
      });
      g.globalAlpha = 1;
    };
    raf = requestAnimationFrame(boucle);
    return () => cancelAnimationFrame(raf);
  }, [ref, intensite]);
}

export default function Sequence() {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const canvas = useRef(null);
  const vapeur = useRef(null);
  const reflet = useRef(null);
  const textes = useRef([]);
  const images = useRef([]);
  const courant = useRef(ENTREE);
  const entree = useRef({ debut: 0, fini: false });
  const intensiteVapeur = useRef(0);
  const [format] = useState(() => (typeof window !== 'undefined' && matchMedia('(max-width: 767px), (orientation: portrait)').matches ? 'mobile' : 'ordi'));
  const [arrivee] = useState(() => typeof window !== 'undefined' && !!window.psArrivee);
  const [charge, setCharge] = useState(0);
  const [pret, setPret] = useState(false);
  const [etape, setEtape] = useState(0);
  const [visible, setVisible] = useState(true);
  const F = FORMATS[format];

  useVapeur(vapeur, intensiteVapeur);

  // préchargement : la façade et l'intérieur d'abord (l'entrée), puis le film
  useEffect(() => {
    if (reduit) return;
    const liste = ordre();
    let annule = false;
    let k = 0;
    let essentiels = 0;
    // la façade s'affiche dès que la façade et l'intérieur sont chargés ; la caméra part quand l'affichage est fluide
    const demarrer = () => {
      if (annule || entree.current.pret) return;
      entree.current.pret = performance.now();
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
        if (i === 0 || i === ENTREE) {
          essentiels++;
          setCharge(essentiels / 2);
          if (essentiels === 2) demarrer();
        }
        suivant();
      };
      im.src = nom(i, format);
    };
    for (let p = 0; p < 6; p++) suivant();
    const garde = setTimeout(demarrer, arrivee ? 1500 : 9000); // ne jamais rester bloqué
    return () => {
      annule = true;
      clearTimeout(garde);
    };
  }, [reduit, arrivee, format]);

  // la boucle : l'entrée (deux plans), puis le film piloté par le défilement
  useEffect(() => {
    if (reduit) return;
    const s = section.current;
    let p = 0;
    const maj = () => {
      const r = s.getBoundingClientRect();
      p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      setVisible(r.bottom > innerHeight + 2); // la section des burgers se pose par-dessus la fin du film
    };
    maj();
    addEventListener('scroll', maj, { passive: true });
    addEventListener('resize', maj);
    let dernier = -1;
    let etapeCourante = -2;
    let signale = false;
    let raf;
    let calques = null; // la façade porte découpée, la porte seule, le halo du néon (calculés une fois)
    const preparer = () => {
      const fa = images.current[0];
      if (!fa) return null;
      const L = fa.naturalWidth;
      const H = fa.naturalHeight;
      const sx = L / F.l;
      const sy = H / F.h;
      const porte = [F.x(PORTE.x0) * sx, F.y(PORTE.y0) * sy, (F.x(PORTE.x1) - F.x(PORTE.x0)) * sx, (F.y(PORTE.y1) - F.y(PORTE.y0)) * sy];
      const toile = (fn) => {
        const c = document.createElement('canvas');
        c.width = L;
        c.height = H;
        fn(c.getContext('2d'));
        return c;
      };
      // la façade, la porte découpée
      const trouee = toile((g) => {
        g.drawImage(fa, 0, 0);
        g.clearRect(...porte);
      });
      // la porte seule (ce qu'on voit par la porte depuis la rue), qui s'efface quand on avance
      const seule = toile((g) => g.drawImage(fa, ...porte, ...porte));
      // halo du néon : l'enseigne réduite puis agrandie (un flou doux, sans filtre), ajoutée en lumière
      const x0 = F.x(ENSEIGNE.x0) * sx;
      const y0 = F.y(ENSEIGNE.y0) * sy;
      const l = (F.x(ENSEIGNE.x1) - F.x(ENSEIGNE.x0)) * sx;
      const h = (F.y(ENSEIGNE.y1) - F.y(ENSEIGNE.y0)) * sy;
      const petit = document.createElement('canvas');
      petit.width = Math.max(8, Math.round(l / 10));
      petit.height = Math.max(4, Math.round(h / 10));
      petit.getContext('2d').drawImage(fa, x0, y0, l, h, 0, 0, petit.width, petit.height);
      const halo = toile((g) => {
        g.imageSmoothingQuality = 'high';
        g.drawImage(petit, 0, 0, petit.width, petit.height, x0 - l * 0.04, y0 - h * 0.2, l * 1.08, h * 1.4);
      });
      return { trouee, seule, halo, L, H };
    };
    const dessiner = (t) => {
      raf = requestAnimationFrame(dessiner);
      const e = entree.current;
      const c = canvas.current;
      if (!c) return;
      const w = Math.round(c.clientWidth * Math.min(devicePixelRatio, 2));
      const h = Math.round(c.clientHeight * Math.min(devicePixelRatio, 2));
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
        dernier = -1;
      }
      const g = c.getContext('2d');
      // ----- 1. l'entrée : deux plans (la façade à la distance 1, l'intérieur à 1,9), la caméra avance de 0,86 -----
      if (!e.fini) {
        const interieur = images.current[ENTREE];
        if (!calques) calques = preparer();
        if (!calques || !interieur) return;
        // départ de la caméra : après quelques images fluides d'affichage de la façade (au plus 1,2 s d'attente),
        // pour que le mouvement ne soit jamais haché par la fin du chargement de la page
        const dt = t - (e.dernier ?? t);
        e.dernier = t;
        if (e.pret && !e.debut) {
          e.fluides = dt < 40 ? (e.fluides ?? 0) + 1 : 0;
          if ((e.fluides >= 12 && t - e.pret > 350) || t - e.pret > 1200) e.debut = t;
        }
        // l'horloge de la caméra avance d'une image au plus à la fois : un ralentissement du navigateur
        // fige le mouvement un instant mais ne le fait jamais sauter
        if (e.debut) e.temps = (e.temps ?? 0) + Math.min(dt, 34);
        const u = e.debut ? doux((e.temps ?? 0) / DUREE_ENTREE) : 0;
        const x = 0.86 * u;
        const kF = 1 / (1 - x);
        const kI = (1.9 - 0.86) / (1.9 - x);
        const { L, H } = calques;
        const cx = (F.x((PORTE.x0 + PORTE.x1) / 2) * L) / F.l;
        const cy = (F.y((PORTE.y0 + PORTE.y1) / 2) * H) / F.h;
        // l'intérieur remplit la porte au départ, et tout l'écran à l'arrivée (l'image du film juste après la porte)
        const kI0 = (1.9 - 0.86) / 1.9;
        const px = (cx - (kI0 * L) / 2) / (1 - kI0);
        const py = (cy - (kI0 * H) / 2) / (1 - kI0);
        const k = Math.max(w / L, h / H); // cadrage « cover », centré, comme le film
        const base = () => g.setTransform(k, 0, 0, k, (w - L * k) / 2, (h - H * k) / 2);
        g.globalAlpha = 1;
        g.globalCompositeOperation = 'source-over';
        base();
        g.fillStyle = '#0b0a09';
        g.fillRect(0, 0, L, H);
        g.translate(px, py);
        g.scale(kI, kI);
        g.translate(-px, -py);
        g.drawImage(interieur, 0, 0, L, H);
        base();
        g.translate(cx, cy);
        g.scale(kF, kF);
        g.translate(-cx, -cy);
        const fondu = 1 - borne(0.86, 1, u); // la façade s'efface quand on passe le seuil
        g.globalAlpha = fondu;
        g.drawImage(calques.trouee, 0, 0);
        g.globalAlpha = fondu * (1 - borne(0.04, 0.32, u)); // la porte s'ouvre sur l'intérieur
        if (g.globalAlpha > 0) g.drawImage(calques.seule, 0, 0);
        if (calques.halo) {
          g.globalCompositeOperation = 'screen';
          g.globalAlpha = (0.16 + 0.05 * Math.sin(t * 0.011) + 0.03 * Math.sin(t * 0.037)) * (1 - borne(0.45, 0.8, u));
          g.drawImage(calques.halo, 0, 0);
        }
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.globalAlpha = 1;
        g.globalCompositeOperation = 'source-over';
        if (!signale) {
          signale = true;
          // la façade est à l'écran : l'image d'attente de la transition depuis l'accueil peut partir
          requestAnimationFrame(() => dispatchEvent(new Event('ps-demo-prete')));
        }
        if (e.debut && u >= 1) {
          e.fini = true;
          dernier = -1;
          window.crEntreeFinie = true;
          dispatchEvent(new Event('cr-entree-finie')); // la 3D des burgers peut se charger
        }
        if (etapeCourante !== 0) setEtape((etapeCourante = 0));
        return;
      }
      // ----- 2. le film -----
      const cible = ENTREE + p * (N - 1 - ENTREE);
      courant.current += (cible - courant.current) * LISSAGE;
      const voulu = Math.round(courant.current);
      const ie = ETAPES.findIndex((x) => voulu >= x.de && voulu < x.a);
      if (ie !== etapeCourante) setEtape((etapeCourante = ie));
      // textes en parallaxe : chaque ligne glisse à sa vitesse dans son étape
      ETAPES.forEach((x, i) => {
        const el = textes.current[i];
        if (el) el.style.setProperty('--k', String(borne(x.de, Math.min(x.a, N - 1), voulu) - 0.5));
      });
      // vapeur : surtout au-dessus de la plancha ; reflets des néons plus forts dans la cuisine
      intensiteVapeur.current = 0.25 * borne(300, 360, voulu) + 0.75 * borne(380, 430, voulu);
      if (reflet.current) reflet.current.style.opacity = String(0.35 + 0.5 * borne(340, 420, voulu));
      let i = -1;
      for (let d = 0; d < N && i < 0; d++) {
        if (images.current[voulu - d]) i = voulu - d;
        else if (images.current[voulu + d]) i = voulu + d;
      }
      const im = images.current[i];
      if (!im || i === dernier) return;
      dernier = i;
      const k = Math.max(w / im.naturalWidth, h / im.naturalHeight);
      const dw = im.naturalWidth * k;
      const dh = im.naturalHeight * k;
      g.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };
    raf = requestAnimationFrame(dessiner);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', maj);
      removeEventListener('resize', maj);
    };
  }, [reduit, F]);

  const passer = () => document.getElementById('carte')?.scrollIntoView({ behavior: reduit ? 'auto' : 'smooth' });

  if (reduit) return null;

  return (
    <section id="accueil" ref={section} aria-label="La visite de Crunch!, de la façade à la plancha" className="relative bg-nuit text-creme" style={{ height: `${HAUTEUR}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />

        {/* reflets des néons : une lueur chaude qui respire, par-dessus le film */}
        <div
          ref={reflet}
          aria-hidden="true"
          className="cr-reflet pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(40% 30% at 30% 18%, rgb(255 70 40 / 0.13), transparent 70%), radial-gradient(35% 28% at 78% 30%, rgb(255 150 60 / 0.1), transparent 70%)' }}
        />
        <canvas ref={vapeur} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />

        {/* grain cinéma animé */}
        <div aria-hidden="true" className="cr-grain pointer-events-none absolute -inset-[8%]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nuit/80 via-transparent to-transparent md:bg-gradient-to-r md:from-nuit/75 md:via-nuit/10 md:to-transparent" />

        {/* les textes du parcours, en parallaxe : ils montent pendant leur étape, le surtitre plus vite que le titre, le titre plus vite que le texte */}
        {ETAPES.map((e, i) => {
          const Titre = e.h1 ? 'h1' : 'h2';
          return (
            <div
              key={e.sur}
              ref={(el) => (textes.current[i] = el)}
              aria-hidden={etape !== i}
              className={`pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-[calc(9.5rem+env(safe-area-inset-bottom))] transition-opacity duration-500 md:inset-y-0 md:flex md:max-w-[46%] md:flex-col md:justify-center md:px-12 md:pb-0 ${
                etape === i ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ '--k': 0 }}
            >
              <p className="surtitre" style={{ transform: 'translateY(calc((var(--k) + 0.5) * -70px))' }}>
                {e.sur}
              </p>
              <Titre className="mt-2 text-[clamp(2.6rem,min(10vw,9svh),6rem)] leading-[0.95]" style={{ transform: 'translateY(calc((var(--k) + 0.5) * -50px))' }}>
                {e.titre}
              </Titre>
              <p className="mt-3 max-w-md text-lg leading-relaxed text-creme/85" style={{ transform: 'translateY(calc((var(--k) + 0.5) * -30px))' }}>
                {e.texte}
              </p>
            </div>
          );
        })}

        {/* « Passer » : directement à la carte, dans le coin bas droit (dégagé : loin de l'enseigne et des textes) */}
        {visible && pret && (
          <button
            type="button"
            onClick={passer}
            className="btn btn-ligne absolute bottom-[calc(5.4rem+env(safe-area-inset-bottom))] right-4 z-20 !min-h-11 !bg-nuit/60 !px-5 !py-2 md:bottom-8 md:right-8"
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
              <div className="h-full rounded-full bg-gradient-to-r from-braise to-flamme transition-[width] duration-200" style={{ width: `${Math.round(charge * 100)}%` }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
