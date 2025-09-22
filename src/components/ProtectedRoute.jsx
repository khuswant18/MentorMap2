import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, activeRole, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && activeRole !== requiredRole) {
    return activeRole === "mentor" ? (
      <Navigate to="/dashboard/mentor" replace />
    ) : (
      <Navigate to="/student/dashboard" replace />
    );
  }

  return children;
};

export default ProtectedRoute;
