import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/sign-in', '/sign-up'], // allow public access to these
  ignoredRoutes: ['/api/webhook'], // if needed

  // Optional: custom behavior per route
  afterAuth(auth, req, evt) {
    // Example: block access to /products if not signed in
    if (!auth.userId && req.nextUrl.pathname.startsWith('/products')) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return Response.redirect(signInUrl);
    }
  },
});

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
