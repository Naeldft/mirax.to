import { useState } from 'react';
import BarreMobile from '@demos/shared/components/BarreMobile.jsx';
import DemoFooter from '@demos/shared/components/DemoFooter.jsx';
import Loader from '@demos/shared/components/Loader.jsx';
import { useScrollRefresh } from '@demos/shared/hooks/useScrollRefresh.js';
import Header, { Logo } from './components/Header';
import Reservation from './components/Reservation';
import Hero from './components/Hero';
import { Avis, Equipe, Infos, Looks, Prestations } from './components/Sections';
import { navigation, salon } from './data/site';

export default function App() {
  const [ready, setReady] = useState(false);
  useScrollRefresh();
  return (
    <>
      <Loader
        ready={ready}
        name="Atelier Mèche"
        tagline="On aiguise les ciseaux…"
        fontClass="font-serif italic"
        colors={{ bg: '#f7efe9', fg: '#1c1a1a', accent: '#b9746e' }}
        mark={<Logo className="h-14 w-14 animate-pulse" />}
        minMs={500}
        maxMs={2000}
      />
      <Header />
      <main>
        <Hero onReady={() => setReady(true)} />
        <Prestations />
        <Equipe />
        <Looks />
        <Avis />
        <Reservation />
        <Infos />
      </main>
      <footer className="bg-creme px-5 py-12 md:px-8 [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:justify-between">
          <p className="font-serif text-2xl italic">{salon.nom}</p>
          <nav aria-label="Pied de page" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-taupe">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-encre">
                {n.label}
              </a>
            ))}
            <a href={`mailto:${salon.email}`} className="hover:text-encre">
              {salon.email}
            </a>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-xs text-taupe">
          © {new Date().getFullYear()} {salon.nom} · {salon.adresse} · {salon.mention}
        </p>
      </footer>
      <DemoFooter
        grandesCibles
        demo="coiffure"
        theme={{ bg: '#1c1a1a', fg: '#f7efe9', accent: '#d9a5a0', accentFg: '#1c1a1a' }}
        fontClass="font-serif italic"
      />
      <BarreMobile
        telephone={salon.telephone}
        telephoneLien={salon.telephoneLien}
        adresse={salon.adresse}
        theme={{ bg: '#f7efe9', fg: '#1c1a1a', accent: '#1c1a1a', accentFg: '#f7efe9', bord: 'rgb(28 26 26 / 0.12)' }}
      />
    </>
  );
}
