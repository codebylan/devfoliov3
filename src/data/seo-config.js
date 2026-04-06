const BASE_URL = 'https://dylan-agboton.com';
const AUTHOR_NAME = 'Dylan Agboton';
const TWITTER_HANDLE = '@codebylan';

// Île-de-France coverage — all 8 departments + key cities
const IDF_AREA_SERVED = [
  { '@type': 'City', name: 'Paris' },
  { '@type': 'City', name: 'Boulogne-Billancourt' },
  { '@type': 'City', name: 'Saint-Denis' },
  { '@type': 'City', name: 'Argenteuil' },
  { '@type': 'City', name: 'Montreuil' },
  { '@type': 'City', name: 'Versailles' },
  { '@type': 'City', name: 'Nanterre' },
  { '@type': 'City', name: 'Vitry-sur-Seine' },
  { '@type': 'City', name: 'Créteil' },
  { '@type': 'City', name: 'Colombes' },
  { '@type': 'City', name: 'Aubervilliers' },
  { '@type': 'City', name: 'Asnières-sur-Seine' },
  { '@type': 'City', name: 'Courbevoie' },
  { '@type': 'City', name: 'Metz-le-Comte' },
  { '@type': 'AdministrativeArea', name: 'Île-de-France' },
  { '@type': 'AdministrativeArea', name: 'Paris (75)' },
  { '@type': 'AdministrativeArea', name: 'Hauts-de-Seine (92)' },
  { '@type': 'AdministrativeArea', name: 'Seine-Saint-Denis (93)' },
  { '@type': 'AdministrativeArea', name: 'Val-de-Marne (94)' },
  { '@type': 'AdministrativeArea', name: 'Seine-et-Marne (77)' },
  { '@type': 'AdministrativeArea', name: 'Yvelines (78)' },
  { '@type': 'AdministrativeArea', name: 'Essonne (91)' },
  { '@type': 'AdministrativeArea', name: "Val-d'Oise (95)" },
  { '@type': 'Country', name: 'France' },
];

const offerCatalog = {
  '@type': 'OfferCatalog',
  name: 'Services Développement Web pour entreprises de services',
  itemListElement: [
    {
      '@type': 'Offer',
      name: 'Vitrine Pro',
      itemOffered: {
        '@type': 'Service',
        name: 'Site Vitrine Pro',
        description:
          "Création de site vitrine jusqu'à 5 pages, design responsive sur mesure, SEO technique + Core Web Vitals, CMS intégré pour édition autonome, formulaire de contact, formation 1h + hébergement Vercel.",
        areaServed: IDF_AREA_SERVED,
      },
      price: '2490',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: '2490',
        priceCurrency: 'EUR',
      },
    },
    {
      '@type': 'Offer',
      name: 'Site Business',
      itemOffered: {
        '@type': 'Service',
        name: 'Site Business',
        description:
          "Site jusqu'à 10 pages avec architecture évolutive, système de réservation ou espace membre, SEO avancé + Google My Business, intégration newsletter et outils marketing, audit performance offert M+1.",
        areaServed: IDF_AREA_SERVED,
      },
      price: '4490',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: '4490',
        priceCurrency: 'EUR',
      },
    },
    {
      '@type': 'Offer',
      name: 'Solution Sur Mesure',
      itemOffered: {
        '@type': 'Service',
        name: 'Solution Sur Mesure',
        description:
          'Architecture scalable Next.js + Supabase, authentification complète, paiement en ligne, dashboard admin sur mesure, fonctionnalités avancées, mise en ligne + 1 mois de maintenance offert.',
        areaServed: IDF_AREA_SERVED,
      },
      price: '5990',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: '5990',
        priceCurrency: 'EUR',
      },
    },
  ],
};

const personEntity = {
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: AUTHOR_NAME,
  givenName: 'Dylan',
  familyName: 'Agboton',
  jobTitle: 'Développeur web freelance Next.js',
  description:
    "Dylan Agboton est développeur web freelance spécialisé Next.js, basé en Île-de-France. Il conçoit des sites performants pour les entreprises de services (instituts de beauté, cabinets de santé, commerces, restaurants, consultants) qui veulent être visibles sur Google et convertir leurs visiteurs en clients.",
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
  areaServed: IDF_AREA_SERVED,
  sameAs: [
    'https://linkedin.com/in/dylanagboton',
    'https://github.com/dylanagboton',
    'https://twitter.com/codebylan',
    'https://malt.fr/profile/dylanagboton',
  ],
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Développement Web',
    'Site vitrine entreprise',
    'Site e-commerce',
    'Système de réservation en ligne',
    'SEO local',
    'Core Web Vitals',
    'Google My Business',
    'Supabase',
    'Vercel',
    'Stripe',
  ],
  workExample: [
    {
      '@type': 'CreativeWork',
      name: 'Dayness Institut — Plateforme de réservation',
      url: `${BASE_URL}/projets/dayness-institut`,
      description: "+50% de réservations en ligne après la refonte du système de réservation.",
    },
    {
      '@type': 'CreativeWork',
      name: 'Dayness Cosmetics — Boutique e-commerce',
      url: `${BASE_URL}/projets/dayness-cosmetics`,
      description: "+40% de taux de conversion après le lancement de la boutique en ligne.",
    },
    {
      '@type': 'CreativeWork',
      name: 'Maison Panthera — Site vitrine + espace de gestion',
      url: `${BASE_URL}/projets/maison-panthera`,
      description: "Site vitrine et back-office sur mesure livré en 3 semaines.",
    },
  ],
  hasOfferCatalog: offerCatalog,
};

