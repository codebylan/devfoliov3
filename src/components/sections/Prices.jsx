'use client';

import { pricingData } from '../../data/pricing';
import { Check } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useBooking } from '../../contexts/BookingContext';

const Prices = () => {
  const { openBookingModal } = useBooking();
  return (
    <section id="prices" className="">
      <div className="text-center space-y-2 sm:space-y-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl italic leading-tight px-4">
          <span className="text-accent">Un investissement,</span> pas une
          dépense.
        </h2>
        <h3 className="text-sm sm:text-base lg:text-lg text-muted-foreground px-4">
          Des tarifs transparents, adaptés à la valeur apportée. Pas de coûts
          cachés.
        </h3>

        {/* TJM Info */}
        <div className="pt-3">
          <p className="text-xs sm:text-sm text-accent/80 font-medium">
            TJM : <span className="text-accent font-semibold">450€/jour</span>
          </p>
        </div>
      </div>

      {/* Mobile/Tablet: Swipable Carousel | Desktop: Grid */}
      <div className="mt-8 sm:mt-10 relative pt-4">
        {/* Gradient overlays for mobile/tablet (hidden on desktop) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-[#262626] to-transparent z-10 pointer-events-none lg:hidden" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-[#262626] to-transparent z-10 pointer-events-none lg:hidden" />

        {/* Scrollable container */}
        <div
          className="
            flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide
            px-4 pb-4
            lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0
          "
        >
          {pricingData.map((pricing, index) => (
            <div
              key={index}
              className={`
                relative bg-black border rounded-sm p-5 sm:p-6 
                transition-all duration-300
                flex flex-col
                snap-center
                min-w-[70vw] sm:min-w-[60vw] lg:min-w-0
                ${
                  pricing.isRecommended
                    ? 'border-accent lg:scale-105 shadow-lg shadow-accent/10'
                    : 'border-accent/40 hover:border-accent/60'
                }
              `}
            >
              {/* Badge "Recommandé" */}
              {pricing.isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-black text-white border border-[#c8b792] font-semibold px-3 py-1 text-xs">
                    Recommandé
                  </Badge>
                </div>
              )}

              {/* Header */}
              <div className="space-y-3 mb-5">
                <h4 className="text-accent font-semibold text-base sm:text-lg">
                  {pricing.title}
                </h4>
                <p className="italic text-xs sm:text-sm text-white/70">
                  {pricing.subtitle}
                </p>

                {/* Prix avec mention "À partir de" en plus petit */}
                <div>
                  {pricing.price.includes('À partir de') ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-white/50">À partir de</span>
                      <span className="text-2xl sm:text-3xl font-bold text-accent">
                        {pricing.price.replace('À partir de ', '')}
                      </span>
                    </div>
                  ) : (
                    <p className="text-lg sm:text-xl font-bold text-white">
                      {pricing.price}
                    </p>
                  )}
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-4 mb-5 flex-1">
                <p className="text-sm font-medium text-white/90">
                  Ce qui est inclus :
                </p>
                <ul className="space-y-3">
                  {pricing.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex gap-3 items-start text-xs sm:text-sm"
                    >
                      <div className="bg-[#c8b792] rounded-sm p-0.5 shrink-0 mt-0.5">
                        <Check width={16} height={16} color="black" />
                      </div>
                      <span className="text-white/80 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                  {pricing.bonus && (
                    <li className="flex gap-3 items-start text-xs sm:text-sm">
                      <div className="bg-accent rounded-sm p-0.5 shrink-0 mt-0.5">
                        <Check width={16} height={16} color="black" />
                      </div>
                      <span className="text-accent/90 leading-relaxed font-medium">
                        <span className="font-semibold">Bonus : </span>
                        {pricing.bonus}
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <Button
                  onClick={openBookingModal}
                  className={`
                  w-full text-sm transition-all cursor-pointer duration-300
                  ${
                    pricing.isRecommended
                      ? 'bg-[#c8b792] border border-white text-black! hover:bg-white font-semibold shadow-lg'
                      : 'border border-accent/40 hover:border-accent hover:bg-accent/10 bg-transparent'
                  }
                `}
                >
                  Demander mon devis personnalisé
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prices;
