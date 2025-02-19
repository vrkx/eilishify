

    window.addEventListener('dblclick', () => {
        window.location.href = './eilishify.html'; 
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
