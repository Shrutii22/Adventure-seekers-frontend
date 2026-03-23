import { useEffect, useState } from "react";
import axios from "axios";
import PlaceCard from "./PlaceCard";

function PlacesSection() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/places")
      .then((res) => setPlaces(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 py-14 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px] rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-xl shadow-slate-300/40 backdrop-blur">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center md:text-4xl">
          Explore Destinations
        </h2>

        <p className="mt-3 text-center text-slate-500 sm:text-base">
          Handpicked places for your next journey.
        </p>

        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <PlaceCard key={place._id} place={place} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlacesSection;