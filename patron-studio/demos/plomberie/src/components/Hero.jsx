import { useLayoutEffect, useRef } from 'react';
import { photoSrcSet, photoUrl } from '@demos/shared/components/Photo.jsx';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { entreprise, etapesHero } from '../data/site';
import { Telephone } from './Icons';

// point de plongée : la sortie du bec du robinet sur la photo (en % de l'image)
const BEC = '80% 41%';

/**
 * Accueil Ondine Plomberie, uniquement avec de vraies photos.
 *  1. un robinet chromé, une goutte au bec ;
 *  2. en faisant défiler, on plonge dans le bec : l'image grossit vers lui et l'eau envahit l'écran ;
 *  3. on ressort dans les canalisations : une piste horizontale fait défiler les 3 étapes de la méthode
 *     (chacune avec sa photo), reliées par une ligne d'eau qui se remplit.
 * « Réduire les animations » : rien n'est fixé, tout s'affiche l'un sous l'autre.
 */
export default function Hero({ onReady }) {
  const reduit = useReducedMotion();
  const section = useRef(null);
  const ecran = useRef(null);
  const robinet = useRef(null);
  const eau = useRef(null);
  const intro = useRef(null);
  const piste = useRef(null);
  const ligne = useRef(null);
  const canal = useRef(null);
  const reperes = useRef([]);
  const photos = useRef([]);

  // l'écran de chargement attend la photo du robinet (1,5 s au plus)
  useLayoutEffect(() => {
    const img = robinet.current?.querySelector('img');
    let fait = false;
    const fin = () => {
      if (!fait) {
        fait = true;
        onReady?.();
      }
    };
    if (img?.complete) fin();
    else img?.addEventListener('load', fin, { once: true });
    const t = setTimeout(fin, 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- au montage
  }, []);

  useLayoutEffect(() => {
    if (reduit) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-in]', { y: 34, opacity: 0, duration: 1, stagger: 0.09, ease: 'power3.out', delay: 0.15 });
      const n = etapesHero.length;
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${innerHeight * (1.9 + n * 1.1)}`,
          pin: ecran.current,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: { snapTo: 'labels', duration: { min: 0.25, max: 0.8 }, delay: 0.12, ease: 'power2.inOut' },
        },
      });
      tl.addLabel('robinet');
      // 1. plongée dans le bec du robinet
      tl.to(intro.current, { opacity: 0, y: -60, duration: 0.5 }, 0);
      // le bec vient au centre de l'écran pendant qu'on s'en approche
      tl.to(robinet.current, { scale: 10, xPercent: -30, yPercent: 9, duration: 1.6, ease: 'power2.in' }, 0);
      tl.to(eau.current, { opacity: 1, duration: 0.7, ease: 'power1.in' }, 0.85);
      // 2. on ressort dans les canalisations : la piste arrive depuis la droite
      tl.to(canal.current, { opacity: 1, duration: 0.35 }, 1.55);
      tl.fromTo(piste.current, { xPercent: 100 / n }, { xPercent: 0, duration: 0.65, ease: 'power2.out' }, 1.6);
      tl.to(eau.current, { opacity: 0, duration: 0.5 }, 1.8);
      tl.fromTo(ligne.current, { scaleX: 0 }, { scaleX: 1 / (2 * n), duration: 0.65 }, 1.6);
      tl.addLabel('etape-1');
      // 3. une étape après l'autre, la ligne d'eau avance
      for (let i = 1; i < n; i++) {
        tl.to(piste.current, { xPercent: (-100 / n) * i, duration: 1, ease: 'power1.inOut' }, '+=0.35');
        tl.to(ligne.current, { scaleX: (2 * i + 1) / (2 * n), duration: 1, ease: 'power1.inOut' }, '<');
        tl.addLabel(`etape-${i + 1}`);
      }
      tl.to({}, { duration: 0.35 });
      // légère parallaxe des photos dans leur cadre
      photos.current.forEach((p) => {
        if (p) tl.fromTo(p, { xPercent: -6 }, { xPercent: 6, duration: tl.duration() - 1.6, ease: 'none' }, 1.6);
      });
    }, section);
    return () => ctx.revert();
  }, [reduit]);

  const Etape = ({ e, i }) => (
    <article className="flex h-full w-full shrink-0 flex-col justify-center gap-5 px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-24 md:flex-row md:items-center md:gap-14 md:px-16 md:pb-16">
      <div className="relative h-[40svh] w-full overflow-hidden rounded-[1.75rem] border border-ecume/15 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] md:h-[64svh] md:w-[56%]">
        <img
          ref={(el) => (photos.current[i] = el)}
          src={photoUrl(e.photo, 800)}
          srcSet={photoSrcSet(e.photo)}
          sizes="(min-width: 768px) 56vw, 100vw"
          alt={e.alt}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-[112%] max-w-none -translate-x-[6%] object-cover"
        />
      </div>
      <div className="md:w-[40%]">
        <p className="font-display text-[clamp(3rem,10vw,6rem)] font-bold leading-none text-eau/90">0{i + 1}</p>
        <h2 className="mt-1 text-[clamp(2.2rem,8vw,4.6rem)] font-bold leading-[0.95]">{e.titre}</h2>
        <p className="mt-3 max-w-md text-lg text-ecume/80 md:text-xl">{e.texte}</p>
        {i === etapesHero.length - 1 && (
          <a href="#services" className="btn btn-eau mt-6">
            Nos services
          </a>
        )}
      </div>
    </article>
  );

  const Intro = (
    <div ref={intro} className="relative z-10 max-w-xl px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:max-w-[46%] md:px-16 md:pb-0">
      <p data-hero-in className="tag">
        {entreprise.accroche}
      </p>
      <h1 data-hero-in className="mt-3 text-[clamp(3.2rem,14vw,7.5rem)] font-bold leading-[0.9]">
        L’eau,
        <br />
        <span className="bg-gradient-to-r from-eau to-cuivre-clair bg-clip-text text-transparent">on la maîtrise.</span>
      </h1>
      <p data-hero-in className="mt-4 hidden max-w-md text-lg text-ecume/80 md:block">
        {entreprise.intro}
      </p>
      <div data-hero-in className="mt-6 flex gap-3">
        <a href="#devis" className="btn btn-eau flex-1 md:flex-none">
          Devis gratuit
        </a>
        <a href={`tel:${entreprise.telephoneLien}`} className="btn btn-ligne flex-1 md:flex-none">
          <Telephone /> Appeler
        </a>
      </div>
      {!reduit && (
        <p data-hero-in className="mt-8 hidden text-sm uppercase tracking-[0.25em] text-ecume/55 md:block" aria-hidden="true">
          Faites défiler · on plonge ↓
        </p>
      )}
    </div>
  );

  const PhotoRobinet = (
    <div ref={robinet} className="absolute inset-0 will-change-transform" style={{ transformOrigin: BEC }}>
      <img
        src={photoUrl('hero-robinet', 800)}
        srcSet={photoSrcSet('hero-robinet')}
        sizes="100vw"
        alt="Robinet chromé, une goutte d’eau tombe du bec"
        fetchPriority="high"
        className="h-full w-full object-cover"
        style={{ objectPosition: BEC }}
      />
    </div>
  );

  /* ----- animations réduites : tout l'un sous l'autre ----- */
  if (reduit) {
    return (
      <section id="accueil" ref={section} aria-label="Accueil : Ondine Plomberie" className="bg-nuit text-ecume">
        <div className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center">
          {PhotoRobinet}
          <div className="absolute inset-0 bg-gradient-to-t from-nuit via-nuit/70 to-nuit/10 md:bg-gradient-to-r md:from-nuit md:via-nuit/75 md:to-transparent" />
          {Intro}
        </div>
        {etapesHero.map((e, i) => (
          <div key={e.titre} className="min-h-[90svh]">
            <Etape e={e} i={i} />
          </div>
        ))}
      </section>
    );
  }

  const n = etapesHero.length;
  return (
    <section id="accueil" ref={section} aria-label="Accueil : Ondine Plomberie" className="relative bg-nuit text-ecume">
      <div ref={ecran} className="relative h-[100svh] overflow-hidden">
        {/* 1. le robinet */}
        {PhotoRobinet}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nuit via-nuit/65 to-nuit/5 md:bg-gradient-to-r md:from-nuit md:via-nuit/70 md:to-transparent" />
        <div className="relative flex h-full items-end md:items-center">{Intro}</div>
        {/* 2. l'eau envahit l'écran au moment de la plongée */}
        <div
          ref={eau}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{ background: `radial-gradient(circle at ${BEC}, #9feaf5 0%, #3fb6cf 22%, #0f5d78 55%, #0a1724 100%)` }}
        />
        {/* 3. les canalisations : 3 étapes sur une piste horizontale */}
        <div ref={canal} className="absolute inset-0 bg-nuit opacity-0">
          <div ref={piste} className="flex h-full" style={{ width: `${n * 100}%` }}>
            {etapesHero.map((e, i) => (
              <div key={e.titre} className="h-full" style={{ width: `${100 / n}%` }}>
                <Etape e={e} i={i} />
              </div>
            ))}
          </div>
          {/* ligne d'eau qui relie les étapes */}
          <div
            className="pointer-events-none absolute inset-x-5 bottom-[calc(5.2rem+env(safe-area-inset-bottom))] md:inset-x-16 md:bottom-8"
            aria-hidden="true"
          >
            <div className="relative h-[3px] rounded-full bg-ecume/15">
              <div
                ref={ligne}
                className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-eau to-ecume"
                style={{ transform: 'scaleX(0)' }}
              />
              {etapesHero.map((e, i) => (
                <span
                  key={e.titre}
                  ref={(el) => (reperes.current[i] = el)}
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-eau bg-nuit"
                  style={{ left: `${((2 * i + 1) / (2 * n)) * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
