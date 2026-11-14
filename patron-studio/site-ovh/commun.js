/* Patrôn Studio — éléments communs à toutes les pages.
 * Bouton « Demander mon site » toujours visible (même pendant l'intro et les animations),
 * sauf sur les pages de contact où il ferait doublon. */
(function () {
  'use strict';
  var page = location.pathname.split('/').pop() || 'index.html';
  if (/^(contact|merci|admin|espace-client)\.html$/.test(page)) return;
  function poser() {
    if (document.getElementById('ps-cta')) return;
    var a = document.createElement('a');
    a.id = 'ps-cta';
    a.className = 'ps-cta';
    a.href = './contact.html?sujet=devis';
    a.setAttribute('data-track', 'cta_flottant');
    a.innerHTML = '<span>Demander mon site</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    document.body.appendChild(a);
  }
  if (document.body) poser(); else document.addEventListener('DOMContentLoaded', poser);
})();
