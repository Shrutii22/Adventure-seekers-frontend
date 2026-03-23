function UserCard({ user }) {
  return (
    <article className="card-lift flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/95 p-5 shadow-md shadow-slate-200/70 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={
              user.avatar ||
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80"
            }
            alt={user.name}
            className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white bg-emerald-400" />
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold text-slate-900">{user.name}</h3>
          <p className="text-[11px] text-slate-500">
            {user.location || "Remote planet"}
          </p>
        </div>
      </div>
      <p className="line-clamp-3 text-xs text-slate-600">{user.bio}</p>
      <div className="mt-auto flex flex-wrap gap-2 text-[11px] text-slate-500">
        {user.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default UserCard;

