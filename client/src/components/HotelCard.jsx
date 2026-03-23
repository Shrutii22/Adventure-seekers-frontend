import { useNavigate } from "react-router-dom";
import { useState } from "react";

function HotelCard({ hotel }) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    navigate(`/hotels/${hotel._id}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
    >
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={imageError ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" : hotel.images?.[0]}
          alt={hotel.name}
          onError={handleImageError}
          className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
          ⭐ {hotel.rating ?? "—"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Hotel Name */}
        <h2 className="text-lg font-semibold">
          {hotel.name}
        </h2>

        {/* Location */}
        <p className="text-sm text-gray-500 mb-2">
          {hotel.place?.name}, {hotel.place?.country}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-3">
          {hotel.amenities?.slice(0, 3).map((item, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between">

          {/* Price */}
          <div>
            <p className="text-lg font-bold text-indigo-600">
              ₹{hotel.pricePerNight}
            </p>
            <p className="text-xs text-gray-400">
              per night
            </p>
          </div>

          {/* Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // 🚨 prevents double navigation
              navigate(`/hotels/${hotel._id}`);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
          >
            Book Now
          </button>

        </div>
      </div>
    </div>
  );
}

export default HotelCard;