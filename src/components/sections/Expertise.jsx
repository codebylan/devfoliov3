import {
  Code2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

const expertiseData = [
  {
    icon: Code2,
    title: 'Développement sur mesure',
    description:
      "Applications web et mobiles conçues selon vos besoins. De l'idée au déploiement, je m'occupe de tout.",
  },
  {
    icon: Sparkles,
    title: 'Intégration IA',
    description:
      "Chatbots intelligents, automatisation de tâches répétitives, génération de contenu. Gagnez du temps, concentrez-vous sur l'essentiel.",
  },
  {
    icon: Zap,
    title: 'Performance & Optimisation',
    description:
      'Sites ultra-rapides, SEO optimisé, Core Web Vitals au vert. Votre vitrine digitale ne doit pas vous faire perdre des clients.',
  },
  {
    icon: Users,
    title: 'UX/UI Premium',
    description:
      "Design moderne, interfaces intuitives, parcours utilisateur fluides. Parce qu'une belle interface convertit mieux.",
  },
  {
    icon: ShieldCheck,
    title: 'Maintenance & Évolution',
    description:
      'Votre application évolue avec votre business. Je reste à vos côtés pour les mises à jour, corrections et nouvelles fonctionnalités.',
  },
  {
    icon: TrendingUp,
    title: 'Conseil Stratégique',
    description:
      'Vision business + expertise technique. Je vous aide à prendre les bonnes décisions pour maximiser votre ROI digital.',
  },
];

const Expertise = () => {
  return (
    <section id="expertise" className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-2 sm:space-y-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl italic leading-tight px-4">
          Ce que je peux faire{' '}
          <span className="text-accent">pour votre business.</span>
        </h2>
        <h3 className="text-sm sm:text-base lg:text-lg text-muted-foreground px-4">
          Des solutions concrètes pour transformer vos ambitions en réalité
          digitale.
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-8 sm:mt-10">
        {expertiseData.map((expertise, index) => {
          const Icon = expertise.icon;
          return (
            <div
              key={index}
              className="bg-linear-to-br from-black to-[#262626] p-4 sm:p-5 rounded-sm 
                         hover:from-[#1a1a1a] hover:to-[#2a2a2a] 
                         transition-all duration-300 
                         border border-transparent hover:border-accent/20
                         group cursor-default"
            >
              <div className="flex gap-3 items-start">
                <div className="bg-[#262626] p-2 rounded-sm shrink-0 group-hover:bg-[#1a1a1a] transition-colors duration-300">
                  <Icon
                    width={24}
                    height={24}
                    className="text-accent"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-semibold text-accent leading-tight">
                    {expertise.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {expertise.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Expertise;
