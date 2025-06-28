import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFile = path.resolve(process.cwd(), 'src/data/products-admin.json');
const uploadDir = path.resolve(process.cwd(), 'public/uploads');

function readProducts() {
  if (!fs.existsSync(dataFile)) return [];
  const data = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(data);
}

function writeProducts(products: any[]) {
  fs.writeFileSync(dataFile, JSON.stringify(products, null, 2));
}

function saveImage(file: File) {
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
  const filePath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(file.arrayBufferSync());
  fs.writeFileSync(filePath, buffer);
  return `/uploads/${fileName}`;
}

export async function GET() {
  const products = readProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    const name = formData.get('name');
    const category = formData.get('category');
    let imageUrl = formData.get('imageUrl') || '';
    const file = formData.get('image');
    if (file && typeof file === 'object' && 'arrayBuffer' in file) {
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }
    const products = readProducts();
    const newProduct = { id: Date.now(), name, category, image: imageUrl };
    products.push(newProduct);
    writeProducts(products);
    return NextResponse.json(newProduct, { status: 201 });
  } else {
    // fallback para JSON
    const body = await req.json();
    const products = readProducts();
    const newProduct = { id: Date.now(), name: body.name, category: body.category, image: body.image };
    products.push(newProduct);
    writeProducts(products);
    return NextResponse.json(newProduct, { status: 201 });
  }
}

export async function PUT(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    const id = parseInt(formData.get('id'));
    const name = formData.get('name');
    const category = formData.get('category');
    let imageUrl = formData.get('imageUrl') || '';
    const file = formData.get('image');
    if (file && typeof file === 'object' && 'arrayBuffer' in file) {
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }
    const products = readProducts();
    const idx = products.findIndex((p: any) => p.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    products[idx] = { ...products[idx], name, category, image: imageUrl };
    writeProducts(products);
    return NextResponse.json(products[idx]);
  } else {
    // fallback para JSON
    const body = await req.json();
    const products = readProducts();
    const idx = products.findIndex((p: any) => p.id === body.id);
    if (idx === -1) return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    products[idx] = { ...products[idx], name: body.name, category: body.category, image: body.image };
    writeProducts(products);
    return NextResponse.json(products[idx]);
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  let products = readProducts();
  products = products.filter((p: any) => p.id !== id);
  writeProducts(products);
  return NextResponse.json({ success: true });
} 