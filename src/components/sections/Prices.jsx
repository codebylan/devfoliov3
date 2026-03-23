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
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.07]">
        {pricingData.map((tier, index) => (
          <div
            key={index}
            className={`relative flex flex-col p-8 lg:p-10 transition-colors duration-300 ${
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
        ))}
      </div>

      {/* Add-ons */}
      <div className="mt-px bg-white/[0.07]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px">
          {/* Maintenance */}
          <div className="bg-[#080808] p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-sm">
                Add-on
              </span>
            </div>
            <h3 className="text-lg text-white font-medium mb-1">
              Forfait Maintenance Mensuel
            </h3>
            <p className="text-white/40 text-sm mb-6">
              Gardez votre site performant et à jour, sans stress.
            </p>
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">
                À partir de
              </p>
              <p className="text-4xl font-light text-accent">290€/mois</p>
            </div>
            <ul className="space-y-2.5">
              {[
                'Corrections de bugs & mises à jour techniques',
                'Monitoring performance & sécurité',
                "Petites évolutions (jusqu'à 4h/mois de dev incluses)",
                'Support prioritaire par email',
                'Rapport mensuel de performance',
              ].map((feature, i) => (
                <li
                  key={i}
                  className="text-sm text-white/55 flex items-start gap-3"
                >
                  <span className="text-accent/50 mt-0.5 shrink-0">—</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* TJM */}
          <div className="bg-[#080808] p-8 lg:p-10 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] uppercase tracking-widest text-white/40 bg-white/5 px-2.5 py-1 rounded-sm">
                Option
              </span>
            </div>
            <h3 className="text-lg text-white font-medium mb-1">
              TJM — Facturation au temps
            </h3>
            <p className="text-white/40 text-sm mb-8">
              Pour des missions ponctuelles ou des collaborations récurrentes.
            </p>
            <div className="flex-1 flex flex-col justify-center space-y-px bg-white/[0.07]">
              {[
                { label: 'Développement', value: '400€', unit: '/jour' },
                { label: 'Consulting IA', value: '450€', unit: '/jour' },
                { label: 'Maintenance', value: '350€', unit: '/jour' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-6 py-4 bg-[#080808] hover:bg-white/[0.02] transition-colors"
                >
                  <p className="text-[11px] uppercase tracking-widest text-white/50">
                    {item.label}
                  </p>
                  <p className="text-xl font-light text-accent">
                    {item.value}
                    <span className="text-sm text-accent/50">{item.unit}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button
                onClick={openBookingModal}
                className="group/link flex items-center gap-2 text-sm text-accent cursor-pointer hover:gap-3 transition-all"
              >
                Discutons de votre projet
                <ArrowRight
                  size={14}
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-6 text-xs text-white/25">
        Chaque projet est unique. Les tarifs sont indicatifs et ajustés selon
        vos besoins spécifiques.
      </div>
    </section>
  );
};

export default Prices;
