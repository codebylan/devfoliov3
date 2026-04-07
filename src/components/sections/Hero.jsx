'use client';

import { motion } from 'framer-motion';
import WhatsAppCTA from '../ui/whatsapp-cta';

const ease = [0.25, 0.1, 0.25, 1];

const Hero = () => {

  return (
    <section
      id="hero"
      className="relative lg:grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] lg:gap-16 lg:items-start"
    >
      {/* ── Left column ── */}
      <div>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease }}
          className="text-accent text-xs uppercase tracking-[0.2em] mb-6"
        >
          Développeur web · Paris &amp; Île-de-France
        </motion.p>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-4xl sm:text-5xl lg:text-6xl leading-[0.93] mb-8"
        >
          Votre entreprise mérite
          <br />
          un site qui{' '}
          <span className="italic text-accent">vous amène des clients.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="text-white/50 text-base lg:text-lg max-w-lg mb-10 leading-relaxed"
        >
          Je conçois des sites performants pour les instituts, cabinets et
          commerces qui veulent être visibles sur Google et convertir en ligne.
          De la conception au déploiement, je m&apos;occupe de tout.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="flex flex-wrap items-center gap-4 mb-10"
        >
          <WhatsAppCTA source="hero" />
          <a
            href="#projects"
            className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            aria-label="Voir mes réalisations"
          >
            Voir mes réalisations
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45, ease }}
          className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-white/25"
        >
          <span>✓ Réponse rapide</span>
          <span>✓ Échange direct · Sans engagement</span>
          <span>✓ Devis sous 48h</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
