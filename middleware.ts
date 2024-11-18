import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;

    // If user is not authenticated, redirect to the sign-in page
    if (!request.nextauth.token) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }

    const userRole = request.nextauth.token.role;

    // Admin route protection
    if (pathname.startsWith('/dashboard')) {
      if (userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/frontend', request.url));
      }
    }

    // User route protection
    if (pathname.startsWith('/frontend')) {
      if (userRole !== 'NORMAL_USER') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, 
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/frontend/:path*'],
};
