const CACHE_NAME = "offline-cache-v2";
const FILES_TO_CACHE = [
    'index.html',
    'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/css/font-awesome.min.css',
    'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/css/style.css',
    'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/css/bootstrap-icons.css',
    'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/css/swiper-bundle.min.css',
    'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/css/style.font.css',
    'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/js/jquery-3.3.1.min.js',
    'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/js/bootstrap.bundle.min.js',
    'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/js/main.js',
    'https://raw.githack.com/ALOSTOURA-TV/taqwim/refs/heads/main/js/app.js'
];

// عند تثبيت Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);  // إضافة الملفات إلى الكاش
        })
    );
});

// عند استلام طلبات من المتصفح
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            // إذا لم يكن هناك اتصال بالإنترنت، يتم إرجاع الملفات من الكاش
            return caches.match(event.request);
        })
    );
});

// تنظيف الكاش عند تحديث الـ Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME]; // قائمة الكاش المسموح به

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);  // حذف الكاش القديم
                    }
                })
            );
        })
    );
});
