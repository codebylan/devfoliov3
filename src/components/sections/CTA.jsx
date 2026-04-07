'use client';

import { FadeIn } from '../motion/FadeIn';
import WhatsAppCTA from '../ui/whatsapp-cta';

const TRUST = ['Réponse sous 24h', 'Sans engagement', 'Devis sous 48h'];

const CTA = () => {
  return (
    <section id="cta">
      <div className="py-24 sm:py-32 border-t border-white/10">
        <FadeIn>
          <p className="text-accent text-xs uppercase tracking-[0.2em] mb-12">
            Prochaine étape
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-end">

          {/* ── Headline ── */}
          <FadeIn y={24}>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl italic leading-[0.9] mb-6">
              Votre projet
              <br />
              <span className="text-accent">mérite d&apos;être</span>
              <br />
              lancé.
            </h2>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed">
              Un échange de 30 minutes pour voir si on peut travailler ensemble.
              Pas de présentation commerciale, pas de pression.
            </p>
          </FadeIn>

          {/* ── CTA block ── */}
          <FadeIn delay={0.15} y={24} className="flex flex-col gap-6">

            {/* Trust signals */}
            <div className="flex flex-wrap gap-2">
              {TRUST.map((label) => (
                <span
                  key={label}
                  className="text-[11px] text-white/35 border border-white/10 px-3 py-1.5"
                >
                  ✓ {label}
                </span>
              ))}
            </div>

            {/* Primary action */}
            <WhatsAppCTA
              size="lg"
              showIcon={false}
              showArrow
              source="cta"
              className="w-full sm:w-auto self-start"
            />

            {/* Email fallback */}
            <p className="text-white/25 text-xs">
              Vous préférez l&apos;email ?{' '}
              <a
                href="mailto:d.agboton.dev@gmail.com"
                className="underline underline-offset-2 decoration-white/15 hover:text-white/50 hover:decoration-white/35 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                aria-label="Envoyer un email à Dylan Agboton"
              >
                d.agboton.dev@gmail.com
              </a>
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CTA;
