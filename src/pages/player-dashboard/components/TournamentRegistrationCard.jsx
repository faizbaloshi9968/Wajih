import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TournamentRegistrationCard = ({ tournaments, onRegister, onViewTournament }) => {
  const formatPrizePool = (amount) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount}`;
  };

  const getRegistrationStatus = (tournament) => {
    const now = new Date();
    const deadline = new Date(tournament.registrationDeadline);
    const hoursLeft = Math.ceil((deadline - now) / (1000 * 60 * 60));
    
    if (hoursLeft <= 0) {
      return { text: 'Closed', color: 'text-error', urgent: false };
    } else if (hoursLeft <= 24) {
      return { text: `${hoursLeft}h left`, color: 'text-warning', urgent: true };
    } else {
      const daysLeft = Math.ceil(hoursLeft / 24);
      return { text: `${daysLeft}d left`, color: 'text-accent', urgent: false };
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-accent text-accent-foreground';
      case 'intermediate':
        return 'bg-warning text-warning-foreground';
      case 'advanced':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-surface-600 text-text-primary';
    }
  };

  if (!tournaments || tournaments.length === 0) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Available Tournaments</h2>
          <Icon name="Trophy" size={20} className="text-text-secondary" />
        </div>
        <div className="text-center py-8">
          <Icon name="Trophy" size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary mb-2">No tournaments available</p>
          <p className="text-sm text-text-muted">Check back later for new tournaments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Available Tournaments</h2>
        <Icon name="Trophy" size={20} className="text-text-secondary" />
      </div>
      
      <div className="space-y-4">
        {tournaments.map((tournament) => {
          const status = getRegistrationStatus(tournament);
          return (
            <div key={tournament.id} className="border border-border rounded-lg p-4 hover:bg-surface-700 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <Image
                    src={tournament.banner}
                    alt={`${tournament.name} banner`}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">{tournament.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(tournament.difficulty)}`}>
                        {tournament.difficulty}
                      </span>
                      <span className="text-xs text-text-secondary">{tournament.format}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary mb-1">
                    {formatPrizePool(tournament.prizePool)}
                  </div>
                  <div className={`text-xs font-medium ${status.color} ${status.urgent ? 'animate-pulse' : ''}`}>
                    {status.text}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{tournament.participants}/{tournament.maxParticipants}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{tournament.location}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-text-muted mb-4 line-clamp-2">
                {tournament.description}
              </p>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onRegister(tournament.id)}
                  disabled={status.text === 'Closed' || tournament.participants >= tournament.maxParticipants}
                  className="flex-1"
                >
                  {tournament.participants >= tournament.maxParticipants ? 'Full' : 'Register'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewTournament(tournament.id)}
                  iconName="ExternalLink"
                  iconPosition="right"
                >
                  Details
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          iconName="Search"
          iconPosition="left"
        >
          Browse All Tournaments
        </Button>
      </div>
    </div>
  );
};

export default TournamentRegistrationCard;