// Configuração e validação do Supabase
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

// Validar configuração
export function validateSupabaseConfig() {
  const errors: string[] = [];

  if (!supabaseConfig.url) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL não está definida');
  }

  if (!supabaseConfig.anonKey) {
    errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY não está definida');
  }

  if (supabaseConfig.url && !supabaseConfig.url.startsWith('https://')) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL deve começar com https://');
  }

  if (supabaseConfig.anonKey && supabaseConfig.anonKey.length < 50) {
    errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY parece estar incompleta');
  }

  return {
    isValid: errors.length === 0,
    errors,
    config: {
      hasUrl: !!supabaseConfig.url,
      hasAnonKey: !!supabaseConfig.anonKey,
      urlLength: supabaseConfig.url?.length || 0,
      anonKeyLength: supabaseConfig.anonKey?.length || 0,
    }
  };
}

// Log de configuração (apenas em desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  const validation = validateSupabaseConfig();
  
  if (!validation.isValid) {
    console.error('❌ Supabase Config Errors:', validation.errors);
  } else {
    console.log('✅ Supabase Config is valid');
  }
} 