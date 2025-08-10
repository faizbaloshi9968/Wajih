import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingMatchesCard = ({ matches, onViewDetails }) => {
  const formatMatchTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.ceil((date - now) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}h`;
    } else {
      const diffDays = Math.ceil(diffHours / 24);
      return `${diffDays}d`;
    }
  };

  const getMatchStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'text-warning';
      case 'live':
        return 'text-error animate-pulse';
      case 'completed':
        return 'text-accent';
      default:
        return 'text-text-secondary';
    }
  };

  if (!matches || matches.length === 0) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Upcoming Matches</h2>
          <Icon name="Calendar" size={20} className="text-text-secondary" />
        </div>
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary mb-2">No upcoming matches</p>
          <p className="text-sm text-text-muted">Register for tournaments to see your matches here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Upcoming Matches</h2>
        <Icon name="Calendar" size={20} className="text-text-secondary" />
      </div>
      
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="border border-border rounded-lg p-4 hover:bg-surface-700 transition-colors duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${match.status === 'live' ? 'bg-error animate-pulse' : 'bg-warning'}`}></div>
                <span className="text-sm font-medium text-text-primary">{match.tournament}</span>
              </div>
              <span className={`text-xs font-medium ${getMatchStatusColor(match.status)}`}>
                {match.status === 'live' ? 'LIVE' : `in ${formatMatchTime(match.scheduledTime)}`}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Image
                    src={match.myTeam.logo}
                    alt={`${match.myTeam.name} logo`}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <span className="text-sm font-medium text-text-primary">{match.myTeam.name}</span>
                </div>
                <span className="text-text-muted">vs</span>
                <div className="flex items-center space-x-2">
                  <Image
                    src={match.opponent.logo}
                    alt={`${match.opponent.name} logo`}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <span className="text-sm font-medium text-text-primary">{match.opponent.name}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{new Date(match.scheduledTime).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{match.venue}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => onViewDetails(match.id)}
                className="text-primary hover:text-primary-400"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          iconName="Calendar"
          iconPosition="left"
        >
          View All Matches
        </Button>
      </div>
    </div>
  );
};

export default UpcomingMatchesCard;