'use client';

import { Github, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/images/logo.svg';
import { useBooking } from '../../contexts/BookingContext';

const Footer = () => {
  const { openBookingModal } = useBooking();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: 'Expertise', href: '#mystack' },
      { label: 'Projets', href: '#projects' },
      { label: 'Tarifs', href: '#prices' },
      { label: 'À propos', href: '#about' },
      { label: 'FAQ', href: '#faq' },
    ],
    legal: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/confidentialite' },
      { label: 'CGV', href: '/cgv' },
    ],
    social: [
      { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
      { icon: Github, href: 'https://github.com', label: 'GitHub' },
      { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    ],
  };

  return (
    <footer className="border-t border-white/10 pt-12 pb-8">
      <div className="space-y-12">
        {/* Top Section - Logo + Description + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Image
                src={logo}
                alt="Dylan Agboton"
                width={50}
                height={50}
                className="shrink-0"
              />
              <span className="text-base font-medium">Dylan-Agboton.com</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-md">
              Développeur Fullstack Next.js & Intégrateur IA. Je transforme vos
              ambitions digitales en applications performantes et rentables.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-sm border border-white/10 hover:border-accent/50 flex items-center justify-center transition-all duration-300 hover:bg-accent/10 group"
                    aria-label={social.label}
                  >
                    <Icon
                      size={18}
                      className="text-white/60 group-hover:text-accent transition-colors duration-300"
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-accent mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent transition-colors duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-accent mb-4">Contact</h3>
            <div className="space-y-3">
              <Link
                href="mailto:d.agboton.dev@gmail.com"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-accent transition-colors duration-300 group"
              >
                <div className="w-8 h-8 rounded-sm border border-white/10 group-hover:border-accent/50 flex items-center justify-center transition-all duration-300">
                  <Mail size={16} className="text-white/60 group-hover:text-accent" />
                </div>
                <span>d.agboton.dev@gmail.com</span>
              </Link>
              <button
                onClick={openBookingModal}
                className="flex items-center gap-3 text-sm text-white/60 hover:text-accent transition-colors duration-300 group w-full text-left"
              >
                <div className="w-8 h-8 rounded-sm border border-white/10 group-hover:border-accent/50 flex items-center justify-center transition-all duration-300">
                  <Phone size={16} className="text-white/60 group-hover:text-accent" />
                </div>
                <span>Réserver un appel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom Section - Legal + Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          {/* Copyright */}
          <p>
            © {currentYear} Dylan Agboton. Tous droits réservés.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link, index) => (
              <span key={link.label} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className="hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                </Link>
                {index < footerLinks.legal.length - 1 && (
                  <span className="text-white/20">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
