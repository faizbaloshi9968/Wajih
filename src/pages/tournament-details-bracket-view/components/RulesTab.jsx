import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RulesTab = ({ tournament }) => {
  const [expandedSection, setExpandedSection] = useState('general');

  const rulesData = {
    general: {
      title: 'General Rules',
      icon: 'FileText',
      content: [
        'All participants must be registered and verified before the tournament begins.',
        'Teams must consist of exactly 5 players with 1 optional substitute.',
        'All matches must be played at the scheduled time. Late arrivals may result in forfeit.',
        'Unsportsmanlike conduct will result in immediate disqualification.',
        'Tournament organizers reserve the right to modify rules as needed.',
        'All decisions made by tournament officials are final.',
        'Players must use their registered in-game names during matches.',
        'Any form of cheating or exploitation will result in immediate disqualification.'
      ]
    },
    format: {
      title: 'Tournament Format',
      icon: 'GitBranch',
      content: [
        `Tournament Format: ${tournament.format}`,
        'Each match is played in a Best of 3 (Bo3) format.',
        'Grand Final is played in a Best of 5 (Bo5) format.',
        'Map selection follows the standard pick/ban process.',
        'Teams have 10 minutes to set up before each match.',
        'Matches that are not completed within the time limit will be decided by current score.',
        'In case of technical issues, matches may be paused for up to 15 minutes.',
        'Remake rules apply if technical issues occur within the first 5 minutes of a match.'
      ]
    },
    equipment: {
      title: 'Equipment & Setup',
      icon: 'Monitor',
      content: [
        'All players must use tournament-approved peripherals.',
        'Custom keybinds and settings are allowed within game limits.',
        'Players are responsible for bringing their own peripherals.',
        'Tournament organizers will provide gaming PCs and monitors.',
        'Audio equipment (headsets) must be tournament-approved.',
        'No external software or modifications are allowed.',
        'Players must test their setup during the designated warm-up period.',
        'Technical support will be available throughout the tournament.'
      ]
    },
    conduct: {
      title: 'Player Conduct',
      icon: 'Users',
      content: [
        'All players must maintain professional behavior at all times.',
        'Trash talking and excessive celebration are prohibited.',
        'Players must respect opponents, officials, and spectators.',
        'Social media conduct reflects on the tournament and teams.',
        'Alcohol and substance use is strictly prohibited during the event.',
        'Players must wear appropriate attire (team jerseys recommended).',
        'Coaching is allowed only during designated break periods.',
        'Players must report to officials immediately after each match.'
      ]
    },
    prizes: {
      title: 'Prizes & Awards',
      icon: 'Trophy',
      content: [
        `Total Prize Pool: $${tournament.prizePool.toLocaleString()}`,
        '1st Place: 50% of prize pool + Championship Trophy',
        '2nd Place: 30% of prize pool + Runner-up Trophy',
        '3rd Place: 15% of prize pool + Bronze Medal',
        '4th Place: 5% of prize pool',
        'MVP Award: Additional $500 bonus for tournament MVP',
        'All prizes will be distributed within 30 days of tournament completion.',
        'Tax responsibilities lie with the prize recipients.',
        'Prizes are non-transferable and must be claimed by registered players.'
      ]
    },
    disputes: {
      title: 'Disputes & Appeals',
      icon: 'AlertTriangle',
      content: [
        'All disputes must be reported to tournament officials immediately.',
        'Teams have 10 minutes after a match to file a dispute.',
        'Evidence (screenshots, recordings) must be provided for all disputes.',
        'Tournament officials will review disputes within 30 minutes.',
        'Appeals can be made to the head tournament director.',
        'The tournament director\'s decision is final and binding.',
        'Frivolous disputes may result in penalties or warnings.',
        'Players must continue playing while disputes are being resolved.'
      ]
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-4">
      {Object.entries(rulesData).map(([key, section]) => (
        <div key={key} className="bg-surface border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection(key)}
            className="w-full flex items-center justify-between p-4 hover:bg-surface-700 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Icon name={section.icon} size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">{section.title}</h3>
            </div>
            <Icon 
              name="ChevronDown" 
              size={20} 
              className={`text-text-secondary transition-transform duration-200 ${
                expandedSection === key ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {expandedSection === key && (
            <div className="px-4 pb-4 animate-slide-down">
              <div className="pl-13 space-y-3">
                {section.content.map((rule, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-text-secondary leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Important Notice */}
      <div className="bg-warning/10 border border-warning rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-warning mb-2">Important Notice</h4>
            <p className="text-sm text-text-secondary">
              Rules are subject to change. All participants will be notified of any rule changes 
              at least 24 hours before the tournament begins. By participating in this tournament, 
              you agree to abide by all rules and decisions made by tournament officials.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Tournament Officials</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-text-primary">Tournament Director</h4>
            <p className="text-sm text-text-secondary">Sarah Johnson</p>
            <p className="text-sm text-text-secondary">sarah.johnson@tourneyhub.com</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-text-primary">Technical Support</h4>
            <p className="text-sm text-text-secondary">Mike Chen</p>
            <p className="text-sm text-text-secondary">tech.support@tourneyhub.com</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="MessageCircle" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">
              For immediate assistance during the tournament, contact officials via Discord: 
              <span className="text-primary font-medium"> #tournament-support</span>
            </span>
          </div>
        </div>
      </div>

      {/* Rule Acknowledgment */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Rule Acknowledgment</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="rules-read"
              className="w-4 h-4 text-primary bg-surface-700 border-border rounded focus:ring-primary focus:ring-2 mt-1"
            />
            <label htmlFor="rules-read" className="text-sm text-text-secondary">
              I have read and understand all tournament rules and regulations.
            </label>
          </div>
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="rules-agree"
              className="w-4 h-4 text-primary bg-surface-700 border-border rounded focus:ring-primary focus:ring-2 mt-1"
            />
            <label htmlFor="rules-agree" className="text-sm text-text-secondary">
              I agree to abide by all rules and accept the decisions of tournament officials.
            </label>
          </div>
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="conduct-agree"
              className="w-4 h-4 text-primary bg-surface-700 border-border rounded focus:ring-primary focus:ring-2 mt-1"
            />
            <label htmlFor="conduct-agree" className="text-sm text-text-secondary">
              I commit to maintaining professional conduct throughout the tournament.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesTab;