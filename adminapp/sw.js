/* ============================================================
   Lincah Travel Admin - Service Worker
   ============================================================ */

const CACHE_NAME = 'lincah-travel-v25';
const BASE_PATH = '/lincah';
const STATIC_ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/css/style.css`,
  `${BASE_PATH}/css/components.css`,
  `${BASE_PATH}/js/config.js`,
  `${BASE_PATH}/js/supabase.js`,
  `${BASE_PATH}/js/auth.js`,
  `${BASE_PATH}/js/router.js`,
  `${BASE_PATH}/js/app.js`,
  `${BASE_PATH}/js/utils/helpers.js`,
  `${BASE_PATH}/js/utils/dates.js`,
  `${BASE_PATH}/js/components/icons.js`,
  `${BASE_PATH}/js/components/toast.js`,
  `${BASE_PATH}/js/components/modal.js`,
  `${BASE_PATH}/js/components/cards.js`,
  `${BASE_PATH}/js/components/charts.js`,
  `${BASE_PATH}/js/components/tables.js`,
  `${BASE_PATH}/js/components/navbar.js`,
  `${BASE_PATH}/js/components/bottomnav.js`,
  `${BASE_PATH}/js/pages/login.js`,
  `${BASE_PATH}/js/pages/dashboard.js`,
  `${BASE_PATH}/js/pages/passengers.js`,
  `${BASE_PATH}/js/pages/vendors.js`,
  `${BASE_PATH}/js/pages/expenses.js`,
  `${BASE_PATH}/js/pages/reports.js`,
  `${BASE_PATH}/js/pages/settings.js`,
  `${BASE_PATH}/js/pages/logs.js`,
  `${BASE_PATH}/js/pages/notas.js`,
  `${BASE_PATH}/offline.html`
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .catch(err => console.error('Cache install error:', err))
  );
  self.skipWaiting();
});

// Activate - hapus semua cache lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // SKIP cache untuk Supabase API
  if (url.hostname.includes('supabase.co')) {
    return event.respondWith(fetch(event.request));
  }

  // SKIP cache untuk file JS dan CSS (selalu ambil dari network)
  if (event.request.method === 'GET' && (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.html')
  )) {
    return event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }

  // Untuk asset lain (icon, gambar) - cache first
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        if (fetchResponse.status === 200) {
          const clone = fetchResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return fetchResponse;
      });
    }).catch(() => {
      if (event.request.mode === 'navigate') {
        return caches.match('/lincah/offline.html');
      }
    })
  );
});
