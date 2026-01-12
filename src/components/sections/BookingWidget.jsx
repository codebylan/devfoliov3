'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isWeekend,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Phone,
  Video,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { getAvailableSlots } from '../../actions/availability';
import { createBooking } from '../../actions/booking';
import { Button } from '../ui/button';
import Modal from '../ui/modal';

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 10; hour < 19; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();
const hasAvailability = (date) => !isWeekend(date);
const getTimeSlotsForDate = (date) => (hasAvailability(date) ? TIME_SLOTS : []);

// Vérifie si un créneau est passé (pour aujourd'hui uniquement)
const isSlotPast = (date, slotTime) => {
  if (!date) return false;
  const today = startOfToday();
  if (!isSameDay(date, today)) return false;

  const [hours, minutes] = slotTime.split(':').map(Number);
  const now = new Date();
  const slotDate = new Date(date);
  slotDate.setHours(hours, minutes, 0, 0);

  // Ajouter 30 min de marge (cohérent avec le backend)
  const bufferMs = 30 * 60 * 1000;
  return slotDate.getTime() <= now.getTime() + bufferMs;
};

const bookingSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  company: z.string().url('URL invalide').optional().or(z.literal('')),
  projectType: z.enum(['saas', 'ecommerce', 'vitrine', 'autre'], {
    errorMap: () => ({ message: 'Veuillez sélectionner un type de projet' }),
  }),
  meetingType: z.enum(['phone', 'meet'], {
    errorMap: () => ({
      message: 'Veuillez sélectionner un type de rendez-vous',
    }),
  }),
});

