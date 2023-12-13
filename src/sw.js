console.log('SERVICEWORKER');
//App shell son todos aquellos recursos propios de la aplicación 
const STATIC='staticv1';
const INMUTABLE='inmutablev1';
const DYNAMIC='dynamicv1';
const STATIC_LIMIT=15;
const DYNAMIC_LIMIT=30;
const APP_SHELL=[
    '/',
    '/components/login/index.js',
    'js/app.js',
    ];
//Todos aquellos recursos que nunca cambian, nuestros o externos 
const APP_SHELL_INMUTABLE=[
'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js'
]

self.addEventListener('install',(e)=>{
    console.log('instalado')
    //e.skipWaiting()
    const staticCache=caches.open(STATIC).then((cache)=>{
        cache.addAll(APP_SHELL);
    });
    const inmutableCache=caches.open(INMUTABLE).then((cache)=>{
        cache.addAll(APP_SHELL_INMUTABLE);
    });
    e.waitUntil(Promise.all([staticCache,inmutableCache]));
})



self.addEventListener('activate',(e)=>{
    console.log('Activado')
})


self.addEventListener('fetch',(e)=>{
    

})





self.addEventListener('fetch', (e) => {
  
     const source= fetch(e.request).then(res => {
          if (e.request.url.includes('/index.html')) {
              caches.open(DYNAMIC).then(cache => {
                  cache.put(e.request, res.clone());
              });
          }
          return res;
      }).catch(err => {
          return caches.match(e.request).then(cachedResponse => {
              if (cachedResponse) {
                  return cachedResponse;
              } else {
                  return caches.match('pages/offline.html');
              }
          });
      })
    e.respondWith(source);
});
///Users/lozano/Desktop/tienda-frontend/src/pages/offline.html