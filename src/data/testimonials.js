/**
 * Témoignages clients.
 *
 * Règle : mettre `isPublished: true` UNIQUEMENT si le témoignage est authentique
 * et validé par le client (DM, email, Google Review, Malt).
 * Les entrées `isPublished: false` ne s'affichent jamais en production.
 */
export const testimonials = [
  {
    id: 'dayness-institut',
    name: 'Ndeye Ciss M. | Fondatrice',
    role: 'Dayness Institut · Beauté & Bien-être',
    quote: `Des professionnels du référencement en Suisse sont venus nous voir la semaine dernière. Ils m’ont dit : "Le site Dayness Institut est très bien référencé, noté à 99 %". L'un d'eux a ajouté qu'en 15 ans de métier dans la communication et le marketing, il n’avait pas vu plus de 10 sites notés de la sorte.`,
    result: '+50% de réservations en ligne',
    stars: 5,
    image: null, // ex: '/images/testimonials/sophie.jpg'
    isPublished: true,
  },
  {
    id: 'maison-panthera',
    name: 'Sephora B. | Fondatrice',
    role: 'Maison Panthera · Agence de talent',
    quote: `Un immense merci pour la création du site Maison Panthera !

Je voulais quelque chose d'élégant et qui reflète parfaitement l'univers de mon Agence, et le résultat dépasse mes attentes. Le site est magnifique, super fluide, et surtout très simple à utiliser pour mes clientes qui veulent réserver. J'ai déjà eu plein de compliments de leur part !
Merci pour ton écoute, ta réactivité et ton super travail. Je suis vraiment ravie du résultat !`,
    result: null,
    stars: 5,
    image: null,
    isPublished: true,
  },
  {
    id: 'lymphe-agency',
    name: 'Anthony Bemba',
    role: `Lymphe Agency · Agence qui vise à aider les professionnels de santé à s'installer`,
    quote: `Le site de Lymphe Agency est exactement ce que j'avais en tête, en mieux ! Je cherchais une vitrine digitale qui soit à la fois moderne et rassurante pour les professionnels de santé que nous accompagnons. Pari réussi : la plateforme est épurée, fluide et va à l'essentiel. C'est le tremplin parfait pour mettre en lumière notre expertise et inspirer confiance d'emblée. Un immense merci pour ta réactivité, ton écoute et ton exécution quasi chirurgicale. Le rendu est tout simplement bluffant !`,
    result: null,
    stars: 5,
    image: null,
    isPublished: true,
  },
];
