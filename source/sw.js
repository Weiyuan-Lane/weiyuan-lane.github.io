importScripts('/pwa/polyfills/serviceworker-cache.js');

const VERSION = '0.0.1';
const CACHE_NAME = 'CACHE_CATS_'+ VERSION
const CACHE_ROUTES = [
  '/',
  '/talks/',
  '/articles/',
]


function Origin(props) {
  const protocol = props.protocol
  const host = props.host

  if (!protocol || !host) {
    throw new Error('class WhiteListedCacheDomains cannot be constructed with protocol: ' + protocol + ' ' + ', host: ' + host)
  }

  this.protocol = protocol
  this.host = host

  this.matchOriginOf = function(url) {
    return url.startsWith(this.protocol + '//' + this.host)
  }
}

const whitelistedCacheOrigins = [
  new Origin({ protocol: 'https:', host: 'fonts.googleapis.com' }),
  new Origin({ protocol: 'https:', host: 'fonts.gstatic.com' }),
  new Origin({ 
    protocol: self.location.protocol, 
    host: self.location.host 
  }),
]

function isCacheable(url) {
  return whitelistedCacheOrigins.some(function(origin) {
    return origin.matchOriginOf(url)
  })
}

self.addEventListener('install', function(event) {
  // Perform install steps
  // AND CACHE ALL THE REQUIRED PATHS
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_ROUTES);
    })
  );
});


self.addEventListener('fetch', function(event) { 
  event.respondWith(caches.match(event.request).then(function(cachedResponse) {
    // Cache hit - return response
    if (cachedResponse) {
      return cachedResponse;
    }

    // Miss? Fetch it
    return fetch(event.request).then(function(fetchedResponse) {
      // Check if we received a valid response
      if(!fetchedResponse || fetchedResponse.status >= 300) {
        return fetchedResponse;
      }

      // ONLY CACHE IF WE WANT TO CACHE IT
      if (isCacheable(event.request.url)) {
        const responseToCache = fetchedResponse.clone();
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
          return fetchedResponse;
        });
      }

      return fetchedResponse;
    })
  }))
});
