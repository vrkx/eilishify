
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
