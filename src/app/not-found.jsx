'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { useBooking } from '../contexts/BookingContext';

export default function NotFound() {
  const { openBookingModal } = useBooking();

  return (
    <main className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        {/* 404 with glitch effect */}
        <h1 className="text-[6rem] sm:text-[10rem] font-light text-accent leading-none mb-4">
          404
        </h1>

        <p className="text-xl sm:text-2xl italic text-white mb-2">
          Oups, mauvaise route.
        </p>
        <p className="text-white/40 text-sm mb-10 max-w-sm mx-auto">
          La page demandée n&apos;existe pas. Mais on peut quand même discuter.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="bg-accent text-black font-semibold">
            <Link href="/" className="flex items-center gap-2">
              <Home size={16} />
              Accueil
            </Link>
          </Button>
          <button
            onClick={openBookingModal}
            className="text-white/50 hover:text-accent text-sm underline underline-offset-4 transition-colors"
          >
            Réserver un appel
          </button>
        </div>
      </div>
    </main>
  );
}
