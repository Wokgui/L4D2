const CACHE="catalogue-l4d2-20260815-95";
const SHELL=["/","/app.js?v=20260813-82","/polish.css?v=20260813-81","/layout-air-v80.css?v=20260814-95","/bootstrap-data.js?v=20260810-3","/ui-patch-v88.js?v=20260814-97","/ui-patch-v91.js?v=20260815-104","/ui-patch-v93.js?v=20260815-5","/campaign-icon.jpg","/welcome-cover.png","/l4d2-final-192-v52.png","/l4d2-maskable-512-v53.png?v=95","/steam-icon.png","/manifest.webmanifest?v=20260815-95","/cloud-backup.js?v=3","/vendor/supabase/supabase.js?v=1"];
const CACHE_FIRST_PATHS=new Set(["/welcome-cover.png","/campaign-icon.jpg","/l4d2-final-192-v52.png","/l4d2-maskable-512-v53.png","/steam-icon.png"]);

self.addEventListener("install",event=>event.waitUntil(
  caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())
));

self.addEventListener("activate",event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())
));

async function remember(request,response){
  if(response&&response.ok){
    const cache=await caches.open(CACHE);
    await cache.put(request,response.clone());
  }
  return response;
}

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);

  if(url.origin===self.location.origin&&CACHE_FIRST_PATHS.has(url.pathname)){
    event.respondWith(
      caches.match(event.request,{ignoreSearch:true}).then(hit=>hit||fetch(event.request,{cache:"no-store"}).then(response=>remember(event.request,response)))
    );
    return;
  }

  event.respondWith(
    fetch(event.request,{cache:"no-store"})
      .then(response=>remember(event.request,response))
      .catch(()=>caches.match(event.request).then(hit=>hit||caches.match("/")))
  );
});
