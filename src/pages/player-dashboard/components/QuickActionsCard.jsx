import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionsCard = ({ onFindTournament, onJoinTeam, onUpdateProfile, onViewMatches }) => {
  const quickActions = [
    {
      id: 'find-tournament',
      title: 'Find Tournament',
      description: 'Browse and register for upcoming tournaments',
      icon: 'Search',
      color: 'primary',
      onClick: onFindTournament
    },
    {
      id: 'join-team',
      title: 'Join Team',
      description: 'Find teams looking for new members',
      icon: 'UserPlus',
      color: 'secondary',
      onClick: onJoinTeam
    },
    {
      id: 'update-profile',
      title: 'Update Profile',
      description: 'Manage your player information and settings',
      icon: 'User',
      color: 'accent',
      onClick: onUpdateProfile
    },
    {
      id: 'view-matches',
      title: 'Match History',
      description: 'Review your past match performances',
      icon: 'History',
      color: 'warning',
      onClick: onViewMatches
    }
  ];

  const getActionButtonVariant = (color) => {
    switch (color) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'accent':
        return 'success';
      case 'warning':
        return 'warning';
      default:
        return 'outline';
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Quick Actions</h2>
        <Icon name="Zap" size={20} className="text-text-secondary" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <div
            key={action.id}
            className="group p-4 border border-border rounded-lg hover:bg-surface-700 transition-all duration-200 cursor-pointer"
            onClick={action.onClick}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-${action.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200`}>
                <Icon 
                  name={action.icon} 
                  size={20} 
                  className={`text-${action.color} group-hover:scale-110 transition-transform duration-200`}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                  {action.title}
                </h3>
                <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                  {action.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-text-primary">12</div>
            <div className="text-xs text-text-secondary">Active Tournaments</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-text-primary">8</div>
            <div className="text-xs text-text-secondary">Teams Recruiting</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-text-primary">24</div>
            <div className="text-xs text-text-secondary">Online Players</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;