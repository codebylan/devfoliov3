'use client';

import { Calendar, ChevronLeft, Clock, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import Modal from '../ui/modal';

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: Date, 2: Heure, 3: Infos
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });

  // Générer les 14 prochains jours
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  // Générer les créneaux de 10h à 19h (par 30min)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour < 19; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const dates = generateDates();
  const timeSlots = generateTimeSlots();

  const projectTypes = [
    'Site Vitrine / MVP',
    'Application Web / SaaS',
    'Intégration IA',
    'Maintenance',
    'Conseil Stratégique',
    'Autre',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      date: selectedDate,
      time: selectedTime,
      ...formData,
    };
    console.log('Réservation:', booking);
    alert(
      `Rendez-vous confirmé le ${selectedDate?.toLocaleDateString(
        'fr-FR'
      )} à ${selectedTime} !`
    );
    onClose();
    // Reset
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: '',
    });
  };

  const formatDate = (date) => {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const months = [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Juin',
      'Juil',
      'Août',
      'Sep',
      'Oct',
      'Nov',
      'Déc',
    ];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
    };
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Réserver un appel gratuit">
      <div className="p-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  step >= s
                    ? 'bg-accent text-black'
                    : 'bg-white/5 text-white/40'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-12 h-px mx-2 ${
                    step > s ? 'bg-accent' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Sélection de la date */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-white">
                Choisissez une date
              </h3>
              <p className="text-sm text-white/50">
                Sélectionnez un jour disponible
              </p>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {dates.map((date) => {
                const formatted = formatDate(date);
                const isSelected =
                  selectedDate?.toDateString() === date.toDateString();
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`
                      p-3 rounded-sm border transition-all
                      ${
                        isSelected
                          ? 'border-accent bg-black text-accent'
                          : 'border-white/10 hover:border-accent/50 text-white/70 hover:text-white'
                      }
                    `}
                  >
                    <div className="text-xs">{formatted.day}</div>
                    <div className="text-xl font-bold">{formatted.date}</div>
                    <div className="text-xs">{formatted.month}</div>
                  </button>
                );
              })}
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!selectedDate}
              className="w-full bg-black text-black hover:bg-accent/90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuer
            </Button>
          </div>
        )}

        {/* Step 2: Sélection de l'heure */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <button
                onClick={() => setStep(1)}
                className="text-sm text-accent hover:underline flex items-center gap-1 mx-auto"
              >
                <ChevronLeft size={16} />
                {selectedDate?.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </button>
              <h3 className="text-lg font-semibold text-white">
                Choisissez un créneau
              </h3>
              <p className="text-sm text-white/50">Entre 10h00 et 19h00</p>
            </div>

            <div className="grid grid-cols-4 gap-3 max-h-[400px] overflow-y-auto">
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`
                      py-3 px-4 rounded-sm border text-sm font-medium transition-all
                      ${
                        isSelected
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-white/10 hover:border-accent/50 text-white/70 hover:text-white'
                      }
                    `}
                  >
                    <Clock size={14} className="inline mr-1" />
                    {time}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(1)}
                className="flex-1 border border-white/10 hover:bg-white/5 bg-transparent"
              >
                Retour
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!selectedTime}
                className="flex-1 bg-accent text-black hover:bg-accent/90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuer
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Informations personnelles */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center space-y-2 pb-4 border-b border-white/10">
              <button
                onClick={() => setStep(2)}
                className="text-sm text-accent hover:underline flex items-center gap-1 mx-auto"
              >
                <ChevronLeft size={16} />
                Modifier le créneau
              </button>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Calendar size={16} className="text-accent" />
                <span className="text-white/70">
                  {selectedDate?.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
                <span className="text-white/40">•</span>
                <Clock size={16} className="text-accent" />
                <span className="text-white/70">{selectedTime}</span>
              </div>
            </div>

            {/* Nom */}
            <div className="space-y-2">
              <label className="text-sm text-white/70 flex items-center gap-2">
                <User size={16} className="text-accent" />
                Nom complet *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:border-accent focus:outline-none transition-colors"
                placeholder="Votre nom"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-white/70 flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:border-accent focus:outline-none transition-colors"
                placeholder="votre@email.com"
              />
            </div>

            {/* Téléphone */}
            <div className="space-y-2">
              <label className="text-sm text-white/70 flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                Téléphone *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:border-accent focus:outline-none transition-colors"
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            {/* Type de projet */}
            <div className="space-y-2">
              <label className="text-sm text-white/70">Type de projet *</label>
              <select
                name="projectType"
                required
                value={formData.projectType}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:border-accent focus:outline-none transition-colors"
              >
                <option value="">Sélectionnez...</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm text-white/70">
                Parlez-moi de votre projet (optionnel)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:border-accent focus:outline-none transition-colors resize-none"
                placeholder="Décrivez brièvement votre projet..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 border border-white/10 hover:bg-white/5 bg-transparent"
              >
                Retour
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-accent text-black hover:bg-accent/90 font-semibold"
              >
                Confirmer le rendez-vous
              </Button>
            </div>

            <p className="text-xs text-center text-white/40 pt-2">
              Je vous recontacterai pour confirmer le créneau sous 24h
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default BookingModal;
