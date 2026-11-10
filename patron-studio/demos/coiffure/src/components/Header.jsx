import { useEffect, useRef, useState } from 'react';
import BurgerButton from '@demos/shared/components/BurgerButton.jsx';
import { useMenuPanel } from '@demos/shared/hooks/useMenuPanel.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { navigation, salon } from '../data/site';

export const Logo = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
  >
    <circle cx="15" cy="34" r="6" />
    <circle cx="28" cy="38" r="6" />
    <path d="m19 30 20-22M25 33 37 10" />
  </svg>
);

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
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-500 ${scrolled || open ? 'bg-creme/90 backdrop-blur-md' : ''}`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="#accueil" className="flex items-center gap-2" aria-label={`${salon.nom}, retour à l’accueil`}>
            <Logo className="h-8 w-8" />
            <span className="font-serif text-2xl italic">Atelier Mèche</span>
          </a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-taupe transition-colors hover:text-encre">
                {n.label}
              </a>
            ))}
            <a href="#reserver" className="btn btn-encre !min-h-0 !py-2.5 text-sm">
              Réserver
            </a>
          </nav>
          <BurgerButton
            open={open}
            onClick={() => setOpen((o) => !o)}
            buttonRef={button}
            controls="menu-mobile"
            className="-mr-2 lg:hidden"
            color="#1c1a1a"
          />
        </div>
      </header>
      <div
        id="menu-mobile"
        ref={panel}
        className="invisible fixed inset-0 z-[55] flex flex-col bg-poudre px-6 pb-10 pt-24 lg:hidden"
        style={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.2rem)' }}
        inert={!open}
      >
        <nav aria-label="Navigation mobile" className="flex flex-1 flex-col justify-center">
          {[...navigation, { href: '#reserver', label: 'Réserver' }].map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              data-item
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-encre/15 py-4 font-serif text-4xl"
            >
              <span className="numero text-base">{i + 1}.</span>
              {n.label}
            </a>
          ))}
        </nav>
        <a data-item href={`tel:${salon.telephoneLien}`} className="btn btn-encre mt-8 w-full">
          Appeler le salon · {salon.telephone}
        </a>
      </div>
    </>
  );
}
