'use client';

import { ArrowRight } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';
import { pricingData } from '../../data/pricing';
import { Button } from '../ui/button';

const Prices = () => {
  const { openBookingModal } = useBooking();

  return (
    <section id="prices">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
        <div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl italic leading-[0.95]">
            <span className="text-accent">Investissement,</span>
            <br />
            pas dépense.
          </h2>
        </div>
        <div className="lg:text-right">
          <p className="text-white/50 text-sm max-w-sm">
            Tarifs transparents, adaptés à la valeur créée. Pas de surprise, pas
            de coûts cachés.
          </p>
<<<<<<< HEAD
          <p className="text-accent text-sm mt-2">
            TJM : <span className="font-semibold">550€</span>/jour
          </p>
=======
>>>>>>> develop
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="space-y-4">
        {pricingData.map((tier, index) => (
          <div
            key={index}
            className={`group relative ${
              tier.isRecommended ? 'bg-accent/3' : ''
            }`}
          >
            {/* Main Row */}
            <div
              className={`
                grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 
                py-8 lg:py-10 px-6 lg:px-8
                border-t border-white/10
                ${tier.isRecommended ? 'border-t-accent/40' : ''}
              `}
            >
              {/* Tier Name & Badge */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl sm:text-2xl text-white font-medium">
                    {tier.title}
                  </h3>
                  {tier.isRecommended && (
                    <span className="text-[10px] uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded-sm">
                      Recommandé
                    </span>
                  )}
                </div>
                <p className="text-white/40 text-sm italic">{tier.subtitle}</p>
              </div>

              {/* Price */}
              <div className="lg:col-span-2 flex items-start">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">
                    {tier.price.prefix}
                  </p>
                  <p className="text-3xl sm:text-4xl font-light text-accent">
                    {tier.price.amount}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="lg:col-span-5">
                <ul className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-sm text-white/60 flex items-start gap-3"
                    >
                      <span className="text-accent/60 mt-0.5">—</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {tier.bonus && (
                    <li className="text-sm text-accent flex items-start gap-3 pt-2">
                      <span className="text-accent mt-0.5">+</span>
                      <span className="font-medium">{tier.bonus}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* CTA */}
              <div className="lg:col-span-2 flex items-center justify-start lg:justify-end">
                <Button
                  onClick={openBookingModal}
                  className={`
                    group/btn cursor-pointer text-sm px-6 py-5 transition-all duration-300
                    ${
                      tier.isRecommended
                        ? 'bg-accent text-black font-semibold'
                        : 'bg-transparent border border-white/20 hover:border-accent hover:bg-accent/5 text-white'
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    Devis
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Border */}
      <div className="border-t border-white/10 mt-0" />

      {/* Footer Note */}
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/30">
        <p>
          Chaque projet est unique. Les tarifs sont indicatifs et ajustés selon
          vos besoins spécifiques.
        </p>
        <button
          onClick={openBookingModal}
          className="text-accent hover:underline cursor-pointer"
        >
          Discutons de votre projet →
        </button>
      </div>
    </section>
  );
};

export default Prices;
