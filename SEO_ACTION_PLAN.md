# 📊 PLAN D'ACTION SEO & GEO - DYLAN AGBOTON

## Objectif : 100/100 Lighthouse SEO + Dominance sur Google & Moteurs IA

---

## 🔴 PHASE 1 : AUDIT COMPLET & DIAGNOSTIC

### ❌ CRITIQUES (Blocage Score Lighthouse)

#### 1. **Métadonnées Incomplètes (`app/layout.jsx`)**

**Problème :**

- ❌ Metadata basique (title + description uniquement)
- ❌ **AUCUN Open Graph** (og:title, og:description, og:image, og:url, og:type)
- ❌ **AUCUN Twitter Card** (twitter:card, twitter:title, twitter:description, twitter:image)
- ❌ **AUCUNE Balise Canonical**
- ❌ **AUCUN Robots Meta** (noindex, nofollow manquants si besoin)
- ❌ **AUCUNE Meta Keywords** (utile pour GEO même si moins prioritaire pour Google)

**Impact :** -15 à -20 points Lighthouse SEO | Partage social cassé | GEO impossible

---

#### 2. **Structured Data (JSON-LD) ABSENT - CRITIQUE POUR GEO**

**Problème :**

- ❌ **AUCUN Schema.org JSON-LD** dans le codebase
- ❌ Pas de Schema `Person` (qui es-tu, tes compétences)
- ❌ Pas de Schema `ProfessionalService` (tes services Next.js/IA)
- ❌ Pas de Schema `LocalBusiness` (Paris !)
- ❌ Pas de Schema `Organization`
- ❌ Pas de Schema `BreadcrumbList` pour navigation

**Impact :** -25 à -30 points SEO | **Perplexity/ChatGPT ne te trouveront JAMAIS** | Pas de rich snippets Google

**Pourquoi c'est CRITIQUE pour GEO :**
Les moteurs IA (Perplexity, ChatGPT, Gemini) utilisent massivement JSON-LD pour comprendre le contexte. Sans ça, tu es invisible.

---

#### 3. **Structure Sémantique H1/H2 Sous-Optimisée**

**Actuel (`Hero.jsx` ligne 9) :**

```jsx
<h1>
  Concrétisez vos ambitions numériques avec un développeur qui parle votre
  langue.
</h1>
```

**Problèmes :**

- ❌ **AUCUNE mention de "Paris"** (local SEO = 0)
- ❌ **AUCUNE mention de "Freelance"** dans H1
- ❌ Keywords cibles absents : "Développeur Next.js Freelance Paris", "Expert Intégrateur IA"
- ⚠️ H2 non hiérarchisés (tous au même niveau, pas de structure logique)

**Impact :** -10 points SEO | Rank impossible sur "Freelance Paris"

---

#### 4. **Fichiers Techniques Manquants**

- ❌ **AUCUN `robots.txt`** (`/public/robots.txt`)
- ❌ **AUCUN `sitemap.xml`** (ou `sitemap.xml` généré dynamiquement)
- ⚠️ Favicon présent mais non optimisé pour tous les devices (apple-touch-icon manquant)

**Impact :** -5 points SEO | Indexation Google ralentie

---

#### 5. **Images : Alt Tags Présents mais Optimisables**

**Bon :** Tous les `<Image>` ont des `alt` (✅ MyStack, FAQ, About, Projects, Header, Footer, ProblemAndSolution)

**À améliorer :**

- ❌ `alt="Mon arsenal technique"` → Pas descriptif pour le contexte SEO
- ❌ `alt="FAQ Illustration"` → Trop générique
- ✅ `alt="Dylan Agboton - Développeur Web Freelance"` → Bon mais manque "Paris"

**Impact :** -3 à -5 points SEO

---

#### 6. **Metadata Page-Specific Absente**

**Problème :**

- ❌ `app/page.jsx` n'exporte pas de `metadata` (dépend uniquement du layout global)
- ❌ Impossible d'avoir des meta différentes pour la homepage vs autres pages futures

**Impact :** Flexibilité SEO limitée pour pages futures

---

### ⚠️ MOYENNES (Performance & Best Practices)

#### 7. **Core Web Vitals Potentiels**

- ⚠️ Images externes (`cdn.jsdelivr.net`) → Vérifier preconnect
- ⚠️ Font loading → Déjà optimisé avec `next/font` mais vérifier FOUT
- ⚠️ Lazy loading images → `priority={false}` présent mais non systématique

