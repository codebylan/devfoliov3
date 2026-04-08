'use client';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left - Brand */}
        <div>
          <Link
            href="/"
            className="text-lg font-medium hover:text-accent transition-colors"
          >
            Dylan Agboton
          </Link>
          <p className="text-white/40 text-sm mt-1">Développeur Web</p>
        </div>

        {/* Center - Nav */}
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/50">
          <Link href="#mystack" className="hover:text-accent transition-colors">
            Expertise
          </Link>
          <Link
            href="#projects"
            className="hover:text-accent transition-colors"
          >
            Projets
          </Link>
          <Link href="#prices" className="hover:text-accent transition-colors">
            Tarifs
          </Link>
          <Link href="#about" className="hover:text-accent transition-colors">
            À propos
          </Link>
          <Link href="#faq" className="hover:text-accent transition-colors">
            FAQ
          </Link>
        </nav>

        {/* Right - Contact */}
        <a
          href="mailto:d.agboton.dev@gmail.com"
          className="text-accent hover:underline text-sm"
        >
          d.agboton.dev@gmail.com
        </a>
      </div>

      {/* Bottom */}
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-white/30">
        <p>© {currentYear} Dylan Agboton</p>
        <div className="flex gap-6">
          <Link
            href="/mentions-legales"
            className="hover:text-white/50 transition-colors"
          >
            Mentions légales
          </Link>
          <Link
            href="/confidentialite"
            className="hover:text-white/50 transition-colors"
          >
            Confidentialité
          </Link>
          <Link href="/cgv" className="hover:text-white/50 transition-colors">
            CGV
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
