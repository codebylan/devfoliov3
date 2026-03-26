'use client';

import { motion } from 'framer-motion';
import { Calendar, Check } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const ease = [0.25, 0.1, 0.25, 1];

const Hero = () => {
  const { openBookingModal } = useBooking();

  return (
    <section id="hero">
      {/* left column  */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="max-w-4xl lg:text-6xl text-3xl mb-5"
      >
        Concrétisez vos ambitions numériques avec{' '}
        <span className="italic text-[#C3C1BA]!">
          un développeur qui parle votre langue.
        </span>
      </motion.h1>
      <div className="flex items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="lg:text-xl text-base max-w-3xl"
          >
            <p className="text-accent">
              Développeur Fullstack Next.js, Node.js et Intégrateur IA.
            </p>
            <p>
              J&apos;accompagne les entreprises de toute taille dans la création
              d&apos;applications web rapides, robustes et rentables.
            </p>
            <p className="mt-2">
              De la conception au déploiement, je m&apos;occupe de tout.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease }}
          >
            <Button
              onClick={openBookingModal}
              className="mt-5 text-sm items-center bg-accent text-black font-semibold cursor-pointer transition-colors"
            >
              <Calendar size={18} />
              Réserver un appel
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
            className="mt-4 flex flex-wrap items-center gap-2"
          >
            <Badge
              variant="outline"
              className="border-white/15 text-white/70 bg-white/5"
            >
              <Check className="text-accent" />
              Réponse sous 24h
            </Badge>
            <Badge
              variant="outline"
              className="border-white/15 text-white/70 bg-white/5"
            >
              <Check className="text-accent" />
              30 min • Gratuit • Sans engagement
            </Badge>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
