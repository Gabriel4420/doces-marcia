import { NextResponse } from 'next/server';

export async function POST() {
  // Expira o cookie imediatamente
  const isProd = process.env.NODE_ENV === 'production';
  const secureFlag = (process.env.AUTH_COOKIE_SECURE ?? (isProd ? 'true' : 'false')) === 'true';
  const sameSite = process.env.AUTH_COOKIE_SAMESITE || 'Strict';
  const domain = process.env.AUTH_COOKIE_DOMAIN; // opcional
  const domainAttr = domain ? `; Domain=${domain}` : '';
  const secureAttr = secureFlag ? '; Secure' : '';
  const cookie = `token=; HttpOnly; Path=/; Max-Age=0; SameSite=${sameSite}${secureAttr}${domainAttr}`;
  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Set-Cookie': cookie,
    },
  });
}