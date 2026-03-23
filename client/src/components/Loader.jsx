function Loader() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="inline-flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 text-xs font-medium text-slate-500 shadow-md shadow-slate-200">
        <span className="relative inline-flex h-6 w-6 items-center justify-center">
          <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-gradient-to-tr from-amber-400 via-rose-400 to-sky-400 opacity-40" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-slate-900" />
        </span>
        Loading cinematic journeys...
      </div>
    </div>
  );
}

export default Loader;

