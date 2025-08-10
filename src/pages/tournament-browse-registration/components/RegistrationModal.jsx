import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegistrationModal = ({ isOpen, onClose, tournament, userRole, onConfirm }) => {
  const [registrationData, setRegistrationData] = useState({
    playerName: 'John Doe',
    email: 'john@example.com',
    teamName: '',
    teamMembers: [''],
    agreeToTerms: false,
    agreeToRules: false
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTeamMemberChange = (index, value) => {
    const newMembers = [...registrationData.teamMembers];
    newMembers[index] = value;
    setRegistrationData(prev => ({
      ...prev,
      teamMembers: newMembers
    }));
  };

  const addTeamMember = () => {
    if (registrationData.teamMembers.length < tournament?.maxTeamSize || 5) {
      setRegistrationData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, '']
      }));
    }
  };

  const removeTeamMember = (index) => {
    if (registrationData.teamMembers.length > 1) {
      const newMembers = registrationData.teamMembers.filter((_, i) => i !== index);
      setRegistrationData(prev => ({
        ...prev,
        teamMembers: newMembers
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onConfirm(registrationData);
      onClose();
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    const baseValid = registrationData.agreeToTerms && registrationData.agreeToRules;
    
    if (tournament?.registrationType === 'team') {
      return baseValid && 
             registrationData.teamName.trim() && 
             registrationData.teamMembers.every(member => member.trim());
    }
    
    return baseValid;
  };

  if (!isOpen || !tournament) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      
      <div className="relative bg-surface border border-border rounded-lg shadow-gaming-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Register for Tournament
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {tournament.title}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="text-text-secondary hover:text-text-primary"
          />
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Tournament Info */}
            <div className="bg-surface-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Entry Fee</span>
                <span className="text-sm font-medium text-text-primary">
                  {tournament.entryFee > 0 ? `$${tournament.entryFee}` : 'Free'}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Prize Pool</span>
                <span className="text-sm font-medium text-warning">
                  ${tournament.prizePool.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Registration Type</span>
                <span className="text-sm font-medium text-text-primary capitalize">
                  {tournament.registrationType}
                </span>
              </div>
            </div>

            {/* Player Information */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">Player Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-text-muted mb-1">Player Name</label>
                  <Input
                    type="text"
                    value={registrationData.playerName}
                    onChange={(e) => handleInputChange('playerName', e.target.value)}
                    placeholder="Enter your player name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1">Email</label>
                  <Input
                    type="email"
                    value={registrationData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Team Information */}
            {tournament.registrationType === 'team' && (
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">Team Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Team Name</label>
                    <Input
                      type="text"
                      value={registrationData.teamName}
                      onChange={(e) => handleInputChange('teamName', e.target.value)}
                      placeholder="Enter team name"
                      required
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs text-text-muted">Team Members</label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="xs"
                        onClick={addTeamMember}
                        iconName="Plus"
                        iconPosition="left"
                        className="text-primary hover:text-primary-400"
                      >
                        Add Member
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {registrationData.teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            type="text"
                            value={member}
                            onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                            placeholder={`Team member ${index + 1}`}
                            required
                            className="flex-1"
                          />
                          {registrationData.teamMembers.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTeamMember(index)}
                              iconName="Trash2"
                              className="text-error hover:text-error-400 flex-shrink-0"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="space-y-3">
              <label className="flex items-start space-x-2 cursor-pointer">
                <Input
                  type="checkbox"
                  checked={registrationData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-text-secondary">
                  I agree to the{' '}
                  <button type="button" className="text-primary hover:text-primary-400 underline">
                    Terms and Conditions
                  </button>
                </span>
              </label>
              
              <label className="flex items-start space-x-2 cursor-pointer">
                <Input
                  type="checkbox"
                  checked={registrationData.agreeToRules}
                  onChange={(e) => handleInputChange('agreeToRules', e.target.checked)}
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-text-secondary">
                  I agree to the{' '}
                  <button type="button" className="text-primary hover:text-primary-400 underline">
                    Tournament Rules
                  </button>
                </span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border bg-surface-800">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!isFormValid() || loading}
              loading={loading}
              iconName="Check"
              iconPosition="left"
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;