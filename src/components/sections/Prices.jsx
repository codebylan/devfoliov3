'use client';

import { Check } from 'lucide-react';
import { pricingData } from '../../data/pricing';
import { FadeIn, Stagger, StaggerItem } from '../motion/FadeIn';
import WhatsAppCTA from '../ui/whatsapp-cta';

const Prices = () => {

  return (
    <section id="prices">
      {/* Header */}
      <FadeIn className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
        <div>
          <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
            Tarifs
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl italic leading-[0.95]">
            <span className="text-accent">Investissement,</span>
            <br />
            pas dépense.
          </h2>
        </div>
        <p className="text-white/40 text-sm max-w-xs lg:text-right">
          Tarifs transparents, adaptés à la valeur créée. Pas de surprise, pas
          de coûts cachés.
        </p>
      </FadeIn>

      {/* 3-column grid */}
      <Stagger stagger={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 lg:gap-6 items-start">
          {pricingData.map((tier, index) => (
            <StaggerItem key={index} y={30}>
              <div
                className={`relative flex flex-col p-8 rounded-sm lg:p-10 ${
                  tier.isRecommended
                    ? 'bg-accent/[0.06] ring-1  ring-accent/30 md:-translate-y-3 md:shadow-[0_0_60px_-12px_rgba(195,193,186,0.15)]'
                    : 'bg-[#0D0D0D] ring-1 ring-white/[0.06]'
                }`}
              >
                {/* Top accent line on recommended */}
                {tier.isRecommended && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent" />
                )}

                {/* Badge */}
                <div className="flex items-center justify-between mb-8">
                  {/* <span className="text-[10px] font-mono text-white/20 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span> */}
                  {tier.isRecommended && (
                    <span className="text-[10px] uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1">
                      Recommandé
                    </span>
                  )}
                </div>

                {/* Title + subtitle */}
                <div className="mb-8">
                  <h3
                    className={`text-xl font-medium mb-3 ${tier.isRecommended ? 'text-white' : 'text-white/80'}`}
                  >
                    {tier.title}
                  </h3>
                  <p className="text-white/35 text-sm leading-relaxed">
                    {tier.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-white/[0.06]">
                  <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2">
                    {tier.price.prefix}
                  </p>
                  <p
                    className={`text-5xl font-light tracking-tight ${
                      tier.isRecommended ? 'text-accent' : 'text-white/70'
                    }`}
                  >
                    {tier.price.amount}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-10">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-3 text-sm ${tier.isRecommended ? 'text-white/60' : 'text-white/40'}`}
                    >
                      <Check
                        size={13}
                        className={`shrink-0 mt-0.5 ${
                          tier.isRecommended ? 'text-accent' : 'text-white/20'
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <WhatsAppCTA
                  label="Demander un devis"
                  variant={tier.isRecommended ? 'primary' : 'secondary'}
                  showIcon={false}
                  className="w-full mt-auto justify-center"
                />
              </div>
            </StaggerItem>
          ))}
        </div>
      </Stagger>

      {/* Footer note */}
      <FadeIn delay={0.3}>
        <p className="mt-6 text-sm text-white/30">
          Maintenance &amp; suivi disponibles à partir de 290€/mois. Chaque
          projet est unique, les tarifs sont ajustés selon vos besoins.
        </p>
      </FadeIn>
    </section>
  );
};

export default Prices;
