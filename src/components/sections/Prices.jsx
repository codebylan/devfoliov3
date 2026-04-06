'use client';

import { ArrowRight } from 'lucide-react'; // kept for CTA button inside cards
import { useBooking } from '../../contexts/BookingContext';
import { pricingData } from '../../data/pricing';
import { FadeIn, Stagger, StaggerItem } from '../motion/FadeIn';
import { Button } from '../ui/button';

const Prices = () => {
  const { openBookingModal } = useBooking();

  return (
    <section id="prices">
      {/* Header */}
      <FadeIn className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
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
        </div>
      </FadeIn>

      {/* Pricing Grid */}
      <Stagger stagger={0.15}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.07]">
          {pricingData.map((tier, index) => (
            <StaggerItem key={index} y={40}>
              <div
                className={`relative flex flex-col p-8 lg:p-10 transition-colors duration-300 h-full ${
                  tier.isRecommended
                    ? 'bg-accent/[0.04]'
                    : 'bg-[#080808] hover:bg-white/[0.02]'
                }`}
              >
                {/* Recommended accent bar */}
                {tier.isRecommended && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                )}

                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-lg sm:text-xl text-white font-medium mb-2">
                      {tier.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {tier.subtitle}
                    </p>
                  </div>
                  {tier.isRecommended && (
                    <span className="shrink-0 text-[10px] uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-sm">
                      Recommandé
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-white/[0.07]">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
                    {tier.price.prefix}
                  </p>
                  <p
                    className={`text-5xl sm:text-6xl font-light tracking-tight ${
                      tier.isRecommended ? 'text-accent' : 'text-white'
                    }`}
                  >
                    {tier.price.amount}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-sm text-white/55 flex items-start gap-3"
                    >
                      <span className="text-accent/50 mt-0.5 shrink-0">—</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {tier.bonus && (
                    <li className="text-sm text-accent/90 flex items-start gap-3 pt-3 mt-1 border-t border-white/[0.06]">
                      <span className="shrink-0 mt-0.5">+</span>
                      <span className="font-medium">{tier.bonus}</span>
                    </li>
                  )}
                </ul>

                {/* CTA */}
                <Button
                  onClick={openBookingModal}
                  className={`
                    group/btn w-full cursor-pointer text-sm px-6 py-5 transition-all duration-300 rounded-none
                    ${
                      tier.isRecommended
                        ? 'bg-accent text-black font-semibold hover:bg-accent/90'
                        : 'bg-transparent border border-white/15 hover:border-accent/60 hover:bg-accent/5 text-white'
                    }
                  `}
                >
                  <span className="flex items-center justify-center gap-2">
                    Demander un devis
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </span>
                </Button>
              </div>
            </StaggerItem>
          ))}
        </div>
      </Stagger>

      {/* Footer note */}
      <FadeIn delay={0.3}>
        <div className="mt-6 text-sm text-white/40">
          Maintenance &amp; suivi disponibles à partir de 290€/mois. Chaque projet est unique — les tarifs sont ajustés selon vos besoins.
        </div>
      </FadeIn>
    </section>
  );
};

export default Prices;
