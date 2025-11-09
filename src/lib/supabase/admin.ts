import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const createAdminClient = () => {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Supabase URL ou Service Role Key ausente. Defina SUPABASE_SERVICE_ROLE_KEY e NEXT_PUBLIC_SUPABASE_URL."
    );
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey);
};