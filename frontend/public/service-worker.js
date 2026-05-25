const CACHE_NAME = 'ipc-school-v1';
const RUNTIME_CACHE = 'ipc-school-runtime';
const API_CACHE = 'ipc-school-api';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon.svg'
];

// Cache config - what to cache and for how long
const CACHE_CONFIG = {
  api: 5 * 60 * 1000,        // API: 5 minutes
  static: 7 * 24 * 60 * 60 * 1000, // Static: 7 days
  image: 30 * 24 * 60 * 60 * 1000  // Images: 30 days
};

// Helper: fetch with timeout
const fetchWithTimeout = (url, timeout = 3000) => {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Network timeout')), timeout)
    )
  ]);
};

// Helper: check if cache entry is expired
const isCacheExpired = (cacheTime, maxAge) => {
  return Date.now() - cacheTime > maxAge;
};

// Helper: get cached response with timestamp
const getCachedWithTime = async (cache, request) => {
  const response = await cache.match(request);
  if (!response) return null;
  
  try {
    const data = await response.clone().json();
    return { response, data, timestamp: data._cached_at };
  } catch {
    return { response, timestamp: 0 };
  }
};

// Install event - cache only essential assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching core assets');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Fetch event - smart strategy based on request type
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isAPI = url.pathname.includes('/api/');
  const isImage = event.request.destination === 'image';
  
  // API calls: Network-first with smart timeout
  if (isAPI) {
    event.respondWith(
      fetchWithTimeout(event.request, 4000)  // 4s timeout for API
        .then((response) => {
          if (response && response.ok && event.request.method === 'GET') {
            // Clone and add timestamp for expiry checking (only for GET requests)
            const responseToCache = response.clone();
            responseToCache.json().then((data) => {
              data._cached_at = Date.now();
              const cachePromise = caches.open(API_CACHE)
                .then((cache) => {
                  const cachedResponse = new Response(JSON.stringify(data), {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                  });
                  return cache.put(event.request, cachedResponse);
                });
            }).catch(() => {
              // If JSON parsing fails, just cache the response as-is
              caches.open(API_CACHE).then((cache) => cache.put(event.request, responseToCache));
            });
          }
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(event.request, { cacheName: API_CACHE })
            .then((cached) => {
              if (cached) {
                console.log('[SW] Using cached API (network failed):', event.request.url);
                return cached;
              }
              // No cache available
              return new Response(
                JSON.stringify({ error: 'Service unavailable', offline: true }),
                {
                  status: 503,
                  headers: { 'Content-Type': 'application/json' }
                }
              );
            });
        })
    );
  }
  // Images: Cache-first, update in background
  else if (isImage) {
    event.respondWith(
      caches.match(event.request)
        .then((cached) => {
          // Return cached image immediately
          if (cached) {
            // Update cache in background (stale-while-revalidate)
            fetchWithTimeout(event.request, 5000)
              .then((response) => {
                if (response && response.ok) {
                  caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, response.clone()));
                }
              })
              .catch(() => {});
            return cached;
          }
          // Not in cache, fetch from network
          return fetchWithTimeout(event.request, 5000)
            .then((response) => {
              if (response && response.ok) {
                const cache = caches.open(RUNTIME_CACHE);
                cache.then((c) => c.put(event.request, response.clone()));
              }
              return response;
            })
            .catch(() => {
              return new Response('Image not available', { status: 404 });
            });
        })
    );
  }
  // Static assets (JS, CSS, etc): Cache-first
  else {
    event.respondWith(
      caches.match(event.request)
        .then((cached) => {
          if (cached) {
            return cached;
          }
          return fetchWithTimeout(event.request, 8000)
            .then((response) => {
              if (!response || response.status !== 200 || response.type === 'error') {
                return response;
              }
              const resClone = response.clone();
              caches.open(RUNTIME_CACHE)
                .then((cache) => cache.put(event.request, resClone));
              return response;
            })
            .catch(() => {
              // Fallback to cached version if available
              return caches.match(event.request)
                .then((fallback) => fallback || caches.match('/'));
            });
        })
    );
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE && cacheName !== API_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Periodic cleanup of API cache (clear every 1 hour)
setInterval(() => {
  caches.open(API_CACHE).then((cache) => {
    cache.keys().then((requests) => {
      requests.forEach((request) => {
        cache.match(request).then((response) => {
          if (response) {
            try {
              response.clone().json().then((data) => {
                if (data._cached_at && isCacheExpired(data._cached_at, CACHE_CONFIG.api)) {
                  console.log('[SW] Removing expired API cache:', request.url);
                  cache.delete(request);
                }
              });
            } catch { }
          }
        });
      });
    });
  });
}, 60 * 60 * 1000);