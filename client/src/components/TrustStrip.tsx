import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";
import Reveal from "@/components/kit/Reveal";

/**
 * Projects already presented publicly in the Work section - no new names,
 * logos or claims are introduced here.
 */
const projects = [
  { name: "Averentis", icon: "landscape" },
  { name: "MilesCopilot", icon: "explore" },
  { name: "Sleepable AI", icon: "bedtime" },
  { name: "Calarity", icon: "graphic_eq" },
  { name: "Grace Ann Upholstery", icon: "chair" },
];

const TrustStrip = () => (
  <section className="border-y border-line bg-surface/60 py-7">
    <Container>
      <Reveal className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
        <p className="shrink-0 text-[0.82rem] font-medium text-ink-soft">
          Trusted by forward-thinking teams
        </p>

        <div className="marquee-mask w-full overflow-hidden lg:flex-1">
          <div className="marquee-track">
            {[...projects, ...projects].map((project, index) => (
              <span
                key={`${project.name}-${index}`}
                className="flex shrink-0 items-center gap-2.5 px-6 text-[0.95rem] font-semibold tracking-tight text-ink/80"
              >
                <Icon name={project.icon} size={19} className="text-ink-dim" />
                {project.name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);

export default TrustStrip;
