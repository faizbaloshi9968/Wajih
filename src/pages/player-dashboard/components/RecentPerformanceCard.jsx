import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentPerformanceCard = ({ performanceData, onViewHistory }) => {
  const getResultColor = (result) => {
    switch (result) {
      case 'win':
        return 'text-accent';
      case 'loss':
        return 'text-error';
      case 'draw':
        return 'text-warning';
      default:
        return 'text-text-secondary';
    }
  };

  const getResultIcon = (result) => {
    switch (result) {
      case 'win':
        return 'TrendingUp';
      case 'loss':
        return 'TrendingDown';
      case 'draw':
        return 'Minus';
      default:
        return 'Circle';
    }
  };

  const calculateWinRate = (matches) => {
    if (!matches || matches.length === 0) return 0;
    const wins = matches.filter(match => match.result === 'win').length;
    return Math.round((wins / matches.length) * 100);
  };

  const getPerformanceTrend = (winRate) => {
    if (winRate >= 70) return { text: 'Excellent', color: 'text-accent', icon: 'TrendingUp' };
    if (winRate >= 50) return { text: 'Good', color: 'text-warning', icon: 'Minus' };
    return { text: 'Needs Improvement', color: 'text-error', icon: 'TrendingDown' };
  };

  if (!performanceData || !performanceData.recentMatches || performanceData.recentMatches.length === 0) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Recent Performance</h2>
          <Icon name="BarChart3" size={20} className="text-text-secondary" />
        </div>
        <div className="text-center py-8">
          <Icon name="BarChart3" size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary mb-2">No match history</p>
          <p className="text-sm text-text-muted">Play some matches to see your performance stats</p>
        </div>
      </div>
    );
  }

  const winRate = calculateWinRate(performanceData.recentMatches);
  const trend = getPerformanceTrend(winRate);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Recent Performance</h2>
        <Icon name="BarChart3" size={20} className="text-text-secondary" />
      </div>
      
      {/* Performance Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-surface-700 rounded-lg">
          <div className="text-2xl font-bold text-text-primary mb-1">{winRate}%</div>
          <div className="text-sm text-text-secondary">Win Rate</div>
        </div>
        <div className="text-center p-4 bg-surface-700 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name={trend.icon} size={20} className={trend.color} />
            <span className={`text-sm font-medium ${trend.color}`}>{trend.text}</span>
          </div>
          <div className="text-sm text-text-secondary">Trend</div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">{performanceData.totalMatches}</div>
          <div className="text-xs text-text-secondary">Total Matches</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-accent">{performanceData.wins}</div>
          <div className="text-xs text-text-secondary">Wins</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">{performanceData.currentStreak}</div>
          <div className="text-xs text-text-secondary">Current Streak</div>
        </div>
      </div>
      
      {/* Recent Matches */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-text-primary">Recent Matches</h3>
        {performanceData.recentMatches.slice(0, 5).map((match) => (
          <div key={match.id} className="flex items-center justify-between p-3 bg-surface-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon 
                name={getResultIcon(match.result)} 
                size={16} 
                className={getResultColor(match.result)} 
              />
              <div>
                <div className="text-sm font-medium text-text-primary">
                  vs {match.opponent}
                </div>
                <div className="text-xs text-text-secondary">
                  {match.tournament} • {new Date(match.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-medium ${getResultColor(match.result)}`}>
                {match.score}
              </div>
              <div className="text-xs text-text-secondary capitalize">
                {match.result}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onViewHistory}
          iconName="History"
          iconPosition="left"
        >
          View Full History
        </Button>
      </div>
    </div>
  );
};

export default RecentPerformanceCard;