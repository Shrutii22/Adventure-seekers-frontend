import { useEffect, useState } from "react";
import axios from "axios";
import PlaceCard from "../components/PlaceCard";

function Places() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/places");
        setPlaces(res.data || []);
      } catch (err) {
        setError("Could not load places.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading places...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-6 lg:px-8">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">
          Destinations
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Explore all places
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Discover amazing destinations from our database.
        </p>
      </header>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => (
          <PlaceCard key={place._id} place={place} />
        ))}
      </div>
    </div>
  );
}

export default Places;