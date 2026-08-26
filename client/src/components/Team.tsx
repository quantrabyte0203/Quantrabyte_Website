import Icon from "@/components/Icon";
import founderImage from "@/assets/AnshulD.png";

const founder = {
  name: "Anshul Thakur",
  position: "CEO & Founder",
  bio: "Founder-led execution sits at the center of QuantraByte. Anshul drives product direction, full-stack delivery, and AI-enabled solutions with a focus on turning ambitious concepts into scalable digital products.",
  expertise: [
    "AI-native product strategy",
    "Full-stack architecture",
    "Premium UX execution",
    "Scalable launch systems",
  ],
  signals: [
    { label: "Approach", value: "Founder-led delivery" },
    { label: "Focus", value: "AI + full-stack products" },
    { label: "Priority", value: "Speed with quality control" },
  ],
};

const Team = () => {
  return (
    <section id="team" className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="section-kicker fade-in-up">
            <span className="accent-dot" />
            Founder
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-ink fade-in-up sm:text-4xl lg:text-5xl">
            One accountable product lead, from strategy to shipment.
          </h2>
          <p
            className="section-copy mt-5 fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            There is a real person accountable for the product outcome.
            QuantraByte stays intentionally lean so decisions are fast,
            communication is direct, and execution quality stays visible.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Portrait */}
          <div className="section-shell overflow-hidden rounded-2xl fade-in-left">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={founderImage}
                alt={founder.name}
                className="h-full min-h-[22rem] w-full object-cover object-top sm:min-h-[26rem] lg:min-h-[30rem]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-paper via-paper/80 to-transparent p-6 pt-16">
                <h3 className="text-xl font-semibold text-ink">{founder.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{founder.position}</p>
              </div>
            </div>
          </div>

          {/* Profile content */}
          <div className="space-y-6 fade-in-right" style={{ animationDelay: "0.15s" }}>
            <div className="section-shell rounded-2xl p-6 sm:p-8">
              <p className="mono-label">Leadership profile</p>
              <h3 className="mt-3 text-xl font-semibold text-ink sm:text-2xl">
                Founder-led direction from strategy through shipment.
              </h3>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{founder.bio}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {founder.signals.map((signal) => (
                  <div key={signal.label} className="surface-soft rounded-xl p-4">
                    <p className="mono-label">{signal.label}</p>
                    <p className="mt-2 text-sm leading-6 text-ink">{signal.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="section-shell rounded-2xl p-6">
                <div className="flex items-center gap-2.5">
                  <Icon name="verified" size={22} className="text-lime" />
                  <h4 className="text-base font-semibold text-ink">Core expertise</h4>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {founder.expertise.map((item) => (
                    <span key={item} className="badge-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="section-shell rounded-2xl p-6">
                <div className="flex items-center gap-2.5">
                  <Icon name="rocket_launch" size={22} className="text-cyan" />
                  <h4 className="text-base font-semibold text-ink">Working principle</h4>
                </div>
                <p className="mt-4 text-sm leading-6 text-ink-soft">
                  QuantraByte stays intentionally lean so decisions are fast,
                  communication is direct, and execution quality stays visible
                  at every stage of the build.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-ink">
                  <div className="h-1.5 w-1.5 rounded-full bg-lime" />
                  Founder access from kickoff to launch
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
