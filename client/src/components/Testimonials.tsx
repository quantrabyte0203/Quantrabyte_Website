import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";
import Reveal from "@/components/kit/Reveal";
import SectionHeading from "@/components/kit/SectionHeading";
import TestimonialCard from "@/components/wall/TestimonialCard";
import { getWall } from "@/lib/wallOfFame";

/**
 * Teaser strip for the home page. Renders nothing until there is something
 * worth showing, so the page never displays an empty testimonials section.
 */
const Testimonials = () => {
  const { data } = useQuery({
    queryKey: ["wall"],
    queryFn: getWall,
    staleTime: 60_000,
    retry: false,
  });

  const testimonials = data ?? [];
  if (testimonials.length === 0) return null;

  const featured = testimonials.slice(0, 3);

  return (
    <section id="testimonials" className="section-y bg-surface-soft/60">
      <Container>
        <SectionHeading
          eyebrow="Wall of Fame"
          title={
            <>
              Feedback from the people we{" "}
              <span className="lime-underline">built for.</span>
            </>
          }
          description="Collected directly from clients after their projects went live."
          action={
            <Link to="/wall-of-fame" className="btn btn-outline group h-11 pl-5 pr-1.5">
              See the full wall
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                <Icon name="arrow_forward" size={16} />
              </span>
            </Link>
          }
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={0.06 * index} className="h-full">
              <TestimonialCard testimonial={testimonial} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
