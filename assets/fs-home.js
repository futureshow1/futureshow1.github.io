/* FutureShow — wspólny link powrotny na stronę główną dla wszystkich podstron projektów.
   Wstawia pastylkę „← futureshow.pl” w lewym dolnym rogu, obok przycisku ustawień cookies.
   Użycie: <script src="https://futureshow.pl/assets/fs-home.js" defer></script>
   Opcje na tagu: data-pos="bl|br|tl|tr" (róg), data-theme="dark|light".
   Strona z własnym, wbudowanym linkiem (element [data-fs-home] lub #fs-home) jest pomijana. */
(function () {
  if (window.__fsHome) return;
  window.__fsHome = 1;

  // w ramce (strona osadzona gdzie indziej) link powrotny byłby nie na miejscu; wyjątek: nasze własne skany
  if (window.top !== window.self) {
    try { if (!window.parent.__fsHomeAllowFramed) return; } catch (e) { return; }
  }

  var me = document.currentScript;
  var pos = (me && me.getAttribute('data-pos')) || 'bl';
  var theme = (me && me.getAttribute('data-theme')) || 'dark';
  // data-bottom="96" podnosi pastylkę nad dolny pasek strony (np. oś czasu na mapie)
  var bottom = me && parseInt(me.getAttribute('data-bottom'), 10);

  function start() {
    if (document.querySelector('[data-fs-home],#fs-home')) return;

    var css = document.createElement('style');
    css.textContent = [
      '.fsh{position:fixed;z-index:999996;display:inline-flex;align-items:center;gap:7px;',
      'height:34px;padding:0 12px;box-sizing:border-box;text-decoration:none!important;',
      'font:600 12px/1 "JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.06em;',
      'border:1px solid rgba(250,250,247,.35);border-radius:0;box-shadow:0 4px 18px rgba(0,0,0,.28);',
      'transition:opacity .25s,transform .25s,background .15s,color .15s,left .2s;-webkit-font-smoothing:antialiased}',
      '.fsh--dark{background:#0a0a0a;color:#fafaf7!important}',
      '.fsh--light{background:#fafaf7;color:#0a0a0a!important;border-color:rgba(10,10,10,.35)}',
      '.fsh:hover,.fsh:focus-visible{background:#ff2d00;color:#fafaf7!important;border-color:#ff2d00;outline:none}',
      '.fsh__arr{color:#ff2d00;font-size:14px;transition:color .15s}',
      '.fsh:hover .fsh__arr,.fsh:focus-visible .fsh__arr{color:#fafaf7}',
      '.fsh--bl{bottom:calc(14px + env(safe-area-inset-bottom,0px));left:14px}',
      '.fsh--br{bottom:calc(14px + env(safe-area-inset-bottom,0px));right:14px}',
      '.fsh--tl{top:14px;left:14px}.fsh--tr{top:14px;right:14px}',
      '.fsh--beside{left:56px}',
      '.fsh--hidden{opacity:0;transform:translateY(8px);pointer-events:none}',
      '@media(max-width:520px){.fsh{height:32px;padding:0 10px;font-size:11px}.fsh--beside{left:54px}}',
      '@media(prefers-reduced-motion:reduce){.fsh{transition:none}}',
      '@media print{.fsh{display:none}}'
    ].join('');
    document.head.appendChild(css);

    var a = document.createElement('a');
    a.href = 'https://futureshow.pl/';
    a.className = 'fsh fsh--' + (theme === 'light' ? 'light' : 'dark') + ' fsh--' + pos;
    a.setAttribute('data-fs-home', '');
    a.innerHTML = '<span class="fsh__arr" aria-hidden="true">←</span><span>futureshow.pl</span>';
    if (bottom > 0 && pos.charAt(0) === 'b') a.style.bottom = 'calc(' + bottom + 'px + env(safe-area-inset-bottom,0px))';
    // data-top="64" opuszcza pastylkę pod logo lub górny pasek strony
    var top = me && parseInt(me.getAttribute('data-top'), 10);
    if (top > 0 && pos.charAt(0) === 't') a.style.top = top + 'px';
    document.body.appendChild(a);

    function lang() {
      var l = (document.documentElement.getAttribute('lang') || '').toLowerCase();
      var pl = l.indexOf('pl') === 0;
      a.title = pl ? 'Wróć na stronę główną FutureShow' : 'Back to the FutureShow home page';
      a.setAttribute('aria-label', a.title);
    }

    // przycisk ponownego otwarcia ustawień cookies stoi w lewym dolnym rogu — stajemy obok niego,
    // a gdy sam baner jest otwarty, chowamy się, żeby niczego nie zasłaniać
    // data-avoid="selektor": chowamy się, dopóki nachodzimy na wskazane elementy
    // (np. pasek sticky, który przy wejściu leży w treści, albo ekran powitalny aplikacji)
    var avoidSel = me && me.getAttribute('data-avoid');
    function overlapsAvoided() {
      if (!avoidSel) return false;
      var els;
      try { els = document.querySelectorAll(avoidSel); } catch (e) { return false; }
      var ar = a.getBoundingClientRect();
      for (var i = 0; i < els.length; i++) {
        var r = els[i].getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (getComputedStyle(els[i]).visibility === 'hidden') continue;
        if (ar.left < r.right && ar.right > r.left && ar.top < r.bottom && ar.bottom > r.top) return true;
      }
      return false;
    }

    function layout() {
      var reopen = document.querySelector('.fs-cookie-reopen');
      var reopenShown = reopen && reopen.offsetParent !== null && getComputedStyle(reopen).display !== 'none';
      a.classList.toggle('fsh--beside', pos === 'bl' && !!reopenShown);
      var banner = document.getElementById('fs-cookie-banner');
      a.classList.toggle('fsh--hidden', !!(banner && banner.classList.contains('fs-show')) || overlapsAvoided());
    }

    var queued = false;
    function schedule() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; layout(); });
    }

    lang();
    layout();
    new MutationObserver(lang).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
    if (avoidSel) {
      addEventListener('scroll', schedule, { passive: true, capture: true });
      addEventListener('resize', schedule);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
