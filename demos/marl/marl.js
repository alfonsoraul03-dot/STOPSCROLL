/* MARL — concept store (cart is kept in this browser only) */
var CATALOG = {
  aera: { id: 'aera', name: 'Aera Over-Ear', type: 'Wireless headphones', price: 449,
    desc: 'Adaptive noise cancelling, 40-hour battery and memory-foam cushions wrapped in protein leather. Designed to disappear on your head and in a room.',
    variants: [{ key: 'sand', label: 'Sand', img: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/a96ec3b2-46a9-4685-aeee-c7f926b44b53.webp' }, { key: 'graphite', label: 'Graphite', img: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/4d2efb7e-bc32-4849-b0b3-4c322e3e49a4.webp' }, { key: 'olive', label: 'Olive', img: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/4f30e1bd-72a0-4478-9db2-c4b6d683fa06.webp' }],
    extra: ['https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/62fa4598-bf28-462b-b527-773dad04b11d.webp', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/247b82f8-7439-4e9a-b673-1bb05e51a74a.webp'],
    specs: ['Adaptive noise cancelling', '40 h battery, 10 min = 5 h', 'Bluetooth 5.4 multipoint', '262 g'] },
  lull: { id: 'lull', name: 'Lull Earbuds', type: 'True wireless earbuds', price: 229,
    desc: 'Small, warm-toned earbuds with a pebble case that fits any pocket. Sound tuned in the same studio as Aera.',
    variants: [{ key: 'sand', label: 'Sand', img: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/02cb362d-ff63-477f-ae23-24953cfca542.webp' }], extra: ['https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/247b82f8-7439-4e9a-b673-1bb05e51a74a.webp'],
    specs: ['Active noise cancelling', '8 h + 24 h with case', 'Wireless charging', 'IPX4'] },
  hearth: { id: 'hearth', name: 'Hearth Speaker', type: 'Home speaker', price: 389,
    desc: 'Room-filling 360° sound in a wool-wrapped cylinder with a solid oak top. Looks like furniture, sounds like a concert.',
    variants: [{ key: 'grey', label: 'Wool grey', img: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/2cdefdf6-7b96-4c5a-92ba-8fe0c25e56dd.webp' }], extra: ['https://d2ol7oe51mr4n9.cloudfront.net/user_3JkTYSIMBFwy3FWXWC6OIINtfRW/62fa4598-bf28-462b-b527-773dad04b11d.webp'],
    specs: ['360° sound', 'Wi-Fi & Bluetooth', 'Oak top, wool cover', '2.4 kg'] }
};
var FREE_SHIP = 500;
var money = function (n) { return '$' + n.toLocaleString('en-US'); };

var Cart = (function () {
  var mem = [];
  function read() { try { var v = localStorage.getItem('marl-cart'); return v ? JSON.parse(v) : mem; } catch (e) { return mem; } }
  function write(items) { mem = items; try { localStorage.setItem('marl-cart', JSON.stringify(items)); } catch (e) {} document.dispatchEvent(new Event('cart')); }
  return {
    items: read,
    add: function (id, variant, qty) { var it = read(); var f = it.find(function (x) { return x.id === id && x.v === variant; }); if (f) f.q += qty || 1; else it.push({ id: id, v: variant, q: qty || 1 }); write(it); },
    set: function (i, q) { var it = read(); if (q <= 0) it.splice(i, 1); else it[i].q = q; write(it); },
    clear: function () { write([]); },
    count: function () { return read().reduce(function (s, x) { return s + x.q; }, 0); },
    total: function () { return read().reduce(function (s, x) { return s + CATALOG[x.id].price * x.q; }, 0); }
  };
})();

function variantOf(id, key) { var p = CATALOG[id]; return p.variants.find(function (v) { return v.key === key; }) || p.variants[0]; }
function itemHTML(x, i, editable) {
  var p = CATALOG[x.id], v = variantOf(x.id, x.v);
  return '<div class="item"><img src="' + v.img + '" alt="" /><div><h3>' + p.name + '</h3><p>' + v.label + (editable ? '' : ' · Qty ' + x.q) + '</p>' +
    (editable ? '<div class="qty"><button type="button" data-i="' + i + '" data-d="-1" aria-label="Decrease quantity">−</button><output>' + x.q + '</output><button type="button" data-i="' + i + '" data-d="1" aria-label="Increase quantity">+</button></div><button class="item__rm" type="button" data-rm="' + i + '">Remove</button>' : '') +
    '</div><span class="item__price">' + money(p.price * x.q) + '</span></div>';
}

(function () {
  var drawer = document.querySelector('.drawer'), last;
  var countEls = document.querySelectorAll('.js-count');
  var toast = document.querySelector('.toast');
  function render() {
    countEls.forEach(function (c) { c.textContent = Cart.count(); });
    if (!drawer) return;
    var items = Cart.items(), list = drawer.querySelector('.items'), total = Cart.total();
    list.innerHTML = items.length ? items.map(function (x, i) { return itemHTML(x, i, true); }).join('') : '<div class="empty"><p>Your bag is empty.</p><a class="btn btn--line" href="index.html#shop">Browse the collection</a></div>';
    drawer.querySelector('.js-sub').textContent = money(total);
    var left = Math.max(0, FREE_SHIP - total);
    drawer.querySelector('.ship span').textContent = left ? 'Add ' + money(left) + ' for free express shipping' : 'You have free express shipping';
    drawer.querySelector('.ship i b').style.width = Math.min(100, total / FREE_SHIP * 100) + '%';
    drawer.querySelector('.js-checkout').toggleAttribute('disabled', !items.length);
  }
  function open() { last = document.activeElement; drawer.classList.add('is-on'); drawer.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; setTimeout(function () { drawer.querySelector('.drawer__top button').focus(); }, 50); }
  function close() { drawer.classList.remove('is-on'); drawer.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; last && last.focus(); }
  window.MARL = { open: open };
  if (drawer) {
    drawer.querySelector('.drawer__bg').addEventListener('click', close);
    drawer.querySelector('.drawer__top button').addEventListener('click', close);
    drawer.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-d')) { var i = +b.getAttribute('data-i'); Cart.set(i, Cart.items()[i].q + +b.getAttribute('data-d')); }
      if (b.hasAttribute('data-rm')) Cart.set(+b.getAttribute('data-rm'), 0);
    });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('is-on')) close(); });
  }
  document.querySelectorAll('.bagbtn').forEach(function (b) { b.addEventListener('click', open); });
  document.addEventListener('cart', render);
  render();

  function added(name) {
    document.querySelectorAll('.bagbtn').forEach(function (b) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); });
    if (toast) { toast.textContent = name + ' added to your bag'; toast.classList.add('is-on'); clearTimeout(toast._t); toast._t = setTimeout(function () { toast.classList.remove('is-on'); }, 2200); }
  }
  window.MARL.added = added;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]'); if (!b) return;
    e.preventDefault();
    var id = b.getAttribute('data-add'), v = b.getAttribute('data-v') || CATALOG[id].variants[0].key;
    Cart.add(id, v, 1); added(CATALOG[id].name);
  });

  /* home hero swatches */
  var hero = document.querySelector('.hero');
  if (hero) {
    var imgs = hero.querySelectorAll('.hero__visual img'), label = hero.querySelector('.swatches span'), addBtn = hero.querySelector('[data-add]');
    hero.querySelectorAll('.swatches button').forEach(function (s, i) {
      s.addEventListener('click', function () {
        hero.querySelectorAll('.swatches button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === s)); });
        imgs.forEach(function (im, k) { im.classList.toggle('is-on', k === i); });
        label.textContent = CATALOG.aera.variants[i].label; addBtn.setAttribute('data-v', CATALOG.aera.variants[i].key);
      });
    });
  }

  /* product page */
  var pdp = document.querySelector('.pdp');
  if (pdp) {
    var id = new URLSearchParams(location.search).get('p'); if (!CATALOG[id]) id = 'aera';
    var p = CATALOG[id], vi = 0, q = 1, gi = 0;
    document.title = p.name + ' | MARL · Design concept by ER Studio';
    pdp.querySelector('[data-f="name"]').textContent = p.name;
    pdp.querySelector('[data-f="crumb"]').textContent = p.name;
    pdp.querySelector('[data-f="type"]').textContent = p.type;
    pdp.querySelector('[data-f="price"]').textContent = money(p.price);
    pdp.querySelector('[data-f="desc"]').textContent = p.desc;
    pdp.querySelector('[data-f="specs"]').innerHTML = p.specs.map(function (s) { return '<li>' + s + '</li>'; }).join('');
    var sw = pdp.querySelector('.swatches'), swl = sw.querySelector('span');
    var main = pdp.querySelector('.mainimg img'), thumbs = pdp.querySelector('.thumbs');
    function gallery() { return [p.variants[vi].img].concat(p.extra); }
    function drawThumbs() { thumbs.innerHTML = gallery().map(function (src, k) { return '<button type="button" aria-label="Image ' + (k + 1) + '" aria-current="' + (k === gi) + '"><img src="' + src + '" alt="" /></button>'; }).join(''); }
    function showG(k) { gi = k; main.src = gallery()[k]; main.alt = p.name + ' in ' + p.variants[vi].label; drawThumbs(); }
    thumbs.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) showG([].indexOf.call(thumbs.children, b)); });
    sw.insertAdjacentHTML('afterbegin', p.variants.map(function (v, k) { return '<button type="button" class="sw-' + v.key + '" aria-label="' + v.label + '" aria-pressed="' + (k === 0) + '"></button>'; }).join(''));
    sw.querySelectorAll('button').forEach(function (b, k) { b.addEventListener('click', function () { vi = k; sw.querySelectorAll('button').forEach(function (x, j) { x.setAttribute('aria-pressed', String(j === k)); }); swl.textContent = p.variants[k].label; showG(0); }); });
    swl.textContent = p.variants[0].label; showG(0);
    var out = pdp.querySelector('.qty output');
    pdp.querySelectorAll('.qty button').forEach(function (b) { b.addEventListener('click', function () { q = Math.max(1, Math.min(9, q + +b.getAttribute('data-q'))); out.textContent = q; }); });
    pdp.querySelector('.js-addpdp').addEventListener('click', function () { Cart.add(id, p.variants[vi].key, q); added(p.name); });
    pdp.querySelector('.js-buynow').addEventListener('click', function () { Cart.add(id, p.variants[vi].key, q); location.href = 'checkout.html'; });
    var mi = pdp.querySelector('.mainimg');
    mi.addEventListener('click', function () { mi.classList.toggle('is-zoom'); });
    mi.addEventListener('pointermove', function (e) { var r = mi.getBoundingClientRect(); main.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%'; });
    mi.addEventListener('pointerleave', function () { mi.classList.remove('is-zoom'); });
    document.querySelectorAll('.js-related').forEach(function (a) { if (a.getAttribute('data-id') === id) a.remove(); });
  }

  /* checkout */
  var co = document.querySelector('.co');
  if (co) {
    function drawSum() {
      var items = Cart.items(), sub = Cart.total(), ship = sub >= FREE_SHIP || !sub ? 0 : 15, tax = Math.round(sub * 0.07);
      co.querySelector('.js-items').innerHTML = items.length ? items.map(function (x, i) { return itemHTML(x, i, false); }).join('') : '<p class="label" style="padding:1rem 0">Your bag is empty. <a href="index.html#shop" style="text-decoration:underline">Shop the collection</a></p>';
      co.querySelector('.js-s').textContent = money(sub); co.querySelector('.js-sh').textContent = ship ? money(ship) : 'Free';
      co.querySelector('.js-t').textContent = money(tax); co.querySelector('.js-g').textContent = money(sub + ship + tax);
      co.querySelector('.js-place').toggleAttribute('disabled', !items.length);
    }
    document.addEventListener('cart', drawSum); drawSum();
    co.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (!this.reportValidity()) return;
      Cart.clear(); co.style.display = 'none';
      var d = document.querySelector('.done'); d.classList.add('is-on'); d.focus(); window.scrollTo(0, 0);
    });
  }
})();
