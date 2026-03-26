'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { faqData } from '../../data/faq';
import { FadeIn, Stagger, StaggerItem } from '../motion/FadeIn';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq">
      {/* Header */}
      <FadeIn className="mb-16">
        <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
          FAQ
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl italic leading-[0.95]">
          Questions <span className="text-accent">fréquentes.</span>
        </h2>
      </FadeIn>

      {/* Two-column FAQ */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Questions list */}
        <Stagger stagger={0.06} className="space-y-2">
          {faqData.map((faq, index) => (
            <StaggerItem key={index} y={15}>
              <button
                onClick={() => setOpenIndex(index)}
                className={`w-full text-left py-4 border-b border-white/5 transition-colors ${
                  openIndex === index
                    ? 'text-accent'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Active answer */}
        <FadeIn className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-white/30 text-xs uppercase tracking-wider mb-4">
            Réponse
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={openIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-white/70 text-lg leading-relaxed"
            >
              {faqData[openIndex]?.answer}
            </motion.p>
          </AnimatePresence>
        </FadeIn>
      </div>

      {/* Footer */}
      <FadeIn delay={0.2}>
        <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between text-sm">
          <span className="text-white/30">Autre question ?</span>
          <a
            href="mailto:d.agboton.dev@gmail.com"
            className="text-accent hover:underline"
          >
            d.agboton.dev@gmail.com
          </a>
        </div>
      </FadeIn>
    </section>
  );
};

export default FAQ;
