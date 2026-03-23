import { useNavigate } from "react-router-dom";
import { useState } from "react";

function PlaceCard({ place }) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      onClick={() => navigate(`/places/${place._id}`)}
      className="group relative h-[350px] rounded-3xl overflow-hidden border border-white/30 bg-white/10 shadow-xl shadow-slate-500/20 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-600/25 cursor-pointer"
    >
      <img
        src={imageError ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80" : place.image}
        alt={place.name}
        onError={handleImageError}
        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-sm">
        <h2 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg">
          {place.name}
        </h2>
        <p className="text-xs text-slate-200/90 mb-3 uppercase tracking-widest">{place.country}</p>

        <div className="flex flex-wrap gap-2">
          {place.popularFor?.slice(0, 3).map((tag, index) => (
            <span key={index} className="rounded-full bg-white/20 px-2 py-1 text-[11px] text-white">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;