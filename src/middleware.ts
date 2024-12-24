import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const studentRoutes = ['/student/requests', '/student/available-courses'];
const teacherRoutes = ['/my-courses'];

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('access')
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/signup')

  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Role-based route protection
  const userRole = request.cookies.get('user_role')?.value

  if (userRole === 'student' && teacherRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (userRole === 'teacher' && studentRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 