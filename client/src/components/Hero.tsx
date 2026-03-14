import {
  ArrowRight,
  Gauge,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

const heroSignals = [
  "Agentic AI",
  "GenAI chatbots",
  "Shopify / WordPress",
  "Electron apps",
];

const heroStats = [
  { number: "100+", label: "Projects shipped" },
  { number: "50+", label: "Client launches" },
  { number: "8+", label: "Years building" },
  { number: "24h", label: "Response window" },
];

const launchSignals = [
  { title: "Discovery", value: "Strategy, IA, scope" },
  { title: "Interface", value: "Premium motion systems" },
  { title: "Delivery", value: "Fast release cadence" },
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
    <section id="home" className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-32 lg:pt-40">
      <div className="absolute inset-x-0 top-0 h-[38rem] hero-gradient opacity-80" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="section-kicker fade-in-up">
              <Sparkles className="h-4 w-4" />
              Future-ready product engineering
            </div>

            <h1 className="mt-6 max-w-4xl text-[clamp(2.95rem,10vw,5.6rem)] font-semibold leading-[0.95] text-white fade-in-up sm:mt-8">
              We design digital products that feel
              <span className="text-gradient"> five years ahead.</span>
            </h1>

            <p
              className="section-copy mt-6 max-w-2xl fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              QuantraByte blends agentic AI, GenAI chatbots, premium interface
              design, commerce-platform delivery, and production-grade
              engineering to turn ambitious ideas into launch-ready products.
            </p>

            <div
              className="mt-8 flex flex-col gap-4 sm:flex-row fade-in-up"
              style={{ animationDelay: "0.25s" }}
            >
              <Button
                size="lg"
                onClick={scrollToContact}
                className="group w-full rounded-full border border-primary/25 bg-[linear-gradient(135deg,#5bf7dd_0%,#2ad4ff_55%,#33cc8c_100%)] px-8 text-base font-semibold text-slate-950 shadow-quantum transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
              >
                Start your project
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={scrollToPortfolio}
                className="group w-full rounded-full border-white/15 bg-white/5 px-8 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <Play className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                Explore projects
              </Button>
            </div>

            <div
              className="mt-8 flex flex-wrap gap-3 fade-in-up"
              style={{ animationDelay: "0.35s" }}
            >
              {heroSignals.map((signal) => (
                <span key={signal} className="badge-chip">
                  {signal}
                </span>
              ))}
            </div>

            <div
              className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 fade-in-up"
              style={{ animationDelay: "0.45s" }}
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="stat-card rounded-[24px] p-5">
                  <div className="text-3xl font-semibold text-white">{stat.number}</div>
                  <div className="mt-2 text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative fade-in-right" style={{ animationDelay: "0.3s" }}>
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />

            <div className="section-shell surface-grid rounded-[28px] p-4 sm:p-6 md:rounded-[34px] md:p-8">
              <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_right,rgba(91,247,221,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(42,212,255,0.14),transparent_35%)] md:rounded-[34px]" />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="mono-label text-primary/75">Launch stack</p>
                    <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                      Design system, product UI, and engineering rollout.
                    </h2>
                  </div>
                  <span className="badge-chip bg-white/10 text-white/80">
                    Realtime
                  </span>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div className="glass-card rounded-[24px] p-4 sm:rounded-[26px] sm:p-5">
                    <div className="flex items-center gap-3 text-white">
                      <Gauge className="h-5 w-5 text-primary" />
                      <span className="font-medium">Performance-led delivery</span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/65">
                      Every build is optimized for speed, clarity, and
                      conversion from the first fold to the final CTA.
                    </p>
                    <div className="mt-6 space-y-3">
                      {launchSignals.map((signal) => (
                        <div
                          key={signal.title}
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                        >
                          <span className="text-sm text-white/75">{signal.title}</span>
                          <span className="text-sm font-medium text-white">{signal.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="glass-card overflow-hidden rounded-[24px] p-4 sm:rounded-[26px] sm:p-5"
                    style={{
                      backgroundImage: `linear-gradient(160deg, rgba(7,17,29,0.2), rgba(7,17,29,0.9)), url(${heroImage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="flex h-full min-h-[17rem] flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="badge-chip bg-white/10 text-white/80">
                          Product pulse
                        </span>
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="mono-label text-white/55">Ship with confidence</p>
                        <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                          Cinematic UI backed by stable systems.
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "AI", value: "Agentic workflows and GenAI assistants" },
                    { label: "Commerce", value: "Shopify, Magento, WordPress, Squarespace" },
                    { label: "Desktop", value: "Electron.js apps and internal tools" },
                  ].map((item) => (
                    <div key={item.label} className="glass-card rounded-[20px] p-4 sm:rounded-[22px]">
                      <p className="mono-label text-white/45">{item.label}</p>
                      <p className="mt-3 text-sm leading-7 text-white/70">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
