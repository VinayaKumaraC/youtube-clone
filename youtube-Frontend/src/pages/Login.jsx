import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// Login page component
const Login = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9090/api/auth/login",
        { email, password }
      );

      // Save token in local storage
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      // Redirect to home page
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">

      {/* Login Box */}
      <div className="bg-gray-900 p-8 rounded-lg w-80 shadow-lg">

        {/* Title */}
        <h2 className="text-2xl mb-5 text-center font-semibold">
          Sign in
        </h2>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 bg-gray-800 rounded outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-gray-800 rounded outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login button */}
        <button
          onClick={handleLogin}
          className="w-full bg-red-500 p-2 rounded hover:bg-red-600"
        >
          Login
        </button>

        {/* Redirect to register */}
        <p className="mt-4 text-sm text-gray-400 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;