import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // 1. Show a loading spinner while we check the token
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // 2. If no user, kick them to Login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 3. If authorized, show the page
  return children;
};

export default ProtectedRoute;