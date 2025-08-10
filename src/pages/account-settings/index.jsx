import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Settings, Shield, Bell, Eye, Key, Save, X, Check, AlertCircle, 
  Lock, Trash2, Download, Moon, Sun, Volume2, VolumeX
} from 'lucide-react';

const AccountSettings = () => {
  const { currentUser, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('security');
  const [saveStatus, setSaveStatus] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: currentUser?.twoFactorEnabled || false,
    loginNotifications: currentUser?.loginNotifications !== false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: currentUser?.profileVisibility || 'public',
    showOnlineStatus: currentUser?.showOnlineStatus !== false,
    allowDirectMessages: currentUser?.allowDirectMessages !== false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: currentUser?.emailNotifications !== false,
    pushNotifications: currentUser?.pushNotifications !== false,
    tournamentUpdates: currentUser?.tournamentUpdates !== false,
    soundEnabled: currentUser?.soundEnabled !== false
  });

  const handleSecuritySave = async () => {
    if (securitySettings.newPassword && securitySettings.newPassword !== securitySettings.confirmPassword) {
      setSaveStatus({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    try {
      setSaveStatus({ type: 'loading', message: 'Saving security settings to database...' });
      
      // Save to real database via updateUser
      const success = await updateUser({
        twoFactorEnabled: securitySettings.twoFactorEnabled,
        loginNotifications: securitySettings.loginNotifications,
        securitySettingsUpdatedAt: new Date().toISOString()
      });

      if (success) {
        setSaveStatus({ type: 'success', message: 'Security settings saved to database! 🚀' });
        setSecuritySettings(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus({ type: 'error', message: 'Failed to save to database' });
      }
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Failed to update settings' });
    }
  };

  const handleSettingsSave = async (settings) => {
    try {
      setSaveStatus({ type: 'loading', message: 'Saving settings to database...' });
      
      // Save to real database via updateUser
      const success = await updateUser({
        ...settings,
        settingsUpdatedAt: new Date().toISOString()
      });
      
      if (success) {
        setSaveStatus({ type: 'success', message: 'Settings saved to database! 🚀' });
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus({ type: 'error', message: 'Failed to save to database' });
      }
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Failed to save settings' });
    }
  };

  const exportUserData = () => {
    const userData = { ...currentUser, exportedAt: new Date().toISOString() };
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `tourneyhub-data-${currentUser.username}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    setSaveStatus({ type: 'success', message: 'Data exported successfully!' });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleDeleteAccount = async () => {
    try {
      setSaveStatus({ type: 'loading', message: 'Deleting account...' });
      await new Promise(resolve => setTimeout(resolve, 2000));
      localStorage.removeItem('user');
      localStorage.removeItem('allUsers');
      setSaveStatus({ type: 'success', message: 'Account deleted' });
      setTimeout(() => { logout(); navigate('/'); }, 2000);
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Failed to delete account' });
    }
  };

  const tabs = [
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data & Account', icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">Account Settings</h1>
                <p className="text-gray-300">Manage your account preferences and security</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              <Settings className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {saveStatus && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className={`flex items-center space-x-2 p-4 rounded-lg ${
            saveStatus.type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-300' :
            saveStatus.type === 'error' ? 'bg-red-500/20 border border-red-500/30 text-red-300' :
            'bg-blue-500/20 border border-blue-500/30 text-blue-300'
          }`}>
            {saveStatus.type === 'success' ? <Check className="w-5 h-5" /> :
             saveStatus.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
             <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />}
            <span>{saveStatus.message}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-4 sticky top-8">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <span>Security Settings</span>
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                    <input
                      type="password"
                      value={securitySettings.currentPassword}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                      <input
                        type="password"
                        value={securitySettings.newPassword}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                      <input
                        type="password"
                        value={securitySettings.confirmPassword}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                      <p className="text-gray-400 text-sm">Add extra security to your account</p>
                    </div>
                    <button
                      onClick={() => setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.twoFactorEnabled ? 'bg-purple-600' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <button
                    onClick={handleSecuritySave}
                    disabled={saveStatus?.type === 'loading'}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Security Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <span>Privacy Settings</span>
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Profile Visibility</label>
                    <select
                      value={privacySettings.profileVisibility}
                      onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="public" className="bg-slate-800">Public - Anyone can see</option>
                      <option value="friends" className="bg-slate-800">Friends Only</option>
                      <option value="private" className="bg-slate-800">Private - Only me</option>
                    </select>
                  </div>

                  {[
                    { key: 'showOnlineStatus', label: 'Show Online Status', desc: 'Let others see when you\'re online' },
                    { key: 'allowDirectMessages', label: 'Allow Direct Messages', desc: 'Allow other users to message you' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">{setting.label}</h4>
                        <p className="text-gray-400 text-sm">{setting.desc}</p>
                      </div>
                      <button
                        onClick={() => setPrivacySettings(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          privacySettings[setting.key] ? 'bg-purple-600' : 'bg-gray-600'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          privacySettings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => handleSettingsSave(privacySettings)}
                    disabled={saveStatus?.type === 'loading'}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Privacy Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-purple-400" />
                  <span>Notification Settings</span>
                </h3>

                <div className="space-y-6">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser notifications' },
                    { key: 'tournamentUpdates', label: 'Tournament Updates', desc: 'Get notified about tournaments' },
                    { key: 'soundEnabled', label: 'Sound Effects', desc: 'Play sounds for notifications' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">{setting.label}</h4>
                        <p className="text-gray-400 text-sm">{setting.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notificationSettings[setting.key] ? 'bg-purple-600' : 'bg-gray-600'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => handleSettingsSave(notificationSettings)}
                    disabled={saveStatus?.type === 'loading'}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Notification Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* Data & Account Tab */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Download className="w-5 h-5 text-purple-400" />
                    <span>Data Management</span>
                  </h3>

                  <div className="space-y-6">
                    <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Export Your Data</h4>
                      <p className="text-gray-300 text-sm mb-4">Download a copy of all your account data</p>
                      <button
                        onClick={exportUserData}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Data</span>
                      </button>
                    </div>

                    <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Delete Account</h4>
                      <p className="text-gray-300 text-sm mb-4">Permanently delete your account and all data</p>
                      {!showDeleteConfirm ? (
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Account</span>
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-red-300 text-sm font-medium">Are you sure? This action cannot be undone.</p>
                          <div className="flex space-x-3">
                            <button
                              onClick={handleDeleteAccount}
                              disabled={saveStatus?.type === 'loading'}
                              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Yes, Delete</span>
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(false)}
                              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
