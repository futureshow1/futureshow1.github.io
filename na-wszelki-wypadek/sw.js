/* Service worker: aplikacja ma działać bez sieci (blackout). Zmień VERSION przy każdej publikacji (także po zmianie treści). */
const VERSION = 'nww-0.3.0';
// bez tych plików nie ma trybu offline: instalacja musi się udać
const CORE = ['./', './index.html', './app.js', './style.css', './data/poradnik-pl.json'];
// ozdobne: brak ikony nie może wywrócić całego cache'u
const OPT = ['./manifest.webmanifest', './icon-192.png', './icon-512.png', './icons.svg'];
// 'reload' omija cache HTTP przeglądarki: nowa wersja ma dostać świeże bajty, a nie mieszankę starych i nowych
const swiezy = u => new Request(u, { cache: 'reload' });

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(async c => {
    await c.addAll(CORE.map(swiezy));
    await Promise.allSettled(OPT.map(u => c.add(swiezy(u))));
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  // cache-first, a w tle odświeżenie: offline zawsze odpowie, online dostanie nową wersję przy następnym otwarciu (strona pokazuje pasek „Odśwież”)
  e.respondWith(caches.open(VERSION).then(async c => {
    const cached = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(res => { if (res && res.ok) c.put(req, res.clone()); return res; }).catch(() => null);
    if (cached) { try { e.waitUntil(net); } catch (_) { } return cached; }
    return (await net) || (req.mode === 'navigate' ? c.match('./index.html') : Response.error());
  }));
});
