import { useEffect, useRef, useState } from 'react';
import BurgerButton from '@demos/shared/components/BurgerButton.jsx';
import { useMenuPanel } from '@demos/shared/hooks/useMenuPanel.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { navigation, studio } from '../data/site';

export const Logo = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" stroke="#e0a95f" strokeWidth="2">
    <circle cx="16" cy="16" r="13" />
    {[0, 60, 120, 180, 240, 300].map((r) => (
      <path key={r} d="M16 3 L22 14" transform={`rotate(${r} 16 16)`} />
    ))}
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
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${scrolled || open ? 'bg-nuit/85 backdrop-blur-md' : ''}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="#accueil" className="flex items-center gap-2" aria-label={`${studio.nom}, retour à l’accueil`}>
            <Logo className="h-8 w-8" />
            <span className="font-display text-2xl italic">Lumen</span>
            <span className="mono hidden sm:inline">Studio</span>
          </a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-papier/70 transition-colors hover:text-ambre">
                {n.label}
              </a>
            ))}
            <a href="#reservation" className="btn btn-ambre !min-h-0 !py-2.5">
              Demander un devis
            </a>
          </nav>
          <BurgerButton
            open={open}
            onClick={() => setOpen((o) => !o)}
            buttonRef={button}
            controls="menu-mobile"
            className="-mr-2 lg:hidden"
            color="#efebe4"
          />
        </div>
      </header>
      <div
        id="menu-mobile"
        ref={panel}
        className="invisible fixed inset-0 z-[55] flex flex-col bg-carbone px-6 pb-10 pt-24 lg:hidden"
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
              className="flex items-baseline gap-4 border-b border-trait py-4 font-display text-5xl italic"
            >
              <span className="mono not-italic !text-ambre">{String(i + 1).padStart(2, '0')}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <a data-item href={`tel:${studio.telephoneLien}`} className="btn btn-ambre mt-8 w-full">
          Appeler · {studio.telephone}
        </a>
      </div>
    </>
  );
}
