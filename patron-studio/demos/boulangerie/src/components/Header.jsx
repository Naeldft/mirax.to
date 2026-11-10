import { useEffect, useRef, useState } from 'react';
import BurgerButton from '@demos/shared/components/BurgerButton.jsx';
import { useMenuPanel } from '@demos/shared/hooks/useMenuPanel.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { maison, navigation } from '../data/site';

export const Logo = ({ className = '' }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <ellipse cx="24" cy="28" rx="19" ry="11" fill="#c98a3e" />
    <path d="M13 26l6-5M21 28l6-5M29 30l6-5" stroke="#f1e2c6" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M24 4v10M20 8l4 4 4-4" stroke="#d9a441" strokeWidth="2" fill="none" strokeLinecap="round" />
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
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${scrolled || open ? 'bg-papier/90 shadow-[0_1px_0_rgb(122_74_36/0.15)] backdrop-blur-md' : ''}`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="#accueil" className="flex items-center gap-2" aria-label={`${maison.nom}, retour à l’accueil`}>
            <Logo className="h-9 w-9" />
            <span className="font-serif text-2xl font-bold">Maison Levain</span>
          </a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-croute/80 transition-colors hover:text-croute">
                {n.label}
              </a>
            ))}
            <a href="#commande" className="btn btn-croute !min-h-0 !py-2.5 text-sm">
              Commander
            </a>
          </nav>
          <BurgerButton
            open={open}
            onClick={() => setOpen((o) => !o)}
            buttonRef={button}
            controls="menu-mobile"
            className="-mr-2 lg:hidden"
            color="#7a4a24"
          />
        </div>
      </header>
      <div
        id="menu-mobile"
        ref={panel}
        className="papier invisible fixed inset-0 z-[55] flex flex-col bg-mie px-6 pb-10 pt-24 lg:hidden"
        style={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.2rem)' }}
        inert={!open}
      >
        <nav aria-label="Navigation mobile" className="flex flex-1 flex-col justify-center">
          {[...navigation].map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              data-item
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-croute/15 py-4 font-serif text-4xl font-bold"
            >
              <span className="craie text-2xl text-dore">{i + 1}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <a data-item href={`tel:${maison.telephoneLien}`} className="btn btn-croute mt-8 w-full">
          Appeler · {maison.telephone}
        </a>
      </div>
    </>
  );
}
