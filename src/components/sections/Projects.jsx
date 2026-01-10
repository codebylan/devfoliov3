'use client';

import { project } from '@/data/projects';
import Image from 'next/image';

const Projects = () => {
  // Dupliquer les images pour l'effet infini
  const duplicatedProjects = [...project, ...project, ...project];

  return (
    <section id="projects">
      <h2 className="italic text-3xl text-center">
        Ils avaient une vision,{' '}
        <span className="text-accent">nous l&apos;avons réalisée</span>
      </h2>
      {/* 
      <p className="text-center text-base mt-2">
        Derrière chaque ligne de code, il y a un entrepreneur et un objectif.{' '}
        <br />
        Découvrez comment j&apos;ai aidé ces entreprises à franchir un cap
        technique.
      </p> */}

      <div className="mt-10 space-y-10">
        {/* Top Carousel */}
        <div className="relative overflow-hidden">
          {/* Gradient left */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#262626] to-transparent z-10 pointer-events-none" />

          {/* Gradient right */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#262626] to-transparent z-10 pointer-events-none " />

          {/* Carousel container */}
          <div className="overflow-hidden justify-start  ">
            <div className="flex gap-2 animate-scroll-infinite w-fit">
              {duplicatedProjects.map((project, index) => (
                <div
                  key={`top-${project.name}-${index}`}
                  className="shrink-0 w-[180px] md:w-[250px]  lg:w-[400px] h-[100px] md:h-[150px] lg:h-[200px] relative rounded-sm overflow-hidden group"
                >
                  <Image
                    src={project.image}
                    alt={`Projet réalisé par Dylan Agboton - ${project.name} - ${project.type} - Développeur Freelance Paris`}
                    fill
                    className="object-cover  bg-gradient-to-br  from-black to-[#262626]  rounded-sm p-1 "
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 350px, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-2.5 md:p-3 lg:p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
                    <div className="space-y-0.5 sm:space-y-1 md:space-y-1.5">
                      <h3 className="text-accent font-bold text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-lg leading-tight truncate">
                        {project.name}
                      </h3>
                      <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-white/90 font-medium leading-tight">
                        {project.type}
                      </p>
                      <p
                        className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-white/80 leading-tight overflow-hidden"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {project.job}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
