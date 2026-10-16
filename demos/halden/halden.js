/* Halden & Vale — concept site */
var PROPS = [
  { slug: 'villa-calaterra', name: 'Villa Calaterra', place: 'Mallorca, Spain', region: 'europe', price: '€14,800,000', beds: 6, baths: 7, size: '1,240 m²', plot: '1.2 ha', year: 2023, img: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/132e6fe0-46b2-4035-8532-2b4669c6e7c2.webp', gallery: ['https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/132e6fe0-46b2-4035-8532-2b4669c6e7c2.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/137e360e-7342-430d-b7a1-365075fc9b76.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/2d2a602c-c740-4ec7-a10a-39ce2c847a83.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/9e94d61d-788d-447c-baa3-233dbe096690.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/1569cbb0-ebf5-4887-b065-2cb79c8c563e.webp'],
    lede: 'A cliffside residence carved into the northwest coast, where every room opens to the sea.',
    text: ['Set on a private headland above the Serra de Tramuntana coastline, Villa Calaterra was conceived as a sequence of travertine pavilions stepping down towards the water. A 28-metre infinity pool aligns precisely with the sunset in midsummer.', 'Inside, hand-finished lime plaster, local stone and oak create a quiet, sunlit calm. The principal suite occupies its own wing with a private terrace, dressing rooms and an outdoor bath.'],
    features: [['Infinity pool', '28 m'], ['Guest pavilion', '2 suites'], ['Wine cellar', '1,200 bottles'], ['Private sea access', 'Yes'], ['Airport', '35 min']] },
  { slug: 'casa-marea', name: 'Casa Marea', place: 'Malibu, California', region: 'americas', price: '$22,500,000', beds: 5, baths: 6, size: '890 m²', plot: '0.4 ha', year: 2022, img: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/90b648bb-9f04-4c48-906c-7f0e0fb057c1.webp', gallery: ['https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/90b648bb-9f04-4c48-906c-7f0e0fb057c1.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/f4711411-3f32-4f5e-877b-ea7a61e3d5df.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/137e360e-7342-430d-b7a1-365075fc9b76.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/b2ed34f2-ca7c-4836-9946-19bea94a2b4e.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/132e6fe0-46b2-4035-8532-2b4669c6e7c2.webp'],
    lede: 'Concrete, glass and the Pacific, in perfect balance.',
    text: ['Cantilevered over the bluffs of Point Dume, Casa Marea frames the ocean like a gallery frames a painting. Floor-to-ceiling glass slides away entirely, turning the living level into one continuous terrace.', 'A screening room, wellness floor with steam and cold plunge, and a private path to the beach complete a home designed for long Californian evenings.'],
    features: [['Beach access', 'Private path'], ['Wellness floor', 'Steam & plunge'], ['Screening room', '12 seats'], ['Garage', '4 cars'], ['LAX', '45 min']] },
  { slug: 'hudson-penthouse', name: 'The Hudson Penthouse', place: 'New York, USA', region: 'americas', price: '$18,900,000', beds: 4, baths: 5, size: '610 m²', plot: 'Full floor', year: 2021, img: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/b2ed34f2-ca7c-4836-9946-19bea94a2b4e.webp', gallery: ['https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/b2ed34f2-ca7c-4836-9946-19bea94a2b4e.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/631d8839-9d94-4a2f-826c-29484d56fcda.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/f4711411-3f32-4f5e-877b-ea7a61e3d5df.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/137e360e-7342-430d-b7a1-365075fc9b76.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/90b648bb-9f04-4c48-906c-7f0e0fb057c1.webp'],
    lede: 'A full-floor residence with the skyline as its only neighbour.',
    text: ['Occupying the entire 61st floor, The Hudson Penthouse offers uninterrupted views from the river to Central Park. Ceilings rise to 3.6 metres, with white oak floors and sculptural lighting throughout.', 'Residents enjoy a 24-hour concierge, private dining room, pool and a dedicated elevator opening directly into the foyer.'],
    features: [['Floor', '61st of 64'], ['Ceiling height', '3.6 m'], ['Private elevator', 'Yes'], ['Concierge', '24 h'], ['Terrace', '85 m²']] },
  { slug: 'villa-ombrosa', name: 'Villa Ombrosa', place: 'Lake Como, Italy', region: 'europe', price: '€12,400,000', beds: 8, baths: 8, size: '1,560 m²', plot: '2.1 ha', year: 1898, img: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/3af639c9-2911-43ae-bfc4-823b8f0d7bda.webp', gallery: ['https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/3af639c9-2911-43ae-bfc4-823b8f0d7bda.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/fb3e332a-edcb-4815-9375-f2dc7f378bf8.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/137e360e-7342-430d-b7a1-365075fc9b76.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/91a6d758-85fa-4ab5-95ec-c80f28e670c0.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/1569cbb0-ebf5-4887-b065-2cb79c8c563e.webp'],
    lede: 'A restored nineteenth-century villa with terraced gardens to the water.',
    text: ['Built in 1898 and meticulously restored, Villa Ombrosa preserves its frescoed salons, original parquet and stone balustrades while adding every modern comfort.', 'Terraced gardens of cypress, camellia and lemon descend to a private dock and boathouse, with views across the lake to the mountains.'],
    features: [['Private dock', 'Boathouse'], ['Gardens', '2.1 ha terraced'], ['Frescoed salons', '3'], ['Staff apartment', 'Yes'], ['Milan', '60 min']] },
  { slug: 'ridge-lodge', name: 'Ridge Lodge', place: 'Aspen, Colorado', region: 'americas', price: '$31,000,000', beds: 7, baths: 9, size: '1,120 m²', plot: '1.6 ha', year: 2024, img: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/fdd3bb6d-a176-4f81-9167-f802dd77d8c3.webp', gallery: ['https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/fdd3bb6d-a176-4f81-9167-f802dd77d8c3.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/db23263b-abf2-4b0b-ae03-4bee747ed674.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/631d8839-9d94-4a2f-826c-29484d56fcda.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/b2ed34f2-ca7c-4836-9946-19bea94a2b4e.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/137e360e-7342-430d-b7a1-365075fc9b76.webp'],
    lede: 'Ski-in, ski-out timber and stone, wrapped in silence.',
    text: ['Ridge Lodge sits on a private ridge with direct access to the slopes and views of four peaks. Reclaimed timber, local stone and walls of glass bring the mountain inside.', 'A double-height great room, spa with indoor pool, ski room and a heated terrace with fire pits make it as remarkable in summer as in winter.'],
    features: [['Ski access', 'Ski-in / ski-out'], ['Spa', 'Indoor pool'], ['Great room', 'Double height'], ['Heated driveway', 'Yes'], ['Aspen airport', '12 min']] }
];

