import Icon from "@/components/Icon";

const differentiators = [
  {
    title: "Product thinking",
    description:
      "Clear positioning before code. We start with the business goal and work backward to the interface.",
  },
  {
    title: "AI-native engineering",
    description:
      "Automation and intelligence where it creates real leverage, not as a label bolted on after launch.",
  },
  {
    title: "End-to-end delivery",
    description:
      "Strategy, design, engineering, and deployment stay in the same loop from kickoff to launch.",
  },
  {
    title: "Clean product experiences",
    description:
      "Interfaces that feel fast, modern, and maintainable, built on coherent design systems.",
  },
  {
    title: "Founder-led accountability",
    description:
      "Direct communication and fast decisions. One person owns the product outcome from start to finish.",
  },
  {
    title: "Long-term engineering partnership",
    description:
      "We stick around after launch, supporting growth, iteration, and expansion as the product evolves.",
  },
];

const About = () => {
  return (
    <section id="about" className="relative border-y border-line bg-surface/30 py-20 backdrop-blur-sm sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="section-kicker fade-in-up">
            <span className="accent-dot" />
            Why QuantraByte
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-ink fade-in-up sm:text-4xl lg:text-5xl">
            High-clarity thinking, sharp interfaces, and dependable build quality.
          </h2>
          <p
            className="section-copy mt-5 fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            We work at the intersection of product strategy, modern frontend
            engineering, and AI-enabled systems so businesses can launch with
            more confidence and more visual impact.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              className="section-shell elevated-hover rounded-xl p-6 fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.08}s` }}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10">
                  <Icon name="layers" size={16} className="text-cyan" />
                </div>
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
