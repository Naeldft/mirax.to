import { useCallback, useState } from 'react';
import DemoFooter from '@demos/shared/components/DemoFooter.jsx';
import Loader from '@demos/shared/components/Loader.jsx';
import { useScrollRefresh } from '@demos/shared/hooks/useScrollRefresh.js';
import Header, { Logo } from './components/Header';
import { Cas, Diagnostic, Expertises, FaqSection, Hero, Methode, Offres, RendezVous } from './components/Sections';
import { cabinet, navigation } from './data/site';

export default function App() {
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('');
  useScrollRefresh();
  // le diagnostic pré-remplit la demande de rendez-vous puis y fait défiler la page
  const versRendezVous = useCallback((m) => {
    setMessage(m);
    document
      .getElementById('rendez-vous')
      ?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, []);
  return (
    <>
      <Loader
        ready={ready}
        name="Cap Horizon"
        tagline="On trace la route…"
        fontClass="font-display"
        colors={{ bg: '#f4f2ec', fg: '#0f1b2d', accent: '#3d6bff' }}
        mark={<Logo className="h-14 w-14 animate-[spin_3s_ease-in-out_infinite] text-nuit" />}
      />
      <Header />
      <main>
        <Hero onReady={() => setReady(true)} />
        <Expertises />
        <Diagnostic onRendezVous={versRendezVous} />
        <Methode />
        <Cas />
        <Offres />
        <RendezVous message={message} />
        <FaqSection />
      </main>
      <footer className="border-t border-white/10 bg-nuit px-5 py-12 text-papier md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-9 text-papier" />
            <div>
              <p className="font-display text-3xl">{cabinet.nom}</p>
              <p className="text-base text-papier/60">{cabinet.adresse}</p>
            </div>
          </div>
          <nav aria-label="Pied de page" className="flex flex-wrap gap-x-6 gap-y-2 text-base text-papier/70">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="inline-flex min-h-11 items-center hover:text-white">
                {n.label}
              </a>
            ))}
            <a href={`tel:${cabinet.telephoneLien}`} className="inline-flex min-h-11 items-center hover:text-white">
              {cabinet.telephone}
            </a>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-[13px] text-papier/40">
          © {new Date().getFullYear()} {cabinet.nom} · {cabinet.mention}
        </p>
      </footer>
      <DemoFooter
        demo="conseil"
        theme={{ bg: '#3d6bff', fg: '#ffffff', accent: '#0f1b2d', accentFg: '#f4f2ec' }}
        fontClass="font-display"
      />
    </>
  );
}
