import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SystemSettingsPanel = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'TourneyHub',
    siteDescription: 'Premier esports tournament management platform',
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    discordIntegration: true,
    maxTournamentSize: 128,
    defaultTournamentFormat: 'single-elimination',
    matchDuration: 60,
    autoAdvancement: true,
    disputeTimeout: 24,
    backupFrequency: 'daily',
    logRetention: 30,
    apiRateLimit: 1000
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Here you would typically save to backend
  };

  const tabs = [
    { id: 'general', label: 'General', icon: 'Settings' },
    { id: 'tournaments', label: 'Tournaments', icon: 'Trophy' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'integrations', label: 'Integrations', icon: 'Plug' },
    { id: 'system', label: 'System', icon: 'Server' }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Site Name
        </label>
        <Input
          type="text"
          value={settings.siteName}
          onChange={(e) => handleSettingChange('siteName', e.target.value)}
          placeholder="Enter site name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Site Description
        </label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
          placeholder="Enter site description"
          rows={3}
          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-surface-700 rounded-lg">
        <div>
          <h4 className="text-sm font-medium text-text-primary">Maintenance Mode</h4>
          <p className="text-xs text-text-secondary">Temporarily disable site access for maintenance</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-surface-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>

      <div className="flex items-center justify-between p-4 bg-surface-700 rounded-lg">
        <div>
          <h4 className="text-sm font-medium text-text-primary">User Registration</h4>
          <p className="text-xs text-text-secondary">Allow new users to register accounts</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.userRegistration}
            onChange={(e) => handleSettingChange('userRegistration', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-surface-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>
    </div>
  );

  const renderTournamentSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Maximum Tournament Size
        </label>
        <Input
          type="number"
          value={settings.maxTournamentSize}
          onChange={(e) => handleSettingChange('maxTournamentSize', parseInt(e.target.value))}
          placeholder="Enter maximum participants"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Default Tournament Format
        </label>
        <select
          value={settings.defaultTournamentFormat}
          onChange={(e) => handleSettingChange('defaultTournamentFormat', e.target.value)}
          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="single-elimination">Single Elimination</option>
          <option value="double-elimination">Double Elimination</option>
          <option value="round-robin">Round Robin</option>
          <option value="swiss">Swiss System</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Default Match Duration (minutes)
        </label>
        <Input
          type="number"
          value={settings.matchDuration}
          onChange={(e) => handleSettingChange('matchDuration', parseInt(e.target.value))}
          placeholder="Enter match duration"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-surface-700 rounded-lg">
        <div>
          <h4 className="text-sm font-medium text-text-primary">Auto Advancement</h4>
          <p className="text-xs text-text-secondary">Automatically advance winners to next round</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.autoAdvancement}
            onChange={(e) => handleSettingChange('autoAdvancement', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-surface-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Dispute Resolution Timeout (hours)
        </label>
        <Input
          type="number"
          value={settings.disputeTimeout}
          onChange={(e) => handleSettingChange('disputeTimeout', parseInt(e.target.value))}
          placeholder="Enter timeout in hours"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-surface-700 rounded-lg">
        <div>
          <h4 className="text-sm font-medium text-text-primary">Email Notifications</h4>
          <p className="text-xs text-text-secondary">Send email notifications to users</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-surface-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-text-primary">Email Templates</h4>
        <div className="grid gap-3">
          {[
            'Tournament Registration Confirmation',
            'Match Reminder',
            'Tournament Results',
            'Dispute Notification',
            'System Maintenance'
          ].map((template, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface-700 rounded-lg">
              <span className="text-sm text-text-primary">{template}</span>
              <Button variant="outline" size="xs">
                Edit Template
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          API Rate Limit (requests per hour)
        </label>
        <Input
          type="number"
          value={settings.apiRateLimit}
          onChange={(e) => handleSettingChange('apiRateLimit', parseInt(e.target.value))}
          placeholder="Enter rate limit"
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-text-primary">Security Policies</h4>
        <div className="grid gap-3">
          {[
            { name: 'Two-Factor Authentication', status: 'Optional' },
            { name: 'Password Complexity', status: 'Enabled' },
            { name: 'Session Timeout', status: '24 hours' },
            { name: 'IP Whitelisting', status: 'Disabled' },
            { name: 'Audit Logging', status: 'Enabled' }
          ].map((policy, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface-700 rounded-lg">
              <span className="text-sm text-text-primary">{policy.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-text-secondary">{policy.status}</span>
                <Button variant="outline" size="xs">
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-surface-700 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} className="text-white" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-text-primary">Discord Integration</h4>
            <p className="text-xs text-text-secondary">Connect with Discord for authentication</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.discordIntegration}
            onChange={(e) => handleSettingChange('discordIntegration', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-surface-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-text-primary">Available Integrations</h4>
        <div className="grid gap-3">
          {[
            { name: 'Twitch Streaming', icon: 'Video', status: 'Connected' },
            { name: 'Steam Authentication', icon: 'Gamepad2', status: 'Available' },
            { name: 'PayPal Payments', icon: 'CreditCard', status: 'Available' },
            { name: 'Stripe Payments', icon: 'DollarSign', status: 'Available' },
            { name: 'Google Analytics', icon: 'BarChart3', status: 'Connected' }
          ].map((integration, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={integration.icon} size={20} className="text-text-secondary" />
                <span className="text-sm text-text-primary">{integration.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  integration.status === 'Connected' ?'bg-accent text-accent-foreground' :'bg-surface-600 text-text-secondary'
                }`}>
                  {integration.status}
                </span>
                <Button variant="outline" size="xs">
                  {integration.status === 'Connected' ? 'Configure' : 'Setup'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Backup Frequency
        </label>
        <select
          value={settings.backupFrequency}
          onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Log Retention (days)
        </label>
        <Input
          type="number"
          value={settings.logRetention}
          onChange={(e) => handleSettingChange('logRetention', parseInt(e.target.value))}
          placeholder="Enter retention period"
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-text-primary">System Status</h4>
        <div className="grid gap-3">
          {[
            { name: 'Database', status: 'Healthy', uptime: '99.9%' },
            { name: 'API Server', status: 'Healthy', uptime: '99.8%' },
            { name: 'File Storage', status: 'Healthy', uptime: '100%' },
            { name: 'Email Service', status: 'Warning', uptime: '98.5%' },
            { name: 'CDN', status: 'Healthy', uptime: '99.9%' }
          ].map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  service.status === 'Healthy' ? 'bg-accent' : 
                  service.status === 'Warning' ? 'bg-warning' : 'bg-error'
                }`}></div>
                <span className="text-sm text-text-primary">{service.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-text-secondary">{service.uptime} uptime</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  service.status === 'Healthy' ? 'bg-accent text-accent-foreground' : 
                  service.status === 'Warning' ? 'bg-warning text-warning-foreground' : 
                  'bg-error text-error-foreground'
                }`}>
                  {service.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'tournaments':
        return renderTournamentSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'integrations':
        return renderIntegrationsSettings();
      case 'system':
        return renderSystemSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">System Settings</h2>
          <p className="text-text-secondary">Configure platform settings and preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => console.log('Reset to defaults')}>
            Reset to Defaults
          </Button>
          <Button variant="primary" onClick={handleSaveSettings}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-700'
                  }
                `}
              >
                <Icon name={tab.icon} size={18} className="mr-3" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsPanel;