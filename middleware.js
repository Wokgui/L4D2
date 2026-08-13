export default function middleware(request) {
  const url = new URL('/layout-air-v80.css', request.url);
  return Response.redirect(url, 307);
}

export const config = {
  matcher: '/layout-air-v79.css',
};
