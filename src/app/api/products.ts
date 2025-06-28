import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFile = path.resolve(process.cwd(), 'src/data/products-admin.json');

function readProducts() {
  if (!fs.existsSync(dataFile)) return [];
  const data = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(data);
}

function writeProducts(products: any[]) {
  fs.writeFileSync(dataFile, JSON.stringify(products, null, 2));
}

export async function GET() {
  const products = readProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const products = readProducts();
  const newProduct = { ...body, id: Date.now() };
  products.push(newProduct);
  writeProducts(products);
  return NextResponse.json(newProduct, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const products = readProducts();
  const idx = products.findIndex((p: any) => p.id === body.id);
  if (idx === -1) return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
  products[idx] = { ...products[idx], ...body };
  writeProducts(products);
  return NextResponse.json(products[idx]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  let products = readProducts();
  products = products.filter((p: any) => p.id !== id);
  writeProducts(products);
  return NextResponse.json({ success: true });
} 