'use client';

import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import me from '../../../public/images/me.webp';
import { useBooking } from '../../contexts/BookingContext';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const About = () => {
  const { openBookingModal } = useBooking();

  return (
    <section id="about">
      {/* Header */}
      <div className="mb-16 lg:mb-24">
        <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
          À propos
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl italic leading-[0.95] max-w-3xl">
          Entre la rigueur du code et{' '}
          <span className="text-accent">la réalité du business.</span>
        </h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Image Column */}
        <div className="lg:col-span-4 order-1 lg:order-0">
          <div className="sticky top-24">
            <div className="relative">
              <Image
                src={me}
                alt="Dylan Agboton - Développeur Fullstack & Intégrateur IA"
                width={400}
                height={500}
                quality={90}
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="w-full max-w-sm lg:max-w-none rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Caption */}
              <div className="mt-4 flex items-center justify-between text-xs text-white/30">
                <span>Dylan Agboton, 30 ans</span>
                <span>Paris, France</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Column */}
        <div className="lg:col-span-7 lg:col-start-6 space-y-16">
          {/* Chapter 1 */}
          <div className="relative pl-8 border-l border-white/10">
            <span className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 rounded-full bg-accent" />
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">
              L&apos;origine — 6 ans
            </p>
            <p className="text-white/70 leading-relaxed">
              Ce n&apos;est pas devant une console que je passais mes journées,
              mais <span className="text-white italic">à côté de mon père</span>
              . C&apos;est lui qui m&apos;a mis les mains sur le clavier. Ce qui
              n&apos;était qu&apos;une curiosité d&apos;enfant s&apos;est
              transformé en obsession : comprendre{' '}
              <span className="text-accent">
                comment tout fonctionnait sous le capot.
              </span>
            </p>
          </div>

          {/* Chapter 2 */}
          <div className="relative pl-8 border-l border-white/10">
            <span className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 rounded-full bg-white/20" />
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">
              Le détour — Commerce
            </p>
            <p className="text-white/70 leading-relaxed">
              Je n&apos;ai pas foncé vers une école d&apos;ingénieur. J&apos;ai
              choisi <span className="text-accent">le commerce</span>. La vente,
              la psychologie client, la rentabilité. J&apos;ai compris
              qu&apos;un produit, aussi technique soit-il, ne sert à rien
              s&apos;il ne répond pas à un besoin humain.
            </p>
          </div>

          {/* Chapter 3 */}
          <div className="relative pl-8 border-l border-white/10">
            <span className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 rounded-full bg-white/20" />
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">
              Le retour — Reconversion
            </p>
            <p className="text-white/70 leading-relaxed">
              La passion ne s&apos;éteint jamais. Fort de cette vision business,
              je suis revenu au code. Discipline de fer, rattrapage
              technologique. Next.js, React, Node.js, IA. L&apos;écosystème
              moderne maîtrisé.
            </p>
          </div>

          {/* Conclusion - Pull Quote */}
          <div className="pt-8 border-t border-white/10">
            <blockquote className="text-2xl sm:text-3xl italic leading-snug text-white/90 mb-8">
              &ldquo;Je ne code pas pour la beauté du geste.{' '}
              <span className="text-accent">
                Je code pour votre croissance.
              </span>
              &rdquo;
            </blockquote>

            <div className="space-y-4 text-white/50 text-sm">
              <p>
                <span className="text-white">Conversion</span> — je comprends.
              </p>
              <p>
                <span className="text-white">ROI</span> — je comprends.
              </p>
              <p>
                <span className="text-white">Application performante</span> — je
                réalise.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start gap-6 pt-8">
            <Button
              onClick={openBookingModal}
              className="group bg-accent text-black font-semibold cursor-pointer px-6 py-5 transition-colors"
            >
              <span className="flex items-center gap-2">
                Discutons de votre projet
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Button>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-white/15 text-white/70 bg-white/5"
                >
                  <Check className="text-accent" />
                  Réponse sous 24h
                </Badge>
                <Badge
                  variant="outline"
                  className="border-white/15 text-white/70 bg-white/5"
                >
                  <Check className="text-accent" />
                  Sans engagement
                </Badge>
              </div>
              <p className="text-xs text-white/30">
                Accompagnement court ou long terme • Paris & remote
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
