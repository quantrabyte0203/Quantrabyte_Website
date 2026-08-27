import { cn } from "@/lib/utils";

const Eyebrow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span className={cn("eyebrow", className)}>
    <span className="eyebrow-dot" />
    {children}
  </span>
);

export default Eyebrow;
