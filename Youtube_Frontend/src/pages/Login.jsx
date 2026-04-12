// handles login

import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({});
  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    const res = await API.post("/auth/login", form);
    login(res.data);
  };

  return (
    <div>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;