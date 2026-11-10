import { PATRON } from '@demos/shared/lib/patron.js';
import { restaurant } from '../data/site';
import { Logo, NAV } from './Header';
import { Social } from './Icons';

export default function Footer() {
  return (
    <footer className="border-t border-creme/10 bg-charbon px-5 pb-10 pt-14 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 font-serif italic text-creme/60">{restaurant.slogan}</p>
        </div>
        <nav aria-label="Liens du pied de page" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-creme/70">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-or-clair">
              {n.label}
            </a>
          ))}
          <a href="#reservation" className="hover:text-or-clair">
            Réserver
          </a>
        </nav>
        <ul className="flex gap-3" aria-label="Réseaux sociaux">
          {restaurant.reseaux.map((r) => (
            <li key={r.nom}>
              <a
                href={r.url}
                aria-label={`${restaurant.nom} sur ${r.nom}`}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-creme/15 text-xl text-creme/80 transition-colors hover:border-or-clair hover:text-or-clair"
              >
                <Social name={r.icone} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-creme/10 pt-6 text-xs text-creme/40 md:flex-row md:justify-between">
        <p>
          © {new Date().getFullYear()} {restaurant.nom} · Restaurant fictif
        </p>
        <p>
          Site démo réalisé par{' '}
          <a href={PATRON.accueil} className="underline-offset-4 hover:text-creme/70 hover:underline">
            Patrôn Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
