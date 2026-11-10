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
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${scrolled || open ? 'bg-nuit/85 backdrop-blur-md' : ''}`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
          <a
            href="#accueil"
            className="flex items-center gap-2.5 font-display text-xl font-bold"
            aria-label={`${entreprise.nomComplet}, retour à l’accueil`}
          >
            <Logo className="h-8 w-8" />
            <span>
              Ondine<span className="text-eau">.</span>
            </span>
          </a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-ecume/75 transition-colors hover:text-eau">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={`tel:${entreprise.telephoneLien}`} className="btn btn-eau !min-h-0 !rounded-full !px-4 !py-2.5 text-sm">
              <span className="pulse-dot flex h-2 w-2 rounded-full bg-alerte text-alerte" aria-hidden="true" />
              <span className="hidden sm:inline">Urgence ·</span> {entreprise.telephone}
            </a>
            <BurgerButton
              open={open}
              onClick={() => setOpen((o) => !o)}
              buttonRef={button}
              controls="menu-mobile"
              className="-mr-2 lg:hidden"
              color="#e8f6fa"
            />
          </div>
        </div>
      </header>
      <div
        id="menu-mobile"
        ref={panel}
        className="blueprint invisible fixed inset-0 z-[55] flex flex-col bg-nuit-2 px-6 pb-10 pt-24 lg:hidden"
        style={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.2rem)' }}
        inert={!open}
      >
        <nav aria-label="Navigation mobile" className="flex flex-1 flex-col justify-center">
          {[...navigation, { href: '#devis', label: 'Demander un devis' }].map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              data-item
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-ecume/10 py-4 font-display text-4xl font-bold"
            >
              <span className="font-sans text-xs text-eau">{String(i + 1).padStart(2, '0')}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <a data-item href={`tel:${entreprise.telephoneLien}`} className="btn btn-eau mt-8 w-full">
          <Telephone /> Appeler le {entreprise.telephone}
        </a>
      </div>
    </>
  );
}
