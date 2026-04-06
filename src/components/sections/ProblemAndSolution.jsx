'use client';

import Image from 'next/image';
import PaS from '../../../public/images/problem-and-solution.png';
import { problems, solutions } from '../../data/problemAndSolution';
import { FadeIn, Stagger, StaggerItem } from '../motion/FadeIn';

const ProblemAndSolution = () => {
  return (
    <section>
      {/* Header */}
      <FadeIn className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
        <div>
          <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
            Proposition de valeur
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl italic leading-[0.95]">
            Un problème ? <span className="text-accent">Une solution.</span>
          </h2>
        </div>
        <p className="text-white/40 text-sm max-w-xs lg:text-right">
          Ce qui vous bloque aujourd&apos;hui, je le transforme en avantage.
        </p>
      </FadeIn>

      {/* Main Grid with Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Image Column */}
        <FadeIn delay={0.2} className="lg:col-span-5 order-2 lg:order-1">
          <div className="sticky top-24">
            <Image
              src={PaS}
              alt="Solutions développement web & IA"
              width={500}
              height={600}
              quality={85}
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="w-full max-w-md lg:max-w-none rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
            />
            <p className="mt-4 text-xs text-white/30">
              Transformer les obstacles en opportunités
            </p>
          </div>
        </FadeIn>

        {/* Content Column */}
        <Stagger
          stagger={0.15}
          className="lg:col-span-7 order-1 lg:order-2 space-y-12"
        >
          {problems.map((problem, index) => (
            <StaggerItem
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* Problem */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-xs uppercase tracking-widest">
                    Problème
                  </span>
                </div>
                <h3 className="text-white font-medium">{problem.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-3 sm:border-l sm:border-accent/20 sm:pl-6">
                <div className="flex items-center gap-3">
                  <span className="text-accent text-xs uppercase tracking-widest">
                    Solution
                  </span>
                </div>
                <h3 className="text-accent font-medium">
                  {solutions[index].title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {solutions[index].description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default ProblemAndSolution;
