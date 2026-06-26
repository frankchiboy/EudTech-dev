const CACHE_NAME = 'eudtech-v62'; // 每次部署請更改版本號

// 檢測開發模式
const isDev = self.location.hostname === 'localhost' || 
              self.location.hostname === '127.0.0.1';

// 在開發模式下，完全禁用服務工作者功能
if (isDev) {
  console.log('[Service Worker] 開發模式 - 禁用 Service Worker');
  // 強制清除所有快取
  self.addEventListener('install', event => {
    self.skipWaiting();
    console.log('[Service Worker] 開發模式 - 立即接管');
  });

  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(keys => Promise.all(keys.map(key => {
        console.log(`[Service Worker] 開發模式 - 清除快取: ${key}`);
        return caches.delete(key);
      })))
    );
    self.clients.claim();
  });

  // 開發模式下的所有請求都不使用快取，但不再添加隨機參數
  self.addEventListener('fetch', event => {
    // 對所有請求使用 no-store 快取策略，但不添加會導致重新整理的參數
    event.respondWith(fetch(event.request, { cache: 'no-store' }));
  });
} 
// 生產模式下的行為
else {
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

  // 生產模式不使用快取，確保內容是最新的
  self.addEventListener('fetch', event => {
    return fetch(event.request);
  });
}