import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;

    if(!request.nextauth.token){
      return NextResponse.redirect(new URL('/auth/sign-in', request.url) )
    }

    // Admin route protection
    if (pathname.startsWith('/dashboard')) {
      if (!!request.nextauth.token && request.nextauth.token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/frontend', request.url)); 
      }
    }

    // User route protection
    if (pathname.startsWith('/frontend')) {
      if (!!request.nextauth.token && request.nextauth.token.role !== 'NORMAL_USER') {
        return NextResponse.redirect(new URL('/dashbaord', request.url)); 
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
  matcher: [
    '/dashboard/:path*',
    '/frontend/:path*',  
  ],
};
