import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";
import Reveal from "@/components/kit/Reveal";
import SectionHeading from "@/components/kit/SectionHeading";
import { scrollToSection } from "@/components/kit/scroll";

/** Primary offering - unchanged from the existing service stack. */
const services = [
  {
    icon: "neurology",
    title: "AI Products",
    description:
      "AI as a real capability, not a label. Agents, assistants and retrieval systems that do actual work.",
    items: ["Generative AI", "AI Agents", "RAG systems", "AI automation"],
    featured: true,
  },
  {
    icon: "deployed_code",
    title: "Digital Products",
    description:
      "Product engineering across every surface, from first release to a platform teams depend on.",
    items: ["SaaS", "Web applications", "Dashboards", "Internal tools"],
  },
  {
    icon: "storefront",
    title: "Commerce & Platforms",
    description:
      "Fast, dependable delivery on the ecosystems clients ask for most, with clean custom work where it counts.",
    items: ["Shopify", "Magento", "WordPress", "Custom commerce"],
  },
  {
    icon: "smartphone",
    title: "Mobile Applications",
    description:
      "Native and cross-platform apps with the performance and polish of a product, not a port.",
    items: ["iOS", "Android", "React Native", "App UX"],
  },
  {
    icon: "cloud",
    title: "Cloud & Integrations",
    description:
      "Scalable infrastructure, serverless workloads and the API plumbing that keeps systems talking.",
    items: ["Serverless", "APIs", "Automation", "DevOps"],
  },
  {
    icon: "groups",
    title: "Staff Augmentation",
    description:
      "Dedicated engineers or a full squad, plugged into your roadmap for end-to-end delivery.",
    items: ["Dedicated teams", "Project delivery", "Product engineering"],
  },
];

const Services = () => (
  <section id="services" className="section-y">
    <Container>
      <SectionHeading
        eyebrow="What we do"
        title={
          <>
            Design, build, automate and{" "}
            <span className="lime-underline">scale</span> - from one partner.
          </>
        }
        description="We are a product engineering studio, not a list of technologies. Six capability areas that cover a product from first scope to long-term growth."
        action={
          <button
            type="button"
            onClick={() => scrollToSection("#contact")}
            className="btn btn-outline group h-11 pl-5 pr-1.5"
          >
            Discuss your roadmap
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-300 group-hover:translate-x-0.5">
              <Icon name="arrow_forward" size={16} />
            </span>
          </button>
        }
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal
            key={service.title}
            delay={0.05 * (index % 3)}
            as="article"
            className="h-full"
          >
            <div
              className={`card card-lift group flex h-full flex-col p-6 sm:p-7 ${
                service.featured ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-[0.9rem] bg-lime-soft text-ink transition-colors duration-300 group-hover:bg-lime">
                <Icon name={service.icon} size={24} />
              </span>

              <h3 className="display-3 mt-6">{service.title}</h3>
              <p className="body-sm mt-3 flex-1">{service.description}</p>

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                {service.items.map((item) => (
                  <span key={item} className="chip-flat">
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

export default Services;
