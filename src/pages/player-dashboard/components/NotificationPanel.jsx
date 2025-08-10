import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications, onMarkAsRead, onMarkAllAsRead, onDismiss }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'match':
        return 'Zap';
      case 'tournament':
        return 'Trophy';
      case 'team':
        return 'Users';
      case 'system':
        return 'Settings';
      case 'invitation':
        return 'Mail';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    if (priority === 'medium') return 'text-warning';
    
    switch (type) {
      case 'match':
        return 'text-accent';
      case 'tournament':
        return 'text-primary';
      case 'team':
        return 'text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications.length },
    { value: 'unread', label: 'Unread', count: unreadCount },
    { value: 'match', label: 'Matches', count: notifications.filter(n => n.type === 'match').length },
    { value: 'tournament', label: 'Tournaments', count: notifications.filter(n => n.type === 'tournament').length },
    { value: 'team', label: 'Teams', count: notifications.filter(n => n.type === 'team').length }
  ];

  if (!notifications || notifications.length === 0) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Notifications</h2>
          <Icon name="Bell" size={20} className="text-text-secondary" />
        </div>
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary mb-2">No notifications</p>
          <p className="text-sm text-text-muted">You're all caught up!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error text-error-foreground">
              {unreadCount}
            </span>
          )}
        </h2>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={onMarkAllAsRead}
              className="text-text-secondary hover:text-text-primary"
            >
              Mark all read
            </Button>
          )}
          <Icon name="Bell" size={20} className="text-text-secondary" />
        </div>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4 overflow-x-auto">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`
              flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap
              ${filter === option.value
                ? 'bg-primary text-primary-foreground'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-700'
              }
            `}
          >
            <span>{option.label}</span>
            {option.count > 0 && (
              <span className={`
                inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-medium
                ${filter === option.value
                  ? 'bg-primary-foreground text-primary'
                  : 'bg-surface-600 text-text-primary'
                }
              `}>
                {option.count > 99 ? '99+' : option.count}
              </span>
            )}
          </button>
        ))}
      </div>
      
      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Filter" size={32} className="mx-auto text-text-muted mb-2" />
            <p className="text-sm text-text-secondary">No notifications in this category</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                p-4 rounded-lg border transition-all duration-200 cursor-pointer
                ${!notification.read 
                  ? 'border-primary bg-primary bg-opacity-5 hover:bg-opacity-10' :'border-border hover:bg-surface-700'
                }
              `}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 ${getNotificationColor(notification.type, notification.priority)}`}>
                  <Icon name={getNotificationIcon(notification.type)} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`text-sm font-medium ${!notification.read ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-text-muted font-caption">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-text-muted line-clamp-2">
                    {notification.message}
                  </p>
                  {notification.actionRequired && (
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="xs"
                        className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        {notification.actionText || 'Take Action'}
                      </Button>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDismiss(notification.id);
                  }}
                  className="text-text-muted hover:text-text-secondary"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;