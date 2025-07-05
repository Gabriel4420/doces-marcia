import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    });
    return new NextResponse(JSON.stringify(products), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({ error: 'Erro ao buscar produtos.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, categoryId, image } = body;
    
    if (!name || !categoryId) {
      return new NextResponse(JSON.stringify({ error: 'Nome e categoria são obrigatórios.' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const newProduct = await prisma.product.create({
      data: {
        id: randomUUID(),
        name,
        categoryId: categoryId.toString(),
        image: image || null,
      },
      include: {
        category: true
      }
    });

    return new NextResponse(JSON.stringify(newProduct), {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return new NextResponse(JSON.stringify({ error: 'Erro ao criar produto.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, categoryId, image } = body;
    
    if (!id || !name || !categoryId) {
      return new NextResponse(JSON.stringify({ error: 'ID, nome e categoria são obrigatórios.' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { 
        name, 
        categoryId: categoryId.toString(), 
        image: image || null 
      },
      include: {
        category: true
      }
    });

    return new NextResponse(JSON.stringify(updatedProduct), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return new NextResponse(JSON.stringify({ error: 'Erro ao atualizar produto.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return new NextResponse(JSON.stringify({ error: 'ID é obrigatório.' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    await prisma.product.delete({ where: { id } });
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return new NextResponse(JSON.stringify({ error: 'Erro ao deletar produto.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
} 