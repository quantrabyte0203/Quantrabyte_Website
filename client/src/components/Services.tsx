import Icon from "@/components/Icon";

const serviceGroups = [
  {
    title: "AI Products",
    icon: "neurology",
    description: "AI as a real capability, not a label.",
    items: [
      "Generative AI",
      "AI Agents",
      "RAG systems",
      "AI assistants",
      "AI automation",
      "AI integrations",
    ],
  },
  {
    title: "Digital Products",
    icon: "code_blocks",
    description: "Product engineering across every surface.",
    items: [
      "SaaS",
      "Web applications",
      "Mobile applications",
      "Dashboards",
      "Internal tools",
      "Product engineering",
    ],
  },
  {
    title: "Commerce & Platforms",
    icon: "language",
    description: "Fast delivery across the ecosystems clients ask for most.",
    items: [
      "Shopify",
      "Magento",
      "WordPress",
      "Squarespace",
      "Custom commerce",
      "Integrations",
    ],
  },
];

const additionalCapabilities = [
  {
    icon: "smartphone",
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps with exceptional UX.",
  },
  {
    icon: "cloud",
    title: "Cloud Integration",
    description: "Scalable infrastructure, serverless, and API integration.",
  },
  {
    icon: "web_asset",
    title: "Desktop Applications",
    description: "Electron.js apps, internal tools, and SaaS companions.",
  },
  {
    icon: "groups",
    title: "Staff Augmentation",
    description: "Dedicated teams and project-based end-to-end delivery.",
  },
];

const Services = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="section-kicker fade-in-up">
            <span className="accent-dot" />
            Service stack
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-ink fade-in-up sm:text-4xl lg:text-5xl">
            Design, build, automate, and scale from one product partner.
          </h2>
          <p
            className="section-copy mt-5 fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            We are a product engineering studio, not just a list of technologies.
            Three primary capability areas, with additional support where needed.
          </p>
        </div>

        {/* Primary capability groups */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {serviceGroups.map((group, index) => (
            <div
              key={group.title}
              className="section-shell elevated-hover rounded-2xl p-6 sm:p-8 fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-lime/30 bg-lime/10 text-lime">
                <Icon name={group.icon} size={22} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink">{group.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{group.description}</p>
              <ul className="mt-6 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ink">
                    <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-lime" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional capabilities */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {additionalCapabilities.map((cap, index) => (
            <div
              key={cap.title}
              className="surface-soft elevated-hover rounded-xl p-5 fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.08}s` }}
            >
              <Icon name={cap.icon} size={22} className="text-cyan" />
              <h4 className="mt-4 text-sm font-semibold text-ink">{cap.title}</h4>
              <p className="mt-2 text-xs leading-5 text-ink-soft">{cap.description}</p>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div
          className="section-shell mt-8 flex flex-col gap-5 overflow-hidden rounded-2xl p-6 sm:p-8 md:flex-row md:items-center md:justify-between fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="max-w-xl">
            <h3 className="text-xl font-semibold text-ink sm:text-2xl">
              Need a lean product squad or a full delivery partner?
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              We can plug into a single sprint, own a complete launch, or act as
              the design and engineering arm behind your product roadmap.
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToContact}
            className="btn-primary group shrink-0 px-6 py-3.5 text-sm"
          >
            Discuss your roadmap
            <Icon name="arrow_forward" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
