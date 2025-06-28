import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFile = path.resolve(process.cwd(), 'src/data/users-admin.json');

function readUsers() {
  if (!fs.existsSync(dataFile)) return [];
  const data = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(data);
}

function writeUsers(users: any[]) {
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password, type } = body;
  const users = readUsers();

  if (type === 'register') {
    if (users.some((u: any) => u.email === email)) {
      return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 });
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    writeUsers(users);
    return NextResponse.json({ success: true });
  }

  if (type === 'login') {
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
      return NextResponse.json({ error: 'Email ou senha incorretos' }, { status: 401 });
    }
    return NextResponse.json({ id: user.id, name: user.name, email: user.email });
  }

  return NextResponse.json({ error: 'Tipo de operação inválido' }, { status: 400 });
} 