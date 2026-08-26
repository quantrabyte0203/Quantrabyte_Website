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
      className="relative overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-44"
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
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <div className="section-kicker fade-in-up">
              <span className="accent-dot" />
              AI-native product engineering
            </div>

            <h1 className="mt-7 text-[clamp(2.4rem,6vw,4.4rem)] font-bold leading-[1.03] tracking-tight text-ink fade-in-up">
              We build{" "}
              <span className="text-gradient">AI-powered</span> digital products
              and next-gen software experiences.
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
              className="mt-9 flex flex-col gap-3 sm:flex-row fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-primary group px-7 py-3.5 text-sm"
              >
                Start a Project
                <Icon name="arrow_forward" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo("#portfolio")}
                className="btn-ghost group px-7 py-3.5 text-sm"
              >
                View Our Work
                <Icon name="arrow_forward" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <div
              className="mt-8 flex flex-wrap gap-2 fade-in-up"
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
              className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-7 fade-in-up"
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

          {/* Holographic console */}
          <div
            className="relative fade-in-right hidden lg:block"
            style={{ animationDelay: "0.25s" }}
          >
            <HeroVisual />
          </div>
        </div>

        {/* Capability ticker */}
        <div
          className="ticker-mask mt-16 overflow-hidden border-y border-line py-4 fade-in-up sm:mt-20"
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

const HeroVisual = () => (
  <div className="relative ml-auto aspect-square w-full max-w-md">
    {/* Orbital rings */}
    <div className="orbit-ring animate-spin-slow inset-[-6%]" />
    <div className="orbit-ring animate-spin-reverse inset-[6%] border-lime/20" />

    {/* Core glow */}
    <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-3xl" />

    {/* Main console */}
    <div className="hud-panel animate-float-slow absolute inset-[10%] rounded-[1.75rem] p-6">
      <div className="hud-scanline rounded-[1.75rem]" />

      {/* Console header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-lime/40 bg-lime/10">
            <Icon name="memory" size={15} className="text-lime" />
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-ink-soft">
            Agent core
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-lime">
            Live
          </span>
        </div>
      </div>

      {/* Pipeline nodes */}
      <div className="relative mt-6 space-y-2.5">
        {[
          { label: "Intent parsed", value: "100%", width: "100%" },
          { label: "Context retrieved", value: "94%", width: "94%" },
          { label: "Actions executed", value: "78%", width: "78%" },
        ].map((row, index) => (
          <div
            key={row.label}
            className="rounded-xl border border-line bg-surface/70 px-3.5 py-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-ink">{row.label}</span>
              <span className="text-[0.65rem] font-semibold text-cyan">
                {row.value}
              </span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-gradient-to-r from-lime to-cyan"
                style={{
                  width: row.width,
                  animation: `fadeInLeft 1s ${0.4 + index * 0.2}s both`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Neural link graph */}
      <div className="relative mt-4 overflow-hidden rounded-xl border border-line bg-surface/60 p-3">
        <svg viewBox="0 0 240 78" className="h-[4.5rem] w-full" role="presentation">
          <defs>
            <linearGradient id="heroLink" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#B8E63E" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#45E6FF" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {[
            "M14 39 C 60 8, 84 8, 120 39",
            "M14 39 C 60 70, 84 70, 120 39",
            "M120 39 C 160 12, 190 12, 226 39",
            "M120 39 C 160 66, 190 66, 226 39",
          ].map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="url(#heroLink)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              opacity="0.75"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="60"
                to="0"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </path>
          ))}
          {[
            [14, 39, 4.5],
            [120, 39, 7],
            [226, 39, 4.5],
          ].map(([cx, cy, r]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="#05070F"
              stroke="#B8E63E"
              strokeWidth="1.4"
            />
          ))}
        </svg>
      </div>

      {/* Output row */}
      <div className="relative mt-4 flex items-center justify-between rounded-xl border border-lime/25 bg-lime/[0.07] px-3.5 py-3">
        <div className="flex items-center gap-2">
          <Icon name="auto_awesome" size={15} className="text-lime" />
          <span className="text-xs font-medium text-ink">Shipping to production</span>
        </div>
        <Icon name="bolt" size={15} fill className="text-cyan" />
      </div>
    </div>

    {/* Floating status chips */}
    <div className="hud-panel animate-float absolute -left-6 top-16 rounded-xl px-3.5 py-2.5">
      <div className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-soft">
        Uptime
      </div>
      <div className="mt-1 text-sm font-bold text-lime">99.98%</div>
    </div>

    <div
      className="hud-panel animate-float absolute -right-4 bottom-20 rounded-xl px-3.5 py-2.5"
      style={{ animationDelay: "-3s" }}
    >
      <div className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-soft">
        Latency
      </div>
      <div className="mt-1 text-sm font-bold text-cyan">42ms</div>
    </div>

    <div className="hud-panel absolute -bottom-2 left-2 rounded-xl px-4 py-2.5">
      <div className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-soft">
        System live
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
        <span className="text-xs font-medium text-ink">All systems operational</span>
      </div>
    </div>
  </div>
);

export default Hero;
