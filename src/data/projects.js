export const projects = [
  {
    slug: 'dayness-cosmetics',
    name: 'Dayness Cosmetics',
    type: 'E-commerce',
    job: 'Développement Fullstack | Next.js, Node.js & Stripe.',
    valueProposition:
      'Un e-commerce rapide, fiable et pensé pour convertir sur mobile.',
    image: '/images/dayness-cosmetics.png',
    video: '/videos/dayness-cosmetics.mov',
    role: ['Cadrage technique', 'Développement fullstack', 'Paiement Stripe'],
    context: {
      sector: 'Cosmétiques',
      objective:
        "Lancer une boutique en ligne performante avec un tunnel d'achat simple et rassurant.",
    },
    constraints: [
      'Expérience mobile-first',
      'Paiement sécurisé et robuste',
      'Catalogue clair et navigation fluide',
    ],
    solution: [
      'Architecture Next.js orientée performance',
      'Intégration Stripe (paiement, gestion des statuts)',
      'UI sobre + focus sur la lisibilité produit',
    ],
    stack: ['Next.js', 'Node.js', 'Stripe', 'Tailwind CSS'],
    outcomes: [
      "Parcours d'achat simplifié (moins de friction)",
      'Chargement rapide et navigation fluide',
      'Base prête pour itérer (marketing, contenus, promos)',
    ],
    seo: {
      title:
        'Dayness Cosmetics — Case study e-commerce (Next.js + Stripe) | Dylan Agboton',
      description:
        "Case study: création d'un e-commerce Dayness Cosmetics. Contexte, rôle, contraintes, solution Next.js/Stripe et résultats orientés conversion.",
      ogImage: '/images/dayness-cosmetics.png',
    },
  },
  {
    slug: 'dayness-institut',
    name: 'Dayness Institut',
    type: 'Plateforme de réservation',
    job: 'Développement Fullstack | Next.js, Node.js & API Google.',
    valueProposition:
      'Une réservation en ligne claire, avec disponibilité et organisation simplifiées.',
    image: '/images/dayness-institut.png',
    video: '/videos/dayness-institut.mov',
    role: [
      'Conception du parcours réservation',
      'Développement fullstack',
      'Intégration API Google',
    ],
    context: {
      sector: 'Institut / services',
      objective:
        'Permettre aux clients de réserver rapidement, tout en facilitant la gestion côté business.',
    },
    constraints: [
      'Parcours de réservation court et évident',
      'Synchronisation/calendrier fiable',
      'Limiter les erreurs et doubles réservations',
    ],
    solution: [
      'UI guidée: choix → créneau → confirmation',
      "Intégration d'API Google pour la gestion des événements",
      'Gestion des états et validations pour réduire les erreurs',
    ],
    stack: ['Next.js', 'Node.js', 'Google APIs', 'Tailwind CSS'],
    outcomes: [
      'Réservation plus rapide (moins d’allers-retours)',
      'Organisation simplifiée (disponibilités plus lisibles)',
      'Expérience client plus fluide et rassurante',
    ],
    seo: {
      title:
        'Dayness Institut — Case study plateforme de réservation | Dylan Agboton',
      description:
        "Case study: plateforme de réservation Dayness Institut. Contexte, rôle, contraintes, solution (Next.js + API Google) et résultats.",
      ogImage: '/images/dayness-institut.png',
    },
  },
  {
    slug: 'ridenow',
    name: 'RideNow',
    type: 'Landing Page',
    job: 'Développement Front-end | HTML & Tailwind CSS.',
    valueProposition:
      'Une landing page nette, orientée message et conversion, ultra lisible sur mobile.',
    image: '/images/ridenow.png',
    role: ['Intégration UI', 'Responsive', 'Optimisation du rendu'],
    context: {
      sector: 'Mobilité',
      objective:
        'Présenter une offre de façon claire et crédible avec un focus sur la conversion.',
    },
    constraints: ['Hiérarchie claire', 'Responsive strict', 'Temps de chargement'],
    solution: [
      'Mise en page orientée “scan” (titres, sections, preuves)',
      'Composants Tailwind réutilisables et cohérents',
      'Optimisation des médias et des espacements',
    ],
    stack: ['HTML', 'Tailwind CSS'],
    outcomes: [
      'Message plus clair (moins de confusion)',
      'Meilleure lisibilité mobile',
      'Base solide pour itérer sur la conversion',
    ],
    seo: {
      title: 'RideNow — Case study landing page | Dylan Agboton',
      description:
        "Case study: landing page RideNow. Contexte, rôle, contraintes, solution front-end et résultats orientés conversion.",
      ogImage: '/images/ridenow.png',
    },
  },
];

// Backward-compatible export (existing code imports `project`)
export const project = projects;

export const getAllProjectSlugs = () => projects.map((p) => p.slug);

export const getProjectBySlug = (slug) =>
  projects.find((p) => p.slug === slug) ?? null;
