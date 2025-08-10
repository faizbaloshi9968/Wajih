import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import BracketMatch from './BracketMatch';

const BracketTab = ({ tournament, userRole, onReportResult }) => {
  const [selectedRound, setSelectedRound] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Mock bracket data for single elimination
  const bracketData = {
    rounds: [
      {
        name: 'Round 1',
        matches: [
          {
            id: 1,
            team1: { name: 'Team Alpha', score: 2, logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=50&h=50&fit=crop' },
            team2: { name: 'Team Beta', score: 1, logo: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=50&h=50&fit=crop' },
            status: 'completed',
            winner: 'Team Alpha',
            scheduledTime: '2024-01-15T14:00:00Z'
          },
          {
            id: 2,
            team1: { name: 'Team Gamma', score: 0, logo: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=50&h=50&fit=crop' },
            team2: { name: 'Team Delta', score: 2, logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=50&h=50&fit=crop' },
            status: 'completed',
            winner: 'Team Delta',
            scheduledTime: '2024-01-15T14:30:00Z'
          },
          {
            id: 3,
            team1: { name: 'Team Echo', score: null, logo: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=50&h=50&fit=crop' },
            team2: { name: 'Team Foxtrot', score: null, logo: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=50&h=50&fit=crop' },
            status: 'live',
            winner: null,
            scheduledTime: '2024-01-15T15:00:00Z'
          },
          {
            id: 4,
            team1: { name: 'Team Golf', score: null, logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=50&h=50&fit=crop' },
            team2: { name: 'Team Hotel', score: null, logo: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=50&h=50&fit=crop' },
            status: 'upcoming',
            winner: null,
            scheduledTime: '2024-01-15T15:30:00Z'
          }
        ]
      },
      {
        name: 'Semifinals',
        matches: [
          {
            id: 5,
            team1: { name: 'Team Alpha', score: null, logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=50&h=50&fit=crop' },
            team2: { name: 'Team Delta', score: null, logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=50&h=50&fit=crop' },
            status: 'upcoming',
            winner: null,
            scheduledTime: '2024-01-15T16:00:00Z'
          },
          {
            id: 6,
            team1: { name: 'TBD', score: null, logo: null },
            team2: { name: 'TBD', score: null, logo: null },
            status: 'pending',
            winner: null,
            scheduledTime: '2024-01-15T16:30:00Z'
          }
        ]
      },
      {
        name: 'Final',
        matches: [
          {
            id: 7,
            team1: { name: 'TBD', score: null, logo: null },
            team2: { name: 'TBD', score: null, logo: null },
            status: 'pending',
            winner: null,
            scheduledTime: '2024-01-15T17:00:00Z'
          }
        ]
      }
    ]
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleRoundNavigation = (direction) => {
    if (direction === 'prev' && selectedRound > 0) {
      setSelectedRound(selectedRound - 1);
    } else if (direction === 'next' && selectedRound < bracketData.rounds.length - 1) {
      setSelectedRound(selectedRound + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Bracket Controls */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Round Navigation */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRoundNavigation('prev')}
              disabled={selectedRound === 0}
              iconName="ChevronLeft"
            />
            <span className="text-sm font-medium text-text-primary px-4">
              {bracketData.rounds[selectedRound]?.name || 'Round 1'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRoundNavigation('next')}
              disabled={selectedRound === bracketData.rounds.length - 1}
              iconName="ChevronRight"
            />
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.5}
              iconName="ZoomOut"
            />
            <span className="text-xs text-text-secondary px-2">
              {Math.round(zoomLevel * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2}
              iconName="ZoomIn"
            />
          </div>
        </div>
      </div>

      {/* Mobile Bracket View */}
      <div className="block lg:hidden">
        <div className="bg-surface border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            {bracketData.rounds[selectedRound]?.name}
          </h3>
          <div className="space-y-4">
            {bracketData.rounds[selectedRound]?.matches.map((match) => (
              <BracketMatch
                key={match.id}
                match={match}
                userRole={userRole}
                onReportResult={onReportResult}
                isMobile={true}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Bracket View */}
      <div className="hidden lg:block">
        <div className="bg-surface border border-border rounded-lg p-6 overflow-x-auto">
          <div 
            className="bracket-container min-w-max"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
          >
            <div className="flex space-x-8">
              {bracketData.rounds.map((round, roundIndex) => (
                <div key={roundIndex} className="flex flex-col space-y-4 min-w-64">
                  <h3 className="text-sm font-semibold text-text-primary text-center mb-4">
                    {round.name}
                  </h3>
                  <div className="space-y-8">
                    {round.matches.map((match, matchIndex) => (
                      <div key={match.id} className="relative">
                        <BracketMatch
                          match={match}
                          userRole={userRole}
                          onReportResult={onReportResult}
                          isMobile={false}
                        />
                        
                        {/* Connection Lines */}
                        {roundIndex < bracketData.rounds.length - 1 && (
                          <div className="absolute top-1/2 -right-4 w-8 h-px bg-border"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bracket Legend */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Legend</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-xs text-text-secondary">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full animate-pulse-accent"></div>
            <span className="text-xs text-text-secondary">Live</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs text-text-secondary">Upcoming</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-surface-600 rounded-full"></div>
            <span className="text-xs text-text-secondary">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BracketTab;