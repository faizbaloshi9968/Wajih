import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute";
import LoginRegister from "./pages/login-register";
import TeamManagement from "./pages/team-management";
import PlayerDashboard from "./pages/player-dashboard";
import TournamentBrowseRegistration from "./pages/tournament-browse-registration";
import TournamentDetailsBracketView from "./pages/tournament-details-bracket-view";
import AdminPanel from "./pages/admin-panel";
import UserProfile from "./pages/profile";
import AccountSettings from "./pages/account-settings";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import { ROLES } from "./utils/roles";

const Routes = () => {
  const { loading } = useAuth();

  // Don't render anything while the auth state is loading
  if (loading) {
    return null;
  }

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/" element={<PlayerDashboard />} />
        <Route path="/login-register" element={<LoginRegister />} />
        
        {/* Protected routes */}
        <Route 
          path="/team-management" 
          element={
            <PrivateRoute requiredRole={ROLES.TEAM_MANAGER}>
              <TeamManagement />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute requiredRole={ROLES.PLAYER}>
              <PlayerDashboard />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/tournament-browse-registration" 
          element={
            <PrivateRoute requiredRole={ROLES.PLAYER}>
              <TournamentBrowseRegistration />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/tournament-details-bracket-view" 
          element={
            <PrivateRoute requiredRole={ROLES.PLAYER}>
              <TournamentDetailsBracketView />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/admin-panel" 
          element={
            <PrivateRoute requiredRole={ROLES.ADMIN}>
              <AdminPanel />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <PrivateRoute requiredRole={ROLES.PLAYER}>
              <UserProfile />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/account-settings" 
          element={
            <PrivateRoute requiredRole={ROLES.PLAYER}>
              <AccountSettings />
            </PrivateRoute>
          } 
        />
        
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </ErrorBoundary>
  );
};

export default Routes;