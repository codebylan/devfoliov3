import Link from 'next/link';

export const metadata = {
  title: 'CGV | Dylan Agboton',
  description: 'Conditions générales de vente des prestations de développement web.',
  robots: 'noindex, nofollow',
};

const articles = [
  {
    title: 'Objet',
    content: `Les présentes CGV régissent les relations entre Dylan Agboton, 
    développeur Fullstack et intégrateur IA, et ses clients pour toute 
    prestation de développement web et intégration d'intelligence artificielle.`,
  },
  {
    title: 'Prestations',
    content: `Applications web sur mesure (Next.js, React, Node.js). 
    Sites vitrine et e-commerce. Intégration IA et automatisation. 
    Conseil technique. Maintenance.`,
  },
  {
    title: 'Devis',
    content: `Tout projet débute par un appel découverte gratuit. 
    Le devis détaillé est valable 30 jours. 
    La commande devient ferme après acceptation écrite et versement de l'acompte.`,
  },
  {
    title: 'Paiement',
    content: `Prix en euros HT. 
    Échelonnement standard : 30% à la commande, 40% à la validation du prototype, 
    30% à la livraison. Paiement par virement ou carte bancaire.`,
  },
  {
    title: 'Délais',
    content: `Les délais sont indicatifs. Ils peuvent être révisés en cas de 
    modifications demandées, retard dans la fourniture des éléments nécessaires, 
    ou cas de force majeure.`,
  },
  {
    title: 'Propriété intellectuelle',
    content: `À réception du paiement intégral, le client devient propriétaire 
    des droits d'exploitation. Codes sources et documentations transférés. 
    Mention portfolio autorisée sauf accord contraire.`,
  },
  {
    title: 'Confidentialité',
    content: `Les parties s'engagent à maintenir confidentielles les informations 
    échangées. Cette obligation perdure 2 ans après la fin du contrat.`,
  },
  {
    title: 'Garantie',
    content: `30 jours de garantie après livraison pour la correction des bugs. 
    Les évolutions font l'objet d'un devis complémentaire.`,
  },
  {
    title: 'Résiliation',
    content: `En cas de résiliation anticipée, les sommes versées restent acquises 
    au titre des travaux réalisés. Le travail effectué sera livré.`,
  },
  {
    title: 'Litiges',
    content: `Droit français applicable. Recherche de solution amiable sous 30 jours. 
    À défaut, tribunaux de Paris compétents.`,
  },
];

export default function CGV() {
  return (
    <main className="py-12 sm:py-20">
      {/* Breadcrumb */}
      <p className="text-xs text-white/30 mb-12">
        <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
        <span className="mx-2">/</span>
        <span>CGV</span>
      </p>

      {/* Title */}
      <header className="mb-20">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl italic leading-[0.9] mb-6">
          Conditions<br />
          <span className="text-accent">générales</span>
        </h1>
        <p className="text-white/40 text-sm max-w-md">
          Applicables à toute prestation de développement web 
          et intégration IA.
        </p>
      </header>

      {/* Articles */}
      <article className="max-w-2xl">
        {articles.map((article, index) => (
          <section 
            key={index} 
            className="mb-12 pb-12 border-b border-white/5 last:border-0"
          >
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-accent/40 text-sm font-mono tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="text-white text-lg">{article.title}</h2>
            </div>
            <p className="text-white/60 leading-relaxed pl-10">
              {article.content}
            </p>
          </section>
        ))}
      </article>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-between text-xs text-white/30">
        <p>Mise à jour : Janvier 2026</p>
        <nav className="flex gap-6">
          <Link href="/mentions-legales" className="hover:text-accent transition-colors">Mentions légales</Link>
          <Link href="/confidentialite" className="hover:text-accent transition-colors">Confidentialité</Link>
        </nav>
      </footer>
    </main>
  );
}
