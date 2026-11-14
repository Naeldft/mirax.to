/**
 * Point d'entrée du moteur 3D de l'accueil Patrôn Studio.
 * Le contenu reste du HTML normal (lisible par Google et sans JavaScript) ;
 * ce module ajoute derrière lui « l'espace » 3D, seulement si l'appareil le permet.
 */
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';

const hote = document.getElementById('ps-monde');
const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
const tier = getDeviceTier();

function demarrer() {
  if (!hote || tier === 'none') return;
  // three.js (lourd) n'est téléchargé qu'ici, après l'affichage de la page
  import('./Monde.jsx').then(({ monter }) => monter(hote, { tier, reduit }));
}

if (hote) {
  document.documentElement.classList.add('ps-3d');
  if ('requestIdleCallback' in window) requestIdleCallback(demarrer, { timeout: 1500 });
  else setTimeout(demarrer, 400);
}