export const seoConfig = {
  // GLOBAL
  site: {
    name: AUTHOR_NAME,
    url: BASE_URL,
    // < 60 chars ✓ (54 chars)
    defaultTitle: 'Dylan Agboton | Développeur Next.js — Paris & Île-de-France',
    // < 155 chars ✓ (143 chars)
    defaultDescription:
      'Sites web performants pour instituts, cabinets et commerces en Île-de-France. Visible sur Google, livré en 3 semaines. Devis gratuit sous 48h.',
    defaultImage: '/images/me.webp',
    locale: 'fr_FR',
    twitterHandle: TWITTER_HANDLE,
  },

  // KEYWORDS — local SEO Île-de-France + niche
  keywords: {
    primary: [
      'Développeur Next.js freelance Paris',
      'Création site web Île-de-France',
      'Développeur web institut de beauté Paris',
      'Site web entreprise de services Paris',
      'Création site web commerce Île-de-France',
    ],
    secondary: [
      'Développeur web freelance Île-de-France',
      'Site web cabinet de santé Paris',
      'Site vitrine restaurant Paris',
      'SEO local Paris Île-de-France',
      'Création site web artisan Paris',
      'Site web consultant Paris',
      'Développeur web salon de coiffure Paris',
    ],
    longTail: [
      'Développeur web freelance spécialisé Next.js Paris',
      'Créer site web institut de beauté Île-de-France',
      'Site web performant Google pour commerce Paris',
      'SEO local entreprise services Île-de-France',
      'Création site web avec réservation en ligne Paris',
      'Développeur Next.js freelance Hauts-de-Seine',
      'Site vitrine responsive PME Paris Île-de-France',
    ],
  },

  // JSON-LD SCHEMAS
  schemas: {
    person: {
      '@context': 'https://schema.org',
      ...personEntity,
    },

    // ProfilePage — signal fort pour les LLMs (ChatGPT, Perplexity, Claude, Gemini)
    profilePage: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: 'Dylan Agboton — Développeur Next.js freelance | Paris & Île-de-France',
      url: BASE_URL,
      inLanguage: 'fr-FR',
      dateModified: new Date().toISOString().split('T')[0],
      description:
        'Dylan Agboton est développeur web freelance spécialisé Next.js à Paris. Il conçoit des sites performants pour les entreprises de services en Île-de-France : instituts, cabinets, commerces, consultants.',
      mainEntity: { '@id': `${BASE_URL}/#person` },
      about: { '@id': `${BASE_URL}/#person` },
      specialty: 'Sites web performants pour entreprises de services en Île-de-France',
    },

    // ProfessionalService — requêtes locales & métier
    professionalService: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${BASE_URL}/#service`,
      name: 'Dylan Agboton — Développement Web Île-de-France',
      url: BASE_URL,
      provider: { '@id': `${BASE_URL}/#person` },
      description:
        'Création de sites web performants pour les entreprises de services en Île-de-France : instituts de beauté, cabinets de santé, commerces, restaurants, consultants. SEO local inclus.',
      areaServed: IDF_AREA_SERVED,
      serviceType: [
        'Création de site vitrine',
        'Site e-commerce',
        'Système de réservation en ligne',
        'SEO local',
        'Site web sur mesure',
        'Développement Next.js',
      ],
      hasOfferCatalog: offerCatalog,
      priceRange: '€€',
      availableLanguage: [{ '@type': 'Language', name: 'French' }],
    },

    // LocalBusiness — référencement local Google
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${BASE_URL}/#localbusiness`,
      name: 'Dylan Agboton — Développeur Web Freelance Paris',
      url: BASE_URL,
      image: `${BASE_URL}/images/me.webp`,
      logo: `${BASE_URL}/images/logo.svg`,
      description:
        'Développeur web freelance Next.js basé à Paris. Création de sites performants pour entreprises de services en Île-de-France : instituts, cabinets, commerces, consultants.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '',
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
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      priceRange: '€€',
      currenciesAccepted: 'EUR',
      paymentAccepted: 'Virement bancaire, Carte bancaire',
      areaServed: IDF_AREA_SERVED,
      sameAs: personEntity.sameAs,
      hasOfferCatalog: offerCatalog,
      knowsAbout: personEntity.knowsAbout,
    },
  },

  // METADATA PAR PAGE
  pages: {
    home: {
      // 54 chars ✓
      title: 'Dylan Agboton | Développeur Next.js — Paris & Île-de-France',
      // 143 chars ✓
      description:
        'Sites web performants pour instituts, cabinets et commerces en Île-de-France. Visible sur Google, livré en 3 semaines. Devis gratuit sous 48h.',
      keywords: [
        'Développeur Next.js freelance Paris',
        'Création site web Île-de-France',
        'Site web entreprise de services Paris',
        'SEO local Paris',
        'Développeur web institut de beauté Paris',
        'Site web performant Google',
      ],
      image: '/images/me.webp',
      type: 'website',
    },
  },
};
