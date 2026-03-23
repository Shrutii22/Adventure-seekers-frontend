function WhyChooseUs() {
  const items = [
    {
      title: "Designed for real travellers",
      description:
        "Everything is built for how people actually travel – flexible dates, shared itineraries, and last‑minute plans.",
      icon: "🧭",
    },
    {
      title: "Glassmorphism, not guesswork",
      description:
        "A clean, cinematic interface that makes it effortless to browse, shortlist, and book what feels right.",
      icon: "✨",
    },
    {
      title: "Community at the center",
      description:
        "Follow people who inspire your trips, swap tips, and build your own small circle of travellers.",
      icon: "🌍",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-brand-navy via-slate-900 to-slate-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px] rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-900/40 backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Why TravelConnect
            </p>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Built for golden hour planners and midnight bookers.
            </h2>
            <p className="text-sm text-slate-200/90">
              From trip inspiration to your final booking, TravelConnect keeps everything in one cinematic, distraction-free space.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-xs text-white/90 shadow-lg shadow-slate-950/20 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </div>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;

