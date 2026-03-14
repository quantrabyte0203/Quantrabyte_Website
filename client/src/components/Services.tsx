import {
  AppWindow,
  ArrowRight,
  Brain,
  CandlestickChart,
  Cloud,
  Code2,
  Database,
  Shield,
  Smartphone,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: "Agentic AI, GenAI & Chatbots",
      description:
        "High-priority AI systems built for automation, support, lead capture, workflow execution, and knowledge access.",
      features: [
        "Agentic AI workflows and autonomous task systems",
        "GenAI copilots, assistants, and internal knowledge tools",
        "Customer support chatbots and sales chatbots",
        "RAG pipelines, prompt systems, and API integrations",
      ],
      accent:
        "linear-gradient(135deg, rgba(91, 247, 221, 0.95), rgba(31, 182, 127, 0.55))",
    },

    {
      icon: Code2,
      title: "Web Applications",
      description:
        "Custom web products with strong UX, scale-ready frontend systems, and clean engineering foundations.",
      features: [
        "Single Page Applications (SPA)",
        "Progressive Web Apps (PWA)",
        "Custom dashboards and portal systems",
        "Modern frontend architecture and responsive UI",
      ],
      accent:
        "linear-gradient(135deg, rgba(56, 189, 248, 0.95), rgba(14, 165, 233, 0.55))",
    },

    {
      icon: Smartphone,
      title: "Mobile Applications",
      description:
        "Native and cross-platform mobile apps that deliver exceptional user experiences.",
      features: [
        "iOS and Android native development",
        "React Native and Flutter builds",
        "Mobile UI and UX design systems",
        "App store deployment and optimization",
      ],
      accent:
        "linear-gradient(135deg, rgba(74, 222, 128, 0.95), rgba(14, 116, 144, 0.55))",
    },

    {
      icon: Code2,
      title: "Commerce & CMS Platforms",
      description:
        "Fast delivery for business websites, stores, and content-driven platforms across the ecosystems clients ask for most.",
      features: [
        "Shopify storefronts and custom Shopify experiences",
        "WordPress business sites and content platforms",
        "Magento commerce builds and custom extensions",
        "Squarespace websites and conversion-focused landing pages",
      ],
      accent:
        "linear-gradient(135deg, rgba(36, 198, 255, 0.95), rgba(0, 117, 255, 0.55))",
    },

    {
      icon: Cloud,
      title: "Cloud Integration",
      description:
        "Scalable cloud infrastructure and seamless integration with leading cloud platforms.",
      features: [
        "AWS, Azure, and GCP migration",
        "Serverless architecture and functions",
        "Microservices design and API integration",
        "Cloud monitoring and cost optimization",
      ],
      accent:
        "linear-gradient(135deg, rgba(79, 70, 229, 0.95), rgba(45, 212, 191, 0.5))",
    },

    {
      icon: AppWindow,
      title: "Desktop Applications",
      description:
        "Cross-platform desktop software with modern UI, local capability, and production-ready release flows.",
      features: [
        "Electron.js desktop applications",
        "Windows, macOS, and Linux packaging",
        "Admin dashboards, internal tools, and SaaS companions",
        "Realtime sync, offline workflows, and system integrations",
      ],
      accent:
        "linear-gradient(135deg, rgba(251, 191, 36, 0.95), rgba(249, 115, 22, 0.55))",
    },

    {
      icon: CandlestickChart,
      title: "Blockchain & DeFi Solutions",
      description:
        "Custom blockchain products for trading, automation, wallet experiences, and high-speed DeFi execution flows.",
      features: [
        "Centralized and decentralized crypto exchange platforms",
        "Flashloan arbitrage bot architecture and automation",
        "Wallet integration, swaps, and on-chain transaction flows",
        "Smart contract dashboards, analytics, and admin tooling",
      ],
      accent:
        "linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(42, 212, 255, 0.5))",
    },

    {
      icon: Shield,
      title: "Cybersecurity",
      description:
        "Comprehensive security solutions to protect digital assets and user data.",
      features: [
        "Security audits and risk assessments",
        "Penetration testing and scans",
        "Compliance and privacy support",
        "Realtime threat detection and response",
      ],
      accent:
        "linear-gradient(135deg, rgba(248, 113, 113, 0.95), rgba(225, 29, 72, 0.55))",
    },

    {
      icon: Database,
      title: "IT Outsourcing & Staff Augmentation",
      description:
        "Flexible engagement models to extend your team and accelerate project delivery.",
      features: [
        "Dedicated development teams",
        "Project-based end-to-end delivery",
        "Remote IT support and maintenance",
        "Specialized talent across dev, design, and QA",
      ],
      accent:
        "linear-gradient(135deg, rgba(56, 189, 248, 0.95), rgba(14, 165, 233, 0.55))",
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-kicker mx-auto fade-in-up">
              <Brain className="h-4 w-4" />
              Service stack
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-white fade-in-up sm:text-4xl md:text-6xl">
              Design, build, automate, and scale from one product partner.
            </h2>
            <p
              className="section-copy mx-auto mt-5 max-w-3xl fade-in-up"
              style={{ animationDelay: "0.12s" }}
            >
              Current priority areas include agentic AI, GenAI assistants,
              chatbots, Shopify and WordPress builds, Squarespace and Magento
              delivery, Electron.js desktop apps, and scalable product systems.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="section-shell elevated-hover group rounded-[24px] p-5 fade-in-up sm:rounded-[30px] sm:p-6"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 shadow-glow sm:h-14 sm:w-14"
                    style={{ background: service.accent }}
                  >
                    <service.icon className="h-6 w-6 text-slate-950" />
                  </div>
                  <span className="mono-label text-white/35">0{index + 1}</span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/72"
                    >
                      <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                  <span>Built for modern teams</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </article>
            ))}
          </div>

          <div className="section-shell mt-8 flex flex-col gap-6 rounded-[28px] p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:rounded-[32px] fade-in-up">
            <div>
              <p className="mono-label text-primary/80">
                Custom engagement model
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                Need a lean product squad or a full delivery partner?
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                We can plug into a single sprint, own a complete launch, or act
                as the design and engineering arm behind your product roadmap.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/20 bg-[linear-gradient(135deg,#5bf7dd_0%,#2ad4ff_55%,#33cc8c_100%)] px-6 py-4 font-semibold text-slate-950 transition-transform duration-300 hover:scale-[1.02] md:w-auto"
            >
              Discuss your roadmap
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
