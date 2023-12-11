// importScripts('/pwa/polyfills/serviceworker-cache.js');

// const VERSION = '0.0.6';
// const CACHE_NAME = 'CACHE_CATS_'+ VERSION
// const CACHE_ROUTES = [
//   '/',
// ]
// console.log('Cache at', CACHE_NAME)

// function Origin(props) {
//   const protocol = props.protocol
//   const host = props.host

//   if (!protocol || !host) {
//     throw new Error('class WhiteListedCacheDomains cannot be constructed with protocol: ' + protocol + ' ' + ', host: ' + host)
//   }

//   this.protocol = protocol
//   this.host = host

//   this.matchOriginOf = function(url) {
//     return url.startsWith(this.protocol + '//' + this.host)
//   }
// }

// const whitelistedCacheOrigins = [
//   new Origin({ protocol: 'https:', host: 'fonts.googleapis.com' }),
//   new Origin({ protocol: 'https:', host: 'fonts.gstatic.com' }),
//   new Origin({ 
//     protocol: self.location.protocol, 
//     host: self.location.host 
//   }),
// ]

// function isCacheable(url) {
//   return whitelistedCacheOrigins.some(function(origin) {
//     return origin.matchOriginOf(url)
//   })
// }

// self.addEventListener('install', function(event) {
//   // Perform install steps
//   // AND CACHE ALL THE REQUIRED PATHS
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       return cache.addAll(CACHE_ROUTES);
//     })
//   );
// });

// function cachePromise(request, response) {
//   return caches.open(CACHE_NAME).then(function(cache) {
//     const responseToCache = response.clone();
//     cache.put(request, responseToCache);
//     return response;
//   })
// }

// function retrievePromise(request, response) {
//   return caches.open(CACHE_NAME).then(function(cache) {
//     return cache.match(request).then(function(cachedResponse) {
//       // Cache hit - return response
//       if (cachedResponse) {
//         return cachedResponse
//       }

//       // Cache miss - return response
//       return response
//     })
//   })
// }

// For each fetched request
// self.addEventListener('fetch', function(event) {
//   const request = event.request;
//   event.respondWith(fetch(request).then(function(fetchedResponse) {
//     // Redirects - just return
//     if (fetchedResponse && fetchedResponse.status >= 300 && fetchedResponse.status <= 399) {
//       return fetchedResponse;
//     }

//     // Valid response - cache
//     if (isCacheable(request.url, fetchedResponse) && fetchedResponse &&
//         fetchedResponse.status >= 200 && fetchedResponse.status <= 299) {
//       return cachePromise(request, fetchedResponse);
//     }

//     // Invalid responses - failover cache retrieve
//     if (fetchedResponse && fetchedResponse.status >= 400 && fetchedResponse.status <= 599) {
//       return retrievePromise(request, fetchedResponse);
//     }

//     // If cannot evaluate to anything, return fetched response
//     return fetchedResponse;
//   }).catch(function(errResponse) {
//     return retrievePromise(request, errResponse);
//   }))
// })
