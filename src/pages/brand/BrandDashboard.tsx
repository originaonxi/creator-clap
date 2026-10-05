import React from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  TrendingUp,
  Users,
  Eye,
  Target,
  BarChart3,
  Calendar,
  Star,
  ArrowRight,
  Play,
  Pause,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const BrandDashboard = () => {
  const { user } = useAuth();

  const metrics = [
    {
      label: 'Total Reach',
      value: '2.3M',
      change: '+12%',
      color: 'blue',
      icon: Eye
    },
    {
      label: 'Engagement Rate',
      value: '4.2%',
      change: '+8%',
      color: 'green',
      icon: Target
    },
    {
      label: 'Active Campaigns',
      value: '8',
      change: '+2',
      color: 'purple',
      icon: BarChart3
    },
    {
      label: 'Total Spend',
      value: '₹5,40,000',
      change: '+15%',
      color: 'orange',
      icon: TrendingUp
    }
  ];

  const activeCampaigns = [
    {
      id: '1',
      name: 'Summer Collection Launch',
      status: 'active',
      creators: 12,
      budget: '₹2,50,000',
      spent: '₹1,80,000',
      reach: '1.2M',
      engagement: '4.5%',
      endDate: '2024-01-15',
      progress: 75
    },
    {
      id: '2',
      name: 'Winter Sale Campaign',
      status: 'active',
      creators: 8,
      budget: '₹1,50,000',
      spent: '₹90,000',
      reach: '800K',
      engagement: '3.8%',
      endDate: '2024-01-10',
      progress: 60
    },
    {
      id: '3',
      name: 'Brand Awareness Drive',
      status: 'paused',
      creators: 15,
      budget: '₹3,00,000',
      spent: '₹45,000',
      reach: '300K',
      engagement: '5.2%',
      endDate: '2024-02-01',
      progress: 15
    }
  ];

  const aiInsights = [
    {
      type: 'suggestion',
      title: 'Optimal Posting Time',
      description: 'Your audience is most active between 7-9 PM. Consider scheduling posts during this window.',
      action: 'Schedule Posts'
    },
    {
      type: 'trend',
      title: 'Trending Category',
      description: 'Fashion creators in your budget range are performing 23% better this week.',
      action: 'Browse Fashion Creators'
    },
    {
      type: 'optimization',
      title: 'Budget Optimization',
      description: 'Reallocating 15% budget to micro-influencers could improve ROI by 28%.',
      action: 'Optimize Budget'
    }
  ];

  const topPerformers = [
    {
      id: '1',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=50&h=50&fit=crop&crop=face',
      category: 'Fashion & Lifestyle',
      followers: '125K',
      engagement: '4.8%',
      campaigns: 3,
      totalReach: '450K'
    },
    {
      id: '2',
      name: 'Arjun Patel',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      category: 'Tech & Gaming',
      followers: '89K',
      engagement: '5.2%',
      campaigns: 2,
      totalReach: '320K'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 mt-1">Here's what's happening with your campaigns today</p>
            </div>
            
            <Link
              to="/brand/campaign/create"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create AI Campaign
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link
            to="/brand/campaign/create"
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-blue-200"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Create AI Campaign</h3>
            <p className="text-sm text-gray-600">Launch automated campaigns</p>
          </Link>

          <Link
            to="/brand/creators"
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-purple-200"
          >
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Browse Creators</h3>
            <p className="text-sm text-gray-600">Find perfect influencers</p>
          </Link>

          <Link
            to="/brand/analytics"
            className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-green-200"
          >
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">View Reports</h3>
            <p className="text-sm text-gray-600">Track campaign performance</p>
          </Link>

          <Link
            to="/brand/billing"
            className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-orange-200"
          >
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Billing & Usage</h3>
            <p className="text-sm text-gray-600">Manage payments</p>
          </Link>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}>
                  <metric.icon className={`w-5 h-5 text-${metric.color}-600`} />
                </div>
                <span className="text-green-500 text-sm font-medium">{metric.change}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Campaigns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Active Campaigns</h2>
                  <Link
                    to="/brand/campaigns"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {activeCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{campaign.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            campaign.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {campaign.creators} creators
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Ends {campaign.endDate}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {campaign.status === 'active' ? (
                          <button className="p-2 text-gray-400 hover:text-yellow-600 transition-colors">
                            <Pause className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Campaign Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{campaign.budget}</p>
                        <p className="text-xs text-gray-500">Budget</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600">{campaign.spent}</p>
                        <p className="text-xs text-gray-500">Spent</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-blue-600">{campaign.reach}</p>
                        <p className="text-xs text-gray-500">Reach</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-purple-600">{campaign.engagement}</p>
                        <p className="text-xs text-gray-500">Engagement</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* AI Insights */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">AI Insights</h2>
                <p className="text-sm text-gray-600 mt-1">Based on your recent campaigns</p>
              </div>
              
              <div className="p-6 space-y-4">
                {aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      {insight.action} →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Top Performers</h2>
              </div>
              
              <div className="p-6 space-y-4">
                {topPerformers.map((performer) => (
                  <div key={performer.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={performer.avatar}
                        alt={performer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{performer.name}</h3>
                        <p className="text-sm text-gray-600">{performer.category}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{performer.engagement}</span>
                      </div>
                      <p className="text-xs text-gray-500">{performer.followers} • {performer.campaigns} campaigns</p>
                    </div>
                  </div>
                ))}
                
                <Link
                  to="/brand/creators"
                  className="block text-center mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All Creators
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDashboard;