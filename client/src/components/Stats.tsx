const stats = [
  { number: "100+", label: "Projects shipped" },
  { number: "50+", label: "Client launches" },
  { number: "8+", label: "Years building" },
  { number: "24h", label: "Response window" },
];

const Stats = () => {
  return (
    <section className="border-y border-line bg-surface/50 py-10 sm:py-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center fade-in-up sm:text-left"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {stat.number}
              </div>
              <div className="mt-1.5 text-sm text-ink-soft">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
