# Plan de sprints — Crédibilité & Conversion

Objectif: combler les **trous de confiance** qui bloquent la conversion aujourd'hui.
Basé sur l'audit marché du 2026-04-08.

## Répartition "agents" (owners)
- **@PRODUCT**: priorisation, scope, critères d'acceptation, arbitrages impact/effort.
- **@DESIGN**: UI/UX, mobile-first, composants shadcn/tailwind, hiérarchie visuelle.
- **@COPY**: micro-copy, promesses, CTA, preuves, messages d'erreur.
- **@FRONT**: implémentation Next/React, accessibilité, perf front, intégration sections.
- **@QA**: scénarios edge cases, accessibilité, non-régression.

## Définition de "Done" (globale)
- **Preuve sociale**: au moins 2 témoignages réels visibles sur la home.
- **Email professionnel**: plus aucune occurrence de `@gmail.com` exposée publiquement.
- **Urgence**: un signal de disponibilité limité visible en Hero ou Pricing.
- **Stack**: section recentrée sur les bénéfices utilisateur, pas la techno.
- **Pricing**: garantie de révision explicite + Sur Mesure repriced.

---

## Sprint 1 — Preuve sociale (P0)

### Objectif
Ajouter la **première couche de confiance manquante** : des humains qui valident ton travail.
Sans ça, demander 2 500 à 6 000€ à un inconnu repose uniquement sur ta propre parole.

### User stories & critères d'acceptation

- **US1 — En tant que prospect, je vois que d'autres ont déjà fait confiance à Dylan**
  - **Owner**: **@FRONT** (intégration composant) + **@COPY** (reformulation si besoin)
  - **Support**: **@DESIGN** (mise en scène), **@QA** (mobile, lisibilité)
  - **AC**:
    - Minimum 2 témoignages sur la home, idéalement 3.
    - Chaque témoignage comporte : prénom + secteur d'activité + citation courte + (optionnel) résultat chiffré.
    - La section est visible sans scroll excessif (entre Projects et FAQ ou sous About).
    - Sur mobile : lisible, pas de carousel cassé.
    - Aucun témoignage inventé — authentiques uniquement (screenshot DM, email client, Google Review).
  - **Fichiers**:
    - `src/data/testimonials.js` (à créer — format `{ id, name, role, quote, result? }`)
    - `src/components/sections/Testimonials.jsx` (à créer)
    - `src/app/page.jsx` (intégration dans le layout de la home)
  - **Bloqueur**: nécessite des témoignages réels. Si pas encore collectés → envoyer un message WhatsApp/email aux 3 meilleurs clients cette semaine.

- **US2 — En tant que prospect, les logos clients me rassurent au premier coup d'œil**
  - **Owner**: **@FRONT** + **@DESIGN**
  - **Support**: **@QA**
  - **AC**:
    - La section logos (`Clients.jsx`) est décommentée et affiche les logos disponibles.
    - Si moins de 3 logos : ne pas afficher la section (seuil minimum pour que ça ne fasse pas vide).
    - Logos en SVG ou PNG optimisé, `alt` descriptif.
  - **Fichiers**:
    - `src/components/sections/Clients.jsx`
    - `src/app/page.jsx`
  - **Bloqueur**: disponibilité des assets logos (formats SVG/PNG autorisés par les clients).

### Livrables
- Section Testimonials visible sur la home.
- Logos clients décommentés si assets disponibles.

---

## Sprint 2 — Signaux professionnels (P0)

### Objectif
Corriger les **micro-signaux qui cassent la crédibilité** avant même la lecture du contenu.

### User stories & critères d'acceptation

- **US3 — En tant que prospect haut de gamme, je ne vois pas d'adresse Gmail**
  - **Owner**: **@FRONT** (remplacement dans le code) + **@DEVOPS** (config email pro)
  - **Support**: **@QA** (audit de toutes les occurrences)
  - **AC**:
    - `d.agboton.dev@gmail.com` remplacé par une adresse pro (ex: `dylan@dylanagboton.fr` ou `contact@dylanagboton.fr`) dans **tous** les fichiers.
    - Le `mailto:` fonctionne et arrive bien sur la boîte de Dylan.
    - Aucune occurrence de l'ancienne adresse restante dans le code source.
  - **Fichiers**:
    - `src/components/sections/CTA.jsx`
    - `src/components/layout/Footer.jsx` (et tout autre fichier contenant l'email)
    - Variables d'environnement / config si l'email est centralisé
  - **Note**: Cloudflare Email Routing ou Zoho Mail (gratuit) suffisent pour rediriger vers Gmail sans changer l'usage quotidien.

- **US4 — En tant que prospect, je comprends la valeur de la tech sans jargon**
  - **Owner**: **@COPY** (reformulation bénéfices) + **@DESIGN** (layout condensé)
  - **Support**: **@FRONT** (implémentation), **@QA** (mobile)
  - **AC**:
    - La section stack technique est soit :
      - **Option A** : condensée en 4 bénéfices utilisateur ("charge en < 2s", "données sécurisées", "modifiable sans développeur", "visible sur Google") avec la techno en sous-texte secondaire.
      - **Option B** : masquée derrière un accordéon "Détails techniques" (ouvrable par les curieux).
    - La section n'occupe plus plus de 50% de l'espace qu'elle prend actuellement.
    - Le message "Netflix et Airbnb utilisent la même techno" est soit retiré soit repositionné en bénéfice client ("vitesse et fiabilité à l'échelle").
  - **Fichiers**:
    - `src/components/sections/TechStack.jsx` (ou équivalent)

### Livrables
- Email pro partout dans le code.
- Section stack recentrée sur les bénéfices.

---

## Sprint 3 — Friction de conversion (P1)

### Objectif
Créer une **raison d'agir maintenant** et réduire les derniers freins à la décision.

### User stories & critères d'acceptation

- **US5 — En tant que prospect intéressé, je comprends que les créneaux sont limités**
  - **Owner**: **@COPY** (message d'urgence) + **@FRONT** (intégration)
  - **Support**: **@DESIGN** (placement), **@QA** (mobile)
  - **AC**:
    - Un signal de disponibilité limité est visible dans la Hero ou le Pricing (ex: "Je prends 2 nouveaux projets par mois" ou "Prochain créneau disponible : mai 2026").
    - Le message est authentique et mis à jour manuellement chaque mois.
    - Il n'est pas agressif ou faux — il reflète la réalité du planning.
    - Sur mobile : visible sans scroll.
  - **Fichiers**:
    - `src/components/sections/Hero.jsx` et/ou `src/components/sections/Pricing.jsx`
    - Créer une constante `AVAILABILITY` dans `src/lib/config.js` ou équivalent pour mise à jour centralisée.

- **US6 — En tant que prospect hésitant, je sais ce qui se passe si je ne suis pas satisfait**
  - **Owner**: **@COPY** (rédaction garantie) + **@FRONT** (intégration Pricing)
  - **Support**: **@QA**
  - **AC**:
    - Une garantie de révision est explicitement formulée dans la section Pricing.
    - Exemple : "X révisions incluses avant livraison finale" ou "Retouches gratuites pendant 15 jours après livraison."
    - La formulation est concrète (pas "satisfaction garantie" vague).
    - Elle apparaît soit dans les cards offres, soit dans une note sous le grid de pricing.
  - **Fichiers**:
    - `src/components/sections/Pricing.jsx`

### Livrables
- Signal de disponibilité visible (Hero ou Pricing).
- Garantie de révision formulée dans Pricing.

---

## Sprint 4 — Repricing (P2)

### Objectif
Aligner les prix sur la **valeur réelle délivrée** et les standards du marché Paris/IDF.

### User stories & critères d'acceptation

- **US7 — En tant que prospect "Sur Mesure", le prix reflète la complexité du projet**
  - **Owner**: **@PRODUCT** (décision pricing) + **@FRONT** (mise à jour)
  - **Support**: **@COPY** (reformulation valeur)
  - **AC**:
    - L'offre Sur Mesure est repriced entre **€8 500 et €12 000** (ou "sur devis" si périmètre variable).
    - Si "sur devis" : un exemple de fourchette est donné pour ancrer les attentes.
    - La justification de valeur dans la card est renforcée (auth, dashboard admin, paiement en ligne = c'est une vraie application web, pas juste un site).
  - **Fichiers**:
    - `src/components/sections/Pricing.jsx`
    - `src/data/pricing.js` (si les données sont externalisées)
  - **Trade-off**: un prix plus haut peut réduire les demandes inbound mais qualifier mieux les leads. À valider avec 2-3 semaines de données post-changement.

### Livrables
- Sur Mesure repriced avec justification de valeur renforcée.

---

## Backlog (référence rapide)

### P0 — Bloqueurs de conversion
- Témoignages clients (min 2, authentiques).
- Logos clients décommentés si assets dispo.
- Email pro (`@gmail.com` → adresse de domaine).
- Section stack recentrée sur les bénéfices.

### P1 — Réducteurs de friction
- Signal de disponibilité limitée (Hero ou Pricing).
- Garantie de révision explicite (Pricing).

### P2 — Optimisation valeur
- Sur Mesure repriced (€8 500–€12 000 ou sur devis).

---

## Ordre d'exécution recommandé

| Ordre | Action | Effort estimé | Impact |
|-------|--------|---------------|--------|
| 1 | Email pro | 1h | Critique |
| 2 | Témoignages (collecte + intégration) | 2-4h | Critique |
| 3 | Section stack condensée | 2h | Fort |
| 4 | Signal disponibilité | 1h | Fort |
| 5 | Garantie révision Pricing | 30min | Moyen |
| 6 | Logos clients (si assets dispo) | 1h | Moyen |
| 7 | Sur Mesure repricing | 30min | Moyen |
