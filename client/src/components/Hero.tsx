import Icon from "@/components/Icon";

const heroSignals = [
  "Agentic AI",
  "GenAI chatbots",
  "Shopify / WordPress",
  "Electron apps",
];

const heroMetrics = [
  { value: "100+", label: "Products shipped" },
  { value: "24h", label: "Response window" },
  { value: "8+", label: "Years building" },
];

const tickerItems = [
  "Generative AI",
  "AI Agents",
  "RAG Systems",
  "SaaS Platforms",
  "Mobile Apps",
  "Commerce",
  "Cloud Infrastructure",
  "Design Systems",
];

/** How a QuantraByte engagement actually runs, shown as a live console. */
const pipeline = [
  { label: "Discovery & scoping", state: "done", note: "Week 1" },
  { label: "Design system", state: "done", note: "Week 2" },
  { label: "Engineering", state: "active", note: "72%" },
  { label: "Launch & scale", state: "queued", note: "Queued" },
] as const;

const stack = ["React", "TypeScript", "Node", "AI"];

const Hero = () => {
  const scrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36"
    >
      {/* Layered futuristic backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 hero-grid-bg opacity-70" />
        <div className="absolute inset-0 hero-radial" />
        <div
          className="hero-aurora animate-drift h-[26rem] w-[26rem] bg-lime/25"
          style={{ top: "-6rem", left: "-4rem" }}
        />
        <div
          className="hero-aurora animate-drift h-[30rem] w-[30rem] bg-cyan/20"
          style={{ top: "2rem", right: "-6rem", animationDelay: "-6s" }}
        />
        <div
          className="hero-aurora animate-drift h-[24rem] w-[24rem] bg-violet/20"
          style={{ bottom: "-8rem", left: "35%", animationDelay: "-11s" }}
        />
        <div className="hero-perspective-grid" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <div>
            <div className="section-kicker fade-in-up">
              <span className="accent-dot" />
              AI-native product engineering
            </div>

            <h1 className="mt-6 max-w-[19ch] text-[clamp(2.15rem,4.2vw,3.5rem)] font-bold leading-[1.06] tracking-tight text-ink fade-in-up">
              We build <span className="text-gradient">AI-powered</span> digital
              products and next-gen software.
            </h1>

            <p
              className="section-copy mt-5 max-w-xl fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              QuantraByte blends agentic AI, GenAI assistants, premium interface
              design, and production-grade engineering to turn ambitious ideas
              into launch-ready products.
            </p>

            <div
              className="mt-7 flex flex-col gap-3 sm:flex-row fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-primary group px-7 py-3.5 text-sm"
              >
                Start a Project
                <Icon
                  name="arrow_forward"
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => scrollTo("#portfolio")}
                className="btn-ghost group px-7 py-3.5 text-sm"
              >
                View Our Work
                <Icon
                  name="arrow_forward"
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div
              className="mt-7 flex flex-wrap gap-2 fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {heroSignals.map((signal) => (
                <span key={signal} className="badge-chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  {signal}
                </span>
              ))}
            </div>

            <div
              className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6 fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              {heroMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-xs leading-5 text-ink-soft sm:text-sm">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery console */}
          <div
            className="relative fade-in-right hidden lg:block"
            style={{ animationDelay: "0.25s" }}
          >
            <HeroVisual />
          </div>
        </div>

        {/* Capability ticker */}
        <div
          className="ticker-mask mt-12 overflow-hidden border-y border-line py-4 fade-in-up sm:mt-14"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex shrink-0 items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-ink-soft"
              >
                <span className="h-1 w-1 rounded-full bg-cyan" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const stateStyles = {
  done: {
    icon: "check_circle",
    dot: "border-lime/60 bg-lime/20 text-lime",
    note: "text-lime",
  },
  active: {
    icon: "autorenew",
    dot: "border-cyan/60 bg-cyan/20 text-cyan",
    note: "text-cyan",
  },
  queued: {
    icon: "schedule",
    dot: "border-line bg-surface text-ink-dim",
    note: "text-ink-dim",
  },
} as const;

const HeroVisual = () => (
  <div className="relative ml-auto aspect-square w-full max-w-[26rem]">
    {/* Orbital rings */}
    <div className="orbit-ring animate-spin-slow inset-[-5%]" />
    <div className="orbit-ring animate-spin-reverse inset-[7%] border-lime/20" />

    {/* Core glow */}
    <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-3xl" />

    {/* Console */}
    <div className="hud-panel animate-float-slow absolute inset-[8%] flex flex-col rounded-[1.6rem] p-5">
      <div className="hud-scanline rounded-[1.6rem]" />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-lime/40 bg-lime/10">
            <Icon name="rocket_launch" size={15} className="text-lime" />
          </span>
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Delivery pipeline
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-lime">
            Live
          </span>
        </div>
      </div>

      {/* Pipeline stepper */}
      <div className="relative mt-5 flex-1">
        {/* connector rail */}
        <span className="absolute bottom-8 left-[13px] top-6 w-px bg-gradient-to-b from-lime/50 via-cyan/40 to-line" />

        <div className="space-y-2.5">
          {pipeline.map((step) => {
            const s = stateStyles[step.state];
            return (
              <div key={step.label} className="relative flex items-center gap-3">
                <span
                  className={`relative z-10 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full border ${s.dot}`}
                >
                  <Icon name={s.icon} size={14} />
                </span>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-lg border border-line bg-surface/60 px-3 py-2">
                  <span className="truncate text-xs font-medium text-ink">
                    {step.label}
                  </span>
                  <span className={`shrink-0 text-[0.65rem] font-semibold ${s.note}`}>
                    {step.note}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* build progress */}
        <div className="ml-[39px] mt-2.5 h-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-gradient-to-r from-lime to-cyan"
            style={{ width: "72%", animation: "fadeInLeft 1s 0.5s both" }}
          />
        </div>
      </div>

      {/* Stack */}
      <div className="relative mt-4 border-t border-line pt-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-line bg-surface/70 px-2 py-1 text-[0.65rem] font-medium text-ink-soft"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Floating status chips */}
    <div className="hud-panel animate-float absolute -left-5 top-14 rounded-xl px-3.5 py-2.5">
      <div className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-ink-soft">
        Live products
      </div>
      <div className="mt-1 text-sm font-bold text-lime">7</div>
    </div>

    <div
      className="hud-panel animate-float absolute -right-4 bottom-16 rounded-xl px-3.5 py-2.5"
      style={{ animationDelay: "-3s" }}
    >
      <div className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-ink-soft">
        First reply
      </div>
      <div className="mt-1 text-sm font-bold text-cyan">24h</div>
    </div>

    <div className="hud-panel absolute -bottom-3 left-3 rounded-xl px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
        <span className="text-xs font-medium text-ink">Accepting new projects</span>
      </div>
    </div>
  </div>
);

export default Hero;
