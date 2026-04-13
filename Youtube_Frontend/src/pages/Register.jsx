import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/registerLogin.css'

// ✅ use API instead of axios
import API from '../api/axios.js'

function Register() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        username: '',
        email: '',
        avatar: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = form.username.trim()
        const email = form.email.trim()
        const password = form.password.trim()
        let avatar = form.avatar.trim()

        if (!username || !email || !password) {
            alert("Please fill all fields")
            return
        }

        // default avatar
        if (!avatar) {
            const initial = username.charAt(0).toUpperCase()
            avatar = `https://placehold.co/40x40?text=${initial}`
        }

        try {
            await API.post("/auth/register", {
                username,
                email,
                avatar,
                password
            })

            alert("✅ Registered successfully")
            navigate("/login")

        } catch (err) {
            console.error(err)
            alert("Registration failed")
        }
    }

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>

                <h2>Create your account</h2>

                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    name="avatar"
                    placeholder="Avatar URL"
                    value={form.avatar}
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button type="submit">Register</button>

                <p onClick={() => navigate('/login')}>
                    Already have an account? Login
                </p>

            </form>
        </div>
    )
}

export default Register