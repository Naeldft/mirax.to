/* Patrôn Studio — version statique (hébergement sans serveur).
   Les appels /api/ qui demandaient le serveur du studio sont interceptés :
   aucune erreur technique, une invitation à écrire au studio à la place. */
(function () {
  var cfg = window.PATRON_EXPORT_CONFIG || {};
  var nativeFetch = window.fetch.bind(window);
  var MAIL = 'admin.ps@xn--patrn-studio-hib.fr';
  var MESSAGE = 'Cette fonction passe par le formulaire d’envoi au studio : votre brouillon reste enregistré sur cet appareil.';
  var lastDialog = 0;

  function mailto(subject) {
    return 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subject || 'Mon projet de site — Patrôn Studio');
  }

  function userAsked() {
    try { return !navigator.userActivation || navigator.userActivation.isActive; } catch (e) { return false; }
  }

  function showDialog() {
    if (!document.body || Date.now() - lastDialog < 4000) return;
    lastDialog = Date.now();
    var old = document.getElementById('ps-offline-dialog');
    if (old) old.remove();
    var d = document.createElement('dialog');
    d.id = 'ps-offline-dialog';
    d.className = 'ps-offline-dialog';
    d.setAttribute('aria-labelledby', 'ps-offline-title');
    d.innerHTML =
      '<p class="ps-offline-kicker">Patrôn Studio</p>' +
      '<h2 id="ps-offline-title">On en parle par e-mail ?</h2>' +
      '<p>L’envoi en ligne, la sauvegarde distante et les PDF du studio ne sont pas actifs sur ce site. Votre brouillon reste sur cet appareil.</p>' +
      '<div class="ps-offline-actions"><a class="ps-offline-primary" href="' + mailto() + '">Nous écrire</a>' +
      '<button type="button" class="ps-offline-close">Continuer ma visite</button></div>';
    document.body.appendChild(d);
    d.querySelector('.ps-offline-close').addEventListener('click', function () { d.close(); });
    d.addEventListener('close', function () { d.remove(); });
    try { d.showModal(); } catch (e) { d.setAttribute('open', ''); }
    var first = d.querySelector('.ps-offline-primary');
    if (first) first.focus();
  }

  /* Le résumé du brouillon et le formulaire d’envoi sont dans contact-form.js (window.PatronForm). */
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (!link || /[?&]body=/.test(link.getAttribute('href'))) return;
    var sum = window.PATRON_BRIEF_SUMMARY ? window.PATRON_BRIEF_SUMMARY() : ''; if (!sum) return;
    var href = link.getAttribute('href');
    link.setAttribute('href', href + (href.indexOf('?') === -1 ? '?' : '&') + 'body=' + encodeURIComponent('Bonjour,\n\n\n\n' + sum));
  }, true);

  // Action qui demandait le serveur : on propose l’envoi réel au studio (Web3Forms) avec tout le brouillon.
  function offerSend(key) {
    if (Date.now() - lastDialog < 4000) return;
    lastDialog = Date.now();
    if (!window.PatronForm) { lastDialog = 0; showDialog(); return; }
    var pdf = /pdf|export|asset|upload|image/.test(key || '');
    window.PatronForm.open({
      title: pdf ? 'Le studio prépare votre fichier' : 'Envoyer votre maquette au studio',
      intro: pdf
        ? 'Le PDF et les images sont préparés par le studio. Envoyez-nous votre projet : nous vous répondons avec vos fichiers.'
        : 'Laissez-nous vos coordonnées : votre maquette part avec toutes vos réponses, et nous vous recontactons.',
      topic: 'maquette',
    });
  }

  window.fetch = function (input, init) {
    var value = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    var p = value;
    try { if (!value.startsWith('/')) { var u = new URL(value, location.href); if (u.origin === location.origin) p = u.pathname + u.search; } } catch (e) {}
    if (p.startsWith('/api/')) {
      if (cfg.apiBase) return nativeFetch(cfg.apiBase.replace(/\/$/, '') + '/' + p.slice(5), init);
      var key = p.slice(5).split('?')[0];
      if (key === 'config') return Promise.resolve(Response.json({ ai: false, images: false, email: false, payments: false, analytics: false }));
      if (key === 'events') return Promise.resolve(Response.json({ ok: true }));
      if (userAsked()) setTimeout(function () { offerSend(key); }, 0);
      return Promise.resolve(Response.json({ error: MESSAGE }, { status: 503 }));
    }
    if (typeof input === 'string' && input.startsWith('/assets/')) input = '.' + input;
    return nativeFetch(input, init);
  };
})();
