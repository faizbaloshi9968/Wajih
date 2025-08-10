import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TournamentHistoryTab = ({ tournamentHistory, teamStats }) => {
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const getPlacementColor = (placement) => {
    if (placement === 1) return 'text-warning';
    if (placement <= 3) return 'text-accent';
    if (placement <= 8) return 'text-primary';
    return 'text-text-secondary';
  };

  const getPlacementIcon = (placement) => {
    if (placement === 1) return 'Trophy';
    if (placement <= 3) return 'Medal';
    return 'Award';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-accent text-accent-foreground';
      case 'ongoing':
        return 'bg-primary text-primary-foreground';
      case 'upcoming':
        return 'bg-warning text-warning-foreground';
      case 'cancelled':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-surface-600 text-text-primary';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPrize = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredTournaments = tournamentHistory.filter(tournament => {
    if (filterStatus === 'all') return true;
    return tournament.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Team Performance Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-800 rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-text-primary">{teamStats.totalTournaments}</p>
          <p className="text-sm text-text-secondary">Tournaments</p>
        </div>
        <div className="bg-surface-800 rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-warning">{teamStats.wins}</p>
          <p className="text-sm text-text-secondary">Wins</p>
        </div>
        <div className="bg-surface-800 rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-accent">{teamStats.winRate}%</p>
          <p className="text-sm text-text-secondary">Win Rate</p>
        </div>
        <div className="bg-surface-800 rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-primary">{formatPrize(teamStats.totalEarnings)}</p>
          <p className="text-sm text-text-secondary">Total Earnings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'completed', 'ongoing', 'upcoming'].map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {/* Tournament History List */}
      <div className="space-y-4">
        {filteredTournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="bg-surface border border-border rounded-lg p-4 hover:border-primary transition-colors duration-200 cursor-pointer"
            onClick={() => setSelectedTournament(tournament)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-4">
                <Image
                  src={tournament.logo}
                  alt={`${tournament.name} logo`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-text-primary">{tournament.name}</h3>
                  <p className="text-sm text-text-secondary">{tournament.game} • {formatDate(tournament.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(tournament.status)}`}>
                  {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                </span>
                
                {tournament.placement && (
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={getPlacementIcon(tournament.placement)} 
                      size={16} 
                      className={getPlacementColor(tournament.placement)}
                    />
                    <span className={`text-sm font-medium ${getPlacementColor(tournament.placement)}`}>
                      #{tournament.placement}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-text-secondary">Participants</p>
                <p className="font-medium text-text-primary">{tournament.participants}</p>
              </div>
              <div>
                <p className="text-text-secondary">Prize Pool</p>
                <p className="font-medium text-text-primary">{formatPrize(tournament.prizePool)}</p>
              </div>
              <div>
                <p className="text-text-secondary">Matches Played</p>
                <p className="font-medium text-text-primary">{tournament.matchesPlayed}</p>
              </div>
              <div>
                <p className="text-text-secondary">Earnings</p>
                <p className="font-medium text-accent">{formatPrize(tournament.earnings || 0)}</p>
              </div>
            </div>

            {tournament.status === 'completed' && tournament.highlights && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm text-text-secondary mb-2">Highlights:</p>
                <div className="flex flex-wrap gap-2">
                  {tournament.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-primary bg-opacity-20 text-primary text-xs rounded"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTournaments.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Trophy" size={48} className="mx-auto text-text-muted mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {filterStatus === 'all' ? 'No Tournament History' : `No ${filterStatus} Tournaments`}
          </h3>
          <p className="text-text-secondary mb-4">
            {filterStatus === 'all' ?'Your team hasn\'t participated in any tournaments yet'
              : `No tournaments with ${filterStatus} status found`
            }
          </p>
          <Button variant="primary" iconName="Plus">
            Register for Tournament
          </Button>
        </div>
      )}

      {/* Tournament Detail Modal */}
      {selectedTournament && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal p-4">
          <div className="bg-surface border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={selectedTournament.logo}
                    alt={`${selectedTournament.name} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">{selectedTournament.name}</h2>
                    <p className="text-text-secondary">{selectedTournament.game}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedTournament(null)}
                  className="text-text-secondary hover:text-text-primary"
                />
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Tournament Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Date</p>
                  <p className="font-medium text-text-primary">{formatDate(selectedTournament.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Status</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedTournament.status)}`}>
                    {selectedTournament.status.charAt(0).toUpperCase() + selectedTournament.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Participants</p>
                  <p className="font-medium text-text-primary">{selectedTournament.participants}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Prize Pool</p>
                  <p className="font-medium text-text-primary">{formatPrize(selectedTournament.prizePool)}</p>
                </div>
              </div>

              {/* Performance Details */}
              {selectedTournament.placement && (
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Team Performance</h3>
                  <div className="bg-surface-800 rounded-lg p-4 border border-border">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center mb-2">
                          <Icon 
                            name={getPlacementIcon(selectedTournament.placement)} 
                            size={24} 
                            className={getPlacementColor(selectedTournament.placement)}
                          />
                        </div>
                        <p className={`text-2xl font-bold ${getPlacementColor(selectedTournament.placement)}`}>
                          #{selectedTournament.placement}
                        </p>
                        <p className="text-sm text-text-secondary">Final Placement</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-text-primary">{selectedTournament.matchesPlayed}</p>
                        <p className="text-sm text-text-secondary">Matches Played</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-accent">{formatPrize(selectedTournament.earnings || 0)}</p>
                        <p className="text-sm text-text-secondary">Earnings</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Match Results */}
              {selectedTournament.matches && (
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Match Results</h3>
                  <div className="space-y-2">
                    {selectedTournament.matches.map((match, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-surface-800 rounded border border-border">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-text-secondary">Round {match.round}</span>
                          <span className="text-sm font-medium text-text-primary">vs {match.opponent}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${match.result === 'win' ? 'text-accent' : 'text-error'}`}>
                            {match.score}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            match.result === 'win' ? 'bg-accent text-accent-foreground' : 'bg-error text-error-foreground'
                          }`}>
                            {match.result.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentHistoryTab;