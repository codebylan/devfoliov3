# Sprints & User Stories — devfoliov3 (Portfolio V2 — Canal WhatsApp)

> Migration du système de booking vers un canal de contact direct WhatsApp, suppression de l'infrastructure inutile, et simplification du parcours de conversion.
>
> **Objectif :** Remplacer le booking multi-étapes par un CTA WhatsApp + formulaire d'audit, pour maximiser les conversions avec zéro friction et zéro maintenance backend.
> **Stack :** Next.js 16 (App Router) · Tailwind CSS v4 · Vercel
> **Out of scope :** Tout nouveau système d'auth, dashboard, gestion de créneaux (supprimé définitivement)
> **Contexte :** Portfolio freelance ciblant les entreprises de services — le contact direct WhatsApp réduit le tunnel de conversion de 5 étapes à 1 clic.

---

## Légende

### Personas (Shipper Squad)

| Tag          | Persona             | Rôle sur la story                                          |
| ------------ | ------------------- | ---------------------------------------------------------- |
| **@PRODUCT** | MVP Strategist      | Priorisation, scope, critères d'acceptation                |
| **@DESIGN**  | UI/UX Architect     | Composants, responsive, micro-interactions                 |
| **@COPY**    | Copywriter          | Message pré-rempli WhatsApp, micro-copy CTAs              |
| **@FRONT**   | Frontend Specialist | Intégration, composants UI, nettoyage code                 |
| **@BACK**    | Systems Engineer    | Suppression infrastructure, nettoyage dépendances          |
| **@QA**      | Bug Hunter          | Tests parcours conversion, multi-devices, edge cases       |

### Types de feature (préfixe branche + Conventional Commits)

| Type      | Usage                              | Exemple branche                      |
| --------- | ---------------------------------- | ------------------------------------ |
| `refactor`| Suppression / réécriture de code   | `feature/refactor-remove-booking`    |
| `front`   | Vues publiques, composants UI      | `feature/front-whatsapp-cta`         |
| `back`    | Nettoyage infra, dépendances       | `feature/back-remove-supabase`       |
| `copy`    | Textes marketing uniquement        | `feature/copy-whatsapp-message`      |
| `test`    | Tests automatisés, QA              | `feature/test-conversion-flow`       |

### Convention GitFlow (résumé)

1. **Branche** : `feature/<type>-<slug-kebab>`
2. **Commit** : `<type>(<scope>): <description>` — types : `feat`, `fix`, `chore`, `refactor`, `test`
3. **Merge** : PR vers `main` directement (projet solo, pas de `develop`)

---

## Sprint 1 — Suppression du Booking & Nettoyage Infrastructure

**Objectif** : Éliminer tout le système de booking (code + infra + dépendances) pour repartir sur une base propre.

> **Statut** : 🔴 À faire — décision validée en product review (2026-04-07)

| ID     | User Story | Persona principal | Autres | Type | Branche | Commit suggéré |
| ------ | ---------- | ----------------- | ------ | ---- | ------- | -------------- |
| US-1.1 | **En tant que** dev, **je veux** supprimer `BookingWidget.jsx`, `BookingModal.jsx`, `BookingContext.jsx` et leurs imports **afin de** ne plus maintenir du code mort. | @BACK | @FRONT | `refactor` | `feature/refactor-remove-booking` | `refactor(booking): remove booking widget, modal and context` |
| US-1.2 | **En tant que** dev, **je veux** supprimer `src/actions/booking.ts` et `src/actions/availability.ts` **afin d'** éliminer toute la logique backend de créneaux. | @BACK | — | `refactor` | `feature/refactor-remove-booking` | `refactor(actions): remove booking and availability server actions` |
| US-1.3 | **En tant que** dev, **je veux** supprimer `src/lib/supabase/`, `src/middleware.ts` et les variables d'env Supabase **afin de** ne plus dépendre d'une base de données inutile. | @BACK | — | `back` | `feature/back-remove-supabase` | `chore(infra): remove Supabase client, server and middleware` |
| US-1.4 | **En tant que** dev, **je veux** désinstaller `@supabase/ssr`, `@supabase/supabase-js`, `@upstash/ratelimit`, `@upstash/redis`, `@marsidev/react-turnstile` **afin d'** alléger le bundle et supprimer 5 dépendances inutiles. | @BACK | — | `back` | `feature/back-remove-supabase` | `chore(deps): remove booking-related dependencies` |

**Critères d'acceptation Sprint 1**

- `npm run build` passe sans erreur après suppression.
- Aucun import vers `supabase`, `upstash`, ou `turnstile` dans le codebase.
- Le `middleware.ts` est supprimé (ou réduit à un passthrough vide si Next.js le requiert).
- `package.json` ne contient plus les 5 dépendances listées.
- Aucune variable d'env `SUPABASE_*` ou `UPSTASH_*` référencée dans le code.
- La page d'accueil se charge sans erreur — les sections `CTA`, `Prices`, `Hero` fonctionnent.

