import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side supabase instance (safe for public)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side supabase instance with admin privileges (DO NOT EXPOSE TO CLIENT)
export const getServiceSupabase = () => {
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
};
