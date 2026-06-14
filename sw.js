// Yin Tasks Service Worker
// v1 — basic offline shell + push placeholder

const CACHE_NAME = 'yin-tasks-v1-2026-06-15';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((c) => c.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Never cache API calls (data must be fresh)
  if (url.pathname.startsWith('/tasks') || url.pathname.startsWith('/reply')
   || url.pathname.startsWith('/chat') || url.pathname.startsWith('/status')
   || url.pathname.startsWith('/sweep_inbox')) {
    return; // pass through
  }
  // Cache-first for shell assets
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((resp) => {
        const copy = resp.clone();
        if (resp.ok && event.request.method === 'GET') {
          caches.open(CACHE_NAME).then((c) => c.put(event.request, copy));
        }
        return resp;
      }).catch(() => caches.match('./index.html'));
    })
  );
});

// Push notification handler (VAPID keys required for production)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Yin Tasks', body: 'New update' };
  event.waitUntil(
    self.registration.showNotification(data.title || 'Yin Tasks', {
      body: data.body || '',
      icon: './icon-192.png',
      badge: './icon-192.png',
      data: data.url || './',
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data));
});
