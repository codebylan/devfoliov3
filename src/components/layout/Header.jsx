'use client';

import { Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/images/logo.svg';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className="lg:text-end text-center ">
      <nav className="flex   items-center justify-between relative ">
        <div id="logo ">
          <Link href={'/'} className="flex text-sm items-center gap-2 ">
            <Image
              src={logo}
              alt="Dylan-Agboton.com"
              width={55}
              height={55}
              className=" "
            />
            <span className="hidden sm:inline">Dylan-Agboton.com</span>
          </Link>
        </div>
        <div id="nav-links" className=" lg:block justify-center flex">
          <ul className="flex gap-5 text-sm">
            <li className="hover:underline">
              <Link href={'#expertise'}>Expertise</Link>
            </li>
            <li className="hover:underline">
              <Link href={'/'}>Projets</Link>
            </li>
            <li className="hover:underline">
              <Link href={'/'}>Tarifs</Link>
            </li>
            <li className="hover:underline">
              <Link href={'/'}>À propos</Link>
            </li>
            <li className="hover:underline">
              <Link href={'/'}>Journal</Link>
            </li>
          </ul>
        </div>
        <div className=" lg:block hidden">
          <Link href={'/'}>
            <Button className={`cursor-pointer items-center bg-black  text-sm`}>
              <Phone />
              Réserver un appel
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
