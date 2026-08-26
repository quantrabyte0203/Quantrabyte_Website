import { useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  category: string;
  filterCategory: string;
  description: string;
  status: string;
  technologies: string[];
  link: string;
  featured?: boolean;
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
    link: "[ADD AVERENTIS URL]",
    featured: true,
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
    link: "[ADD MILESCOPILOT URL]",
    featured: true,
  },
  {
    id: 3,
    title: "Slaapable AI",
    category: "AI",
    filterCategory: "AI",
    description:
      "An AI-driven product focused on sleep and wellness, combining intelligent insights with a calm, premium interface.",
    status: "Live website",
    technologies: ["AI", "Product Design", "Web"],
    link: "[ADD SLAAPABLE AI URL]",
    featured: true,
  },
  {
    id: 4,
    title: "Clarity — Website",
    category: "Web",
    filterCategory: "Web",
    description:
      "A clarity-first product presence with clean messaging, crisp hierarchy, and polished user exploration across devices.",
    status: "Live website",
    technologies: ["Responsive UI", "Product Marketing", "UX Systems"],
    link: "[ADD CLARITY WEBSITE URL]",
  },
  {
    id: 5,
    title: "Clarity — Web Portal",
    category: "SaaS",
    filterCategory: "SaaS",
    description:
      "A web portal delivering account management, dashboards, and operational tooling with a clean, intuitive interface.",
    status: "Live website",
    technologies: ["React", "Dashboards", "SaaS"],
    link: "[ADD CLARITY WEB PORTAL URL]",
  },
  {
    id: 6,
    title: "Clarity — Mobile App",
    category: "Mobile",
    filterCategory: "Mobile",
    description:
      "A cross-platform mobile companion extending the product experience with native-feeling performance and polish.",
    status: "Live website",
    technologies: ["React Native", "Mobile", "UX"],
    link: "[ADD CLARITY MOBILE APP URL]",
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
    link: "[ADD GRACE UPHOLSTERY URL]",
  },
];

const filters = ["All", "AI", "Web", "Mobile", "SaaS", "Commerce"];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.filterCategory === filter);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const standardProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="portfolio" className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="section-kicker fade-in-up">
              <span className="accent-dot" />
              Selected work
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-ink fade-in-up sm:text-4xl lg:text-5xl">
              Live launches, premium interfaces, and product systems that convert.
            </h2>
          </div>
          <p
            className="section-copy max-w-sm fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            A mix of live websites and private delivery work across AI, web,
            mobile, SaaS, and commerce.
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
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-white text-ink-soft hover:border-ink/20 hover:text-ink",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Featured projects - editorial layout */}
        {featuredProjects.length > 0 && (
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                large
                index={index}
              />
            ))}
          </div>
        )}

        {/* Standard projects */}
        {standardProjects.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {standardProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index + featuredProjects.length}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  large = false,
  index,
}: {
  project: Project;
  large?: boolean;
  index: number;
}) => {
  const isPlaceholder = project.link.startsWith("[");
  const linkProps = isPlaceholder
    ? {}
    : {
        href: project.link,
        target: "_blank" as const,
        rel: "noopener noreferrer" as const,
      };

  return (
    <a
      {...linkProps}
      className={cn(
        "group section-shell elevated-hover block rounded-2xl p-5 fade-in-up sm:p-6",
        large && "lg:p-7",
      )}
      style={{ animationDelay: `${0.3 + index * 0.08}s` }}
      {...(isPlaceholder ? { "data-placeholder": true } : {})}
    >
      {/* Preview area */}
      <div
        className={cn(
          "surface-grid relative overflow-hidden rounded-xl border border-line bg-surface",
          large ? "min-h-[16rem] sm:min-h-[18rem]" : "min-h-[12rem]",
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-surface to-paper" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="badge-chip bg-white/80 backdrop-blur-sm">
            {project.status}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white shadow-soft transition-all duration-300 group-hover:bg-ink group-hover:text-paper">
          <ArrowUpRight className="h-4 w-4" />
        </div>
        {/* Decorative element */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-lime" />
            <span className="mono-label text-ink-soft">{project.category}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-5">
        <h3 className={cn("font-semibold text-ink", large ? "text-2xl" : "text-xl")}>
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-ink-soft">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink-soft"
            >
              {tech}
            </span>
          ))}
        </div>
        {!isPlaceholder && (
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
            <ExternalLink className="h-3.5 w-3.5" />
            Visit project
          </div>
        )}
      </div>
    </a>
  );
};

export default Portfolio;
