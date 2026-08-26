import { ArrowRight } from "lucide-react";

const CTA = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-ink px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24 fade-in-up">
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Accent glow */}
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-lime/10 blur-3xl" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-paper sm:text-4xl lg:text-5xl">
              Have a product in mind?
            </h2>
            <p className="mt-4 text-lg text-paper/70">
              Let's turn the idea into something real.
            </p>
            <p className="mt-3 text-sm text-paper/50">
              AI products · SaaS · Web · Mobile · Commerce
            </p>

            <button
              type="button"
              onClick={scrollToContact}
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-lime px-8 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:bg-lime-bright"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
