import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import FilterBar from './components/FilterBar';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import TournamentGrid from './components/TournamentGrid';
import RegistrationModal from './components/RegistrationModal';
import Button from '../../components/ui/Button';


const TournamentBrowseRegistration = () => {
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('date-asc');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Mock user data
  const currentUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'player',
    team: 'Team Alpha'
  };

  // Mock tournament data
  const mockTournaments = [
    {
      id: 1,
      title: 'Spring Championship 2024',
      gameType: 'Valorant',
      format: 'Single Elimination',
      prizePool: 50000,
      entryFee: 25,
      currentParticipants: 128,
      maxParticipants: 256,
      startDate: '2024-03-15T10:00:00Z',
      registrationDeadline: '2024-03-10T23:59:59Z',
      status: 'open',
      registrationType: 'team',
      skillLevel: 'Professional',
      location: 'Online',
      bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
      maxTeamSize: 5
    },
    {
      id: 2,
      title: 'Rookie League Tournament',
      gameType: 'League of Legends',
      format: 'Double Elimination',
      prizePool: 10000,
      entryFee: 0,
      currentParticipants: 64,
      maxParticipants: 128,
      startDate: '2024-03-20T14:00:00Z',
      registrationDeadline: '2024-03-18T23:59:59Z',
      status: 'open',
      registrationType: 'team',
      skillLevel: 'Beginner',
      location: 'Online',
      bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
      maxTeamSize: 5
    },
    {
      id: 3,
      title: 'Counter-Strike Masters',
      gameType: 'Counter-Strike',
      format: 'Single Elimination',
      prizePool: 75000,
      entryFee: 50,
      currentParticipants: 32,
      maxParticipants: 64,
      startDate: '2024-03-25T16:00:00Z',
      registrationDeadline: '2024-03-22T23:59:59Z',
      status: 'open',
      registrationType: 'team',
      skillLevel: 'Advanced',
      location: 'North America',
      bannerImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop',
      maxTeamSize: 5
    },
    {
      id: 4,
      title: 'Solo Showdown',
      gameType: 'Rocket League',
      format: 'Round Robin',
      prizePool: 5000,
      entryFee: 10,
      currentParticipants: 24,
      maxParticipants: 32,
      startDate: '2024-03-30T12:00:00Z',
      registrationDeadline: '2024-03-28T23:59:59Z',
      status: 'open',
      registrationType: 'individual',
      skillLevel: 'Intermediate',
      location: 'Online',
      bannerImage: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=400&fit=crop',
      maxTeamSize: 1
    },
    {
      id: 5,
      title: 'Apex Legends Championship',
      gameType: 'Apex Legends',
      format: 'Single Elimination',
      prizePool: 100000,
      entryFee: 75,
      currentParticipants: 60,
      maxParticipants: 60,
      startDate: '2024-04-05T18:00:00Z',
      registrationDeadline: '2024-04-01T23:59:59Z',
      status: 'full',
      registrationType: 'team',
      skillLevel: 'Professional',
      location: 'Europe',
      bannerImage: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=400&fit=crop',
      maxTeamSize: 3
    },
    {
      id: 6,
      title: 'Overwatch Open',
      gameType: 'Overwatch',
      format: 'Double Elimination',
      prizePool: 25000,
      entryFee: 0,
      currentParticipants: 48,
      maxParticipants: 64,
      startDate: '2024-04-10T15:00:00Z',
      registrationDeadline: '2024-04-07T23:59:59Z',
      status: 'open',
      registrationType: 'team',
      skillLevel: 'Intermediate',
      location: 'Online',
      bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
      maxTeamSize: 6
    }
  ];

  // Load tournaments
  useEffect(() => {
    const loadTournaments = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTournaments(mockTournaments);
      } catch (error) {
        console.error('Failed to load tournaments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTournaments();
  }, []);

  // Filter and sort tournaments
  useEffect(() => {
    let filtered = [...tournaments];

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      switch (key) {
        case 'gameType':
          if (Array.isArray(value) && value.length > 0) {
            filtered = filtered.filter(t => value.includes(t.gameType));
          }
          break;
        case 'skillLevel':
          if (Array.isArray(value) && value.length > 0) {
            filtered = filtered.filter(t => value.includes(t.skillLevel));
          }
          break;
        case 'format':
          if (Array.isArray(value) && value.length > 0) {
            filtered = filtered.filter(t => value.includes(t.format));
          }
          break;
        case 'location':
          if (Array.isArray(value) && value.length > 0) {
            filtered = filtered.filter(t => value.includes(t.location));
          }
          break;
        case 'prizePool':
          if (value.min !== undefined) {
            filtered = filtered.filter(t => t.prizePool >= value.min * 1000);
          }
          if (value.max !== undefined) {
            filtered = filtered.filter(t => t.prizePool <= value.max * 1000);
          }
          break;
        case 'entryFee':
          if (value === 'free') {
            filtered = filtered.filter(t => t.entryFee === 0);
          } else if (value === 'paid') {
            filtered = filtered.filter(t => t.entryFee > 0);
          }
          break;
        case 'dateRange':
          if (value.start) {
            filtered = filtered.filter(t => new Date(t.startDate) >= new Date(value.start));
          }
          if (value.end) {
            filtered = filtered.filter(t => new Date(t.startDate) <= new Date(value.end));
          }
          break;
        default:
          break;
      }
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.startDate) - new Date(b.startDate);
        case 'date-desc':
          return new Date(b.startDate) - new Date(a.startDate);
        case 'prize-desc':
          return b.prizePool - a.prizePool;
        case 'prize-asc':
          return a.prizePool - b.prizePool;
        case 'participants-desc':
          return b.currentParticipants - a.currentParticipants;
        case 'participants-asc':
          return a.currentParticipants - b.currentParticipants;
        case 'deadline-asc':
          return new Date(a.registrationDeadline) - new Date(b.registrationDeadline);
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setFilteredTournaments(filtered);
  }, [tournaments, filters, sortBy]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleRemoveFilter = useCallback((filterKey) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[filterKey];
      return newFilters;
    });
  }, []);

  const handleSortChange = useCallback((newSort) => {
    setSortBy(newSort);
  }, []);

  const handleRegister = useCallback((tournament) => {
    setSelectedTournament(tournament);
    setIsRegistrationModalOpen(true);
  }, []);

  const handleRegistrationConfirm = useCallback((registrationData) => {
    console.log('Registration confirmed:', registrationData);
    // Here you would typically send the registration data to your API
    setIsRegistrationModalOpen(false);
    setSelectedTournament(null);
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you would refetch the data here
    } catch (error) {
      console.error('Failed to refresh:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleLogout = () => {
    // Handle logout logic
    console.log('User logged out');
  };

  return (
    <>
      <Helmet>
        <title>Browse Tournaments - TourneyHub</title>
        <meta name="description" content="Discover and register for esports tournaments. Find competitions in Valorant, League of Legends, Counter-Strike, and more." />
        <meta name="keywords" content="esports, tournaments, gaming, competition, registration, Valorant, League of Legends" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <GlobalHeader user={currentUser} onLogout={handleLogout} />
        
        <main className="pt-16">
          <FilterBar
            activeFilters={filters}
            onRemoveFilter={handleRemoveFilter}
            onOpenFilters={() => setIsFilterPanelOpen(true)}
            totalResults={filteredTournaments.length}
          />

          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Desktop Filter Sidebar */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky top-32">
                  <FilterPanel
                    isOpen={true}
                    onClose={() => {}}
                    filters={filters}
                    onApplyFilters={handleFilterChange}
                  />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-text-primary">
                      Browse Tournaments
                    </h1>
                    <p className="text-text-secondary mt-1">
                      Discover and register for esports competitions
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRefresh}
                      disabled={refreshing}
                      iconName="RefreshCw"
                      className={`text-text-secondary hover:text-text-primary ${refreshing ? 'animate-spin' : ''}`}
                    />
                    <SortDropdown
                      currentSort={sortBy}
                      onSortChange={handleSortChange}
                    />
                  </div>
                </div>

                {/* Tournament Grid */}
                <TournamentGrid
                  tournaments={filteredTournaments}
                  userRole={currentUser.role}
                  onRegister={handleRegister}
                  loading={loading}
                />

                {/* Load More Button (for future infinite scroll) */}
                {!loading && filteredTournaments.length > 0 && (
                  <div className="text-center mt-8">
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="ChevronDown"
                      iconPosition="right"
                      className="text-text-secondary hover:text-text-primary"
                    >
                      Load More Tournaments
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Filter Panel */}
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          filters={filters}
          onApplyFilters={handleFilterChange}
        />

        {/* Registration Modal */}
        <RegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={() => {
            setIsRegistrationModalOpen(false);
            setSelectedTournament(null);
          }}
          tournament={selectedTournament}
          userRole={currentUser.role}
          onConfirm={handleRegistrationConfirm}
        />
      </div>
    </>
  );
};

export default TournamentBrowseRegistration;