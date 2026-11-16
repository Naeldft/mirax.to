import { useEffect, useRef, useState } from 'react';
import BurgerButton from '@demos/shared/components/BurgerButton.jsx';
import { useMenuPanel } from '@demos/shared/hooks/useMenuPanel.js';
import { useReducedMotion } from '@demos/shared/hooks/useReducedMotion.js';
import { navigation, snack } from '../data/site';

/** Logotype : le nom en capitales élargies, le point d'exclamation couleur braise. */
export const Logo = ({ className = '' }) => (
  <span className={`titre inline-block text-[1.6rem] leading-none tracking-tight ${className}`}>
    Crunch<span className="text-braise">!</span>
  </span>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panel = useRef(null);
  const button = useRef(null);
  const reduced = useReducedMotion();
  useMenuPanel({ open, setOpen, panel, button, reduced });
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color] duration-500 ${scrolled || open ? 'border-b border-trait bg-nuit/85 backdrop-blur-xl' : 'border-b border-transparent'}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="#accueil" className="flex min-h-11 items-center" aria-label={`${snack.nom}, retour à l’accueil`}>
            <Logo />
          </a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-9 lg:flex">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-creme/75 transition-colors hover:text-creme">
                {n.label}
              </a>
            ))}
            <a href={`tel:${snack.telephoneLien}`} className="text-sm font-medium text-creme/75 transition-colors hover:text-creme">
              {snack.telephone}
            </a>
            <a href="#commande" className="btn btn-braise !min-h-0 !py-2.5">
              Commander
            </a>
          </nav>
          <BurgerButton
            open={open}
            onClick={() => setOpen((o) => !o)}
            buttonRef={button}
            controls="menu-mobile"
            className="-mr-2 lg:hidden"
            color="#f3ece2"
          />
        </div>
      </header>
      <div
        id="menu-mobile"
        ref={panel}
        className="invisible fixed inset-0 z-[55] flex flex-col bg-nuit px-6 pb-28 pt-24 lg:hidden"
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
              className="titre flex items-baseline gap-4 border-b border-trait py-5 text-4xl"
            >
              <span className="font-sans text-xs font-semibold tracking-normal text-braise">{String(i + 1).padStart(2, '0')}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <p data-item className="mt-6 text-sm text-sable">
          {snack.adresse}
        </p>
      </div>
    </>
  );
}
