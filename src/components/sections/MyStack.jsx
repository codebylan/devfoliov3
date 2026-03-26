'use client';

import { stackCategories } from '../../data/stack';
import { FadeIn, Stagger, StaggerItem } from '../motion/FadeIn';

const MyStack = () => {
  return (
    <section id="mystack">
      {/* Header */}
      <FadeIn className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
        <div>
          <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
            Stack technique
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl italic leading-[0.95]">
            Mon arsenal <span className="text-accent">technique.</span>
          </h2>
        </div>
        <p className="text-white/40 text-sm max-w-xs lg:text-right">
          L&apos;écosystème JavaScript moderne, boosté par l&apos;IA.
        </p>
      </FadeIn>

      {/* Flowing tech names */}
      <Stagger stagger={0.04} className="flex flex-wrap gap-x-6 gap-y-4 mb-16">
        {stackCategories.flatMap((cat) =>
          cat.technologies.map((tech) => (
            <StaggerItem
              key={tech.name}
              y={20}
            >
              <span
                className="text-2xl sm:text-3xl lg:text-4xl text-white/80 hover:text-accent transition-colors cursor-default"
              >
                {tech.name}
                {tech.subtitle && (
                  <sup className="text-white/20 text-xs ml-1">
                    {tech.subtitle}
                  </sup>
                )}
              </span>
            </StaggerItem>
          ))
        )}
      </Stagger>

      {/* Categories breakdown */}
      <Stagger stagger={0.1} delay={0.2} className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
        {stackCategories.map((cat) => (
          <StaggerItem key={cat.category}>
            <p className="text-accent text-xs uppercase tracking-wider mb-2">
              {cat.category}
            </p>
            <p className="text-white/30 text-sm">
              {cat.technologies.map((t) => t.name).join(', ')}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
};

export default MyStack;
