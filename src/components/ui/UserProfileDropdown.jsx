import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';
import { ROLE_DISPLAY_NAMES, ROLE_COLORS } from '../../utils/roles';

const UserProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    setIsOpen(false);
    navigate('/account-settings');
  };

  const handleTeamClick = () => {
    setIsOpen(false);
    navigate('/team-management');
  };

  const getRoleDisplayName = (role) => {
    return ROLE_DISPLAY_NAMES[role] || 'User';
  };

  const getRoleBadgeColor = (role) => {
    const colorClass = ROLE_COLORS[role] || 'bg-gray-600';
    return `${colorClass} text-white`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Profile Button */}
      <div ref={buttonRef}>
        <button
          onClick={handleToggle}
          className="flex items-center space-x-2 p-1 rounded-lg hover:bg-surface-700 transition-colors duration-200 min-h-touch"
        >
          <div className="relative">
            <Image
              src={user.profileImage || user.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`}
              alt={`${user.username || user.name} avatar`}
              className="w-8 h-8 rounded-full object-cover border-2 border-border"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent border-2 border-surface rounded-full"></div>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-text-primary">{user.username || user.name}</p>
            <p className="text-xs text-text-secondary">{getRoleDisplayName(user.role)}</p>
          </div>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`text-text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-gaming-lg z-dropdown animate-slide-down"
        >
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <Image
                src={user.profileImage || user.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`}
                alt={`${user.username || user.name} avatar`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">
                  {user.username || user.name}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {user.email}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                    {getRoleDisplayName(user.role)}
                  </span>
                  {user.team && (
                    <span className="text-xs text-text-muted">
                      {user.team}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-700 transition-colors duration-200"
            >
              <Icon name="User" size={16} className="mr-3" />
              View Profile
            </button>

            <button
              onClick={handleSettingsClick}
              className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-700 transition-colors duration-200"
            >
              <Icon name="Settings" size={16} className="mr-3" />
              Account Settings
            </button>

            {user.team && (
              <button
                onClick={handleTeamClick}
                className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-700 transition-colors duration-200"
              >
                <Icon name="Users" size={16} className="mr-3" />
                Team Dashboard
              </button>
            )}

            <div className="border-t border-border my-2"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-error hover:text-error-400 hover:bg-surface-700 transition-colors duration-200"
            >
              <Icon name="LogOut" size={16} className="mr-3" />
              Sign Out
            </button>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>TourneyHub v2.1.0</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;