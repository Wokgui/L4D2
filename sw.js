const CACHE="catalogue-l4d2-20260913-122";
const SHELL=["/","/app.js?v=20260813-82","/polish.css?v=20260823-99","/layout-air-v80.css?v=20260825-108","/bootstrap-data.js?v=20260810-3","/ui-patch-v84.js?v=20260820-92","/ui-patch-v88.js?v=20260814-97","/ui-patch-v92.js?v=20260823-99","/ui-patch-v93.js?v=20260815-5","/ui-patch-v96.js?v=20260823-99","/ui-patch-v97.js?v=20260823-1","/ui-patch-v98.js?v=20260823-1","/campaign-icon.jpg","/welcome-cover.png","/l4d2-final-192-v52.png","/l4d2-splash-safe-512-v101.png?v=20260823-101","/l4d2-maskable-512-v53.png?v=20260823-105","/steam-icon-user.png","/manifest.webmanifest?v=20260823-105","/cloud-backup.js?v=3","/secure-github-save.js?v=1","/vendor/supabase/supabase.js?v=1"];
const STATIC_DESTINATIONS=new Set(["style","script","image","font","manifest"]);
const LEGACY_STEAM_ICONS=new Set(["/steam-icon.png","/steam-icon-fast.svg"]);
const sameOrigin=request=>new URL(request.url).origin===self.location.origin;
const cacheResponse=(request,response)=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));}return response;};

self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  const previous=keys.filter(key=>key!==CACHE);
  const hadPreviousAppCache=previous.some(key=>key.startsWith("catalogue-l4d2-"));
  await Promise.all(previous.map(key=>caches.delete(key)));
  await self.clients.claim();
  if(hadPreviousAppCache){
    const windows=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    await Promise.all(windows.map(client=>client.navigate(client.url).catch(()=>null)));
  }
})()));
self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;

  if(sameOrigin(request)&&LEGACY_STEAM_ICONS.has(new URL(request.url).pathname)){
    const target=new Request(new URL("/steam-icon-user.png",self.location.origin));
    event.respondWith(
      caches.match(target).then(hit=>hit||fetch(target,{cache:"no-store"}).then(response=>cacheResponse(target,response)))
    );
    return;
  }

  if(sameOrigin(request)&&STATIC_DESTINATIONS.has(request.destination)){
    event.respondWith(
      caches.match(request).then(hit=>hit||fetch(request,{cache:"no-store"}).then(response=>cacheResponse(request,response)))
    );
    return;
  }

  event.respondWith(
    fetch(request,{cache:"no-store"})
      .then(response=>cacheResponse(request,response))
      .catch(()=>caches.match(request).then(hit=>hit||caches.match("/")))
  );
});
