import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HotelCard from "../components/HotelCard";

function PlaceDetails() {
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Fetch place details
    axios
      .get(`http://localhost:5000/api/places/${id}`)
      .then((res) => setPlace(res.data))
      .catch((err) => console.log(err));

    // Fetch hotels for this place
    axios
      .get(`http://localhost:5000/api/hotels/place/${id}`)
      .then((res) => setHotels(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!place) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div>

      {/* 🔥 Hero Section */}
      <div
        className="relative h-[60vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${place.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            {place.name}
          </h1>
          <p className="text-lg text-gray-200 mt-2">
            {place.country}
          </p>
        </div>
      </div>

      {/* 📄 Description */}
      <div className="px-6 py-12 max-w-5xl mx-auto text-center">
        <p className="text-gray-600 text-lg">
          {place.description}
        </p>

        {/* Tags */}
        <div className="flex justify-center gap-3 mt-6 flex-wrap">
          {place.popularFor?.map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 🏨 Hotels Section */}
      <div className="px-6 py-12 bg-gray-50">

        <h2 className="text-3xl font-bold text-center mb-2">
          Hotels in {place.name}
        </h2>

        <p className="text-gray-500 text-center mb-10">
          Choose your perfect stay
        </p>

        {hotels.length === 0 ? (
          <p className="text-center text-gray-500">
            No hotels available
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default PlaceDetails;