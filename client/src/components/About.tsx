import {
  Brain,
  Cloud,
  Code2,
  Layers3,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const capabilities = [
  {
    icon: Brain,
    title: "AI-native systems",
    description:
      "From assistant workflows to intelligent automation, we build products that use AI as a real capability, not a label.",
  },
  {
    icon: Code2,
    title: "Frontend precision",
    description:
      "Structured design systems, motion, and responsive engineering that make every screen feel premium on desktop and mobile.",
  },
  {
    icon: Cloud,
    title: "Production delivery",
    description:
      "Deployment pipelines, cloud rollout, and scalable architecture designed to support growth from launch to expansion.",
  },
  {
    icon: Smartphone,
    title: "Cross-platform builds",
    description:
      "A single product vision translated cleanly across web, mobile, and internal operations workflows.",
  },
];

const operatingModel = [
  {
    step: "01",
    title: "Discover",
    description:
      "We map the business goal, define the audience journey, and cut through noise fast.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "We create a coherent visual system, content hierarchy, and interaction model before scale.",
  },
  {
    step: "03",
    title: "Deploy",
    description:
      "We ship production-ready code, refine performance, and keep launch quality high.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="section-kicker fade-in-up">
                <Layers3 className="h-4 w-4" />
                About QuantraByte
              </div>
              <h2 className="mt-6 text-3xl font-semibold text-white fade-in-up sm:text-4xl md:text-6xl">
                High-clarity thinking, sharp interfaces, and dependable build quality.
              </h2>
            </div>
            <p
              className="section-copy max-w-2xl fade-in-up"
              style={{ animationDelay: "0.12s" }}
            >
              We work at the intersection of product strategy, modern frontend
              engineering, and AI-enabled systems so businesses can launch with
              more confidence and more visual impact.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="section-shell rounded-[28px] p-6 sm:p-8 md:rounded-[32px] md:p-10 fade-in-left">
              <div>
                <p className="mono-label text-primary/80">Why teams choose us</p>
                <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                  Strategy, product design, and engineering stay in the same loop.
                </h3>
                <p className="section-copy mt-4">
                  QuantraByte turns complex ideas into systems that look modern,
                  feel fast, and remain maintainable after launch. The goal is
                  not just to ship something attractive. The goal is to ship
                  something useful, scalable, and memorable.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Product-first", value: "Clear positioning before code" },
                    { label: "AI-ready", value: "Automation where it creates leverage" },
                    { label: "Launch-safe", value: "Performance, QA, and polish built in" },
                  ].map((item) => (
                    <div key={item.label} className="glass-card rounded-[22px] p-4 sm:rounded-[24px] sm:p-5">
                      <p className="mono-label text-white/45">{item.label}</p>
                      <p className="mt-3 text-sm leading-7 text-white/70">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 fade-in-right" style={{ animationDelay: "0.14s" }}>
              {capabilities.map((capability, index) => (
                <div
                  key={capability.title}
                  className="section-shell elevated-hover rounded-[24px] p-5 sm:rounded-[28px] sm:p-6"
                  style={{ animationDelay: `${0.2 + index * 0.08}s` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary sm:h-14 sm:w-14">
                    <capability.icon className="h-6 w-6" />
                  </div>
                  <h4 className="mt-5 text-lg font-semibold text-white sm:text-xl">{capability.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-white/65">
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {operatingModel.map((item, index) => (
              <div
                key={item.step}
                className="section-shell elevated-hover rounded-[24px] p-5 sm:rounded-[28px] sm:p-6 fade-in-up"
                style={{ animationDelay: `${0.25 + index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-semibold text-white/15 sm:text-4xl">{item.step}</span>
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <h4 className="mt-6 text-xl font-semibold text-white sm:mt-8 sm:text-2xl">{item.title}</h4>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
