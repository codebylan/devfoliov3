'use client';

import { FadeIn } from '../motion/FadeIn';
import WhatsAppCTA from '../ui/whatsapp-cta';

const CTA = () => {
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
            <WhatsAppCTA size="lg" showIcon={false} showArrow source="cta" />

            <p className="text-white/30 text-xs mt-6">Réponse sous 24h</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CTA;
