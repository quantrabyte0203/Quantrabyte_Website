import Container from "@/components/kit/Container";
import Reveal from "@/components/kit/Reveal";
import SectionHeading from "@/components/kit/SectionHeading";

const groups = [
  { label: "AI", items: ["Generative AI", "Agents", "RAG", "Assistants"] },
  {
    label: "Web",
    items: ["React", "TypeScript", "Design systems", "Motion UI"],
  },
  { label: "Mobile", items: ["React Native", "iOS", "Android"] },
  { label: "Backend", items: ["Node", "APIs", "Databases"] },
  { label: "Cloud", items: ["Serverless", "Infrastructure", "DevOps"] },
  { label: "Commerce", items: ["Shopify", "Magento", "WordPress"] },
  {
    label: "Automation",
    items: ["Integrations", "Workflows", "Internal tools"],
  },
  { label: "Desktop", items: ["Electron", "SaaS companions"] },
];

const Capabilities = () => (
  <section className="section-y">
    <Container>
      <SectionHeading
        eyebrow="Capabilities"
        title={
          <>
            The stack behind the <span className="lime-underline">work.</span>
          </>
        }
        description="Chosen for fit, not fashion. Here is where our depth actually sits."
      />

      <div className="mt-12 divide-y divide-line border-y border-line lg:mt-14">
        {groups.map((group, index) => (
          <Reveal key={group.label} delay={0.03 * index}>
            <div className="group grid gap-3 py-6 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-8 lg:grid-cols-[14rem_1fr]">
              <h3 className="flex items-center gap-3 text-[1.15rem] font-semibold tracking-tight text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

export default Capabilities;
