// Este código opcional se utiliza para registrar un service worker.
// register() no se llama de forma predeterminada.

// Esto permite que la aplicación cargue más rápido en visitas posteriores en producción y le proporciona
// capacidades sin conexión. Sin embargo, también significa que los desarrolladores (y usuarios)
// solo verán actualizaciones implementadas en visitas posteriores a una página, después de que todas las pestañas existentes
// en la página se hayan cerrado, ya que los recursos en caché previamente se actualizan en segundo plano.

// Para obtener más información sobre los beneficios de este modelo e instrucciones sobre cómo
// participar, lee https://cra.link/PWA
const CACHE_NAME = "mi-cache";
const STATIC_ASSETS = [
  "/",
  "/assets/components",
  "/index.html",
  "/css/style.css",
  "/js/main.js",
  "/images/logo.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el recurso está en caché, lo devuelve. Si no, lo solicita a la red.
      return response || fetch(event.request);
    })
  );
});

const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      // [::1] es la dirección localhost de IPv6.
      window.location.hostname === "[::1]" ||
      // 127.0.0.0/8 se consideran localhost para IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  
  function register(config) {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      // El constructor de URL está disponible en todos los navegadores que admiten SW.
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        // Nuestro service worker no funcionará si PUBLIC_URL está en un origen diferente
        // al que se sirve nuestra página. Esto podría suceder si se usa un CDN para
        // servir activos; consulta https://github.com/facebook/create-react-app/issues/2374
        return;
      }
  
      window.addEventListener("load", () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // Esto se está ejecutando en localhost. Verifiquemos si aún existe un service worker o no.
          checkValidServiceWorker(swUrl, config);
  
          // Agrega algunos registros adicionales para localhost, dirigiendo a los desarrolladores a la
          // documentación de service worker/PWA.
          navigator.serviceWorker.ready.then(() => {
            console.log(
              "Esta aplicación web se está sirviendo primero en caché por un service " +
                "worker. Para obtener más información, visita https://cra.link/PWA"
            );
          });
        } else {
          // No es localhost. Solo registra el service worker.
          registerValidSW(swUrl, config);
        }
      });
    }
  }
  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile.
    event.preventDefault();
    console.log('👍', 'beforeinstallprompt', event);
  
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
  
    // Find the element by ID
    const divInstall = document.getElementById('tuIdDeDivInstall'); // Reemplaza 'tuIdDeDivInstall' con el ID real de tu elemento div
  
    // Check if the element is found before trying to access its classList
    if (divInstall) {
      // Remove the 'hidden' class from the install button container.
      divInstall.classList.toggle('hidden', false);
    } else {
      console.error('Element with ID "tuIdDeDivInstall" not found.');
    }
  });
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // En este punto, el contenido precache actualizado ha sido recuperado,
                // pero el service worker anterior seguirá sirviendo el contenido anterior
                // hasta que se cierren todas las pestañas del cliente.
                console.log(
                  "Hay nuevo contenido disponible y se utilizará cuando todas las " +
                    "pestañas para esta página se cierren. Consulta https://cra.link/PWA."
                );
  
                // Ejecuta la devolución de llamada
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                // En este punto, todo ha sido precacheado.
                // Es el momento perfecto para mostrar un mensaje
                // "El contenido está en caché para su uso sin conexión".
                console.log("El contenido está en caché para su uso sin conexión.");
  
                // Ejecuta la devolución de llamada
                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error("Error durante el registro del service worker:", error);
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    // Verifica si se puede encontrar el service worker. Si no se puede, recarga la página.
    fetch(swUrl, {
      headers: { "Service-Worker": "script" },
    })
      .then((response) => {
        // Asegura que el service worker exista y que realmente estemos obteniendo un archivo JS.
        const contentType = response.headers.get("content-type");
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf("javascript") === -1)
        ) {
          // No se encontró el service worker. Probablemente sea una aplicación diferente. Recarga la página.
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Se encontró el service worker. Continuar como de costumbre.
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log(
          "No se encontró conexión a Internet. La aplicación se está ejecutando en modo sin conexión."
        );
      });
  }
  
  function unregister() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  
  // Exportar funciones
  export { register, unregister };
  