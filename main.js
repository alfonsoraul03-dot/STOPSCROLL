// ER Studio: language switch, free-draft emails, live demo frames and the scroll-driven film.
(function () {
  "use strict";

  var root = document.documentElement;
  var EMAIL = "growthwithraul@gmail.com";

  function lang() { return root.getAttribute("data-lang") === "es" ? "es" : "en"; }

  // ---- Free draft: pre-filled email in the visitor's language ----
  var DRAFT = {
    en: {
      subject: "Free homepage draft",
      body: "Hi Raul,\n\nI'd like a free draft of a new homepage for my business.\n\nBusiness name:\nCity / country:\nCurrent website (if any):\nWhat we do:\n\nThanks!"
    },
    es: {
      subject: "Boceto gratis de mi web",
      body: "Hola Raúl,\n\nMe gustaría un boceto gratis de la nueva página de inicio para mi negocio.\n\nNombre del negocio:\nCiudad / país:\nWeb actual (si tengo):\nA qué nos dedicamos:\n\n¡Gracias!"
    }
  };
  function updateDraftLinks() {
    var d = DRAFT[lang()];
    var href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(d.subject) + "&body=" + encodeURIComponent(d.body);
    document.querySelectorAll(".js-draft").forEach(function (a) { a.setAttribute("href", href); });
  }

  // ---- Language switch ----
  var btn = document.querySelector(".lang");
  if (btn) {
    btn.addEventListener("click", function () {
      var next = lang() === "es" ? "en" : "es";
      root.setAttribute("data-lang", next);
      root.setAttribute("lang", next);
      try { localStorage.setItem("er-lang", next); } catch (e) {}
      updateDraftLinks();
    });
  }
  updateDraftLinks();

  // ---- Live demo frames: scale a full-size page into each preview ----
  function scaleFrames() {
    document.querySelectorAll(".frame").forEach(function (frame) {
      var view = frame.querySelector(".frame__view");
      var iframe = frame.querySelector("iframe");
      if (!view || !iframe) return;
      var s = view.clientWidth / iframe.offsetWidth;
      frame.style.setProperty("--s", s.toFixed(4));
    });
  }
  scaleFrames();
  window.addEventListener("resize", scaleFrames);
  if ("ResizeObserver" in window) {
    var ro = new ResizeObserver(scaleFrames);
    document.querySelectorAll(".frame__view").forEach(function (v) { ro.observe(v); });
  }

  // ---- Scroll-driven film ----
  var journey = document.querySelector(".journey");
  var video = document.querySelector(".stage__video");
  var poster = document.querySelector(".stage__poster");
  var meter = document.querySelector(".stage__meter-fill");
  if (!journey || !video) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var isMobile = window.matchMedia("(max-width: 680px)").matches;
  var src = isMobile ? video.dataset.mobile : video.dataset.desktop;

  var duration = 0, target = 0, current = 0, ready = false, lastSeek = -1;

  function progress() {
    var rect = journey.getBoundingClientRect();
    var total = journey.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    var p = -rect.top / total;
    return p < 0 ? 0 : p > 1 ? 1 : p;
  }

  function onScroll() {
    var p = progress();
    if (meter) meter.style.transform = "scaleX(" + p + ")";
    if (ready) target = p * (duration - 0.05);
  }

  function tick() {
    if (ready) {
      current += (target - current) * 0.18;
      if (Math.abs(current - lastSeek) > 0.012) {
        try { video.currentTime = current; } catch (e) {}
        lastSeek = current;
      }
    }
    requestAnimationFrame(tick);
  }

  function start(url) {
    video.src = url;
    video.addEventListener("loadedmetadata", function () {
      duration = video.duration || 15;
      ready = true;
      onScroll();
    }, { once: true });
    video.addEventListener("seeked", function () {
      if (poster) poster.classList.add("is-hidden");
    }, { once: true });
    var p = video.play();
    if (p && p.then) p.then(function () { video.pause(); }).catch(function () {});
  }

  fetch(src)
    .then(function (r) { if (!r.ok) throw new Error("fetch failed"); return r.blob(); })
    .then(function (b) { start(URL.createObjectURL(b)); })
    .catch(function () { start(src); });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
  requestAnimationFrame(tick);
})();
