import { seoConfig } from '../../data/seo-config';

export default function StructuredData() {
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.site.name,
    url: seoConfig.site.url,
    inLanguage: seoConfig.site.locale,
    publisher: {
      '@type': 'Person',
      name: seoConfig.site.name,
      url: seoConfig.site.url,
    },
  };

  const schemas = [
    seoConfig.schemas.person,
    seoConfig.schemas.professionalService,
    seoConfig.schemas.localBusiness,
    webSiteSchema,
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
