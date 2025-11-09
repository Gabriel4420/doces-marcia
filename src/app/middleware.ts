import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Rotas protegidas
const protectedRoutes = ['/admin'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Só protege rotas definidas
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      // Não autenticado, redireciona para login
      return NextResponse.redirect(new URL('/login', req.url));
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch (e) {
      // Token inválido, redireciona para login
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  // Permite acesso normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 