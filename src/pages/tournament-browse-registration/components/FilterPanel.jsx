import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ isOpen, onClose, filters, onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    gameType: true,
    skillLevel: false,
    prizePool: false,
    dateRange: false,
    format: false,
    entryFee: false,
    location: false
  });

  const gameTypes = [
    'Valorant',
    'League of Legends',
    'Counter-Strike',
    'Dota 2',
    'Rocket League',
    'Overwatch',
    'Apex Legends',
    'Fortnite'
  ];

  const skillLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Professional'
  ];

  const formats = [
    'Single Elimination',
    'Double Elimination',
    'Round Robin',
    'Swiss System'
  ];

  const locations = [
    'Online',
    'North America',
    'Europe',
    'Asia',
    'South America',
    'Oceania'
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (type, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleMultiSelectChange = (type, value) => {
    setLocalFilters(prev => {
      const currentValues = prev[type] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [type]: newValues.length > 0 ? newValues : undefined
      };
    });
  };

  const handlePrizePoolChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      prizePool: {
        ...prev.prizePool,
        [field]: value ? parseInt(value) : undefined
      }
    }));
  };

  const handleDateRangeChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value
      }
    }));
  };

  const handleApply = () => {
    // Clean up empty filters
    const cleanedFilters = Object.entries(localFilters).reduce((acc, [key, value]) => {
      if (value && (Array.isArray(value) ? value.length > 0 : true)) {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    onApplyFilters(cleanedFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 lg:hidden"
        onClick={onClose}
      ></div>

      {/* Filter Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border rounded-t-lg max-h-[80vh] overflow-hidden lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:border lg:rounded-lg lg:max-h-none">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-text-primary">Filter Tournaments</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="text-text-secondary hover:text-text-primary lg:hidden"
          />
        </div>

        {/* Filter Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-120px)] lg:max-h-96">
          <div className="p-4 space-y-6">
            {/* Game Type */}
            <div>
              <button
                onClick={() => toggleSection('gameType')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-text-primary">Game Type</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-secondary transition-transform duration-200 ${expandedSections.gameType ? 'rotate-180' : ''}`}
                />
              </button>
              
              {expandedSections.gameType && (
                <div className="mt-3 space-y-2">
                  {gameTypes.map(game => (
                    <label key={game} className="flex items-center space-x-2 cursor-pointer">
                      <Input
                        type="checkbox"
                        checked={(localFilters.gameType || []).includes(game)}
                        onChange={() => handleMultiSelectChange('gameType', game)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-text-secondary">{game}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Skill Level */}
            <div>
              <button
                onClick={() => toggleSection('skillLevel')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-text-primary">Skill Level</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-secondary transition-transform duration-200 ${expandedSections.skillLevel ? 'rotate-180' : ''}`}
                />
              </button>
              
              {expandedSections.skillLevel && (
                <div className="mt-3 space-y-2">
                  {skillLevels.map(level => (
                    <label key={level} className="flex items-center space-x-2 cursor-pointer">
                      <Input
                        type="checkbox"
                        checked={(localFilters.skillLevel || []).includes(level)}
                        onChange={() => handleMultiSelectChange('skillLevel', level)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-text-secondary">{level}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Prize Pool */}
            <div>
              <button
                onClick={() => toggleSection('prizePool')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-text-primary">Prize Pool ($)</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-secondary transition-transform duration-200 ${expandedSections.prizePool ? 'rotate-180' : ''}`}
                />
              </button>
              
              {expandedSections.prizePool && (
                <div className="mt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-text-muted mb-1">Min (K)</label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={localFilters.prizePool?.min || ''}
                        onChange={(e) => handlePrizePoolChange('min', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-muted mb-1">Max (K)</label>
                      <Input
                        type="number"
                        placeholder="1000"
                        value={localFilters.prizePool?.max || ''}
                        onChange={(e) => handlePrizePoolChange('max', e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Date Range */}
            <div>
              <button
                onClick={() => toggleSection('dateRange')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-text-primary">Date Range</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-secondary transition-transform duration-200 ${expandedSections.dateRange ? 'rotate-180' : ''}`}
                />
              </button>
              
              {expandedSections.dateRange && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Start Date</label>
                    <Input
                      type="date"
                      value={localFilters.dateRange?.start || ''}
                      onChange={(e) => handleDateRangeChange('start', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">End Date</label>
                    <Input
                      type="date"
                      value={localFilters.dateRange?.end || ''}
                      onChange={(e) => handleDateRangeChange('end', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Format */}
            <div>
              <button
                onClick={() => toggleSection('format')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-text-primary">Tournament Format</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-secondary transition-transform duration-200 ${expandedSections.format ? 'rotate-180' : ''}`}
                />
              </button>
              
              {expandedSections.format && (
                <div className="mt-3 space-y-2">
                  {formats.map(format => (
                    <label key={format} className="flex items-center space-x-2 cursor-pointer">
                      <Input
                        type="checkbox"
                        checked={(localFilters.format || []).includes(format)}
                        onChange={() => handleMultiSelectChange('format', format)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-text-secondary">{format}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Entry Fee */}
            <div>
              <button
                onClick={() => toggleSection('entryFee')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-text-primary">Entry Fee</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-secondary transition-transform duration-200 ${expandedSections.entryFee ? 'rotate-180' : ''}`}
                />
              </button>
              
              {expandedSections.entryFee && (
                <div className="mt-3 space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Input
                      type="checkbox"
                      checked={localFilters.entryFee === 'free'}
                      onChange={() => handleFilterChange('entryFee', localFilters.entryFee === 'free' ? undefined : 'free')}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-text-secondary">Free Entry</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Input
                      type="checkbox"
                      checked={localFilters.entryFee === 'paid'}
                      onChange={() => handleFilterChange('entryFee', localFilters.entryFee === 'paid' ? undefined : 'paid')}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-text-secondary">Paid Entry</span>
                  </label>
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <button
                onClick={() => toggleSection('location')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-text-primary">Location</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-secondary transition-transform duration-200 ${expandedSections.location ? 'rotate-180' : ''}`}
                />
              </button>
              
              {expandedSections.location && (
                <div className="mt-3 space-y-2">
                  {locations.map(location => (
                    <label key={location} className="flex items-center space-x-2 cursor-pointer">
                      <Input
                        type="checkbox"
                        checked={(localFilters.location || []).includes(location)}
                        onChange={() => handleMultiSelectChange('location', location)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-text-secondary">{location}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-surface-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-text-secondary hover:text-text-primary"
          >
            Reset All
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApply}
              iconName="Check"
              iconPosition="left"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;