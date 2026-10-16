/* ER Studio — homepage scenes */
(function () {
  var doc = document.documentElement;
  var reduced = window.ER && window.ER.reduced;
  var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- cinematic scroll scenes ---------- */
  if (hasGsap && !reduced) {
    doc.classList.add('fx');
    gsap.registerPlugin(ScrollTrigger);
    var mobile = function () { return innerWidth <= 760; };

    /* SCENE 01 — hero window opens into the first world */
    var win = $('.hero__window'), winImg = $('.hero__window img');
    var small = function () {
      var w = mobile() ? 30 : 41, h = mobile() ? 38 : 41;
      return 'inset(' + h + '% ' + (mobile() ? 22 : 43) + '% ' + h + '% ' + (mobile() ? 22 : 43) + '% round 14px)';
    };
    gsap.fromTo(win, { clipPath: 'inset(50% 50% 50% 50% round 14px)' }, { clipPath: small, duration: 1.6, delay: 0.45, ease: 'expo.out' });

    var heroTl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true }
    });
    heroTl
      .to('.hero__title .ln:not(.ln--r)', { xPercent: -45, opacity: 0, duration: 0.8 }, 0)
      .to('.hero__title .ln--r', { xPercent: 45, opacity: 0, duration: 0.8 }, 0)
      .to('.hero__meta, .hero__foot', { opacity: 0, y: -30, duration: 0.4 }, 0)
      .fromTo(win, { clipPath: small }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1, immediateRender: false }, 0.05)
      .fromTo(winImg, { scale: 1.35 }, { scale: 1, duration: 1.05 }, 0)
      .to({}, { duration: 0.3 });

    /* SCENES 02–05 — worlds that transform into each other */
    var worlds = $$('.world');
    var rail = $('.worlds__bar i'), count = $('.worlds__count b');
    var uiParts = function (w) { return $$('.wui__nav, .wui__body > *', w); };
    worlds.forEach(function (w, i) {
      gsap.set(uiParts(w), { opacity: 0, y: 40 });
    });
    gsap.set(worlds[1], { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(worlds[2], { clipPath: 'circle(0% at 70% 60%)' });
    gsap.set(worlds[3], { clipPath: 'polygon(100% 0%, 130% 0%, 130% 100%, 115% 100%)' });

    var T = 11;
    var wTl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.worlds', start: 'top top', end: 'bottom bottom', scrub: 0.7,
        onUpdate: function (st) {
          var t = st.progress * T;
          var a = t < 2.9 ? 0 : t < 5.9 ? 1 : t < 8.9 ? 2 : 3;
          worlds.forEach(function (w, i) { w.classList.toggle('is-active', i === a); });
          if (count) count.textContent = '0' + (a + 2);
          if (rail) rail.style.transform = 'scaleX(' + st.progress + ')';
        }
      }
    });
    var reveal = function (w, at) {
      wTl.to(uiParts(w), { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power2.out' }, at);
    };
    wTl
      .fromTo($('img', worlds[0]), { scale: 1 }, { scale: 1.08, duration: 3.6 }, 0);
    reveal(worlds[0], 0.1);
    wTl
      .to(worlds[1], { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power2.inOut' }, 2)
      .to($('img', worlds[0]), { yPercent: -10, duration: 1.6 }, 2)
      .fromTo($('img', worlds[1]), { scale: 1.3 }, { scale: 1, duration: 2.6 }, 2);
    reveal(worlds[1], 3.2);
    wTl
      .to(worlds[2], { clipPath: 'circle(150% at 70% 60%)', duration: 1.6, ease: 'power2.in' }, 5)
      .fromTo($('img', worlds[2]), { scale: 1.25 }, { scale: 1, duration: 2.6 }, 5);
    reveal(worlds[2], 6.1);
    wTl
      .to(worlds[3], { clipPath: 'polygon(-30% 0%, 130% 0%, 130% 100%, -15% 100%)', duration: 1.5, ease: 'power2.inOut' }, 8)
      .fromTo($('img', worlds[3]), { scale: 1.3, xPercent: 6 }, { scale: 1, xPercent: 0, duration: 2.6 }, 8);
    reveal(worlds[3], 9);
    wTl.to({}, { duration: 0.6 }, 10.4);
    worlds[0].classList.add('is-active');

    /* SCENE 06 — horizontal journey (desktop & tablet) */
    var mm = gsap.matchMedia();
    mm.add('(min-width: 761px)', function () {
      var track = $('.variety__track');
      var dist = function () { return Math.max(0, track.scrollWidth - innerWidth); };
      var hTween = gsap.to(track, {
        x: function () { return -dist(); }, ease: 'none',
        scrollTrigger: { trigger: '.variety', pin: '.variety__sticky', start: 'top top', end: function () { return '+=' + dist(); }, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 }
      });
      gsap.to('.variety__bgword', { xPercent: -30, ease: 'none', scrollTrigger: { trigger: '.variety', start: 'top top', end: function () { return '+=' + dist(); }, scrub: true } });
      $$('.win').forEach(function (w, i) {
        gsap.fromTo(w, { rotate: i % 2 ? 3 : -3, yPercent: i % 2 ? 6 : -6 }, {
          rotate: i % 2 ? -1.5 : 1.5, yPercent: i % 2 ? -4 : 4, ease: 'none',
          scrollTrigger: { trigger: w, containerAnimation: hTween, start: 'left right', end: 'right left', scrub: true }
        });
        var img = $('.win__view img', w);
        if (img) gsap.fromTo(img, { xPercent: -6, scale: 1.15 }, { xPercent: 6, scale: 1.15, ease: 'none', scrollTrigger: { trigger: w, containerAnimation: hTween, start: 'left right', end: 'right left', scrub: true } });
      });
    });

    /* finale headline lines */
    gsap.from('.finale h2', { yPercent: 18, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.finale', start: 'top 70%' } });

    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    document.addEventListener('er:lang', function () { ScrollTrigger.refresh(); });
  }

  /* ---------- before / after ---------- */
  var frame = $('.ba__frame');
  if (frame) {
    var range = $('input', frame);
    var setPos = function (v) { frame.style.setProperty('--pos', v + '%'); };
    range.addEventListener('input', function () { setPos(range.value); });
    var fit = function () {
      var tall = frame.clientWidth < 640;
      frame.classList.toggle('is-tall', tall);
      frame.style.setProperty('--s', frame.clientWidth / (tall ? 720 : 1280));
    };
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(frame); else window.addEventListener('resize', fit);
    if (hasGsap && !reduced) {
      var st = { v: 50 };
      gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 65%', once: true } })
        .to(st, { v: 78, duration: 1, ease: 'power2.inOut', onUpdate: function () { setPos(st.v); range.value = st.v; } })
        .to(st, { v: 24, duration: 1.2, ease: 'power2.inOut', onUpdate: function () { setPos(st.v); range.value = st.v; } })
        .to(st, { v: 50, duration: 0.9, ease: 'power2.inOut', onUpdate: function () { setPos(st.v); range.value = st.v; } });
    }
  }

  /* ---------- live preview studio ---------- */
  var stage = $('.studio__stage');
  if (stage) {
    var device = $('.studio__device', stage), screen = $('.studio__screen', stage), frameEl = $('iframe', stage);
    var urlEl = $('.studio__url', stage), openEl = $('.studio__open', stage), chrome = $('.studio__chrome', stage);
    var sizes = { desktop: [1440, 0], tablet: [834, 1112], mobile: [390, 844] };
    var mode = 'desktop';
    var layout = function () {
      var W = stage.clientWidth, H = stage.clientHeight, pad = W < 700 ? 12 : 28;
      var ch = chrome.offsetHeight || 38, sw, sh, dw, dh, s;
      if (mode === 'desktop') {
        dw = W - pad * 2; dh = H - pad * 2; sw = dw; sh = dh - ch;
        s = sw / 1440; frameEl.style.width = '1440px'; frameEl.style.height = (sh / s) + 'px';
      } else {
        var vw = sizes[mode][0], vh = sizes[mode][1], bez = mode === 'tablet' ? 20 : 18;
        sh = Math.min(H - pad * 2 - ch - bez / 2, (W - pad * 2 - bez) * vh / vw);
        sw = sh * vw / vh; s = sw / vw;
        dw = sw + bez; dh = sh + ch + bez / 2;
        frameEl.style.width = vw + 'px'; frameEl.style.height = vh + 'px';
      }
      device.style.width = dw + 'px'; device.style.height = dh + 'px';
      frameEl.style.transform = 'scale(' + s + ')';
    };
    var loaded = false;
    var load = function () { if (loaded) return; loaded = true; screen.classList.add('is-loading'); frameEl.src = frameEl.getAttribute('data-src'); };
    frameEl.addEventListener('load', function () { screen.classList.remove('is-loading'); });
    if ('IntersectionObserver' in window) {
      var sio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { load(); sio.disconnect(); } }, { rootMargin: '600px 0px' });
      sio.observe(stage);
    } else load();
    layout();
    if ('ResizeObserver' in window) new ResizeObserver(layout).observe(stage); else window.addEventListener('resize', layout);

    var tabs = $$('.studio__projects button');
    tabs.forEach(function (b, i) {
      b.addEventListener('click', function () {
        tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t === b)); t.tabIndex = t === b ? 0 : -1; });
        loaded = true; screen.classList.add('is-loading');
        frameEl.src = b.getAttribute('data-src');
        urlEl.textContent = b.getAttribute('data-url');
        openEl.href = b.getAttribute('data-src');
      });
      b.tabIndex = i === 0 ? 0 : -1;
      b.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return; e.preventDefault();
        var n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); n.click();
      });
    });
    $$('.studio__devices button').forEach(function (b) {
      b.addEventListener('click', function () {
        var d = b.getAttribute('data-device');
        if (d === 'full') {
          var req = device.requestFullscreen || device.webkitRequestFullscreen;
          if (req) req.call(device); else window.open(frameEl.src, '_blank', 'noopener');
          return;
        }
        mode = d; stage.setAttribute('data-device', d);
        $$('.studio__devices button[data-device]:not([data-device="full"])').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        layout();
      });
    });
  }

  /* ---------- services ---------- */
  var items = $$('.svc__list li');
  var media = $$('.svc__media img'), cur = 0;
  var showImg = function (src) {
    if (!media.length || media[cur].getAttribute('src') === src) return;
    var next = media[1 - cur]; next.src = src;
    media[cur].classList.remove('is-on'); next.classList.add('is-on'); cur = 1 - cur;
  };
  items.forEach(function (li) {
    var btn = $('button', li);
    btn.addEventListener('click', function () {
      var open = !li.classList.contains('is-open');
      items.forEach(function (o) { o.classList.remove('is-open'); $('button', o).setAttribute('aria-expanded', 'false'); });
      if (open) { li.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); showImg(li.getAttribute('data-img')); }
    });
    li.addEventListener('pointerenter', function () { showImg(li.getAttribute('data-img')); });
  });
})();
