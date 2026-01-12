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
import { AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  Phone,
  Video,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import me2 from '../../../public/images/me2.png';
import { getAvailableSlots } from '../../actions/availability';
import { createBooking } from '../../actions/booking';
import { Button } from '../ui/button';
import Modal from '../ui/modal';

// Generate time slots for working hours (10h-19h, every 30 minutes)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 10; hour < 19; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

// Helper function to check if a date has availability (weekdays only)
const hasAvailability = (date) => {
  return !isWeekend(date);
};

// Helper function to get time slots for a date
const getTimeSlotsForDate = (date) => {
  if (hasAvailability(date)) {
    return TIME_SLOTS;
  }
  return [];
};

// Validation Schema
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
  const [step, setStep] = useState(1); // 1: Calendar+Slots, 2: Form, 3: Success
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(startOfToday());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0); // Key pour forcer la réinitialisation
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

  // Generate all days for the current month view (including surrounding weeks)
  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart, { locale: fr });
    const calendarEnd = endOfWeek(monthEnd, { locale: fr });

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  };

  // Generate only available days for time slots
  const generateUpcomingDays = () => {
    const days = [];
    const today = startOfToday();
    for (let i = 0; i < 30; i++) {
      const date = addDays(today, i);
      const slots = getTimeSlotsForDate(date);
      if (slots.length > 0) {
        const dateKey = format(date, 'yyyy-MM-dd');
        days.push({
          date,
          dateKey,
          slots,
        });
      }
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const upcomingDays = generateUpcomingDays();

  const handleDateSelect = (date) => {
    // Only allow selection if date has availability (weekday)
    if (hasAvailability(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
      setAvailableSlots([]); // Reset slots while loading
    }
  };

  // Fetch available slots when date is selected + polling pour rafraîchir en temps réel
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

        if (result.error) {
          console.error('Error fetching slots:', result.error);
          setAvailableSlots([]);
        } else {
          setAvailableSlots(result.slots || []);
        }
      } catch (error) {
        console.error('Error fetching available slots:', error);
        setAvailableSlots([]);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    // Chargement initial
    fetchAvailableSlots();

    // Polling toutes les 30 secondes pour rafraîchir les créneaux disponibles
    // (s'arrête automatiquement si selectedDate change ou si le composant est démonté)
    const intervalId = setInterval(fetchAvailableSlots, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedDate]);

  const handleTimeSelect = (time) => {
    // Ne pas permettre la sélection si les créneaux sont en chargement
    if (isLoadingSlots) {
      return;
    }

    // Ne pas permettre la sélection d'un créneau réservé
    if (availableSlots.length === 0 || !availableSlots.includes(time)) {
      return;
    }

    // Réinitialiser les erreurs de créneau
    if (errors.timeSlot) {
      const { timeSlot, ...restErrors } = errors;
      setErrors(restErrors);
    }

    setSelectedTime(time);
  };

  const handleContinueToForm = () => {
    if (!selectedDate || !selectedTime) {
      return;
    }

    // Vérifier que le créneau sélectionné est toujours disponible
    if (!availableSlots.includes(selectedTime)) {
      setSelectedTime(null);
      setErrors({
        timeSlot:
          "Ce créneau vient d'être réservé. Veuillez en choisir un autre.",
      });
      return;
    }

    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Custom validation: meetingType required
      const validationData = { ...formData };
      if (!validationData.meetingType) {
        setErrors({
          meetingType:
            'Veuillez sélectionner un type de rendez-vous (appel téléphonique ou Google Meet)',
        });
        setIsSubmitting(false);
        return;
      }

      // Custom validation: phone required if meetingType is 'phone'
      if (validationData.meetingType === 'phone' && !validationData.phone) {
        setErrors({
          phone: 'Le numéro de téléphone est requis pour un appel téléphonique',
        });
        setIsSubmitting(false);
        return;
      }

      // Validation Turnstile token
      if (!turnstileToken) {
        setErrors({
          turnstile: 'Veuillez compléter la vérification CAPTCHA',
        });
        setIsSubmitting(false);
        return;
      }

      // Validation Zod
      bookingSchema.parse(validationData);

      // Formater la date et l'heure pour bookingStart
      const [hours, minutes] = selectedTime.split(':');
      const bookingStartDate = new Date(selectedDate);
      bookingStartDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // Appeler l'action createBooking
      const result = await createBooking({
        name: validationData.name,
        email: validationData.email,
        phone: validationData.phone || '',
        company: validationData.company || '',
        projectType: validationData.projectType,
        meetingType: validationData.meetingType,
        bookingStart: bookingStartDate.toISOString(),
        timezone: 'Europe/Paris',
        turnstileToken,
      });

      // Gérer les erreurs
      if (result.error) {
        setErrors({
          submit: result.error,
        });
        setIsSubmitting(false);
        return;
      }

      // Succès : passer à l'étape 3
      setStep(3);
      setIsSubmitting(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        // ZodError utilise 'issues' pour stocker les erreurs
        const issues = error.issues || error.errors || [];
        issues.forEach((err) => {
          if (err.path && err.path.length > 0) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error('Error submitting form:', error);
        setErrors({
          submit: 'Une erreur est survenue. Veuillez réessayer.',
        });
      }
      setIsSubmitting(false);
    }
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
    setTurnstileKey((prev) => prev + 1); // Force Turnstile reset
    onClose();
  };

  const handleTurnstileSuccess = (token) => {
    setTurnstileToken(token);
    if (errors.turnstile) {
      const { turnstile, ...restErrors } = errors;
      setErrors(restErrors);
    }
  };

  const handleTurnstileError = () => {
    setTurnstileToken('');
    setErrors({
      ...errors,
      turnstile: 'Erreur de vérification CAPTCHA. Veuillez réessayer.',
    });
  };

  const handleTurnstileExpire = () => {
    setTurnstileToken('');
    setErrors({
      ...errors,
      turnstile: 'La vérification CAPTCHA a expiré. Veuillez réessayer.',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="">
      <div className="relative">
        <AnimatePresence mode="wait">
          {/* STEP 1: Calendar + Time Slots (Clean Minimal Design) */}
          {step === 1 && (
            <div className="p-6 lg:p-8">
              {/* Simple Header */}
              <div className="mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-base font-bold text-black shrink-0">
                    <Image
                      src={me2}
                      alt="Dylan Agboton"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg italic text-white">
                      Appel Découverte Gratuit
                    </h2>
                    <p className="text-xs text-white/50">
                      30 minutes • Sans engagement
                    </p>
                  </div>
                </div>

                {selectedDate && selectedTime && (
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <CalendarIcon size={14} className="text-accent" />
                    <span>
                      {format(selectedDate, 'EEEE d MMMM', { locale: fr })} à{' '}
                      {selectedTime}
                    </span>
                  </div>
                )}
              </div>

              {/* Main Content - Vertical Layout */}
              <div className="space-y-8">
                {/* Calendar */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-white">
                      {format(currentMonth, 'MMMM yyyy', { locale: fr })}
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setCurrentMonth(addDays(currentMonth, -30))
                        }
                        className="p-1.5 hover:bg-black rounded transition-colors text-black hover:text-white"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentMonth(addDays(currentMonth, 30))
                        }
                        className="p-1.5 hover:bg-white/5 rounded transition-colors text-white/50 hover:text-white"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {/* Days Header */}
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, idx) => (
                      <div
                        key={idx}
                        className="text-center text-xs font-medium text-white/30 py-2"
                      >
                        {day}
                      </div>
                    ))}

                    {/* Calendar Days */}
                    {calendarDays.map((day, idx) => {
                      const dateKey = format(day, 'yyyy-MM-dd');
                      const isSelected =
                        selectedDate && isSameDay(day, selectedDate);
                      const isToday = isSameDay(day, startOfToday());
                      const dateHasAvailability = hasAvailability(day);
                      const isCurrentMonth =
                        day.getMonth() === currentMonth.getMonth();
                      const isWeekendDay = isWeekend(day);
                      const isPast = day < startOfToday() && !isToday;
                      const isDisabled =
                        !dateHasAvailability || isWeekendDay || isPast;

                      return (
                        <button
                          key={idx}
                          onClick={() => handleDateSelect(day)}
                          disabled={isDisabled}
                          className={`
                            aspect-square rounded text-sm font-medium transition-all relative
                            ${isSelected ? 'bg-[#C8B792] text-white' : ''}
                            ${
                              isPast
                                ? 'text-white/20 cursor-not-allowed opacity-50'
                                : isDisabled
                                ? 'text-white/20 cursor-not-allowed'
                                : 'text-white hover:bg-white/5'
                            }
                            ${
                              isToday && !isSelected && !isDisabled
                                ? 'ring-1 ring-accent/40'
                                : ''
                            }
                            ${!isCurrentMonth && !isPast ? 'opacity-30' : ''}
                          `}
                        >
                          {format(day, 'd')}
                          {dateHasAvailability &&
                            !isWeekendDay &&
                            !isPast &&
                            !isSelected && (
                              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                            )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  {!selectedDate ? (
                    <div className="text-center py-12">
                      <Clock size={32} className="text-white/20 mx-auto mb-3" />
                      <p className="text-sm text-565">
                        Sélectionnez une date pour voir les créneaux
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-4">
                        {format(selectedDate, 'EEEE d MMMM', { locale: fr })}
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
                        {isLoadingSlots ? (
                          <div className="col-span-full text-center py-4">
                            <Loader2
                              size={20}
                              className="animate-spin text-white/40 mx-auto mb-2"
                            />
                            <p className="text-xs text-white/40">
                              Chargement des créneaux...
                            </p>
                          </div>
                        ) : (
                          (() => {
                            const selectedDay = upcomingDays.find((day) =>
                              isSameDay(day.date, selectedDate)
                            );
                            if (!selectedDay) return null;

                            // Afficher TOUS les créneaux possibles pour cette date
                            // Les créneaux réservés seront grisés et désactivés
                            return selectedDay.slots.map((slot, idx) => {
                              const isSelected = selectedTime === slot;
                              // Un créneau est disponible seulement s'il est dans la liste availableSlots
                              // Si availableSlots est vide (en chargement), considérer tous comme non disponibles
                              const isAvailable =
                                availableSlots.length > 0 &&
                                availableSlots.includes(slot);
                              const isDisabled =
                                availableSlots.length === 0 ||
                                !isAvailable ||
                                isLoadingSlots;
                              const isReserved =
                                availableSlots.length > 0 && !isAvailable;

                              return (
                                <button
                                  key={slot}
                                  onClick={() => handleTimeSelect(slot)}
                                  disabled={isDisabled}
                                  className={`
                                    px-4 py-2.5 rounded text-sm font-medium transition-all border relative
                                    ${
                                      isSelected && isAvailable
                                        ? 'bg-[#C8B792] text-black border-accent'
                                        : isReserved
                                        ? 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed opacity-40 line-through'
                                        : isDisabled
                                        ? 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed opacity-50'
                                        : 'bg-white/5 text-white border-white/10 hover:border-accent/50 hover:bg-white/5'
                                    }
                                  `}
                                  title={
                                    isReserved
                                      ? 'Créneau déjà réservé'
                                      : isLoadingSlots
                                      ? 'Chargement...'
                                      : undefined
                                  }
                                >
                                  {slot}
                                  {isReserved && (
                                    <span className="absolute top-1 right-1 text-[8px] text-white/30">
                                      ✕
                                    </span>
                                  )}
                                </button>
                              );
                            });
                          })()
                        )}
                      </div>

                      {errors.timeSlot && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400">
                          {errors.timeSlot}
                        </div>
                      )}

                      {selectedTime && (
                        <Button
                          onClick={handleContinueToForm}
                          disabled={
                            !availableSlots.includes(selectedTime) ||
                            isLoadingSlots ||
                            availableSlots.length === 0
                          }
                          className="w-full bg-black text-black hover:bg-black cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continuer
                          <ChevronRight size={16} className="ml-2" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Form */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6">
              {/* Header */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <h2 className="text-xl italic  text-white mb-2">
                  Vos informations
                </h2>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <CalendarIcon size={14} className="text-accent" />
                  <span>
                    {selectedDate &&
                      format(selectedDate, 'EEEE d MMMM', { locale: fr })}{' '}
                    à {selectedTime}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="ml-auto text-xs text-accent hover:underline flex items-center gap-1"
                  >
                    <ChevronLeft size={12} />
                    Modifier
                  </button>
                </div>
              </div>

              {/* Meeting Type Selection */}
              <div className="space-y-3 pb-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white/80">
                    Type de rendez-vous <span className="text-red-400">*</span>
                  </label>
                  {!formData.meetingType && (
                    <span className="text-xs text-accent animate-pulse">
                      ⚠️ Veuillez choisir une option
                    </span>
                  )}
                </div>

                {/* Message d'alerte si aucune méthode sélectionnée */}
                {!formData.meetingType && (
                  <div className="p-3 bg-accent/10 border border-accent/30 rounded text-sm text-accent animate-in">
                    <p className="font-medium mb-1">
                      Choisissez votre mode de communication
                    </p>
                    <p className="text-xs text-white/60">
                      Sélectionnez comment vous souhaitez que nous échangions
                      lors de votre appel découverte.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, meetingType: 'phone' });
                      setErrors({ ...errors, meetingType: null });
                    }}
                    className={`p-4 rounded border transition-all text-left relative ${
                      formData.meetingType === 'phone'
                        ? 'border-accent bg-accent/10 ring-2 ring-accent/50'
                        : !formData.meetingType
                        ? 'border-accent/40 bg-accent/5 hover:border-accent/60 hover:bg-accent/10 animate-pulse'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    {!formData.meetingType && (
                      <span className="absolute -top-2 -right-2 w-3 h-3 bg-accent rounded-full animate-ping" />
                    )}
                    <div className="flex items-center gap-3">
                      <Phone
                        size={20}
                        className={
                          formData.meetingType === 'phone'
                            ? 'text-accent'
                            : !formData.meetingType
                            ? 'text-accent/80'
                            : 'text-white/60'
                        }
                      />
                      <div>
                        <div
                          className={`text-sm font-medium ${
                            formData.meetingType === 'phone' ||
                            !formData.meetingType
                              ? 'text-white'
                              : 'text-white/80'
                          }`}
                        >
                          Appel téléphonique
                        </div>
                        <div className="text-xs text-white/50">
                          Je vous appellerai
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, meetingType: 'meet' });
                      setErrors({ ...errors, meetingType: null });
                    }}
                    className={`p-4 rounded border transition-all text-left relative ${
                      formData.meetingType === 'meet'
                        ? 'border-accent bg-accent/10 ring-2 ring-accent/50'
                        : !formData.meetingType
                        ? 'border-accent/40 bg-accent/5 hover:border-accent/60 hover:bg-accent/10 animate-pulse'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    {!formData.meetingType && (
                      <span className="absolute -top-2 -right-2 w-3 h-3 bg-accent rounded-full animate-ping" />
                    )}
                    <div className="flex items-center gap-3">
                      <Video
                        size={20}
                        className={
                          formData.meetingType === 'meet'
                            ? 'text-accent'
                            : !formData.meetingType
                            ? 'text-accent/80'
                            : 'text-white/60'
                        }
                      />
                      <div>
                        <div
                          className={`text-sm font-medium ${
                            formData.meetingType === 'meet' ||
                            !formData.meetingType
                              ? 'text-white'
                              : 'text-white/80'
                          }`}
                        >
                          Google Meet
                        </div>
                        <div className="text-xs text-white/50">
                          Lien envoyé par email
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                {errors.meetingType && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400 animate-in">
                    <p className="font-medium">{errors.meetingType}</p>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">
                    Nom complet <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${
                      errors.name ? 'border-red-500' : 'border-white/10'
                    } rounded px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none transition-all`}
                    placeholder="Jean Dupont"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">
                    Email professionnel <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${
                      errors.email ? 'border-red-500' : 'border-white/10'
                    } rounded px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none transition-all`}
                    placeholder="jean@entreprise.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Phone - Only shown if meetingType is 'phone' */}
                {formData.meetingType === 'phone' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">
                      Numéro de téléphone{' '}
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required={formData.meetingType === 'phone'}
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${
                        errors.phone ? 'border-red-500' : 'border-white/10'
                      } rounded px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none transition-all`}
                      placeholder="+33 6 12 34 56 78"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-400">{errors.phone}</p>
                    )}
                  </div>
                )}

                {/* Company URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">
                    Site web de l&apos;entreprise
                    <span className="text-white/40 text-xs ml-1">
                      (optionnel)
                    </span>
                  </label>
                  <input
                    type="url"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${
                      errors.company ? 'border-red-500' : 'border-white/10'
                    } rounded px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none transition-all`}
                    placeholder="https://votre-entreprise.com"
                  />
                  {errors.company && (
                    <p className="text-xs text-red-400">{errors.company}</p>
                  )}
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">
                    Type de projet <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${
                      errors.projectType ? 'border-red-500' : 'border-white/10'
                    } rounded px-4 py-3 text-sm text-white focus:border-accent focus:outline-none transition-all cursor-pointer`}
                  >
                    <option value="" className="bg-[#262626]">
                      Sélectionnez un type...
                    </option>
                    <option value="saas" className="bg-[#262626]">
                      Application Web / SaaS
                    </option>
                    <option value="ecommerce" className="bg-[#262626]">
                      Site E-commerce
                    </option>
                    <option value="vitrine" className="bg-[#262626]">
                      Site Vitrine / MVP
                    </option>
                    <option value="autre" className="bg-[#262626]">
                      Autre projet
                    </option>
                  </select>
                  {errors.projectType && (
                    <p className="text-xs text-red-400">{errors.projectType}</p>
                  )}
                </div>
              </div>

              {/* Turnstile CAPTCHA */}
              <div className="space-y-2 pt-2">
                <Turnstile
                  key={turnstileKey}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                  onSuccess={handleTurnstileSuccess}
                  onError={handleTurnstileError}
                  onExpire={handleTurnstileExpire}
                  options={{
                    theme: 'dark',
                    size: 'normal',
                  }}
                />
                {errors.turnstile && (
                  <p className="text-xs text-red-400">{errors.turnstile}</p>
                )}
              </div>

              {/* Error message */}
              {errors.submit && (
                <div className="pt-2">
                  <p className="text-sm text-red-400">{errors.submit}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                  className="flex-1 border border-white/20 hover:bg-white/5 bg-transparent text-white"
                >
                  <ChevronLeft size={16} className="mr-2" />
                  Retour
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !turnstileToken}
                  className="flex-1 bg-black text-black hover:bg-black/75 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      Confirmation...
                    </>
                  ) : (
                    <>
                      Confirmer
                      <Check size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* STEP 3: Success */}
          {step === 3 && (
            <div className="p-6 lg:p-8">
              <div className="text-center space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <h3 className="text-2xl lg:text-3xl font-semibold text-white italic">
                    Rendez-vous confirmé
                  </h3>
                  <p className="text-white/60 text-sm">
                    Votre appel découverte est réservé avec succès
                  </p>
                </div>

                {/* Details Card */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4 text-left max-w-md mx-auto">
                  <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <CalendarIcon size={18} className="text-[#C8B792]" />
                    <div>
                      <p className="text-xs text-white/50">Date</p>
                      <p className="text-sm font-medium text-white">
                        {selectedDate &&
                          format(selectedDate, 'EEEE d MMMM yyyy', {
                            locale: fr,
                          })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <Clock size={18} className="text-[#C8B792]" />
                    <div>
                      <p className="text-xs text-white/50">Heure</p>
                      <p className="text-sm font-medium text-white">
                        {selectedTime}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <p className="text-xs text-white/50 mb-1">Confirmation</p>
                      <p className="text-sm text-white/80">
                        Email envoyé à{' '}
                        <strong className="text-white">{formData.email}</strong>
                      </p>
                    </div>

                    {formData.meetingType === 'phone' ? (
                      <div>
                        <p className="text-xs text-white/50 mb-1">Contact</p>
                        <p className="text-sm text-white/80">
                          Je vous appellerai au{' '}
                          <strong className="text-white">
                            {formData.phone}
                          </strong>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-white/50 mb-1">
                          Prochaines étapes
                        </p>
                        <p className="text-sm text-white/80">
                          Le lien Google Meet sera envoyé par email après
                          validation de votre réservation
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Close Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleReset}
                    className="bg-black text-white hover:bg-black/80 font-medium px-6"
                  >
                    Parfait, merci !
                  </Button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default BookingWidget;
