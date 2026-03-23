function CreateConnection() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 md:px-6 lg:px-8">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-cyan">
          New connection
        </p>
        <h1 className="font-display mt-1 text-2xl font-semibold text-brand-navy sm:text-3xl">
          Share your next trip, meet your people
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Create a small profile for your upcoming plans – where you’re going,
          how you like to travel, and who you’re hoping to meet.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200/70 bg-white/95 p-6 text-sm shadow-xl shadow-slate-200/70">
        <form className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-medium text-slate-700">
              Headline
            </label>
            <input
              type="text"
              placeholder="Summer in Portugal, remote‑working and surfing"
              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Where
            </label>
            <input
              type="text"
              placeholder="City / Country"
              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              When
            </label>
            <input
              type="text"
              placeholder="Dates or rough month"
              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-medium text-slate-700">
              About this trip
            </label>
            <textarea
              rows={4}
              placeholder="What kind of trip is this? How do you like to travel, and what are you hoping to find?"
              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-medium text-slate-700">
              Travel vibes & interests
            </label>
            <input
              type="text"
              placeholder="e.g. Slow mornings, coffee shops, photography, live music"
              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="button"
              className="btn-glow inline-flex w-full items-center justify-center rounded-2xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Publish connection
            </button>
            <p className="mt-2 text-[11px] text-slate-400">
              This is a visual prototype – in the live app your trip will be
              visible to matching travellers.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CreateConnection;

