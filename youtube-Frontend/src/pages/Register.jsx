import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// Register page component
const Register = () => {
  const navigate = useNavigate();

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle register
  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:9090/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      alert("Registration successful");

      // Redirect to login
      navigate("/login");
    } catch (error) {
      alert("Error creating account");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">

      {/* Register Box */}
      <div className="bg-gray-900 p-8 rounded-lg w-80 shadow-lg">

        {/* Title */}
        <h2 className="text-2xl mb-5 text-center font-semibold">
          Create Account
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 bg-gray-800 rounded outline-none"
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 bg-gray-800 rounded outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-gray-800 rounded outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Register button */}
        <button
          onClick={handleRegister}
          className="w-full bg-red-500 p-2 rounded hover:bg-red-600"
        >
          Register
        </button>

        {/* Redirect to login */}
        <p className="mt-4 text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;