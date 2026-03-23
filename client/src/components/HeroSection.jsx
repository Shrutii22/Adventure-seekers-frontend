function HeroSection() {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(15,23,42,0.75), rgba(15,23,42,0.75)), url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/80"></div>

      <div className="relative mx-auto flex w-full max-w-7xl items-start justify-between px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg">
          <p className="mb-4 inline-block rounded-full bg-amber-200/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-100 backdrop-blur">
            Get inspired
          </p>

          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight drop-shadow-lg">
            Discover Your Next Adventure
          </h1>

          <p className="text-lg md:text-xl text-slate-100/90 mb-8">
            Explore destinations, book hotels, and connect with travelers with seamless style.
          </p>

          <button className="rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 px-8 py-3 text-lg font-bold text-white shadow-xl shadow-cyan-500/30 transition hover:scale-105 hover:shadow-cyan-500/40">
            Explore Now
          </button>
        </div>

        <div className="hidden md:block rounded-3xl bg-white/10 p-6 text-sm text-slate-100 backdrop-blur-lg border border-white/20">
          <h3 className="text-base font-semibold text-white mb-2">Experience highlights</h3>
          <ul className="space-y-2">
            <li>• Curated destinations</li>
            <li>• Handpicked luxury hotels</li>
            <li>• Trusted traveler connections</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;