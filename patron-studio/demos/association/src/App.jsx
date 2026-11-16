import { useState } from 'react';
import DemoFooter from '@demos/shared/components/DemoFooter.jsx';
import Loader from '@demos/shared/components/Loader.jsx';
import { useScrollRefresh } from '@demos/shared/hooks/useScrollRefresh.js';
import Header, { Logo } from './components/Header';
import { Actions, Agenda, Benevole, Contact, FaqSection, Hero, Soutenir } from './components/Sections';
import { asso, navigation } from './data/site';

export default function App() {
  const [ready, setReady] = useState(false);
  useScrollRefresh();
  return (
    <>
      <Loader
        ready={ready}
        name="Les Racines"
        tagline="On arrose les semis…"
        fontClass="font-display font-extrabold"
        colors={{ bg: '#fbf6ea', fg: '#1f4d3a', accent: '#e5533d' }}
        mark={<Logo className="h-14 w-14 animate-bounce" />}
      />
      <Header />
      <main>
        <Hero onReady={() => setReady(true)} />
        <Actions />
        <Agenda />
        <Benevole />
        <Soutenir />
        <FaqSection />
        <Contact />
      </main>
      <footer className="border-t-2 border-creme/10 bg-foret px-5 py-12 text-creme md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <div>
              <p className="font-display text-2xl font-extrabold">{asso.nom}</p>
              <p className="text-base text-creme/60">Association loi 1901 · {asso.adresse}</p>
            </div>
          </div>
          <nav aria-label="Pied de page" className="flex flex-wrap gap-x-6 gap-y-2 text-base text-creme/70">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="inline-flex min-h-11 items-center hover:text-soleil">
                {n.label}
              </a>
            ))}
            <a href={`mailto:${asso.email}`} className="inline-flex min-h-11 items-center hover:text-soleil">
              {asso.email}
            </a>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-[13px] text-creme/40">
          © {new Date().getFullYear()} {asso.nom} · {asso.mention}
        </p>
      </footer>
      <DemoFooter
        demo="association"
        theme={{ bg: '#f2b84b', fg: '#1f4d3a', accent: '#1f4d3a', accentFg: '#fbf6ea' }}
        fontClass="font-display font-extrabold"
      />
    </>
  );
}