---

#### 8. **Content Strategy : Local SEO Paris**

**Manque :**

- ❌ **AUCUNE mention explicite de "Paris"** dans le contenu visible
- ❌ Pas de coordonnées géolocalisées (adresse si applicable, zone de service)
- ❌ Pas de mention "Freelance Paris" dans Hero/About

**Impact :** Rank impossible sur requêtes "Développeur Next.js Paris", "Freelance Paris"

---

#### 9. **Links Internes & Navigation**

- ✅ Liens d'ancrage présents (`#about`, `#projects`, etc.)
- ⚠️ Header navigation pointe vers `#expertise` qui n'existe pas (section commentée)
- ❌ Pas de breadcrumbs structurés

---

### ✅ POSITIFS (Déjà Bien)

- ✅ `lang="fr"` sur `<html>` (ligne 29 layout.jsx)
- ✅ Structure sémantique avec `<main>`, `<section>`, `<header>`, `<footer>`
- ✅ Next.js 16.1.1 (App Router) → SEO-friendly par défaut
- ✅ Images optimisées avec `next/image`
- ✅ Alt tags présents sur toutes les images

---

## 🏗️ PHASE 2 : ARCHITECTURE CENTRALISÉE (Maintenabilité)

### 📁 Structure Proposée : `src/data/seo-config.js`

```javascript
// src/data/seo-config.js
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
        'Développeur Web freelance spécialisé Next.js, Node.js et intégration IA basé à Paris.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Paris',
        addressRegion: 'Ile-de-France',
        addressCountry: 'FR',
      },
      // À compléter : email, url, sameAs (LinkedIn, GitHub)
    },
    professionalService: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Services de Développement Web & Intégration IA',
      provider: {
        '@type': 'Person',
        name: 'Dylan Agboton',
      },
      areaServed: {
        '@type': 'City',
        name: 'Paris',
      },
      serviceType: ['Développement Web', 'Intégration IA', 'Automatisation'],
    },
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Dylan Agboton - Développeur Web Freelance',
      description:
        'Développeur Fullstack Next.js et Intégrateur IA basé à Paris.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Paris',
        addressRegion: 'Ile-de-France',
        addressCountry: 'FR',
      },
      // À compléter : telephone, priceRange, etc.
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
```

**Avantages :**

- ✅ **Maintenabilité** : Tous les contenus SEO centralisés
- ✅ **Réutilisabilité** : Import dans `layout.jsx` et `page.jsx`
- ✅ **Scalabilité** : Facile d'ajouter des pages futures
- ✅ **GEO-Ready** : Schemas JSON-LD prêts pour Perplexity/ChatGPT

---

## 🔧 PHASE 3 : PLAN D'IMPLÉMENTATION TECHNIQUE

### ✅ ÉTAPE 1 : Créer `src/data/seo-config.js`

**Action :**

- Créer le fichier avec la structure ci-dessus
- Remplir toutes les valeurs manquantes (URL réelle, Twitter, email, etc.)

**Fichier :** `src/data/seo-config.js`

---

### ✅ ÉTAPE 2 : Enrichir `app/layout.jsx` avec Metadata API Next.js

**Changements :**

1. Importer `seoConfig` depuis `data/seo-config.js`
2. Remplacer l'objet `metadata` actuel par un objet complet incluant :
   - `metadata.manifest`
   - `metadata.openGraph` (title, description, url, siteName, images, locale, type)
   - `metadata.twitter` (card, title, description, images, creator)
   - `metadata.robots` (index, follow, etc.)
   - `metadata.keywords`
   - `metadata.authors`
   - `metadata.creator`
   - `metadata.publisher`

**Exemple de structure :**

