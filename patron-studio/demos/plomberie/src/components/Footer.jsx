import { entreprise, navigation } from '../data/site';
import { Logo } from './Icons';

export default function Footer() {
  return (
    <footer className="[&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center border-t border-ecume/10 bg-nuit px-5 py-12 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="flex items-center gap-2 font-display text-xl font-bold">
            <Logo className="h-7 w-7" /> {entreprise.nomComplet}
          </p>
          <p className="mt-2 text-base text-ecume/60">{entreprise.adresse}</p>
          <p className="mt-1 text-base text-ecume/60">
            <a href={`tel:${entreprise.telephoneLien}`} className="hover:text-eau">
              {entreprise.telephone}
            </a>{' '}
            ·{' '}
            <a href={`mailto:${entreprise.email}`} className="hover:text-eau">
              {entreprise.email}
            </a>
          </p>
        </div>
        <nav aria-label="Pied de page" className="grid grid-cols-2 gap-x-10 gap-y-1 text-base text-ecume/70">
          {navigation.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-eau">
              {n.label}
            </a>
          ))}
          <a href="#devis" className="hover:text-eau">
            Devis gratuit
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-ecume/35">
        © {new Date().getFullYear()} {entreprise.nomComplet} · {entreprise.siret}
      </p>
    </footer>
  );
}
