import { useEffect, useState } from "react";
import API from "../services/api";

function AllProfiles() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Could not fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSendRequest = async (userId) => {
    try {
      await API.post(`/connections/request/${userId}`);
      setSuccess("Connection request sent.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not send request.");
      setSuccess("");
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading profiles...</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-6 md:px-6 lg:px-8">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">
          Traveller profiles
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Explore and connect
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          View all travellers and send a connection request.
        </p>
      </header>

      {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      {success && <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{success}</div>}

      <div className="grid gap-4 sm:grid-cols-2">
        {users.map((user) => (
          <div key={user._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={user.profilePicture || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=100&q=80"}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-slate-900">{user.name}</h2>
                <p className="text-xs text-slate-500">{user.location || "Unknown location"}</p>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-600">{user.bio || "No bio yet."}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-600">
              {user.travelInterests?.map((interest) => (
                <span key={`${user._id}-${interest}`} className="rounded-full bg-slate-100 px-2 py-1">{interest}</span>
              ))}
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => handleSendRequest(user._id)}
                className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700"
              >
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProfiles;
