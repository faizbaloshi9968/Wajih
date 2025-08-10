import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import { Trophy, Users, Calendar, Zap, Gamepad2, Crown, Target, Star } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // Mock tournament data - replace with real data later
  const tournaments = [
    {
      id: 1,
      title: 'Summer Championship 2025',
      description: 'The biggest gaming tournament of the summer',
      image: '/assets/images/no_image.png',
      date: '2025-08-15',
      registrationOpen: true
    },
    {
      id: 2,
      title: 'Pro League Season 5',
      description: 'Professional gaming at its finest',
      image: '/assets/images/no_image.png',
      date: '2025-09-01',
      registrationOpen: true
    },
    // Add more tournament data as needed
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TourneyHub
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#tournaments" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                Tournaments
              </a>
              <a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                Features
              </a>
              <a href="#about" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                About
              </a>
              <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                Contact
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {currentUser?.isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-300">
                    Welcome, <span className="text-purple-400 font-medium">{currentUser.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/player-dashboard')}
                    className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/login-register')}
                    className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/login-register')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Gaming Icons */}
            <div className="flex justify-center space-x-8 mb-8 opacity-60">
              <Gamepad2 className="h-8 w-8 text-purple-400 animate-bounce" />
              <Crown className="h-8 w-8 text-yellow-400 animate-bounce delay-100" />
              <Target className="h-8 w-8 text-red-400 animate-bounce delay-200" />
              <Star className="h-8 w-8 text-blue-400 animate-bounce delay-300" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Welcome to
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                TourneyHub
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The ultimate destination for competitive gaming tournaments. 
              <span className="text-purple-400 font-semibold">Compete</span>, 
              <span className="text-pink-400 font-semibold">Connect</span>, and 
              <span className="text-blue-400 font-semibold">Conquer</span> in epic gaming battles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => currentUser?.isAuthenticated ? navigate('/tournament-browse-registration') : navigate('/login-register')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <Trophy className="mr-2 h-5 w-5" />
                {currentUser?.isAuthenticated ? 'Browse Tournaments' : 'Start Your Journey'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                <Zap className="mr-2 h-5 w-5" />
                Explore Features
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">10K+</div>
                <div className="text-gray-400">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">500+</div>
                <div className="text-gray-400">Tournaments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">$2M+</div>
                <div className="text-gray-400">Prize Pool</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose TourneyHub?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of competitive gaming with our cutting-edge platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Trophy className="h-8 w-8" />,
                title: "Epic Tournaments",
                description: "Join massive tournaments with incredible prize pools and compete against the best players worldwide.",
                color: "from-yellow-400 to-orange-500"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Team Management",
                description: "Create and manage your dream team with advanced tools and real-time communication features.",
                color: "from-blue-400 to-purple-500"
              },
              {
                icon: <Calendar className="h-8 w-8" />,
                title: "Smart Scheduling",
                description: "AI-powered scheduling system that finds the perfect time for all participants across time zones.",
                color: "from-green-400 to-teal-500"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Real-time Updates",
                description: "Get instant notifications about tournament updates, match results, and important announcements.",
                color: "from-purple-400 to-pink-500"
              },
              {
                icon: <Crown className="h-8 w-8" />,
                title: "Ranking System",
                description: "Climb the leaderboards with our sophisticated ELO-based ranking system and earn recognition.",
                color: "from-red-400 to-pink-500"
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Match Analytics",
                description: "Detailed performance analytics and insights to help you improve your gameplay and strategy.",
                color: "from-indigo-400 to-blue-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section id="tournaments" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Featured Tournaments
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join the most exciting tournaments happening right now
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tournaments.map((tournament, index) => (
              <div
                key={tournament.id}
                className="group relative bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tournament.image}
                    alt={tournament.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {tournament.registrationOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {tournament.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {tournament.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {new Date(tournament.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-purple-400 font-semibold">
                      ${Math.floor(Math.random() * 10000) + 1000} Prize
                    </div>
                  </div>
                  
                  <Button
                    variant="primary"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => currentUser?.isAuthenticated ? navigate(`/tournament-details/${tournament.id}`) : navigate('/login-register')}
                  >
                    {currentUser?.isAuthenticated ? 'View Details' : 'Login to Join'}
                  </Button>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => currentUser?.isAuthenticated ? navigate('/tournament-browse-registration') : navigate('/login-register')}
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg font-semibold"
            >
              View All Tournaments
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-gray-700/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  TourneyHub
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                The premier platform for competitive gaming tournaments worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Tournaments</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Teams</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Rankings</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Discord</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700/50 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TourneyHub. All rights reserved. Built with ❤️ for gamers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
