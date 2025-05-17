import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import './index.css'; // ✅ import your external stylesheet

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/login', form);
      setMessage({ text: 'You logged in successfully', type: 'success' });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      setMessage({ text: 'Invalid credentials, try again.', type: 'error' });
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">🔐 Welcome Back</h1>

        {message.text && (
          <div className={`login-message ${message.type === 'success' ? 'success' : 'error'}`}>
            {message.text}
          </div>
        )}

        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Write your name"
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Write your password"
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>

        <p className="login-footer">
          Don’t have an account? <Link to="/">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
