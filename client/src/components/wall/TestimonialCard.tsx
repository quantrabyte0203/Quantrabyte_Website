import Icon from "@/components/Icon";
import StarRating from "@/components/wall/StarRating";
import type { PublicTestimonial } from "@/lib/wallOfFame";
import { cn } from "@/lib/utils";

/** Deterministic initials for the fallback avatar. */
const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";

interface TestimonialCardProps {
  testimonial: PublicTestimonial;
  className?: string;
}

const TestimonialCard = ({ testimonial, className }: TestimonialCardProps) => {
  const topRated = testimonial.rating === 5;
  const meta = [testimonial.role, testimonial.company]
    .filter(Boolean)
    .join(" · ");

  return (
    <figure
      className={cn(
        "card card-lift group relative flex flex-col p-6 sm:p-7",
        topRated && "border-lime/45",
        className,
      )}
    >
      <div className="flex -tems-start justify-between gap-3">
        <Icon
          name="format_quote"
          size={30}
          fill
          className="text-lime-soft transition-colors duration-300 group-hover:text-lime"
        />

        {topRated && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-lime/50 bg-lime px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-ink">
            <Icon name="workspace_premium" size={13} fill />
            Top Rated
          </span>
        )}
      </div>

      <blockquote className="mt-3 flex-1">
        <p className="text-[0.98rem] leading-[1.7] text-ink">
          {testimonial.message}
        </p>
      </blockquote>

      <StarRating value={testimonial.rating} className="mt-5" />

      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-5">
        {testimonial.photoUrl ? (
          <img
            src={testimonial.photoUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-lime/50 ring-offset-2 ring-offset-surface"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-soft text-[0.85rem] font-bold text-ink ring-2 ring-lime/40 ring-offset-2 ring-offset-surface"
          >
            {initialsOf(testimonial.clientName)}
          </span>
        )}

        <span className="min-w-0">
          <span className="block truncate text-[0.95rem] font-semibold text-ink">
            {testimonial.clientName}
          </span>
          {meta && (
            <span className="mt-0.5 block truncate text-[0.82rem] text-ink-soft">
              {meta}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
};

export default TestimonialCard;
