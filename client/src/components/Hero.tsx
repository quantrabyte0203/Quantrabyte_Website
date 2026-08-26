import { ArrowRight, Sparkles } from "lucide-react";

const heroSignals = [
  "Agentic AI",
  "GenAI chatbots",
  "Shopify / WordPress",
  "Electron apps",
];

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.querySelector("#portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-28 lg:pt-44">
      <div className="absolute inset-0 hero-grid-bg opacity-60" />
      <div className="absolute inset-0 hero-radial" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <div className="section-kicker fade-in-up">
              <span className="accent-dot" />
              AI-native product engineering
            </div>

            <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-ink fade-in-up sm:mt-7">
              We build AI-powered digital products and modern software experiences.
            </h1>

            <p
              className="section-copy mt-6 max-w-xl fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              QuantraByte blends agentic AI, GenAI assistants, premium interface
              design, and production-grade engineering to turn ambitious ideas
              into launch-ready products.
            </p>

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-all duration-300 hover:bg-ink/90"
              >
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={scrollToPortfolio}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:border-ink/20 hover:bg-surface"
              >
                View Our Work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <div
              className="mt-8 flex flex-wrap gap-2 fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {heroSignals.map((signal) => (
                <span key={signal} className="badge-chip">
                  {signal}
                </span>
              ))}
            </div>
          </div>

          {/* Abstract product visual */}
          <div
            className="relative fade-in-right hidden lg:block"
            style={{ animationDelay: "0.25s" }}
          >
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroVisual = () => (
  <div className="relative aspect-square w-full max-w-md ml-auto">
    {/* Outer ring */}
    <div className="absolute inset-0 rounded-[2rem] border border-line bg-white shadow-card" />

    {/* Grid background inside card */}
    <div className="absolute inset-0 rounded-[2rem] surface-grid overflow-hidden" />

    {/* Radial accent */}
    <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-lime/8 blur-3xl" />

    {/* UI fragments */}
    <div className="absolute inset-0 p-8">
      {/* Top bar - mock browser */}
      <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-line" />
          <div className="h-2 w-2 rounded-full bg-line" />
          <div className="h-2 w-2 rounded-full bg-line" />
        </div>
        <div className="ml-2 h-4 flex-1 rounded-md bg-paper" />
      </div>

      {/* Main panel */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {/* Sidebar nav */}
        <div className="space-y-2 rounded-xl border border-line bg-white p-3">
          <div className="h-2 w-full rounded bg-ink/8" />
          <div className="h-2 w-3/4 rounded bg-line" />
          <div className="h-2 w-5/6 rounded bg-line" />
          <div className="mt-3 h-2 w-2/3 rounded bg-lime/40" />
          <div className="h-2 w-1/2 rounded bg-line" />
        </div>

        {/* Content area */}
        <div className="col-span-2 space-y-3">
          <div className="rounded-xl border border-line bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 rounded bg-ink/12" />
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-lime/15">
                <Sparkles className="h-3 w-3 text-ink" />
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-2 w-full rounded bg-line" />
              <div className="h-2 w-4/5 rounded bg-line" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-6 w-16 rounded-md bg-ink" />
              <div className="h-6 w-14 rounded-md border border-line bg-surface" />
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-line bg-white p-3">
              <div className="h-2 w-12 rounded bg-line" />
              <div className="mt-2 h-5 w-16 rounded bg-ink/15" />
              <div className="mt-2 h-1.5 w-full rounded-full bg-surface">
                <div className="h-1.5 w-2/3 rounded-full bg-lime" />
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-3">
              <div className="h-2 w-10 rounded bg-line" />
              <div className="mt-2 h-5 w-14 rounded bg-ink/15" />
              <div className="mt-2 flex items-end gap-1 h-6">
                <div className="w-2 bg-lime/30 rounded-sm" style={{ height: "40%" }} />
                <div className="w-2 bg-lime/50 rounded-sm" style={{ height: "65%" }} />
                <div className="w-2 bg-lime/70 rounded-sm" style={{ height: "50%" }} />
                <div className="w-2 bg-lime rounded-sm" style={{ height: "85%" }} />
                <div className="w-2 bg-lime/60 rounded-sm" style={{ height: "70%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Node connections at bottom */}
      <div className="absolute bottom-8 left-8 right-8">
        <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-lime" />
            <div className="h-2 w-20 rounded bg-ink/12" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-line" />
            <div className="h-1.5 w-1.5 rounded-full bg-line" />
            <div className="h-1.5 w-1.5 rounded-full bg-lime" />
          </div>
        </div>
      </div>
    </div>

    {/* Floating label */}
    <div className="absolute -bottom-4 -left-4 rounded-xl border border-line bg-white px-4 py-2.5 shadow-hover">
      <div className="mono-label text-ink">System live</div>
      <div className="mt-1 flex items-center gap-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
        <span className="text-xs font-medium text-ink-soft">All systems operational</span>
      </div>
    </div>
  </div>
);

export default Hero;
