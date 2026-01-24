import Link from 'next/link';

export const metadata = {
  title: 'Mentions légales | Dylan Agboton',
  description: 'Mentions légales du site dylan-agboton.com',
  robots: 'noindex, nofollow',
};

export default function MentionsLegales() {
  return (
    <main className="py-12 sm:py-20">
      {/* Breadcrumb */}
      <p className="text-xs text-white/30 mb-12">
        <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
        <span className="mx-2">/</span>
        <span>Mentions légales</span>
      </p>

      {/* Title */}
      <header className="mb-20">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl italic leading-[0.9] mb-6">
          Mentions<br />
          <span className="text-accent">légales</span>
        </h1>
        <p className="text-white/40 text-sm max-w-md">
          Conformément à la loi n° 2004-575 du 21 juin 2004
          pour la confiance dans l&apos;économie numérique.
        </p>
      </header>

      {/* Content */}
      <article className="max-w-2xl">
        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Éditeur
          </h2>
          <div className="text-white/70 space-y-1 leading-relaxed">
            <p className="text-white text-lg">Dylan Agboton</p>
            <p>Développeur Fullstack & Intégrateur IA</p>
            <p>Entrepreneur Individuel</p>
            <p className="pt-4">
              <a href="mailto:d.agboton.dev@gmail.com" className="text-accent hover:underline">
                d.agboton.dev@gmail.com
              </a>
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Hébergement
          </h2>
          <div className="text-white/70 space-y-1 leading-relaxed">
            <p className="text-white text-lg">Vercel Inc.</p>
            <p>440 N Barranca Ave #4133</p>
            <p>Covina, CA 91723, États-Unis</p>
            <p className="pt-4">
              <a 
                href="https://vercel.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                vercel.com
              </a>
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Propriété intellectuelle
          </h2>
          <div className="text-white/70 leading-relaxed space-y-4">
            <p>
              L&apos;ensemble du contenu de ce site — textes, images, graphismes, 
              logo, code source — est la propriété exclusive de Dylan Agboton.
            </p>
            <p>
              Toute reproduction, distribution ou modification est strictement
              interdite sans accord écrit préalable.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Données personnelles
          </h2>
          <div className="text-white/70 leading-relaxed space-y-4">
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, 
              de rectification et de suppression de vos données.
            </p>
            <p>
              Contact :{' '}
              <a href="mailto:d.agboton.dev@gmail.com" className="text-accent hover:underline">
                d.agboton.dev@gmail.com
              </a>
            </p>
            <p>
              Détails complets dans notre{' '}
              <Link href="/confidentialite" className="text-accent hover:underline">
                politique de confidentialité
              </Link>.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Cookies
          </h2>
          <p className="text-white/70 leading-relaxed">
            Ce site utilise uniquement des cookies techniques essentiels
            et Cloudflare Turnstile pour la protection anti-spam.
            Aucun cookie publicitaire.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Responsabilité
          </h2>
          <p className="text-white/70 leading-relaxed">
            Dylan Agboton ne saurait être tenu responsable des dommages 
            directs ou indirects causés au matériel de l&apos;utilisateur 
            lors de l&apos;accès au site.
          </p>
        </section>
      </article>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-between text-xs text-white/30">
        <p>Mise à jour : Janvier 2026</p>
        <nav className="flex gap-6">
          <Link href="/cgv" className="hover:text-accent transition-colors">CGV</Link>
          <Link href="/confidentialite" className="hover:text-accent transition-colors">Confidentialité</Link>
        </nav>
      </footer>
    </main>
  );
}
