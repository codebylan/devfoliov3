# Plan de sprints — DevFolio v3

Objectif: faire passer le portfolio de “beau” à **ultra-convertissant + techniquement irréprochable**.

## Répartition “agents” (owners)
- **@PRODUCT**: priorisation, scope, critères d’acceptation, arbitrages impact/effort.
- **@DESIGN**: UI/UX, mobile-first, composants shadcn/tailwind, hiérarchie visuelle.
- **@COPY**: micro-copy, promesses, CTA, preuves, messages d’erreur.
- **@FRONT**: implémentation Next/React, accessibilité, perf front, intégration sections.
- **@SEO**: metadata, canonical, sitemap, robots, schema JSON-LD, partage social.
- **@QA**: scénarios edge cases, accessibilité, non-régression, check Core Web Vitals.
- **@BACK**: Supabase/actions, sécurité/validation, rate-limit, intégrations back.
- **@DEVOPS**: headers sécurité, déploiement, environnements, CI/CD.

## Définition de “Done” (globale)
- **Parcours mobile**: navigation + CTA principal accessibles en permanence.
- **Projets**: chaque projet = **case study cliquable** avec contexte, rôle, contraintes, solution, stack, résultats, médias optimisés.
- **Preuve sociale**: testimonials + logos + signaux de confiance visibles.
- **SEO/partage**: canonical/OG corrects par page, sitemap complet, schema JSON-LD cohérent.
- **Perf**: vidéos optimisées (formats + preload + lazy), pas de CLS.
- **A11y**: skip-link, ARIA, clavier, focus modales.

---

## Sprint 1 — Conversion mobile + “trust layer” (P0)

### Objectif
Corriger les **bloqueurs de conversion** (surtout mobile) et ajouter une première couche de **confiance**.

### User stories & critères d’acceptation
- **US1 — En tant que visiteur mobile, je peux naviguer facilement**
  - **Owner**: **@DESIGN** (UX menu) + **@FRONT** (implémentation)
  - **Support**: **@QA** (clavier, focus, mobile)
  - **AC**:
    - Un menu mobile (hamburger/drawer) donne accès aux sections principales.
    - Le menu est navigable clavier + fermeture via `Esc` et clic outside.
  - **Fichiers**: `src/components/layout/Header.jsx`

- **US2 — En tant que visiteur, je peux réserver en 1 tap depuis le header**
  - **Owner**: **@DESIGN** (placement/hiérarchie) + **@FRONT** (comportement)
  - **Support**: **@COPY** (libellé CTA), **@QA** (parcours mobile)
  - **AC**:
    - Le CTA booking est visible et accessible sur mobile.
    - Le CTA déclenche le même flux que sur desktop (pas de dead-end).
  - **Fichiers**: `src/components/layout/Header.jsx`, `src/components/sections/BookingWidget.jsx` (si ajustements)

- **US3 — En tant que prospect, je suis rassuré par des signaux concrets**
  - **Owner**: **@COPY** (preuves/claims) + **@DESIGN** (mise en scène)
  - **Support**: **@FRONT** (intégration), **@QA** (lisibilité mobile)
  - **AC**:
    - Ajout de **badges de confiance** (ex: “Réponse < 24h”, “Sans engagement”, “Livrables clairs”) dans Hero et/ou About.
    - Ajout d’une section **Témoignages** (3–5 items min).
    - (Option) Ajout d’une section **Logos clients** si dispo.
  - **Fichiers**:
    - `src/components/sections/Hero.jsx` et/ou `src/components/sections/About.jsx`
    - (à créer) `src/components/sections/Testimonials.jsx`
    - (à créer) `src/data/testimonials.js`

### Livrables
- Menu mobile + CTA booking visible.
- Trust badges visibles.
- Section Testimonials intégrée sur la home (`src/app/page.jsx`).

---

## Sprint 2 — Case studies cliquables + profondeur “preuve par les résultats” (P0)

### Objectif
Transformer les projets en **preuves**: clic → détail → compréhension → conversion.

