import PlaceCard from "../components/PlaceCard";

const MOCK_PLACES = [
  {
    id: "1",
    name: "Santorini Clifftop",
    country: "Greece",
    region: "Cyclades Islands",
    tag: "Sunset views",
    rating: 4.9,
    startingFrom: "$190",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    description:
      "Whitewashed villages spilling into deep blue seas, golden hours that last forever.",
  },
  {
    id: "2",
    name: "Kyoto Old Town",
    country: "Japan",
    region: "Higashiyama",
    tag: "Slow travel",
    rating: 4.8,
    startingFrom: "$160",
    image:
      "https://images.unsplash.com/photo-1526481280695-3c687fd543c0?auto=format&fit=crop&w=1200&q=80",
    description:
      "Lantern-lit alleys, hidden tea houses, and temples tucked under maple trees.",
  },
  {
    id: "3",
    name: "Patagonia Trails",
    country: "Argentina",
    region: "El Chaltén",
    tag: "Hiking",
    rating: 4.9,
    startingFrom: "$130",
    image:
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=80",
    description:
      "Jagged peaks, turquoise lakes, and trails that feel like another planet.",
  },
];

function PopularDestinations() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16 md:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Popular cinematic escapes
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Curated spots where the light hits different – loved by the
            TravelConnect community.
          </p>
        </div>
        <button className="text-xs font-semibold text-amber-600 hover:text-amber-500">
          View all places →
        </button>
      </div>

      <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_PLACES.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}

export default PopularDestinations;

