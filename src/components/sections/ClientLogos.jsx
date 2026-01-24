import Image from 'next/image';
import { clientLogos } from '../../data/client-logos';

const ClientLogos = () => {
  if (!Array.isArray(clientLogos) || clientLogos.length === 0) return null;

  return (
    <section id="clients">
      <div className="mb-10">
        <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
          Confiance
        </p>
        <h2 className="text-4xl sm:text-5xl italic leading-[0.95]">
          Ils me font <span className="text-accent">confiance</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
        {clientLogos.map((logo) => {
          const LogoImage = (
            <div className="h-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm px-4">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={64}
                className="max-h-8 w-auto opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              />
            </div>
          );

          return (
            <div key={logo.alt} className="flex">
              {logo.href ? (
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  aria-label={logo.alt}
                >
                  {LogoImage}
                </a>
              ) : (
                LogoImage
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ClientLogos;
