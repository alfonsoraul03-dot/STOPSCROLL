/* Small fixed label shown on every ER Studio design concept. */
(function () {
  var s = document.currentScript;
  var es = (s && s.getAttribute('data-lang') === 'es');
  var home = (s && s.getAttribute('data-home')) || '../../';
  var inFrame = false;
  try { inFrame = window.self !== window.top; } catch (e) { inFrame = true; }
  var css = '.erbar{position:fixed;z-index:9999;left:14px;bottom:14px;display:flex;align-items:center;gap:10px;padding:6px 6px 6px 14px;border-radius:999px;background:rgba(12,11,10,.86);color:#F1ECE3;font:500 12px/1.2 "General Sans","Helvetica Neue",Arial,sans-serif;letter-spacing:.01em;box-shadow:0 10px 30px rgba(0,0,0,.25);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);transition:opacity .3s}' +
    '.erbar b{font-weight:600}.erbar i{width:6px;height:6px;border-radius:50%;background:#FF4F1F;display:inline-block}' +
    '.erbar a{color:#0C0B0A;background:#F1ECE3;text-decoration:none;padding:7px 12px;border-radius:999px;font-weight:600}.erbar a:hover{background:#FF4F1F}' +
    '.erbar.is-frame a{display:none}.erbar.is-frame{padding:6px 14px}' +
    '@media (max-width:520px){.erbar{font-size:11px;left:10px;bottom:10px}.erbar .erbar__t{display:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var bar = document.createElement('div');
  bar.className = 'erbar' + (inFrame ? ' is-frame' : '');
  bar.setAttribute('role', 'note');
  bar.innerHTML = '<i aria-hidden="true"></i><span><b>' + (es ? 'Concepto de diseño' : 'Design concept') + '</b><span class="erbar__t"> · ' + (es ? 'marca ficticia por ER Studio' : 'fictional brand by ER Studio') + '</span></span>' +
    '<a href="' + home + '" target="_top">' + (es ? '← ER Studio' : '← ER Studio') + '</a>';
  function add() { document.body.appendChild(bar); }
  if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
})();
