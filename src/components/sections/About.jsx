import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import me from '../../../public/images/me.webp';
import { Button } from '../ui/button';

const About = () => {
  return (
    <section id="about" className="space-y-6 sm:space-y-8 lg:space-y-10">
      <div className="text-center space-y-2 sm:space-y-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl italic leading-tight px-4">
          Entre la rigueur du Code et{' '}
          <span className="text-accent">la réalité du Business.</span>
        </h2>
        <h3 className="text-sm sm:text-base lg:text-lg text-muted-foreground px-4">
          L&apos;histoire d&apos;une passion d&apos;enfance devenue une
          expertise stratégique.
        </h3>
      </div>

      <div className="flex  flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-start">
        {/* Left column */}
        <div className="flex-1 max-w-2xl space-y-4 sm:space-y-5 text-sm  leading-relaxed">
          <p>
            Tout commence à l&apos;âge de 6 ans. Ce n&apos;est pas devant une
            console de jeu que je passais mes journées, mais à{' '}
            <span className="italic">côté de mon père</span>. C&apos;est lui qui
            m&apos;a mis les mains sur le clavier : installer des logiciels,
            comprendre le traitement de texte, explorer les débuts
            d&apos;internet.... Ce qui n&apos;était au départ qu&apos;une
            curiosité d&apos;enfant s&apos;est vite transformé en une véritable
            obsession. Je ne voulais plus seulement{' '}
            <span className="italic">utiliser</span> l&apos;ordinateur, je
            voulais comprendre{' '}
            <span className="font-semibold text-accent">
              comment tout fonctionnait sous le capot.
            </span>
          </p>

          <p>
            Pourtant, je n&apos;ai pas foncé tête baissée vers une école
            d&apos;ingénieur. J&apos;ai fait un choix différent :{' '}
            <span className="font-semibold text-accent">le Commerce.</span>{' '}
            Pendant mes études, j&apos;ai appris ce qui fait vivre une
            entreprise : la vente, la psychologie client, la rentabilité et le
            marketing. J&apos;ai compris qu&apos;un produit, aussi technique
            soit-il, ne sert à rien s&apos;il ne répond pas à un besoin humain.
          </p>

          <p>
            Mais la passion ne s&apos;éteint jamais vraiment. Fort de cette
            vision business, j&apos;ai opéré une reconversion pour revenir à ma
            vocation première : le développement web. Je me suis replongé dans
            le code avec une discipline de fer, rattrapant chaque évolution
            technologique pour maîtriser l&apos;écosystème moderne (Next.js,
            React, Node.js).
          </p>

          <p>
            Aujourd&apos;hui, je suis un{' '}
            <span className="text-accent font-semibold">
              Développeur Hybride.
            </span>{' '}
            Contrairement à un profil purement technique, je ne code pas pour la
            beauté du geste. Grâce à mon background commercial,{' '}
            <span className="text-accent font-semibold">
              je code pour votre croissance.
            </span>
          </p>

          <ul className="list-disc ml-6 sm:ml-8 lg:ml-10 space-y-2">
            <li>
              Quand vous me parlez de &quot;conversion&quot;, je comprends.
            </li>
            <li>Quand vous me parlez de &quot;ROI&quot;, je comprends.</li>
            <li>
              Et quand il faut traduire tout ça en une application web
              performante, je réalise.
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="shrink-0 flex justify-center lg:justify-start w-full lg:w-auto">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[280px]">
            <Image
              src={me}
              alt="Dylan Agboton - Développeur Fullstack Next.js & Intégrateur IA Freelance à Paris"
              width={640}
              height={640}
              quality={100}
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 280px"
              className="rounded-sm w-full h-auto object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center sm:items-start space-y-3">
        <Link href={'/'} className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto mt-5 text-sm items-center bg-black cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <Calendar /> Réserver un appel
          </Button>
        </Link>

        <p className="text-[10px] text-[#C3C1BA] text-center sm:text-left">
          Réponse sous 24h • Accompagnement court ou long terme
        </p>
      </div>
    </section>
  );
};

export default About;
