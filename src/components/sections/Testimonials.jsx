'use client';

import Image from 'next/image';
import { testimonials } from '../../data/testimonials';
import { FadeIn, Stagger, StaggerItem } from '../motion/FadeIn';

const Stars = ({ count = 5 }) => (
  <div className="flex gap-px" aria-label={`${count} étoiles sur 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`text-xs ${i < count ? 'text-accent' : 'text-white/15'}`}
      >
        ★
      </span>
    ))}
  </div>
);

const Avatar = ({ name, image }) => {
  const initials = name
    ?.replace(/^\[|\]$/g, '') // strip placeholder brackets
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') ?? '?';

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={72}
        height={72}
        className="w-[72px] h-[72px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shrink-0"
      />
    );
  }

  return (
    <div className="w-[72px] h-[72px] shrink-0 bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/20 text-sm font-medium tracking-wider select-none">
      {initials}
    </div>
  );
};

const Testimonials = () => {
  if (!Array.isArray(testimonials) || testimonials.length === 0) return null;

  return (
    <section id="testimonials">
      <FadeIn className="mb-16">
        <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
          Témoignages
        </p>
        <h2 className="text-4xl sm:text-5xl italic leading-[0.95]">
          Ce que disent{' '}
          <span className="text-accent">mes clients.</span>
        </h2>
      </FadeIn>

      <Stagger stagger={0.1}>
        {testimonials.map((t, i) => (
          <StaggerItem key={i} y={24}>
            <figure className="group grid grid-cols-[auto_1fr] gap-6 sm:gap-10 py-8 border-t border-white/[0.06] hover:border-white/[0.12] transition-colors">
              {/* Avatar */}
              <div className="pt-1">
                <Avatar name={t.name} image={t.image} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex flex-col gap-4">
                {/* Meta */}
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-white/80 text-sm font-medium leading-none mb-1">
                      {t.name}
                    </p>
                    <p className="text-white/30 text-xs">{t.role}</p>
                  </div>
                  <div className="ml-auto shrink-0">
                    <Stars count={t.stars ?? 5} />
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-white/60 leading-relaxed text-base sm:text-lg italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
            </figure>
          </StaggerItem>
        ))}

        {/* Bottom border */}
        <div className="border-t border-white/[0.06]" />
      </Stagger>
    </section>
  );
};

export default Testimonials;
