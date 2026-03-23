import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 border-b border-slate-200/60 bg-white/85 backdrop-blur-xl shadow-sm">
      <div className="flex w-full items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="text-xl font-bold tracking-wide text-indigo-600">TravelConnect<span className="ml-1 text-amber-500">🌍</span></Link>

        <div className="flex items-center gap-5">
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-700">
            <Link to="/" className="rounded-lg px-3 py-1 transition hover:bg-indigo-50 hover:text-indigo-700">Home</Link>
            <Link to="/places" className="rounded-lg px-3 py-1 transition hover:bg-indigo-50 hover:text-indigo-700">Places</Link>
            <Link to="/connections" className="rounded-lg px-3 py-1 transition hover:bg-indigo-50 hover:text-indigo-700">Connections</Link>
            <Link to="/groups" className="rounded-lg px-3 py-1 transition hover:bg-indigo-50 hover:text-indigo-700">My Groups</Link>
            <Link to="/bookings" className="rounded-lg px-3 py-1 transition hover:bg-indigo-50 hover:text-indigo-700">Bookings</Link>
          </nav>

          <Link to="/profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-xs font-bold text-white shadow-lg transition hover:scale-105">
            A
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;