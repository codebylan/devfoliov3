'use client';

import Image from 'next/image';
import Link from 'next/link';
import { project } from '../../data/projects';

const Projects = () => {
  const duplicatedProjects = [...project, ...project, ...project];

  return (
    <section id="projects">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
        <div>
          <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
            Réalisations
          </p>
          <h2 className="text-4xl sm:text-5xl italic leading-[0.95]">
            Ils avaient une vision,{' '}
            <span className="text-accent">nous l&apos;avons réalisée.</span>
          </h2>
        </div>
        <p className="text-white/30 text-xs shrink-0">
          {project.length} projets
        </p>
      </div>

      {/* Infinite Carousel Container */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden">
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-r from-[#262626] to-transparent z-10 pointer-events-none" />

        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-l from-[#262626] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex gap-6 animate-scroll-projects w-fit hover:[animation-play-state:paused]">
          {duplicatedProjects.map((item, index) => (
            <Link
              key={`${item.slug}-${index}`}
              href={`/projets/${item.slug}`}
              aria-label={`Voir le cas complet: ${item.name}`}
              className="group relative shrink-0 w-[75vw] sm:w-[50vw] lg:w-[35vw] xl:w-[28vw] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#262626]"
            >
              {/* Video/Image Container */}
              <div className="relative aspect-video overflow-hidden rounded-sm mb-5 bg-white/5">
                {item.video ? (
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    poster={item.image}
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt={`${item.name} - ${item.type}`}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 35vw"
                  />
                )}
                <div className="absolute inset-0 ring-1 ring-white/10 group-hover:ring-accent/25 transition-colors" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <span className="text-accent text-xs uppercase tracking-[0.15em]">
                  {item.type}
                </span>
                <h3 className="text-lg sm:text-xl text-white font-medium group-hover:text-accent transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
                  {item.job}
                </p>
                <p className="text-white/30 text-xs uppercase tracking-[0.15em] pt-1">
                  Voir le cas complet →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 flex items-center justify-between text-xs text-white/30">
        <div className="flex gap-1">
          {project.map((_, i) => (
            <span key={i} className="w-6 h-px bg-accent/40" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
