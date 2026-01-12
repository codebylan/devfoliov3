import { seoConfig } from '../data/seo-config';

export default function sitemap() {
  const baseUrl = seoConfig.site.url;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Ajouter autres pages futures ici
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}
