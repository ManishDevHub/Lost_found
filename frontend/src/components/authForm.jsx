import { useState } from "react";
import { loginUser, registerUser } from "../services/api";

export default function AuthForm({ setCurrentUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);

      if (isLogin) {
        const data = await loginUser({ email, password });
        if (!data.user) throw new Error("Login failed");
        localStorage.setItem("token", data.token); // ✅ save token
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ save user
        setCurrentUser(data.user);
        alert("Login successful!");
      } else {
        const confirm = e.target.confirmPassword.value;
        if (password !== confirm) {
          alert("Passwords do not match!");
          return;
        }
        const name = e.target.name.value;
        const data = await registerUser({ name, email, password });
        if (!data.user) throw new Error("Registration failed");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setCurrentUser(data.user);
        alert("Registration successful!");
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-2xl w-96">
        <h2 className="text-indigo-600 text-2xl font-bold mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-3"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-3"
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded mb-3"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="text-sm mt-3 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
}
