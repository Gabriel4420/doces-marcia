import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { User } from '@/types/auth';
import { randomUUID } from 'crypto';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, type } = body;

    if (type === 'register') {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return new NextResponse(JSON.stringify({ error: 'Email já cadastrado' }), {
          status: 400,
          headers: corsHeaders,
        });
      }
      await prisma.user.create({
        data: { id: randomUUID(), name, email, password },
      });
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (type === 'login') {
      const user = await prisma.user.findUnique({ where: { email, password } });
      if (!user) {
        return new NextResponse(JSON.stringify({ error: 'Email ou senha incorretos' }), {
          status: 401,
          headers: corsHeaders,
        });
      }
      return new NextResponse(JSON.stringify({ id: user.id, name: user.name, email: user.email }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    return new NextResponse(JSON.stringify({ error: 'Tipo de operação inválido' }), {
      status: 400,
      headers: corsHeaders,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Erro ao processar requisição de usuário.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
} 