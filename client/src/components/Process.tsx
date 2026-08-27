import Container from "@/components/kit/Container";
import Reveal from "@/components/kit/Reveal";
import SectionHeading from "@/components/kit/SectionHeading";

const steps = [
  {
    no: "01",
    title: "Discover",
    description:
      "Understand the business goal, the users and the constraints that actually matter.",
  },
  {
    no: "02",
    title: "Define",
    description:
      "Agree the scope, the delivery model and what a successful launch looks like.",
  },
  {
    no: "03",
    title: "Design",
    description:
      "Shape the product surface - flows, hierarchy and a design system that scales.",
  },
  {
    no: "04",
    title: "Build",
    description:
      "Engineer it properly, in tight loops, with quality visible at every stage.",
  },
  {
    no: "05",
    title: "Launch",
    description:
      "Ship to production with the infrastructure and monitoring to stand behind it.",
  },
  {
    no: "06",
    title: "Improve",
    description: "Iterate on real usage - growth, expansion and the next release.",
  },
];

const Process = () => (
  <section id="process" className="section-y bg-surface-soft/60">
    <Container>
      <SectionHeading
        align="center"
        eyebrow="How we deliver"
        title={
          <>
            A process built for <span className="lime-underline">shipping.</span>
          </>
        }
        description="Six stages, no ceremony for its own sake. Every engagement runs on the same spine."
      />

      <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal
            key={step.no}
            as="li"
            delay={0.04 * index}
            className="group bg-paper transition-colors duration-300 hover:bg-surface"
          >
            <div className="flex h-full flex-col p-7 lg:p-8">
              <div className="flex items-center gap-3">
                <span className="text-[0.95rem] font-bold tracking-tight text-lime-ink">
                  {step.no}
                </span>
                <span className="h-px flex-1 bg-line transition-colors duration-300 group-hover:bg-lime" />
              </div>
              <h3 className="mt-5 text-[1.25rem] font-semibold tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="body-sm mt-2.5 text-[0.9rem]">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Container>
  </section>
);

export default Process;
