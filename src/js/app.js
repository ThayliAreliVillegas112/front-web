
/*console.log('APPJS');
const url = window.location.href;
const API = `http://localhost:3000/api`;
let swLocation = 'front-web/src/service-worker.js';
if(navigator.serviceWorker){
    // Register the service worker
    if(url.includes('localhost') || url.includes('127.0.0.1')){
        swLocation = '/service-worker.js.js';
    }

    // navigator.serviceWorker.register('sw.js');
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register(swLocation).then((reg)=>{
            //code
        })
    })
}  */
console.log('APPJS');
const url = window.location.href;
const API = http://localhost:3000/api;
let swLocation = '/service-worker.js';
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

