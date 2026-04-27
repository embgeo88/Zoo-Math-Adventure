// Zoo Math Adventure — Service Worker
// Bump CACHE_NAME whenever files change to force a refresh on all devices
const CACHE_NAME = 'zoo-math-v3';

// All local files the game needs — pre-cached on install so the game works offline immediately
const PRECACHE = [
  './zoo-math-game.html',
  './questions.js',
  './sprites/axolotl.svg',
  './sprites/cassowary.svg',
  './sprites/cheetah.svg',
  './sprites/kookaburra.svg',
  './sprites/manatee.svg',
  './sprites/meerkat.svg',
  './sprites/platypus.svg',
  './sprites/puma.svg',
  './sprites/quokka.svg',
  './sprites/red_panda.svg',
  './sprites/snow_leopard.svg',
  './sprites/tasmanian_devil.svg',
  './sprites/wombat.svg',
  './icons/icon.svg',
  './manifest.json',
  // Walk-cycle sprite sheets — add one line per animal as PNGs arrive
  './sprites/giraffe-walk.png',
];

// Twemoji CDN — cached at runtime the first time each image loads,
// then served from cache on repeat visits / offline
const TWEMOJI_HOST = 'cdn.jsdelivr.net';

// ── Install: pre-cache all local assets ──────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())   // activate immediately, don't wait for old SW to die
  );
});

// ── Activate: delete old caches ───────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())  // take control of all open tabs immediately
  );
});

// ── Fetch: serve from cache, fall back to network ────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Local assets → cache-first (game works fully offline)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        // Not in cache yet — fetch, cache, and return
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Twemoji CDN → cache-first with network fallback (animal emoji images)
  if (url.hostname === TWEMOJI_HOST) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        }).catch(() => cached); // if network fails and nothing cached, silently fail
      })
    );
  }
});
