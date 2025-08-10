import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TournamentHeader = ({ tournament, userRole, onRegister, onWithdraw }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-warning text-warning-foreground';
      case 'live':
        return 'bg-error text-error-foreground animate-pulse-accent';
      case 'completed':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-surface-600 text-text-primary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Tournament Banner */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <Image
          src={tournament.banner}
          alt={`${tournament.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(tournament.status)}`}>
              {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-surface-700 text-text-primary">
              {tournament.format}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {tournament.name}
          </h1>
          <p className="text-sm text-slate-200">
            {tournament.game} • {tournament.participantCount}/{tournament.maxParticipants} participants
          </p>
        </div>
      </div>

      {/* Tournament Info */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Start Date</p>
              <p className="text-sm font-medium text-text-primary">
                {formatDate(tournament.startDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Start Time</p>
              <p className="text-sm font-medium text-text-primary">
                {formatTime(tournament.startDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Prize Pool</p>
              <p className="text-sm font-medium text-text-primary">
                ${tournament.prizePool.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Venue</p>
              <p className="text-sm font-medium text-text-primary">
                {tournament.venue}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {tournament.status === 'upcoming' && !tournament.isRegistered && (
            <Button
              variant="primary"
              onClick={onRegister}
              iconName="UserPlus"
              className="flex-1 sm:flex-none"
            >
              Register for Tournament
            </Button>
          )}
          
          {tournament.status === 'upcoming' && tournament.isRegistered && (
            <Button
              variant="danger"
              onClick={onWithdraw}
              iconName="UserMinus"
              className="flex-1 sm:flex-none"
            >
              Withdraw Registration
            </Button>
          )}

          <Button
            variant="outline"
            iconName="Share2"
            className="flex-1 sm:flex-none"
          >
            Share Tournament
          </Button>

          {userRole === 'admin' && (
            <Button
              variant="secondary"
              iconName="Settings"
              className="flex-1 sm:flex-none"
            >
              Manage Tournament
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentHeader;