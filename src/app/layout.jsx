import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Instrument_Serif, Inter } from 'next/font/google';
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
  title: 'Dylan Agboton | Développeur Fullstack & Intégrateur IA',
  description:
    'Développeur Web (React/Node.js) avec une vision business. Je crée des applications rapides et des automatisations IA pour booster la croissance des PME.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${instrumentSerif.variable} ${inter.variable} `}
    >
      <body className="antialiased flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col  gap-12 py-8 lg:gap-12 lg:max-w-7xl max-w-xl px-4 mx-auto w-full">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