const BookingWidget = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(startOfToday());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    meetingType: '',
  });

  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart, { locale: fr });
    const calendarEnd = endOfWeek(monthEnd, { locale: fr });
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  };

  const generateUpcomingDays = () => {
    const days = [];
    const today = startOfToday();
    for (let i = 0; i < 30; i++) {
      const date = addDays(today, i);
      const slots = getTimeSlotsForDate(date);
      if (slots.length > 0) {
        days.push({ date, dateKey: format(date, 'yyyy-MM-dd'), slots });
      }
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const upcomingDays = generateUpcomingDays();

  const handleDateSelect = (date) => {
    if (hasAvailability(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
      setAvailableSlots([]);
    }
  };

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedDate || !hasAvailability(selectedDate)) {
        setAvailableSlots([]);
        return;
      }
      setIsLoadingSlots(true);
      try {
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        const result = await getAvailableSlots(dateStr, 'Europe/Paris');
        setAvailableSlots(result.error ? [] : result.slots || []);
      } catch {
        setAvailableSlots([]);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchAvailableSlots();
    const intervalId = setInterval(fetchAvailableSlots, 30000);
    return () => clearInterval(intervalId);
  }, [selectedDate]);

  const handleTimeSelect = (time) => {
    // Vérifier si le créneau est passé
    if (isSlotPast(selectedDate, time)) return;

    if (
      isLoadingSlots ||
      availableSlots.length === 0 ||
      !availableSlots.includes(time)
    )
      return;
    if (errors.timeSlot) {
      const { timeSlot, ...rest } = errors;
      setErrors(rest);
    }
    setSelectedTime(time);
  };

  const handleContinueToForm = () => {
    if (!selectedDate || !selectedTime) return;
    if (!availableSlots.includes(selectedTime)) {
      setSelectedTime(null);
      setErrors({ timeSlot: "Ce créneau vient d'être réservé." });
      return;
    }
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.meetingType) {
        setErrors({
          meetingType: 'Veuillez sélectionner un type de rendez-vous',
        });
        setIsSubmitting(false);
        return;
      }
      if (formData.meetingType === 'phone' && !formData.phone) {
        setErrors({ phone: 'Le numéro de téléphone est requis' });
        setIsSubmitting(false);
        return;
      }
      if (!turnstileToken) {
        setErrors({ turnstile: 'Veuillez compléter la vérification' });
        setIsSubmitting(false);
        return;
      }

      bookingSchema.parse(formData);

      const [hours, minutes] = selectedTime.split(':');
      const bookingStartDate = new Date(selectedDate);
      bookingStartDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const result = await createBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        company: formData.company || '',
        projectType: formData.projectType,
        meetingType: formData.meetingType,
        bookingStart: bookingStartDate.toISOString(),
        timezone: 'Europe/Paris',
        turnstileToken,
      });

      if (result.error) {
        setErrors({ submit: result.error });
        setIsSubmitting(false);
        return;
      }

      setStep(3);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        (error.issues || []).forEach((err) => {
          if (err.path?.[0]) fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ submit: 'Une erreur est survenue.' });
      }
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      meetingType: '',
    });
    setErrors({});
    setTurnstileToken('');
    setTurnstileKey((prev) => prev + 1);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="">
      <div className="p-6 sm:p-8">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-8 text-xs text-white/40">
          <span className={step >= 1 ? 'text-accent' : ''}>Date & Heure</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-accent' : ''}>Informations</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-accent' : ''}>Confirmé</span>
        </div>

        {/* STEP 1: Calendar + Time */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl text-white mb-1">Appel Découverte</h2>
              <p className="text-white/40 text-sm">30 min • Gratuit</p>
            </div>

            {/* Calendar */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-white">
                  {format(currentMonth, 'MMMM yyyy', { locale: fr })}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
                    className="p-1.5 text-white/40 hover:text-white"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
                    className="p-1.5 text-white/40 hover:text-white"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-6">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                  <div
                    key={i}
                    className="text-center text-xs text-white/30 py-2"
                  >
                    {d}
                  </div>
                ))}
                {calendarDays.map((day, idx) => {
                  const isSelected =
                    selectedDate && isSameDay(day, selectedDate);
                  const isToday = isSameDay(day, startOfToday());
                  const isPast = day < startOfToday();
                  const isWeekendDay = isWeekend(day);
                  const isDisabled =
                    !hasAvailability(day) || isWeekendDay || isPast;
                  const isCurrentMonth =
                    day.getMonth() === currentMonth.getMonth();

                  return (
                    <button
                      key={idx}
                      onClick={() => handleDateSelect(day)}
                      disabled={isDisabled}
                      className={`
                        aspect-square text-sm transition-colors
                        ${isSelected ? 'bg-accent text-black font-medium' : ''}
                        ${
                          isPast
                            ? 'text-white/10 cursor-not-allowed opacity-40'
                            : ''
                        }
                        ${
                          isWeekendDay && !isPast
                            ? 'text-white/20 cursor-not-allowed'
                            : ''
                        }
                        ${
                          !isPast && !isWeekendDay && !isSelected
                            ? 'text-white/70 hover:text-white hover:bg-white/5'
                            : ''
                        }
                        ${!isCurrentMonth && !isPast ? 'opacity-30' : ''}
                        ${
                          isToday && !isSelected && !isPast
                            ? 'ring-1 ring-accent/40'
                            : ''
                        }
                      `}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div>
                <p className="text-sm text-white mb-4">
                  {format(selectedDate, 'EEEE d MMMM', { locale: fr })}
                </p>

                {isLoadingSlots ? (
                  <div className="text-center py-6">
                    <Loader2
                      size={20}
                      className="animate-spin text-white/40 mx-auto"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {upcomingDays
                      .find((d) => isSameDay(d.date, selectedDate))
                      ?.slots.map((slot) => {
                        const isSelected = selectedTime === slot;
                        const isPast = isSlotPast(selectedDate, slot);
                        const isAvailable =
                          !isPast && availableSlots.includes(slot);
                        const isDisabled =
                          isPast || !availableSlots.includes(slot);

                        return (
                          <button
                            key={slot}
                            onClick={() => handleTimeSelect(slot)}
                            disabled={isDisabled}
                            className={`
                              py-2.5 text-sm border transition-colors
                              ${
                                isSelected && isAvailable
                                  ? 'border-accent text-accent'
                                  : ''
                              }
                              ${
                                isPast
                                  ? 'border-white/5 text-white/15 cursor-not-allowed opacity-50'
                                  : ''
                              }
                              ${
                                !isPast && !availableSlots.includes(slot)
                                  ? 'border-white/5 text-white/20 line-through cursor-not-allowed'
                                  : ''
                              }
                              ${
                                isAvailable && !isSelected
                                  ? 'border-white/10 text-white/60 hover:border-white/30'
                                  : ''
                              }
                            `}
                            title={
                              isPast
                                ? 'Créneau passé'
                                : !availableSlots.includes(slot)
                                ? 'Déjà réservé'
                                : ''
                            }
                          >
                            {slot}
                          </button>
                        );
                      })}
                  </div>
                )}

                {errors.timeSlot && (
                  <p className="text-sm text-red-400 mb-4">{errors.timeSlot}</p>
                )}

                {selectedTime && (
                  <Button
                    onClick={handleContinueToForm}
                    disabled={!availableSlots.includes(selectedTime)}
                    className="w-full bg-accent text-black font-semibold disabled:opacity-30"
                  >
                    Continuer
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Form */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-sm text-white/50 hover:text-accent mb-2"
              >
                <ChevronLeft size={16} />
                Modifier
              </button>
              <p className="text-accent text-sm">
                {format(selectedDate, 'EEEE d MMMM', { locale: fr })} à{' '}
                {selectedTime}
              </p>
            </div>

            {/* Meeting Type */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'phone', icon: Phone, label: 'Téléphone' },
                { value: 'meet', icon: Video, label: 'Google Meet' },
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, meetingType: value });
                    setErrors({ ...errors, meetingType: null });
                  }}
                  className={`p-4 border text-left transition-colors ${
                    formData.meetingType === value
                      ? 'border-accent text-accent'
                      : 'border-white/10 text-white/60 hover:border-white/30'
                  }`}
                >
                  <Icon size={18} className="mb-2" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
            {errors.meetingType && (
              <p className="text-xs text-red-400">{errors.meetingType}</p>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Nom *"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
              />
              {errors.name && (
                <p className="text-xs text-red-400">{errors.name}</p>
              )}

              <input
                type="email"
                name="email"
                required
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email}</p>
              )}

              {formData.meetingType === 'phone' && (
                <>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Téléphone *"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-400">{errors.phone}</p>
                  )}
                </>
              )}

              <input
                type="url"
                name="company"
                placeholder="Site web (optionnel)"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
              />

              <select
                name="projectType"
                required
                value={formData.projectType}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-accent focus:outline-none"
              >
                <option value="" className="bg-[#262626]">
                  Type de projet *
                </option>
                <option value="saas" className="bg-[#262626]">
                  Application Web / SaaS
                </option>
                <option value="ecommerce" className="bg-[#262626]">
                  E-commerce
                </option>
                <option value="vitrine" className="bg-[#262626]">
                  Site Vitrine / MVP
                </option>
                <option value="autre" className="bg-[#262626]">
                  Autre
                </option>
              </select>
              {errors.projectType && (
                <p className="text-xs text-red-400">{errors.projectType}</p>
              )}
            </div>

            {/* Turnstile */}
            <div>
              <Turnstile
                key={turnstileKey}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                onSuccess={(token) => {
                  setTurnstileToken(token);
                  if (errors.turnstile) {
                    const { turnstile, ...rest } = errors;
                    setErrors(rest);
                  }
                }}
                onError={() => {
                  setTurnstileToken('');
                  setErrors({ ...errors, turnstile: 'Erreur CAPTCHA' });
                }}
                onExpire={() => {
                  setTurnstileToken('');
                  setErrors({ ...errors, turnstile: 'CAPTCHA expiré' });
                }}
                options={{ theme: 'dark', size: 'normal' }}
              />
              {errors.turnstile && (
                <p className="text-xs text-red-400 mt-2">{errors.turnstile}</p>
              )}
            </div>

            {errors.submit && (
              <p className="text-sm text-red-400">{errors.submit}</p>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                className="flex-1 bg-transparent border border-white/20 text-white hover:border-white/40"
              >
                Retour
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !turnstileToken}
                className="flex-1 bg-accent text-black font-semibold disabled:opacity-30"
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    Confirmer <Check size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        {/* STEP 3: Success */}
        {step === 3 && (
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-2xl text-white italic mb-2">Confirmé</h3>
              <p className="text-white/50 text-sm">
                {format(selectedDate, 'EEEE d MMMM', { locale: fr })} à{' '}
                {selectedTime}
              </p>
            </div>

            <div className="text-left bg-white/5 border border-white/10 p-6 space-y-3">
              <p className="text-sm text-white/70">
                Confirmation envoyée à{' '}
                <span className="text-white">{formData.email}</span>
              </p>
              {formData.meetingType === 'phone' ? (
                <p className="text-sm text-white/70">
                  Je vous appellerai au{' '}
                  <span className="text-white">{formData.phone}</span>
                </p>
              ) : (
                <p className="text-sm text-white/70">
                  Lien Google Meet envoyé par email
                </p>
              )}
            </div>

            <Button
              onClick={handleReset}
              className="bg-accent text-black font-semibold px-8"
            >
              Fermer
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BookingWidget;
