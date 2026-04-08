export const pricingData = [
  {
    projectType: 'vitrine',
    title: 'Vitrine Pro',
    subtitle:
      'Pour avoir un site propre, rapide et visible sur Google. Idéal pour lancer ou moderniser votre image.',
    price: { amount: '2 490€', prefix: 'À partir de' },
    features: [
      "Jusqu'à 5 pages, design soigné sur mobile et ordinateur",
      'Votre site apparaît sur Google (référencement inclus)',
      'Vous modifiez vos textes et photos tout seul, sans appeler personne',
      'Formulaire de contact fiable et sécurisé',
      'Formation pour prendre en main votre site (1h) + mise en ligne assistée',
    ],
    isRecommended: false,
  },
  {
    projectType: 'business',
    title: 'Site Business',
    subtitle:
      'Pour attirer plus de clients en ligne et vous démarquer clairement de vos concurrents.',
    price: { amount: '4 490€', prefix: 'À partir de' },
    features: [
      "Jusqu'à 10 pages, site pensé pour évoluer avec vous",
      'Réservation en ligne ou espace client intégré',
      'Votre fiche Google optimisée pour votre ville',
      'Blog ou catalogue pour montrer votre expertise',
      'Connexion à votre newsletter et vos outils marketing',
      'Bilan de performance offert 1 mois après le lancement',
    ],
    isRecommended: true,
  },
  {
    projectType: 'custom',
    title: 'Sur Mesure',
    subtitle:
      'Pour les projets qui dépassent un site : application métier, espace client sécurisé, paiement en ligne, tableau de bord.',
    price: { amount: '5 990€', prefix: 'À partir de' },
    features: [
      'Connexion sécurisée pour vos clients, votre équipe et vous',
      'Paiement en ligne intégré (abonnement ou achat ponctuel)',
      "Tableau de bord pour piloter votre activité au quotidien",
      'Connexions à vos outils existants (agenda, CRM, email…)',
      'Construit pour tenir dans la durée, même si votre activité grandit',
      '1 mois de suivi et ajustements inclus après le lancement',
    ],
    isRecommended: false,
  },
];
