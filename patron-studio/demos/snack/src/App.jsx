import { useCallback, useEffect, useState } from 'react';
import DemoFooter from '@demos/shared/components/DemoFooter.jsx';
import Loader from '@demos/shared/components/Loader.jsx';
import { useScrollRefresh } from '@demos/shared/hooks/useScrollRefresh.js';
import { formatEuros } from '@demos/shared/lib/validation.js';
import Header, { Logo } from './components/Header';
import Hero from './components/Hero';
import Sequence from './components/Sequence';
import { Allergenes, Avis, Bandeau, Carte, Commande, FaqSection, Infos } from './components/Sections';
import { formule, navigation, produits, snack } from './data/site';

const Telephone = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

export default function App() {
  const [ready, setReady] = useState(false);
  const [quantites, setQuantites] = useState({});
  const [menus, setMenus] = useState(0);
  const [commandeVisible, setCommandeVisible] = useState(false);
  useScrollRefresh();
  useEffect(() => setReady(true), []);

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
  // la pastille « ma commande » (ordinateur) se cache quand la section commande est à l'écran
  useEffect(() => {
    const cible = document.getElementById('commande');
    if (!cible) return;
    const io = new IntersectionObserver(([e]) => setCommandeVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(cible);
    return () => io.disconnect();
  }, []);

  return (
    <div className="grain">
      <Loader
        ready={ready}
        name="Crunch!"
        tagline="La plancha chauffe…"
        fontClass="titre"
        colors={{ bg: '#0d0b0a', fg: '#f3ece2', accent: '#ff6b1a' }}
        mark={<span className="block h-3 w-3 animate-pulse rounded-full bg-braise shadow-[0_0_30px_8px_rgb(255_107_26/0.6)]" />}
        maxMs={3000}
      />
      <Header />
      <main>
        {/* l'intro a son propre écran de chargement (néon et progression) : le chargeur général s'efface tout de suite */}
        <Sequence />
        <Hero ajouter={ajouter} />
        <Bandeau />
        <Carte ajouter={ajouter} quantites={quantites} />
        <Commande lignes={lignes} setQte={setQte} menus={menus} setMenus={setMenus} vider={vider} />
        <Allergenes />
        <Avis />
        <Infos />
        <FaqSection />
      </main>

      {/* Mobile : appel et commande toujours à portée de pouce */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-trait bg-nuit/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
        <div className="flex gap-3">
          <a
            href={`tel:${snack.telephoneLien}`}
            className="btn btn-ligne !min-h-12 shrink-0 !px-4"
            aria-label={`Appeler Crunch! au ${snack.telephone}`}
          >
            <Telephone /> <span className="max-[359px]:sr-only">Appeler</span>
          </a>
          <a
            href="#commande"
            className="btn btn-braise !min-h-12 min-w-0 flex-1 justify-between"
            aria-label={nb ? `Commander : ${nb} article${nb > 1 ? 's' : ''}, ${formatEuros(total)}` : 'Commander'}
          >
            <span>{nb ? `Commander · ${nb}` : 'Commander'}</span>
            <span className="tabular-nums">{nb ? formatEuros(total) : '→'}</span>
          </a>
        </div>
      </div>
      {/* Ordinateur : pastille de commande quand le panier n'est pas vide */}
      {nb > 0 && !commandeVisible && (
        <a href="#commande" className="btn btn-braise fixed bottom-6 right-6 z-50 hidden w-80 justify-between md:flex">
          <span>Ma commande · {nb}</span>
          <span className="tabular-nums">{formatEuros(total)}</span>
        </a>
      )}

      <footer className="border-t border-trait bg-nuit px-5 py-12 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <Logo className="!text-3xl" />
            <p className="mt-2 text-base text-sable">{snack.adresse}</p>
          </div>
          <nav aria-label="Pied de page" className="flex flex-wrap gap-x-6 gap-y-2 text-base text-sable">
            {navigation.map((n) => (
              <a key={n.href} href={n.href} className="inline-flex min-h-11 items-center hover:text-creme">
                {n.label}
              </a>
            ))}
            <a href={`tel:${snack.telephoneLien}`} className="inline-flex min-h-11 items-center hover:text-creme">
              {snack.telephone}
            </a>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-[13px] text-sable/60">
          © {new Date().getFullYear()} {snack.nom} · {snack.mention} · Photos : Unsplash
        </p>
      </footer>
      <DemoFooter demo="snack" theme={{ bg: '#161311', fg: '#f3ece2', accent: '#ff6b1a', accentFg: '#170a03' }} fontClass="titre" />
      {/* espace sous le bas de page pour que la barre mobile ne cache rien */}
      <div className="h-20 bg-nuit md:hidden" aria-hidden="true" />
    </div>
  );
}
