import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MatchOversightPanel = () => {
  const [activeFilter, setActiveFilter] = useState('live');
  const [searchTerm, setSearchTerm] = useState('');

  const matches = [
    {
      id: 1,
      tournament: 'Spring Championship 2024',
      teams: ['Team Alpha', 'Team Beta'],
      status: 'live',
      score: [2, 1],
      startTime: '2024-01-20T14:00:00Z',
      venue: 'Arena A',
      round: 'Quarterfinals',
      game: 'Valorant',
      spectators: 1247,
      disputes: 0,
      referee: 'John Smith'
    },
    {
      id: 2,
      tournament: 'Winter Cup Finals',
      teams: ['Team Gamma', 'Team Delta'],
      status: 'scheduled',
      score: [0, 0],
      startTime: '2024-01-20T16:00:00Z',
      venue: 'Arena B',
      round: 'Semifinals',
      game: 'CS2',
      spectators: 0,
      disputes: 0,
      referee: 'Sarah Johnson'
    },
    {
      id: 3,
      tournament: 'Rookie Tournament',
      teams: ['Team Echo', 'Team Foxtrot'],
      status: 'completed',
      score: [3, 1],
      startTime: '2024-01-20T12:00:00Z',
      venue: 'Arena C',
      round: 'Round of 16',
      game: 'League of Legends',
      spectators: 892,
      disputes: 1,
      referee: 'Mike Wilson'
    },
    {
      id: 4,
      tournament: 'Spring Championship 2024',
      teams: ['Team Hotel', 'Team India'],
      status: 'disputed',
      score: [2, 2],
      startTime: '2024-01-20T10:00:00Z',
      venue: 'Arena D',
      round: 'Group Stage',
      game: 'Valorant',
      spectators: 654,
      disputes: 2,
      referee: 'Emma Davis'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-error text-error-foreground';
      case 'scheduled':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-accent text-accent-foreground';
      case 'disputed':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-surface-600 text-text-primary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'live':
        return 'Radio';
      case 'scheduled':
        return 'Clock';
      case 'completed':
        return 'CheckCircle';
      case 'disputed':
        return 'AlertTriangle';
      default:
        return 'Circle';
    }
  };

  const filteredMatches = matches.filter(match => {
    const matchesFilter = activeFilter === 'all' || match.status === activeFilter;
    const matchesSearch = searchTerm === '' || 
      match.tournament.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.teams.some(team => team.toLowerCase().includes(searchTerm.toLowerCase())) ||
      match.venue.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timeString) => {
    return new Date(timeString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const filters = [
    { id: 'live', label: 'Live', count: matches.filter(m => m.status === 'live').length },
    { id: 'scheduled', label: 'Scheduled', count: matches.filter(m => m.status === 'scheduled').length },
    { id: 'disputed', label: 'Disputed', count: matches.filter(m => m.status === 'disputed').length },
    { id: 'completed', label: 'Completed', count: matches.filter(m => m.status === 'completed').length },
    { id: 'all', label: 'All', count: matches.length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Match Oversight</h2>
          <p className="text-text-secondary">Monitor and manage live matches</p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" iconName="Plus">
            Schedule Match
          </Button>
          <Button variant="outline" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search matches by tournament, team, or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                flex items-center px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200
                ${activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-700 text-text-secondary hover:text-text-primary hover:bg-surface-600'
                }
              `}
            >
              {filter.label}
              <span className="ml-2 px-2 py-0.5 text-xs bg-surface-800 rounded-full">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid gap-4">
        {filteredMatches.map((match) => (
          <div key={match.id} className="card p-6 hover:shadow-gaming-lg transition-shadow duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                    <Icon name={getStatusIcon(match.status)} size={12} className="mr-1" />
                    {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                  </span>
                  <span className="text-sm text-text-secondary">{match.tournament}</span>
                  <span className="text-sm text-text-secondary">•</span>
                  <span className="text-sm text-text-secondary">{match.round}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-text-primary">{match.teams[0]}</p>
                      <p className="text-2xl font-bold text-primary">{match.score[0]}</p>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-sm text-text-secondary">VS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-text-primary">{match.teams[1]}</p>
                      <p className="text-2xl font-bold text-primary">{match.score[1]}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-text-secondary">Time</p>
                    <p className="text-text-primary font-medium">
                      {formatDate(match.startTime)} {formatTime(match.startTime)}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Venue</p>
                    <p className="text-text-primary font-medium">{match.venue}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Spectators</p>
                    <p className="text-text-primary font-medium">{match.spectators.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Referee</p>
                    <p className="text-text-primary font-medium">{match.referee}</p>
                  </div>
                </div>

                {match.disputes > 0 && (
                  <div className="mt-3 p-2 bg-error/10 border border-error/20 rounded-lg">
                    <div className="flex items-center text-error">
                      <Icon name="AlertTriangle" size={16} className="mr-2" />
                      <span className="text-sm font-medium">
                        {match.disputes} active dispute{match.disputes > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                {match.status === 'live' && (
                  <Button variant="primary" size="sm" iconName="Eye">
                    Watch Live
                  </Button>
                )}
                {match.status === 'disputed' && (
                  <Button variant="warning" size="sm" iconName="Gavel">
                    Resolve Dispute
                  </Button>
                )}
                <Button variant="outline" size="sm" iconName="Edit">
                  Edit Match
                </Button>
                <Button variant="outline" size="sm" iconName="MessageSquare">
                  Contact Referee
                </Button>
                <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                  More
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMatches.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Zap" size={48} className="mx-auto text-text-muted mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No matches found</h3>
          <p className="text-text-secondary mb-4">
            {activeFilter === 'all' ?'No matches scheduled or in progress.' 
              : `No ${activeFilter} matches found.`
            }
          </p>
          <Button variant="primary" iconName="Plus">
            Schedule New Match
          </Button>
        </div>
      )}
    </div>
  );
};

export default MatchOversightPanel;