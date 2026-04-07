import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    await axios.post(
      "http://localhost:9090/api/auth/register",
      data
    );

    window.location.href = "/login";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="bg-gray-900 p-5 rounded w-80">
        <h2 className="mb-4">Register</h2>

        <input
          placeholder="Name"
          className="w-full mb-2 p-2 bg-gray-800"
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

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

        <button
          onClick={handleRegister}
          className="bg-green-500 w-full p-2"
        >
          <h2 className="mb-4 text-lg font-semibold">Create your account</h2>
        </button>
      </div>
    </div>
  );
};

export default Register;