import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthHeader = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleLogoClick = () => {
    navigate('/player-dashboard');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would toggle the theme
    console.log('Theme toggled:', isDarkMode ? 'Light' : 'Dark');
  };

  const Logo = () => (
    <div 
      className="flex items-center space-x-2 cursor-pointer group"
      onClick={handleLogoClick}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-white"
          fill="currentColor"
        >
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      <span className="text-xl font-bold text-text-primary font-heading group-hover:text-primary transition-colors duration-200">
        TourneyHub
      </span>
    </div>
  );

  return (
    <header className="w-full bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-text-secondary hover:text-text-primary"
            >
              <Icon 
                name={isDarkMode ? 'Sun' : 'Moon'} 
                size={20} 
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;