---

## Sprint 2 — CTA WhatsApp

**Objectif** : Remplacer l'ancien CTA booking par un lien WhatsApp direct avec message pré-rempli contextuel.

> **Statut** : 🔴 À faire — bloqué par Sprint 1

**Dépendance :** Sprint 1 terminé (plus de `BookingContext`, `openBookingModal`)

| ID     | User Story | Persona principal | Autres | Type | Branche | Commit suggéré |
| ------ | ---------- | ----------------- | ------ | ---- | ------- | -------------- |
| US-2.1 | **En tant que** prospect, **je veux** cliquer sur un bouton "Discutons sur WhatsApp" **afin d'** ouvrir WhatsApp directement avec un message pré-rempli et contacter le freelance en moins de 10 secondes. | @FRONT | @DESIGN, @COPY | `front` | `feature/front-whatsapp-cta` | `feat(front): add WhatsApp CTA button with pre-filled message` |
| US-2.2 | **En tant que** dev, **je veux** un composant `WhatsAppCTA` réutilisable (lien `wa.me` + icône + message encodé) **afin de** pouvoir le placer dans `CTA`, `Hero`, `Prices` sans duplication. | @FRONT | @DESIGN | `front` | `feature/front-whatsapp-cta` | `feat(front): add reusable WhatsAppCTA component` |
| US-2.3 | **En tant que** prospect sur mobile, **je veux** que le CTA ouvre l'app WhatsApp native **afin de** ne pas être redirigé vers le web. | @FRONT | @QA | `front` | `feature/front-whatsapp-cta` | `fix(front): use wa.me deep link for native app opening on mobile` |
| US-2.4 | **En tant que** copywriter, **je veux** un message pré-rempli qui contextualise la demande (ex. "Bonjour Dylan, j'ai vu votre portfolio et je souhaite discuter d'un projet [type]. Seriez-vous disponible ?") **afin d'** éviter les messages vides qui réduisent le taux de réponse. | @COPY | @PRODUCT | `copy` | `feature/copy-whatsapp-message` | `copy(cta): craft WhatsApp pre-filled message for conversion` |

**Critères d'acceptation Sprint 2**

- Le CTA section (`/src/components/sections/CTA.jsx`) utilise `WhatsAppCTA` — plus de `openBookingModal`.
- Sur desktop : `wa.me/` ouvre WhatsApp Web dans un nouvel onglet.
- Sur mobile : `wa.me/` ouvre l'app WhatsApp native.
- Le message pré-rempli est encodé en `encodeURIComponent` — zéro caractère corrompu.
- Le composant `WhatsAppCTA` accepte une prop `variant` (primary / secondary) pour s'adapter au contexte.
- L'ancien `BookingContext` n'est **pas** importé dans `CTA.jsx`.
- Le lien est accessible : `role="link"`, `aria-label` descriptif, focusable au clavier.

---

## Sprint 3 — Intégration Cross-Site & Polish

**Objectif** : Placer le CTA WhatsApp aux points de conversion clés du portfolio et assurer la cohérence visuelle.

> **Statut** : 🔴 À faire — bloqué par Sprint 2

| ID     | User Story | Persona principal | Autres | Type | Branche | Commit suggéré |
| ------ | ---------- | ----------------- | ------ | ---- | ------- | -------------- |
| US-3.1 | **En tant que** visiteur de la section `Hero`, **je veux** voir le CTA WhatsApp en complément du CTA principal **afin de** pouvoir contacter dès le premier écran. | @FRONT | @DESIGN, @COPY | `front` | `feature/front-whatsapp-hero` | `feat(front): add WhatsApp secondary CTA in Hero section` |
| US-3.2 | **En tant que** visiteur de la section `Prices`, **je veux** un CTA WhatsApp après chaque offre **afin de** contacter directement depuis la page tarifaire sans chercher le formulaire. | @FRONT | @DESIGN | `front` | `feature/front-whatsapp-prices` | `feat(front): add WhatsApp CTA per pricing offer` |
| US-3.3 | **En tant que** dev, **je veux** un floating button WhatsApp visible sur toutes les pages (desktop discret, mobile visible) **afin de** ne jamais perdre le prospect en cours de navigation. | @FRONT | @DESIGN | `front` | `feature/front-whatsapp-floating` | `feat(front): add floating WhatsApp button site-wide` |
| US-3.4 | **En tant que** visiteur, **je veux** que l'`AuditForm` reste disponible pour les prospects froids **afin d'** avoir une alternative email pour ceux qui ne veulent pas WhatsApp. | @PRODUCT | @FRONT | `front` | `feature/front-audit-form-keep` | `chore(front): keep AuditForm as cold-lead fallback channel` |

