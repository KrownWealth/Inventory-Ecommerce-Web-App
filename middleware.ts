import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"

export async function middleware(req: any){
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({req, res})

  // get current authenticated user
  const {data: {user}} = await supabase.auth.getUser();

  //check if there's a user i.e authenticated redirect them to product page
  if(user && req.nextUrl.pathname === '/auth/login'){
    return NextResponse.redirect(new URL('/', req.url))
  }

  //check if there's no user i.e not authenticated redirect them to authentication page which is homepage
  if(!user && req.nextUrl.pathname !== '/auth/login'){
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res;
}

//Matchers where you want the middle ware to run

export const config = {
  matcher: [
    '/', '/watch-list', '/auth', '/auth/', '/admin',
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ]
}