```javascript
export const metadata = {
  metadataBase: new URL(seoConfig.site.url),
  title: {
    default: seoConfig.site.defaultTitle,
    template: `%s | ${seoConfig.site.name}`,
  },
  description: seoConfig.site.defaultDescription,
  keywords: seoConfig.keywords.primary.concat(seoConfig.keywords.secondary),
  authors: [{ name: seoConfig.site.name }],
  creator: seoConfig.site.name,
  openGraph: {
    type: 'website',
    locale: seoConfig.site.locale,
    url: seoConfig.site.url,
    siteName: seoConfig.site.name,
    title: seoConfig.site.defaultTitle,
    description: seoConfig.site.defaultDescription,
    images: [
      {
        url: seoConfig.site.defaultImage,
        width: 1200,
        height: 630,
        alt: seoConfig.site.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.site.defaultTitle,
    description: seoConfig.site.defaultDescription,
    images: [seoConfig.site.defaultImage],
    creator: seoConfig.site.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

**Fichier à modifier :** `src/app/layout.jsx`

---

### ✅ ÉTAPE 3 : Ajouter JSON-LD dans `app/layout.jsx` (GEO CRITIQUE)

**Action :**
Injecter les schemas JSON-LD dans le `<head>` via un composant ou directement dans le layout.

**Option 1 : Composant dédié `components/seo/StructuredData.jsx`**

```javascript
// components/seo/StructuredData.jsx
import { seoConfig } from '@/data/seo-config';

