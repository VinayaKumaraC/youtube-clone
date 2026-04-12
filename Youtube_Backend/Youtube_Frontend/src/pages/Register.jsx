// user registration page

import { useState } from "react";
import API from "../api/axios";

function Register() {
  const [form, setForm] = useState({});

  const handleSubmit = async () => {
    await API.post("/auth/register", form);
    alert("Registered successfully, now login");
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default Register;