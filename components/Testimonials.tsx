import { testimonials } from "@/content/site";

/**
 * Renders nothing while content/site.ts has no testimonials — no fake
 * reviews. Add real, permissioned quotes to light this section up.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2
          id="testimonials-heading"
          className="text-center font-heading text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
        >
          What Clients Say
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.quote}
              className="rounded-lg border border-steel-200 bg-white p-6 shadow-sm"
            >
              <blockquote className="text-steel-700">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-navy-900">
                {t.author}
                {t.location && (
                  <span className="font-normal text-steel-500"> — {t.location}</span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
