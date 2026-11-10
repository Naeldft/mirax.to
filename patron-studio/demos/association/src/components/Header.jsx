import { useEffect, useRef, useState } from 'react';
import BurgerButton from '@demos/shared/components/BurgerButton.jsx';
import { useMenuPanel } from '@demos/shared/hooks/useMenuPanel.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { asso, navigation } from '../data/site';

export const Logo = ({ className = '' }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <circle cx="20" cy="15" r="11" fill="#7fb069" />
    <circle cx="13" cy="12" r="3" fill="#e5533d" />
    <circle cx="26" cy="10" r="2.6" fill="#f2b84b" />
    <circle cx="24" cy="19" r="2.4" fill="#4a7bd0" />
    <path d="M20 18v20M20 30l-7 7M20 30l7 7M20 33l-3 6M20 33l3 6" stroke="#1f4d3a" strokeWidth="2.6" strokeLinecap="round" fill="none" />
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
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${scrolled || open ? 'bg-creme/90 shadow-[0_1px_0_#e4dccb] backdrop-blur-md' : ''}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="#accueil" className="flex items-center gap-2" aria-label={`${asso.nom}, retour à l’accueil`}>
            <Logo className="h-9 w-9" />
            <span className="font-display text-2xl font-extrabold text-foret">Les Racines</span>
          </a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="font-bold text-encre/80 transition-colors hover:text-coquelicot">
                {n.label}
              </a>
            ))}
            <a href="#soutenir" className="btn btn-coquelicot !min-h-0 !py-2.5">
              Faire un don
            </a>
          </nav>
          <BurgerButton
            open={open}
            onClick={() => setOpen((o) => !o)}
            buttonRef={button}
            controls="menu-mobile"
            className="-mr-2 lg:hidden"
            color="#1f4d3a"
          />
        </div>
      </header>
      <div
        id="menu-mobile"
        ref={panel}
        className="invisible fixed inset-0 z-[55] flex flex-col bg-sable px-6 pb-10 pt-24 lg:hidden"
        style={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.2rem)' }}
        inert={!open}
      >
        <nav aria-label="Navigation mobile" className="flex flex-1 flex-col justify-center">
          {[...navigation, { href: '#soutenir', label: 'Faire un don' }].map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              data-item
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b-2 border-dashed border-[#e4dccb] py-4 font-display text-4xl font-extrabold text-foret"
            >
              <span className="font-sans text-sm font-black text-coquelicot">{String(i + 1).padStart(2, '0')}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <a data-item href={`tel:${asso.telephoneLien}`} className="btn btn-foret mt-8 w-full">
          Appeler · {asso.telephone}
        </a>
      </div>
    </>
  );
}
