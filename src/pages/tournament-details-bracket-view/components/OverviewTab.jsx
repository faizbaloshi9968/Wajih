import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OverviewTab = ({ tournament }) => {
  const prizeDistribution = [
    { place: '1st Place', amount: tournament.prizePool * 0.5, percentage: '50%' },
    { place: '2nd Place', amount: tournament.prizePool * 0.3, percentage: '30%' },
    { place: '3rd Place', amount: tournament.prizePool * 0.15, percentage: '15%' },
    { place: '4th Place', amount: tournament.prizePool * 0.05, percentage: '5%' }
  ];

  const participants = [
    {
      id: 1,
      name: 'Team Alpha',
      logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop&crop=face',
      members: ['Player1', 'Player2', 'Player3', 'Player4', 'Player5'],
      rank: 'Professional'
    },
    {
      id: 2,
      name: 'Team Beta',
      logo: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=100&h=100&fit=crop&crop=face',
      members: ['PlayerA', 'PlayerB', 'PlayerC', 'PlayerD', 'PlayerE'],
      rank: 'Semi-Pro'
    },
    {
      id: 3,
      name: 'Team Gamma',
      logo: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=100&h=100&fit=crop&crop=face',
      members: ['UserX', 'UserY', 'UserZ', 'UserW', 'UserV'],
      rank: 'Amateur'
    },
    {
      id: 4,
      name: 'Team Delta',
      logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop&crop=face',
      members: ['GamerA', 'GamerB', 'GamerC', 'GamerD', 'GamerE'],
      rank: 'Professional'
    }
  ];

  const getRankColor = (rank) => {
    switch (rank) {
      case 'Professional':
        return 'bg-error text-error-foreground';
      case 'Semi-Pro':
        return 'bg-warning text-warning-foreground';
      case 'Amateur':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-surface-600 text-text-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tournament Description */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">About This Tournament</h3>
        <p className="text-text-secondary leading-relaxed">
          {tournament.description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-text-primary">Format</p>
              <p className="text-xs text-text-secondary">{tournament.format}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Gamepad2" size={20} className="text-secondary" />
            <div>
              <p className="text-sm font-medium text-text-primary">Game</p>
              <p className="text-xs text-text-secondary">{tournament.game}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Trophy" size={20} className="text-accent" />
            <div>
              <p className="text-sm font-medium text-text-primary">Entry Fee</p>
              <p className="text-xs text-text-secondary">${tournament.entryFee}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Prize Distribution */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Prize Distribution</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {prizeDistribution.map((prize, index) => (
            <div key={index} className="bg-surface-700 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <h4 className="text-sm font-semibold text-text-primary mb-1">{prize.place}</h4>
              <p className="text-lg font-bold text-accent">${prize.amount.toLocaleString()}</p>
              <p className="text-xs text-text-secondary">{prize.percentage} of pool</p>
            </div>
          ))}
        </div>
      </div>

      {/* Participants List */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Registered Participants</h3>
          <span className="text-sm text-text-secondary">
            {tournament.participantCount}/{tournament.maxParticipants} teams
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {participants.map((participant) => (
            <div key={participant.id} className="bg-surface-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Image
                  src={participant.logo}
                  alt={`${participant.name} logo`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-text-primary">{participant.name}</h4>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRankColor(participant.rank)}`}>
                    {participant.rank}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-text-secondary mb-2">Team Members:</p>
                {participant.members.map((member, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-xs text-text-secondary">{member}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Status */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Registration Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm font-medium text-text-primary">Registration Deadline</span>
            </div>
            <p className="text-text-secondary">
              {new Date(tournament.registrationDeadline).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-text-primary">Spots Remaining</span>
            </div>
            <p className="text-text-secondary">
              {tournament.maxParticipants - tournament.participantCount} of {tournament.maxParticipants} available
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-surface-600 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(tournament.participantCount / tournament.maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;