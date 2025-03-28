'use client';

import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../utils/axiosConfig"; // Ensure you have an API instance


// Create Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      // setUser(JSON.parse(storedUser));
      // const decodedUser = jwtDecode(storedUser);

      // setUser(decodedUser);
      // // console.log(decodedUser)



      const fetchUser = async () => {
        try {
          const response = await API.get("/api/user"); // Adjust as per your backend API
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
        }
      };
      fetchUser();



      // setIsAuthenticated(true);
    }
  }, []);

  // Login Function
  const login = (userData) => {
    // console.log(userData)
    localStorage.setItem("token", JSON.stringify(userData));
    const decodedUser = jwtDecode(userData);

    setUser(decodedUser);
    setIsAuthenticated(true);
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUser) => {
    console.log(updatedUser)
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
