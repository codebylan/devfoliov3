'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { testimonials } from '../../data/testimonials';
import { FadeIn } from '../motion/FadeIn';

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
  const initials =
    name
      ?.replace(/^\[|\]$/g, '')
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
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover grayscale"
      />
    );
  }

  return (
    <div className="w-10 h-10 shrink-0 bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/20 text-xs font-medium tracking-wider select-none">
      {initials}
    </div>
  );
};

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

const Testimonials = () => {
  const published = testimonials.filter((t) => t.isPublished && t.quote);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  if (published.length === 0) return null;

  const go = (next) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const prev = () => go((index - 1 + published.length) % published.length);
  const next = () => go((index + 1) % published.length);

  const t = published[index];

  return (
    <section id="testimonials">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* ── Colonne gauche : carousel ── */}
        <div>
          <FadeIn className="mb-12">
            <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
              Témoignages
            </p>
            <h2 className="text-4xl sm:text-5xl italic leading-[0.95]">
              Ce que disent <span className="text-accent">mes clients.</span>
            </h2>
          </FadeIn>

          {/* Card */}
          <div className="">
            <div className="relative overflow-hidden py-10 min-h-[260px]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={t.id ?? index}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col gap-5"
                >
                  {/* Quote */}
                  <blockquote className="text-white/60 leading-relaxed text-base sm:text-lg italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Result */}
                  {t.result && (
                    <p className="text-accent text-xs font-medium tracking-wide">
                      ↑ {t.result}
                    </p>
                  )}

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    {/* <Avatar name={t.name} image={t.image} /> */}
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
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="border-t border-white/[0.06] pt-6 flex items-center justify-between">
              {/* Dots */}
              <div
                className="flex gap-2"
                role="tablist"
                aria-label="Témoignages"
              >
                {published.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Témoignage ${i + 1}`}
                    onClick={() => go(i)}
                    className={`h-px transition-all duration-300 ${
                      i === index
                        ? 'w-8 bg-accent'
                        : 'w-4 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next */}
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  aria-label="Témoignage précédent"
                  className="w-9 h-9 rounded-sm border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  aria-label="Témoignage suivant"
                  className="w-9 h-9 border rounded-sm border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Colonne droite : image ── */}
        <FadeIn delay={0.2} className="hidden lg:block lg:sticky lg:top-24">
          <div className="relative w-full aspect-[4/4] overflow-hidden">
            <Image
              src="/images/testimonials-images.svg"
              alt="Dylan Agboton — développeur web freelance"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 0px, 50vw"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Testimonials;
