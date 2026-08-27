import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-24 h-[30rem] w-[30rem] rounded-full bg-lime/20 blur-[110px]" />
        <div className="dot-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_50%_40%,black_5%,transparent_65%)]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <img
            src="/projects_images/new_logo.png"
            alt=""
            className="animate-float mx-auto w-40 drop-shadow-[0_20px_30px_rgba(17,19,18,0.14)]"
          />

          <p className="field-label mt-8">Page not found</p>
          <h1 className="display-1 mt-3 text-[clamp(3rem,10vw,4.5rem)]">
            <span className="lime-underline">404</span>
          </h1>
          <p className="lead mt-5">
            This page has moved, or it was never here. Let's get you back to
            solid ground.
          </p>

          <a href="/" className="btn btn-primary group mt-9 h-[3.25rem] px-7">
            <Icon
              name="arrow_back"
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Home
          </a>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
