import React from 'react';
import TournamentCard from './TournamentCard';

const TournamentGrid = ({ tournaments, userRole, onRegister, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="h-32 bg-surface-700"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-surface-700 rounded w-3/4"></div>
              <div className="h-3 bg-surface-700 rounded w-1/2"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-3 bg-surface-700 rounded"></div>
                <div className="h-3 bg-surface-700 rounded"></div>
              </div>
              <div className="h-8 bg-surface-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-surface-700 rounded-full flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">No tournaments found</h3>
        <p className="text-text-secondary mb-4">
          Try adjusting your filters or check back later for new tournaments.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tournaments.map((tournament) => (
        <TournamentCard
          key={tournament.id}
          tournament={tournament}
          userRole={userRole}
          onRegister={onRegister}
        />
      ))}
    </div>
  );
};

export default TournamentGrid;