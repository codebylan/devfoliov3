import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import PaS from '../../../public/images/problem-and-solution.png';
import { Button } from '../ui/button';

import Link from 'next/link';

const ProblemAndSolution = () => {
  const problems = [
    {
      title: 'Site lent & Obsolète',
      description:
        "Vos pages mettent plus de 3 secondes à charger. Vos clients partent avant d'avoir vu votre offre.",
    },
    {
      title: 'Tâches répétitives (Excel/Saisie)',
      description:
        'Vos équipes perdent des heures sur des processus manuels à faible valeur ajoutée.',
    },
    {
      title: 'Développeurs "Fantômes"',
      description:
        'Délais non respectés, jargon incompréhensible et silence radio après la livraison.',
    },
  ];

  const solutions = [
    {
      title: 'Performance Next.js',
      description:
        'Une architecture moderne optimisée pour le chargement instantané. Vous récupérez le trafic que vous perdiez.',
    },
    {
      title: 'Automatisation IA',
      description:
        "Intégration d'agents intelligents (OpenAI) pour traiter vos données et répondre à vos clients 24/7.",
    },
    {
      title: 'Partenaire Business',
      description:
        'Une communication claire (background commercial), des deadlines respectées et un suivi post-projet.',
    },
  ];

  return (
    <section>
      <h2 className="text-3xl text-center italic mb-12">
        Un problème ? <span className="text-accent">Une solution.</span>
      </h2>

      <div className="lg:flex gap-10 items-start justify-center mt-10">
        {/* Image Column */}
        <div className="flex-shrink-0 mb-10 lg:mb-0">
          <Image
            src={PaS}
            alt="Un problème ? Une Solution."
            width={350}
            height={350}
            quality={100}
            className="rounded-sm"
          />
        </div>

        {/* Problems & Solutions Container */}
        <div className="flex-1 grid lg:grid-cols-2 gap-6">
          {/* Problems Column */}
          <div className="space-y-6">
            <Badge className="bg-red-900/80  text-white ">
              Votre situation actuelle
            </Badge>

            <div className="space-y-5">
              {problems.map((problem, index) => {
                const Icon = problem.icon;
                return (
                  <div
                    key={index}
                    className="bg-black p-3 rounded-sm border border-[#C8B792] "
                  >
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 mt-1"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1.5 text-white">
                          {problem.title}
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {problem.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-6 mb-10">
            <Badge className="bg-green-900/80 text-white ">
              Ce que je vous apporte
            </Badge>

            <div className="space-y-5">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <div
                    key={index}
                    className="bg-black p-3 rounded-sm border border-[#C8B792] "
                  >
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 mt-1"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1.5 text-white">
                          {solution.title}
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="justify-center text-center">
        <Link href={'/'}>
          <Button className={`bg-black cursor-pointer`}>
            <Calendar />
            Réserver un créneau
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ProblemAndSolution;
