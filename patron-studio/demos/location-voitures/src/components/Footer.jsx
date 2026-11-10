import { entreprise, navigation } from '../data/site';
import { Logo } from './Icons';

export default function Footer() {
  return (
    <footer className="border-t border-ivoire/10 bg-laque px-5 py-12 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <p className="flex items-center gap-3 font-display text-lg font-bold uppercase">
            <Logo className="h-6 w-10" /> {entreprise.nomComplet}
          </p>
          <p className="mt-2 max-w-xs text-sm text-ivoire/50">{entreprise.slogan}</p>
          <p className="mt-2 text-sm text-ivoire/60">
            <a href={`tel:${entreprise.telephoneLien}`} className="hover:text-course-vif">
              {entreprise.telephone}
            </a>{' '}
            ·{' '}
            <a href={`mailto:${entreprise.email}`} className="hover:text-course-vif">
              {entreprise.email}
            </a>
          </p>
        </div>
        <nav aria-label="Pied de page" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-ivoire/65">
          {navigation.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-course-vif">
              {n.label}
            </a>
          ))}
          <a href="#reserver" className="hover:text-course-vif">
            Réserver
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-xs text-ivoire/35">
        © {new Date().getFullYear()} {entreprise.nomComplet} · {entreprise.mention}
      </p>
    </footer>
  );
}
