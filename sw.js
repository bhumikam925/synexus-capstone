// ======================================================
// SYNEXUS SERVICE WORKER - DAY 39
// ======================================================

const CACHE_NAME = "platform-cache-v2";

const CORE_ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./main.js"
];


// ======================================================
// INSTALL EVENT
// ======================================================

self.addEventListener(
    "install",
    function (event) {

        console.log(
            "Service Worker: Installing..."
        );

        event.waitUntil(

            caches.open(CACHE_NAME)
                .then(function (cache) {

                    return cache.addAll(
                        CORE_ASSETS
                    );

                })

        );

    }
);


// ======================================================
// ACTIVATE EVENT - BONUS
// ======================================================

self.addEventListener(
    "activate",
    function (event) {

        console.log(
            "Service Worker: Activated."
        );

        event.waitUntil(

            caches.keys()
                .then(function (cacheNames) {

                    return Promise.all(

                        cacheNames.map(
                            function (cacheName) {

                                if (
                                    cacheName !== CACHE_NAME
                                ) {

                                    return caches.delete(
                                        cacheName
                                    );

                                }

                            }
                        )

                    );

                })

        );

    }
);


// ======================================================
// FETCH EVENT - CACHE FIRST
// ======================================================

self.addEventListener(
    "fetch",
    function (event) {

        event.respondWith(

            caches.match(
                event.request
            )
            .then(function (cachedResponse) {

                if (cachedResponse) {

                    return cachedResponse;

                }

                return fetch(
                    event.request
                );

            })

        );

    }
);
