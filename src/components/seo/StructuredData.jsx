import { seoConfig } from '../../data/seo-config';

export default function StructuredData() {
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoConfig.site.url}/#website`,
    name: seoConfig.site.name,
    url: seoConfig.site.url,
    inLanguage: 'fr-FR',
    description: seoConfig.site.defaultDescription,
    publisher: { '@id': `${seoConfig.site.url}/#person` },
  };

  const schemas = [
    seoConfig.schemas.person,
    seoConfig.schemas.profilePage,
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
