import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";
import Reveal from "@/components/kit/Reveal";
import { scrollToSection } from "@/components/kit/scroll";

const CTA = () => (
  <section className="section-y">
    <Container>
      <Reveal>
        <div className="card-ink relative overflow-hidden rounded-[1.75rem] px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* Restrained accent geometry */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/20 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-lime/10 blur-[90px]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(250,250,247,0.9) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/5 px-3.5 py-1.5 text-[0.78rem] font-medium text-paper/80">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              Accepting new projects
            </span>

            <h2 className="display-2 mt-6 text-paper">
              Have an idea worth{" "}
              <span className="text-lime">building?</span>
            </h2>

            <p className="mt-5 text-[1.05rem] leading-relaxed text-paper/70">
              Let's turn it into a reliable, scalable digital product - with a
              clear scope, a real timeline, and one team accountable for the
              outcome.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="btn btn-primary group h-[3.25rem] w-full px-7 text-[0.95rem] sm:w-auto"
              >
                Let's Talk
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:translate-x-0.5">
                  <Icon name="arrow_forward" size={15} />
                </span>
              </button>

              <a
                href="mailto:info@quantrabyte.com"
                className="btn group h-[3.25rem] w-full border-paper/20 bg-transparent px-7 text-[0.95rem] text-paper transition-colors hover:border-paper/40 hover:bg-paper/5 sm:w-auto"
              >
                <Icon name="mail" size={18} />
                info@quantrabyte.com
              </a>
            </div>

            <p className="mt-8 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-paper/40">
              AI Products · SaaS · Web · Mobile · Commerce
            </p>
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);

export default CTA;
