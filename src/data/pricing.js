export const pricingData = [
  {
    title: 'Site Vitrine Premium',
    subtitle:
      'Pour lancer ou moderniser votre image avec un site rapide et crédible.',
    price: { amount: '1 990€', prefix: 'À partir de' },
    features: [
      "Site ultra-rapide Next.js (jusqu'à 5 pages)",
      'Design responsive sur mesure (mobile + desktop)',
      'SEO technique + optimisation Core Web Vitals',
      'CMS intégré (édition autonome sans développeur)',
      'Formulaire de contact fiable et sécurisé',
    ],
    bonus: 'Formation à la prise en main (1h) + hébergement assisté Vercel',
    isRecommended: false,
  },
  {
    title: 'Site Sur Mesure',
    subtitle:
      "Pour un projet web ambitieux avec des fonctionnalités spécifiques, sans aller jusqu'au SaaS.",
    price: { amount: '3 490€', prefix: 'À partir de' },
    features: [
      "Site jusqu'à 10 pages, architecture évolutive",
      'Blog, portfolio ou catalogue intégré',
      'Espace membre + accès contenu protégé',
      'Intégration newsletter & outils marketing',
      'SEO avancé + performance Core Web Vitals',
    ],
    bonus: 'Audit de performance offert (M+1) + animations & micro-interactions',
    isRecommended: false,
  },
  {
    title: 'Pack MVP / Lancement SaaS',
    subtitle:
      'Pour transformer une idée en produit fonctionnel et commencer à vendre.',
    price: { amount: '5 490€', prefix: 'À partir de' },
    features: [
      'Architecture scalable Next.js + Supabase',
      'Authentification complète (email, OAuth, rôles)',
      'Paiement en ligne (abonnement ou achat unique)',
      'Dashboard admin sur mesure',
      'Développement des fonctionnalités essentielles du MVP',
    ],
    bonus:
      'Mise en ligne + 1 mois de maintenance offert + accompagnement go-to-market',
    isRecommended: true,
  },
  {
    title: 'Intégration IA & Automation',
    subtitle: 'Pour gagner du temps et automatiser les tâches répétitives.',
    price: { amount: '2 990€', prefix: 'À partir de' },
    features: [
      'Audit IA des process existants',
      'Chatbot / assistant IA intégré à votre produit',
      'Connexions entre vos outils (site, CRM, emails, formulaires)',
      'Automatisations concrètes (leads, support, relances, reporting)',
      'Formation courte pour être autonome',
    ],
    bonus: '1 mois de suivi et ajustements inclus',
    isRecommended: false,
  },
];
