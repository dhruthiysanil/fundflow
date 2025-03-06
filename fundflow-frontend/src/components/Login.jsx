'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axiosConfig';
import './Login.css';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Login = () => {

  const { login } = useContext(AuthContext); // Access login function from context

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await API.post('/auth/login', { email, password });
      const data = response.data;
      console.log("Response:", data); // Debugging response

      // if (response.data) {
      //   localStorage.setItem('token', response.data.token);
      //   localStorage.setItem('email', response.data.email);
      //   localStorage.setItem('phone', response.data.phone);
      //   alert('Login successful!');
      //   navigate('/home');
      // } else {
      //   throw new Error("Invalid response from server.");
      // }


      if (data.token) {
        login(data.token);
        // alert('Login successful!');
        navigate('/home');
      }
    } catch (err) {
      console.error("Login error:", err.response);
      setError(err.response?.data?.message || "Login failed.");
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
            <h1>Log In</h1>
            <p>Enter your email and password to access your dashboard.</p>
            <form onSubmit={handleSubmit}>
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
                Sign In
              </button>
              <div className="links">
                Don't have an account? <a href="/Reg">Sign Up</a>
              </div>
              <a href="/forgot-password" className="forgot-password">
                Forgot Password?
              </a>
            </form>

            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
