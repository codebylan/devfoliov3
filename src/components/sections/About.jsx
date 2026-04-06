'use client';

import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import me from '../../../public/images/me.webp';
import { useBooking } from '../../contexts/BookingContext';
import { FadeIn, Stagger, StaggerItem } from '../motion/FadeIn';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const About = () => {
  const { openBookingModal } = useBooking();

  return (
    <section id="about">
      {/* Header */}
      <FadeIn className="mb-16 lg:mb-24">
        <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
          À propos
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl italic leading-[0.95] max-w-3xl">
          Des sites et applications web complets,{' '}
          <span className="text-accent">rapides et fiables.</span>
        </h2>
      </FadeIn>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Image Column */}
        <FadeIn delay={0.1} className="lg:col-span-4 order-1 lg:order-0">
          <div className="sticky top-24">
            <div className="relative">
              <Image
                src={me}
                alt="Dylan Agboton - Développeur web spécialisé entreprises de services"
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
        </FadeIn>

        {/* Story Column */}
        <Stagger stagger={0.12} className="lg:col-span-7 lg:col-start-6 space-y-12">
          <StaggerItem>
            <div className="relative pl-8 border-l border-white/10">
              <span className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 rounded-full bg-accent" />
              <p className="text-white/70 leading-relaxed">
                Je conçois des sites web performants pour les entreprises de
                services qui veulent attirer plus de clients en ligne. Instituts,
                cabinets, commerces, consultants — je comprends vos enjeux parce
                que je travaille exclusivement avec des entrepreneurs comme vous.
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                Avec 3 ans d&apos;expérience en développement web, j&apos;ai
                accompagné des entreprises concrètes sur des projets à impact :
                boutiques en ligne, systèmes de réservation, outils métier sur
                mesure. Mon approche : un site rapide, bien référencé, que vous
                pouvez gérer vous-même au quotidien.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="relative pl-8 border-l border-white/10">
              <span className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 rounded-full bg-white/20" />
              <p className="text-white/30 text-xs uppercase tracking-widest mb-4">
                Ce que j&apos;apporte concrètement
              </p>
              <ul className="space-y-3 text-white/70 leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-accent shrink-0">→</span>
                  Des sites et applications agréables à utiliser, modernes et
                  rapides
                </li>
                <li className="flex gap-2">
                  <span className="text-accent shrink-0">→</span>
                  Une logique serveur fiable : vos données et vos processus
                  sécurisés et bien organisés
                </li>
                <li className="flex gap-2">
                  <span className="text-accent shrink-0">→</span>
                  Des données bien structurées et sécurisées (clients, commandes,
                  réservations…)
                </li>
                <li className="flex gap-2">
                  <span className="text-accent shrink-0">→</span>
                  Un référencement local solide pour que vos clients vous trouvent
                  sur Google
                </li>
              </ul>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="relative pl-8 border-l border-white/10">
              <span className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 rounded-full bg-white/20" />
              <p className="text-white/30 text-xs uppercase tracking-widest mb-4">
                Quelques résultats récents
              </p>
              <ul className="space-y-3 text-white/70 leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-accent shrink-0">→</span>
                  +40% de visiteurs qui passent à l&apos;achat sur une boutique
                  en ligne cosmétiques
                </li>
                <li className="flex gap-2">
                  <span className="text-accent shrink-0">→</span>
                  +50% de réservations pour un institut basé en Suisse
                </li>
                <li className="flex gap-2">
                  <span className="text-accent shrink-0">→</span>
                  -30% de temps de chargement grâce à l&apos;optimisation du site
                </li>
              </ul>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="pt-6 border-t border-white/10">
              <p className="text-white/70 leading-relaxed">
                Que vous soyez un indépendant, un commerce ou une PME de services,
                je prends en charge votre projet de bout en bout.
              </p>
            </div>
          </StaggerItem>

          {/* CTA */}
          <StaggerItem>
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
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
};

export default About;
