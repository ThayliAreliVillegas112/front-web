
console.log('APPJS');
const url = window.location.href;
const API = `http://localhost:3000/api`;
let swLocation = '/src/sw.js';
if(navigator.serviceWorker){
    // Register the service worker
    if(url.includes('localhost') || url.includes('127.0.0.1')){
        swLocation = '/sw.js';
    }

    // navigator.serviceWorker.register('sw.js');
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register(swLocation).then((reg)=>{
            //code
        })
    })
} 

