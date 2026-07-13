const CACHE_NAME = 'gamification-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-gamification-data') {
    event.waitUntil(syncGamificationData());
  }
});

async function syncGamificationData() {
  try {
    // Attempt to fetch latest gamification data
    const response = await fetch('/api/gamification/leaderboard');
    if (response.ok) {
      const data = await response.json();
      const cache = await caches.open(CACHE_NAME);
      // Cache the response locally
      await cache.put('/api/gamification/leaderboard', new Response(JSON.stringify(data)));
      console.log('Background sync: Gamification data cached successfully.');
      
      // Notify clients
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({ type: 'GAMIFICATION_SYNCED', payload: data });
      });
    }
  } catch (error) {
    console.error('Background sync failed:', error);
    throw error; // Let the browser retry later
  }
}

// Intercept fetch requests to return cached gamification data if offline
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/gamification/leaderboard')) {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match('/api/gamification/leaderboard');
        if (cachedResponse) {
          return cachedResponse;
        }
        return new Response(JSON.stringify({ error: 'Offline and no cached data available' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
  }
});
