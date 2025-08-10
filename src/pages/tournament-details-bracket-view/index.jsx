import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import TournamentHeader from './components/TournamentHeader';
import TournamentTabs from './components/TournamentTabs';
import OverviewTab from './components/OverviewTab';
import BracketTab from './components/BracketTab';
import ScheduleTab from './components/ScheduleTab';
import RulesTab from './components/RulesTab';

const TournamentDetailsBracketView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [user] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    role: 'player',
    team: 'Team Alpha'
  });

  // Mock tournament data
  const tournament = {
    id: 1,
    name: 'Spring Championship 2024',
    game: 'Counter-Strike 2',
    format: 'Single Elimination',
    status: 'live',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
    description: `Join us for the most exciting esports tournament of the spring season! The Spring Championship 2024 brings together the best teams from around the region to compete for glory and substantial prizes.\n\nThis tournament features intense Counter-Strike 2 matches with professional-level competition. Teams will battle through a single-elimination bracket format, where every match counts and there's no room for error.\n\nSpectators can expect high-level gameplay, strategic depth, and thrilling moments as teams fight for their chance at the championship title.`,
    startDate: '2024-01-15T14:00:00Z',registrationDeadline: '2024-01-10T23:59:59Z',venue: 'Gaming Arena Downtown',
    prizePool: 50000,
    entryFee: 100,
    maxParticipants: 16,
    participantCount: 12,
    isRegistered: true
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRegister = () => {
    console.log('Registering for tournament...');
    // Handle tournament registration
  };

  const handleWithdraw = () => {
    console.log('Withdrawing from tournament...');
    // Handle tournament withdrawal
  };

  const handleReportResult = (matchId) => {
    console.log('Reporting result for match:', matchId);
    // Handle match result reporting
  };

  const handleLogout = () => {
    navigate('/login-register');
  };

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab tournament={tournament} />;
      case 'bracket':
        return (
          <BracketTab
            tournament={tournament}
            userRole={user.role}
            onReportResult={handleReportResult}
          />
        );
      case 'schedule':
        return (
          <ScheduleTab
            tournament={tournament}
            userRole={user.role}
          />
        );
      case 'rules':
        return <RulesTab tournament={tournament} />;
      default:
        return <OverviewTab tournament={tournament} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader user={user} onLogout={handleLogout} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
            <button
              onClick={() => navigate('/tournament-browse-registration')}
              className="hover:text-text-primary transition-colors duration-200"
            >
              Tournaments
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-text-primary font-medium">{tournament.name}</span>
          </nav>

          {/* Tournament Header */}
          <div className="mb-8">
            <TournamentHeader
              tournament={tournament}
              userRole={user.role}
              onRegister={handleRegister}
              onWithdraw={handleWithdraw}
            />
          </div>

          {/* Tournament Tabs */}
          <div className="mb-8">
            <TournamentTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {renderTabContent()}
          </div>

          {/* Back to Tournaments Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => navigate('/tournament-browse-registration')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Tournaments
            </Button>
          </div>
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Button
          variant="primary"
          onClick={() => setActiveTab('bracket')}
          iconName="GitBranch"
          className="w-14 h-14 rounded-full shadow-gaming-lg"
        />
      </div>
    </div>
  );
};

export default TournamentDetailsBracketView;