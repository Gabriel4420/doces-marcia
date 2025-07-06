import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function migratePasswords() {
  try {
    console.log('Iniciando migração de senhas...');
    
    // Buscar todos os usuários
    const users = await prisma.user.findMany();
    
    if (users.length === 0) {
      console.log('Nenhum usuário encontrado para migração.');
      return;
    }
    
    console.log(`Encontrados ${users.length} usuários para verificar.`);
    
    for (const user of users) {
      // Verificar se a senha já está criptografada (bcrypt gera hashes que começam com $2a$ ou $2b$)
      if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
        console.log(`Usuário ${user.email} já tem senha criptografada.`);
        continue;
      }
      
      // Criptografar a senha existente
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      
      // Atualizar o usuário com a nova senha criptografada
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
      
      console.log(`Senha do usuário ${user.email} foi criptografada com sucesso.`);
    }
    
    console.log('Migração de senhas concluída!');
  } catch (error) {
    console.error('Erro durante a migração:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar a migração se o script for chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  migratePasswords();
}

export { migratePasswords }; 