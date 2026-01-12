'use client';

import { stackCategories } from '../../data/stack';
import Image from 'next/image';
import mystackImg from '../../../public/images/mystack-img.png';

const MyStack = () => {
  return (
    <section id="mystack">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left Column - Header */}
        <div className="lg:w-[400px] shrink-0 space-y-4 lg:sticky lg:top-8 lg:self-start">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl italic leading-tight">
            Mon arsenal <span className="text-accent">technique</span>
          </h2>
          <p className="text-base text-white/50 max-w-xl">
            L&apos;écosystème JavaScript moderne, boosté par l&apos;IA.
          </p>

          {/* Image */}
          <div className="relative hidden lg:block  w-full aspect-square max-w-md">
            <Image
              src={mystackImg}
              alt="Stack technique Dylan Agboton - Next.js, React, Node.js, IA - Développeur Freelance Paris"
              fill
              className="object-cover rounded-sm"
              sizes="(max-width: 1024px) 100vw, 400px"
              priority={false}
            />
          </div>
        </div>

        {/* Right Column - Vertical Carousels */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stackCategories.map((category) => {
            // Dupliquer les technologies pour l'effet infini
            const duplicatedTechnologies = [
              ...category.technologies,
              ...category.technologies,
              ...category.technologies,
            ];

            return (
              <div key={category.category} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-widest text-accent font-medium">
                    {category.category}
                  </span>
                </div>

                {/* Vertical Carousel Container */}
                <div className="relative h-[600px] overflow-hidden">
                  {/* Gradient top */}
                  <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-[#262626] to-transparent z-10 pointer-events-none" />

                  {/* Gradient bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-[#262626] to-transparent z-10 pointer-events-none" />

                  {/* Vertical Carousel */}
                  <div className="overflow-hidden h-full">
                    <div className="flex flex-col gap-6 animate-scroll-vertical">
                      {duplicatedTechnologies.map((tech, index) => (
                        <div
                          key={`${category.category}-${tech.name}-${index}`}
                          className="shrink-0 group"
                        >
                          {/* Tech Card */}
                          <div className="space-y-3">
                            {/* Tech Header */}
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-accent/10 rounded-sm">
                                <Image
                                  src={tech.logo}
                                  alt={tech.name}
                                  width={24}
                                  height={24}
                                  className="object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-500"
                                  style={{
                                    filter:
                                      'brightness(0) saturate(100%) invert(81%) sepia(13%) saturate(744%) hue-rotate(355deg) brightness(93%) contrast(88%)',
                                  }}
                                />
                              </div>
                              <div>
                                <h3 className="text-base font-medium text-white group-hover:text-accent transition-colors duration-300">
                                  {tech.name}
                                </h3>
                                {tech.subtitle && (
                                  <span className="text-xs text-white/30">
                                    {tech.subtitle}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2 text-xs leading-relaxed">
                              <p className="text-white/50">{tech.what}</p>
                              <p className="text-white/35">{tech.why}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MyStack;
