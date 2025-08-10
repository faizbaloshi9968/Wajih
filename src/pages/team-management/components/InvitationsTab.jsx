import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InvitationsTab = ({ invitations, onSendInvitation, onCancelInvitation, onResendInvitation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteMessage, setInviteMessage] = useState('');

  const mockSearchResults = [
    {
      id: 1,
      username: 'ProGamer123',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      winRate: 78,
      rank: 'Diamond',
      isOnline: true
    },
    {
      id: 2,
      username: 'EliteSniper',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face',
      winRate: 85,
      rank: 'Master',
      isOnline: false
    },
    {
      id: 3,
      username: 'TacticalMind',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      winRate: 72,
      rank: 'Platinum',
      isOnline: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'accepted':
        return 'bg-accent text-accent-foreground';
      case 'declined':
        return 'bg-error text-error-foreground';
      case 'expired':
        return 'bg-surface-600 text-text-primary';
      default:
        return 'bg-surface-600 text-text-primary';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePlayerSelect = (player) => {
    setSelectedPlayers(prev => {
      const isSelected = prev.find(p => p.id === player.id);
      if (isSelected) {
        return prev.filter(p => p.id !== player.id);
      } else {
        return [...prev, player];
      }
    });
  };

  const handleSendInvitations = () => {
    selectedPlayers.forEach(player => {
      onSendInvitation({
        playerId: player.id,
        playerName: player.username,
        message: inviteMessage || `Join our team! We think you'd be a great addition to our roster.`
      });
    });
    setSelectedPlayers([]);
    setInviteMessage('');
    setShowInviteModal(false);
  };

  const filteredSearchResults = mockSearchResults.filter(player =>
    player.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="primary"
          iconName="UserPlus"
          onClick={() => setShowInviteModal(true)}
          className="flex-1 sm:flex-none"
        >
          Invite Players
        </Button>
        <Button
          variant="secondary"
          iconName="MessageSquare"
          className="flex-1 sm:flex-none"
        >
          Discord Integration
        </Button>
        <Button
          variant="outline"
          iconName="Download"
          className="flex-1 sm:flex-none"
        >
          Export Invitations
        </Button>
      </div>

      {/* Invitation Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-800 rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-warning">{invitations.filter(i => i.status === 'pending').length}</p>
          <p className="text-sm text-text-secondary">Pending</p>
        </div>
        <div className="bg-surface-800 rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-accent">{invitations.filter(i => i.status === 'accepted').length}</p>
          <p className="text-sm text-text-secondary">Accepted</p>
        </div>
        <div className="bg-surface-800 rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-error">{invitations.filter(i => i.status === 'declined').length}</p>
          <p className="text-sm text-text-secondary">Declined</p>
        </div>
        <div className="bg-surface-800 rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-text-primary">{invitations.length}</p>
          <p className="text-sm text-text-secondary">Total Sent</p>
        </div>
      </div>

      {/* Invitations List */}
      <div className="bg-surface border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-text-primary">Sent Invitations</h3>
        </div>
        
        <div className="divide-y divide-border">
          {invitations.map((invitation) => (
            <div key={invitation.id} className="p-4 hover:bg-surface-700 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={invitation.playerAvatar}
                    alt={`${invitation.playerName} avatar`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-text-primary">{invitation.playerName}</h4>
                    <p className="text-sm text-text-secondary">
                      Sent {formatDate(invitation.sentDate)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(invitation.status)}`}>
                    {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                  </span>
                  
                  <div className="flex space-x-2">
                    {invitation.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="RefreshCw"
                          onClick={() => onResendInvitation(invitation.id)}
                          className="text-text-secondary hover:text-text-primary"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="X"
                          onClick={() => onCancelInvitation(invitation.id)}
                          className="text-error hover:text-error-400"
                        />
                      </>
                    )}
                    {invitation.status === 'declined' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="RotateCcw"
                        onClick={() => onResendInvitation(invitation.id)}
                        className="text-text-secondary hover:text-text-primary"
                      />
                    )}
                  </div>
                </div>
              </div>
              
              {invitation.message && (
                <div className="mt-3 p-3 bg-surface-800 rounded border border-border">
                  <p className="text-sm text-text-secondary">{invitation.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {invitations.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="Mail" size={48} className="mx-auto text-text-muted mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">No Invitations Sent</h3>
            <p className="text-text-secondary">Start recruiting players for your team</p>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal p-4">
          <div className="bg-surface border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary">Invite Players</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setShowInviteModal(false)}
                  className="text-text-secondary hover:text-text-primary"
                />
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Search Players */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Search Players
                </label>
                <Input
                  type="search"
                  placeholder="Search by username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Search Results */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredSearchResults.map((player) => (
                  <div
                    key={player.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                      selectedPlayers.find(p => p.id === player.id)
                        ? 'border-primary bg-primary bg-opacity-10' :'border-border hover:border-primary hover:bg-surface-700'
                    }`}
                    onClick={() => handlePlayerSelect(player)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Image
                            src={player.avatar}
                            alt={`${player.username} avatar`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface ${
                            player.isOnline ? 'bg-accent' : 'bg-surface-500'
                          }`}></div>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary">{player.username}</h4>
                          <p className="text-sm text-text-secondary">{player.rank} • {player.winRate}% Win Rate</p>
                        </div>
                      </div>
                      
                      {selectedPlayers.find(p => p.id === player.id) && (
                        <Icon name="Check" size={20} className="text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Players */}
              {selectedPlayers.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Selected Players ({selectedPlayers.length})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center space-x-2 bg-primary bg-opacity-20 text-primary px-3 py-1 rounded-full"
                      >
                        <span className="text-sm">{player.username}</span>
                        <button
                          onClick={() => handlePlayerSelect(player)}
                          className="hover:text-primary-400"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Invitation Message */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Invitation Message (Optional)
                </label>
                <textarea
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  placeholder="Add a personal message to your invitation..."
                  className="w-full h-24 px-3 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSendInvitations}
                disabled={selectedPlayers.length === 0}
              >
                Send Invitations ({selectedPlayers.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvitationsTab;