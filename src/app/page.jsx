import About from '../components/sections/About';
import ClientLogos from '../components/sections/ClientLogos';
import CTA from '../components/sections/CTA';
import FAQ from '../components/sections/FAQ';
import Hero from '../components/sections/Hero';
import MyStack from '../components/sections/MyStack';
import Prices from '../components/sections/Prices';
import ProblemAndSolution from '../components/sections/ProblemAndSolution';
import Projects from '../components/sections/Projects';
import { faqData } from '../data/faq';
import { seoConfig } from '../data/seo-config';
import { buildPageMetadata } from '../lib/seo';

export const metadata = {
  ...buildPageMetadata({
    title: seoConfig.pages.home.title,
    description: seoConfig.pages.home.description,
    canonicalPath: '/',
    ogImage: seoConfig.pages.home.image,
    openGraphType: seoConfig.pages.home.type,
    robots: { index: true, follow: true },
  }),
  keywords: seoConfig.pages.home.keywords,
};

export default function Home() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <main className="flex flex-col gap-y-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <ProblemAndSolution />
      {/* <Expertise /> */}
      <MyStack />
      <Projects />
      <ClientLogos />
      {/* <Testimonials /> */}
      <About />
      <Prices />
      <FAQ />
      <CTA />
    </main>
  );
}
