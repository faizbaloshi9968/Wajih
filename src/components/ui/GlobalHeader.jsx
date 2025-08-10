import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Button from './Button';
import PrimaryNavigation from './PrimaryNavigation';
import NotificationCenter from './NotificationCenter';
import UserProfileDropdown from './UserProfileDropdown';

const GlobalHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const { currentUser, logout } = useAuth();

  const handleAuthAction = () => {
    if (currentUser) {
      logout();
    } else {
      navigate('/login-register');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

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
        Wajh
      </span>
    </div>
  );

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-header bg-surface border-b border-border shadow-gaming"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <PrimaryNavigation 
              currentPath={location.pathname}
              userRole={currentUser?.role || 'guest'}
            />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <NotificationCenter />
                <UserProfileDropdown user={currentUser} onLogout={logout} />
              </>
            ) : (
              <Button
                variant="primary"
                onClick={() => navigate('/login-register')}
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMobileMenuToggle}
                iconName={isMobileMenuOpen ? "X" : "Menu"}
                className="text-text-secondary hover:text-text-primary"
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <PrimaryNavigation 
                currentPath={location.pathname}
                userRole={currentUser?.role || 'guest'}
                isMobile={true}
                onItemClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default GlobalHeader;