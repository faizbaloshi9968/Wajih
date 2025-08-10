import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { Shield, Home, LogOut } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-4">
            <Shield className="h-10 w-10 text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400 text-lg">
            You don't have permission to access this page
          </p>
        </div>

        {/* User Info */}
        {currentUser && (
          <div className="bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 mb-8">
            <p className="text-gray-300 mb-2">
              Logged in as: <span className="text-purple-400 font-medium">{currentUser.email}</span>
            </p>
            <p className="text-gray-300">
              Role: <span className="text-pink-400 font-medium">{currentUser.role || 'Not assigned'}</span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            variant="primary"
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Home className="mr-2 h-4 w-4" />
            Go to Homepage
          </Button>
          
          {currentUser?.role === 'player' && (
            <Button
              variant="outline"
              onClick={() => navigate('/player-dashboard')}
              className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
            >
              Try Dashboard Again
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && currentUser && (
          <div className="mt-8 p-4 bg-gray-800/50 rounded-lg text-left">
            <h3 className="text-white font-semibold mb-2">Debug Info:</h3>
            <pre className="text-xs text-gray-400 overflow-auto">
              {JSON.stringify(currentUser, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Unauthorized;
