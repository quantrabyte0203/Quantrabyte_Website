import { BadgeCheck, Cpu, Rocket, Sparkles } from "lucide-react";
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
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-kicker mx-auto fade-in-up">
              <Sparkles className="h-4 w-4" />
              Founder spotlight
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-white fade-in-up sm:text-4xl md:text-6xl">
              One face, one vision, one accountable product lead.
            </h2>
            <p
              className="section-copy mx-auto mt-5 max-w-2xl fade-in-up"
              style={{ animationDelay: "0.12s" }}
            >
              As requested, this section now keeps only the first founder image
              and removes the other three member profiles completely.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="section-shell overflow-hidden rounded-[28px] p-4 fade-in-left sm:p-5 md:rounded-[34px]">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(91,247,221,0.16),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]">
                <img
                  src={founderImage}
                  alt={founder.name}
                  className="h-full min-h-[24rem] w-full object-cover object-top sm:min-h-[30rem] lg:min-h-[34rem]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07111d] via-[#07111d]/70 to-transparent p-6">
                  <p className="mono-label text-primary/80">Lead contact</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{founder.name}</h3>
                  <p className="mt-2 text-sm text-white/70">{founder.position}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 fade-in-right" style={{ animationDelay: "0.15s" }}>
              <div className="section-shell rounded-[28px] p-6 sm:p-8 md:rounded-[34px] md:p-10">
                <p className="mono-label text-primary/80">Leadership profile</p>
                <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                  Founder-led direction from strategy through shipment.
                </h3>
                <p className="mt-5 text-base leading-8 text-white/68">{founder.bio}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {founder.signals.map((signal) => (
                    <div key={signal.label} className="glass-card rounded-[22px] p-4 sm:rounded-[24px] sm:p-5">
                      <p className="mono-label text-white/45">{signal.label}</p>
                      <p className="mt-3 text-sm leading-7 text-white/75">{signal.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="section-shell rounded-[24px] p-5 sm:rounded-[30px] sm:p-6">
                  <div className="flex items-center gap-3 text-white">
                    <Cpu className="h-5 w-5 text-primary" />
                    <h4 className="text-xl font-semibold">Core expertise</h4>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {founder.expertise.map((item) => (
                      <span key={item} className="badge-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="section-shell rounded-[24px] p-5 sm:rounded-[30px] sm:p-6">
                  <div className="flex items-center gap-3 text-white">
                    <BadgeCheck className="h-5 w-5 text-primary" />
                    <h4 className="text-xl font-semibold">Working principle</h4>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-white/68">
                    QuantraByte stays intentionally lean so decisions are fast,
                    communication is direct, and execution quality stays visible
                    at every stage of the build.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                    <Rocket className="h-4 w-4" />
                    Founder access from kickoff to launch
                  </div>
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