### User stories & critères d’acceptation
- **US4 — En tant que prospect, je peux explorer un projet en détail**
  - **Owner**: **@FRONT** (modal/pages + data) + **@DESIGN** (UI/flow)
  - **Support**: **@COPY** (narratif des cas), **@SEO** (si pages dédiées), **@QA** (a11y modal)
  - **AC**:
    - Les cards projets sont cliquables (ou CTA “Voir le cas complet”).
    - Un détail s’ouvre (modal ou page dédiée) avec:
      - Contexte (client / secteur / objectif)
      - Ton rôle (scope)
      - Contraintes
      - Solution (approche)
      - Stack
      - Résultats (idéalement chiffrés)
      - Médias (images/vidéos) optimisés
      - CTA “Réserver un appel”
  - **Fichiers**: `src/components/sections/Projects.jsx`, `src/data/projects.js`
  - **À décider**:
    - **Option A (rapide)**: modal (réutiliser/adapter `src/components/ui/modal.jsx`)
    - **Option B (propre SEO)**: pages dédiées `/projets/[slug]` (plus de scope)

- **US5 — En tant que prospect, je vois clairement l’impact**
  - **Owner**: **@COPY** (outcomes) + **@PRODUCT** (structure “preuve”)
  - **Support**: **@FRONT** (affichage), **@QA** (compréhension + mobile)
  - **AC**:
    - Chaque projet a au moins 1–3 “outcomes” concrets (ex: perf, conversion, lead gen, temps gagné).
    - Les outcomes sont visibles dans la liste (teaser) + détaillés dans le cas complet.
  - **Fichiers**: `src/data/projects.js`, `src/components/sections/Projects.jsx`

### Livrables
- Projets cliquables + détail projet (modal ou pages).
- Données projets enrichies (structure stable).

---

## Sprint 3 — SEO/partage “nickel” + schema + routes (P0/P1)

### Objectif
Rendre le site **inattaquable** côté SEO technique, partage social, indexation.

### User stories & critères d’acceptation
- **US6 — En tant que moteur, je découvre toutes les pages**
  - **Owner**: **@SEO**
  - **Support**: **@QA** (validation indexation)
  - **AC**:
    - Sitemap inclut: `/`, `/cgv`, `/confidentialite`, `/mentions-legales` (et toute autre route réelle).
  - **Fichiers**: `src/app/sitemap.js`

- **US7 — En tant que moteur/RS, chaque page a ses métadonnées correctes**
  - **Owner**: **@SEO**
  - **Support**: **@FRONT** (impl Next metadata), **@QA** (preview OG/Twitter)
  - **AC**:
    - Canonical **par page** (pas uniquement homepage).
    - `openGraph.url` correct par page.
    - OG images fonctionnent (URL absolues via `metadataBase` ou URLs complètes).
    - Twitter: `site` + `creator` cohérents.
  - **Fichiers**: `src/app/layout.jsx`, `src/app/page.jsx`, `src/app/cgv/page.jsx`, `src/app/confidentialite/page.jsx`, `src/app/mentions-legales/page.jsx`

- **US8 — En tant que moteur, je comprends la structure via JSON-LD**
  - **Owner**: **@SEO**
  - **Support**: **@FRONT** (rendu JSON-LD), **@QA** (test Rich Results)
  - **AC**:
    - Ajouter `WebSite` schema (+ `SearchAction` si pertinent).
    - Ajouter `FAQPage` schema si la FAQ est présente.
    - Ajouter `BreadcrumbList` schema sur pages légales si breadcrumbs visibles.
  - **Fichiers**: `src/components/seo/StructuredData.jsx`, `src/components/sections/FAQ.jsx` (si data export), pages légales

### Livrables
- Sitemap complet.
- Metadata page-level clean.
- JSON-LD enrichi.

---

## Sprint 4 — Performance vidéos/images + stabilité visuelle (P1)

### Objectif
Gagner sur Core Web Vitals: **LCP/CLS** surtout via médias.

### User stories & critères d’acceptation
- **US9 — En tant que visiteur, la page charge vite même sur mobile**
  - **Owner**: **@FRONT**
  - **Support**: **@QA** (Lighthouse/CWV), **@DESIGN** (expérience vidéo), **@DEVOPS** (si pipeline médias)
  - **AC**:
    - Vidéos projets: formats optimisés (WebM/MP4), `preload` maîtrisé (`metadata`/`none`), lazy-load.
    - Pas d’autoplay agressif si ça nuit au scroll/perf (au minimum contrôle du preload).
    - Dimensions/aspect ratio fixés pour éviter CLS.
  - **Fichiers**: `src/components/sections/Projects.jsx`, `public/videos/*`, `src/data/projects.js`

