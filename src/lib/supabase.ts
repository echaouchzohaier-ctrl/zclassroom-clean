import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "hdmqrprkdbtlmzjjtuny";
const supabaseAnonKey = "sb_publishable_a9c00EDFxltcKIJDc9Wi4Q_pekjQuaE";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'zclassroom-auth',
  },
});
