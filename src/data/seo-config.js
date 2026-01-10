export const seoConfig = {
  // GLOBAL
  site: {
    name: 'Dylan Agboton',
    url: 'https://dylan-agboton.com', // À remplacer par ton domaine réel
    defaultTitle:
      'Dylan Agboton | Développeur Fullstack & Intégrateur IA Freelance à Paris',
    defaultDescription:
      'Développeur Fullstack Next.js, Node.js et Intégrateur IA basé à Paris. Je crée des applications rapides et des automatisations IA pour booster la croissance des PME et startups.',
    defaultImage: '/images/me.webp', // Image OG par défaut
    locale: 'fr_FR',
    twitterHandle: '@dylanagboton', // À remplacer si tu as un compte
  },

  // KEYWORDS STRATEGY
  keywords: {
    primary: [
      'Développeur Next.js Freelance Paris',
      'Expert Intégrateur IA Paris',
      'Développeur Fullstack Paris',
    ],
    secondary: [
      'Freelance Next.js',
      'Intégrateur IA',
      'Développeur Node.js Paris',
      'Automatisation IA',
    ],
    longTail: [
      'Développeur web freelance spécialisé Next.js Paris',
      'Intégrateur IA pour PME Paris',
      'Expert Next.js freelance Ile-de-France',
    ],
  },

  // JSON-LD SCHEMAS (GEO CRITIQUE)
  schemas: {
    person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Dylan Agboton',
      jobTitle: 'Développeur Fullstack & Intégrateur IA',
      description:
        'Développeur Web freelance spécialisé Next.js, Node.js et intégration IA basé à Paris. J\'accompagne les PME et startups dans la création d\'applications performantes et l\'automatisation de processus via l\'IA.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Paris',
        addressRegion: 'Ile-de-France',
        postalCode: '75000',
        addressCountry: 'FR',
      },
      email: 'd.agboton.dev@gmail.com',
      url: 'https://dylan-agboton.com',
      sameAs: [
        'https://linkedin.com/in/dylanagboton',
        'https://github.com/dylanagboton',
        'https://twitter.com/dylanagboton',
      ],
      knowsAbout: [
        'Next.js',
        'React',
        'Node.js',
        'Intelligence Artificielle',
        'Intégration IA',
        'Développement Web',
        'Fullstack Development',
        'Automatisation',
      ],
      areaServed: {
        '@type': 'City',
        name: 'Paris',
      },
      priceRange: '€€',
    },
    professionalService: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Services de Développement Web & Intégration IA',
      provider: {
        '@type': 'Person',
        name: 'Dylan Agboton',
      },
      description:
        'Développement d\'applications web Next.js, Node.js et intégration d\'intelligence artificielle pour PME et startups basées à Paris et en Ile-de-France.',
      areaServed: {
        '@type': 'City',
        name: 'Paris',
      },
      serviceType: [
        'Développement Web',
        'Intégration IA',
        'Automatisation',
        'Développement Fullstack',
      ],
      offers: {
        '@type': 'Offer',
        priceRange: '€€',
      },
    },
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Dylan Agboton - Développeur Web Freelance',
      description:
        'Développeur Fullstack Next.js et Intégrateur IA basé à Paris. Je crée des applications rapides et des automatisations IA pour booster la croissance des PME et startups.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Paris',
        addressRegion: 'Ile-de-France',
        postalCode: '75000',
        addressCountry: 'FR',
      },
      priceRange: '€€',
      areaServed: [
        {
          '@type': 'City',
          name: 'Paris',
        },
        {
          '@type': 'City',
          name: 'Ile-de-France',
        },
      ],
    },
  },

  // OPEN GRAPH PAR PAGE
  pages: {
    home: {
      title:
        'Dylan Agboton | Développeur Next.js Freelance Paris & Intégrateur IA',
      description:
        'Développeur Fullstack Next.js, Node.js et Intégrateur IA basé à Paris. Applications rapides et automatisations IA pour PME et startups. Réponse sous 24h.',
      keywords: [
        'Développeur Next.js Freelance Paris',
        'Expert Intégrateur IA',
        'Freelance Fullstack Paris',
      ],
      image: '/images/me.webp',
      type: 'website',
    },
    // Ajouter autres pages futures : about, projects, contact, etc.
  },
};
