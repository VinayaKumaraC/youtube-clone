import { useState } from 'react';
import api from '../api/axios';

export default function Auth({ setToken }) {
  const [Login, setLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });

  const handleSubmit = async (e) => {
  e.preventDefault();
  const endpoint = Login ? '/auth/login' : '/auth/register';
  
  // FIXED: The backend wants 'email', so we map formData.username to the 'email' key
  const payload = Login 
    ? { email: formData.username, password: formData.password } 
    : { username: formData.username, email: formData.email, password: formData.password };

  console.log("Sending Payload:", payload);

  try {
    const response = await api.post(endpoint, payload);
    
    if (Login) {
      // Handle successful login
      const token = response.data.token; 
      localStorage.setItem('token', token);
      setToken(token);
      alert('Logged in successfully!');
    } else {
      alert('Registered! Please log in.');
      setLogin(true);
    }
  } catch (error) {
    console.log("Server Error Message:", error.response?.data);
    alert(error.response?.data?.message || 'Authentication failed.');
  }
};

  return (
    <div className="auth-container">
      <h2>{Login ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!Login && (
          <input 
            type="email" 
            placeholder="Email" 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            required 
          />
        )}
        <input 
          type="text" 
          placeholder="Username"
          autoComplete='username' 
          onChange={e => setFormData({...formData, username: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password"
          autoComplete={Login ? "current-password" : "new-password"} 
          onChange={e => setFormData({...formData, password: e.target.value})} 
          required 
        />
        <button type="submit">{Login ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setLogin(!Login)}>
        Switch to {Login ? 'Register' : 'Login'}
      </button>
    </div>
  );
}