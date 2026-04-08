'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { faqData } from '../../data/faq';
import { FadeIn } from '../motion/FadeIn';

const FAQItem = ({ faq, index, isOpen, onToggle }) => (
  <div className="border-t border-white/[0.06]">
    <button
      onClick={() => onToggle(index)}
      aria-expanded={isOpen}
      className="w-full text-left py-5 flex items-start justify-between gap-4 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
    >
      <span
        className={`text-sm sm:text-base leading-snug transition-colors ${
          isOpen ? 'text-white' : 'text-white/60 group-hover:text-white/90'
        }`}
      >
        {faq.question}
      </span>
      <span
        className={`text-white/30 text-lg shrink-0 mt-0.5 transition-transform duration-300 ${
          isOpen ? 'rotate-45 text-accent' : ''
        }`}
        aria-hidden
      >
        +
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <p className="text-white/50 text-sm leading-relaxed pb-6 pr-8">
            {faq.answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="faq">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* ── Colonne gauche : FAQ ── */}
        <div>
          <FadeIn className="mb-12">
            <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
              FAQ
            </p>
            <h2 className="text-4xl sm:text-5xl italic leading-[0.95]">
              Questions <span className="text-accent">fréquentes.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              {faqData.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={toggle}
                />
              ))}
              <div className="border-t border-white/[0.06]" />
            </div>

            <div className="mt-8 flex items-center justify-between text-xs">
              <span className="text-white/30">Autre question ?</span>
              <a
                href="mailto:d.agboton.dev@gmail.com"
                className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
              >
                d.agboton.dev@gmail.com
              </a>
            </div>
          </FadeIn>
        </div>

        {/* ── Colonne droite : image ── */}
        <FadeIn delay={0.2} className="hidden lg:block lg:sticky lg:top-24">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src="/images/faq-images.svg"
              alt="Dylan Agboton — développeur web freelance Paris"
              fill
              className="object-cover object-center "
              sizes="(max-width: 1024px) 0px, 50vw"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default FAQ;
