/* Patrôn Studio — envoi des demandes et des maquettes via Web3Forms (POST https://api.web3forms.com/submit).
   - Une seule fenêtre d’envoi pour tout le site : boutons « Nous écrire », maquettes, flyers, estimation, partenaires.
   - Le résumé complet du brouillon (générateur ou atelier) est joint au message.
   - Réussite affichée UNIQUEMENT si Web3Forms répond { success: true }. Sinon : erreur honnête + lien mailto de secours.
   - Sans JavaScript, les liens mènent à contact.html, dont le formulaire HTML envoie directement à Web3Forms. */
(function () {
  'use strict';
  var cfg = window.PATRON_EXPORT_CONFIG || {};
  var ENDPOINT = 'https://api.web3forms.com/submit';
  var KEY = cfg.web3formsKey || '';
  var MAIL = cfg.contactEmail || 'admin.ps@xn--patrn-studio-hib.fr';
  var SUBJECT = 'Nouvelle demande Patrôn Studio';
  var TOPICS = {
    contact: { subject: SUBJECT, title: 'Écrire au studio', intro: 'Une question, un projet ? Laissez-nous un moyen de vous recontacter.' },
    question: { subject: SUBJECT + ' — question', title: 'Une question ?', intro: 'Posez-la ici, nous vous répondons rapidement.' },
    maquette: { subject: SUBJECT + ' — maquette', title: 'Envoyer votre maquette au studio', intro: 'Votre maquette part avec toutes vos réponses. Laissez-nous un moyen de vous recontacter.' },
    partenaire: { subject: SUBJECT + ' — candidature partenaire', title: 'Devenir partenaire', intro: '' }
  };

  /* Résumé du brouillon (générateur ou atelier) ajouté aux e-mails « Nous écrire ». */
  var L = {
    industry: { restaurant: 'Restaurant & café', beaute: 'Beauté & bien-être', artisan: 'Artisan & services', commerce: 'Boutique & créateur', conseil: 'Freelance & conseil', autre: 'Autre activité' },
    goals: { contacts: 'Recevoir des demandes', reservation: 'Prendre des rendez-vous', vente: 'Vendre en ligne', visibilite: 'Faire connaître mon activité' },
    style: { editorial: 'L’expression', minimal: 'L’essentiel', audacieux: 'L’impact', naturel: 'Naturel', classique: 'Classique' },
    sections: { services: 'Nos services', apropos: 'Notre histoire', galerie: 'Nos réalisations', tarifs: 'Nos offres', faq: 'Vos questions', contact: 'Contact' },
    extras: { logo: ['Identité & logo', 190], textes: ['Rédaction des textes', 150], seo: ['SEO local de départ', 190], google: ['Accompagnement Google Business', 90], photos: ['Sélection de photos sous licence', 90] },
    plan: { express: ['Site vitrine seul', 0], surmesure: ['Site + Abonnement 30 € / mois', 30], complet: ['Site + Abonnement 40 € / mois', 40] },
    timeline: { flexible: 'Je prends le temps', mois: 'Dans un mois', vite: 'Dès que possible' },
    brief: { audience: 'Public visé', offer: 'Prestations ou produits', difference: 'Ce qui me distingue', phone: 'Téléphone', email: 'E-mail', website: 'Site ou lien', address: 'Adresse ou zone', hours: 'Horaires', budget: 'Budget', deadline: 'Date souhaitée', references: 'Références appréciées', constraints: 'Contraintes et fonctions', contents: 'Contenus disponibles' }
  };
  function readDraft() {
    var best = null;
    ['patron-generator-v1', 'patron-atelier-v1'].forEach(function (k) {
      try { var d = JSON.parse(localStorage.getItem('export:' + k) || 'null'); if (d && d.answers && Date.now() - d.at < 7 * 864e5 && (!best || d.at > best.at)) best = d; } catch (e) {}
    });
    return best && best.answers;
  }
  function list(ids, map) { return (ids || []).map(function (id) { var v = map[id]; return Array.isArray(v) ? v[0] : (v || id); }).join(', '); }
  window.PATRON_BRIEF_SUMMARY = function () {
    var a = readDraft(); if (!a || !a.business) return '';
    var goals = Array.isArray(a.goals) && a.goals.length ? a.goals : (a.goal ? [a.goal] : []);
    var plan = L.plan[a.plan] || L.plan.express, extras = (a.extras || []).filter(function (x) { return L.extras[x]; });
    var total = 80 + extras.reduce(function (s, x) { return s + L.extras[x][1]; }, 0);
    var lines = ['— Mon brouillon de projet —', 'Projet : ' + a.business];
    if (a.industry) lines.push('Activité : ' + (L.industry[a.industry] || a.industry));
    if (a.city) lines.push('Ville : ' + a.city);
    if (goals.length) lines.push('Objectifs : ' + list(goals, L.goals));
    if (a.style) lines.push('Style : ' + (L.style[a.style] || a.style));
    if (a.sections && a.sections.length) lines.push('Sections souhaitées : ' + list(a.sections, L.sections));
    if (extras.length) lines.push('Options : ' + list(extras, L.extras));
    lines.push('Formule : ' + plan[0]);
    if (a.timeline) lines.push('Lancement : ' + (L.timeline[a.timeline] || a.timeline));
    if (a.description) lines.push('Description : ' + String(a.description).slice(0, 400));
    var b = a.studio && a.studio.brief;
    if (b) Object.keys(L.brief).forEach(function (k) { if (b[k] && String(b[k]).trim()) lines.push(L.brief[k] + ' : ' + String(b[k]).trim().slice(0, 300)); });
    var est = 'Estimation indicative : ' + total + ' € de création' + (plan[1] ? ' + ' + plan[1] + ' € / mois' : '');
    if (goals.indexOf('vente') !== -1 || goals.indexOf('reservation') !== -1) est += ' (boutique ou réservation : sur devis)';
    lines.push(est);
    return lines.join('\n');
  };
  window.PatronForm = window.PatronForm || {};

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mailtoHref(subject, body) {
    return 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subject) + (body ? '&body=' + encodeURIComponent(body.slice(0, 1800)) : '');
  }
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function isPhone(v) { return (v.replace(/\D/g, '').length >= 8) && /^[+\d\s().-]+$/.test(v); }

  /* Envoi réel. Résout seulement si Web3Forms confirme { success: true } ; sinon rejette avec une erreur lisible. */
  function send(fields) {
    if (!KEY) return Promise.reject(new Error('la clé d’envoi n’est pas configurée'));
    if (!window.fetch) return Promise.reject(new Error('votre navigateur ne permet pas l’envoi'));
    var payload = { access_key: KEY, from_name: 'Site Patrôn Studio', subject: fields.subject || SUBJECT };
    Object.keys(fields).forEach(function (k) { if (k !== 'subject' && fields[k] != null && fields[k] !== '') payload[k] = fields[k]; });
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 20000);
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        clearTimeout(timer);
        if (res.ok && data && data.success === true) return data;
        throw new Error((data && data.message) ? data.message : 'le service d’envoi a répondu ' + res.status);
      });
    }, function (err) {
      clearTimeout(timer);
      throw new Error(err && err.name === 'AbortError' ? 'le service d’envoi ne répond pas' : 'connexion impossible au service d’envoi');
    });
  }

  function loadCss() {
    if (document.querySelector('link[data-ps-form]')) return;
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = './contact-form.css'; l.setAttribute('data-ps-form', '');
    document.head.appendChild(l);
  }

  function prefillContact() {
    var e = [].slice.call(document.querySelectorAll('main input[type=email]')).filter(function (i) { return i.value && isEmail(i.value.trim()); })[0];
    return e ? e.value.trim() : '';
  }

  /* Formulaire (fenêtre ou page contact.html). */
  function formHtml(t, withDraft, sum) {
    return '' +
      '<div class="psf-fields">' +
      '<label class="psf-field"><span>Votre nom *</span><input name="name" autocomplete="name" required maxlength="120"></label>' +
      '<label class="psf-field"><span>E-mail ou téléphone pour vous recontacter *</span><input name="contact" autocomplete="email" inputmode="email" required maxlength="160" placeholder="vous@exemple.fr ou 06 12 34 56 78"></label>' +
      '<label class="psf-field"><span>Votre message' + (withDraft ? ' (facultatif)' : ' *') + '</span><textarea name="message" rows="4" maxlength="3000"' + (withDraft ? '' : ' required') + ' placeholder="' + (withDraft ? 'Une précision, une question…' : 'Votre activité, votre projet, vos questions…') + '"></textarea></label>' +
      (withDraft ? '<label class="psf-check"><input type="checkbox" name="joindre" checked> <span>Joindre ma maquette (toutes mes réponses)</span></label>' +
        '<details class="psf-draft"><summary>Voir ce qui sera envoyé</summary><pre>' + esc(sum) + '</pre></details>' : '') +
      '<label class="psf-hp" aria-hidden="true">Ne pas cocher <input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off"></label>' +
      '</div>' +
      '<p class="psf-note">Vos coordonnées servent uniquement à vous répondre. <a href="./confidentialite.html">Confidentialité</a></p>' +
      '<p class="psf-status" role="status" aria-live="polite"></p>' +
      '<div class="psf-actions"><button type="submit" class="psf-submit">Envoyer au studio</button></div>';
  }

  function el(form, n) { return form.elements.namedItem(n); }
  function wire(form, topic, onDone) {
    var t = TOPICS[topic] || TOPICS.contact;
    var status = form.querySelector('.psf-status');
    var btn = form.querySelector('.psf-submit');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = el(form, 'name').value.trim(), contact = el(form, 'contact').value.trim(), msg = el(form, 'message').value.trim();
      var joindre = el(form, 'joindre') ? el(form, 'joindre').checked : false;
      var sum = joindre && window.PATRON_BRIEF_SUMMARY ? window.PATRON_BRIEF_SUMMARY() : '';
      status.className = 'psf-status';
      if (!name) { status.textContent = 'Indiquez votre nom.'; el(form, 'name').focus(); return; }
      if (!isEmail(contact) && !isPhone(contact)) { status.textContent = 'Indiquez une adresse e-mail ou un numéro de téléphone valide.'; el(form, 'contact').focus(); return; }
      if (!msg && !sum) { status.textContent = 'Écrivez quelques mots, ou joignez votre maquette.'; el(form, 'message').focus(); return; }
      var business = '';
      try { business = (sum.match(/Projet : (.*)/) || [])[1] || ''; } catch (e) {}
      var subject = t.subject + (business ? ' « ' + business + ' »' : '');
      var body = (msg || '(pas de message)') + (sum ? '\n\n' + sum : '') + '\n\nPage : ' + location.href;
      var fields = { subject: subject, name: name, message: body, contact: contact, page: location.href };
      if (isEmail(contact)) fields.email = contact; else fields.phone = contact;
      if (el(form, 'botcheck') && el(form, 'botcheck').checked) fields.botcheck = true;
      btn.disabled = true; btn.textContent = 'Envoi en cours…';
      form.setAttribute('aria-busy', 'true');
      send(fields).then(function () {
        form.removeAttribute('aria-busy');
        form.classList.add('psf-sent');
        status.className = 'psf-status psf-ok';
        status.innerHTML = '<strong>Merci, votre demande est bien envoyée.</strong> Nous vous recontactons au ' + esc(contact) + ' très vite.';
        btn.textContent = 'Envoyé ✓';
        try { status.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {}
        if (onDone) onDone(true);
      }, function (err) {
        form.removeAttribute('aria-busy');
        btn.disabled = false; btn.textContent = 'Réessayer l’envoi';
        status.className = 'psf-status psf-err';
        status.innerHTML = '<strong>L’envoi n’a pas abouti</strong> (' + esc(err.message) + '). Rien n’a été transmis, vos réponses sont conservées. ' +
          'Vous pouvez réessayer, ou <a href="' + esc(mailtoHref(subject, body)) + '">nous écrire directement à ' + esc(MAIL.replace('xn--patrn-studio-hib.fr', 'patrônstudio.fr')) + '</a>.';
        try { status.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {}
        if (onDone) onDone(false);
      });
    });
  }

  function open(opts) {
    opts = opts || {};
    loadCss();
    var topic = TOPICS[opts.topic] ? opts.topic : 'contact';
    var t = TOPICS[topic];
    var sum = window.PATRON_BRIEF_SUMMARY ? window.PATRON_BRIEF_SUMMARY() : '';
    var withDraft = !!sum && topic !== 'partenaire';
    var old = document.getElementById('psf-dialog'); if (old) old.remove();
    var d = document.createElement('dialog');
    d.id = 'psf-dialog'; d.className = 'psf-dialog'; d.setAttribute('aria-labelledby', 'psf-title');
    d.innerHTML = '<form class="psf-form" novalidate>' +
      '<div class="psf-head"><p class="psf-kicker">Patrôn Studio</p><button type="button" class="psf-close" aria-label="Fermer">×</button></div>' +
      '<h2 id="psf-title">' + esc(opts.title || (withDraft ? TOPICS.maquette.title : t.title)) + '</h2>' +
      '<p class="psf-intro">' + esc(opts.intro || (withDraft ? TOPICS.maquette.intro : t.intro)) + '</p>' +
      formHtml(t, withDraft, sum) + '</form>';
    document.body.appendChild(d);
    var form = d.querySelector('form');
    var pre = prefillContact(); if (pre) el(form, 'contact').value = pre;
    wire(form, withDraft ? 'maquette' : topic);
    d.querySelector('.psf-close').addEventListener('click', function () { d.close(); });
    d.addEventListener('close', function () { d.remove(); });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    try { d.showModal(); } catch (e) { d.setAttribute('open', ''); }
    (el(form, 'name').value ? el(form, 'contact') : el(form, 'name')).focus();
    return d;
  }

  window.PatronForm.send = send;
  window.PatronForm.open = open;
  window.PatronForm.mailtoHref = mailtoHref;

  /* Liens « Nous écrire » : contact.html (sans JavaScript) -> fenêtre d’envoi (avec JavaScript). */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var url; try { url = new URL(a.getAttribute('href'), location.href); } catch (er) { return; }
    if (url.origin !== location.origin || !/\/contact\.html$/.test(url.pathname) || /\/contact\.html$/.test(location.pathname)) return;
    e.preventDefault();
    open({ topic: url.searchParams.get('sujet') || 'contact' });
  });

  /* Page contact.html : le formulaire HTML (qui marche sans JS) est amélioré en envoi sans rechargement. */
  function enhancePage() {
    var host = document.getElementById('psf-page');
    if (!host) return;
    var sum = window.PATRON_BRIEF_SUMMARY ? window.PATRON_BRIEF_SUMMARY() : '';
    var topic = new URLSearchParams(location.search).get('sujet') || 'contact';
    var withDraft = !!sum && topic !== 'partenaire';
    var form = document.createElement('form');
    form.className = 'psf-form psf-page'; form.noValidate = true;
    form.innerHTML = formHtml(TOPICS[topic] || TOPICS.contact, withDraft, sum);
    host.replaceWith(form);
    wire(form, withDraft ? 'maquette' : topic);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhancePage); else enhancePage();
})();
