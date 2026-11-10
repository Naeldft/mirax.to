import { useEffect, useRef, useState } from 'react';
import { restaurant } from '../data/site';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { gsap } from '../lib/gsap';
import { Flame, Phone } from './Icons';

export const NAV = [
  { href: '#menu', label: 'Menu' },
  { href: '#histoire', label: 'Notre histoire' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#avis', label: 'Avis' },
  { href: '#contact', label: 'Contact' },
];

export function Logo({ className = '' }) {
  return (
    <a
      href="#accueil"
      className={`flex items-center gap-2 font-serif text-xl font-semibold tracking-wide ${className}`}
      aria-label="Forno Vivo, retour à l’accueil"
    >
      <Flame className="text-tomate-vif text-2xl" />
      <span>
        Forno <em className="text-or-clair">Vivo</em>
      </span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panel = useRef(null);
  const button = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ouverture / fermeture du menu mobile
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      gsap.set(el, { visibility: 'visible' });
      if (reduced) gsap.set(el, { clipPath: 'circle(150% at 100% 0%)' });
      else {
        gsap.fromTo(
          el,
          { clipPath: 'circle(0% at calc(100% - 2.5rem) 2.2rem)' },
          { clipPath: 'circle(150% at calc(100% - 2.5rem) 2.2rem)', duration: 0.7, ease: 'power3.inOut' },
        );
        gsap.fromTo(
          el.querySelectorAll('[data-item]'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, delay: 0.25, duration: 0.5, ease: 'power3.out' },
        );
      }
      el.querySelector('a')?.focus();
    } else {
      if (reduced) gsap.set(el, { visibility: 'hidden' });
      else
        gsap.to(el, {
          clipPath: 'circle(0% at calc(100% - 2.5rem) 2.2rem)',
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => gsap.set(el, { visibility: 'hidden' }),
        });
    }
  }, [open, reduced]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${scrolled || open ? 'bg-charbon/85 backdrop-blur-md' : 'bg-transparent'}`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <Logo className="relative" />
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-creme/80 transition-colors hover:text-or-clair">
                {n.label}
              </a>
            ))}
            <a href="#reservation" className="btn btn-primary !min-h-0 !py-2.5 text-sm">
              Réserver
            </a>
          </nav>
          <button
            ref={button}
            type="button"
            className="relative -mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-4 w-7">
              <span
                className={`absolute left-0 h-0.5 w-7 rounded bg-creme transition-all duration-300 ${open ? 'top-[7px] rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 rounded bg-creme transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-5 opacity-100'}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-7 rounded bg-creme transition-all duration-300 ${open ? 'top-[7px] -rotate-45' : 'top-[14px]'}`}
              />
            </span>
          </button>
        </div>
      </header>
      {/* panneau mobile : hors du <header> (dont le flou d'arrière-plan bloquerait le plein écran) */}
      <div
        id="menu-mobile"
        ref={panel}
        className="grain invisible fixed inset-0 z-[55] flex flex-col bg-braise px-6 pb-10 pt-24 lg:hidden"
        style={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.2rem)' }}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgb(216_67_47/0.25),transparent_55%)]" />
        <nav aria-label="Navigation mobile" className="relative flex flex-1 flex-col justify-center gap-2">
          {[...NAV, { href: '#reservation', label: 'Réserver' }].map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              data-item
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-creme/10 py-4 font-serif text-4xl"
            >
              <span className="font-sans text-xs text-or-clair">0{i + 1}</span>
              <span className="transition-colors group-hover:text-or-clair">{n.label}</span>
            </a>
          ))}
        </nav>
        <a data-item href={`tel:${restaurant.telephoneLien}`} className="btn btn-ghost relative mt-8 w-full">
          <Phone /> {restaurant.telephone}
        </a>
      </div>
    </>
  );
}