export default function StructuredData() {
  const schemas = [
    seoConfig.schemas.person,
    seoConfig.schemas.professionalService,
    seoConfig.schemas.localBusiness,
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
```

**Option 2 : Directement dans `layout.jsx`**
Injecter dans le `<head>` via Next.js Metadata API (mais JSON-LD nécessite un script tag, donc composant client-side ou `next/head` si App Router le permet).

**Recommandation :** Utiliser un composant `StructuredData` importé dans `layout.jsx` et render dans le body (JSON-LD fonctionne même dans le body selon Google).

**Fichiers à créer/modifier :**

- `src/components/seo/StructuredData.jsx` (nouveau)
- `src/app/layout.jsx` (modifier pour importer StructuredData)

---

### ✅ ÉTAPE 4 : Optimiser H1 dans `components/sections/Hero.jsx`

**Changement :**
Remplacer le H1 actuel par :

```jsx
<h1 className="max-w-4xl lg:text-6xl text-3xl mb-5">
  Développeur Next.js Freelance à Paris &{' '}
  <span className="italic text-[#C3C1BA]">
    Intégrateur IA pour PME et Startups.
  </span>
</h1>
```

**Justification :**

- ✅ Contient "Freelance" (keyword primaire)
- ✅ Contient "Paris" (local SEO)
- ✅ Contient "Next.js" (keyword technique)
- ✅ Contient "Intégrateur IA" (keyword secondaire)
- ✅ Contient "PME et Startups" (cible business)

**Fichier à modifier :** `src/components/sections/Hero.jsx`

---

### ✅ ÉTAPE 5 : Optimiser H2 Hierarchy

**Stratégie :**

- **H2 Principal** : "Expertise en Développement Next.js & Intégration IA" (section MyStack)
- **H2 Secondaires** : Garder les H2 actuels mais ajouter des keywords naturels
  - "Solutions pour PME et Startups" (ProblemAndSolution)
  - "Réalisations Web & Applications" (Projects)
  - "Tarifs Transparents pour Freelance Paris" (Prices) - À ajouter keyword
  - "À Propos : Développeur Fullstack Paris" (About) - À optimiser

**Fichiers à modifier :**

- `src/components/sections/MyStack.jsx`
- `src/components/sections/ProblemAndSolution.jsx`
- `src/components/sections/Projects.jsx`
- `src/components/sections/Prices.jsx`
- `src/components/sections/About.jsx`

---

### ✅ ÉTAPE 6 : Ajouter Metadata Page-Specific dans `app/page.jsx`

**Action :**
Export metadata depuis `page.jsx` pour override les valeurs du layout si besoin.

```javascript
import { seoConfig } from '@/data/seo-config';

export const metadata = {
  title: seoConfig.pages.home.title,
  description: seoConfig.pages.home.description,
  keywords: seoConfig.pages.home.keywords,
  openGraph: {
    ...seoConfig.site.openGraph, // Hérite du layout mais peut override
    title: seoConfig.pages.home.title,
    description: seoConfig.pages.home.description,
  },
};
```

**Fichier à modifier :** `src/app/page.jsx`

---

### ✅ ÉTAPE 7 : Créer `public/robots.txt`

**Contenu :**

```
User-agent: *
Allow: /

Sitemap: https://dylan-agboton.com/sitemap.xml
```

**Note :** Si tu utilises Vercel, tu peux aussi générer `robots.txt` dynamiquement via `app/robots.ts` (Next.js 13+).

**Fichier à créer :** `public/robots.txt` OU `app/robots.ts` (recommandé pour App Router)

---

### ✅ ÉTAPE 8 : Créer `app/sitemap.ts` (Génération Dynamique)

**Action :**
Créer un fichier `sitemap.ts` dans `app/` pour générer le sitemap automatiquement.

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { seoConfig } from '@/data/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seoConfig.site.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Ajouter autres pages futures ici
  ];
}
```

**Fichier à créer :** `app/sitemap.ts` (ou `.js` si pas TypeScript)

---

### ✅ ÉTAPE 9 : Optimiser Alt Tags Images

**Changements :**

- `alt="Mon arsenal technique"` → `alt="Stack technique Dylan Agboton - Next.js, React, Node.js, IA"`
- `alt="FAQ Illustration"` → `alt="FAQ Développeur Freelance Paris - Questions fréquentes"`
- `alt="Dylan Agboton - Développeur Web Freelance"` → `alt="Dylan Agboton - Développeur Fullstack Next.js & Intégrateur IA Freelance à Paris"`
- Images projets : Ajouter contexte "Projet réalisé par Dylan Agboton - [Nom Projet]"

**Fichiers à modifier :**

- `src/components/sections/MyStack.jsx`
- `src/components/sections/FAQ.jsx`
- `src/components/sections/About.jsx`
- `src/components/sections/Projects.jsx`

---

### ✅ ÉTAPE 10 : Ajouter "Paris" dans le Contenu Visible

**Stratégie :**

- **Hero :** Déjà fait avec nouveau H1 (étape 4)
- **About :** Ajouter "basé à Paris" dans le premier paragraphe
- **Footer :** Ajouter "Freelance à Paris" dans la description
- **CTA :** Mentionner "Disponible pour projets Paris & Ile-de-France"

**Fichiers à modifier :**

- `src/components/sections/About.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/sections/CTA.jsx`

---

### ✅ ÉTAPE 11 : Corriger Navigation Header

**Problème :** Lien `#expertise` pointe vers une section commentée.

**Action :**

- Option 1 : Décommenter la section Expertise si elle existe
- Option 2 : Changer le lien vers `#mystack` (qui existe)

**Fichier à modifier :** `src/components/layout/Header.jsx`

---

### ✅ ÉTAPE 12 : Ajouter Favicon & Apple Touch Icons

**Action :**
Créer/optimiser :

- `app/icon.png` (512x512 pour App Router Next.js 13+)
- `app/apple-icon.png` (180x180)
- `app/favicon.ico` (déjà présent mais vérifier)

Next.js 13+ App Router détecte automatiquement `icon.png` et `apple-icon.png` dans `app/`.

**Fichiers à créer/modifier :**

- `app/icon.png`
- `app/apple-icon.png`

---

### ✅ ÉTAPE 13 : Performance - Preconnect External Domains

**Action :**
Ajouter `<link rel="preconnect">` pour `cdn.jsdelivr.net` dans `layout.jsx`.

```javascript
// Dans layout.jsx, ajouter dans le <head> via metadata ou composant
<link
  rel="preconnect"
  href="https://cdn.jsdelivr.net"
  crossOrigin="anonymous"
/>
```

**Note :** Next.js Metadata API ne supporte pas directement preconnect. Utiliser `next/head` ou injecter via composant.

**Fichier à modifier :** `src/app/layout.jsx`

---

### ✅ ÉTAPE 14 : Ajouter Canonical URL

**Action :**
Ajouter canonical dans metadata de chaque page.

```javascript
// Dans layout.jsx metadata
alternates: {
  canonical: seoConfig.site.url,
},
```

**Fichiers à modifier :**

- `src/app/layout.jsx`
- `src/app/page.jsx` (pour homepage spécifique)

---

## 🎯 STRATÉGIE CONTENU SEO (H1/H2 Optimisés)

### 📝 H1 OPTIMISÉ (Hero.jsx)

```
Développeur Next.js Freelance à Paris & Intégrateur IA pour PME et Startups.
```

**Keywords ciblés :**

- "Développeur Next.js Freelance Paris" ✅
- "Intégrateur IA" ✅
- "PME et Startups" (long-tail business)

---

### 📝 H2 HIERARCHIE PROPOSÉE

1. **H2 Principal** (MyStack.jsx) :

   ```
   Mon arsenal technique : Next.js, Node.js & Intégration IA
   ```

   → Contient keywords techniques

2. **H2** (ProblemAndSolution.jsx) :

   ```
   Solutions Développement Web & Automatisation IA pour PME Paris
   ```

   → Ajouter "Paris" et keywords business

3. **H2** (Projects.jsx) :

   ```
   Réalisations : Applications Next.js & Intégrations IA
   ```

   → Contient keywords techniques

4. **H2** (About.jsx) :

   ```
   À Propos : Développeur Fullstack Next.js Freelance Paris
   ```

   → Optimisé local SEO

5. **H2** (Prices.jsx) :

   ```
   Tarifs Transparents : Développement Web & Intégration IA
   ```

   → Keywords services

6. **H2** (FAQ.jsx) :

   ```
   FAQ Développeur Freelance Paris : Vos Questions, Mes Réponses
   ```

   → Local SEO + keywords

7. **H2** (CTA.jsx) :
   ```
   Discutons de Votre Projet : Freelance Next.js Paris
   ```
   → CTA optimisé keywords

---

## 🤖 STRATÉGIE GEO (Generative Engine Optimization)

### 🎯 POURQUOI JSON-LD EST CRITIQUE

Les moteurs IA (Perplexity, ChatGPT, Gemini, Claude) utilisent massivement Schema.org JSON-LD pour :

1. **Comprendre le contexte** : Qui es-tu, où es-tu, quels services
2. **Extraire des informations structurées** : Compétences, localisation, tarifs
3. **Répondre aux requêtes utilisateurs** : "Qui est un bon développeur Next.js à Paris ?"

**Sans JSON-LD = Invisible pour les IA.**

---

### ✅ IMPLÉMENTATION JSON-LD RECOMMANDÉE

**Schemas à implémenter (par ordre de priorité) :**

1. **`Person` Schema** (PRIORITÉ 1)

   - Nom, jobTitle, description
   - Address (Paris, Ile-de-France)
   - Skills (Next.js, Node.js, IA)
   - SameAs (LinkedIn, GitHub, Twitter)

2. **`ProfessionalService` Schema** (PRIORITÉ 1)

   - ServiceType : ["Développement Web", "Intégration IA"]
   - AreaServed : Paris
   - Provider : Référence vers Person

3. **`LocalBusiness` Schema** (PRIORITÉ 2)

   - Name, description
   - Address (Paris)
   - ServiceArea (Paris, Ile-de-France)

4. **`Organization` Schema** (PRIORITÉ 2)

   - Si tu as une entreprise/auto-entreprise

5. **`BreadcrumbList` Schema** (PRIORITÉ 3)

   - Navigation structurée

6. **`FAQPage` Schema** (PRIORITÉ 3)
   - Pour la section FAQ (rich snippet Google)

---

### 📊 EXEMPLE COMPLET SCHEMA PERSON (GEO-Optimized)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dylan Agboton",
  "jobTitle": "Développeur Fullstack & Intégrateur IA",
  "description": "Développeur Web freelance spécialisé Next.js, Node.js et intégration IA basé à Paris. J'accompagne les PME et startups dans la création d'applications performantes et l'automatisation de processus via l'IA.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Paris",
    "addressRegion": "Ile-de-France",
    "postalCode": "75000",
    "addressCountry": "FR"
  },
  "email": "contact@dylan-agboton.com",
  "url": "https://dylan-agboton.com",
  "sameAs": [
    "https://linkedin.com/in/dylanagboton",
    "https://github.com/dylanagboton",
    "https://twitter.com/dylanagboton"
  ],
  "knowsAbout": [
    "Next.js",
    "React",
    "Node.js",
    "Intelligence Artificielle",
    "Intégration IA",
    "Développement Web",
    "Fullstack Development",
    "Automatisation"
  ],
  "areaServed": {
    "@type": "City",
    "name": "Paris"
  },
  "priceRange": "€€",
  "telephone": "+33-X-XX-XX-XX-XX"
}
```

---

## 📈 CHECKLIST FINALE (Avant Déploiement)

### ✅ CRITIQUES (Doit être 100% complété)

- [ ] Metadata complète (OG + Twitter) dans `layout.jsx`
- [ ] JSON-LD Person Schema implémenté
- [ ] JSON-LD ProfessionalService Schema implémenté
- [ ] H1 optimisé avec "Freelance Paris"
- [ ] `robots.txt` créé
- [ ] `sitemap.xml` généré
- [ ] Alt tags optimisés avec keywords
- [ ] "Paris" mentionné dans contenu visible (Hero, About, Footer)

### ⚠️ IMPORTANTES (Recommandé pour 100/100)

- [ ] JSON-LD LocalBusiness Schema
- [ ] H2 optimisés avec keywords
- [ ] Canonical URL ajoutée
- [ ] Favicon & Apple Touch Icons optimisés
- [ ] Preconnect pour domaines externes
- [ ] Metadata page-specific dans `page.jsx`
- [ ] Navigation Header corrigée (`#expertise` → `#mystack`)

