import { useState } from "react";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  category: string;
  filterCategory: string;
  description: string;
  status: string;
  technologies: string[];
  /** Screenshot in /public/projects_images (2.2:1 capture). */
  image: string;
  /** Public project URL. Empty for app-store-only or private delivery work. */
  link: string;
  /** Shown instead of a domain when there is no public web URL. */
  availability?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Averentis",
    category: "Web",
    filterCategory: "Web",
    description:
      "A high-trust digital presence built to present services clearly, sharpen positioning, and convert visitors into conversations.",
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
    description:
      "An AI-powered copilot experience designed to assist users with intelligent automation and contextual guidance.",
    status: "Live website",
    technologies: ["AI", "React", "TypeScript"],
    image: "/projects_images/miles.png",
    link: "https://milescopilot.com",
  },
  {
    id: 3,
    title: "Slaapable AI",
    category: "AI · Mobile",
    filterCategory: "AI",
    description:
      "An AI-driven sleep and wellness mobile app for iOS and Android, pairing intelligent sleep insights with a calm, premium interface.",
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
    description:
      "A calarity-first product presence with clean messaging, crisp hierarchy, and polished user exploration across devices.",
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
    description:
      "A web portal delivering account management, dashboards, and operational tooling with a clean, intuitive interface.",
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
    description:
      "A cross-platform mobile companion extending the product experience with native-feeling performance and polish.",
    status: "iOS & Android app",
    technologies: ["React Native", "Mobile", "UX"],
    image: "/projects_images/calarity_mobile_app.png",
    link: "https://www.calarity.com/download",
  },
  {
    id: 7,
    title: "Grace Upholstery",
    category: "Commerce",
    filterCategory: "Commerce",
    description:
      "A commerce experience combining modern storefront UX with clean product presentation and conversion-focused flows.",
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

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.filterCategory === filter);

  const [lead, ...rest] = filteredProjects;

  return (
    <section id="portfolio" className="relative py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="section-kicker fade-in-up">
              <span className="accent-dot" />
              Selected work
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-ink fade-in-up sm:text-4xl lg:text-5xl">
              Live launches, premium interfaces, and product systems that convert.
            </h2>
          </div>
          <p
            className="section-copy max-w-sm fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            A mix of live websites, shipped mobile apps, and product platforms
            across AI, web, SaaS, and commerce.
          </p>
        </div>

        {/* Filter */}
        <div
          className="mt-10 flex flex-wrap gap-2 fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                filter === f
                  ? "border-lime/60 bg-lime/15 text-lime shadow-[0_0_20px_hsl(76_77%_57%_/_0.18)]"
                  : "border-line bg-surface/70 text-ink-soft hover:border-lime/40 hover:text-ink",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Lead project - full width */}
        {lead && <LeadCard project={lead} />}

        {/* Remaining projects - equal-height grid */}
        {rest.length > 0 && (
          <div
            className={cn(
              "mt-6 grid auto-rows-fr gap-6",
              rest.length <= 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {rest.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/** Browser-chrome strip that frames every screenshot. */
const ChromeBar = ({ label, live }: { label: string; live: boolean }) => (
  <div className="flex items-center gap-3 border-b border-line bg-paper/70 px-4 py-2.5">
    <span className="flex shrink-0 gap-1.5">
      <span className="h-2 w-2 rounded-full bg-line" />
      <span className="h-2 w-2 rounded-full bg-line" />
      <span className="h-2 w-2 rounded-full bg-lime/70" />
    </span>
    <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-line bg-surface/70 px-2.5 py-1">
      <Icon name={live ? "lock" : "smartphone"} size={13} className="text-ink-dim" />
      <span className="truncate text-[0.68rem] font-medium tracking-wide text-ink-soft">
        {label}
      </span>
    </span>
  </div>
);

/** Screenshot frame - the capture is shown whole, never cropped. */
const Screenshot = ({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) => (
  <div className="relative aspect-[22/10] w-full overflow-hidden bg-paper">
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className="h-full w-full object-contain object-center transition duration-500 ease-out group-hover:brightness-110"
    />
    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
  </div>
);

const MetaRow = ({ project }: { project: Project }) => {
  const domain = getDomain(project.link);

  return project.link ? (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-lime transition-colors duration-200 group-hover:text-lime-bright">
      <Icon name="open_in_new" size={16} />
      {domain}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft">
      <Icon name="phone_iphone" size={16} className="text-cyan" />
      {project.availability ?? "Link available on request"}
    </span>
  );
};

const cardLinkProps = (project: Project) =>
  project.link
    ? {
        href: project.link,
        target: "_blank" as const,
        rel: "noopener noreferrer" as const,
        "aria-label": `Open ${project.title} in a new tab`,
      }
    : {};

const LeadCard = ({ project }: { project: Project }) => {
  const Wrapper = project.link ? "a" : "div";
  const domain = getDomain(project.link);

  return (
    <Wrapper
      {...cardLinkProps(project)}
      className="group section-shell elevated-hover mt-10 block overflow-hidden rounded-3xl fade-in-up"
      style={{ animationDelay: "0.3s" }}
    >
      <ChromeBar label={domain || project.status.toLowerCase()} live={!!domain} />
      <Screenshot src={project.image} alt={`${project.title} screenshot`} priority />

      <div className="grid gap-6 border-t border-line p-6 sm:p-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-10">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge-chip">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              {project.category}
            </span>
            <span className="badge-chip">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              {project.status}
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-ink transition-colors duration-300 group-hover:text-lime sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-ink-soft sm:text-base">
            {project.description}
          </p>
        </div>

        <div className="lg:text-right">
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line bg-surface/70 px-2.5 py-1 text-xs font-medium text-ink-soft"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3 lg:justify-end">
            <MetaRow project={project} />
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300",
                project.link
                  ? "border-lime/40 bg-lime/10 text-lime group-hover:bg-lime group-hover:text-paper"
                  : "border-line bg-surface text-ink-dim",
              )}
            >
              <Icon name={project.link ? "arrow_outward" : "install_mobile"} size={18} />
            </span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const Wrapper = project.link ? "a" : "div";
  const domain = getDomain(project.link);

  return (
    <Wrapper
      {...cardLinkProps(project)}
      className="group section-shell elevated-hover flex h-full flex-col overflow-hidden rounded-2xl fade-in-up"
      style={{ animationDelay: `${0.35 + index * 0.07}s` }}
    >
      <ChromeBar label={domain || project.status.toLowerCase()} live={!!domain} />
      <Screenshot src={project.image} alt={`${project.title} screenshot`} />

      <div className="flex flex-1 flex-col border-t border-line p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            <span className="mono-label">{project.category}</span>
          </span>
          <span className="text-[0.68rem] font-medium text-ink-dim">
            {project.status}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-bold text-ink transition-colors duration-300 group-hover:text-lime">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line bg-surface/70 px-2.5 py-1 text-xs font-medium text-ink-soft"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <MetaRow project={project} />
          <Icon
            name={project.link ? "arrow_outward" : "install_mobile"}
            size={18}
            className={cn(
              "transition-transform duration-300",
              project.link
                ? "text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                : "text-ink-dim",
            )}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Portfolio;
