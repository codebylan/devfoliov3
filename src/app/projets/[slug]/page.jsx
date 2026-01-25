import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CTA from '../../../components/sections/CTA';
import { getAllProjectSlugs, getProjectBySlug } from '../../../data/projects';
import { seoConfig } from '../../../data/seo-config';

export const dynamicParams = false;

export const generateStaticParams = async () =>
  getAllProjectSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: { absolute: 'Projet introuvable' },
      robots: { index: false, follow: false },
    };
  }

  const title = project.seo?.title ?? `${project.name} — Case study`;
  const description =
    project.seo?.description ??
    project.valueProposition ??
    seoConfig.site.defaultDescription;
  const ogImage =
    project.seo?.ogImage ?? project.image ?? seoConfig.site.defaultImage;
  const canonicalPath = `/projets/${project.slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonicalPath,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.site.twitterHandle,
      title,
      description,
      images: [ogImage],
      creator: seoConfig.site.twitterHandle,
    },
  };
};

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description:
      project.seo?.description ??
      project.valueProposition ??
      seoConfig.site.defaultDescription,
    url: `${seoConfig.site.url}/projets/${project.slug}`,
    author: {
      '@type': 'Person',
      name: seoConfig.site.name,
      url: seoConfig.site.url,
    },
    about: (project.stack || []).map((t) => ({
      '@type': 'Thing',
      name: t,
    })),
  };

  return (
    <main className="flex flex-col gap-y-14" id="main">
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-white/40">
          <Link
            href="/#projects"
            className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#262626]"
          >
            ← Retour aux projets
          </Link>
          {/* <span className="text-white/30">Case study</span> */}
        </div>

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <p className="text-accent text-xs uppercase tracking-[0.2em]">
                {project.type}
              </p>
              <h1 className="text-4xl sm:text-5xl italic leading-[0.95]">
                {project.name}
              </h1>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-prose">
                {project.valueProposition}
              </p>
            </div>

            {Array.isArray(project.outcomes) && project.outcomes.length > 0 && (
              <div className="border border-white/10 bg-white/5 p-5 space-y-3">
                <p className="text-white/70 text-sm font-medium">
                  Résultats (focus conversion)
                </p>
                <ul className="space-y-2 text-sm text-white/60">
                  {project.outcomes.slice(0, 3).map((outcome) => (
                    <li key={outcome} className="flex gap-2">
                      <span className="text-accent">—</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(project.role) && project.role.length > 0 && (
              <div className="space-y-2">
                <p className="text-white/70 text-sm font-medium">Mon rôle</p>
                <ul className="flex flex-wrap gap-2">
                  {project.role.map((r) => (
                    <li
                      key={r}
                      className="text-xs text-white/70 border border-white/10 bg-white/5 px-3 py-1"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-video overflow-hidden rounded-sm bg-white/5 ring-1 ring-white/10">
              {project.video ? (
                <video
                  src={project.video}
                  controls
                  preload="metadata"
                  playsInline
                  poster={project.image}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={project.image}
                  alt={`${project.name} — ${project.type}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </header>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-10">
          <article className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-2xl italic text-white">Contexte</h2>
              <div className="space-y-2 text-sm text-white/60 leading-relaxed">
                {project.context?.sector && (
                  <p>
                    <span className="text-white/70">Secteur:</span>{' '}
                    {project.context.sector}
                  </p>
                )}
                {project.context?.objective && (
                  <p>
                    <span className="text-white/70">Objectif:</span>{' '}
                    {project.context.objective}
                  </p>
                )}
              </div>
            </section>

            {Array.isArray(project.constraints) &&
              project.constraints.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-2xl italic text-white">Contraintes</h2>
                  <ul className="space-y-2 text-sm text-white/60">
                    {project.constraints.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="text-accent">—</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

            {Array.isArray(project.solution) && project.solution.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-2xl italic text-white">Solution</h2>
                <ul className="space-y-2 text-sm text-white/60">
                  {project.solution.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="text-accent">—</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </div>

        <aside className="lg:col-span-5 space-y-8">
          {Array.isArray(project.stack) && project.stack.length > 0 && (
            <section className="border border-white/10 bg-white/5 p-6 space-y-4">
              <h2 className="text-xl italic text-white">Stack</h2>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <li
                    key={t}
                    className="text-xs text-white/70 border border-white/10 bg-[#1a1a1a] px-3 py-1"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {Array.isArray(project.outcomes) && project.outcomes.length > 0 && (
            <section className="border border-white/10 bg-white/5 p-6 space-y-4">
              <h2 className="text-xl italic text-white">Résultats</h2>
              <ul className="space-y-2 text-sm text-white/60">
                {project.outcomes.map((o) => (
                  <li key={o} className="flex gap-2">
                    <span className="text-accent">—</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </section>

      <CTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
