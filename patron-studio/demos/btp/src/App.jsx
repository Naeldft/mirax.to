import { useState } from 'react';
import BarreMobile from '@demos/shared/components/BarreMobile.jsx';
import DemoFooter from '@demos/shared/components/DemoFooter.jsx';
import Loader from '@demos/shared/components/Loader.jsx';
import { useScrollRefresh } from '@demos/shared/hooks/useScrollRefresh.js';
import Devis from './components/Devis';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import { Logo } from './components/Icons';
import { Avis, FaqSection, Zone } from './components/Infos';
import Methode from './components/Methode';
import Realisations from './components/Realisations';
import Services from './components/Services';

import { entreprise } from './data/site';

export default function App() {
  const [ready, setReady] = useState(false);
  useScrollRefresh();
  return (
    <>
      <Loader
        ready={ready}
        name="BÂTI NORD"
        tagline="On coule les fondations…"
        fontClass="font-display"
        colors={{ bg: '#f2b705', fg: '#1d1d1b', accent: '#1d1d1b' }}
        mark={<Logo className="h-16 w-16 animate-pulse" />}
        minMs={500}
        maxMs={2000}
      />
      <Header />
      <main>
        <Hero onReady={() => setReady(true)} />
        <Services />
        <Realisations />
        <Methode />
        <Zone />
        <Avis />
        <FaqSection />
        <Devis />
      </main>
      <Footer />
      <DemoFooter
        grandesCibles
        demo="btp"
        theme={{ bg: '#1d1d1b', fg: '#f7f6f2', accent: '#f2b705', accentFg: '#1d1d1b' }}
        fontClass="font-display uppercase"
      />
      <BarreMobile
        telephone={entreprise.telephone}
        telephoneLien={entreprise.telephoneLien}
        adresse={entreprise.adresse}
        theme={{ bg: '#f7f6f2', fg: '#1d1d1b', accent: '#f2b705', accentFg: '#1d1d1b', bord: 'rgb(29 29 27 / 0.15)' }}
      />
    </>
  );
}
