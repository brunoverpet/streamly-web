import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Récupérer le cookie
  const token = request.cookies.get('adonis-session')?.value

  // Si le cookie n'existe pas, redirige vers login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Sinon, laisse passer la requête
  return NextResponse.next()
}

// Indiquer quelles routes doivent passer par ce middleware
export const config = {
  matcher: ['/', '/historique', '/media/:path*'], // par exemple toutes les pages sous /dashboard
}
