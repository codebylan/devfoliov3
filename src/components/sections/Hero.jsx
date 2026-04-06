'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';
import { Button } from '../ui/button';

const ease = [0.25, 0.1, 0.25, 1];

const stats = [
  { value: '+50%', label: 'réservations en ligne', sub: 'Dayness Institut' },
  { value: '+40%', label: 'taux de conversion', sub: 'Dayness Cosmetics' },
  { value: '< 3s', label: 'de chargement', sub: 'Core Web Vitals' },
];

const Hero = () => {
  const { openBookingModal } = useBooking();

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
          Développeur Next.js · Paris &amp; remote
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
          <Button
            onClick={openBookingModal}
            className="bg-accent text-black font-semibold cursor-pointer px-6 py-5 text-sm"
          >
            <Calendar size={16} />
            Réserver un appel
          </Button>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45, ease }}
          className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-white/25"
        >
          <span>✓ Réponse sous 24h</span>
          <span>✓ 30 min · Gratuit · Sans engagement</span>
          <span>✓ Devis sous 48h</span>
        </motion.div>

        {/* Mobile stats — 3-col strip below trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55, ease }}
          className="lg:hidden grid grid-cols-3 border border-white/[0.07] divide-x divide-white/[0.07] mt-10"
        >
          {stats.map((s) => (
            <div key={s.value} className="px-4 py-5 text-center">
              <p className="text-xl font-light text-accent leading-none mb-1">
                {s.value}
              </p>
              <p className="text-[10px] text-white/35 leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Right column — stats panel (desktop only) ── */}
      {/* <motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease }}
        className="hidden lg:flex flex-col border border-white/[0.07] divide-y divide-white/[0.07] self-start mt-1"
        aria-label="Résultats clients"
      >
        {stats.map((s) => (
          <div key={s.value} className="px-6 py-6">
            <p className="text-4xl font-light text-accent tracking-tight leading-none mb-2">
              {s.value}
            </p>
            <p className="text-sm text-white/55 leading-snug">{s.label}</p>
            <p className="text-xs text-white/25 mt-1">{s.sub}</p>
          </div>
        ))}
      </motion.aside> */}
    </section>
  );
};

export default Hero;
