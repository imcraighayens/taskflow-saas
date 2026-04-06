import { createBrowserSupabaseClient, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../types';

/**
 * Client‑side Supabase instance.
 *
 * In Next.js App Router, client components should call this function once to
 * initialise Supabase.  The returned client can be used to query tables
 * directly or via RPC.  The generic type parameter ties the client to your
 * database schema (see `src/types.ts`).
 */
export const supabaseClient = () => {
  return createBrowserSupabaseClient<Database>();
};

/**
 * Server‑side Supabase instance.
 *
 * Use this helper within server components or Next.js API routes to
 * authenticate the user and perform database actions.  The server
 * environment must have access to the `SUPABASE_SERVICE_ROLE_KEY` if
 * privileged operations (e.g. migrations) are performed.
 */
export const supabaseServerClient = (cookies: any) => {
  return createServerSupabaseClient<Database>({
    cookies,
  });
};