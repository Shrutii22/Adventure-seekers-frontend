import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pb-16 pt-10">
      <div className="mx-auto max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-cyan">
          404
        </p>
        <h1 className="font-display mt-2 text-2xl font-semibold text-brand-navy sm:text-3xl">
          This page missed the flight
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          The link you followed might be broken, or the page may have been
          moved. Let’s route you back to somewhere beautiful.
        </p>
        <Link
          to="/"
          className="btn-glow mt-5 inline-flex items-center justify-center rounded-2xl bg-brand-navy px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

