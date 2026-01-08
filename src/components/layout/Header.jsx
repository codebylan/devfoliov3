'use client';

import { Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import logo from '../../../public/images/logo.svg';
import { Button } from '../ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="flex items-center justify-between relative ">
        <div id="logo">
          <Link href={'/'} className="flex text-sm items-center gap-2 ">
            <Image src={logo} alt="Dylan-Agboton.com" width={55} height={55} />
            <span className="hidden sm:inline">Dylan-Agboton.com</span>
          </Link>
        </div>

        <div id="nav-links" className="hidden lg:block">
          <ul className="flex gap-5 text-sm">
            <li className="hover:underline">
              <Link href={'/'}>Projets</Link>
            </li>
            <li className="hover:underline">
              <Link href={'/'}>Expertise</Link>
            </li>
            <li className="hover:underline">
              <Link href={'/'}>À propos</Link>
            </li>
            <li className="hover:underline">
              <Link href={'/'}>Journal</Link>
            </li>
          </ul>
        </div>

        <div id="btn" className="hidden lg:block">
          <Button className={`cursor-pointer items-center bg-black text-sm`}>
            <Phone />
            Réserver un appel
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full text-center left-0 right-0 bg-[#262626] border border-[#C8B792] rounded-md lg:hidden z-50">
            <div className="flex flex-col p-4 gap-4">
              <ul className="flex flex-col gap-4 text-sm">
                <li className="hover:underline">
                  <Link href={'/'} onClick={() => setIsMenuOpen(false)}>
                    Projets
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link href={'/'} onClick={() => setIsMenuOpen(false)}>
                    Expertise
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link href={'/'} onClick={() => setIsMenuOpen(false)}>
                    À propos
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link href={'/'} onClick={() => setIsMenuOpen(false)}>
                    Journal
                  </Link>
                </li>
              </ul>
              <div id="btn">
                <Button
                  className={`cursor-pointer items-center text-sm w-full bg-black justify-center`}
                >
                  <Phone />
                  Réserver un appel
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
