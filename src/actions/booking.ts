'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { z } from 'zod';

// Rate Limiting avec Upstash
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// Rate limiter par IP (3 requêtes/minute)
const ipRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '60 s'),
  analytics: true,
  prefix: 'ratelimit:ip',
});

// Rate limiter par Email (1 réservation/heure par email)
const emailRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, '3600 s'),
  analytics: true,
  prefix: 'ratelimit:email',
});

// Validation URL sécurisée (uniquement http/https)
const safeUrlSchema = z
  .string()
  .refine(
    (url) => {
      if (!url || url === '') return true;
      try {
        const parsed = new URL(url);
        // Accepter uniquement http/https
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          return false;
        }
        // En production, rejeter les domaines locaux
        if (process.env.NODE_ENV === 'production') {
          const hostname = parsed.hostname.toLowerCase();
          if (
            hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname.startsWith('192.168.') ||
            hostname.startsWith('10.') ||
            hostname.endsWith('.local')
          ) {
            return false;
          }
        }
        return true;
      } catch {
        return false;
      }
    },
    { message: 'URL invalide. Utilisez http:// ou https://' }
  )
  .optional()
  .or(z.literal(''));

// Schéma de validation serveur (sécurisé)
const bookingSchema = z.object({
  name: z
    .string()
    .min(2, 'Nom trop court')
    .max(255, 'Nom trop long')
    .regex(/^[\p{L}\p{M}\s\-'.]+$/u, 'Nom contient des caractères invalides'),
  email: z.string().email('Email invalide').max(255, 'Email trop long'),
  phone: z
    .string()
    .regex(
      /^(\+?[1-9]\d{0,2}[\s.-]?)?(\(?\d{1,4}\)?[\s.-]?)?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/,
      'Format téléphone invalide (ex: +33 6 12 34 56 78)'
    )
    .optional()
    .or(z.literal('')),
  company: safeUrlSchema,
  projectType: z.enum(['saas', 'ecommerce', 'vitrine', 'autre']),
  meetingType: z.enum(['phone', 'meet']),
  bookingStart: z.string().datetime(),
  timezone: z.string().default('Europe/Paris'),
  turnstileToken: z.string().min(1, 'CAPTCHA requis'),
});

/**
 * Extrait l'IP réelle de manière sécurisée
 * Prend la première IP de x-forwarded-for (proxy chain)
 */
function extractRealIP(headersList: Headers): string {
  const forwardedFor = headersList.get('x-forwarded-for');
  if (forwardedFor) {
    // Prendre la première IP (client original)
    const firstIP = forwardedFor.split(',')[0]?.trim();
    if (firstIP && firstIP !== '') {
      return firstIP;
    }
  }
  return headersList.get('x-real-ip') || 'anonymous';
}

/**
 * Crée un fingerprint pour le rate limiting
 * Combine IP + User-Agent pour plus de robustesse
 */
function createFingerprint(ip: string, userAgent: string | null): string {
  const ua = userAgent?.slice(0, 50) || 'unknown';
  return `${ip}-${ua}`;
}

export async function createBooking(formData: z.infer<typeof bookingSchema>) {
  try {
    // 1. Validation Zod (schéma sécurisé)
    const validated = bookingSchema.parse(formData);

    // 2. Validation conditionnelle : phone requis si type = 'phone'
    if (validated.meetingType === 'phone' && !validated.phone) {
      return { error: 'Téléphone requis pour un appel téléphonique' };
    }

    // 3. Vérification Cloudflare Turnstile (CAPTCHA) - SÉCURISÉ
    const isProduction = process.env.NODE_ENV === 'production';
    const isTestToken = validated.turnstileToken === 'test-token-bypass';

    if (isProduction) {
      // En production : vérification OBLIGATOIRE
      const turnstileResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: validated.turnstileToken,
          }),
        }
      );

      const turnstileResult = await turnstileResponse.json();
      if (!turnstileResult.success) {
        console.warn('[SECURITY] CAPTCHA verification failed in production');
        return { error: 'Vérification CAPTCHA échouée. Veuillez réessayer.' };
      }
    } else {
      // En développement : accepter uniquement le token de test
      if (!isTestToken) {
        // Vérifier via Turnstile même en dev si ce n'est pas le token de test
        const turnstileResponse = await fetch(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              secret: process.env.TURNSTILE_SECRET_KEY,
              response: validated.turnstileToken,
            }),
          }
        );

        const turnstileResult = await turnstileResponse.json();
        if (!turnstileResult.success) {
          return { error: 'Vérification CAPTCHA échouée. Veuillez réessayer.' };
        }
      }
    }

    // 4. Rate Limiting - SÉCURISÉ (IP + Fingerprint)
    const headersList = await headers();
    const ip = extractRealIP(headersList);
    const userAgent = headersList.get('user-agent');
    const fingerprint = createFingerprint(ip, userAgent);

    // 4a. Rate limiting par fingerprint (IP + User-Agent)
    const { success: ipSuccess, remaining } =
      await ipRatelimit.limit(fingerprint);
    if (!ipSuccess) {
      console.warn(`[SECURITY] Rate limit exceeded for fingerprint: ${fingerprint}`);
      return {
        error: 'Trop de tentatives. Veuillez réessayer dans 1 minute.',
        retryAfter: 60,
      };
    }

    // 4b. Rate limiting par email (plus strict)
    const { success: emailSuccess } = await emailRatelimit.limit(
      `email:${validated.email.toLowerCase()}`
    );
    if (!emailSuccess) {
      console.warn(`[SECURITY] Email rate limit exceeded: ${validated.email}`);
      return {
        error:
          'Vous avez déjà réservé récemment avec cet email. Veuillez réessayer plus tard.',
        retryAfter: 3600,
      };
    }

    // 5. Validation des dates - SÉCURISÉ
    const bookingStart = new Date(validated.bookingStart);
    const now = new Date();

    // 5a. Vérifier que la date est dans le futur (avec 5 min de marge)
    const minBookingTime = new Date(now.getTime() + 5 * 60 * 1000);
    if (bookingStart < minBookingTime) {
      return { error: 'Impossible de réserver un créneau dans le passé' };
    }

    // 5b. Vérifier que c'est dans les 60 prochains jours
    const maxDate = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
    if (bookingStart > maxDate) {
      return { error: 'Impossible de réserver au-delà de 60 jours' };
    }

    // 5c. Calculer la fin du créneau (30 minutes)
    const bookingEnd = new Date(bookingStart.getTime() + 30 * 60 * 1000);

    // 6. Insérer la réservation
    // Note: Utilisation de createAdminClient (service_role) pour bypasser RLS
    // Sécurisé car :
    // - Rate Limiting (Upstash) bloque le spam
    // - Validation Zod vérifie les données
    // - Status forcé à 'pending'
    // - La clé service_role reste côté serveur
    const { createAdminClient } = await import('../lib/supabase/server');
    const supabase = await createAdminClient();

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        client_name: validated.name,
        client_email: validated.email.toLowerCase(),
        client_phone: validated.phone || null,
        company_url: validated.company || null,
        project_type: validated.projectType,
        meeting_type: validated.meetingType,
        booking_start: bookingStart.toISOString(),
        booking_end: bookingEnd.toISOString(),
        status: 'pending',
        user_agent: userAgent?.slice(0, 500) || null,
        ip_address: ip !== 'anonymous' ? ip : null,
      })
      .select()
      .single();

    // 7. Capturer les erreurs de contraintes
    if (error) {
      // 23505 = Unique constraint violation
      // 23P01 = Exclusion constraint violation (GIST overlapping ranges)
      if (error.code === '23505' || error.code === '23P01') {
        console.warn(`[BOOKING] Slot conflict: ${bookingStart.toISOString()}`);
        return {
          error:
            "Ce créneau vient d'être réservé. Veuillez en choisir un autre.",
        };
      }
      throw error;
    }

    // 8. Log succès (pour monitoring)
    console.log(
      `[BOOKING] Success: ${data.id} - ${validated.email} - ${bookingStart.toISOString()}`
    );

    // 9. Revalider le cache
    revalidatePath('/');

    return {
      success: true,
      bookingId: data.id,
      bookingStart: data.booking_start,
      remaining: remaining - 1,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.warn('[VALIDATION] Zod error:', error.issues);
      return { error: 'Données invalides', details: error.issues };
    }
    console.error('[ERROR] createBooking:', error);
    return { error: 'Erreur serveur. Veuillez réessayer.' };
  }
}
