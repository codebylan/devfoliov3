'use client';

import { faqData } from '../../data/faq';
import {
  Briefcase,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import faqImage from '../../../public/images/faq-image.png';

const iconMap = {
  Briefcase,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  HeartHandshake,
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative">
      {/* Header */}
      <div className="mb-12 text-center sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl italic leading-tight mb-3">
          Vos questions, <br className="sm:hidden" />
          <span className="text-accent">mes réponses.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 m">
          Pas de zones d&apos;ombre. Voici comment nous allons travailler
          ensemble.
        </p>
      </div>

      {/* Content Container - Two Columns on Desktop */}
      <div className="flex  items-center rounded-sm p-5 flex-col lg:flex-row gap-8 lg:gap-12 ">
        {/* FAQ Items - Left Side */}
        <div className="space-y-3 flex-1 max-w-3xl">
          {faqData.map((faq, index) => {
            const Icon = iconMap[faq.icon];
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`
                  group relative
                  transition-all duration-300
                  ${isOpen ? 'mb-2' : ''}
                `}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left relative"
                >
                  <div
                    className={`
                    flex items-start gap-4 p-5 sm:p-6
                    border-l-2 transition-all duration-300
                    ${
                      isOpen
                        ? 'border-l-accent bg-black/40'
                        : 'border-l-white/10 hover:border-l-accent/50 hover:bg-black/20'
                    }
                  `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                      mt-0.5 transition-all duration-300
                      ${isOpen ? 'text-accent scale-110' : 'text-white/40'}
                    `}
                    >
                      {/* <Icon width={20} height={20} strokeWidth={1.5} /> */}
                    </div>

                    {/* Question Text */}
                    <div className="flex-1 pr-8">
                      <h3
                        className={`
                        text-sm sm:text-base font-medium leading-snug
                        transition-colors duration-300
                        ${
                          isOpen
                            ? 'text-accent'
                            : 'text-white group-hover:text-accent/80'
                        }
                      `}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* Indicator */}
                    <div
                      className={`
                      absolute right-5 sm:right-6 top-5 sm:top-6
                      w-1 h-1 rounded-full
                      transition-all duration-300
                      ${
                        isOpen
                          ? 'bg-accent scale-150'
                          : 'bg-white/20 group-hover:bg-accent/50'
                      }
                    `}
                    />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`
                    grid transition-all duration-300 ease-in-out
                    ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="pl-5 sm:pl-[72px] pr-5 sm:pr-6 pb-6 pt-2">
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Image - Right Side (Hidden on Mobile) */}
        <div className="hidden lg:block lg:w-[400px] xl:w-[450px] shrink-0 sticky top-8">
          <div className="relative rounded-sm overflow-hidden">
            <Image
              src={faqImage}
              alt="FAQ Développeur Freelance Paris - Questions fréquentes sur développement Next.js et Intégration IA"
              width={450}
              height={600}
              quality={90}
              className="w-full h-auto object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
