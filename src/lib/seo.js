import { seoConfig } from '../data/seo-config';

export const buildPageMetadata = ({
  title,
  description,
  canonicalPath,
  ogImage,
  openGraphType = 'website',
  robots,
}) => {
  const resolvedTitle = title ?? seoConfig.site.defaultTitle;
  const resolvedDescription = description ?? seoConfig.site.defaultDescription;
  const resolvedOgImage = ogImage ?? seoConfig.site.defaultImage;
  const resolvedCanonicalPath = canonicalPath ?? '/';

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: resolvedCanonicalPath,
    },
    openGraph: {
      type: openGraphType,
      title: resolvedTitle,
      description: resolvedDescription,
      url: resolvedCanonicalPath,
      siteName: seoConfig.site.name,
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: seoConfig.site.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.site.twitterHandle,
      creator: seoConfig.site.twitterHandle,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedOgImage],
    },
    ...(robots ? { robots } : {}),
  };
};
