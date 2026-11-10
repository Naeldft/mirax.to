import { useState } from 'react';
import DemoFooter from '@demos/shared/components/DemoFooter.jsx';
import Loader from '@demos/shared/components/Loader.jsx';
import { useScrollRefresh } from '@demos/shared/hooks/useScrollRefresh.js';
import { Agences, Avis, FaqSection } from './components/Agences';
import Flotte from './components/Flotte';
import Fonctionnement from './components/Fonctionnement';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import { Logo } from './components/Icons';
import Reservation from './components/Reservation';

export default function App() {
  const [ready, setReady] = useState(false);
  const [model, setModel] = useState('suv');
  const [color, setColor] = useState('rouge');
  useScrollRefresh();
  return (
    <>
      <Loader
        ready={ready}
        name="VELOCITÀ"
        tagline="Préparation du véhicule…"
        fontClass="font-display"
        colors={{ bg: '#0a0a0b', fg: '#f4f2ee', accent: '#e10600' }}
        mark={<Logo className="h-12 w-20 animate-pulse" />}
      />
      <Header />
      <main>
        <Hero model={model} color={color} onModel={setModel} onColor={setColor} onReady={() => setReady(true)} />
        <Flotte model={model} color={color} onModel={setModel} />
        <Fonctionnement />
        <Agences />
        <Avis />
        <Reservation model={model} onModel={setModel} />
        <FaqSection />
      </main>
      <Footer />
      <DemoFooter
        demo="location-voitures"
        theme={{ bg: '#e10600', fg: '#f4f2ee', accent: '#0a0a0b', accentFg: '#f4f2ee' }}
        fontClass="font-display uppercase"
      />
    </>
  );
}
