function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-start md:justify-between md:px-6 lg:px-8">
        <div className="max-w-xs space-y-3">
          <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-3 py-2 text-white shadow-lg shadow-slate-900/30">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 via-rose-400 to-sky-400 text-xs font-extrabold">
              TC
            </span>
            <span className="text-sm font-semibold tracking-widest uppercase">
              TravelConnect
            </span>
          </div>
          <p className="text-sm text-slate-600">
            Discover cinematic destinations, book stays, and meet your travel
            tribe – all in one place.
          </p>
        </div>

        <div className="flex flex-1 flex-wrap gap-8 text-sm">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Explore
            </p>
            <ul className="space-y-1 text-slate-600">
              <li>Destinations</li>
              <li>Hotels</li>
              <li>Travel guides</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Community
            </p>
            <ul className="space-y-1 text-slate-600">
              <li>Travel buddies</li>
              <li>Stories</li>
              <li>Groups</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Connect
            </p>
            <div className="flex gap-3 text-slate-600">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                in
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                X
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                ig
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200/60 bg-white/90">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-slate-500 md:flex-row md:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} TravelConnect. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

