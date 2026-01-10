import { seoConfig } from '@/data/seo-config';

export default function StructuredData() {
  const schemas = [
    seoConfig.schemas.person,
    seoConfig.schemas.professionalService,
    seoConfig.schemas.localBusiness,
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
