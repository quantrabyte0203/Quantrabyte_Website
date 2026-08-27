import { useState } from "react";
import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";
import Reveal from "@/components/kit/Reveal";
import SectionHeading from "@/components/kit/SectionHeading";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  category: string;
  filterCategory: string;
  /** What the work set out to solve. */
  problem: string;
  /** What we built. */
  solution: string;
  status: string;
  technologies: string[];
  image: string;
  /** Public project URL. Empty for app-store-only or private delivery work. */
  link: string;
  availability?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Averentis",
    category: "Web",
    filterCategory: "Web",
    problem:
      "A services business whose positioning was not landing with the buyers it wanted.",
    solution:
      "A high-trust digital presence that presents the offering clearly and turns visitors into conversations.",
    status: "Live website",
    technologies: ["React", "TypeScript", "Motion UI", "SEO"],
    image: "/projects_images/averentis.png",
    link: "https://averentis.com",
  },
  {
    id: 2,
    title: "MilesCopilot",
    category: "AI",
    filterCategory: "AI",
    problem:
      "Marketing teams losing time to manual research and disconnected tooling.",
    solution:
      "An AI copilot that handles intelligent automation and gives contextual guidance in the flow of work.",
    status: "Live website",
    technologies: ["AI", "React", "TypeScript"],
    image: "/projects_images/miles.png",
    link: "https://milescopilot.com",
  },
  {
    id: 3,
    title: "Sleepable AI",
    category: "AI · Mobile",
    filterCategory: "AI",
    problem:
      "Sleep data that people collect but never turn into anything they can act on.",
    solution:
      "An AI-driven iOS and Android app pairing sleep insight with a calm, premium interface.",
    status: "iOS & Android app",
    technologies: ["AI", "iOS", "Android", "Product Design"],
    image: "/projects_images/sleepable.png",
    link: "",
    availability: "Available on iOS & Android",
  },
  {
    id: 4,
    title: "Calarity - Website",
    category: "Web",
    filterCategory: "Web",
    problem:
      "A clinical AI product that needed to explain itself to a careful, high-stakes audience.",
    solution:
      "A calarity-first presence with crisp hierarchy and polished exploration across every device.",
    status: "Live website",
    technologies: ["Responsive UI", "Product Marketing", "UX Systems"],
    image: "/projects_images/calarity_website.png",
    link: "https://www.calarity.com",
  },
  {
    id: 5,
    title: "Calarity - Web Portal",
    category: "SaaS",
    filterCategory: "SaaS",
    problem:
      "Account management and day-to-day operations spread across disconnected tools.",
    solution:
      "A web portal bringing dashboards, accounts and operational tooling into one intuitive interface.",
    status: "Live portal",
    technologies: ["React", "Dashboards", "SaaS"],
    image: "/projects_images/calarity_portal.png",
    link: "https://calarity.com/login",
  },
  {
    id: 6,
    title: "Calarity - Mobile App",
    category: "Mobile",
    filterCategory: "Mobile",
    problem:
      "Users who needed the product with them, not just at a desk.",
    solution:
      "A cross-platform companion that extends the product with native-feeling performance and polish.",
    status: "iOS & Android app",
    technologies: ["React Native", "Mobile", "UX"],
    image: "/projects_images/calarity_mobile_app.png",
    link: "https://www.calarity.com/download",
  },
  {
    id: 7,
    title: "Grace Ann Upholstery",
    category: "Commerce",
    filterCategory: "Commerce",
    problem:
      "A craft workroom whose work looked far better in person than online.",
    solution:
      "A storefront experience with clean product presentation and conversion-focused flows.",
    status: "Live website",
    technologies: ["Commerce", "Shopify", "Web"],
    image: "/projects_images/grace.png",
    link: "https://www.graceannupholstery.com/",
  },
];

const filters = ["All", "AI", "Web", "Mobile", "SaaS", "Commerce"];

