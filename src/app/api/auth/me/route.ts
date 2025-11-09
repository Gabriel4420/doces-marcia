import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log(token)
  if (!token) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
} 