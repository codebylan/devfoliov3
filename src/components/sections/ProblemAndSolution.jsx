import { Badge } from '@/components/ui/badge';
import { problems, solutions } from '@/data/problemAndSolution';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import PaS from '../../../public/images/problem-and-solution.png';
import { Button } from '../ui/button';

const ProblemAndSolution = () => {
  return (
    <section>
      <h2 className="text-3xl text-center italic mb-12">
        Un problème ? <span className="text-accent">Une solution.</span>
      </h2>

      <div className="lg:flex gap-10 items-start justify-center mt-10">
        {/* Image Column */}
        <div className="shrink-0 mb-10 lg:mb-0">
          <Image
            src={PaS}
            alt="Un problème ? Une Solution."
            width={350}
            height={'auto'}
            quality={75}
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
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-black to-[#262626] p-3 rounded-sm "
                  >
                    <div className="flex gap-3 items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1.5 text-[#C8B792]!">
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
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-bl from-black to-[#262626] p-3 rounded-sm "
                  >
                    <div className="flex gap-3 items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1.5 text-[#C8B792]!">
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
