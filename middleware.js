export default async function middleware(request){
  const url=new URL('/index.html',request.url);
  const response=await fetch(url,{headers:request.headers});
  let html=await response.text();
  html=html.replace('</body>','<script src="/ui-patch-v89.js?v=20260814-89"></script></body>');
  const headers=new Headers(response.headers);
  headers.set('content-type','text/html; charset=utf-8');
  headers.set('cache-control','no-cache');
  return new Response(html,{status:response.status,headers});
}

export const config={matcher:'/'};
