import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Supabase URL ou Service Role Key não definida nas variáveis de ambiente.');
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function migrateSupabasePasswords() {
  try {
    console.log('Iniciando migração de senhas no Supabase...');

    // Altere o nome da tabela abaixo caso sua tabela de usuários seja diferente
    const { data: users, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      throw error;
    }

    if (!users || users.length === 0) {
      console.log('Nenhum usuário encontrado no Supabase.');
      return;
    }

    for (const user of users) {
      if (!user.password) continue;
      if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
        console.log(`Usuário ${user.email} já tem senha criptografada.`);
        continue;
      }
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      const { error: updateError } = await supabase
        .from('users')
        .update({ password: hashedPassword })
        .eq('id', user.id);
      if (updateError) {
        console.error(`Erro ao atualizar usuário ${user.email}:`, updateError.message);
      } else {
        console.log(`Senha do usuário ${user.email} criptografada com sucesso.`);
      }
    }
    console.log('Migração de senhas no Supabase concluída!');
  } catch (err) {
    console.error('Erro durante a migração no Supabase:', err);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  migrateSupabasePasswords();
} 