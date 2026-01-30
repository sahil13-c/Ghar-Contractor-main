import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Only run this middleware for admin routes (excluding login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    try {
      const supabase = await createServerClient()
      const { data: { user }, error } = await supabase.auth.getUser()

      // If no user or error, redirect to login
      if (error || !user) {
        const loginUrl = new URL('/admin/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
      }

      // User is authenticated, allow access
      return NextResponse.next()
    } catch (error) {
      // If any error occurs, redirect to login
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // For login page, if user is already authenticated, redirect to dashboard
  if (pathname === '/admin/login') {
    try {
      const supabase = await createServerClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
    } catch (error) {
      // If error checking auth, continue to login page
    }
  }

  return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
  matcher: ['/admin/:path*']
}