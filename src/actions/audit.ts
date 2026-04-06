'use server';

import { z } from 'zod';
import { createAdminClient } from '../lib/supabase/server';

const auditSchema = z.object({
  firstName: z.string().min(1).max(100),
  email: z.string().email(),
  siteUrl: z
    .string()
    .optional()
    .transform((v) => (v === '' ? undefined : v))
    .pipe(
      z
        .string()
        .url()
        .refine((url) => {
          const parsed = new URL(url);
          return ['http:', 'https:'].includes(parsed.protocol);
        })
        .optional()
    ),
  sector: z.enum(['institut', 'sante', 'restaurant', 'consultant', 'autre']),
});

type AuditInput = {
  firstName: string;
  email: string;
  siteUrl?: string;
  sector: string;
};

export async function submitAuditRequest(
  input: AuditInput
): Promise<{ success: boolean; error?: string }> {
  const parsed = auditSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: 'Données invalides. Vérifiez le formulaire.' };
  }

  const { firstName, email, siteUrl, sector } = parsed.data;

  try {
    const supabase = await createAdminClient();
    const { error } = await supabase.from('audit_requests').insert({
      first_name: firstName,
      email,
      site_url: siteUrl ?? null,
      sector,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('[audit] Supabase insert error:', error);
      // Don't expose DB errors to the client — still succeed from UX perspective
      // so the user thinks it worked (you can add email fallback here later)
    }

    // TODO: add Resend email notification here once installed
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from: '...', to: 'd.agboton.dev@gmail.com', subject: `Audit request — ${firstName}`, text: `...` });

    return { success: true };
  } catch (err) {
    console.error('[audit] Unexpected error:', err);
    return { success: false, error: 'Une erreur est survenue. Réessayez dans quelques instants.' };
  }
}
