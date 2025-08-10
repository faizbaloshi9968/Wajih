import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdminSidebar = ({ activeSection, onSectionChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      description: 'Platform metrics and insights'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      description: 'Manage players and teams'
    },
    {
      id: 'tournaments',
      label: 'Tournament Control',
      icon: 'Trophy',
      description: 'Create and manage tournaments'
    },
    {
      id: 'matches',
      label: 'Match Oversight',
      icon: 'Zap',
      description: 'Monitor and manage matches'
    },
    {
      id: 'disputes',
      label: 'Dispute Resolution',
      icon: 'AlertTriangle',
      description: 'Handle player disputes'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      description: 'Platform performance data'
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: 'Settings',
      description: 'Platform configuration'
    }
  ];

  const handleSectionClick = (sectionId) => {
    onSectionChange(sectionId);
  };

  return (
    <div className="w-64 bg-surface border-r border-border h-full overflow-y-auto">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-error to-warning rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-text-primary">Admin Panel</h2>
            <p className="text-xs text-text-secondary">System Control</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSectionClick(item.id)}
            className={`
              w-full flex items-center p-3 rounded-lg text-left transition-all duration-200 group
              ${activeSection === item.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-700'
              }
            `}
          >
            <Icon 
              name={item.icon} 
              size={20} 
              className="mr-3 flex-shrink-0" 
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.label}</p>
              <p className="text-xs opacity-75 truncate">{item.description}</p>
            </div>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/player-dashboard')}
          className="w-full justify-start text-text-secondary hover:text-text-primary"
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;