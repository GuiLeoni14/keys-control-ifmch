import { auth } from './auth'

const PUBLIC_ROUTE_PATTERNS = [
  /^\/$/, // "/"
  /^\/events$/, // "/events"
  /^\/events\/[^/]+$/, // "/events/:id" (qualquer valor após /events/)
  /^\/icons\/.*$/,
  /^\/images\/.*$/,
]

const ROOT = '/'

export default auth((req) => {
  const { nextUrl } = req

  const isAuthenticated = !!req.auth

  const pathname = nextUrl.pathname
  const isPublicRoute = PUBLIC_ROUTE_PATTERNS.some((pattern) =>
    pattern.test(pathname),
  )

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(ROOT, nextUrl))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
