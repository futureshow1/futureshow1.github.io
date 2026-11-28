/* FutureTalk — service worker: działa offline po pierwszej wizycie. Zmień VERSION przy każdej publikacji. */
var VERSION = 'ft-2.0.1';
var SHELL = ['./', 'index.html', 'app.css', 'app.js', 'icons.js', 'sources.js', 'data-pl.js', 'data-en.js',
  'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('ft-') === 0 && k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  /* strona: najpierw sieć (świeża wersja), offline — kopia */
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(function (r) {
      var copy = r.clone(); caches.open(VERSION).then(function (c) { c.put('index.html', copy); }); return r;
    }).catch(function () { return caches.match('index.html'); }));
    return;
  }
  /* fonty Google: cache-first */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (r) { var copy = r.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); return r; });
    }));
    return;
  }
  /* pliki aplikacji: stale-while-revalidate */
  if (url.origin === location.origin && url.pathname.indexOf('/futuretalk/') === 0) {
    e.respondWith(caches.match(req).then(function (hit) {
      var net = fetch(req).then(function (r) { if (r.ok) { var copy = r.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); } return r; }).catch(function () { return hit; });
      return hit || net;
    }));
  }
  /* reszta (statystyki, worker AI) — bez ingerencji */
});
