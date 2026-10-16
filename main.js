// ScrollStop Studio — scroll-driven film + contact links.
(function () {
  "use strict";

  // ---- Contact: every "free ad" button opens a pre-filled email ----
  var EMAIL = "growthwithraul@gmail.com";
  var mailto =
    "mailto:" + EMAIL +
    "?subject=" + encodeURIComponent("Free video ad request") +
    "&body=" + encodeURIComponent(
      "Hi Raul,\n\nI'd like a free video ad for my brand.\n\nProduct page link:\nWhere we advertise (Meta, TikTok, other):\n\nThanks!"
    );
  document.querySelectorAll(".js-free-ad").forEach(function (a) {
    a.setAttribute("href", mailto);
  });

  // ---- Scroll scrub ----
  var journey = document.querySelector(".journey");
  var video = document.querySelector(".stage__video");
  var poster = document.querySelector(".stage__poster");
  var meter = document.querySelector(".stage__meter-fill");
  if (!journey || !video) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return; // poster only, all copy stays readable

  var isMobile = window.matchMedia("(max-width: 768px)").matches;
  var src = isMobile ? video.dataset.mobile : video.dataset.desktop;

  var duration = 0;
  var target = 0;
  var current = 0;
  var ready = false;
  var lastSeek = -1;

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
      // Ease toward the scroll position so fast flicks still look smooth.
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
      if (poster && !poster.classList.contains("is-hidden")) {
        poster.classList.add("is-hidden");
      }
    }, { once: true });
    // iOS needs a play/pause to allow seeking.
    var p = video.play();
    if (p && p.then) p.then(function () { video.pause(); }).catch(function () {});
  }

  // Load the whole clip into memory so seeking backward and forward is instant.
  fetch(src)
    .then(function (r) { if (!r.ok) throw new Error("fetch failed"); return r.blob(); })
    .then(function (b) { start(URL.createObjectURL(b)); })
    .catch(function () { start(src); });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
  requestAnimationFrame(tick);
})();
