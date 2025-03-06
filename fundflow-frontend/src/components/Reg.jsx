'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../utils/axiosConfig';
import './Login.css';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = { name, email, password };
      // console.log(data)
      const response = await API.post('/auth/register', data);

      if (response.data) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); // Redirect using useNavigate
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="page-container">
      <div className="card-container">
        <div className="login-left">
          <img src="/images/i3.jpg" alt="Decorative cube illustration" />
        </div>
        <div className="login-right">
          <div className="login-form">
            <h1>Sign Up</h1>
            <p>Sign up & manage fundraisers, donations & more</p>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="sign-in-button">
                Sign Up
              </button>
              <div className="links">
                Already signed up?
                <a href="/login">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
