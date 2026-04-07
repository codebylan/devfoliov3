export const projects = [
  {
    slug: 'lymphe-360-agency',
    name: 'Lymphe 360 Agency',
    type: 'Site vitrine + Lead generation',
    job: 'Conception & développement sur-mesure',
    result:
      'Site de qualification de leads livré, opérationnel avec tunnel complet',
    valueProposition: `Un site qui capte, qualifie et convertit des praticiens de santé en leads qualifiés du diagnostic interactif jusqu'à la prise de contact pré-remplie, avec 
  notification email automatique à l'agence.`,
    image: undefined,
    video: '/videos/lymphe-agency.mp4',
    role: [
      "Conception de l'architecture Next.js (App Router, API routes)",
      "Tunnel de qualification : diagnostic interactif 4 étapes → recommandation d'offre → formulaire pré-rempli",
      "Développement du système d'envoi de leads par email (Resend, double notification)",
      'Mise en place de la validation stricte côté client et serveur + rate limiting',
      'Intégration des animations Framer Motion et du scroll fluide Lenis',
    ],
    context: {
      sector: "Accompagnement à l'installation libérale (santé)",
      objective: `Donner à l'agence Lymphe un site qui présente sa méthode et ses offres, puis qualifie automatiquement les praticiens de santé souhaitant s'installer — en 
  leur recommandant la bonne offre et en transmettant un lead complet à l'équipe.`,
    },
    constraints: [
      'Conformité RGPD stricte (consentement explicite, politique de confidentialité, mentions légales)',
      'Validation robuste des données : email, téléphone français, champs requis côté client et serveur',
      'Performance et fluidité des animations sur mobile sans dégradation',
      "Rate limiting pour protéger l'API de soumission de leads",
    ],
    solution: [
      "Diagnostic interactif en 4 étapes avec logique de recommandation d'offre (Ancrage / Équilibre / Présence)",
      'Formulaire de contact pré-rempli via URL params, validé côté client et serveur (Zod)',
      "Double envoi email via Resend : notification interne à l'agence + confirmation au prospect",
      "Animations Framer Motion sur chaque section avec preloader d'entrée et scroll Lenis",
    ],
    stack: [
      'Next.js 16 (App Router)',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Framer Motion',
      'Lenis (smooth scroll)',
      'shadcn/ui',
      'Resend (emails transactionnels)',
      'Zod (validation)',
      'Vitest (tests unitaires)',
    ],
    outcomes: [
      'Tunnel complet : du diagnostic à la prise de contact, sans friction',
      "Leads enrichis transmis automatiquement à l'équipe dès la soumission",
      'Architecture claire et testée (validation, parsing URL, orchestration email)',
      'Base solide et extensible pour intégrer un CRM ou un espace client (Convex prêt)',
    ],
    seo: {
      title:
        'Lymphe 360 Agency — Site vitrine & lead generation (Next.js) | Dylan Agboton',
      description:
        "Case study : site de qualification de leads pour une agence d'accompagnement à l'installation libérale. Diagnostic interactif, recommandation d'offre, formulaire pré-rempli et double notification email.",
      ogImage: null,
    },
  },
  {
    slug: 'maison-panthera',
    name: 'Maison Panthera',
    type: 'Site vitrine + Espace de gestion',
    job: 'Conception & développement sur-mesure',
    result: 'Espace de gestion sur mesure livré en 3 semaines',
    valueProposition: `Un site complet pour présenter les talents de l'agence, recevoir des candidatures en ligne et gérer tous les dossiers depuis un espace privé.`,
    image: undefined,
    video: '/videos/maison-panthera.mp4',
    role: [
      'Définition du projet et des parcours utilisateurs',
      `Création du site public et de l'espace de gestion`,
      `Mise en place d'un accès sécurisé pour les agents`,
      'Formulaire de candidature complet (infos, photos, vidéo et consentements)',
    ],
    context: {
      sector: 'Agence de mannequins & talents',
      objective: `Donner à l'agence un site professionnel pour présenter ses talents et recevoir des candidatures complètes, avec un espace privé pour que les agents gèrent les profils et les dossiers au quotidien.`,
    },
    constraints: [
      'Protection des données personnelles et des médias sensibles des candidats',
      `Plusieurs niveaux d'accès (agent, administrateur, talent)`,
      'Gestion des books photo/vidéo avec un ordre précis et différents formats',
    ],
    solution: [
      'Site public pour découvrir les talents, consulter leurs fiches et postuler',
      'Espace privé sécurisé pour gérer les profils, les médias et les candidatures',
      'Système de connexion robuste avec des accès adaptés à chaque rôle',
    ],
    stack: [
      'Next.js',
      'React',
      'Convex',
      'Better Auth',
      'PostgreSQL (Neon) / SQLite',
      'Tailwind CSS v4',
      'Shadcn / Base UI',
      '@dnd-kit (tri médias)',
    ],
    outcomes: [
      `Tableau de bord clair : talents, candidatures et activité récente en un coup d'œil`,
      'Vitrine publique avec fiches détaillées et prise de contact directe',
      'Candidature guidée étape par étape (identité, mensurations, photos, consentements)',
      'Une base solide, prête à accueillir de nouvelles fonctionnalités (statistiques, etc.)',
    ],
    seo: {
      title:
        'Maison Panthera — Case study agence mannequins (Next.js + Convex) | Dylan Agboton',
      description:
        'Case study : site et back-office pour une agence de talents. Roster, candidature scouting avec médias, administration des profils et des dossiers.',
      ogImage: null,
    },
  },
  {
    slug: 'LRD-vous-assiste',
    name: 'LRD Vous Assiste',
    type: 'Outil métier en ligne',
    job: 'Conception & développement sur-mesure',
    result: 'Processus métier digitalisé de A à Z',
    valueProposition:
      'Un outil tout-en-un pour les assistantes : gestion des clients, des tâches, des documents et un espace dédié pour chaque client.',
    image: undefined,
    video: '/videos/lrd-vous-assistes.mp4',
    role: [
      'Définition des besoins et du parcours utilisateur',
      `Développement de l'application complète`,
      'Création des comptes sécurisés (assistantes et clients)',
      'Mise en place des notifications par e-mail',
    ],
    context: {
      sector: 'Assistance administrative',
      objective:
        'Offrir aux assistantes un seul outil pour suivre leurs clients, organiser leurs tâches et échanger des documents, avec un espace privé pour chaque client.',
    },
    constraints: [
      'Plusieurs utilisateurs avec des accès différents',
      'Documents sensibles nécessitant un suivi précis',
      'Invitation des clients avec un premier accès simple et sécurisé',
    ],
    solution: [
      'Tableau de bord pour piloter clients, tâches et documents',
      'Accès sécurisés avec des droits adaptés à chaque profil',
      'Espace client dédié pour se connecter et déposer des documents',
    ],
    stack: [
      'Next.js',
      'Supabase',
      'Resend',
      'Tailwind CSS',
      'React Hook Form',
      'Zod',
    ],
    outcomes: [
      'Tout au même endroit : tâches urgentes, clients actifs et activité récente',
      'Invitation client en quelques clics avec accès sécurisé',
      'Application prête à évoluer (suivi du temps, rappels, etc.)',
    ],
    seo: {
      title:
        'LRD Vous Assiste — Case study back-office assistantes (Next.js + Supabase) | Dylan Agboton',
      description:
        'Case study : outil métier pour assistantes. Gestion clients, tâches, documents et espace client.',
      ogImage: null,
    },
  },
  {
    slug: 'dayness-institut',
    name: 'Dayness Institut',
    type: 'Plateforme de réservation',
    job: 'Conception & développement du système de réservation',
    result: '+50% de réservations en ligne',
    valueProposition: `Un système de réservation en ligne simple et clair, autant pour les clients que pour l'équipe.`,
    image: '/images/dayness-institut.png',
    video: '/videos/dayness-institut.mp4',
    role: [
      'Conception du parcours de réservation',
      'Développement complet de la plateforme',
      `Synchronisation avec l'agenda Google`,
    ],
    context: {
      sector: 'Institut / services',
      objective: `Permettre aux clients de réserver en quelques clics, tout en simplifiant l'organisation au quotidien.`,
    },
    constraints: [
      'Réservation rapide et intuitive en quelques étapes',
      'Calendrier toujours à jour et fiable',
      'Éviter les doublons et les erreurs de réservation',
    ],
    solution: [
      'Parcours guidé : choix de la prestation, créneau disponible, confirmation',
      `Synchronisation automatique avec l'agenda pour éviter les conflits`,
      'Vérifications intégrées pour garantir des réservations sans erreur',
    ],
    stack: ['Next.js', 'Node.js', 'Google APIs', 'Tailwind CSS'],
    outcomes: [
      'Réservation plus rapide, sans allers-retours inutiles',
      'Planning clair et disponibilités visibles en temps réel',
      'Expérience client fluide et rassurante du début à la fin',
    ],
    seo: {
      title:
        'Dayness Institut — Case study plateforme de réservation | Dylan Agboton',
      description:
        'Case study: plateforme de réservation Dayness Institut. Contexte, rôle, contraintes, solution (Next.js + API Google) et résultats.',
      ogImage: '/images/dayness-institut.png',
    },
  },
  {
    slug: 'dayness-cosmetics',
    name: 'Dayness Cosmetics',
    type: 'E-commerce',
    job: 'Conception & développement de la boutique en ligne',
    result: '+40% de taux de conversion',
    valueProposition:
      'Une boutique en ligne rapide, fiable et pensée pour vendre efficacement, surtout sur mobile.',
    image: '/images/dayness-cosmetics.png',
    video: '/videos/dayness-cosmetics.mp4',
    role: [
      'Définition du projet',
      'Développement complet',
      'Mise en place du paiement en ligne',
    ],
    context: {
      sector: 'Cosmétiques',
      objective:
        "Lancer une boutique en ligne performante avec un parcours d'achat simple et rassurant.",
    },
    constraints: [
      `Expérience pensée d'abord pour le mobile`,
      'Paiement en ligne sécurisé et fiable',
      'Catalogue lisible et navigation intuitive',
    ],
    solution: [
      'Site conçu pour se charger rapidement et rester fluide',
      'Paiement intégré avec suivi des commandes en temps réel',
      'Design épuré centré sur la mise en valeur des produits',
    ],
    stack: ['Next.js', 'Node.js', 'Stripe', 'Tailwind CSS'],
    outcomes: [
      "Parcours d'achat simplifié : moins d'étapes, plus de ventes",
      'Pages rapides et navigation fluide sur tous les écrans',
      'Site prêt à évoluer (promotions, contenus, campagnes marketing)',
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
    slug: 'ridenow',
    name: 'RideNow',
    type: 'Page de présentation',
    job: 'Design & intégration de la page',
    valueProposition: `Une page d'accueil percutante, pensée pour convaincre et parfaitement lisible sur mobile.`,
    image: '/images/ridenow.png',
    role: [
      'Mise en page et design',
      'Adaptation mobile',
      'Optimisation de la vitesse',
    ],
    context: {
      sector: 'Mobilité',
      objective: `Présenter l'offre de façon claire et crédible pour transformer les visiteurs en clients.`,
    },
    constraints: [
      'Message clair et hiérarchie visuelle évidente',
      'Parfaitement lisible sur mobile et tablette',
      'Chargement rapide de la page',
    ],
    solution: [
      'Mise en page structurée pour une lecture rapide (titres, sections, preuves sociales)',
      `Design cohérent et soigné sur tous les formats d'écran`,
      'Images et contenus optimisés pour un affichage instantané',
    ],
    stack: ['HTML', 'Tailwind CSS'],
    outcomes: [
      'Un message limpide qui se comprend en quelques secondes',
      'Lecture agréable sur mobile comme sur ordinateur',
      'Page prête à être améliorée au fil des retours (tests, ajustements)',
    ],
    seo: {
      title: 'RideNow — Case study landing page | Dylan Agboton',
      description:
        'Case study: landing page RideNow. Contexte, rôle, contraintes, solution front-end et résultats orientés conversion.',
      ogImage: '/images/ridenow.png',
    },
  },
];

// Backward-compatible export (existing code imports `project`)
export const project = projects;

export const getAllProjectSlugs = () => projects.map((p) => p.slug);

export const getProjectBySlug = (slug) =>
  projects.find((p) => p.slug === slug) ?? null;
