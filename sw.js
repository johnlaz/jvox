/**
 * J-VOX AAC v2 — Service Worker
 * Cache-first strategy for offline support.
 * Update CACHE_NAME version string when deploying new releases
 * to force clients to pick up the latest assets.
 */

const CACHE_NAME = 'jvox-v2.2';

// Assets to pre-cache on install — everything needed to pass PWA installability checks offline
const PRECACHE_URLS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './sw.js',
];

// ── Install: pre-cache core shell ──────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())   // activate immediately
  );
});

// ── Activate: purge old caches ──────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())  // take control of all open tabs
  );
});

// ── Fetch: cache-first, network fallback ───────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Never intercept API calls (Groq, Nominatim, etc.)
  if (
    url.hostname === 'api.groq.com' ||
    url.hostname === 'nominatim.openstreetmap.org' ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  ) {
    // Network-first for external APIs; cache successful responses for fonts
    if (url.hostname.includes('fonts')) {
      event.respondWith(
        caches.open(CACHE_NAME).then(cache =>
          cache.match(event.request).then(cached => {
            const networkFetch = fetch(event.request).then(response => {
              if (response.ok) cache.put(event.request, response.clone());
              return response;
            });
            return cached || networkFetch;
          })
        )
      );
    }
    // For API calls: pass through, no caching
    return;
  }

  // Cache-first for everything else (app shell, assets)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Only cache valid GET responses
        if (!response || response.status !== 200 || event.request.method !== 'GET') {
          return response;
        }
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      }).catch(() => {
        // Offline fallback: return the main app shell
        return caches.match('./index.html');
      });
    })
  );
});
