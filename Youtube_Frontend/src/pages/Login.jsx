import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import "../css/registerLogin.css";

import API from "../api/axios.js";

function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // handle input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // handle login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await API.post("/auth/login", form);

            // ==============================
            // 🔐 STORE TOKEN
            // ==============================
            localStorage.setItem("token", data.token);

            // ==============================
            // 👤 NORMALIZE USER DATA
            // ==============================
            const userData = {
                _id: data._id,
                username: data.username,
                email: data.email,
                avatar: data.avatar || "",
                channelId: data.channel?._id || data.channel || null,
                token: data.token,
            };

            // ==============================
            // 💾 SAVE USER
            // ==============================
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));

            navigate("/");

        } catch (err) {
            console.error(
                "❌ Login failed:",
                err.response?.data?.message || err.message
            );

            alert(
                "Login failed: " +
                (err.response?.data?.message || "Something went wrong")
            );
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">Sign in</h2>

                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button className="auth-btn" type="submit">
                    Login
                </button>

                <div className="auth-switch">
                    Don't have an account?{" "}
                    <span onClick={() => navigate("/register")}>
                        Sign up
                    </span>
                </div>
            </form>
        </div>
    );
}

export default Login;