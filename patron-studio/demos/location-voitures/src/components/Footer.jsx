import { entreprise, navigation } from '../data/site';
import { Logo } from './Icons';

export default function Footer() {
  return (
    <footer className="[&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center border-t border-ivoire/10 bg-laque px-5 py-12 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <p className="flex items-center gap-3 font-display text-lg font-bold uppercase">
            <Logo className="h-6 w-10" /> {entreprise.nomComplet}
          </p>
          <p className="mt-2 max-w-xs text-base text-ivoire/60">{entreprise.slogan}</p>
          <p className="mt-2 text-base text-ivoire/65">
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex min-h-11 items-center hover:text-course-vif">
              {entreprise.telephone}
            </a>{' '}
            ·{' '}
            <a href={`mailto:${entreprise.email}`} className="inline-flex min-h-11 items-center hover:text-course-vif">
              {entreprise.email}
            </a>
          </p>
        </div>
        <nav aria-label="Pied de page" className="grid grid-cols-2 gap-x-10 gap-y-1 text-base text-ivoire/70">
          {navigation.map((n) => (
            <a key={n.href} href={n.href} className="inline-flex min-h-11 items-center hover:text-course-vif">
              {n.label}
            </a>
          ))}
          <a href="#reserver" className="inline-flex min-h-11 items-center hover:text-course-vif">
            Réserver
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-[13px] text-ivoire/35">
        © {new Date().getFullYear()} {entreprise.nomComplet} · {entreprise.mention}
      </p>
    </footer>
  );
}
