import { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      // Store token first
      localStorage.setItem("token", res.data.token);

      // Now fetch user profile with authentication
      const profileRes = await API.get("/users/profile");

      const userData = {
        id: profileRes.data._id,
        name: profileRes.data.name,
        email: profileRes.data.email,
        profilePicture: profileRes.data.profilePicture
      };

      login(userData, res.data.token);

      alert("Login successful 🚀");
      navigate("/"); // redirect to home
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-sky-100 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white backdrop-blur-md bg-opacity-90 border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 text-center border-b border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900">Login to TravelConnect</h2>
            <p className="mt-2 text-sm text-slate-500">Your next journey starts here.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-600">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-600">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition"
            >
              Log in
            </button>

            <p className="text-center text-sm text-slate-500">
              Don’t have an account?{' '}
              <Link to="/register" className="text-sky-600 hover:text-sky-700 font-semibold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;