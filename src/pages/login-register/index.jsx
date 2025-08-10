import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthHeader from './components/AuthHeader';
import AuthCard from './components/AuthCard';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import DiscordOAuth from './components/DiscordOAuth';

const LoginRegisterPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && currentUser && currentUser.isAuthenticated) {
      // Get the stored user data for role information
      const userData = JSON.parse(localStorage.getItem('user')) || currentUser;
      // Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin-panel');
      } else {
        navigate('/player-dashboard');
      }
    }
  }, [navigate, currentUser, loading]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Header */}
      <AuthHeader />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          <AuthCard
            title={activeTab === 'login' ? 'Welcome Back' : 'Join TourneyHub'}
            subtitle={
              activeTab === 'login' ?'Sign in to your account to continue' :'Create your account to get started'
            }
          >
            {/* Tab Navigation */}
            <AuthTabs 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
            />

            {/* Form Content */}
            <div className="space-y-6">
              {activeTab === 'login' ? (
                <LoginForm />
              ) : (
                <RegisterForm />
              )}

              {/* Discord OAuth */}
              <DiscordOAuth />
            </div>
          </AuthCard>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-text-muted">
              {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                className="text-primary hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                {activeTab === 'login' ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-secondary opacity-10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;