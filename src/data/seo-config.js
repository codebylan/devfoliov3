const BASE_URL = 'https://dylan-agboton.com';
const AUTHOR_NAME = 'Dylan Agboton';
const TWITTER_HANDLE = '@codebylan';

// Reusable person identity — referenced across schemas
const personEntity = {
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: AUTHOR_NAME,
  jobTitle: 'Développeur Next.js',
  description:
    "Développeur web freelance spécialisé Next.js basé à Paris. Je conçois des sites performants pour les entreprises de services — instituts, cabinets, commerces — qui veulent être visibles sur Google et convertir en ligne.",
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
      'Dylan Agboton | Sites web performants pour entreprises de services | Développeur Next.js',
    defaultDescription:
      'Développeur web freelance spécialisé Next.js | Sites performants pour entreprises de services, instituts, commerces | Paris & Île-de-France',
    defaultImage: '/images/me.webp',
    locale: 'fr_FR',
    twitterHandle: TWITTER_HANDLE,
  },

  // KEYWORDS
  keywords: {
    primary: [
      'Développeur Next.js Freelance Paris',
      'Site web entreprise de services Paris',
      'Développeur web institut de beauté Paris',
      'Création site web commerce Paris',
      'Site web cabinet de santé Paris',
    ],
    secondary: [
      'Freelance Next.js',
      'Développeur web freelance Île-de-France',
      'Site vitrine entreprise locale Paris',
      'SEO local Paris',
      'Création site web sur mesure Paris',
      'Site web performant Google',
      'Développeur web artisan Paris',
    ],
    longTail: [
      'Développeur web freelance spécialisé Next.js Paris',
      'Site web pour institut de beauté Île-de-France',
      'Créer site web entreprise de services Paris',
      'SEO local entreprise services Paris',
      'Site vitrine performant Google PME Paris',
      'Développeur web freelance commerces Paris',
      'Freelance Next.js entreprises de services Île-de-France',
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
      name: `${AUTHOR_NAME} — Développeur Next.js | Sites performants pour entreprises de services`,
      url: BASE_URL,
      inLanguage: 'fr-FR',
      description:
        'Page de profil de Dylan Agboton, développeur web freelance spécialisé Next.js à Paris. Sites performants pour entreprises de services — instituts, cabinets, commerces.',
      mainEntity: { '@id': `${BASE_URL}/#person` },
      about: { '@id': `${BASE_URL}/#person` },
    },

    // ProfessionalService — pour les requêtes locales & métier
    professionalService: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Dylan Agboton — Développement Web pour entreprises de services',
      url: BASE_URL,
      provider: { '@id': `${BASE_URL}/#person` },
      description:
        'Sites web performants pour les entreprises de services — instituts, cabinets, commerces, consultants. Basé à Paris & Île-de-France, disponible en remote.',
      areaServed: [
        { '@type': 'City', name: 'Paris' },
        { '@type': 'State', name: 'Île-de-France' },
        { '@type': 'Country', name: 'France' },
      ],
      serviceType: [
        'Développement Web',
        'Création de site vitrine',
        'Site e-commerce',
        'Système de réservation',
        'SEO local',
        'Développement sur mesure',
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
        'Développeur web freelance spécialisé Next.js à Paris. Sites performants pour entreprises de services — instituts, cabinets, commerces, consultants.',
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
        'Dylan Agboton | Sites web performants pour entreprises de services | Développeur Next.js',
      description:
        'Développeur web freelance spécialisé Next.js | Sites performants pour entreprises de services, instituts, commerces | Paris & Île-de-France',
      keywords: [
        'Développeur Next.js Freelance Paris',
        'Site web entreprise de services Paris',
        'Développeur web institut de beauté',
        'Création site web commerce Paris',
        'SEO local Paris',
        'Site web performant Google',
      ],
      image: '/images/me.webp',
      type: 'website',
    },
  },
};