- **US10 — En tant que visiteur, l’image above-the-fold est prioritaire**
  - **Owner**: **@FRONT**
  - **Support**: **@QA** (LCP), **@DESIGN** (ordre des sections)
  - **AC**:
    - Les images réellement above-the-fold utilisent `priority`.
  - **Fichiers**: `src/components/sections/About.jsx`, `src/components/sections/ProblemAndSolution.jsx` (selon placement)

### Livrables
- Médias optimisés + chargement contrôlé.
- CLS éliminé sur sections médias.

---

## Sprint 5 — Accessibilité & robustesse UI (P1)

### Objectif
Rendre l’UX “pro” pour tous: clavier, lecteurs d’écran, états d’erreur/chargement.

### User stories & critères d’acceptation
- **US11 — En tant qu’utilisateur clavier, je peux aller au contenu directement**
  - **Owner**: **@FRONT**
  - **Support**: **@QA** (audit a11y)
  - **AC**: présence d’un skip-link vers `#main`, visible au focus.
  - **Fichiers**: `src/app/layout.jsx`

- **US12 — En tant qu’utilisateur, les modales sont accessibles**
  - **Owner**: **@FRONT**
  - **Support**: **@QA** (focus trap), **@DESIGN** (patterns d’overlay)
  - **AC**:
    - Focus trap + retour focus à la fermeture.
    - `Esc` ferme, aria roles corrects.
  - **Fichiers**: `src/components/ui/modal.jsx`, (et composants qui l’utilisent)

- **US13 — En tant qu’utilisateur, je comprends les erreurs et états**
  - **Owner**: **@FRONT** (états UI) + **@COPY** (messages)
  - **Support**: **@BACK** (si erreurs action/api), **@QA** (scénarios échec)
  - **AC**:
    - Booking/form: états loading + erreurs lisibles.
    - `not-found` et erreurs runtime cohérents.
  - **Fichiers**: `src/components/sections/BookingWidget.jsx`, `src/app/not-found.jsx`

### Livrables
- Skip-link.
- Modales accessibles.
- États loading/erreurs propres sur booking.

---

## Sprint 6 — Growth & instrumentation (P2)

### Objectif
Mesurer et itérer: instrumentation minimale + micro-optimisations de conversion.

### User stories & critères d’acceptation
- **US14 — En tant qu’owner, je mesure le funnel**
  - **Owner**: **@PRODUCT** (KPI/events) + **@FRONT** (impl)
  - **Support**: **@DEVOPS** (config prod), **@QA** (validation events)
  - **AC**:
    - Analytics installée (ex: Vercel Analytics / Plausible / GA4).
    - Events: clic CTA booking, ouverture booking, soumission, succès/échec.
  - **Fichiers**: `src/app/layout.jsx` (+ utilitaires éventuels)

- **US15 — En tant que prospect, je comprends le process et le “next step”**
  - **Owner**: **@PRODUCT** (contenu/process) + **@DESIGN** (mise en scène)
  - **Support**: **@COPY** (copy), **@FRONT** (intégration), **@QA** (clarité mobile)
  - **AC**: section Process + CTA contextualisés.
  - **Fichiers**: (à créer) `src/components/sections/Process.jsx`, `src/app/page.jsx`

### Livrables
- Tracking minimal + events clés.
- Ajustements copy/CTA basés sur données.

---

## Backlog (référence rapide)

### P0
- Menu mobile + CTA booking header.
- Testimonials + trust badges.
- Projets cliquables + case study détaillé.
- SEO technique: canonical par page, sitemap complet, OG absolu, twitter `site`.
- Vidéos: formats + preload + lazy + anti-CLS.

### P1
- Section Process.
- Accessibilité (skip-link, ARIA, focus trap).
- Hiérarchie CTA.

### P2
- Analytics + tracking funnel.
- Headers sécurité dans `next.config.mjs` (selon besoins).
