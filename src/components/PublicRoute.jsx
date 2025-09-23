import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const PublicRoute = ({ children }) => {
  const { user, activeRole, isLoading } = useAuthStore();


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  if (user && activeRole === 'mentor') {

    return <Navigate to="/dashboard/mentor" replace />;
  }

  return children;
};

export default PublicRoute;  