import { useCallback, useEffect, useState } from 'react';
import DemoFooter from '@demos/shared/components/DemoFooter.jsx';
import Loader from '@demos/shared/components/Loader.jsx';
import { useScrollRefresh } from '@demos/shared/hooks/useScrollRefresh.js';
import { formatEuros } from '@demos/shared/lib/validation.js';
import Header, { Logo } from './components/Header';
import { Allergenes, Avis, Bandeau, Carte, Commande, FaqSection, Hero, Infos } from './components/Sections';
import { formule, navigation, produits, snack } from './data/site';

export default function App() {
  const [ready, setReady] = useState(false);
  const [quantites, setQuantites] = useState({});
  const [menus, setMenus] = useState(0);
  const [barre, setBarre] = useState(false);
  useScrollRefresh();

  const ajouter = useCallback((id) => setQuantites((q) => ({ ...q, [id]: Math.min(20, (q[id] || 0) + 1) })), []);
  const setQte = useCallback((id, n) => setQuantites((q) => ({ ...q, [id]: Math.max(0, Math.min(20, n)) })), []);
  const vider = useCallback(() => {
    setQuantites({});
    setMenus(0);
  }, []);
  const lignes = produits.filter((p) => quantites[p.id] > 0).map((p) => ({ p, q: quantites[p.id] }));
  const nb = lignes.reduce((s, l) => s + l.q, 0);
  const total = lignes.reduce((s, l) => s + l.p.prix * l.q, 0) + menus * formule.supplement;
  // pas plus de menus que de burgers / poulet dans la commande
  const maxMenus = lignes.filter((l) => l.p.cat === 'burgers' || l.p.cat === 'poulet').reduce((s, l) => s + l.q, 0);
  useEffect(() => {
    if (menus > maxMenus) setMenus(maxMenus);
  }, [menus, maxMenus]);
  // barre « ma commande » en bas de l'écran, masquée quand la section commande est visible
  useEffect(() => {
    const cible = document.getElementById('commande');
    if (!cible) return;
    const io = new IntersectionObserver(([e]) => setBarre(!e.isIntersecting), { threshold: 0.05 });
    io.observe(cible);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Loader
        ready={ready}
        name="Crunch!"
        tagline="Ça grésille sur la plancha…"
        fontClass="font-display"
        colors={{ bg: '#ffc93c', fg: '#1a1714', accent: '#e63b2e' }}
        mark={<Logo className="h-16 w-16 animate-bounce" />}
      />
      <Header />
      <main>
        <Hero onReady={() => setReady(true)} />
        <Bandeau />
        <Carte ajouter={ajouter} quantites={quantites} />
        <Commande lignes={lignes} setQte={setQte} menus={menus} setMenus={setMenus} vider={vider} />
        <Allergenes />
        <Avis />
        <Infos />
        <FaqSection />
      </main>
      {nb > 0 && barre && (
        <a
          href="#commande"
          className="btn btn-ketchup fixed inset-x-4 bottom-4 z-50 justify-between md:left-auto md:right-6 md:w-80"
          aria-label={`Voir ma commande : ${nb} article${nb > 1 ? 's' : ''}, ${formatEuros(total)}`}
        >
          <span>🍔 Ma commande · {nb}</span>
          <span className="tabular-nums">{formatEuros(total)}</span>
        </a>
      )}
      <footer className="border-t-[3px] border-encre bg-encre px-5 py-12 text-creme md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <div>
              <p className="font-display text-3xl text-moutarde">{snack.nom}</p>
              <p className="text-sm text-creme/60">{snack.adresse}</p>
            </div>
          </div>
          <nav aria-label="Pied de page" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-creme/70">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-moutarde">
                {n.label}
              </a>
            ))}
            <a href={`tel:${snack.telephoneLien}`} className="hover:text-moutarde">
              {snack.telephone}
            </a>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-xs text-creme/40">
          © {new Date().getFullYear()} {snack.nom} · {snack.mention}
        </p>
      </footer>
      <DemoFooter demo="snack" theme={{ bg: '#e63b2e', fg: '#ffffff', accent: '#ffc93c', accentFg: '#1a1714' }} fontClass="font-display" />
    </>
  );
}
