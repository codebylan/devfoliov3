import Link from 'next/link';
import { buildPageMetadata } from '../../lib/seo';

export const metadata = buildPageMetadata({
  title: 'Confidentialité | Dylan Agboton',
  description:
    'Politique de confidentialité et protection des données personnelles.',
  canonicalPath: '/confidentialite',
  openGraphType: 'article',
  robots: { index: false, follow: false },
});

export default function Confidentialite() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Confidentialité',
        item: '/confidentialite',
      },
    ],
  };

  return (
    <main className="py-12 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Breadcrumb */}
      <p className="text-xs text-white/30 mb-12">
        <Link href="/" className="hover:text-accent transition-colors">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <span>Confidentialité</span>
      </p>

      {/* Title */}
      <header className="mb-20">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl italic leading-[0.9] mb-6">
          Politique de
          <br />
          <span className="text-accent">confidentialité</span>
        </h1>
        <p className="text-white/40 text-sm max-w-md">
          Protection de vos données conformément au RGPD.
        </p>
      </header>

      {/* Content */}
      <article className="max-w-2xl">
        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Responsable
          </h2>
          <p className="text-white/70 leading-relaxed">
            Dylan Agboton est responsable du traitement des données collectées
            sur ce site. Contact :{' '}
            <a
              href="mailto:d.agboton.dev@gmail.com"
              className="text-accent hover:underline"
            >
              d.agboton.dev@gmail.com
            </a>
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Données collectées
          </h2>
          <div className="text-white/70 leading-relaxed space-y-4">
            <p>
              <span className="text-white">Formulaire de réservation</span> —
              nom, email, téléphone (optionnel), message, informations projet.
            </p>
            <p>
              <span className="text-white">Navigation</span> — adresse IP,
              navigateur, pages visitées (cookies techniques uniquement).
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Finalités
          </h2>
          <p className="text-white/70 leading-relaxed">
            Répondre à vos demandes. Planifier les rendez-vous. Établir devis et
            contrats. Envoyer des rappels. Améliorer le site.
            <span className="text-white"> Jamais de revente ni publicité.</span>
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Base légale
          </h2>
          <div className="text-white/70 leading-relaxed space-y-2">
            <p>
              <span className="text-white">Consentement</span> — soumission du
              formulaire
            </p>
            <p>
              <span className="text-white">Contrat</span> — exécution des
              prestations
            </p>
            <p>
              <span className="text-white">Intérêt légitime</span> — sécurité et
              amélioration
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Conservation
          </h2>
          <div className="text-white/70 leading-relaxed space-y-2">
            <p>
              Prospects : <span className="text-white">3 ans</span> après
              dernier contact
            </p>
            <p>
              Clients : <span className="text-white">5 ans</span> après fin de
              relation
            </p>
            <p>
              Cookies : <span className="text-white">13 mois</span> maximum
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Vos droits
          </h2>
          <p className="text-white/70 leading-relaxed">
            Accès, rectification, effacement, portabilité, opposition,
            limitation. Pour exercer ces droits :{' '}
            <a
              href="mailto:d.agboton.dev@gmail.com"
              className="text-accent hover:underline"
            >
              d.agboton.dev@gmail.com
            </a>
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Cookies
          </h2>
          <p className="text-white/70 leading-relaxed">
            Cookies techniques essentiels uniquement. Cloudflare Turnstile pour
            la protection anti-spam. Aucun tracking publicitaire.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Sous-traitants
          </h2>
          <div className="text-white/70 leading-relaxed space-y-2">
            <p>
              Vercel <span className="text-white/40">— hébergement</span>
            </p>
            <p>
              Supabase <span className="text-white/40">— base de données</span>
            </p>
            <p>
              Resend{' '}
              <span className="text-white/40">— emails transactionnels</span>
            </p>
          </div>
          <p className="text-white/40 text-sm mt-4">
            Transferts encadrés par clauses contractuelles types UE.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            Réclamation
          </h2>
          <p className="text-white/70 leading-relaxed">
            En cas de non-respect du RGPD, réclamation possible auprès de la{' '}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              CNIL
            </a>
            .
          </p>
        </section>
      </article>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-between text-xs text-white/30">
        <p>Mise à jour : Janvier 2026</p>
        <nav className="flex gap-6">
          <Link
            href="/mentions-legales"
            className="hover:text-accent transition-colors"
          >
            Mentions légales
          </Link>
          <Link href="/cgv" className="hover:text-accent transition-colors">
            CGV
          </Link>
        </nav>
      </footer>
    </main>
  );
}
