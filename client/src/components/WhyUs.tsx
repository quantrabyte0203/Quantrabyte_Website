import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";
import Reveal from "@/components/kit/Reveal";
import SectionHeading from "@/components/kit/SectionHeading";

const pillars = [
  {
    icon: "target",
    title: "Product thinking first",
    description:
      "Clear positioning before code. We start at the business goal and work backward to the interface.",
  },
  {
    icon: "neurology",
    title: "AI-native engineering",
    description:
      "Automation and intelligence where they create real leverage, not bolted on after launch.",
  },
  {
    icon: "conveyor_belt",
    title: "End-to-end ownership",
    description:
      "Strategy, design, engineering and deployment stay in one loop from kickoff to launch.",
  },
  {
    icon: "architecture",
    title: "Scalable architecture",
    description:
      "Systems built to survive their own success, on foundations you can keep extending.",
  },
  {
    icon: "handshake",
    title: "Founder-led accountability",
    description:
      "Direct communication and fast decisions. One person owns the outcome start to finish.",
  },
  {
    icon: "trending_up",
    title: "Long-term partnership",
    description:
      "We stay after launch, supporting growth, iteration and expansion as the product evolves.",
  },
];

const WhyUs = () => (
  <section id="why-us" className="section-y">
    <Container>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Why QuantraByte"
            title={
              <>
                High-clarity thinking, and build quality you can{" "}
                <span className="lime-underline">depend on.</span>
              </>
            }
            description="We work where product strategy, modern frontend engineering and AI-enabled systems meet - so businesses launch with more confidence and more impact."
          />

          <Reveal delay={0.12}>
            <div className="card-ink mt-8 p-6 sm:p-7">
              <Icon name="format_quote" size={28} className="text-lime" />
              <p className="mt-4 text-[1.05rem] leading-relaxed text-paper/90">
                We stay intentionally lean, so decisions are fast, communication
                is direct, and execution quality stays visible at every stage of
                the build.
              </p>
              <p className="mt-5 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-paper/50">
                How we work
              </p>
            </div>
          </Reveal>
        </div>

        {/* Pillars */}
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={0.05 * (index % 2)} className="h-full">
              <div className="card card-lift group flex h-full flex-col p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-line bg-surface-soft text-ink transition-colors duration-300 group-hover:border-lime group-hover:bg-lime">
                  <Icon name={pillar.icon} size={20} />
                </span>
                <h3 className="mt-5 text-[1.05rem] font-semibold tracking-tight text-ink">
                  {pillar.title}
                </h3>
                <p className="body-sm mt-2.5 text-[0.9rem]">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

export default WhyUs;
