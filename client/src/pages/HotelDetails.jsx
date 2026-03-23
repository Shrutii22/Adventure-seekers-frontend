import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function HotelDetails() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [available, setAvailable] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // ✅ Fetch hotel (handles array response from backend)
  useEffect(() => {
    API.get(`/hotels/${id}`)
      .then((res) => {
        console.log("Hotel API response:", res.data);
        // If API returns array, take first element
        setHotel(Array.isArray(res.data) ? res.data[0] : res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // ✅ Check availability
  const checkAvailability = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates");
      return;
    }

    try {
      const res = await API.get(`/hotels/${id}/availability`, {
        params: { checkIn, checkOut },
      });
      setAvailable(res.data.available);

      // Reset price if not available
      if (!res.data.available) setTotalPrice(null);
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Error checking availability");
    }
  };

  // ✅ Calculate total price
  const calculatePrice = () => {
    if (!checkIn || !checkOut || !hotel) return;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      alert("Check-out must be after check-in");
      return;
    }

    setTotalPrice(nights * hotel.pricePerNight);
  };

  // ✅ Handle booking
  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      return alert("Please select dates");
    }
    if (!totalPrice) {
      return alert("Please check availability first");
    }
    if (!hotel || !hotel._id) {
      console.log("Hotel object before booking:", hotel);
      return alert("Hotel data not loaded yet");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return alert("You must be logged in to book");
    }

    try {
      await API.post(
        "/bookings",
        {
          hotelId: hotel._id,
          checkIn,
          checkOut,
          totalPrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookingStatus("Booking Confirmed ✅");
    } catch (err) {
      console.log(err.response?.data || err);
      setBookingStatus(err.response?.data?.message || "Booking Failed ❌");
    }
  };



  if (!hotel) {
    return <div className="p-10 text-center">Loading hotel data...</div>;
  }

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      {/* 🖼️ Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {hotel.images?.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="hotel"
            className="w-full h-[300px] object-cover rounded-xl"
          />
        ))}
      </div>

      {/* 🏨 Hotel Info */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
        <p className="text-gray-500 mt-2">
          {hotel.place?.name}, {hotel.place?.country || ""}
        </p>
        <p className="mt-4 text-gray-600">{hotel.description}</p>
      </div>

      {/* ⭐ Rating + Price */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl font-semibold">⭐ {hotel.rating}</p>
        <p className="text-2xl font-bold text-indigo-600">
          ₹{hotel.pricePerNight} / night
        </p>
      </div>

      {/* 🛏️ Amenities */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Amenities</h2>
        <div className="flex flex-wrap gap-3">
          {hotel.amenities?.map((item, idx) => (
            <span
              key={idx}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* 📅 Booking Section */}
      <div className="bg-gray-50 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Book Your Stay</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <button
            type="button"
            onClick={() => {
              checkAvailability();
              calculatePrice();
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Check
          </button>
        </div>

        {/* Price */}
        {totalPrice && (
          <p className="text-lg font-semibold mb-2">
            Total Price: ₹{totalPrice}
          </p>
        )}

        {/* Availability */}
        {available !== null && (
          <p className={`mb-3 ${available ? "text-green-600" : "text-red-600"}`}>
            {available ? "Available ✅" : "Not Available ❌"}
          </p>
        )}

        {/* Book Button */}
        {available && totalPrice && (
          <button
            onClick={handleBooking}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Confirm Booking
          </button>
        )}

        {/* Booking Status */}
        {bookingStatus && <p className="mt-3 font-semibold">{bookingStatus}</p>}
      </div>
    </div>
  );
}

export default HotelDetails;