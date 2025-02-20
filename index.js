
let lastTapTime = 0;
const doubleTapDelay = 300; // Time in milliseconds to detect a double tap

// Function to handle touch events
function handleTouch(event) {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTapTime;

  // Check if the time between taps is within the double-tap delay
  if (tapLength < doubleTapDelay && tapLength > 0) {
    // Redirect to the website
    window.location.href = './eilishify'; // Replace with your desired URL
  }

  // Update the last tap time
  lastTapTime = currentTime;
}

// Add touch event listener to the entire document
document.addEventListener('touchend', handleTouch);
    window.addEventListener('dblclick', () => {
        window.location.href = './eilishify'; 
    });

    self.addEventListener('install', (event) => {
        console.log('Service Worker installing.');
      });
      
      self.addEventListener('fetch', (event) => {
        console.log('Fetching:', event.request.url);
      });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service Worker Registered'))
      .catch(err => console.log('Service Worker Failed to Register', err));
  }


  // autoupdate

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('Service Worker registration failed: ', registrationError);
        });
    });
  }

  const CACHE_NAME = 'eilishify-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/audio',
  '/index.js',
  '/icon.png',
  '/songs.json',
  // Add other assets here
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response; // Serve from cache
          }
          return fetch(event.request); // Fetch from network
        })
    );
  });


  self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
  
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName); // Delete old caches
            }
          })
        );
      })
    );
  });