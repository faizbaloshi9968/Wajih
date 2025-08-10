import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BracketMatch = ({ match, userRole, onReportResult, isMobile = false }) => {
  const [showResultModal, setShowResultModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-accent bg-accent/10';
      case 'live':
        return 'border-error bg-error/10 animate-pulse-accent';
      case 'upcoming':
        return 'border-warning bg-warning/10';
      case 'pending':
        return 'border-surface-600 bg-surface-700';
      default:
        return 'border-border bg-surface-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'live':
        return 'Radio';
      case 'upcoming':
        return 'Clock';
      case 'pending':
        return 'HelpCircle';
      default:
        return 'Circle';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'TBD';
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canReportResult = () => {
    return userRole === 'admin' || (userRole === 'player' && match.status === 'completed');
  };

  const handleReportResult = () => {
    setShowResultModal(true);
  };

  const TeamDisplay = ({ team, isWinner, score }) => (
    <div className={`flex items-center space-x-2 p-2 rounded ${isWinner ? 'bg-accent/20' : ''}`}>
      {team.logo ? (
        <Image
          src={team.logo}
          alt={`${team.name} logo`}
          className="w-8 h-8 rounded object-cover"
        />
      ) : (
        <div className="w-8 h-8 bg-surface-600 rounded flex items-center justify-center">
          <Icon name="Users" size={16} className="text-text-muted" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isWinner ? 'text-accent' : 'text-text-primary'}`}>
          {team.name}
        </p>
      </div>
      {score !== null && (
        <div className={`text-lg font-bold ${isWinner ? 'text-accent' : 'text-text-secondary'}`}>
          {score}
        </div>
      )}
      {isWinner && (
        <Icon name="Crown" size={16} className="text-accent" />
      )}
    </div>
  );

  return (
    <>
      <div className={`border-2 rounded-lg p-3 transition-all duration-200 ${getStatusColor(match.status)}`}>
        {/* Match Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon(match.status)} 
              size={16} 
              className={`
                ${match.status === 'completed' ? 'text-accent' : ''}
                ${match.status === 'live' ? 'text-error' : ''}
                ${match.status === 'upcoming' ? 'text-warning' : ''}
                ${match.status === 'pending' ? 'text-text-muted' : ''}
              `}
            />
            <span className="text-xs font-medium text-text-secondary">
              Match #{match.id}
            </span>
          </div>
          <span className="text-xs text-text-muted">
            {formatTime(match.scheduledTime)}
          </span>
        </div>

        {/* Teams */}
        <div className="space-y-2">
          <TeamDisplay
            team={match.team1}
            isWinner={match.winner === match.team1.name}
            score={match.team1.score}
          />
          
          <div className="flex items-center justify-center py-1">
            <div className="text-xs text-text-muted font-medium">VS</div>
          </div>
          
          <TeamDisplay
            team={match.team2}
            isWinner={match.winner === match.team2.name}
            score={match.team2.score}
          />
        </div>

        {/* Match Actions */}
        {(match.status === 'live' || match.status === 'completed') && canReportResult() && (
          <div className="mt-3 pt-3 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReportResult}
              iconName="Edit"
              className="w-full"
            >
              {match.status === 'live' ? 'Update Score' : 'Edit Result'}
            </Button>
          </div>
        )}

        {/* Live Match Indicator */}
        {match.status === 'live' && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-error rounded-full animate-pulse-accent"></div>
              <span className="text-xs font-medium text-error">LIVE</span>
              <div className="w-2 h-2 bg-error rounded-full animate-pulse-accent"></div>
            </div>
          </div>
        )}
      </div>

      {/* Result Reporting Modal */}
      {showResultModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-modal flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Report Match Result</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowResultModal(false)}
                iconName="X"
              />
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-text-secondary mb-4">
                  Match #{match.id} - {match.team1.name} vs {match.team2.name}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    {match.team1.name} Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-3 py-2 bg-surface-700 border border-border rounded-md text-text-primary focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    {match.team2.name} Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-3 py-2 bg-surface-700 border border-border rounded-md text-text-primary focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowResultModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    onReportResult(match.id);
                    setShowResultModal(false);
                  }}
                  className="flex-1"
                >
                  Submit Result
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BracketMatch;