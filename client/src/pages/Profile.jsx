import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    location: "",
    travelInterests: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        setUser(res.data);
        setForm({
          name: res.data.name || "",
          bio: res.data.bio || "",
          location: res.data.location || "",
          travelInterests: (res.data.travelInterests || []).join(", "),
          profilePicture: res.data.profilePicture || "",
        });
      } catch (err) {
        setMessage(err.response?.data?.message || "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        name: form.name,
        bio: form.bio,
        location: form.location,
        travelInterests: form.travelInterests
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        profilePicture: form.profilePicture,
      };
      const res = await API.patch("/users/profile", payload);
      setUser(res.data);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-6 md:px-6 lg:px-8">
      <header className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">Profile</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Your traveller profile</h1>
        <p className="mt-1 text-sm text-slate-600">Keep your details fresh so others can connect with your next trip.</p>
      </header>

      {message && <div className="mb-4 rounded-xl bg-slate-100 p-3 text-sm text-slate-700">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-4 shadow-md">
        <div className="flex gap-4 items-center">
          <img
            src={form.profilePicture || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80"}
            alt={form.name || "profile"}
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <label className="text-xs font-semibold text-slate-600">Profile Picture URL</label>
            <input name="profilePicture" value={form.profilePicture} onChange={handleChange} className="mt-1 w-full rounded-lg border p-2 text-sm" placeholder="Image URL" />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-lg border p-2 text-sm" />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600">Location</label>
          <input name="location" value={form.location} onChange={handleChange} className="mt-1 w-full rounded-lg border p-2 text-sm" />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600">Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} className="mt-1 w-full rounded-lg border p-2 text-sm" />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600">Travel Interests (comma separated)</label>
          <input name="travelInterests" value={form.travelInterests} onChange={handleChange} className="mt-1 w-full rounded-lg border p-2 text-sm" />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save profile"}
        </button>
      </form>

      {user && (
        <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-slate-800">Profile preview</h2>
          <div className="mt-2 text-sm text-slate-700">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Location:</strong> {user.location}</p>
            <p><strong>Bio:</strong> {user.bio || "-"}</p>
            <p><strong>Travel interests:</strong> {(user.travelInterests || []).join(", ") || "-"}</p>
          </div>
        </section>
      )}
    </div>
  );
}

export default Profile;
