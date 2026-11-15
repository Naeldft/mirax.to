import { useLayoutEffect, useRef } from 'react';
import HeroGalerie from '@demos/shared/components/HeroGalerie.jsx';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { looks, salon } from '../data/site';

// couleurs de la galerie 3D : poudre, crème, laiton
const THEME = { fond: '#efe3da', mur: '#f3e4dc', sol: '#d9c3b6', cadre: '#c79a52', passe: '#fbf6f1', accent: '#d9a5a0', halo: '#fff2e8', lumiere: '#fff6ef', metal: 0.7 };

/**
 * Accueil Atelier Mèche : une galerie 3D aux couleurs du salon. La caméra avance et pivote vers
 * chaque vraie photo de coupe (brushing, balayage, dégradé, chignon), le texte et le prix à côté.
 */
export default function Hero({ onReady }) {
  const scope = useRef(null);
  const reduit = useReducedMotion();
  useLayoutEffect(() => {
    if (reduit) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-mot]', { yPercent: 120, rotate: 4, duration: 1.2, stagger: 0.08, ease: 'power4.out', delay: 0.3 });
      gsap.from('[data-in]', { opacity: 0, y: 20, duration: 1, stagger: 0.1, delay: 0.8, ease: 'power3.out' });
    }, scope);
    return () => ctx.revert();
  }, [reduit]);

  const intro = (
    <div ref={scope} className="max-w-xl px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:max-w-[46%] md:px-16 md:pb-0">
      <p data-in className="text-sm uppercase tracking-[0.3em] text-taupe">
        {salon.accroche}
      </p>
      <h1 className="mt-3 text-[clamp(2.9rem,min(12vw,11svh),7rem)] leading-[0.9]">
        {['Une coupe', 'qui vous', 'ressemble.'].map((l, i) => (
          <span key={l} className="block overflow-hidden pb-2">
            <span data-mot className={`block ${i === 2 ? 'italic text-poudre-fonce' : ''}`}>
              {l}
            </span>
          </span>
        ))}
      </h1>
      <p data-in className="mt-4 hidden max-w-sm text-lg text-taupe md:block">
        {salon.intro}
      </p>
      <div data-in className="mt-6 flex gap-3">
        <a href="#reserver" className="btn btn-encre flex-1 md:flex-none">
          Réserver
        </a>
        <a href="#prestations" className="btn btn-ligne flex-1 md:flex-none">
          Les tarifs
        </a>
      </div>
    </div>
  );

  const photos = looks.map((l, i) => ({
    nom: l.photo,
    alt: l.alt,
    surtitre: `${['i.', 'ii.', 'iii.', 'iv.'][i]} ${l.note}`,
    titre: l.titre,
    texte: l.texte,
    lien: (
      <p className="mt-4 flex flex-wrap items-center gap-4">
        <span className="font-display text-xl">{l.prix}</span>
        <a href="#reserver" className="btn btn-encre !min-h-11 !py-2">
          Réserver
        </a>
      </p>
    ),
  }));

  return (
    <HeroGalerie
      label="Accueil : Atelier Mèche, salon de coiffure"
      intro={intro}
      photos={photos}
      theme={THEME}
      onReady={onReady}
      classes={{
        section: 'bg-creme text-encre',
        voile: 'bg-gradient-to-t from-creme/95 via-creme/50 to-transparent md:bg-gradient-to-r md:from-creme/90 md:via-creme/40 md:to-transparent',
        carte: 'rounded-3xl bg-creme/90 p-5 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.35)] backdrop-blur md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none',
        surtitre: 'numero text-lg',
        titre: 'mt-1 text-[clamp(2.2rem,9vw,5.5rem)] leading-[0.9]',
        texte: 'mt-3 hidden max-w-md text-lg text-taupe md:block',
        fin: 'bg-creme',
      }}
      fin={
        <div className="text-center">
          <p className="numero text-lg">i.</p>
          <p className="mt-2 font-display text-[clamp(3rem,10vw,6rem)] leading-none">Prestations</p>
        </div>
      }
    />
  );
}
