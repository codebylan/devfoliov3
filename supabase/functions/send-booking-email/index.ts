/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />
// @ts-ignore: Deno is available in Supabase Edge Runtime

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  try {
    // Webhook payload
    const { record } = await req.json();

    if (!record) {
      return new Response(JSON.stringify({ error: 'No record provided' }), {
        status: 400,
      });
    }

    const { id, client_email, client_name, booking_start, meeting_type } =
      record;

    // Formater la date pour l'email
    const bookingDate = new Date(booking_start);
    const formattedDate = bookingDate.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = bookingDate.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Template email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h1 style="color: #C8B792;">Rendez-vous confirmé !</h1>
          <p>Bonjour <strong>${client_name}</strong>,</p>
          <p>Votre appel découverte est réservé pour le :</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 18px;">
              📅 <strong>${formattedDate}</strong><br>
              🕒 <strong>${formattedTime}</strong>
            </p>
          </div>
          ${
            meeting_type === 'meet'
              ? '<p>Le lien Google Meet vous sera envoyé 24h avant le rendez-vous.</p>'
              : '<p>Je vous appellerai au numéro que vous avez fourni.</p>'
          }
          <p style="color: #666; font-size: 12px; margin-top: 40px;">
            ID de réservation : ${id}
          </p>
        </body>
      </html>
    `;

    // Envoi via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Booking System <contact@dylan-agboton.com>', // Email de test Resend
        to: client_email,
        subject: `✅ Confirmation : Rendez-vous le ${formattedDate}`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      throw new Error(`Resend failed: ${errorText}`);
    }

    // Enregistrer l'envoi dans les logs
    // Secrets requis (configurés via `supabase secrets set`) :
    // - SUPABASE_URL (fourni automatiquement par Supabase)
    // - SUPABASE_SERVICE_ROLE_KEY
    // - RESEND_API_KEY
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    await supabase.from('email_logs').insert({
      booking_id: id,
      recipient: client_email,
      type: 'confirmation',
      status: 'sent',
      sent_at: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
});