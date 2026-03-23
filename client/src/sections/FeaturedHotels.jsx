import HotelCard from "../components/HotelCard";

const MOCK_HOTELS = [
  {
    id: "1",
    name: "Aurora Glass Cabin",
    city: "Reykjavík",
    country: "Iceland",
    rating: 4.9,
    price: "$320",
    perks: "Aurora wake-up calls • Onsen access",
    badge: "Editor’s pick",
    image:
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    name: "Rooftop Riad Haven",
    city: "Marrakesh",
    country: "Morocco",
    rating: 4.8,
    price: "$190",
    perks: "Sunset terrace • Mint tea rituals",
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    name: "Clifftop Infinity Villa",
    city: "Amalfi",
    country: "Italy",
    rating: 4.9,
    price: "$410",
    perks: "Private chef • Sea view pool",
    badge: "Luxury",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
  },
];

function FeaturedHotels() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 sm:pb-16 md:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Featured stays for your story
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Handpicked boutique hotels and stays where every corner is a photo
            moment.
          </p>
        </div>
        <button className="text-xs font-semibold text-amber-600 hover:text-amber-500">
          Browse all hotels →
        </button>
      </div>

      <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_HOTELS.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedHotels;

