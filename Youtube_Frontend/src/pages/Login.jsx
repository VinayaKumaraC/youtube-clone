import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import '../css/registerLogin.css'

//  use central API instead of axios directly
import API from '../api/axios.js'

// Login page for user authentication
function Login() {
    const { setUser } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    // handle input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // handle login submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // ✅ correct backend endpoint
            const { data } = await API.post("/auth/login", form)

            // ✅ store token (VERY IMPORTANT)
            localStorage.setItem("token", data.token)

            // optional: store username for UI
            localStorage.setItem("username", data.username)

            // save user in context
            setUser(data)

            // redirect to homepage
            navigate("/")

        } catch (err) {
            console.error("❌ Login failed:", err.response?.data?.message || err.message)
            alert("Login failed: " + (err.response?.data?.message || "Something went wrong"))
        }
    }

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">Sign in</h2>

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder='email'
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder='password'
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button className="auth-btn" type="submit">Login</button>

                <div className="auth-switch">
                    Don't have an account?{' '}
                    <span className="auth-link" onClick={() => navigate('/register')}>
                        Sign up
                    </span>
                </div>
            </form>
        </div>
    )
}

export default Login