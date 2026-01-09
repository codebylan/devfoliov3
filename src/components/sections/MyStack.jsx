import { technology } from '@/data/technology';
import { BicepsFlexed, BrainCircuit, DatabaseZap, Rocket } from 'lucide-react';
import Image from 'next/image';
import myStackImage from '../../../public/images/mystack-img.png';

const MyStack = () => {
  return (
    <section id="expertise">
      <h2 className="italic text-center text-3xl text-[#C8B792]!">
        Mon arsenal technique
      </h2>
      <p className="text-center text-base mt-2">
        La puissance de l&apos;écosystème JavaScript moderne, boosté par
        l&apos;intelligence Artificielle.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-10 px-4">
        {technology.map((tech, index) => (
          <div key={tech.name} className="flex items-center">
            <div
              className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 relative group"
              title={tech.name}
            >
              <Image
                src={tech.icon}
                alt={tech.name}
                width={48}
                height={48}
                className="object-contain opacity-70 p-4 rounded-sm bg-[#C8B792]! group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            {index < technology.length - 1 && (
              <div className="w-px h-8 md:h-10 bg-gray-500/40 mx-2 md:mx-3"></div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-black mt-10 p-4 rounded-sm">
        <div className="lg:flex col  items-center justify-center gap-10">
          {/* Left Column  */}
          <div className="lg:flex mt-5 col gap-2">
            <div>
              <div className="bg-gradient-to-br max-w-sm from-black to-[#262626] p-3 rounded-sm mb-5 mt-5">
                <div className="flex gap-2 items-center ">
                  <div className="bg-[#262626] p-1 rounded-sm">
                    <Rocket width={25} height={'auto'} color="#C8B792" />
                  </div>
                  <h3 className="text-sm font-semibold text-accent">
                    Performance | Next.js React
                  </h3>
                </div>
                <p className="text-sm mt-3">
                  Le standard actuel pour des sites ultra-rapides et optimisé
                  SEO. Utimisé pour garantir une expérience utilisateur fluide.
                </p>
              </div>
              <div className="bg-gradient-to-br max-w-sm from-black to-[#262626] p-3 rounded-sm mb-5 mt-5">
                <div className="flex gap-2 items-center ">
                  <div className="bg-[#262626] p-1 rounded-sm">
                    <BicepsFlexed width={25} height={'auto'} color="#C8B792" />
                  </div>
                  <h3 className="text-sm font-semibold text-accent">
                    Robustesse | Node.js & TypeScript
                  </h3>
                </div>
                <p className="text-sm mt-3">
                  Un code backend structuré, sécurisé et maintenable. Moins de
                  bugs, plus de facilité pour faire évoluer votre projet.
                </p>
              </div>
            </div>
          </div>

          {/* Middle Column  */}
          <div>
            <div className="shrink-0">
              <Image
                src={myStackImage}
                width={350}
                alt="Mon Arsenal Technique"
                height={'auto'}
              />
            </div>
          </div>

          {/* Right Column  */}
          <div>
            <div className="bg-gradient-to-br max-w-sm from-black to-[#262626] p-3 rounded-sm mb-5 mt-5">
              <div className="flex gap-2 items-center ">
                <div className="bg-[#262626] p-1 rounded-sm">
                  <BrainCircuit width={25} height={'auto'} color="#C8B792" />
                </div>
                <h3 className="text-sm text-accent font-semibold">
                  Innovation | IA Automatisation
                </h3>
              </div>
              <p className="text-sm mt-3">
                Intégration d'IA générative pour créer des fonctionnalités
                intelligentes (Chatbots, analyses, génération de contenu).
              </p>
            </div>
            <div className="bg-gradient-to-br max-w-sm from-black to-[#262626] p-3 rounded-sm mb-5 mt-5">
              <div className="flex gap-2 items-center ">
                <div className="bg-[#262626] p-1 rounded-sm">
                  <DatabaseZap width={25} height={'auto'} color="#C8B792" />
                </div>
                <h3 className="text-sm text-accent font-semibold">
                  Infrastructure | Vercel & Supabase
                </h3>
              </div>
              <p className="text-sm  mt-3">
                Hébergement Cloud haute disponibilité et bases de données
                évolutives. Votre site grandit avec vous, sans friction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStack;
