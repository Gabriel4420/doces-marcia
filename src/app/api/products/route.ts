import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Product } from '@/types/product';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

const uploadDir = path.resolve(process.cwd(), 'public/uploads');

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
    const products = await prisma.product.findMany();
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
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const name = formData.get('name')?.toString() || '';
      const categoryId = formData.get('category')?.toString() || '';
      let imageUrl = '';
      const file = formData.get('image');
      if (file && typeof file === 'object' && 'arrayBuffer' in file) {
        imageUrl = await saveImage(file);
      }
      const newProduct = await prisma.product.create({
        data: {
        id: randomUUID(),
          name,
          categoryId,
          image: imageUrl,
        },
      });
      return new NextResponse(JSON.stringify(newProduct), {
        status: 201,
        headers: corsHeaders,
      });
    } else {
      const body = await req.json();
      if ('id' in body) delete body.id;
      const newProduct = await prisma.product.create({
        data: {
          ...body,
        },
      });
      return new NextResponse(JSON.stringify(newProduct), {
        status: 201,
        headers: corsHeaders,
      });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Erro ao criar produto.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const id = formData.get('id')?.toString() || '';
      const name = formData.get('name')?.toString() || '';
      const categoryId = formData.get('category')?.toString() || '';
      let imageUrl = formData.get('imageUrl')?.toString() || '';
      const file = formData.get('image');
      if (file && typeof file === 'object' && 'arrayBuffer' in file) {
        imageUrl = await saveImage(file);
      }
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: { name, categoryId, image: imageUrl },
      });
      return new NextResponse(JSON.stringify(updatedProduct), {
        status: 200,
        headers: corsHeaders,
      });
    } else {
      const body = await req.json();
      const updatedProduct = await prisma.product.update({
        where: { id: body.id },
        data: { name: body.name, categoryId: body.categoryId, image: body.image },
      });
      return new NextResponse(JSON.stringify(updatedProduct), {
        status: 200,
        headers: corsHeaders,
      });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Erro ao atualizar produto.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.product.delete({ where: { id } });
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Erro ao deletar produto.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
} 