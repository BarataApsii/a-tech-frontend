import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

/**
 * Authentication and Authorization Middleware
 * Protects routes and handles redirects based on authentication state
 * 
 * Protected Routes:
 * - /admin/* - Requires authenticated admin user
 * - /login - Redirects authenticated users to admin dashboard
 */
export default withAuth(
  async function middleware(req) {
    // Get authentication token and determine user state
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/login")
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin")

    // Redirect authenticated users away from login page
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/admin/news", req.url))
    }

    // Redirect unauthenticated users to login
    if (!isAuth && isAdminPage) {
      const from = req.nextUrl.pathname + req.nextUrl.search
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(from)}`, req.url)
      )
    }

    // Redirect non-admin users away from admin pages
    if (isAuth && isAdminPage && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      // Always run middleware regardless of auth state
      authorized: () => true,
    },
  }
)

/**
 * Route matcher configuration
 * Specifies which routes the middleware should run on
 */
export const config = {
  matcher: ["/admin/:path*", "/login"],
} 