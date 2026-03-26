'use client';

import { ArrowRight } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';
import { FadeIn } from '../motion/FadeIn';
import { Button } from '../ui/button';

const CTA = () => {
  const { openBookingModal } = useBooking();

  return (
    <section id="cta">
      <div className="py-16 sm:py-24 border-t border-white/10">
        {/* Centered layout */}
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <p className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
              Prochaine étape
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl italic leading-tight mb-6">
              On en <span className="text-accent">discute</span> ?
            </h2>

            <p className="text-white/50 mb-10 max-w-md mx-auto">
              30 minutes pour parler de votre projet. Gratuit, sans engagement.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} y={20}>
            <Button
              onClick={openBookingModal}
              className="group bg-accent text-black font-semibold cursor-pointer px-10 py-6 text-base"
            >
              <span className="flex items-center gap-3">
                Réserver un appel
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Button>

            <p className="text-white/30 text-xs mt-6">Réponse sous 24h</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CTA;
