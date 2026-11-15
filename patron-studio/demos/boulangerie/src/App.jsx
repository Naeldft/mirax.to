import { useState } from 'react';
import BarreMobile from '@demos/shared/components/BarreMobile.jsx';
import DemoFooter from '@demos/shared/components/DemoFooter.jsx';
import Loader from '@demos/shared/components/Loader.jsx';
import { useScrollRefresh } from '@demos/shared/hooks/useScrollRefresh.js';
import Header, { Logo } from './components/Header';
import Hero from './components/Hero';
import { Ardoise, Commande, Fournil, Infos, Pains } from './components/Sections';
import { maison, navigation } from './data/site';

export default function App() {
  const [ready, setReady] = useState(false);
  useScrollRefresh();
  return (
    <>
      <Loader
        ready={ready}
        name="Maison Levain"
        tagline="Le four chauffe…"
        fontClass="font-serif"
        colors={{ bg: '#f5ecdc', fg: '#2b1d12', accent: '#c98a3e' }}
        mark={<Logo className="h-16 w-16 animate-pulse" />}
        minMs={500}
        maxMs={2000}
      />
      <Header />
      <main>
        <Hero onReady={() => setReady(true)} />
        <Pains />
        <Ardoise />
        <Fournil />
        <Commande />
        <Infos />
      </main>
      <footer className="[&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center papier bg-papier px-5 py-12 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:justify-between">
          <p className="font-serif text-3xl font-bold">{maison.nom}</p>
          <nav aria-label="Pied de page" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-croute/80">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-croute">
                {n.label}
              </a>
            ))}
            <a href={`mailto:${maison.email}`} className="hover:text-croute">
              {maison.email}
            </a>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-xs text-croute/60">
          © {new Date().getFullYear()} {maison.nom} · {maison.adresse} · {maison.mention}
        </p>
      </footer>
      <DemoFooter
        grandesCibles
        demo="boulangerie"
        theme={{ bg: '#7a4a24', fg: '#fbf6ec', accent: '#d9a441', accentFg: '#2b1d12' }}
        fontClass="font-serif"
      />
      <BarreMobile
        telephone={maison.telephone}
        telephoneLien={maison.telephoneLien}
        adresse={maison.adresse}
        theme={{ bg: '#f5ecdc', fg: '#2b1d12', accent: '#7a4a24', accentFg: '#fbf6ec', bord: 'rgb(43 29 18 / 0.12)' }}
      />
    </>
  );
}
