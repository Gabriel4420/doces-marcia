import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Category } from '@/types/tabs';
import { randomUUID } from 'crypto';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Erro ao buscar categorias.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newCategory = await prisma.category.create({
      data: {
        ...body,
        id: randomUUID(),
      },
    });
    return new NextResponse(JSON.stringify(newCategory), {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Erro ao criar categoria.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updatedCategory = await prisma.category.update({
      where: { id: body.id },
      data: { name: body.name },
    });
    return new NextResponse(JSON.stringify(updatedCategory), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Erro ao atualizar categoria.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.category.delete({ where: { id } });
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Erro ao deletar categoria.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
} 