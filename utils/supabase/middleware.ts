import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function updateSession(request: any) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // get current authenticated user
  await supabase.auth.getUser()

  //check if there's a user i.e authenticated redirect them to product page
  // if(user && req.nextUrl.pathname === '/auth/login'){
  //   return NextResponse.redirect(new URL('/', req.url))
  // }

  // //check if there's no user i.e not authenticated redirect them to authentication page which is homepage
  // if(!user && req.nextUrl.pathname !== '/auth/login'){
  //   return NextResponse.redirect(new URL('/', req.url))
  // }

  return supabaseResponse
}