(function () {
  var hdr = document.querySelector('.hdr');
  var solidAlways = document.body.hasAttribute('data-solid');
  function onScroll() { if (hdr) hdr.classList.toggle('is-solid', solidAlways || window.scrollY > 60); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('is-in'); });

  /* hero slideshow */
  var slides = document.querySelectorAll('.slide');
  if (slides.length) {
    var i = 0, timer, nowName = document.querySelector('.hero__now b'), nowPlace = document.querySelector('.hero__now span'),
      num = document.querySelector('.hero__num'), viewLink = document.querySelector('.hero__view'), bar = document.querySelector('.hero__progress');
    var go = function (n) {
      slides[i].classList.remove('is-on');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('is-on');
      var p = PROPS[i];
      nowName.textContent = p.name; nowPlace.textContent = p.place + ' · ' + p.price;
      num.textContent = '0' + (i + 1) + ' / 0' + slides.length;
      viewLink.href = 'property.html?p=' + p.slug;
      if (bar) { bar.style.transition = 'none'; bar.style.width = '0'; void bar.offsetWidth; bar.style.transition = 'width 6.5s linear'; bar.style.width = '100%'; }
      clearTimeout(timer); timer = setTimeout(function () { go(i + 1); }, 6500);
    };
    document.querySelector('.hero__prev').addEventListener('click', function () { go(i - 1); });
    document.querySelector('.hero__next').addEventListener('click', function () { go(i + 1); });
    go(0);
  }

  /* listing filters */
  var fbtns = document.querySelectorAll('.filters button');
  fbtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-f');
      fbtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      document.querySelectorAll('.card').forEach(function (c) { c.classList.toggle('is-hidden', f !== 'all' && c.getAttribute('data-region') !== f); });
    });
  });

  /* destinations hover image */
  var fl = document.querySelector('.dest__float');
  if (fl && window.matchMedia('(hover: hover)').matches) {
    var flImg = fl.querySelector('img'), dest = document.querySelector('.dest');
    document.querySelectorAll('.dest__list a').forEach(function (a) {
      a.addEventListener('pointerenter', function () { flImg.src = a.getAttribute('data-img'); fl.classList.add('is-on'); });
      a.addEventListener('pointerleave', function () { fl.classList.remove('is-on'); });
    });
    dest.addEventListener('pointermove', function (e) { var r = dest.getBoundingClientRect(); fl.style.left = (e.clientX - r.left + 180) + 'px'; fl.style.top = (e.clientY - r.top) + 'px'; });
  }

  /* concept forms */
  document.querySelectorAll('form[data-concept]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.reportValidity()) return;
      var m = f.querySelector('.form__msg'); m.classList.add('is-on'); m.focus();
    });
  });

  /* property page */
  var holder = document.querySelector('[data-property]');
  if (holder) {
    var slug = new URLSearchParams(location.search).get('p') || PROPS[0].slug;
    var idx = Math.max(0, PROPS.findIndex(function (p) { return p.slug === slug; }));
    var p = PROPS[idx], next = PROPS[(idx + 1) % PROPS.length];
    document.title = p.name + ' · ' + p.place + ' | Halden & Vale';
    var set = function (sel, v, attr) { document.querySelectorAll(sel).forEach(function (el) { if (attr) el.setAttribute(attr, v); else el.textContent = v; }); };
    set('[data-f="img"]', p.img, 'src'); set('[data-f="name"]', p.name); set('[data-f="place"]', p.place); set('[data-f="price"]', p.price);
    set('[data-f="beds"]', p.beds); set('[data-f="baths"]', p.baths); set('[data-f="size"]', p.size); set('[data-f="plot"]', p.plot); set('[data-f="year"]', p.year);
    set('[data-f="lede"]', p.lede);
    document.querySelector('[data-f="text"]').innerHTML = p.text.map(function (t) { return '<p>' + t + '</p>'; }).join('');
    document.querySelector('[data-f="features"]').innerHTML = p.features.map(function (f) { return '<li><span>' + f[0] + '</span><span>' + f[1] + '</span></li>'; }).join('');
    var g = document.querySelector('.gallery');
    g.innerHTML = p.gallery.map(function (src, k) { return '<button type="button" data-k="' + k + '" aria-label="Open image ' + (k + 1) + '"><img src="' + src + '" alt="' + p.name + ', image ' + (k + 1) + '" loading="lazy" /></button>'; }).join('');
    var interest = document.querySelector('#interest'); if (interest) interest.value = p.name;
    set('[data-f="next-name"]', next.name); set('[data-f="next-img"]', next.img, 'src'); set('.next-prop', 'property.html?p=' + next.slug, 'href');

    var lb = document.querySelector('.lightbox'), lbImg = lb.querySelector('img'), lbCount = lb.querySelector('.lb-count'), k = 0, lastFocus;
    var show = function (n) { k = (n + p.gallery.length) % p.gallery.length; lbImg.src = p.gallery[k]; lbCount.textContent = (k + 1) + ' / ' + p.gallery.length; };
    var close = function () { lb.classList.remove('is-on'); document.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
    g.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; lastFocus = b; show(+b.getAttribute('data-k')); lb.classList.add('is-on'); document.body.style.overflow = 'hidden'; lb.querySelector('.lb-close').focus(); });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(k - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(k + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) { if (!lb.classList.contains('is-on')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') show(k + 1); if (e.key === 'ArrowLeft') show(k - 1); });
  }
})();
