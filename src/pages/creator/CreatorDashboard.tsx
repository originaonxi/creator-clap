import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Wallet,
  TrendingUp,
  Eye,
  Clock,
  MapPin,
  Star,
  Plus,
  Bell,
  User,
  LogOut,
  Search,
  Filter,
  Camera,
  Megaphone,
  Settings,
  BarChart3,
  ArrowRight,
  Palette,
  ShoppingBag,
  Scissors
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const CreatorDashboard = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      label: 'Total Earnings',
      value: '₹45,000',
      subtitle: 'this month',
      color: 'green',
      icon: Wallet
    },
    {
      label: 'Active Campaigns',
      value: '5',
      subtitle: 'running',
      color: 'blue',
      icon: Megaphone
    },
    {
      label: 'Completed Bookings',
      value: '12',
      subtitle: 'this month',
      color: 'purple',
      icon: Camera
    },
    {
      label: 'Profile Views',
      value: '1,234',
      subtitle: 'this week',
      color: 'teal',
      icon: Eye
    }
  ];

  const upcomingBookings = [
    {
      id: '1',
      date: 'Dec 28, 2024',
      time: '10:00 AM',
      service: 'Photography',
      provider: 'Raj Photography',
      location: 'Bandra, Mumbai',
      status: 'confirmed'
    },
    {
      id: '2',
      date: 'Dec 30, 2024',
      time: '2:00 PM',
      service: 'Video Shoot',
      provider: 'Creative Films',
      location: 'Juhu, Mumbai',
      status: 'pending'
    }
  ];

  const availableCampaigns = [
    {
      id: '1',
      brand: 'Fashion Brand',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center',
      name: 'Summer Collection Launch',
      budget: '₹25,000',
      platform: 'Instagram',
      deadline: 'Jan 5, 2025',
      matchScore: 94,
      description: 'Promote our new summer collection with creative reels'
    },
    {
      id: '2',
      brand: 'Tech Startup',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center',
      name: 'App Launch Campaign',
      budget: '₹15,000',
      platform: 'YouTube',
      deadline: 'Jan 10, 2025',
      matchScore: 87,
      description: 'Create engaging video content for our app launch'
    }
  ];

  // Order requested by the team: Book → CreatorClap Edits → Mood Board → Sell & Earn → Campaigns → Withdraw
  const quickActions = [
    {
      title: 'Book Services',
      subtitle: 'Find crew for your next shoot',
      icon: Calendar,
      color: 'purple',
      link: '/creator/book'
    },
    {
      title: 'CreatorClap Edits',
      subtitle: 'Pro edits by our in-house team',
      icon: Scissors,
      color: 'red',
      link: '/creator/edits'
    },
    {
      title: 'Mood Board',
      subtitle: 'Save references, Ideas & Use AI Edits',
      icon: Palette,
      color: 'pink',
      link: '/creator/mood-board'
    },
    {
      title: 'Sell & Earn',
      subtitle: 'Share your creativity & earn from it',
      icon: ShoppingBag,
      color: 'teal',
      link: '/creator/sell'
    },
    {
      title: 'View Campaigns',
      subtitle: 'Active campaigns & content upload',
      icon: Megaphone,
      color: 'blue',
      link: '/creator/campaigns'
    },
    {
      title: 'Withdraw Earnings',
      subtitle: 'Transfer to your bank',
      icon: Wallet,
      color: 'orange',
      link: '/creator/earnings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-xl transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} hidden lg:block`}>
        <div className="p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white mb-6"
          >
            <Camera className="w-5 h-5" />
          </button>
          
          <nav className="space-y-2">
            {[
              { icon: BarChart3, label: 'Dashboard', to: '/creator/dashboard', active: true },
              { icon: Calendar, label: 'Book Services', to: '/creator/book' },
              { icon: Scissors, label: 'CreatorClap Edits', to: '/creator/edits' },
              { icon: Palette, label: 'Mood Board', to: '/creator/mood-board' },
              { icon: ShoppingBag, label: 'Sell & Earn', to: '/creator/sell' },
              { icon: Megaphone, label: 'Campaigns', to: '/creator/campaigns' },
              { icon: Wallet, label: 'Earnings', to: '/creator/earnings' }
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white"
              >
                <Camera className="w-5 h-5" />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Good morning, {user?.name}! 👋
                </h1>
                <p className="text-gray-600">You have 3 upcoming bookings today.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Profile Menu */}
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={logout}
                  className="hidden md:flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`bg-gradient-to-br from-${action.color}-50 to-${action.color}-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-${action.color}-200`}
              >
                <div className={`w-12 h-12 bg-${action.color}-600 rounded-xl flex items-center justify-center mb-4`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.subtitle}</p>
              </Link>
            ))}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Be Famous Projects */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm mb-8">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-gray-900">Be Famous Projects</h2>
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </span>
                    </div>
                    <Link
                      to="/be-famous/pitch"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                    >
                      Submit Pitch
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {/* Active Pitch */}
                    <div className="border border-purple-200 rounded-xl p-6 bg-gradient-to-r from-purple-50 to-blue-50">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">Mumbai Dreams</h3>
                          <p className="text-sm text-gray-600">Music Video • Submitted 3 days ago</p>
                        </div>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                          Community Voting
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">92</div>
                          <div className="text-xs text-gray-500">AI Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">1,247</div>
                          <div className="text-xs text-gray-500">Community Votes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">₹15L</div>
                          <div className="text-xs text-gray-500">Requested Budget</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Voting Progress</span>
                          <span>4 days remaining</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                          Share for Votes
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Production Project */}
                    <div className="border border-green-200 rounded-xl p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">Street Food Stories</h3>
                          <p className="text-sm text-gray-600">Documentary Series • Day 8 of 15</p>
                        </div>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          In Production
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">₹8.2L</div>
                          <div className="text-xs text-gray-500">Budget Used</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">12/15</div>
                          <div className="text-xs text-gray-500">Crew Confirmed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">65%</div>
                          <div className="text-xs text-gray-500">Complete</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Production Progress</span>
                          <span>7 days remaining</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Today's Schedule</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>10:00 AM - Location Setup</span>
                            <span className="text-green-600">✓ Done</span>
                          </div>
                          <div className="flex justify-between">
                            <span>12:00 PM - Interview Shoot</span>
                            <span className="text-blue-600">In Progress</span>
                          </div>
                          <div className="flex justify-between">
                            <span>4:00 PM - B-Roll Footage</span>
                            <span className="text-gray-400">Pending</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                          View Live Updates
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Chat with Crew
                        </button>
                      </div>
                    </div>

                    {/* Completed Project */}
                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">Chai Chronicles</h3>
                          <p className="text-sm text-gray-600">Short Film • Premiered 2 weeks ago</p>
                        </div>
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                          Live on CC TV
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">2.3M</div>
                          <div className="text-xs text-gray-500">Total Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">₹4.5L</div>
                          <div className="text-xs text-gray-500">Earnings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">4.8</div>
                          <div className="text-xs text-gray-500">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600 mb-1">12%</div>
                          <div className="text-xs text-gray-500">Engagement</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                          View Analytics
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Watch on CC TV
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Upcoming Bookings</h2>
                    <Link
                      to="/creator/bookings"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View All
                    </Link>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.service}</h3>
                            <p className="text-sm text-gray-600">{booking.provider}</p>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 mb-3">
                          <div>{booking.date} • {booking.time}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {booking.location}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.status}
                          </span>
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Available Campaigns */}
              <div className="bg-white rounded-2xl shadow-sm mt-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Available Campaigns</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {availableCampaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <img
                            src={campaign.logo}
                            alt={campaign.brand}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                            <p className="text-sm text-gray-600">{campaign.brand}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">{campaign.budget}</p>
                            <p className="text-xs text-gray-500">{campaign.platform}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{campaign.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium text-gray-900">
                              {campaign.matchScore}% Match
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">Apply by {campaign.deadline}</p>
                        </div>
                        
                        <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                          Apply Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatorDashboard;