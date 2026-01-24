import About from '../components/sections/About';
import ClientLogos from '../components/sections/ClientLogos';
import CTA from '../components/sections/CTA';
import FAQ from '../components/sections/FAQ';
import Hero from '../components/sections/Hero';
import MyStack from '../components/sections/MyStack';
import Prices from '../components/sections/Prices';
import ProblemAndSolution from '../components/sections/ProblemAndSolution';
import Projects from '../components/sections/Projects';
import Testimonials from '../components/sections/Testimonials';
import { seoConfig } from '../data/seo-config';

export const metadata = {
  title: seoConfig.pages.home.title,
  description: seoConfig.pages.home.description,
  keywords: seoConfig.pages.home.keywords,
  openGraph: {
    title: seoConfig.pages.home.title,
    description: seoConfig.pages.home.description,
    images: [
      {
        url: seoConfig.pages.home.image,
        width: 1200,
        height: 630,
        alt: seoConfig.site.name,
      },
    ],
    type: seoConfig.pages.home.type,
  },
  twitter: {
    title: seoConfig.pages.home.title,
    description: seoConfig.pages.home.description,
    images: [seoConfig.pages.home.image],
  },
};

export default function Home() {
  return (
    <main className="flex flex-col gap-y-20">
      <Hero />
      <ProblemAndSolution />
      {/* <Expertise /> */}
      <MyStack />
      <Projects />
      <ClientLogos />
      <Testimonials />
      <About />
      <Prices />
      <FAQ />
      <CTA />
    </main>
  );
}
