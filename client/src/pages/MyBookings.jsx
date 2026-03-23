import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings/my-bookings");
        setBookings(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load bookings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const calculateDays = (checkIn, checkOut) => {
    const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  if (isLoading) {
    return <div className="p-10 text-center">Loading your bookings...</div>;
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-6 md:px-6 lg:px-8">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">
          Bookings
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Your booking history
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          A quick view of your booked stays and their current status.
        </p>
      </header>

      {bookings.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 text-center text-slate-600 shadow-sm">
          No bookings found yet. Book a hotel to see it here.
        </div>
      ) : (
        <section className="space-y-3">
          {bookings.map((booking) => {
            const hotel = booking.hotel || {};
            const place = hotel.place || {};
            const status = booking.status ? booking.status.toUpperCase() : "CONFIRMED";
            const totalDays = calculateDays(booking.checkIn, booking.checkOut);
            return (
              <div
                key={booking._id}
                className="flex flex-col justify-between gap-3 rounded-3xl bg-white/90 p-4 text-sm shadow-md shadow-slate-200/80 sm:flex-row sm:items-center"
              >
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    {hotel.name || "Unknown Hotel"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {place.name || "Unknown location"}, {place.country || ""}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)} ({totalDays} days)
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    ₹{booking.totalPrice?.toLocaleString() || "0"}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className={`rounded-full px-3 py-1 font-medium ${
                    status === "CONFIRMED" ? "bg-emerald-50 text-emerald-700" :
                    status === "COMPLETED" ? "bg-blue-50 text-blue-700" :
                    "bg-amber-50 text-amber-700"
                  }`}>
                    {status}
                  </span>
                  <button
                    onClick={() => handleViewDetails(booking)}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-300"
                  >
                    View details
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Booking Details</h3>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-slate-700">Hotel:</span>
                <p className="text-slate-900">{selectedBooking.hotel?.name || "Unknown Hotel"}</p>
              </div>

              <div>
                <span className="font-medium text-slate-700">Location:</span>
                <p className="text-slate-900">
                  {selectedBooking.hotel?.place?.name || "Unknown location"}, {selectedBooking.hotel?.place?.country || ""}
                </p>
              </div>

              <div>
                <span className="font-medium text-slate-700">Check-in:</span>
                <p className="text-slate-900">{formatDate(selectedBooking.checkIn)}</p>
              </div>

              <div>
                <span className="font-medium text-slate-700">Check-out:</span>
                <p className="text-slate-900">{formatDate(selectedBooking.checkOut)}</p>
              </div>

              <div>
                <span className="font-medium text-slate-700">Total Days:</span>
                <p className="text-slate-900">{calculateDays(selectedBooking.checkIn, selectedBooking.checkOut)} days</p>
              </div>

              <div>
                <span className="font-medium text-slate-700">Total Price:</span>
                <p className="text-slate-900">₹{selectedBooking.totalPrice?.toLocaleString() || "0"}</p>
              </div>

              <div>
                <span className="font-medium text-slate-700">Status:</span>
                <p className={`inline-block rounded-full px-2 py-1 text-xs font-medium ml-2 ${
                  selectedBooking.status === "confirmed" ? "bg-emerald-50 text-emerald-700" :
                  selectedBooking.status === "completed" ? "bg-blue-50 text-blue-700" :
                  "bg-amber-50 text-amber-700"
                }`}>
                  {selectedBooking.status?.toUpperCase() || "CONFIRMED"}
                </p>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="mt-6 w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;