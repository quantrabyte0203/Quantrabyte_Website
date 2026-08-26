import { cn } from "@/lib/utils";

interface IconProps {
  /** Google Material Symbols ligature name, e.g. "arrow_forward". */
  name: string;
  /** Rendered size in px (drives both the glyph size and the reserved box). */
  size?: number;
  /** Use the filled variant of the symbol. */
  fill?: boolean;
  weight?: 200 | 300 | 400 | 500 | 600 | 700;
  className?: string;
}

/**
 * Google Material Symbols (Rounded) icon.
 * The webfont is loaded in index.html; the base class lives in index.css.
 */
const Icon = ({
  name,
  size = 20,
  fill = false,
  weight = 400,
  className,
}: IconProps) => (
  <span
    aria-hidden="true"
    translate="no"
    className={cn("material-symbols-rounded", className)}
    style={{
      fontSize: `${size}px`,
      width: `${size}px`,
      height: `${size}px`,
      // opsz is only defined for 20..48 on Material Symbols
      fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${Math.min(48, Math.max(20, size))}`,
    }}
  >
    {name}
  </span>
);

export default Icon;
