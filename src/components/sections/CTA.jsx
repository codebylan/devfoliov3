'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useBooking } from '../../contexts/BookingContext';

const CTA = () => {
  const { openBookingModal } = useBooking();

  return (
    <section id="cta" className="relative overflow-hidden">
      {/* Background Accent Box */}
      <div className="relative  rounded-sm p-4 sm:p-6 lg:p-10 bg-linear-to-br from-black via-[#1a1a1a] to-black">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* Eyebrow */}

          {/* Main Heading */}
          <h2 className="text-3xl italic leading-tight">
            Transformons votre vision{' '}
            <span className="text-accent">en réalité digitale.</span>
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base lg:text-sm text-white/70 leading-relaxed max-w-2xl mx-auto">
            Discutons de votre projet. Aucun engagement, juste un échange
            transparent sur vos ambitions et comment je peux vous aider à les
            concrétiser.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={openBookingModal}
              className="group bg-black text-black cursor-pointer font-semibold px-8 py-6 text-base sm:text-sm duration-300"
            >
              Réserver un appel gratuit
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-sm sm:gap-8   text-white/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Réponse sous 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Devis personnalisé</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
