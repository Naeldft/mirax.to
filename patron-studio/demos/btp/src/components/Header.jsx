import { useEffect, useRef, useState } from 'react';
import BurgerButton from '@demos/shared/components/BurgerButton.jsx';
import { useMenuPanel } from '@demos/shared/hooks/useMenuPanel.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { entreprise, navigation } from '../data/site';
import { Logo, Telephone } from './Icons';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panel = useRef(null);
  const button = useRef(null);
  const reduced = useReducedMotion();
  useMenuPanel({ open, setOpen, panel, button, reduced });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] border-b-2 transition-colors duration-300 ${scrolled || open ? 'border-anthracite bg-beton/95' : 'border-transparent'}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
          <a href="#accueil" className="flex items-center gap-2.5" aria-label={`${entreprise.nomComplet}, retour à l’accueil`}>
            <Logo className="h-9 w-9" />
            <span className="font-display text-lg uppercase leading-none">
              Bâti Nord
              <span className="block font-cond text-xs font-bold tracking-[0.25em] text-graphite">Construction</span>
            </span>
          </a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
            {navigation.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="font-cond text-lg font-bold uppercase tracking-wider text-graphite transition-colors hover:text-plan"
              >
                {n.label}
              </a>
            ))}
            <a href="#devis" className="btn btn-jaune !min-h-0 !py-2">
              Devis gratuit
            </a>
          </nav>
          <BurgerButton
            open={open}
            onClick={() => setOpen((o) => !o)}
            buttonRef={button}
            controls="menu-mobile"
            className="-mr-2 lg:hidden"
            color="#1d1d1b"
          />
        </div>
      </header>
      <div
        id="menu-mobile"
        ref={panel}
        className="quadrillage invisible fixed inset-0 z-[55] flex flex-col bg-chantier px-6 pb-10 pt-24 lg:hidden"
        style={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.2rem)' }}
        inert={!open}
      >
        <nav aria-label="Navigation mobile" className="flex flex-1 flex-col justify-center">
          {[...navigation, { href: '#devis', label: 'Devis gratuit' }].map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              data-item
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b-2 border-anthracite py-4 font-display text-3xl uppercase"
            >
              <span className="font-cond text-sm font-bold">{String(i + 1).padStart(2, '0')}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <a data-item href={`tel:${entreprise.telephoneLien}`} className="btn btn-noir mt-8 w-full">
          <Telephone /> {entreprise.telephone}
        </a>
      </div>
    </>
  );
}
