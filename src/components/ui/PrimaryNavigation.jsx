import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';


const PrimaryNavigation = ({ currentPath, userRole, isMobile = false, onItemClick }) => {
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/player-dashboard',
      icon: 'LayoutDashboard',
      roles: ['player', 'manager', 'admin']
    },
    {
      label: 'Tournaments',
      path: '/tournament-browse-registration',
      icon: 'Trophy',
      roles: ['player', 'manager', 'admin']
    },
    {
      label: 'Teams',
      path: '/team-management',
      icon: 'Users',
      roles: ['player', 'manager', 'admin']
    },
    {
      label: 'Admin Panel',
      path: '/admin-panel',
      icon: 'Settings',
      roles: ['admin']
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onItemClick) {
      onItemClick();
    }
  };

  const isActive = (path) => {
    if (path === '/player-dashboard') {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  if (isMobile) {
    return (
      <div className="space-y-1">
        {filteredItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`
              w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
              ${isActive(item.path)
                ? 'bg-primary text-primary-foreground'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-700'
              }
            `}
          >
            <Icon 
              name={item.icon} 
              size={20} 
              className="mr-3" 
            />
            {item.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <nav className="flex space-x-1">
      {filteredItems.map((item) => (
        <button
          key={item.path}
          onClick={() => handleNavigation(item.path)}
          className={`
            flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 min-h-touch
            ${isActive(item.path)
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-700'
            }
          `}
        >
          <Icon 
            name={item.icon} 
            size={18} 
            className="mr-2" 
          />
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default PrimaryNavigation;