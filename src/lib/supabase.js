import { createClient } from "@supabase/supabase-js";

// ── SUPABASE CLIENT ───────────────────────────────────────
// If env vars are missing, the app runs in Demo Mode with mock
// data (src/lib/data.js) and in-memory state. Set the vars in
// .env.local to activate real auth, storage and realtime.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isDemoMode = !url || !key;

export const supabase = isDemoMode ? null : createClient(url, key);
