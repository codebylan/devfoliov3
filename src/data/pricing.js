export const pricingData = [
  {
    title: 'Vitrine Pro',
    subtitle:
      'Pour lancer ou moderniser votre image avec un site rapide, visible sur Google et crédible.',
    price: { amount: '2 490€', prefix: 'À partir de' },
    features: [
      "Site jusqu'à 5 pages, design responsive sur mesure",
      'SEO technique + optimisation Core Web Vitals',
      'CMS intégré (édition autonome sans développeur)',
      'Formulaire de contact fiable et sécurisé',
      'Formation à la prise en main (1h) + hébergement assisté Vercel',
    ],
    isRecommended: false,
  },
  {
    title: 'Site Business',
    subtitle:
      'Pour une entreprise qui veut attirer des clients en ligne et se démarquer de la concurrence.',
    price: { amount: '4 490€', prefix: 'À partir de' },
    features: [
      "Jusqu'à 10 pages, architecture évolutive",
      'Blog ou catalogue intégré',
      'Système de réservation ou espace membre',
      'SEO avancé + Google My Business',
      'Intégration newsletter & outils marketing',
      'Audit performance offert M+1',
    ],
    isRecommended: true,
  },
  {
    title: 'Solution Sur Mesure',
    subtitle:
      'Pour un projet ambitieux avec des fonctionnalités avancées, un paiement en ligne ou un espace admin.',
    price: { amount: '5 990€', prefix: 'À partir de' },
    features: [
      'Architecture scalable Next.js + Supabase',
      'Authentification complète (email, OAuth, rôles)',
      'Paiement en ligne (abonnement ou achat unique)',
      'Dashboard admin sur mesure',
      'Fonctionnalités sur mesure (IA, automatisation, etc.)',
      'Mise en ligne + 1 mois de maintenance offert',
    ],
    isRecommended: false,
  },
];
