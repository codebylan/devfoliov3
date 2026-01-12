# 🔒 CORRECTIONS DE SÉCURITÉ URGENTES

## 🚨 VULNÉRABILITÉS CRITIQUES À CORRIGER IMMÉDIATEMENT

### 1. Rate Limiting - IP Spoofing
**Fichier**: `src/actions/booking.ts`

**Problème actuel**:
```typescript
const ip = headersList.get('x-forwarded-for') || 
           headersList.get('x-real-ip') || 
           'anonymous';
```

**Solution**:
```typescript
// Extraire la première IP (en cas de proxy chain)
const forwardedFor = headersList.get('x-forwarded-for');
const ip = forwardedFor?.split(',')[0]?.trim() || 
           headersList.get('x-real-ip') || 
           'anonymous';

// Créer un fingerprint plus robuste (IP + User-Agent)
const userAgent = headersList.get('user-agent')?.slice(0, 50) || 'unknown';
const fingerprint = `${ip}-${userAgent}`;

// Rate limiting avec fingerprint
const { success, remaining } = await ratelimit.limit(fingerprint);
```

---

### 2. CAPTCHA Bypass en Production
**Fichier**: `src/actions/booking.ts`

**Problème actuel**:
```typescript
if (!isDevelopment || !isTestToken) {
  // Vérification Turnstile
}
```

**Solution**:
```typescript
// Toujours vérifier en production
if (process.env.NODE_ENV === 'production') {
  // Vérification obligatoire en production
  const turnstileResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: validated.turnstileToken,
      }),
    }
  );

  const turnstileResult = await turnstileResponse.json();
  if (!turnstileResult.success) {
    return { error: 'Vérification CAPTCHA échouée. Veuillez réessayer.' };
  }
} else {
  // En développement, accepter uniquement le token de test
  if (validated.turnstileToken !== 'test-token-bypass') {
    return { error: 'Token de test invalide en développement' };
  }
}
```

---

### 3. Validation des Dates Passées
**Fichier**: `src/actions/booking.ts`

**Ajouter après ligne 81**:
```typescript
// Vérifier que la date est dans le futur
const now = new Date();
if (bookingStart < now) {
  return { error: 'Impossible de réserver un créneau dans le passé' };
}

// Vérifier que c'est dans les 30 prochains jours
const maxDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
if (bookingStart > maxDate) {
  return { error: 'Impossible de réserver au-delà de 30 jours' };
}
```

---

### 4. Rate Limiting par Email
**Fichier**: `src/actions/booking.ts`

**Ajouter après le rate limiting par IP**:
```typescript
// Rate limiting par email (plus strict: 1 réservation/heure)
const emailRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, '3600 s'), // 1 par heure
  analytics: true,
});

const emailLimit = await emailRatelimit.limit(`email:${validated.email}`);
if (!emailLimit.success) {
  return {
    error: 'Vous avez déjà réservé récemment avec cet email. Veuillez réessayer plus tard.',
    retryAfter: 3600,
  };
}
```

---

### 5. Validation Téléphone Améliorée
**Fichier**: `src/actions/booking.ts`

**Remplacer ligne 21**:
```typescript
phone: z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Format téléphone invalide (ex: +33612345678)')
  .optional(),
```

---

### 6. Validation URL Sécurisée
**Fichier**: `src/actions/booking.ts`

**Remplacer ligne 22**:
```typescript
company: z.string()
  .refine((url) => {
    if (!url || url === '') return true;
    try {
      const parsed = new URL(url);
      // Accepter uniquement http/https
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return false;
      }
      // Rejeter les domaines locaux en production
      if (process.env.NODE_ENV === 'production') {
        const hostname = parsed.hostname.toLowerCase();
        if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
          return false;
        }
      }
      return true;
    } catch {
      return false;
    }
  }, 'URL invalide. Utilisez http:// ou https://')
  .optional()
  .or(z.literal('')),
```

---

## 📋 CHECKLIST DE DÉPLOIEMENT

- [ ] Corriger le rate limiting (IP spoofing)
- [ ] Sécuriser le bypass CAPTCHA
- [ ] Ajouter validation dates passées
- [ ] Ajouter rate limiting par email
- [ ] Améliorer validation téléphone
- [ ] Sécuriser validation URL
- [ ] Tester tous les scénarios
- [ ] Vérifier que les variables d'environnement sont correctes en production
- [ ] Monitorer les logs après déploiement

---

## 🧪 EXÉCUTER LES TESTS

```bash
# Installer les dépendances si nécessaire
npm install

# Exécuter les tests de sécurité
node security-tests.js
```

---

## 📊 MONITORING RECOMMANDÉ

1. **Alertes**:
   - > 10 réservations/heure depuis une IP
   - > 5 réservations/heure avec le même email
   - Taux d'échec CAPTCHA > 50%

2. **Logs à surveiller**:
   - Toutes les tentatives de réservation (succès/échec)
   - IPs avec beaucoup d'échecs
   - Emails avec plusieurs réservations

3. **Blacklist automatique**:
   - IPs avec > 20 échecs/heure
   - Emails avec > 5 réservations/heure
