'use client';

import { testimonials } from '../../data/testimonials';
import { FadeIn, Stagger, StaggerItem } from '../motion/FadeIn';

const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5" aria-label={`${count} étoiles sur 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill={i < count ? '#F5C542' : 'none'}
        stroke={i < count ? '#F5C542' : '#ffffff30'}
        strokeWidth="1"
      >
        <path d="M7 1l1.55 3.14L12 4.74l-2.5 2.43.59 3.44L7 9l-3.09 1.61.59-3.44L2 4.74l3.45-.6L7 1z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  if (!Array.isArray(testimonials) || testimonials.length === 0) return null;

  return (
    <section id="testimonials">
      <FadeIn className="mb-12">
        <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
          Témoignages
        </p>
        <h2 className="text-4xl sm:text-5xl italic leading-[0.95] max-w-3xl">
          Ce que disent{' '}
          <span className="text-accent">mes clients.</span>
        </h2>
      </FadeIn>

      <Stagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <StaggerItem key={index} y={40}>
            <figure className="bg-white/5 border border-white/10 rounded-sm p-6 flex flex-col gap-5 h-full">
              <div className="text-accent/40 text-3xl leading-none font-serif">"</div>
              <blockquote className="text-white/70 leading-relaxed flex-1">
                {t.quote}
              </blockquote>
              <div className="pt-4 border-t border-white/10">
                <Stars count={t.stars ?? 5} />
                <figcaption className="mt-3 flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-9 h-9 rounded-full bg-white/10 shrink-0 flex items-center justify-center text-white/30 text-xs font-medium">
                    {t.name?.[0] ?? '?'}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role}</p>
                  </div>
                </figcaption>
              </div>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
};

export default Testimonials;
