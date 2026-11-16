import { Suspense, useEffect, useState } from 'react';

/* ------------------------------------------------------------------
   Chargement en deux temps des scènes 3D : d'abord l'essentiel (la pièce, le sujet principal), puis les détails
   (meubles, plantes, objets de décor) une fois la scène affichée. Sur téléphone en 4G, le premier affichage
   ne télécharge que ce qui compte ; le reste arrive juste après, sans bloquer.
   - signalerScenePrete() : appelé par la scène quand l'essentiel est prêt.
   - <Differe> : ses enfants ne sont montés (donc téléchargés) qu'après ce signal.
------------------------------------------------------------------- */

let prete = false;
const enAttente = new Set();

export function signalerScenePrete() {
  if (prete) return;
  prete = true;
  if (typeof performance !== 'undefined') performance.mark('scene-prete');
  // un court délai : le premier rendu de la scène passe avant les téléchargements de détail
  setTimeout(() => enAttente.forEach((f) => f()), 250);
}

export default function Differe({ children }) {
  const [ok, setOk] = useState(prete);
  useEffect(() => {
    if (ok) return;
    const f = () => setOk(true);
    enAttente.add(f);
    return () => enAttente.delete(f);
  }, [ok]);
  return ok ? <Suspense fallback={null}>{children}</Suspense> : null;
}
