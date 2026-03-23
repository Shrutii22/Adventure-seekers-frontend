import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Connections() {
  const [connections, setConnections] = useState([]);
  const [pending, setPending] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [friendsRes, pendingRes, sentRes] = await Promise.all([
          API.get("/connections/friends"),
          API.get("/connections/requests"),
          API.get("/connections/sent"),
        ]);
        setConnections(friendsRes.data || []);
        setPending(pendingRes.data || []);
        setSent(sentRes.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load connections.");
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      const [friendsRes, pendingRes, sentRes] = await Promise.all([
        API.get("/connections/friends"),
        API.get("/connections/requests"),
        API.get("/connections/sent"),
      ]);
      setConnections(friendsRes.data || []);
      setPending(pendingRes.data || []);
      setSent(sentRes.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Could not reload connections.");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await API.post(`/connections/accept/${requestId}`);
      refresh();
    } catch (err) {
      setError(err.response?.data?.message || "Could not accept request.");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await API.post(`/connections/reject/${requestId}`);
      refresh();
    } catch (err) {
      setError(err.response?.data?.message || "Could not reject request.");
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading connections...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-6 lg:px-8">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">Connections</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">Your connections</h1>
          <p className="mt-1 max-w-xl text-sm text-slate-600">Accept/reject requests and see your accepted friends.</p>
        </div>
        <Link to="/users" className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700">Browse profiles</Link>
      </header>

      {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-slate-900">Pending requests</h2>
          {pending.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">No pending incoming requests.</p>
          ) : (
            <div className="mt-2 space-y-2">
              {pending.map((req) => (
                <div key={req._id} className="rounded-xl border border-slate-200 p-2">
                  <div className="text-sm font-semibold text-slate-900">{req.sender.name || "Unknown"}</div>
                  <div className="text-xs text-slate-500">{req.sender.email}</div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => handleAccept(req._id)} className="rounded-full bg-emerald-600 px-2 py-1 text-xs text-white">Accept</button>
                    <button onClick={() => handleReject(req._id)} className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-slate-900">Sent requests</h2>
          {sent.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">No pending sent requests.</p>
          ) : (
            <div className="mt-2 space-y-2">
              {sent.map((req) => (
                <div key={req._id} className="rounded-xl border border-slate-200 p-2">
                  <div className="text-sm font-semibold text-slate-900">{req.receiver.name || "Unknown"}</div>
                  <div className="text-xs text-slate-500">{req.receiver.email}</div>
                  <div className="text-xs text-slate-500 mt-1">Status: Pending</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-slate-900">Connected friends</h2>
          {connections.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">No accepted connections yet.</p>
          ) : (
            <div className="mt-2 space-y-2">
              {connections.map((connection) => {
                const otherUser = connection.sender._id !== connection.receiver._id ? connection.sender : connection.receiver;
                return (
                  <div key={connection._id} className="rounded-xl border border-slate-200 p-2">
                    <div className="text-sm font-semibold text-slate-900">{otherUser.name || "Friend"}</div>
                    <div className="text-xs text-slate-500">{otherUser.email}</div>
                    <div className="text-xs text-emerald-700 mt-1">Confirmed</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Connections;