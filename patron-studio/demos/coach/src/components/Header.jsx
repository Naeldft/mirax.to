import { useEffect, useRef, useState } from 'react';
import BurgerButton from '@demos/shared/components/BurgerButton.jsx';
import { useMenuPanel } from '@demos/shared/hooks/useMenuPanel.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { coach, navigation } from '../data/site';

export const Logo = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 32"
    className={className}
    aria-hidden="true"
    fill="none"
    stroke="#c6ff3d"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 17h9l4-10 7 18 5-11 3 3h16" />
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
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${scrolled || open ? 'bg-noir/90 backdrop-blur-md' : ''}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="#accueil" className="flex items-center gap-2" aria-label={`${coach.nom}, retour à l’accueil`}>
            <Logo className="h-7 w-11" />
            <span className="font-display text-2xl uppercase tracking-wide">Pulse</span>
          </a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {navigation.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-xs font-bold uppercase tracking-[0.18em] text-gris transition-colors hover:text-acide"
              >
                {n.label}
              </a>
            ))}
            <a href="#essai" className="btn btn-acide !min-h-0 !py-2.5">
              Séance offerte
            </a>
          </nav>
          <BurgerButton
            open={open}
            onClick={() => setOpen((o) => !o)}
            buttonRef={button}
            controls="menu-mobile"
            className="-mr-2 lg:hidden"
            color="#f4f4f1"
          />
        </div>
      </header>
      <div
        id="menu-mobile"
        ref={panel}
        className="invisible fixed inset-0 z-[55] flex flex-col bg-graphite px-6 pb-10 pt-24 lg:hidden"
        style={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.2rem)' }}
        inert={!open}
      >
        <nav aria-label="Navigation mobile" className="flex flex-1 flex-col justify-center">
          {[...navigation, { href: '#essai', label: 'Séance offerte' }].map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              data-item
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-acier py-4 font-display text-5xl uppercase"
            >
              <span className="font-sans text-xs font-bold text-acide">{String(i + 1).padStart(2, '0')}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <a data-item href={`tel:${coach.telephoneLien}`} className="btn btn-acide mt-8 w-full">
          Appeler · {coach.telephone}
        </a>
      </div>
    </>
  );
}
