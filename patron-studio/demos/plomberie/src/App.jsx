import { useState } from 'react';
import BarreMobile from '@demos/shared/components/BarreMobile.jsx';
import DemoFooter from '@demos/shared/components/DemoFooter.jsx';
import Loader from '@demos/shared/components/Loader.jsx';
import { useScrollRefresh } from '@demos/shared/hooks/useScrollRefresh.js';
import Devis from './components/Devis';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import { Logo } from './components/Icons';
import Methode from './components/Methode';
import Realisations from './components/Realisations';
import Reviews from './components/Reviews';
import Services from './components/Services';
import Zone from './components/Zone';
import { entreprise } from './data/site';

export default function App() {
  const [ready, setReady] = useState(false);
  useScrollRefresh();
  return (
    <>
      <Loader
        ready={ready}
        name="Ondine Plomberie"
        tagline="On ouvre l’arrivée d’eau…"
        fontClass="font-display"
        colors={{ bg: '#0a1724', fg: '#e8f6fa', accent: '#5fd4e8' }}
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
        <Reviews />
        <FaqSection />
        <Devis />
      </main>
      <Footer />
      <DemoFooter
        grandesCibles
        demo="plomberie"
        theme={{ bg: '#d08a52', fg: '#0a1724', accent: '#0a1724', accentFg: '#e8f6fa' }}
        fontClass="font-display"
      />
      <BarreMobile
        telephone={entreprise.telephone}
        telephoneLien={entreprise.telephoneLien}
        adresse={entreprise.adresse}
        theme={{ bg: '#0a1724', fg: '#e8f6fa', accent: '#5fd4e8', accentFg: '#0a1724', bord: 'rgb(232 246 250 / 0.15)' }}
      />
    </>
  );
}
