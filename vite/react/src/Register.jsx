import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './index.css'; // ✅ import your external stylesheet

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/register', form);

      localStorage.setItem(
        'users',
        JSON.stringify({ username: form.username, isLoggedIn: true })
      );

      setMessage({ text: 'User registered successfully!', type: 'success' });
      setForm({ username: '', password: '' });

      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setMessage({ text: 'Registration failed. Try again.', type: 'error' });
      console.error('Registration error:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-title">📝 Sign Up Account</h1>

        {message.text && (
          <div className={`message ${message.type === 'success' ? 'success' : 'error'}`}>
            {message.text}
          </div>
        )}

        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          className="input-field"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          className="input-field"
        />

        <button type="submit" className="submit-button">
          Sign Up
        </button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
