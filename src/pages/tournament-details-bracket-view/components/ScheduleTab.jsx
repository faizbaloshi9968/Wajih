import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ScheduleTab = ({ tournament, userRole }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  const scheduleData = [
    {
      id: 1,
      date: '2024-01-15',
      time: '14:00',
      match: 'Team Alpha vs Team Beta',
      round: 'Round 1',
      venue: 'Arena A',
      status: 'completed',
      team1: { name: 'Team Alpha', logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=50&h=50&fit=crop' },
      team2: { name: 'Team Beta', logo: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=50&h=50&fit=crop' },
      result: '2-1'
    },
    {
      id: 2,
      date: '2024-01-15',
      time: '14:30',
      match: 'Team Gamma vs Team Delta',
      round: 'Round 1',
      venue: 'Arena B',
      status: 'completed',
      team1: { name: 'Team Gamma', logo: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=50&h=50&fit=crop' },
      team2: { name: 'Team Delta', logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=50&h=50&fit=crop' },
      result: '0-2'
    },
    {
      id: 3,
      date: '2024-01-15',
      time: '15:00',
      match: 'Team Echo vs Team Foxtrot',
      round: 'Round 1',
      venue: 'Arena A',
      status: 'live',
      team1: { name: 'Team Echo', logo: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=50&h=50&fit=crop' },
      team2: { name: 'Team Foxtrot', logo: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=50&h=50&fit=crop' },
      result: null
    },
    {
      id: 4,
      date: '2024-01-15',
      time: '15:30',
      match: 'Team Golf vs Team Hotel',
      round: 'Round 1',
      venue: 'Arena B',
      status: 'upcoming',
      team1: { name: 'Team Golf', logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=50&h=50&fit=crop' },
      team2: { name: 'Team Hotel', logo: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=50&h=50&fit=crop' },
      result: null
    },
    {
      id: 5,
      date: '2024-01-15',
      time: '16:00',
      match: 'Semifinal 1',
      round: 'Semifinals',
      venue: 'Main Arena',
      status: 'upcoming',
      team1: { name: 'Team Alpha', logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=50&h=50&fit=crop' },
      team2: { name: 'Team Delta', logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=50&h=50&fit=crop' },
      result: null
    },
    {
      id: 6,
      date: '2024-01-15',
      time: '17:00',
      match: 'Grand Final',
      round: 'Final',
      venue: 'Main Arena',
      status: 'upcoming',
      team1: { name: 'TBD', logo: null },
      team2: { name: 'TBD', logo: null },
      result: null
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-accent text-accent-foreground';
      case 'live':
        return 'bg-error text-error-foreground animate-pulse-accent';
      case 'upcoming':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-surface-600 text-text-primary';
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
      default:
        return 'Circle';
    }
  };

  const filteredSchedule = scheduleData.filter(match => 
    match.date === selectedDate
  );

  const uniqueDates = [...new Set(scheduleData.map(match => match.date))].sort();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2024-01-01T${timeString}:00`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const MatchCard = ({ match }) => (
    <div className="bg-surface-700 border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name={getStatusIcon(match.status)} size={16} className="text-text-secondary" />
          <span className="text-sm font-medium text-text-primary">{match.round}</span>
        </div>
        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(match.status)}`}>
          {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {match.team1.logo ? (
              <Image
                src={match.team1.logo}
                alt={`${match.team1.name} logo`}
                className="w-8 h-8 rounded object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-surface-600 rounded flex items-center justify-center">
                <Icon name="Users" size={16} className="text-text-muted" />
              </div>
            )}
            <span className="text-sm font-medium text-text-primary">{match.team1.name}</span>
          </div>
          
          <div className="text-xs text-text-muted font-medium px-2">VS</div>
          
          <div className="flex items-center space-x-2">
            {match.team2.logo ? (
              <Image
                src={match.team2.logo}
                alt={`${match.team2.name} logo`}
                className="w-8 h-8 rounded object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-surface-600 rounded flex items-center justify-center">
                <Icon name="Users" size={16} className="text-text-muted" />
              </div>
            )}
            <span className="text-sm font-medium text-text-primary">{match.team2.name}</span>
          </div>
        </div>

        {match.result && (
          <div className="text-lg font-bold text-accent">
            {match.result}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs text-text-secondary">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={14} />
          <span>{formatTime(match.time)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={14} />
          <span>{match.venue}</span>
        </div>
      </div>

      {match.status === 'live' && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse-accent"></div>
            <span className="text-xs font-medium text-error">LIVE NOW</span>
            <div className="w-2 h-2 bg-error rounded-full animate-pulse-accent"></div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Schedule Controls */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Date Selection */}
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={20} className="text-primary" />
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-surface-700 border border-border rounded-md px-3 py-2 text-text-primary focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {uniqueDates.map(date => (
                <option key={date} value={date}>
                  {formatDate(date)}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-surface-700 rounded-lg p-1">
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              iconName="List"
            />
            <Button
              variant={viewMode === 'calendar' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              iconName="Calendar"
            />
          </div>
        </div>
      </div>

      {/* Schedule Content */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredSchedule.length === 0 ? (
            <div className="bg-surface border border-border rounded-lg p-8 text-center">
              <Icon name="Calendar" size={48} className="mx-auto text-text-muted mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">No matches scheduled</h3>
              <p className="text-text-secondary">
                No matches are scheduled for {formatDate(selectedDate)}
              </p>
            </div>
          ) : (
            filteredSchedule.map(match => (
              <MatchCard key={match.id} match={match} />
            ))
          )}
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="mx-auto text-text-muted mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">Calendar View</h3>
            <p className="text-text-secondary">
              Calendar view coming soon. Use list view to see match schedule.
            </p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Tournament Progress</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">
              {scheduleData.filter(m => m.status === 'completed').length}
            </div>
            <div className="text-xs text-text-secondary">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error mb-1">
              {scheduleData.filter(m => m.status === 'live').length}
            </div>
            <div className="text-xs text-text-secondary">Live</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              {scheduleData.filter(m => m.status === 'upcoming').length}
            </div>
            <div className="text-xs text-text-secondary">Upcoming</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary mb-1">
              {scheduleData.length}
            </div>
            <div className="text-xs text-text-secondary">Total</div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      {userRole === 'player' && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Match Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Match Reminders</p>
                <p className="text-xs text-text-secondary">Get notified before your matches</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-primary bg-surface-700 border-border rounded focus:ring-primary focus:ring-2"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Live Updates</p>
                <p className="text-xs text-text-secondary">Real-time match result notifications</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-primary bg-surface-700 border-border rounded focus:ring-primary focus:ring-2"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Schedule Changes</p>
                <p className="text-xs text-text-secondary">Notify when match times change</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-primary bg-surface-700 border-border rounded focus:ring-primary focus:ring-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTab;