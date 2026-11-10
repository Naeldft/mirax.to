import { useState } from 'react';
import DemoFooter from '@demos/shared/components/DemoFooter.jsx';
import Loader from '@demos/shared/components/Loader.jsx';
import { useScrollRefresh } from '@demos/shared/hooks/useScrollRefresh.js';
import Contact from './components/Contact';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Header from './components/Header';
import Hero from './components/Hero';
import { Flame } from './components/Icons';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Reviews from './components/Reviews';
import Story from './components/Story';

export default function App() {
  const [ready, setReady] = useState(false);
  useScrollRefresh();
  return (
    <>
      <Loader
        ready={ready}
        name="Forno Vivo"
        tagline="On allume le four…"
        fontClass="font-serif"
        colors={{ bg: '#14110f', fg: '#f5ecd9', accent: '#d8432f' }}
        mark={<Flame className="animate-pulse text-6xl text-tomate-vif" />}
      />
      <Header />
      <main>
        <Hero onReady={() => setReady(true)} />
        <Menu />
        <Story />
        <Gallery />
        <Reviews />
        <Reservation />
        <FaqSection />
        <Contact />
      </main>
      <Footer />
      <DemoFooter demo="restauration" theme={{ bg: '#b3261e', fg: '#f5ecd9', accent: '#f5ecd9', accentFg: '#14110f' }} fontClass="font-serif" />
    </>
  );
}
