import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/sign-in', '/sign-up'],
  ignoredRoutes: ['/api/webhook'], 

  afterAuth(auth, req, evt) {
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
