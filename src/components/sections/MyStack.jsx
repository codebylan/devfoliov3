'use client';

import { stackCategories } from '../../data/stack';

const MyStack = () => {
  return (
    <section id="mystack">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
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
      </div>

      {/* Flowing tech names */}
      <div className="flex flex-wrap gap-x-6 gap-y-4 mb-16">
        {stackCategories.flatMap((cat) =>
          cat.technologies.map((tech) => (
            <span
              key={tech.name}
              className="text-2xl sm:text-3xl lg:text-4xl text-white/80 hover:text-accent transition-colors cursor-default"
            >
              {tech.name}
              {tech.subtitle && (
                <sup className="text-white/20 text-xs ml-1">
                  {tech.subtitle}
                </sup>
              )}
            </span>
          ))
        )}
      </div>

      {/* Categories breakdown */}
      <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
        {stackCategories.map((cat) => (
          <div key={cat.category}>
            <p className="text-accent text-xs uppercase tracking-wider mb-2">
              {cat.category}
            </p>
            <p className="text-white/30 text-sm">
              {cat.technologies.map((t) => t.name).join(', ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyStack;
