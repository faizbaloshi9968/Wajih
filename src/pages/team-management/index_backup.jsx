import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GlobalHeader from '../../components/ui/GlobalHeader';
import Icon from '../../components/AppIcon';

import TeamHeader from './components/TeamHeader';
import RosterTab from './components/RosterTab';
import InvitationsTab from './components/InvitationsTab';
import TournamentHistoryTab from './components/TournamentHistoryTab';

const TeamManagement = () => {
  const { currentUser, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('roster');
  const [notifications, setNotifications] = useState([]);
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load team data from user profile or create default
  useEffect(() => {
    const loadTeamData = async () => {
      setLoading(true);
      
      // Check if user has a team or create default team data
      const userTeam = currentUser?.team || {
        id: currentUser?.uid || 1,
        name: `${currentUser?.username || 'Player'}'s Team`,
        tag: currentUser?.username?.substring(0, 4).toUpperCase() || 'TEAM',
        description: "Competitive esports team focused on strategic gameplay and teamwork",
        logo: currentUser?.profileImage || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop",
        foundedDate: currentUser?.createdAt || new Date().toISOString(),
        memberCount: 1,
        tournamentsWon: 0,
        rank: 999,
        winRate: 0,
        totalMatches: 0,
        totalEarnings: 0,
        ownerId: currentUser?.uid,
        members: [currentUser?.uid],
        recentActivity: [
          { type: 'create', description: 'Team created', time: 'Just now' }
        ]
      };
      
      setTeamData(userTeam);
      setLoading(false);
    };
    
    if (currentUser) {
      loadTeamData();
    }
  }, [currentUser]);

  // Mock team members data
  const teamMembers = [
    {
      id: 1,
      username: "TeamLeader",
      realName: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      role: "manager",
      joinDate: "2023-01-15",
      status: "online",
      winRate: 85,
      matchesPlayed: 142,
      tournamentsPlayed: 18,
      lastActive: "Online now"
    },
    {
      id: 2,
      username: "ProSniper",
      realName: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      role: "co-manager",
      joinDate: "2023-02-01",
      status: "online",
      winRate: 82,
      matchesPlayed: 128,
      tournamentsPlayed: 15,
      lastActive: "Online now"
    },
    {
      id: 3,
      username: "TacticalMind",
      realName: "Mike Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      role: "player",
      joinDate: "2023-02-15",
      status: "away",
      winRate: 76,
      matchesPlayed: 98,
      tournamentsPlayed: 12,
      lastActive: "30 minutes ago"
    },
    {
      id: 4,
      username: "QuickShot",
      realName: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      role: "player",
      joinDate: "2023-03-01",
      status: "online",
      winRate: 79,
      matchesPlayed: 87,
      tournamentsPlayed: 10,
      lastActive: "Online now"
    },
    {
      id: 5,
      username: "StealthMode",
      realName: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      role: "player",
      joinDate: "2023-03-15",
      status: "offline",
      winRate: 73,
      matchesPlayed: 65,
      tournamentsPlayed: 8,
      lastActive: "2 hours ago"
    },
    {
      id: 6,
      username: "RapidFire",
      realName: "Lisa Park",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      role: "player",
      joinDate: "2023-04-01",
      status: "online",
      winRate: 81,
      matchesPlayed: 54,
      tournamentsPlayed: 6,
      lastActive: "Online now"
    }
  ];

  // Mock invitations data
  const invitations = [
    {
      id: 1,
      playerName: "EliteGamer",
      playerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      status: "pending",
      sentDate: "2024-01-15T10:30:00Z",
      message: "We\'d love to have you join our competitive team. Your skills would be a great addition to our roster!"
    },
    {
      id: 2,
      playerName: "ProShooter",
      playerAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face",
      status: "accepted",
      sentDate: "2024-01-10T14:20:00Z",
      message: "Join Team Alpha and compete in high-level tournaments with us."
    },
    {
      id: 3,
      playerName: "SkillMaster",
      playerAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face",
      status: "declined",
      sentDate: "2024-01-08T09:15:00Z",
      message: "We think you\'d be perfect for our team strategy and playstyle."
    },
    {
      id: 4,
      playerName: "FastReflexes",
      playerAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face",
      status: "pending",
      sentDate: "2024-01-12T16:45:00Z",
      message: "Looking for dedicated players to join our championship run."
    }
  ];

  // Mock tournament history data
  const tournamentHistory = [
    {
      id: 1,
      name: "Spring Championship 2024",
      game: "Valorant",
      logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop",
      date: "2024-01-20T00:00:00Z",
      status: "completed",
      participants: 64,
      prizePool: 50000,
      placement: 3,
      matchesPlayed: 8,
      earnings: 5000,
      highlights: ["Semi-finalist", "Best Team Strategy", "MVP Performance"],
      matches: [
        { round: 1, opponent: "Team Beta", score: "2-0", result: "win" },
        { round: 2, opponent: "Team Gamma", score: "2-1", result: "win" },
        { round: 3, opponent: "Team Delta", score: "1-2", result: "loss" }
      ]
    },
    {
      id: 2,
      name: "Winter Invitational",
      game: "CS:GO",
      logo: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop",
      date: "2023-12-15T00:00:00Z",
      status: "completed",
      participants: 32,
      prizePool: 25000,
      placement: 1,
      matchesPlayed: 6,
      earnings: 12500,
      highlights: ["Tournament Winner", "Perfect Record", "Team of the Tournament"],
      matches: [
        { round: 1, opponent: "Team Echo", score: "2-0", result: "win" },
        { round: 2, opponent: "Team Foxtrot", score: "2-1", result: "win" },
        { round: 3, opponent: "Team Golf", score: "2-0", result: "win" }
      ]
    },
    {
      id: 3,
      name: "Summer League 2024",
      game: "Valorant",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      date: "2024-02-01T00:00:00Z",
      status: "ongoing",
      participants: 128,
      prizePool: 100000,
      placement: null,
      matchesPlayed: 4,
      earnings: 0,
      highlights: ["Quarter-finalist", "Undefeated in Group Stage"]
    }
  ];

  // Mock team stats
  const teamStats = {
    totalTournaments: 15,
    wins: 12,
    winRate: 78,
    totalEarnings: 25000
  };

  // currentUser now comes from useAuth() hook - no need for mock data
  
  // Modal states
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showTournamentModal, setShowTournamentModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showEditTeamModal, setShowEditTeamModal] = useState(false);
  const [showRemovePlayerModal, setShowRemovePlayerModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  
  // Form states
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('player');
  const [tournamentName, setTournamentName] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [teamName, setTeamName] = useState(teamData?.name || '');
  const [teamDescription, setTeamDescription] = useState(teamData?.description || '');
  const [teamTag, setTeamTag] = useState(teamData?.tag || '');
  
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

  const handleSendInvitation = (invitationData) => {
    console.log('Sending invitation:', invitationData);
    // Add notification
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      message: `Invitation sent to ${invitationData.playerName}`
    }]);
  };

  const handleCancelInvitation = (invitationId) => {
    console.log('Cancelling invitation:', invitationId);
    // Add notification
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'info',
      message: 'Invitation cancelled'
    }]);
  };

  const handlePromotePlayer = async (playerId) => {
    setActionLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update team data
      const updatedPlayers = teamData.players.map(player =>
        player.id === playerId
          ? { ...player, role: player.role === 'player' ? 'captain' : 'manager' }
          : player
      );

      setTeamData(prev => ({ ...prev, players: updatedPlayers }));
      addNotification(`Player promoted successfully! `, 'success');
    } catch (error) {
      addNotification('Failed to promote player. Please try again.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemovePlayer = async (playerId) => {
    setActionLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Remove player from team
      const updatedPlayers = teamData.players.filter(player => player.id !== playerId);
      setTeamData(prev => ({
        ...prev,
        players: updatedPlayers,
        memberCount: updatedPlayers.length
      }));

      addNotification('Player removed from team successfully! ', 'success');
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Add to pending invitations
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

      addNotification(`Invitation sent to ${inviteEmail}! `, 'success');
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add to tournament history
      const newTournament = {
        id: Date.now(),
        name: tournamentName,
        entryFee: entryFee ? `$${entryFee}` : 'Free',
        status: 'registered',
        registeredAt: new Date().toISOString(),
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week from now
      };

      setTeamData(prev => ({
        ...prev,
        tournaments: [...(prev.tournaments || []), newTournament]
      }));

      addNotification(`Successfully registered for ${tournamentName}! `, 'success');
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update team data
      setTeamData(prev => ({
        ...prev,
        name: teamName,
        description: teamDescription,
        tag: teamTag
      }));

      addNotification('Team settings updated successfully! ', 'success');
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

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const tabs = [
    { id: 'roster', label: 'Roster', icon: 'Users' },
    { id: 'invitations', label: 'Invitations', icon: 'Mail' },
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
            onRegisterTournament={handleRegisterTournament}
            onTeamSettings={handleTeamSettings}
          />

          {/* Tab Navigation */}
          <div className="bg-surface border border-border rounded-lg mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                      ${activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-text-muted'
                      }
                    `}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'roster' && (
                <RosterTab
                  teamMembers={teamMembers}
                  onPromotePlayer={handlePromotePlayer}
                  onRemovePlayer={handleRemovePlayer}
                />
              )}
              
              {activeTab === 'invitations' && (
                <InvitationsTab
                  invitations={invitations}
                  onSendInvitation={handleSendInvitation}
                  onCancelInvitation={handleCancelInvitation}
                  onResendInvitation={handleResendInvitation}
                />
              )}
              
              {activeTab === 'history' && (
                <TournamentHistoryTab
                  tournamentHistory={tournamentHistory}
                  teamStats={teamStats}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-20 right-4 z-toast space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg shadow-gaming-lg border animate-slide-down
                ${notification.type === 'success' ? 'bg-accent border-accent text-accent-foreground' :
                  notification.type === 'error' ? 'bg-error border-error text-error-foreground' :
                  'bg-primary border-primary text-primary-foreground'
                }
              `}
            >
              <Icon 
                name={notification.type === 'success' ? 'CheckCircle' : 
                      notification.type === 'error' ? 'XCircle' : 'Info'} 
                size={20} 
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