**Critères d'acceptation Sprint 3**

- Le floating button est présent dans le `layout.jsx` — visible sur toutes les pages.
- Sur mobile (< 768px) : floating button toujours visible, taille min 48px (tap-friendly).
- Sur desktop : floating button discret (opacity réduite au repos, plein au hover).
- La section `Prices` a un CTA WhatsApp sous chaque carte d'offre.
- La section `Hero` a le CTA WhatsApp en position secondaire (sous le CTA principal).
- L'`AuditForm` est conservé intact et fonctionnel.
- Aucun doublon visuel : pas deux boutons WhatsApp identiques côte à côte.

---

## Sprint 4 — QA & Validation Conversion

**Objectif** : Valider le parcours de conversion complet sur tous les devices, s'assurer qu'il n'y a aucune régression.

> **Statut** : 🔴 À faire — bloqué par Sprint 3

| ID     | User Story | Persona principal | Autres | Type | Branche | Commit suggéré |
| ------ | ---------- | ----------------- | ------ | ---- | ------- | -------------- |
| US-4.1 | **En tant qu'** utilisateur mobile (iOS/Android), **je veux** que le CTA WhatsApp ouvre l'app native en moins de 2 secondes **afin de** ne pas subir de friction. | @QA | @FRONT | `test` | `feature/test-conversion-flow` | `test(qa): verify WhatsApp deep link on iOS and Android` |
| US-4.2 | **En tant qu'** utilisateur desktop, **je veux** que le CTA WhatsApp ouvre WhatsApp Web dans un nouvel onglet **afin de** ne pas perdre ma navigation sur le portfolio. | @QA | @FRONT | `test` | `feature/test-conversion-flow` | `test(qa): verify WhatsApp Web opens in new tab on desktop` |
| US-4.3 | **En tant que** dev, **je veux** vérifier que le build Vercel passe sans warnings liés aux anciennes dépendances supprimées **afin d'** assurer une production clean. | @QA | @BACK | `test` | `feature/test-conversion-flow` | `chore(ci): verify clean build after dependency removal` |
| US-4.4 | **En tant que** visiteur, **je veux** naviguer sur tout le site sans rencontrer d'erreur JavaScript liée au booking supprimé **afin d'** avoir une expérience fluide. | @QA | @FRONT | `test` | `feature/test-conversion-flow` | `test(qa): smoke test all pages after booking removal` |

**Critères d'acceptation Sprint 4**

- Testé sur : iPhone Safari, Android Chrome, Firefox desktop, Chrome desktop.
- Aucune erreur console sur toutes les pages après suppression du booking.
- `npm run build` : 0 erreur, 0 warning lié aux imports supprimés.
- Le message WhatsApp pré-rempli s'affiche correctement (caractères accentués, pas d'encodage corrompu).
- Score Lighthouse Performance ≥ 90/100 — le retrait des dépendances lourdes doit améliorer le score.
- L'`AuditForm` soumet correctement et retourne un état de succès.

---

## Backlog transversal

| ID     | Story (résumé) | Persona | Type | Branche |
| ------ | -------------- | ------- | ---- | ------- |
| US-X.1 | Tracking clics WhatsApp via GA4 / Plausible (event `whatsapp_click`) | @PRODUCT | `front` | `feature/front-whatsapp-tracking` |
| US-X.2 | Supprimer aussi `Testimonials` et `Expertise` (déjà commentés dans `page.jsx`) si définitivement abandonnés | @BACK | `refactor` | `feature/refactor-dead-sections` |
| US-X.3 | Message WhatsApp dynamique selon la section d'origine (Hero vs Prices vs CTA) via query param | @COPY | `copy` | `feature/copy-whatsapp-contextual` |

---

## Récap par sprint

| Sprint | Objectif | Bloqueurs | Livrable |
| ------- | -------- | --------- | -------- |
| **Sprint 1** | Suppression booking + infra | Aucun | Codebase propre, 0 dépendance inutile |
| **Sprint 2** | CTA WhatsApp V1 | Sprint 1 | Composant `WhatsAppCTA` + section CTA migrée |
| **Sprint 3** | CTA cross-site + floating | Sprint 2 | WhatsApp sur Hero, Prices, floating button |
| **Sprint 4** | QA & validation | Sprint 3 | Build propre, testé multi-devices |

---

## Template rapide (copier pour une nouvelle US)

```
ID: US-_
Titre:
Persona: @...
Autres personas: @...
Type feature:
Branche: feature/<type>-<slug>
Commit: <type>(<scope>): ...
Acceptance:
  -
  -
```
