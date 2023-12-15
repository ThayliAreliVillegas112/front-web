const url = window.location.href;

// Determine protocol based on environment
const protocol =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_PROTOCOL_PROD
    : process.env.REACT_APP_API_PROTOCOL_DEV;

// Construct API base URL
const API = `${protocol}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_API_CONTEXT}`;

let swLocation = '/src/service-worker.js';

if (navigator.serviceWorker) {
  // Register the service worker
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    swLocation = '/service-worker.js';
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register(swLocation).then((reg) => {
      //code
    });
  });
}
