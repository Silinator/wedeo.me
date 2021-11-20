/*
  Documentation:
  https://developers.google.com/web/fundamentals/primers/service-workers
  https://www.youtube.com/watch?v=7jsg1Mb7PB4
  https://www.youtube.com/watch?v=VEjRhRArVR4 ( make sure it's in the root directory 3:24 )
*/

const cacheName = "app-wedeo-me-cache-v1";
const filesToCache = [
  /* javascript */
  'js/main.js',
  /* manifest */
  'manifest.json',
  /* images */
  'img/icons/logo.svg',
  'img/favicon/favicon.ico',
  'img/favicon/android-icon-36x36.png',
  'img/favicon/android-icon-48x48.png',
  'img/favicon/android-icon-72x72.png',
  'img/favicon/android-icon-96x96.png',
  'img/favicon/android-icon-144x144.png',
  'img/favicon/android-icon-192x192.png',
  'img/favicon/apple-icon.png',
  'img/favicon/apple-icon-57x57.png',
  'img/favicon/apple-icon-60x60.png',
  'img/favicon/apple-icon-72x72.png',
  'img/favicon/apple-icon-76x76.png',
  'img/favicon/apple-icon-114x114.png',
  'img/favicon/apple-icon-120x120.png',
  'img/favicon/apple-icon-144x144.png',
  'img/favicon/apple-icon-152x152.png',
  'img/favicon/apple-icon-180x180.png',
  'img/favicon/apple-icon-precomposed.png',
  'img/favicon/favicon-16x16.png',
  'img/favicon/favicon-32x32.png',
  'img/favicon/favicon-96x96.png',
  'img/favicon/ms-icon-70x70.png',
  'img/favicon/ms-icon-144x144.png',
  'img/favicon/ms-icon-150x150.png',
  'img/favicon/ms-icon-310x310.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then( function(cache) {
      return cache.addAll(filesToCache);
    }).then( function(cache) {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all( keyList.map(key => {
        if( key !== cacheName ) {
          return caches.delete(key);
        }
      }));
    }));
  return self.clients.claim();
});

self.addEventListener( 'fetch', function(event) {
  console.log( 'fetch' );

  event.respondWith(
    caches.match(event.request).then( function(response) {
      return response || fetch(event.request);
    })
  );
});