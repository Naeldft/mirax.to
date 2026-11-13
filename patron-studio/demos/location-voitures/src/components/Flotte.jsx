import Photo from '@demos/shared/components/Photo.jsx';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { gsap } from '@demos/shared/lib/gsap.js';
import { couleurs, modeles } from '../data/site';
import { silhouettePath } from '../three/carGeometry';
import { Boite, Energie, Places, Valise } from './Icons';
import SectionTitle from './SectionTitle';

/** Silhouette du véhicule, dessinée à partir des mêmes données que la 3D. */
function Silhouette({ profil, color }) {
  const { body, cabin, p } = useMemo(() => silhouettePath(profil), [profil]);
  const w = p.L * 100 + 60;
  return (
    <svg viewBox={`${-w / 2} -230 ${w} 250`} className="h-full w-full" aria-hidden="true">
      <ellipse cx="0" cy="8" rx={w * 0.42} ry="10" fill="#000" opacity="0.5" />
      <path d={body} fill={color} />
      <path d={cabin} fill="#0d1117" opacity="0.92" />
      {p.wheels.map((x) => (
        <g key={x}>
          <circle cx={x * 100} cy={-p.R * 100} r={p.R * 100} fill="#141414" />
          <circle cx={x * 100} cy={-p.R * 100} r={p.R * 62} fill="#c9cdd3" />
          <circle cx={x * 100} cy={-p.R * 100} r={p.R * 18} fill="#141414" />
        </g>
      ))}
    </svg>
  );
}

export default function Flotte({ model, color, onModel }) {
  const scope = useRef(null);
  const track = useRef(null);
  const reduced = useReducedMotion();
  useReveal(scope);
  const hex = couleurs.find((c) => c.id === color).hex;

  // grand écran : la flotte défile à l'horizontale pendant que la section reste fixe
  useLayoutEffect(() => {
    if (reduced) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const el = track.current;
      const dist = () => Math.max(0, el.scrollWidth - el.parentElement.clientWidth);
      gsap.to(el, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: () => '+=' + dist(),
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, [reduced]);

  const choisir = (id) => {
    onModel(id);
    document.getElementById('reserver')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="flotte"
      ref={scope}
      className="section overflow-hidden bg-carbone lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-16"
      aria-labelledby="flotte-titre"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle
          id="flotte-titre"
          surtitre="La flotte"
          title="Un modèle pour chaque route."
          intro="Véhicules de moins de deux ans, révisés et nettoyés entre chaque location. Prix TTC, assurance et assistance incluses."
        />
        <div className="mt-12 lg:overflow-visible">
          <ul ref={track} className="flex flex-col gap-5 lg:w-max lg:flex-row">
            {modeles.map((m) => (
              <li key={m.id} data-reveal className="lg:w-[30rem]">
                <article
                  className={`group flex h-full flex-col border bg-laque p-6 transition-colors duration-300 ${m.id === model ? 'border-course' : 'border-ivoire/10 hover:border-ivoire/30'}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="surtitre !text-[0.65rem]">{m.categorie}</p>
                      <h3 className="mt-1 font-display text-xl font-bold uppercase">{m.nom}</h3>
                      <p className="text-sm text-ivoire/55">{m.exemple}</p>
                    </div>
                    <p className="text-right">
                      <span className="whitespace-nowrap font-display text-3xl font-bold">{m.prix} €</span>
                      <span className="block text-xs text-ivoire/55">par jour</span>
                    </p>
                  </div>
                  {m.photo ? (
                    <div className="-mx-6 my-4 aspect-[16/9] overflow-hidden bg-carbone">
                      {/* emplacement photo : m.photo (photos/<nom>.jpg) */}
                      <Photo
                        nom={m.photo}
                        alt={m.alt}
                        sizes="(min-width: 1024px) 30rem, 100vw"
                        width="800"
                        height="450"
                        className="h-full w-full object-cover duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="my-4 h-32 transition-transform duration-700 ease-out group-hover:translate-x-3 md:h-40">
                      <Silhouette profil={m.profil} color={hex} />
                    </div>
                  )}
                  <ul className="grid grid-cols-4 gap-2 border-y border-ivoire/10 py-4 text-center text-xs text-ivoire/70">
                    <li>
                      <Places className="mx-auto mb-1 text-lg text-course-vif" />
                      {m.places} places
                    </li>
                    <li>
                      <Valise className="mx-auto mb-1 text-lg text-course-vif" />
                      {m.profil === 'utilitaire' ? '12 m³' : `${m.bagages} valises`}
                    </li>
                    <li>
                      <Boite className="mx-auto mb-1 text-lg text-course-vif" />
                      {m.boite}
                    </li>
                    <li>
                      <Energie className="mx-auto mb-1 text-lg text-course-vif" />
                      {m.energie}
                    </li>
                  </ul>
                  <ul className="mt-4 space-y-1 text-base text-ivoire/70">
                    {m.atouts.map((a) => (
                      <li key={a}>— {a}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                    <p className="text-sm text-ivoire/65">
                      Week-end <strong className="text-ivoire">{m.prixWeekend} €</strong> · Semaine{' '}
                      <strong className="text-ivoire">{m.prixSemaine} €</strong>
                    </p>
                    <button type="button" className="btn btn-ligne !min-h-11 !px-4 !py-2.5" onClick={() => choisir(m.id)}>
                      Choisir
                    </button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
