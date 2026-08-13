export default async function middleware(request) {
  const path=new URL(request.url).pathname;
  if(path==='/layout-air-v79.css'){
    const url=new URL('/layout-air-v80.css',request.url);
    return Response.redirect(url,307);
  }
  if(path==='/'){
    const url=new URL('/index.html',request.url);
    const response=await fetch(url,{headers:request.headers});
    let html=await response.text();
    html=html.replace('</body>','<script src="/ui-patch-v84.js?v=20260813-84"></script><script src="/ui-patch-v85.js?v=20260813-85"></script><script src="/ui-patch-v87.js?v=20260813-87"></script><script src="/ui-patch-v88.js?v=20260814-92"></script></body>');
    const headers=new Headers(response.headers);
    headers.set('content-type','text/html; charset=utf-8');
    headers.set('cache-control','no-cache');
    return new Response(html,{status:response.status,headers});
  }
}

export const config={matcher:['/','/layout-air-v79.css']};
