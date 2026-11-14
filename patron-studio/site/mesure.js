/* Patrôn Studio — mesure d'audience avec Matomo, SANS COOKIE (conforme RGPD, exemption CNIL).
 *
 * Réglages dans export-config.js :
 *   matomoUrl    : adresse de votre Matomo, avec « / » à la fin (ex. "https://xn--patrn-studio-hib.fr/matomo/").
 *                  Vide = aucune mesure (rien n'est chargé).
 *   matomoSiteId : numéro du site dans Matomo (en général "1").
 *
 * Configuration pour l'exemption de consentement de la CNIL :
 *   - aucun cookie (disableCookies), pas de mesure entre sites, pas de profil publicitaire ;
 *   - adresses IP anonymisées côté Matomo (2 octets, à régler dans Matomo, voir README) ;
 *   - le visiteur peut refuser la mesure à tout moment (« Mesure d'audience » en bas de page
 *     ou sur la page Confidentialité) : son choix est gardé dans son navigateur, rien n'est envoyé.
 * Pas de bandeau cookies : ce site n'en dépose aucun.
 */
(function () {
  'use strict';
  var cfg = window.PATRON_EXPORT_CONFIG || {};
  var url = typeof cfg.matomoUrl === 'string' ? cfg.matomoUrl.trim() : '';
  var site = String(cfg.matomoSiteId || '1');
  var CLE = 'patron-mesure';
  var refus = false;
  try { refus = localStorage.getItem(CLE) === 'non'; } catch (e) {}
  var actif = !!url && /^https:\/\//.test(url) && !refus;

  var _paq = (window._paq = window._paq || []);
  if (actif) {
    if (url.slice(-1) !== '/') url += '/';
    _paq.push(['disableCookies']);
    _paq.push(['setDoNotTrack', true]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    _paq.push(['setTrackerUrl', url + 'matomo.php']);
    _paq.push(['setSiteId', site]);
    var s = document.createElement('script');
    s.async = true;
    s.src = url + 'matomo.js';
    document.head.appendChild(s);
  }

  /* Fenêtre « Mesure d'audience » : information + case pour refuser. */
  function fenetre() {
    var d = document.getElementById('ps-mesure');
    if (d) return d;
    d = document.createElement('dialog');
    d.id = 'ps-mesure';
    d.className = 'ps-mesure';
    d.setAttribute('aria-labelledby', 'ps-mesure-titre');
    d.innerHTML =
      '<form method="dialog">' +
      '<h2 id="ps-mesure-titre">Mesure d’audience</h2>' +
      '<p>Ce site ne dépose <strong>aucun cookie</strong>. Pour savoir quelles pages sont utiles, nous comptons les visites avec ' +
      '<strong>Matomo</strong>, installé sur notre propre hébergement : adresses IP anonymisées, aucune donnée partagée ni revendue.</p>' +
      '<label class="ps-mesure-choix"><input type="checkbox" id="ps-mesure-ok"> Je participe à la mesure d’audience anonyme</label>' +
      '<p class="ps-mesure-etat" aria-live="polite"></p>' +
      '<div class="ps-mesure-actions"><button value="ok" class="ps-mesure-bouton">Enregistrer</button>' +
      '<a href="./confidentialite.html">Politique de confidentialité</a></div>' +
      '</form>';
    document.body.appendChild(d);
    var box = d.querySelector('#ps-mesure-ok');
    d.addEventListener('close', function () {
      var non = !box.checked;
      try { localStorage.setItem(CLE, non ? 'non' : 'oui'); } catch (e) {}
      if (non && actif) _paq.push(['optUserOut']);
      refus = non;
    });
    return d;
  }
  function ouvrir() {
    var d = fenetre();
    d.querySelector('#ps-mesure-ok').checked = !refus;
    d.querySelector('.ps-mesure-etat').textContent = url ? '' : 'La mesure d’audience n’est pas encore activée sur ce site.';
    if (d.showModal) d.showModal(); else d.setAttribute('open', '');
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-cookies], a[href$="#mesure-audience"]');
    if (!b) return;
    e.preventDefault();
    ouvrir();
  });
  /* boutons « Cookies » déjà présents dans les pieds de page : renommés et rendus visibles */
  function boutons() {
    document.querySelectorAll('[data-cookies]').forEach(function (b) {
      b.hidden = false;
      b.textContent = 'Mesure d’audience';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boutons); else boutons();

  window.PatronMesure = {
    evenement: function (nom, detail) {
      if (actif) _paq.push(['trackEvent', 'Interaction', String(nom), String(detail || '')]);
    },
    ouvrir: ouvrir,
  };
})();
