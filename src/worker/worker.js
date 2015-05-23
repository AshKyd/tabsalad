require('serviceworker-cache-polyfill');
// importScripts('cache.js');

var version = 'v1';
var staticCacheName = 'tabsalad-static-' + version;

self.addEventListener('install', function(event) {
    // pre cache a load of stuff:
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                '/',
                '/style.css',
                '/index.js',
            ]);
        })
    )
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if(response){
                console.log('cache hit');
            }
            return response || fetch(event.request);
        })
    );
});

// Clear out old caches..
var expectedCaches = [
    staticCacheName
];

self.onactivate = function(event) {
    if (self.clients && clients.claim) {
        clients.claim();
    }

    // remove caches beginning "trains-" that aren't in
    // expectedCaches
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (/^tabsalad-/.test(cacheName) && expectedCaches.indexOf(cacheName) == -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
};
