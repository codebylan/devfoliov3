# Audit QA — Parcours de réservation (front-end UX)

**Périmètre:** BookingWidget + Modal + BookingContext. Pas le backend.  
**Focus:** Expérience utilisateur, edge cases, accessibilité, clarté des erreurs.

---

## Ce qui est correct

- **Flux en 3 étapes** clair (Date/Heure → Infos → Confirmé), avec retour possible.
- **Gestion créneau pris entre-temps** : message "Ce créneau vient d'être réservé" + désélection.
- **Double soumission** évitée via `isSubmitting` + bouton désactivé + loader.
- **Modale** : focus trap, Escape pour fermer (sauf dans un champ → blur), overlay qui ne ferme pas sur tactile (fix clavier mobile).
- **Erreurs serveur** : `result.error` affiché via `errors.submit`.
- **Turnstile** : token requis, erreur/expiration affichées.
- **Champ téléphone** conditionnel selon type de rendez-vous (phone/meet), requis si phone.

---

## Bugs / problèmes identifiés

### 1. **Erreur champ "Site web" jamais affichée (bloquant UX)**

Le schéma Zod valide `company` en URL. Si l’utilisateur saisit une valeur invalide (ex. "google"), Zod lève une erreur mais il n’y a **aucun bloc `{errors.company && ...}`** dans le JSX. L’utilisateur ne voit pas pourquoi le formulaire refuse la soumission.  
→ **Correction :** Afficher `errors.company` sous le champ (comme pour name/email).

### 2. **Risque de crash à l’étape 2**

En step 2 on fait `format(selectedDate, 'EEEE d MMMM', { locale: fr })`. Si pour une raison (état incohérent, outil dev) `selectedDate` ou `selectedTime` est null, **crash**.  
→ **Correction :** Guard : si `!selectedDate || !selectedTime` en step 2, rediriger vers step 1 (ou réinitialiser).

### 3. **Accessibilité : champs sans label**

Tous les inputs utilisent uniquement `placeholder`. Pour les lecteurs d’écran et l’autocomplétion, il faut des **labels** associés (visibles ou `sr-only`).  
→ **Correction :** Ajouter `<label htmlFor="...">` (ou équivalent) pour chaque champ, et lier les messages d’erreur via `aria-describedby` si pertinent.

### 4. **Clé React sur le calendrier**

`calendarDays.map((day, idx) => ... key={idx})`. En changeant de mois, les indices se répètent, ce qui peut dégrader la réconciliation React.  
→ **Correction :** Utiliser une clé stable, ex. `key={format(day, 'yyyy-MM-dd')}`.

### 5. **Focus après succès (step 3)**

Quand on passe à l’écran "Confirmé", le focus reste sur le dernier élément (ex. bouton "Confirmer"). Pour les utilisateurs clavier / lecteur d’écran, il est préférable de **déplacer le focus** vers le titre de confirmation ou le bouton "Fermer" et d’annoncer le succès (live region).  
→ **Amélioration :** `useEffect` en step 3 qui met le focus sur le bouton "Fermer" (ou un élément approprié) et `aria-live="polite"` sur le message de confirmation.

### 6. **Champ "Site web" : URL sans protocole**

Les utilisateurs tapent souvent "google.com" ou "mon-site.fr". La validation `z.string().url()` exige un schéma complet (ex. `https://`).  
→ **Amélioration :** Soit indice dans le placeholder ("https://…"), soit normalisation côté front (ajout de `https://` si pas de protocole) avant validation. À traiter en fonction de la contrainte métier.

---

## Recommandations mineures

- **Turnstile expiré :** Message "CAPTCHA expiré" déjà correct ; optionnel : "Veuillez le refaire" pour plus de clarté.
- **Indicateur de progression :** Les libellés "Date & Heure" / "Informations" / "Confirmé" pourraient être annoncés au changement d’étape via une `aria-live` region (optionnel).

---

## Synthèse

| Sévérité          | Item                             | Statut     |
| ----------------- | -------------------------------- | ---------- |
| Bloquant UX       | Erreur `company` non affichée    | À corriger |
| Risque crash      | Step 2 sans guard sur date/heure | À corriger |
| A11y              | Labels manquants sur les champs  | À corriger |
| Perf / robustesse | Clés calendrier                  | À corriger |
| A11y              | Focus + annonce step 3           | Recommandé |
| UX                | URL site web (protocole / hint)  | Recommandé |
