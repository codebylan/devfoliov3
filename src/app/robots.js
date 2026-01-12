import { seoConfig } from '../data/seo-config';

export default function robots() {
  const baseUrl = seoConfig.site.url;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
