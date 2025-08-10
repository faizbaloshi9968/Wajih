import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GlobalHeader from '../../components/ui/GlobalHeader';
import UpcomingMatchesCard from './components/UpcomingMatchesCard';
import TournamentRegistrationCard from './components/TournamentRegistrationCard';
import RecentPerformanceCard from './components/RecentPerformanceCard';
import TeamStatusCard from './components/TeamStatusCard';
import QuickActionsCard from './components/QuickActionsCard';
import NotificationPanel from './components/NotificationPanel';
import { 
  Gamepad2, Trophy, Users, Calendar, ArrowRight, Sparkles, Zap, Target, 
  Star, Crown, Shield, Flame, Rocket, Award, Activity
} from 'lucide-react';
import { ROLE_DISPLAY_NAMES } from '../../utils/roles';

const PlayerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);

  useEffect(() => {
    // Simulate loading and show welcome animation for new sessions
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (currentUser) {
        setShowWelcomeAnimation(true);
        setTimeout(() => setShowWelcomeAnimation(false), 3000);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentUser]);

  // Mock upcoming matches data
  const upcomingMatches = [
    {
      id: 1,
      tournament: "Spring Championship 2024",
      myTeam: {
        name: "Team Alpha",
        logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop"
      },
      opponent: {
        name: "Team Beta",
        logo: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=100&h=100&fit=crop"
      },
      scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      venue: "Arena A",
      status: "upcoming"
    },
    {
      id: 2,
      tournament: "Weekly League",
      myTeam: {
        name: "Team Alpha",
        logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop"
      },
      opponent: {
        name: "Team Gamma",
        logo: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=100&h=100&fit=crop"
      },
      scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      venue: "Online",
      status: "upcoming"
    },
    {
      id: 3,
      tournament: "Pro Circuit",
      myTeam: {
        name: "Team Alpha",
        logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop"
      },
      opponent: {
        name: "Team Delta",
        logo: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=100&h=100&fit=crop"
      },
      scheduledTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      venue: "Arena B",
      status: "upcoming"
    }
  ];

  // Mock available tournaments data
  const availableTournaments = [
    {
      id: 1,
      name: "Summer Showdown 2024",
      banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
      prizePool: 5000,
      difficulty: "Intermediate",
      format: "Single Elimination",
      participants: 24,
      maxParticipants: 32,
      registrationDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: "Online",
      description: `Join the Summer Showdown for intense competitive matches.\nFeaturing the best teams from around the region competing for glory and prizes.`
    },
    {
      id: 2,
      name: "Rookie Cup",
      banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
      prizePool: 1500,
      difficulty: "Beginner",
      format: "Double Elimination",
      participants: 12,
      maxParticipants: 16,
      registrationDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      startDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      location: "Local Arena",
      description: `Perfect tournament for new players to get competitive experience.\nWelcoming environment with coaching opportunities.`
    },
    {
      id: 3,
      name: "Masters Championship",
      banner: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
      prizePool: 15000,
      difficulty: "Advanced",
      format: "Swiss System",
      participants: 31,
      maxParticipants: 32,
      registrationDeadline: new Date(Date.now() + 12 * 60 * 60 * 1000),
      startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      location: "Convention Center",
      description: `The ultimate test for professional teams.\nHighest prize pool and most competitive field of the season.`
    }
  ];

  // Mock performance data
  const performanceData = {
    totalMatches: 45,
    wins: 32,
    losses: 13,
    currentStreak: 5,
    recentMatches: [
      {
        id: 1,
        opponent: "Team Beta",
        tournament: "Spring Championship",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        result: "win",
        score: "2-1"
      },
      {
        id: 2,
        opponent: "Team Gamma",
        tournament: "Weekly League",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        result: "win",
        score: "2-0"
      },
      {
        id: 3,
        opponent: "Team Delta",
        tournament: "Pro Circuit",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        result: "loss",
        score: "1-2"
      },
      {
        id: 4,
        opponent: "Team Epsilon",
        tournament: "Monthly Cup",
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        result: "win",
        score: "2-1"
      },
      {
        id: 5,
        opponent: "Team Zeta",
        tournament: "Regional Finals",
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        result: "win",
        score: "2-0"
      }
    ]
  };

  // Mock team data
  const teamData = {
    id: 1,
    name: "Team Alpha",
    logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=200&fit=crop",
    myRole: "Player",
    status: "active",
    memberCount: 5,
    maxMembers: 6,
    wins: 28,
    losses: 12,
    ranking: 7,
    members: [
      {
        id: 1,
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        role: "Player",
        isOnline: true
      },
      {
        id: 2,
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        role: "Captain",
        isOnline: true
      },
      {
        id: 3,
        name: "Mike Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        role: "Player",
        isOnline: false
      },
      {
        id: 4,
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        role: "Co-Captain",
        isOnline: true
      },
      {
        id: 5,
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        role: "Player",
        isOnline: false
      }
    ],
    nextMatch: {
      opponent: "Team Beta",
      scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000)
    }
  };

  // Mock pending invitations
  const pendingInvitations = [
    {
      id: 1,
      teamName: "Team Omega",
      teamLogo: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=100&h=100&fit=crop",
      invitedBy: "Captain Smith",
      invitedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ];

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "match",
      title: "Match Starting Soon",
      message: "Your match against Team Beta starts in 30 minutes. Make sure you\'re ready!",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      priority: "high",
      actionRequired: true,
      actionText: "Join Match"
    },
    {
      id: 2,
      type: "team",
      title: "Team Invitation",
      message: "Team Omega has invited you to join their roster. Check your team invitations.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      priority: "medium",
      actionRequired: true,
      actionText: "View Invitation"
    },
    {
      id: 3,
      type: "tournament",
      title: "Tournament Registration Closing",
      message: "Registration for Summer Showdown 2024 closes in 2 days. Don't miss out!",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false,
      priority: "medium"
    },
    {
      id: 4,
      type: "match",
      title: "Match Result",
      message: "Congratulations! Your team won against Team Gamma (2-1). Great performance!",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      priority: "low"
    },
    {
      id: 5,
      type: "system",
      title: "Maintenance Notice",
      message: "Scheduled maintenance tonight from 2-4 AM EST. Plan your matches accordingly.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: true,
      priority: "low"
    }
  ]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Event handlers
  const handleViewMatchDetails = (matchId) => {
    console.log('View match details:', matchId);
    navigate('/tournament-details-bracket-view');
  };

  const handleRegisterTournament = (tournamentId) => {
    console.log('Register for tournament:', tournamentId);
    navigate('/tournament-browse-registration');
  };

  const handleViewTournament = (tournamentId) => {
    console.log('View tournament:', tournamentId);
    navigate('/tournament-details-bracket-view');
  };

  const handleViewHistory = () => {
    console.log('View match history');
    // Navigate to match history page
  };

  const handleJoinTeam = () => {
    console.log('Join team');
    navigate('/team-management');
  };

  const handleViewTeam = (teamId) => {
    console.log('View team:', teamId);
    navigate('/team-management');
  };

  const handleRespondInvitation = (invitationId, response) => {
    console.log('Respond to invitation:', invitationId, response);
    // Handle invitation response
  };

  const handleFindTournament = () => {
    navigate('/tournament-browse-registration');
  };

  const handleUpdateProfile = () => {
    navigate('/profile');
  };

  const handleViewMatches = () => {
    console.log('View matches');
    // Navigate to matches page
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login-register');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Loading state with epic animation
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <GlobalHeader user={currentUser} onLogout={handleLogout} />
        <div className="pt-16">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-purple-500/30 rounded-full animate-spin mx-auto mb-6">
                  <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
                </div>
                <Gamepad2 className="w-8 h-8 text-purple-400 animate-pulse mx-auto mb-4" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Loading TourneyHub</h2>
              <p className="text-gray-400 animate-pulse">Preparing your gaming experience...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Unauthenticated homepage - Epic landing experience
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <GlobalHeader user={currentUser} onLogout={handleLogout} />
        
        <div className="relative pt-16">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              {/* Epic Title with Animation */}
              <div className="mb-8">
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse mb-4">
                  TOURNEY<span className="text-white">HUB</span>
                </h1>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <Crown className="w-8 h-8 text-yellow-400 animate-bounce" />
                  <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
                </div>
                <p className="text-xl md:text-2xl text-gray-300 font-medium">
                  The Ultimate <span className="text-purple-400 font-bold">Esports Tournament</span> Platform
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <button
                  onClick={() => navigate('/login-register')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3"
                >
                  <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/tournament-browse-registration')}
                  className="group px-8 py-4 bg-transparent border-2 border-purple-500 hover:bg-purple-500/20 text-white text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                >
                  <Trophy className="w-6 h-6 group-hover:animate-pulse" />
                  <span>Browse Tournaments</span>
                </button>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Compete & Win</h3>
                  <p className="text-gray-400">Join tournaments, climb rankings, and earn amazing prizes</p>
                </div>
                
                <div className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Build Teams</h3>
                  <p className="text-gray-400">Create or join teams, strategize, and dominate together</p>
                </div>
                
                <div className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Real-Time</h3>
                  <p className="text-gray-400">Live matches, instant updates, and seamless gameplay</p>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                <div className="text-center">
                  <div className="text-4xl font-black text-purple-400 mb-2">10K+</div>
                  <div className="text-gray-400 font-medium">Active Players</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-pink-400 mb-2">500+</div>
                  <div className="text-gray-400 font-medium">Tournaments</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-blue-400 mb-2">$2M+</div>
                  <div className="text-gray-400 font-medium">Prize Pool</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-green-400 mb-2">24/7</div>
                  <div className="text-gray-400 font-medium">Support</div>
                </div>
              </div>

              {/* Final CTA */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Become a Champion?</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Join thousands of gamers competing in the most exciting esports tournaments. 
                  Create your profile, build your team, and start your journey to glory.
                </p>
                <button
                  onClick={() => navigate('/login-register')}
                  className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-4 mx-auto"
                >
                  <Crown className="w-8 h-8 group-hover:animate-bounce" />
                  <span>Join TourneyHub Now</span>
                  <Sparkles className="w-8 h-8 group-hover:animate-pulse" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard - Enhanced Experience
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <GlobalHeader user={currentUser} onLogout={handleLogout} />
      
      <div className="relative pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Epic Welcome Section with Animation */}
          <div className="mb-8 relative">
            {showWelcomeAnimation && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-2xl p-8 text-center animate-fade-in-up">
                  <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
                  <h2 className="text-3xl font-bold text-white mb-2">Welcome Back, Champion!</h2>
                  <p className="text-gray-200">Ready to dominate the arena?</p>
                </div>
              </div>
            )}
            
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-500 to-pink-500 p-1">
                  <img
                    src={currentUser.profileImage || currentUser.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl font-bold text-white mb-1">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{currentUser.username || currentUser.name}!</span>
                  </h1>
                  <div className="flex items-center space-x-3">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      <Shield className="w-4 h-4 mr-1" />
                      {ROLE_DISPLAY_NAMES[currentUser.role] || 'Player'}
                    </div>
                    <div className="flex items-center space-x-1 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Online</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 mb-6">
                Here's what's happening in your <span className="text-purple-400 font-semibold">gaming world</span> today.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-sm text-gray-400">Tournaments Won</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">85%</div>
                  <div className="text-sm text-gray-400">Win Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">#47</div>
                  <div className="text-sm text-gray-400">Global Rank</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">7</div>
                  <div className="text-sm text-gray-400">Win Streak</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Primary Cards */}
            <div className="lg:col-span-2 space-y-6">
              <UpcomingMatchesCard 
                matches={upcomingMatches}
                onViewDetails={handleViewMatchDetails}
              />
              
              <TournamentRegistrationCard 
                tournaments={availableTournaments}
                onRegister={handleRegisterTournament}
                onViewTournament={handleViewTournament}
              />
              
              <RecentPerformanceCard 
                performanceData={performanceData}
                onViewHistory={handleViewHistory}
              />
            </div>

            {/* Right Column - Secondary Cards */}
            <div className="space-y-6">
              <TeamStatusCard 
                teamData={teamData}
                pendingInvitations={pendingInvitations}
                onJoinTeam={handleJoinTeam}
                onViewTeam={handleViewTeam}
                onRespondInvitation={handleRespondInvitation}
              />
              
              <QuickActionsCard 
                onFindTournament={handleFindTournament}
                onJoinTeam={handleJoinTeam}
                onUpdateProfile={handleUpdateProfile}
                onViewMatches={handleViewMatches}
              />
            </div>
          </div>

          {/* Bottom Section - Notifications */}
          <div className="grid grid-cols-1 gap-6">
            <NotificationPanel 
              notifications={notifications}
              onMarkAsRead={handleMarkNotificationAsRead}
              onMarkAllAsRead={handleMarkAllNotificationsAsRead}
              onDismiss={handleDismissNotification}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;