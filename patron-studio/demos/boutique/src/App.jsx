import { useCallback, useState } from 'react';
import DemoFooter from '@demos/shared/components/DemoFooter.jsx';
import Loader from '@demos/shared/components/Loader.jsx';
import { useScrollRefresh } from '@demos/shared/hooks/useScrollRefresh.js';
import Header, { Logo } from './components/Header';
import Hero from './components/Hero';
import { Atelier, Boutique, Collection, FaqSection, Livraison, Panier } from './components/Sections';
import { boutique, navigation } from './data/site';

export default function App() {
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState([]);
  const [panierOuvert, setPanierOuvert] = useState(false);
  useScrollRefresh();

  const ajouter = useCallback((p) => {
    const key = `${p.id}-${p.taille}`;
    setItems((list) => {
      const deja = list.find((it) => it.key === key);
      if (deja) return list.map((it) => (it.key === key ? { ...it, qte: it.qte + 1 } : it));
      return [...list, { ...p, key, qte: 1 }];
    });
  }, []);
  const setQty = useCallback((key, qte) => {
    setItems((list) =>
      qte <= 0 ? list.filter((it) => it.key !== key) : list.map((it) => (it.key === key ? { ...it, qte: Math.min(qte, 9) } : it)),
    );
  }, []);
  const vider = useCallback(() => setItems([]), []);
  const fermer = useCallback(() => setPanierOuvert(false), []);
  const nb = items.reduce((s, it) => s + it.qte, 0);

  return (
    <>
      <Loader
        ready={ready}
        name="Atelier Lin"
        tagline="On repasse les chemises…"
        fontClass="font-display"
        colors={{ bg: '#f4f1ec', fg: '#1f1f1f', accent: '#9aa58a' }}
        mark={<Logo className="h-12 w-12 animate-[spin_6s_linear_infinite]" />}
      />
      <Header count={nb} onCart={() => setPanierOuvert(true)} />
      <main>
        <Hero onReady={() => setReady(true)} />
        <Collection onAdd={ajouter} />
        <Atelier />
        <Livraison />
        <FaqSection />
        <Boutique />
      </main>
      <Panier open={panierOuvert} onClose={fermer} items={items} setQty={setQty} clear={vider} />
      <footer className="border-t border-white/10 bg-encre px-5 py-12 text-ivoire md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <div>
              <p className="font-display text-3xl">{boutique.nom}</p>
              <p className="mt-1 text-base text-ivoire/60">{boutique.adresse}</p>
            </div>
          </div>
          <nav aria-label="Pied de page" className="flex flex-wrap gap-x-6 gap-y-2 text-base text-ivoire/60">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="inline-flex min-h-11 items-center hover:text-ivoire">
                {n.label}
              </a>
            ))}
            <a href={`mailto:${boutique.email}`} className="inline-flex min-h-11 items-center hover:text-ivoire">
              {boutique.email}
            </a>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-[13px] text-ivoire/40">
          © {new Date().getFullYear()} {boutique.nom} · {boutique.mention}
        </p>
      </footer>
      <DemoFooter
        demo="boutique"
        theme={{ bg: '#e6ddcf', fg: '#1f1f1f', accent: '#1f1f1f', accentFg: '#f4f1ec' }}
        fontClass="font-display"
      />
    </>
  );
}
