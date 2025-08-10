import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Camera, 
  Edit3, 
  Save, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Trophy,
  Shield,
  Settings,
  Upload,
  Check,
  AlertCircle,
  Gamepad2,
  Star,
  Award,
  Target
} from 'lucide-react';
import { ROLE_DISPLAY_NAMES, ROLE_COLORS } from '../../utils/roles';

const UserProfile = () => {
  const { currentUser, updateUser, uploadProfileImage } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  
  const [profileData, setProfileData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || '',
    dateOfBirth: currentUser?.dateOfBirth || '',
    favoriteGame: currentUser?.favoriteGame || '',
    gamingExperience: currentUser?.gamingExperience || 'Beginner',
    achievements: currentUser?.achievements || [],
    socialLinks: currentUser?.socialLinks || {
      discord: '',
      twitch: '',
      youtube: '',
      twitter: ''
    }
  });

  const [profileImage, setProfileImage] = useState(
    currentUser?.profileImage || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`
  );

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setSaveStatus({ type: 'error', message: 'Please select a valid image file' });
      return;
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setSaveStatus({ type: 'error', message: 'Image size must be less than 5MB' });
      return;
    }
    
    setIsUploading(true);
    setSaveStatus({ type: 'loading', message: 'Uploading image to cloud storage...' });
    
    try {
      // Upload to Firebase Storage (REAL CLOUD STORAGE!)
      const imageURL = await uploadProfileImage(file);
      
      setProfileImage(imageURL);
      setIsUploading(false);
      setSaveStatus({ type: 'success', message: 'Image uploaded to cloud successfully! ' });
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setIsUploading(false);
      setSaveStatus({ type: 'error', message: 'Failed to upload image to cloud storage' });
      setTimeout(() => setSaveStatus(null), 5000);
    }
  };

  const handleSave = async () => {
    try {
      setSaveStatus({ type: 'loading', message: 'Saving to database...' });
      
      const updatedProfile = {
        ...profileData,
        profileImage,
        updatedAt: new Date().toISOString()
      };
      
      // Update user in context (this will save to REAL DATABASE!)
      const success = await updateUser(updatedProfile);
      
      if (success) {
        setIsEditing(false);
        setSaveStatus({ type: 'success', message: 'Profile saved to database successfully! ' });
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus({ type: 'error', message: 'Failed to save to database. Please try again.' });
        setTimeout(() => setSaveStatus(null), 5000);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveStatus({ type: 'error', message: 'Failed to save profile. Please try again.' });
      setTimeout(() => setSaveStatus(null), 5000);
    }
  };

  const handleCancel = () => {
    setProfileData({
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      bio: currentUser?.bio || '',
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      phone: currentUser?.phone || '',
      location: currentUser?.location || '',
      dateOfBirth: currentUser?.dateOfBirth || '',
      favoriteGame: currentUser?.favoriteGame || '',
      gamingExperience: currentUser?.gamingExperience || 'Beginner',
      achievements: currentUser?.achievements || [],
      socialLinks: currentUser?.socialLinks || {
        discord: '',
        twitch: '',
        youtube: '',
        twitter: ''
      }
    });
    setIsEditing(false);
    setSaveStatus(null);
  };

  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Professional', 'Elite'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">My Profile</h1>
                <p className="text-gray-300">Customize your gaming profile</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saveStatus?.type === 'loading'}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saveStatus?.type === 'loading' ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              )}
              
              <button
                onClick={() => navigate('/account-settings')}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 sticky top-8">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-500 to-pink-500 p-1">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover bg-gradient-to-br from-purple-600 to-pink-600"
                    />
                  </div>
                  
                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="absolute -bottom-2 -right-2 p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 disabled:opacity-50"
                    >
                      {isUploading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-white">
                    {profileData.firstName || profileData.lastName 
                      ? `${profileData.firstName} ${profileData.lastName}`.trim()
                      : profileData.username}
                  </h2>
                  <p className="text-gray-300">@{profileData.username}</p>
                  
                  {/* Role Badge */}
                  <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <Shield className="w-4 h-4 mr-1" />
                    {ROLE_DISPLAY_NAMES[currentUser?.role] || 'Player'}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{profileData.achievements?.length || 0}</div>
                  <div className="text-xs text-gray-400">Achievements</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Target className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{profileData.gamingExperience}</div>
                  <div className="text-xs text-gray-400">Level</div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Bio</h3>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {profileData.bio || "No bio added yet. Click edit to add one!"}
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                {profileData.phone && (
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Phone className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{profileData.phone}</span>
                  </div>
                )}
                {profileData.location && (
                  <div className="flex items-center space-x-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{profileData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <User className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your first name"
                    />
                  ) : (
                    <p className="text-white p-3 bg-white/5 rounded-lg">{profileData.firstName || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your last name"
                    />
                  ) : (
                    <p className="text-white p-3 bg-white/5 rounded-lg">{profileData.lastName || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your username"
                    />
                  ) : (
                    <p className="text-white p-3 bg-white/5 rounded-lg">@{profileData.username}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="text-white p-3 bg-white/5 rounded-lg">{profileData.phone || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your location"
                    />
                  ) : (
                    <p className="text-white p-3 bg-white/5 rounded-lg">{profileData.location || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-white p-3 bg-white/5 rounded-lg">
                      {profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : 'Not provided'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Gaming Information */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Gamepad2 className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Gaming Profile</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Favorite Game</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.favoriteGame}
                      onChange={(e) => handleInputChange('favoriteGame', e.target.value)}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your favorite game"
                    />
                  ) : (
                    <p className="text-white p-3 bg-white/5 rounded-lg">{profileData.favoriteGame || 'Not specified'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Gaming Experience</label>
                  {isEditing ? (
                    <select
                      value={profileData.gamingExperience}
                      onChange={(e) => handleInputChange('gamingExperience', e.target.value)}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {experienceLevels.map(level => (
                        <option key={level} value={level} className="bg-slate-800">{level}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-white p-3 bg-white/5 rounded-lg">{profileData.gamingExperience}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Star className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Social Links</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(profileData.socialLinks).map(([platform, url]) => (
                  <div key={platform}>
                    <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">{platform}</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleInputChange(`socialLinks.${platform}`, e.target.value)}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder={`Enter your ${platform} profile URL`}
                      />
                    ) : (
                      <p className="text-white p-3 bg-white/5 rounded-lg">
                        {url ? (
                          <a href={url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                            {url}
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
