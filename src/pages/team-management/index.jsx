import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GlobalHeader from '../../components/ui/GlobalHeader';
import TeamHeader from './components/TeamHeader';
import RosterTab from './components/RosterTab';
import InvitationsTab from './components/InvitationsTab';
import TournamentHistoryTab from './components/TournamentHistoryTab';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TeamManagement = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('roster');
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Modal states
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showTournamentModal, setShowTournamentModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showRemovePlayerModal, setShowRemovePlayerModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  
  // Form states
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('player');
  const [tournamentName, setTournamentName] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [teamTag, setTeamTag] = useState('');
  
  // Loading states
  const [actionLoading, setActionLoading] = useState(false);

  // Add notification helper
  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Initialize team data
  useEffect(() => {
    const initializeTeamData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Create team data based on current user
        const mockTeamData = {
          id: 1,
          name: `${currentUser?.name || 'Player'}'s Team`,
          tag: 'THA',
          description: 'Elite esports team competing at the highest level',
          logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop',
          foundedDate: '2023-01-15',
          memberCount: 5,
          tournamentsWon: 12,
          rank: '#47',
          winRate: 78,
          totalMatches: 156,
          totalEarnings: 25000,
          players: [
            {
              id: 1,
              name: currentUser?.name || 'Player',
              username: currentUser?.name || 'Player',
              realName: currentUser?.name || 'Player',
              role: 'manager',
              avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
              joinDate: '2023-01-15',
              status: 'online',
              matchesPlayed: 45,
              winRate: 82,
              tournamentsPlayed: 12,
              lastActive: '2 minutes ago'
            },
            {
              id: 2,
              name: 'Sarah Chen',
              username: 'SarahGamer',
              realName: 'Sarah Chen',
              role: 'player',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
              joinDate: '2023-02-01',
              status: 'online',
              matchesPlayed: 38,
              winRate: 75,
              tournamentsPlayed: 8,
              lastActive: '5 minutes ago'
            },
            {
              id: 3,
              name: 'Mike Rodriguez',
              username: 'MikeR_Pro',
              realName: 'Mike Rodriguez',
              role: 'player',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
              joinDate: '2023-03-10',
              status: 'away',
              matchesPlayed: 32,
              winRate: 68,
              tournamentsPlayed: 6,
              lastActive: '1 hour ago'
            }
          ],
          pendingInvitations: [],
          tournaments: [
            {
              id: 1,
              name: 'Spring Championship 2024',
              status: 'upcoming',
              startDate: '2024-04-15',
              prize: '$5,000'
            }
          ],
          recentActivity: [
            { type: 'win', description: 'Won against Team Phoenix', time: '2 hours ago' },
            { type: 'join', description: 'Mike Rodriguez joined the team', time: '1 day ago' },
            { type: 'win', description: 'Victory in Spring Qualifiers', time: '3 days ago' }
          ]
        };
        
        setTeamData(mockTeamData);
        setTeamName(mockTeamData.name);
        setTeamDescription(mockTeamData.description);
        setTeamTag(mockTeamData.tag);
      } catch (error) {
        addNotification('Failed to load team data', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      initializeTeamData();
    }
  }, [currentUser]);

  // Team action handlers
  const handlePromotePlayer = async (playerId) => {
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedPlayers = teamData.players.map(player => 
        player.id === playerId 
          ? { ...player, role: player.role === 'player' ? 'captain' : 'manager' }
          : player
      );
      
      setTeamData(prev => ({ ...prev, players: updatedPlayers }));
      addNotification(`Player promoted successfully! 🎉`, 'success');
    } catch (error) {
      addNotification('Failed to promote player. Please try again.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemovePlayer = async (playerId) => {
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedPlayers = teamData.players.filter(player => player.id !== playerId);
      setTeamData(prev => ({ 
        ...prev, 
        players: updatedPlayers,
        memberCount: updatedPlayers.length
      }));
      
      addNotification('Player removed from team successfully! ✅', 'success');
      setShowRemovePlayerModal(false);
      setSelectedPlayer(null);
    } catch (error) {
      addNotification('Failed to remove player. Please try again.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleInvitePlayer = async () => {
    if (!inviteEmail.trim()) {
      addNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newInvite = {
        id: Date.now(),
        email: inviteEmail,
        role: inviteRole,
        status: 'pending',
        sentAt: new Date().toISOString(),
        sentBy: currentUser.name
      };
      
      setTeamData(prev => ({
        ...prev,
        pendingInvitations: [...(prev.pendingInvitations || []), newInvite]
      }));
      
      addNotification(`Invitation sent to ${inviteEmail}! 📧`, 'success');
      setShowInviteModal(false);
      setInviteEmail('');
      setInviteRole('player');
    } catch (error) {
      addNotification('Failed to send invitation. Please try again.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRegisterTournament = async () => {
    if (!tournamentName.trim()) {
      addNotification('Please enter a tournament name.', 'error');
      return;
    }
    
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newTournament = {
        id: Date.now(),
        name: tournamentName,
        entryFee: entryFee ? `$${entryFee}` : 'Free',
        status: 'registered',
        registeredAt: new Date().toISOString(),
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      setTeamData(prev => ({
        ...prev,
        tournaments: [...(prev.tournaments || []), newTournament]
      }));
      
      addNotification(`Successfully registered for ${tournamentName}! 🏆`, 'success');
      setShowTournamentModal(false);
      setTournamentName('');
      setEntryFee('');
    } catch (error) {
      addNotification('Failed to register for tournament. Please try again.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateTeamSettings = async () => {
    if (!teamName.trim()) {
      addNotification('Team name is required.', 'error');
      return;
    }
    
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setTeamData(prev => ({
        ...prev,
        name: teamName,
        description: teamDescription,
        tag: teamTag
      }));
      
      addNotification('Team settings updated successfully! ⚙️', 'success');
      setShowSettingsModal(false);
    } catch (error) {
      addNotification('Failed to update team settings. Please try again.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleTeamSettings = () => {
    setTeamName(teamData?.name || '');
    setTeamDescription(teamData?.description || '');
    setTeamTag(teamData?.tag || '');
    setShowSettingsModal(true);
  };

  const handleLogout = () => {
    logout();
  };

  // Tab configuration
  const tabs = [
    { id: 'roster', label: 'Team Roster', icon: 'Users' },
    { id: 'invitations', label: 'Invitations', icon: 'UserPlus' },
    { id: 'history', label: 'Tournament History', icon: 'Trophy' }
  ];

  // Show loading screen while data is loading
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader user={currentUser} onLogout={handleLogout} />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-text-secondary">Loading your team data...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader user={currentUser} onLogout={handleLogout} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Team Header */}
          <TeamHeader
            team={teamData}
            onRegisterTournament={() => setShowTournamentModal(true)}
            onTeamSettings={handleTeamSettings}
          />

          {/* Navigation Tabs */}
          <div className="bg-surface border border-border rounded-lg mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'roster' && (
                <RosterTab
                  teamMembers={teamData?.players || []}
                  onPromotePlayer={handlePromotePlayer}
                  onRemovePlayer={(player) => {
                    setSelectedPlayer(player);
                    setShowRemovePlayerModal(true);
                  }}
                  onInvitePlayer={() => setShowInviteModal(true)}
                  loading={actionLoading}
                />
              )}

              {activeTab === 'invitations' && (
                <InvitationsTab
                  invitations={teamData?.pendingInvitations || []}
                  onInvitePlayer={() => setShowInviteModal(true)}
                />
              )}

              {activeTab === 'history' && (
                <TournamentHistoryTab
                  tournaments={teamData?.tournaments || []}
                  onRegisterTournament={() => setShowTournamentModal(true)}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-lg shadow-lg border transform transition-all duration-300 ${
              notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
              notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
              'bg-blue-50 border-blue-200 text-blue-800'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Icon 
                name={notification.type === 'success' ? 'CheckCircle' : notification.type === 'error' ? 'XCircle' : 'Info'} 
                size={16} 
              />
              <span className="text-sm font-medium">{notification.message}</span>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="hover:opacity-70"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Player Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Invite Player</h3>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="player@example.com"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="player">Player</option>
                  <option value="substitute">Substitute</option>
                  <option value="coach">Coach</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowInviteModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleInvitePlayer}
                loading={actionLoading}
                className="flex-1"
              >
                Send Invite
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tournament Registration Modal */}
      {showTournamentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Register Tournament</h3>
              <button 
                onClick={() => setShowTournamentModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Tournament Name</label>
                <input
                  type="text"
                  value={tournamentName}
                  onChange={(e) => setTournamentName(e.target.value)}
                  placeholder="e.g., Summer Championship 2024"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Entry Fee (Optional)</label>
                <input
                  type="number"
                  value={entryFee}
                  onChange={(e) => setEntryFee(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowTournamentModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleRegisterTournament}
                loading={actionLoading}
                className="flex-1"
              >
                Register Team
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Team Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Team Settings</h3>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Team Name</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Team Tag</label>
                <input
                  type="text"
                  value={teamTag}
                  onChange={(e) => setTeamTag(e.target.value)}
                  placeholder="e.g., THA"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
                <textarea
                  value={teamDescription}
                  onChange={(e) => setTeamDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowSettingsModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdateTeamSettings}
                loading={actionLoading}
                className="flex-1"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Player Confirmation Modal */}
      {showRemovePlayerModal && selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Remove Player</h3>
              <button 
                onClick={() => { setShowRemovePlayerModal(false); setSelectedPlayer(null); }}
                className="text-text-muted hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-text-secondary">
                Are you sure you want to remove <strong className="text-text-primary">{selectedPlayer.name}</strong> from the team?
              </p>
              <p className="text-sm text-text-muted mt-2">
                This action cannot be undone. The player will lose access to team resources and tournaments.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => { setShowRemovePlayerModal(false); setSelectedPlayer(null); }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => handleRemovePlayer(selectedPlayer.id)}
                loading={actionLoading}
                className="flex-1"
              >
                Remove Player
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
