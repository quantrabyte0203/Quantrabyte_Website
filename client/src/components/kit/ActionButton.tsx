import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ink" | "outline";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.82rem]",
  md: "h-11 px-5",
  lg: "h-[3.25rem] px-7 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  ink: "btn-ink",
  outline: "btn-outline",
};

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Material Symbols name rendered after the label. */
  icon?: string;
  /** Render as an anchor instead of a button. */
  href?: string;
  external?: boolean;
}

const ActionButton = ({
  variant = "primary",
  size = "md",
  icon,
  href,
  external,
  className,
  children,
  ...props
}: ActionButtonProps) => {
  const classes = cn("btn group", variants[variant], sizes[size], className);

  const content = (
    <>
      {children}
      {icon && (
        <Icon
          name={icon}
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
};

export default ActionButton;
