import Eyebrow from "@/components/kit/Eyebrow";
import Reveal from "@/components/kit/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Rendered on the right on desktop - usually a link or button. */
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeadingProps) => {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered
          ? "items-center text-center"
          : action
            ? "md:flex-row md:items-end md:justify-between md:gap-10"
            : "",
        className,
      )}
    >
      <Reveal className={cn(centered ? "max-w-2xl" : "max-w-2xl")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className={cn("display-2", eyebrow ? "mt-5" : "")}>{title}</h2>
        {description && (
          <p className={cn("lead mt-4", centered && "mx-auto")}>{description}</p>
        )}
      </Reveal>

      {action && (
        <Reveal delay={0.08} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;
