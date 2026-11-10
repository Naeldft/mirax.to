import { useState } from 'react';
import DemoFooter from '@demos/shared/components/DemoFooter.jsx';
import Loader from '@demos/shared/components/Loader.jsx';
import { useScrollRefresh } from '@demos/shared/hooks/useScrollRefresh.js';
import Header, { Logo } from './components/Header';
import { Deroule, FaqSection, Hero, Portfolio, Prestations, Reservation } from './components/Sections';
import { navigation, studio } from './data/site';

export default function App() {
  const [ready, setReady] = useState(false);
  useScrollRefresh();
  return (
    <>
      <Loader
        ready={ready}
        name="Lumen Studio"
        tagline="Mise au point…"
        fontClass="font-display italic"
        colors={{ bg: '#0d0d0d', fg: '#efebe4', accent: '#e0a95f' }}
        mark={<Logo className="h-12 w-12 animate-[spin_4s_linear_infinite]" />}
      />
      <Header />
      <main>
        <Hero onReady={() => setReady(true)} />
        <Portfolio />
        <Prestations />
        <Deroule />
        <Reservation />
        <FaqSection />
      </main>
      <footer className="border-t border-trait bg-nuit px-5 py-12 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <p className="font-display text-3xl italic">{studio.nom}</p>
            <p className="mt-1 text-sm text-papier/60">
              {studio.photographe} · {studio.adresse}
            </p>
          </div>
          <nav aria-label="Pied de page" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-papier/60">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-ambre">
                {n.label}
              </a>
            ))}
            <a href={`mailto:${studio.email}`} className="hover:text-ambre">
              {studio.email}
            </a>
            <a href={`tel:${studio.telephoneLien}`} className="hover:text-ambre">
              {studio.telephone}
            </a>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-xs text-papier/40">
          © {new Date().getFullYear()} {studio.nom} · {studio.mention} · Photos du portfolio : illustrations dessinées pour la
          démonstration.
        </p>
      </footer>
      <DemoFooter
        demo="photographe"
        theme={{ bg: '#e0a95f', fg: '#0d0d0d', accent: '#0d0d0d', accentFg: '#e0a95f' }}
        fontClass="font-display italic"
      />
    </>
  );
}
