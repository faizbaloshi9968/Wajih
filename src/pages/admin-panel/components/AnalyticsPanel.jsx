import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsPanel = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const userGrowthData = [
    { name: 'Jan', users: 1200, tournaments: 15 },
    { name: 'Feb', users: 1450, tournaments: 18 },
    { name: 'Mar', users: 1680, tournaments: 22 },
    { name: 'Apr', users: 1920, tournaments: 25 },
    { name: 'May', users: 2150, tournaments: 28 },
    { name: 'Jun', users: 2380, tournaments: 32 },
    { name: 'Jul', users: 2650, tournaments: 35 }
  ];

  const gamePopularityData = [
    { name: 'Valorant', value: 35, color: '#6366F1' },
    { name: 'CS2', value: 28, color: '#8B5CF6' },
    { name: 'League of Legends', value: 20, color: '#10B981' },
    { name: 'Dota 2', value: 12, color: '#F59E0B' },
    { name: 'Others', value: 5, color: '#EF4444' }
  ];

  const engagementData = [
    { name: 'Mon', matches: 45, spectators: 1200 },
    { name: 'Tue', matches: 52, spectators: 1450 },
    { name: 'Wed', matches: 48, spectators: 1320 },
    { name: 'Thu', matches: 61, spectators: 1680 },
    { name: 'Fri', matches: 75, spectators: 2100 },
    { name: 'Sat', matches: 89, spectators: 2850 },
    { name: 'Sun', matches: 67, spectators: 2200 }
  ];

  const revenueData = [
    { name: 'Q1', revenue: 25000, expenses: 18000 },
    { name: 'Q2', revenue: 32000, expenses: 22000 },
    { name: 'Q3', revenue: 28000, expenses: 20000 },
    { name: 'Q4', revenue: 45000, expenses: 28000 }
  ];

  const topMetrics = [
    {
      title: 'Total Revenue',
      value: '$130,000',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'success'
    },
    {
      title: 'Active Users',
      value: '2,650',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Tournament Completion Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'Trophy',
      color: 'warning'
    },
    {
      title: 'Average Match Duration',
      value: '42 min',
      change: '-3.5%',
      changeType: 'negative',
      icon: 'Clock',
      color: 'error'
    }
  ];

  const timeRanges = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Analytics Dashboard</h2>
          <p className="text-text-secondary">Platform performance and insights</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {timeRanges.map((range) => (
              <option key={range.id} value={range.id}>{range.label}</option>
            ))}
          </select>
          <Button variant="outline" iconName="Download">
            Export Report
          </Button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topMetrics.map((metric, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-text-secondary mb-1">{metric.title}</p>
                <p className="text-2xl font-bold text-text-primary">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <Icon 
                    name={metric.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                    size={16} 
                    className={`mr-1 ${metric.changeType === 'positive' ? 'text-accent' : 'text-error'}`}
                  />
                  <span className={`text-sm font-medium ${metric.changeType === 'positive' ? 'text-accent' : 'text-error'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${
                metric.color === 'success' ? 'bg-accent text-accent-foreground' :
                metric.color === 'primary' ? 'bg-primary text-primary-foreground' :
                metric.color === 'warning' ? 'bg-warning text-warning-foreground' :
                'bg-error text-error-foreground'
              }`}>
                <Icon name={metric.icon} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">User Growth</h3>
            <Icon name="TrendingUp" size={20} className="text-accent" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-surface)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Game Popularity Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Game Popularity</h3>
            <Icon name="PieChart" size={20} className="text-primary" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gamePopularityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {gamePopularityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-surface)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Engagement Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Daily Engagement</h3>
            <Icon name="Activity" size={20} className="text-warning" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-surface)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="matches" fill="var(--color-accent)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Revenue vs Expenses</h3>
            <Icon name="DollarSign" size={20} className="text-accent" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-surface)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="revenue" fill="var(--color-accent)" />
                <Bar dataKey="expenses" fill="var(--color-error)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Users" size={24} className="text-accent" />
            </div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">User Retention</h4>
            <p className="text-3xl font-bold text-accent mb-1">87.5%</p>
            <p className="text-sm text-text-secondary">30-day retention rate</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Trophy" size={24} className="text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">Tournament Success</h4>
            <p className="text-3xl font-bold text-primary mb-1">94.2%</p>
            <p className="text-sm text-text-secondary">Completion rate</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Star" size={24} className="text-warning" />
            </div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">User Satisfaction</h4>
            <p className="text-3xl font-bold text-warning mb-1">4.8/5</p>
            <p className="text-sm text-text-secondary">Average rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;