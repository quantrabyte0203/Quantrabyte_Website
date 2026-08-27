import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";
import Eyebrow from "@/components/kit/Eyebrow";
import DotField from "@/components/kit/DotField";
import Reveal from "@/components/kit/Reveal";
import { scrollToSection } from "@/components/kit/scroll";

const stats = [
  { value: "100+", label: "Projects Shipped" },
  { value: "50+", label: "Client Launches" },
  { value: "8+", label: "Years Building" },
  { value: "24h", label: "Response Window" },
];

const Hero = () => (
  <section id="home" className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
    {/* Ambient ground - kept extremely light */}
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute -right-32 -top-24 h-[30rem] w-[30rem] rounded-full bg-lime/12 blur-[120px]" />
      <div className="absolute -left-40 top-40 h-[24rem] w-[24rem] rounded-full bg-lime-soft/30 blur-[110px]" />
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 85% 75% at 55% 40%, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 55% 40%, black 30%, transparent 85%)",
        }}
      >
        <DotField />
      </div>
    </div>

    <Container className="relative z-10">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-6">
        {/* Copy */}
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>AI-Native Product Engineering Studio</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="display-1 mt-6 text-ink">
              Building digital
              <br className="hidden sm:block" /> products that{" "}
              <span className="lime-underline">think ahead.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="lead mt-6 max-w-lg">
              We design and build AI-powered web, mobile and SaaS products that
              solve real business problems - from first scope to a launched,
              scalable system.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="btn btn-primary group h-[3.25rem] px-7 text-[0.95rem]"
              >
                Start a Project
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:translate-x-0.5">
                  <Icon name="arrow_forward" size={15} />
                </span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("#work")}
                className="btn btn-outline group h-[3.25rem] px-7 text-[0.95rem]"
              >
                View Our Work
                <Icon
                  name="arrow_forward"
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </Reveal>

          {/* Proof row */}
          <Reveal delay={0.24}>
            <dl className="card mt-10 grid grid-cols-2 gap-x-4 gap-y-6 p-5 sm:grid-cols-4 sm:gap-x-2 sm:p-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={
                    index > 0
                      ? "sm:border-l sm:border-line sm:pl-5"
                      : undefined
                  }
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-[1.65rem] font-bold leading-none tracking-tight text-lime-ink sm:text-[1.75rem]">
                      {stat.value}
                    </span>
                    <span className="mt-2 block text-[0.78rem] font-medium leading-tight text-ink-soft">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Mascot */}
        <Reveal delay={0.1} className="relative lg:-mt-6">
          <HeroMascot />
        </Reveal>
      </div>
    </Container>
  </section>
);

const HeroMascot = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const node = wrapRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
        // Deliberately tiny - this should register as depth, not movement
        setOffset({
          x: Math.max(-1, Math.min(1, dx)) * 10,
          y: Math.max(-1, Math.min(1, dy)) * 8,
        });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative isolate mx-auto w-full max-w-[30rem] lg:max-w-none">
      {/* Glow + rings behind the character */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/18 blur-[85px] sm:h-[26rem] sm:w-[26rem] lg:h-[30rem] lg:w-[30rem]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line sm:h-[23rem] sm:w-[23rem] lg:h-[27rem] lg:w-[27rem]" />

      {/* Trail the mascot walks along */}
      <svg
        viewBox="0 0 420 300"
        className="pointer-events-none absolute inset-x-0 bottom-2 z-0 w-full"
        aria-hidden="true"
      >
        <path
          d="M18 268 C 120 292, 260 276, 402 196"
          fill="none"
          stroke="#C8F03A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 14"
        />
      </svg>

      <div
        className="animate-sway relative z-10"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <img
          src="/projects_images/new_logo.png"
          alt="Byte, the QuantraByte mascot, walking forward"
          width={680}
          height={640}
          className="mx-auto w-[50%] max-w-[13rem] drop-shadow-[0_30px_44px_rgba(17,19,18,0.18)] sm:w-[50%] lg:w-[72%] lg:max-w-none"
        />
      </div>

      {/* Availability marker - fills the head space above the character */}
      <div className="absolute right-0 top-0 hidden lg:block">
        <span className="flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 shadow-soft">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          <span className="text-[0.8rem] font-medium text-ink">
            Accepting new projects
          </span>
        </span>
      </div>

      {/* Floating capability tags, spread around the character */}
      {[
        {
          label: "AI Agents",
          className: "left-0 top-[20%] sm:flex",
          delay: "0s",
        },
        {
          label: "SaaS Platforms",
          className: "right-0 top-[40%] sm:flex",
          delay: "-3.5s",
        },
        {
          label: "Mobile Apps",
          className: "bottom-[16%] left-[2%] lg:flex",
          delay: "-6s",
        },
        {
          label: "Commerce",
          className: "bottom-[1%] right-[3%] lg:flex",
          delay: "-8.5s",
        },
      ].map((tag) => (
        <span
          key={tag.label}
          className={`animate-float absolute hidden items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-[0.78rem] font-medium text-ink shadow-soft ${tag.className}`}
          style={{ animationDelay: tag.delay }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          {tag.label}
        </span>
      ))}

    </div>
  );
};

export default Hero;
