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

  // Mesure d'audience : Matomo sans cookie (voir mesure.js). Les clics importants deviennent des événements.
  function track(event, origin = '') {
    window.PatronMesure?.evenement(event, origin);
  }
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
