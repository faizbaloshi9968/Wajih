import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROLES, hasPermission } from '../utils/roles';

export default function PrivateRoute({ children, requiredRole }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentUser || !currentUser.isAuthenticated) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/login-register" state={{ returnTo: location.pathname }} replace />;
  }

  // Check for required role if specified
  if (requiredRole) {
    const userRole = currentUser.role || ROLES.PLAYER;
    
    // Use the role hierarchy system for permission checking
    const hasAccess = hasPermission(userRole, requiredRole);
    
    if (!hasAccess) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}
