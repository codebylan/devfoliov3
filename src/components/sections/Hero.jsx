'use client';

import { Calendar, Check } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const Hero = () => {
  const { openBookingModal } = useBooking();

  return (
    <section id="hero">
      {/* left column  */}
      <h1 className="max-w-4xl lg:text-6xl text-3xl mb-5 ">
        Concrétisez vos ambitions numériques avec{' '}
        <span className="italic text-[#C3C1BA]!">
          un développeur qui parle votre langue.
        </span>
      </h1>
      <div className="flex items-center">
        <div>
          <div className="lg:text-xl text-base max-w-3xl ">
            <p className="text-accent">
              Développeur Fullstack Next.js, Node.js et Intégrateur IA.
            </p>
            <p>
              J'accompagne les entreprises de toute taille dans la création
              d'applications web rapides, robustes et rentables.
            </p>
            <p className="mt-2">
              De la conception au déploiement, je m'occupe de tout.
            </p>
          </div>
          <Button
            onClick={openBookingModal}
            className="mt-5 text-sm items-center bg-accent text-black font-semibold cursor-pointer transition-colors"
          >
            <Calendar size={18} />
            Réserver un appel
          </Button>

          <div className="mt-4 flex flex-wrap items-center gap-2">
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
            <Badge
              variant="outline"
              className="border-white/15 text-white/70 bg-white/5"
            >
              <Check className="text-accent" />
              Livrables clairs (scope + délais)
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
