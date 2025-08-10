import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import GlobalHeader from '../../components/ui/GlobalHeader';
import AdminSidebar from './components/AdminSidebar';
import MetricsCard from './components/MetricsCard';
import UserManagement from './components/UserManagement';
import TournamentControlPanel from './components/TournamentControlPanel';
import MatchOversightPanel from './components/MatchOversightPanel';
import DisputeResolutionPanel from './components/DisputeResolutionPanel';
import AnalyticsPanel from './components/AnalyticsPanel';
import SystemSettingsPanel from './components/SystemSettingsPanel';
import { ROLES, ROLE_DISPLAY_NAMES } from '../../utils/roles';

const AdminPanel = () => {
  const { currentUser, logout, users } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Calculate real metrics from user data
  const getUserStats = () => {
    const totalUsers = users.length;
    const roleStats = {};
    
    Object.values(ROLES).forEach(role => {
      roleStats[role] = users.filter(user => user.role === role).length;
    });
    
    const recentUsers = users.filter(user => {
      const createdAt = new Date(user.createdAt || Date.now());
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return createdAt > weekAgo;
    }).length;
    
    return { totalUsers, roleStats, recentUsers };
  };
  
  const { totalUsers, roleStats, recentUsers } = getUserStats();
  
  // Overview metrics data with real data
  const overviewMetrics = [
    {
      title: 'Total Users',
      value: totalUsers.toString(),
      change: `+${recentUsers} this week`,
      changeType: 'positive',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Players',
      value: roleStats[ROLES.PLAYER]?.toString() || '0',
      change: 'Active players',
      changeType: 'neutral',
      icon: 'User',
      color: 'success'
    },
    {
      title: 'Team Managers',
      value: roleStats[ROLES.TEAM_MANAGER]?.toString() || '0',
      change: 'Managing teams',
      changeType: 'neutral',
      icon: 'Users',
      color: 'accent'
    },
    {
      title: 'Admin Users',
      value: (roleStats[ROLES.ADMIN] + roleStats[ROLES.SUPER_ADMIN] + roleStats[ROLES.OMAN_ESPORT_COMMITTEE])?.toString() || '0',
      change: 'System administrators',
      changeType: 'neutral',
      icon: 'Shield',
      color: 'warning'
    }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Welcome back, {currentUser?.username || currentUser?.email}. Here's what's happening on your platform.</p>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white">
                {ROLE_DISPLAY_NAMES[currentUser?.role] || 'Admin'}
              </div>
            </div>
            
            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewMetrics.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                  color={metric.color}
                />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveSection('tournaments')}
                    className="w-full flex items-center justify-between p-3 bg-surface-700 hover:bg-surface-600 rounded-lg transition-colors duration-200"
                  >
                    <span className="text-text-primary">Create New Tournament</span>
                    <span className="text-primary">→</span>
                  </button>
                  <button 
                    onClick={() => setActiveSection('users')}
                    className="w-full flex items-center justify-between p-3 bg-surface-700 hover:bg-surface-600 rounded-lg transition-colors duration-200"
                  >
                    <span className="text-text-primary">Manage Users</span>
                    <span className="text-primary">→</span>
                  </button>
                  <button 
                    onClick={() => setActiveSection('disputes')}
                    className="w-full flex items-center justify-between p-3 bg-surface-700 hover:bg-surface-600 rounded-lg transition-colors duration-200"
                  >
                    <span className="text-text-primary">Review Disputes</span>
                    <span className="text-primary">→</span>
                  </button>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-text-secondary">New tournament "Spring Cup" created</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm text-text-secondary">Dispute resolved for Match #1247</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-text-secondary">127 new user registrations this week</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-error rounded-full"></div>
                    <span className="text-sm text-text-secondary">System maintenance scheduled for tonight</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return <UserManagement />;
      case 'tournaments':
        return <TournamentControlPanel />;
      case 'matches':
        return <MatchOversightPanel />;
      case 'disputes':
        return <DisputeResolutionPanel />;
      case 'analytics':
        return <AnalyticsPanel />;
      case 'settings':
        return <SystemSettingsPanel />;
      default:
        return <div className="text-text-primary">Section not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <GlobalHeader user={currentUser} onLogout={handleLogout} />
      
      <div className="flex pt-16">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderSectionContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;