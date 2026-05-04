import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ── Browser / client-component client ────────────────────────────────────────
// Safe to use in "use client" components — uses the anon key
export const supabase = createClient<Database>(supabaseUrl, supabaseAnon);

// ── Server / admin client ─────────────────────────────────────────────────────
// Uses the service role key — bypasses RLS.
// Only import this in Server Components, API routes, or admin pages.
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient<Database>(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
