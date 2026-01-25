'use client';

import Link from 'next/link';
import { Button } from '../components/ui/button';

export default function GlobalError({ reset }) {
  return (
    <main className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-4xl sm:text-5xl italic leading-tight mb-4">
          Une erreur est survenue.
        </h1>
        <p className="text-white/40 text-sm mb-10">
          Le site a rencontré un problème inattendu. Vous pouvez réessayer ou
          revenir à l’accueil.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => reset()}
            className="bg-accent text-black font-semibold"
          >
            Réessayer
          </Button>
          <Button
            asChild
            className="bg-transparent border border-white/20 text-white hover:border-white/40"
          >
            <Link href="/">Accueil</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
