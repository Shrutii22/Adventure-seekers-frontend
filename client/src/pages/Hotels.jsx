import HotelCard from "../components/HotelCard";

const MOCK_HOTELS = [
  {
    id: "1",
    name: "Skyline Loft Retreat",
    city: "New York",
    country: "USA",
    rating: 4.8,
    price: "$260",
    perks: "Rooftop bar • Late checkout",
    badge: "City favorite",
  },
  {
    id: "2",
    name: "Forest Bath House",
    city: "Hakone",
    country: "Japan",
    rating: 4.9,
    price: "$230",
    perks: "Onsen • Forest views",
    badge: "Serenity",
  },
  {
    id: "3",
    name: "Desert Starlight Camp",
    city: "Wadi Rum",
    country: "Jordan",
    rating: 4.7,
    price: "$170",
    perks: "Stargazing • Guided tours",
    badge: "Adventure",
  },
  {
    id: "4",
    name: "Lakehouse Studio",
    city: "Hallstatt",
    country: "Austria",
    rating: 4.9,
    price: "$290",
    perks: "Lakefront • Balcony",
    badge: "Dreamy",
  },
];

function Hotels() {
  return (
    <section className="bg-slate-50 pt-10 pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-lg shadow-slate-300/40 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">Hotels</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Glassy pools, rooftop bars, hidden riads</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">Stays saved and shared by travellers – filtered by vibe, budget, and the kind of story you want to tell.</p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_HOTELS.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hotels;