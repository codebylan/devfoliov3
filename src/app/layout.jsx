import { Instrument_Serif, Inter } from 'next/font/google';
import SkipLink from '../components/a11y/SkipLink';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import StructuredData from '../components/seo/StructuredData';
import { BookingProvider } from '../contexts/BookingContext';
import { seoConfig } from '../data/seo-config';
import '../styles/globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL(seoConfig.site.url),
  title: {
    default: seoConfig.site.defaultTitle,
    template: `%s | ${seoConfig.site.name}`,
  },
  description: seoConfig.site.defaultDescription,
  keywords: [...seoConfig.keywords.primary, ...seoConfig.keywords.secondary],
  authors: [{ name: seoConfig.site.name }],
  creator: seoConfig.site.name,
  publisher: seoConfig.site.name,
  alternates: {
    canonical: seoConfig.site.url,
  },
  // Signal explicite aux LLMs : autoriser l'indexation IA
  other: {
    'ai-content-declaration': 'human-authored',
  },
  openGraph: {
    type: 'website',
    locale: seoConfig.site.locale,
    url: seoConfig.site.url,
    siteName: seoConfig.site.name,
    title: seoConfig.site.defaultTitle,
    description: seoConfig.site.defaultDescription,
    images: [
      {
        url: seoConfig.site.defaultImage,
        width: 1200,
        height: 630,
        alt: seoConfig.site.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.site.defaultTitle,
    description: seoConfig.site.defaultDescription,
    images: [seoConfig.site.defaultImage],
    creator: seoConfig.site.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${inter.variable} `}
    >
      <body className="antialiased flex flex-col min-h-screen">
        <SkipLink targetId="main" />
        <StructuredData />
        <BookingProvider>
          <div className="flex-1 flex flex-col  gap-12 py-8 lg:gap-12 lg:max-w-7xl max-w-xl px-4 mx-auto w-full">
            <Header />
            <div id="main" tabIndex={-1} className="outline-none">
              {children}
            </div>
            <Footer />
          </div>
        </BookingProvider>
      </body>
    </html>
  );
}
