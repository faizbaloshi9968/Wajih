import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TournamentCard = ({ tournament, userRole, onRegister }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-accent text-accent-foreground';
      case 'full':
        return 'bg-warning text-warning-foreground';
      case 'closed':
        return 'bg-error text-error-foreground';
      case 'ongoing':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-surface-600 text-text-primary';
    }
  };

  const getGameIcon = (gameType) => {
    switch (gameType.toLowerCase()) {
      case 'valorant':
        return 'Target';
      case 'league of legends':
        return 'Sword';
      case 'counter-strike':
        return 'Crosshair';
      case 'dota 2':
        return 'Shield';
      case 'rocket league':
        return 'Car';
      default:
        return 'Gamepad2';
    }
  };

  const formatPrizePool = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilDeadline = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCardClick = () => {
    navigate('/tournament-details-bracket-view', { 
      state: { tournamentId: tournament.id } 
    });
  };

  const handleRegisterClick = (e) => {
    e.stopPropagation();
    onRegister(tournament);
  };

  const daysUntilDeadline = getDaysUntilDeadline(tournament.registrationDeadline);
  const canRegister = tournament.status === 'open' && daysUntilDeadline > 0;

  return (
    <div 
      className="bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-200 cursor-pointer group shadow-gaming"
      onClick={handleCardClick}
    >
      {/* Tournament Banner */}
      <div className="relative h-32 overflow-hidden">
        <Image
          src={tournament.bannerImage}
          alt={`${tournament.title} banner`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(tournament.status)}`}>
            {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
          </span>
        </div>

        {/* Game Type Icon */}
        <div className="absolute bottom-2 left-2 bg-surface/80 backdrop-blur-sm rounded-full p-2">
          <Icon 
            name={getGameIcon(tournament.gameType)} 
            size={16} 
            className="text-primary"
          />
        </div>
      </div>

      {/* Tournament Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-text-primary line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {tournament.title}
          </h3>
          <div className="flex items-center space-x-1 text-warning ml-2">
            <Icon name="Trophy" size={16} />
            <span className="text-sm font-medium">
              {formatPrizePool(tournament.prizePool)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-sm text-text-secondary">{tournament.gameType}</span>
          <span className="text-text-muted">•</span>
          <span className="text-sm text-text-secondary">{tournament.format}</span>
        </div>

        {/* Tournament Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={14} className="text-text-muted" />
            <span className="text-sm text-text-secondary">
              {tournament.currentParticipants}/{tournament.maxParticipants}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={14} className="text-text-muted" />
            <span className="text-sm text-text-secondary">
              {formatDate(tournament.startDate)}
            </span>
          </div>
        </div>

        {/* Registration Deadline */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} className="text-text-muted" />
            <span className="text-xs text-text-secondary">
              Registration ends: {formatDate(tournament.registrationDeadline)}
            </span>
          </div>
          {daysUntilDeadline > 0 && daysUntilDeadline <= 3 && (
            <span className="text-xs text-warning font-medium">
              {daysUntilDeadline} day{daysUntilDeadline !== 1 ? 's' : ''} left
            </span>
          )}
        </div>

        {/* Entry Fee */}
        {tournament.entryFee > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="DollarSign" size={14} className="text-text-muted" />
            <span className="text-sm text-text-secondary">
              Entry Fee: ${tournament.entryFee}
            </span>
          </div>
        )}

        {/* Registration Button */}
        {canRegister && (
          <Button
            variant={tournament.registrationType === 'team' ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleRegisterClick}
            className="w-full"
            iconName={tournament.registrationType === 'team' ? 'Users' : 'User'}
            iconPosition="left"
          >
            {tournament.registrationType === 'team' ? 'Register Team' : 'Register Solo'}
          </Button>
        )}

        {!canRegister && tournament.status === 'full' && (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="w-full"
            iconName="UserX"
            iconPosition="left"
          >
            Tournament Full
          </Button>
        )}

        {!canRegister && tournament.status === 'closed' && (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="w-full"
            iconName="Lock"
            iconPosition="left"
          >
            Registration Closed
          </Button>
        )}
      </div>
    </div>
  );
};

export default TournamentCard;