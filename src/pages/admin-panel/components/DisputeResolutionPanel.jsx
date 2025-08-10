import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DisputeResolutionPanel = () => {
  const [activeFilter, setActiveFilter] = useState('pending');
  const [selectedDispute, setSelectedDispute] = useState(null);

  const disputes = [
    {
      id: 1,
      title: 'Score Discrepancy - Team Alpha vs Team Beta',
      description: 'Team Alpha claims the final score was 3-2, but Team Beta reported 2-3. Match replay needed for verification.',
      status: 'pending',
      priority: 'high',
      tournament: 'Spring Championship 2024',
      match: 'Quarterfinals',
      reportedBy: 'Team Alpha',
      reportedAt: '2024-01-20T10:30:00Z',
      assignedTo: 'Admin John',
      evidence: ['screenshot1.png', 'match_replay.mp4'],
      messages: [
        {
          id: 1,
          sender: 'Team Alpha Captain',
          message: 'We have clear evidence that we won the match 3-2. The final round was completed before the server crash.',
          timestamp: '2024-01-20T10:30:00Z',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 2,
          sender: 'Team Beta Captain',
          message: 'The server crashed during the final round. We believe the match should be replayed from that point.',
          timestamp: '2024-01-20T10:45:00Z',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        }
      ]
    },
    {
      id: 2,
      title: 'Player Conduct Violation',
      description: 'Inappropriate behavior and unsportsmanlike conduct during live match stream.',
      status: 'investigating',
      priority: 'medium',
      tournament: 'Winter Cup Finals',
      match: 'Group Stage',
      reportedBy: 'Match Referee',
      reportedAt: '2024-01-19T15:20:00Z',
      assignedTo: 'Admin Sarah',
      evidence: ['stream_clip.mp4', 'chat_logs.txt'],
      messages: [
        {
          id: 1,
          sender: 'Match Referee',
          message: 'Player exhibited toxic behavior towards opponents during the match. Multiple warnings were issued.',
          timestamp: '2024-01-19T15:20:00Z',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }
      ]
    },
    {
      id: 3,
      title: 'Technical Issue - Connection Problems',
      description: 'Team Delta experienced repeated disconnections affecting match outcome.',
      status: 'resolved',
      priority: 'low',
      tournament: 'Rookie Tournament',
      match: 'Round of 16',
      reportedBy: 'Team Delta',
      reportedAt: '2024-01-18T14:10:00Z',
      assignedTo: 'Admin Mike',
      resolution: 'Match was rescheduled due to confirmed technical issues. New match time: Jan 21, 2:00 PM EST.',
      evidence: ['connection_logs.txt'],
      messages: []
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'investigating':
        return 'bg-primary text-primary-foreground';
      case 'resolved':
        return 'bg-accent text-accent-foreground';
      case 'escalated':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-surface-600 text-text-primary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-accent';
      default:
        return 'text-text-secondary';
    }
  };

  const filteredDisputes = disputes.filter(dispute => {
    if (activeFilter === 'all') return true;
    return dispute.status === activeFilter;
  });

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filters = [
    { id: 'pending', label: 'Pending', count: disputes.filter(d => d.status === 'pending').length },
    { id: 'investigating', label: 'Investigating', count: disputes.filter(d => d.status === 'investigating').length },
    { id: 'escalated', label: 'Escalated', count: disputes.filter(d => d.status === 'escalated').length },
    { id: 'resolved', label: 'Resolved', count: disputes.filter(d => d.status === 'resolved').length },
    { id: 'all', label: 'All', count: disputes.length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Dispute Resolution</h2>
          <p className="text-text-secondary">Handle player and match disputes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" iconName="Download">
            Export Reports
          </Button>
          <Button variant="outline" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`
              flex items-center px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200
              ${activeFilter === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface-700 text-text-secondary hover:text-text-primary hover:bg-surface-600'
              }
            `}
          >
            {filter.label}
            <span className="ml-2 px-2 py-0.5 text-xs bg-surface-800 rounded-full">
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Disputes List */}
      <div className="grid gap-4">
        {filteredDisputes.map((dispute) => (
          <div key={dispute.id} className="card p-6 hover:shadow-gaming-lg transition-shadow duration-200">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dispute.status)}`}>
                    {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                  </span>
                  <span className={`text-sm font-medium ${getPriorityColor(dispute.priority)}`}>
                    {dispute.priority.charAt(0).toUpperCase() + dispute.priority.slice(1)} Priority
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-text-primary mb-2">{dispute.title}</h3>
                <p className="text-text-secondary mb-3">{dispute.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-text-secondary">Tournament</p>
                    <p className="text-text-primary font-medium">{dispute.tournament}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Match</p>
                    <p className="text-text-primary font-medium">{dispute.match}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Reported By</p>
                    <p className="text-text-primary font-medium">{dispute.reportedBy}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Assigned To</p>
                    <p className="text-text-primary font-medium">{dispute.assignedTo}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <div className="flex items-center">
                    <Icon name="Clock" size={14} className="mr-1" />
                    Reported {formatTime(dispute.reportedAt)}
                  </div>
                  <div className="flex items-center">
                    <Icon name="Paperclip" size={14} className="mr-1" />
                    {dispute.evidence.length} evidence file{dispute.evidence.length > 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center">
                    <Icon name="MessageSquare" size={14} className="mr-1" />
                    {dispute.messages.length} message{dispute.messages.length > 1 ? 's' : ''}
                  </div>
                </div>

                {dispute.resolution && (
                  <div className="mt-3 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <div className="flex items-start">
                      <Icon name="CheckCircle" size={16} className="text-accent mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-accent mb-1">Resolution</p>
                        <p className="text-sm text-text-primary">{dispute.resolution}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="primary" 
                  size="sm" 
                  iconName="Eye"
                  onClick={() => setSelectedDispute(dispute)}
                >
                  View Details
                </Button>
                {dispute.status === 'pending' && (
                  <Button variant="warning" size="sm" iconName="Play">
                    Start Investigation
                  </Button>
                )}
                {dispute.status === 'investigating' && (
                  <Button variant="success" size="sm" iconName="CheckCircle">
                    Mark Resolved
                  </Button>
                )}
                <Button variant="outline" size="sm" iconName="MessageSquare">
                  Add Comment
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDisputes.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Shield" size={48} className="mx-auto text-text-muted mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No disputes found</h3>
          <p className="text-text-secondary">
            {activeFilter === 'all' ?'No disputes have been reported.' 
              : `No ${activeFilter} disputes found.`
            }
          </p>
        </div>
      )}

      {/* Dispute Detail Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
          <div className="bg-surface border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-primary">{selectedDispute.title}</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  iconName="X"
                  onClick={() => setSelectedDispute(null)}
                />
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Dispute Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-text-secondary">Description</p>
                      <p className="text-text-primary">{selectedDispute.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Evidence Files</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedDispute.evidence.map((file, index) => (
                          <span key={index} className="px-2 py-1 bg-surface-700 rounded text-xs text-text-primary">
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Messages</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedDispute.messages.map((message) => (
                      <div key={message.id} className="flex items-start space-x-3">
                        <Image
                          src={message.avatar}
                          alt={`${message.sender} avatar`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-text-primary">{message.sender}</p>
                            <p className="text-xs text-text-secondary">{formatTime(message.timestamp)}</p>
                          </div>
                          <p className="text-sm text-text-secondary mt-1">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full"
                    />
                    <Button variant="primary" size="sm" className="mt-2">
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisputeResolutionPanel;