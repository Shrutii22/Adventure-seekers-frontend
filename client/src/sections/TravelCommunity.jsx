import UserCard from "../components/UserCard";

const MOCK_USERS = [
  {
    id: "1",
    name: "Maya Kapoor",
    location: "Bangalore → Anywhere with mountains",
    bio: "Product designer chasing sunrises, slow trains, and third-wave coffee in new cities.",
    tags: ["Design", "Solo travel", "Hostel life"],
  },
  {
    id: "2",
    name: "Leo Martinez",
    location: "Madrid → Surf towns",
    bio: "Remote engineer who plans trips around swells, local food, and live music.",
    tags: ["Remote work", "Surf", "Live music"],
  },
  {
    id: "3",
    name: "Aya Nakamura",
    location: "Tokyo → Hidden bookstores",
    bio: "Writer collecting stories from alleyway bars, quiet bookstores, and train windows.",
    tags: ["Writing", "City walks", "Photography"],
  },
];

function TravelCommunity() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 sm:pb-16 md:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Meet your travel people
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Join a community of travellers who plan, share, and explore
            together – online and on the road.
          </p>
        </div>
        <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:border-slate-300">
          Explore connections
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {MOCK_USERS.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}

export default TravelCommunity;

