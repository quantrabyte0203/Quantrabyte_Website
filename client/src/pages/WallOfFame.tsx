import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";
import Eyebrow from "@/components/kit/Eyebrow";
import Reveal from "@/components/kit/Reveal";
import TestimonialCard from "@/components/wall/TestimonialCard";
import { getWall } from "@/lib/wallOfFame";

const WallOfFame = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["wall"],
    queryFn: getWall,
    staleTime: 60_000,
  });

  const testimonials = data ?? [];
  const average =
    testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      : 0;

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main>
        <section className="relative isolate overflow-hidden pb-12 pt-28 sm:pt-32 lg:pb-16 lg:pt-36">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute -right-28 -top-24 h-[26rem] w-[26rem] rounded-full bg-lime/12 blur-[120px]" />
            <div className="absolute -left-32 top-28 h-[20rem] w-[20rem] rounded-full bg-lime-soft/30 blur-[110px]" />
          </div>

          <Container className="relative z-10">
            <div className="max-w-2xl">
              <Reveal>
                <Eyebrow>Wall of Fame</Eyebrow>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="display-1 mt-6 text-ink">
                  What our clients{" "}
                  <span className="lime-underline">actually say.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="lead mt-6">
                  Unedited feedback from the people we have built for - collected
                  directly from clients after their projects went live.
                </p>
              </Reveal>
            </div>

            {testimonials.length > 0 && (
              <Reveal delay={0.18}>
                <dl className="card mt-10 inline-grid grid-cols-2 gap-x-8 gap-y-4 p-5 sm:grid-cols-3 sm:gap-x-10 sm:p-6">
                  <div>
                    <dt className="field-label">Testimonials</dt>
                    <dd className="mt-1.5 text-[1.6rem] font-bold leading-none text-ink">
                      {testimonials.length}
                    </dd>
                  </div>
                  <div className="sm:border-l sm:border-line sm:pl-10">
                    <dt className="field-label">Average rating</dt>
                    <dd className="mt-1.5 text-[1.6rem] font-bold leading-none text-lime-ink">
                      {average.toFixed(1)}
                    </dd>
                  </div>
                  <div className="col-span-2 sm:col-span-1 sm:border-l sm:border-line sm:pl-10">
                    <dt className="field-label">Five star</dt>
                    <dd className="mt-1.5 text-[1.6rem] font-bold leading-none text-ink">
                      {testimonials.filter((t) => t.rating === 5).length}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            )}
          </Container>
        </section>

        <section className="pb-20 sm:pb-24 lg:pb-32">
          <Container>
            {isLoading && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="card h-64 animate-pulse bg-surface-soft"
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}

            {isError && (
              <div className="card p-10 text-center">
                <Icon name="cloud_off" size={32} className="mx-auto text-ink-dim" />
                <p className="mt-4 font-semibold text-ink">
                  Could not load testimonials
                </p>
                <p className="body-sm mt-1.5">
                  Please refresh the page, or try again in a moment.
                </p>
              </div>
            )}

            {!isLoading && !isError && testimonials.length === 0 && (
              <div className="card-soft p-12 text-center">
                <Icon
                  name="format_quote"
                  size={36}
                  fill
                  className="mx-auto text-lime"
                />
                <p className="display-3 mt-4">No testimonials yet</p>
                <p className="lead mx-auto mt-3 max-w-md">
                  We are collecting feedback from recent projects. Check back
                  shortly.
                </p>
              </div>
            )}

            {/* Masonry via CSS columns - staggered heights, no layout library */}
            {testimonials.length > 0 && (
              <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
                {testimonials.map((testimonial, index) => (
                  <Reveal
                    key={testimonial.id}
                    delay={Math.min(0.06 * (index % 6), 0.3)}
                    className="mb-5 break-inside-avoid"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </Reveal>
                ))}
              </div>
            )}

            <Reveal delay={0.1}>
              <div className="card-soft mt-12 flex flex-col items-center gap-5 p-8 text-center sm:p-10">
                <h2 className="display-3 max-w-lg">
                  Want your project on this wall?
                </h2>
                <p className="body-sm max-w-md">
                  Tell us what you are building and we will come back with a
                  clear scope and timeline.
                </p>
                <a href="/#contact" className="btn btn-primary group h-12 px-7">
                  Start a Project
                  <Icon
                    name="arrow_forward"
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WallOfFame;
