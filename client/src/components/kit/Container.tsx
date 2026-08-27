import { cn } from "@/lib/utils";

/** Single source of truth for horizontal rhythm across every section. */
const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("mx-auto w-full max-w-container px-5 sm:px-7 lg:px-8", className)}>
    {children}
  </div>
);

export default Container;
