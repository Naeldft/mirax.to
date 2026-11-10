import { useRef } from 'react';
import Faq from '@demos/shared/components/Faq.jsx';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { faq } from '../data/site';
import SectionTitle from './SectionTitle';

export default function FaqSection() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="faq" ref={scope} className="section grain bg-charbon" aria-labelledby="faq-titre">
      <div className="mx-auto max-w-3xl">
        <SectionTitle id="faq-titre" eyebrow="Questions fréquentes" title="Bon à savoir" />
        <div className="mt-10 border-t border-creme/10">
          <Faq
            items={faq}
            classes={{
              item: 'border-b border-creme/10',
              button: 'flex w-full items-center justify-between gap-6 py-5 text-left font-serif text-xl font-semibold transition-colors hover:text-or-clair md:text-2xl',
              icon: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-creme/20 font-sans text-xl text-or-clair',
              answer: 'pb-6 leading-relaxed text-creme/70',
            }}
          />
        </div>
      </div>
    </section>
  );
}
