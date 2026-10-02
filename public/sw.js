// Service Worker for Nihongo Spark PWA Offline Support & Habit Alarm
const CACHE_NAME = 'nihongo-spark-v2';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event (Stale-while-revalidate strategy)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Handle same origin requests
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});

// Web Push & Habit Streak Alarm Notifications
self.addEventListener('push', (event) => {
  let data = {
    title: '🔥 Streak Nihongo Spark Kamu!',
    body: 'Jangan biarkan streak belajarmu putus hari ini! Selesaikan 5 kartu SRS sekarang.',
    icon: '/favicon.svg'
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [200, 100, 200],
    data: { url: '/' }
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification click to bring app into focus
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('/');
      }
    })
  );
});

// Habit Alarm message handler from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_HABIT_ALARM') {
    const { title, body, delayMs } = event.data;
    setTimeout(() => {
      self.registration.showNotification(title || '🔥 Streak Belajar Berisiko Putus!', {
        body: body || 'Sudah jam 20:00! Luangkan waktu 3 menit untuk mengulang kanji hari ini.',
        icon: '/favicon.svg',
        vibrate: [150, 50, 150]
      });
    }, delayMs || 1000);
  }
});
