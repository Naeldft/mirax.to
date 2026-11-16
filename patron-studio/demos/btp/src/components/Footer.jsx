import { entreprise, navigation } from '../data/site';
import { Logo } from './Icons';

export default function Footer() {
  return (
    <footer className="[&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center border-t-2 border-anthracite bg-beton px-5 py-12 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <p className="flex items-center gap-3 font-display text-lg uppercase">
            <Logo className="h-8 w-8" /> {entreprise.nomComplet}
          </p>
          <p className="mt-2 text-graphite">{entreprise.adresse}</p>
          <p className="mt-1 text-graphite">
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
              {entreprise.telephone}
            </a>{' '}
            ·{' '}
            <a href={`mailto:${entreprise.email}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
              {entreprise.email}
            </a>
          </p>
        </div>
        <nav aria-label="Pied de page" className="grid grid-cols-2 gap-x-10 gap-y-2 font-cond text-lg font-bold uppercase">
          {navigation.map((n) => (
            <a key={n.href} href={n.href} className="inline-flex min-h-11 items-center hover:text-plan">
              {n.label}
            </a>
          ))}
          <a href="#devis" className="inline-flex min-h-11 items-center hover:text-plan">
            Devis gratuit
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-[13px] text-graphite">
        © {new Date().getFullYear()} {entreprise.nomComplet} · {entreprise.mention}
      </p>
    </footer>
  );
}
