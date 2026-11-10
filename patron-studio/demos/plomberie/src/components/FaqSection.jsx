import { useRef } from 'react';
import Faq from '@demos/shared/components/Faq.jsx';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { faq } from '../data/site';
import SectionTitle from './SectionTitle';

export default function FaqSection() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="faq" ref={scope} className="section bg-nuit-2" aria-labelledby="faq-titre">
      <div className="mx-auto max-w-3xl">
        <SectionTitle id="faq-titre" tag="Questions fréquentes" title="Vous vous demandez sûrement…" />
        <div className="mt-10">
          <Faq
            items={faq}
            classes={{
              item: 'mb-3 rounded-2xl border border-ecume/10 bg-nuit px-5',
              button:
                'flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-bold transition-colors hover:text-eau',
              icon: 'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-eau/10 text-xl text-eau',
              answer: 'pb-5 leading-relaxed text-ecume/70',
            }}
          />
        </div>
      </div>
    </section>
  );
}
