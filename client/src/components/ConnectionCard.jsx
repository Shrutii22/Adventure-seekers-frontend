function ConnectionCard({ connection }) {
  return (
    <article className="card-lift flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/95 p-5 shadow-md shadow-slate-200/70 transition-all duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={
              connection.avatar ||
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80"
            }
            alt={connection.name}
            className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
          />
          <div>
            <h3 className="font-display text-sm font-semibold text-slate-900">
              {connection.name}
            </h3>
            <p className="text-[11px] text-slate-500">
              {connection.location || "Somewhere on earth"}
            </p>
          </div>
        </div>
        <div className="rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-medium text-cyan-700">
          {connection.nextTrip || "Open to plans"}
        </div>
      </div>
      <p className="line-clamp-3 text-xs text-slate-600">
        {connection.bio ||
          "Always down for sunrise hikes, late-night city walks, and everything in between."}
      </p>
      <div className="mt-auto flex items-center justify-between pt-1 text-[11px]">
        <div className="flex flex-wrap gap-2 text-slate-500">
          {connection.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <button className="btn-glow inline-flex items-center rounded-full bg-brand-navy px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800">
          Connect
        </button>
      </div>
    </article>
  );
}

export default ConnectionCard;

