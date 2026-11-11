import { useEffect, useRef, useState } from 'react';
import BurgerButton from '@demos/shared/components/BurgerButton.jsx';
import { useMenuPanel } from '@demos/shared/hooks/useMenuPanel.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { cabinet, navigation } from '../data/site';

export const Logo = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M16 5l4 11-4 11-4-11Z" fill="#3d6bff" />
    <path d="M16 5l4 11h-8Z" fill="currentColor" />
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
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${scrolled || open ? 'border-b border-trait bg-papier/90 backdrop-blur-md' : ''}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="#accueil" className="flex items-center gap-2" aria-label={`${cabinet.nom}, retour à l’accueil`}>
            <Logo className="h-8 w-8 text-nuit" />
            <span className="font-display text-[1.7rem] leading-none">Cap Horizon</span>
          </a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-gris transition-colors hover:text-nuit">
                {n.label}
              </a>
            ))}
            <a href="#rendez-vous" className="btn btn-nuit !min-h-0 !py-2.5">
              Premier rendez-vous offert
            </a>
          </nav>
          <BurgerButton
            open={open}
            onClick={() => setOpen((o) => !o)}
            buttonRef={button}
            controls="menu-mobile"
            className="-mr-2 lg:hidden"
            color="#0f1b2d"
          />
        </div>
      </header>
      <div
        id="menu-mobile"
        ref={panel}
        className="invisible fixed inset-0 z-[55] flex flex-col bg-papier px-6 pb-10 pt-24 lg:hidden"
        style={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.2rem)' }}
        inert={!open}
      >
        <nav aria-label="Navigation mobile" className="flex flex-1 flex-col justify-center">
          {navigation.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              data-item
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-trait py-4 font-display text-5xl"
            >
              <span className="font-sans text-xs text-cobalt">{String(i + 1).padStart(2, '0')}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <a data-item href={`tel:${cabinet.telephoneLien}`} className="btn btn-nuit mt-8 w-full">
          Appeler · {cabinet.telephone}
        </a>
      </div>
    </>
  );
}
