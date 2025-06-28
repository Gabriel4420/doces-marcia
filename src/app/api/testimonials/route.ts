import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFile = path.resolve(process.cwd(), 'src/data/testimonials-admin.json');
const uploadDir = path.resolve(process.cwd(), 'public/uploads');

function readTestimonials() {
  if (!fs.existsSync(dataFile)) return [];
  const data = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(data);
}

function writeTestimonials(testimonials: any[]) {
  fs.writeFileSync(dataFile, JSON.stringify(testimonials, null, 2));
}

export async function GET() {
  const testimonials = readTestimonials();
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    let imageUrl = '';
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
    const testimonials = readTestimonials();
    const newTestimonial = { id: Date.now(), image: imageUrl };
    testimonials.push(newTestimonial);
    writeTestimonials(testimonials);
    return NextResponse.json(newTestimonial, { status: 201 });
  } else {
    return NextResponse.json({ error: 'Envie uma imagem.' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  let testimonials = readTestimonials();
  testimonials = testimonials.filter((t: any) => t.id !== id);
  writeTestimonials(testimonials);
  return NextResponse.json({ success: true });
} 