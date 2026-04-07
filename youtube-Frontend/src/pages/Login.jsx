import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const res = await axios.post(
      "http://localhost:9090/api/auth/login",
      data
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="bg-gray-900 p-5 rounded w-80">
        <h2 className="mb-4">Sign in</h2>

        <input
          placeholder="Email"
          className="w-full mb-2 p-2 bg-gray-800"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 bg-gray-800"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button onClick={handleLogin} className="bg-blue-500 w-full p-2">
          <h2 className="mb-4 text-lg font-semibold">Sign in</h2>
        </button>
      </div>
    </div>
  );
};

export default Login;