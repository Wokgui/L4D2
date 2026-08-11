const CACHE="catalogue-l4d2-20260811-73";
const SHELL=["/","/app.js?v=20260811-53","/polish.css?v=20260811-72","/bootstrap-data.js?v=20260810-3","/campaign-icon.jpg","/l4d2-final-192-v52.png","/l4d2-maskable-512-v53.png","/steam-icon.png","/manifest.webmanifest?v=20260811-72","/cloud-backup.js?v=2","/vendor/supabase/supabase.js?v=1"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;}).catch(()=>caches.match(event.request).then(hit=>hit||caches.match("/"))))});
