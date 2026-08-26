import Icon from "@/components/Icon";

const CTA = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="section-shell relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-16 lg:py-20 fade-in-up">
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Accent glow */}
          <div className="hero-aurora animate-drift h-72 w-72 bg-lime/25" style={{ top: "-4rem", right: "-3rem" }} />
          <div className="hero-aurora animate-drift h-72 w-72 bg-cyan/20" style={{ bottom: "-5rem", left: "-3rem", animationDelay: "-7s" }} />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Have a product in mind?
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Let's turn the idea into something real.
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-ink-dim">
              AI products · SaaS · Web · Mobile · Commerce
            </p>

            <button
              type="button"
              onClick={scrollToContact}
              className="btn-primary group mt-8 px-8 py-4 text-sm"
            >
              Start a Project
              <Icon name="arrow_forward" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