### 📊 OPTIONNELLES (Bonus pour dominance)

- [ ] JSON-LD FAQPage Schema
- [ ] JSON-LD BreadcrumbList
- [ ] JSON-LD Organization (si applicable)
- [ ] Blog/Articles pour content marketing SEO
- [ ] Page "À Propos" dédiée avec schema Person détaillé
- [ ] Page "Services" dédiée avec schema Service détaillé

---

## 🚀 ORDRE D'EXÉCUTION RECOMMANDÉ

1. **Jour 1 - Fondations :**

   - Créer `src/data/seo-config.js`
   - Enrichir `app/layout.jsx` metadata (OG + Twitter)
   - Créer `app/sitemap.ts` et `app/robots.ts`

2. **Jour 2 - GEO Critical :**

   - Implémenter JSON-LD Person + ProfessionalService + LocalBusiness
   - Créer composant `StructuredData.jsx`
   - Injecter dans `layout.jsx`

3. **Jour 3 - Contenu :**

   - Optimiser H1 (Hero.jsx)
   - Optimiser H2 (toutes sections)
   - Ajouter "Paris" dans contenu visible

4. **Jour 4 - Polish :**

   - Optimiser Alt tags
   - Ajouter Canonical
   - Corriger navigation
   - Favicon & Apple icons

