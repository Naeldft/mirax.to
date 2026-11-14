/**
 * Menu « Vue d'ensemble » de l'accueil.
 * Un bouton dans l'en-tête ouvre une fenêtre (dialog natif : focus gardé, touche Échap) qui liste
 * toutes les sections de la page. Avec la 3D, la page s'efface et la caméra prend de la hauteur
 * pour montrer l'enfilade des portails ; la section survolée s'illumine.
 * Sans 3D (animations réduites, appareil modeste), c'est un simple menu de navigation.
 */
import { defilement } from './defilement.js';

const ICONE =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="8" height="6" rx="1.5"/><rect x="13" y="5" width="8" height="6" rx="1.5"/><rect x="3" y="13" width="8" height="6" rx="1.5"/><rect x="13" y="13" width="8" height="6" rx="1.5"/></svg>';

export function installerMenu() {
  const options = document.querySelector('.header-options');
  const sections = [...document.querySelectorAll('main [data-station]')];
  if (!options || sections.length < 2) return;
  const racine = document.documentElement;
  const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const bouton = document.createElement('button');
  bouton.type = 'button';
  bouton.className = 'ps-ensemble-bouton';
  bouton.setAttribute('aria-haspopup', 'dialog');
  bouton.innerHTML = `${ICONE}<span>Vue d’ensemble</span>`;
  options.prepend(bouton);

  const d = document.createElement('dialog');
  d.className = 'ps-ensemble';
  d.setAttribute('aria-labelledby', 'ps-ensemble-titre');
  d.innerHTML =
    '<div class="ps-ensemble-tete"><p id="ps-ensemble-titre">Vue d’ensemble</p>' +
    '<button type="button" class="ps-ensemble-fermer" aria-label="Fermer la vue d’ensemble">' +
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
    '<ol class="ps-ensemble-liste"></ol>';
  document.body.appendChild(d);
  const liste = d.querySelector('ol');

  function remplir() {
    // titres lus dans la page au moment de l'ouverture : ils suivent la langue choisie
    liste.innerHTML = '';
    const actuelle = Math.round(defilement.station);
    sections.forEach((s, i) => {
      const h = s.querySelector('h1, h2');
      // innerText garde les retours à la ligne (<br>) : ils deviennent des espaces
      const titre = ((h && (h.innerText || h.textContent)) || '').replace(/\s+/g, ' ').trim();
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ps-ensemble-carte';
      if (i === actuelle) b.setAttribute('aria-current', 'true');
      b.innerHTML = `<span class="ps-ensemble-num">${String(i + 1).padStart(2, '0')}</span><strong></strong><span class="ps-ensemble-sous"></span>`;
      b.querySelector('strong').textContent = s.dataset.station;
      b.querySelector('.ps-ensemble-sous').textContent = titre;
      const survol = () => (defilement.survol = i);
      b.addEventListener('pointerenter', survol);
      b.addEventListener('focus', survol);
      b.addEventListener('click', () => aller(s));
      li.appendChild(b);
      liste.appendChild(li);
    });
  }

  function ouvrir() {
    remplir();
    defilement.ensemble = true;
    racine.classList.add('ps-ensemble-ouvert');
    d.showModal();
    (liste.querySelector('[aria-current]') || liste.querySelector('button'))?.focus();
  }
  function fermer() {
    if (d.open) d.close();
  }
  let destination = null;
  function aller(section) {
    destination = section;
    fermer();
    section.scrollIntoView({ behavior: reduit ? 'auto' : 'smooth', block: 'start' });
  }
  d.addEventListener('close', () => {
    defilement.ensemble = false;
    defilement.survol = -1;
    racine.classList.remove('ps-ensemble-ouvert');
    // focus clavier : sur le titre de la section choisie, sinon retour au bouton
    const titre = destination?.querySelector('h1, h2');
    destination = null;
    if (titre) {
      titre.setAttribute('tabindex', '-1');
      titre.focus({ preventScroll: true });
    } else bouton.focus({ preventScroll: true });
  });
  // clic en dehors des cartes (sur la vue 3D) : on referme
  d.addEventListener('click', (e) => {
    if (e.target === d) fermer();
  });
  d.querySelector('.ps-ensemble-fermer').addEventListener('click', fermer);
  bouton.addEventListener('click', ouvrir);
}
