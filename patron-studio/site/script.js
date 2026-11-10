(() => {
  'use strict';
  document.body.classList.add('js');
  const $ = (q, scope = document) => scope.querySelector(q);
  const $$ = (q, scope = document) => [...scope.querySelectorAll(q)];
  const read = (storage, key) => { try { return JSON.parse(storage.getItem(key)); } catch { return null; } };
  const write = (storage, key, val) => { try { storage.setItem(key, JSON.stringify(val)); } catch {} };
  const remove = (storage, key) => { try { storage.removeItem(key); } catch {} };

  // A native navigation stays usable if scripts are unavailable.
  const menu = $('.menu-toggle'), navigation = $('#navigation');
  if (menu && navigation) {
    menu.hidden = false;
    const closeMenu = (focus = false) => {
      navigation.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
      menu.querySelector('span').textContent = '＋';
      if (focus) menu.focus();
    };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      navigation.classList.toggle('is-open', open);
      menu.setAttribute('aria-expanded', String(open));
      menu.querySelector('span').textContent = open ? '−' : '＋';
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true); });
    document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
    navigation.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
    window.matchMedia('(min-width:821px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
  }

  // Respect the OS preference; the footer can reduce movement further.
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let savedMotion = read(localStorage, 'patron-motion') === 'reduce';
  const reduced = () => motionQuery.matches || savedMotion;
  function syncMotion() {
    document.documentElement.dataset.motion = reduced() ? 'reduce' : 'full';
    $$('button[data-motion]').forEach(button => {
      button.hidden = false;
      button.textContent = motionQuery.matches ? 'Animations réduites (appareil)' : (savedMotion ? 'Activer les animations' : 'Réduire les animations');
      button.setAttribute('aria-pressed', String(reduced()));
    });
  }
  syncMotion();
  motionQuery.addEventListener('change', syncMotion);
  $$('button[data-motion]').forEach(button => button.addEventListener('click', () => {
    if (motionQuery.matches) return;
    savedMotion = !savedMotion; write(localStorage, 'patron-motion', savedMotion ? 'reduce' : 'full'); syncMotion();
  }));
  if ('IntersectionObserver' in window && !reduced()) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    $$('[data-reveal]').forEach(el => { el.classList.add('reveal-ready'); observer.observe(el); });
  }
  const art = $('[data-tilt]');
  if (art && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let raf = 0;
    const clear = () => { art.style.setProperty('--rx', '0deg'); art.style.setProperty('--ry', '0deg'); };
    art.addEventListener('pointermove', e => {
      if (reduced()) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const b = art.getBoundingClientRect();
        art.style.setProperty('--ry', ((e.clientX - b.left) / b.width * 12 - 6) + 'deg');
        art.style.setProperty('--rx', (6 - (e.clientY - b.top) / b.height * 12) + 'deg');
      });
    });
    art.addEventListener('pointerleave', clear);
  }
  $$('[data-device]').forEach(button => button.addEventListener('click', () => {
    $$('[data-device]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    $('[data-device-frame]')?.classList.toggle('is-mobile', button.dataset.device === 'mobile');
  }));

  // No analytics request until a configured provider AND explicit consent exist.
  const config = window.PATRON_CONFIG || {};
  const hasGA = /^G-[A-Z0-9]+$/.test(config.ga4Id || '');
  const hasClarity = /^[a-z0-9]{5,20}$/i.test(config.clarityId || '');
  const available = hasGA || hasClarity;
  const key = 'patron-consent-v1';
  const expiresAfter = 183 * 24 * 60 * 60 * 1000;
  let consent = read(localStorage, key);
  if (!consent || !Number.isFinite(consent.at) || Date.now() - consent.at > expiresAfter) consent = null;
  let gaLoaded = false, clarityLoaded = false;
  const contactPage = ['renseignements', 'merci'].includes(document.body.dataset.page);
  const banner = $('#cookie-banner'), dialog = $('#cookie-dialog');
  function removeMeasureCookies() {
    document.cookie.split(';').forEach(part => {
      const name = part.trim().split('=')[0];
      if (/^(_ga($|_)|_gid$|_gat|_clck$|_clsk$)/.test(name)) {
        document.cookie = name + '=; Max-Age=0; path=/';
        document.cookie = name + '=; Max-Age=0; path=/; domain=' + location.hostname;
      }
    });
  }
  function inject(src) { const script = document.createElement('script'); script.async = true; script.src = src; document.head.appendChild(script); }
  function initMeasure() {
    if (hasGA && consent?.analytics && !gaLoaded) {
      gaLoaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      window.gtag('js', new Date());
      window.gtag('config', config.ga4Id, {
        send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
        cookie_domain: location.hostname, cookie_expires: 15552000
      });
      inject('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.ga4Id));
      window.gtag('event', 'page_view', { page_location: location.origin + location.pathname, page_title: document.title });
      initVitals();
    }
    if (hasClarity && consent?.experience && !clarityLoaded && !contactPage) {
      clarityLoaded = true;
      window.clarity = window.clarity || function() { (window.clarity.q = window.clarity.q || []).push(arguments); };
      window.clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' });
      inject('https://www.clarity.ms/tag/' + encodeURIComponent(config.clarityId));
    }
  }
  function track(event, origin = '') {
    if (hasGA && consent?.analytics && window.gtag) {
      window.gtag('event', event, { page_path: location.pathname, cta_origin: origin, transport_type: 'beacon' });
    }
  }
  let vitalsStarted = false;
  function initVitals() {
    if (vitalsStarted || !hasGA || !consent?.analytics || !('PerformanceObserver' in window)) return;
    vitalsStarted = true;
    const metrics = { LCP: 0, CLS: 0, INP: 0 };
    const interactions = new Map();
    const observe = (type, callback, options = {}) => {
      try {
        const observer = new PerformanceObserver(list => callback(list.getEntries()));
        observer.observe({ type, buffered: true, ...options });
      } catch {}
    };
    observe('largest-contentful-paint', entries => {
      const last = entries.at(-1);
      if (last) metrics.LCP = last.startTime;
    });
    observe('layout-shift', entries => {
      entries.forEach(entry => { if (!entry.hadRecentInput) metrics.CLS += entry.value; });
    });
    observe('event', entries => {
      entries.forEach(entry => {
        if (!entry.interactionId) return;
        interactions.set(entry.interactionId, Math.max(interactions.get(entry.interactionId) || 0, entry.duration));
      });
      const values = [...interactions.values()].sort((a, b) => b - a);
      metrics.INP = values[Math.min(Math.floor(values.length / 50), 9)] || 0;
    }, { durationThreshold: 40 });
    let sent = false;
    const rating = (name, value) => {
      const limits = { LCP: [2500, 4000], INP: [200, 500], CLS: [.1, .25] }[name];
      return value <= limits[0] ? 'good' : value <= limits[1] ? 'needs_improvement' : 'poor';
    };
    const send = () => {
      if (sent || !window.gtag) return;
      sent = true;
      Object.entries(metrics).forEach(([name, value]) => {
        if (!value) return;
        window.gtag('event', 'web_vital', {
          metric_name: name,
          metric_value: name === 'CLS' ? Number(value.toFixed(4)) : Math.round(value),
          metric_rating: rating(name, value),
          page_path: location.pathname,
          non_interaction: true,
          transport_type: 'beacon'
        });
      });
    };
    addEventListener('pagehide', send, { once: true });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') send(); }, { once: true });
  }
  const stateText = available
    ? 'Les outils facultatifs restent désactivés tant que vous ne les avez pas acceptés. Vous pouvez retirer votre accord ici.'
    : 'Aucun outil de statistiques ni d’enregistrement de session n’est activé sur ce site. Seules vos préférences de fonctionnement sont conservées.';
  if ($('#analytics-state')) $('#analytics-state').textContent = stateText;
  if ($('#privacy-analytics-state')) $('#privacy-analytics-state').textContent = stateText;
  if ($('#analytics-option')) $('#analytics-option').hidden = !hasGA;
  if ($('#experience-option')) $('#experience-option').hidden = !hasClarity;
  $$('[data-cookies]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      $('#consent-analytics').checked = !!consent?.analytics;
      $('#consent-experience').checked = !!consent?.experience;
      dialog?.showModal();
    });
  });
  if (banner) banner.hidden = !available || !!consent;
  if (!consent) removeMeasureCookies();
  initMeasure();
  $$('[data-consent]').forEach(button => button.addEventListener('click', () => {
    const action = button.dataset.consent;
    const next = { at: Date.now(), analytics: hasGA && (action === 'accept' || (action === 'save' && $('#consent-analytics').checked)),
      experience: hasClarity && (action === 'accept' || (action === 'save' && $('#consent-experience').checked)) };
    const revoke = (gaLoaded && !next.analytics) || (clarityLoaded && !next.experience);
    consent = next; write(localStorage, key, consent);
    if (banner) banner.hidden = true;
    dialog?.close();
    if (revoke) {
      if (gaLoaded && !next.analytics) window['ga-disable-' + config.ga4Id] = true;
      if (clarityLoaded && !next.experience) window.clarity?.('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' });
      removeMeasureCookies();
      location.reload();
      return;
    }
    initMeasure();
  }));
  document.addEventListener('click', e => {
    const target = e.target.closest('[data-track]');
    if (target) track('cta_click', target.dataset.track);
  });

  const form = $('#project-form');
  if (form) {
    const steps = $$('fieldset[data-step]', form);
    const prevBtn = $('.previous-step', form), nextBtn = $('.next-step', form), sendBtn = $('.send-step', form);
    const sendHTML = sendBtn.innerHTML, status = $('.form-status', form), progress = $('.brief-progress', form);
    const DRAFT = 'patron-brief-draft-v4';
    let current = 0, submitting = false, started = false, disabledByUs = [], injected = [];
    form.classList.add('enhanced'); form.noValidate = true; progress.hidden = false;
    prevBtn.hidden = false; nextBtn.hidden = false;
    const val = name => { const r = form.querySelector('input[name="' + name + '"]:checked'); return r ? r.value : ''; };
    const params = new URLSearchParams(location.search);
    const presets = { vitrine: 'Un site vitrine', commerce: 'Une boutique en ligne', refonte: 'Une refonte' };

    // Brouillon conservé dans l'onglet (sessionStorage) tant que le brief n'est pas envoyé.
    const draft = read(sessionStorage, DRAFT);
    if (draft && draft.d && Date.now() - draft.at < 86400000) {
      Object.keys(draft.d).forEach(name => $$('[name="' + name + '"]', form).forEach(el => {
        if (el.type === 'radio' || el.type === 'checkbox') el.checked = draft.d[name].includes(el.value);
        else if (el.type !== 'file') el.value = draft.d[name][0] || '';
      }));
      current = Math.max(0, Math.min(draft.s || 0, steps.length - 1));
    }
    if (presets[params.get('projet')]) { const r = form.querySelector('input[name="Projet"][value="' + presets[params.get('projet')] + '"]'); if (r) r.checked = true; }
    if (params.get('intention') === 'appel') {
      $('[name="Intention"]', form).value = 'Demande de rappel';
      const ph = $('#phone').closest('.field'); ph.dataset.required = 'field'; ph.dataset.msg = 'Indiquez un numéro pour que nous puissions vous rappeler.';
      $('.optional', ph).textContent = '*';
      sendBtn.textContent = 'Demander un rappel';
    }
    const saveDraft = () => {
      const d = {}; new FormData(form).forEach((v, k) => { if (k[0] === '_' || k === 'Information_confidentialite' || v instanceof File) return; (d[k] = d[k] || []).push(v); });
      write(sessionStorage, DRAFT, { d, s: current, at: Date.now() });
    };
    const isActive = fs => fs.dataset.step === 'commerce' ? val('Projet') === 'Une boutique en ligne' || $$('input[name=Objectifs]:checked',form).some(i => i.value === 'Vendre en ligne') : fs.dataset.step !== 'existant' || val('Projet') === 'Une refonte' || (val('Situation') && !val('Situation').startsWith('Non'));
    const active = () => steps.filter(isActive);
    const syncConditional = () => { $$('[data-shop]', form).forEach(el => { el.hidden = val('Projet') !== 'Une boutique en ligne'; }); };

    function check(box) {
      const input = $('input:not([type=radio]), textarea', box);
      let msg = '';
      if (box.dataset.required === 'group') { if (!$('input:checked', box)) msg = box.dataset.msg; }
      else if (input.type === 'checkbox') { if (!input.checked) msg = box.dataset.msg; }
      else if (!input.value.trim()) msg = box.dataset.msg;
      if (!msg && input && input.type === 'email' && !input.validity.valid) msg = 'Vérifiez votre adresse e-mail, par exemple vous@entreprise.fr.';
      if (!msg && input && input.type === 'tel' && input.value.trim() && input.value.replace(/\D/g, '').length < 6) msg = 'Indiquez un numéro de téléphone complet.';
      const err = $('.field-error', box); if (err) err.textContent = msg;
      if (input) input.setAttribute('aria-invalid', String(!!msg));
      return !msg;
    }
    const requiredIn = fs => $$('[data-required]', fs);
    function validate(fs) {
      const bad = requiredIn(fs).filter(box => !check(box));
      // Les champs facultatifs contrôlés sans être obligatoires (e-mail, téléphone saisis)
      $$('input[type=tel], input[type=email]', fs).forEach(i => { const box = i.closest('.field'); if (!box.dataset.required && i.value.trim()) if (!check(box)) bad.push(box); });
      if (bad.length) { const t = $('input, textarea', bad[0]); (t || bad[0]).scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' }); if (t && t.type !== 'radio') t.focus({ preventScroll: true }); }
      return bad.length === 0;
    }
    function recap() {
      const box = $('#recap'); if (!box) return; box.textContent = '';
      const labels = {}; $$('[data-q]', form).forEach(q => { labels[q.dataset.q] = q.dataset.label; });
      const data = {}; new FormData(form).forEach((v, k) => { if (v && !(v instanceof File) && labels[k] && isActive(form.querySelector('[name="'+k+'"]').closest('fieldset'))) (data[k] = data[k] || []).push(v); });
      const keys = Object.keys(data);
      if (!keys.length) { box.textContent = 'Aucune réponse pour l’instant : vous pouvez tout de même envoyer votre brief.'; return; }
      keys.forEach(k => { const dt = document.createElement('dt'), dd = document.createElement('dd'); dt.textContent = labels[k]; dd.textContent = data[k].join(', '); box.append(dt, dd); });
    }
    const hasAnswer = fs => $$('input:checked', fs).length > 0 || $$('input:not([type=radio]):not([type=checkbox]), textarea', fs).some(i => i.value.trim());
    function render(scroll) {
      syncConditional();
      const list = active(), idx = Math.max(0, Math.min(list.indexOf(steps[current]), list.length - 1)), fs = list[idx];
      current = steps.indexOf(fs);
      steps.forEach(x => { x.hidden = x !== fs; });
      const last = idx === list.length - 1;
      form.classList.toggle('last-step', last);
      prevBtn.hidden = idx === 0;
      const optional = requiredIn(fs).length === 0 && !last;
      nextBtn.textContent = optional && !hasAnswer(fs) ? 'Passer cette étape' : 'Continuer';
      $('#step-count').textContent = 'Étape ' + (idx + 1) + ' sur ' + list.length;
      $('#step-title').textContent = fs.dataset.title;
      const mins = Math.max(1, Math.round((list.length - idx) * 0.5));
      $('#step-time').textContent = last ? 'Dernière étape' : '≈ ' + mins + ' min restantes';
      progress.style.setProperty('--p', Math.round(((idx + 1) / list.length) * 100) + '%');
      if (last) recap();
      if (scroll) { const lg = $('legend', fs); lg.tabIndex = -1; lg.focus({ preventScroll: true }); form.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' }); }
      saveDraft();
    }
    function go(delta) {
      const list = active(), idx = list.indexOf(steps[current]);
      if (delta > 0 && !validate(steps[current])) return;
      const next = list[idx + delta]; if (!next) return;
      current = steps.indexOf(next); render(true);
      if (delta > 0) track('form_step', next.dataset.step);
    }
    nextBtn.addEventListener('click', () => go(1));
    prevBtn.addEventListener('click', () => go(-1));
    form.addEventListener('focusin', () => { if (!started) { started = true; track('form_start', 'brief'); } });

    // Choix multiples : limite éventuelle et option exclusive (« Je ne sais pas », « Rien pour l'instant »).
    form.addEventListener('change', ev => {
      const t = ev.target, g = t.closest('[data-multi]');
      if (g && t.type === 'checkbox') {
        const hint = $('.max-hint', g);
        if (t.checked && t.hasAttribute('data-excl')) $$('input:checked', g).forEach(i => { if (i !== t) i.checked = false; });
        else if (t.checked) $$('input[data-excl]', g).forEach(i => { i.checked = false; });
        const max = +g.dataset.max || 0;
        if (max && $$('input:checked', g).length > max) { t.checked = false; hint.textContent = 'Vous pouvez en choisir ' + max + ' au maximum.'; setTimeout(() => { hint.textContent = ''; }, 3000); }
      }
      const box = t.closest('[data-required]'); if (box && box.querySelector('.field-error').textContent) check(box);
      if (t.name === 'Projet' && t.value === 'Une refonte' && !val('Situation')) { const r = form.querySelector('input[name="Situation"][value^="Oui, à refaire"]'); if (r) r.checked = true; }
      render(false);
    });
    form.addEventListener('input', () => { clearTimeout(form._t); form._t = setTimeout(saveDraft, 300); });
    $$('[data-required] input:not([type=radio]), [data-required] textarea', form).forEach(i => i.addEventListener('blur', () => { if (i.value.trim() || i.dataset.touched) { i.dataset.touched = '1'; check(i.closest('[data-required]')); } }));

    form.addEventListener('submit', event => {
      if (submitting) { event.preventDefault(); return; }
      const file = form.querySelector('input[type=file]');
      if (file?.files[0]?.size > 10 * 1024 * 1024) { event.preventDefault(); status.textContent = 'Le fichier dépasse 10 Mo. Choisissez un fichier plus léger.'; return; }
      const list = active();
      if (steps[current] !== list[list.length - 1]) { event.preventDefault(); go(1); return; }
      for (const fs of list) { if (!validate(fs)) { event.preventDefault(); current = steps.indexOf(fs); render(true); validate(fs); return; } }
      // Regroupe les choix multiples en un seul champ lisible et n'envoie que les réponses utiles.
      $$('[data-multi]', form).forEach(g => {
        const boxes = $$('input[type=checkbox]', g), picked = boxes.filter(b => b.checked).map(b => b.value);
        boxes.forEach(b => { b.disabled = true; disabledByUs.push(b); });
        // Previous steps are hidden only for presentation: their answers must still be sent.
        if (picked.length && isActive(g.closest('fieldset')) && !g.closest('[hidden]:not(fieldset)')) { const h = document.createElement('input'); h.type = 'hidden'; h.name = g.dataset.q; h.value = picked.join(', '); g.after(h); injected.push(h); }
      });
      steps.forEach(fs => $$('input:not([type=radio]):not([type=checkbox]):not([type=hidden]):not([type=file]), textarea', fs).forEach(i => { if (!i.value.trim() || !isActive(fs) || i.closest('[hidden]:not(fieldset)')) { i.disabled = true; disabledByUs.push(i); } }));
      $$('input[type=radio]', form).forEach(r => { if (!isActive(r.closest('fieldset')) || r.closest('[data-shop][hidden]')) { r.disabled = true; disabledByUs.push(r); } });
      submitting = true;
      write(sessionStorage, 'patron-form-pending', { at: Date.now() });
      sendBtn.disabled = true; sendBtn.textContent = 'Envoi en cours…';
      status.textContent = 'Envoi au service en cours. Terminez la vérification anti-spam si elle apparaît.';
      status.classList.add('is-sending');
      track('form_submit', 'brief');
      // L'envoi reste un POST natif : il conserve la livraison FormSubmit/CAPTCHA déjà activée.
    });
    window.addEventListener('pageshow', () => {
      submitting = false; sendBtn.disabled = false;
      sendBtn.innerHTML = params.get('intention') === 'appel' ? 'Demander un rappel' : sendHTML;
      disabledByUs.forEach(el => { el.disabled = false; }); disabledByUs = [];
      injected.forEach(el => el.remove()); injected = [];
      status.classList.remove('is-sending'); status.textContent = '';
    });
    const quick = $('#quick-quote', form), clear = $('#clear-draft', form);
    if (quick) { quick.hidden = false; quick.addEventListener('click', () => { const bad = active().slice(0,-1).find(fs => !validate(fs)); if (bad) { current = steps.indexOf(bad); render(true); validate(bad); return; } current = steps.length - 1; render(true); }); }
    if (clear) { clear.hidden = false; clear.addEventListener('click', () => { form.reset(); remove(sessionStorage,DRAFT); current=0; render(true); status.textContent = 'Votre brouillon a été effacé.'; }); }
    render(false);
  }
  if (document.body.dataset.page === 'merci') {
    const pending = read(sessionStorage, 'patron-form-pending');
    if (pending?.at && Date.now() - pending.at < 60 * 60 * 1000) track('form_confirmation', 'formsubmit_return');
    remove(sessionStorage, 'patron-form-pending');
    remove(sessionStorage, 'patron-brief-draft-v4');
  }
})();
// Decorative reaction never intercepts taps or exposes questionnaire values.
(() => {
  document.addEventListener('pointerdown', e => {
    if (e.button !== 0 || document.documentElement.dataset.motion === 'reduce' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dots = document.querySelectorAll('.tap-bloom'); if (dots.length > 5) dots[0].remove();
    const dot = document.createElement('span'); dot.className = 'tap-bloom'; dot.setAttribute('aria-hidden','true'); dot.style.left=e.clientX+'px'; dot.style.top=e.clientY+'px';document.body.append(dot); dot.addEventListener('animationend',()=>dot.remove(),{once:true});setTimeout(()=>dot.remove(),900);
  },{passive:true});
})();
