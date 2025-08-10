import React from 'react';
import Icon from '../../../components/AppIcon';

const TournamentTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'Info'
    },
    {
      id: 'bracket',
      label: 'Bracket',
      icon: 'GitBranch'
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: 'Calendar'
    },
    {
      id: 'rules',
      label: 'Rules',
      icon: 'FileText'
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-1">
      <div className="flex space-x-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap min-h-touch
              ${activeTab === tab.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-700'
              }
            `}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TournamentTabs;