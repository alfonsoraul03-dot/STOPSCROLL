/* ER Studio — shared behaviour (language, nav, menu, cursor, reveals) */
(function () {
  var doc = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) doc.classList.add('reduced');
  window.ER = { reduced: reduced };

  /* language */
  function setLang(l) {
    doc.setAttribute('data-lang', l); doc.lang = l;
    try { localStorage.setItem('er-lang', l); } catch (e) {}
    document.dispatchEvent(new CustomEvent('er:lang', { detail: l }));
  }
  window.ER.lang = function () { return doc.getAttribute('data-lang') || 'en'; };
  document.querySelectorAll('.lang').forEach(function (b) {
    b.addEventListener('click', function () { setLang(window.ER.lang() === 'en' ? 'es' : 'en'); });
  });

  /* nav: solid after scroll, hide on scroll down */
  var nav = document.getElementById('nav');
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    if (nav) {
      nav.classList.toggle('is-solid', y > 40);
      if (!doc.classList.contains('menu-open')) nav.classList.toggle('is-hidden', y > 300 && y > lastY + 2);
      if (y < lastY - 2) nav.classList.remove('is-hidden');
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* full-screen menu */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');
  function toggleMenu(open) {
    if (!menu) return;
    open = typeof open === 'boolean' ? open : !doc.classList.contains('menu-open');
    doc.classList.toggle('menu-open', open);
    burger && burger.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { nav && nav.classList.remove('is-hidden'); var f = menu.querySelector('a'); f && f.focus({ preventScroll: true }); }
  }
  burger && burger.addEventListener('click', toggleMenu);
  menu && menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggleMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && doc.classList.contains('menu-open')) { toggleMenu(false); burger && burger.focus(); } });

  /* reveal on view */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    rv.forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 0.08 + 's'; io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('is-in'); }); }

  /* custom cursor (fine pointers only) */
  var cursor = document.querySelector('.cursor');
  if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
    var label = cursor.querySelector('span');
    var x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    window.addEventListener('pointermove', function (e) { x = e.clientX; y = e.clientY; }, { passive: true });
    (function loop() {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      cursor.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('pointerover', function (e) {
      var t = e.target.closest('[data-cursor], a, button, input, select, textarea, label');
      cursor.classList.remove('is-label', 'is-link');
      if (!t) return;
      if (t.hasAttribute('data-cursor')) { label.textContent = t.getAttribute('data-cursor'); cursor.classList.add('is-label'); }
      else cursor.classList.add('is-link');
    });
    document.addEventListener('pointerleave', function () { cursor.style.opacity = '0'; });
    document.addEventListener('pointerenter', function () { cursor.style.opacity = '1'; });
  }

  /* magnetic buttons */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
    document.querySelectorAll('.magnetic').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * 0.25 + 'px,' + (e.clientY - r.top - r.height / 2) * 0.35 + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }
})();