5. **Jour 5 - Test & Validation :**
   - Tester avec [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Valider JSON-LD avec [Schema.org Validator](https://validator.schema.org/)
   - Lighthouse SEO audit (objectif 100/100)
   - Tester avec Perplexity/ChatGPT : "Trouve-moi un développeur Next.js à Paris"

---

## 📚 RESSOURCES & OUTILS

### Validation SEO

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Next.js Metadata Docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

### GEO Testing

- [Perplexity.ai](https://perplexity.ai) : Tester "Développeur Next.js Freelance Paris"
- [ChatGPT](https://chat.openai.com) : Tester la même requête
- [Google Bard](https://bard.google.com) : Vérifier visibilité

### Local SEO

- [Google Business Profile](https://www.google.com/business/) (si applicable)
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)

---

## 🎯 RÉSULTAT ATTENDU

### Avant (Actuel)

- ❌ Lighthouse SEO : ~70-80/100
- ❌ JSON-LD : 0 schema
- ❌ Open Graph : Absent
- ❌ Local SEO : 0 (pas de "Paris")
- ❌ GEO : Invisible pour Perplexity/ChatGPT

### Après (Objectif)

- ✅ Lighthouse SEO : **100/100**
- ✅ JSON-LD : 3+ schemas (Person, ProfessionalService, LocalBusiness)
- ✅ Open Graph : Complet (title, description, image, url, type)
- ✅ Local SEO : Optimisé ("Paris" dans H1, H2, contenu, schema)
- ✅ GEO : **Visible sur Perplexity/ChatGPT** pour requêtes "Développeur Next.js Paris"

---

## 🔥 PROCHAINES ÉTAPES APRÈS IMPLÉMENTATION

1. **Soumettre Sitemap à Google Search Console**
2. **Soumettre à Bing Webmaster Tools**
3. **Vérifier indexation** (site:dylan-agboton.com)
4. **Monitorer Core Web Vitals** (Google Search Console)
5. **Tester requêtes GEO** régulièrement sur Perplexity/ChatGPT
6. **Analytics** : Suivre trafic organique + conversions
7. **Content Marketing** : Blog posts sur "Développement Next.js", "IA pour PME", etc.

---

**✅ Plan d'action terminé. Prêt pour implémentation.**

**Prochaine étape :** Exécuter les changements dans l'ordre recommandé ci-dessus.
