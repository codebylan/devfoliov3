/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />
// @ts-ignore: Deno is available in Supabase Edge Runtime

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  try {
    // Secrets requis (configurés via `supabase secrets set`) :
    // - SUPABASE_URL (fourni automatiquement par Supabase)
    // - SUPABASE_SERVICE_ROLE_KEY
    // - RESEND_API_KEY
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Récupérer les rendez-vous dans 24h (demain)
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const tomorrowStart = new Date(tomorrow);
    tomorrowStart.setHours(0, 0, 0, 0);
    
    const tomorrowEnd = new Date(tomorrow);
    tomorrowEnd.setHours(23, 59, 59, 999);

    const { data: upcomingBookings } = await supabase
      .from('bookings')
      .select('*')
      .gte('booking_start', tomorrowStart.toISOString())
      .lte('booking_start', tomorrowEnd.toISOString())
      .eq('status', 'confirmed');

    // Compteurs pour le rapport
    let sentCount = 0;
    let failedCount = 0;

    // Envoyer un email de rappel pour chaque booking
    for (const booking of upcomingBookings || []) {
      try {
        const bookingDate = new Date(booking.booking_start);
        const formattedDate = bookingDate.toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        });
        const formattedTime = bookingDate.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        });

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Dylan Agboton <contact@dylan-agboton.com>',
            to: booking.client_email,
            subject: '🔔 Rappel : Rendez-vous demain',
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                </head>
                <body style="font-family: sans-serif; line-height: 1.6; color: #333;">
                  <h1 style="color: #C8B792;">Rappel : Rendez-vous demain !</h1>
                  <p>Bonjour <strong>${booking.client_name}</strong>,</p>
                  <p>Petit rappel amical : votre appel découverte est prévu <strong>demain</strong> !</p>
                  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; font-size: 18px;">
                      📅 <strong>${formattedDate}</strong><br>
                      🕒 <strong>${formattedTime}</strong>
                    </p>
                  </div>
                  ${
                    booking.meeting_type === 'meet'
                      ? '<p>💻 Le lien Google Meet vous sera envoyé juste avant le rendez-vous.</p>'
                      : '<p>📞 Je vous appellerai au numéro que vous avez fourni.</p>'
                  }
                  <p>Si vous avez un empêchement, n\'hésitez pas à me contacter.</p>
                  <p>À très bientôt !</p>
                  <p style="color: #666; font-size: 12px; margin-top: 40px;">
                    Dylan Agboton<br>
                    Développeur Fullstack
                  </p>
                </body>
              </html>
            `,
          }),
        });

        if (!emailResponse.ok) {
          throw new Error(`Resend failed: ${await emailResponse.text()}`);
        }

        // Logger l'envoi réussi
        await supabase.from('email_logs').insert({
          booking_id: booking.id,
          recipient: booking.client_email,
          type: 'reminder',
          status: 'sent',
          sent_at: new Date().toISOString(),
        });

        sentCount++;
      } catch (error) {
        console.error(`Failed to send reminder for booking ${booking.id}:`, error);
        
        // Logger l'échec
        await supabase.from('email_logs').insert({
          booking_id: booking.id,
          recipient: booking.client_email,
          type: 'reminder',
          status: 'failed',
          error_message: error.message,
          sent_at: new Date().toISOString(),
        });

        failedCount++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        total: upcomingBookings?.length || 0,
        sent: sentCount,
        failed: failedCount,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Reminder error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
});