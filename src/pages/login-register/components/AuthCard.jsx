import React from 'react';

const AuthCard = ({ children, title, subtitle }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-surface border border-border rounded-xl shadow-gaming-lg p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-text-secondary text-sm">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;