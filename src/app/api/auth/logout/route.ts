import { NextResponse } from 'next/server';

export async function POST() {
  // Expira o cookie imediatamente
  const isProd = process.env.NODE_ENV === 'production';
  const cookie = `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${isProd ? '; Secure' : ''}`;
  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Set-Cookie': cookie,
    },
  });
} 