const CACHE_NAME = 'offline-cache-v1'; // اسم ذاكرة التخزين المؤقت
const assetsToCache = [
    '/', // الصفحة الرئيسية
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

// ✅ تثبيت Service Worker وتخزين الملفات في الكاش
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📂 يتم تخزين الملفات في الكاش...');
                return cache.addAll(assetsToCache);
            })
            .then(() => self.skipWaiting())
            .catch(error => console.error('❌ فشل تخزين الملفات:', error))
    );
});

// ✅ تفعيل Service Worker وتنظيف الكاش القديم
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('🗑️ حذف الكاش القديم:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// ✅ استرجاع الملفات من الكاش عند عدم وجود إنترنت
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        }).catch(() => {
            console.warn('⚠️ لم يتم العثور على الملف في الكاش:', event.request.url);
        })
    );
});
