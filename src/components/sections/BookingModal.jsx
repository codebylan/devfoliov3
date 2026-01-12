'use client';

import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import Modal from '../ui/modal';

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour < 19; hour++) {
      slots.push(`${hour}:00`);
      if (hour < 18) slots.push(`${hour}:30`);
    }
    return slots;
  };

  const dates = generateDates();
  const timeSlots = generateTimeSlots();

  const projectTypes = [
    'Site Vitrine / MVP',
    'Application Web',
    'Intégration IA',
    'Maintenance',
    'Autre',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking:', {
      date: selectedDate,
      time: selectedTime,
      ...formData,
    });
    alert(`Rendez-vous confirmé !`);
    onClose();
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

  const formatDate = (date) => ({
    day: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
    num: date.getDate(),
    month: date.toLocaleDateString('fr-FR', { month: 'short' }),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Réserver un appel">
      <div className="p-6 sm:p-8">
        {/* Step indicator */}
        <div className="flex items-center gap-4 mb-8 text-xs text-white/40">
          <span className={step >= 1 ? 'text-accent' : ''}>Date</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-accent' : ''}>Heure</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-accent' : ''}>Infos</span>
        </div>

        {/* Step 1: Date */}
        {step === 1 && (
          <div>
            <h3 className="text-xl text-white mb-6">Choisissez une date</h3>

            <div className="grid grid-cols-5 gap-2 mb-8">
              {dates.map((date) => {
                const f = formatDate(date);
                const isSelected =
                  selectedDate?.toDateString() === date.toDateString();
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`py-3 text-center border transition-colors ${
                      isSelected
                        ? 'border-accent text-accent'
                        : 'border-white/10 text-white/60 hover:border-white/30'
                    }`}
                  >
                    <div className="text-[10px] uppercase">{f.day}</div>
                    <div className="text-lg font-medium">{f.num}</div>
                  </button>
                );
              })}
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!selectedDate}
              className="w-full bg-accent text-black font-semibold disabled:opacity-30"
            >
              Continuer
            </Button>
          </div>
        )}

        {/* Step 2: Time */}
        {step === 2 && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-sm text-white/50 hover:text-accent mb-4"
            >
              <ChevronLeft size={16} />
              {selectedDate?.toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </button>

            <h3 className="text-xl text-white mb-6">Choisissez un créneau</h3>

            <div className="grid grid-cols-4 gap-2 mb-8">
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 text-sm border transition-colors ${
                      isSelected
                        ? 'border-accent text-accent'
                        : 'border-white/10 text-white/60 hover:border-white/30'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(1)}
                className="flex-1 bg-transparent border border-white/20 text-white hover:border-white/40"
              >
                Retour
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!selectedTime}
                className="flex-1 bg-accent text-black font-semibold disabled:opacity-30"
              >
                Continuer
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Form */}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-1 text-sm text-white/50 hover:text-accent mb-2"
            >
              <ChevronLeft size={16} />
              Modifier
            </button>

            <p className="text-accent text-sm mb-6">
              {selectedDate?.toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}{' '}
              à {selectedTime}
            </p>

            <div className="space-y-4 mb-8">
              <input
                type="text"
                name="name"
                required
                placeholder="Nom *"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Téléphone *"
                value={formData.phone}
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
                {projectTypes.map((type) => (
                  <option key={type} value={type} className="bg-[#262626]">
                    {type}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                placeholder="Message (optionnel)"
                value={formData.message}
                onChange={handleChange}
                rows={2}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:border-accent focus:outline-none resize-none"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 bg-transparent border border-white/20 text-white hover:border-white/40"
              >
                Retour
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-accent text-black font-semibold"
              >
                Confirmer
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default BookingModal;
