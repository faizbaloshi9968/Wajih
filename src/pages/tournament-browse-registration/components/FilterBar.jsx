import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterBar = ({ activeFilters, onRemoveFilter, onOpenFilters, totalResults }) => {
  const getFilterIcon = (type) => {
    switch (type) {
      case 'gameType':
        return 'Gamepad2';
      case 'skillLevel':
        return 'Target';
      case 'prizePool':
        return 'Trophy';
      case 'dateRange':
        return 'Calendar';
      case 'format':
        return 'Grid3x3';
      case 'entryFee':
        return 'DollarSign';
      case 'location':
        return 'MapPin';
      default:
        return 'Filter';
    }
  };

  const formatFilterValue = (type, value) => {
    switch (type) {
      case 'prizePool':
        if (value.min && value.max) {
          return `$${value.min}K - $${value.max}K`;
        } else if (value.min) {
          return `$${value.min}K+`;
        } else if (value.max) {
          return `Up to $${value.max}K`;
        }
        return value;
      case 'dateRange':
        if (value.start && value.end) {
          return `${new Date(value.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(value.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        }
        return value;
      case 'entryFee':
        if (value === 'free') return 'Free';
        if (value === 'paid') return 'Paid';
        return value;
      default:
        return Array.isArray(value) ? value.join(', ') : value;
    }
  };

  const getFilterLabel = (type) => {
    switch (type) {
      case 'gameType':
        return 'Game';
      case 'skillLevel':
        return 'Skill';
      case 'prizePool':
        return 'Prize';
      case 'dateRange':
        return 'Date';
      case 'format':
        return 'Format';
      case 'entryFee':
        return 'Entry';
      case 'location':
        return 'Location';
      default:
        return type;
    }
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <div className="bg-surface border-b border-border sticky top-16 z-10">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenFilters}
              iconName="Filter"
              iconPosition="left"
              className="flex-shrink-0"
            >
              Filters
            </Button>
            
            {totalResults !== undefined && (
              <span className="text-sm text-text-secondary">
                {totalResults} tournament{totalResults !== 1 ? 's' : ''} found
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                Object.keys(activeFilters).forEach(key => {
                  onRemoveFilter(key);
                });
              }}
              className="text-text-secondary hover:text-error"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <span className="text-xs text-text-muted flex-shrink-0">Active:</span>
            <div className="flex space-x-2">
              {Object.entries(activeFilters).map(([type, value]) => (
                <div
                  key={type}
                  className="flex items-center space-x-1 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 flex-shrink-0"
                >
                  <Icon 
                    name={getFilterIcon(type)} 
                    size={12} 
                    className="text-primary"
                  />
                  <span className="text-xs text-primary font-medium">
                    {getFilterLabel(type)}: {formatFilterValue(type, value)}
                  </span>
                  <button
                    onClick={() => onRemoveFilter(type)}
                    className="text-primary hover:text-primary-400 ml-1"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;