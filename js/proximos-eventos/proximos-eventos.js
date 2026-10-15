/* Panel "Próximos eventos" (partials/proximos-eventos).
   Sin dependencias (no usa las interacciones data-ix de Webflow). */
(function () {
  'use strict';

  var root = document.querySelector('[data-pe-root]');
  if (!root) return;

  var panel = root.querySelector('[data-pe-panel]');
  var openers = root.querySelectorAll('[data-pe-open]');
  var closers = root.querySelectorAll('[data-pe-close]');
  var filters = root.querySelectorAll('[data-pe-filter]');
  var items = root.querySelectorAll('[data-pe-item]');
  var empty = root.querySelector('[data-pe-empty]');
  var lastFocus = null;

  function open(e) {
    if (e) e.preventDefault();
    hideToast(false);
    lastFocus = document.activeElement;
    root.classList.add('is-open');
    document.documentElement.classList.add('pe-lock');
    panel.setAttribute('aria-hidden', 'false');
    openers.forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    var first = panel.querySelector('[data-pe-close], button, a');
    setTimeout(function () { if (first) first.focus(); }, 50);
  }

  function close(e) {
    if (e) e.preventDefault();
    root.classList.remove('is-open');
    document.documentElement.classList.remove('pe-lock');
    panel.setAttribute('aria-hidden', 'true');
    openers.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function applyFilter(value) {
    var visibles = 0;
    items.forEach(function (it) {
      var show = value === 'todos' ||
        (value === 'gratis' && it.getAttribute('data-gratis') === '1') ||
        it.getAttribute('data-modalidad') === value;
      it.hidden = !show;
      if (show) visibles++;
    });
    filters.forEach(function (f) {
      var active = f.getAttribute('data-pe-filter') === value;
      f.classList.toggle('is-active', active);
      f.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if (empty) empty.hidden = visibles !== 0;
  }

  openers.forEach(function (b) { b.addEventListener('click', open); });
  closers.forEach(function (b) { b.addEventListener('click', close); });
  filters.forEach(function (f) {
    f.addEventListener('click', function () { applyFilter(f.getAttribute('data-pe-filter')); });
  });

  document.addEventListener('keydown', function (e) {
    if (!root.classList.contains('is-open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'Tab') { // mantiene el foco dentro del panel
      var f = panel.querySelectorAll('a[href], button:not([disabled])');
      var vis = Array.prototype.filter.call(f, function (el) { return el.offsetParent !== null; });
      if (!vis.length) return;
      var a = vis[0], z = vis[vis.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });

  // ---------- Aviso inferior con el evento más cercano (solo desktop) ----------
  var toast = root.querySelector('[data-pe-toast]');
  var TOAST_KEY = 'pe_aviso_cerrado';

  function hideToast(remember) {
    if (!toast || toast.hidden) return;
    toast.classList.remove('is-visible');
    setTimeout(function () { toast.hidden = true; }, 250);
    if (remember) { try { sessionStorage.setItem(TOAST_KEY, '1'); } catch (err) {} }
  }

  if (toast) {
    var dismissed = false;
    try { dismissed = sessionStorage.getItem(TOAST_KEY) === '1'; } catch (err) {}
    var esDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!dismissed && esDesktop) {
      setTimeout(function () {
        if (root.classList.contains('is-open')) return;
        toast.hidden = false;
        requestAnimationFrame(function () { toast.classList.add('is-visible'); });
      }, 1200);
    }
    var tc = toast.querySelector('[data-pe-toast-close]');
    if (tc) tc.addEventListener('click', function () { hideToast(true); });
    var cta = toast.querySelector('[data-pe-toast-cta]');
    if (cta) cta.addEventListener('click', function () { try { sessionStorage.setItem(TOAST_KEY, '1'); } catch (err) {} });
  }

  // Abrir directamente con #proximos-eventos en la URL (útil para campañas)
  if (window.location.hash === '#proximos-eventos') open();
})();
