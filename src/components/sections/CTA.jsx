'use client';

import { FadeIn } from '../motion/FadeIn';
import WhatsAppCTA from '../ui/whatsapp-cta';

const CTA = () => {
  return (
    <section
      id="cta"
      className="relative  -mx-4 border-t border-white/10 py-32 sm:py-40 overflow-hidden"
      style={{
        backgroundImage: "url('/images/cta.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <FadeIn className="flex flex-col items-center text-center gap-10 px-4">
        <h2 className="text-[clamp(3.5rem,9vw,8.5rem)] italic leading-[0.88]">
          Votre projet
          <br />
          <span className="text-accent">mérite d&apos;être</span>
          <br />
          lancé.
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <WhatsAppCTA size="lg" showIcon />
          <a
            href="mailto:d.agboton.dev@gmail.com"
            className="text-white/35 text-sm hover:text-white/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
            aria-label="Envoyer un email à Dylan Agboton"
          >
            d.agboton.dev@gmail.com
          </a>
        </div>
      </FadeIn>
    </section>
  );
};

export default CTA;
