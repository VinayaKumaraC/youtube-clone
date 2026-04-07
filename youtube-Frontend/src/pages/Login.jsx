import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      if (!data.email || !data.password) {
        return setError("All fields are required");
      }

      const res = await axios.post(
        "http://localhost:9090/api/auth/login",
        data
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">

      <div className="bg-gray-900 p-6 rounded-lg w-80">

        <h2 className="text-xl mb-4 font-semibold text-center">
          Sign In
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-2">{error}</p>
        )}

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
          onClick={handleLogin}
          className="bg-blue-500 w-full p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;