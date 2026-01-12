'use client';

import { useState } from 'react';
import { faqData } from '../../data/faq';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq">
      {/* Header */}
      <div className="mb-16">
        <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
          FAQ
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl italic leading-[0.95]">
          Questions <span className="text-accent">fréquentes.</span>
        </h2>
      </div>

      {/* Two-column FAQ */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Questions list */}
        <div className="space-y-2">
          {faqData.map((faq, index) => (
            <button
              key={index}
              onClick={() => setOpenIndex(index)}
              className={`w-full text-left py-4 border-b border-white/5 transition-colors ${
                openIndex === index
                  ? 'text-accent'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="text-base sm:text-lg">{faq.question}</span>
            </button>
          ))}
        </div>

        {/* Active answer */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-white/30 text-xs uppercase tracking-wider mb-4">
            Réponse
          </p>
          <p className="text-white/70 text-lg leading-relaxed">
            {faqData[openIndex]?.answer}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between text-sm">
        <span className="text-white/30">Autre question ?</span>
        <a
          href="mailto:d.agboton.dev@gmail.com"
          className="text-accent hover:underline"
        >
          d.agboton.dev@gmail.com
        </a>
      </div>
    </section>
  );
};

export default FAQ;
