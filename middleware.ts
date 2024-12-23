import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


const applyCors = (req: NextRequestWithAuth) => {
  const allowedOrigin = process.env.NEXT_PUBLIC_BASE_URL; 
  const response = NextResponse.next();

  const origin = req.headers.get("origin");
  if (origin === allowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  }
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Content-Type"
  );

  if (req.method === "OPTIONS") {
    return NextResponse.json(null, { status: 200, headers: response.headers });
  }

  return response; 
};

export default withAuth(
  function middleware(request: NextRequestWithAuth) {

    const corsResponse = applyCors(request);
    if (corsResponse) return corsResponse; 

    const { pathname } = request.nextUrl;

    if (!request.nextauth.token) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    if (pathname.startsWith("/dashboard")) {
      if (!!request.nextauth.token && request.nextauth.token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/frontend", request.url));
      }
    }

    if (pathname.startsWith("/frontend")) {
      if (!!request.nextauth.token && request.nextauth.token.role !== "NORMAL_USER") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
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
    "/dashboard/:path*",
    "/frontend/:path*",
  ],
};
