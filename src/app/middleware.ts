import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

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
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');
      // HS256 por padrão no jose quando segredo é compartilhado
      // Verifica assinatura de forma compatível com Edge Runtime
      // Se inválido, cai no catch e redireciona
      return jwtVerify(token, secret)
        .then(() => NextResponse.next())
        .catch(() => NextResponse.redirect(new URL('/login', req.url)));
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