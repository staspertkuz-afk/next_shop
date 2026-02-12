import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Список путей, требующих регистрации
const protectedRoutes = ['/chats', '/profile', '/create_post', 'posts']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const isProtectedRoute = protectedRoutes.some((route) => 
    pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    const authToken = request.cookies.get('token')?.value

    if (!authToken) {
      return NextResponse.redirect('reg')
    }
  }
  return NextResponse.next()
}

// Опционально: Настройка Matcher для оптимизации
export const config = {
  matcher: ['/chats', '/profile/:path*', '/create_post/:path*','/posts/:path*' ],
}