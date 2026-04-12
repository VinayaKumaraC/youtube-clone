import { useState } from "react";
import API from "../api/axios";

export default function Register() {
  const [data, setData] = useState({});

  const handleRegister = async () => {
    await API.post("/auth/register", data);
    alert("Registered!");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="username" onChange={(e) => setData({...data, username: e.target.value})} />
      <input placeholder="email" onChange={(e) => setData({...data, email: e.target.value})} />
      <input type="password" placeholder="password" onChange={(e) => setData({...data, password: e.target.value})} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}