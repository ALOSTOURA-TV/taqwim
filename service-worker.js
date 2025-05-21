const CACHE_NAME = "static-cache-v1";

const ASSETS_TO_CACHE = [
  'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/css/font-awesome.min.css',
  'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/css/style.css',
  'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/css/bootstrap-icons.css',
  'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/css/swiper-bundle.min.css',
  'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/css/style.font.css',
  'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/js/jquery-3.3.1.min.js',
  'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/js/bootstrap.bundle.min.js',
  'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/js/main.js',
  'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/js/app.js',
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
