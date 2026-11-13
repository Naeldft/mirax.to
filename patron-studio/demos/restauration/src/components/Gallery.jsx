import { useRef } from 'react';
import Photo from '@demos/shared/components/Photo.jsx';
import { galerie } from '../data/site';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import SectionTitle from './SectionTitle';

// Disposition en mosaïque (sur grand écran) : certaines images occupent deux cases.
const spans = ['md:row-span-2', '', '', 'md:col-span-2', '', ''];

export default function Gallery() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="galerie" ref={scope} className="section grain bg-charbon" aria-labelledby="galerie-titre">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          id="galerie-titre"
          eyebrow="Galerie"
          title="Dans la chaleur du four"
          intro="Un aperçu de ce qui vous attend : le feu, la pâte, et ce qui sort du four."
        />
        <ul className="mt-12 grid auto-rows-[15rem] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[17rem] md:grid-cols-3">
          {galerie.map((img, i) => (
            <li key={img.photo} data-reveal className={`${spans[i] ?? ''}`}>
              <figure
                tabIndex={0}
                className="group relative h-full overflow-hidden rounded-3xl border border-creme/10 bg-braise outline-none focus-visible:ring-2 focus-visible:ring-or-clair"
              >
                <Photo
                  nom={img.photo}
                  alt={img.alt}
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  width="1200"
                  height="900"
                  className="h-full w-full object-cover duration-[1.2s] ease-out [transition-property:opacity,transform] group-hover:scale-105 group-focus-visible:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charbon/90 via-charbon/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-500 md:translate-y-2 md:group-hover:translate-y-0">
                  <span className="font-serif text-xl italic">{img.legende}</span>
                  <span className="mt-2 block h-px w-10 bg-or-clair transition-all duration-500 group-hover:w-24" />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
