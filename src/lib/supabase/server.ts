import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component peut être read-only
          }
        },
      },
    }
  );
}

/**
 * Client avec Service Role pour bypasser RLS dans les Server Actions
 * 
 * Sécurisé car :
 * - Utilisé uniquement côté serveur (Server Actions)
 * - Rate limiting (Upstash) bloque le spam
 * - Validation Zod vérifie les données
 * - Status forcé à 'pending' lors de l'insertion
 * - La clé service_role reste côté serveur (jamais exposée au client)
 * 
 * ⚠️ Ne JAMAIS utiliser côté client (browser) !
 */
export async function createAdminClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // ⚠️ Bypass RLS
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component peut être read-only
          }
        },
      },
      auth: {
        persistSession: false, // Pas de session pour service_role
      },
    }
  );
}
