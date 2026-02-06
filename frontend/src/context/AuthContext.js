import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'; // This uses your existing Axios setup
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check if user is logged in on App Load
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // We fetch the profile to verify the token is valid
          // Ensure this route matches your Backend: /api/user/profile
          const { data } = await api.get('/user/profile'); 
          setUser(data);
        } catch (error) {
          console.error("Session expired or invalid token");
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkUserLoggedIn();
  }, []);

  // 2. Login Action
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token); // Store JWT
      setUser(data.user);
      toast.success("Login Successful! 🚀");
      return true; // Return success status
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
      return false;
    }
  };

  // 3. Register Action
  const register = async (name, email, password) => {
    try {
      await api.post('/auth/register', { name, email, password });
      toast.success("Registration Successful! Please Login.");
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      toast.error(msg);
      return false;
    }
  };

  // 4. Logout Action
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.info("Logged out successfully");
  };

  // 5. Update Local User Data (To reflect changes instantly without refresh)
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth easily
export const useAuth = () => useContext(AuthContext);