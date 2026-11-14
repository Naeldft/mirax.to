/**
 * Point d'entrée du moteur 3D de l'accueil Patrôn Studio.
 * Le contenu reste du HTML normal (lisible par Google et sans JavaScript) ;
 * ce module ajoute derrière lui « l'espace » 3D, seulement si l'appareil le permet.
 */
import { getDeviceTier } from '@demos/shared/hooks/useDeviceTier.js';
import { installerMenu } from './menu.js';

const hote = document.getElementById('ps-monde');
const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
const tier = getDeviceTier();

let lance = false;
function demarrer() {
  if (lance) return;
  lance = true;
  if (!hote || tier === 'none') return;
  // three.js (lourd) n'est téléchargé qu'ici, après l'affichage de la page
  import('./Monde.jsx').then(({ monter }) => monter(hote, { tier, reduit }));
}

// menu « Vue d'ensemble » : présent même sans 3D (simple menu de navigation)
installerMenu();

if (hote) {
  document.documentElement.classList.add('ps-3d');
  const plusTard = () => ('requestIdleCallback' in window ? requestIdleCallback(demarrer, { timeout: 1500 }) : setTimeout(demarrer, 400));
  // pendant l'intro tunnel, on ne fait pas tourner deux scènes 3D en même temps
  if (document.documentElement.classList.contains('ps-tunnel')) {
    addEventListener('ps-tunnel-fin', plusTard, { once: true });
    setTimeout(plusTard, 7000); // sécurité si l'intro ne se termine pas normalement
  } else plusTard();
}
