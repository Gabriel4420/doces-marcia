import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Testimonial } from '@/types/testimonial';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

const uploadDir = path.resolve(process.cwd(), 'public/uploads');

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

async function saveImage(file: File) {
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
  const filePath = path.join(uploadDir, fileName);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filePath, buffer);
  return `/uploads/${fileName}`;
}

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany();
    console.log(testimonials)
    return new NextResponse(JSON.stringify(testimonials), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Erro ao buscar depoimentos.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      let imageUrl = '';
      const file = formData.get('image');
      if (file && typeof file === 'object' && 'arrayBuffer' in file) {
        imageUrl = await saveImage(file);
      }
      const newTestimonial = await prisma.testimonial.create({
        data: { id: randomUUID(), image: imageUrl },
      });
      return new NextResponse(JSON.stringify(newTestimonial), {
        status: 201,
        headers: corsHeaders,
      });
    } else {
      return new NextResponse(JSON.stringify({ error: 'Envie uma imagem.' }), {
        status: 400,
        headers: corsHeaders,
      });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Erro ao criar depoimento.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.testimonial.delete({ where: { id } });
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Erro ao deletar depoimento.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
} 