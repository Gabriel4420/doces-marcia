import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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
    const testimonials = await prisma.testimonial.findMany();
    return new NextResponse(JSON.stringify(testimonials), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    return new NextResponse(JSON.stringify({ error: 'Erro ao buscar depoimentos.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image } = body;
    
    if (!image) {
      return new NextResponse(JSON.stringify({ error: 'URL da imagem é obrigatória.' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const newTestimonial = await prisma.testimonial.create({
      data: { 
        id: randomUUID(), 
        image 
      },
    });

    return new NextResponse(JSON.stringify(newTestimonial), {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Erro ao criar depoimento:', error);
    return new NextResponse(JSON.stringify({ error: 'Erro ao criar depoimento.' }), {
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

    await prisma.testimonial.delete({ where: { id } });
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Erro ao deletar depoimento:', error);
    return new NextResponse(JSON.stringify({ error: 'Erro ao deletar depoimento.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
} 