import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Icon from "@/components/Icon";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="site-shell relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 hero-grid-bg opacity-60" />
        <div className="hero-aurora animate-drift h-96 w-96 bg-cyan/20" style={{ top: "-6rem", right: "-4rem" }} />
        <div className="hero-aurora animate-drift h-96 w-96 bg-lime/20" style={{ bottom: "-6rem", left: "-4rem", animationDelay: "-8s" }} />
        <div className="hero-perspective-grid" />
      </div>

      <div className="hud-panel relative rounded-2xl px-8 py-12 text-center sm:px-16">
        <div className="hud-scanline rounded-2xl" />
        <p className="mono-label">Signal lost</p>
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-gradient sm:text-7xl">404</h1>
        <p className="mt-4 text-lg text-ink">This route does not exist.</p>
        <p className="mt-2 text-sm text-ink-soft">
          The page you are looking for has moved or was never deployed.
        </p>
        <a href="/" className="btn-primary mt-8 px-6 py-3 text-sm">
          <Icon name="arrow_back" size={18} />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
