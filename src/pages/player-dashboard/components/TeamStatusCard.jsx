import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TeamStatusCard = ({ teamData, pendingInvitations, onJoinTeam, onViewTeam, onRespondInvitation }) => {
  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'captain':
        return 'bg-primary text-primary-foreground';
      case 'co-captain':
        return 'bg-secondary text-secondary-foreground';
      case 'player':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-surface-600 text-text-primary';
    }
  };

  const getTeamStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-accent';
      case 'inactive':
        return 'text-text-muted';
      case 'recruiting':
        return 'text-warning';
      default:
        return 'text-text-secondary';
    }
  };

  // No team case
  if (!teamData) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Team Status</h2>
          <Icon name="Users" size={20} className="text-text-secondary" />
        </div>
        
        {/* Pending Invitations */}
        {pendingInvitations && pendingInvitations.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Pending Invitations</h3>
            <div className="space-y-3">
              {pendingInvitations.map((invitation) => (
                <div key={invitation.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={invitation.teamLogo}
                        alt={`${invitation.teamName} logo`}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium text-text-primary">{invitation.teamName}</div>
                        <div className="text-sm text-text-secondary">
                          Invited by {invitation.invitedBy}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-text-muted">
                      {new Date(invitation.invitedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      size="xs"
                      onClick={() => onRespondInvitation(invitation.id, 'accept')}
                      className="flex-1"
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onRespondInvitation(invitation.id, 'decline')}
                      className="flex-1"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* No Team State */}
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary mb-2">You're not part of any team</p>
          <p className="text-sm text-text-muted mb-4">Join a team to participate in tournaments</p>
          <Button
            variant="primary"
            size="sm"
            onClick={onJoinTeam}
            iconName="UserPlus"
            iconPosition="left"
          >
            Find Teams
          </Button>
        </div>
      </div>
    );
  }

  // Has team case
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Team Status</h2>
        <Icon name="Users" size={20} className="text-text-secondary" />
      </div>
      
      {/* Team Info */}
      <div className="flex items-center space-x-4 mb-6">
        <Image
          src={teamData.logo}
          alt={`${teamData.name} logo`}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-semibold text-text-primary">{teamData.name}</h3>
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getRoleColor(teamData.myRole)}`}>
              {teamData.myRole}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{teamData.memberCount}/{teamData.maxMembers} members</span>
            </div>
            <div className={`flex items-center space-x-1 ${getTeamStatusColor(teamData.status)}`}>
              <div className={`w-2 h-2 rounded-full ${teamData.status === 'active' ? 'bg-accent' : teamData.status === 'recruiting' ? 'bg-warning' : 'bg-text-muted'}`}></div>
              <span className="capitalize">{teamData.status}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-surface-700 rounded-lg">
          <div className="text-lg font-semibold text-text-primary">{teamData.wins}</div>
          <div className="text-xs text-text-secondary">Wins</div>
        </div>
        <div className="text-center p-3 bg-surface-700 rounded-lg">
          <div className="text-lg font-semibold text-text-primary">{teamData.losses}</div>
          <div className="text-xs text-text-secondary">Losses</div>
        </div>
        <div className="text-center p-3 bg-surface-700 rounded-lg">
          <div className="text-lg font-semibold text-text-primary">#{teamData.ranking}</div>
          <div className="text-xs text-text-secondary">Ranking</div>
        </div>
      </div>
      
      {/* Recent Team Members */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-text-primary mb-3">Team Members</h3>
        <div className="space-y-2">
          {teamData.members.slice(0, 4).map((member) => (
            <div key={member.id} className="flex items-center justify-between p-2 bg-surface-700 rounded">
              <div className="flex items-center space-x-3">
                <Image
                  src={member.avatar}
                  alt={`${member.name} avatar`}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium text-text-primary">{member.name}</div>
                  <div className="text-xs text-text-secondary">{member.role}</div>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${member.isOnline ? 'bg-accent' : 'bg-text-muted'}`}></div>
            </div>
          ))}
          {teamData.memberCount > 4 && (
            <div className="text-center py-2">
              <span className="text-xs text-text-muted">+{teamData.memberCount - 4} more members</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Upcoming Team Match */}
      {teamData.nextMatch && (
        <div className="mb-6 p-4 bg-surface-700 rounded-lg">
          <h3 className="text-sm font-medium text-text-primary mb-2">Next Team Match</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-text-primary">
                vs {teamData.nextMatch.opponent}
              </div>
              <div className="text-xs text-text-secondary">
                {new Date(teamData.nextMatch.scheduledTime).toLocaleString()}
              </div>
            </div>
            <Icon name="Calendar" size={16} className="text-text-secondary" />
          </div>
        </div>
      )}
      
      <div className="flex space-x-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onViewTeam(teamData.id)}
          className="flex-1"
          iconName="ExternalLink"
          iconPosition="right"
        >
          View Team
        </Button>
        {teamData.myRole === 'captain' && (
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
          >
            Manage
          </Button>
        )}
      </div>
    </div>
  );
};

export default TeamStatusCard;