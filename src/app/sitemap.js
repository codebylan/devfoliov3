import { seoConfig } from '../data/seo-config';
import { getAllProjectSlugs } from '../data/projects';

export default function sitemap() {
  const baseUrl = seoConfig.site.url;
  const lastModified = new Date();
  const projectSlugs = getAllProjectSlugs();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/cgv`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    ...projectSlugs.map((slug) => ({
      url: `${baseUrl}/projets/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
