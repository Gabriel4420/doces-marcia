import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { User } from '@/types/auth';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
      
      // Criptografar a senha antes de salvar
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      await prisma.user.create({
        data: { id: randomUUID(), name, email, password: hashedPassword },
      });
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (type === 'login') {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return new NextResponse(JSON.stringify({ error: 'Email ou senha incorretos' }), {
          status: 401,
          headers: corsHeaders,
        });
      }
      
      // Verificar se a senha está correta usando bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return new NextResponse(JSON.stringify({ error: 'Email ou senha incorretos' }), {
          status: 401,
          headers: corsHeaders,
        });
      }
      
      // Gerar JWT
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );
      // Setar cookie httpOnly, Secure só em produção
      const isProd = process.env.NODE_ENV === 'production';
      const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict${isProd ? '; Secure' : ''}`;
      const response = new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Set-Cookie': cookie,
        },
      });
      return response;
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