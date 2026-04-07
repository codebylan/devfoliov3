'use client';

import { Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import logo from '../../../public/images/logo.svg';
import { Button } from '../ui/button';
import WhatsAppLink from '../ui/whatsapp-link';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuPanelRef = useRef(null);

  const mobileMenuId = useMemo(() => 'mobile-menu', []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const panel = mobileMenuPanelRef.current;
    if (!panel) return;

    document.body.style.overflow = 'hidden';

    const focusFirst = () => {
      const focusable = panel.querySelector(
        'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
      );
      if (focusable instanceof HTMLElement) focusable.focus();
    };

    // focus after paint
    const focusTimer = window.setTimeout(focusFirst, 0);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        return;
      }

      if (e.key !== 'Tab') return;

      const focusables = Array.from(
        panel.querySelectorAll(
          'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el instanceof HTMLElement);

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="lg:text-end text-center ">
      <nav className="flex   items-center justify-between relative ">
        <div id="logo">
          <Link href={'/'} className="flex text-sm items-center gap-2 ">
            <Image
              src={logo}
              alt="Dylan Agboton - Développeur Next.js Freelance Paris & Intégrateur IA"
              width={55}
              height={55}
              className=" "
            />
            <span className="hidden sm:inline">Dylan-Agboton.com</span>
          </Link>
        </div>
        <div id="nav-links" className="hidden lg:flex justify-center">
          <ul className="flex gap-5 text-sm" aria-label="Navigation principale">
            <li className="hover:underline">
              <Link href={'/#mystack'}>Expertise</Link>
            </li>
            <li className="hover:underline">
              <Link href={'/#projects'}>Projets</Link>
            </li>

            <li className="hover:underline">
              <Link href={'/#about'}>À propos</Link>
            </li>
            <li className="hover:underline">
              <Link href={'/#prices'}>Tarifs</Link>
            </li>
            <li className="hover:underline">
              <Link href={'/#faq'}>FAQ</Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:block">
          <WhatsAppLink>
            <Button
              asChild
              className="cursor-pointer items-center bg-accent text-black font-semibold text-sm transition-colors"
            >
              <span className="flex items-center gap-2">
                <Phone size={16} />
                Réserver un appel
              </span>
            </Button>
          </WhatsAppLink>
        </div>

        {/* Mobile actions */}
        <div className="lg:hidden flex items-center gap-2">
          <WhatsAppLink>
            <Button
              asChild
              className="cursor-pointer items-center bg-accent text-black font-semibold text-sm transition-colors px-3"
              aria-label="Réserver un appel"
            >
              <span className="flex items-center gap-2">
                <Phone size={16} />
                <span className="hidden sm:inline">Réserver</span>
              </span>
            </Button>
          </WhatsAppLink>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-sm p-2 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileMenuId}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu overlay + panel */}
        {isMobileMenuOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div
              id={mobileMenuId}
              ref={mobileMenuPanelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-[#1a1a1a] border-l border-accent/20 p-6 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Navigation</span>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-sm p-2 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Fermer le menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>

              <ul className="flex flex-col gap-4 text-base" aria-label="Navigation principale">
                <li className="hover:underline">
                  <Link href={'/#mystack'} onClick={() => setIsMobileMenuOpen(false)}>
                    Expertise
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link href={'/#projects'} onClick={() => setIsMobileMenuOpen(false)}>
                    Projets
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link href={'/#about'} onClick={() => setIsMobileMenuOpen(false)}>
                    À propos
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link href={'/#prices'} onClick={() => setIsMobileMenuOpen(false)}>
                    Tarifs
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link href={'/#faq'} onClick={() => setIsMobileMenuOpen(false)}>
                    FAQ
                  </Link>
                </li>
              </ul>

              <div className="mt-auto">
                <WhatsAppLink onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    asChild
                    className="w-full cursor-pointer items-center justify-center bg-accent text-black font-semibold text-sm transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Phone size={16} />
                      Réserver un appel
                    </span>
                  </Button>
                </WhatsAppLink>
              </div>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
