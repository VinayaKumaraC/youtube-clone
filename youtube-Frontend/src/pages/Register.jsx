import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    try {
      if (!data.name || !data.email || !data.password) {
        return setError("All fields are required");
      }

      await axios.post(
        "http://localhost:9090/api/auth/register",
        data
      );

      setSuccess("Registration successful! Redirecting...");
      setError("");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">

      <div className="bg-gray-900 p-6 rounded-lg w-80">

        <h2 className="text-xl mb-4 font-semibold text-center">
          Create Account
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-2">{error}</p>
        )}

        {success && (
          <p className="text-green-400 text-sm mb-2">{success}</p>
        )}

        <input
          placeholder="Name"
          className="w-full mb-3 p-2 bg-gray-800 rounded"
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-2 bg-gray-800 rounded"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-gray-800 rounded"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button
          onClick={handleRegister}
          className="bg-green-500 w-full p-2 rounded hover:bg-green-600"
        >
          Register
        </button>

      </div>
    </div>
  );
};

export default Register;