const getDomain = (link: string) => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const Portfolio = () => {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.filterCategory === filter);

  const [lead, ...rest] = filtered;

  return (
    <section id="work" className="section-y bg-surface-soft/60">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Products that launched, and kept{" "}
              <span className="lime-underline">earning their keep.</span>
            </>
          }
          description="Live websites, shipped mobile apps and product platforms across AI, web, SaaS and commerce."
        />

        {/* Filters */}
        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[0.85rem] font-medium transition-all duration-200",
                  filter === f
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {lead && <LeadCase project={lead} />}

        {rest.length > 0 && (
          <div
            className={cn(
              "mt-6 grid auto-rows-fr gap-5",
              rest.length <= 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {rest.map((project, index) => (
              <CaseCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

/** Framed screenshot - the capture is always shown whole. */
const Shot = ({
  project,
  eager = false,
}: {
  project: Project;
  eager?: boolean;
}) => {
  const domain = getDomain(project.link);

  return (
    <div className="overflow-hidden rounded-[1rem] border border-line bg-paper">
      <div className="flex items-center gap-2.5 border-b border-line bg-surface-soft px-3.5 py-2.5">
        <span className="flex shrink-0 gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-lime" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-surface px-2.5 py-1">
          <Icon
            name={domain ? "lock" : "smartphone"}
            size={12}
            className="text-ink-dim"
          />
          <span className="truncate text-[0.7rem] font-medium text-ink-soft">
            {domain || project.status.toLowerCase()}
          </span>
        </span>
      </div>

      <div className="aspect-[22/10] w-full overflow-hidden bg-paper">
        <img
          src={project.image}
          alt={`${project.title} interface`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-contain transition duration-500 group-hover:brightness-[1.02]"
        />
      </div>
    </div>
  );
};

const VisitLine = ({ project }: { project: Project }) => {
  const domain = getDomain(project.link);

  return project.link ? (
    <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-ink">
      {domain}
      <Icon name="arrow_outward" size={15} className="text-lime-ink" />
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-ink-soft">
      <Icon name="phone_iphone" size={15} />
      {project.availability ?? "Link available on request"}
    </span>
  );
};

const linkProps = (project: Project) =>
  project.link
    ? {
        href: project.link,
        target: "_blank" as const,
        rel: "noopener noreferrer" as const,
        "aria-label": `Open ${project.title} in a new tab`,
      }
    : {};

const LeadCase = ({ project }: { project: Project }) => {
  const Wrapper = project.link ? "a" : "div";

  return (
    <Reveal delay={0.1}>
      <Wrapper
        {...linkProps(project)}
        className="card card-lift group mt-6 block overflow-hidden p-4 sm:p-5"
      >
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
          <Shot project={project} eager />

          <div className="flex flex-col justify-center px-1 pb-2 lg:px-4 lg:py-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                {project.category}
              </span>
              <span className="chip">{project.status}</span>
            </div>

            <h3 className="display-2 mt-5 text-[1.85rem] sm:text-[2.15rem]">
              {project.title}
            </h3>

            <dl className="mt-5 space-y-4">
              <div>
                <dt className="overline">Problem</dt>
                <dd className="body-sm mt-1.5">{project.problem}</dd>
              </div>
              <div>
                <dt className="overline">What we built</dt>
                <dd className="body-sm mt-1.5">{project.solution}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span key={tech} className="chip-flat">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
              <VisitLine project={project} />
              <span className="btn-orb h-10 w-10">
                <Icon
                  name={project.link ? "arrow_outward" : "install_mobile"}
                  size={18}
                />
              </span>
            </div>
          </div>
        </div>
      </Wrapper>
    </Reveal>
  );
};

const CaseCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const Wrapper = project.link ? "a" : "div";

  return (
    <Reveal delay={0.05 * (index % 3)} className="h-full">
      <Wrapper
        {...linkProps(project)}
        className="card card-lift group flex h-full flex-col p-4"
      >
        <Shot project={project} />

        <div className="flex flex-1 flex-col px-1 pt-5">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              <span className="overline">{project.category}</span>
            </span>
            <span className="text-[0.72rem] font-medium text-ink-dim">
              {project.status}
            </span>
          </div>

          <h3 className="mt-3 text-[1.2rem] font-semibold tracking-tight text-ink">
            {project.title}
          </h3>
          <p className="body-sm mt-2 flex-1 text-[0.9rem]">{project.solution}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="chip-flat">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
            <VisitLine project={project} />
            <Icon
              name={project.link ? "arrow_outward" : "install_mobile"}
              size={17}
              className="text-ink-dim transition-all duration-300 group-hover:text-ink"
            />
          </div>
        </div>
      </Wrapper>
    </Reveal>
  );
};

export default Portfolio;
