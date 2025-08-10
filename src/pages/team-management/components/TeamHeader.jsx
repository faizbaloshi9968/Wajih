import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TeamHeader = ({ team, onEditTeam, onTeamSettings, onRegisterTournament }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Show loading state if team data is not available
  if (!team) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6 mb-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-300 rounded w-48"></div>
              <div className="h-4 bg-gray-300 rounded w-64"></div>
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Team Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={team.logo}
              alt={`${team.name} logo`}
              className="w-16 h-16 rounded-lg object-cover border-2 border-border"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full border-2 border-surface flex items-center justify-center">
              <Icon name="Shield" size={12} className="text-accent-foreground" />
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-2xl font-bold text-text-primary">{team.name}</h1>
              <span className="inline-flex items-center px-2 py-1 bg-primary bg-opacity-20 text-primary text-xs rounded font-medium">
                {team.tag}
              </span>
            </div>
            <p className="text-text-secondary mb-2">{team.description}</p>
            <div className="flex items-center space-x-4 text-sm text-text-muted">
              <span className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>Founded {formatDate(team.foundedDate)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Users" size={14} />
                <span>{team.memberCount} members</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Trophy" size={14} />
                <span>{team.tournamentsWon} wins</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            iconName="Plus"
            onClick={onRegisterTournament}
            className="flex-1 sm:flex-none"
          >
            Register Tournament
          </Button>
          <Button
            variant="secondary"
            iconName="UserPlus"
            className="flex-1 sm:flex-none"
          >
            Invite Players
          </Button>
          <Button
            variant="outline"
            iconName="Settings"
            onClick={onTeamSettings}
            className="flex-1 sm:flex-none"
          >
            Team Settings
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">{team.rank}</p>
            <p className="text-sm text-text-secondary">Global Rank</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{team.winRate}%</p>
            <p className="text-sm text-text-secondary">Win Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{team.totalMatches}</p>
            <p className="text-sm text-text-secondary">Matches Played</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
              }).format(team.totalEarnings)}
            </p>
            <p className="text-sm text-text-secondary">Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Recent Activity</h3>
        <div className="space-y-2">
          {team.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'win' ? 'bg-accent' :
                activity.type === 'loss' ? 'bg-error' :
                activity.type === 'join' ? 'bg-primary' : 'bg-warning'
              }`}></div>
              <span className="text-text-secondary">{activity.description}</span>
              <span className="text-text-muted">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;