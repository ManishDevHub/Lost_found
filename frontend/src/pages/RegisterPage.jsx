import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { registerUser } from "../services/api"; // ✅ backend API import

export default function RegisterPage({ setCurrentUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ name, email, password });

      if (data.token) {
        localStorage.setItem("token", data.token); // ✅ Save JWT
        setCurrentUser(data.user); // ✅ Save user in state
        navigate("/"); // ✅ Redirect to home/dashboard
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md relative">
        {/* Back Arrow */}
        <button
          onClick={() => navigate("/login")}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={24} />
        </button>

        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Register
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded"
          >
            Register
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
