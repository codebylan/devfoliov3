import { testimonials } from '../../data/testimonials';

const Testimonials = () => {
  if (!Array.isArray(testimonials) || testimonials.length === 0) return null;

  return (
    <section id="testimonials">
      <div className="mb-12">
        <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
          Témoignages
        </p>
        <h2 className="text-4xl sm:text-5xl italic leading-[0.95] max-w-3xl">
          La confiance ne se revendique pas,{' '}
          <span className="text-accent">elle se prouve.</span>
        </h2>
        <p className="text-white/50 mt-4 max-w-2xl">
          Quelques retours de clients avec qui j’ai travaillé sur des produits
          orientés performance et conversion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <figure
            key={`${t.name}-${t.company}`}
            className="bg-white/5 border border-white/10 rounded-sm p-6 flex flex-col gap-5"
          >
            <blockquote className="text-white/70 leading-relaxed">
              “{t.quote}”
            </blockquote>
            <figcaption className="pt-4 border-t border-white/10">
              <p className="text-white font-medium">{t.name}</p>
              <p className="text-white/40 text-sm">
                {t.role}
                {t.company ? ` — ${t.company}` : ''}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
