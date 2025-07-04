import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const categoriesPath = path.resolve(__dirname, '../src/data/categories-admin.json');
  const categoriesRaw = fs.readFileSync(categoriesPath, 'utf-8');
  const categories = JSON.parse(categoriesRaw);

  for (const category of categories) {
    const exists = await prisma.category.findFirst({ where: { name: category.name } });
    if (!exists) {
      await prisma.category.create({
        data: {
          id: randomUUID(),
          name: category.name,
        },
      });
    }
  }

  console.log('Categorias populadas com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 