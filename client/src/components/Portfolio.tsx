import { useState } from "react";
import { ArrowUpRight, ExternalLink, Globe, Sparkles } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  domain: string;
  status: string;
  previewGradient: string;
  technologies: string[];
  features: string[];
  demo?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "LeadSource GPT",
    category: "AI Systems",
    description:
      "AI-powered lead intelligence for scoring, qualification, and outreach automation across modern B2B funnels.",
    domain: "leadsourcegpt.com",
    status: "Live website",
    previewGradient:
      "linear-gradient(135deg, rgba(42, 212, 255, 0.95), rgba(91, 247, 221, 0.45))",
    technologies: ["React", "TypeScript", "AI Workflows", "CRM Integrations"],
    features: [
      "AI lead scoring",
      "Qualification flows",
      "Outreach automation",
      "Sales visibility dashboards",
    ],
    demo: "https://www.leadsourcegpt.com",
  },
  {
    id: 2,
    title: "Averentis",
    category: "Web Platforms",
    description:
      "A high-trust digital presence built to present services clearly, sharpen positioning, and convert visitors into conversations.",
    domain: "averentis.com",
    status: "Live website",
    previewGradient:
      "linear-gradient(135deg, rgba(91, 247, 221, 0.92), rgba(51, 204, 140, 0.45))",
    technologies: ["React", "TypeScript", "Motion UI", "SEO"],
    features: [
      "Clear service architecture",
      "Modern visual storytelling",
      "Conversion-first CTA flows",
      "Responsive premium layout",
    ],
    demo: "https://www.averentis.com",
  },
  {
    id: 3,
    title: "Calarity",
    category: "Web Platforms",
    description:
      "A clarity-first product presence with clean messaging, crisp hierarchy, and polished user exploration across devices.",
    domain: "calarity.com",
    status: "Live website",
    previewGradient:
      "linear-gradient(135deg, rgba(255, 188, 66, 0.92), rgba(42, 212, 255, 0.42))",
    technologies: ["Responsive UI", "Product Marketing", "Performance", "UX Systems"],
    features: [
      "Brand-first presentation",
      "Conversion-ready page structure",
      "Fast responsive rendering",
      "Premium interface polish",
    ],
    demo: "https://calarity.com",
  },
  {
    id: 4,
    title: "Smart Financial Dashboard",
    category: "AI Systems",
    description:
      "A cloud-based financial analytics platform that turns complex inputs into predictive signals for faster decision-making.",
    domain: "Private delivery",
    status: "Case study",
    previewGradient:
      "linear-gradient(135deg, rgba(42, 212, 255, 0.88), rgba(15, 23, 42, 0.85))",
    technologies: ["React", "TypeScript", "Python", "TensorFlow", "AWS"],
    features: [
      "Realtime financial pipelines",
      "Predictive analytics",
      "Custom ML model surfaces",
      "Executive dashboards",
    ],
  },
  {
    id: 5,
    title: "Capital Shop Commerce",
    category: "Commerce",
    description:
      "A full-stack commerce experience combining modern storefront UX, payments, and operations visibility in one system.",
    domain: "Private delivery",
    status: "Case study",
    previewGradient:
      "linear-gradient(135deg, rgba(255, 188, 66, 0.9), rgba(248, 113, 113, 0.45))",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Vercel"],
    features: [
      "Responsive storefront UI",
      "Payment and checkout flows",
      "Inventory administration",
      "Operations dashboard",
    ],
  },
  {
    id: 6,
    title: "Mobile Delivery Suite",
    category: "Mobile",
    description:
      "A cross-platform mobile product for ordering, live status visibility, secure payments, and customer retention workflows.",
    domain: "Private delivery",
    status: "Case study",
    previewGradient:
      "linear-gradient(135deg, rgba(91, 247, 221, 0.92), rgba(14, 165, 233, 0.45))",
    technologies: ["React Native", "Firebase", "Node.js", "MongoDB", "Stripe"],
    features: [
      "Realtime order states",
      "Secure payment flows",
      "Operations notifications",
      "Cross-platform UI system",
    ],
  },
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(projects.map((project) => project.category))];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="portfolio" className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-kicker mx-auto fade-in-up">
              <Sparkles className="h-4 w-4" />
              Selected projects
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-white fade-in-up sm:text-4xl md:text-6xl">
              Live launches, premium interfaces, and product systems that convert.
            </h2>
            <p
              className="section-copy mx-auto mt-5 max-w-3xl fade-in-up"
              style={{ animationDelay: "0.12s" }}
            >
              The showcase now includes the requested live websites alongside
              private delivery work to reflect a broader, more current project mix.
            </p>
          </div>

          <div
            className="mb-12 flex flex-wrap justify-center gap-3 fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={cn(
                  "rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300",
                  filter === category
                    ? "border-primary/30 bg-primary/10 text-white shadow-quantum"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white",
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group fade-in-up"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div
                  className="section-shell elevated-hover h-full cursor-pointer rounded-[24px] p-4 sm:rounded-[30px] sm:p-5"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                >
                  <div
                    className="surface-grid relative overflow-hidden rounded-[22px] border border-white/10 p-4 sm:rounded-[26px] sm:p-5"
                    style={{ background: project.previewGradient }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%),linear-gradient(180deg,rgba(7,17,29,0.05),rgba(7,17,29,0.5))]" />
                    <div className="relative flex min-h-[15rem] flex-col justify-between">
                      <div className="flex items-center justify-between gap-3">
                        <span className="badge-chip bg-white/12 text-white/85">
                          {project.status}
                        </span>
                        <span className="mono-label max-w-[8.5rem] break-all text-right text-white/60 sm:max-w-none sm:break-normal">
                          {project.domain}
                        </span>
                      </div>

                      <div>
                        <p className="mono-label text-white/55">Launch module</p>
                        <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                          {project.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={`${project.id}-${tech}`}
                            className="rounded-full border border-white/12 bg-[#07111d]/36 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="badge-chip">{project.category}</span>
                      <ArrowUpRight className="h-5 w-5 text-white/55 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>

                    <p className="mt-4 text-sm leading-7 text-white/68">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Dialog
            open={!!selectedProject}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedProject(null);
              }
            }}
          >
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-[28px] border border-white/10 bg-[#07111d]/95 p-0 text-white shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:rounded-[32px]">
              {selectedProject && (
                <div className="overflow-hidden rounded-[28px] sm:rounded-[32px]">
                  <div
                    className="surface-grid relative p-6 sm:p-8 md:p-10"
                    style={{ background: selectedProject.previewGradient }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,29,0.08),rgba(7,17,29,0.74)),radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_28%)]" />
                    <div className="relative">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="badge-chip bg-white/12 text-white/80">
                          {selectedProject.status}
                        </span>
                        <span className="mono-label text-white/60">
                          {selectedProject.domain}
                        </span>
                      </div>
                      <h3 className="mt-5 max-w-3xl text-3xl font-semibold sm:text-4xl">
                        {selectedProject.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">
                        {selectedProject.description}
                      </p>
                      <div className="mt-6">
                        <span className="badge-chip bg-white/12 text-white/80">
                          {selectedProject.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
                      <div>
                        <h4 className="text-lg font-semibold">Project highlights</h4>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {selectedProject.features.map((feature) => (
                            <div
                              key={feature}
                              className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/72"
                            >
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold">Technology layer</h4>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/72"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                      {selectedProject.demo ? (
                        <Button
                          asChild
                        className="w-full rounded-full border border-primary/20 bg-[linear-gradient(135deg,#5bf7dd_0%,#2ad4ff_55%,#33cc8c_100%)] px-6 text-slate-950 sm:w-auto"
                        >
                          <a
                            href={selectedProject.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Globe className="h-4 w-4" />
                            Visit website
                          </a>
                        </Button>
                      ) : null}

                      <Button
                        asChild
                        variant="outline"
                        className="w-full rounded-full border-white/10 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                      >
                        <a href="#contact" onClick={() => setSelectedProject(null)}>
                          <ExternalLink className="h-4 w-4" />
                          Start something similar
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
