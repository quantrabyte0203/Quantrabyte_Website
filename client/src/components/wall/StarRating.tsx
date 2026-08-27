import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  size?: number;
  className?: string;
  /** Renders an interactive picker instead of a static display. */
  onChange?: (value: number) => void;
}

const LABELS = ["Poor", "Fair", "Good", "Great", "Excellent"];

const StarRating = ({ value, size = 18, className, onChange }: StarRatingProps) => {
  const interactive = typeof onChange === "function";

  if (!interactive) {
    return (
      <span
        className={cn("inline-flex items-center gap-0.5", className)}
        role="img"
        aria-label={`${value} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="star"
            size={size}
            fill={star <= value}
            className={star <= value ? "text-lime-ink" : "text-line-strong"}
          />
        ))}
      </span>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div
        className="flex items-center gap-0.5"
        role="radiogroup"
        aria-label="Rating out of 5"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? "s" : ""} - ${LABELS[star - 1]}`}
            onClick={() => onChange(star)}
            className="group rounded-md p-1 transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            <Icon
              name="star"
              size={size}
              fill={star <= value}
              className={cn(
                "transition-colors duration-200",
                star <= value
                  ? "text-lime-ink"
                  : "text-line-strong group-hover:text-ink-dim",
              )}
            />
          </button>
        ))}
      </div>

      {value > 0 && (
        <span className="ml-1.5 text-[0.82rem] font-medium text-ink-soft">
          {LABELS[value - 1]}
        </span>
      )}
    </div>
  );
};

export default StarRating;
