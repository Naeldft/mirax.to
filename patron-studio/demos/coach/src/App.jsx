import { useState } from 'react';
import DemoFooter from '@demos/shared/components/DemoFooter.jsx';
import Loader from '@demos/shared/components/Loader.jsx';
import { useScrollRefresh } from '@demos/shared/hooks/useScrollRefresh.js';
import Header, { Logo } from './components/Header';
import { Essai, FaqSection, Hero, LeCoach, Methode, Planning, Programmes } from './components/Sections';
import { coach, navigation } from './data/site';

export default function App() {
  const [ready, setReady] = useState(false);
  useScrollRefresh();
  return (
    <>
      <Loader
        ready={ready}
        name="PULSE"
        tagline="Échauffement en cours…"
        fontClass="font-display uppercase"
        colors={{ bg: '#0b0b0c', fg: '#f4f4f1', accent: '#c6ff3d' }}
        mark={<Logo className="h-12 w-20 animate-pulse" />}
      />
      <Header />
      <main>
        <Hero onReady={() => setReady(true)} />
        <Programmes />
        <Methode />
        <Planning />
        <LeCoach />
        <Essai />
        <FaqSection />
      </main>
      <footer className="border-t border-acier bg-noir px-5 py-12 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <p className="font-display text-3xl uppercase">{coach.nom}</p>
            <p className="mt-1 text-sm text-gris">{coach.lieu}</p>
          </div>
          <nav aria-label="Pied de page" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gris">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-acide">
                {n.label}
              </a>
            ))}
            <a href={`mailto:${coach.email}`} className="hover:text-acide">
              {coach.email}
            </a>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-xs text-gris/70">
          © {new Date().getFullYear()} {coach.nom} · {coach.mention}
        </p>
      </footer>
      <DemoFooter
        demo="coach"
        theme={{ bg: '#c6ff3d', fg: '#0b0b0c', accent: '#0b0b0c', accentFg: '#c6ff3d' }}
        fontClass="font-display uppercase"
      />
    </>
  );
}
