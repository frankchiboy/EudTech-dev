const CACHE_NAME = 'eudtech-v2'; // 每次部署請更改版本號

// 強制新版 Service Worker 立即接管並清除所有舊快取
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))))
  );
  self.clients.claim();
});

// 可選：攔截 fetch 但不做快取，直接走網路
self.addEventListener('fetch', event => {
  return fetch(event.request);
});