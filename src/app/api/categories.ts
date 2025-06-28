import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFile = path.resolve(process.cwd(), 'src/data/categories-admin.json');

function readCategories() {
  if (!fs.existsSync(dataFile)) return [];
  const data = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(data);
}

function writeCategories(categories: any[]) {
  fs.writeFileSync(dataFile, JSON.stringify(categories, null, 2));
}

export async function GET() {
  const categories = readCategories();
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const categories = readCategories();
  const newCategory = { ...body, id: Date.now() };
  categories.push(newCategory);
  writeCategories(categories);
  return NextResponse.json(newCategory, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const categories = readCategories();
  const idx = categories.findIndex((c: any) => c.id === body.id);
  if (idx === -1) return NextResponse.json({ error: 'Categoria não encontrada' }, { status: 404 });
  categories[idx] = { ...categories[idx], ...body };
  writeCategories(categories);
  return NextResponse.json(categories[idx]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  let categories = readCategories();
  categories = categories.filter((c: any) => c.id !== id);
  writeCategories(categories);
  return NextResponse.json({ success: true });
} 