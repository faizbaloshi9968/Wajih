import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const sortOptions = [
    { value: 'date-asc', label: 'Date: Earliest First', icon: 'Calendar' },
    { value: 'date-desc', label: 'Date: Latest First', icon: 'Calendar' },
    { value: 'prize-desc', label: 'Prize Pool: High to Low', icon: 'Trophy' },
    { value: 'prize-asc', label: 'Prize Pool: Low to High', icon: 'Trophy' },
    { value: 'participants-desc', label: 'Most Participants', icon: 'Users' },
    { value: 'participants-asc', label: 'Least Participants', icon: 'Users' },
    { value: 'deadline-asc', label: 'Registration Deadline', icon: 'Clock' },
    { value: 'name-asc', label: 'Name: A to Z', icon: 'AlphabeticalOrder' },
    { value: 'name-desc', label: 'Name: Z to A', icon: 'AlphabeticalOrder' }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === currentSort);
    return option ? option.label : 'Sort by Date';
  };

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <div ref={buttonRef}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          iconName="ArrowUpDown"
          iconPosition="left"
          className="min-w-0"
        >
          <span className="hidden sm:inline">{getCurrentSortLabel()}</span>
          <span className="sm:hidden">Sort</span>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-gaming-lg z-dropdown animate-slide-down"
        >
          <div className="py-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`
                  w-full flex items-center px-4 py-2 text-sm transition-colors duration-200
                  ${currentSort === option.value 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-700'
                  }
                `}
              >
                <Icon 
                  name={option.icon} 
                  size={16} 
                  className="mr-3 flex-shrink-0" 
                />
                <span className="text-left">{option.label}</span>
                {currentSort === option.value && (
                  <Icon 
                    name="Check" 
                    size={16} 
                    className="ml-auto flex-shrink-0" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;