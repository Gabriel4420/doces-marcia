import { createBrowserClient } from "@supabase/ssr";
import { validateSupabaseConfig } from "./config";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validar configuração antes de criar o cliente
const validation = validateSupabaseConfig();
if (!validation.isValid) {
  console.error('❌ Supabase configuration errors:', validation.errors);
}

export const createClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase configuration is missing. Check your environment variables.');
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
};
