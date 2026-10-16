/* ER Studio — work + contact pages */
(function () {
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var lang = function () { return document.documentElement.getAttribute('data-lang') || 'en'; };

  /* ---------- portfolio ---------- */
  var grid = document.querySelector('.pgrid');
  if (grid) {
    var projs = $$('.proj', grid), empty = document.querySelector('.pempty');
    if ('IntersectionObserver' in window && !(window.ER && window.ER.reduced)) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
      projs.forEach(function (p) { p.classList.add('rv-p'); io.observe(p); });
    }
    $$('.filters button').forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-f'), shown = 0;
        $$('.filters button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        projs.forEach(function (p) { var on = f === 'all' || (' ' + p.getAttribute('data-cats') + ' ').indexOf(' ' + f + ' ') > -1; p.classList.toggle('is-hidden', !on); if (on) { shown++; p.classList.add('is-in'); } });
        empty.hidden = shown > 0;
      });
    });
    var setView = function (v) {
      grid.setAttribute('data-view', v);
      $$('.view button').forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-view') === v)); });
      try { localStorage.setItem('er-view', v); } catch (e) {}
    };
    $$('.view button').forEach(function (b) { b.addEventListener('click', function () { setView(b.getAttribute('data-view')); }); });
    try { var sv = localStorage.getItem('er-view'); if (sv) setView(sv); } catch (e) {}

    var fl = document.querySelector('.pfloat'), flImg = fl && fl.querySelector('img');
    if (fl && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var x = 0, y = 0, cx = 0, cy = 0, raf;
      window.addEventListener('pointermove', function (e) { x = e.clientX; y = e.clientY; }, { passive: true });
      (function loop() { cx += (x - cx) * 0.15; cy += (y - cy) * 0.15; fl.style.left = cx + 'px'; fl.style.top = cy + 'px'; raf = requestAnimationFrame(loop); })();
      projs.forEach(function (p) {
        p.addEventListener('pointerenter', function () {
          if (grid.getAttribute('data-view') !== 'index') return;
          var src = p.getAttribute('data-img');
          if (!src) { var im = p.querySelector('img'); src = im ? im.getAttribute('src') : ''; }
          if (!src) return;
          flImg.src = src; fl.classList.add('is-on');
        });
        p.addEventListener('pointerleave', function () { fl.classList.remove('is-on'); });
      });
    }
  }

  /* ---------- contact ---------- */
  var form = document.getElementById('cform');
  if (form) {
    var plan = new URLSearchParams(location.search).get('plan');
    if (plan) { var r = form.querySelector('input[data-plan="' + plan + '"]'); if (r) r.checked = true; }
    var en = {};
    $$('option', form).forEach(function (o) { en[o.value] = o.textContent; });
    var syncOptions = function () { $$('option[data-es]', form).forEach(function (o) { o.textContent = lang() === 'es' ? o.getAttribute('data-es') : en[o.value]; }); };
    syncOptions();
    document.addEventListener('er:lang', syncOptions);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form), es = lang() === 'es';
      var company = (d.get('company') || '').trim();
      var subject = (es ? 'Solicitud de proyecto' : 'Project request') + (company ? ' · ' + company : ' · ' + d.get('name'));
      var lines = [
        (es ? 'Nombre: ' : 'Name: ') + d.get('name'),
        'Email: ' + d.get('email'),
        (es ? 'Empresa: ' : 'Company: ') + (company || '-'),
        (es ? 'Sector: ' : 'Industry: ') + d.get('industry'),
        (es ? 'Tipo de web: ' : 'Website type: ') + (d.get('type') || '-'),
        (es ? 'Presupuesto: ' : 'Budget: ') + d.get('budget'),
        (es ? 'Web actual: ' : 'Current website: ') + ((d.get('site') || '').trim() || '-'),
        '',
        d.get('message')
      ];
      var href = 'mailto:growthwithraul@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      var msg = form.querySelector('.cform__msg');
      msg.classList.add('is-on');
      window.location.href = href;
      setTimeout(function () { msg.focus(); }, 300);
    });
  }
})();
