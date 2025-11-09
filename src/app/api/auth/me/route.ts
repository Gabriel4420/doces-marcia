import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';

const allowedOrigin = process.env.CORS_ORIGIN || '*';
const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Não autenticado: cookie ausente' }, { status: 401, headers: corsHeaders });
  }
  try {
    const secret = process.env.JWT_SECRET || 'secret';
    const user = jwt.verify(token, secret);
    return NextResponse.json({ user }, { headers: corsHeaders });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Token inválido';
    console.error('Erro na validação do token em /api/auth/me:', message);
    return NextResponse.json({ error: 'Token inválido', details: message }, { status: 401, headers: corsHeaders });
  }
}