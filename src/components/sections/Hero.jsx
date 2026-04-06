'use client';

import { motion } from 'framer-motion';
import { Calendar, Check, FileSearch } from 'lucide-react';
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
        Votre entreprise mérite un site qui{' '}
        <span className="italic text-[#C3C1BA]!">
          vous amène des clients.
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
              Développeur web spécialisé dans les sites performants pour
              entreprises de services
            </p>
            <p>
              Je conçois des sites performants pour les entreprises de services
              — instituts, cabinets, commerces — qui veulent être visibles sur
              Google et convertir en ligne.
            </p>
            <p className="mt-2">
              De la conception au déploiement, je m&apos;occupe de tout.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease }}
            className="mt-5 flex flex-wrap gap-3"
          >
            <Button
              onClick={openBookingModal}
              className="text-sm items-center bg-accent text-black font-semibold cursor-pointer transition-colors"
            >
              <Calendar size={18} />
              Réserver un appel
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-sm items-center border-white/20 text-white bg-transparent hover:bg-white/5 hover:border-accent/60 cursor-pointer transition-colors"
            >
              <a href="#audit">
                <FileSearch size={18} />
                Recevez un audit gratuit de votre site
              </a>
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
