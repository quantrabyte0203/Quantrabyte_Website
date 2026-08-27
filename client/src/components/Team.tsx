import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";
import Reveal from "@/components/kit/Reveal";
import SectionHeading from "@/components/kit/SectionHeading";
import founderImage from "@/assets/AnshulD.png";

const founder = {
  name: "Anshul Thakur",
  position: "CEO & Founder",
  bio: "Founder-led execution sits at the center of QuantraByte. Anshul drives product direction, full-stack delivery and AI-enabled solutions, with a focus on turning ambitious concepts into scalable digital products.",
  expertise: [
    "AI-native product strategy",
    "Full-stack architecture",
    "Premium UX execution",
    "Scalable launch systems",
  ],
  signals: [
    { label: "Approach", value: "Founder-led delivery", icon: "person_check" },
    { label: "Focus", value: "AI + full-stack products", icon: "target" },
    { label: "Priority", value: "Speed with quality control", icon: "bolt" },
  ],
};

const Team = () => (
  <section id="about" className="section-y">
    <Container>
      <SectionHeading
        eyebrow="About"
        title={
          <>
            One accountable product lead, from strategy to{" "}
            <span className="lime-underline">shipment.</span>
          </>
        }
        description="There is a real person accountable for the outcome. QuantraByte stays intentionally lean so decisions are fast and communication stays direct."
      />

      <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-[0.78fr_1.22fr]">
        {/* Portrait */}
        <Reveal>
          <figure className="card relative h-full overflow-hidden p-0">
            <img
              src={founderImage}
              alt={founder.name}
              className="h-full min-h-[22rem] w-full object-cover object-top sm:min-h-[26rem]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 pt-16">
              <p className="text-[1.15rem] font-semibold tracking-tight text-paper">
                {founder.name}
              </p>
              <p className="mt-1 text-[0.85rem] text-paper/70">
                {founder.position}
              </p>
            </figcaption>
          </figure>
        </Reveal>

        {/* Profile */}
        <div className="flex flex-col gap-5">
          <Reveal delay={0.08}>
            <div className="card p-6 sm:p-8">
              <p className="field-label">Leadership profile</p>
              <h3 className="display-3 mt-3">
                Founder-led direction from strategy through shipment.
              </h3>
              <p className="body-sm mt-4">{founder.bio}</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {founder.signals.map((signal) => (
                  <div key={signal.label} className="card-soft p-4">
                    <Icon
                      name={signal.icon}
                      size={18}
                      className="text-lime-ink"
                    />
                    <p className="field-label mt-3">{signal.label}</p>
                    <p className="mt-1.5 text-[0.9rem] font-medium leading-snug text-ink">
                      {signal.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal delay={0.12} className="h-full">
              <div className="card flex h-full flex-col p-6">
                <div className="flex items-center gap-2.5">
                  <Icon name="verified" size={20} className="text-lime-ink" />
                  <h4 className="text-[1rem] font-semibold tracking-tight text-ink">
                    Core expertise
                  </h4>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {founder.expertise.map((item) => (
                    <span key={item} className="chip-flat">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16} className="h-full">
              <div className="card flex h-full flex-col p-6">
                <div className="flex items-center gap-2.5">
                  <Icon name="rocket_launch" size={20} className="text-lime-ink" />
                  <h4 className="text-[1rem] font-semibold tracking-tight text-ink">
                    Working principle
                  </h4>
                </div>
                <p className="body-sm mt-3 flex-1 text-[0.9rem]">
                  Stay lean, decide fast, keep execution quality visible at every
                  stage of the build.
                </p>
                <p className="mt-4 flex items-center gap-2 text-[0.85rem] font-medium text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  Founder access from kickoff to launch
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default Team;
