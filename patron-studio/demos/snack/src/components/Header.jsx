import { useEffect, useRef, useState } from 'react';
import BurgerButton from '@demos/shared/components/BurgerButton.jsx';
import { useMenuPanel } from '@demos/shared/hooks/useMenuPanel.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { navigation, snack } from '../data/site';

export const Logo = ({ className = '' }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <path d="M6 19a14 11 0 0 1 28 0Z" fill="#e0862f" stroke="#1a1714" strokeWidth="2" strokeLinejoin="round" />
    <rect x="5" y="20" width="30" height="5" rx="2.5" fill="#5a3220" stroke="#1a1714" strokeWidth="2" />
    <path d="M4 27h32l-3 3H7Z" fill="#5aa04a" stroke="#1a1714" strokeWidth="2" strokeLinejoin="round" />
    <rect x="6" y="31" width="28" height="5" rx="2.5" fill="#e0862f" stroke="#1a1714" strokeWidth="2" />
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
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${scrolled || open ? 'border-b-[3px] border-encre bg-moutarde' : ''}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="#accueil" className="flex items-center gap-2" aria-label={`${snack.nom}, retour à l’accueil`}>
            <Logo className="h-9 w-9" />
            <span className="font-display text-3xl -rotate-3 text-ketchup [text-shadow:2px_2px_0_#1a1714]">Crunch!</span>
          </a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="font-extrabold transition-colors hover:text-ketchup">
                {n.label}
              </a>
            ))}
            <a href="#commande" className="btn btn-ketchup !min-h-0 !py-2">
              Commander
            </a>
          </nav>
          <BurgerButton
            open={open}
            onClick={() => setOpen((o) => !o)}
            buttonRef={button}
            controls="menu-mobile"
            className="-mr-2 lg:hidden"
            color="#1a1714"
          />
        </div>
      </header>
      <div
        id="menu-mobile"
        ref={panel}
        className="invisible fixed inset-0 z-[55] flex flex-col bg-moutarde px-6 pb-10 pt-24 lg:hidden"
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
              className="flex items-baseline gap-4 border-b-[3px] border-encre py-4 font-display text-5xl"
            >
              <span className="font-sans text-sm font-black text-ketchup">{String(i + 1).padStart(2, '0')}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <a data-item href={`tel:${snack.telephoneLien}`} className="btn btn-ketchup mt-8 w-full">
          Appeler · {snack.telephone}
        </a>
      </div>
    </>
  );
}
