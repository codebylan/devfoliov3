import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const Hero = () => {
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
          <Link href={'/'}>
            <Button
              className={` mt-5 text-sm items-center bg-black cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)]  `}
            >
              {' '}
              <Calendar /> Réserver un appel
            </Button>
          </Link>

          <p className="text-[10px] text-[#C3C1BA]! mt-3">
            Réponse sous 24h • Accompagnement court ou long terme
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
