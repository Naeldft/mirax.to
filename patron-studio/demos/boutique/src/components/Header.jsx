import { useEffect, useRef, useState } from 'react';
import BurgerButton from '@demos/shared/components/BurgerButton.jsx';
import { useMenuPanel } from '@demos/shared/hooks/useMenuPanel.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { boutique, navigation } from '../data/site';

export const Logo = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
    {/* une fleur de lin stylisée : cinq pétales */}
    {[0, 72, 144, 216, 288].map((r) => (
      <ellipse key={r} cx="16" cy="9" rx="4" ry="6.5" transform={`rotate(${r} 16 16)`} />
    ))}
    <circle cx="16" cy="16" r="2" fill="currentColor" />
  </svg>
);

export const BagIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 8h14l-1 13H6L5 8Z" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
  </svg>
);

export default function Header({ count, onCart }) {
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
  const cart = (
    <button
      type="button"
      onClick={onCart}
      className="relative flex h-11 w-11 items-center justify-center"
      aria-label={`Ouvrir le panier (${count} article${count > 1 ? 's' : ''})`}
    >
      <BagIcon className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-encre px-1 text-[0.65rem] font-medium text-ivoire">
          {count}
        </span>
      )}
    </button>
  );
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${scrolled || open ? 'border-b border-lin bg-ivoire/90 backdrop-blur-md' : ''}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="#accueil" className="flex items-center gap-2.5" aria-label={`${boutique.nom}, retour à l’accueil`}>
            <Logo className="h-7 w-7" />
            <span className="font-display text-2xl tracking-[0.08em]">{boutique.nom}</span>
          </a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-9 lg:flex">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="etiquette !text-encre transition-opacity hover:opacity-60">
                {n.label}
              </a>
            ))}
            {cart}
          </nav>
          <div className="flex items-center lg:hidden">
            {cart}
            <BurgerButton
              open={open}
              onClick={() => setOpen((o) => !o)}
              buttonRef={button}
              controls="menu-mobile"
              className="-mr-2"
              color="#1f1f1f"
            />
          </div>
        </div>
      </header>
      <div
        id="menu-mobile"
        ref={panel}
        className="invisible fixed inset-0 z-[55] flex flex-col bg-lin px-6 pb-10 pt-24 lg:hidden"
        style={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.2rem)' }}
        inert={!open}
      >
        <nav aria-label="Navigation mobile" className="flex flex-1 flex-col justify-center">
          {navigation.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-item
              onClick={() => setOpen(false)}
              className="border-b border-sable/60 py-5 font-display text-5xl"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a data-item href={`tel:${boutique.telephoneLien}`} className="btn btn-encre mt-8 w-full">
          <span data-t={`Appeler · ${boutique.telephone}`}>Appeler · {boutique.telephone}</span>
        </a>
      </div>
    </>
  );
}
