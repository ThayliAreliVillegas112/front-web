
console.log('APPJS');
const url = window.location.href;
const API = `https://localhost:3000/api`;
let swLocation = '/src/service-worker.js';
if(navigator.serviceWorker){
    // Register the service worker
    if(url.includes('localhost') || url.includes('127.0.0.1')){
        swLocation = '/service-worker.js';
    }

    // navigator.serviceWorker.register('sw.js');
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register(swLocation).then((reg)=>{
            //code
        })
    })
} 

