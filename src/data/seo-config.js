const BASE_URL = 'https://dylan-agboton.com';
const AUTHOR_NAME = 'Dylan Agboton';
const TWITTER_HANDLE = '@codebylan';

// Reusable person identity — referenced across schemas
const personEntity = {
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: AUTHOR_NAME,
  jobTitle: 'Développeur Fullstack & Intégrateur IA',
  description:
    "Développeur web freelance spécialisé Next.js, Node.js et intégration IA basé à Paris. J'accompagne les PME et startups dans la création d'applications performantes et l'automatisation de processus via l'IA.",
  image: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/images/me.webp`,
    width: 800,
    height: 800,
  },
  url: BASE_URL,
  email: 'd.agboton.dev@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Paris',
    addressRegion: 'Île-de-France',
    postalCode: '75000',
    addressCountry: 'FR',
  },
  areaServed: [
    { '@type': 'City', name: 'Paris' },
    { '@type': 'State', name: 'Île-de-France' },
    { '@type': 'Country', name: 'France' },
  ],
  sameAs: [
    'https://linkedin.com/in/dylanagboton',
    'https://github.com/dylanagboton',
    'https://twitter.com/codebylan',
  ],
  knowsAbout: [
    'Next.js',
    'React',
    'Node.js',
    'TypeScript',
    'Intelligence Artificielle',
    'Intégration IA',
    'OpenAI API',
    'Développement Web',
    'Fullstack Development',
    'SaaS Development',
    'Automatisation',
    'Supabase',
    'PostgreSQL',
    'Stripe',
    'n8n',
    'Vercel',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services Développement Web & IA',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Site Vitrine Premium',
        itemOffered: {
          '@type': 'Service',
          name: 'Site Vitrine Premium',
          description:
            "Création de site vitrine ultra-rapide jusqu'à 5 pages, design moderne responsive, SEO on-page, zone d'édition autonome, formulaire de contact sécurisé.",
        },
        price: '1500',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '1500',
          priceCurrency: 'EUR',
        },
      },
      {
        '@type': 'Offer',
        name: 'Site Sur Mesure',
        itemOffered: {
          '@type': 'Service',
          name: 'Site Sur Mesure',
          description:
            "Site web ambitieux jusqu'à 10 pages : blog, espace membre, catalogue, intégration newsletter et outils marketing, SEO avancé Core Web Vitals.",
        },
        price: '2500',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '2500',
          priceCurrency: 'EUR',
        },
      },
      {
        '@type': 'Offer',
        name: 'Pack MVP / Lancement SaaS',
        itemOffered: {
          '@type': 'Service',
          name: 'Pack MVP / Lancement SaaS',
          description:
            'Développement complet MVP SaaS : authentification sécurisée, paiement en ligne Stripe, espace admin, base de données Supabase, architecture scalable.',
        },
        price: '3990',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '3990',
          priceCurrency: 'EUR',
        },
      },
      {
        '@type': 'Offer',
        name: 'Intégration IA & Automation',
        itemOffered: {
          '@type': 'Service',
          name: 'Intégration IA & Automation',
          description:
            "Audit IA, mise en place d'assistants IA (OpenAI, chatbots), automatisations n8n/Make, connexions inter-outils (CRM, emails, formulaires, reporting).",
        },
        price: '2500',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '2500',
          priceCurrency: 'EUR',
        },
      },
    ],
  },
};

export const seoConfig = {
  // GLOBAL
  site: {
    name: AUTHOR_NAME,
    url: BASE_URL,
    defaultTitle:
      'Dylan Agboton | Développeur Fullstack & Intégrateur IA Freelance à Paris',
    defaultDescription:
      'Développeur Fullstack Next.js, Node.js et Intégrateur IA basé à Paris. Création de SaaS, sites sur mesure et automatisations IA pour PME et startups. Réponse sous 24h.',
    defaultImage: '/images/me.webp',
    locale: 'fr_FR',
    twitterHandle: TWITTER_HANDLE,
  },

  // KEYWORDS
  keywords: {
    primary: [
      'Développeur Next.js Freelance Paris',
      'Expert Intégrateur IA Paris',
      'Développeur Fullstack Paris',
      'Créer SaaS freelance Paris',
      'Développeur MVP SaaS Paris',
    ],
    secondary: [
      'Freelance Next.js',
      'Intégrateur IA',
      'Développeur Node.js Paris',
      'Automatisation IA entreprise',
      'Création site web sur mesure Paris',
      'Développeur Supabase freelance',
      'Intégration OpenAI Paris',
    ],
    longTail: [
      'Développeur web freelance spécialisé Next.js Paris',
      'Intégrateur IA pour PME Paris',
      'Expert Next.js freelance Ile-de-France',
      'Créer application SaaS avec Next.js',
      'Automatiser processus entreprise avec IA Paris',
      'Développeur MVP startup Paris tarif',
      'Freelance React Node.js SaaS Ile-de-France',
    ],
  },

  // JSON-LD SCHEMAS
  schemas: {
    // Core person identity
    person: {
      '@context': 'https://schema.org',
      ...personEntity,
    },

    // ProfilePage — signal fort pour les LLMs (ChatGPT, Perplexity, Claude)
    profilePage: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: `${AUTHOR_NAME} — Développeur Fullstack & Intégrateur IA Freelance à Paris`,
      url: BASE_URL,
      inLanguage: 'fr-FR',
      description:
        "Page de profil de Dylan Agboton, développeur web freelance spécialisé en Next.js, Node.js et intégration d'IA à Paris.",
      mainEntity: { '@id': `${BASE_URL}/#person` },
      about: { '@id': `${BASE_URL}/#person` },
    },

    // ProfessionalService — pour les requêtes locales & métier
    professionalService: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Dylan Agboton — Développement Web & Intégration IA',
      url: BASE_URL,
      provider: { '@id': `${BASE_URL}/#person` },
      description:
        "Services de développement web Next.js, création de SaaS et intégration d'intelligence artificielle pour PME et startups. Basé à Paris, disponible en remote.",
      areaServed: [
        { '@type': 'City', name: 'Paris' },
        { '@type': 'State', name: 'Île-de-France' },
        { '@type': 'Country', name: 'France' },
      ],
      serviceType: [
        'Développement Web',
        'Création SaaS',
        'Intégration IA',
        'Automatisation',
        'Développement MVP',
        'Développement Fullstack',
      ],
      hasOfferCatalog: personEntity.hasOfferCatalog,
      priceRange: '€€',
    },

    // LocalBusiness — pour le référencement local Google
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Dylan Agboton — Développeur Web Freelance Paris',
      url: BASE_URL,
      image: `${BASE_URL}/images/me.webp`,
      description:
        'Développeur Fullstack Next.js et Intégrateur IA basé à Paris. Création de SaaS, sites sur mesure et automatisations IA pour PME et startups.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Paris',
        addressRegion: 'Île-de-France',
        postalCode: '75000',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 48.8566,
        longitude: 2.3522,
      },
      priceRange: '€€',
      areaServed: [
        { '@type': 'City', name: 'Paris' },
        { '@type': 'State', name: 'Île-de-France' },
        { '@type': 'Country', name: 'France' },
      ],
      sameAs: personEntity.sameAs,
    },
  },

  // METADATA PAR PAGE
  pages: {
    home: {
      title:
        'Dylan Agboton | Développeur Next.js Freelance Paris & Intégrateur IA',
      description:
        'Développeur Fullstack Next.js, Node.js et Intégrateur IA basé à Paris. SaaS, sites sur mesure et automatisations IA pour PME et startups. Réponse sous 24h.',
      keywords: [
        'Développeur Next.js Freelance Paris',
        'Expert Intégrateur IA Paris',
        'Freelance Fullstack Paris',
        'Créer SaaS Paris',
        'Développeur MVP startup Paris',
        'Automatisation IA PME',
      ],
      image: '/images/me.webp',
      type: 'website',
    },
  },
};
