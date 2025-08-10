import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const TournamentControlPanel = () => {
  const [activeTab, setActiveTab] = useState('active');

  const tournaments = [
    {
      id: 1,
      name: 'Spring Championship 2024',
      game: 'Valorant',
      status: 'active',
      participants: 64,
      maxParticipants: 64,
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      prizePool: '$10,000',
      format: 'Single Elimination',
      organizer: 'TourneyHub Admin'
    },
    {
      id: 2,
      name: 'Winter Cup Finals',
      game: 'CS2',
      status: 'completed',
      participants: 32,
      maxParticipants: 32,
      startDate: '2024-01-15',
      endDate: '2024-01-28',
      prizePool: '$5,000',
      format: 'Double Elimination',
      organizer: 'Pro Gaming League'
    },
    {
      id: 3,
      name: 'Rookie Tournament',
      game: 'League of Legends',
      status: 'registration',
      participants: 18,
      maxParticipants: 32,
      startDate: '2024-02-20',
      endDate: '2024-03-05',
      prizePool: '$2,500',
      format: 'Round Robin',
      organizer: 'Community Esports'
    },
    {
      id: 4,
      name: 'Pro League Season 1',
      game: 'Dota 2',
      status: 'draft',
      participants: 0,
      maxParticipants: 16,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      prizePool: '$25,000',
      format: 'Swiss System',
      organizer: 'TourneyHub Admin'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-accent text-accent-foreground';
      case 'completed':
        return 'bg-surface-600 text-text-primary';
      case 'registration':
        return 'bg-warning text-warning-foreground';
      case 'draft':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-surface-600 text-text-primary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'Play';
      case 'completed':
        return 'CheckCircle';
      case 'registration':
        return 'Clock';
      case 'draft':
        return 'FileText';
      default:
        return 'Circle';
    }
  };

  const filteredTournaments = tournaments.filter(tournament => {
    if (activeTab === 'all') return true;
    return tournament.status === activeTab;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const tabs = [
    { id: 'active', label: 'Active', count: tournaments.filter(t => t.status === 'active').length },
    { id: 'registration', label: 'Registration', count: tournaments.filter(t => t.status === 'registration').length },
    { id: 'draft', label: 'Draft', count: tournaments.filter(t => t.status === 'draft').length },
    { id: 'completed', label: 'Completed', count: tournaments.filter(t => t.status === 'completed').length },
    { id: 'all', label: 'All', count: tournaments.length }
  ];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Tournament Control</h2>
          <p className="text-text-secondary">Manage and oversee all tournaments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" iconName="Plus">
            Create Tournament
          </Button>
          <Button variant="outline" iconName="Download">
            Export Data
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                ${activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-strong'
                }
              `}
            >
              {tab.label}
              <span className="ml-2 px-2 py-0.5 text-xs bg-surface-700 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tournament Cards */}
      <div className="grid gap-6">
        {filteredTournaments.map((tournament) => (
          <div key={tournament.id} className="card p-6 hover:shadow-gaming-lg transition-shadow duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-text-primary">{tournament.name}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                    <Icon name={getStatusIcon(tournament.status)} size={12} className="mr-1" />
                    {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-text-secondary">Game</p>
                    <p className="text-text-primary font-medium">{tournament.game}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Participants</p>
                    <p className="text-text-primary font-medium">
                      {tournament.participants}/{tournament.maxParticipants}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Prize Pool</p>
                    <p className="text-text-primary font-medium">{tournament.prizePool}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Format</p>
                    <p className="text-text-primary font-medium">{tournament.format}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-sm text-text-secondary">
                  <div className="flex items-center">
                    <Icon name="Calendar" size={14} className="mr-1" />
                    {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                  </div>
                  <div className="flex items-center">
                    <Icon name="User" size={14} className="mr-1" />
                    {tournament.organizer}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm" iconName="Eye">
                  View Details
                </Button>
                <Button variant="outline" size="sm" iconName="Edit">
                  Edit
                </Button>
                <Button variant="outline" size="sm" iconName="Settings">
                  Manage
                </Button>
                {tournament.status === 'active' && (
                  <Button variant="primary" size="sm" iconName="Play">
                    Monitor Live
                  </Button>
                )}
              </div>
            </div>

            {/* Progress Bar for Registration */}
            {tournament.status === 'registration' && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-text-secondary mb-1">
                  <span>Registration Progress</span>
                  <span>{Math.round((tournament.participants / tournament.maxParticipants) * 100)}%</span>
                </div>
                <div className="w-full bg-surface-700 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTournaments.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Trophy" size={48} className="mx-auto text-text-muted mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No tournaments found</h3>
          <p className="text-text-secondary mb-4">
            {activeTab === 'all' ?'No tournaments have been created yet.' 
              : `No tournaments with ${activeTab} status.`
            }
          </p>
          <Button variant="primary" iconName="Plus">
            Create Your First Tournament
          </Button>
        </div>
      )}
    </div>
  );
};

export default TournamentControlPanel;