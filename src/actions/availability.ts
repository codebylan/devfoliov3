'use server';

import { addMinutes, parseISO, startOfDay } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

export async function getAvailableSlots(
  date: string,
  timezone: string = 'Europe/Paris'
) {
  try {
    // Utiliser createAdminClient pour bypasser RLS (lecture sécurisée côté serveur)
    const { createAdminClient } = await import('../lib/supabase/server');
    const supabase = await createAdminClient();

    // 1. Vérifier les overrides (jours fériés, vacances)
    const { data: override } = await supabase
      .from('availability_overrides')
      .select('is_available')
      .eq('override_date', date)
      .maybeSingle();

    if (override && !override.is_available) {
      return { slots: [] };
    }

    // 2. Calculer le jour de la semaine (1=Lundi, 7=Dimanche)
    // JavaScript getDay() : 0=Dimanche, 1=Lundi, ..., 6=Samedi
    const jsDay = new Date(date).getDay();
    const dayOfWeek = jsDay === 0 ? 7 : jsDay; // Convertir 0 (Dim) -> 7

    // 3. Récupérer TOUS les créneaux configurés pour ce jour (peut y avoir plusieurs ranges)
    const { data: slotConfigs } = await supabase
      .from('time_slot_config')
      .select('start_time, end_time, slot_duration')
      .eq('day_of_week', dayOfWeek)
      .eq('is_active', true)
      .order('start_time', { ascending: true });

    // Si pas de config, retourner vide (pas de créneaux disponibles)
    if (!slotConfigs || slotConfigs.length === 0) {
      return { slots: [] };
    }

    // 4. Récupérer les créneaux déjà réservés pour cette date
    const dayStart = fromZonedTime(startOfDay(parseISO(date)), timezone);
    const dayEnd = addMinutes(dayStart, 24 * 60);

    const { data: bookedSlots } = await supabase
      .from('bookings')
      .select('booking_start, booking_end')
      .gte('booking_start', dayStart.toISOString())
      .lt('booking_start', dayEnd.toISOString())
      .in('status', ['pending', 'confirmed']);

    // 5. Générer tous les créneaux possibles depuis les configs (peut y avoir plusieurs ranges par jour)
    // Stocker les slots avec leur duration pour le filtrage
    const allSlotsWithDuration: Array<{ time: string; duration: number }> = [];

    for (const config of slotConfigs) {
      const startTime = config.start_time.split(':');
      const endTime = config.end_time.split(':');
      const startHour = parseInt(startTime[0]);
      const startMinute = parseInt(startTime[1]);
      const endHour = parseInt(endTime[0]);
      const endMinute = parseInt(endTime[1]);
      const slotDuration = config.slot_duration || 30;

      // Convertir en minutes pour faciliter les calculs
      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;

      // Générer les créneaux dans ce range
      for (
        let currentMinutes = startTotalMinutes;
        currentMinutes < endTotalMinutes;
        currentMinutes += slotDuration
      ) {
        const hours = Math.floor(currentMinutes / 60);
        const minutes = currentMinutes % 60;
        allSlotsWithDuration.push({
          time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
          duration: slotDuration,
        });
      }
    }

    // Trier et dédupliquer (au cas où les ranges se chevauchent)
    // Si un slot apparaît plusieurs fois, garder celui avec la durée la plus courte (plus restrictif)
    const slotMap = new Map<string, number>();
    for (const slot of allSlotsWithDuration) {
      const existing = slotMap.get(slot.time);
      if (!existing || slot.duration < existing) {
        slotMap.set(slot.time, slot.duration);
      }
    }

    const uniqueSlots = Array.from(slotMap.entries())
      .map(([time, duration]) => ({ time, duration }))
      .sort((a, b) => a.time.localeCompare(b.time));

    // 6. Filtrer les créneaux qui chevauchent des bookings existants
    const availableSlots = uniqueSlots
      .filter((slot) => {
        const [hours, minutes] = slot.time.split(':').map(Number);
        const slotDate = new Date(date);
        slotDate.setHours(hours, minutes, 0, 0);

        const slotStart = fromZonedTime(slotDate, timezone);
        const slotEnd = addMinutes(slotStart, slot.duration);

      // Vérifier si ce slot chevauche un booking existant
      const hasOverlap = bookedSlots?.some((booking) => {
        const bookingStart = parseISO(booking.booking_start);
        const bookingEnd = parseISO(booking.booking_end);

        // Logique de chevauchement : (slotStart < bookingEnd) AND (slotEnd > bookingStart)
        return slotStart < bookingEnd && slotEnd > bookingStart;
      });

      return !hasOverlap; // Disponible si aucun chevauchement
      })
      .map((slot) => slot.time); // Retourner uniquement les heures

    return { slots: availableSlots };
  } catch (error) {
    console.error('Error fetching slots:', error);
    return { error: 'Erreur serveur' };
  }
}
