import { useEffect, useState } from "react";
import axios from "axios";
import HotelCard from "./HotelCard";

function HotelsSection() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hotels")
      .then((res) => setHotels(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="px-6 py-12 bg-gray-50">

     <h1 className="text-3xl font-bold mb-2 text-center">
  Featured Hotels
</h1>

<p className="text-gray-500 text-center mb-10">
  Comfortable stays at the best locations
</p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>

    </div>
  );
}

export default HotelsSection;