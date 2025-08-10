import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RosterTab = ({ teamMembers, onPromotePlayer, onRemovePlayer, onUpdateRole }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(null);

  const handleActionMenuToggle = (memberId) => {
    setShowActionMenu(showActionMenu === memberId ? null : memberId);
  };

  const handlePromote = (member) => {
    onPromotePlayer(member.id);
    setShowActionMenu(null);
  };

  const handleRemove = (member) => {
    onRemovePlayer(member.id);
    setShowActionMenu(null);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'manager':
        return 'bg-warning text-warning-foreground';
      case 'co-manager':
        return 'bg-secondary text-secondary-foreground';
      case 'player':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-surface-600 text-text-primary';
    }
  };

  const formatJoinDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Team Stats Header */}
      <div className="bg-surface-800 rounded-lg p-4 border border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">{teamMembers.length}</p>
            <p className="text-sm text-text-secondary">Total Members</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{teamMembers.filter(m => m.status === 'active').length}</p>
            <p className="text-sm text-text-secondary">Active Players</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {Math.round(teamMembers.reduce((acc, m) => acc + m.winRate, 0) / teamMembers.length)}%
            </p>
            <p className="text-sm text-text-secondary">Avg Win Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">{teamMembers.reduce((acc, m) => acc + m.tournamentsPlayed, 0)}</p>
            <p className="text-sm text-text-secondary">Tournaments</p>
          </div>
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-surface border border-border rounded-lg p-4 hover:border-primary transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={member.avatar}
                    alt={`${member.username} avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface ${
                    member.status === 'online' ? 'bg-accent' : 
                    member.status === 'away' ? 'bg-warning' : 'bg-surface-500'
                  }`}></div>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{member.username}</h3>
                  <p className="text-sm text-text-secondary">{member.realName}</p>
                </div>
              </div>
              
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleActionMenuToggle(member.id)}
                  iconName="MoreVertical"
                  className="text-text-secondary hover:text-text-primary"
                />
                
                {showActionMenu === member.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-gaming-lg z-dropdown">
                    <div className="py-2">
                      {member.role === 'player' && (
                        <button
                          onClick={() => handlePromote(member)}
                          className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-700"
                        >
                          <Icon name="ArrowUp" size={16} className="mr-3" />
                          Promote to Co-Manager
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-700"
                      >
                        <Icon name="User" size={16} className="mr-3" />
                        View Profile
                      </button>
                      <button
                        onClick={() => handleRemove(member)}
                        className="w-full flex items-center px-4 py-2 text-sm text-error hover:text-error-400 hover:bg-surface-700"
                        disabled={member.role === 'manager'}
                      >
                        <Icon name="UserMinus" size={16} className="mr-3" />
                        Remove from Team
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Role Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getRoleColor(member.role)}`}>
                {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
              </span>
              <span className="text-xs text-text-muted">
                Joined {formatJoinDate(member.joinDate)}
              </span>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-lg font-semibold text-text-primary">{member.winRate}%</p>
                <p className="text-xs text-text-secondary">Win Rate</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-text-primary">{member.matchesPlayed}</p>
                <p className="text-xs text-text-secondary">Matches</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-text-primary">{member.tournamentsPlayed}</p>
                <p className="text-xs text-text-secondary">Tournaments</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-text-muted">
                Last active: {member.lastActive}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {teamMembers.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="mx-auto text-text-muted mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Team Members</h3>
          <p className="text-text-secondary mb-4">Start building your team by inviting players</p>
          <Button variant="primary" iconName="UserPlus">
            Invite Players
          </Button>
        </div>
      )}
    </div>
  );
};

export default RosterTab;