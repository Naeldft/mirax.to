/* Patrôn Studio — transition « carte → plein écran → démo » (page d'accueil).
 *
 * Au clic sur une carte de démo (ou sur « Voir la démo » sous la maquette), la capture de la démo
 * grandit depuis la carte jusqu'à remplir l'écran, puis la démo s'ouvre. La démo démarre sur la même
 * capture plein écran et la fait disparaître en fondu quand elle est prête (petit script en tête de
 * chaque démo, clé « ps-arrivee »). Résultat : un seul mouvement, sans écran blanc.
 *
 * Respecte « réduire les animations » (navigation normale), les clics avec Ctrl/Cmd/Maj
 * (nouvel onglet) et le bouton Retour (rien ne reste affiché).
 */
(function () {
  'use strict';
  var reduit = matchMedia('(prefers-reduced-motion: reduce)');
  var CLE = 'ps-arrivee';

  function idDemo(href) {
    var m = /\/demos\/([a-z-]+)\/?$/.exec(new URL(href, location.href).pathname);
    return m && m[1];
  }
  function nettoyer() {
    var v = document.getElementById('ps-transition');
    if (v) v.remove();
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.futur-card, #trade-link');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;
    var id = idDemo(a.href);
    if (!id) return;
    var portrait = innerWidth / innerHeight < 1;
    try { sessionStorage.setItem(CLE, id + '|' + (portrait ? 'mobile' : 'ordi')); } catch (err) { /* sans stockage : la démo s'ouvre normalement */ }
    if (reduit.matches) return; // navigation normale, sans animation

    // image de départ : la capture de la carte, ou l'écran de la maquette (ordinateur ou téléphone)
    var depart = a.classList.contains('futur-card')
      ? a.querySelector('.futur-art img')
      : document.querySelector(portrait ? '.phone-screen .capture' : '.laptop-screen .capture');
    if (!depart || !document.body.animate) return;
    e.preventDefault();

    var r = depart.getBoundingClientRect();
    var rayon = getComputedStyle(depart).borderRadius || '14px';
    var cap = './assets/captures/' + id;
    // démo « vidéo au défilement » (Crunch!) : la carte montre la première image du film ; elle grandit et se pose
    // exactement sur cette image, que la démo affiche ensuite telle quelle (même cadrage centré, aucun fondu)
    var sequence = depart.getAttribute('data-sequence');
    var fond = document.createElement('div');
    fond.id = 'ps-transition';
    fond.setAttribute('aria-hidden', 'true');
    fond.innerHTML =
      '<div class="ps-tr-vignette"><img alt="" src="' + (depart.currentSrc || depart.src) + '"' + (sequence ? ' style="object-position:center"' : '') + '>' +
      (portrait && !sequence ? '<img alt="" class="ps-tr-mobile" src="' + cap + '-mobile.webp">' : '') + '</div>';
    document.body.appendChild(fond);
    var vignette = fond.firstChild;
    var debut = { top: r.top + 'px', left: r.left + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: rayon };
    var fin = { top: '0px', left: '0px', width: innerWidth + 'px', height: innerHeight + 'px', borderRadius: '0px' };
    Object.assign(vignette.style, debut);

    var aller = function () { if (!aller.fait) { aller.fait = true; location.href = a.href; } };
    var duree = 680;
    fond.animate([{ backgroundColor: 'rgba(0,0,0,0)' }, { backgroundColor: 'rgba(0,0,0,1)' }], { duration: duree * 0.6, fill: 'forwards' });
    var anim = vignette.animate([debut, fin], { duration: duree, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' });
    if (sequence) {
      // la carte était légèrement zoomée au survol : on part de ce zoom pour qu'il n'y ait aucun saut
      var zoom = new DOMMatrix(getComputedStyle(depart).transform === 'none' ? undefined : getComputedStyle(depart).transform).a || 1;
      vignette.firstChild.animate([{ transform: 'scale(' + zoom + ')' }, { transform: 'scale(1)' }], { duration: duree, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' });
    }
    // écran vertical : la capture mobile prend le relais pendant l'agrandissement (c'est elle que la démo affiche en arrivant)
    var mobile = fond.querySelector('.ps-tr-mobile');
    if (mobile) mobile.animate([{ opacity: 0 }, { opacity: 0, offset: 0.35 }, { opacity: 1 }], { duration: duree, fill: 'forwards' });
    anim.onfinish = aller;
    setTimeout(aller, duree + 400); // sécurité
  });

  // bouton Retour : la page revient depuis le cache, la vignette ne doit pas rester
  addEventListener('pageshow', nettoyer);

  // préchargement de la démo au survol ou au premier toucher (elle s'ouvre plus vite)
  var faits = {};
  var gardees = [];
  function precharger(e) {
    var a = e.target.closest && e.target.closest('a.futur-card, #trade-link');
    if (!a || faits[a.href]) return;
    faits[a.href] = true;
    var l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = a.href;
    document.head.appendChild(l);
    // Crunch! : l'entrée (la façade, l'intérieur juste après la porte) puis le début du film se chargent tout de suite
    var img = a.querySelector('img[data-sequence]');
    if (img) {
      var dossier = innerWidth / innerHeight < 1 || innerWidth < 768 ? 'mobile' : 'ordi';
      var base = new URL('./demos/' + img.getAttribute('data-sequence') + '/sequence/' + dossier + '/', location.href).href;
      var liste = [1, 97];
      for (var i = 98; i <= 150; i += 2) liste.push(i);
      liste.forEach(function (n) {
        var im = new Image();
        im.src = base + String(n).padStart(3, '0') + '.webp';
        gardees.push(im);
      });
    }
  }
  document.addEventListener('pointerover', precharger, { passive: true });
  document.addEventListener('touchstart', precharger, { passive: true });
})();
